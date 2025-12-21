"use client"

import React from "react"

type TransactionType = 'income' | 'expense'

interface TransactionTypeToggleProps {
  value: TransactionType
  onChange: (type: TransactionType) => void
  primaryColor?: string
  incomeColor?: string
  expenseColor?: string
  className?: string
}

const TRANSACTION_TYPES = [
  {
    id: 'income' as TransactionType,
    label: 'Recording Income',
    labelKey: 'incomePill',
    tone: '#10B981'
  },
  {
    id: 'expense' as TransactionType,
    label: 'Recording Expense',
    labelKey: 'expensePill',
    tone: '#EF4444'
  }
] as const

export function TransactionTypeToggle({
  value,
  onChange,
  primaryColor = 'var(--color-primary, var(--color-accent))',
  incomeColor = '#10B981',
  expenseColor = '#EF4444',
  className = ''
}: TransactionTypeToggleProps) {
  const colors = {
    income: incomeColor,
    expense: expenseColor
  }

  return (
    <div className={`grid grid-cols-2 gap-3 ${className}`}>
      {TRANSACTION_TYPES.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => onChange(option.id)}
          className={`rounded-2xl border px-4 py-3 text-left shadow-sm transition-all ${
            value === option.id
              ? `border-opacity-0 shadow-md`
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
          style={
            value === option.id
              ? {
                  borderColor: colors[option.id],
                  backgroundColor: `${colors[option.id]}15`
                }
              : {}
          }
        >
          <div className="text-sm font-semibold" style={value === option.id ? { color: colors[option.id] } : {}}>
            {option.label}
          </div>
          <div className="text-xs text-gray-500">
            {option.id === 'income'
              ? 'Sales, investments, other income'
              : 'Operational, stock, salary'}
          </div>
        </button>
      ))}
    </div>
  )
}
