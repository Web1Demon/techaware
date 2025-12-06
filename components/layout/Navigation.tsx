"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Services", href: "/services" },
  { name: "Work", href: "/work" },
  { name: "Insights", href: "/insights" },
  { name: "About", href: "/about" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-black/90 backdrop-blur-md py-4 border-b border-white/10" : "bg-transparent py-6"
      )}
    >
      <div className="container px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-50 group">
            <span className="text-2xl font-serif font-bold text-white tracking-tight">
                TechAware<span className="text-mckinsey-500 group-hover:text-white transition-colors">.</span>
            </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          
          <Link
            href="/contact"
            className="ml-4 px-6 py-2 text-sm font-bold text-black bg-white hover:bg-gray-200 transition-colors rounded-full"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden relative z-50 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-0 left-0 w-full h-screen bg-black flex flex-col items-center justify-center space-y-8 z-40"
            >
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-4xl font-serif text-white hover:text-mckinsey-400 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="text-xl font-bold text-black bg-white px-8 py-3 rounded-full mt-8"
                >
                  Contact Us
                </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
