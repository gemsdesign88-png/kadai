"use client"

import * as React from "react"
import { useLanguage } from "@/lib/i18n/context"
import { Globe } from "lucide-react"

interface LanguageSwitcherProps {
  isScrolled?: boolean
}

export function LanguageSwitcher({ isScrolled = true }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage()

  return (
    <button
      onClick={() => setLanguage(language === "en" ? "id" : "en")}
      className={`inline-flex items-center gap-2 rounded-[12px] px-3 py-1.5 text-sm font-medium transition-all ${
        isScrolled
          ? 'text-[#4B5563] hover:text-[#121516] hover:bg-[#F3F4F6]'
          : 'text-white/90 hover:text-white hover:bg-white/10'
      }`}
      aria-label="Switch language"
    >
      <Globe className="h-4 w-4" />
      <span className="uppercase font-semibold text-xs">{language}</span>
    </button>
  )
}
