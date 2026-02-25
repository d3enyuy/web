import Link from "next/link"
import { ArrowLeft, Clock } from "lucide-react"

export default function NowPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <Clock className="mb-6 h-12 w-12 text-primary/50" />
      <h1 className="mb-4 text-4xl font-bold text-foreground">Now</h1>
      <p className="mb-2 font-mono text-sm text-primary">Coming Soon</p>
      <p className="mb-10 max-w-md text-lg leading-relaxed text-muted-foreground">
        A /now page — what I'm currently focused on, reading, and working toward. Being written.
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
