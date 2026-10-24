import Link from 'next/link'
import { Github, Linkedin, Mail, Twitter, Youtube, ArrowUpRight, Rss } from 'lucide-react'
import Container from './Container'
import Logo from './Logo'
import { siteConfig } from '@/lib/site'
import { servicesBy } from '@/lib/services'

const linkCls = 'font-dm text-sm text-fg-2 transition-colors hover:text-fg'
const headCls = 'mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-fg-3'

export default function Footer() {
  const s = siteConfig.socials
  const socials = [
    { href: s.github, label: 'GitHub', icon: <Github size={15} /> },
    { href: s.linkedin, label: 'LinkedIn', icon: <Linkedin size={15} /> },
    { href: s.x, label: 'X / Twitter', icon: <Twitter size={15} /> },
    { href: s.youtube, label: 'YouTube', icon: <Youtube size={15} /> },
    { href: `mailto:${siteConfig.email}`, label: 'Email', icon: <Mail size={15} /> },
    { href: '/feed.xml', label: 'RSS feed', icon: <Rss size={15} /> },
  ].filter(x => x.href)

  return (
    <footer className="relative border-t border-line bg-ink-2">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_0.8fr_1fr]">
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="max-w-xs font-dm text-sm leading-relaxed text-fg-2">
              {siteConfig.name} builds AI software and smart machines: chatbots, agents and GPU pipelines, plus robots and IoT devices on Raspberry Pi, Arduino and ESP32.
            </p>
            <div className="flex flex-wrap gap-2">
              {socials.map(x => (
                <a key={x.label} href={x.href} aria-label={x.label} target={x.href.startsWith('http') ? '_blank' : undefined} rel={x.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="grid h-9 w-9 place-items-center rounded-full border border-line-2 text-fg-2 transition-colors hover:border-gold/60 hover:text-gold">
                  {x.icon}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h2 className={headCls}>AI & Software</h2>
            <ul className="flex flex-col gap-2.5">{servicesBy('ai').map(x => <li key={x.slug}><Link href={`/services/${x.slug}`} className={linkCls}>{x.name}</Link></li>)}</ul>
          </div>
          <div>
            <h2 className={headCls}>Robotics & IoT</h2>
            <ul className="flex flex-col gap-2.5">{servicesBy('robotics').map(x => <li key={x.slug}><Link href={`/services/${x.slug}`} className={linkCls}>{x.name}</Link></li>)}</ul>
          </div>
          <div>
            <h2 className={headCls}>Company</h2>
            <ul className="flex flex-col gap-2.5">
              {[['About', '/about'], ['Projects', '/projects'], ['Blog', '/blog'], ['Contact', '/contact'], ['Sign in', '/auth/login'], ['Create account', '/auth/signup']].map(([l, h]) => (
                <li key={h}><Link href={h} className={linkCls}>{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className={headCls}>Start a project</h2>
            <a href={`mailto:${siteConfig.email}`} className="font-dm text-sm text-fg transition-colors hover:text-gold">{siteConfig.email}</a>
            {siteConfig.phone && <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="mt-2 block font-dm text-sm text-fg hover:text-gold">{siteConfig.phone}</a>}
            <p className="mt-2 font-dm text-sm text-fg-3">{siteConfig.responseTime}</p>
            <p className="mt-1 font-dm text-sm text-fg-3">{siteConfig.location}</p>
            <Link href="/contact" className="mt-5 inline-flex items-center gap-1.5 font-dm text-sm font-semibold text-gold hover:text-gold-2">Get a fixed quote <ArrowUpRight size={14} /></Link>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
          <p className="font-dm text-xs text-fg-3">© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex items-center gap-5 font-dm text-xs text-fg-3">
            <Link href="/legal/privacy" className="hover:text-fg">Privacy</Link>
            <Link href="/legal/terms" className="hover:text-fg">Terms</Link>
            <Link href="/sitemap.xml" className="hover:text-fg">Sitemap</Link>
            <span className="flex items-center gap-2"><span className="status-dot" /> Taking new projects</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}
