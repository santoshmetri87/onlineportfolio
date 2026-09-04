import { formatDateRange, splitLines, splitStack, type Portfolio } from "@portfolio/shared";

type Props = {
  portfolio: Portfolio;
  demo?: boolean;
};

export function PortfolioView({ portfolio, demo }: Props) {
  const { profile, skills, experiences, projects, education, socialLinks, settings } = portfolio;
  const name = profile?.full_name ?? settings?.site_title ?? "Portfolio";
  const categories = [...new Set(skills.map((skill) => skill.category))];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-line/80 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="font-serif text-lg tracking-tight">
            {name}
          </a>
          <nav className="hidden gap-6 text-sm text-muted sm:flex">
            <a href="#work">Work</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      {demo ? (
        <p className="border-b border-line bg-panel px-6 py-2 text-center text-sm text-muted">
          Sample content. Add Supabase keys, then edit everything in{" "}
          <a className="text-accent" href="/admin/login">
            Admin
          </a>
          .
        </p>
      ) : null}

      <main id="top" className="mx-auto max-w-6xl px-6">
        <section className="grid gap-10 py-20 md:grid-cols-[1.4fr_0.8fr] md:items-end">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.25em] text-accent">
              {settings?.availability ?? "Portfolio"}
            </p>
            <h1 className="max-w-3xl font-serif text-5xl leading-[1.05] tracking-tight md:text-7xl">
              {profile?.headline ?? settings?.tagline ?? name}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{profile?.bio}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {profile?.resume_url ? (
                <a
                  className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-[#1a1408]"
                  href={profile.resume_url}
                >
                  Resume
                </a>
              ) : null}
              <a
                className="rounded-full border border-line px-5 py-2 text-sm text-foreground"
                href="#contact"
              >
                Get in touch
              </a>
            </div>
          </div>
          <aside className="rounded-3xl border border-line bg-panel p-6">
            {profile?.headshot_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.headshot_url}
                alt={name}
                className="mb-5 aspect-[4/5] w-full rounded-2xl object-cover"
              />
            ) : (
              <div className="mb-5 flex aspect-[4/5] items-end rounded-2xl bg-[radial-gradient(circle_at_top,#3a2f16,transparent_55%),#1b1610] p-5 font-serif text-4xl">
                {name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </div>
            )}
            <p className="font-serif text-2xl">{name}</p>
            <p className="mt-1 text-muted">{profile?.location}</p>
          </aside>
        </section>

        <section id="skills" className="border-t border-line py-16">
          <h2 className="font-serif text-4xl">Skills</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {categories.map((category) => (
              <div key={category}>
                <h3 className="mb-4 text-sm uppercase tracking-[0.2em] text-accent">{category}</h3>
                <ul className="space-y-3">
                  {skills
                    .filter((skill) => skill.category === category)
                    .map((skill) => (
                      <li key={skill.id} className="flex items-center justify-between gap-4">
                        <span>{skill.name}</span>
                        <span className="text-accent">{"●".repeat(skill.level)}{"○".repeat(5 - skill.level)}</span>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="work" className="border-t border-line py-16">
          <h2 className="font-serif text-4xl">Experience</h2>
          <div className="mt-10 space-y-8">
            {experiences.map((job) => (
              <article key={job.id} className="grid gap-4 md:grid-cols-[220px_1fr]">
                <p className="text-sm text-muted">{formatDateRange(job.start_date, job.end_date)}</p>
                <div>
                  <h3 className="text-xl">
                    {job.role} <span className="text-muted">at {job.company}</span>
                  </h3>
                  {job.location ? <p className="mt-1 text-sm text-muted">{job.location}</p> : null}
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-muted">
                    {splitLines(job.highlights).map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="border-t border-line py-16">
          <h2 className="font-serif text-4xl">Projects</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <article key={project.id} className="overflow-hidden rounded-3xl border border-line bg-panel">
                {project.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={project.image_url} alt="" className="h-48 w-full object-cover" />
                ) : (
                  <div className="h-48 bg-[linear-gradient(135deg,#2a2116,#3d2a12)]" />
                )}
                <div className="p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-accent">
                    {project.featured ? "Featured" : "Project"}
                  </p>
                  <h3 className="mt-2 font-serif text-3xl">{project.title}</h3>
                  <p className="mt-3 text-muted">{project.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {splitStack(project.stack).map((item) => (
                      <span key={item} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex gap-4 text-sm">
                    {project.live_url ? (
                      <a className="text-accent" href={project.live_url}>
                        Live
                      </a>
                    ) : null}
                    {project.repo_url ? (
                      <a className="text-accent" href={project.repo_url}>
                        Code
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="education" className="border-t border-line py-16">
          <h2 className="font-serif text-4xl">Education</h2>
          <div className="mt-8 space-y-5">
            {education.map((item) => (
              <article key={item.id}>
                <h3 className="text-xl">
                  {item.credential} <span className="text-muted">· {item.institution}</span>
                </h3>
                <p className="text-sm text-muted">{formatDateRange(item.start_date, item.end_date)}</p>
                {item.details ? <p className="mt-2 text-muted">{item.details}</p> : null}
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="border-t border-line py-16">
          <h2 className="font-serif text-4xl">Contact</h2>
          <p className="mt-4 max-w-xl text-lg text-muted">
            {settings?.contact_email
              ? `Reach me at ${settings.contact_email}.`
              : "Add a contact email in Admin."}
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            {socialLinks.map((link) => (
              <a key={link.id} className="text-accent" href={link.url}>
                {link.label}
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-line px-6 py-8 text-sm text-muted">
        <div className="mx-auto flex max-w-6xl justify-between">
          <span>© {new Date().getFullYear()} {name}</span>
          <a href="/admin/login">Admin</a>
        </div>
      </footer>
    </div>
  );
}
