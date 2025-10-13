import { Github, Linkedin, Mail } from "lucide-react"

export function SocialLinks() {
  return (
    <div className="fixed bottom-0 left-12 z-50 hidden flex-col items-center gap-6 lg:flex">
      <a
        href="https://github.com/d3enyuy"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground transition-all duration-200 hover:-translate-y-1 hover:text-primary"
      >
        <Github className="h-5 w-5" />
        <span className="sr-only">GitHub</span>
      </a>
      <a
        href="https://linkedin.com/in/lambiv-gills-dzenyuy"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground transition-all duration-200 hover:-translate-y-1 hover:text-primary"
      >
        <Linkedin className="h-5 w-5" />
        <span className="sr-only">LinkedIn</span>
      </a>
      <a
        href="mailto:lambiv@example.com"
        className="text-muted-foreground transition-all duration-200 hover:-translate-y-1 hover:text-primary"
      >
        <Mail className="h-5 w-5" />
        <span className="sr-only">Email</span>
      </a>
      <div className="h-24 w-px bg-muted-foreground" />
    </div>
  )
}
