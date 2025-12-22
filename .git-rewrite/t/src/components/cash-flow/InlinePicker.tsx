"use client"

import React, { useState } from "react"
import { Search } from "lucide-react"

interface InlinePickerProps {
  label: string
  items: Array<{ id: string; name: string; unit?: string }>
  selectedId: string
  onSelect: (id: string, name: string) => void
  searchPlaceholder?: string
  primaryColor?: string
  className?: string
}

export function InlinePicker({
  label,
  items,
  selectedId,
  onSelect,
  searchPlaceholder = 'Search...',
  primaryColor = 'var(--color-primary, #0ea5e9)',
  className = ''
}: InlinePickerProps) {
  const [search, setSearch] = useState('')

  const filtered = items.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-opacity-50 focus:border-transparent"
          style={
            search
              ? {
                  '--tw-ring-color': primaryColor
                } as React.CSSProperties
              : {}
          }
        />
      </div>

      {(search || selectedId) && (
        <div className="mt-2 max-h-48 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          {filtered.length === 0 ? (
            <div className="px-3 py-2 text-sm text-gray-500">No items found</div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelect(item.id, item.name)
                  setSearch('')
                }}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex justify-between items-center ${
                  selectedId === item.id
                    ? `text-opacity-100`
                    : 'text-gray-800'
                }`}
                style={
                  selectedId === item.id
                    ? {
                        color: primaryColor,
                        backgroundColor: `${primaryColor}10`
                      }
                    : {}
                }
              >
                <span>{item.name}</span>
                {item.unit && <span className="text-xs text-gray-500">({item.unit})</span>}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}
