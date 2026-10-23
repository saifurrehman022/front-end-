import { Brain, Bot, Server, ImageIcon, Rocket, Plug, Compass } from 'lucide-react'
import type { ServiceIcon as IconName } from '@/lib/services'

const map = { brain: Brain, bot: Bot, server: Server, image: ImageIcon, rocket: Rocket, plug: Plug, compass: Compass }

export default function ServiceIcon({ name, size = 20 }: { name: IconName; size?: number }) {
  const Icon = map[name]
  return <Icon size={size} strokeWidth={1.8} aria-hidden />
}
