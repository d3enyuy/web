import type { Metadata } from "next"

import { nowItems } from "@/lib/site-content"

export const metadata: Metadata = {
  title: "Now",
  description: "What Lambiv Gills Dzenyuy is currently focused on.",
}

export default function NowPage() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-4 pb-20 pt-28 sm:px-6 md:px-12">
      <header>
        <p className="font-mono text-sm uppercase tracking-[0.24em] text-primary">Last updated March 2026</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">Now</h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          A short snapshot of what currently has my attention.
        </p>
      </header>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-foreground">Currently</h2>
        <ul className="mt-5 space-y-5">
          {nowItems.map((item) => (
            <li key={item.title}>
              <p className="text-base font-medium text-foreground">{item.title}</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
