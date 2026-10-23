import Link from 'next/link'
import { Github, Linkedin, Mail, Twitter, ArrowUpRight } from 'lucide-react'
import Container from './Container'
import Logo from './Logo'
import { siteConfig } from '@/lib/site'
import { services } from '@/lib/services'

export default function Footer() {
  const socials = [
    { href: siteConfig.socials.github, label: 'GitHub', icon: <Github size={15} /> },
    { href: siteConfig.socials.linkedin, label: 'LinkedIn', icon: <Linkedin size={15} /> },
    { href: siteConfig.socials.x, label: 'X / Twitter', icon: <Twitter size={15} /> },
    { href: `mailto:${siteConfig.email}`, label: 'Email', icon: <Mail size={15} /> },
  ].filter(s => s.href)

  return (
    <footer className="relative border-t border-line bg-ink-2">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="max-w-xs font-dm text-sm leading-relaxed text-fg-2">
              AI development agency building RAG chatbots, AI agents, GPU model deployments and AI SaaS products, from first call to production.
            </p>
            <div className="flex gap-2">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="grid h-9 w-9 place-items-center rounded-full border border-line-2 text-fg-2 transition-colors hover:border-gold/60 hover:text-gold"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-fg-3">Services</h2>
            <ul className="flex flex-col gap-2.5">
              {services.map(s => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="font-dm text-sm text-fg-2 transition-colors hover:text-fg">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-fg-3">Company</h2>
            <ul className="flex flex-col gap-2.5">
              {[
                { l: 'About', h: '/about' },
                { l: 'Selected work', h: '/#work' },
                { l: 'Process', h: '/#process' },
                { l: 'Contact', h: '/contact' },
                { l: 'Client login', h: '/auth/login' },
              ].map(i => (
                <li key={i.h}>
                  <Link href={i.h} className="font-dm text-sm text-fg-2 transition-colors hover:text-fg">
                    {i.l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-fg-3">Start a project</h2>
            <a href={`mailto:${siteConfig.email}`} className="font-dm text-sm text-fg transition-colors hover:text-gold">
              {siteConfig.email}
            </a>
            <p className="mt-2 font-dm text-sm text-fg-3">{siteConfig.responseTime}</p>
            <Link href="/contact" className="mt-5 inline-flex items-center gap-1.5 font-dm text-sm font-semibold text-gold hover:text-gold-2">
              Get a fixed quote <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
          <p className="font-dm text-xs text-fg-3">© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex items-center gap-5 font-dm text-xs text-fg-3">
            <Link href="/legal/privacy" className="hover:text-fg">Privacy</Link>
            <Link href="/legal/terms" className="hover:text-fg">Terms</Link>
            <span className="flex items-center gap-2"><span className="status-dot" /> Taking new projects</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}
