"use client"

import { motion } from "framer-motion"
import { Download, FileText } from "lucide-react"

const CV_FILE_PATH = "/cv/Genc_Shefkiu_CV.pdf"

export function CvSection() {
  return (
    <section id="cv" className="relative px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <p className="mb-3 font-mono text-sm tracking-widest text-primary uppercase">
            CV
          </p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Curriculum Vitae
          </h2>
          <p className="mb-8 max-w-xl text-lg text-muted-foreground">
            Download my latest CV in PDF format.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true, margin: "-80px" }}
          className="rounded-2xl border border-border bg-card p-6"
        >
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Genc_Shefkiu_CV.pdf</p>
                <p className="text-sm text-muted-foreground">PDF document</p>
              </div>
            </div>

            <a
              href={CV_FILE_PATH}
              download
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-all hover:opacity-90"
            >
              <Download className="h-4 w-4" />
              Download CV
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

