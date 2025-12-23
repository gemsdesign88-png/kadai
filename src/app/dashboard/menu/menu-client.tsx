"use client"

import { useEffect, useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { TrendingUp, DollarSign, Star, AlertTriangle, ThumbsUp, ThumbsDown, TrendingDown, Zap, Plus, Settings, PieChart as PieChartIcon } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"
import { createDashboardTranslator } from '@/lib/i18n/dashboard-translator'
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

export default function MenuClient() {
  const router = useRouter()
  const supabase = createClient()
  const { language } = useLanguage()
  const { t } = useLanguage()
  const { t: dt } = useMemo(() => createDashboardTranslator(language), [language])
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
          popularity: 'medium',
          profitability: 'high',
          menuClass: 'star'
        }
      })

      const analyticsArray = Object.values(itemAnalytics)
      
      // Calculate averages for classification
      const avgQuantity = analyticsArray.reduce((sum, item) => sum + item.quantitySold, 0) / analyticsArray.length
      const avgProfit = analyticsArray.reduce((sum, item) => sum + item.profitMargin, 0) / analyticsArray.length

      // Classify items
      analyticsArray.forEach(item => {
        const isPopular = item.quantitySold >= avgQuantity
        const isProfitable = item.profitMargin >= avgProfit

        if (isPopular && isProfitable) item.menuClass = 'star'
        else if (isPopular && !isProfitable) item.menuClass = 'plow-horse'
        else if (!isPopular && isProfitable) item.menuClass = 'puzzle'
        else item.menuClass = 'dog'
      })

      setAnalytics(analyticsArray)
      setStars(analyticsArray.filter(i => i.menuClass === 'star'))
      setPlowHorses(analyticsArray.filter(i => i.menuClass === 'plow-horse'))
      setPuzzles(analyticsArray.filter(i => i.menuClass === 'puzzle'))
      setDogs(analyticsArray.filter(i => i.menuClass === 'dog'))

      // Category Mix
      const catMap = new Map<string, { revenue: number; items: number }>()
      analyticsArray.forEach(item => {
        const cat = item.category || dt("uncategorized")
        const current = catMap.get(cat) || { revenue: 0, items: 0 }
        catMap.set(cat, {
          revenue: current.revenue + item.revenue,
          items: current.items + 1
        })
      })
      setCategoryMix(Array.from(catMap.entries()).map(([name, data]) => ({ name, value: data.revenue, items: data.items })))

      // Sales by Product
      setSalesByProduct(analyticsArray
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 10)
        .map(i => ({ name: i.itemName, revenue: i.revenue, quantity: i.quantitySold }))
      )

    } catch (error) {
      console.error('❌ Error loading menu analytics:', error)
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

  const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899']

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-accent)]"></div>
      </div>
    )
  }

  const filteredItems = selectedCategory === 'all' 
    ? analytics 
    : analytics.filter(i => i.menuClass === selectedCategory)

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{dt("menuEngineering")}</h1>
        <p className="text-sm sm:text-base text-gray-600">{dt("menuEngineeringDesc")}</p>
      </div>

      {/* Matrix Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <button 
          onClick={() => setSelectedCategory('star')}
          className={`p-6 rounded-2xl border transition-all text-left ${selectedCategory === 'star' ? 'bg-green-50 border-green-200 ring-2 ring-green-500' : 'bg-white border-gray-100 hover:border-green-200'}`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-green-600">{stars.length}</span>
          </div>
          <p className="font-bold text-gray-900">{dt("stars")}</p>
          <p className="text-xs text-gray-500 mt-1">{dt("starsDesc")}</p>
        </button>

        <button 
          onClick={() => setSelectedCategory('plow-horse')}
          className={`p-6 rounded-2xl border transition-all text-left ${selectedCategory === 'plow-horse' ? 'bg-blue-50 border-blue-200 ring-2 ring-blue-500' : 'bg-white border-gray-100 hover:border-blue-200'}`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-blue-600">{plowHorses.length}</span>
          </div>
          <p className="font-bold text-gray-900">{dt("plowHorses")}</p>
          <p className="text-xs text-gray-500 mt-1">{dt("plowHorsesDesc")}</p>
        </button>

        <button 
          onClick={() => setSelectedCategory('puzzle')}
          className={`p-6 rounded-2xl border transition-all text-left ${selectedCategory === 'puzzle' ? 'bg-yellow-50 border-yellow-200 ring-2 ring-yellow-500' : 'bg-white border-gray-100 hover:border-yellow-200'}`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Settings className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-2xl font-bold text-yellow-600">{puzzles.length}</span>
          </div>
          <p className="font-bold text-gray-900">{dt("puzzles")}</p>
          <p className="text-xs text-gray-500 mt-1">{dt("puzzlesDesc")}</p>
        </button>

        <button 
          onClick={() => setSelectedCategory('dog')}
          className={`p-6 rounded-2xl border transition-all text-left ${selectedCategory === 'dog' ? 'bg-red-50 border-red-200 ring-2 ring-red-500' : 'bg-white border-gray-100 hover:border-red-200'}`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-2xl font-bold text-red-600">{dogs.length}</span>
          </div>
          <p className="font-bold text-gray-900">{dt("dogs")}</p>
          <p className="text-xs text-gray-500 mt-1">{dt("dogsDesc")}</p>
        </button>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Category Mix */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <PieChartIcon className="w-5 h-5 text-gray-400" />
            <h3 className="font-bold text-gray-900">{dt("categoryMix")}</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryMix}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryMix.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales by Product */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-5 h-5 text-gray-400" />
            <h3 className="font-bold text-gray-900">{dt("topProductsByRevenue")}</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesByProduct} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f0f0f0" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false}
                  width={100}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="revenue" fill="var(--color-accent)" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Menu Items Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-900">
            {selectedCategory === 'all' ? dt("allItems") : dt(selectedCategory + "s")}
          </h3>
          {selectedCategory !== 'all' && (
            <button 
              onClick={() => setSelectedCategory('all')}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              {dt("showAll")}
            </button>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm">
                <th className="px-6 py-4 font-semibold">{dt("itemName")}</th>
                <th className="px-6 py-4 font-semibold">{dt("category")}</th>
                <th className="px-6 py-4 font-semibold">{dt("price")}</th>
                <th className="px-6 py-4 font-semibold">{dt("sold")}</th>
                <th className="px-6 py-4 font-semibold">{dt("revenue")}</th>
                <th className="px-6 py-4 font-semibold">{dt("margin")}</th>
                <th className="px-6 py-4 font-semibold">{dt("class")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredItems.map((item) => (
                <tr key={item.itemId} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {item.image_url ? (
                        <img src={item.image_url} alt={item.itemName} className="w-10 h-10 rounded-lg object-cover" />
                      ) : (
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Plus className="w-5 h-5 text-gray-400" />
                        </div>
                      )}
                      <p className="font-medium text-gray-900">{item.itemName}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs">
                      {item.category || dt("uncategorized")}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{formatCurrency(item.price)}</td>
                  <td className="px-6 py-4 text-gray-900 font-semibold">{item.quantitySold}</td>
                  <td className="px-6 py-4 text-gray-900 font-bold">{formatCurrency(item.revenue)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden max-w-[60px]">
                        <div 
                          className={`h-full rounded-full ${item.profitMargin > 50 ? 'bg-green-500' : item.profitMargin > 30 ? 'bg-blue-500' : 'bg-yellow-500'}`}
                          style={{ width: `${Math.min(100, item.profitMargin)}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-gray-600">{item.profitMargin.toFixed(0)}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-lg text-xs font-bold uppercase ${
                      item.menuClass === 'star' ? 'bg-green-100 text-green-700' :
                      item.menuClass === 'plow-horse' ? 'bg-blue-100 text-blue-700' :
                      item.menuClass === 'puzzle' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {dt(item.menuClass)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
