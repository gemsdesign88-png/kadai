"use client"

import { useEffect, useState } from "react"
import { InteractiveDashboard } from "./interactive-dashboard"

export function InteractiveDashboardClient() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-full aspect-[16/10] bg-gray-100 rounded-3xl animate-pulse border border-gray-200 flex items-center justify-center">
        <div className="text-gray-400 font-medium">Loading Dashboard...</div>
      </div>
    )
  }

  return <InteractiveDashboard />
}
