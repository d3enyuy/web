"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Menu, X, Home, User, Clock, Award, Briefcase, BookOpen, FolderOpen, FileText, StickyNote, Mail } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

const navItems = [
  { id: "hero", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "now", label: "Now", icon: Clock },
  { id: "awards", label: "Certifications", icon: Award },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "research", label: "Research", icon: BookOpen },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "blog", label: "Blog", icon: FileText },
  { id: "notes", label: "Notes", icon: StickyNote },
  { id: "contact", label: "Contact", icon: Mail },
]

export function Navigation() {
  const [activeSection, setActiveSection] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the section with the highest intersection ratio
        let maxRatio = 0
        let activeId = "hero"
        
        entries.forEach((entry) => {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio
            activeId = entry.target.id
          }
        })
        
        if (maxRatio > 0) {
          setActiveSection(activeId)
        }
      },
      { 
        threshold: [0, 0.1, 0.3, 0.5, 0.7, 1.0],
        rootMargin: "-10% 0px -10% 0px"
      },
    )

    // Observe all sections
    navItems.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    // Set initial active section to hero
    setActiveSection("hero")

    return () => observer.disconnect()
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      // Temporarily disable observer to prevent conflicts
      const scrollPosition = element.offsetTop - 20 // Small offset from top
      
      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      })
      
      // Update active section immediately for better UX
      setActiveSection(targetId)
    }
    setIsMobileMenuOpen(false)
  }

  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    handleNavClick(e, targetId)
  }

  return (
    <>
      {/* Desktop Navigation - Side Bar */}
      <nav className="fixed left-0 top-0 z-50 hidden h-screen w-24 flex-col items-center justify-center lg:flex">
        <div className="flex flex-col items-center gap-8">
          <ul className="flex flex-col gap-8">
            {navItems.map(({ id, label, icon: Icon }) => (
              <li key={id} className="relative">
                <a
                  href={`#${id}`}
                  onClick={(e) => handleNavClick(e, id)}
                  className={cn(
                    "group relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 cursor-pointer",
                    activeSection === id 
                      ? "bg-primary/20 text-primary" 
                      : "text-muted-foreground hover:bg-primary/10 hover:text-primary",
                  )}
                >
                  {/* Section indicator dot */}
                  <div
                    className={cn(
                      "absolute left-0 w-1 h-8 rounded-r-full transition-all duration-200",
                      activeSection === id
                        ? "bg-primary"
                        : "bg-transparent group-hover:bg-primary/50",
                    )}
                  />
                  
                  {/* Section icon */}
                  <Icon className="h-5 w-5" />
                  
                  {/* Tooltip on hover */}
                  <div className="absolute left-full ml-4 px-3 py-2 bg-background/95 backdrop-blur-sm border border-border rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    <span className="text-sm font-medium text-foreground">{label}</span>
                    {/* Tooltip arrow */}
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-background border-l border-b border-border rotate-45" />
                  </div>
                </a>
              </li>
            ))}
          </ul>
          
          {/* Theme Toggle */}
          <div className="relative group">
            <ThemeToggle />
            {/* Tooltip for theme toggle */}
            <div className="absolute left-full ml-4 px-3 py-2 bg-background/95 backdrop-blur-sm border border-border rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
              <span className="text-sm font-medium text-foreground">Toggle theme</span>
              {/* Tooltip arrow */}
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-background border-l border-b border-border rotate-45" />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Top Bar */}
      <nav className="fixed left-0 right-0 top-0 z-50 lg:hidden">
        <div className="flex items-center justify-between border-b border-border bg-background/95 px-6 py-4 backdrop-blur-sm">
          <a 
            href="#hero" 
            onClick={(e) => handleNavClick(e, "hero")}
            className="font-mono text-lg font-bold text-primary transition-colors hover:text-primary/80 cursor-pointer"
          >
            LGD
          </a>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative z-50 text-foreground transition-colors hover:text-primary"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 top-[61px] z-40 bg-background/98 backdrop-blur-md">
            <ul className="flex h-full flex-col items-center justify-start gap-6 overflow-y-auto px-6 py-8">
              {navItems.map(({ id, label, icon: Icon }, index) => (
                <li key={id} className="w-full text-center">
                  <a
                    href={`#${id}`}
                    onClick={(e) => handleMobileNavClick(e, id)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-4 py-3 text-lg font-medium transition-all duration-200 cursor-pointer",
                      activeSection === id 
                        ? "bg-primary/10 text-primary" 
                        : "text-muted-foreground hover:bg-primary/5 hover:text-foreground",
                    )}
                  >
                    <Icon className="h-5 w-5" />
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
