"use client"

import { useEffect, useState } from "react"
import { Github, Linkedin } from "lucide-react"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="flex min-h-screen flex-col justify-center py-20 lg:ml-24">
      <div
        className={`transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <p className="mb-6 font-mono text-sm text-primary md:text-base">Hi, my name is</p>
        <h1 className="mb-4 text-5xl font-bold leading-tight text-foreground md:text-6xl lg:text-7xl">
          Lambiv Gills Dzenyuy
        </h1>
        <h2 className="mb-6 text-4xl font-bold leading-tight text-muted-foreground md:text-5xl lg:text-6xl">
          Software Engineer & Researcher
        </h2>
        <p className="mb-12 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          I build and explore at the intersection of code and research, creating innovative solutions while pushing the
          boundaries of what's possible in software engineering and computer science.
        </p>
        <div className="flex gap-6">
          <a
            href="https://github.com/d3enyuy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded border border-primary px-6 py-3 font-mono text-sm text-primary transition-all duration-200 hover:bg-primary/10"
          >
            <Github className="h-5 w-5" />
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/lambiv-gills-dzenyuy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded border border-primary px-6 py-3 font-mono text-sm text-primary transition-all duration-200 hover:bg-primary/10"
          >
            <Linkedin className="h-5 w-5" />
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}
