import { Badge } from "@/components/ui/badge"
import { FileText, Github } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import "katex/dist/katex.min.css"

const publications = [
  {
    title: "Efficient Consensus Algorithms for Distributed Systems",
    venue: "SOSP 2023",
    abstract:
      "We present a novel approach to achieving consensus in distributed systems with **improved latency** and fault tolerance.\n\nOur algorithm reduces message complexity from $$O(n^2)$$ to $$O(n \\log n)$$ while maintaining strong consistency guarantees.\n\n### Key Contributions:\n- Novel message passing protocol\n- Formal correctness proofs\n- Extensive performance evaluation",
    tags: ["Distributed Systems", "Consensus", "Fault Tolerance"],
    paperUrl: "#",
    codeUrl: "#",
    status: "published",
  },
  {
    title: "Machine Learning for Predictive System Optimization",
    venue: "OSDI 2022",
    abstract:
      "This work explores the application of machine learning techniques to predict and optimize system performance in cloud environments.\n\n**Results**: Achieved 35% improvement in resource utilization through:\n- Predictive autoscaling\n- Workload-aware scheduling\n- Dynamic resource allocation",
    tags: ["Machine Learning", "Cloud Computing", "Optimization"],
    paperUrl: "#",
    codeUrl: "#",
    status: "published",
  },
]

const workingOn = [
  {
    title: "Scalable Real-time Data Processing Framework",
    abstract:
      "Developing a novel framework for processing streaming data at scale with **sub-millisecond latency** guarantees.\n\n### Focus Areas:\n- Edge computing scenarios\n- Resource-constrained environments\n- Fault-tolerant stream processing\n\nTarget latency: $$< 1ms$$ for 99th percentile",
    tags: ["Stream Processing", "Edge Computing", "Real-time Systems"],
    status: "working",
  },
  {
    title: "Neural Architecture Search for Efficient Models",
    abstract:
      "Investigating automated methods for discovering efficient neural network architectures optimized for deployment on mobile and edge devices.\n\n**Goal**: Reduce model size by 10x while maintaining accuracy within 2% of full-size models.",
    tags: ["Neural Architecture Search", "Model Optimization", "Edge AI"],
    status: "working",
  },
]

export function Research() {
  return (
    <section id="research" className="min-h-screen py-16 pb-24 lg:ml-24 lg:py-20">
      <div className="mb-8 lg:mb-12">
        <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-foreground sm:gap-4 sm:text-3xl">
          <span className="font-mono text-lg text-primary sm:text-xl">03.</span>
          Research & Publications
          <span className="h-px flex-1 bg-border" />
        </h2>
      </div>

      <div className="mb-12 lg:mb-16">
        <h3 className="mb-4 text-xl font-semibold text-foreground sm:mb-6 sm:text-2xl">Published Work</h3>
        <div className="space-y-6 lg:space-y-8">
          {publications.map((paper, index) => (
            <div
              key={index}
              className="group rounded-lg border border-border bg-card p-4 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 sm:p-6"
            >
              <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-4">
                <h4 className="text-lg font-semibold text-foreground sm:text-xl">{paper.title}</h4>
                <span className="font-mono text-sm text-primary">{paper.venue}</span>
              </div>
              <div className="prose prose-invert prose-sm mb-4 max-w-none leading-relaxed text-muted-foreground">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                  components={{
                    h1: ({ children }) => <h1 className="text-xl font-bold text-foreground mb-3">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-lg font-semibold text-foreground mb-2">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-base font-semibold text-foreground mb-2">{children}</h3>,
                    p: ({ children }) => <p className="mb-3 text-muted-foreground">{children}</p>,
                    ul: ({ children }) => <ul className="mb-3 ml-4 list-disc text-muted-foreground">{children}</ul>,
                    ol: ({ children }) => <ol className="mb-3 ml-4 list-decimal text-muted-foreground">{children}</ol>,
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
                  {paper.abstract}
                </ReactMarkdown>
              </div>
              <div className="mb-4 flex flex-wrap gap-2">
                {paper.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="border-primary/30 bg-primary/5 text-xs text-primary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-4">
                <a
                  href={paper.paperUrl}
                  className="inline-flex items-center gap-2 text-sm text-primary transition-colors hover:underline"
                >
                  <FileText className="h-4 w-4" />
                  Read Paper
                </a>
                <a
                  href={paper.codeUrl}
                  className="inline-flex items-center gap-2 text-sm text-primary transition-colors hover:underline"
                >
                  <Github className="h-4 w-4" />
                  View Code
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-xl font-semibold text-foreground sm:mb-6 sm:text-2xl">Current Research</h3>
        <div className="space-y-6 lg:space-y-8">
          {workingOn.map((project, index) => (
            <div
              key={index}
              className="group rounded-lg border border-border bg-card p-4 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 sm:p-6"
            >
              <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <h4 className="text-lg font-semibold text-foreground sm:text-xl">{project.title}</h4>
                <Badge className="w-fit bg-primary/20 text-primary">In Progress</Badge>
              </div>
              <div className="prose prose-invert prose-sm mb-4 max-w-none leading-relaxed text-muted-foreground">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                  components={{
                    h1: ({ children }) => <h1 className="text-xl font-bold text-foreground mb-3">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-lg font-semibold text-foreground mb-2">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-base font-semibold text-foreground mb-2">{children}</h3>,
                    p: ({ children }) => <p className="mb-3 text-muted-foreground">{children}</p>,
                    ul: ({ children }) => <ul className="mb-3 ml-4 list-disc text-muted-foreground">{children}</ul>,
                    ol: ({ children }) => <ol className="mb-3 ml-4 list-decimal text-muted-foreground">{children}</ol>,
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
                  {project.abstract}
                </ReactMarkdown>
              </div>
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
    </section>
  )
}
