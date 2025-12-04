"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section
      className="relative py-20 md:py-60 bg-[#051c2c]"
      style={{
        backgroundImage: "url('/bg-tech.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Left-half blur overlay */}
      <div className="absolute inset-y-0 left-0 w-1/2 backdrop-blur-lg bg-black/30"></div>

      <div className="relative container px-4 text-left">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-8">
            Ready to transform your organization?
          </h2>

          <p className="text-xl text-white/90 mb-12">
            Let's discuss how we can help you achieve your technology goals.
          </p>

          <Link
            href="/book"
            className="inline-flex items-center px-8 py-4 bg-white text-mckinsey-600 font-medium hover:bg-gray-100 transition-colors"
          >
            Book an Appointment
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
