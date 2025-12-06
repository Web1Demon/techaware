"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    quote: "TechAware transformed our digital infrastructure, enabling us to scale 10x in just six months.",
    author: "Sarah Johnson",
    role: "CTO, FintechGlobal",
  },
  {
    quote: "The depth of expertise their team brings is unmatched. A truly world-class partnership.",
    author: "David Chen",
    role: "VP of Engineering, CloudScale",
  },
  {
    quote: "Their training programs revitalized our engineering culture and boosted productivity by 40%.",
    author: "Amanda Williams",
    role: "Director of Talent, Innovation Corp",
  },
  {
    quote: "Strategic, technical, and visionary. TechAware is the partner you need for complex transformations.",
    author: "Michael Ross",
    role: "CEO, FutureTech Solutions",
  },
]

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-32 md:py-48 relative z-10 bg-black overflow-hidden">
        {/* Subtle background grain or noise could be added here */}
        
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Col: Heading & Nav */}
            <div className="lg:col-span-4 space-y-12">
                <div>
                   <h2 className="text-sm font-medium text-mckinsey-400 tracking-[0.2em] uppercase mb-4">
                    Client Impact
                    </h2>
                    <div className="h-px w-12 bg-white/20" />
                </div>
                
                <div className="flex gap-4">
                    <button 
                        onClick={prev}
                        className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                        onClick={next}
                        className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Right Col: Quote */}
            <div className="lg:col-span-8 min-h-[400px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="space-y-8"
                    >
                        <Quote className="w-12 h-12 text-mckinsey-600/30" />
                        
                        <p className="text-3xl md:text-5xl lg:text-6xl font-serif text-white leading-tight">
                            "{testimonials[activeIndex].quote}"
                        </p>

                        <div className="pt-8">
                             <div className="text-lg text-white font-medium">
                                {testimonials[activeIndex].author}
                             </div>
                             <div className="text-gray-400">
                                {testimonials[activeIndex].role}
                             </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
      </div>
    </section>
  )
}
