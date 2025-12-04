"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/Button"

const projects = [
  {
    title: "FinTech Dashboard",
    category: "Product Design",
    image: "bg-gradient-to-br from-primary-900 to-primary-800",
  },
  {
    title: "E-Commerce Scale",
    category: "Front-End Engineering",
    image: "bg-gradient-to-br from-neutral-900 to-neutral-800",
  },
  {
    title: "AI Interface",
    category: "Creative Dev",
    image: "bg-gradient-to-br from-primary-800 to-neutral-900",
  },
  {
    title: "Luxury Retail",
    category: "Web Design",
    image: "bg-gradient-to-br from-neutral-800 to-primary-900",
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return

    const width = rect.width
    const height = rect.height

    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="relative h-[400px] w-full perspective-1000"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full w-full rounded-xl bg-neutral-900 border border-white/5 overflow-hidden group cursor-none"
      >
        <div className={`absolute inset-0 ${project.image} opacity-50 transition-opacity duration-500 group-hover:opacity-80`} />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute bottom-0 left-0 p-8 transform translate-z-20">
          <p className="text-accent-500 text-sm font-mono mb-2">{project.category}</p>
          <h3 className="text-3xl font-serif text-white mb-4">{project.title}</h3>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function PortfolioPreview() {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-white mb-4">
              Selected Work
            </h2>
            <p className="text-neutral-400 text-lg max-w-md">
              A collection of digital experiences crafted with precision and passion.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link href="/work">
              <Button variant="outline" className="hidden md:flex border-white/10 text-white hover:bg-white/5 hover:text-accent-500">
                View All Projects
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        <div className="mt-12 md:hidden flex justify-center">
          <Link href="/work">
            <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 hover:text-accent-500">
              View All Projects
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
