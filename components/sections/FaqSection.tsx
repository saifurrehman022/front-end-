import Container from '@/components/layout/Container'
import JsonLd from '@/components/seo/JsonLd'
import { faqSchema } from '@/lib/seo'
import SectionHeading from './SectionHeading'

export default function FaqSection({ faqs, title = 'Questions clients', accent = 'ask first.' }: { faqs: { q: string; a: string }[]; title?: string; accent?: string }) {
  return (
    <section id="faq" className="section border-t border-line">
      <JsonLd data={faqSchema(faqs)} />
      <Container size="md">
        <SectionHeading eyebrow="FAQ" title={title} accent={accent} center />
        <div className="mt-14 divide-y divide-line border-y border-line">
          {faqs.map(f => (
            <details key={f.q} className="group py-2 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-syne text-lg font-semibold text-fg sm:text-xl">
                <h3 className="font-syne">{f.q}</h3>
                <span aria-hidden className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line-2 text-fg-2 transition-all duration-300 group-open:rotate-45 group-open:border-gold group-open:text-gold">+</span>
              </summary>
              <p className="pb-6 pr-12 font-dm text-[16px] leading-relaxed text-fg-2">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  )
}
