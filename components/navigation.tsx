"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Menu, X, Home, User, Briefcase, Mail, FolderOpen, BookOpen, StickyNote, Clock } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

const scrollItems = [
  { id: "hero", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "contact", label: "Contact", icon: Mail },
]

const pageItems = [
  { href: "/projects", label: "Projects", icon: FolderOpen },
  { href: "/research", label: "Research", icon: BookOpen },
  { href: "/notes", label: "Notes", icon: StickyNote },
  { href: "/now", label: "Now", icon: Clock },
]

export function Navigation() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0
        let activeId = "hero"
        entries.forEach((entry) => {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio
            activeId = entry.target.id
          }
        })
        if (maxRatio > 0) setActiveSection(activeId)
      },
      { threshold: [0, 0.1, 0.3, 0.5, 0.7, 1.0], rootMargin: "-10% 0px -10% 0px" },
    )

    scrollItems.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const el = document.getElementById(targetId)
    if (el) {
      window.scrollTo({ top: el.offsetTop - 20, behavior: "smooth" })
      setActiveSection(targetId)
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* ── Desktop: collapsed sidebar ── */}
      <nav className="group fixed left-0 top-0 z-50 hidden h-screen lg:flex">
        {/* collapsed state: thin strip with tick marks */}
        <div className="relative flex w-10 flex-col items-center justify-center transition-all duration-300 group-hover:w-48">

          {/* collapsed hint — vertical stack of short lines, hidden on hover */}
          <div className="flex flex-col items-center gap-3 group-hover:hidden">
            {[...scrollItems, null, ...pageItems].map((item, i) =>
              item === null ? (
                <div key="divider" className="h-px w-3 bg-border" />
              ) : (
                <div
                  key={i}
                  className={cn(
                    "h-0.5 rounded-full transition-all duration-200",
                    "id" in item && activeSection === item.id
                      ? "w-5 bg-primary"
                      : "w-3 bg-muted-foreground/40",
                  )}
                />
              ),
            )}
          </div>

          {/* expanded state: full list, shown on hover */}
          <div className="hidden w-full flex-col gap-1 px-2 group-hover:flex">
            {scrollItems.map(({ id, label, icon: Icon }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => handleNavClick(e, id)}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150 cursor-pointer",
                  activeSection === id
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:bg-primary/8 hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{label}</span>
              </a>
            ))}

            <div className="my-1 h-px bg-border" />

            {pageItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:bg-primary/8 hover:text-foreground"
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{label}</span>
              </Link>
            ))}

            <div className="my-1 h-px bg-border" />

            <div className="flex justify-center px-3 py-2">
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* subtle right border on the strip */}
        <div className="w-px bg-border/40" />
      </nav>

      {/* ── Mobile: top bar + hamburger ── */}
      <nav className="fixed left-0 right-0 top-0 z-50 lg:hidden">
        <div className="flex items-center justify-between border-b border-border bg-background/95 px-6 py-4 backdrop-blur-sm">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "hero")}
            className="cursor-pointer font-mono text-lg font-bold text-primary transition-colors hover:text-primary/80"
          >
            LGD
          </a>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground transition-colors hover:text-primary"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="fixed inset-0 top-[61px] z-40 bg-background/98 backdrop-blur-md">
            <ul className="flex h-full flex-col items-start justify-center gap-1 overflow-y-auto px-8 py-8">
              {scrollItems.map(({ id, label, icon: Icon }, index) => (
                <li key={id} className="w-full">
                  <a
                    href={`#${id}`}
                    onClick={(e) => handleNavClick(e, id)}
                    className={cn(
                      "flex items-center gap-4 rounded-lg px-4 py-3 text-lg font-medium transition-colors cursor-pointer",
                      activeSection === id
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    <span>{label}</span>
                  </a>
                </li>
              ))}

              <li className="w-full py-2">
                <div className="h-px bg-border" />
              </li>

              {pageItems.map(({ href, label, icon: Icon }) => (
                <li key={href} className="w-full">
                  <Link
                    href={href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-4 rounded-lg px-4 py-3 text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </>
  )
}
