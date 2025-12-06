"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const steps = [
  {
    title: "Discovery",
    description: "We dive deep into your organization's challenges, culture, and objectives to understand the root causes of inefficiencies.",
    number: "01",
  },
  {
    title: "Strategy",
    description: "Our experts craft a bespoke roadmap that aligns technology initiatives with your business goals for maximum impact.",
    number: "02",
  },
  {
    title: "Implementation",
    description: "We execute with precision, deploying scalable solutions while ensuring minimal disruption to your daily operations.",
    number: "03",
  },
  {
    title: "Empowerment",
    description: "Through comprehensive training and knowledge transfer, we equip your team to manage and evolve the new systems.",
    number: "04",
  },
]

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  })

  // Scale the progress line height based on scroll
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section ref={containerRef} className="py-32 relative z-10">
      <div className="container px-4 md:px-6">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
        >
             <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Our Process
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl">
              A systematic approach to digital transformation that ensures sustainable growth.
            </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Central Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 -translate-x-1/2" />
          
          {/* Animated Line */}
          <motion.div 
            style={{ scaleY, originY: 0 }}
            className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-0.5 bg-mckinsey-500 -translate-x-1/2" 
          />

          <div className="space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`relative flex flex-col md:flex-row gap-8 md:gap-0 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Content Side */}
                <div className="md:w-1/2 flex-1 md:px-12 pl-16">
                  <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                    <span className="text-mckinsey-400 font-mono text-sm tracking-widest mb-2 block">
                        PHASE {step.number}
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-white mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Center Node */}
                <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12">
                  <div className="w-4 h-4 rounded-full bg-black border-2 border-mckinsey-500 relative z-10">
                    <div className="absolute inset-0 bg-mckinsey-500 rounded-full animate-ping opacity-25" />
                  </div>
                </div>

                {/* Empty Side for layout balance */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
