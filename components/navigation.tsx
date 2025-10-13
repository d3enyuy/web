"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"

const navItems = [
  { id: "about", label: "About" },
  { id: "now", label: "Now" },
  { id: "awards", label: "Certifications" },
  { id: "experience", label: "Experience" },
  { id: "research", label: "Research" },
  { id: "projects", label: "Projects" },
  { id: "blog", label: "Blog" },
  { id: "notes", label: "Notes" },
  { id: "contact", label: "Contact" },
]

export function Navigation() {
  const [activeSection, setActiveSection] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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

  const handleMobileNavClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Desktop Navigation - Side Bar */}
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

      {/* Mobile Navigation - Top Bar */}
      <nav className="fixed left-0 right-0 top-0 z-50 lg:hidden">
        <div className="flex items-center justify-between border-b border-border bg-background/95 px-6 py-4 backdrop-blur-sm">
          <a href="#" className="font-mono text-lg font-bold text-primary">
            LGD
          </a>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="relative z-50 text-foreground transition-colors hover:text-primary"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 top-[61px] z-40 bg-background/98 backdrop-blur-md">
            <ul className="flex h-full flex-col items-center justify-start gap-6 overflow-y-auto px-6 py-8">
              {navItems.map(({ id, label }, index) => (
                <li key={id} className="w-full text-center">
                  <a
                    href={`#${id}`}
                    onClick={handleMobileNavClick}
                    className={cn(
                      "block rounded-lg px-4 py-3 text-lg font-medium transition-all duration-200",
                      activeSection === id 
                        ? "bg-primary/10 text-primary" 
                        : "text-muted-foreground hover:bg-primary/5 hover:text-foreground",
                    )}
                  >
                    <span className="font-mono text-sm text-primary">{`0${index + 1}.`}</span> {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </>
  )
}
