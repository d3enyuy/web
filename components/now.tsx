"use client"

import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react"

const currentFocus = [
  {
    title: "Software Development & Engineering",
    company: "Bilin GmbH",
    description: "Developing and maintaining software solutions using modern technologies including Neo4j, Apache Kafka, and PostgreSQL for scalable applications.",
    tags: ["Neo4j", "Apache Kafka", "PostgreSQL", "Java", "Spring Boot"],
    status: "active",
  },
]

const learning = [
  {
    topic: "Advanced Neo4j & Graph Database Patterns",
    description: "Deepening expertise in graph database optimization and complex query patterns",
    progress: 80,
  },
  {
    topic: "Apache Kafka Stream Processing",
    description: "Learning advanced stream processing patterns and real-time data pipelines",
    progress: 70,
  },
  {
    topic: "Data Science & Analytics",
    description: "Building on Python and statistical analysis skills for data-driven insights",
    progress: 75,
  },
]

const researchInterests = [
  "Graph database optimization and performance",
  "Real-time data processing with Apache Kafka",
  "Data science applications in software development",
  "Cybersecurity best practices in development",
  "Algorithm optimization and data structures",
]

export function Now() {
  return (
    <section id="now" className="min-h-screen py-16 pb-24 lg:ml-24 lg:py-20">
      <div className="mb-8 lg:mb-12">
        <div className="mb-4 flex items-center gap-3 sm:gap-4">
          <Sparkles className="h-6 w-6 text-primary sm:h-7 sm:w-7" />
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">What I'm Doing Now</h2>
        </div>
        <p className="text-sm text-muted-foreground sm:text-base">
          Currently working on exciting projects and continuously learning new technologies
        </p>
      </div>

      {/* Current Work */}
      <div className="mb-12 lg:mb-16">
        <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-foreground sm:mb-6 sm:text-2xl">
          <TrendingUp className="h-5 w-5 text-primary" />
          Active Projects
        </h3>
        <div className="space-y-4 sm:space-y-6">
          {currentFocus.map((project, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg border border-border bg-card p-4 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 sm:p-6"
            >
              <div className="absolute right-4 top-4">
                <div className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                  </span>
                  Active
                </div>
              </div>
              <div className="mb-3 pr-20">
                <h4 className="mb-1 text-lg font-semibold text-foreground sm:text-xl">{project.title}</h4>
                <p className="font-mono text-sm text-primary">{project.company}</p>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{project.description}</p>
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
      </div>

      {/* Currently Learning */}
      <div className="mb-12 lg:mb-16">
        <h3 className="mb-4 text-xl font-semibold text-foreground sm:mb-6 sm:text-2xl">Currently Learning</h3>
        <div className="space-y-4 sm:space-y-6">
          {learning.map((item, index) => (
            <div key={index} className="rounded-lg border border-border bg-card p-4 sm:p-6">
              <div className="mb-3 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="mb-1 text-base font-semibold text-foreground sm:text-lg">{item.topic}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <span className="flex-shrink-0 font-mono text-sm text-primary">{item.progress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-primary/10">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Research Interests */}
      <div>
        <h3 className="mb-4 text-xl font-semibold text-foreground sm:mb-6 sm:text-2xl">Research Interests</h3>
        <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
          <ul className="space-y-3">
            {researchInterests.map((interest, index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground sm:text-base">
                <ArrowRight className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                <span>{interest}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Last Updated */}
      <div className="mt-8 text-center">
        <p className="font-mono text-xs text-muted-foreground">
          Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </p>
      </div>
    </section>
  )
}

