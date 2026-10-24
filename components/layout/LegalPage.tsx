import Container from './Container'

export default function LegalPage({ title, updated, sections }: { title: string; updated: string; sections: { h: string; p: string }[] }) {
  return (
    <section className="pb-24 pt-36 lg:pt-52">
      <Container size="sm">
        <p className="eyebrow mb-5">Legal</p>
        <h1 className="h-display text-[clamp(36px,5vw,56px)]">{title}</h1>
        <p className="mt-3 font-dm text-sm text-fg-3">Last updated: {updated}</p>
        <div className="mt-12 flex flex-col gap-10">
          {sections.map(s => (
            <div key={s.h}>
              <h2 className="font-syne text-xl font-bold text-fg">{s.h}</h2>
              <p className="mt-3 font-dm text-[16px] leading-relaxed text-fg-2">{s.p}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
