import { Hero } from "@/components/home/Hero"
import { ServicesOverview } from "@/components/home/ServicesOverview"
import { CoursesPreview } from "@/components/home/CoursesPreview"
import { InstituteGallery } from "@/components/home/InstituteGallery"
import { CTASection } from "@/components/home/CTASection"
import { Partner } from "@/components/home/Partner"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <Partner />
      <ServicesOverview />
      <CoursesPreview />
      <InstituteGallery />
      <CTASection />
    </main>
  )
}
