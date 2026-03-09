import type { Metadata } from "next"

import { upcomingNotes } from "@/lib/site-content"

export const metadata: Metadata = {
  title: "Notes",
  description: "Planned engineering notes and short-form writing by Lambiv Gills Dzenyuy.",
}

export default function NotesPage() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 pb-20 pt-28 sm:px-6 md:px-12">
      <header className="max-w-3xl">
        <p className="font-mono text-sm uppercase tracking-[0.24em] text-primary">Writing in progress</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">Notes</h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          I have not published notes here yet. When this section goes live, the goal is short, useful writing rather than padded blog posts. These are the topics I expect to start with.
        </p>
      </header>

      <section className="mt-12 rounded-2xl border border-border bg-card/50 p-6">
        <ul className="space-y-4 text-sm leading-6 text-muted-foreground">
          {upcomingNotes.map((topic) => (
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
