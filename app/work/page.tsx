"use client"

import * as React from "react"
import { motion } from "framer-motion"

const projects = [
  {
    title: "E-Commerce Platform Redesign",
    client: "Fortune 500 Retail",
    description: "Complete front-end overhaul resulting in 40% increase in conversion rate and 60% improvement in Core Web Vitals scores.",
    tags: ["Next.js", "TypeScript", "GSAP", "Performance"],
    image: "/images/project-1.jpg",
  },
  {
    title: "Interactive Data Dashboard",
    client: "FinTech Startup",
    description: "Real-time analytics platform with advanced visualizations and micro-interactions. Reduced load time by 70%.",
    tags: ["React", "D3.js", "Framer Motion", "WebSocket"],
    image: "/images/project-2.jpg",
  },
  {
    title: "Design System Implementation",
    client: "SaaS Company",
    description: "Built comprehensive component library used across 12 products, reducing development time by 50%.",
    tags: ["React", "Storybook", "Tailwind", "TypeScript"],
    image: "/images/project-3.jpg",
  },
]

export default function WorkPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-neutral-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="font-serif text-5xl md:text-6xl font-semibold mb-6">
              Selected Work
            </h1>
            <p className="text-xl text-muted-foreground">
              Case studies showcasing technical excellence and measurable results
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="space-y-24">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="bg-neutral-100 aspect-video rounded-lg flex items-center justify-center text-muted-foreground">
                    Project Image Placeholder
                  </div>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <p className="text-sm text-accent-500 font-semibold mb-2">
                    {project.client}
                  </p>
                  <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
                    {project.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-neutral-100 rounded-full text-sm text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-6">
              Want results like these?
            </h2>
            <a href="/book">
              <button className="bg-accent-500 text-primary-900 px-8 py-4 rounded-lg font-semibold hover:bg-accent-400 transition-colors text-lg">
                Let's Talk
              </button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
