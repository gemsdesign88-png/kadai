"use client"
import * as React from "react"
import { motion } from "framer-motion"
import { getMockupTranslator } from "./mockup-i18n"

export function PromoListMockup({ color, language }: { color: string; language: string }) {
  const t = getMockupTranslator(language)
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative aspect-[4/5] rounded-3xl p-8 shadow-2xl border" style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`, borderColor: `${color}30` }}>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{t('Manage Promos', 'Kelola Promo', '管理促销')}</h3>
          <p className="text-sm text-gray-600 mt-1">4 {t('active promos', 'promo aktif', '活跃促销')}</p>
        </div>
        <div className="space-y-3">
          {[
            { name: t('Weekend Special 20%', 'Spesial Weekend 20%', '周末特惠 20%'), discount: '20%', used: 45, status: 'active', color: 'from-red-500 to-pink-500' },
            { name: t('Buy 2 Get 1', 'Beli 2 Gratis 1', '买二送一'), discount: 'BOGO', used: 23, status: 'active', color: 'from-blue-500 to-cyan-500' },
            { name: t('New Customer 15%', 'Pelanggan Baru 15%', '新客户 15%'), discount: '15%', used: 12, status: 'active', color: 'from-green-500 to-emerald-500' },
          ].map((promo, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-4 shadow-md border border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${promo.color} text-white text-xs font-bold mb-2`}>{promo.discount}</div>
                  <p className="font-bold text-gray-900">{promo.name}</p>
                  <p className="text-sm text-gray-600 mt-1">{promo.used} {t('times used', 'kali digunakan', '次使用')}</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">{t('Active', 'Aktif', '活跃')}</span>
              </div>
            </motion.div>
          ))}
        </div>
        <button className="w-full mt-6 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl font-bold shadow-lg">
          + {t('Create New Promo', 'Buat Promo Baru', '创建新促销')}
        </button>
      </div>
    </div>
  )
}

export function CreatePromoMockup({ color, language }: { color: string; language: string }) {
  const t = getMockupTranslator(language)
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative aspect-[4/5] rounded-3xl p-8 shadow-2xl border" style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`, borderColor: `${color}30` }}>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{t('Create Promo', 'Buat Promo', '创建促销')}</h3>
          <p className="text-sm text-gray-600 mt-1">{t('New promotion', 'Promosi baru', '新促销活动')}</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-600 mb-2 block">{t('Promo Name', 'Nama Promo', '促销名称')}</label>
            <div className="bg-white rounded-xl p-3 border-2 border-red-200">
              <p className="font-semibold text-gray-900">{t('Weekend Special', 'Spesial Weekend', '周末特惠')}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-gray-600 mb-2 block">{t('Discount Type', 'Tipe Diskon', '折扣类型')}</label>
              <div className="bg-white rounded-xl p-3 border-2 border-red-200">
                <p className="font-semibold text-gray-900">{t('Percentage', 'Persentase', '百分比')}</p>
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-600 mb-2 block">{t('Value', 'Nilai', '数值')}</label>
              <div className="bg-white rounded-xl p-3 border-2 border-red-200">
                <p className="font-semibold text-gray-900">20%</p>
              </div>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 mb-2 block">{t('Valid Period', 'Periode Berlaku', '有效期')}</label>
            <div className="bg-white rounded-xl p-3 border-2 border-red-200">
              <p className="text-sm text-gray-900">Dec 7-8, 2025</p>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 mb-2 block">{t('Applicable To', 'Berlaku Untuk', '适用于')}</label>
            <div className="grid grid-cols-2 gap-2">
              {[t('All Items', 'Semua Item', '所有商品'), t('Food Only', 'Makanan Saja', '仅限食物')].map((opt, i) => (
                <div key={i} className={`p-3 rounded-xl border-2 text-center text-sm font-bold ${i === 0 ? 'bg-red-50 border-red-500 text-red-700' : 'bg-white border-gray-200 text-gray-600'}`}>
                  {opt}
                </div>
              ))}
            </div>
          </div>
        </div>
        <button className="w-full mt-6 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl font-bold shadow-lg">
          {t('Create Promo', 'Buat Promo', '创建促销')}
        </button>
      </div>
    </div>
  )
}

export function ActivePromosMockup({ color, language }: { color: string; language: string }) {
  const t = getMockupTranslator(language)
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative aspect-[4/5] rounded-3xl p-8 shadow-2xl border" style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`, borderColor: `${color}30` }}>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{t('Active Promos', 'Promo Aktif', '活跃促销')}</h3>
          <p className="text-sm text-gray-600 mt-1">{t('Customer View', 'Tampilan Pelanggan', '客户视图')}</p>
        </div>
        <div className="space-y-4">
          {[
            { name: t('Weekend Special', 'Spesial Weekend', '周末特惠'), discount: '20%', desc: t('Get 20% off all food items', 'Diskon 20% semua makanan', '所有食物享受 20% 折扣'), color: 'from-red-500 to-pink-500', icon: '🎉' },
            { name: t('Buy 2 Get 1', 'Beli 2 Gratis 1', '买二送一'), discount: 'BOGO', desc: t('Buy 2 drinks, get 1 free', 'Beli 2 minuman gratis 1', '买两杯饮料，送一杯'), color: 'from-blue-500 to-cyan-500', icon: '🥤' },
          ].map((promo, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
              className={`rounded-2xl p-5 shadow-lg bg-gradient-to-br ${promo.color} text-white relative overflow-hidden`}>
              <div className="absolute top-0 right-0 text-6xl opacity-20">{promo.icon}</div>
              <div className="relative z-10">
                <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold mb-2">{promo.discount}</div>
                <p className="font-bold text-xl mb-2">{promo.name}</p>
                <p className="text-sm opacity-90">{promo.desc}</p>
                <button className="mt-3 px-4 py-2 bg-white text-gray-900 rounded-lg font-bold text-sm">
                  {t('Apply Now', 'Gunakan Sekarang', '立即应用')}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function PromoPerformanceMockup({ color, language }: { color: string; language: string }) {
  const t = getMockupTranslator(language)
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative aspect-[4/5] rounded-3xl p-8 shadow-2xl border" style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`, borderColor: `${color}30` }}>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{t('Promo Performance', 'Performa Promo', '促销表现')}</h3>
          <p className="text-sm text-gray-600 mt-1">{t('This month', 'Bulan ini', '本月')}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { label: t('Total Used', 'Total Digunakan', '总使用次数'), value: '156' },
            { label: t('Revenue', 'Pendapatan', '收入'), value: 'Rp 8.5M' },
            { label: t('Avg Discount', 'Diskon Rata-rata', '平均折扣'), value: '18%' },
            { label: t('New Customers', 'Pelanggan Baru', '新客户'), value: '45' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-red-600">{stat.value}</p>
            </div>
          ))}
        </div>
        <div className="space-y-3">
          <p className="font-bold text-gray-900">{t('Top Performing Promos', 'Promo Terlaris', '表现最佳的促销')}</p>
          {[
            { name: t('Weekend Special 20%', 'Spesial Weekend 20%', '周末特惠 20%'), uses: 45, revenue: '3.2M' },
            { name: t('Buy 2 Get 1', 'Beli 2 Gratis 1', '买二送一'), uses: 38, revenue: '2.8M' },
            { name: t('New Customer 15%', 'Pelanggan Baru 15%', '新客户 15%'), uses: 28, revenue: '1.9M' },
          ].map((promo, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <p className="font-bold text-gray-900 text-sm flex-1">{promo.name}</p>
                <span className="text-xs font-bold text-red-600">Rp {promo.revenue}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>{promo.uses} {t('uses', 'kali', '次使用')}</span>
                <div className="w-24 bg-gray-200 rounded-full h-1.5">
                  <div className="bg-red-600 h-1.5 rounded-full" style={{ width: `${(promo.uses / 45) * 100}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}