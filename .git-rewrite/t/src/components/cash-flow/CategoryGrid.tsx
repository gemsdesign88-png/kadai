"use client"

import React from "react"

interface CategoryOption {
  value: string
  label: string
}

interface CategoryGridProps {
  value: string
  onChange: (category: string) => void
  options: CategoryOption[]
  primaryColor?: string
  className?: string
}

export function CategoryGrid({
  value,
  onChange,
  options,
  primaryColor = 'var(--color-primary, #1F2937)',
  className = ''
}: CategoryGridProps) {
  return (
    <div className={`grid grid-cols-2 gap-2 ${className}`}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`rounded-xl border px-3 py-2 text-sm font-medium transition-all ${
            value === option.value
              ? 'border-gray-900 bg-gray-900 text-white shadow-sm'
              : 'border-gray-200 text-gray-800 hover:border-gray-300'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
