"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function GlobalEffects() {
  const [cursorVisible, setCursorVisible] = useState(false)
  const [cursorVariant, setCursorVariant] = useState("default")
  
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!cursorVisible) setCursorVisible(true)
    }

    const handleHoverStart = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        if (target.closest('a, button, [role="button"]')) {
            setCursorVariant("hover")
        } else {
            setCursorVariant("default")
        }
    }

    window.addEventListener("mousemove", moveCursor)
    window.addEventListener("mouseover", handleHoverStart)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      window.removeEventListener("mouseover", handleHoverStart)
    }
  }, [cursorX, cursorY, cursorVisible])

  return (
    <>
      {/* Film Grain Overlay */}
      <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.03] mix-blend-overlay">
         <svg className="w-full h-full">
            <filter id="noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.80" numOctaves="4" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
         </svg>
      </div>

      {/* Custom Cursor */}
       <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-white mix-blend-difference pointer-events-none z-[9999]"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          opacity: cursorVisible ? 1 : 0,
        }}
        variants={{
            default: { scale: 1 },
            hover: { scale: 3.5 }
        }}
        animate={cursorVariant}
        transition={{ duration: 0.2 }}
      />
    </>
  )
}
