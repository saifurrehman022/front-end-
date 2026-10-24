import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import Container from '@/components/layout/Container'
import { Reveal } from '@/components/motion/Motion'
import { LoopVideo } from '@/components/media/Video'
import { videos } from '@/lib/media'
import { hardware } from '@/lib/content'

export default function RoboticsSection() {
  return (
    <section id="robotics" className="section scroll-mt-28 overflow-hidden border-y border-line bg-ink-2/60">
      <Container>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <p className="eyebrow mb-5">Robotics & IoT</p>
            <h2 className="h-display text-[clamp(34px,5vw,58px)] leading-[1.02]">
              Hardware that <span className="text-gradient">works in the real world.</span>
            </h2>
            <p className="mt-6 max-w-xl font-dm text-[17px] leading-relaxed text-fg-2">
              We design robots, sensor networks and embedded devices with Raspberry Pi, Arduino and ESP32, write the firmware, and connect
              them to cloud dashboards and AI. Prototypes that move, measure and report, built to keep running after the demo.
            </p>
            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {['Motor control & motion', 'Computer vision on the edge', 'Wi-Fi / BLE / MQTT telemetry', 'OTA firmware updates', 'Live web dashboards', 'Schematics & documentation'].map(i => (
                <li key={i} className="flex items-center gap-3 font-dm text-[15px] text-fg-2">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold/15 text-gold"><Check size={12} strokeWidth={3} /></span>
                  {i}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/services/robotics-development" className="btn-primary group">
                Robotics services <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/services/esp32-iot-development" className="btn-ghost">ESP32 & IoT</Link>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative">
              <div className="relative overflow-hidden rounded-[28px] border border-line-2 shadow-[0_40px_120px_-30px_rgba(110,231,249,0.25)]">
                <LoopVideo src={videos.robot} className="aspect-video w-full object-cover" label="Animation of a robotic arm scanning objects" />
                <span className="absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-gold backdrop-blur">Robotics</span>
              </div>
              <div className="relative -mt-16 ml-auto w-[70%] overflow-hidden rounded-[22px] border border-line-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] sm:-mt-24 sm:w-[62%]">
                <LoopVideo src={videos.iot} className="aspect-video w-full object-cover" label="Animation of ESP32, Raspberry Pi and Arduino devices streaming data to a dashboard" />
                <span className="absolute left-3 top-3 rounded-full bg-ink/70 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-cyan backdrop-blur">IoT telemetry</span>
              </div>
            </div>
          </Reveal>
        </div>

        <ul className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {hardware.map((h, i) => (
            <Reveal as="li" key={h.name} delay={i * 0.05}>
              <div className="glass h-full rounded-2xl p-5 transition-colors hover:border-gold/40">
                <p className="font-syne text-base font-bold text-fg">{h.name}</p>
                <p className="mt-1 font-dm text-[13px] text-fg-3">{h.desc}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}
