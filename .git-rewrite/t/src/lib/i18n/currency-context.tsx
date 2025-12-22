"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

type Currency = 'IDR' | 'USD' | 'CNY'

interface CurrencyContextType {
  currency: Currency
  setCurrency: (currency: Currency) => void
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('IDR')

  useEffect(() => {
    // Load from localStorage on mount
    const stored = localStorage.getItem('preferred-currency')
    if (stored && ['IDR', 'USD', 'CNY'].includes(stored)) {
      setCurrency(stored as Currency)
    }
  }, [])

  const handleSetCurrency = (newCurrency: Currency) => {
    setCurrency(newCurrency)
    localStorage.setItem('preferred-currency', newCurrency)
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency: handleSetCurrency }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
}
