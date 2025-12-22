'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { LogOut, Building2, TrendingUp, ShoppingCart, Users, Package, Clock, ChevronRight, BarChart3, DollarSign, Calendar, Mail, Phone, AlertTriangle, CheckCircle, Bell, Home, UtensilsCrossed, Archive } from 'lucide-react';
import { useState, useEffect } from 'react';

interface DashboardClientProps {
  user: any;
  profile: any;
  restaurants: any[];
}

export default function DashboardClient({ user, profile, restaurants }: DashboardClientProps) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [activeRestaurant, setActiveRestaurant] = useState<any>(null);
  const [stats, setStats] = useState({
    todayRevenue: 0,
    todayOrders: 0,
    weekRevenue: 0,
    monthRevenue: 0,
    yearRevenue: 0,
    activeOrders: 0,
    lowStockItems: 0,
    outOfStockItems: 0
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [todos, setTodos] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    if (restaurants.length > 0) {
      // Check localStorage for selected restaurant
      const savedRestaurantId = localStorage.getItem('selected_restaurant_id');
      if (savedRestaurantId) {
        const saved = restaurants.find(r => r.id === savedRestaurantId);
        if (saved) {
          setActiveRestaurant(saved);
        } else {
          setActiveRestaurant(restaurants[0]);
          localStorage.setItem('selected_restaurant_id', restaurants[0].id);
        }
      } else {
        setActiveRestaurant(restaurants[0]);
        localStorage.setItem('selected_restaurant_id', restaurants[0].id);
      }
    }

    // Listen for restaurant changes from other pages
    const handleRestaurantChange = () => {
      const savedRestaurantId = localStorage.getItem('selected_restaurant_id');
      if (savedRestaurantId && restaurants.length > 0) {
        const saved = restaurants.find(r => r.id === savedRestaurantId);
        if (saved && saved.id !== activeRestaurant?.id) {
          setActiveRestaurant(saved);
        }
      }
    };

    window.addEventListener('restaurantChanged', handleRestaurantChange);
    window.addEventListener('storage', handleRestaurantChange);

    return () => {
      window.removeEventListener('restaurantChanged', handleRestaurantChange);
      window.removeEventListener('storage', handleRestaurantChange);
    };
  }, [restaurants]);

  useEffect(() => {
    if (activeRestaurant) {
      loadDashboardData();
    }
  }, [activeRestaurant]);

  async function loadDashboardData() {
    if (!activeRestaurant) return;
    
    setLoadingData(true);
    try {
      const now = new Date();
      const today = new Date(now);
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      // Week start (7 days ago)
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - 7);

      // Month start
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

      // Year start
      const yearStart = new Date(today.getFullYear(), 0, 1);

      // Get all paid orders for calculations (from start of year)
      const { data: allOrders } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .eq('restaurant_id', activeRestaurant.id)
        .eq('payment_status', 'paid')
        .gte('paid_at', yearStart.toISOString())
        .order('paid_at', { ascending: false });
      
      // Get total completed orders count (all time)
      const { count: totalCompletedOrders } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('restaurant_id', activeRestaurant.id)
        .eq('payment_status', 'paid');

      // Get active orders (not completed/cancelled)
      const { data: activeOrdersData } = await supabase
        .from('orders')
        .select('*')
        .eq('restaurant_id', activeRestaurant.id)
        .not('status', 'in', '(completed,cancelled)');

      // Get stock items
      const { data: stockItems } = await supabase
        .from('stock_items')
        .select('*, ingredient:ingredients(*)')
        .eq('restaurant_id', activeRestaurant.id);

      if (allOrders) {
        // Calculate revenue for different periods
        const todayOrders = allOrders.filter(o => {
          const paidAt = new Date(o.paid_at);
          return paidAt >= today && paidAt < tomorrow && o.status !== 'cancelled';
        });

        const weekOrders = allOrders.filter(o => {
          const paidAt = new Date(o.paid_at);
          return paidAt >= weekStart && o.status !== 'cancelled';
        });

        const monthOrders = allOrders.filter(o => {
          const paidAt = new Date(o.paid_at);
          return paidAt >= monthStart && o.status !== 'cancelled';
        });

        const yearOrders = allOrders.filter(o => {
          const paidAt = new Date(o.paid_at);
          return paidAt >= yearStart && o.status !== 'cancelled';
        });

        const todayRevenue = todayOrders.reduce((sum, o) => sum + (o.total || 0), 0);
        const weekRevenue = weekOrders.reduce((sum, o) => sum + (o.total || 0), 0);
        const monthRevenue = monthOrders.reduce((sum, o) => sum + (o.total || 0), 0);
        const yearRevenue = yearOrders.reduce((sum, o) => sum + (o.total || 0), 0);

        // Calculate stock metrics
        let lowStockCount = 0;
        let outOfStockCount = 0;

        if (stockItems) {
          stockItems.forEach(item => {
            if (item.quantity_on_hand === 0) {
              outOfStockCount++;
            } else if (item.ingredient && item.quantity_on_hand <= item.ingredient.reorder_level) {
              lowStockCount++;
            }
          });
        }
        
        setStats({
          todayRevenue,
          todayOrders: totalCompletedOrders || 0, // Show ALL completed orders
          weekRevenue,
          monthRevenue,
          yearRevenue,
          activeOrders: activeOrdersData?.length || 0,
          lowStockItems: lowStockCount,
          outOfStockItems: outOfStockCount
        });

        // Get recent orders from today
        setRecentOrders(todayOrders.slice(0, 5));

        // Generate alerts and todos based on data
        const newAlerts: any[] = [];
        const newTodos: any[] = [];

        // Stock alerts
        if (outOfStockCount > 0) {
          newAlerts.push({
            id: 'stock-out',
            type: 'error',
            message: `${outOfStockCount} item habis stok`,
            action: 'Cek Stok',
            link: '/dashboard/inventory'
          });
        }
        if (lowStockCount > 0) {
          newAlerts.push({
            id: 'stock-low',
            type: 'warning',
            message: `${lowStockCount} item stok menipis`,
            action: 'Cek Stok',
            link: '/dashboard/inventory'
          });
        }

        // Active orders alert
        if (activeOrdersData && activeOrdersData.length > 5) {
          newAlerts.push({
            id: 'orders-pending',
            type: 'info',
            message: `${activeOrdersData.length} pesanan sedang diproses`,
            action: 'Lihat Pesanan',
            link: '/dashboard/orders'
          });
        }

        // Generate todos
        if (stockItems) {
          stockItems.forEach(item => {
            if (item.quantity_on_hand === 0 && item.ingredient) {
              newTodos.push({
                id: `restock-${item.id}`,
                text: `Restock ${item.ingredient.name}`,
                priority: 'high',
                link: '/dashboard/inventory'
              });
            } else if (item.ingredient && item.quantity_on_hand <= item.ingredient.reorder_level) {
              newTodos.push({
                id: `order-${item.id}`,
                text: `Pesan ${item.ingredient.name} (stok: ${item.quantity_on_hand} ${item.ingredient.unit})`,
                priority: 'medium',
                link: '/dashboard/inventory'
              });
            }
          });
        }

        setAlerts(newAlerts);
        setTodos(newTodos.slice(0, 5)); // Limit to 5 todos
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoadingData(false);
    }
  }

  const handleSignOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'preparing': 'bg-blue-100 text-blue-800',
      'ready': 'bg-green-100 text-green-800',
      'completed': 'bg-gray-100 text-gray-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (restaurants.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FF5A5F]/5 via-white to-[#8B5CF6]/5 flex items-center justify-center">
        <div className="text-center max-w-md p-8">
          <Building2 className="w-20 h-20 text-gray-300 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Belum Ada Bisnis</h2>
          <p className="text-gray-600 mb-8">
            Tambahkan bisnis pertama Anda untuk mulai menggunakan KadaiPOS
          </p>
          <button 
            className="px-8 py-4 bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
            onClick={() => router.push('/dashboard/setup')}
          >
            Tambah Bisnis
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200">
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <img src="/logo-black.svg" alt="KadaiPOS" className="h-8" />
          </div>

          {/* Restaurant Selector */}
          {restaurants.length > 1 && (
            <div className="p-4 border-b border-gray-200">
              <select 
                value={activeRestaurant?.id || ''}
                onChange={(e) => {
                  const selected = restaurants.find(r => r.id === e.target.value);
                  setActiveRestaurant(selected);
                  localStorage.setItem('selected_restaurant_id', e.target.value);
                  window.dispatchEvent(new Event('restaurantChanged'));
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              >
                {restaurants.map(r => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-1">
              <button
                onClick={() => router.push('/dashboard')}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">Dashboard</span>
              </button>
              <button
                onClick={() => router.push('/dashboard/analytics')}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <BarChart3 className="w-5 h-5" />
                <span className="font-medium">Analitik</span>
              </button>
              <button
                onClick={() => router.push('/dashboard/orders')}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="font-medium">Pesanan</span>
              </button>
              <button
                onClick={() => router.push('/dashboard/menu')}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <UtensilsCrossed className="w-5 h-5" />
                <span className="font-medium">Menu</span>
              </button>
              <button
                onClick={() => router.push('/dashboard/staff')}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Users className="w-5 h-5" />
                <span className="font-medium">Staff</span>
              </button>
              <button
                onClick={() => router.push('/dashboard/inventory')}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Archive className="w-5 h-5" />
                <span className="font-medium">Stok</span>
              </button>
              <button
                onClick={() => router.push('/dashboard/tables')}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Building2 className="w-5 h-5" />
                <span className="font-medium">Meja</span>
              </button>
            </div>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-accent)] to-[#8B5CF6] rounded-full flex items-center justify-center text-white font-semibold">
                {(profile?.full_name || user.email).charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{profile?.full_name || user.email}</p>
                <p className="text-xs text-gray-500">Owner</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-[var(--color-accent)] hover:bg-gray-50 rounded-lg transition-all disabled:opacity-50"
            >
              <LogOut className="w-4 h-4" />
              Keluar
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {activeRestaurant?.name || 'Dashboard'}
                </h2>
                <p className="text-sm text-gray-600">
                  {new Date().toLocaleDateString('id-ID', { 
                    weekday: 'long', 
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="px-4 sm:px-6 lg:px-8 py-8">
          {loadingData ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-accent)]"></div>
            </div>
          ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-[var(--color-accent)]/10 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-[var(--color-accent)]" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {formatCurrency(stats.monthRevenue)}
                </h3>
                <p className="text-sm text-gray-600">
                  Pendapatan Bulan Ini
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-[#8B5CF6]/10 rounded-xl flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6 text-[#8B5CF6]" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {stats.todayOrders}
                </h3>
                <p className="text-sm text-gray-600">Pesanan Selesai</p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all relative">
                {stats.activeOrders > 0 && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{stats.activeOrders}</span>
                  </div>
                )}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {stats.activeOrders}
                </h3>
                <p className="text-sm text-gray-600">Pesanan Aktif</p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all relative">
                {(stats.lowStockItems + stats.outOfStockItems) > 0 && (
                  <div className="absolute -top-2 -right-2">
                    <div className="relative">
                      <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
                      <div className="relative w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">{stats.lowStockItems + stats.outOfStockItems}</span>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
                    <Package className="w-6 h-6 text-red-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  <span className="text-red-600">{stats.outOfStockItems}</span>
                  <span className="text-gray-400 mx-1">/</span>
                  <span className="text-orange-600">{stats.lowStockItems}</span>
                </h3>
                <p className="text-sm text-gray-600">Habis / Stok Rendah</p>
              </div>
            </div>

            {/* Alerts Section */}
            {alerts.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Bell className="w-5 h-5 text-[var(--color-accent)]" />
                  <h3 className="text-lg font-bold text-gray-900">Notifikasi</h3>
                </div>
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-4 rounded-lg border-l-4 ${
                        alert.type === 'error' ? 'bg-red-50 border-red-500' :
                        alert.type === 'warning' ? 'bg-yellow-50 border-yellow-500' :
                        'bg-blue-50 border-blue-500'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className={`w-5 h-5 ${
                            alert.type === 'error' ? 'text-red-600' :
                            alert.type === 'warning' ? 'text-yellow-600' :
                            'text-blue-600'
                          }`} />
                          <p className="font-medium text-gray-900">{alert.message}</p>
                        </div>
                        <button
                          onClick={() => router.push(alert.link)}
                          className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                        >
                          {alert.action}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* To-Do List */}
            {todos.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-[var(--color-accent)]" />
                  <h3 className="text-lg font-bold text-gray-900">Yang Harus Dilakukan</h3>
                </div>
                <div className="space-y-2">
                  {todos.map((todo) => (
                    <button
                      key={todo.id}
                      onClick={() => router.push(todo.link)}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          todo.priority === 'high' ? 'bg-red-500' :
                          todo.priority === 'medium' ? 'bg-yellow-500' :
                          'bg-blue-500'
                        }`} />
                        <span className="text-gray-900 font-medium">{todo.text}</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[var(--color-accent)] transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Transactions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Today's Summary */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Ringkasan Hari Ini</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-gray-700">Total Pendapatan</span>
                    </div>
                    <span className="text-lg font-bold text-green-600">{formatCurrency(stats.todayRevenue)}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <ShoppingCart className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">Total Pesanan</span>
                    </div>
                    <span className="text-lg font-bold text-blue-600">{stats.todayOrders}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-purple-600" />
                      <span className="text-sm font-medium text-gray-700">Pesanan Aktif</span>
                    </div>
                    <span className="text-lg font-bold text-purple-600">{stats.activeOrders}</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Statistik Cepat</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Pendapatan Minggu Ini</span>
                    <span className="text-lg font-bold text-gray-900">{formatCurrency(stats.weekRevenue)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Pendapatan Bulan Ini</span>
                    <span className="text-lg font-bold text-gray-900">{formatCurrency(stats.monthRevenue)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Pendapatan Tahun Ini</span>
                    <span className="text-lg font-bold text-gray-900">{formatCurrency(stats.yearRevenue)}</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <button
                      onClick={() => router.push('/dashboard/analytics')}
                      className="w-full px-4 py-2 bg-[var(--color-accent)] text-white rounded-lg font-medium hover:bg-[var(--color-accent-hover)] transition-colors"
                    >
                      Lihat Analitik Lengkap
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Transactions Table */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Transaksi Terbaru</h3>
                <button
                  onClick={() => router.push('/dashboard/orders')}
                  className="text-sm text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] font-medium"
                >
                  Lihat Semua
                </button>
              </div>

              {recentOrders.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Belum ada transaksi hari ini</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Meja</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Items</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Waktu</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer" onClick={() => router.push('/dashboard/orders')}>
                          <td className="py-3 px-4">
                            <span className="font-medium text-gray-900">Meja {order.table_id}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-sm text-gray-600">{order.order_items?.length || 0} item</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-sm text-gray-600">{formatTime(order.created_at)}</span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <span className="font-bold text-gray-900">{formatCurrency(order.total || 0)}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
          )}
        </main>
      </div>
    </div>
  );
}