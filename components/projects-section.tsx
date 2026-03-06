"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import {
  ExternalLink,
  Eye,
  FileText,
  Github,
  Globe,
  Play,
  X,
} from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { projects, type Project } from "@/lib/data"
import { cn } from "@/lib/utils"

function getProjectHost(project: Project) {
  if (!project.liveUrl) {
    return `${project.tech[0]} workspace`
  }

  try {
    return new URL(project.liveUrl).hostname.replace(/^www\./, "")
  } catch {
    return project.liveUrl
  }
}

function getPreviewLabel(project: Project) {
  switch (project.previewType) {
    case "iframe":
      return "Interactive preview"
    case "readme":
      return "Project brief"
    default:
      return "Repository snapshot"
  }
}

function getStatusLabel(status: Project["status"]) {
  switch (status) {
    case "in-progress":
      return "In progress"
    case "archived":
      return "Archived"
    default:
      return "Shipped"
  }
}

function getStatusClassName(status: Project["status"]) {
  switch (status) {
    case "in-progress":
      return "border-amber-500/25 bg-amber-500/10 text-amber-200"
    case "archived":
      return "border-slate-400/20 bg-slate-400/10 text-slate-300"
    default:
      return "border-emerald-500/25 bg-emerald-500/10 text-emerald-200"
  }
}

function ProjectPoster({
  project,
  className,
}: {
  project: Project
  className?: string
}) {
  const previewImage = project.previewAssets[0] || project.image
  const hostLabel = getProjectHost(project)
  const isLiveProject = project.previewType === "iframe" && !!project.liveUrl

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.45rem] border border-white/10 bg-slate-950/95 shadow-[0_28px_80px_-42px_rgba(34,211,238,0.38)]",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.26),transparent_30%),radial-gradient(circle_at_82%_16%,rgba(59,130,246,0.22),transparent_26%),radial-gradient(circle_at_52%_100%,rgba(14,165,233,0.14),transparent_32%),linear-gradient(180deg,rgba(2,6,23,0.96),rgba(15,23,42,0.88))]" />
      {previewImage && (
        <div
          className="absolute inset-0 opacity-55 [background-position:center_top] [background-size:cover]"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(2, 6, 23, 0.18), rgba(2, 6, 23, 0.76)), url(${previewImage})`,
          }}
        />
      )}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.02),rgba(2,6,23,0.84))]" />

      <div className="relative flex h-full flex-col">
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <span className="min-w-0 truncate font-mono text-[10px] tracking-[0.22em] text-slate-400 uppercase">
            {hostLabel}
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 font-mono text-[10px] tracking-[0.2em] text-cyan-100/80 uppercase">
            {isLiveProject ? <Globe className="h-3 w-3" /> : <FileText className="h-3 w-3" />}
            {isLiveProject ? "Live" : "Code"}
          </span>
        </div>

        <div className="relative flex-1 px-4 pb-4 pt-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/50 px-3 py-1.5 backdrop-blur-md">
              {isLiveProject ? (
                <Globe className="h-3.5 w-3.5 text-cyan-200" />
              ) : (
                <FileText className="h-3.5 w-3.5 text-cyan-200" />
              )}
              <span className="font-mono text-[10px] tracking-[0.24em] text-cyan-100/80 uppercase">
                {getPreviewLabel(project)}
              </span>
            </div>

            <div className="grid grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-3">
              <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm">
                <div className="mb-3 h-2.5 w-24 rounded-full bg-cyan-100/35" />
                <div className="space-y-2">
                  <div className="h-2 rounded-full bg-white/14" />
                  <div className="h-2 rounded-full bg-white/10" />
                  <div className="h-2 w-4/5 rounded-full bg-white/12" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.06] p-3 backdrop-blur-sm">
                  <div className="mb-2 h-2 w-12 rounded-full bg-cyan-100/35" />
                  <div className="h-7 rounded-2xl bg-white/10" />
                </div>
                <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.06] p-3 backdrop-blur-sm">
                  <div className="mb-2 h-2 w-10 rounded-full bg-white/25" />
                  <div className="h-7 rounded-2xl bg-white/10" />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
            <div className="rounded-[1.2rem] border border-white/10 bg-slate-950/65 px-4 py-3 shadow-[0_22px_60px_-35px_rgba(34,211,238,0.58)] backdrop-blur-md">
              <p className="font-mono text-[10px] tracking-[0.24em] text-cyan-100/70 uppercase">
                {project.tech.slice(0, 2).join(" / ")}
              </p>
              <p className="mt-1 text-sm font-medium text-white/95">
                {isLiveProject ? "Interactive build ready" : "Repository overview"}
              </p>
            </div>

            <span
              className={cn(
                "rounded-full border px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] uppercase shadow-lg backdrop-blur-md",
                getStatusClassName(project.status),
              )}
            >
              {getStatusLabel(project.status)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectCard({
  project,
  index,
  onPreview,
  toneDownMotion,
}: {
  project: Project
  index: number
  onPreview: (project: Project) => void
  toneDownMotion: boolean
}) {
  const hasPreview = project.previewType !== "none"
  const hostLabel = getProjectHost(project)

  return (
    <motion.article
      initial={{ opacity: 0, y: toneDownMotion ? 18 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: toneDownMotion ? 0.35 : 0.55,
        delay: toneDownMotion ? 0 : index * 0.08,
      }}
      viewport={{ once: true, margin: toneDownMotion ? "-40px" : "-80px" }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border/70 bg-card/80 shadow-[0_28px_90px_-55px_rgba(34,211,238,0.42)] transition-[transform,border-color,box-shadow] duration-300 md:hover:-translate-y-1 md:hover:border-primary/35 md:hover:shadow-[0_30px_95px_-50px_rgba(34,211,238,0.5)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_38%)] opacity-0 transition-opacity duration-300 md:group-hover:opacity-100" />

      <div className="relative aspect-[16/11] p-4 md:p-5">
        <ProjectPoster project={project} className="h-full" />

        {hasPreview && (
          <div className="absolute inset-x-7 bottom-7 flex justify-end">
            <button
              onClick={() => onPreview(project)}
              className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.92] px-4 py-2 text-sm font-medium text-slate-950 shadow-[0_20px_50px_-25px_rgba(255,255,255,0.8)] transition-[transform,opacity] duration-300 hover:scale-[1.02] md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
            >
              <Eye className="h-4 w-4" />
              Preview
            </button>
          </div>
        )}
      </div>

      <div className="relative flex flex-1 flex-col px-5 pb-5 pt-1">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold leading-tight text-foreground">
              {project.title}
            </h3>
            <p className="mt-1 truncate font-mono text-[10px] tracking-[0.24em] text-muted-foreground uppercase">
              {hostLabel}
            </p>
          </div>

          <span
            className={cn(
              "shrink-0 rounded-full border px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] uppercase",
              getStatusClassName(project.status),
            )}
          >
            {getStatusLabel(project.status)}
          </span>
        </div>

        <p className="mb-5 flex-1 text-sm leading-7 text-muted-foreground">
          {project.description}
        </p>

        <div className="mb-5 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border/80 bg-secondary/55 px-3 py-1 text-[11px] text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 border-t border-border/80 pt-4">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-secondary/35 px-3.5 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
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
              className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-secondary/35 px-3.5 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
              aria-label={`View ${project.title} live demo`}
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Live Demo
            </a>
          )}

          {hasPreview && (
            <button
              onClick={() => onPreview(project)}
              className="inline-flex items-center gap-2 rounded-full bg-primary/12 px-3.5 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary/18"
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
  isMobile,
  toneDownMotion,
}: {
  project: Project
  onClose: () => void
  isMobile: boolean
  toneDownMotion: boolean
}) {
  const canEmbedLive = project.previewType === "iframe" && !!project.liveUrl
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [iframeFailed, setIframeFailed] = useState(false)
  const [shouldRenderIframe, setShouldRenderIframe] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [onClose])

  useEffect(() => {
    if (!canEmbedLive || toneDownMotion) {
      return
    }

    const isTouchDevice = window.matchMedia("(hover: none), (pointer: coarse)").matches
    const isNarrowViewport = window.matchMedia("(max-width: 767px)").matches

    if (!isTouchDevice && !isNarrowViewport) {
      setShouldRenderIframe(true)
    }
  }, [canEmbedLive, toneDownMotion])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center p-0 md:items-center md:p-6"
      onClick={onClose}
    >
      <div
        className={cn(
          "absolute inset-0 bg-background/92",
          !isMobile && "backdrop-blur-sm",
        )}
      />

      <motion.div
        initial={{ opacity: 0, y: toneDownMotion ? 18 : 28, scale: toneDownMotion ? 1 : 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: toneDownMotion ? 0.2 : 0.28 }}
        className="relative flex h-[min(92vh,860px)] w-full max-w-6xl flex-col overflow-hidden rounded-t-[2rem] border border-white/10 bg-card/95 shadow-[0_32px_120px_-48px_rgba(15,23,42,0.9)] md:rounded-[2rem]"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`project-preview-title-${project.id}`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-border/80 px-4 py-3 md:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="h-3 w-3 rounded-full bg-rose-400/80" />
              <span className="h-3 w-3 rounded-full bg-amber-300/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
            </div>

            <div className="min-w-0">
              <p className="truncate font-mono text-[10px] tracking-[0.24em] text-muted-foreground uppercase">
                {getProjectHost(project)}
              </p>
              <h3
                id={`project-preview-title-${project.id}`}
                className="truncate text-sm font-medium text-foreground md:text-base"
              >
                {project.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full border border-border/80 p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Close preview"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid min-h-0 flex-1 lg:grid-cols-[minmax(0,1.35fr)_340px]">
          <div className="min-h-[320px] border-b border-border/80 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.1),transparent_40%)] lg:border-b-0 lg:border-r">
            {canEmbedLive ? (
              <div className="flex h-full flex-col gap-4 p-4 md:p-6">
                {shouldRenderIframe ? (
                  <div className="relative flex-1 overflow-hidden rounded-[1.6rem] border border-white/10 bg-slate-950 shadow-[0_28px_90px_-45px_rgba(34,211,238,0.32)]">
                    {!iframeLoaded && !iframeFailed && (
                      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-slate-950/90 p-6 text-center">
                        <ProjectPoster project={project} className="h-52 w-full max-w-xl" />
                        <p className="font-mono text-xs tracking-[0.24em] text-slate-400 uppercase">
                          Loading live preview
                        </p>
                      </div>
                    )}

                    {iframeFailed && (
                      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-slate-950/92 p-6 text-center">
                        <p className="max-w-sm text-sm leading-6 text-slate-300">
                          This project does not allow embedded previews, or the live site
                          failed to load inside the modal.
                        </p>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-950 transition-opacity hover:opacity-90"
                          >
                            <ExternalLink className="h-4 w-4" />
                            Open live demo
                          </a>
                        )}
                      </div>
                    )}

                    <iframe
                      src={project.liveUrl}
                      title={`Preview of ${project.title}`}
                      className={cn(
                        "h-full w-full border-0 transition-opacity duration-300",
                        iframeLoaded ? "opacity-100" : "opacity-0",
                      )}
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                      loading="eager"
                      onLoad={() => setIframeLoaded(true)}
                      onError={() => {
                        setIframeFailed(true)
                        setIframeLoaded(false)
                      }}
                    />
                  </div>
                ) : (
                  <>
                    <ProjectPoster project={project} className="min-h-[320px] flex-1" />

                    <div className="flex flex-col gap-4 rounded-[1.4rem] border border-border/80 bg-card/75 p-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="font-mono text-[10px] tracking-[0.24em] text-primary uppercase">
                          Lightweight mode
                        </p>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          Interactive embeds stay paused on touch devices so the cards and
                          modal remain smooth.
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setIframeFailed(false)
                          setIframeLoaded(false)
                          setShouldRenderIframe(true)
                        }}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                      >
                        <Play className="h-4 w-4" />
                        Load live preview
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex h-full flex-col gap-4 p-4 md:p-6">
                <ProjectPoster project={project} className="min-h-[320px] flex-1" />

                <div className="rounded-[1.4rem] border border-border/80 bg-card/75 p-4">
                  <p className="font-mono text-[10px] tracking-[0.24em] text-primary uppercase">
                    Clean summary view
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    This project is better presented as a structured overview instead of an
                    embedded browser preview.
                  </p>
                </div>
              </div>
            )}
          </div>

          <aside className="flex min-h-0 flex-col bg-[linear-gradient(180deg,rgba(15,23,42,0.16),rgba(15,23,42,0.02))]">
            <div className="flex-1 overflow-y-auto p-5 md:p-6">
              <p className="font-mono text-[10px] tracking-[0.24em] text-primary uppercase">
                {getPreviewLabel(project)}
              </p>

              <h4 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
                {project.title}
              </h4>

              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {project.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border/80 bg-secondary/50 px-3 py-1 text-xs text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-6 rounded-[1.25rem] border border-border/80 bg-secondary/35 p-4">
                <p className="font-mono text-[10px] tracking-[0.24em] text-muted-foreground uppercase">
                  Preview mode
                </p>
                <p className="mt-2 text-sm leading-6 text-foreground">
                  {canEmbedLive
                    ? shouldRenderIframe
                      ? "The live site is running inside the modal. If it feels heavy, open the demo in a new tab for the best experience."
                      : "The preview starts in a lightweight state and only loads the live site when you explicitly request it."
                    : "This project uses a polished summary view because the repository content matters more than a live embed."}
                </p>
              </div>
            </div>

            <div className="border-t border-border/80 p-5 md:p-6">
              <div className="flex flex-wrap gap-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-secondary/45 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/30"
                >
                  <Github className="h-4 w-4" />
                  View source
                </a>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open live demo
                  </a>
                )}
              </div>
            </div>
          </aside>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function ProjectsSection() {
  const [activePreview, setActivePreview] = useState<Project | null>(null)
  const isMobile = useIsMobile()
  const reduceMotion = useReducedMotion()
  const toneDownMotion = isMobile || !!reduceMotion

  return (
    <section id="projects" className="relative px-6 py-32">
      <div className="pointer-events-none absolute inset-x-0 top-20 h-80 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_52%)]" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: toneDownMotion ? 16 : 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: toneDownMotion ? 0.35 : 0.6 }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="mb-3 font-mono text-sm tracking-widest text-primary uppercase">
            Projects
          </p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Featured work
          </h2>
          <p className="mb-12 max-w-2xl text-lg leading-8 text-muted-foreground">
            A curated set of infrastructure, automation, and product builds with
            faster previews and a cleaner presentation across desktop and mobile.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onPreview={setActivePreview}
              toneDownMotion={toneDownMotion}
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
            isMobile={isMobile}
            toneDownMotion={toneDownMotion}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
