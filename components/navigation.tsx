"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "research", label: "Research" },
  { id: "projects", label: "Projects" },
  { id: "blog", label: "Blog" },
  { id: "notes", label: "Notes" },
  { id: "contact", label: "Contact" },
]

export function Navigation() {
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 },
    )

    navItems.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <nav className="fixed left-0 top-0 z-50 hidden h-screen w-24 flex-col items-center justify-center lg:flex">
      <ul className="flex flex-col gap-8">
        {navItems.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={cn(
                "group flex items-center gap-4 text-sm font-medium transition-all duration-200",
                activeSection === id ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span
                className={cn(
                  "h-px transition-all duration-200",
                  activeSection === id
                    ? "w-16 bg-primary"
                    : "w-8 bg-muted-foreground group-hover:w-16 group-hover:bg-foreground",
                )}
              />
              <span className="sr-only">{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
