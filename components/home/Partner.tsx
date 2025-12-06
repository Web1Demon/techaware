"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Partner() {
  return (
    <section className="relative z-10 text-center px-6 py-20 md:px-12 md:py-32 lg:px-20 lg:py-40">
        <p className="text-base sm:text-lg md:text-3xl lg:text-5xl text-white font-serif leading-relaxed tracking-normal sm:tracking-wide md:tracking-wider max-w-4xl mx-auto drop-shadow-lg">
            We partner with organizations to build world-class technology solutions and develop the next generation of tech leaders through intensive physical training programs.
        </p>
    </section>
  );
}
