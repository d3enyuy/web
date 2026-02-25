import Link from "next/link"
import type { BlogPost } from "@/lib/blog"

interface BlogProps {
  posts?: BlogPost[]
}

export function Blog({ posts = [] }: BlogProps) {
  const recent = posts.slice(0, 3)

  return (
    <section id="blog" className="py-20 lg:ml-24 lg:py-24">
      <div className="mb-10">
        <h2 className="flex items-center gap-4 text-3xl font-bold text-foreground">
          <span className="font-mono text-xl text-primary">03.</span>
          Writing
          <span className="h-px flex-1 bg-border" />
        </h2>
      </div>

      <div className="divide-y divide-border">
        {recent.map((post, index) => (
          <Link key={index} href={`/blog/${post.slug}`} className="group flex items-baseline justify-between gap-4 py-4">
            <span className="font-medium text-foreground transition-colors group-hover:text-primary">
              {post.title}
            </span>
            <span className="shrink-0 font-mono text-sm text-muted-foreground">
              {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
