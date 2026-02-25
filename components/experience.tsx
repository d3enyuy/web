const experiences = [
  {
    company: "Tech Innovation Labs",
    role: "Senior Software Engineer",
    period: "2022 - Present",
    description: [
      "Led development of distributed microservices architecture serving 1M+ users",
      "Implemented ML-powered recommendation system improving user engagement by 40%",
      "Mentored team of 5 junior engineers in best practices and code quality",
      "Architected CI/CD pipeline reducing deployment time by 60%",
    ],
  },
  {
    company: "Research University",
    role: "Graduate Research Assistant",
    period: "2020 - 2022",
    description: [
      "Conducted research on distributed systems optimization and fault tolerance",
      "Published 3 papers in top-tier conferences (SOSP, OSDI)",
      "Developed novel algorithms for consensus in distributed environments",
      "Collaborated with industry partners on real-world applications",
    ],
  },
  {
    company: "Startup Inc.",
    role: "Full Stack Developer",
    period: "2019 - 2020",
    description: [
      "Built scalable web applications using React, Node.js, and PostgreSQL",
      "Implemented real-time features using WebSockets and Redis",
      "Optimized database queries reducing response time by 50%",
      "Contributed to product roadmap and technical decision-making",
    ],
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-20 lg:ml-24 lg:py-24">
      <div className="mb-12">
        <h2 className="mb-4 flex items-center gap-4 text-3xl font-bold text-foreground">
          <span className="font-mono text-xl text-primary">02.</span>
          Experience
          <span className="h-px flex-1 bg-border" />
        </h2>
      </div>

      <div className="space-y-12">
        {experiences.map((exp, index) => (
          <div key={index} className="border-l-2 border-primary/30 pl-6">
            <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="text-xl font-semibold text-foreground">{exp.role}</h3>
                <span className="text-lg text-primary">{exp.company}</span>
              </div>
              <span className="font-mono text-sm text-muted-foreground">{exp.period}</span>
            </div>
            <ul className="space-y-2">
              {exp.description.map((item, i) => (
                <li key={i} className="flex gap-3 text-muted-foreground">
                  <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
