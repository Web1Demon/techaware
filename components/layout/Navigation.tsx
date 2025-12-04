"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Services", href: "/services" },
  { name: "Courses", href: "/courses" },
  { name: "About", href: "/about" },
  { name: "Insights", href: "/insights" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const pathname = usePathname()

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/95 backdrop-blur-sm border-b border-gray-200 py-4" : "bg-white py-6"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-serif font-bold text-gray-900">
          TechAware
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-mckinsey-600",
                pathname === item.href ? "text-mckinsey-600" : "text-gray-600"
              )}
            >
              {item.name}
            </Link>
          ))}
          <Link 
            href="/contact"
            className="px-6 py-2 bg-mckinsey-600 text-white font-medium hover:bg-mckinsey-700 transition-colors"
          >
            Contact us
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={cn("w-full h-0.5 bg-gray-900 transition-all", isMobileMenuOpen && "rotate-45 translate-y-2")} />
            <span className={cn("w-full h-0.5 bg-gray-900 transition-all", isMobileMenuOpen && "opacity-0")} />
            <span className={cn("w-full h-0.5 bg-gray-900 transition-all", isMobileMenuOpen && "-rotate-45 -translate-y-2.5")} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-200 overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-8 flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium py-2 border-b border-gray-200 text-gray-900"
                >
                  {item.name}
                </Link>
              ))}
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="w-full mt-4 px-6 py-3 bg-mckinsey-600 text-white font-medium hover:bg-mckinsey-700 transition-colors">
                  Contact us
                </button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
