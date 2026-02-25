import { Mail } from "lucide-react"

export function Contact() {
  return (
    <section id="contact" className="py-20 lg:ml-24 lg:py-24">
      <div className="mb-12">
        <h2 className="mb-4 flex items-center gap-4 text-3xl font-bold text-foreground">
          <span className="font-mono text-xl text-primary">03.</span>
          Get In Touch
          <span className="h-px flex-1 bg-border" />
        </h2>
      </div>

      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
          I'm always open to discussing new projects, research collaborations, or opportunities to contribute to
          interesting work. Whether you have a question or just want to say hi, feel free to reach out!
        </p>
        <a
          href="mailto:gillslambiv@gmail.com"
          className="inline-flex items-center gap-3 rounded border-2 border-primary px-8 py-4 font-mono text-lg text-primary transition-all duration-200 hover:bg-primary/10"
        >
          <Mail className="h-5 w-5" />
          send a mail to gillslambiv@gmail.com
        </a>
      </div>

      <footer className="mt-24 border-t border-border pt-8 text-center">
        <p className="font-mono text-sm text-muted-foreground">Built with Next.js & Tailwind CSS</p>
        <p className="mt-2 text-sm text-muted-foreground">© {new Date().getFullYear()} Lambiv Gills Dzenyuy. All rights reserved.</p>
      </footer>
    </section>
  )
}
