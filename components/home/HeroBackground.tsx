"use client"

import { useEffect, useRef } from "react"

interface Point {
  x: number
  y: number
  vx: number
  vy: number
}

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointsRef = useRef<Point[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initPoints()
    }

    const initPoints = () => {
      const pointCount = window.innerWidth < 768 ? 30 : 60
      pointsRef.current = []
      for (let i = 0; i < pointCount; i++) {
        pointsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3, // Slow drift
          vy: (Math.random() - 0.5) * 0.3,
        })
      }
    }

    const draw = () => {
      if (!ctx || !canvas) return
      
      // Clear with slight fade for trail effect (optional, but clean clear is better for this style)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Update points
      pointsRef.current.forEach((point) => {
        point.x += point.vx
        point.y += point.vy

        // Bounce off edges
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1

        // Mouse repulsion
        const dx = mouseRef.current.x - point.x
        const dy = mouseRef.current.y - point.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 200 // Increased radius

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance
          const angle = Math.atan2(dy, dx)
          const pushX = Math.cos(angle) * force * 2 // Force multiplier
          const pushY = Math.sin(angle) * force * 2

          point.x -= pushX
          point.y -= pushY
        }
      })

      // Draw Voronoi-like connections (simplified for performance/style)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)" // Very subtle white lines
      ctx.lineWidth = 1

      for (let i = 0; i < pointsRef.current.length; i++) {
        for (let j = i + 1; j < pointsRef.current.length; j++) {
          const p1 = pointsRef.current[i]
          const p2 = pointsRef.current[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 200) { // Connection threshold
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }

      // Draw points
      ctx.fillStyle = "rgba(0, 217, 255, 0.3)" // Cyan accent
      pointsRef.current.forEach((point) => {
        ctx.beginPath()
        ctx.arc(point.x, point.y, 1.5, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(draw)
    }

    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    })

    resizeCanvas()
    draw()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 bg-background" // Use theme background
    />
  )
}
