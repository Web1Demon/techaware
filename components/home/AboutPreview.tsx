"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/Button"

export function AboutPreview() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const text = "I bridge the gap between design and engineering. My approach is simple: understand the problem deeply, design with intention, build with precision, and measure what matters."
  const words = text.split(" ")

  return (
    <section ref={containerRef} className="py-32 bg-neutral-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p 
            className="text-accent-500 font-mono mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            THE PHILOSOPHY
          </motion.p>
          
          <h2 className="text-3xl md:text-5xl font-serif leading-tight text-white mb-12 flex flex-wrap justify-center gap-x-3 gap-y-1">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.02 }}
              >
                {word}
              </motion.span>
            ))}
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Link href="/about">
              <Button variant="ghost" className="text-white hover:text-accent-500 hover:bg-white/5">
                More About Me
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
