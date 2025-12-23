'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { DollarSign, ShoppingCart, Clock, Package, ChevronRight, Bell, AlertTriangle, CheckCircle, TrendingUp, Users, UtensilsCrossed, Building2, Archive, BarChart3, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n/context';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Bar, Legend } from 'recharts';
import { createDashboardTranslator } from '@/lib/i18n/dashboard-translator';

interface DashboardClientProps {
  restaurants: any[];
}

interface TopItem {
  name: string;
  revenue: number;
  count: number;
}

interface StaffPerformance {
  name: string;
  orders: number;
  revenue: number;
  rating: number;
}

export default function DashboardClient({ restaurants }: DashboardClientProps) {
  const router = useRouter();
  const supabase = createClient();
  const { language, t } = useLanguage();
  const { t: dt, locale } = createDashboardTranslator(language);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dayLabel = (dayIndex: number) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return dt.dayLabel(days[dayIndex]);
  };

  const formatText = (key: string, replacements?: Record<string, string | number>) => {
    let text = dt(key);
    if (replacements) {
      Object.entries(replacements).forEach(([token, value]) => {
        text = text.replace(`{${token}}`, String(value));
      });
    }
    return text;
  };

  const [loading, setLoading] = useState(false);
  const [activeRestaurant, setActiveRestaurant] = useState<any>(null);
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('daily');

  if (!mounted) return null;

  const [stats, setStats] = useState({
    todayRevenue: 0,
    todayOrders: 0,
    weekRevenue: 0,
    weekOrders: 0,
    monthRevenue: 0,
    yearRevenue: 0,
    activeOrders: 0,
    lowStockItems: 0,
    outOfStockItems: 0,
    avgOrderValue: 0,
    totalCustomers: 0,
    growthPercent: 0
  });
  const [topMenuItems, setTopMenuItems] = useState<TopItem[]>([]);
  const [topTables, setTopTables] = useState<any[]>([]);
  const [topStaff, setTopStaff] = useState<StaffPerformance[]>([]);
  const [insights, setInsights] = useState<any[]>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [todos, setTodos] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [revenueTrendData, setRevenueTrendData] = useState<any[]>([]);
  const [customerRevenueData, setCustomerRevenueData] = useState<any[]>([]);
  const [revenueTrendPeriod, setRevenueTrendPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [ordersAOVPeriod, setOrdersAOVPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [allOrdersCache, setAllOrdersCache] = useState<any[]>([]);

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

  // Recalculate chart data when period changes (without reloading from database)
  useEffect(() => {
    if (allOrdersCache.length > 0) {
      recalculateChartData();
    }
  }, [revenueTrendPeriod, ordersAOVPeriod, language]);

  function recalculateChartData(ordersData?: any[]) {
    const orders = ordersData || allOrdersCache;
    if (!orders.length) return;
    
    const now = new Date();
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);

    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - 7);

    const weekOrders = orders.filter(o => {
      const paidAt = new Date(o.paid_at);
      return paidAt >= weekStart && o.status !== 'cancelled';
    });

    // Recalculate revenue trend based on selected period
    let revenueTrend: any[] = [];
    
    if (revenueTrendPeriod === 'daily') {
      const last30DaysData: { [key: string]: number } = {};
      for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateKey = date.toLocaleDateString(locale, { month: 'short', day: 'numeric' });
        const nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() + 1);
        
        const dayOrders = orders.filter(o => {
          const paidAt = new Date(o.paid_at);
          return paidAt >= date && paidAt < nextDate && o.status !== 'cancelled';
        });
        
        const dayRevenue = dayOrders.reduce((sum, o) => sum + (o.total || 0), 0);
        last30DaysData[dateKey] = dayRevenue;
      }
      revenueTrend = Object.entries(last30DaysData).map(([date, revenue]) => ({ date, revenue: Math.round(revenue) }));
    } else if (revenueTrendPeriod === 'weekly') {
      for (let i = 11; i >= 0; i--) {
        const weekEnd = new Date(today);
        weekEnd.setDate(today.getDate() - (i * 7));
        const weekStartCalc = new Date(weekEnd);
        weekStartCalc.setDate(weekEnd.getDate() - 7);
        
        const weekOrdersCalc = orders.filter(o => {
          const paidAt = new Date(o.paid_at);
          return paidAt >= weekStartCalc && paidAt < weekEnd && o.status !== 'cancelled';
        });
        
        const weekRevenue = weekOrdersCalc.reduce((sum, o) => sum + (o.total || 0), 0);
        const label = `${weekStartCalc.toLocaleDateString(locale, { month: 'short', day: 'numeric' })}`;
        revenueTrend.push({ date: label, revenue: Math.round(weekRevenue) });
      }
    } else {
      for (let i = 11; i >= 0; i--) {
        const monthDate = new Date(today);
        monthDate.setMonth(today.getMonth() - i);
        monthDate.setDate(1);
        const nextMonth = new Date(monthDate);
        nextMonth.setMonth(monthDate.getMonth() + 1);
        
        const monthOrders = orders.filter(o => {
          const paidAt = new Date(o.paid_at);
          return paidAt >= monthDate && paidAt < nextMonth && o.status !== 'cancelled';
        });
        
        const monthRevenue = monthOrders.reduce((sum, o) => sum + (o.total || 0), 0);
        const label = monthDate.toLocaleDateString(locale, { month: 'short', year: 'numeric' });
        revenueTrend.push({ date: label, revenue: Math.round(monthRevenue) });
      }
    }

    setRevenueTrendData(revenueTrend);

    // Recalculate Orders vs AOV based on selected period
    let customerRevenueChartData: any[] = [];
    
    if (ordersAOVPeriod === 'daily') {
      const dayOfWeekData: { [key: string]: { orders: number; revenue: number } } = {
        '0': { orders: 0, revenue: 0 },
        '1': { orders: 0, revenue: 0 },
        '2': { orders: 0, revenue: 0 },
        '3': { orders: 0, revenue: 0 },
        '4': { orders: 0, revenue: 0 },
        '5': { orders: 0, revenue: 0 },
        '6': { orders: 0, revenue: 0 }
      };
      
      weekOrders.forEach(order => {
        const orderDate = new Date(order.paid_at);
        const dayIndex = orderDate.getDay().toString();
        dayOfWeekData[dayIndex].orders += 1;
        dayOfWeekData[dayIndex].revenue += order.total || 0;
      });

      customerRevenueChartData = Object.entries(dayOfWeekData).map(([dayIndex, data]) => {
        return {
          day: dayLabel(parseInt(dayIndex)),
          orders: data.orders,
          avgOrderValue: data.orders > 0 ? Math.round(data.revenue / data.orders) : 0
        };
      });
    } else if (ordersAOVPeriod === 'weekly') {
      for (let i = 7; i >= 0; i--) {
        const weekEnd = new Date(today);
        weekEnd.setDate(today.getDate() - (i * 7));
        const weekStartCalc = new Date(weekEnd);
        weekStartCalc.setDate(weekEnd.getDate() - 7);
        
        const weekOrdersCalc = orders.filter(o => {
          const paidAt = new Date(o.paid_at);
          return paidAt >= weekStartCalc && paidAt < weekEnd && o.status !== 'cancelled';
        });
        
        const weekRevenue = weekOrdersCalc.reduce((sum, o) => sum + (o.total || 0), 0);
        const label = `${dt('weekShort')}${8-i}`;
        customerRevenueChartData.push({
          day: label,
          orders: weekOrdersCalc.length,
          avgOrderValue: weekOrdersCalc.length > 0 ? Math.round(weekRevenue / weekOrdersCalc.length) : 0
        });
      }
    } else {
      for (let i = 11; i >= 0; i--) {
        const monthDate = new Date(today);
        monthDate.setMonth(today.getMonth() - i);
        monthDate.setDate(1);
        const nextMonth = new Date(monthDate);
        nextMonth.setMonth(monthDate.getMonth() + 1);
        
        const monthOrders = orders.filter(o => {
          const paidAt = new Date(o.paid_at);
          return paidAt >= monthDate && paidAt < nextMonth && o.status !== 'cancelled';
        });
        
        const monthRevenue = monthOrders.reduce((sum, o) => sum + (o.total || 0), 0);
        const label = monthDate.toLocaleDateString(locale, { month: 'short' });
        customerRevenueChartData.push({
          day: label,
          orders: monthOrders.length,
          avgOrderValue: monthOrders.length > 0 ? Math.round(monthRevenue / monthOrders.length) : 0
        });
      }
    }

    setCustomerRevenueData(customerRevenueChartData);
  }

  async function loadDashboardData() {
    if (!activeRestaurant) return;
    
    setLoadingData(true);
    try {
      const now = new Date();
      const today = new Date(now);
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      // Period calculations
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - 7);
      
      const previousWeekStart = new Date(weekStart);
      previousWeekStart.setDate(previousWeekStart.getDate() - 7);

      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      const yearStart = new Date(today.getFullYear(), 0, 1);

      // Get all paid orders for calculations
      const { data: allOrders } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .eq('restaurant_id', activeRestaurant.id)
        .eq('payment_status', 'paid')
        .gte('paid_at', yearStart.toISOString())
        .order('paid_at', { ascending: false });
      
      // Get active orders
      const { data: activeOrdersData } = await supabase
        .from('orders')
        .select('*')
        .eq('restaurant_id', activeRestaurant.id)
        .not('status', 'in', '(completed,cancelled)');

      // Get menu items for top performers
      const { data: menuItems } = await supabase
        .from('menu_items')
        .select('*')
        .eq('restaurant_id', activeRestaurant.id);

      // Get staff for performance ranking
      const { data: staff } = await supabase
        .from('staff')
        .select('*')
        .eq('restaurant_id', activeRestaurant.id);

      // Get tables
      const { data: tables } = await supabase
        .from('tables')
        .select('*')
        .eq('restaurant_id', activeRestaurant.id);

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

        const previousWeekOrders = allOrders.filter(o => {
          const paidAt = new Date(o.paid_at);
          return paidAt >= previousWeekStart && paidAt < weekStart && o.status !== 'cancelled';
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
        const previousWeekRevenue = previousWeekOrders.reduce((sum, o) => sum + (o.total || 0), 0);
        const monthRevenue = monthOrders.reduce((sum, o) => sum + (o.total || 0), 0);
        const yearRevenue = yearOrders.reduce((sum, o) => sum + (o.total || 0), 0);

        // Calculate growth
        const weekGrowth = previousWeekRevenue > 0 ? ((weekRevenue - previousWeekRevenue) / previousWeekRevenue) * 100 : 0;

        // Calculate average order value
        const avgOrderValue = weekOrders.length > 0 ? weekRevenue / weekOrders.length : 0;

        // Count unique customers (from order_items or orders)
        const uniqueCustomers = new Set(weekOrders.map(o => o.id)).size;

        // Calculate top menu items
        const itemRevenue: { [key: string]: TopItem } = {};
        weekOrders.forEach(order => {
          order.order_items?.forEach((item: any) => {
            const itemName = item.item_name || item.name;
            if (!itemRevenue[itemName]) {
              itemRevenue[itemName] = { name: itemName, revenue: 0, count: 0 };
            }
            itemRevenue[itemName].revenue += item.subtotal || 0;
            itemRevenue[itemName].count += item.quantity || 1;
          });
        });

        const topItems = Object.values(itemRevenue)
          .sort((a, b) => b.revenue - a.revenue)
          .slice(0, 5);

        // Calculate top tables
        const tableRevenue: { [key: number]: any } = {};
        weekOrders.forEach(order => {
          if (order.table_number) {
            if (!tableRevenue[order.table_number]) {
              tableRevenue[order.table_number] = { tableNumber: order.table_number, orders: 0, revenue: 0, avgOrder: 0 };
            }
            tableRevenue[order.table_number].orders += 1;
            tableRevenue[order.table_number].revenue += order.total || 0;
          }
        });

        const topTablesList = Object.values(tableRevenue)
          .map((t: any) => ({
            ...t,
            avgOrder: t.revenue / t.orders
          }))
          .sort((a, b) => b.revenue - a.revenue)
          .slice(0, 5);

        // Calculate top staff
        const staffPerformance: { [key: string]: StaffPerformance } = {};
        weekOrders.forEach(order => {
          if (order.staff_id && staff) {
            const staffMember = staff.find(s => s.id === order.staff_id);
            const staffName = staffMember?.name || 'Unknown';
            if (!staffPerformance[order.staff_id]) {
              staffPerformance[order.staff_id] = { name: staffName, orders: 0, revenue: 0, rating: 0 };
            }
            staffPerformance[order.staff_id].orders += 1;
            staffPerformance[order.staff_id].revenue += order.total || 0;
          }
        });

        const topStaffList = Object.values(staffPerformance)
          .sort((a, b) => b.revenue - a.revenue)
          .slice(0, 5);

        // Cache orders for chart recalculation
        setAllOrdersCache(allOrders);
        
        // Initial chart data calculation
        recalculateChartData(allOrders);

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

        // Generate insights based on data
        const newInsights: any[] = [];

        if (weekGrowth > 0) {
          newInsights.push({
            id: 'growth',
            type: 'positive',
            icon: TrendingUp,
            title: dt('growthHeadline'),
            message: formatText('growthInsightMsg', { percent: weekGrowth.toFixed(1) }),
            color: 'green',
            link: '/dashboard/analytics'
          });
        }

        if (topItems.length > 0) {
          newInsights.push({
            id: 'top-item',
            type: 'info',
            icon: UtensilsCrossed,
            title: dt('topSellerHeadline'),
            message: formatText('topSellerInsightMsg', { name: topItems[0].name, count: topItems[0].count }),
            color: 'blue',
            link: '/dashboard/menu'
          });
        }

        if (topTablesList.length > 0) {
          newInsights.push({
            id: 'top-table',
            type: 'info',
            icon: Building2,
            title: dt('topTableHeadline'),
            message: formatText('topTableInsightMsg', { name: topTablesList[0].tableNumber }),
            color: 'purple',
            link: '/dashboard/tables'
          });
        }

        if (topStaffList.length > 0) {
          newInsights.push({
            id: 'top-staff',
            type: 'info',
            icon: Users,
            title: dt('topStaffHeadline'),
            message: formatText('topStaffInsightMsg2', { name: topStaffList[0].name, revenue: formatCurrency(topStaffList[0].revenue) }),
            color: 'indigo',
            link: '/dashboard/staff'
          });
        }

        // Stock insight
        if (outOfStockCount > 0 || lowStockCount > 0) {
          newInsights.push({
            id: 'stock-alert',
            type: 'warning',
            icon: Package,
            title: dt('stockAlert'),
            message: formatText('stockAlertMsg', { out: outOfStockCount, low: lowStockCount }),
            color: 'orange',
            link: '/dashboard/inventory'
          });
        }

        // Repeat customer insight
        if (uniqueCustomers > 0) {
          newInsights.push({
            id: 'customer-activity',
            type: 'info',
            icon: Users,
            title: dt('customerActivity'),
            message: formatText('customerActivityMsg2', { count: uniqueCustomers }),
            color: 'pink',
            link: '/dashboard/customers'
          });
        }

        setStats({
          todayRevenue,
          todayOrders: todayOrders.length,
          weekRevenue,
          weekOrders: weekOrders.length,
          monthRevenue,
          yearRevenue,
          activeOrders: activeOrdersData?.length || 0,
          lowStockItems: lowStockCount,
          outOfStockItems: outOfStockCount,
          avgOrderValue: Math.round(avgOrderValue),
          totalCustomers: uniqueCustomers,
          growthPercent: Math.round(weekGrowth * 10) / 10
        });

        setTopMenuItems(topItems);
        setTopTables(topTablesList);
        setTopStaff(topStaffList);
        setInsights(newInsights);
        setRecentOrders(todayOrders.slice(0, 5));

        // Generate alerts
        const newAlerts: any[] = [];

        if (outOfStockCount > 0) {
          newAlerts.push({
            id: 'stock-out',
            type: 'error',
            message: formatText('outOfStockMsg', { count: outOfStockCount }),
            action: dt('checkInventory'),
            link: '/dashboard/inventory'
          });
        }
        if (lowStockCount > 0) {
          newAlerts.push({
            id: 'stock-low',
            type: 'warning',
            message: formatText('lowStockMsg', { count: lowStockCount }),
            action: dt('checkInventory'),
            link: '/dashboard/inventory'
          });
        }

        if (activeOrdersData && activeOrdersData.length > 5) {
          newAlerts.push({
            id: 'orders-pending',
            type: 'info',
            message: formatText('ordersInProgressMsg', { count: activeOrdersData.length }),
            action: dt('viewOrders'),
            link: '/dashboard/orders'
          });
        }

        setAlerts(newAlerts);

        // Generate todos
        const newTodos: any[] = [];

        if (stockItems) {
          stockItems.forEach(item => {
            if (item.quantity_on_hand === 0 && item.ingredient) {
              newTodos.push({
                id: `restock-${item.id}`,
                text: formatText('restockMsg', { name: item.ingredient.name }),
                priority: 'high',
                link: '/dashboard/inventory'
              });
            } else if (item.ingredient && item.quantity_on_hand <= item.ingredient.reorder_level) {
              newTodos.push({
                id: `order-${item.id}`,
                text: formatText('orderMsg', { name: item.ingredient.name, stock: item.quantity_on_hand, unit: item.ingredient.unit }),
                priority: 'medium',
                link: '/dashboard/inventory'
              });
            }
          });
        }

        setTodos(newTodos.slice(0, 5));
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
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: locale === 'id-ID' ? 'IDR' : 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString(locale, {
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
          <Package className="w-20 h-20 text-gray-300 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{dt('noBusiness')}</h2>
          <p className="text-gray-600 mb-8">
            {dt('addFirstBusiness')}
          </p>
          <button 
            className="px-8 py-4 bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
            onClick={() => router.push('/dashboard/setup')}
          >
            {dt('addBusiness')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                {dt('welcomeBack')}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600">
                {new Date().toLocaleDateString(locale, { 
                  weekday: 'long', 
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-xs sm:text-sm font-semibold text-gray-600 truncate max-w-[200px] sm:max-w-none">{activeRestaurant?.name}</p>
              <p className="text-xs text-gray-500">{dt('currentRestaurant')}</p>
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
            {/* KPI Cards - Week Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              {/* Revenue Card */}
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-hover)] rounded-xl flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  {stats.growthPercent > 0 && <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full font-semibold">+{stats.growthPercent}%</span>}
                </div>
                <p className="text-xs text-gray-600 mb-1">{dt('thisWeek')}</p>
                <h3 className="text-lg font-bold text-gray-900 leading-tight">{formatCurrency(stats.weekRevenue)}</h3>
              </div>

              {/* Orders */}
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 text-white" />
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-1">{dt('totalOrders')}</p>
                <h3 className="text-lg font-bold text-gray-900 leading-tight">{stats.weekOrders}</h3>
              </div>

              {/* Avg Order Value */}
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-1">{dt('avgOrder')}</p>
                <h3 className="text-lg font-bold text-gray-900 leading-tight">{formatCurrency(stats.avgOrderValue)}</h3>
              </div>

              {/* Customers */}
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-1">{dt('customers')}</p>
                <h3 className="text-lg font-bold text-gray-900 leading-tight">{stats.totalCustomers}</h3>
              </div>

              {/* Active Orders */}
              <div className={`rounded-xl p-4 border shadow-sm hover:shadow-md transition-all ${
                stats.activeOrders > 0 
                  ? 'bg-yellow-50 border-yellow-100' 
                  : 'bg-white border-gray-100'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    stats.activeOrders > 0 
                      ? 'bg-gradient-to-br from-yellow-500 to-yellow-600' 
                      : 'bg-gradient-to-br from-gray-400 to-gray-500'
                  }`}>
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  {stats.activeOrders > 0 && <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-semibold">{dt('active')}</span>}
                </div>
                <p className="text-xs text-gray-600 mb-1">{dt('inProgress')}</p>
                <h3 className={`text-lg font-bold leading-tight ${stats.activeOrders > 0 ? 'text-gray-900' : 'text-gray-900'}`}>{stats.activeOrders}</h3>
              </div>
            </div>

            {/* Charts Grid - Revenue Trend and Customer vs Revenue */}
            {(revenueTrendData.length > 0 || customerRevenueData.length > 0) && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Revenue Trend Chart - Left */}
                {revenueTrendData.length > 0 && (
                  <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-[var(--color-accent)]" />
                        <h3 className="text-base sm:text-lg font-bold text-gray-900">
                          {dt('revenueTrend')}
                          {revenueTrendPeriod === 'daily' && ` (${dt('days30')})`}
                          {revenueTrendPeriod === 'weekly' && ` (${dt('weeks12')})`}
                          {revenueTrendPeriod === 'monthly' && ` (${dt('months12')})`}
                        </h3>
                      </div>
                      <div className="flex gap-1 overflow-x-auto pb-1">
                        <button
                          onClick={() => setRevenueTrendPeriod('daily')}
                          className={`px-2 sm:px-3 py-1 text-xs rounded-lg transition-colors whitespace-nowrap ${
                            revenueTrendPeriod === 'daily'
                              ? 'bg-[var(--color-accent)] text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {dt('daily')}
                        </button>
                        <button
                          onClick={() => setRevenueTrendPeriod('weekly')}
                          className={`px-2 sm:px-3 py-1 text-xs rounded-lg transition-colors whitespace-nowrap ${
                            revenueTrendPeriod === 'weekly'
                              ? 'bg-[var(--color-accent)] text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {dt('weekly')}
                        </button>
                        <button
                          onClick={() => setRevenueTrendPeriod('monthly')}
                          className={`px-2 sm:px-3 py-1 text-xs rounded-lg transition-colors whitespace-nowrap ${
                            revenueTrendPeriod === 'monthly'
                              ? 'bg-[var(--color-accent)] text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {dt('monthly')}
                        </button>
                      </div>
                    </div>
                    <div className="w-full h-64 sm:h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={revenueTrendData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                          <XAxis 
                            dataKey="date" 
                            stroke="#6b7280"
                            style={{ fontSize: '10px' }}
                          />
                          <YAxis 
                            stroke="#6b7280"
                            style={{ fontSize: '10px' }}
                            tickFormatter={(value) => `${(value / 1000000).toFixed(0)}${dt('millionShort')}`}
                          />
                          <Tooltip 
                            formatter={(value: any) => formatCurrency(Number(value))}
                            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="revenue" 
                            stroke="var(--color-accent, #3b82f6)" 
                            strokeWidth={3}
                            dot={{ fill: 'var(--color-accent, #3b82f6)', r: 4 }}
                            activeDot={{ r: 6 }}
                            isAnimationActive={true}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* Customer vs Revenue Distribution Chart - Right */}
                {customerRevenueData.length > 0 && (
                  <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4">
                      <div className="flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5 text-[var(--color-accent)]" />
                        <h3 className="text-base sm:text-lg font-bold text-gray-900">
                          {dt('ordersVsAov')}
                          {ordersAOVPeriod === 'daily' && ` (${dt('byDay')})`}
                          {ordersAOVPeriod === 'weekly' && ` (${dt('weeks8')})`}
                          {ordersAOVPeriod === 'monthly' && ` (${dt('months12')})`}
                        </h3>
                      </div>
                      <div className="flex gap-1 overflow-x-auto pb-1">
                        <button
                          onClick={() => setOrdersAOVPeriod('daily')}
                          className={`px-2 sm:px-3 py-1 text-xs rounded-lg transition-colors whitespace-nowrap ${
                            ordersAOVPeriod === 'daily'
                              ? 'bg-[var(--color-accent)] text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {dt('daily')}
                        </button>
                        <button
                          onClick={() => setOrdersAOVPeriod('weekly')}
                          className={`px-2 sm:px-3 py-1 text-xs rounded-lg transition-colors whitespace-nowrap ${
                            ordersAOVPeriod === 'weekly'
                              ? 'bg-[var(--color-accent)] text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {dt('weekly')}
                        </button>
                        <button
                          onClick={() => setOrdersAOVPeriod('monthly')}
                          className={`px-2 sm:px-3 py-1 text-xs rounded-lg transition-colors whitespace-nowrap ${
                            ordersAOVPeriod === 'monthly'
                              ? 'bg-[var(--color-accent)] text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {dt('monthly')}
                        </button>
                      </div>
                    </div>
                    <div className="w-full h-64 sm:h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={customerRevenueData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                          <XAxis 
                            dataKey="day" 
                            stroke="#6b7280"
                            style={{ fontSize: '10px' }}
                          />
                          <YAxis 
                            yAxisId="left"
                            stroke="#6b7280"
                            style={{ fontSize: '10px' }}
                          />
                          <YAxis 
                            yAxisId="right"
                            orientation="right"
                            stroke="#6b7280"
                            style={{ fontSize: '10px' }}
                            tickFormatter={(value) => `${(value / 1000).toFixed(0)}${dt('thousandShort')}`}
                          />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                            formatter={(value: any) => {
                              if (typeof value === 'number' && value > 10000) {
                                return formatCurrency(value);
                              }
                              return value;
                            }}
                          />
                          <Legend />
                          <Bar 
                            yAxisId="left"
                            dataKey="orders" 
                            fill="#3b82f6" 
                            name={dt('orders')}
                            radius={[8, 8, 0, 0]}
                          />
                          <Line 
                            yAxisId="right"
                            type="monotone" 
                            dataKey="avgOrderValue" 
                            stroke="#10b981" 
                            strokeWidth={3}
                            name={dt('avgOrderValue')}
                            dot={{ fill: '#10b981', r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-2 text-xs text-gray-600">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded"></div>
                        <span>{dt('ordersPerDayMsg')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded"></div>
                        <span>{dt('avgOrderMsg')}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Business Insights */}
            {insights.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5 text-[var(--color-accent)]" />
                  <h3 className="text-lg font-bold text-gray-900">{dt('businessInsights')}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {insights.map((insight) => {
                    const IconComponent = insight.icon;
                    return (
                      <div
                        key={insight.id}
                        className={`rounded-2xl p-6 border-2 transition-all hover:shadow-lg hover:scale-105 ${
                          insight.color === 'green' ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' :
                          insight.color === 'blue' ? 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200' :
                          insight.color === 'purple' ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200' :
                          insight.color === 'orange' ? 'bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200' :
                          insight.color === 'pink' ? 'bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200' :
                          'bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200'
                        } shadow-md`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${
                            insight.color === 'green' ? 'bg-gradient-to-br from-green-100 to-emerald-100' :
                            insight.color === 'blue' ? 'bg-gradient-to-br from-blue-100 to-cyan-100' :
                            insight.color === 'purple' ? 'bg-gradient-to-br from-purple-100 to-pink-100' :
                            insight.color === 'orange' ? 'bg-gradient-to-br from-orange-100 to-amber-100' :
                            insight.color === 'pink' ? 'bg-gradient-to-br from-pink-100 to-rose-100' :
                            'bg-gradient-to-br from-indigo-100 to-blue-100'
                          }`}>
                            <IconComponent className={`w-6 h-6 ${
                              insight.color === 'green' ? 'text-green-600' :
                              insight.color === 'blue' ? 'text-blue-600' :
                              insight.color === 'purple' ? 'text-purple-600' :
                              insight.color === 'orange' ? 'text-orange-600' :
                              insight.color === 'pink' ? 'text-pink-600' :
                              'text-indigo-600'
                            }`} />
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                            insight.color === 'green' ? 'bg-green-100 text-green-700' :
                            insight.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                            insight.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                            insight.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                            insight.color === 'pink' ? 'bg-pink-100 text-pink-700' :
                            'bg-indigo-100 text-indigo-700'
                          }`}>
                            ⚡
                          </div>
                        </div>
                        <h4 className={`font-bold text-gray-900 mb-2 text-sm ${
                          insight.color === 'green' ? 'text-green-900' :
                          insight.color === 'blue' ? 'text-blue-900' :
                          insight.color === 'purple' ? 'text-purple-900' :
                          insight.color === 'orange' ? 'text-orange-900' :
                          insight.color === 'pink' ? 'text-pink-900' :
                          'text-indigo-900'
                        }`}>{insight.title}</h4>
                        <p className={`text-sm leading-relaxed ${
                          insight.color === 'green' ? 'text-green-700' :
                          insight.color === 'blue' ? 'text-blue-700' :
                          insight.color === 'purple' ? 'text-purple-700' :
                          insight.color === 'orange' ? 'text-orange-700' :
                          insight.color === 'pink' ? 'text-pink-700' :
                          'text-indigo-700'
                        }`}>{insight.message}</p>
                        <div className={`mt-4 pt-4 border-t-2 ${
                          insight.color === 'green' ? 'border-green-100' :
                          insight.color === 'blue' ? 'border-blue-100' :
                          insight.color === 'purple' ? 'border-purple-100' :
                          insight.color === 'orange' ? 'border-orange-100' :
                          insight.color === 'pink' ? 'border-pink-100' :
                          'border-indigo-100'
                        }`}>
                          <button 
                            onClick={() => router.push(insight.link)}
                            className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                              insight.color === 'green' ? 'bg-green-100 text-green-700 hover:bg-green-200' :
                              insight.color === 'blue' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' :
                              insight.color === 'purple' ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' :
                              insight.color === 'orange' ? 'bg-orange-100 text-orange-700 hover:bg-orange-200' :
                              insight.color === 'pink' ? 'bg-pink-100 text-pink-700 hover:bg-pink-200' :
                              'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                            }`}
                          >
                            {dt('learnMore')}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Alerts & Todos Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Alerts */}
              {alerts.length > 0 && (
                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Bell className="w-5 h-5 text-[var(--color-accent)]" />
                    <h3 className="text-lg font-bold text-gray-900">{dt('alerts')}</h3>
                  </div>
                  <div className="space-y-3">
                    {alerts.slice(0, 3).map((alert) => (
                      <div
                        key={alert.id}
                        className={`p-4 rounded-lg border-l-4 ${
                          alert.type === 'error' ? 'bg-red-50 border-red-500' :
                          alert.type === 'warning' ? 'bg-yellow-50 border-yellow-500' :
                          'bg-blue-50 border-blue-500'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-900 text-sm">{alert.message}</p>
                          <button
                            onClick={() => router.push(alert.link)}
                            className="text-xs px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors whitespace-nowrap ml-2"
                          >
                            {alert.action}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Todos */}
              {todos.length > 0 && (
                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="w-5 h-5 text-[var(--color-accent)]" />
                    <h3 className="text-lg font-bold text-gray-900">{dt('actionItems')}</h3>
                  </div>
                  <div className="space-y-2">
                    {todos.slice(0, 4).map((todo) => (
                      <button
                        key={todo.id}
                        onClick={() => router.push(todo.link)}
                        className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group text-left"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                            todo.priority === 'high' ? 'bg-red-500' :
                            todo.priority === 'medium' ? 'bg-yellow-500' :
                            'bg-blue-500'
                          }`} />
                          <span className="text-gray-900 font-medium text-sm truncate">{todo.text}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[var(--color-accent)] transition-colors flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Top Performers */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Top Menu Items */}
              {topMenuItems.length > 0 && (
                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-5">
                    <UtensilsCrossed className="w-5 h-5 text-[var(--color-accent)]" />
                    <h3 className="text-lg font-bold text-gray-900">{dt('topSellers')}</h3>
                  </div>
                  <div className="space-y-3">
                    {topMenuItems.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
                          <p className="text-xs text-gray-600">{item.count} {dt('sold')}</p>
                        </div>
                        <span className="text-sm font-bold text-[var(--color-accent)]">{formatCurrency(item.revenue)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Top Tables */}
              {topTables.length > 0 && (
                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-5">
                    <Building2 className="w-5 h-5 text-[var(--color-accent)]" />
                    <h3 className="text-lg font-bold text-gray-900">{dt('topTables')}</h3>
                  </div>
                  <div className="space-y-3">
                    {topTables.map((table, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 text-sm">{dt('table')} {table.tableNumber}</p>
                          <p className="text-xs text-gray-600">{table.orders} {dt('orders')}</p>
                        </div>
                        <span className="text-sm font-bold text-[var(--color-accent)]">{formatCurrency(table.revenue)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Top Staff */}
              {topStaff.length > 0 && (
                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-5">
                    <Users className="w-5 h-5 text-[var(--color-accent)]" />
                    <h3 className="text-lg font-bold text-gray-900">{dt('topStaff')}</h3>
                  </div>
                  <div className="space-y-3">
                    {topStaff.map((member, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 text-sm">{member.name}</p>
                          <p className="text-xs text-gray-600">{member.orders} {dt('orders')}</p>
                        </div>
                        <span className="text-sm font-bold text-[var(--color-accent)]">{formatCurrency(member.revenue)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </>
  );
}