'use client'
import { useEffect, useRef, useState } from 'react'
import Container from '@/components/layout/Container'

const stats = [
  {value:500,suffix:'+',label:'Clients served',desc:'From startups to Fortune 500 enterprises'},
  {value:99,suffix:'%',label:'Uptime SLA',desc:'24/7 monitoring and incident response'},
  {value:12,suffix:'M+',label:'Chats processed',desc:'Conversations handled with full audit trails'},
  {value:48,suffix:'ms',label:'P99 latency',desc:'Sub-50ms median latency on streaming'},
]

function Counter({value,suffix,duration=1800}:{value:number;suffix:string;duration?:number}) {
  const [count,setCount]=useState(0)
  const [started,setStarted]=useState(false)
  const ref=useRef<HTMLSpanElement>(null)
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting&&!started)setStarted(true)},{threshold:0.5})
    if(ref.current)obs.observe(ref.current)
    return()=>obs.disconnect()
  },[started])
  useEffect(()=>{
    if(!started)return
    const t0=performance.now()
    const step=(now:number)=>{
      const p=Math.min((now-t0)/duration,1)
      const e=1-Math.pow(1-p,3)
      setCount(Math.floor(e*value))
      if(p<1)requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  },[started,value,duration])
  return <span ref={ref}>{count}{suffix}</span>
}

export default function StatsCounter() {
  return (
    <section className="bg-black">
      <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-[#1a1a1a]">
        {stats.map((s,i)=>(
          <div key={s.label} className="group p-14 border-r border-b border-[#1a1a1a] hover:bg-[#0a0a0a] transition-colors duration-200 [&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(4n)]:border-r-0">
            <div className="font-syne font-extrabold text-[52px] lg:text-[60px] text-[#E8C547] leading-none mb-3">
              <Counter value={s.value} suffix={s.suffix} duration={1600+i*150} />
            </div>
            <div className="font-syne font-bold text-[13px] text-white uppercase tracking-widest mb-2">{s.label}</div>
            <div className="text-[13px] text-[#555] font-dm leading-snug">{s.desc}</div>
            <div className="mt-6 w-6 h-px bg-[#E8C547]/30 group-hover:w-14 group-hover:bg-[#E8C547]/60 transition-all duration-500" />
          </div>
        ))}
      </div>
    </section>
  )
}
