"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { HeroCarousel } from "./HeroCarousel"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Carousel */}
      <HeroCarousel />
      
      <div className="container relative z-10 px-4 md:px-6 py-32 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-4xl"
        >
           <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.4 }}
             className="mb-8"
           >
              <span className="px-3 py-1 border border-white/30 rounded-full text-xs font-medium tracking-widest text-white uppercase backdrop-blur-sm">
                Global Strategy & Innovation
              </span>
           </motion.div>

          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-[1.1] tracking-tight"
            >
              Defining the <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-mckinsey-300 to-white">Next Era</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-xl md:text-2xl text-gray-200 max-w-2xl mb-12 leading-relaxed font-light"
          >
            We partner with the world's most ambitious leaders to engineer solutions that shape the future.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-5"
          >
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-black rounded-full font-bold text-lg overflow-hidden transition-all hover:bg-gray-200"
            >
              <span className="relative z-10 flex items-center gap-2">
                Begin Journey
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            <Link
              href="/services"
              className="group inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full font-bold text-lg transition-all hover:bg-white/20"
            >
              Our Services
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/50 text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  )
}
