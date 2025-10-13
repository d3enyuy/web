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

const researchAreas = ["Machine Learning", "Distributed Systems", "Computer Vision", "Natural Language Processing"]

export function About() {
  return (
    <section id="about" className="min-h-screen py-20 lg:ml-24">
      <div className="mb-12">
        <h2 className="mb-4 flex items-center gap-4 text-3xl font-bold text-foreground">
          <span className="font-mono text-xl text-primary">01.</span>
          About Me
          <span className="h-px flex-1 bg-border" />
        </h2>
      </div>

      <div className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>
              Hello! I'm Lambiv, a software engineer and researcher passionate about building innovative solutions and
              exploring cutting-edge technologies. My journey in tech combines practical engineering with academic
              research, allowing me to bridge theory and practice.
            </p>
            <p>
              I specialize in developing scalable systems and conducting research at the intersection of machine
              learning, distributed systems, and software architecture. My work focuses on creating efficient,
              maintainable solutions while contributing to the broader understanding of computer science fundamentals.
            </p>
            <p>
              When I'm not coding or researching, I enjoy sharing knowledge through technical writing, contributing to
              open-source projects, and exploring new technologies that push the boundaries of what's possible.
            </p>
          </div>

          <div className="mt-8">
            <h3 className="mb-4 text-xl font-semibold text-foreground">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="border-primary/30 bg-primary/5 px-3 py-1 text-sm text-primary hover:bg-primary/10"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="mb-4 text-xl font-semibold text-foreground">Research Interests</h3>
            <div className="flex flex-wrap gap-2">
              {researchAreas.map((area) => (
                <Badge
                  key={area}
                  variant="outline"
                  className="border-primary/30 bg-primary/5 px-3 py-1 text-sm text-primary hover:bg-primary/10"
                >
                  {area}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-start justify-center">
          <div className="relative">
            <div className="absolute -inset-4 rounded border-2 border-primary opacity-50 transition-all duration-300 hover:translate-x-2 hover:translate-y-2" />
            <div className="relative h-64 w-64 overflow-hidden rounded bg-primary/10">
              <img
                src="/face.JPG"
                alt="Lambiv Gills Dzenyuy"
                className="h-full w-full object-cover mix-blend-luminosity transition-all duration-300 hover:mix-blend-normal"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
