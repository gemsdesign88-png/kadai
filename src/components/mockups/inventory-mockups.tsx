"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { getMockupTranslator } from "./mockup-i18n"

export function InventoryListMockup({ color, language }: { color: string; language: string }) {
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
          <h3 className="text-2xl font-bold text-gray-900">{t('Inventory Management', 'Manajemen Inventaris', '库存管理')}</h3>
          <p className="text-sm text-gray-600 mt-1">45 {t('items', 'item', '项目')}</p>
        </div>

        <div className="space-y-3">
          {[
            { name: t('Rice', 'Beras', '大米'), stock: 50, unit: 'kg', status: 'good', icon: '🌾' },
            { name: t('Chicken', 'Ayam', '鸡肉'), stock: 8, unit: 'kg', status: 'low', icon: '🍗' },
            { name: t('Cooking Oil', 'Minyak Goreng', '食用油'), stock: 25, unit: 'L', status: 'good', icon: '🛢️' },
            { name: t('Chili', 'Cabai', '辣椒'), stock: 2, unit: 'kg', status: 'critical', icon: '🌶️' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl p-4 shadow-md border border-gray-100 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                  {item.icon}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.stock} {item.unit}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                item.status === 'good' ? 'bg-green-100 text-green-700' :
                item.status === 'low' ? 'bg-amber-100 text-amber-700' :
                'bg-red-100 text-red-700'
              }`}>
                {item.status === 'good' ? t('Good', 'Baik', '良好') :
                 item.status === 'low' ? t('Low Stock', 'Stok Rendah', '库存不足') :
                 t('Out of Stock', 'Stok Habis', '缺货')}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function LowStockAlertMockup({ color, language }: { color: string; language: string }) {
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
          <h3 className="text-2xl font-bold text-gray-900">{t('Low Stock Alert', 'Peringatan Stok Rendah', '库存不足警报')}</h3>
          <p className="text-sm text-gray-600 mt-1">5 {t('items low stock', 'item stok rendah', '个项目库存不足')}</p>
        </div>

        <div className="space-y-3">
          {[
            { name: t('Chili', 'Cabai', '辣椒'), current: 2, min: 5, unit: 'kg', priority: 'high' },
            { name: t('Chicken', 'Ayam', '鸡肉'), current: 8, min: 15, unit: 'kg', priority: 'medium' },
            { name: t('Flour', 'Tepung', '面粉'), current: 3, min: 10, unit: 'kg', priority: 'medium' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-xl p-4 shadow-md border-2 ${
                item.priority === 'high' ? 'bg-red-50 border-red-300' : 'bg-amber-50 border-amber-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-bold text-gray-900">{item.name}</p>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  item.priority === 'high' ? 'bg-red-200 text-red-800' : 'bg-amber-200 text-amber-800'
                }`}>
                  {item.priority === 'high' ? t('Urgent', 'Penting', '紧急') : t('Low Stock', 'Stok Rendah', '库存不足')}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-700">{t('Current', 'Saat Ini', '当前')}: {item.current} {item.unit}</span>
                <span className="text-gray-700">{t('Min Qty', 'Min Qty', '最小数量')}: {item.min} {item.unit}</span>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${item.priority === 'high' ? 'bg-red-600' : 'bg-amber-600'}`}
                  style={{ width: `${(item.current / item.min) * 100}%` }}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>

        <button className="w-full mt-6 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-bold shadow-lg">
          {t('Create Purchase Order', 'Buat Pesanan Pembelian', '创建采购订单')}
        </button>
      </div>
    </div>
  )
}

export function StockHistoryMockup({ color, language }: { color: string; language: string }) {
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
          <h3 className="text-2xl font-bold text-gray-900">{t('Stock History', 'Riwayat Stok', '库存历史')}</h3>
          <p className="text-sm text-gray-600 mt-1">{t('Rice', 'Beras', '大米')} - {t('Last 7 Days', '7 Hari Terakhir', '过去7天')}</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 mb-4">
          <div className="flex items-end justify-between h-32 gap-2">
            {[45, 42, 50, 48, 52, 50, 50].map((value, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(value / 52) * 100}%` }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-lg"
                ></motion.div>
                <span className="text-xs text-gray-600">{i === 6 ? t('Today', 'Hari Ini', '今日') : `${i + 1}`}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {[
            { date: 'Dec 3', type: 'in', amount: '+20 kg', note: t('Purchase', 'Pembelian', '采购') },
            { date: 'Dec 2', type: 'out', amount: '-8 kg', note: t('Usage', 'Penggunaan', '使用') },
            { date: 'Dec 1', type: 'out', amount: '-12 kg', note: t('Usage', 'Penggunaan', '使用') },
          ].map((record, i) => (
            <div key={i} className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-900">{record.date}</p>
                <p className="text-xs text-gray-600">{record.note}</p>
              </div>
              <span className={`font-bold ${record.type === 'in' ? 'text-green-600' : 'text-red-600'}`}>
                {record.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function PurchaseOrderMockup({ color, language }: { color: string; language: string }) {
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
          <h3 className="text-2xl font-bold text-gray-900">{t('Purchase Orders', 'Pesanan Pembelian', '采购订单')}</h3>
          <p className="text-sm text-gray-600 mt-1">PO-2025-001</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 mb-4">
          <p className="text-xs text-gray-600 mb-3">{t('Items to Order', 'Item untuk Dipesan', '待订购项目')}</p>
          <div className="space-y-3">
            {[
              { name: t('Chili', 'Cabai', '辣椒'), qty: 10, unit: 'kg', price: 50000 },
              { name: t('Chicken', 'Ayam', '鸡肉'), qty: 20, unit: 'kg', price: 200000 },
              { name: t('Flour', 'Tepung', '面粉'), qty: 15, unit: 'kg', price: 75000 },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-900 text-sm">{item.name}</p>
                  <p className="text-xs text-gray-600">{item.qty} {item.unit}</p>
                </div>
                <span className="font-bold text-gray-900">Rp {item.price.toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 mt-3 pt-3 flex items-center justify-between">
            <span className="font-bold text-gray-900">{t('Total Value', 'Total Nilai', '总价值')}</span>
            <span className="text-xl font-bold text-green-600">Rp 325.000</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 mb-4">
          <p className="text-xs text-gray-600 mb-2">{t('Supplier', 'Pemasok', '供应商')}</p>
          <p className="font-bold text-gray-900">CV Bahan Makanan Segar</p>
          <p className="text-xs text-gray-600 mt-1">{t('Expected Delivery', 'Estimasi Pengiriman', '预计送达')}: Dec 5, 2025</p>
        </div>

        <button className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-bold shadow-lg">
          {t('Submit Order', 'Kirim Pesanan', '提交订单')}
        </button>
      </div>
    </div>
  )
}
