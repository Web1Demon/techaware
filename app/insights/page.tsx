"use client"

import * as React from "react"
import { motion } from "framer-motion"

const blogPosts = [
  {
    title: "Why Your Animations Are Slow (And How to Fix Them)",
    excerpt: "Performance optimization techniques for smooth 60fps animations in production applications.",
    date: "2024-01-15",
    readTime: "8 min read",
    tags: ["Performance", "Animation", "GSAP"],
  },
  {
    title: "Building a Design System That Developers Actually Use",
    excerpt: "Practical strategies for creating component libraries that scale across teams and products.",
    date: "2024-01-10",
    readTime: "12 min read",
    tags: ["Design Systems", "React", "TypeScript"],
  },
  {
    title: "The ROI of Front-End Performance",
    excerpt: "How Core Web Vitals improvements directly impact conversion rates and revenue.",
    date: "2024-01-05",
    readTime: "6 min read",
    tags: ["Performance", "Business", "Web Vitals"],
  },
]

export default function InsightsPage() {
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
              Insights
            </h1>
            <p className="text-xl text-muted-foreground">
              Thoughts on code, design, and building products
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group border-b border-border/50 pb-12 last:border-0"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                  <time className="text-sm text-muted-foreground">{post.date}</time>
                  <span className="text-sm text-muted-foreground">{post.readTime}</span>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4 group-hover:text-primary-500 transition-colors">
                  {post.title}
                </h2>
                <p className="text-lg text-muted-foreground mb-4">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-neutral-100 rounded-full text-sm text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
