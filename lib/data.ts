export interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  githubUrl: string
  liveUrl?: string
  previewType: "iframe" | "readme"
  previewAssets: string[]
  featured: boolean
  status: "completed" | "in-progress" | "archived"
  image: string
}

export const projects: Project[] = [
  {
    id: "cloud-infra-automation",
    title: "Cloud Infrastructure Automation",
    description:
      "Terraform modules for provisioning AWS infrastructure including VPCs, EC2 instances, RDS databases, and S3 buckets with automated CI/CD pipelines.",
    tech: ["Terraform", "AWS", "GitHub Actions", "Bash"],
    githubUrl: "https://github.com/cng13m/cloud-infra-automation",
    previewType: "readme",
    previewAssets: ["/images/projects/cloud-infra.jpg"],
    featured: true,
    status: "completed",
    image: "/images/projects/cloud-infra.jpg",
  },
  {
    id: "docker-monitoring-stack",
    title: "Docker Monitoring Stack",
    description:
      "A complete monitoring solution using Prometheus, Grafana, and Alertmanager deployed with Docker Compose. Includes custom dashboards and alert rules.",
    tech: ["Docker", "Prometheus", "Grafana", "Linux"],
    githubUrl: "https://github.com/cng13m/docker-monitoring",
    liveUrl: "https://monitoring-demo.example.com",
    previewType: "iframe",
    previewAssets: ["/images/projects/monitoring.jpg"],
    featured: true,
    status: "completed",
    image: "/images/projects/monitoring.jpg",
  },
  {
    id: "linux-server-hardening",
    title: "Linux Server Hardening Scripts",
    description:
      "Collection of Bash scripts for automated Linux server hardening following CIS benchmarks. Includes firewall configuration, SSH hardening, and audit logging.",
    tech: ["Bash", "Linux", "Security", "Ansible"],
    githubUrl: "https://github.com/cng13m/linux-hardening",
    previewType: "readme",
    previewAssets: ["/images/projects/linux-hardening.jpg"],
    featured: true,
    status: "completed",
    image: "/images/projects/linux-hardening.jpg",
  },
  {
    id: "ci-cd-pipeline-template",
    title: "CI/CD Pipeline Template",
    description:
      "Reusable GitHub Actions workflow templates for building, testing, and deploying containerized applications to AWS ECS with blue-green deployment strategy.",
    tech: ["GitHub Actions", "Docker", "AWS ECS", "Bash"],
    githubUrl: "https://github.com/cng13m/cicd-templates",
    previewType: "readme",
    previewAssets: ["/images/projects/cicd.jpg"],
    featured: false,
    status: "completed",
    image: "/images/projects/cicd.jpg",
  },
  {
    id: "network-topology-visualizer",
    title: "Network Topology Visualizer",
    description:
      "A web-based tool for visualizing network topologies. Supports importing configurations from Cisco devices and generating interactive diagrams.",
    tech: ["TypeScript", "React", "Networking", "Docker"],
    githubUrl: "https://github.com/cng13m/net-topology",
    liveUrl: "https://net-topo.example.com",
    previewType: "iframe",
    previewAssets: ["/images/projects/network.jpg"],
    featured: false,
    status: "in-progress",
    image: "/images/projects/network.jpg",
  },
  {
    id: "aws-cost-optimizer",
    title: "AWS Cost Optimizer",
    description:
      "Python-based tool that analyzes AWS resource usage and provides cost optimization recommendations. Integrates with AWS Cost Explorer API.",
    tech: ["Python", "AWS", "Lambda", "CloudWatch"],
    githubUrl: "https://github.com/cng13m/aws-cost-optimizer",
    previewType: "readme",
    previewAssets: ["/images/projects/aws-cost.jpg"],
    featured: false,
    status: "completed",
    image: "/images/projects/aws-cost.jpg",
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
