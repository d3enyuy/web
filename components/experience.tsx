const experiences = [
  { company: "Bilin GmbH", role: "Software Developer", period: "Aug 2023 – Present", location: "Germany" },
  { company: "SIA Stayflo", role: "Software Developer", period: "Dec 2023 – Present", location: "Latvia" },
  { company: "Oryx Capital Ltd", role: "Software Developer", period: "Jul 2024 – Mar 2025", location: "Bulgaria" },
  { company: "Nasia Tech", role: "Software Engineer Intern", period: "Mar 2022 – Aug 2022", location: "Buea, Cameroon" },
  { company: "Ciniter", role: "Software Engineer Intern", period: "Jul 2021 – Dec 2021", location: "Buea, Cameroon" },
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
              <span className="ml-2 font-mono text-xs text-muted-foreground/60">{exp.location}</span>
            </div>
            <span className="font-mono text-sm text-muted-foreground">{exp.period}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
