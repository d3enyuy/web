import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    title: "Distributed Task Scheduler",
    description:
      "A fault-tolerant distributed task scheduling system built with Go and etcd. Handles millions of tasks per day with automatic failover and load balancing.",
    tags: ["Go", "etcd", "Distributed Systems", "Kubernetes"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    title: "ML Model Serving Platform",
    description:
      "Production-ready platform for deploying and serving machine learning models at scale. Features auto-scaling, A/B testing, and real-time monitoring.",
    tags: ["Python", "FastAPI", "Docker", "TensorFlow", "Redis"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    title: "Real-time Analytics Dashboard",
    description:
      "High-performance analytics dashboard processing millions of events per second. Built with React, WebSockets, and ClickHouse for real-time insights.",
    tags: ["React", "TypeScript", "WebSockets", "ClickHouse"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    title: "Code Review Assistant",
    description:
      "AI-powered code review tool that provides intelligent suggestions and catches potential bugs. Integrates with GitHub and GitLab.",
    tags: ["Python", "OpenAI", "GitHub Actions", "NLP"],
    githubUrl: "#",
  },
]

export function Projects() {
  return (
    <section id="projects" className="min-h-screen py-20 lg:ml-24">
      <div className="mb-12">
        <h2 className="mb-4 flex items-center gap-4 text-3xl font-bold text-foreground">
          <span className="font-mono text-xl text-primary">04.</span>
          Featured Projects
          <span className="h-px flex-1 bg-border" />
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <div
            key={index}
            className="group flex flex-col rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
          >
            <div className="mb-4 flex items-start justify-between">
              <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
              <div className="flex gap-3">
                <a href={project.githubUrl} className="text-muted-foreground transition-colors hover:text-primary">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
                {project.liveUrl && (
                  <a href={project.liveUrl} className="text-muted-foreground transition-colors hover:text-primary">
                    <ExternalLink className="h-5 w-5" />
                    <span className="sr-only">Live Demo</span>
                  </a>
                )}
              </div>
            </div>
            <p className="mb-4 flex-1 leading-relaxed text-muted-foreground">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="border-primary/30 bg-primary/5 text-xs text-primary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
