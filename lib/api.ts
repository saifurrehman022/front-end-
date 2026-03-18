import { API_BASE, getToken } from './utils'

export interface RegisterPayload {
  username: string
  email: string
  company?: string
  password: string
}

export interface LoginPayload {
  username: string
  password: string
}

export interface TokenResponse {
  access_token: string
  token_type: string
  refresh_token: string
  expires_in: number
}

export interface UserPublic {
  username: string
  email: string
  company: string
  created_at: string
}

export interface Message {
  role: 'user' | 'assistant'
  content: string
}

export interface Conversation {
  id: string
  user_id: string
  messages: Message[]
  created_at: string
}

const authHeader = () => ({
  Authorization: `Bearer ${getToken()}`,
})

export const authApi = {
  async register(data: RegisterPayload): Promise<UserPublic> {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw await res.json()
    return res.json()
  },

  async login(data: LoginPayload): Promise<TokenResponse> {
    const form = new URLSearchParams()
    form.append('username', data.username)
    form.append('password', data.password)
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: form.toString(),
    })
    if (!res.ok) throw await res.json()
    return res.json()
  },

  async refresh(refreshToken: string): Promise<TokenResponse> {
    const res = await fetch(`${API_BASE}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    })
    if (!res.ok) throw await res.json()
    return res.json()
  },

  async logout(refreshToken: string): Promise<void> {
    await fetch(`${API_BASE}/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    })
  },

  async profile(): Promise<UserPublic> {
    const res = await fetch(`${API_BASE}/auth/profile`, {
      headers: authHeader() as HeadersInit,
    })
    if (!res.ok) throw await res.json()
    return res.json()
  },
}

export const ragApi = {
  async createConversation(): Promise<{ conversation_id: string }> {
    const res = await fetch(`${API_BASE}/rag/conversations`, {
      method: 'POST',
      headers: authHeader() as HeadersInit,
    })
    if (!res.ok) throw await res.json()
    return res.json()
  },

  async getConversation(id: string): Promise<Conversation> {
    const res = await fetch(`${API_BASE}/rag/conversations/${id}`, {
      headers: authHeader() as HeadersInit,
    })
    if (!res.ok) throw await res.json()
    return res.json()
  },

  async sendMessage(
    convId: string,
    model: string,
    message: string,
    enableWebSearch: boolean,
    files?: File[]
  ): Promise<ReadableStream<Uint8Array>> {
    const form = new FormData()
    form.append('model', model)
    form.append('message', message)
    form.append('enable_web_search', String(enableWebSearch))
    if (files) files.forEach(f => form.append('files', f))
    const res = await fetch(`${API_BASE}/rag/conversations/${convId}/messages`, {
      method: 'POST',
      headers: authHeader() as HeadersInit,
      body: form,
    })
    if (!res.ok) throw await res.json()
    return res.body!
  },
}
