"use client"

import { motion } from "framer-motion"
import { Briefcase, Heart, Award, ShieldCheck } from "lucide-react"
import { experiences, certifications } from "@/lib/data"

export function ExperienceSection() {
  return (
    <section id="experience" className="relative px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <p className="mb-3 font-mono text-sm tracking-widest text-primary uppercase">
            Experience
          </p>
          <h2 className="mb-12 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {"Where I've been"}
          </h2>
        </motion.div>

        <div className="relative mb-20">
          <div className="absolute top-0 bottom-0 left-4 w-px bg-border md:left-1/2 md:-translate-x-px" />

          {experiences.map((exp, i) => (
            <motion.div
              key={`${exp.company}-${exp.startDate}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true, margin: "-80px" }}
              className={`relative mb-12 flex flex-col pl-12 md:w-1/2 md:pl-0 ${
                i % 2 === 0 ? "md:pr-12" : "md:ml-auto md:pl-12"
              }`}
            >
              <div
                className={`absolute top-1 left-2.5 flex h-3 w-3 items-center justify-center rounded-full border-2 border-primary bg-background md:top-1 ${
                  i % 2 === 0
                    ? "md:left-auto md:-right-1.5"
                    : "md:-left-1.5"
                }`}
              />

              <div className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30">
                <div className="mb-3 flex items-center gap-2">
                  {exp.type === "work" ? (
                    <Briefcase className="h-4 w-4 text-primary" />
                  ) : (
                    <Heart className="h-4 w-4 text-primary" />
                  )}
                  <span className="font-mono text-xs text-muted-foreground">
                    {exp.startDate} &mdash; {exp.endDate}
                  </span>
                </div>
                <h3 className="mb-1 text-base font-semibold text-foreground">
                  {exp.title}
                </h3>
                <p className="mb-3 text-sm font-medium text-primary">
                  {exp.company}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <p className="mb-3 font-mono text-sm tracking-widest text-primary uppercase">
            Certifications
          </p>
          <h2 className="mb-8 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Credentials
          </h2>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-80px" }}
              className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                {cert.icon === "aws" ? (
                  <Award className="h-5 w-5 text-primary" />
                ) : (
                  <ShieldCheck className="h-5 w-5 text-primary" />
                )}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  {cert.title}
                </h3>
                <p className="text-xs text-muted-foreground">{cert.issuer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
