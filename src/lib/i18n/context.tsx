"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { translations, Language } from "./translations"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: typeof translations.en | typeof translations.id | typeof translations.zh
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("id")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Load language from localStorage only on client
    const savedLang = localStorage.getItem("language") as Language
    if (savedLang && (savedLang === "en" || savedLang === "id" || savedLang === "zh")) {
      setLanguageState(savedLang)
    }
    setIsMounted(true)
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  const value = {
    language,
    setLanguage,
    t: translations[language],
  }

  // Don't render children until mounted to avoid hydration mismatch
  if (!isMounted) {
    return <>{children}</>
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
