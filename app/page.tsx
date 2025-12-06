import { Hero } from "@/components/home/Hero"
import { ServicesOverview } from "@/components/home/ServicesOverview"
import { CoursesPreview } from "@/components/home/CoursesPreview"
import { InstituteGallery } from "@/components/home/InstituteGallery"
import { CTASection } from "@/components/home/CTASection"
import { Partner } from "@/components/home/Partner"
import { ProcessSection } from "@/components/home/ProcessSection"
import { TestimonialsSection } from "@/components/home/TestimonialsSection"
import { GeometricBackground } from "@/components/ui/GeometricBackground"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section - Carousel handles its own background */}
      <Hero />

      <Partner />

      {/* Content Sections with Geometric background */}
      <div className="relative">
        <GeometricBackground variant="grid" />
        <div className="relative z-10">
          <ProcessSection />
          <ServicesOverview />
        </div>
      </div>

      <div className="relative">
         <GeometricBackground variant="dots" />
         <div className="relative z-10">
            <CoursesPreview />
            <InstituteGallery />
         </div>
      </div>

      <TestimonialsSection />
      <CTASection />
    </main>
  )
}
