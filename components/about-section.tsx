"use client"

import { motion } from "framer-motion"
import { personalInfo, skills } from "@/lib/data"

export function AboutSection() {
  return (
    <section id="about" className="relative px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <p className="mb-3 font-mono text-sm tracking-widest text-primary uppercase">
            About
          </p>
          <h2 className="mb-8 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            A bit about me
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12 max-w-2xl"
        >
          <p className="mb-4 text-lg leading-relaxed text-muted-foreground">
            {"Motivated individual seeking to begin a career in IT with a focus on cloud infrastructure and DevOps technologies. Built foundational knowledge through certifications and hands-on practice in Linux systems, networking, Docker containers, and Infrastructure as Code using Terraform."}
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {"Highly motivated to learn and develop practical skills in a professional environment. Known for persistence, curiosity, and the ability to adapt quickly to new technical challenges."}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <p className="mb-4 font-mono text-xs tracking-widest text-muted-foreground uppercase">
            Technologies & Tools
          </p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="rounded-lg border border-border bg-secondary/50 px-3 py-1.5 font-mono text-xs text-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
