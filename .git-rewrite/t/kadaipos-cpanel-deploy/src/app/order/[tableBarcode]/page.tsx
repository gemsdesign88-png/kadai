'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Minus, Plus, ShoppingCart, X } from 'lucide-react';
import CustomerInfoModal from '../components/CustomerInfoModal';

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
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
  primary_color: string | null;
}

export default function CustomerOrderPage() {
  const params = useParams();
  const router = useRouter();
  const tableBarcode = params.tableBarcode as string;

  const [table, setTable] = useState<Table | null>(null);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [sending, setSending] = useState(false);

  // Customer info
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [showCustomerInfo, setShowCustomerInfo] = useState(true);

  // Default color if none set
  const primaryColor = restaurant?.primary_color || '#EF4444';

  useEffect(() => {
    loadTableAndMenu();
  }, [tableBarcode]);

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

      // Load restaurant details
      const { data: restaurantData } = await supabase
        .from('restaurants')
        .select('id, name, logo_url, primary_color')
        .eq('id', tableData.restaurant_id)
        .single();
      
      if (restaurantData) {
        setRestaurant(restaurantData);
      }

      // Load menu for this restaurant
      const { data: menuData, error: menuError } = await supabase
        .from('menu_items')
        .select(`
          id,
          name,
          category,
          price,
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div 
            className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto"
            style={{ borderColor: primaryColor }}
          ></div>
          <p className="mt-4 text-gray-600">Memuat menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="px-4 py-4 flex flex-col items-center justify-center">
          {restaurant?.logo_url ? (
            <img 
              src={restaurant.logo_url} 
              alt={restaurant.name} 
              className="h-12 w-auto object-contain mb-2"
            />
          ) : (
            <h1 className="text-xl font-bold text-gray-900 mb-1">{restaurant?.name || 'Menu'}</h1>
          )}
          <p className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            Meja {table?.number}
          </p>
        </div>
      </div>

      {/* Customer Info Display */}
      {customerName && (
        <div className="bg-white m-4 rounded-xl p-4 border border-gray-200 shadow-sm">
          <p className="text-xs font-semibold text-gray-600 mb-1">Nama Pemesan</p>
          <p className="text-base font-semibold text-gray-900 mb-3">{customerName}</p>
          {customerPhone && (
            <>
              <p className="text-xs font-semibold text-gray-600 mb-1">Nomor Telepon</p>
              <p className="text-base font-semibold text-gray-900 mb-3">{customerPhone}</p>
            </>
          )}
          <button
            onClick={() => setShowCustomerInfo(true)}
            className="font-semibold text-sm"
            style={{ color: primaryColor }}
          >
            ✏️ Ubah
          </button>
        </div>
      )}

      {/* Category Filter */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-[89px] z-10 shadow-sm">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
          Kategori
        </p>
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 rounded-full text-sm font-bold whitespace-nowrap border-2 min-w-[100px] transition-colors`}
              style={{
                backgroundColor: selectedCategory === cat ? primaryColor : 'white',
                borderColor: selectedCategory === cat ? primaryColor : '#E5E7EB',
                color: selectedCategory === cat ? 'white' : '#4B5563'
              }}
            >
              {cat === 'All' ? 'Semua' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-3 py-2">
        {filteredMenu.map((item) => {
          const cartItem = orderItems.find((i) => i.id === item.id);
          const inCart = !!cartItem;

          return (
            <div
              key={item.id}
              className={`flex items-center bg-white mx-2 my-3 p-3.5 rounded-xl border shadow-sm ${
                inCart ? 'bg-gray-50 border-gray-300' : 'border-gray-200'
              }`}
            >
              <div className="flex-1">
                <h3 className="text-base font-bold text-gray-900">{item.name}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  {item.menu_category?.name || item.category}
                </p>
                <p className="text-base font-bold text-gray-900 mt-1">
                  Rp{item.price.toLocaleString('id-ID')}
                </p>
              </div>
              <button
                onClick={() => addItem(item)}
                className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center ml-3 shadow-sm active:scale-95 transition-transform"
              >
                <Plus className="w-5 h-5" style={{ color: primaryColor }} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Floating Cart Button */}
      {orderItems.length > 0 && (
        <button
          onClick={() => setShowOrderSummary(true)}
          className="fixed bottom-5 left-4 right-4 text-white py-4 rounded-2xl shadow-xl flex items-center justify-center active:scale-95 transition-transform z-40"
          style={{ backgroundColor: primaryColor }}
        >
          <div className="absolute left-4 w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-sm font-extrabold" style={{ color: primaryColor }}>
              {orderItems.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>
          <span className="text-base font-bold">
            Lihat Pesanan • Rp
            {orderItems
              .reduce((sum, item) => sum + item.price * item.quantity, 0)
              .toLocaleString('id-ID')}
          </span>
        </button>
      )}

      {/* Customer Info Modal */}
      <CustomerInfoModal
        isOpen={showCustomerInfo}
        onConfirm={(name, phone) => {
          setCustomerName(name);
          setCustomerPhone(phone);
          setShowCustomerInfo(false);
        }}
      />

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
