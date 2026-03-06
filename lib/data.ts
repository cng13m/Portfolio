export interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  githubUrl: string
  liveUrl?: string
  previewType: "iframe" | "readme" | "none"
  previewAssets: string[]
  featured: boolean
  status: "completed" | "in-progress" | "archived"
  image: string
}

export const projects: Project[] = [
  {
    id: "terraform-rds",
    title: "TerraformRDS",
    description:
      "This project deploys a secure AWS environment for PostgreSQL on Amazon RDS with a bastion host for controlled access.",
    tech: ["Terraform", "AWS", "RDS", "PostgreSQL", "EC2"],
    githubUrl: "https://github.com/cng13m/TerraformRDS",
    previewType: "none",
    previewAssets: ["/placeholder.svg"],
    featured: true,
    status: "completed",
    image: "/placeholder.svg",
  },
  {
    id: "terraform-eu-demo",
    title: "TerraformEU-Demo",
    description:
      "This repository is a modular Terraform demo that provisions core AWS infrastructure in eu-central-1.",
    tech: ["Terraform", "AWS", "VPC", "IAM", "eu-central-1"],
    githubUrl: "https://github.com/cng13m/TerraformEU-Demo",
    previewType: "none",
    previewAssets: ["/placeholder.svg"],
    featured: true,
    status: "completed",
    image: "/placeholder.svg",
  },
  {
    id: "relativityx",
    title: "RelativityX",
    description:
      "RelativityX is an interactive web app that brings Einstein's theory of relativity to life in an exciting cosmic adventure.",
    tech: ["Next.js", "React", "TypeScript", "Vercel"],
    githubUrl: "https://github.com/cng13m/RelativityX",
    liveUrl: "https://relativityx.vercel.app/",
    previewType: "iframe",
    previewAssets: ["/placeholder.svg"],
    featured: true,
    status: "completed",
    image: "/placeholder.svg",
  },
  {
    id: "fol-ai",
    title: "FOL AI",
    description:
      "FOL-AI automatizon mbeshtetjen e klienteve tuaj 24/7. Fol shqip, integrohu me WhatsApp, dhe rriti shitjet me inteligjence artificiale.",
    tech: ["AI", "Automation", "WhatsApp", "Vercel"],
    githubUrl: "https://github.com/cng13m/fol-ai",
    liveUrl: "https://folai.vercel.app/",
    previewType: "iframe",
    previewAssets: ["/images/projects/fol-ai-preview.png"],
    featured: true,
    status: "completed",
    image: "/images/projects/fol-ai-preview.png",
  },
]

export interface Experience {
  title: string
  company: string
  type: "work" | "volunteer"
  startDate: string
  endDate: string
  description: string
}

export const experiences: Experience[] = [
  {
    title: "Owner",
    company: "ATM Prod.",
    type: "work",
    startDate: "Mar 2019",
    endDate: "Present",
    description:
      "Founder and Owner of ATM Prod., an online music production and sales business I started at 17 and still run part-time. I handle production, publishing, customer communication, and sales operations.",
  },
  {
    title: "Volunteer, Steering Council",
    company: "KVRL-Gjilan",
    type: "volunteer",
    startDate: "Jan 2016",
    endDate: "Dec 2019",
    description:
      "Contributed to community initiatives and organizational governance. Collaborated with council members on strategic planning and resource allocation.",
  },
]

export interface Certification {
  title: string
  issuer: string
  icon: string
}

export const certifications: Certification[] = [
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    icon: "aws",
  },
  {
    title: "Introduction to Networks",
    issuer: "Cisco NetAcad",
    icon: "cisco",
  },
  {
    title: "Switching, Routing, and Wireless Essentials (SRWE)",
    issuer: "Cisco NetAcad",
    icon: "cisco",
  },
  {
    title: "Enterprise Networking, Security, and Automation (ENSA)",
    issuer: "Cisco NetAcad",
    icon: "cisco",
  },
]

export const skills = [
  "Linux",
  "Bash",
  "Terraform",
  "Docker",
  "AWS",
  "Networking",
  "Git/GitHub",
  "CI/CD",
  "Ansible",
]

export const personalInfo = {
  name: "Genc Shefkiu",
  role: "Junior DevOps Engineer",
  tagline: "Building reliable infrastructure and automating everything in between.",
  email: "shefkiu.genc@gmail.com",
  linkedin: "https://www.linkedin.com/in/genc-shefkiu-095840396/",
  github: "https://github.com/cng13m",
  location: "Kosovo",
}
