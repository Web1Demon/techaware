"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const services = [
  {
    title: "Front-End Engineering",
    description: "Building exceptional user interfaces with modern frameworks and best practices.",
    features: [
      "Single-page applications (React, Next.js, Vue)",
      "Design system implementation",
      "Performance optimization",
      "Accessibility compliance (WCAG 2.1 AA)",
      "Component architecture",
      "TypeScript integration",
    ],
    deliverables: [
      "Production-ready codebase",
      "Component documentation",
      "Performance audit report",
      "Deployment pipeline setup",
    ],
  },
  {
    title: "Advanced UI Animations",
    description: "Creating engaging, performant animations that enhance user experience.",
    features: [
      "Scroll-triggered animations (GSAP ScrollTrigger)",
      "Page transitions (Framer Motion)",
      "Interactive data visualizations",
      "WebGL experiences (Three.js, React Three Fiber)",
      "Micro-interactions",
      "Physics-based animations",
    ],
    deliverables: [
      "Motion design system",
      "Reusable animation components",
      "Performance-optimized implementations",
      "Browser compatibility testing",
    ],
  },
  {
    title: "Product Consulting",
    description: "Strategic technical guidance to help your team build better products.",
    features: [
      "Technical architecture review",
      "Technology stack recommendations",
      "Code quality audits",
      "Team training & workshops",
      "Product roadmap planning",
      "Vendor/agency evaluation",
    ],
    deliverables: [
      "Technical strategy document",
      "Architecture diagrams",
      "Risk assessment",
      "Implementation timeline",
    ],
  },
]

export default function ServicesPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

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
              Services
            </h1>
            <p className="text-xl text-muted-foreground">
              Specialized expertise to transform your technical challenges into elegant solutions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-24" ref={ref}>
        <div className="container mx-auto px-4">
          <div className="space-y-32">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
              >
                <div>
                  <h2 className="font-serif text-4xl font-semibold mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    {service.description}
                  </p>
                  <div>
                    <h3 className="font-semibold text-xl mb-4">What I Build</h3>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <svg
                            className="w-5 h-5 text-accent-500 mt-0.5 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="bg-neutral-50 p-8 rounded-lg border border-border/50">
                  <h3 className="font-semibold text-xl mb-4">Deliverables</h3>
                  <ul className="space-y-3">
                    {service.deliverables.map((deliverable) => (
                      <li key={deliverable} className="flex items-start gap-3">
                        <svg
                          className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-6">
              Let's build something exceptional
            </h2>
            <p className="text-xl text-neutral-200 mb-8 max-w-2xl mx-auto">
              Whether you need a technical co-founder, a front-end specialist, or strategic product guidance—I'm here to help.
            </p>
            <a href="/book">
              <button className="bg-accent-500 text-primary-900 px-8 py-4 rounded-lg font-semibold hover:bg-accent-400 transition-colors text-lg">
                Start a Conversation
              </button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
