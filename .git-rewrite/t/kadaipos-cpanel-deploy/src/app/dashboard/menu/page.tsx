"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { TrendingUp, DollarSign, Star, AlertTriangle, ThumbsUp, ThumbsDown, TrendingDown, Zap, Plus, Settings, PieChart as PieChartIcon } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'

interface MenuItem {
  id: string
  name: string
  price: number
  category?: string
  image_url?: string
}

interface MenuAnalytics {
  itemId: string
  itemName: string
  price: number
  category?: string
  image_url?: string
  quantitySold: number
  revenue: number
  profitMargin: number
  popularity: 'high' | 'medium' | 'low'
  profitability: 'high' | 'low'
  menuClass: 'star' | 'plow-horse' | 'puzzle' | 'dog'
}

export default function MenuPage() {
  const router = useRouter()
  const supabase = createClient()
  const { language } = useLanguage()
  const [loading, setLoading] = useState(true)
  const [analytics, setAnalytics] = useState<MenuAnalytics[]>([])
  const [stars, setStars] = useState<MenuAnalytics[]>([])
  const [plowHorses, setPlowHorses] = useState<MenuAnalytics[]>([])
  const [puzzles, setPuzzles] = useState<MenuAnalytics[]>([])
  const [dogs, setDogs] = useState<MenuAnalytics[]>([])
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'star' | 'plow-horse' | 'puzzle' | 'dog'>('all')
  const [categoryMix, setCategoryMix] = useState<Array<{ name: string; value: number; items: number }>>([])
  const [salesByProduct, setSalesByProduct] = useState<Array<{ name: string; revenue: number; quantity: number }>>([])

  useEffect(() => {
    loadMenuAnalytics()
  }, [])

  async function loadMenuAnalytics() {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      const selectedRestaurantId = localStorage.getItem('selected_restaurant_id')
      if (!selectedRestaurantId) {
        router.push('/dashboard')
        return
      }

      // Fetch all orders with items
      const { data: orders } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .eq('restaurant_id', selectedRestaurantId)

      // Fetch menu items
      const { data: menuItems } = await supabase
        .from('menu_items')
        .select('*')
        .eq('restaurant_id', selectedRestaurantId)

      if (!orders || !menuItems) return

      // Calculate analytics for each menu item
      const itemAnalytics: { [key: string]: MenuAnalytics } = {}

      menuItems.forEach((item: MenuItem) => {
        const orderItems = orders.flatMap(o => o.order_items || [])
          .filter((oi: any) => oi.menu_item_name === item.name || oi.menu_item_id === item.id)

        const quantitySold = orderItems.reduce((sum: number, oi: any) => sum + (oi.quantity || 0), 0)
        const revenue = orderItems.reduce((sum: number, oi: any) => sum + (oi.price * oi.quantity || 0), 0)

        // Estimate cost as 30% of price (you can adjust this)
        const estimatedCost = item.price * 0.3
        const profitMargin = ((item.price - estimatedCost) / item.price) * 100

        itemAnalytics[item.id] = {
          itemId: item.id,
          itemName: item.name,
          price: item.price,
          category: item.category,
          image_url: item.image_url,
          quantitySold,
          revenue,
          profitMargin,
          popularity: 'low',
          profitability: profitMargin > 60 ? 'high' : 'low',
          menuClass: 'dog'
        }
      })

      const analyticsArray = Object.values(itemAnalytics)

      // Calculate median values for menu engineering matrix
      const quantities = analyticsArray.map(a => a.quantitySold).sort((a, b) => a - b)
      const margins = analyticsArray.map(a => a.profitMargin).sort((a, b) => a - b)
      
      const medianQuantity = quantities[Math.floor(quantities.length / 2)] || 0
      const medianMargin = margins[Math.floor(margins.length / 2)] || 60

      // Classify items using menu engineering matrix
      analyticsArray.forEach(item => {
        const highPopularity = item.quantitySold >= medianQuantity
        const highProfitability = item.profitMargin >= medianMargin

        item.popularity = highPopularity ? 'high' : 'low'
        item.profitability = highProfitability ? 'high' : 'low'

        if (highPopularity && highProfitability) {
          item.menuClass = 'star'
        } else if (highPopularity && !highProfitability) {
          item.menuClass = 'plow-horse'
        } else if (!highPopularity && highProfitability) {
          item.menuClass = 'puzzle'
        } else {
          item.menuClass = 'dog'
        }
      })

      setAnalytics(analyticsArray.sort((a, b) => b.revenue - a.revenue))
      setStars(analyticsArray.filter(a => a.menuClass === 'star'))
      setPlowHorses(analyticsArray.filter(a => a.menuClass === 'plow-horse'))
      setPuzzles(analyticsArray.filter(a => a.menuClass === 'puzzle'))
      setDogs(analyticsArray.filter(a => a.menuClass === 'dog'))

      // Calculate Category Mix (Food vs Beverage vs Others)
      const categoryData: { [key: string]: { revenue: number; items: number } } = {}
      analyticsArray.forEach(item => {
        const cat = item.category || 'Other'
        if (!categoryData[cat]) {
          categoryData[cat] = { revenue: 0, items: 0 }
        }
        categoryData[cat].revenue += item.revenue
        categoryData[cat].items += 1
      })

      const categoryMixData = Object.entries(categoryData)
        .map(([name, data]) => ({
          name,
          value: data.revenue,
          items: data.items
        }))
        .sort((a, b) => b.value - a.value)

      setCategoryMix(categoryMixData)

      // Sales by Product (Top performers for Pareto analysis)
      const salesByProductData = analyticsArray
        .slice(0, 10) // Top 10 items
        .map(item => ({
          name: item.itemName.length > 15 ? item.itemName.substring(0, 15) + '...' : item.itemName,
          revenue: item.revenue,
          quantity: item.quantitySold
        }))

      setSalesByProduct(salesByProductData)

    } catch (error) {
      console.error('Error loading menu analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-4 gap-6">
            <div className="h-40 bg-gray-200 rounded"></div>
            <div className="h-40 bg-gray-200 rounded"></div>
            <div className="h-40 bg-gray-200 rounded"></div>
            <div className="h-40 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  const totalRevenue = analytics.reduce((sum, a) => sum + a.revenue, 0)
  const avgProfitMargin = analytics.length > 0 
    ? analytics.reduce((sum, a) => sum + a.profitMargin, 0) / analytics.length 
    : 0

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {language === 'en' ? 'Menu Performance' : 'Performa Menu'}
          </h1>
          <p className="text-gray-600">
            {language === 'en' ? 'Optimize your menu for maximum profitability' : 'Optimalkan menu Anda untuk profitabilitas maksimal'}
          </p>
        </div>
        <button
          onClick={() => router.push('/dashboard/menu/manage')}
          className="flex items-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-white rounded-xl font-semibold hover:bg-[var(--color-accent-hover)] transition-colors"
        >
          <Settings className="w-5 h-5" />
          {language === 'en' ? 'Manage Menu' : 'Kelola Menu'}
        </button>
      </div>

      {/* Menu Engineering Matrix Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Stars */}
        <button
          onClick={() => setSelectedCategory(selectedCategory === 'star' ? 'all' : 'star')}
          className={`bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-6 border-2 shadow-sm transition-all hover:scale-105 hover:shadow-lg text-left ${
            selectedCategory === 'star' ? 'border-yellow-500 ring-4 ring-yellow-200' : 'border-yellow-300'
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">
                {language === 'en' ? 'Stars' : 'Bintang'}
              </h3>
              <p className="text-xs text-gray-600">
                {language === 'en' ? 'High profit & popular' : 'Untung tinggi & populer'}
              </p>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stars.length}</p>
          <p className="text-sm text-gray-600 mt-2">
            {language === 'en' ? 'items' : 'item'}
          </p>
          {selectedCategory === 'star' && (
            <p className="text-xs text-yellow-700 font-medium mt-2">
              {language === 'en' ? '✓ Filtered' : '✓ Difilter'}
            </p>
          )}
        </button>

        {/* Plow Horses */}
        <button
          onClick={() => setSelectedCategory(selectedCategory === 'plow-horse' ? 'all' : 'plow-horse')}
          className={`bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 shadow-sm transition-all hover:scale-105 hover:shadow-lg text-left ${
            selectedCategory === 'plow-horse' ? 'border-green-500 ring-4 ring-green-200' : 'border-green-300'
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">
                {language === 'en' ? 'Workhorses' : 'Andalan'}
              </h3>
              <p className="text-xs text-gray-600">
                {language === 'en' ? 'Popular, lower profit' : 'Populer, untung rendah'}
              </p>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{plowHorses.length}</p>
          <p className="text-sm text-gray-600 mt-2">
            {language === 'en' ? 'items' : 'item'}
          </p>
          {selectedCategory === 'plow-horse' && (
            <p className="text-xs text-green-700 font-medium mt-2">
              {language === 'en' ? '✓ Filtered' : '✓ Difilter'}
            </p>
          )}
        </button>

        {/* Puzzles */}
        <button
          onClick={() => setSelectedCategory(selectedCategory === 'puzzle' ? 'all' : 'puzzle')}
          className={`bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 shadow-sm transition-all hover:scale-105 hover:shadow-lg text-left ${
            selectedCategory === 'puzzle' ? 'border-blue-500 ring-4 ring-blue-200' : 'border-blue-300'
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">
                {language === 'en' ? 'Puzzles' : 'Teka-teki'}
              </h3>
              <p className="text-xs text-gray-600">
                {language === 'en' ? 'High profit, low sales' : 'Untung tinggi, kurang laku'}
              </p>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{puzzles.length}</p>
          <p className="text-sm text-gray-600 mt-2">
            {language === 'en' ? 'items' : 'item'}
          </p>
          {selectedCategory === 'puzzle' && (
            <p className="text-xs text-blue-700 font-medium mt-2">
              {language === 'en' ? '✓ Filtered' : '✓ Difilter'}
            </p>
          )}
        </button>

        {/* Dogs */}
        <button
          onClick={() => setSelectedCategory(selectedCategory === 'dog' ? 'all' : 'dog')}
          className={`bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-6 border-2 shadow-sm transition-all hover:scale-105 hover:shadow-lg text-left ${
            selectedCategory === 'dog' ? 'border-red-500 ring-4 ring-red-200' : 'border-red-300'
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">
                {language === 'en' ? 'Dogs' : 'Lemah'}
              </h3>
              <p className="text-xs text-gray-600">
                {language === 'en' ? 'Low profit & unpopular' : 'Untung & penjualan rendah'}
              </p>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{dogs.length}</p>
          <p className="text-sm text-gray-600 mt-2">
            {language === 'en' ? 'items' : 'item'}
          </p>
          {selectedCategory === 'dog' && (
            <p className="text-xs text-red-700 font-medium mt-2">
              {language === 'en' ? '✓ Filtered' : '✓ Difilter'}
            </p>
          )}
        </button>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Sales by Product (Pareto Chart) */}
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {language === 'en' ? 'Top 10 Revenue by Product' : 'Top 10 Pendapatan per Produk'}
              </h3>
              <p className="text-xs text-gray-600">
                {language === 'en' ? 'Pareto analysis: focus on top performers' : 'Analisis Pareto: fokus pada performa teratas'}
              </p>
            </div>
          </div>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesByProduct} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  type="number"
                  stroke="#6b7280"
                  style={{ fontSize: '12px' }}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                />
                <YAxis 
                  type="category"
                  dataKey="name" 
                  stroke="#6b7280"
                  style={{ fontSize: '11px' }}
                  width={120}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value: any, name: string) => {
                    if (name === 'revenue') return [formatCurrency(Number(value)), language === 'en' ? 'Revenue' : 'Pendapatan']
                    if (name === 'quantity') return [value, language === 'en' ? 'Sold' : 'Terjual']
                    return [value, name]
                  }}
                />
                <Bar 
                  dataKey="revenue" 
                  fill="url(#colorProductRevenue)" 
                  radius={[0, 8, 8, 0]}
                  isAnimationActive={true}
                />
                <defs>
                  <linearGradient id="colorProductRevenue" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-xs text-gray-600">
            <p>💡 {language === 'en' 
              ? 'The 80/20 rule: 80% of revenue often comes from 20% of products'
              : 'Aturan 80/20: 80% pendapatan sering datang dari 20% produk'}</p>
          </div>
        </div>

        {/* Category Mix (Food vs Beverage) */}
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <PieChartIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {language === 'en' ? 'Category Mix' : 'Mix Kategori'}
              </h3>
              <p className="text-xs text-gray-600">
                {language === 'en' ? 'Revenue breakdown by category' : 'Breakdown pendapatan per kategori'}
              </p>
            </div>
          </div>
          <div className="w-full h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryMix}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={100}
                  innerRadius={50}
                  fill="#8884d8"
                  dataKey="value"
                  isAnimationActive={true}
                >
                  {categoryMix.map((entry, index) => {
                    const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']
                    return <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  })}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '8px' 
                  }}
                  formatter={(value: any) => [formatCurrency(Number(value)), language === 'en' ? 'Revenue' : 'Pendapatan']}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value, entry: any) => {
                    const cat = categoryMix.find(c => c.name === value)
                    return `${value} (${cat?.items || 0} ${language === 'en' ? 'items' : 'item'})`
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {categoryMix.slice(0, 4).map((category, idx) => {
              const colors = [
                'bg-green-100 text-green-700',
                'bg-blue-100 text-blue-700', 
                'bg-amber-100 text-amber-700',
                'bg-red-100 text-red-700'
              ]
              return (
                <div key={idx} className={`p-3 rounded-lg ${colors[idx]}`}>
                  <p className="text-xs font-medium">{category.name}</p>
                  <p className="text-lg font-bold">{formatCurrency(category.value)}</p>
                  <p className="text-xs">{category.items} {language === 'en' ? 'items' : 'item'}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Smart Recommendations */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 mb-8 border-2 border-purple-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {language === 'en' ? 'Smart Recommendations' : 'Rekomendasi Cerdas'}
            </h2>
            <p className="text-gray-600">
              {language === 'en' ? 'Data-driven strategies to boost your menu performance' : 'Strategi berbasis data untuk meningkatkan performa menu'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Stars Strategy */}
          {stars.length > 0 && (
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-yellow-200">
              <div className="flex items-start gap-3 mb-3">
                <Star className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {language === 'en' ? 'Promote Your Stars!' : 'Promosikan Bintang Anda!'}
                  </h3>
                  <p className="text-sm text-gray-700 mb-3">
                    {language === 'en' 
                      ? `You have ${stars.length} star items with high profit and popularity. Feature these prominently!`
                      : `Anda punya ${stars.length} item bintang dengan untung tinggi dan populer. Tampilkan di posisi utama!`}
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {stars.slice(0, 3).map(item => (
                      <li key={item.itemId}>• {item.itemName} - {formatCurrency(item.revenue)}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Plow Horses Strategy */}
          {plowHorses.length > 0 && (
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-green-200">
              <div className="flex items-start gap-3 mb-3">
                <TrendingUp className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {language === 'en' ? 'Improve Profit Margins' : 'Tingkatkan Margin Untung'}
                  </h3>
                  <p className="text-sm text-gray-700 mb-2">
                    {language === 'en' 
                      ? `${plowHorses.length} popular items have lower margins. Try:`
                      : `${plowHorses.length} item populer margin rendah. Coba:`}
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• {language === 'en' ? 'Slight price increase (5-10%)' : 'Naikkan harga sedikit (5-10%)'}</li>
                    <li>• {language === 'en' ? 'Reduce portion sizes slightly' : 'Kurangi porsi sedikit'}</li>
                    <li>• {language === 'en' ? 'Find cheaper suppliers' : 'Cari supplier lebih murah'}</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Puzzles Strategy */}
          {puzzles.length > 0 && (
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-blue-200">
              <div className="flex items-start gap-3 mb-3">
                <Zap className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {language === 'en' ? 'Boost Sales of High-Profit Items' : 'Tingkatkan Penjualan Item Untung Tinggi'}
                  </h3>
                  <p className="text-sm text-gray-700 mb-2">
                    {language === 'en' 
                      ? `${puzzles.length} profitable items need more visibility:`
                      : `${puzzles.length} item menguntungkan butuh lebih terlihat:`}
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• {language === 'en' ? 'Staff recommendations' : 'Rekomendasi staff'}</li>
                    <li>• {language === 'en' ? 'Better menu placement' : 'Posisi menu lebih baik'}</li>
                    <li>• {language === 'en' ? 'Create combo deals' : 'Buat paket combo'}</li>
                    <li>• {language === 'en' ? 'Add attractive photos' : 'Tambah foto menarik'}</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Dogs Strategy */}
          {dogs.length > 0 && (
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-red-200">
              <div className="flex items-start gap-3 mb-3">
                <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {language === 'en' ? 'Consider Removing Low Performers' : 'Pertimbangkan Hapus Item Lemah'}
                  </h3>
                  <p className="text-sm text-gray-700 mb-2">
                    {language === 'en' 
                      ? `${dogs.length} items have low sales and profit:`
                      : `${dogs.length} item dengan penjualan & untung rendah:`}
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• {language === 'en' ? 'Replace with better options' : 'Ganti dengan opsi lebih baik'}</li>
                    <li>• {language === 'en' ? 'Revamp recipe & pricing' : 'Ubah resep & harga'}</li>
                    <li>• {language === 'en' ? 'Run clearance promo' : 'Buat promo clearance'}</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* General Advice */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-purple-200">
            <div className="flex items-start gap-3 mb-3">
              <ThumbsUp className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">
                  {language === 'en' ? 'Menu Engineering Tips' : 'Tips Rekayasa Menu'}
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• {language === 'en' ? 'Review menu quarterly' : 'Review menu tiap 3 bulan'}</li>
                  <li>• {language === 'en' ? 'Test new items seasonally' : 'Tes item baru per musim'}</li>
                  <li>• {language === 'en' ? 'Highlight stars visually' : 'Tonjolkan bintang secara visual'}</li>
                  <li>• {language === 'en' ? 'Train staff on upselling' : 'Latih staff untuk upsell'}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Pricing Strategy */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-indigo-200">
            <div className="flex items-start gap-3 mb-3">
              <DollarSign className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">
                  {language === 'en' ? 'Pricing Psychology' : 'Psikologi Harga'}
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• {language === 'en' ? 'Use charm pricing (Rp 49k vs 50k)' : 'Pakai harga charm (Rp 49rb vs 50rb)'}</li>
                  <li>• {language === 'en' ? 'Anchor with premium items' : 'Anchor dengan item premium'}</li>
                  <li>• {language === 'en' ? 'Bundle complementary items' : 'Bundle item pelengkap'}</li>
                  <li>• {language === 'en' ? 'Avoid price wars' : 'Hindari perang harga'}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedCategory === 'all' 
              ? (language === 'en' ? 'Top Performers by Revenue' : 'Performa Teratas Berdasarkan Revenue')
              : selectedCategory === 'star'
              ? (language === 'en' ? '⭐ Star Items' : '⭐ Item Bintang')
              : selectedCategory === 'plow-horse'
              ? (language === 'en' ? '📈 Workhorse Items' : '📈 Item Andalan')
              : selectedCategory === 'puzzle'
              ? (language === 'en' ? '⚡ Puzzle Items' : '⚡ Item Teka-teki')
              : (language === 'en' ? '📉 Dog Items' : '📉 Item Lemah')
            }
          </h2>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-sm text-gray-600 hover:text-gray-900 font-medium"
            >
              {language === 'en' ? '← Show All' : '← Tampilkan Semua'}
            </button>
          )}
        </div>
        <div className="space-y-4">
          {(selectedCategory === 'all' 
            ? analytics.slice(0, 10)
            : selectedCategory === 'star'
            ? stars
            : selectedCategory === 'plow-horse'
            ? plowHorses
            : selectedCategory === 'puzzle'
            ? puzzles
            : dogs
          ).map((item, index) => (
            <div key={item.itemId} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-900">{item.itemName}</h3>
                  {item.menuClass === 'star' && <Star className="w-4 h-4 text-yellow-500" />}
                  {item.menuClass === 'plow-horse' && <TrendingUp className="w-4 h-4 text-green-500" />}
                  {item.menuClass === 'puzzle' && <Zap className="w-4 h-4 text-blue-500" />}
                  {item.menuClass === 'dog' && <TrendingDown className="w-4 h-4 text-red-500" />}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>
                    {language === 'en' ? 'Sold' : 'Terjual'}: <strong>{item.quantitySold}</strong>
                  </span>
                  <span>
                    {language === 'en' ? 'Revenue' : 'Revenue'}: <strong>{formatCurrency(item.revenue)}</strong>
                  </span>
                  <span>
                    {language === 'en' ? 'Margin' : 'Margin'}: <strong>{item.profitMargin.toFixed(1)}%</strong>
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                  item.menuClass === 'star' ? 'bg-yellow-100 text-yellow-700' :
                  item.menuClass === 'plow-horse' ? 'bg-green-100 text-green-700' :
                  item.menuClass === 'puzzle' ? 'bg-blue-100 text-blue-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {item.menuClass === 'star' && (language === 'en' ? 'Star' : 'Bintang')}
                  {item.menuClass === 'plow-horse' && (language === 'en' ? 'Workhorse' : 'Andalan')}
                  {item.menuClass === 'puzzle' && (language === 'en' ? 'Puzzle' : 'Teka-teki')}
                  {item.menuClass === 'dog' && (language === 'en' ? 'Dog' : 'Lemah')}
                </div>
              </div>
            </div>
          ))}
          {selectedCategory !== 'all' && (
            (selectedCategory === 'star' ? stars : 
             selectedCategory === 'plow-horse' ? plowHorses :
             selectedCategory === 'puzzle' ? puzzles : dogs
            ).length === 0 && (
              <p className="text-center py-8 text-gray-500">
                {language === 'en' ? 'No items in this category yet' : 'Belum ada item di kategori ini'}
              </p>
            )
          )}
        </div>
      </div>
    </div>
  )
}
