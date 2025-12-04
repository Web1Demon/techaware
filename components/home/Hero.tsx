"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative bg-gray-900 pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-50"
          onError={(e) => {
            console.error("Video failed to load:", e);
            // Hide video if it fails to load
            e.currentTarget.style.display = 'none';
          }}
        >
          {/* Local background video */}
          <source src="/bg-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/70 to-gray-900/90" />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Eyebrow */}
            <div className="inline-block">
              <span className="text-sm font-medium text-mckinsey-400 tracking-wide uppercase">
                Technology Consulting & Education
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight">
              Accelerating digital transformation through expertise
            </h1>

            {/* Subheadline */}
            

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/book"
                className="inline-flex items-center justify-center px-8 py-4 border border-mckinsey-600 text-white font-medium hover:bg-mckinsey-700 transition-colors"
              >
                Book an Appointment
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container px-4 md:px-6 mt-24 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl">
          {[
            { value: "500+", label: "Professionals trained" },
            { value: "50+", label: "Enterprise clients" },
            { value: "98%", label: "Client satisfaction" },
            { value: "90%", label: "Job placement rate" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              className="border-l-2 border-mckinsey-500 pl-4"
            >
              <div className="text-3xl md:text-4xl font-serif font-bold text-white">
                {stat.value}
              </div>
              <div className="text-sm text-gray-300 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
