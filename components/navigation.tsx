"use client"

import { useEffect, useRef, useState } from "react"
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
  const navRef = useRef<HTMLElement>(null)
  const [activeSection, setActiveSection] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mobileMenuTop, setMobileMenuTop] = useState(72)

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const updateMobileMenuTop = () => {
      setMobileMenuTop(navRef.current?.getBoundingClientRect().height ?? 72)
    }

    updateMobileMenuTop()
    window.addEventListener("resize", updateMobileMenuTop)

    return () => window.removeEventListener("resize", updateMobileMenuTop)
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)")
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMobileMenuOpen(false)
      }
    }

    mediaQuery.addEventListener("change", handleChange)

    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    const originalTouchAction = document.body.style.touchAction

    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
      document.body.style.touchAction = "none"
    }

    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.touchAction = originalTouchAction
    }
  }, [isMobileMenuOpen])

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

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  const navLinkClassName = (isActive: boolean) =>
    cn(
      "rounded-md px-3 py-2 text-sm font-medium transition-colors",
      isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground",
    )

  const mobileLinkClassName = (isActive: boolean) =>
    cn(
      "block w-full rounded-xl px-4 py-3 text-base font-medium transition-colors",
      isActive
        ? "bg-primary/10 text-primary"
        : "text-foreground hover:bg-muted/70 hover:text-foreground",
    )

  return (
    <nav
      ref={navRef}
      className="fixed left-0 right-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm"
    >
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
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="text-foreground transition-colors hover:text-primary"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm lg:hidden"
            style={{ top: mobileMenuTop }}
            aria-label="Close menu"
            onClick={closeMobileMenu}
          />

          <div
            id="mobile-navigation"
            className="fixed inset-x-4 z-50 overflow-hidden rounded-2xl border border-border bg-background shadow-2xl lg:hidden"
            style={{
              top: mobileMenuTop + 8,
              maxHeight: `calc(100dvh - ${mobileMenuTop + 16}px)`,
            }}
          >
            <ul className="flex flex-col gap-1 overflow-y-auto p-3">
              {sectionItems.map(({ id, label }) =>
                isHome ? (
                  <li key={id} className="w-full">
                    <a
                      href={sectionHref(id)}
                      onClick={(e) => handleSectionClick(e, id)}
                      className={mobileLinkClassName(activeSection === id)}
                    >
                      {label}
                    </a>
                  </li>
                ) : (
                  <li key={id} className="w-full">
                    <Link
                      href={sectionHref(id)}
                      className={mobileLinkClassName(false)}
                      onClick={closeMobileMenu}
                    >
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
                  <Link
                    href={href}
                    className={mobileLinkClassName(pathname === href)}
                    onClick={closeMobileMenu}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </nav>
  )
}
