import { Badge } from "@/components/ui/badge"

const skills = [
  "JavaScript",
  "TypeScript",
  "PHP",
  "Python",
  "Laravel",
  "React",
  "Node.js",
  "Meilisearch",
  "Stripe",
  "Docker",
]

export function About() {
  return (
    <section id="about" className="py-20 lg:ml-24 lg:py-24">
      <div className="mb-12">
        <h2 className="mb-4 flex items-center gap-4 text-3xl font-bold text-foreground">
          <span className="font-mono text-xl text-primary">01.</span>
          About Me
          <span className="h-px flex-1 bg-border" />
        </h2>
      </div>

      <div className="max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
        <p>
          I'm Lambiv, a software developer based in Germany. I hold a B.S. in Computer Science from the
          University of Buea and have been building software professionally since 2021.
        </p>
        <p>
          I've worked across the stack — backend APIs, frontend interfaces, billing systems, payment integrations,
          and data pipelines — for companies in Germany, Latvia, and Bulgaria. I care about writing clean,
          maintainable code that actually solves problems.
        </p>
        <p>
          Outside of work, I enjoy contributing to open-source projects and occasionally building side projects
          like Aluung, a financial inclusion tool for informal savings groups.
        </p>
      </div>

      <div className="mt-10">
        <h3 className="mb-4 text-lg font-semibold text-foreground">Tech Stack</h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
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
