"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Plus, X } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import "katex/dist/katex.min.css"

interface Note {
  title: string
  date: string
  content: string
  tags: string[]
}

const initialNotes: Note[] = [
  {
    title: "TIL: Go Context Cancellation Patterns",
    date: "2024-01-18",
    content:
      "Learned about proper context cancellation in Go. Always defer cancel() after creating a context to prevent goroutine leaks.\n\n```go\nctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)\ndefer cancel()\n```\n\nUse `context.WithTimeout` for operations with deadlines.",
    tags: ["Go", "Concurrency", "Best Practices"],
  },
  {
    title: "Quick Note: PostgreSQL Index Types",
    date: "2024-01-16",
    content:
      "**B-tree indexes** are default and work for most cases.\n\n- **GiST**: for geometric data\n- **GIN**: for full-text search and JSONB\n- **BRIN**: for very large tables with natural ordering\n\nChoose based on your query patterns and data characteristics.",
    tags: ["PostgreSQL", "Database", "Performance"],
  },
  {
    title: "Research Note: Consistency Models",
    date: "2024-01-12",
    content:
      "## Consistency Trade-offs\n\n**Strong consistency** guarantees linearizability but impacts availability.\n\n**Eventual consistency** offers better availability but requires conflict resolution.\n\n**Causal consistency** provides a middle ground - maintains causality without full linearizability.",
    tags: ["Distributed Systems", "Theory", "CAP Theorem"],
  },
  {
    title: "TIL: React Server Components",
    date: "2024-01-10",
    content:
      "Server Components render on the server and send HTML to the client.\n\n### Benefits:\n- Direct backend resource access\n- Reduced bundle size\n- Improved initial page load\n\n### Limitations:\n- Cannot use hooks\n- No browser APIs\n- No client-side interactivity",
    tags: ["React", "Next.js", "Performance"],
  },
]

export function Notes() {
  const [notes, setNotes] = useState<Note[]>(initialNotes)
  const [expandedNotes, setExpandedNotes] = useState<Set<number>>(new Set())
  const [showAddForm, setShowAddForm] = useState(false)
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    tags: "",
  })

  const toggleNote = (index: number) => {
    const newExpanded = new Set(expandedNotes)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedNotes(newExpanded)
  }

  const handleAddNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) return

    const note: Note = {
      title: newNote.title,
      date: new Date().toISOString().split("T")[0],
      content: newNote.content,
      tags: newNote.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0),
    }

    setNotes([note, ...notes])
    setNewNote({ title: "", content: "", tags: "" })
    setShowAddForm(false)
    // Expand the newly added note
    setExpandedNotes(new Set([0]))
  }

  return (
    <section id="notes" className="min-h-screen py-16 pb-24 lg:ml-24 lg:py-20">
      <div className="mb-8 lg:mb-12">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="flex flex-1 items-center gap-3 sm:gap-4">
            <span className="font-mono text-lg text-primary sm:text-xl">08.</span>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Notes & TILs</h2>
            <span className="hidden h-px flex-1 bg-border sm:block" />
          </div>
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            variant="outline"
            size="sm"
            className="w-fit border-primary/30 text-primary hover:bg-primary/10 active:scale-95"
          >
            {showAddForm ? <X className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
            {showAddForm ? "Cancel" : "Add Note"}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground sm:text-base">
          Quick notes, today-I-learned moments, and evergreen thoughts from my learning journey.
        </p>
      </div>

      {showAddForm && (
        <div className="mb-6 rounded-lg border border-primary/30 bg-card p-4 shadow-lg shadow-primary/5 sm:mb-8 sm:p-6">
          <h3 className="mb-3 text-lg font-semibold text-foreground sm:mb-4 sm:text-xl">Add New Note</h3>
          <div className="space-y-3 sm:space-y-4">
            <div>
              <label htmlFor="title" className="mb-2 block text-sm font-medium text-foreground">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                placeholder="TIL: Something interesting..."
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:px-4 sm:text-base"
              />
            </div>
            <div>
              <label htmlFor="content" className="mb-2 block text-sm font-medium text-foreground">
                Content (Markdown supported)
              </label>
              <textarea
                id="content"
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                placeholder="Write your note here... You can use **markdown** formatting!"
                rows={8}
                className="w-full rounded-md border border-border bg-background px-3 py-2 font-mono text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:px-4 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="tags" className="mb-2 block text-sm font-medium text-foreground">
                Tags (comma-separated)
              </label>
              <input
                id="tags"
                type="text"
                value={newNote.tags}
                onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
                placeholder="React, TypeScript, Performance"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:px-4 sm:text-base"
              />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end sm:gap-3">
              <Button variant="outline" onClick={() => setShowAddForm(false)} className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button onClick={handleAddNote} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto">
                Add Note
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
        {notes.map((note, index) => (
          <div
            key={index}
            className="group rounded-lg border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
          >
            <button
              onClick={() => toggleNote(index)}
              className="flex w-full items-start justify-between gap-3 p-4 text-left sm:gap-4 sm:p-6"
            >
              <div className="flex-1">
                <h3 className="mb-1.5 text-base font-semibold text-foreground transition-colors group-hover:text-primary sm:mb-2 sm:text-lg">
                  {note.title}
                </h3>
                <p className="text-xs text-muted-foreground sm:text-sm">
                  {new Date(note.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              {expandedNotes.has(index) ? (
                <ChevronUp className="h-5 w-5 flex-shrink-0 text-primary" />
              ) : (
                <ChevronDown className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
              )}
            </button>
            {expandedNotes.has(index) && (
              <div className="border-t border-border px-4 pb-4 sm:px-6 sm:pb-6">
                <div className="prose prose-invert prose-sm mt-3 mb-3 max-w-none leading-relaxed text-muted-foreground sm:mt-4 sm:mb-4">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    components={{
                      h1: ({ children }) => <h1 className="text-xl font-bold text-foreground mb-3">{children}</h1>,
                      h2: ({ children }) => <h2 className="text-lg font-semibold text-foreground mb-2">{children}</h2>,
                      h3: ({ children }) => (
                        <h3 className="text-base font-semibold text-foreground mb-2">{children}</h3>
                      ),
                      p: ({ children }) => <p className="mb-3 text-muted-foreground">{children}</p>,
                      ul: ({ children }) => <ul className="mb-3 ml-4 list-disc text-muted-foreground">{children}</ul>,
                      ol: ({ children }) => (
                        <ol className="mb-3 ml-4 list-decimal text-muted-foreground">{children}</ol>
                      ),
                      li: ({ children }) => <li className="mb-1">{children}</li>,
                      code: ({ className, children }) => {
                        const isInline = !className
                        return isInline ? (
                          <code className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-sm text-primary">
                            {children}
                          </code>
                        ) : (
                          <code className="block rounded-md bg-background/50 p-4 font-mono text-sm text-foreground overflow-x-auto">
                            {children}
                          </code>
                        )
                      },
                      strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
                      a: ({ href, children }) => (
                        <a href={href} className="text-primary hover:underline">
                          {children}
                        </a>
                      ),
                    }}
                  >
                    {note.content}
                  </ReactMarkdown>
                </div>
                <div className="flex flex-wrap gap-2">
                  {note.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="border-primary/30 bg-primary/5 text-xs text-primary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
