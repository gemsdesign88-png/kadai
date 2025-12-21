"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useLanguage } from "@/lib/i18n/context"
import {
  DollarSign, Plus, TrendingUp, TrendingDown, Calendar, Receipt, Users, ShoppingCart,
  FileText, Edit, Trash2, Search, AlertTriangle, CheckCircle, Clock, X, Wallet,
  ArrowUpRight, ArrowDownRight, Filter, Eye, CreditCard, Package
} from "lucide-react"
import { SimpleLineChart, SimpleBarChart, SimplePieChart } from '@/components/lightweight-charts'

// Types
type TransactionType = 'income' | 'expense' | 'debt'
type IncomeCategory = 'sales' | 'investment' | 'other_income' | 'order'
type ExpenseCategory = 'operational' | 'stock_purchase' | 'salary' | 'capital'
type DebtCategory = 'supplier' | 'loan' | 'equipment' | 'other_debt'
type TransactionCategory = IncomeCategory | ExpenseCategory | DebtCategory


export default function PageRedesign() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Cash Flow (Redesign)</h1>
      <p className="text-gray-500 mt-2">Charts temporarily disabled to reduce bundle size for Cloudflare Pages deployment.</p>
    </div>
  )
}
