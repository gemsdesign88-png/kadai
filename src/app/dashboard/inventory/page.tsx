"use client"

import { useEffect, useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useLanguage } from "@/lib/i18n/context"
import { createDashboardTranslator } from "@/lib/i18n/dashboard-translator"
import { Package, AlertTriangle, TrendingDown, Plus, Minus, DollarSign, ShoppingCart, Search, PieChart as PieChartIcon } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

interface StockItem {
  id: string
  ingredient_id: string
  restaurant_id: string
  quantity_on_hand: number
  quantity_reserved: number
  is_low_stock: boolean
  ingredient: {
    id: string
    name: string
    unit: string
    category: string
    reorder_level: number
    par_level: number
    unit_cost: number
  }
}

export default function InventoryPage() {
  const router = useRouter()
  const supabase = createClient()
  const { language } = useLanguage()
  const dt = useMemo(() => createDashboardTranslator(language), [language])
  const [loading, setLoading] = useState(true)
  const [stockItems, setStockItems] = useState<StockItem[]>([])
  const [showModal, setShowModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null)
  const [adjustmentType, setAdjustmentType] = useState<'add' | 'subtract'>('add')
  const [adjustmentAmount, setAdjustmentAmount] = useState('')
  const [adjustmentNote, setAdjustmentNote] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [stockStats, setStockStats] = useState({
    totalValue: 0,
    lowStock: 0,
    outOfStock: 0,
    totalItems: 0
  })
  const [stockDistribution, setStockDistribution] = useState<any[]>([])

  useEffect(() => {
    loadInventory()
  }, [])

  async function loadInventory() {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      // Get selected restaurant from localStorage
      const selectedRestaurantId = localStorage.getItem('selected_restaurant_id')
      if (!selectedRestaurantId) {
        router.push('/dashboard')
        return
      }

      const { data: restaurants } = await supabase
        .from('restaurants')
        .select('*')
        .eq('id', selectedRestaurantId)
        .eq('owner_id', user.id)
        .single()

      if (!restaurants) return

      // Fetch stock items with ingredients
      const { data: items } = await supabase
        .from('stock_items')
        .select(`
          *,
          ingredient:ingredients(*)
        `)
        .eq('restaurant_id', restaurants.id)
        .order('quantity_on_hand', { ascending: true })

      if (items) {
        setStockItems(items as StockItem[])
        
        // Calculate stats
        const totalValue = items.reduce((sum, item) => {
          return sum + (item.quantity_on_hand * (item.ingredient?.unit_cost || 0))
        }, 0)
        
        const lowStock = items.filter(item => 
          item.quantity_on_hand > 0 && 
          item.quantity_on_hand <= (item.ingredient?.reorder_level || 0)
        ).length
        
        const outOfStock = items.filter(item => item.quantity_on_hand === 0).length
        
        setStockStats({
          totalValue,
          lowStock,
          outOfStock,
          totalItems: items.length
        })

        // Calculate stock distribution for chart
        const healthy = items.filter(item => {
          const qty = item.quantity_on_hand
          const parLevel = item.ingredient?.par_level || 100
          const reorderLevel = item.ingredient?.reorder_level || 20
          return qty > reorderLevel && qty <= parLevel
        }).length

        const overstocked = items.filter(item => {
          const qty = item.quantity_on_hand
          const parLevel = item.ingredient?.par_level || 100
          return qty > parLevel
        }).length

        setStockDistribution([
          { name: 'Healthy', value: healthy, color: '#10b981' },
          { name: 'Low Stock', value: lowStock, color: '#f59e0b' },
          { name: 'Out of Stock', value: outOfStock, color: '#ef4444' },
          { name: 'Overstocked', value: overstocked, color: '#3b82f6' },
        ].filter(d => d.value > 0))
      }
    } catch (error) {
      console.error('Error loading inventory:', error)
    } finally {
      setLoading(false)
    }
  }

  function openAdjustmentModal(item: any, type: 'add' | 'subtract') {
    setSelectedItem(item)
    setAdjustmentType(type)
    setAdjustmentAmount('')
    setAdjustmentNote('')
    setShowModal(true)
  }

  async function handleAdjustment(e: React.FormEvent) {
    e.preventDefault()
    
    if (!selectedItem) return

    const amount = parseFloat(adjustmentAmount)
    const newStock = adjustmentType === 'add' 
      ? selectedItem.quantity_on_hand + amount 
      : selectedItem.quantity_on_hand - amount

    if (newStock < 0) {
      alert('Stok tidak boleh negatif')
      return
    }

    try {
      const isLowStock = newStock <= selectedItem.ingredient.reorder_level

      await supabase
        .from('stock_items')
        .update({ 
          quantity_on_hand: newStock,
          is_low_stock: isLowStock
        })
        .eq('id', selectedItem.id)

      setShowModal(false)
      loadInventory()
    } catch (error) {
      console.error('Error adjusting stock:', error)
    }
  }

  const getStockStatus = (item: StockItem) => {
    const qty = item.quantity_on_hand
    const parLevel = item.ingredient.par_level || 100
    const reorderLevel = item.ingredient.reorder_level || 20
    const percentage = (qty / parLevel) * 100

    if (qty === 0) return { label: dt.outOfStockLabel, color: 'bg-red-600 text-white', percentage: 0 }
    if (qty <= reorderLevel) return { label: dt.veryLow, color: 'bg-red-500 text-white', percentage }
    if (percentage < 50) return { label: dt.lowStockLabel, color: 'bg-orange-500 text-white', percentage }
    if (percentage < 80) return { label: dt.medium, color: 'bg-yellow-500 text-white', percentage }
    if (percentage <= 120) return { label: dt.good, color: 'bg-green-500 text-white', percentage }
    return { label: dt.overstockStatus, color: 'bg-blue-500 text-white', percentage }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value)
  }

  const filteredItems = stockItems.filter(item => 
    item.ingredient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.ingredient.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-accent)]"></div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{dt.manageStock}</h1>
        <p className="text-sm sm:text-base text-gray-600">{dt.monitorInventory}</p>
      </div>

      <div>
        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(stockStats.totalValue)}</h3>
                <p className="text-sm text-gray-600">{dt.totalStockValueLabel}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{stockStats.totalItems}</h3>
                <p className="text-sm text-gray-600">{dt.totalItemsLabel}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border-l-4 border-red-500 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900">{stockStats.outOfStock}</h3>
                <p className="text-sm text-gray-600">{dt.outOfStockLabel}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border-l-4 border-yellow-500 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900">{stockStats.lowStock}</h3>
                <p className="text-sm text-gray-600">{dt.lowStockLabel}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stock Distribution Chart */}
        <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <PieChartIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">{dt.stockStatusDistribution}</h3>
              <p className="text-xs text-gray-600">{dt.stockStatusDesc}</p>
            </div>
          </div>
          
          <div className="w-full h-80">
            {stockDistribution.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <Package className="w-16 h-16 mb-3 opacity-50" />
                <p className="text-sm font-medium">{dt.noStockData}</p>
                <p className="text-xs">{dt.addIngredientsHint}</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stockDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {stockDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e7eb', 
                      borderRadius: '8px' 
                    }}
                    formatter={(value: any) => [`${value} ${dt.totalItemsLabel}`, dt.quantityLabel]}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
          
          {stockDistribution.length > 0 && (
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {stockDistribution.map((dist, idx) => (
                <div key={idx} className="p-4 rounded-xl border-2" style={{ borderColor: dist.color, backgroundColor: `${dist.color}10` }}>
                  <p className="text-xs sm:text-sm font-medium mb-2" style={{ color: dist.color }}>{dist.name}</p>
                  <p className="text-xl sm:text-2xl font-bold mb-1" style={{ color: dist.color }}>{dist.value}</p>
                  <p className="text-xs" style={{ color: dist.color }}>{dt.totalItemsLabel}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={dt.searchIngredients}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all"
            />
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">{dt.ingredientLabel}</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">{dt.categoryLabel}</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">{dt.currentStock}</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">{dt.reorderLevel}</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">{dt.parLevel}</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">{dt.statusLabel}</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">{dt.valueLabel}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                      {searchQuery ? dt.noItemsMatch : dt.noInventoryItems}
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => {
                    const status = getStockStatus(item)
                    const itemValue = item.quantity_on_hand * item.ingredient.unit_cost
                    return (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                              <Package className="w-6 h-6 text-gray-400" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{item.ingredient.name}</p>
                              <p className="text-sm text-gray-600">{item.ingredient.unit}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            {item.ingredient.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-xl font-bold text-gray-900">{item.quantity_on_hand}</span>
                          <span className="text-sm text-gray-500 ml-1">{item.ingredient.unit}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-sm text-gray-600">{item.ingredient.reorder_level} {item.ingredient.unit}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-sm text-gray-600">{item.ingredient.par_level} {item.ingredient.unit}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex flex-col items-center gap-1">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}>
                              {status.label}
                            </span>
                            {status.percentage > 0 && (
                              <span className="text-xs text-gray-500">{Math.round(status.percentage)}%</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="font-medium text-gray-900">{formatCurrency(itemValue)}</span>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Stock Adjustment Modal */}
      {showModal && selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">
              {adjustmentType === 'add' ? dt.addStock : dt.subtractStock}
            </h2>
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <p className="font-medium text-gray-900">{selectedItem.ingredient.name}</p>
              <p className="text-sm text-gray-600">{dt.currentStockLabel}: <span className="font-bold">{selectedItem.quantity_on_hand} {selectedItem.ingredient.unit}</span></p>
            </div>
            <form onSubmit={handleAdjustment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {dt.amountLabel} ({selectedItem.ingredient.unit})
                </label>
                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  required
                  value={adjustmentAmount}
                  onChange={(e) => setAdjustmentAmount(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                  placeholder={dt.enterAmount}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {dt.noteLabel}
                </label>
                <textarea
                  value={adjustmentNote}
                  onChange={(e) => setAdjustmentNote(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                  placeholder={dt.adjustmentReason}
                />
              </div>
              {adjustmentAmount && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    {dt.newStockLabel}: <span className="font-bold text-blue-700">
                      {adjustmentType === 'add' 
                        ? selectedItem.quantity_on_hand + parseFloat(adjustmentAmount)
                        : selectedItem.quantity_on_hand - parseFloat(adjustmentAmount)
                      } {selectedItem.ingredient.unit}
                    </span>
                  </p>
                </div>
              )}
              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  {dt.cancel}
                </button>
                <button
                  type="submit"
                  className={`flex-1 px-4 py-2 text-white rounded-lg font-medium transition-colors ${
                    adjustmentType === 'add' 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : 'bg-red-500 hover:bg-red-600'
                  }`}
                >
                  {adjustmentType === 'add' ? dt.add : dt.subtract}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
