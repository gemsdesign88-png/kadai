"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"

const DashboardContent = dynamic(
  () => import("./interactive-dashboard").then((mod) => ({ default: mod.InteractiveDashboard })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full aspect-[16/10] bg-gray-100 rounded-3xl animate-pulse border border-gray-200 flex items-center justify-center">
        <div className="text-gray-400 font-medium">Loading Dashboard...</div>
      </div>
    ),
  }
)

export function InteractiveDashboardClient() {
  return (
    <Suspense
      fallback={
        <div className="w-full aspect-[16/10] bg-gray-100 rounded-3xl animate-pulse border border-gray-200 flex items-center justify-center">
          <div className="text-gray-400 font-medium">Loading Dashboard...</div>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  )
}
