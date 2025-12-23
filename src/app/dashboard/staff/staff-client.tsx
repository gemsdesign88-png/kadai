"use client"

import { useEffect, useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useLanguage } from "@/lib/i18n/context"
import { Plus, Edit2, Trash2, Search, User, Phone, Briefcase, BarChart3, TrendingUp, X } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { createDashboardTranslator } from "@/lib/i18n/dashboard-translator"

type StaffRole = 'manager'

export default function StaffClient() {
  const router = useRouter()
  const supabase = createClient()
  const { language } = useLanguage()
  const { t: dt } = useMemo(() => createDashboardTranslator(language), [language])
  const [loading, setLoading] = useState(true)
  const [staff, setStaff] = useState<any[]>([])
  const [filteredStaff, setFilteredStaff] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState<string>('all')
  const [showModal, setShowModal] = useState(false)
  const [editingStaff, setEditingStaff] = useState<any>(null)
  const [restaurant, setRestaurant] = useState<any>(null)
  const [availableRoles, setAvailableRoles] = useState<any[]>([])
  const [staffPerformance, setStaffPerformance] = useState<any[]>([])
  const [performancePeriod, setPerformancePeriod] = useState<'week' | 'month'>('week')
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    role: '',
    pin: ''
  })

  useEffect(() => {
    loadStaff()
    loadRoles()
    loadStaffPerformance()
  }, [])

  useEffect(() => {
    loadStaffPerformance()
  }, [performancePeriod])

  useEffect(() => {
    filterStaff()
  }, [searchTerm, selectedRole, staff])

  async function loadRoles() {
    try {
      const selectedRestaurantId = localStorage.getItem('selected_restaurant_id')
      if (!selectedRestaurantId) return

      // Load unique roles from staff table
      const { data: staffData } = await supabase
        .from('staff')
        .select('role')
        .eq('restaurant_id', selectedRestaurantId)

      if (staffData) {
        // Get unique roles
        const uniqueRoles = [...new Set(staffData.map(s => s.role).filter(Boolean))]
        setAvailableRoles(uniqueRoles.map(role => ({ value: role, label: role })))
      }
    } catch (error) {
      console.error('Error loading roles:', error)
    }
  }

  async function loadStaffPerformance() {
    try {
      const selectedRestaurantId = localStorage.getItem('selected_restaurant_id')
      if (!selectedRestaurantId) return

      // Calculate date range
      const now = new Date()
      const startDate = new Date()
      if (performancePeriod === 'week') {
        startDate.setDate(now.getDate() - 7)
      } else {
        startDate.setDate(now.getDate() - 30)
      }

      // Fetch orders with staff_id
      const { data: orders } = await supabase
        .from('orders')
        .select('staff_id, total, status')
        .eq('restaurant_id', selectedRestaurantId)
        .gte('created_at', startDate.toISOString())
        .neq('status', 'cancelled')

      if (!orders || orders.length === 0) {
        setStaffPerformance([])
        return
      }

      // Calculate performance by staff
      const performanceMap = new Map<string, { revenue: number; orders: number }>()
      
      orders.forEach(order => {
        if (order.staff_id) {
          const existing = performanceMap.get(order.staff_id) || { revenue: 0, orders: 0 }
          performanceMap.set(order.staff_id, {
            revenue: existing.revenue + (order.total || 0),
            orders: existing.orders + 1
          })
        }
      })

      // Get staff names
      const staffIds = Array.from(performanceMap.keys())
      const { data: staffData } = await supabase
        .from('staff')
        .select('id, name')
        .in('id', staffIds)

      const performanceData = staffIds.map(staffId => {
        const perf = performanceMap.get(staffId)!
        const staffMember = staffData?.find(s => s.id === staffId)
        return {
          name: staffMember?.name || 'Unknown',
          revenue: perf.revenue,
          orders: perf.orders,
          avgOrder: perf.orders > 0 ? perf.revenue / perf.orders : 0
        }
      }).sort((a, b) => b.revenue - a.revenue)

      setStaffPerformance(performanceData)
    } catch (error) {
      console.error('Error loading staff performance:', error)
      setStaffPerformance([])
    }
  }

  async function loadStaff() {
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
      setRestaurant(restaurants)

      const { data: staffData } = await supabase
        .from('staff')
        .select('*')
        .eq('restaurant_id', restaurants.id)
        .order('name')

      if (staffData) {
        setStaff(staffData)
      } else {
        setStaff([])
      }
    } catch (error) {
      console.error('Error loading staff:', error)
      setStaff([])
    } finally {
      setLoading(false)
    }
  }

  function filterStaff() {
    let filtered = staff

    if (selectedRole !== 'all') {
      filtered = filtered.filter(s => s.role === selectedRole)
    }

    if (searchTerm) {
      filtered = filtered.filter(s =>
        s.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredStaff(filtered)
  }

  function openModal(staffMember: any = null) {
    if (staffMember) {
      setEditingStaff(staffMember)
      setFormData({
        name: staffMember.name || '',
        phone: staffMember.phone || '',
        role: staffMember.role || '',
        pin: ''
      })
    } else {
      setEditingStaff(null)
      setFormData({
        name: '',
        phone: '',
        role: '',
        pin: ''
      })
    }
    setShowModal(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    if (!restaurant) return

    const staffData = {
      name: formData.name,
      phone: formData.phone,
      role: formData.role,
      restaurant_id: restaurant.id,
      ...(formData.pin && { pin: formData.pin })
    }

    try {
      if (editingStaff) {
        await supabase
          .from('staff')
          .update(staffData)
          .eq('id', editingStaff.id)
      } else {
        await supabase
          .from('staff')
          .insert(staffData)
      }

      setShowModal(false)
      loadStaff()
      loadRoles() // Refresh roles list
    } catch (error) {
      console.error('Error saving staff:', error)
    }
  }

  async function deleteStaff(id: string) {
    if (!confirm(language === 'id' ? 'Hapus staff ini?' : language === 'zh' ? '删除该员工？' : 'Delete this staff?')) return

    try {
      await supabase
        .from('staff')
        .delete()
        .eq('id', id)

      loadStaff()
    } catch (error) {
      console.error('Error deleting staff:', error)
    }
  }

  const getRoleLabel = (role: string) => {
    return role || dt("noRole")
  }

  const getRoleColor = (role: string) => {
    if (role === 'manager') return 'bg-purple-100 text-purple-800 border-purple-200'
    return 'bg-blue-100 text-blue-800 border-blue-200'
  }

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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{dt("manageStaff")}</h1>
            <p className="text-sm sm:text-base text-gray-600">{dt("managingStaffAccounts")}</p>
          </div>
          <button
            onClick={() => openModal()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-white rounded-xl font-semibold hover:bg-[var(--color-accent-hover)] transition-colors w-full sm:w-auto"
          >
            <Plus className="w-5 h-5" />
            {dt("addStaff")}
          </button>
        </div>
      </div>

      {/* Staff Performance Chart */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 mb-6 border border-gray-100 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900">{dt("staffPerformance")}</h3>
              <p className="text-xs text-gray-600">{dt("revenueAndOrder")}</p>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setPerformancePeriod('week')}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                performancePeriod === 'week'
                  ? 'bg-[var(--color-accent)] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {dt("sevenDaysAnalytics")}
            </button>
            <button
              onClick={() => setPerformancePeriod('month')}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                performancePeriod === 'month'
                  ? 'bg-[var(--color-accent)] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {dt("thirtyDaysAnalytics")}
            </button>
          </div>
        </div>
        
        <div className="w-full h-64 sm:h-80">
          {staffPerformance.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <TrendingUp className="w-16 h-16 mb-3 opacity-50" />
              <p className="text-sm font-medium">{dt("noStaffPerformance")}</p>
              <p className="text-xs">{dt("staffPerformanceHint")}</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={staffPerformance} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" stroke="#6b7280" style={{ fontSize: '10px' }} />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  stroke="#6b7280" 
                  style={{ fontSize: '9px' }}
                  width={60}
                  tick={{ width: 60 }}
                  tickFormatter={(value) => value.length > 10 ? value.substring(0, 10) + '...' : value}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '8px' 
                  }}
                  formatter={(value?: any, name?: string) => {
                    if (name === 'revenue') return [`Rp ${Number(value || 0).toLocaleString('id-ID')}`, dt("revenue")]
                    if (name === 'orders') return [value, dt("orders")]
                    return [value, name || '']
                  }}
                />
                <Legend />
                <Bar dataKey="revenue" fill="#3b82f6" name={`${dt("revenue")} (Rp)`} radius={[0, 4, 4, 0]} />
                <Bar dataKey="orders" fill="#10b981" name={dt("orders")} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
        
        {staffPerformance.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="p-3 rounded-lg bg-blue-50">
              <p className="text-xs text-blue-600 font-medium">{dt("totalRevenue")}</p>
              <p className="text-lg font-bold text-blue-900">
                Rp {staffPerformance.reduce((sum, s) => sum + s.revenue, 0).toLocaleString('id-ID')}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-50">
              <p className="text-xs text-green-600 font-medium">{dt("totalOrders")}</p>
              <p className="text-lg font-bold text-green-900">
                {staffPerformance.reduce((sum, s) => sum + s.orders, 0)}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-purple-50">
              <p className="text-xs text-purple-600 font-medium">{dt("avgPerOrder")}</p>
              <p className="text-lg font-bold text-purple-900">
                Rp {Math.round(
                  staffPerformance.reduce((sum, s) => sum + s.revenue, 0) / 
                  staffPerformance.reduce((sum, s) => sum + s.orders, 0)
                ).toLocaleString('id-ID')}
              </p>
            </div>
          </div>
        )}
      </div>

      <div>
        {/* Search and Filter */}
        <div className="bg-white rounded-2xl p-4 mb-6 border border-gray-100 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={dt("searchStaff")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              />
            </div>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-4 py-2.5 border-2 border-gray-200 rounded-xl font-medium focus:outline-none focus:border-gray-400 hover:border-gray-300 transition-all cursor-pointer"
            >
              <option value="all">{dt("allRoles")}</option>
              {availableRoles.map(role => (
                <option key={role.value} value={role.value}>{role.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStaff.length === 0 ? (
            <div className="col-span-full bg-white rounded-2xl p-12 text-center border border-gray-100">
              <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {staff.length === 0 ? dt("noStaff") : dt("noStaffFound")}
              </h3>
              <p className="text-gray-500 mb-6">
                {staff.length === 0 
                  ? dt("addFirstStaffDesc")
                  : dt("changeFilterOrSearch")}
              </p>
              {staff.length === 0 && (
                <button
                  onClick={() => openModal()}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-white rounded-xl font-semibold hover:bg-[var(--color-accent-hover)] transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  {dt("addFirstStaff")}
                </button>
              )}
            </div>
          ) : (
            filteredStaff.map((member) => (
              <div key={member.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900">{member.name}</h3>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold border ${getRoleColor(member.role)}`}>
                      {getRoleLabel(member.role)}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{member.phone || '-'}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(member)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    {dt("edit")}
                  </button>
                  <button
                    onClick={() => deleteStaff(member.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h3 className="text-xl font-bold text-gray-900">
                {editingStaff ? dt("editStaff") : dt("addNewStaff")}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{dt("fullName")}</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                  placeholder={dt("exampleName")}
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{dt("phoneNumber")}</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                  placeholder={dt("examplePhone")}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{dt("roleJob")}</label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                  placeholder={dt("exampleRole")}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {dt("pinLogin")} {editingStaff && <span className="text-xs font-normal text-gray-500">({dt("leaveEmptyToKeep")})</span>}
                </label>
                <input
                  type="password"
                  maxLength={6}
                  pattern="\d*"
                  required={!editingStaff}
                  value={formData.pin}
                  onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                  placeholder={dt("sixDigitPin")}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  {dt("cancel")}
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[var(--color-accent)] text-white rounded-lg font-medium hover:bg-[var(--color-accent-hover)] transition-colors"
                >
                  {editingStaff ? dt("saveChanges") : dt("addStaff")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
