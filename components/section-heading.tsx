type SectionHeadingProps = {
  number: string
  title: string
  description?: string
}

export function SectionHeading({ number, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-12">
      <h2 className="mb-4 flex items-center gap-4 text-3xl font-bold text-foreground">
        <span className="font-mono text-xl text-primary">{number}.</span>
        {title}
        <span className="h-px flex-1 bg-border" />
      </h2>
      {description ? <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">{description}</p> : null}
    </div>
  )
}
