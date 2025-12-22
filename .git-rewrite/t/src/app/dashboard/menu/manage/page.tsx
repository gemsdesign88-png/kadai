"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Plus, Edit2, Trash2, Search, Tag, FolderOpen, ArrowLeft } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

interface MenuCategory {
  id: string
  name: string
  parent_id: string | null
  restaurant_id: string
  display_order?: number
  parent?: MenuCategory
}

interface MenuItem {
  id: string
  name: string
  category: string
  category_id?: string | null
  price: number
  description?: string
  available: boolean
  is_available?: boolean
  stock?: number
  image_url?: string
  restaurant_id: string
  menu_category?: MenuCategory
}

export default function MenuManagePage() {
  const router = useRouter()
  const supabase = createClient()
  const { language } = useLanguage()
  const [loading, setLoading] = useState(true)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedParentCategory, setSelectedParentCategory] = useState<string>('all')
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all')
  const [showModal, setShowModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [restaurant, setRestaurant] = useState<any>(null)
  
  const [allCategories, setAllCategories] = useState<MenuCategory[]>([])
  const [parentCategories, setParentCategories] = useState<MenuCategory[]>([])
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    category_id: null as string | null,
    stock: '',
    image_url: '',
    available: true
  })

  const [newCategoryName, setNewCategoryName] = useState('')
  const [newParentCategoryId, setNewParentCategoryId] = useState<string | null>(null)

  useEffect(() => {
    loadMenu()
  }, [])

  useEffect(() => {
    filterItems()
  }, [searchTerm, selectedParentCategory, selectedSubCategory, menuItems])

  async function loadMenu() {
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

      const categories = await fetchCategories(restaurants.id)

      const { data: items } = await supabase
        .from('menu_items')
        .select('*')
        .eq('restaurant_id', restaurants.id)
        .order('name')

      if (items) {
        const enrichedItems = items.map((item: any) => {
          if (item.category_id) {
            const categoryInfo = categories.find(c => c.id === item.category_id)
            if (categoryInfo) {
              const parent = categoryInfo.parent_id 
                ? categories.find(c => c.id === categoryInfo.parent_id)
                : null
              
              return {
                ...item,
                menu_category: {
                  ...categoryInfo,
                  parent: parent || undefined
                }
              }
            }
          }
          return item
        })
        
        setMenuItems(enrichedItems)
      }
    } catch (error) {
      console.error('Error loading menu:', error)
    } finally {
      setLoading(false)
    }
  }

  async function fetchCategories(restaurantId: string): Promise<MenuCategory[]> {
    try {
      const { data, error } = await supabase
        .from('menu_categories')
        .select('*')
        .eq('restaurant_id', restaurantId)
        .order('name')

      if (error) {
        console.error('Error fetching categories:', error)
        setAllCategories([])
        setParentCategories([])
        return []
      }
      
      const cats = (data || []) as MenuCategory[]
      setAllCategories(cats)
      
      const parents = cats.filter(c => !c.parent_id)
      setParentCategories(parents)
      
      return cats
    } catch (error) {
      console.error('Error fetching categories:', error)
      setAllCategories([])
      setParentCategories([])
      return []
    }
  }

  function filterItems() {
    let filtered = menuItems

    if (selectedParentCategory !== 'all') {
      if (selectedParentCategory === 'uncategorized') {
        filtered = filtered.filter(item => !item.category_id)
      } else {
        filtered = filtered.filter(item => {
          if (item.menu_category) {
            return item.menu_category.id === selectedParentCategory ||
                   item.menu_category.parent_id === selectedParentCategory
          }
          return false
        })
      }
    }

    if (selectedSubCategory !== 'all') {
      filtered = filtered.filter(item => item.category_id === selectedSubCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredItems(filtered)
  }

  function getSubcategories(parentId: string): MenuCategory[] {
    return allCategories.filter(c => c.parent_id === parentId)
  }

  function getCategoryDisplayName(category?: MenuCategory): string {
    if (!category) return ''
    if (category.parent) {
      return `${category.name} (${category.parent.name})`
    }
    return category.name
  }

  function openModal(item: MenuItem | null = null) {
    if (item) {
      setEditingItem(item)
      setFormData({
        name: item.name || '',
        description: item.description || '',
        price: item.price?.toString() || '',
        category: item.category || '',
        category_id: item.category_id || null,
        stock: item.stock?.toString() || '',
        image_url: item.image_url || '',
        available: item.available ?? true
      })
    } else {
      setEditingItem(null)
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        category_id: null,
        stock: '',
        image_url: '',
        available: true
      })
    }
    setShowModal(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    if (!restaurant) return

    let categoryName = formData.category
    if (formData.category_id) {
      const selectedCat = allCategories.find(c => c.id === formData.category_id)
      if (selectedCat) {
        categoryName = selectedCat.parent_id
          ? `${selectedCat.name} (${allCategories.find(p => p.id === selectedCat.parent_id)?.name})`
          : selectedCat.name
      }
    }

    const itemData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: categoryName,
      category_id: formData.category_id,
      stock: parseInt(formData.stock) || 0,
      image_url: formData.image_url,
      available: formData.available,
      restaurant_id: restaurant.id
    }

    try {
      if (editingItem) {
        await supabase
          .from('menu_items')
          .update(itemData)
          .eq('id', editingItem.id)
      } else {
        await supabase
          .from('menu_items')
          .insert(itemData)
      }

      setShowModal(false)
      loadMenu()
    } catch (error) {
      console.error('Error saving menu item:', error)
    }
  }

  async function handleCreateCategory(e: React.FormEvent) {
    e.preventDefault()
    
    if (!restaurant || !newCategoryName.trim()) return

    try {
      const { error } = await supabase
        .from('menu_categories')
        .insert({
          name: newCategoryName.trim(),
          parent_id: newParentCategoryId,
          restaurant_id: restaurant.id
        })

      if (error) throw error

      setShowCategoryModal(false)
      setNewCategoryName('')
      setNewParentCategoryId(null)
      await fetchCategories(restaurant.id)
    } catch (error) {
      console.error('Error creating category:', error)
      alert(language === 'en' ? 'Failed to create category' : 'Gagal membuat kategori')
    }
  }

  async function deleteItem(id: string) {
    if (!confirm(language === 'en' ? 'Delete this item from menu?' : 'Hapus item ini dari menu?')) return

    try {
      await supabase
        .from('menu_items')
        .delete()
        .eq('id', id)

      loadMenu()
    } catch (error) {
      console.error('Error deleting item:', error)
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
                onClick={() => router.push('/dashboard/menu')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {language === 'en' ? 'Manage Menu' : 'Kelola Menu'}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  {language === 'en' ? 'Manage menu items, categories, and stock' : 'Atur menu, kategori, dan stok item'}
                </p>
              </div>
            </div>
            <button
              onClick={() => openModal()}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)] text-white rounded-lg font-medium hover:bg-[var(--color-accent-hover)] transition-colors"
            >
              <Plus className="w-5 h-5" />
              {language === 'en' ? 'Add Item' : 'Tambah Item'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="bg-white rounded-2xl p-4 mb-6 border border-gray-100 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={language === 'en' ? 'Search menu...' : 'Cari menu...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowCategoryModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors whitespace-nowrap"
              >
                <Tag className="w-4 h-4" />
                {language === 'en' ? 'Manage Categories' : 'Kelola Kategori'}
              </button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <select
              value={selectedParentCategory}
              onChange={(e) => {
                setSelectedParentCategory(e.target.value)
                setSelectedSubCategory('all')
              }}
              className="px-4 py-2.5 border-2 border-gray-200 rounded-xl font-medium focus:outline-none focus:border-gray-400 hover:border-gray-300 transition-all cursor-pointer"
            >
              <option value="all">{language === 'en' ? 'All Categories' : 'Semua Kategori'}</option>
              {parentCategories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
              <option value="uncategorized">{language === 'en' ? 'Uncategorized' : 'Tanpa Kategori'}</option>
            </select>
            {selectedParentCategory !== 'all' && selectedParentCategory !== 'uncategorized' && (
              <select
                value={selectedSubCategory}
                onChange={(e) => setSelectedSubCategory(e.target.value)}
                className="px-4 py-2.5 border-2 border-gray-200 rounded-xl font-medium focus:outline-none focus:border-gray-400 hover:border-gray-300 transition-all cursor-pointer"
              >
                <option value="all">{language === 'en' ? 'All Subcategories' : 'Semua Subkategori'}</option>
                {getSubcategories(selectedParentCategory).map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.length === 0 ? (
            <div className="col-span-full bg-white rounded-2xl p-12 text-center border border-gray-100">
              <p className="text-gray-500 text-lg">
                {language === 'en' ? 'No items found' : 'Tidak ada item ditemukan'}
              </p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gray-100 flex items-center justify-center">
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-400 text-4xl">🍽️</span>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-1">{item.name}</h3>
                      {item.menu_category ? (
                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                          {getCategoryDisplayName(item.menu_category)}
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {item.category || (language === 'en' ? 'Uncategorized' : 'Tanpa Kategori')}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {item.description || (language === 'en' ? 'No description' : 'Tidak ada deskripsi')}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(item.price)}
                    </p>
                    {item.stock !== undefined && (
                      <span className={`text-sm font-medium ${
                        item.stock > 10 ? 'text-green-600' : 
                        item.stock > 0 ? 'text-yellow-600' : 
                        'text-red-600'
                      }`}>
                        {language === 'en' ? 'Stock' : 'Stok'}: {item.stock}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openModal(item)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                      {language === 'en' ? 'Edit' : 'Edit'}
                    </button>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Item Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">
              {editingItem 
                ? (language === 'en' ? 'Edit Item' : 'Edit Item')
                : (language === 'en' ? 'Add Item' : 'Tambah Item')
              }
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Item Name' : 'Nama Item'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Description' : 'Deskripsi'}
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Price' : 'Harga'}
                </label>
                <input
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Category' : 'Kategori'}
                </label>
                <div className="space-y-2">
                  <select
                    value={formData.category_id || ''}
                    onChange={(e) => setFormData({...formData, category_id: e.target.value || null})}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl font-medium focus:outline-none focus:border-gray-400 hover:border-gray-300 transition-all cursor-pointer"
                  >
                    <option value="">{language === 'en' ? 'Select Category' : 'Pilih Kategori'}</option>
                    {parentCategories.map(parent => (
                      <optgroup key={parent.id} label={parent.name}>
                        <option value={parent.id}>{parent.name}</option>
                        {getSubcategories(parent.id).map(sub => (
                          <option key={sub.id} value={sub.id}>
                            &nbsp;&nbsp;→ {sub.name}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => setShowCategoryModal(true)}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    + {language === 'en' ? 'Create New Category' : 'Buat Kategori Baru'}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Stock' : 'Stok'}
                </label>
                <input
                  type="number"
                  required
                  value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Image URL' : 'URL Gambar'}
                </label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  {language === 'en' ? 'Cancel' : 'Batal'}
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[var(--color-accent)] text-white rounded-lg font-medium hover:bg-[var(--color-accent-hover)] transition-colors"
                >
                  {editingItem ? (language === 'en' ? 'Save' : 'Simpan') : (language === 'en' ? 'Add' : 'Tambah')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Category Management Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">
              {language === 'en' ? 'Manage Categories' : 'Kelola Kategori'}
            </h2>
            
            {/* Create New Category Form */}
            <form onSubmit={handleCreateCategory} className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-3">
                {language === 'en' ? 'Create New Category' : 'Buat Kategori Baru'}
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'en' ? 'Category Name' : 'Nama Kategori'}
                  </label>
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder={language === 'en' ? 'e.g., Main Course, Dessert' : 'Contoh: Nasi Goreng, Main Course, Dessert'}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'en' ? 'Parent Category (Optional)' : 'Parent Kategori (Opsional)'}
                  </label>
                  <select
                    value={newParentCategoryId || ''}
                    onChange={(e) => setNewParentCategoryId(e.target.value || null)}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl font-medium focus:outline-none focus:border-gray-400 hover:border-gray-300 transition-all cursor-pointer"
                  >
                    <option value="">
                      {language === 'en' ? 'No parent (Main Category)' : 'Tidak ada parent (Kategori Utama)'}
                    </option>
                    {parentCategories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
                >
                  {language === 'en' ? 'Add Category' : 'Tambah Kategori'}
                </button>
              </div>
            </form>

            {/* Existing Categories List */}
            <div className="space-y-4">
              <h3 className="font-semibold">
                {language === 'en' ? 'Existing Categories' : 'Kategori yang Ada'}
              </h3>
              {parentCategories.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  {language === 'en' ? 'No categories yet' : 'Belum ada kategori'}
                </p>
              ) : (
                <div className="space-y-3">
                  {parentCategories.map(parent => (
                    <div key={parent.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <FolderOpen className="w-5 h-5 text-gray-600" />
                        <span className="font-medium text-gray-900">{parent.name}</span>
                        <span className="text-xs text-gray-500">
                          ({menuItems.filter(i => i.category_id === parent.id || i.menu_category?.parent_id === parent.id).length} {language === 'en' ? 'items' : 'items'})
                        </span>
                      </div>
                      {getSubcategories(parent.id).length > 0 && (
                        <div className="ml-7 mt-2 space-y-1">
                          {getSubcategories(parent.id).map(sub => (
                            <div key={sub.id} className="flex items-center gap-2 text-sm text-gray-700">
                              <Tag className="w-4 h-4 text-gray-400" />
                              <span>{sub.name}</span>
                              <span className="text-xs text-gray-500">
                                ({menuItems.filter(i => i.category_id === sub.id).length} {language === 'en' ? 'items' : 'items'})
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-6 mt-6 border-t">
              <button
                onClick={() => setShowCategoryModal(false)}
                className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                {language === 'en' ? 'Close' : 'Tutup'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
