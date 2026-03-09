import type { Metadata } from "next"

import { ExternalLink } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { featuredProjects } from "@/lib/site-content"

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected professional work and side projects by Lambiv Gills Dzenyuy.",
}

export default function ProjectsPage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 pb-20 pt-28 sm:px-6 md:px-12">
      <header className="max-w-3xl">
        <p className="font-mono text-sm uppercase tracking-[0.24em] text-primary">Selected work</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">Projects</h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          These write-ups mix professional work and personal projects. Where the work is private, I keep the explanation focused on the engineering shape, constraints, and decisions rather than client-sensitive details.
        </p>
      </header>

      <div className="mt-12 space-y-8">
        {featuredProjects.map((project) => (
          <article
            key={project.slug}
            id={project.slug}
            className="scroll-mt-28 rounded-2xl border border-border bg-card/60 p-6 md:p-8"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-primary">{project.kind}</p>
                <h2 className="mt-3 text-2xl font-semibold text-foreground">{project.title}</h2>
              </div>
              <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary">
                {project.status}
              </Badge>
            </div>

            <p className="mt-5 text-base leading-7 text-muted-foreground">{project.summary}</p>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground">Problem space</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{project.problem}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground">Approach</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{project.approach}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground">Notes</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{project.detail}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <Badge key={item} variant="outline" className="border-border bg-background/60 text-muted-foreground">
                  {item}
                </Badge>
              ))}
            </div>

            {project.liveUrl ? (
              <div className="mt-8">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  Visit live project
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </main>
  )
}
