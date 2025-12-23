"use client"


import { useEffect, useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Plus, Edit2, Trash2, Search, Tag, FolderOpen, ArrowLeft, Grid3X3, List, Upload, X } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"
import { createDashboardTranslator } from '@/lib/i18n/dashboard-translator'
import imageCompression from 'browser-image-compression'
import * as XLSX from 'xlsx'

interface MenuCategory {
  id: string
  name: string
  parent_id: string | null
  parent_category_id?: string | null
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
  image_url?: string
  restaurant_id: string
  menu_category?: MenuCategory
}

interface BulkMenuItem {
  id: string
  name: string
  price: string
  description: string
  parent_category_id: string | null
  category_id: string | null
  image_url?: string
  available: boolean
  error?: string
}

export default function MenuManagePage() {
  const router = useRouter()
  const supabase = createClient()
  const { language } = useLanguage()
  const { t: dt } = useMemo(() => createDashboardTranslator(language), [language])
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
  
  // Spreadsheet view state
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards')
  const [editingCell, setEditingCell] = useState<{rowId: string, column: string} | null>(null)
  const [newRowData, setNewRowData] = useState<Partial<MenuItem> | null>(null)
  
  const [allCategories, setAllCategories] = useState<MenuCategory[]>([])
  const [parentCategories, setParentCategories] = useState<MenuCategory[]>([])
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    category_id: null as string | null,
    image_url: '',
    available: true
  })

  const [newCategoryName, setNewCategoryName] = useState('')
  const [newParentCategoryId, setNewParentCategoryId] = useState<string | null>(null)

  // Image upload state
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  // Bulk import state
  const [showBulkImport, setShowBulkImport] = useState(false)
  const [bulkImportMode, setBulkImportMode] = useState<'table' | 'csv'>('table')
  const [bulkItems, setBulkItems] = useState<BulkMenuItem[]>([{ id: '1', name: '', price: '', description: '', parent_category_id: null, category_id: null, available: true }])
  const [bulkSaving, setBulkSaving] = useState(false)
  const [bulkItemImages, setBulkItemImages] = useState<{[key: string]: File | null}>({})

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

  function getCategoryColor(category: string) {
    const colors = [
      { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
      { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
      { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200' },
      { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
      { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' },
      { bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-200' },
      { bg: 'bg-pink-100', text: 'text-pink-800', border: 'border-pink-200' },
      { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' }
    ]
    
    // Use category name to consistently get the same color
    const hash = category.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0)
    
    return colors[Math.abs(hash) % colors.length]
  }

  // Image upload functions
  async function compressImage(file: File): Promise<File> {
    const options = {
      maxSizeMB: 0.5, // Maximum size in MB
      maxWidthOrHeight: 800, // Maximum width/height
      useWebWorker: true,
      fileType: 'image/webp' as const
    }

    try {
      const compressedFile = await imageCompression(file, options)
      return compressedFile
    } catch (error) {
      console.error('Error compressing image:', error)
      return file // Return original file if compression fails
    }
  }

  async function uploadImage(file: File, restaurantId: string): Promise<string | null> {
    try {
      setUploadingImage(true)
      setUploadProgress(0)

      console.log('📤 Starting image upload:', { fileName: file.name, size: file.size })

      // Compress the image first
      const compressedFile = await compressImage(file)
      console.log('✅ Image compressed:', { 
        originalSize: file.size, 
        compressedSize: compressedFile.size,
        reduction: Math.round((1 - compressedFile.size / file.size) * 100) + '%'
      })
      setUploadProgress(30)

      // Generate unique filename
      const fileExt = compressedFile.name.split('.').pop() || 'webp'
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `menu-items/${restaurantId}/${fileName}`

      console.log('📁 Upload path:', filePath)
      setUploadProgress(50)

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('menu-images')
        .upload(filePath, compressedFile, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) {
        console.error('❌ Storage upload error:', error)
        console.error('Error details:', {
          message: error.message
        })
        return null
      }

      console.log('✅ File uploaded successfully:', data)
      setUploadProgress(80)

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('menu-images')
        .getPublicUrl(filePath)

      console.log('🔗 Public URL:', publicUrl)
      setUploadProgress(100)
      return publicUrl

    } catch (error) {
      console.error('❌ Image upload exception:', error)
      if (error instanceof Error) {
        console.error('Error message:', error.message)
        console.error('Error stack:', error.stack)
      }
      return null
    } finally {
      setUploadingImage(false)
      setUploadProgress(0)
    }
  }

  function handleImageSelect(file: File) {
    setImageFile(file)
    
    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  function removeImage() {
    setImageFile(null)
    setImagePreview(null)
    setFormData({...formData, image_url: ''})
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
        image_url: item.image_url || '',
        available: item.available ?? true
      })
      // Reset image upload state for editing
      setImageFile(null)
      setImagePreview(null)
    } else {
      setEditingItem(null)
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        category_id: null,
        image_url: '',
        available: true
      })
      // Reset image upload state for new item
      setImageFile(null)
      setImagePreview(null)
    }
    setShowModal(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    if (!restaurant) return

    let finalImageUrl = formData.image_url

    // Upload image if a file is selected
    if (imageFile) {
      const uploadedUrl = await uploadImage(imageFile, restaurant.id)
      if (uploadedUrl) {
        finalImageUrl = uploadedUrl
      } else {
        alert('Failed to upload image. Please try again.')
        return
      }
    }

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
      image_url: finalImageUrl,
      available: formData.available,
      restaurant_id: restaurant.id
    }

    console.log('🔍 Inserting menu item:', itemData)
    console.log('🏪 Restaurant:', restaurant)

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

      // Reset image state
      setImageFile(null)
      setImagePreview(null)
      setFormData({...formData, image_url: ''})

      setShowModal(false)
      loadMenu()
    } catch (error) {
      console.error('❌ Error saving menu item:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      console.error('❌ Error details:', errorMessage)
      alert(`Failed to save menu item: ${errorMessage}`)
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
      alert(dt('failedCreateCategory'))
    }
  }

  // Bulk import functions
  function addBulkRow() {
    const newId = String(Math.max(...bulkItems.map(item => parseInt(item.id) || 0), 0) + 1)
    setBulkItems([...bulkItems, { id: newId, name: '', price: '', description: '', parent_category_id: null, category_id: null, available: true }])
  }

  function removeBulkRow(id: string) {
    setBulkItems(bulkItems.filter(item => item.id !== id))
  }

  function updateBulkRow(id: string, field: keyof BulkMenuItem, value: any) {
    setBulkItems(bulkItems.map(item => {
      if (item.id === id) {
        // If changing parent category, clear subcategory
        if (field === 'parent_category_id') {
          return { ...item, parent_category_id: value, category_id: null }
        }
        return { ...item, [field]: value }
      }
      return item
    }))
  }

  function handleCSVUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const fileName = file.name.toLowerCase()
    const isExcel = fileName.endsWith('.xlsx') || fileName.endsWith('.xls')

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        let rows: BulkMenuItem[] = []

        if (isExcel) {
          // Parse Excel file
          const data = new Uint8Array(event.target?.result as ArrayBuffer)
          const workbook = XLSX.read(data, { type: 'array' })
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
          const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 }) as any[][]
          
          // Skip header row and parse
          rows = jsonData.slice(1).map((row, index) => ({
            id: String(index + 1),
            name: String(row[0] || ''),
            price: String(row[1] || ''),
            description: String(row[2] || ''),
            parent_category_id: row[3] ? String(row[3]) : null,
            category_id: row[4] ? String(row[4]) : null,
            available: row[5] !== false && row[5] !== 'false'
          })).filter(row => row.name)
        } else {
          // Parse CSV file
          const csv = event.target?.result as string
          const lines = csv.split('\n').filter(line => line.trim())
          
          rows = lines.slice(1).map((line, index) => {
            const [name, price, description, parentCategoryId, categoryId, available] = line.split(',').map(v => v.trim())
            return {
              id: String(index + 1),
              name: name || '',
              price: price || '',
              description: description || '',
              parent_category_id: parentCategoryId || null,
              category_id: categoryId || null,
              available: available !== 'false'
            }
          }).filter(row => row.name)
        }

        setBulkItems(rows.length > 0 ? rows : [{ id: '1', name: '', price: '', description: '', parent_category_id: null, category_id: null, available: true }])
        console.log('✅ File loaded:', rows.length, 'items')
        alert(`✅ Successfully loaded ${rows.length} items from ${isExcel ? 'Excel' : 'CSV'} file!`)
      } catch (error) {
        console.error('Error parsing file:', error)
        alert('Failed to parse file. Please check the format matches the template.')
      }
    }

    if (isExcel) {
      reader.readAsArrayBuffer(file)
    } else {
      reader.readAsText(file)
    }
  }

  function downloadTemplate() {
    const csvContent = `name,price,description,parentCategoryId,categoryId,available
Nasi Goreng,45000,Fried rice with egg and vegetables,,,true
Mie Goreng,40000,Fried noodles with egg and vegetables,,,true
Gado Gado,30000,Mixed vegetables with peanut sauce,,,true`
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', 'menu-items-template.csv')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  async function validateAndSaveBulk() {
    if (!restaurant) return

    // Validate items
    const itemsToSave = bulkItems
      .filter(item => item.name.trim())
      .map(item => {
        const price = parseFloat(item.price)
        if (isNaN(price) || price < 0) {
          return { ...item, error: 'Invalid price' }
        }
        return { ...item, error: undefined }
      })

    const hasErrors = itemsToSave.some(item => item.error)
    if (hasErrors) {
      alert('Please fix errors before saving')
      setBulkItems(itemsToSave)
      return
    }

    if (itemsToSave.length === 0) {
      alert('Please add at least one item')
      return
    }

    setBulkSaving(true)
    try {
      // First, upload all images
      const itemsWithImages: any[] = []
      
      for (const item of itemsToSave) {
        let imageUrl = ''
        
        // Upload image if provided
        if (bulkItemImages[item.id]) {
          const uploadedUrl = await uploadImage(bulkItemImages[item.id]!, restaurant.id)
          imageUrl = uploadedUrl || ''
        }

        itemsWithImages.push({
          name: item.name.trim(),
          description: item.description.trim(),
          price: parseFloat(item.price),
          category_id: item.category_id,
          image_url: imageUrl,
          available: item.available,
          restaurant_id: restaurant.id
        })
      }

      const { error } = await supabase
        .from('menu_items')
        .insert(itemsWithImages)

      if (error) throw error

      console.log('✅ Bulk saved:', itemsWithImages.length, 'items')
      alert(`Successfully added ${itemsWithImages.length} items`)
      setShowBulkImport(false)
      setBulkItems([{ id: '1', name: '', price: '', description: '', parent_category_id: null, category_id: null, available: true }])
      setBulkItemImages({})
      loadMenu()
    } catch (error) {
      console.error('Error saving bulk items:', error)
      alert('Failed to save items. Check browser console for details.')
    } finally {
      setBulkSaving(false)
    }
  }

  async function deleteItem(id: string) {
    if (!confirm(dt('deleteItemConfirm'))) return

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

  // Table view functions
  const startEditingCell = (rowId: string, column: string) => {
    setEditingCell({ rowId, column })
  }

  const stopEditingCell = () => {
    setEditingCell(null)
  }

  const updateTableCell = async (rowId: string, column: string, value: string) => {
    try {
      const item = menuItems.find(item => item.id === rowId)
      if (!item) return

      let updateData: any = {}
      
      switch (column) {
        case 'name':
          updateData.name = value
          break
        case 'category':
          updateData.category = value
          break
        case 'price':
          updateData.price = parseInt(value) || 0
          break
        case 'description':
          updateData.description = value
          break
        case 'available':
          updateData.available = value.toLowerCase() === 'true' || value === '1'
          break
      }

      const { error } = await supabase
        .from('menu_items')
        .update(updateData)
        .eq('id', rowId)

      if (error) throw error

      // Update local state
      setMenuItems(prev => prev.map(item => 
        item.id === rowId ? { ...item, ...updateData } : item
      ))

      stopEditingCell()
    } catch (error) {
      console.error('Error updating cell:', error)
      alert('Failed to update item')
    }
  }

  const addNewTableRow = async () => {
    if (!newRowData?.name || !restaurant) return

    try {
      const menuData = {
        name: newRowData.name,
        category: newRowData.category || 'Uncategorized',
        category_id: null,
        price: newRowData.price || 0,
        description: newRowData.description || '',
        available: newRowData.available !== false,
        is_available: true,
        restaurant_id: restaurant.id,
      }

      const { data, error } = await supabase
        .from('menu_items')
        .insert([menuData])
        .select()

      if (error) throw error

      // Add to local state
      if (data && data[0]) {
        setMenuItems(prev => [...prev, data[0]])
      }

      // Clear new row
      setNewRowData(null)
    } catch (error) {
      console.error('Error adding row:', error)
      alert('Failed to add item')
    }
  }

  const deleteTableRow = async (rowId: string) => {
    if (!confirm(dt('deleteItemConfirm'))) return

    try {
      const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', rowId)

      if (error) throw error

      // Remove from local state
      setMenuItems(prev => prev.filter(item => item.id !== rowId))
    } catch (error) {
      console.error('Error deleting row:', error)
      alert('Failed to delete item')
    }
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
                <h1 className="text-2xl font-bold text-gray-900">{dt('manageMenu')}</h1>
                <p className="text-sm text-gray-500 mt-1">{dt('manageMenuDesc')}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setViewMode(viewMode === 'cards' ? 'table' : 'cards')}
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                title={viewMode === 'cards' ? 'Switch to table view' : 'Switch to card view'}
              >
                {viewMode === 'cards' ? <Grid3X3 className="w-5 h-5" /> : <List className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setShowBulkImport(true)}
                className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
                title="Add multiple items at once"
              >
                <Upload className="w-5 h-5" />
                {dt('bulkAdd')}
              </button>
              <button
                onClick={() => openModal()}
                className="flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)] text-white rounded-lg font-medium hover:bg-[var(--color-accent-hover)] transition-colors"
              >
                <Plus className="w-5 h-5" />
                {dt('addItem')}
              </button>
            </div>
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
                placeholder={dt('searchMenuPlaceholder')}
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
                {dt('manageCategories')}
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
              <option value="all">{dt('allCategories')}</option>
              {parentCategories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
              <option value="uncategorized">{dt('uncategorized')}</option>
            </select>
            {selectedParentCategory !== 'all' && selectedParentCategory !== 'uncategorized' && (
              <select
                value={selectedSubCategory}
                onChange={(e) => setSelectedSubCategory(e.target.value)}
                className="px-4 py-2.5 border-2 border-gray-200 rounded-xl font-medium focus:outline-none focus:border-gray-400 hover:border-gray-300 transition-all cursor-pointer"
              >
                <option value="all">{dt('allSubcategories')}</option>
                {getSubcategories(selectedParentCategory).map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Menu Items - Cards or Table View */}
        {viewMode === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.length === 0 ? (
              <div className="col-span-full bg-white rounded-2xl p-12 text-center border border-gray-100">
                <p className="text-gray-500 text-lg">{dt('noItemsFound')}</p>
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
                            {item.category || dt('uncategorized')}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {item.description || dt('noDescription')}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-2xl font-bold text-gray-900">
                        {formatCurrency(item.price)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal(item)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                        {dt('edit')}
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
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-13 gap-4 bg-gray-50 border-b border-gray-200 p-4 font-semibold text-gray-700 text-sm">
              <div className="col-span-1">{dt('image')}</div>
              <div className="col-span-3">{dt('name')}</div>
              <div className="col-span-2">{dt('category')}</div>
              <div className="col-span-2">{dt('price')}</div>
              <div className="col-span-3">{dt('description')}</div>
              <div className="col-span-1 text-center">{dt('available')}</div>
              <div className="col-span-1 text-center">{dt('actions')}</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-100">
              {filteredItems.length === 0 ? (
                <div className="p-12 text-center text-gray-500">
                  {dt('noItemsFound')}
                </div>
              ) : (
                filteredItems.map((item) => {
                  const categoryColor = getCategoryColor(item.category)
                  const displayCategory = item.menu_category 
                    ? getCategoryDisplayName(item.menu_category)
                    : item.category

                  return (
                    <div key={item.id} className="grid grid-cols-13 gap-4 p-4 hover:bg-gray-50 transition-colors">
                      {/* Image */}
                      <div className="col-span-1">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                          {item.image_url ? (
                            <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-gray-400 text-lg">🍽️</span>
                          )}
                        </div>
                      </div>

                      {/* Name */}
                      <div className="col-span-3">
                        {editingCell?.rowId === item.id && editingCell.column === 'name' ? (
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={item.name}
                            onChange={(e) => updateTableCell(item.id, 'name', e.target.value)}
                            onBlur={stopEditingCell}
                            autoFocus
                            onKeyDown={(e) => e.key === 'Enter' && stopEditingCell()}
                          />
                        ) : (
                          <div 
                            className="cursor-pointer hover:text-blue-600 font-medium"
                            onClick={() => startEditingCell(item.id, 'name')}
                          >
                            {item.name}
                          </div>
                        )}
                      </div>

                      {/* Category */}
                      <div className="col-span-2">
                        {editingCell?.rowId === item.id && editingCell.column === 'category' ? (
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={item.category}
                            onChange={(e) => updateTableCell(item.id, 'category', e.target.value)}
                            onBlur={stopEditingCell}
                            autoFocus
                            onKeyDown={(e) => e.key === 'Enter' && stopEditingCell()}
                          />
                        ) : (
                          <div 
                            className="cursor-pointer"
                            onClick={() => startEditingCell(item.id, 'category')}
                          >
                            <span className={`inline-block px-2 py-1 text-xs rounded-full ${categoryColor.bg} ${categoryColor.text} border ${categoryColor.border}`}>
                              {displayCategory}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Price */}
                      <div className="col-span-2">
                        {editingCell?.rowId === item.id && editingCell.column === 'price' ? (
                          <input
                            type="number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={item.price}
                            onChange={(e) => updateTableCell(item.id, 'price', e.target.value)}
                            onBlur={stopEditingCell}
                            autoFocus
                            onKeyDown={(e) => e.key === 'Enter' && stopEditingCell()}
                          />
                        ) : (
                          <div 
                            className="cursor-pointer hover:text-blue-600 font-semibold"
                            onClick={() => startEditingCell(item.id, 'price')}
                          >
                            {formatCurrency(item.price)}
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      <div className="col-span-3">
                        {editingCell?.rowId === item.id && editingCell.column === 'description' ? (
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={item.description || ''}
                            onChange={(e) => updateTableCell(item.id, 'description', e.target.value)}
                            onBlur={stopEditingCell}
                            autoFocus
                            onKeyDown={(e) => e.key === 'Enter' && stopEditingCell()}
                          />
                        ) : (
                          <div 
                            className={`cursor-pointer hover:text-blue-600 ${!item.description ? 'text-gray-400 italic' : ''}`}
                            onClick={() => startEditingCell(item.id, 'description')}
                          >
                            {item.description || dt('noDescription')}
                          </div>
                        )}
                      </div>

                      {/* Available */}
                      <div className="col-span-1 flex justify-center">
                        <button
                          onClick={() => updateTableCell(item.id, 'available', (!item.available).toString())}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            item.available 
                              ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                              : 'bg-red-100 text-red-800 hover:bg-red-200'
                          }`}
                        >
                          {item.available ? dt('yes') : dt('no')}
                        </button>
                      </div>

                      {/* Actions */}
                      <div className="col-span-1 flex justify-center gap-2">
                        <button
                          onClick={() => deleteTableRow(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title={dt('delete')}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )
                })
              )}

              {/* New Row */}
              {newRowData && (
                <div className="grid grid-cols-13 gap-4 p-4 bg-yellow-50 border-t-2 border-yellow-200">
                  {/* Image placeholder */}
                  <div className="col-span-1">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400 text-lg">📷</span>
                    </div>
                  </div>

                  <div className="col-span-3">
                    <input
                      type="text"
                      placeholder={dt('itemName')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newRowData.name || ''}
                      onChange={(e) => setNewRowData(prev => ({ ...prev, name: e.target.value }))}
                      onKeyDown={(e) => e.key === 'Enter' && addNewTableRow()}
                      autoFocus
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="text"
                      placeholder={dt('category')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newRowData.category || ''}
                      onChange={(e) => setNewRowData(prev => ({ ...prev, category: e.target.value }))}
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newRowData.price || ''}
                      onChange={(e) => setNewRowData(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                    />
                  </div>
                  <div className="col-span-3">
                    <input
                      type="text"
                      placeholder={dt('description')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newRowData.description || ''}
                      onChange={(e) => setNewRowData(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <button
                      onClick={() => setNewRowData(prev => ({ ...prev, available: !(prev?.available !== false) }))}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        (newRowData.available !== false) 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {(newRowData.available !== false) ? dt('yes') : dt('no')}
                    </button>
                  </div>
                  <div className="col-span-1 flex justify-center gap-2">
                    <button
                      onClick={addNewTableRow}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title={dt('save')}
                    >
                      ✓
                    </button>
                    <button
                      onClick={() => setNewRowData(null)}
                      className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                      title={dt('cancel')}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}

              {/* Add New Row Button */}
              {!newRowData && (
                <div className="p-4 border-t border-gray-100">
                  <button
                    onClick={() => setNewRowData({ name: '', category: '', price: 0, description: '', available: true })}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    {dt('addNewItem')}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Item Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">
              {editingItem ? dt('editItem') : dt('addItem')}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{dt('itemName')}</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{dt('description')}</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{dt('price')}</label>
                <input
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{dt('category')}</label>
                <div className="space-y-2">
                  <select
                    value={formData.category_id || ''}
                    onChange={(e) => setFormData({...formData, category_id: e.target.value || null})}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl font-medium focus:outline-none focus:border-gray-400 hover:border-gray-300 transition-all cursor-pointer"
                  >
                    <option value="">{dt('selectCategory')}</option>
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
                    + {dt('createNewCategory')}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{dt('image')}</label>
                
                {/* Image Preview */}
                {(imagePreview || formData.image_url) && (
                  <div className="mb-3 relative">
                    <img
                      src={imagePreview || formData.image_url}
                      alt="Preview"
                      className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}

                {/* File Input */}
                <div className="space-y-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        handleImageSelect(file)
                      }
                    }}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex items-center justify-center w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[var(--color-accent)] transition-colors"
                  >
                    <div className="flex items-center gap-2 text-gray-600">
                      <Upload className="w-4 h-4" />
                      <span>{dt('chooseImage')}</span>
                    </div>
                  </label>

                  {/* Upload Progress */}
                  {uploadingImage && (
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[var(--color-accent)] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  )}

                  {/* Alternative URL Input */}
                  <div className="text-center text-sm text-gray-500">
                    {dt('or')}
                  </div>
                  <input
                    type="url"
                    placeholder={dt('imageUrl')}
                    value={formData.image_url}
                    onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  {dt('cancel')}
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[var(--color-accent)] text-white rounded-lg font-medium hover:bg-[var(--color-accent-hover)] transition-colors"
                >
                  {editingItem ? dt('save') : dt('add')}
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
            <h2 className="text-2xl font-bold mb-6">{dt('manageCategories')}</h2>
            
            {/* Create New Category Form */}
            <form onSubmit={handleCreateCategory} className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-3">{dt('createNewCategory')}</h3>
              <div className="space-y-3">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{dt('categoryName')}</label>
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder={dt('categoryPlaceholder')}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{dt('parentCategoryOptional')}</label>
                  <select
                    value={newParentCategoryId || ''}
                    onChange={(e) => setNewParentCategoryId(e.target.value || null)}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl font-medium focus:outline-none focus:border-gray-400 hover:border-gray-300 transition-all cursor-pointer"
                  >
                    <option value="">{dt('noParentMainCategory')}</option>
                    {parentCategories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
                >
                  {dt('addCategory')}
                </button>
              </div>
            </form>

            {/* Existing Categories List */}
            <div className="space-y-4">
              <h3 className="font-semibold">{dt('existingCategories')}</h3>
              {parentCategories.length === 0 ? (
                <p className="text-gray-500 text-center py-4">{dt('noCategoriesYet')}</p>
              ) : (
                <div className="space-y-3">
                  {parentCategories.map(parent => (
                    <div key={parent.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <FolderOpen className="w-5 h-5 text-gray-600" />
                        <span className="font-medium text-gray-900">{parent.name}</span>
                        <span className="text-xs text-gray-500">({menuItems.filter(i => i.category_id === parent.id || i.menu_category?.parent_id === parent.id).length} {dt('items')})</span>
                      </div>
                      {getSubcategories(parent.id).length > 0 && (
                        <div className="ml-7 mt-2 space-y-1">
                          {getSubcategories(parent.id).map(sub => (
                            <div key={sub.id} className="flex items-center gap-2 text-sm text-gray-700">
                              <Tag className="w-4 h-4 text-gray-400" />
                              <span>{sub.name}</span>
                              <span className="text-xs text-gray-500">({menuItems.filter(i => i.category_id === sub.id).length} {dt('items')})</span>
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
                {dt('close')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Import Modal */}
      {showBulkImport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-7xl w-full max-h-[95vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold">{dt('bulkAddMenuItems')}</h2>
                <p className="text-gray-600 mt-1">{dt('bulkAddDescription')}</p>
                {/* Debug info */}
                <p className="text-xs text-gray-500 mt-2">
                  {dt('categoriesLoaded')}: {parentCategories.length} {dt('parentCategories')}, {allCategories.length} {dt('totalCategories')}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowBulkImport(false)
                  setBulkItems([{ id: '1', name: '', price: '', description: '', parent_category_id: null, category_id: null, available: true }])
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mode Selector */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => setBulkImportMode('table')}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                  bulkImportMode === 'table' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                📝 {dt('tableEditor')}
              </button>
              <button
                onClick={() => setBulkImportMode('csv')}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                  bulkImportMode === 'csv' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                📊 {dt('csvImport')}
              </button>
            </div>

            {/* CSV Mode */}
            {bulkImportMode === 'csv' && (
              <div className="mb-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-blue-900 mb-2">📤 {dt('importFromFile')}</h3>
                    <p className="text-sm text-blue-800">
                      {dt('uploadFileDescription')}: <code className="bg-white px-2 py-1 rounded text-xs">name, price, description, parentCategoryId, categoryId, available</code>
                    </p>
                  </div>
                  <button
                    onClick={downloadTemplate}
                    className="flex items-center gap-2 px-4 py-2 bg-white text-blue-700 rounded-lg font-semibold text-sm hover:bg-blue-50 border-2 border-blue-300 transition-all shadow-sm hover:shadow-md"
                  >
                    <Upload className="w-4 h-4" />
                    {dt('downloadTemplate')}
                  </button>
                </div>
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleCSVUpload}
                  className="block w-full text-sm text-gray-700 file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-blue-500 file:text-white hover:file:bg-blue-600 file:cursor-pointer cursor-pointer file:shadow-md hover:file:shadow-lg file:transition-all"
                />
                <p className="text-xs text-blue-700 mt-2">✨ {dt('supportsFormats')}</p>
              </div>
            )}

            {/* Card-based Editor */}
            <div className="space-y-3 mb-8">
              {bulkItems.map((item, index) => (
                <div key={item.id} className="relative bg-white border-2 border-gray-200 rounded-xl p-3 hover:border-blue-400 hover:shadow-md transition-all duration-200">
                  {/* Item Number Badge */}
                  <div className="absolute -top-2 -left-2 bg-blue-500 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-md">
                    {index + 1}
                  </div>

                  <div className="flex gap-3 items-center">
                    {/* Image Section - Left Side */}
                    <div className="flex-shrink-0 relative group">
                      <div className="w-24 h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden hover:border-blue-400 transition-all cursor-pointer">
                        {bulkItemImages[item.id] ? (
                          <img
                            src={URL.createObjectURL(bulkItemImages[item.id]!)}
                            alt="preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center">
                            <Upload className="w-6 h-6 mx-auto text-gray-400 mb-1" />
                            <span className="text-xs text-gray-500 font-medium">{dt('clickToUpload')}</span>
                          </div>
                        )}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            setBulkItemImages(prev => ({ ...prev, [item.id]: file }))
                          }
                        }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        title="Click to upload image"
                      />
                      {bulkItemImages[item.id] && (
                        <div className="absolute -top-1 -right-1 bg-green-500 text-white w-5 h-5 rounded-full flex items-center justify-center">
                          <span className="text-xs">✓</span>
                        </div>
                      )}
                    </div>

                    {/* Form Fields - Horizontal Layout */}
                    <div className="flex-1 flex gap-2 items-start flex-wrap">
                      {/* Item Name */}
                      <div className="flex-1 min-w-[200px]">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => updateBulkRow(item.id, 'name', e.target.value)}
                          placeholder={`${dt('itemName')} *`}
                          className="w-full px-3 py-2 text-sm font-medium border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
                        />
                        {item.error && <p className="text-xs text-red-500 mt-1 ml-1">{item.error}</p>}
                      </div>

                      {/* Price */}
                      <div className="w-28">
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">Rp</span>
                          <input
                            type="number"
                            step="1000"
                            value={item.price}
                            onChange={(e) => updateBulkRow(item.id, 'price', e.target.value)}
                            placeholder="0"
                            className="w-full pl-8 pr-3 py-2 text-sm font-medium border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      {/* Parent Category */}
                      <div className="w-36">
                        <select
                          value={item.parent_category_id || ''}
                          onChange={(e) => updateBulkRow(item.id, 'parent_category_id', e.target.value || null)}
                          className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                          <option value="">{dt('mainCategory')}</option>
                          {parentCategories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                          ))}
                        </select>
                      </div>

                      {/* Sub Category */}
                      <div className="w-36">
                        <select
                          value={item.category_id || ''}
                          onChange={(e) => updateBulkRow(item.id, 'category_id', e.target.value || null)}
                          disabled={!item.parent_category_id}
                          className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white disabled:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-400"
                        >
                          <option value="">{dt('subCategory')}</option>
                          {allCategories
                            .filter(cat => cat.parent_id === item.parent_category_id)
                            .map(cat => (
                              <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                      </div>

                      {/* Description */}
                      <div className="flex-1 min-w-[200px]">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => updateBulkRow(item.id, 'description', e.target.value)}
                          placeholder={`${dt('description')} (${dt('optional')})`}
                          className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
                        />
                      </div>

                      {/* Available Toggle */}
                      <button
                        onClick={() => updateBulkRow(item.id, 'available', !item.available)}
                        className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 shadow-sm ${
                          item.available 
                            ? 'bg-green-500 text-white hover:bg-green-600 hover:shadow-md' 
                            : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
                        }`}
                        title={item.available ? dt('available') : dt('notAvailable')}
                      >
                        {item.available ? `✓ ${dt('available')}` : `✗ ${dt('hidden')}`}
                      </button>
                    </div>

                    {/* Remove Button */}
                    {bulkItems.length > 1 && (
                      <button
                        onClick={() => removeBulkRow(item.id)}
                        className="flex-shrink-0 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors group"
                        title="Remove item"
                      >
                        <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Add Row Button */}
            <button
              onClick={addBulkRow}
              className="w-full px-4 py-3 mb-8 border-2 border-dashed border-blue-300 text-blue-700 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              + {dt('addAnotherRow')}
            </button>

            {/* Item Count */}
            <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-700">
                {dt('totalItemsToAdd')}: <span className="font-bold text-blue-600 text-lg">{bulkItems.filter(i => i.name.trim()).length}</span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t">
              <button
                onClick={() => {
                  setShowBulkImport(false)
                  setBulkItems([{ id: '1', name: '', price: '', description: '', parent_category_id: null, category_id: null, available: true }])
                }}
                className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                {dt('cancel')}
              </button>
              <button
                onClick={validateAndSaveBulk}
                disabled={bulkSaving}
                className="flex-1 px-4 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 disabled:bg-gray-400 transition-colors"
              >
                {bulkSaving ? dt('saving') : `${dt('save')} ${bulkItems.filter(i => i.name.trim()).length} ${dt('items')}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
