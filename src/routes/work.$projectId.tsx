import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

import { getProjectById, projects } from "@/data/projects";

export const Route = createFileRoute("/work/$projectId")({
  head: ({ params }) => {
    const project = getProjectById(params.projectId);
    const title = project ? `${project.title} — ARTGRAPH` : "Project — ARTGRAPH";
    const description = project
      ? `${project.category} project in ${project.location}. ${project.description}`
      : "View selected built work by ARTGRAPH.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: ProjectDetailPage,
  notFoundComponent: ProjectNotFound,
});

function ProjectDetailPage() {
  const { projectId } = Route.useParams();
  const project = getProjectById(projectId);
  if (!project) throw notFound();

  return (
    <main className="relative bg-background text-foreground grain min-h-screen">
      <Nav />
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-[92rem] px-6 md:px-10">
          <Link
            to="/"
            hash="work"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-foreground/60 hover:text-foreground transition-colors mb-10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to work
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="eyebrow mb-4 text-foreground/60">
              Project {project.id} / {project.category}
            </div>
            <h1 className="text-display text-balance text-[clamp(2.5rem,7vw,7rem)] max-w-4xl mb-12">
              {project.title}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden mb-16 md:mb-24"
          >
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover"
              width={1920}
              height={820}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              <h2 className="font-display text-2xl md:text-3xl mb-6">Overview</h2>
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed text-balance">
                {project.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5"
            >
              <div className="border-t border-border pt-8 space-y-6">
                <div className="flex justify-between items-baseline border-b border-border pb-4">
                  <span className="text-sm uppercase tracking-[0.2em] text-foreground/50">Client</span>
                  <span className="font-display text-lg">{project.client}</span>
                </div>
                <div className="flex justify-between items-baseline border-b border-border pb-4">
                  <span className="text-sm uppercase tracking-[0.2em] text-foreground/50">Year</span>
                  <span className="font-display text-lg">{project.year}</span>
                </div>
                <div className="flex justify-between items-baseline border-b border-border pb-4">
                  <span className="text-sm uppercase tracking-[0.2em] text-foreground/50">Location</span>
                  <span className="font-display text-lg text-right">{project.location}</span>
                </div>
                {project.area && (
                  <div className="flex justify-between items-baseline border-b border-border pb-4">
                    <span className="text-sm uppercase tracking-[0.2em] text-foreground/50">Area</span>
                    <span className="font-display text-lg">{project.area}</span>
                  </div>
                )}
                <div className="pt-2">
                  <span className="text-sm uppercase tracking-[0.2em] text-foreground/50 block mb-4">Services</span>
                  <div className="flex flex-wrap gap-2">
                    {project.services.map((s) => (
                      <span
                        key={s}
                        className="inline-flex rounded-full border border-border px-4 py-1.5 text-xs uppercase tracking-[0.15em] text-foreground/70"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-24 md:py-32">
        <div className="mx-auto max-w-[92rem] px-6 md:px-10">
          <div className="flex items-end justify-between gap-8 mb-12">
            <h2 className="text-display text-3xl md:text-4xl">More projects</h2>
            <Link
              to="/"
              hash="work"
              className="text-sm uppercase tracking-[0.2em] text-foreground/60 hover:text-foreground transition-colors"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects
              .filter((p) => p.id !== project.id)
              .slice(0, 3)
              .map((p, i) => (
                <Link
                  key={p.id}
                  to="/work/$projectId"
                  params={{ projectId: p.id }}
                  className="group relative aspect-[4/5] overflow-hidden"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full w-full"
                  >
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                      width={800}
                      height={1000}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5">
                      <span className="text-xs uppercase tracking-[0.2em] text-foreground/60 block mb-1">
                        Project {p.id}
                      </span>
                      <h3 className="font-display text-xl md:text-2xl">{p.title}</h3>
                    </div>
                  </motion.div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ProjectNotFound() {
  return (
    <main className="relative bg-background text-foreground grain min-h-screen flex items-center justify-center">
      <Nav />
      <div className="text-center px-6">
        <div className="eyebrow mb-4">404</div>
        <h1 className="text-display text-[clamp(2rem,5vw,4rem)] mb-6">Project not found</h1>
        <Link
          to="/"
          hash="work"
          className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-foreground/60 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to work
        </Link>
      </div>
      <Footer />
    </main>
  );
}

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 py-4">
      <div className="mx-auto flex max-w-[92rem] items-center justify-between px-6 md:px-10">
        <Link to="/" className="flex items-center" aria-label="Home">
          <span className="font-display text-2xl tracking-tight">ARTGRAPH</span>
        </Link>
        <nav className="hidden md:flex items-center gap-10 text-sm text-foreground/70">
          <Link to="/" hash="work" className="hover:text-foreground transition-colors">
            Work
          </Link>
          <Link to="/" hash="craft" className="hover:text-foreground transition-colors">
            Craft
          </Link>
          <Link to="/" hash="services" className="hover:text-foreground transition-colors">
            Services
          </Link>
          <Link to="/" hash="studio" className="hover:text-foreground transition-colors">
            Studio
          </Link>
        </nav>
        <Link
          to="/"
          hash="contact"
          className="group relative inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors"
        >
          Start a project
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </Link>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-12 md:py-16">
      <div className="mx-auto max-w-[92rem] px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="font-display text-xl">ARTGRAPH</span>
        <p className="text-sm text-foreground/50">
          © {new Date().getFullYear()} ARTGRAPH. Creative design & production.
        </p>
      </div>
    </footer>
  );
}
