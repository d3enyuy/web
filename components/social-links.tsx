import { Github, Linkedin, Mail } from "lucide-react"

export function SocialLinks() {
  return (
    <div className="fixed bottom-0 left-8 z-40 hidden flex-col items-center gap-6 xl:left-12 xl:flex">
      <a
        href="https://github.com/d3enyuw"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-sm text-muted-foreground transition-all duration-200 hover:-translate-y-1 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
        aria-label="Visit GitHub profile"
      >
        <Github className="h-5 w-5" />
        <span className="sr-only">GitHub</span>
      </a>
      <a
        href="https://www.linkedin.com/in/lambiv-dzenyuy/"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-sm text-muted-foreground transition-all duration-200 hover:-translate-y-1 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
        aria-label="Visit LinkedIn profile"
      >
        <Linkedin className="h-5 w-5" />
        <span className="sr-only">LinkedIn</span>
      </a>
      <a
        href="mailto:gillslambiv@gmail.com"
        className="rounded-sm text-muted-foreground transition-all duration-200 hover:-translate-y-1 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
        aria-label="Send email to gillslambiv@gmail.com"
      >
        <Mail className="h-5 w-5" />
        <span className="sr-only">Email</span>
      </a>
      <div className="h-24 w-px bg-muted-foreground" />
    </div>
  )
}
