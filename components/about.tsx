import { Badge } from "@/components/ui/badge"

const skills = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "Machine Learning",
  "Distributed Systems",
  "Cloud Architecture",
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
          Hello! I'm Lambiv, a software engineer focused on building reliable, maintainable software. I care about
          writing clean code and creating things that actually work well.
        </p>
        <p>
          I enjoy working across the stack — from backend systems to frontend interfaces. Outside of work, I like
          digging into new technologies and occasionally exploring topics like distributed systems and data science
          out of personal curiosity.
        </p>
        <p>
          When I'm not coding, I enjoy contributing to open-source projects.
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
