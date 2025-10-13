"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"

const blogPosts = [
  {
    title: "Building Scalable Microservices with Go",
    date: "2024-01-15",
    readTime: "8 min",
    excerpt:
      "A deep dive into designing and implementing microservices architecture using Go, covering service discovery, load balancing, and fault tolerance patterns.",
    tags: ["Go", "Microservices", "Architecture"],
    category: "technical",
  },
  {
    title: "Understanding Distributed Consensus Algorithms",
    date: "2024-01-08",
    readTime: "12 min",
    excerpt:
      "An exploration of Paxos, Raft, and other consensus algorithms, with practical examples and implementation considerations for distributed systems.",
    tags: ["Distributed Systems", "Algorithms", "Theory"],
    category: "research",
  },
  {
    title: "Machine Learning Model Deployment Best Practices",
    date: "2023-12-20",
    readTime: "10 min",
    excerpt:
      "Lessons learned from deploying ML models to production, including versioning, monitoring, A/B testing, and handling model drift.",
    tags: ["Machine Learning", "MLOps", "DevOps"],
    category: "technical",
  },
  {
    title: "Reflections on Research and Engineering",
    date: "2023-12-10",
    readTime: "6 min",
    excerpt:
      "Thoughts on bridging the gap between academic research and practical engineering, and how each discipline informs the other.",
    tags: ["Career", "Research", "Engineering"],
    category: "thoughts",
  },
]

const categories = ["all", "technical", "research", "thoughts"]

export function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredPosts =
    selectedCategory === "all" ? blogPosts : blogPosts.filter((post) => post.category === selectedCategory)

  return (
    <section id="blog" className="min-h-screen py-20 lg:ml-24">
      <div className="mb-12">
        <h2 className="mb-4 flex items-center gap-4 text-3xl font-bold text-foreground">
          <span className="font-mono text-xl text-primary">05.</span>
          Blog & Writing
          <span className="h-px flex-1 bg-border" />
        </h2>
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
              selectedCategory === category
                ? "bg-primary text-primary-foreground"
                : "border border-border text-muted-foreground hover:border-primary hover:text-foreground"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filteredPosts.map((post, index) => (
          <article
            key={index}
            className="group cursor-pointer rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="mb-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
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
            <h3 className="mb-3 text-2xl font-semibold text-foreground transition-colors group-hover:text-primary">
              {post.title}
            </h3>
            <p className="mb-4 leading-relaxed text-muted-foreground">{post.excerpt}</p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="border-primary/30 bg-primary/5 text-xs text-primary">
                  {tag}
                </Badge>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
