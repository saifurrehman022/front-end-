'use client'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import {
  MessageSquare, Plus, Send, Upload, Globe, Zap,
  LogOut, Loader2, X, Brain, Menu
} from 'lucide-react'
import { authApi, ragApi, type UserPublic, type Message } from '@/lib/api'
import { getToken, clearTokens } from '@/lib/utils'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import Badge from '@/components/ui/Badge'

const MODELS = [
  { id: 'llama-3.1-8b-instant', label: 'Llama 3.1 8B' },
  { id: 'meta-llama/llama-4-maverick-17b-128e-instruct', label: 'Llama 4' },
  { id: 'moonshotai/kimi-k2-instruct', label: 'Kimi K2' },
  { id: 'qwen/qwen3-32b', label: 'Qwen3' },
  { id: 'groq/compound', label: 'Compound' },
]

function parseThinking(raw: string): { thinking: string; answer: string; isThinking: boolean } {
  const complete = raw.match(/^<think>([\s\S]*?)<\/think>\s*/i)
  if (complete) {
    return { thinking: complete[1].trim(), answer: raw.slice(complete[0].length).trim(), isThinking: false }
  }
  if (raw.trimStart().startsWith('<think>') && !raw.includes('</think>')) {
    return { thinking: raw.replace(/^<think>/i, '').trim(), answer: '', isThinking: true }
  }
  return { thinking: '', answer: raw, isThinking: false }
}

interface DisplayMessage extends Message {
  thinking?: string
  isThinking?: boolean
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserPublic | null>(null)
  const [convId, setConvId] = useState<string | null>(null)
  const [messages, setMessages] = useState<DisplayMessage[]>([])
  const [input, setInput] = useState('')
  const [model, setModel] = useState(MODELS[0].id)
  const [webSearch, setWebSearch] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [streaming, setStreaming] = useState(false)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [conversations, setConversations] = useState<{ id: string; preview: string }[]>([])
  const [expandedThinking, setExpandedThinking] = useState<number[]>([])
  const bottomRef = useRef<HTMLDivElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!getToken()) { router.push('/auth/login'); return }
    authApi.profile()
      .then(u => { setUser(u); setLoading(false) })
      .catch(() => { clearTokens(); router.push('/auth/login') })
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Close sidebar on mobile when clicking outside
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setSidebarOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const newConversation = async () => {
    const { conversation_id } = await ragApi.createConversation()
    setConvId(conversation_id)
    setMessages([])
    setConversations(prev => [{ id: conversation_id, preview: 'New conversation' }, ...prev])
    setSidebarOpen(false)
    return conversation_id
  }

  const logout = async () => {
    const rt = localStorage.getItem('refresh_token')
    if (rt) await authApi.logout(rt).catch(() => {})
    clearTokens()
    router.push('/')
  }

  const send = async () => {
    if (!input.trim() || streaming) return
    let cid = convId
    if (!cid) {
      try { cid = await newConversation() } catch { return }
    }
    if (!cid) return

    const sentInput = input.trim()
    setMessages(prev => [...prev, { role: 'user', content: sentInput }])
    setInput('')
    setStreaming(true)
    setMessages(prev => [...prev, { role: 'assistant', content: '', thinking: '', isThinking: false }])

    try {
      const stream = await ragApi.sendMessage(cid, model, sentInput, webSearch, files.length ? files : undefined)
      const reader = stream.getReader()
      const decoder = new TextDecoder()
      let raw = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        raw += decoder.decode(value, { stream: true })
        const { thinking, answer, isThinking } = parseThinking(raw)
        setMessages(prev => {
          const updated = [...prev]
          updated[updated.length - 1] = { role: 'assistant', content: answer, thinking, isThinking }
          return updated
        })
      }

      const { thinking, answer } = parseThinking(raw)
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = { role: 'assistant', content: answer || raw, thinking, isThinking: false }
        return updated
      })
      setConversations(prev => prev.map(c => c.id === cid ? { ...c, preview: sentInput.slice(0, 40) } : c))
      setFiles([])
    } catch {
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = { role: 'assistant', content: 'Something went wrong. Please try again.' }
        return updated
      })
    } finally {
      setStreaming(false)
    }
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  const toggleThinking = (i: number) => {
    setExpandedThinking(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <Loader2 size={32} className="text-accent animate-spin" />
      </div>
    )
  }

  return (
    <div className="h-screen flex bg-bg overflow-hidden relative">

      {/* Mobile overlay backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — overlay on mobile, fixed on desktop */}
      <aside className={cn(
        'flex flex-col border-r border-[var(--border)] bg-bg-2 transition-all duration-300 shrink-0 z-30',
        // Mobile: fixed overlay, slides in/out
        'fixed md:relative inset-y-0 left-0',
        sidebarOpen ? 'w-72 md:w-64' : 'w-0 md:w-0',
        'overflow-hidden'
      )}>
        {/* Logo */}
        <div className="p-4 border-b border-[var(--border)] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center shadow-lg shadow-accent/30">
              <Zap size={13} className="text-white" />
            </div>
            <span className="font-syne font-bold text-base text-text-primary">
              EchoLoft<span className="text-accent-3 text-xs">AI</span>
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface transition-colors md:hidden"
          >
            <X size={16} />
          </button>
        </div>

        {/* New chat */}
        <div className="p-3 shrink-0">
          <Button variant="primary" size="sm" onClick={newConversation} className="w-full">
            <Plus size={15} /> New Chat
          </Button>
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-1">
          {conversations.length === 0 ? (
            <p className="text-xs text-text-muted font-dm text-center py-8 px-4">No conversations yet.</p>
          ) : (
            conversations.map(c => (
              <button
                key={c.id}
                onClick={() => { setConvId(c.id); setSidebarOpen(false) }}
                className={cn(
                  'w-full text-left px-3 py-2.5 rounded-xl text-sm font-dm transition-all',
                  convId === c.id
                    ? 'bg-accent/10 text-accent border border-accent/20'
                    : 'text-text-secondary hover:bg-surface hover:text-text-primary'
                )}
              >
                <div className="flex items-center gap-2">
                  <MessageSquare size={13} className="shrink-0" />
                  <span className="truncate">{c.preview}</span>
                </div>
              </button>
            ))
          )}
        </div>

        {/* User info */}
        <div className="p-3 border-t border-[var(--border)] shrink-0">
          <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface transition-colors group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent-2 flex items-center justify-center text-white font-syne font-bold text-xs shrink-0">
              {user?.username[0]?.toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-dm font-medium text-text-primary truncate">{user?.username}</p>
              <p className="text-xs text-text-muted truncate">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              className="p-1 text-text-muted hover:text-red-400 transition-all"
              title="Logout"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0 w-full">

        {/* Topbar */}
        <header className="h-14 border-b border-[var(--border)] flex items-center gap-2 px-3 bg-bg-2/50 backdrop-blur shrink-0">
          {/* Hamburger — always visible */}
          <button
            onClick={() => setSidebarOpen(p => !p)}
            className="p-2 rounded-xl text-text-muted hover:text-text-primary hover:bg-surface transition-colors shrink-0"
          >
            <Menu size={17} />
          </button>

          {/* Model selector — truncated on mobile */}
          <select
            value={model}
            onChange={e => setModel(e.target.value)}
            className="flex-1 min-w-0 bg-surface border border-[var(--border)] rounded-xl px-2 py-1.5 text-xs font-dm text-text-secondary focus:outline-none focus:border-accent hover:border-accent/40 transition-colors truncate"
          >
            {MODELS.map(m => (
              <option key={m.id} value={m.id}>{m.label}</option>
            ))}
          </select>

          {/* Web search toggle */}
          <button
            onClick={() => setWebSearch(p => !p)}
            className={cn(
              'flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-dm border transition-all shrink-0',
              webSearch
                ? 'bg-accent-3/10 border-accent-3/30 text-[#38d9a9]'
                : 'bg-surface border-[var(--border)] text-text-muted hover:text-text-primary'
            )}
          >
            <Globe size={13} />
            <span className="hidden sm:inline">{webSearch ? 'ON' : 'Web'}</span>
          </button>

          {/* Upload */}
          <button
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-dm border bg-surface border-[var(--border)] text-text-muted hover:text-text-primary hover:border-accent/40 transition-all shrink-0 relative"
          >
            <Upload size={13} />
            <span className="hidden sm:inline">Upload</span>
            {files.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-accent text-white text-[9px] flex items-center justify-center font-dm font-bold">
                {files.length}
              </span>
            )}
          </button>
          <input
            ref={fileRef}
            type="file"
            multiple
            accept=".pdf,.docx,.xlsx,.csv,.jpg,.jpeg,.png"
            className="hidden"
            onChange={e => setFiles(Array.from(e.target.files || []))}
          />
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-4 sm:py-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-4 text-center max-w-lg mx-auto px-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-accent/15 border border-accent/25 flex items-center justify-center">
                <Zap size={24} className="text-accent" />
              </div>
              <div>
                <h2 className="font-syne font-bold text-xl sm:text-2xl text-text-primary mb-2">
                  How can I help today?
                </h2>
                <p className="text-text-secondary font-dm text-sm">
                  Ask anything, upload documents, or enable web search.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 w-full">
                {[
                  'Summarize a PDF',
                  'Research a topic',
                  'Analyze data',
                  'Answer from docs',
                ].map(s => (
                  <button
                    key={s}
                    onClick={() => setInput(s)}
                    className="p-3 bg-surface border border-[var(--border)] rounded-xl text-xs sm:text-sm font-dm text-text-secondary hover:text-text-primary hover:border-accent/40 hover:bg-surface-2 transition-all text-left"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto flex flex-col gap-4 sm:gap-6">
              {messages.map((msg, i) => (
                <div key={i} className={cn('flex gap-2 sm:gap-3', msg.role === 'user' ? 'flex-row-reverse' : 'flex-row')}>
                  {/* Avatar */}
                  <div className={cn(
                    'w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white font-syne font-bold text-xs shrink-0 mt-1',
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-accent to-accent-2'
                      : 'bg-surface border border-[var(--border)]'
                  )}>
                    {msg.role === 'user'
                      ? user?.username[0]?.toUpperCase()
                      : <Zap size={13} className="text-accent" />
                    }
                  </div>

                  <div className="flex flex-col gap-2 max-w-[85%] sm:max-w-[78%] min-w-0">
                    {/* Thinking block */}
                    {msg.role === 'assistant' && msg.thinking && (
                      <div className="rounded-xl border border-[#a78bfa]/20 bg-[#a78bfa]/5 overflow-hidden">
                        <button
                          onClick={() => toggleThinking(i)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-dm text-[#a78bfa] hover:bg-[#a78bfa]/10 transition-colors"
                        >
                          <Brain size={12} className={cn(msg.isThinking && 'animate-pulse')} />
                          {msg.isThinking ? 'Thinking...' : 'View reasoning'}
                          <span className="ml-auto text-[10px] opacity-60">
                            {expandedThinking.includes(i) ? '▲' : '▼'}
                          </span>
                        </button>
                        {expandedThinking.includes(i) && (
                          <div className="px-3 pb-3 pt-2 text-xs text-[#a78bfa]/70 font-dm leading-relaxed whitespace-pre-wrap border-t border-[#a78bfa]/10">
                            {msg.thinking}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Message bubble */}
                    <div className={cn(
                      'rounded-2xl px-4 py-3 text-sm font-dm leading-relaxed whitespace-pre-wrap break-words',
                      msg.role === 'user'
                        ? 'bg-accent text-white rounded-tr-sm'
                        : 'bg-surface border border-[var(--border)] text-text-primary rounded-tl-sm'
                    )}>
                      {msg.role === 'assistant' && !msg.content && streaming && i === messages.length - 1 ? (
                        <span className="inline-flex gap-1 items-center h-4">
                          {[0, 1, 2].map(d => (
                            <span
                              key={d}
                              className="w-1.5 h-1.5 rounded-full bg-accent-2 animate-bounce"
                              style={{ animationDelay: `${d * 0.15}s` }}
                            />
                          ))}
                        </span>
                      ) : msg.content}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        {/* Files strip */}
        {files.length > 0 && (
          <div className="px-3 pb-2 pt-2 flex gap-2 flex-wrap border-t border-[var(--border-2)]">
            {files.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 bg-surface border border-accent/20 text-accent rounded-lg px-2.5 py-1 text-xs font-dm max-w-[150px]"
              >
                <span className="truncate">{f.name}</span>
                <button
                  onClick={() => setFiles(p => p.filter((_, j) => j !== i))}
                  className="hover:text-red-400 transition-colors shrink-0"
                >
                  <X size={10} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Input bar */}
        <div className="p-3 sm:p-4 border-t border-[var(--border)] bg-bg-2/50 backdrop-blur shrink-0">
          <div className="max-w-3xl mx-auto flex items-end gap-2 sm:gap-3">
            <div className="flex-1 bg-surface border border-[var(--border)] rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 focus-within:border-accent/50 transition-colors min-w-0">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask anything..."
                rows={1}
                className="w-full bg-transparent text-text-primary font-dm text-sm placeholder:text-text-muted resize-none focus:outline-none max-h-32 min-h-[20px]"
                onInput={e => {
                  const t = e.target as HTMLTextAreaElement
                  t.style.height = 'auto'
                  t.style.height = Math.min(t.scrollHeight, 128) + 'px'
                }}
              />
            </div>
            <button
              onClick={send}
              disabled={!input.trim() || streaming}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-accent flex items-center justify-center text-white hover:bg-[#5856e8] disabled:opacity-40 disabled:pointer-events-none transition-all shadow-lg shadow-accent/20 shrink-0"
            >
              {streaming
                ? <Loader2 size={16} className="animate-spin" />
                : <Send size={16} />
              }
            </button>
          </div>
          <p className="text-center text-[10px] text-text-muted font-dm mt-1.5">
            EchoLoft AI can make mistakes. Verify important information.
          </p>
        </div>
      </div>
    </div>
  )
}
