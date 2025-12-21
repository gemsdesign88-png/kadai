"use client"

import React from "react"

interface FormFieldProps {
  label: string
  isRequired?: boolean
  children: React.ReactNode
  className?: string
}

export function FormField({
  label,
  isRequired = false,
  children,
  className = ''
}: FormFieldProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="flex items-center justify-between text-sm font-medium text-gray-700">
        <span>{label}</span>
        {isRequired && <span className="text-xs text-gray-400">Required</span>}
      </label>
      {children}
    </div>
  )
}
