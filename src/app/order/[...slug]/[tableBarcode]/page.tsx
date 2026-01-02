'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Minus, Plus, ShoppingCart, X, User } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import CustomerInfoModal from '../../components/CustomerInfoModal';

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image_url?: string;
  description?: string;
  menu_category?: {
    id: string;
    name: string;
    parent_id: string | null;
  };
}

interface OrderItem extends MenuItem {
  quantity: number;
  note?: string;
}

interface Table {
  id: string;
  number: number;
  restaurant_id: string;
}

interface Restaurant {
  id: string;
  name: string;
  logo_url: string | null;
  primary_color?: string | null;
}

export default function CustomerOrderPage() {
  const params = useParams();
  const router = useRouter();
  const tableBarcode = params.tableBarcode as string;
  const { setPrimaryColor } = useTheme();

  const [table, setTable] = useState<Table | null>(null);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [sending, setSending] = useState(false);

  // Customer info
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [showCustomerInfo, setShowCustomerInfo] = useState(true);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showWelcomeBack, setShowWelcomeBack] = useState(false);
  const [existingCustomer, setExistingCustomer] = useState<any>(null);
  const [customerOrders, setCustomerOrders] = useState<any[]>([]);

  // Use restaurant's primary color for customer ordering
  const primaryColor = restaurant?.primary_color || '#FF5A5F';

  // Update theme when restaurant color changes
  useEffect(() => {
    if (restaurant?.primary_color) {
      console.log('🎨 Setting theme color:', restaurant.primary_color);
      const color = restaurant.primary_color;
      
      // Update CSS variables directly (same as ThemeContext does)
      document.documentElement.style.setProperty('--color-accent', color);
      document.documentElement.style.setProperty('--color-primary', color);
      
      // Helper to adjust color brightness
      const adjustColorBrightness = (hex: string, percent: number): string => {
        hex = hex.replace('#', '');
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);
        r = Math.min(255, Math.max(0, r + (r * percent) / 100));
        g = Math.min(255, Math.max(0, g + (g * percent) / 100));
        b = Math.min(255, Math.max(0, b + (b * percent) / 100));
        const rr = Math.round(r).toString(16).padStart(2, '0');
        const gg = Math.round(g).toString(16).padStart(2, '0');
        const bb = Math.round(b).toString(16).padStart(2, '0');
        return `#${rr}${gg}${bb}`;
      };
      
      // Derived tones
      const hoverColor = adjustColorBrightness(color, -10);
      const lightColor = adjustColorBrightness(color, 40);
      const primaryLight = adjustColorBrightness(color, 12);
      const primaryLighter = adjustColorBrightness(color, 22);
      
      document.documentElement.style.setProperty('--color-accent-hover', hoverColor);
      document.documentElement.style.setProperty('--color-accent-light', lightColor);
      document.documentElement.style.setProperty('--color-primary-light', primaryLight);
      document.documentElement.style.setProperty('--color-primary-lighter', primaryLighter);
    }
  }, [restaurant?.primary_color]);

  // Resolve public logo URL even if we only stored a storage path
  const getLogoUrl = (logoPath?: string | null) => {
    if (!logoPath) return null;
    if (logoPath.startsWith('http')) return logoPath;
    const base = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    return `${base}/storage/v1/object/public/${logoPath.replace(/^\/+/, '')}`;
  };

  // Resolve menu item image URL
  const getMenuImageUrl = (imagePath?: string | null) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    const base = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    return `${base}/storage/v1/object/public/menu-items/${imagePath.replace(/^\/+/, '')}`;
  };

  const restaurantLogo = getLogoUrl(restaurant?.logo_url);

  useEffect(() => {
    loadTableAndMenu();
  }, [tableBarcode]);

  useEffect(() => {
    // If a customer was stored locally for this restaurant, auto-load and show welcome back
    if (typeof window === 'undefined') return;
    if (!restaurant) return;
    const saved = localStorage.getItem(`customer_info_${restaurant.id}`);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved);
      if (parsed.name) setCustomerName(parsed.name);
      if (parsed.phone) setCustomerPhone(parsed.phone);
      // Attempt to fetch existing customer and history silently
      fetchExistingCustomer(parsed.phone);
      setShowCustomerInfo(false);
    } catch (err) {
      console.warn('Failed to parse saved customer info', err);
    }
  }, [restaurant]);

  const loadTableAndMenu = async () => {
    try {
      setLoading(true);
      const supabase = createClient();

      if (!tableBarcode) {
        throw new Error('Invalid table barcode');
      }

      // Find table by barcode
      const { data: tableData, error: tableError } = await supabase
        .from('tables')
        .select('id, number, restaurant_id')
        .eq('barcode', tableBarcode)
        .single();

      if (tableError || !tableData) {
        throw new Error('Table not found');
      }

      setTable(tableData as Table);

      // Load restaurant details including owner info
      const { data: restaurantData } = await supabase
        .from('restaurants')
        .select('id, name, logo_url, primary_color, owner_id')
        .eq('id', tableData.restaurant_id)
        .single();

      if (restaurantData) {
        // Use the restaurant's primary_color
        const primaryColor = restaurantData.primary_color;
        
        console.log('✅ Restaurant loaded:', { id: restaurantData.id, primary_color: primaryColor });
        setRestaurant({
          ...restaurantData,
          primary_color: primaryColor || '#FF5A5F'
        });
      }      // Load menu for this restaurant
      const { data: menuData, error: menuError } = await supabase
        .from('menu_items')
        .select(`
          id,
          name,
          category,
          price,
          image_url,
          description,
          menu_categories(id, name, parent_id)
        `)
        .eq('restaurant_id', tableData.restaurant_id)
        .eq('available', true)
        .order('name');

      if (menuError) throw menuError;

      const sanitizedMenu: MenuItem[] = (menuData || []).map((item: any) => ({
        ...item,
        menu_category: item.menu_category || item.menu_categories || null,
      }));

      setMenu(sanitizedMenu);

      // Build categories
      const categorySet = new Set<string>();
      categorySet.add('All');
      sanitizedMenu.forEach((item: MenuItem) => {
        if (item.menu_category) {
          categorySet.add(item.menu_category.name);
        } else if (item.category) {
          categorySet.add(item.category);
        }
      });

      setCategories(Array.from(categorySet));
    } catch (err: any) {
      console.error('Error loading table/menu:', err);
      alert(err.message || 'Failed to load table');
    } finally {
      setLoading(false);
    }
  };

  const fetchExistingCustomer = async (phone: string | null) => {
    if (!phone || !table) return;
    const supabase = createClient();
    const { data: customer, error } = await supabase
      .from('customers')
      .select('id, name, phone')
      .eq('restaurant_id', table.restaurant_id)
      .eq('phone', phone)
      .single();

    if (customer && !error) {
      setExistingCustomer(customer);
      const { data: orders } = await supabase
        .from('orders')
        .select('id, order_number, total, created_at, status')
        .eq('customer_id', customer.id)
        .order('created_at', { ascending: false })
        .limit(5);
      setCustomerOrders(orders || []);
      setShowWelcomeBack(true);
    }
  };

  const filteredMenu =
    selectedCategory === 'All'
      ? menu
      : menu.filter((m) => {
          if (m.menu_category) {
            return m.menu_category.name === selectedCategory;
          }
          return m.category === selectedCategory;
        });

  const addItem = (menuItem: MenuItem) => {
    const existing = orderItems.find((item) => item.id === menuItem.id);
    if (existing) {
      setOrderItems(
        orderItems.map((item) =>
          item.id === menuItem.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setOrderItems([...orderItems, { ...menuItem, quantity: 1 }]);
    }
  };

  const removeItem = (id: string) => {
    setOrderItems(orderItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      removeItem(id);
    } else {
      setOrderItems(
        orderItems.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
      );
    }
  };

  const updateItemNote = (id: string, note: string) => {
    setOrderItems(
      orderItems.map((item) => (item.id === id ? { ...item, note } : item))
    );
  };

  const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmitOrder = async () => {
    if (!customerName.trim()) {
      alert('Masukkan nama Anda');
      return;
    }

    if (orderItems.length === 0) {
      alert('Pilih minimal satu item');
      return;
    }

    if (!table) {
      alert('Meja tidak ditemukan');
      return;
    }

    setSending(true);
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      const authHeader = session?.access_token 
        ? `Bearer ${session.access_token}`
        : `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/restaurant-api/orders`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: authHeader,
          },
          body: JSON.stringify({
            tableId: table.id,
            restaurantId: table.restaurant_id,
            customerName: customerName.trim(),
            customerPhone: customerPhone.trim() || null,
            items: orderItems.map((item) => ({
              menuId: item.id,
              name: item.name,
              quantity: item.quantity,
              price: item.price,
              category: item.category,
              note: item.note || '',
            })),
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to submit order');
      }

      // Reset form
      setOrderItems([]);
      setShowOrderSummary(false);

      alert('✅ Pesanan Diterima\n\nPesanan Anda sudah dikirim ke dapur. Terima kasih!');
      setCustomerName('');
      setCustomerPhone('');
    } catch (err: any) {
      console.error('Error submitting order:', err);
      alert(err.message || 'Gagal mengirim pesanan');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: `linear-gradient(to bottom right, ${primaryColor}15, ${primaryColor}25)` }}>
        <div className="text-center">
          <div className="relative mb-6">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center animate-pulse" style={{ backgroundColor: primaryColor }}>
              <span className="text-3xl">🍽️</span>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full animate-bounce" style={{ backgroundColor: primaryColor }}>
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                <span className="text-xs font-bold" style={{ color: primaryColor }}>...</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-gray-800">Memuat Menu</h2>
            <p className="text-gray-600">Sedang menyiapkan menu terbaik untuk Anda...</p>
          </div>
          <div className="mt-6 flex justify-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full animate-bounce" style={{ backgroundColor: `${primaryColor}80`, animationDelay: '0ms' }}></div>
              <div className="w-3 h-3 rounded-full animate-bounce" style={{ backgroundColor: primaryColor, animationDelay: '150ms' }}></div>
              <div className="w-3 h-3 rounded-full animate-bounce" style={{ backgroundColor: primaryColor, animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Enhanced Header */}
      <div className="text-white sticky top-0 z-20 shadow-lg" style={{ background: `linear-gradient(to right, ${primaryColor}, ${primaryColor}dd)` }}>
        <div className="px-4 py-5">
          <div className="flex items-center justify-between">
            {/* Restaurant Info */}
            <div className="flex items-center gap-4">
              {restaurant?.logo_url && (
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center overflow-hidden">
                  <img
                    src={restaurantLogo || restaurant.logo_url}
                    alt={restaurant.name}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                </div>
              )}
              <div>
                <h1 className="text-xl font-bold">{restaurant?.name || 'Restaurant'}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <p className="text-sm opacity-90">Meja {table?.number || tableBarcode}</p>
                </div>
              </div>
            </div>

            {/* Customer Avatar */}
            {customerName && (
              <button
                onClick={() => setShowCustomerModal(true)}
                className="flex items-center gap-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-2xl pl-2 pr-4 py-2 transition-all duration-200"
              >
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold" style={{ color: primaryColor }}>
                    {customerName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold">{customerName}</p>
                  {customerPhone && (
                    <p className="text-xs opacity-75">{customerPhone}</p>
                  )}
                </div>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Category Filter */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-[73px] z-10 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-6 rounded-full" style={{ backgroundColor: primaryColor }}></div>
          <p className="text-sm font-bold text-gray-700 uppercase tracking-wide">
            Kategori Menu
          </p>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-3 rounded-2xl text-sm font-semibold whitespace-nowrap border-2 min-w-[120px] transition-all duration-200`}
              style={{
                backgroundColor: selectedCategory === cat ? primaryColor : 'white',
                borderColor: selectedCategory === cat ? primaryColor : '#E5E7EB',
                color: selectedCategory === cat ? 'white' : '#4B5563',
                transform: selectedCategory === cat ? 'scale(1.05)' : 'scale(1)',
                boxShadow: selectedCategory === cat ? '0 4px 14px 0 rgba(0,0,0,0.1)' : 'none'
              }}
            >
              {cat === 'All' ? '🍽️ Semua' : `🍴 ${cat}`}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items - Modern Card Layout */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredMenu.map((item) => {
            const cartItem = orderItems.find((i) => i.id === item.id);
            const inCart = !!cartItem;

            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl shadow-sm border-2 overflow-hidden transition-all duration-300 hover:shadow-lg`}
                style={{
                  borderColor: inCart ? primaryColor : '#F3F4F6',
                  boxShadow: inCart ? `0 0 0 2px ${primaryColor}20` : 'none'
                }}
              >
                {/* Image Section */}
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
                  {item.image_url ? (
                    <img
                      src={getMenuImageUrl(item.image_url) || ''}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        (e.target as HTMLImageElement).src = `https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=${encodeURIComponent(item.name)}`;
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-2xl">🍽️</span>
                        </div>
                        <p className="text-xs text-gray-500 font-medium">No Image</p>
                      </div>
                    </div>
                  )}

                  {/* Quantity Badge */}
                  {inCart && cartItem && (
                    <div className="absolute top-3 right-3 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg" style={{ backgroundColor: primaryColor }}>
                      {cartItem.quantity}
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-4">
                  {/* Item Name and Category */}
                  <div className="mb-2">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{item.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.menu_category?.name || item.category}
                    </p>
                  </div>

                  {/* Description */}
                  {item.description && (
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {item.description}
                    </p>
                  )}

                  {/* Price and Quantity Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-xl font-bold text-gray-900">
                        Rp{item.price.toLocaleString('id-ID')}
                      </span>
                    </div>

                    {inCart && cartItem ? (
                      // Quantity Controls (like mobile app)
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, cartItem.quantity - 1)}
                          className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 shadow-sm"
                          style={{
                            backgroundColor: 'white',
                            border: '2px solid #E5E7EB',
                            color: primaryColor
                          }}
                        >
                          <Minus className="w-5 h-5" />
                        </button>
                        <span className="text-lg font-bold text-gray-900 min-w-[32px] text-center">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, cartItem.quantity + 1)}
                          className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 shadow-sm"
                          style={{
                            backgroundColor: primaryColor,
                            color: 'white'
                          }}
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      // Add Button
                      <button
                        onClick={() => addItem(item)}
                        className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 shadow-sm"
                        style={{
                          backgroundColor: 'white',
                          border: '2px solid #E5E7EB',
                          color: '#374151'
                        }}
                      >
                        <Plus className="w-6 h-6" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredMenu.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-4xl">🍽️</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Menu Tidak Tersedia</h3>
            <p className="text-gray-500">Tidak ada item menu dalam kategori ini</p>
          </div>
        )}
      </div>

      {/* Enhanced Floating Cart Button */}
      {orderItems.length > 0 && (
        <div className="fixed bottom-6 left-4 right-4 z-40">
          <button
            onClick={() => setShowOrderSummary(true)}
            className="w-full text-white py-4 px-6 rounded-2xl shadow-2xl flex items-center justify-between active:scale-95 transition-all duration-200"
            style={{ background: `linear-gradient(to right, ${primaryColor}, ${primaryColor}dd)` }}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <ShoppingCart className="w-6 h-6" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-bold" style={{ color: primaryColor }}>
                  {orderItems.reduce((sum, item) => sum + item.quantity, 0)}
                </div>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium opacity-90">Lihat Pesanan</p>
                <p className="text-lg font-bold">
                  Rp{orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString('id-ID')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                {orderItems.length} item{orderItems.length > 1 ? 's' : ''}
              </span>
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-lg">→</span>
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Customer Info Modal - Initial */}
      <CustomerInfoModal
        isOpen={showCustomerInfo}
        onConfirm={async (name, phone) => {
          setCustomerName(name);
          setCustomerPhone(phone);
          if (typeof window !== 'undefined' && restaurant) {
            localStorage.setItem(
              `customer_info_${restaurant.id}`,
              JSON.stringify({ name, phone })
            );
          }
          
          // Check if customer exists
          if (phone && table) {
            await fetchExistingCustomer(phone);
            setShowCustomerInfo(false);
          } else {
            setShowCustomerInfo(false);
          }
        }}
      />

      {/* Welcome Back Modal */}
      {showWelcomeBack && existingCustomer && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowWelcomeBack(false)}
        >
          <div 
            className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Selamat Datang Kembali! 👋</h2>
              <button onClick={() => setShowWelcomeBack(false)}>
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Customer Avatar */}
            <div className="flex justify-center mb-6">
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                style={{ backgroundColor: primaryColor }}
              >
                {existingCustomer.name.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* Customer Name */}
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">{existingCustomer.name}</h3>
              <p className="text-sm text-gray-600">{existingCustomer.phone}</p>
            </div>

            {/* Order History */}
            <div className="mb-6">
              <h4 className="text-sm font-bold text-gray-600 uppercase mb-3">Riwayat Pesanan (5 Terakhir)</h4>
              
              {customerOrders.length > 0 ? (
                <div className="space-y-2">
                  {customerOrders.map((order) => (
                    <div key={order.id} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-900">Order #{order.order_number}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(order.created_at).toLocaleDateString('id-ID', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-gray-900">
                            Rp{order.total.toLocaleString('id-ID')}
                          </p>
                          <p className={`text-xs font-semibold mt-1 ${
                            order.status === 'completed' ? 'text-green-600' : 'text-orange-600'
                          }`}>
                            {order.status === 'completed' ? 'Selesai' : 'Proses'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">Belum ada riwayat pesanan</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => {
                  setShowWelcomeBack(false);
                  setShowCustomerModal(true);
                }}
                className="w-full px-4 py-3 border-2 rounded-lg font-semibold"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                Ubah Profil
              </button>
              <button
                onClick={() => setShowWelcomeBack(false)}
                className="w-full text-white py-3 rounded-lg font-semibold"
                style={{ backgroundColor: primaryColor }}
              >
                Lanjutkan Pesan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Customer Profile Edit Modal */}
      {showCustomerModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowCustomerModal(false)}
        >
          <div 
            className="bg-white rounded-2xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Profil Anda</h2>
              <button onClick={() => setShowCustomerModal(false)}>
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="flex justify-center mb-6">
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: primaryColor }}
              >
                <User className="w-10 h-10" />
              </div>
            </div>

            <label className="block text-xs font-semibold text-gray-600 mb-2">
              Nama *
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl mb-4"
              placeholder="Masukkan nama"
            />

            <label className="block text-xs font-semibold text-gray-600 mb-2">
              Nomor Telepon (Opsional)
            </label>
            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl mb-6"
              placeholder="Masukkan nomor telepon"
            />

            <button
              onClick={() => setShowCustomerModal(false)}
              className="w-full text-white py-3.5 rounded-xl font-bold"
              style={{ backgroundColor: primaryColor }}
            >
              Simpan
            </button>
          </div>
        </div>
      )}

      {/* Order Summary Modal */}
      {showOrderSummary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50">
          <div
            className="absolute inset-0"
            onClick={() => setShowOrderSummary(false)}
          ></div>
          <div className="bg-white rounded-t-[40px] w-full max-h-[90vh] flex flex-col relative">
            <div className="w-8 h-1 bg-gray-300 rounded-full mx-auto mt-2 mb-2"></div>

            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-2xl font-extrabold text-gray-900">Pesanan</h2>
              <button onClick={() => setShowOrderSummary(false)}>
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {orderItems.map((item) => (
                <div key={item.id} className="mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-base font-normal text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        Rp{item.price.toLocaleString('id-ID')}
                      </p>
                    </div>
                    <p className="text-base font-semibold text-gray-900">
                      Rp{(item.price * item.quantity).toLocaleString('id-ID')}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-10 h-10 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center"
                    >
                      <Minus className="w-4 h-4" style={{ color: primaryColor }} />
                    </button>
                    <span className="text-base text-gray-900 min-w-[32px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-10 h-10 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center"
                    >
                      <Plus className="w-4 h-4" style={{ color: primaryColor }} />
                    </button>
                  </div>

                  <textarea
                    className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-sm resize-none focus:ring-2 focus:outline-none"
                    style={{ '--tw-ring-color': primaryColor } as any}
                    placeholder="Tambahkan catatan (contoh: tanpa gula)..."
                    value={item.note || ''}
                    onChange={(e) => updateItemNote(item.id, e.target.value)}
                    rows={2}
                  />
                </div>
              ))}
            </div>

            <div className="px-6 pt-5 pb-6 border-t border-gray-200 bg-white">
              <div className="flex justify-between items-center mb-4">
                <span className="text-base font-semibold text-gray-900">Total</span>
                <span className="text-lg font-semibold text-gray-900">
                  Rp{total.toLocaleString('id-ID')}
                </span>
              </div>

              <button
                onClick={handleSubmitOrder}
                disabled={sending}
                className={`w-full text-white py-4 rounded-full font-semibold ${
                  sending ? 'opacity-50' : ''
                }`}
                style={{ backgroundColor: primaryColor }}
              >
                {sending ? 'Mengirim...' : 'Konfirmasi Pesanan'}
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
