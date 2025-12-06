"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="relative py-32 md:py-48 z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black pointer-events-none" />
      
      <div className="relative container px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-12 md:p-20"
        >
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 leading-tight">
            Ready to transform <br/> your organization?
          </h2>

          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Let's discuss how we can help you achieve your technology goals with our world-class consulting and education.
          </p>

          <Link
            href="/book"
            className="group inline-flex items-center px-8 py-4 bg-mckinsey-600 text-white font-medium hover:bg-mckinsey-500 transition-all rounded-full shadow-lg hover:shadow-mckinsey-600/50"
          >
            Book an Appointment
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
