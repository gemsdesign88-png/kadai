"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useLanguage } from "@/lib/i18n/context"
import { TrendingUp, DollarSign, ShoppingCart, Download, BarChart3, Gift, XCircle } from "lucide-react"
import { ThemeColorPicker } from "@/components/dashboard/ThemeColorPicker"
import { SimpleBarChart, SimplePieChart } from "@/components/lightweight-charts"
import { createDashboardTranslator } from "@/lib/i18n/dashboard-translator"

type PeriodType = 'daily' | 'weekly' | 'monthly' | 'yearly'

export default function AnalyticsClient() {
  const router = useRouter()
  const supabase = createClient()
  const { language, t } = useLanguage()
  const { t: dt } = createDashboardTranslator(language)
  
  const [loading, setLoading] = useState(true)
  const [restaurant, setRestaurant] = useState<any>(null)
  const [allRestaurants, setAllRestaurants] = useState<any[]>([])
  const [period, setPeriod] = useState<PeriodType>('daily')
  
  const [stats, setStats] = useState<{
    revenue: number
    orders: number
    customers: number
    avgOrder: number
    topItems: Array<{ name: string; value: number }>
    hourlySales: Array<{ name: string; value: number }>
    voidItems: number
    discountAmount: number
  }>({
    revenue: 0,
    orders: 0,
    customers: 0,
    avgOrder: 0,
    topItems: [],
    hourlySales: [],
    voidItems: 0,
    discountAmount: 0,
  })

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          router.push('/login')
          return
        }

        const { data: restaurants } = await supabase
          .from('restaurants')
          .select('*')
          .eq('owner_id', user.id)

        if (restaurants?.length) {
          setRestaurant(restaurants[0])
          setAllRestaurants(restaurants)

          // Generate dummy hourly data
          const hourlyData = Array.from({ length: 24 }, (_, i) => ({
            name: `${i}:00`,
            value: Math.floor(Math.random() * 100000)
          }))

          // Generate dummy top items
          const topItems = [
            { name: 'Nasi Goreng', value: 45 },
            { name: 'Mie Goreng', value: 38 },
            { name: 'Lumpia', value: 28 },
            { name: 'Ayam Goreng', value: 52 }
          ]

          setStats({
            revenue: 2500000,
            orders: 145,
            customers: 89,
            avgOrder: 17241,
            topItems,
            hourlySales: hourlyData,
            voidItems: 3,
            discountAmount: 125000,
          })
        }
      } catch (error) {
        console.error('Error loading analytics:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [supabase, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading analytics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{dt('nav.analyticsShort')}</h1>
            <p className="text-gray-600 mt-2">{restaurant?.name}</p>
          </div>
          <div className="flex gap-4">
            <ThemeColorPicker restaurantId={restaurant?.id} />
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
              <Download className="w-5 h-5" />
              Export
            </button>
          </div>
        </div>

        {/* Period Selector */}
        <div className="flex gap-2 mb-8">
          {(['daily', 'weekly', 'monthly', 'yearly'] as PeriodType[]).map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                period === p
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">Rp {stats.revenue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Orders</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.orders}</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Avg. Order</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">Rp {Math.floor(stats.avgOrder).toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Customers</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.customers}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Hourly Sales</h2>
            <SimpleBarChart data={stats.hourlySales} />
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Top Items</h2>
            <SimplePieChart data={stats.topItems} size={200} />
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <XCircle className="w-5 h-5 text-red-500" />
              <h3 className="font-semibold text-gray-900">Void Items</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.voidItems}</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <Gift className="w-5 h-5 text-blue-500" />
              <h3 className="font-semibold text-gray-900">Discounts</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">Rp {stats.discountAmount.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
