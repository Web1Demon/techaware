"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function Cursor() {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseEnter = () => setIsHovered(true)
    const handleMouseLeave = () => setIsHovered(false)

    window.addEventListener("mousemove", moveCursor)
    
    // Add event listeners for interactive elements
    const interactiveElements = document.querySelectorAll("a, button, input, textarea, [role='button']")
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })

    // Mutation observer to handle dynamically added elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          const newInteractiveElements = document.querySelectorAll("a, button, input, textarea, [role='button']")
          newInteractiveElements.forEach((el) => {
            el.removeEventListener("mouseenter", handleMouseEnter)
            el.removeEventListener("mouseleave", handleMouseLeave)
            el.addEventListener("mouseenter", handleMouseEnter)
            el.addEventListener("mouseleave", handleMouseLeave)
          })
        }
      })
    })

    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
      observer.disconnect()
    }
  }, [cursorX, cursorY, isVisible])

  // Don't render on touch devices (simple check)
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Main Dot */}
      <motion.div
        className="absolute h-2.5 w-2.5 rounded-full bg-accent-500"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      
      {/* Trailing Ring */}
      <motion.div
        className="absolute rounded-full border border-accent-500/50"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          height: isHovered ? 60 : 32,
          width: isHovered ? 60 : 32,
          opacity: isHovered ? 0.8 : 0.4,
          backgroundColor: isHovered ? "rgba(0, 217, 255, 0.05)" : "transparent",
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 28
        }}
      />
    </div>
  )
}
