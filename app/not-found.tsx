import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center px-6 pt-24 text-center">
      <div aria-hidden className="grid-bg absolute inset-0 -z-10" />
      <div>
        <p className="font-mono text-sm text-gold">404</p>
        <h1 className="h-display mt-4 text-[clamp(40px,6vw,72px)]">This page drifted <span className="text-gradient">out of orbit.</span></h1>
        <p className="mx-auto mt-5 max-w-md font-dm text-fg-2">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <div className="mt-10 flex justify-center gap-3">
          <Link href="/" className="btn-primary">Back to home</Link>
          <Link href="/services" className="btn-ghost">View services</Link>
        </div>
      </div>
    </section>
  )
}
