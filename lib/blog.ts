import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface BlogPost {
  slug: string
  title: string
  date: string
  readTime: string
  excerpt: string
  tags: string[]
  category: string
  content?: string // Optional, not needed for preview cards
}

// Fallback data when no markdown files are available
const fallbackPosts: BlogPost[] = [
  {
    slug: "building-scalable-microservices-with-go",
    title: "Building Scalable Microservices with Go",
    date: "2024-01-15",
    readTime: "8 min",
    excerpt:
      "A deep dive into designing and implementing microservices architecture using Go, covering service discovery, load balancing, and fault tolerance patterns.",
    tags: ["Go", "Microservices", "Architecture"],
    category: "technical",
  },
  {
    slug: "understanding-distributed-consensus-algorithms",
    title: "Understanding Distributed Consensus Algorithms",
    date: "2024-01-08",
    readTime: "12 min",
    excerpt:
      "An exploration of Paxos, Raft, and other consensus algorithms, with practical examples and implementation considerations for distributed systems.",
    tags: ["Distributed Systems", "Algorithms", "Theory"],
    category: "research",
  },
  {
    slug: "machine-learning-model-deployment-best-practices",
    title: "Machine Learning Model Deployment Best Practices",
    date: "2023-12-20",
    readTime: "10 min",
    excerpt:
      "Lessons learned from deploying ML models to production, including versioning, monitoring, A/B testing, and handling model drift.",
    tags: ["Machine Learning", "MLOps", "DevOps"],
    category: "technical",
  },
  {
    slug: "reflections-on-research-and-engineering",
    title: "Reflections on Research and Engineering",
    date: "2023-12-10",
    readTime: "6 min",
    excerpt:
      "Thoughts on bridging the gap between academic research and practical engineering, and how each discipline informs the other.",
    tags: ["Career", "Research", "Engineering"],
    category: "thoughts",
  },
]

/**
 * Calculate reading time based on word count
 * Assumes 200 words per minute reading speed
 */
function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200
  const wordCount = content.trim().split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min`
}

/**
 * Generate slug from filename
 * Removes .md extension and ensures kebab-case
 */
function generateSlug(filename: string): string {
  return filename.replace(/\.md$/, "")
}

/**
 * Get all blog posts from the _posts directory
 * Returns fallback data if directory doesn't exist or is empty
 * @param limit Optional limit for number of posts to return (useful for homepage preview)
 * @returns Array of BlogPost objects sorted by date (newest first)
 */
export function getBlogPosts(limit?: number): BlogPost[] {
  const postsDirectory = path.join(process.cwd(), "_posts")

  // Check if directory exists
  if (!fs.existsSync(postsDirectory)) {
    return limit ? fallbackPosts.slice(0, limit) : fallbackPosts
  }

  // Read all files from directory
  let filenames: string[]
  try {
    filenames = fs.readdirSync(postsDirectory)
  } catch (error) {
    console.error("Error reading _posts directory:", error)
    return limit ? fallbackPosts.slice(0, limit) : fallbackPosts
  }

  // Filter for markdown files only
  const markdownFiles = filenames.filter((filename) => filename.endsWith(".md"))

  // If no markdown files found, return fallback data
  if (markdownFiles.length === 0) {
    return limit ? fallbackPosts.slice(0, limit) : fallbackPosts
  }

  // Parse each markdown file
  const posts: BlogPost[] = markdownFiles.map((filename) => {
    const filePath = path.join(postsDirectory, filename)
    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContents)

    // Generate slug from filename
    const slug = generateSlug(filename)

    // Calculate reading time from content
    const readTime = data.readTime || calculateReadingTime(content)

    // Create BlogPost object with defaults for missing fields
    const post: BlogPost = {
      slug,
      title: data.title || "Untitled",
      date: data.date || new Date().toISOString().split("T")[0],
      readTime,
      excerpt: data.excerpt || "",
      tags: Array.isArray(data.tags) ? data.tags : [],
      category: data.category || "uncategorized",
      content,
    }

    return post
  })

  // Sort by date (newest first)
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // Apply limit if provided
  return limit ? posts.slice(0, limit) : posts
}
