module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/lib/i18n/translations.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "translations",
    ()=>translations
]);
const translations = {
    en: {
        nav: {
            features: "Features",
            pricing: "Pricing",
            about: "About",
            contact: "Contact",
            docs: "Documentation",
            login: "Log in",
            getDemo: "Try Demo"
        },
        hero: {
            title: "Streamline Your Business with",
            titleHighlight: "Smart POS",
            subtitle: "KadaiPOS is the all-in-one point of sale solution for restaurants, cafes, and retail stores. Increase efficiency, delight customers, and grow your business.",
            getStarted: "Get Started",
            watchDemo: "Watch Demo"
        },
        features: {
            sectionTitle: "Everything you need",
            title: "All-in-one business management",
            subtitle: "Powerful features designed to help you run your business more efficiently and profitably.",
            fastOrder: {
                title: "Fast Order Processing",
                description: "Lightning-fast order entry with intuitive interface. Serve more customers in less time."
            },
            inventory: {
                title: "Inventory Management",
                description: "Real-time inventory tracking. Never run out of stock or over-order again."
            },
            analytics: {
                title: "Advanced Analytics",
                description: "Detailed reports and insights to help you make data-driven decisions."
            },
            customer: {
                title: "Customer Management",
                description: "Build customer loyalty with integrated CRM and rewards programs."
            },
            payment: {
                title: "Multiple Payment Options",
                description: "Accept all major payment methods including contactless and mobile payments."
            },
            mobile: {
                title: "Mobile Ready",
                description: "Manage your business from anywhere with our mobile app."
            }
        },
        cta: {
            title: "Ready to transform your business?",
            subtitle: "Join thousands of businesses already using KadaiPOS. Start your free trial today, no credit card required.",
            startTrial: "Start Free Trial",
            talkSales: "Talk to Sales"
        },
        footer: {
            description: "Modern point of sale system for restaurants, cafes, and retail stores. Streamline your operations and delight your customers.",
            product: "Product",
            company: "Company",
            legal: "Legal"
        }
    },
    id: {
        nav: {
            features: "Fitur",
            pricing: "Harga",
            about: "Tentang",
            contact: "Kontak",
            docs: "Dokumentasi",
            login: "Masuk",
            getDemo: "Coba Demo"
        },
        hero: {
            title: "Tingkatkan Bisnis Anda dengan",
            titleHighlight: "POS Pintar",
            subtitle: "KadaiPOS adalah solusi point of sale lengkap untuk restoran, kafe, dan toko retail. Tingkatkan efisiensi, puaskan pelanggan, dan kembangkan bisnis Anda.",
            getStarted: "Mulai Sekarang",
            watchDemo: "Lihat Demo"
        },
        features: {
            sectionTitle: "Semua yang Anda butuhkan",
            title: "Manajemen bisnis lengkap",
            subtitle: "Fitur-fitur canggih yang dirancang untuk membantu Anda menjalankan bisnis dengan lebih efisien dan menguntungkan.",
            fastOrder: {
                title: "Pemrosesan Pesanan Cepat",
                description: "Entri pesanan super cepat dengan antarmuka intuitif. Layani lebih banyak pelanggan dalam waktu singkat."
            },
            inventory: {
                title: "Manajemen Inventori",
                description: "Pelacakan inventori real-time. Tidak akan pernah kehabisan stok atau memesan berlebihan lagi."
            },
            analytics: {
                title: "Analitik Canggih",
                description: "Laporan dan wawasan terperinci untuk membantu Anda membuat keputusan berbasis data."
            },
            customer: {
                title: "Manajemen Pelanggan",
                description: "Bangun loyalitas pelanggan dengan CRM terintegrasi dan program reward."
            },
            payment: {
                title: "Berbagai Opsi Pembayaran",
                description: "Terima semua metode pembayaran utama termasuk pembayaran contactless dan mobile."
            },
            mobile: {
                title: "Siap Mobile",
                description: "Kelola bisnis Anda dari mana saja dengan aplikasi mobile kami."
            }
        },
        cta: {
            title: "Siap mentransformasi bisnis Anda?",
            subtitle: "Bergabunglah dengan ribuan bisnis yang sudah menggunakan KadaiPOS. Mulai uji coba gratis hari ini, tanpa kartu kredit.",
            startTrial: "Mulai Uji Coba Gratis",
            talkSales: "Hubungi Sales"
        },
        footer: {
            description: "Sistem point of sale modern untuk restoran, kafe, dan toko retail. Sederhanakan operasi Anda dan puaskan pelanggan Anda.",
            product: "Produk",
            company: "Perusahaan",
            legal: "Legal"
        }
    }
};
}),
"[project]/src/lib/i18n/context.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LanguageProvider",
    ()=>LanguageProvider,
    "useLanguage",
    ()=>useLanguage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$translations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/i18n/translations.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const LanguageContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function LanguageProvider({ children }) {
    const [language, setLanguageState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("id");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Load language from localStorage
        const savedLang = localStorage.getItem("language");
        if (savedLang && (savedLang === "en" || savedLang === "id")) {
            setLanguageState(savedLang);
        }
    }, []);
    const setLanguage = (lang)=>{
        setLanguageState(lang);
        localStorage.setItem("language", lang);
    };
    const value = {
        language,
        setLanguage,
        t: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$translations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["translations"][language]
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/lib/i18n/context.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
function useLanguage() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
}),
"[project]/src/lib/supabase/client.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-ssr] (ecmascript)");
;
function createClient() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createBrowserClient"])(("TURBOPACK compile-time value", "https://bigjlzrnlzcfxwlkstpp.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpZ2psenJubHpjZnh3bGtzdHBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3MTMxNTQsImV4cCI6MjA3ODI4OTE1NH0.TL7-xrvu1FHwawVaW3XhTztPO37v45Uq9v-kQKFRev0"));
}
}),
"[project]/src/contexts/ThemeContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider,
    "useTheme",
    ()=>useTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/client.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const DEFAULT_PRIMARY_COLOR = '#FF5A5F';
function ThemeProvider({ children }) {
    const [primaryColor, setPrimaryColorState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(DEFAULT_PRIMARY_COLOR);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        loadThemeColor();
        // Listen for restaurant changes
        const handleStorageChange = (e)=>{
            if (e.key === 'selected_restaurant_id') {
                loadThemeColor();
            }
        };
        // Listen for custom event when restaurant is changed in same tab
        const handleRestaurantChange = ()=>{
            loadThemeColor();
        };
        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('restaurantChanged', handleRestaurantChange);
        return ()=>{
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('restaurantChanged', handleRestaurantChange);
        };
    }, []);
    const loadThemeColor = async ()=>{
        try {
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
            // Get current user
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                setIsLoading(false);
                return;
            }
            // First, try to get from selected restaurant (most reliable source)
            const selectedRestaurantId = localStorage.getItem('selected_restaurant_id');
            if (selectedRestaurantId) {
                const { data: restaurant, error: restaurantError } = await supabase.from('restaurants').select('primary_color').eq('id', selectedRestaurantId).maybeSingle();
                if (!restaurantError && restaurant?.primary_color) {
                    setPrimaryColorState(restaurant.primary_color);
                    updateCSSVariables(restaurant.primary_color);
                    setIsLoading(false);
                    return;
                }
            }
            // Try to get primary color from user_profiles (if column exists)
            try {
                const { data: profile, error: profileError } = await supabase.from('user_profiles').select('primary_color').eq('id', user.id).maybeSingle();
                if (!profileError && profile?.primary_color) {
                    setPrimaryColorState(profile.primary_color);
                    updateCSSVariables(profile.primary_color);
                    setIsLoading(false);
                    return;
                }
            } catch (err) {
                // Column might not exist, continue with default
                console.log('primary_color column not found in user_profiles, using default');
            }
            // Use default color
            updateCSSVariables(DEFAULT_PRIMARY_COLOR);
            setIsLoading(false);
        } catch (error) {
            console.error('Error loading theme color:', error);
            updateCSSVariables(DEFAULT_PRIMARY_COLOR);
            setIsLoading(false);
        }
    };
    const updateCSSVariables = (color)=>{
        // Update CSS variables dynamically
        document.documentElement.style.setProperty('--color-accent', color);
        // Generate hover color (slightly darker)
        const hoverColor = adjustColorBrightness(color, -10);
        document.documentElement.style.setProperty('--color-accent-hover', hoverColor);
        // Generate light color (very light version)
        const lightColor = adjustColorBrightness(color, 40);
        document.documentElement.style.setProperty('--color-accent-light', lightColor);
    };
    const setPrimaryColor = async (color)=>{
        try {
            setPrimaryColorState(color);
            updateCSSVariables(color);
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                // Save to user_profiles
                await supabase.from('user_profiles').upsert({
                    id: user.id,
                    primary_color: color
                });
            }
        } catch (error) {
            console.error('Error saving primary color:', error);
        }
    };
    const value = {
        primaryColor,
        setPrimaryColor,
        isLoading
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/ThemeContext.tsx",
        lineNumber: 144,
        columnNumber: 5
    }, this);
}
function useTheme() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
}
// Helper function to adjust color brightness
function adjustColorBrightness(color, percent) {
    // Remove # if present
    let hex = color.replace('#', '');
    // Convert to RGB
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    // Adjust brightness
    r = Math.min(255, Math.max(0, r + r * percent / 100));
    g = Math.min(255, Math.max(0, g + g * percent / 100));
    b = Math.min(255, Math.max(0, b + b * percent / 100));
    // Convert back to hex
    const rr = Math.round(r).toString(16).padStart(2, '0');
    const gg = Math.round(g).toString(16).padStart(2, '0');
    const bb = Math.round(b).toString(16).padStart(2, '0');
    return `#${rr}${gg}${bb}`;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e7e61e8b._.js.map