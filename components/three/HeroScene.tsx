'use client'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

/* Ashima 3D simplex noise (MIT) — drives the morphing "AI core" surface. */
const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`

const CORE_VERT = /* glsl */ `
uniform float uTime;
uniform float uHover;
varying vec3 vNormal;
varying vec3 vView;
varying float vNoise;
${NOISE}
void main(){
  float n = snoise(normal * 1.35 + vec3(uTime * 0.28));
  float n2 = snoise(normal * 3.2 - vec3(uTime * 0.18)) * 0.35;
  float d = (n + n2) * (0.22 + uHover * 0.12);
  vNoise = n;
  vec3 pos = position + normal * d;
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  vNormal = normalize(normalMatrix * normal);
  vView = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}`

const CORE_FRAG = /* glsl */ `
uniform float uTime;
varying vec3 vNormal;
varying vec3 vView;
varying float vNoise;
void main(){
  float fres = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.4);
  vec3 ink  = vec3(0.035, 0.04, 0.055);
  vec3 gold = vec3(0.91, 0.70, 0.29);
  vec3 cyan = vec3(0.43, 0.90, 0.98);
  vec3 rim = mix(gold, cyan, smoothstep(-0.3, 0.6, vNoise));
  float bands = smoothstep(0.92, 1.0, sin(vNoise * 18.0 + uTime * 0.8) * 0.5 + 0.5) * 0.25;
  vec3 col = ink + rim * (fres * 1.35 + bands);
  gl_FragColor = vec4(col, 1.0);
}`

const POINT_VERT = /* glsl */ `
uniform float uTime;
uniform float uPx;
attribute float aSize;
attribute vec3 aColor;
varying vec3 vColor;
varying float vFade;
void main(){
  vec3 p = position;
  float a = uTime * 0.03 * (0.5 + aSize);
  p.xz = mat2(cos(a), -sin(a), sin(a), cos(a)) * p.xz;
  p.y += sin(uTime * 0.4 + position.x) * 0.06;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = aSize * 22.0 * uPx / -mv.z;
  vColor = aColor;
  vFade = 0.45 + 0.55 * (0.5 + 0.5 * sin(uTime * 1.3 + position.y * 3.0));
}`

const POINT_FRAG = /* glsl */ `
varying vec3 vColor;
varying float vFade;
void main(){
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float a = pow(1.0 - d * 2.0, 2.0) * vFade;
  gl_FragColor = vec4(vColor, a);
}`

function Scene({ onFail }: { onFail: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' })
    } catch {
      onFail()
      return
    }
    renderer.setClearColor(0x000000, 0)

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
    camera.position.set(0, 0, 9)

    const root = new THREE.Group()
    scene.add(root)
    const disposables: { dispose: () => void }[] = []

    // --- morphing AI core
    const coreGeo = new THREE.IcosahedronGeometry(1.35, 64)
    const coreUniforms = { uTime: { value: 0 }, uHover: { value: 0 } }
    const coreMat = new THREE.ShaderMaterial({ uniforms: coreUniforms, vertexShader: CORE_VERT, fragmentShader: CORE_FRAG })
    const core = new THREE.Mesh(coreGeo, coreMat)
    root.add(core)
    disposables.push(coreGeo, coreMat)

    // --- geodesic wire shell
    const shellGeo = new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(2.2, 1))
    const shellMat = new THREE.LineBasicMaterial({ color: 0xe8b44a, transparent: true, opacity: 0.16 })
    const shell = new THREE.LineSegments(shellGeo, shellMat)
    root.add(shell)
    disposables.push(shellGeo, shellMat)

    // --- orbit rings with travelling nodes
    const rings: { pivot: THREE.Group; node: THREE.Mesh; speed: number; r: number }[] = []
    const ringDefs = [
      { r: 2.75, tilt: [1.2, 0.2, 0], color: 0xe8b44a, speed: 0.35 },
      { r: 3.15, tilt: [0.5, 0.9, 0.3], color: 0x6ee7f9, speed: -0.25 },
      { r: 3.6, tilt: [1.8, -0.4, 0.6], color: 0xf5cf7c, speed: 0.18 },
    ]
    for (const d of ringDefs) {
      const pivot = new THREE.Group()
      pivot.rotation.set(d.tilt[0], d.tilt[1], d.tilt[2])
      const tg = new THREE.TorusGeometry(d.r, 0.006, 6, 220)
      const tm = new THREE.MeshBasicMaterial({ color: d.color, transparent: true, opacity: 0.4 })
      pivot.add(new THREE.Mesh(tg, tm))
      const ng = new THREE.SphereGeometry(0.055, 16, 16)
      const nm = new THREE.MeshBasicMaterial({ color: d.color })
      const node = new THREE.Mesh(ng, nm)
      pivot.add(node)
      root.add(pivot)
      rings.push({ pivot, node, speed: d.speed, r: d.r })
      disposables.push(tg, tm, ng, nm)
    }

    // --- particle field
    const small = window.innerWidth < 768
    const COUNT = small ? 900 : 2200
    const pos = new Float32Array(COUNT * 3)
    const col = new Float32Array(COUNT * 3)
    const size = new Float32Array(COUNT)
    const palette = [new THREE.Color(0xe8b44a), new THREE.Color(0x6ee7f9), new THREE.Color(0xf3f1ea)]
    for (let i = 0; i < COUNT; i++) {
      const r = 3.4 + Math.pow(Math.random(), 0.6) * 7
      const th = Math.random() * Math.PI * 2
      const ph = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th)
      pos[i * 3 + 1] = r * Math.cos(ph) * 0.6
      pos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th)
      const c = palette[Math.random() < 0.55 ? 0 : Math.random() < 0.6 ? 1 : 2]
      col.set([c.r, c.g, c.b], i * 3)
      size[i] = 0.4 + Math.random() * 1.1
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    pGeo.setAttribute('aColor', new THREE.BufferAttribute(col, 3))
    pGeo.setAttribute('aSize', new THREE.BufferAttribute(size, 1))
    const pUniforms = { uTime: { value: 0 }, uPx: { value: 1 } }
    const pMat = new THREE.ShaderMaterial({
      uniforms: pUniforms,
      vertexShader: POINT_VERT,
      fragmentShader: POINT_FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const points = new THREE.Points(pGeo, pMat)
    scene.add(points)
    disposables.push(pGeo, pMat)

    // --- interaction state
    const mouse = { x: 0, y: 0, sx: 0, sy: 0, hover: 0 }
    let baseX = 0
    let baseScale = 1
    let visible = true
    let raf = 0
    const t0 = performance.now()

    const resize = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight || 1
      if (!w) return
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75))
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      const desktop = w >= 1024
      // keep the core in the right ~third of the viewport so it never covers the headline
      const halfW = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z * camera.aspect
      baseX = desktop ? halfW * 0.55 : 0
      baseScale = desktop ? Math.min(1, halfW / 4.6) : w < 640 ? 0.62 : 0.8
      pUniforms.uPx.value = renderer.getPixelRatio()
      if (reduce) render(0)
    }

    const render = (t: number) => {
      const scrollY = window.scrollY || 0
      const sp = Math.min(1, scrollY / 900)

      mouse.sx += (mouse.x - mouse.sx) * 0.05
      mouse.sy += (mouse.y - mouse.sy) * 0.05

      root.position.set(baseX + mouse.sx * 0.25, mouse.sy * 0.2 + sp * 1.2, 0)
      root.scale.setScalar(baseScale * (1 - sp * 0.15))
      root.rotation.y = t * 0.12 + mouse.sx * 0.5 + sp * 1.5
      root.rotation.x = mouse.sy * -0.3 + sp * 0.4

      shell.rotation.y = -t * 0.08
      shell.rotation.z = t * 0.05
      for (const r of rings) {
        const a = t * r.speed * 2
        r.node.position.set(Math.cos(a) * r.r, Math.sin(a) * r.r, 0)
        r.pivot.rotation.z += 0.0008 * Math.sign(r.speed)
      }
      points.rotation.y = mouse.sx * 0.15
      points.rotation.x = mouse.sy * 0.08

      camera.position.x = mouse.sx * 0.6
      camera.position.y = mouse.sy * 0.4
      camera.lookAt(baseX * 0.5, 0, 0)

      mouse.hover += ((Math.abs(mouse.x) + Math.abs(mouse.y) > 0 ? 1 : 0) - mouse.hover) * 0.02
      coreUniforms.uTime.value = t
      coreUniforms.uHover.value = mouse.hover
      pUniforms.uTime.value = t
      canvas.style.opacity = String(1 - sp * 0.6)
      renderer.render(scene, camera)
    }

    const tick = () => {
      if (visible) render((performance.now() - t0) / 1000)
      raf = requestAnimationFrame(tick)
    }

    const onMove = (e: PointerEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    const onLeave = () => {
      mouse.x = 0
      mouse.y = 0
    }
    const onLost = (e: Event) => {
      e.preventDefault()
      onFail()
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting))
    io.observe(canvas)
    resize()

    if (reduce) render(0)
    else {
      raf = requestAnimationFrame(tick)
      window.addEventListener('pointermove', onMove, { passive: true })
      document.documentElement.addEventListener('mouseleave', onLeave)
    }
    canvas.addEventListener('webglcontextlost', onLost)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      canvas.removeEventListener('webglcontextlost', onLost)
      disposables.forEach(d => d.dispose())
      renderer.dispose()
    }
  }, [onFail])

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full transition-opacity duration-300" />
}

export default function HeroScene() {
  const [failed, setFailed] = useState(false)
  const [fail] = useState(() => () => setFailed(true))
  if (failed) {
    return <div aria-hidden="true" className="hero-fallback absolute right-[-10%] top-[10%] h-[80%] w-[70%] rounded-full blur-2xl" />
  }
  return <Scene onFail={fail} />
}
