"use client"


import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Plus, Edit2, Trash2, QrCode, Users, ArrowLeft } from "lucide-react"
import { useLanguage } from '@/lib/i18n/context'
import { createDashboardTranslator } from '@/lib/i18n/dashboard-translator'

type TableStatus = 'available' | 'occupied' | 'reserved'

export default function ManageTablesPage() {
  const router = useRouter()
  const supabase = createClient()
  const { t, language } = useLanguage()
  const { t: dt } = createDashboardTranslator(language)
  const [loading, setLoading] = useState(true)
  const [tables, setTables] = useState<any[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editingTable, setEditingTable] = useState<any>(null)
  const [restaurant, setRestaurant] = useState<any>(null)
  const [showQRModal, setShowQRModal] = useState(false)
  const [selectedQRTable, setSelectedQRTable] = useState<any>(null)
  
  const [formData, setFormData] = useState({
    number: '',
    capacity: ''
  })

  useEffect(() => {
    loadTables()
  }, [])

  async function loadTables() {
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

      const { data: restaurants } = await supabase
        .from('restaurants')
        .select('*')
        .eq('id', selectedRestaurantId)
        .eq('owner_id', user.id)
        .single()

      if (!restaurants) return
      setRestaurant(restaurants)

      const { data: tablesData } = await supabase
        .from('tables')
        .select('*')
        .eq('restaurant_id', restaurants.id)
        .order('number')

      if (tablesData) {
        setTables(tablesData)
      }
    } catch (error) {
      console.error('Error loading tables:', error)
    } finally {
      setLoading(false)
    }
  }

  function openModal(table: any = null) {
    if (table) {
      setEditingTable(table)
      setFormData({
        number: table.number || '',
        capacity: table.capacity?.toString() || ''
      })
    } else {
      setEditingTable(null)
      setFormData({
        number: '',
        capacity: ''
      })
    }
    setShowModal(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    if (!restaurant) return

    const tableData: any = {
      number: formData.number,
      capacity: parseInt(formData.capacity),
      restaurant_id: restaurant.id
    }

    if (!editingTable) {
      tableData.barcode = `TABLE-${formData.number}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
    }

    try {
      if (editingTable) {
        await supabase
          .from('tables')
          .update(tableData)
          .eq('id', editingTable.id)
      } else {
        await supabase
          .from('tables')
          .insert(tableData)
      }

      setShowModal(false)
      loadTables()
    } catch (error) {
      console.error('Error saving table:', error)
    }
  }

  async function deleteTable(id: string) {
    if (!confirm((t.mockups.tables as any).confirmDelete || 'Are you sure?')) return

    try {
      await supabase
        .from('tables')
        .delete()
        .eq('id', id)

      loadTables()
    } catch (error) {
      console.error('Error deleting table:', error)
    }
  }

  async function showQRCode(table: any) {
    let tableToShow = table
    
    if (!table.barcode) {
      const barcode = `TABLE-${table.number}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
      const { error } = await supabase
        .from('tables')
        .update({ barcode })
        .eq('id', table.id)
      
      if (!error) {
        tableToShow = { ...table, barcode }
        setTables(prevTables => 
          prevTables.map(t => t.id === table.id ? tableToShow : t)
        )
      }
    }
    
    setSelectedQRTable(tableToShow)
    setShowQRModal(true)
  }

  const availableTables = tables.filter(t => !t.status || t.status === 'available').length
  const occupiedTables = tables.filter(t => t.status && t.status !== 'available').length

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-accent)]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/dashboard/tables')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{dt("manageTables")}</h1>
                <p className="text-sm text-gray-500 mt-1">{dt("tableInsightsDesc")}</p>
              </div>
            </div>
            <button
              onClick={() => openModal()}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)] text-white rounded-lg font-medium hover:bg-[var(--color-accent-hover)] transition-colors"
            >
              <Plus className="w-5 h-5" />
              {(t.mockups.tables as any).addNewTable}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Table Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{tables.length}</h3>
            <p className="text-sm text-gray-600">{dt("totalTablesLabel")}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-3xl font-bold text-green-600 mb-1">{availableTables}</h3>
            <p className="text-sm text-gray-600">{dt("available")}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-3xl font-bold text-red-600 mb-1">{occupiedTables}</h3>
            <p className="text-sm text-gray-600">{dt("occupied")}</p>
          </div>
        </div>

        {/* Tables Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tables.length === 0 ? (
            <div className="col-span-full bg-white rounded-2xl p-12 text-center border border-gray-100">
              <p className="text-gray-500 text-lg">{dt("noTableData")}</p>
            </div>
          ) : (
            tables.map((table) => {
              const isOccupied = table.status && table.status !== 'available'
              return (
                <div
                  key={table.id}
                  className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all ${
                    isOccupied 
                      ? 'border-2 border-green-200 bg-green-50' 
                      : 'border border-gray-200'
                  }`}
                >
                  <div className="p-6 text-center">
                    <div className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-3 border-2 ${
                      isOccupied
                        ? 'bg-blue-50 border-blue-200'
                        : 'bg-red-50 border-red-200'
                    }`}>
                      <Users className={`w-8 h-8 ${
                        isOccupied ? 'text-green-500' : 'text-[#FF5A5F]'
                      }`} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {dt("tableLabel")} {table.number}
                    </h3>
                    {isOccupied && (
                        <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 mb-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-xs font-semibold text-green-700">{dt("occupied")}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-center gap-1.5 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span className="text-sm font-medium">{table.capacity} {dt("peopleLabel")}</span>
                    </div>
                  </div>

                  <div className="flex border-t border-gray-100">
                    <button
                      onClick={() => showQRCode(table)}
                      className="flex-1 flex items-center justify-center py-3 hover:bg-gray-50 transition-colors border-r border-gray-100"
                      title={(t.mockups.tables as any).viewQRCode || 'QR'}
                    >
                      <QrCode className="w-4 h-4 text-[#FF5A5F]" />
                    </button>
                    <button
                      onClick={() => openModal(table)}
                      className="flex-1 flex items-center justify-center py-3 hover:bg-gray-50 transition-colors border-r border-gray-100"
                      title={(t.mockups.tables as any).editItem || ''}
                    >
                      <Edit2 className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => deleteTable(table.id)}
                      className="flex-1 flex items-center justify-center py-3 hover:bg-gray-50 transition-colors"
                      title={(t.mockups.tables as any).confirmDelete || ''}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </main>

      {/* Table Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">
              {editingTable ? (t.mockups.tables as any).editTable : (t.mockups.tables as any).addNewTable}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {(t.mockups.tables as any).tableName}
                </label>
                <input
                  type="text"
                  required
                  value={formData.number}
                  onChange={(e) => setFormData({...formData, number: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                  placeholder="Contoh: A1, B2, VIP-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {(t.mockups.tables as any).numberOfSeats}
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={formData.capacity}
                  onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  {dt("close")}
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#FF5A5F] text-white rounded-lg font-medium hover:bg-[#FF5A5F]/90 transition-colors"
                >
                  {editingTable ? (t.mockups.tables as any).saveTable : (t.mockups.tables as any).addNewTable}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {showQRModal && selectedQRTable && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
              {(t.mockups.tables as any).viewQRCode} - {dt("tableLabel")} {selectedQRTable.number}
            </h2>
            
            <div className="bg-gray-50 p-4 rounded-xl mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm mx-auto w-fit">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`https://order.kadaipos.id/order/${selectedQRTable.barcode || selectedQRTable.id}`)}&v=2`}
                  alt="QR Code"
                  className="w-52 h-52"
                />
              </div>
              <div className="mt-4 text-center space-y-2">
                <button
                  onClick={() => {
                    const url = `https://order.kadaipos.id/order/${selectedQRTable.barcode || selectedQRTable.id}`
                    window.open(url, '_blank')
                  }}
                  className="text-[#FF5A5F] font-semibold text-sm hover:underline"
                >
                  {(t.mockups.tables as any).openCustomerLink || 'Open customer link'}
                </button>
                <button
                  onClick={() => {
                    const url = `https://order.kadaipos.id/order/${selectedQRTable.barcode || selectedQRTable.id}`
                    navigator.clipboard.writeText(url)
                    alert((t.mockups.tables as any).linkCopied)
                  }}
                  className="block w-full text-gray-900 font-semibold text-sm hover:underline"
                >
                  {(t.mockups.tables as any).copyLink}
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-600 text-center mb-6 leading-relaxed">
              {(t.mockups.tables as any).openCustomerLink}
            </p>

            <div className="flex gap-3">
              <button
                  onClick={() => setShowQRModal(false)}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                {dt("close")}
              </button>
              <button
                onClick={() => {
                  const url = `https://order.kadaipos.id/order/${selectedQRTable.barcode || selectedQRTable.id}`
                  if (navigator.share) {
                    navigator.share({
                      title: `QR Code Meja ${selectedQRTable.number}`,
                      text: `Pesan di Meja ${selectedQRTable.number}`,
                      url: url
                    })
                  } else {
                    navigator.clipboard.writeText(url)
                    alert((t.mockups.tables as any).linkCopied)
                  }
                }}
                className="flex-1 px-4 py-3 bg-[#FF5A5F] text-white rounded-xl font-semibold hover:bg-[#FF5A5F]/90 transition-colors"
              >
                {(t.mockups.tables as any).share}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
