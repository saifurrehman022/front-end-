import { Brain, Workflow, Server, ImageIcon, Rocket, Plug, Compass, Bot, Cpu, Wifi, CircuitBoard } from 'lucide-react'
import type { ServiceIcon as IconName } from '@/lib/services'

const map = { brain: Brain, bot: Workflow, server: Server, image: ImageIcon, rocket: Rocket, plug: Plug, compass: Compass, robot: Bot, cpu: Cpu, wifi: Wifi, circuit: CircuitBoard }

export default function ServiceIcon({ name, size = 20 }: { name: IconName; size?: number }) {
  const Icon = map[name]
  return <Icon size={size} strokeWidth={1.8} aria-hidden />
}
