"use client"

import { usePathname } from "next/navigation"
import * as React from "react"

export function FooterGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/order")) {
    return null
  }

  return <>{children}</>
}
