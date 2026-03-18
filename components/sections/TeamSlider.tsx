'use client'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Linkedin, Twitter, Github } from 'lucide-react'
import { cn } from '@/lib/utils'
import Container from '@/components/layout/Container'

const team = [
  {
    name: 'Aria Chen',
    role: 'CEO & Co-Founder',
    bio: 'Ex-Google Brain. 10+ years in large-scale ML systems. Passionate about democratizing AI for every enterprise team.',
    initials: 'AC',
    color: 'from-accent to-accent-2',
    linkedin: '#',
    twitter: '#',
    github: '#',
  },
  {
    name: 'Marcus Webb',
    role: 'CTO & Co-Founder',
    bio: 'Former Principal Engineer at Anthropic. Specializes in low-latency inference infrastructure and RAG architectures.',
    initials: 'MW',
    color: 'from-accent-2 to-purple-500',
    linkedin: '#',
    twitter: '#',
    github: '#',
  },
  {
    name: 'Priya Nair',
    role: 'Head of AI Research',
    bio: 'PhD in NLP from MIT. Published researcher in retrieval-augmented systems, embedding optimization, and model alignment.',
    initials: 'PN',
    color: 'from-accent-3 to-teal-400',
    linkedin: '#',
    twitter: '#',
    github: '#',
  },
  {
    name: 'Dmitri Volkov',
    role: 'VP of Engineering',
    bio: 'Built distributed systems at Stripe and MongoDB. Obsessed with sub-100ms APIs and zero-downtime deployments.',
    initials: 'DV',
    color: 'from-orange-400 to-accent',
    linkedin: '#',
    twitter: '#',
    github: '#',
  },
]

export default function TeamSlider() {
  const [active, setActive] = useState(0)
  const prev = () => setActive(i => (i - 1 + team.length) % team.length)
  const next = () => setActive(i => (i + 1) % team.length)
  const visible = [
    team[(active) % team.length],
    team[(active + 1) % team.length],
    team[(active + 2) % team.length],
    team[(active + 3) % team.length],
  ]

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <Container className="relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-14 gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-accent font-dm mb-3">The People</p>
            <h2 className="font-syne font-extrabold text-4xl lg:text-5xl text-text-primary">
              Meet the <span className="gradient-text">team</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={prev} className="w-11 h-11 rounded-xl bg-surface border border-[var(--border)] flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-accent/40 hover:bg-surface-2 transition-all duration-200" aria-label="Previous">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-1.5">
              {team.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} className={cn('h-1.5 rounded-full transition-all duration-300', i === active ? 'w-8 bg-accent' : 'w-1.5 bg-surface-2 hover:bg-text-muted')} />
              ))}
            </div>
            <button onClick={next} className="w-11 h-11 rounded-xl bg-surface border border-[var(--border)] flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-accent/40 hover:bg-surface-2 transition-all duration-200" aria-label="Next">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {visible.map((member, i) => (
            <div key={member.name + i} className="bg-surface border border-[var(--border)] rounded-2xl p-6 flex flex-col gap-5 transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/8 hover:-translate-y-1 group">
              <div className="relative w-fit">
                <div className={cn('w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg', member.color)}>
                  <span className="font-syne font-bold text-xl text-white">{member.initials}</span>
                </div>
                <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full bg-accent-3 border-2 border-surface" />
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-syne font-bold text-lg text-text-primary leading-tight">{member.name}</h3>
                <p className="text-xs font-dm text-accent font-medium">{member.role}</p>
              </div>
              <p className="text-sm text-text-secondary font-dm leading-relaxed flex-1">{member.bio}</p>
              <div className="flex items-center gap-2 pt-2 border-t border-[var(--border-2)]">
                <a href={member.linkedin} className="p-2 rounded-lg text-text-muted hover:text-[#0a66c2] hover:bg-[#0a66c2]/10 transition-all"><Linkedin size={15} /></a>
                <a href={member.twitter} className="p-2 rounded-lg text-text-muted hover:text-[#1da1f2] hover:bg-[#1da1f2]/10 transition-all"><Twitter size={15} /></a>
                <a href={member.github} className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-2 transition-all"><Github size={15} /></a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
