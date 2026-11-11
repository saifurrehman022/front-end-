'use client'
import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import ProjectCard from '@/components/sections/ProjectCard'
import { projectGroups, type Project, type ProjectGroup } from '@/lib/projects'

type Filter = 'all' | ProjectGroup

export default function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>('all')
  const reduce = useReducedMotion()
  const tabs: { id: Filter; label: string; count: number }[] = useMemo(
    () => [
      { id: 'all', label: 'All work', count: projects.length },
      ...(Object.keys(projectGroups) as ProjectGroup[]).map(g => ({ id: g, label: projectGroups[g], count: projects.filter(p => p.group === g).length })),
    ],
    [projects],
  )
  const list = filter === 'all' ? projects : projects.filter(p => p.group === filter)

  return (
    <>
      <div role="tablist" aria-label="Filter projects" className="flex flex-wrap gap-2">
        {tabs.map(t => (
          <button
            key={t.id}
            role="tab"
            aria-selected={filter === t.id}
            onClick={() => setFilter(t.id)}
            className={cn(
              'relative flex items-center gap-2 rounded-full border px-5 py-2.5 font-dm text-sm font-semibold transition-colors',
              filter === t.id ? 'border-fg bg-fg text-ink' : 'border-line-2 text-fg-2 hover:border-fg/40 hover:text-fg',
            )}
          >
            {t.label}
            <span className={cn('rounded-full px-2 py-0.5 font-mono text-[11px]', filter === t.id ? 'bg-ink/15 text-ink' : 'bg-fg/[0.06] text-fg-3')}>{t.count}</span>
          </button>
        ))}
      </div>

      <motion.ul layout={!reduce} className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map(p => (
            <motion.li
              key={p.slug}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard p={p} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  )
}
