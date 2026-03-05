"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, Eye, X, FileText, Globe } from "lucide-react"
import { projects, type Project } from "@/lib/data"

function ProjectCard({
  project,
  index,
  onPreview,
}: {
  project: Project
  index: number
  onPreview: (project: Project) => void
}) {
  const hasPreview = project.previewType !== "none"
  const previewImage = project.previewAssets[0] || project.image

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-80px" }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="relative aspect-video overflow-hidden bg-secondary">
        {previewImage && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-80"
            style={{
              backgroundImage: `url(${previewImage}), linear-gradient(135deg, rgba(14,165,233,0.35), rgba(59,130,246,0.35), rgba(99,102,241,0.35))`,
            }}
          />
        )}
        <div className="absolute inset-0 bg-background/45" />
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              {project.previewType === "iframe" ? (
                <Globe className="h-6 w-6 text-primary" />
              ) : (
                <FileText className="h-6 w-6 text-primary" />
              )}
            </div>
            <p className="text-xs text-muted-foreground">{project.tech[0]}</p>
          </div>
        </div>
        {hasPreview && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={() => onPreview(project)}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-105"
            >
              <Eye className="h-4 w-4" />
              Preview
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold text-foreground leading-tight">
            {project.title}
          </h3>
          {project.status === "in-progress" && (
            <span className="shrink-0 rounded-md bg-primary/10 px-2 py-0.5 font-mono text-[10px] text-primary">
              WIP
            </span>
          )}
        </div>

        <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-md bg-secondary px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 border-t border-border pt-4">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            aria-label={`View ${project.title} on GitHub`}
          >
            <Github className="h-3.5 w-3.5" />
            Source
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
              aria-label={`View ${project.title} live demo`}
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Live Demo
            </a>
          )}
          {hasPreview && (
            <button
              onClick={() => onPreview(project)}
              className="ml-auto inline-flex items-center gap-1.5 text-xs text-primary transition-colors hover:text-primary/80"
            >
              <Eye className="h-3.5 w-3.5" />
              Preview
            </button>
          )}
        </div>
      </div>
    </motion.article>
  )
}

function PreviewModal({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  const previewImage = project.previewAssets[0] || project.image
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [iframeFailed, setIframeFailed] = useState(false)
  const showIframe = project.previewType === "iframe" && project.liveUrl

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative flex h-[85vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <button
                onClick={onClose}
                className="h-3 w-3 rounded-full bg-destructive/70 transition-colors hover:bg-destructive"
                aria-label="Close preview"
              />
              <div className="h-3 w-3 rounded-full bg-muted" />
              <div className="h-3 w-3 rounded-full bg-muted" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              {project.title}
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Close preview"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1">
          {showIframe ? (
            <div className="flex h-full flex-col overflow-hidden">
              <div className="relative h-48 w-full shrink-0 overflow-hidden border-b border-border bg-secondary">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={
                    previewImage
                      ? {
                          backgroundImage: `url(${previewImage}), linear-gradient(135deg, rgba(14,165,233,0.35), rgba(59,130,246,0.35), rgba(99,102,241,0.35))`,
                        }
                      : {
                          background:
                            "linear-gradient(135deg, rgba(14,165,233,0.35), rgba(59,130,246,0.35), rgba(99,102,241,0.35))",
                        }
                  }
                />
                <div className="absolute inset-0 bg-background/25" />
              </div>
              <div className="relative flex-1 bg-secondary/40">
                {!iframeLoaded && !iframeFailed && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/70">
                    <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                      Loading live preview...
                    </p>
                  </div>
                )}
                {iframeFailed && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-background/85 px-6 text-center">
                    <p className="text-sm text-muted-foreground">
                      Live preview could not be embedded.
                    </p>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Open Live Demo
                    </a>
                  </div>
                )}
                <iframe
                  src={project.liveUrl}
                  title={`Preview of ${project.title}`}
                  className="h-full w-full border-0"
                  sandbox="allow-scripts allow-same-origin"
                  loading="lazy"
                  onLoad={() => setIframeLoaded(true)}
                  onError={() => setIframeFailed(true)}
                />
              </div>
            </div>
          ) : (
            <div className="h-full overflow-y-auto p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">{project.tech.join(" / ")}</p>
                </div>
              </div>

              <div className="mb-6 rounded-xl bg-secondary/50 p-5">
                <h4 className="mb-2 font-mono text-xs tracking-widest text-muted-foreground uppercase">
                  Description
                </h4>
                <p className="leading-relaxed text-foreground">{project.description}</p>
              </div>

              <div className="mb-6">
                <h4 className="mb-3 font-mono text-xs tracking-widest text-muted-foreground uppercase">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-border bg-secondary/50 px-3 py-1.5 font-mono text-xs text-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-secondary px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary/80"
                >
                  <Github className="h-4 w-4" />
                  View on GitHub
                </a>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export function ProjectsSection() {
  const [activePreview, setActivePreview] = useState<Project | null>(null)

  return (
    <section id="projects" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <p className="mb-3 font-mono text-sm tracking-widest text-primary uppercase">
            Projects
          </p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Featured work
          </h2>
          <p className="mb-12 max-w-xl text-lg text-muted-foreground">
            A collection of selected projects in infrastructure, automation, and web applications.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onPreview={setActivePreview}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activePreview && (
          <PreviewModal
            key={activePreview.id}
            project={activePreview}
            onClose={() => setActivePreview(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
