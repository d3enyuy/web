import Link from "next/link"
import { Calendar, Clock } from "lucide-react"
import type { BlogPost } from "@/lib/blog"

interface BlogProps {
  posts?: BlogPost[]
}

export function Blog({ posts = [] }: BlogProps) {
  return (
    <section id="blog" className="py-20 lg:ml-24 lg:py-24">
      <div className="mb-12">
        <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-foreground sm:gap-4 sm:text-3xl">
          <span className="font-mono text-lg text-primary sm:text-xl">03.</span>
          Blog & Writing
          <span className="h-px flex-1 bg-border" />
        </h2>
      </div>

      <div className="divide-y divide-border">
        {posts.map((post, index) => (
          <Link key={index} href={`/blog/${post.slug}`} className="block py-8 first:pt-0 last:pb-0">
            <article className="group">
              <div className="mb-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </span>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                {post.title}
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground">{post.excerpt}</p>
            </article>
          </Link>
        ))}
      </div>
    </section>
  )
}
