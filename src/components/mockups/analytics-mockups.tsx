"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { getMockupTranslator } from "./mockup-i18n"

// Mockup 1: Revenue Dashboard
export function AnalyticsDashboardMockup({ color, language }: { color: string; language: string }) {
  const t = getMockupTranslator(language)
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className="relative aspect-[4/5] rounded-3xl p-8 shadow-2xl border"
        style={{
          background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
          borderColor: `${color}30`,
        }}
      >
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{t('Analytics', 'Analitik', '分析')}</h3>
          <p className="text-sm text-gray-600 mt-1">{t('Today', 'Hari Ini', '今日')}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { label: t('Revenue', 'Pendapatan', '收入'), value: 'Rp 2.4M', change: '+12%', color: 'text-green-600' },
            { label: t('Orders', 'Pesanan', '订单'), value: '48', change: '+8%', color: 'text-green-600' },
            { label: t('Avg Order', 'Rata-rata', '平均订单'), value: 'Rp 50k', change: '+4%', color: 'text-green-600' },
            { label: t('Customers', 'Pelanggan', '客户'), value: '32', change: '-2%', color: 'text-red-600' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl p-4 shadow-md border border-gray-100"
            >
              <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
              <p className="text-xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className={`text-xs font-bold ${stat.color}`}>{stat.change}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
          <p className="font-bold text-gray-900 mb-4">{t('Revenue Trend', 'Tren Pendapatan', '收入趋势')}</p>
          <div className="flex items-end justify-between h-32 gap-2">
            {[60, 80, 65, 90, 75, 95, 85].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-lg"
                ></motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Mockup 2: Top Products
export function TopProductsMockup({ color, language }: { color: string; language: string }) {
  const t = getMockupTranslator(language)
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className="relative aspect-[4/5] rounded-3xl p-8 shadow-2xl border"
        style={{
          background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
          borderColor: `${color}30`,
        }}
      >
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{t('Top Products', 'Produk Terlaris', '热门产品')}</h3>
          <p className="text-sm text-gray-600 mt-1">{t('This week', 'Minggu ini', '本周')}</p>
        </div>

        <div className="space-y-3">
          {[
            { name: t('Special Fried Rice', 'Nasi Goreng Spesial', '特别炒饭'), sold: 156, revenue: '3.9M', icon: '🍚', rank: 1 },
            { name: t('Fried Noodles', 'Mie Goreng', '炒面'), sold: 124, revenue: '2.7M', icon: '🍜', rank: 2 },
            { name: t('Sweet Iced Tea', 'Es Teh Manis', '甜冰茶'), sold: 203, revenue: '1.0M', icon: '🥤', rank: 3 },
            { name: t('Grilled Chicken', 'Ayam Bakar', '烤鸡'), sold: 89, revenue: '3.1M', icon: '🍗', rank: 4 },
          ].map((product, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl p-4 shadow-md border border-gray-100 flex items-center gap-4"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
                i === 0 ? 'bg-yellow-100 text-yellow-700' :
                i === 1 ? 'bg-gray-100 text-gray-700' :
                i === 2 ? 'bg-orange-100 text-orange-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {product.rank}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{product.icon}</span>
                  <p className="font-bold text-gray-900">{product.name}</p>
                </div>
                <p className="text-xs text-gray-600">{product.sold} {t('sold', 'terjual', '已售')} • Rp {product.revenue}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Mockup 3: Sales Report
export function SalesReportMockup({ color, language }: { color: string; language: string }) {
  const t = getMockupTranslator(language)
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className="relative aspect-[4/5] rounded-3xl p-8 shadow-2xl border"
        style={{
          background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
          borderColor: `${color}30`,
        }}
      >
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{t('Sales Report', 'Laporan Penjualan', '销售报告')}</h3>
          <p className="text-sm text-gray-600 mt-1">{t('November 2025', 'November 2025', '2025年11月')}</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100 mb-4">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600 mb-1">{t('Total Revenue', 'Total Pendapatan', '总收入')}</p>
            <p className="text-3xl font-black text-green-600">Rp 68.5M</p>
          </div>
          
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200">
            <div className="text-center">
              <p className="text-xs text-gray-600 mb-1">{t('Orders', 'Pesanan', '订单')}</p>
              <p className="text-lg font-bold text-gray-900">1,248</p>
            </div>
            <div className="text-center border-x border-gray-200">
              <p className="text-xs text-gray-600 mb-1">{t('Avg', 'Rata-rata', '平均')}</p>
              <p className="text-lg font-bold text-gray-900">55k</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-600 mb-1">{t('Growth', 'Pertumbuhan', '增长')}</p>
              <p className="text-lg font-bold text-green-600">+18%</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {[
            { period: t('Week 1', 'Minggu 1', '第1周'), amount: '15.2M', percentage: 85 },
            { period: t('Week 2', 'Minggu 2', '第2周'), amount: '18.4M', percentage: 100 },
            { period: t('Week 3', 'Minggu 3', '第3周'), amount: '16.8M', percentage: 92 },
            { period: t('Week 4', 'Minggu 4', '第4周'), amount: '18.1M', percentage: 98 },
          ].map((week, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl p-3 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-gray-900">{week.period}</span>
                <span className="text-sm font-bold text-green-600">Rp {week.amount}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${week.percentage}%` }}
                  transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
                  className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Mockup 4: Customer Insights
export function CustomerInsightsMockup({ color, language }: { color: string; language: string }) {
  const t = getMockupTranslator(language)
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className="relative aspect-[4/5] rounded-3xl p-8 shadow-2xl border"
        style={{
          background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
          borderColor: `${color}30`,
        }}
      >
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{t('Customer Insights', 'Insight Pelanggan', '客户洞察')}</h3>
          <p className="text-sm text-gray-600 mt-1">{t('This month', 'Bulan ini', '本月')}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
            <p className="text-xs text-gray-600 mb-2">{t('New Customers', 'Pelanggan Baru', '新客户')}</p>
            <p className="text-2xl font-bold text-green-600">124</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
            <p className="text-xs text-gray-600 mb-2">{t('Returning', 'Pelanggan Lama', '老客户')}</p>
            <p className="text-2xl font-bold text-blue-600">856</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 mb-4">
          <p className="font-bold text-gray-900 mb-3">{t('Peak Hours', 'Jam Sibuk', '高峰时段')}</p>
          <div className="space-y-2">
            {[
              { time: '12:00-13:00', visitors: 45, percentage: 90 },
              { time: '18:00-19:00', visitors: 52, percentage: 100 },
              { time: '19:00-20:00', visitors: 38, percentage: 75 },
            ].map((hour, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-gray-700">{hour.time}</span>
                  <span className="text-xs font-bold text-green-600">{hour.visitors} {t('visitors', 'pengunjung', '访客')}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-gradient-to-r from-green-500 to-green-600 h-1.5 rounded-full"
                    style={{ width: `${hour.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
          <p className="font-bold text-gray-900 mb-3">{t('Avg Visit Duration', 'Durasi Kunjungan', '平均访问时长')}</p>
          <div className="text-center">
            <p className="text-4xl font-black text-green-600">42</p>
            <p className="text-sm text-gray-600 mt-1">{t('minutes', 'menit', '分钟')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

