"use client"

import React from "react"

interface CurrencyInputProps {
  value: string
  onChange: (value: string) => void
  currency: string
  placeholder?: string
  className?: string
}

export function CurrencyInput({
  value,
  onChange,
  currency,
  placeholder = '0.00',
  className = ''
}: CurrencyInputProps) {
  return (
    <div className={`flex items-center border border-gray-200 rounded-xl px-3 py-2 ${className}`}>
      <span className="text-sm text-gray-600 font-medium mr-2">{currency}</span>
      <input
        type="number"
        step="0.01"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 outline-none text-lg font-semibold"
      />
    </div>
  )
}
