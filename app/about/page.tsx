"use client"

import * as React from "react"
import { motion } from "framer-motion"

export default function AboutPage() {
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
              I solve problems with code and design
            </h1>
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="prose prose-lg max-w-none"
            >
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                With years building digital products, I've learned that great software is equal parts 
                engineering and empathy. I specialize in the intersection of technical excellence and 
                user delight—where clean code meets beautiful interfaces.
              </p>
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                My approach is simple: understand the problem deeply, design with intention, build 
                with precision, and measure what matters.
              </p>
              <p className="text-xl text-muted-foreground leading-relaxed">
                I've worked with startups finding product-market fit, agencies delivering for Fortune 
                500 clients, and everything in between. The common thread? A commitment to craft and 
                a focus on results.
              </p>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <div>
                <h3 className="font-serif text-2xl font-semibold mb-4">Languages</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>JavaScript / TypeScript</li>
                  <li>HTML & CSS</li>
                  <li>Python</li>
                </ul>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-semibold mb-4">Frameworks</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>React & Next.js</li>
                  <li>Vue & Svelte</li>
                  <li>Node.js</li>
                </ul>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-semibold mb-4">Animation</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>GSAP & ScrollTrigger</li>
                  <li>Framer Motion</li>
                  <li>Three.js & React Three Fiber</li>
                </ul>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-semibold mb-4">Tools</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Figma</li>
                  <li>Git & GitHub</li>
                  <li>Vercel & Sanity</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-neutral-50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-6">
              Ready to work together?
            </h2>
            <a href="/book">
              <button className="bg-primary-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-600 transition-colors text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                Book a Consultation
              </button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
