"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"
import type { BlogPost } from "@/lib/blog"

const categories = ["all", "technical", "research", "thoughts"]

interface BlogProps {
  posts?: BlogPost[]
}

export function Blog({ posts = [] }: BlogProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredPosts =
    selectedCategory === "all" ? posts : posts.filter((post) => post.category === selectedCategory)

  return (
    <section id="blog" className="min-h-screen py-16 pb-24 lg:ml-24 lg:py-20">
      <div className="mb-8 lg:mb-12">
        <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-foreground sm:gap-4 sm:text-3xl">
          <span className="font-mono text-lg text-primary sm:text-xl">07.</span>
          Blog & Writing
          <span className="h-px flex-1 bg-border" />
        </h2>
      </div>

      <div className="mb-6 flex flex-wrap gap-2 sm:mb-8 sm:gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 sm:px-4 sm:py-2 sm:text-sm ${
              selectedCategory === category
                ? "bg-primary text-primary-foreground"
                : "border border-border text-muted-foreground hover:border-primary hover:text-foreground active:scale-95"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-4 sm:space-y-6">
        {filteredPosts.map((post, index) => (
          <Link key={index} href={`/blog/${post.slug}`} className="block">
            <article className="group cursor-pointer rounded-lg border border-border bg-card p-4 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 sm:p-6">
              <div className="mb-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground sm:mb-3 sm:gap-4 sm:text-sm">
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
              <h3 className="mb-2 text-xl font-semibold text-foreground transition-colors group-hover:text-primary sm:mb-3 sm:text-2xl">
                {post.title}
              </h3>
              <p className="mb-3 text-sm leading-relaxed text-muted-foreground sm:mb-4 sm:text-base">{post.excerpt}</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="border-primary/30 bg-primary/5 text-xs text-primary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  )
}
