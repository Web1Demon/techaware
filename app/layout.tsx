import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { GlobalEffects } from "@/components/effects/GlobalEffects";
import { cn } from "@/lib/utils";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TechAware | Premium Tech Consulting",
  description: "Technology made simple, beautiful, and profitable. Expert front-end engineering and product consulting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.variable,
        playfair.variable
      )}>
        <SmoothScroll />
        <GlobalEffects />
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
