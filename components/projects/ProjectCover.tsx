import {
  Bot, Bug, LineChart, Clapperboard, Cog, GraduationCap, LayoutDashboard, MailCheck,
  MessagesSquare, Network, RadioTower, ScanFace, Workflow, Wrench, type LucideIcon,
} from 'lucide-react'
import type { CoverIcon, CoverPattern, Project } from '@/lib/projects'
import { projectGroups } from '@/lib/projects'

const icons: Record<CoverIcon, LucideIcon> = {
  video: Clapperboard, face: ScanFace, studio: LayoutDashboard, chat: MessagesSquare, iot: RadioTower,
  robot: Bot, motion: Cog, pipeline: Workflow, mail: MailCheck, agents: Network, chart: LineChart,
  debug: Bug, repair: Wrench, lecture: GraduationCap,
}

function Pattern({ type, color }: { type: CoverPattern; color: string }) {
  const common = { stroke: color, fill: 'none', strokeOpacity: 0.55 }
  return (
    <svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
      {type === 'nodes' && (
        <g {...common} strokeWidth={1}>
          {[[250, 60, 330, 110], [330, 110, 290, 180], [250, 60, 200, 140], [200, 140, 290, 180], [330, 110, 380, 40]].map(([a, b, c, d], i) => (
            <line key={i} x1={a} y1={b} x2={c} y2={d} />
          ))}
          {[[250, 60], [330, 110], [290, 180], [200, 140], [380, 40]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i === 1 ? 7 : 4.5} fill={color} fillOpacity={i === 1 ? 0.9 : 0.5} stroke="none" />
          ))}
        </g>
      )}
      {type === 'bars' && (
        <g fill={color}>
          {[40, 62, 54, 88, 76, 110, 132].map((h, i) => (
            <rect key={i} x={210 + i * 26} y={200 - h} width={16} height={h} rx={3} fillOpacity={0.18 + i * 0.1} />
          ))}
        </g>
      )}
      {type === 'waves' && (
        <g {...common} strokeWidth={1.4}>
          {[0, 1, 2, 3, 4].map(i => (
            <path key={i} d={`M150 ${120 + i * 14} C 220 ${70 + i * 14}, 280 ${170 + i * 14}, 420 ${100 + i * 14}`} strokeOpacity={0.15 + i * 0.12} />
          ))}
        </g>
      )}
      {type === 'rings' && (
        <g {...common} strokeWidth={1}>
          {[24, 48, 74, 102, 132].map((r, i) => (
            <circle key={r} cx={315} cy={112} r={r} strokeOpacity={0.6 - i * 0.1} />
          ))}
          <circle cx={315} cy={112} r={6} fill={color} stroke="none" />
        </g>
      )}
      {type === 'dots' && (
        <g fill={color}>
          {Array.from({ length: 7 * 11 }).map((_, i) => {
            const x = 200 + (i % 11) * 20
            const y = 30 + Math.floor(i / 11) * 26
            const o = ((i * 37) % 10) / 14 + 0.08
            return <circle key={i} cx={x} cy={y} r={2.2} fillOpacity={o} />
          })}
        </g>
      )}
    </svg>
  )
}

/** Designed, per-project cover art. Always dark so it reads as a "screen" on any page. */
export default function ProjectCover({ p, size = 'card', className = '' }: { p: Project; size?: 'card' | 'hero'; className?: string }) {
  const Icon = icons[p.cover.icon]
  const hero = size === 'hero'
  return (
    <div
      className={`relative isolate overflow-hidden bg-[#0A0B0F] ${className}`}
      style={{
        backgroundImage: `radial-gradient(90% 120% at 0% 0%, ${p.cover.from}40, transparent 55%), radial-gradient(80% 100% at 100% 100%, ${p.cover.to}33, transparent 60%)`,
      }}
    >
      <div aria-hidden className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:28px_28px]" />
      <Pattern type={p.cover.pattern} color={p.cover.to} />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />
      <div className={`relative flex h-full flex-col justify-between ${hero ? 'p-8 sm:p-12' : 'p-6'}`}>
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/80 backdrop-blur">
            {projectGroups[p.group]}
          </span>
          {p.year && <span className="font-mono text-[11px] text-white/50">{p.year}</span>}
        </div>
        <div className="flex items-end justify-between gap-4">
          <span
            className={`grid place-items-center rounded-2xl border border-white/15 text-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)] backdrop-blur ${hero ? 'h-20 w-20' : 'h-14 w-14'}`}
            style={{ background: `linear-gradient(135deg, ${p.cover.from}cc, ${p.cover.to}99)` }}
          >
            <Icon size={hero ? 34 : 24} strokeWidth={1.6} aria-hidden />
          </span>
          <div className="text-right">
            <p className={`font-syne font-extrabold leading-none text-white ${hero ? 'text-[clamp(32px,4vw,52px)]' : 'text-[26px]'}`}>{p.metric.value}</p>
            <p className={`mt-1.5 max-w-[220px] font-dm leading-snug text-white/65 ${hero ? 'text-sm' : 'text-[12px]'}`}>{p.metric.label}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
