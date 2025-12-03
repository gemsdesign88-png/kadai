(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/dashboard/dashboard-client.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/dollar-sign.js [app-client] (ecmascript) <export default as DollarSign>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-client] (ecmascript) <export default as ShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.js [app-client] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$utensils$2d$crossed$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UtensilsCrossed$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/utensils-crossed.js [app-client] (ecmascript) <export default as UtensilsCrossed>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building-2.js [app-client] (ecmascript) <export default as Building2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-client] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/i18n/context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/LineChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Line.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$ComposedChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/ComposedChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Bar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Legend.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function DashboardClient({ restaurants }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
    const { language } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"])();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activeRestaurant, setActiveRestaurant] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [period, setPeriod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('daily');
    const [stats, setStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
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
    const [topMenuItems, setTopMenuItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [topTables, setTopTables] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [topStaff, setTopStaff] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [insights, setInsights] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [recentOrders, setRecentOrders] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loadingData, setLoadingData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [todos, setTodos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [alerts, setAlerts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [revenueTrendData, setRevenueTrendData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [customerRevenueData, setCustomerRevenueData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [revenueTrendPeriod, setRevenueTrendPeriod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('daily');
    const [ordersAOVPeriod, setOrdersAOVPeriod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('daily');
    const [allOrdersCache, setAllOrdersCache] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardClient.useEffect": ()=>{
            if (restaurants.length > 0) {
                // Check localStorage for selected restaurant
                const savedRestaurantId = localStorage.getItem('selected_restaurant_id');
                if (savedRestaurantId) {
                    const saved = restaurants.find({
                        "DashboardClient.useEffect.saved": (r)=>r.id === savedRestaurantId
                    }["DashboardClient.useEffect.saved"]);
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
            const handleRestaurantChange = {
                "DashboardClient.useEffect.handleRestaurantChange": ()=>{
                    const savedRestaurantId = localStorage.getItem('selected_restaurant_id');
                    if (savedRestaurantId && restaurants.length > 0) {
                        const saved = restaurants.find({
                            "DashboardClient.useEffect.handleRestaurantChange.saved": (r)=>r.id === savedRestaurantId
                        }["DashboardClient.useEffect.handleRestaurantChange.saved"]);
                        if (saved && saved.id !== activeRestaurant?.id) {
                            setActiveRestaurant(saved);
                        }
                    }
                }
            }["DashboardClient.useEffect.handleRestaurantChange"];
            window.addEventListener('restaurantChanged', handleRestaurantChange);
            window.addEventListener('storage', handleRestaurantChange);
            return ({
                "DashboardClient.useEffect": ()=>{
                    window.removeEventListener('restaurantChanged', handleRestaurantChange);
                    window.removeEventListener('storage', handleRestaurantChange);
                }
            })["DashboardClient.useEffect"];
        }
    }["DashboardClient.useEffect"], [
        restaurants
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardClient.useEffect": ()=>{
            if (activeRestaurant) {
                loadDashboardData();
            }
        }
    }["DashboardClient.useEffect"], [
        activeRestaurant
    ]);
    // Recalculate chart data when period changes (without reloading from database)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardClient.useEffect": ()=>{
            if (allOrdersCache.length > 0) {
                recalculateChartData();
            }
        }
    }["DashboardClient.useEffect"], [
        revenueTrendPeriod,
        ordersAOVPeriod,
        language
    ]);
    function recalculateChartData(ordersData) {
        const orders = ordersData || allOrdersCache;
        if (!orders.length) return;
        const now = new Date();
        const today = new Date(now);
        today.setHours(0, 0, 0, 0);
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - 7);
        const weekOrders = orders.filter((o)=>{
            const paidAt = new Date(o.paid_at);
            return paidAt >= weekStart && o.status !== 'cancelled';
        });
        // Recalculate revenue trend based on selected period
        let revenueTrend = [];
        if (revenueTrendPeriod === 'daily') {
            const last30DaysData = {};
            for(let i = 29; i >= 0; i--){
                const date = new Date(today);
                date.setDate(today.getDate() - i);
                const dateKey = date.toLocaleDateString('id-ID', {
                    month: 'short',
                    day: 'numeric'
                });
                const nextDate = new Date(date);
                nextDate.setDate(nextDate.getDate() + 1);
                const dayOrders = orders.filter((o)=>{
                    const paidAt = new Date(o.paid_at);
                    return paidAt >= date && paidAt < nextDate && o.status !== 'cancelled';
                });
                const dayRevenue = dayOrders.reduce((sum, o)=>sum + (o.total || 0), 0);
                last30DaysData[dateKey] = dayRevenue;
            }
            revenueTrend = Object.entries(last30DaysData).map(([date, revenue])=>({
                    date,
                    revenue: Math.round(revenue)
                }));
        } else if (revenueTrendPeriod === 'weekly') {
            for(let i = 11; i >= 0; i--){
                const weekEnd = new Date(today);
                weekEnd.setDate(today.getDate() - i * 7);
                const weekStartCalc = new Date(weekEnd);
                weekStartCalc.setDate(weekEnd.getDate() - 7);
                const weekOrdersCalc = orders.filter((o)=>{
                    const paidAt = new Date(o.paid_at);
                    return paidAt >= weekStartCalc && paidAt < weekEnd && o.status !== 'cancelled';
                });
                const weekRevenue = weekOrdersCalc.reduce((sum, o)=>sum + (o.total || 0), 0);
                const label = `${weekStartCalc.toLocaleDateString('id-ID', {
                    month: 'short',
                    day: 'numeric'
                })}`;
                revenueTrend.push({
                    date: label,
                    revenue: Math.round(weekRevenue)
                });
            }
        } else {
            for(let i = 11; i >= 0; i--){
                const monthDate = new Date(today);
                monthDate.setMonth(today.getMonth() - i);
                monthDate.setDate(1);
                const nextMonth = new Date(monthDate);
                nextMonth.setMonth(monthDate.getMonth() + 1);
                const monthOrders = orders.filter((o)=>{
                    const paidAt = new Date(o.paid_at);
                    return paidAt >= monthDate && paidAt < nextMonth && o.status !== 'cancelled';
                });
                const monthRevenue = monthOrders.reduce((sum, o)=>sum + (o.total || 0), 0);
                const label = monthDate.toLocaleDateString('id-ID', {
                    month: 'short',
                    year: 'numeric'
                });
                revenueTrend.push({
                    date: label,
                    revenue: Math.round(monthRevenue)
                });
            }
        }
        setRevenueTrendData(revenueTrend);
        // Recalculate Orders vs AOV based on selected period
        let customerRevenueChartData = [];
        if (ordersAOVPeriod === 'daily') {
            const dayOfWeekData = {
                'Monday': {
                    orders: 0,
                    revenue: 0
                },
                'Tuesday': {
                    orders: 0,
                    revenue: 0
                },
                'Wednesday': {
                    orders: 0,
                    revenue: 0
                },
                'Thursday': {
                    orders: 0,
                    revenue: 0
                },
                'Friday': {
                    orders: 0,
                    revenue: 0
                },
                'Saturday': {
                    orders: 0,
                    revenue: 0
                },
                'Sunday': {
                    orders: 0,
                    revenue: 0
                }
            };
            const dayNames = [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday'
            ];
            weekOrders.forEach((order)=>{
                const orderDate = new Date(order.paid_at);
                const dayName = dayNames[orderDate.getDay()];
                dayOfWeekData[dayName].orders += 1;
                dayOfWeekData[dayName].revenue += order.total || 0;
            });
            customerRevenueChartData = Object.entries(dayOfWeekData).map(([day, data])=>({
                    day: language === 'en' ? day : day === 'Monday' ? 'Senin' : day === 'Tuesday' ? 'Selasa' : day === 'Wednesday' ? 'Rabu' : day === 'Thursday' ? 'Kamis' : day === 'Friday' ? 'Jumat' : day === 'Saturday' ? 'Sabtu' : 'Minggu',
                    orders: data.orders,
                    avgOrderValue: data.orders > 0 ? Math.round(data.revenue / data.orders) : 0
                }));
        } else if (ordersAOVPeriod === 'weekly') {
            for(let i = 7; i >= 0; i--){
                const weekEnd = new Date(today);
                weekEnd.setDate(today.getDate() - i * 7);
                const weekStartCalc = new Date(weekEnd);
                weekStartCalc.setDate(weekEnd.getDate() - 7);
                const weekOrdersCalc = orders.filter((o)=>{
                    const paidAt = new Date(o.paid_at);
                    return paidAt >= weekStartCalc && paidAt < weekEnd && o.status !== 'cancelled';
                });
                const weekRevenue = weekOrdersCalc.reduce((sum, o)=>sum + (o.total || 0), 0);
                const label = `W${8 - i}`;
                customerRevenueChartData.push({
                    day: label,
                    orders: weekOrdersCalc.length,
                    avgOrderValue: weekOrdersCalc.length > 0 ? Math.round(weekRevenue / weekOrdersCalc.length) : 0
                });
            }
        } else {
            for(let i = 11; i >= 0; i--){
                const monthDate = new Date(today);
                monthDate.setMonth(today.getMonth() - i);
                monthDate.setDate(1);
                const nextMonth = new Date(monthDate);
                nextMonth.setMonth(monthDate.getMonth() + 1);
                const monthOrders = orders.filter((o)=>{
                    const paidAt = new Date(o.paid_at);
                    return paidAt >= monthDate && paidAt < nextMonth && o.status !== 'cancelled';
                });
                const monthRevenue = monthOrders.reduce((sum, o)=>sum + (o.total || 0), 0);
                const label = monthDate.toLocaleDateString('id-ID', {
                    month: 'short'
                });
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
            const { data: allOrders } = await supabase.from('orders').select('*, order_items(*)').eq('restaurant_id', activeRestaurant.id).eq('payment_status', 'paid').gte('paid_at', yearStart.toISOString()).order('paid_at', {
                ascending: false
            });
            // Get active orders
            const { data: activeOrdersData } = await supabase.from('orders').select('*').eq('restaurant_id', activeRestaurant.id).not('status', 'in', '(completed,cancelled)');
            // Get menu items for top performers
            const { data: menuItems } = await supabase.from('menu_items').select('*').eq('restaurant_id', activeRestaurant.id);
            // Get staff for performance ranking
            const { data: staff } = await supabase.from('staff').select('*').eq('restaurant_id', activeRestaurant.id);
            // Get tables
            const { data: tables } = await supabase.from('tables').select('*').eq('restaurant_id', activeRestaurant.id);
            // Get stock items
            const { data: stockItems } = await supabase.from('stock_items').select('*, ingredient:ingredients(*)').eq('restaurant_id', activeRestaurant.id);
            if (allOrders) {
                // Calculate revenue for different periods
                const todayOrders = allOrders.filter((o)=>{
                    const paidAt = new Date(o.paid_at);
                    return paidAt >= today && paidAt < tomorrow && o.status !== 'cancelled';
                });
                const weekOrders = allOrders.filter((o)=>{
                    const paidAt = new Date(o.paid_at);
                    return paidAt >= weekStart && o.status !== 'cancelled';
                });
                const previousWeekOrders = allOrders.filter((o)=>{
                    const paidAt = new Date(o.paid_at);
                    return paidAt >= previousWeekStart && paidAt < weekStart && o.status !== 'cancelled';
                });
                const monthOrders = allOrders.filter((o)=>{
                    const paidAt = new Date(o.paid_at);
                    return paidAt >= monthStart && o.status !== 'cancelled';
                });
                const yearOrders = allOrders.filter((o)=>{
                    const paidAt = new Date(o.paid_at);
                    return paidAt >= yearStart && o.status !== 'cancelled';
                });
                const todayRevenue = todayOrders.reduce((sum, o)=>sum + (o.total || 0), 0);
                const weekRevenue = weekOrders.reduce((sum, o)=>sum + (o.total || 0), 0);
                const previousWeekRevenue = previousWeekOrders.reduce((sum, o)=>sum + (o.total || 0), 0);
                const monthRevenue = monthOrders.reduce((sum, o)=>sum + (o.total || 0), 0);
                const yearRevenue = yearOrders.reduce((sum, o)=>sum + (o.total || 0), 0);
                // Calculate growth
                const weekGrowth = previousWeekRevenue > 0 ? (weekRevenue - previousWeekRevenue) / previousWeekRevenue * 100 : 0;
                // Calculate average order value
                const avgOrderValue = weekOrders.length > 0 ? weekRevenue / weekOrders.length : 0;
                // Count unique customers (from order_items or orders)
                const uniqueCustomers = new Set(weekOrders.map((o)=>o.id)).size;
                // Calculate top menu items
                const itemRevenue = {};
                weekOrders.forEach((order)=>{
                    order.order_items?.forEach((item)=>{
                        const itemName = item.item_name || item.name;
                        if (!itemRevenue[itemName]) {
                            itemRevenue[itemName] = {
                                name: itemName,
                                revenue: 0,
                                count: 0
                            };
                        }
                        itemRevenue[itemName].revenue += item.subtotal || 0;
                        itemRevenue[itemName].count += item.quantity || 1;
                    });
                });
                const topItems = Object.values(itemRevenue).sort((a, b)=>b.revenue - a.revenue).slice(0, 5);
                // Calculate top tables
                const tableRevenue = {};
                weekOrders.forEach((order)=>{
                    if (order.table_number) {
                        if (!tableRevenue[order.table_number]) {
                            tableRevenue[order.table_number] = {
                                tableNumber: order.table_number,
                                orders: 0,
                                revenue: 0,
                                avgOrder: 0
                            };
                        }
                        tableRevenue[order.table_number].orders += 1;
                        tableRevenue[order.table_number].revenue += order.total || 0;
                    }
                });
                const topTablesList = Object.values(tableRevenue).map((t)=>({
                        ...t,
                        avgOrder: t.revenue / t.orders
                    })).sort((a, b)=>b.revenue - a.revenue).slice(0, 5);
                // Calculate top staff
                const staffPerformance = {};
                weekOrders.forEach((order)=>{
                    if (order.staff_id && staff) {
                        const staffMember = staff.find((s)=>s.id === order.staff_id);
                        const staffName = staffMember?.name || 'Unknown';
                        if (!staffPerformance[order.staff_id]) {
                            staffPerformance[order.staff_id] = {
                                name: staffName,
                                orders: 0,
                                revenue: 0,
                                rating: 0
                            };
                        }
                        staffPerformance[order.staff_id].orders += 1;
                        staffPerformance[order.staff_id].revenue += order.total || 0;
                    }
                });
                const topStaffList = Object.values(staffPerformance).sort((a, b)=>b.revenue - a.revenue).slice(0, 5);
                // Cache orders for chart recalculation
                setAllOrdersCache(allOrders);
                // Initial chart data calculation
                recalculateChartData(allOrders);
                // Calculate stock metrics
                let lowStockCount = 0;
                let outOfStockCount = 0;
                if (stockItems) {
                    stockItems.forEach((item)=>{
                        if (item.quantity_on_hand === 0) {
                            outOfStockCount++;
                        } else if (item.ingredient && item.quantity_on_hand <= item.ingredient.reorder_level) {
                            lowStockCount++;
                        }
                    });
                }
                // Generate insights based on data
                const newInsights = [];
                if (weekGrowth > 0) {
                    newInsights.push({
                        id: 'growth',
                        type: 'positive',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"],
                        title: language === 'en' ? 'Strong Growth' : 'Pertumbuhan Kuat',
                        message: `${weekGrowth.toFixed(1)}% pertumbuhan pendapatan minggu ini`,
                        color: 'green',
                        link: '/dashboard/analytics'
                    });
                }
                if (topItems.length > 0) {
                    newInsights.push({
                        id: 'top-item',
                        type: 'info',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$utensils$2d$crossed$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UtensilsCrossed$3e$__["UtensilsCrossed"],
                        title: language === 'en' ? 'Top Seller' : 'Penjual Terbaik',
                        message: `${topItems[0].name} adalah menu terlaris dengan ${topItems[0].count} penjualan`,
                        color: 'blue',
                        link: '/dashboard/menu'
                    });
                }
                if (topTablesList.length > 0) {
                    newInsights.push({
                        id: 'top-table',
                        type: 'info',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"],
                        title: language === 'en' ? 'Popular Table' : 'Meja Populer',
                        message: `Meja ${topTablesList[0].tableNumber} adalah yang paling ramai minggu ini`,
                        color: 'purple',
                        link: '/dashboard/tables'
                    });
                }
                if (topStaffList.length > 0) {
                    newInsights.push({
                        id: 'top-staff',
                        type: 'info',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
                        title: language === 'en' ? 'Top Staff' : 'Staf Terbaik',
                        message: `${topStaffList[0].name} mencatat ${formatCurrency(topStaffList[0].revenue)} penjualan`,
                        color: 'indigo',
                        link: '/dashboard/staff'
                    });
                }
                // Stock insight
                if (outOfStockCount > 0 || lowStockCount > 0) {
                    newInsights.push({
                        id: 'stock-alert',
                        type: 'warning',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"],
                        title: language === 'en' ? 'Stock Alert' : 'Peringatan Stok',
                        message: `${outOfStockCount} item habis & ${lowStockCount} item stok rendah. Segera lakukan restocking`,
                        color: 'orange',
                        link: '/dashboard/inventory'
                    });
                }
                // Repeat customer insight
                if (uniqueCustomers > 0) {
                    newInsights.push({
                        id: 'customer-activity',
                        type: 'info',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
                        title: language === 'en' ? 'Customer Activity' : 'Aktivitas Pelanggan',
                        message: language === 'en' ? `${uniqueCustomers} customers this week. Keep them engaged with promotions!` : `${uniqueCustomers} pelanggan minggu ini. Pertahankan dengan promosi menarik!`,
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
                const newAlerts = [];
                if (outOfStockCount > 0) {
                    newAlerts.push({
                        id: 'stock-out',
                        type: 'error',
                        message: `${outOfStockCount} item ${language === 'en' ? 'out of stock' : 'habis stok'}`,
                        action: language === 'en' ? 'Check Inventory' : 'Cek Stok',
                        link: '/dashboard/inventory'
                    });
                }
                if (lowStockCount > 0) {
                    newAlerts.push({
                        id: 'stock-low',
                        type: 'warning',
                        message: `${lowStockCount} item ${language === 'en' ? 'low stock' : 'stok menipis'}`,
                        action: language === 'en' ? 'Check Inventory' : 'Cek Stok',
                        link: '/dashboard/inventory'
                    });
                }
                if (activeOrdersData && activeOrdersData.length > 5) {
                    newAlerts.push({
                        id: 'orders-pending',
                        type: 'info',
                        message: `${activeOrdersData.length} ${language === 'en' ? 'orders in progress' : 'pesanan sedang diproses'}`,
                        action: language === 'en' ? 'View Orders' : 'Lihat Pesanan',
                        link: '/dashboard/orders'
                    });
                }
                setAlerts(newAlerts);
                // Generate todos
                const newTodos = [];
                if (stockItems) {
                    stockItems.forEach((item)=>{
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
                setTodos(newTodos.slice(0, 5));
            }
        } catch (error) {
            console.error('Error loading dashboard data:', error);
        } finally{
            setLoadingData(false);
        }
    }
    const handleSignOut = async ()=>{
        setLoading(true);
        await supabase.auth.signOut();
        router.push('/');
        router.refresh();
    };
    const formatCurrency = (amount)=>{
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };
    const formatTime = (dateString)=>{
        return new Date(dateString).toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    const getStatusColor = (status)=>{
        const colors = {
            'pending': 'bg-yellow-100 text-yellow-800',
            'preparing': 'bg-blue-100 text-blue-800',
            'ready': 'bg-green-100 text-green-800',
            'completed': 'bg-gray-100 text-gray-800',
            'cancelled': 'bg-red-100 text-red-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };
    if (restaurants.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gradient-to-br from-[#FF5A5F]/5 via-white to-[#8B5CF6]/5 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center max-w-md p-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                        className: "w-20 h-20 text-gray-300 mx-auto mb-6"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 649,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-3xl font-bold text-gray-900 mb-4",
                        children: "Belum Ada Bisnis"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 650,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600 mb-8",
                        children: "Tambahkan bisnis pertama Anda untuk mulai menggunakan KadaiPOS"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 651,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "px-8 py-4 bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all",
                        onClick: ()=>router.push('/dashboard/setup'),
                        children: "Tambah Bisnis"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 654,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                lineNumber: 648,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
            lineNumber: 647,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-4 sm:px-6 lg:px-8 py-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-3xl font-bold text-gray-900 mb-1",
                                        children: language === 'en' ? 'Welcome Back' : 'Selamat Datang'
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 672,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-600",
                                        children: new Date().toLocaleDateString(language === 'en' ? 'en-US' : 'id-ID', {
                                            weekday: 'long',
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 675,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 671,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-right",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-semibold text-gray-600",
                                        children: activeRestaurant?.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 685,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-500",
                                        children: language === 'en' ? 'Current Restaurant' : 'Restoran Aktif'
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 686,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 684,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 670,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                    lineNumber: 669,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                lineNumber: 668,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "px-4 sm:px-6 lg:px-8 py-8",
                children: loadingData ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-center py-20",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-accent)]"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 696,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                    lineNumber: 695,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between mb-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-10 h-10 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-hover)] rounded-xl flex items-center justify-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"], {
                                                        className: "w-5 h-5 text-white"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                        lineNumber: 706,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                    lineNumber: 705,
                                                    columnNumber: 19
                                                }, this),
                                                stats.growthPercent > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full font-semibold",
                                                    children: [
                                                        "+",
                                                        stats.growthPercent,
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                    lineNumber: 708,
                                                    columnNumber: 47
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                            lineNumber: 704,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-gray-600 mb-1",
                                            children: language === 'en' ? 'This Week' : 'Minggu Ini'
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                            lineNumber: 710,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-lg font-bold text-gray-900 leading-tight",
                                            children: formatCurrency(stats.weekRevenue)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                            lineNumber: 711,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                    lineNumber: 703,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between mb-3",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                                                    className: "w-5 h-5 text-white"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                    lineNumber: 718,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                lineNumber: 717,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                            lineNumber: 716,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-gray-600 mb-1",
                                            children: language === 'en' ? 'Total Orders' : 'Total Pesanan'
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                            lineNumber: 721,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-lg font-bold text-gray-900 leading-tight",
                                            children: stats.weekOrders
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                            lineNumber: 722,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                    lineNumber: 715,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between mb-3",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                                    className: "w-5 h-5 text-white"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                    lineNumber: 729,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                lineNumber: 728,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                            lineNumber: 727,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-gray-600 mb-1",
                                            children: language === 'en' ? 'Avg Order' : 'Rata Pesanan'
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                            lineNumber: 732,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-lg font-bold text-gray-900 leading-tight",
                                            children: formatCurrency(stats.avgOrderValue)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                            lineNumber: 733,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                    lineNumber: 726,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between mb-3",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                    className: "w-5 h-5 text-white"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                    lineNumber: 740,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                lineNumber: 739,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                            lineNumber: 738,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-gray-600 mb-1",
                                            children: language === 'en' ? 'Customers' : 'Pelanggan'
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                            lineNumber: 743,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-lg font-bold text-gray-900 leading-tight",
                                            children: stats.totalCustomers
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                            lineNumber: 744,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                    lineNumber: 737,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `rounded-xl p-4 border shadow-sm hover:shadow-md transition-all ${stats.activeOrders > 0 ? 'bg-yellow-50 border-yellow-100' : 'bg-white border-gray-100'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between mb-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `w-10 h-10 rounded-xl flex items-center justify-center ${stats.activeOrders > 0 ? 'bg-gradient-to-br from-yellow-500 to-yellow-600' : 'bg-gradient-to-br from-gray-400 to-gray-500'}`,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                        className: "w-5 h-5 text-white"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                        lineNumber: 759,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                    lineNumber: 754,
                                                    columnNumber: 19
                                                }, this),
                                                stats.activeOrders > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-semibold",
                                                    children: language === 'en' ? 'Active' : 'Aktif'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                    lineNumber: 761,
                                                    columnNumber: 46
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                            lineNumber: 753,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-gray-600 mb-1",
                                            children: language === 'en' ? 'In Progress' : 'Sedang Diproses'
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                            lineNumber: 763,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: `text-lg font-bold leading-tight ${stats.activeOrders > 0 ? 'text-gray-900' : 'text-gray-900'}`,
                                            children: stats.activeOrders
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                            lineNumber: 764,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                    lineNumber: 748,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 701,
                            columnNumber: 13
                        }, this),
                        (revenueTrendData.length > 0 || customerRevenueData.length > 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8",
                            children: [
                                revenueTrendData.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-xl p-6 border border-gray-100 shadow-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"], {
                                                            className: "w-5 h-5 text-[var(--color-accent)]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 776,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "text-lg font-bold text-gray-900",
                                                            children: [
                                                                language === 'en' ? 'Revenue Trend' : 'Tren Pendapatan',
                                                                revenueTrendPeriod === 'daily' && ` (${language === 'en' ? '30 Days' : '30 Hari'})`,
                                                                revenueTrendPeriod === 'weekly' && ` (${language === 'en' ? '12 Weeks' : '12 Minggu'})`,
                                                                revenueTrendPeriod === 'monthly' && ` (${language === 'en' ? '12 Months' : '12 Bulan'})`
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 777,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                    lineNumber: 775,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setRevenueTrendPeriod('daily'),
                                                            className: `px-3 py-1 text-xs rounded-lg transition-colors ${revenueTrendPeriod === 'daily' ? 'bg-[var(--color-accent)] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`,
                                                            children: language === 'en' ? 'Daily' : 'Harian'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 785,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setRevenueTrendPeriod('weekly'),
                                                            className: `px-3 py-1 text-xs rounded-lg transition-colors ${revenueTrendPeriod === 'weekly' ? 'bg-[var(--color-accent)] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`,
                                                            children: language === 'en' ? 'Weekly' : 'Mingguan'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 795,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setRevenueTrendPeriod('monthly'),
                                                            className: `px-3 py-1 text-xs rounded-lg transition-colors ${revenueTrendPeriod === 'monthly' ? 'bg-[var(--color-accent)] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`,
                                                            children: language === 'en' ? 'Monthly' : 'Bulanan'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 805,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                    lineNumber: 784,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                            lineNumber: 774,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-full h-80",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                                width: "100%",
                                                height: "100%",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineChart"], {
                                                    data: revenueTrendData,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                                            strokeDasharray: "3 3",
                                                            stroke: "#e5e7eb"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 820,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                                            dataKey: "date",
                                                            stroke: "#6b7280",
                                                            style: {
                                                                fontSize: '12px'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 821,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                                            stroke: "#6b7280",
                                                            style: {
                                                                fontSize: '12px'
                                                            },
                                                            tickFormatter: (value)=>`Rp ${(value / 1000000).toFixed(0)}M`
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 826,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                            formatter: (value)=>formatCurrency(Number(value)),
                                                            contentStyle: {
                                                                backgroundColor: '#fff',
                                                                border: '1px solid #e5e7eb',
                                                                borderRadius: '8px'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 831,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                                                            type: "monotone",
                                                            dataKey: "revenue",
                                                            stroke: "var(--color-accent, #3b82f6)",
                                                            strokeWidth: 3,
                                                            dot: {
                                                                fill: 'var(--color-accent, #3b82f6)',
                                                                r: 4
                                                            },
                                                            activeDot: {
                                                                r: 6
                                                            },
                                                            isAnimationActive: true
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 835,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                    lineNumber: 819,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                lineNumber: 818,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                            lineNumber: 817,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                    lineNumber: 773,
                                    columnNumber: 19
                                }, this),
                                customerRevenueData.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-xl p-6 border border-gray-100 shadow-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                                                            className: "w-5 h-5 text-[var(--color-accent)]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 855,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "text-lg font-bold text-gray-900",
                                                            children: [
                                                                language === 'en' ? 'Orders vs AOV' : 'Pesanan vs AOV',
                                                                ordersAOVPeriod === 'daily' && ` (${language === 'en' ? 'by Day' : 'per Hari'})`,
                                                                ordersAOVPeriod === 'weekly' && ` (${language === 'en' ? '8 Weeks' : '8 Minggu'})`,
                                                                ordersAOVPeriod === 'monthly' && ` (${language === 'en' ? '12 Months' : '12 Bulan'})`
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 856,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                    lineNumber: 854,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setOrdersAOVPeriod('daily'),
                                                            className: `px-3 py-1 text-xs rounded-lg transition-colors ${ordersAOVPeriod === 'daily' ? 'bg-[var(--color-accent)] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`,
                                                            children: language === 'en' ? 'Daily' : 'Harian'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 864,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setOrdersAOVPeriod('weekly'),
                                                            className: `px-3 py-1 text-xs rounded-lg transition-colors ${ordersAOVPeriod === 'weekly' ? 'bg-[var(--color-accent)] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`,
                                                            children: language === 'en' ? 'Weekly' : 'Mingguan'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 874,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setOrdersAOVPeriod('monthly'),
                                                            className: `px-3 py-1 text-xs rounded-lg transition-colors ${ordersAOVPeriod === 'monthly' ? 'bg-[var(--color-accent)] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`,
                                                            children: language === 'en' ? 'Monthly' : 'Bulanan'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 884,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                    lineNumber: 863,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                            lineNumber: 853,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-full h-80",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                                width: "100%",
                                                height: "100%",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$ComposedChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ComposedChart"], {
                                                    data: customerRevenueData,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                                            strokeDasharray: "3 3",
                                                            stroke: "#e5e7eb"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 899,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                                            dataKey: "day",
                                                            stroke: "#6b7280",
                                                            style: {
                                                                fontSize: '12px'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 900,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                                            yAxisId: "left",
                                                            stroke: "#6b7280",
                                                            style: {
                                                                fontSize: '12px'
                                                            },
                                                            label: {
                                                                value: language === 'en' ? 'Orders' : 'Pesanan',
                                                                angle: -90,
                                                                position: 'insideLeft'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 905,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                                            yAxisId: "right",
                                                            orientation: "right",
                                                            stroke: "#6b7280",
                                                            style: {
                                                                fontSize: '12px'
                                                            },
                                                            tickFormatter: (value)=>`Rp ${(value / 1000).toFixed(0)}K`,
                                                            label: {
                                                                value: language === 'en' ? 'AOV' : 'AOV',
                                                                angle: 90,
                                                                position: 'insideRight'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 911,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                            contentStyle: {
                                                                backgroundColor: '#fff',
                                                                border: '1px solid #e5e7eb',
                                                                borderRadius: '8px'
                                                            },
                                                            formatter: (value)=>{
                                                                if (typeof value === 'number' && value > 10000) {
                                                                    return formatCurrency(value);
                                                                }
                                                                return value;
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 919,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {}, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 928,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                                            yAxisId: "left",
                                                            dataKey: "orders",
                                                            fill: "#3b82f6",
                                                            name: language === 'en' ? 'Orders' : 'Pesanan',
                                                            radius: [
                                                                8,
                                                                8,
                                                                0,
                                                                0
                                                            ]
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 929,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                                                            yAxisId: "right",
                                                            type: "monotone",
                                                            dataKey: "avgOrderValue",
                                                            stroke: "#10b981",
                                                            strokeWidth: 3,
                                                            name: language === 'en' ? 'Avg Order Value' : 'Nilai Pesanan Rata',
                                                            dot: {
                                                                fill: '#10b981',
                                                                r: 4
                                                            },
                                                            activeDot: {
                                                                r: 6
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 936,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                    lineNumber: 898,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                lineNumber: 897,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                            lineNumber: 896,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-4 grid grid-cols-1 gap-2 text-xs text-gray-600",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-3 h-3 bg-blue-500 rounded"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 951,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: language === 'en' ? 'Blue bars: orders per day' : 'Bar biru: pesanan per hari'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 952,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                    lineNumber: 950,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-3 h-3 bg-green-500 rounded"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 955,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: language === 'en' ? 'Green line: average order value' : 'Garis hijau: nilai pesanan rata'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 956,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                    lineNumber: 954,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                            lineNumber: 949,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                    lineNumber: 852,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 770,
                            columnNumber: 15
                        }, this),
                        insights.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                            className: "w-5 h-5 text-[var(--color-accent)]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                            lineNumber: 968,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-lg font-bold text-gray-900",
                                            children: language === 'en' ? 'Business Insights' : 'Wawasan Bisnis'
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                            lineNumber: 969,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                    lineNumber: 967,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
                                    children: insights.map((insight)=>{
                                        const IconComponent = insight.icon;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `rounded-2xl p-6 border-2 transition-all hover:shadow-lg hover:scale-105 ${insight.color === 'green' ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' : insight.color === 'blue' ? 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200' : insight.color === 'purple' ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200' : insight.color === 'orange' ? 'bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200' : insight.color === 'pink' ? 'bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200' : 'bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200'} shadow-md`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start justify-between mb-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${insight.color === 'green' ? 'bg-gradient-to-br from-green-100 to-emerald-100' : insight.color === 'blue' ? 'bg-gradient-to-br from-blue-100 to-cyan-100' : insight.color === 'purple' ? 'bg-gradient-to-br from-purple-100 to-pink-100' : insight.color === 'orange' ? 'bg-gradient-to-br from-orange-100 to-amber-100' : insight.color === 'pink' ? 'bg-gradient-to-br from-pink-100 to-rose-100' : 'bg-gradient-to-br from-indigo-100 to-blue-100'}`,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconComponent, {
                                                                className: `w-6 h-6 ${insight.color === 'green' ? 'text-green-600' : insight.color === 'blue' ? 'text-blue-600' : insight.color === 'purple' ? 'text-purple-600' : insight.color === 'orange' ? 'text-orange-600' : insight.color === 'pink' ? 'text-pink-600' : 'text-indigo-600'}`
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                                lineNumber: 995,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 987,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `px-3 py-1 rounded-full text-xs font-bold ${insight.color === 'green' ? 'bg-green-100 text-green-700' : insight.color === 'blue' ? 'bg-blue-100 text-blue-700' : insight.color === 'purple' ? 'bg-purple-100 text-purple-700' : insight.color === 'orange' ? 'bg-orange-100 text-orange-700' : insight.color === 'pink' ? 'bg-pink-100 text-pink-700' : 'bg-indigo-100 text-indigo-700'}`,
                                                            children: "⚡"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 1004,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                    lineNumber: 986,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: `font-bold text-gray-900 mb-2 text-sm ${insight.color === 'green' ? 'text-green-900' : insight.color === 'blue' ? 'text-blue-900' : insight.color === 'purple' ? 'text-purple-900' : insight.color === 'orange' ? 'text-orange-900' : insight.color === 'pink' ? 'text-pink-900' : 'text-indigo-900'}`,
                                                    children: insight.title
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                    lineNumber: 1015,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: `text-sm leading-relaxed ${insight.color === 'green' ? 'text-green-700' : insight.color === 'blue' ? 'text-blue-700' : insight.color === 'purple' ? 'text-purple-700' : insight.color === 'orange' ? 'text-orange-700' : insight.color === 'pink' ? 'text-pink-700' : 'text-indigo-700'}`,
                                                    children: insight.message
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                    lineNumber: 1023,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `mt-4 pt-4 border-t-2 ${insight.color === 'green' ? 'border-green-100' : insight.color === 'blue' ? 'border-blue-100' : insight.color === 'purple' ? 'border-purple-100' : insight.color === 'orange' ? 'border-orange-100' : insight.color === 'pink' ? 'border-pink-100' : 'border-indigo-100'}`,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>router.push(insight.link),
                                                        className: `text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${insight.color === 'green' ? 'bg-green-100 text-green-700 hover:bg-green-200' : insight.color === 'blue' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' : insight.color === 'purple' ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' : insight.color === 'orange' ? 'bg-orange-100 text-orange-700 hover:bg-orange-200' : insight.color === 'pink' ? 'bg-pink-100 text-pink-700 hover:bg-pink-200' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`,
                                                        children: language === 'en' ? 'Learn More →' : 'Pelajari Lebih →'
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                        lineNumber: 1039,
                                                        columnNumber: 27
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                    lineNumber: 1031,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, insight.id, true, {
                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                            lineNumber: 975,
                                            columnNumber: 23
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                    lineNumber: 971,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 966,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8",
                            children: [
                                alerts.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-xl p-6 border border-gray-100 shadow-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                                    className: "w-5 h-5 text-[var(--color-accent)]"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                    lineNumber: 1066,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-lg font-bold text-gray-900",
                                                    children: language === 'en' ? 'Alerts' : 'Notifikasi'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                    lineNumber: 1067,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                            lineNumber: 1065,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-3",
                                            children: alerts.slice(0, 3).map((alert)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `p-4 rounded-lg border-l-4 ${alert.type === 'error' ? 'bg-red-50 border-red-500' : alert.type === 'warning' ? 'bg-yellow-50 border-yellow-500' : 'bg-blue-50 border-blue-500'}`,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "font-medium text-gray-900 text-sm",
                                                                children: alert.message
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                                lineNumber: 1080,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>router.push(alert.link),
                                                                className: "text-xs px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors whitespace-nowrap ml-2",
                                                                children: alert.action
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                                lineNumber: 1081,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                        lineNumber: 1079,
                                                        columnNumber: 25
                                                    }, this)
                                                }, alert.id, false, {
                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                    lineNumber: 1071,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                            lineNumber: 1069,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                    lineNumber: 1064,
                                    columnNumber: 17
                                }, this),
                                todos.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-xl p-6 border border-gray-100 shadow-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                    className: "w-5 h-5 text-[var(--color-accent)]"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                    lineNumber: 1098,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-lg font-bold text-gray-900",
                                                    children: language === 'en' ? 'Action Items' : 'Hal yang Harus Dilakukan'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                    lineNumber: 1099,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                            lineNumber: 1097,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: todos.slice(0, 4).map((todo)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>router.push(todo.link),
                                                    className: "w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group text-left",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3 flex-1 min-w-0",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: `w-2 h-2 rounded-full flex-shrink-0 ${todo.priority === 'high' ? 'bg-red-500' : todo.priority === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'}`
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                                    lineNumber: 1109,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-gray-900 font-medium text-sm truncate",
                                                                    children: todo.text
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                                    lineNumber: 1114,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 1108,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                            className: "w-4 h-4 text-gray-400 group-hover:text-[var(--color-accent)] transition-colors flex-shrink-0"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 1116,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, todo.id, true, {
                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                    lineNumber: 1103,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                            lineNumber: 1101,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                    lineNumber: 1096,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 1061,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8",
                            children: [
                                topMenuItems.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-xl p-6 border border-gray-100 shadow-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 mb-5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$utensils$2d$crossed$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UtensilsCrossed$3e$__["UtensilsCrossed"], {
                                                    className: "w-5 h-5 text-[var(--color-accent)]"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                    lineNumber: 1130,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-lg font-bold text-gray-900",
                                                    children: language === 'en' ? 'Top Sellers' : 'Menu Terlaris'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                    lineNumber: 1131,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                            lineNumber: 1129,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-3",
                                            children: topMenuItems.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-semibold text-gray-900 text-sm",
                                                                    children: item.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                                    lineNumber: 1137,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-gray-600",
                                                                    children: [
                                                                        item.count,
                                                                        " ",
                                                                        language === 'en' ? 'sold' : 'terjual'
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                                    lineNumber: 1138,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 1136,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm font-bold text-[var(--color-accent)]",
                                                            children: formatCurrency(item.revenue)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 1140,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, idx, true, {
                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                    lineNumber: 1135,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                            lineNumber: 1133,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                    lineNumber: 1128,
                                    columnNumber: 17
                                }, this),
                                topTables.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-xl p-6 border border-gray-100 shadow-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 mb-5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"], {
                                                    className: "w-5 h-5 text-[var(--color-accent)]"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                    lineNumber: 1151,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-lg font-bold text-gray-900",
                                                    children: language === 'en' ? 'Top Tables' : 'Meja Populer'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                    lineNumber: 1152,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                            lineNumber: 1150,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-3",
                                            children: topTables.map((table, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-semibold text-gray-900 text-sm",
                                                                    children: [
                                                                        language === 'en' ? 'Table' : 'Meja',
                                                                        " ",
                                                                        table.tableNumber
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                                    lineNumber: 1158,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-gray-600",
                                                                    children: [
                                                                        table.orders,
                                                                        " ",
                                                                        language === 'en' ? 'orders' : 'pesanan'
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                                    lineNumber: 1159,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 1157,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm font-bold text-[var(--color-accent)]",
                                                            children: formatCurrency(table.revenue)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 1161,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, idx, true, {
                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                    lineNumber: 1156,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                            lineNumber: 1154,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                    lineNumber: 1149,
                                    columnNumber: 17
                                }, this),
                                topStaff.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-xl p-6 border border-gray-100 shadow-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 mb-5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                    className: "w-5 h-5 text-[var(--color-accent)]"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                    lineNumber: 1172,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-lg font-bold text-gray-900",
                                                    children: language === 'en' ? 'Top Staff' : 'Staf Terbaik'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                    lineNumber: 1173,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                            lineNumber: 1171,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-3",
                                            children: topStaff.map((member, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-semibold text-gray-900 text-sm",
                                                                    children: member.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                                    lineNumber: 1179,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-gray-600",
                                                                    children: [
                                                                        member.orders,
                                                                        " ",
                                                                        language === 'en' ? 'orders' : 'pesanan'
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                                    lineNumber: 1180,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 1178,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm font-bold text-[var(--color-accent)]",
                                                            children: formatCurrency(member.revenue)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 1182,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, idx, true, {
                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                    lineNumber: 1177,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                            lineNumber: 1175,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                    lineNumber: 1170,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 1125,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                lineNumber: 693,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(DashboardClient, "6lQNFehE5Ez77djiBbZ6h1Q0L3w=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"]
    ];
});
_c = DashboardClient;
var _c;
__turbopack_context__.k.register(_c, "DashboardClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_dashboard_dashboard-client_tsx_97fb2a06._.js.map