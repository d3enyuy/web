import { Badge } from "@/components/ui/badge"
import { SectionHeading } from "@/components/section-heading"
import { experienceItems } from "@/lib/site-content"

export function Experience() {
  const featuredExperience = experienceItems.filter((item) => item.featured)
  const earlierExperience = experienceItems.filter((item) => !item.featured)

  return (
    <section id="experience" className="scroll-mt-28 py-20 lg:py-24">
      <SectionHeading
        number="03"
        title="Experience"
        description="A brief overview of the environments and problem spaces I have worked in. The emphasis is on what the work involved, not just where it happened."
      />

      <div className="grid gap-6">
        {featuredExperience.map((item) => (
          <article key={`${item.company}-${item.period}`} className="rounded-2xl border border-border bg-card/60 p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  {item.role}
                  <span className="text-muted-foreground"> at {item.company}</span>
                </h3>
                <p className="mt-1 font-mono text-sm text-muted-foreground">
                  {item.period} · {item.location}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {item.stack.map((tech) => (
                  <Badge key={tech} variant="outline" className="border-primary/30 bg-primary/5 text-primary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-muted-foreground">{item.summary}</p>

            <ul className="mt-5 space-y-3 text-sm leading-6 text-muted-foreground">
              {item.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-border bg-card/40 p-6">
        <h3 className="text-lg font-semibold text-foreground">Earlier experience</h3>
        <div className="mt-4 divide-y divide-border">
          {earlierExperience.map((item) => (
            <div key={`${item.company}-${item.period}`} className="flex flex-wrap items-baseline justify-between gap-2 py-4">
              <div>
                <span className="font-medium text-foreground">{item.role}</span>
                <span className="ml-2 text-muted-foreground">- {item.company}</span>
                <span className="ml-2 font-mono text-xs text-muted-foreground/60">{item.location}</span>
              </div>
              <span className="font-mono text-sm text-muted-foreground">{item.period}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
