"use client"

import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Container } from "@/components/ui/container"
import { useLanguage } from "@/lib/i18n/context"
import { MockupCarousel } from "@/components/ui/mockup-carousel"

// Import all mockup components
import { TablesOverviewMockup, TableDetailMockup, TableReservationMockup, TableMergingMockup } from "@/components/mockups/tables-mockups"
import { OrdersListMockup, OrderDetailMockup, NewOrderMockup, KitchenDisplayMockup } from "@/components/mockups/orders-mockups"
import { MenuListMockup, MenuEditorMockup, MenuCategoriesMockup, MenuModifiersMockup } from "@/components/mockups/menu-mockups"
import { AnalyticsDashboardMockup, TopProductsMockup, SalesReportMockup, CustomerInsightsMockup } from "@/components/mockups/analytics-mockups"
import { StaffListMockup, StaffDetailMockup, AttendanceMockup, PerformanceMockup } from "@/components/mockups/staff-mockups"
import { PaymentCheckoutMockup, SplitBillMockup, QRISPaymentMockup, ReceiptMockup } from "@/components/mockups/payment-mockups"
import { InventoryListMockup, LowStockAlertMockup, StockHistoryMockup, PurchaseOrderMockup } from "@/components/mockups/inventory-mockups"
import { KitchenQueueMockup, OrderDetailKitchenMockup, ReadyItemsMockup, KitchenStatsMockup } from "@/components/mockups/kitchen-mockups"
import { QRMenuDisplayMockup, QRMenuCustomerMockup, QROrderCartMockup, QRAnalyticsMockup } from "@/components/mockups/qr-mockups"
import { PromoListMockup, CreatePromoMockup, ActivePromosMockup, PromoPerformanceMockup } from "@/components/mockups/promo-mockups"
import { CustomerListMockup, CustomerDetailMockup, LoyaltyProgramMockup, CustomerInsightsCRMMockup } from "@/components/mockups/crm-mockups"
import { GeneralSettingsMockup, StoreInfoMockup, UserProfileMockup, IntegrationsMockup } from "@/components/mockups/settings-mockups"
import { InteractiveThemeMockup, ThemeSelectionMockup, ColorPickerMockup, ThemePreviewMockup } from "@/components/mockups/theme-mockups"
import Link from "next/link"

// =============================================================================
// FEATURE SECTION WITH SCROLL TRACKING
// =============================================================================

interface Feature {
  title: string
  subtitle: string
  description: string
  mockups: React.ComponentType<{ color: string; language: string }>[]
  color: string
  slug: string
}

function FeatureSection({ feature, index }: { feature: Feature; index: number }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { language, t } = useLanguage()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100])

  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, y }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-32 ${
        isEven ? "" : "lg:flex-row-reverse"
      }`}
    >
      <div className={`space-y-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-4">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: feature.color }}></div>
            <span className="text-sm font-bold text-gray-700">{feature.subtitle}</span>
          </div>
          <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">{feature.title}</h3>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">{feature.description}</p>
          
          <motion.a
            href={`/features/${feature.slug}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] hover:from-[#E8484D] hover:to-[#7C3AED] text-white rounded-full font-bold shadow-lg transition-all"
          >
            {t.features.learnMore}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.a>
        </div>
      </div>

      <div className={isEven ? "lg:order-2" : "lg:order-1"}>
        <MockupCarousel mockups={feature.mockups} color={feature.color} language={language} />
      </div>
    </motion.div>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function RealUIFeatures() {
  const { language, t } = useLanguage()
  
  const features: Feature[] = [
    {
      title: t.features.realTimeOrder.title,
      subtitle: t.nav.orderManagement,
      description: t.features.realTimeOrder.description,
      mockups: [OrdersListMockup, OrderDetailMockup, NewOrderMockup, KitchenDisplayMockup],
      color: "#FF5A5F",
      slug: "orders",
    },
    {
      title: t.features.flexibleMenu.title,
      subtitle: t.nav.menuManagement,
      description: t.features.flexibleMenu.description,
      mockups: [MenuListMockup, MenuEditorMockup, MenuCategoriesMockup, MenuModifiersMockup],
      color: "#0066FF",
      slug: "menu",
    },
    {
      title: t.features.analyticsInsights.title,
      subtitle: t.nav.analytics,
      description: t.features.analyticsInsights.description,
      mockups: [AnalyticsDashboardMockup, TopProductsMockup, SalesReportMockup, CustomerInsightsMockup],
      color: "#00D4AA",
      slug: "analytics",
    },
    {
      title: t.features.teamManagement.title,
      subtitle: t.nav.staffManagement,
      description: t.features.teamManagement.description,
      mockups: [StaffListMockup, StaffDetailMockup, AttendanceMockup, PerformanceMockup],
      color: "#FFB020",
      slug: "staff",
    },
    {
      title: t.features.tableSystem.title,
      subtitle: t.nav.tableManagement,
      description: t.features.tableSystem.description,
      mockups: [TablesOverviewMockup, TableDetailMockup, TableReservationMockup, TableMergingMockup],
      color: "#8B5CF6",
      slug: "tables",
    },
    {
      title: t.features.multiPayment.title,
      subtitle: t.nav.paymentSystem,
      description: t.features.multiPayment.description,
      mockups: [PaymentCheckoutMockup, SplitBillMockup, QRISPaymentMockup, ReceiptMockup],
      color: "#EC4899",
      slug: "payment",
    },
    {
      title: t.features.inventoryControl.title,
      subtitle: t.nav.inventoryControl,
      description: t.features.inventoryControl.description,
      mockups: [InventoryListMockup, LowStockAlertMockup, StockHistoryMockup, PurchaseOrderMockup],
      color: "#10B981",
      slug: "inventory",
    },
    {
      title: t.features.kitchenDisplay.title,
      subtitle: t.nav.kitchenDisplay,
      description: t.features.kitchenDisplay.description,
      mockups: [KitchenQueueMockup, OrderDetailKitchenMockup, ReadyItemsMockup, KitchenStatsMockup],
      color: "#F59E0B",
      slug: "kitchen",
    },
    {
      title: t.features.qrMenu.title,
      subtitle: t.nav.qrMenu,
      description: t.features.qrMenu.description,
      mockups: [QRMenuDisplayMockup, QRMenuCustomerMockup, QROrderCartMockup, QRAnalyticsMockup],
      color: "#06B6D4",
      slug: "qr-menu",
    },
    {
      title: t.features.promoManager.title,
      subtitle: t.nav.promoManager,
      description: t.features.promoManager.description,
      mockups: [PromoListMockup, CreatePromoMockup, ActivePromosMockup, PromoPerformanceMockup],
      color: "#EF4444",
      slug: "promo",
    },
    {
      title: t.features.crmSystem.title,
      subtitle: t.nav.customerCRM,
      description: t.features.crmSystem.description,
      mockups: [CustomerListMockup, CustomerDetailMockup, LoyaltyProgramMockup, CustomerInsightsCRMMockup],
      color: "#3B82F6",
      slug: "crm",
    },
    {
      title: t.features.settings.title,
      subtitle: t.nav.systemSettings,
      description: t.features.settings.description,
      mockups: [GeneralSettingsMockup, StoreInfoMockup, UserProfileMockup, IntegrationsMockup],
      color: "#6366F1",
      slug: "settings",
    },
    {
      title: t.features.theme.title,
      subtitle: t.nav.themeCustomization,
      description: t.features.theme.description,
      mockups: [InteractiveThemeMockup, ThemeSelectionMockup, ColorPickerMockup, ThemePreviewMockup],
      color: "#9C27B0",
      slug: "theme",
    },
  ]

  return (
    <section className="py-20 sm:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <Container className="relative">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full mb-6">
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
              <span className="text-sm font-bold text-gray-900">
                {t.hero.realUiPreview}
              </span>
            </div>

            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              {t.hero.realUiTitle}
            </h2>

            <p className="text-xl sm:text-2xl leading-relaxed text-gray-600 max-w-2xl mx-auto">
              {t.hero.realUi}
            </p>
          </motion.div>
        </div>

        {/* Feature Sections */}
        <div className="max-w-7xl mx-auto">
          {features.slice(0, 6).map((feature, index) => (
            <FeatureSection key={index} feature={feature} index={index} />
          ))}

          {/* Cross-Platform Power Section */}
          <div className="my-32 -mx-4 sm:-mx-6 lg:-mx-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-screen"
              style={{ marginLeft: 'calc(-50vw + 50%)' }}
            >
              {/* Animated Background - Darker Base */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF5A5F]/20 via-[#8B5CF6]/20 to-[#3B82F6]/20" />
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
              
              {/* Floating Orbs */}
              <div className="absolute top-10 left-10 w-72 h-72 bg-[#FF5A5F]/30 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#8B5CF6]/30 rounded-full blur-3xl animate-pulse animation-delay-2000" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#3B82F6]/20 rounded-full blur-3xl" />
              
              <div className="relative py-20 md:py-28 px-6">
                <div className="max-w-6xl mx-auto">
                  {/* Main Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-center mb-8"
                  >
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-xl rounded-full border border-white/30 shadow-2xl">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="w-8 h-8 rounded-full bg-white flex items-center justify-center"
                      >
                        <span className="text-xl">⚡</span>
                      </motion.div>
                      <span className="text-white font-bold text-sm md:text-base">
                        {t.realUiFeatures.badge}
                      </span>
                    </div>
                  </motion.div>
                  
                  {/* Headline */}
                  <motion.h3
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-black text-center mb-6 text-white leading-tight"
                  >
                    {t.realUiFeatures.title}
                    <br />
                    <span className="bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] bg-clip-text text-transparent">
                      {t.realUiFeatures.titleHighlight}
                    </span>
                  </motion.h3>
                  
                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-xl md:text-2xl text-white/90 text-center mb-12 max-w-3xl mx-auto leading-relaxed"
                  >
                    {t.realUiFeatures.description}
                  </motion.p>
                  
                  {/* Device Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[
                      {
                        icon: "📱",
                        title: t.realUiFeatures.devices.mobile.title,
                        desc: t.realUiFeatures.devices.mobile.subtitle,
                        gradient: "from-pink-500 to-rose-500"
                      },
                      {
                        icon: "💻",
                        title: t.realUiFeatures.devices.web.title,
                        desc: t.realUiFeatures.devices.web.subtitle,
                        gradient: "from-blue-500 to-cyan-500"
                      },
                      {
                        icon: "🖥️",
                        title: t.realUiFeatures.devices.tablet.title,
                        desc: t.realUiFeatures.devices.tablet.subtitle,
                        gradient: "from-purple-500 to-indigo-500"
                      }
                    ].map((device, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="relative group"
                      >
                        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl text-center h-full">
                          {/* Icon */}
                          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${device.gradient} mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                            <span className="text-4xl">{device.icon}</span>
                          </div>
                          
                          {/* Title */}
                          <h4 className="text-2xl font-black text-white mb-2">
                            {device.title}
                          </h4>
                          
                          {/* Description */}
                          <p className="text-white/70 font-semibold">
                            {device.desc}
                          </p>
                          
                          {/* Checkmark */}
                          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full border border-green-400/30">
                            <span className="text-green-300 text-xl">✓</span>
                            <span className="text-green-300 font-bold text-sm">
                              {t.realUiFeatures.realTimeSync}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Stats Bar */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-wrap justify-center gap-8 md:gap-12 mb-12"
                  >
                    {[
                      { number: "< 50ms", label: t.realUiFeatures.stats.syncSpeed },
                      { number: "99.9%", label: t.realUiFeatures.stats.uptime },
                      { number: "24/7", label: t.realUiFeatures.stats.support }
                    ].map((stat, i) => (
                      <div key={i} className="text-center">
                        <div className="text-3xl md:text-4xl font-black text-white mb-1">
                          {stat.number}
                        </div>
                        <div className="text-white/70 font-semibold text-sm">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                  
                  {/* CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9 }}
                    className="text-center"
                  >
                    <p className="text-white/80 font-semibold mb-6 text-lg">
                      {t.realUiFeatures.cta.moreFeatures}
                    </p>
                    
                    <motion.div
                      animate={{ y: [0, 12, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="inline-flex flex-col items-center gap-3"
                    >
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center border border-white/30">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </div>
                      <span className="text-sm font-bold text-white/60 uppercase tracking-wider">
                        {t.realUiFeatures.cta.keepScrolling}
                      </span>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          {features.slice(6).map((feature, index) => (
            <FeatureSection key={index + 6} feature={feature} index={index + 6} />
          ))}
        </div>
      </Container>
    </section>
  )
}
