"use client"

import * as React from "react"
import { useLanguage } from "@/lib/i18n/context"
import { Globe, ChevronDown } from "lucide-react"

interface LanguageSwitcherProps {
  isScrolled?: boolean
}

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'id', name: 'Bahasa', flag: '🇮🇩' },
  { code: 'zh', name: '中文', flag: '🇨🇳' }
]

export function LanguageSwitcher({ isScrolled = true }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = React.useState(false)

  const currentLang = languages.find(lang => lang.code === language) || languages[0]

  React.useEffect(() => {
    const handleClickOutside = () => setIsOpen(false)
    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
        className={`inline-flex items-center gap-2 rounded-[12px] px-3 py-1.5 text-sm font-medium transition-all ${
          isScrolled
            ? 'text-[#4B5563] hover:text-[#121516] hover:bg-[#F3F4F6]'
            : 'text-white/90 hover:text-white hover:bg-white/10'
        }`}
        aria-label="Switch language"
      >
        <Globe className="h-4 w-4" />
        <span className="uppercase font-semibold text-xs">{currentLang.code.toUpperCase()}</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code as any)
                setIsOpen(false)
              }}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                language === lang.code ? 'bg-gray-50 text-gray-900' : 'text-gray-700'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
