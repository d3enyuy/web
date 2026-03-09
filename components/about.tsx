import { Badge } from "@/components/ui/badge"
import { SectionHeading } from "@/components/section-heading"
import { coreStack, focusAreas } from "@/lib/site-content"

export function About() {
  return (
    <section id="about" className="scroll-mt-28 py-20 lg:py-24">
      <SectionHeading number="01" title="About" />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
          <p>
            I&apos;m Lambiv, a software engineer with a computer science background and experience working across distributed teams in Europe and Africa.
          </p>
          <p>
            The work I enjoy most sits where product clarity meets technical rigor: backend systems, streaming and analytics infrastructure, operator-facing tooling, and software that has to stay dependable after launch.
          </p>
          <p>
            I am not aiming to build the loudest interface. I care more about making the product understandable, reducing friction, and choosing technology for the problem instead of the other way around.
          </p>
        </div>

        <div className="grid gap-4">
          {focusAreas.map((item) => (
            <div key={item.title} className="rounded-2xl border border-border bg-card/60 p-5">
              <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h3 className="mb-4 text-lg font-semibold text-foreground">Core stack</h3>
        <div className="flex flex-wrap gap-2">
          {coreStack.map((skill) => (
            <Badge
              key={skill}
              variant="outline"
              className="border-primary/30 bg-primary/5 px-3 py-1 text-sm text-primary"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  )
}
