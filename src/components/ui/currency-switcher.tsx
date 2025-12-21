"use client"

import * as React from "react"
import { useCurrency } from "@/lib/i18n/currency-context"
import { DollarSign, ChevronDown } from "lucide-react"

interface CurrencySwitcherProps {
  isScrolled?: boolean
}

const currencies = [
  { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah', flag: '🇮🇩' },
  { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', flag: '🇨🇳' }
]

export function CurrencySwitcher({ isScrolled = true }: CurrencySwitcherProps) {
  const { currency, setCurrency } = useCurrency()
  const [isOpen, setIsOpen] = React.useState(false)

  const currentCurrency = currencies.find(curr => curr.code === currency) || currencies[0]

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
        aria-label="Switch currency"
      >
        <DollarSign className="h-4 w-4" />
        <span className="uppercase font-semibold text-xs">{currentCurrency.code}</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-50">
          {currencies.map((curr) => (
            <button
              key={curr.code}
              onClick={() => {
                setCurrency(curr.code as any)
                setIsOpen(false)
              }}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                currency === curr.code ? 'bg-gray-50 text-gray-900' : 'text-gray-700'
              }`}
            >
              <span>{curr.flag}</span>
              <span className="font-medium">{curr.symbol}</span>
              <span className="text-xs">{curr.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
