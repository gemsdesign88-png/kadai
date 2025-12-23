import { Hero } from "@/components/sections/hero"
import { Testimonials } from "@/components/sections/testimonials"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import dynamic from "next/dynamic"

const RealUIFeatures = dynamic(() => import("@/components/sections/real-ui-features").then(mod => mod.RealUIFeatures), {
  loading: () => <div className="min-h-screen bg-black" />
})

export default async function Home() {
  const headersList = await headers()
  const host = headersList.get('host') || ''
  
  // Redirect sibos.kadaipos.id to dashboard
  if (host.includes('sibos.kadaipos.id')) {
    redirect('/dashboard')
  }
  
  return (
    <main className="relative">
      <Hero />
      <RealUIFeatures />
      <Testimonials />
    </main>
  )
}
