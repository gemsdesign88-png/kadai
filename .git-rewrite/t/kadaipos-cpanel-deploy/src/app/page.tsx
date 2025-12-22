import { Hero } from "@/components/sections/hero"
import { RealUIFeatures } from "@/components/sections/real-ui-features"
import { Testimonials } from "@/components/sections/testimonials"

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <RealUIFeatures />
      <Testimonials />
    </main>
  )
}
