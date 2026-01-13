import { BusinessHealth } from "@/components/sections/business-health"
import { IndustrySelector } from "@/components/sections/industry-selector"
import { DualModeSystem } from "@/components/sections/dual-mode-system"
import { MagicPasteShowcase } from "@/components/sections/magic-paste-showcase"
import { WhyKadai } from "@/components/sections/why-kadai"
import { FinalCTA } from "@/components/sections/final-cta"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function Home() {
  const headersList = await headers()
  const host = headersList.get('host') || ''
  
  // Redirect sibos.kadaipos.id to dashboard
  if (host.includes('sibos.kadaipos.id')) {
    redirect('/dashboard')
  }
  
  return (
    <main className="relative">
      <BusinessHealth />
      <IndustrySelector />
      <MagicPasteShowcase />
      <DualModeSystem />
      <WhyKadai />
      <FinalCTA />
    </main>
  )
}
