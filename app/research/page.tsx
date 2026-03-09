import type { Metadata } from "next"

import { researchInterests } from "@/lib/site-content"

export const metadata: Metadata = {
  title: "Research",
  description: "Research interests and themes explored by Lambiv Gills Dzenyuy.",
}

export default function ResearchPage() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 pb-20 pt-28 sm:px-6 md:px-12">
      <header className="max-w-3xl">
        <p className="font-mono text-sm uppercase tracking-[0.24em] text-primary">Themes I keep returning to</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">Research</h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          This is less about formal publications and more about the questions I want to keep studying through writing, experiments, and product work.
        </p>
      </header>

      <section className="mt-12 rounded-2xl border border-border bg-card/50 p-6">
        <ul className="space-y-4 text-sm leading-6 text-muted-foreground">
          {researchInterests.map((topic) => (
            <li key={topic} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>{topic}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
