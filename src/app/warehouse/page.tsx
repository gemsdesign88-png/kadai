import { Warehouse } from "@/components/sections/warehouse/warehouse-hero"
import { WarehouseUIShowcase } from "@/components/sections/warehouse/warehouse-ui-showcase"
import { WarehouseFeatures } from "@/components/sections/warehouse/warehouse-features"
import { WarehouseFeaturesSection } from "@/components/sections/warehouse/warehouse-features-section"
import { WarehouseUseCases } from "@/components/sections/warehouse/warehouse-use-cases"
import { WarehousePricing } from "@/components/sections/warehouse/warehouse-pricing"
import { WarehouseCTA } from "@/components/sections/warehouse/warehouse-cta"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Warehouse - Multi-Location Inventory Management | KadaiPOS",
  description: "Centralize inventory management across multiple locations. Track stock transfers, manage distribution, and optimize inventory levels with KadaiPOS Warehouse.",
  openGraph: {
    title: "Warehouse - Multi-Location Inventory Management | KadaiPOS",
    description: "Centralize inventory management across multiple locations with real-time stock tracking and distribution management.",
    images: ["/og-warehouse.png"],
  },
}

export default function WarehousePage() {
  return (
    <main className="relative">
      <Warehouse />
      <WarehouseUIShowcase />
      <WarehouseFeaturesSection />
      <WarehouseFeatures />
      <WarehouseUseCases />
      <WarehousePricing />
      <WarehouseCTA />
    </main>
  )
}
