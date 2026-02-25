import Link from "next/link"
import { ArrowLeft, BookOpen } from "lucide-react"

export default function ResearchPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <BookOpen className="mb-6 h-12 w-12 text-primary/50" />
      <h1 className="mb-4 text-4xl font-bold text-foreground">Research</h1>
      <p className="mb-2 font-mono text-sm text-primary">Coming Soon</p>
      <p className="mb-10 max-w-md text-lg leading-relaxed text-muted-foreground">
        My research publications, papers, and ongoing work will be listed here. Currently being compiled.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 font-mono text-sm text-primary transition-colors hover:text-primary/70"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </Link>
    </div>
  )
}
