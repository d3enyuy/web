const experiences = [
  {
    company: "Tech Innovation Labs",
    role: "Senior Software Engineer",
    period: "2022 – Present",
  },
  {
    company: "Research University",
    role: "Graduate Research Assistant",
    period: "2020 – 2022",
  },
  {
    company: "Startup Inc.",
    role: "Full Stack Developer",
    period: "2019 – 2020",
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-20 lg:ml-24 lg:py-24">
      <div className="mb-10">
        <h2 className="flex items-center gap-4 text-3xl font-bold text-foreground">
          <span className="font-mono text-xl text-primary">02.</span>
          Experience
          <span className="h-px flex-1 bg-border" />
        </h2>
      </div>

      <div className="divide-y divide-border">
        {experiences.map((exp, index) => (
          <div key={index} className="flex flex-wrap items-baseline justify-between gap-2 py-4">
            <div>
              <span className="font-medium text-foreground">{exp.role}</span>
              <span className="ml-2 text-muted-foreground">— {exp.company}</span>
            </div>
            <span className="font-mono text-sm text-muted-foreground">{exp.period}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
