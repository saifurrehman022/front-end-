import Link from 'next/link'
import { Zap, Twitter, Github, Linkedin, Mail } from 'lucide-react'
import Container from './Container'

const cols = [
  { title: 'Company',   links: [{l:'About Us',h:'/about'},{l:'Careers',h:'/careers'},{l:'Blog',h:'/blog'},{l:'Contact',h:'/contact'}] },
  { title: 'Solutions', links: [{l:'RAG Chat',h:'/services#rag'},{l:'AI Consulting',h:'/services#consulting'},{l:'AI Audit',h:'/services#audit'},{l:'Enterprise API',h:'/services#api'}] },
  { title: 'Resources', links: [{l:'Documentation',h:'/docs'},{l:'API Reference',h:'/docs/api'},{l:'Changelog',h:'/changelog'},{l:'Status',h:'/status'}] },
  { title: 'Legal',     links: [{l:'Privacy Policy',h:'/legal/privacy'},{l:'Terms of Service',h:'/legal/terms'},{l:'Cookies',h:'/legal/cookies'},{l:'Security',h:'/security'}] },
]

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#e0e0e0]">
      <Container className="py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-14">
          {/* Brand */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-2.5 w-fit">
              <div className="w-8 h-8 rounded-xl bg-black flex items-center justify-center">
                <Zap size={15} className="text-[#E8C547]" fill="#E8C547" />
              </div>
              <span className="font-syne font-bold text-[17px] text-black">EchoLoft<span className="text-[#999] text-xs font-dm ml-0.5">AI</span></span>
            </Link>
            <p className="text-sm text-[#555] font-dm leading-relaxed">Intelligent RAG-powered chat for modern enterprises. Build smarter workflows with AI.</p>
            <div className="flex gap-2">
              {[{icon:<Twitter size={14}/>,h:'#'},{icon:<Github size={14}/>,h:'#'},{icon:<Linkedin size={14}/>,h:'#'},{icon:<Mail size={14}/>,h:'/contact'}].map((s,i)=>(
                <a key={i} href={s.h} className="w-9 h-9 rounded-full bg-[#f7f7f7] border border-[#e0e0e0] flex items-center justify-center text-[#999] hover:text-black hover:border-black transition-all">{s.icon}</a>
              ))}
            </div>
          </div>
          {cols.map(col => (
            <div key={col.title} className="flex flex-col gap-4">
              <h4 className="font-dm font-semibold text-[11px] text-[#999] uppercase tracking-[0.18em]">{col.title}</h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map(link => (
                  <li key={link.h}><Link href={link.h} className="text-[14px] text-[#555] hover:text-black font-dm transition-colors">{link.l}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-[#e0e0e0] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#999] font-dm">© {new Date().getFullYear()} EchoLoft AI. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="status-dot" />
            <span className="text-xs text-[#999] font-dm">All systems operational</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}
