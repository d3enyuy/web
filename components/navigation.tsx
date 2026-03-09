"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { BrandMark } from "./brand-mark"
import { ThemeToggle } from "./theme-toggle"

const sectionItems = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
]

const pageItems = [
  { href: "/projects", label: "Projects" },
  { href: "/now", label: "Now" },
]

export function Navigation() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const [activeSection, setActiveSection] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!isHome) {
      setActiveSection("")
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0
        let nextActiveSection = ""

        entries.forEach((entry) => {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio
            nextActiveSection = entry.target.id
          }
        })

        setActiveSection(maxRatio > 0 ? nextActiveSection : "")
      },
      { threshold: [0.2, 0.4, 0.6], rootMargin: "-20% 0px -55% 0px" },
    )

    sectionItems.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [isHome])

  const sectionHref = (id: string) => (isHome ? `#${id}` : `/#${id}`)

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (!isHome) {
      setIsMobileMenuOpen(false)
      return
    }

    e.preventDefault()

    const element = document.getElementById(targetId)
    if (!element) {
      return
    }

    const navOffset = 88
    const top = element.getBoundingClientRect().top + window.scrollY - navOffset
    window.scrollTo({ top, behavior: "smooth" })
    setActiveSection(targetId)
    setIsMobileMenuOpen(false)
  }

  const handleBrandClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isHome) {
      return
    }

    e.preventDefault()
    window.scrollTo({ top: 0, behavior: "smooth" })
    setActiveSection("")
    setIsMobileMenuOpen(false)
  }

  const navLinkClassName = (isActive: boolean) =>
    cn(
      "rounded-md px-3 py-2 text-sm font-medium transition-colors",
      isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground",
    )

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 md:px-12 lg:px-24">
        <a
          href={isHome ? "#top" : "/"}
          onClick={handleBrandClick}
          className="text-primary transition-colors hover:text-primary/80"
          aria-label="Go to home"
        >
          <BrandMark className="h-9 w-9" />
        </a>

        <div className="hidden items-center gap-2 lg:flex">
          {sectionItems.map(({ id, label }) =>
            isHome ? (
              <a
                key={id}
                href={sectionHref(id)}
                onClick={(e) => handleSectionClick(e, id)}
                className={navLinkClassName(activeSection === id)}
              >
                {label}
              </a>
            ) : (
              <Link key={id} href={sectionHref(id)} className={navLinkClassName(false)}>
                {label}
              </Link>
            ),
          )}

          <div className="mx-2 h-5 w-px bg-border" />

          {pageItems.map(({ href, label }) => (
            <Link key={href} href={href} className={navLinkClassName(pathname === href)}>
              {label}
            </Link>
          ))}

          <div className="ml-2">
            <ThemeToggle />
          </div>
        </div>

        <div className="flex items-center gap-4 lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="text-foreground transition-colors hover:text-primary"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[73px] z-40 bg-background/98 backdrop-blur-md lg:hidden">
          <ul className="flex h-full flex-col items-start gap-2 overflow-y-auto px-6 py-8">
            {sectionItems.map(({ id, label }) =>
              isHome ? (
                <li key={id} className="w-full">
                  <a
                    href={sectionHref(id)}
                    onClick={(e) => handleSectionClick(e, id)}
                    className={navLinkClassName(activeSection === id)}
                  >
                    {label}
                  </a>
                </li>
              ) : (
                <li key={id} className="w-full">
                  <Link href={sectionHref(id)} className={navLinkClassName(false)}>
                    {label}
                  </Link>
                </li>
              ),
            )}

            <li className="w-full py-2">
              <div className="h-px bg-border" />
            </li>

            {pageItems.map(({ href, label }) => (
              <li key={href} className="w-full">
                <Link href={href} className={navLinkClassName(pathname === href)}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
