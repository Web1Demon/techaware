"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const slides = [
  {
    type: "video",
    src: "https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4", // Abstract tech network
    overlayColor: "bg-black/50"
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop", // Global connection
    overlayColor: "bg-mckinsey-900/40"
  },
  {
    type: "video",
    src: "https://videos.pexels.com/video-files/852421/852421-hd_1920_1080_30fps.mp4", // Data center / lights
    overlayColor: "bg-black/60"
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop", // Modern architecture
    overlayColor: "bg-blue-900/30"
  }
]

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black">
      <AnimatePresence mode="popLayout">
        {slides.map((slide, index) => (
          index === currentIndex && (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              {slide.type === "video" ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={slide.src} type="video/mp4" />
                </video>
              ) : (
                <motion.img
                  src={slide.src}
                  alt="Background"
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.05 }}
                  transition={{ duration: 10, ease: "linear" }}
                  className="w-full h-full object-cover"
                />
              )}
              {/* Dynamic Overlay */}
              <div className={`absolute inset-0 ${slide.overlayColor} backdrop-blur-[1px]`} />
              
              {/* Gradient Scrim for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1 rounded-full transition-all duration-500 ${
              idx === currentIndex ? "w-8 bg-white" : "w-2 bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
