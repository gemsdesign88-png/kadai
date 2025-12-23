"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Users, TrendingUp, Award, Calendar, DollarSign, ShoppingCart, ChevronRight, X } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"
import { createDashboardTranslator } from "@/lib/i18n/dashboard-translator"

interface Customer {
  id: string
  customerId: string
  customerName: string
  totalOrders: number
  totalSpent: number
  lastOrder: string
  avgOrderValue: number
  favoriteItem: string
}

interface CustomerMetrics {
  totalCustomers: number
  activeCustomers: number
  totalRevenue: number
  avgOrderValue: number
  repeatingCustomers: number
  repeatingRate: number
}

export default function CustomersClient() {
  const router = useRouter()
  const supabase = createClient()
  const { language } = useLanguage()
  const { t: dt, locale } = createDashboardTranslator(language)
  
  const [loading, setLoading] = useState(true)
  const [restaurant, setRestaurant] = useState<any>(null)
  const [metrics, setMetrics] = useState<CustomerMetrics>({
    totalCustomers: 0,
    activeCustomers: 0,
    totalRevenue: 0,
    avgOrderValue: 0,
    repeatingCustomers: 0,
    repeatingRate: 0
  })
  const [topCustomers, setTopCustomers] = useState<Customer[]>([])
  const [newCustomers, setNewCustomers] = useState<Customer[]>([])
  const [loyalCustomers, setLoyalCustomers] = useState<Customer[]>([])
  const [allCustomers, setAllCustomers] = useState<Customer[]>([])
  const [showAllCustomersModal, setShowAllCustomersModal] = useState(false)
  const [selectedCustomerFilter, setSelectedCustomerFilter] = useState<'all' | 'top' | 'new' | 'loyal'>('all')

  // Initialize: Load user and restaurants
  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      // Load all restaurants
      const { data: restaurants } = await supabase
        .from('restaurants')
        .select('*')
        .eq('owner_id', user.id)

      if (!restaurants || restaurants.length === 0) {
        router.push('/dashboard')
        return
      }

      const savedRestaurantId = localStorage.getItem('selected_restaurant_id')
      if (savedRestaurantId) {
        const saved = restaurants.find(r => r.id === savedRestaurantId)
        if (saved) {
          setRestaurant(saved)
        } else {
          setRestaurant(restaurants[0])
        }
      } else {
        setRestaurant(restaurants[0])
      }
    }

    init()
  }, [])

  // Load customer analytics
  useEffect(() => {
    if (restaurant) {
      loadCustomerData()
    }
  }, [restaurant])

  async function loadCustomerData() {
    if (!restaurant) return
    
    setLoading(true)
    try {
      const now = new Date()
      const thirtyDaysAgo = new Date(now)
      thirtyDaysAgo.setDate(now.getDate() - 30)

      // Get all paid orders
      const { data: orders } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .eq('restaurant_id', restaurant.id)
        .eq('payment_status', 'paid')
        .gte('paid_at', thirtyDaysAgo.toISOString())

      if (!orders) {
        setLoading(false)
        return
      }

      // Calculate customer metrics
      const uniqueCustomerIds = new Set(orders.map(o => o.customer_id || o.id))
      const totalCustomers = uniqueCustomerIds.size

      // Get only last 7 days for active customers
      const sevenDaysAgo = new Date(now)
      sevenDaysAgo.setDate(now.getDate() - 7)
      const recentOrders = orders.filter(o => new Date(o.paid_at) >= sevenDaysAgo)
      const activeCustomers = new Set(recentOrders.map(o => o.customer_id || o.id)).size

      // Calculate customer data - use customer_id as key for better grouping
      const customerData: { [key: string]: any } = {}
      orders.forEach(order => {
        // Use customer_id as unique key, fallback to order.id if not available
        const customerId = order.customer_id || order.id
        const customerName = order.customer_name?.trim() || `${dt('customerPrefix')} ${customerId?.substring(0, 8)}`
        
        if (!customerData[customerId]) {
          customerData[customerId] = {
            id: order.id,
            customerId: customerId,
            customerName: customerName,
            totalOrders: 0,
            totalSpent: 0,
            lastOrder: order.paid_at,
            items: []
          }
        }
        
        // Update customer name if we get a better one from orders
        if (order.customer_name?.trim() && !customerData[customerId].customerName.startsWith('Customer ')) {
          customerData[customerId].customerName = order.customer_name.trim()
        }
        
        customerData[customerId].totalOrders += 1
        customerData[customerId].totalSpent += order.total || 0
        customerData[customerId].lastOrder = new Date(order.paid_at) > new Date(customerData[customerId].lastOrder) 
          ? order.paid_at 
          : customerData[customerId].lastOrder
        
        // Track items
        order.order_items?.forEach((item: any) => {
          const itemName = item.item_name || item.name
          customerData[customerId].items.push(itemName)
        })
      })

      const totalRevenue = Object.values(customerData).reduce((sum: number, c: any) => sum + c.totalSpent, 0)
      const avgOrderValue = totalRevenue / orders.length

      // Find repeating customers (more than 1 order)
      const repeatingCustomers = Object.values(customerData).filter((c: any) => c.totalOrders > 1).length
      const repeatingRate = totalCustomers > 0 ? (repeatingCustomers / totalCustomers) * 100 : 0

      // Get top customers by spending
      const topSpenders = Object.values(customerData)
        .map((c: any) => ({
          id: c.id,
          customerId: c.customerId,
          customerName: c.customerName,
          totalOrders: c.totalOrders,
          totalSpent: c.totalSpent,
          lastOrder: c.lastOrder,
          avgOrderValue: c.totalSpent / c.totalOrders,
          favoriteItem: getMostFrequent(c.items)
        }))
        .sort((a, b) => b.totalSpent - a.totalSpent)
        .slice(0, 5)

      // Get new customers (last 7 days)
      const newCustomersData = Object.values(customerData)
        .filter((c: any) => new Date(c.lastOrder) >= sevenDaysAgo)
        .sort((a: any, b: any) => new Date(b.lastOrder).getTime() - new Date(a.lastOrder).getTime())
        .slice(0, 5)
        .map((c: any) => ({
          id: c.id,
          customerId: c.customerId,
          customerName: c.customerName,
          totalOrders: c.totalOrders,
          totalSpent: c.totalSpent,
          lastOrder: c.lastOrder,
          avgOrderValue: c.totalSpent / c.totalOrders,
          favoriteItem: getMostFrequent(c.items)
        }))

      // Get loyal customers (high repeat rate)
      const loyalCustomersData = Object.values(customerData)
        .filter((c: any) => c.totalOrders >= 3)
        .sort((a: any, b: any) => b.totalOrders - a.totalOrders)
        .map((c: any) => ({
          id: c.id,
          customerId: c.customerId,
          customerName: c.customerName,
          totalOrders: c.totalOrders,
          totalSpent: c.totalSpent,
          lastOrder: c.lastOrder,
          avgOrderValue: c.totalSpent / c.totalOrders,
          favoriteItem: getMostFrequent(c.items)
        }))

      // Get all customers sorted by spending
      const allCustomersData = Object.values(customerData)
        .map((c: any) => ({
          id: c.id,
          customerId: c.customerId,
          customerName: c.customerName,
          totalOrders: c.totalOrders,
          totalSpent: c.totalSpent,
          lastOrder: c.lastOrder,
          avgOrderValue: c.totalSpent / c.totalOrders,
          favoriteItem: getMostFrequent(c.items)
        }))
        .sort((a, b) => b.totalSpent - a.totalSpent)

      setMetrics({
        totalCustomers,
        activeCustomers,
        totalRevenue,
        avgOrderValue: Math.round(avgOrderValue),
        repeatingCustomers,
        repeatingRate: Math.round(repeatingRate)
      })

      setTopCustomers(topSpenders)
      setNewCustomers(newCustomersData)
      setLoyalCustomers(loyalCustomersData.slice(0, 5))
      setAllCustomers(allCustomersData)
    } catch (error) {
      console.error('Error loading customer data:', error)
    } finally {
      setLoading(false)
    }
  }

  function getMostFrequent(items: string[]): string {
    if (items.length === 0) return '-'
    const frequency: { [key: string]: number } = {}
    items.forEach(item => {
      frequency[item] = (frequency[item] || 0) + 1
    })
    return Object.entries(frequency).sort((a, b) => b[1] - a[1])[0][0]
  }

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: locale === 'id-ID' ? 'IDR' : locale === 'zh-CN' ? 'CNY' : 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString(locale)
  }

  const filteredCustomers = allCustomers.filter(customer => {
    if (selectedCustomerFilter === 'all') return true
    if (selectedCustomerFilter === 'top') return topCustomers.some(c => c.customerId === customer.customerId)
    if (selectedCustomerFilter === 'new') return newCustomers.some(c => c.customerId === customer.customerId)
    if (selectedCustomerFilter === 'loyal') return loyalCustomers.some(c => c.customerId === customer.customerId)
    return true
  })

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {dt("customers")}
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                {dt("customerInsights")}
              </p>
            </div>
            <button 
              onClick={() => setShowAllCustomersModal(true)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-white rounded-xl font-semibold hover:bg-[var(--color-accent-hover)] transition-colors w-full sm:w-auto"
            >
              <Users className="w-5 h-5" />
              {dt("viewAllCustomers")}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div>
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-accent)]"></div>
          </div>
        ) : (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-xs text-gray-600 mb-1">{dt("totalCustomersLabel")}</p>
                <h3 className="text-2xl font-bold text-gray-900">{metrics.totalCustomers}</h3>
              </div>

              <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-xs text-gray-600 mb-1">{dt("active7Days")}</p>
                <h3 className="text-2xl font-bold text-gray-900">{metrics.activeCustomers}</h3>
              </div>

              <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <Award className="w-5 h-5 text-purple-600" />
                </div>
                <p className="text-xs text-gray-600 mb-1">{dt("loyalCustomersTitle")}</p>
                <h3 className="text-2xl font-bold text-gray-900">{metrics.repeatingCustomers}</h3>
              </div>

              <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <ShoppingCart className="w-5 h-5 text-orange-600" />
                </div>
                <p className="text-xs text-gray-600 mb-1">{dt("loyaltyRateLabel")}</p>
                <h3 className="text-2xl font-bold text-gray-900">{metrics.repeatingRate}%</h3>
              </div>

              <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-xs text-gray-600 mb-1">{dt("totalRevenue")}</p>
                <h3 className="text-xl font-bold text-gray-900">{formatCurrency(metrics.totalRevenue).substring(0, 15)}</h3>
              </div>

              <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <Calendar className="w-5 h-5 text-pink-600" />
                </div>
                <p className="text-xs text-gray-600 mb-1">{dt("avgOrderValue")}</p>
                <h3 className="text-xl font-bold text-gray-900">{formatCurrency(metrics.avgOrderValue).substring(0, 15)}</h3>
              </div>
            </div>

            {/* Customer Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Top Customers */}
              {topCustomers.length > 0 && (
                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-5">
                    <DollarSign className="w-5 h-5 text-[var(--color-accent)]" />
                    <h3 className="text-lg font-bold text-gray-900">{dt("topSpenders")}</h3>
                  </div>
                  <div className="space-y-3">
                    {topCustomers.map((customer, idx) => (
                      <div key={customer.customerId} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-0 rounded-lg hover:shadow-md transition-all border border-blue-100">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-bold bg-[var(--color-accent)] text-white w-7 h-7 rounded-full flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <div>
                              <p className="font-semibold text-gray-900">{customer.customerName}</p>
                              <p className="text-xs text-gray-600">{customer.totalOrders} {dt("orders")} • {dt("avgShort")}: {formatCurrency(customer.avgOrderValue)}</p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-[var(--color-accent)]">{formatCurrency(customer.totalSpent)}</p>
                          <p className="text-xs text-gray-500">{customer.favoriteItem}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New Customers */}
              {newCustomers.length > 0 && (
                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-5">
                    <Users className="w-5 h-5 text-[var(--color-accent)]" />
                    <h3 className="text-lg font-bold text-gray-900">{dt("newCustomersTitle")}</h3>
                  </div>
                  <div className="space-y-3">
                    {newCustomers.map((customer, idx) => (
                      <div key={customer.customerId} className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-0 rounded-lg hover:shadow-md transition-all border border-green-100">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{customer.customerName}</p>
                          <p className="text-xs text-gray-600">{formatDate(customer.lastOrder)} • {customer.totalOrders} {dt("orderSingle")}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-green-600">{formatCurrency(customer.totalSpent)}</p>
                          <p className="text-xs text-gray-500">{customer.favoriteItem}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Loyal Customers */}
              {loyalCustomers.length > 0 && (
                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-[var(--color-accent)]" />
                      <h3 className="text-lg font-bold text-gray-900">{dt("loyalCustomersTitle")}</h3>
                      {metrics.repeatingCustomers > 5 && (
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                          {metrics.repeatingCustomers} {dt("totalLabel")}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="space-y-3 mb-4">
                    {loyalCustomers.map((customer, idx) => (
                      <div key={customer.customerId} className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-0 rounded-lg hover:shadow-md transition-all border border-purple-100">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{customer.customerName}</p>
                          <p className="text-xs text-gray-600">{customer.totalOrders} {dt("orders")} • {formatCurrency(customer.avgOrderValue)}/{dt("orderSingle")}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-purple-600">⭐</p>
                          <p className="text-xs text-gray-500">{formatCurrency(customer.totalSpent)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {metrics.repeatingCustomers > 5 && (
                    <button
                      onClick={() => {
                        setSelectedCustomerFilter('loyal')
                        setShowAllCustomersModal(true)
                      }}
                      className="w-full py-2 text-center text-sm text-purple-600 hover:bg-purple-50 rounded-lg transition-colors font-medium"
                    >
                      {dt("viewAll")} →
                    </button>
                  )}
                </div>
              )}
            </div>
          </>
        )}
        </div>
      </div>

      {/* All Customers Modal */}
      {showAllCustomersModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {dt("allCustomers")}
              </h2>
              <button
                onClick={() => setShowAllCustomersModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-4 px-8 py-4 border-b border-gray-200 bg-gray-50">
              <button
                onClick={() => setSelectedCustomerFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCustomerFilter === 'all'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {dt("allLabel")} ({allCustomers.length})
              </button>
              <button
                onClick={() => setSelectedCustomerFilter('top')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCustomerFilter === 'top'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {dt("topSpenders")}
              </button>
              <button
                onClick={() => setSelectedCustomerFilter('new')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCustomerFilter === 'new'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {dt("newCustomersTitle")}
              </button>
              <button
                onClick={() => setSelectedCustomerFilter('loyal')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCustomerFilter === 'loyal'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {dt("loyalCustomersTitle")}
              </button>
            </div>

            {/* Modal Content - Table */}
            <div className="flex-1 overflow-y-auto p-8">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-500 text-sm border-b border-gray-100">
                    <th className="pb-4 font-medium">{dt("customerName")}</th>
                    <th className="pb-4 font-medium">{dt("totalOrdersLabel")}</th>
                    <th className="pb-4 font-medium">{dt("totalSpentLabel")}</th>
                    <th className="pb-4 font-medium">{dt("avgOrderValue")}</th>
                    <th className="pb-4 font-medium">{dt("lastOrderLabel")}</th>
                    <th className="pb-4 font-medium">{dt("favoriteItemLabel")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.customerId} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 font-semibold text-gray-900">{customer.customerName}</td>
                      <td className="py-4 text-gray-600">{customer.totalOrders}</td>
                      <td className="py-4 font-bold text-[var(--color-accent)]">{formatCurrency(customer.totalSpent)}</td>
                      <td className="py-4 text-gray-600">{formatCurrency(customer.avgOrderValue)}</td>
                      <td className="py-4 text-gray-600">{formatDate(customer.lastOrder)}</td>
                      <td className="py-4 text-gray-500 italic">{customer.favoriteItem}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredCustomers.length === 0 && (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">{dt("noCustomersFound")}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
