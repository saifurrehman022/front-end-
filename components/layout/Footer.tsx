import Link from 'next/link'
import { Zap, Twitter, Github, Linkedin, Mail } from 'lucide-react'
import Container from './Container'

const footerCols = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Blog', href: '/blog' },
      { label: 'Press Kit', href: '/press' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'RAG Chat', href: '/services#rag' },
      { label: 'AI Consulting', href: '/services#consulting' },
      { label: 'Model Fine-tuning', href: '/services#finetuning' },
      { label: 'Enterprise API', href: '/services#api' },
      { label: 'Integrations', href: '/services#integrations' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'API Reference', href: '/docs/api' },
      { label: 'Changelog', href: '/changelog' },
      { label: 'Status Page', href: '/status' },
      { label: 'Community', href: '/community' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/legal/privacy' },
      { label: 'Terms of Service', href: '/legal/terms' },
      { label: 'Cookie Policy', href: '/legal/cookies' },
      { label: 'GDPR', href: '/legal/gdpr' },
      { label: 'Security', href: '/security' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-bg-2">
      <Container className="py-16">
        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-2.5 w-fit">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shadow-lg shadow-accent/30">
                <Zap size={16} className="text-white" />
              </div>
              <span className="font-syne font-bold text-lg text-text-primary">
                Echo<span className="text-accent">Loft</span>
                <span className="text-accent-3 text-xs ml-0.5">AI</span>
              </span>
            </Link>
            <p className="text-sm text-text-secondary font-dm leading-relaxed">
              Intelligent RAG-powered chat for modern enterprises. Build smarter workflows with AI.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: <Twitter size={16} />, href: '#' },
                { icon: <Github size={16} />, href: '#' },
                { icon: <Linkedin size={16} />, href: '#' },
                { icon: <Mail size={16} />, href: '/contact' },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="w-9 h-9 rounded-xl bg-surface border border-[var(--border)] flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/40 transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerCols.map(col => (
            <div key={col.title} className="flex flex-col gap-4">
              <h4 className="font-syne font-semibold text-sm text-text-primary uppercase tracking-widest">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-text-primary font-dm transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[var(--border-2)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted font-dm">
            © {new Date().getFullYear()} EchoLoft AI. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-accent-3 animate-pulse" />
            <span className="text-xs text-text-muted font-dm">All systems operational</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}
