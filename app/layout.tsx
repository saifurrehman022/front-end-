import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import './globals.css'
import ConditionalLayout from '@/components/layout/ConditionalLayout'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'EchoLoft AI — Intelligent RAG Chat for Enterprise',
  description: 'Build smarter workflows with AI. RAG-powered chat, document intelligence, and real-time web search — all in one platform.',
  keywords: ['AI', 'RAG', 'enterprise chat', 'document AI', 'LLM', 'Groq'],
  openGraph: {
    title: 'EchoLoft AI',
    description: 'Intelligent RAG-powered chat for modern enterprises.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body className="noise">
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  )
}