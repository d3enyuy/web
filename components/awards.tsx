import { Award, Trophy, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const awards = [
  {
    title: "ALX-T Data Analyst",
    organization: "ALX",
    year: "2023",
    description:
      "Comprehensive data analysis certification covering statistical analysis, data visualization, and business intelligence tools.",
    icon: Trophy,
    highlight: true,
    tags: ["Data Analysis", "Certification"],
  },
  {
    title: "Certificate of Web Dev Bootcamp Completion",
    organization: "Web Development Bootcamp",
    year: "2022",
    description:
      "Completed intensive web development bootcamp covering full-stack development, modern frameworks, and best practices.",
    icon: Award,
    highlight: false,
    tags: ["Web Development", "Full-Stack"],
  },
  {
    title: "Programming for Data Science with Python",
    organization: "Udacity",
    year: "2021",
    description:
      "NanoDegree program covering Python programming fundamentals, data structures, and data science applications.",
    icon: Users,
    highlight: false,
    tags: ["Python", "Data Science"],
  },
  {
    title: "Introduction to Cybersecurity",
    organization: "Cybersecurity Course",
    year: "2021",
    description:
      "Foundational cybersecurity certification covering security principles, threat analysis, and protection strategies.",
    icon: Award,
    highlight: false,
    tags: ["Cybersecurity", "Security"],
  },
  {
    title: "JavaScript Algorithms and Data Structures",
    organization: "JavaScript Course",
    year: "2021",
    description:
      "Comprehensive JavaScript certification covering algorithms, data structures, and problem-solving techniques.",
    icon: Award,
    highlight: false,
    tags: ["JavaScript", "Algorithms"],
  },
]

const achievements = [
  {
    metric: "5",
    label: "Certifications",
    description: "Professional & Technical",
  },
  {
    metric: "3+ Years",
    label: "Experience",
    description: "Software Development",
  },
  {
    metric: "2 Countries",
    label: "Work Experience",
    description: "Cameroon & Germany",
  },
]

export function Awards() {
  return (
    <section id="awards" className="min-h-screen py-16 pb-24 lg:ml-24 lg:py-20">
      <div className="mb-8 lg:mb-12">
        <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-foreground sm:gap-4 sm:text-3xl">
          <span className="font-mono text-lg text-primary sm:text-xl">03.</span>
          Certifications & Awards
          <span className="h-px flex-1 bg-border" />
        </h2>
        <p className="text-sm text-muted-foreground sm:text-base">
          Professional certifications and academic honors
        </p>
      </div>

      {/* Key Metrics */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3 lg:mb-12">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className="rounded-lg border border-border bg-card p-4 text-center transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 sm:p-6"
          >
            <div className="mb-2 text-3xl font-bold text-primary sm:text-4xl">{achievement.metric}</div>
            <div className="mb-1 text-sm font-semibold text-foreground sm:text-base">{achievement.label}</div>
            <div className="text-xs text-muted-foreground sm:text-sm">{achievement.description}</div>
          </div>
        ))}
      </div>

      {/* Awards List */}
      <div className="space-y-4 sm:space-y-6">
        {awards.map((award, index) => {
          const Icon = award.icon
          return (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-lg border p-4 transition-all duration-300 hover:shadow-lg sm:p-6 ${
                award.highlight
                  ? "border-primary/50 bg-primary/5 hover:shadow-primary/10"
                  : "border-border bg-card hover:border-primary/50 hover:shadow-primary/5"
              }`}
            >
              {award.highlight && (
                <div className="absolute right-4 top-4">
                  <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                </div>
              )}
              <div className="mb-4 flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg sm:h-14 sm:w-14 ${
                    award.highlight ? "bg-primary/20" : "bg-primary/10"
                  }`}
                >
                  <Icon className="h-6 w-6 text-primary sm:h-7 sm:w-7" />
                </div>
                <div className="flex-1 pr-20 sm:pr-0">
                  <h3 className="mb-1 text-lg font-semibold text-foreground sm:text-xl">{award.title}</h3>
                  <div className="mb-2 flex flex-wrap items-center gap-2 text-sm">
                    <span className="text-primary">{award.organization}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="font-mono text-muted-foreground">{award.year}</span>
                  </div>
                </div>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{award.description}</p>
              <div className="flex flex-wrap gap-2">
                {award.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className={
                      award.highlight
                        ? "border-primary/50 bg-primary/10 text-primary"
                        : "border-primary/30 bg-primary/5 text-primary"
                    }
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

