"use client"

import * as React from "react"
import { motion } from "framer-motion"

export function InventoryListMockup({ color, language }: { color: string; language: string }) {
  const isEnglish = language === 'en'
  
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
          <h3 className="text-2xl font-bold text-gray-900">{isEnglish ? 'Stock Management' : 'Manajemen Stok'}</h3>
          <p className="text-sm text-gray-600 mt-1">45 {isEnglish ? 'items' : 'item'}</p>
        </div>

        <div className="space-y-3">
          {[
            { name: 'Beras', stock: 50, unit: 'kg', status: 'good', icon: '🌾' },
            { name: 'Ayam', stock: 8, unit: 'kg', status: 'low', icon: '🍗' },
            { name: 'Minyak Goreng', stock: 25, unit: 'L', status: 'good', icon: '🛢️' },
            { name: 'Cabai', stock: 2, unit: 'kg', status: 'critical', icon: '🌶️' },
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
                {item.status === 'good' ? (isEnglish ? 'Good' : 'Baik') :
                 item.status === 'low' ? (isEnglish ? 'Low' : 'Rendah') :
                 (isEnglish ? 'Critical' : 'Kritis')}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function LowStockAlertMockup({ color, language }: { color: string; language: string }) {
  const isEnglish = language === 'en'
  
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
          <h3 className="text-2xl font-bold text-gray-900">{isEnglish ? 'Low Stock Alerts' : 'Peringatan Stok'}</h3>
          <p className="text-sm text-gray-600 mt-1">5 {isEnglish ? 'items need attention' : 'item perlu perhatian'}</p>
        </div>

        <div className="space-y-3">
          {[
            { name: 'Cabai', current: 2, min: 5, unit: 'kg', priority: 'high' },
            { name: 'Ayam', current: 8, min: 15, unit: 'kg', priority: 'medium' },
            { name: 'Tepung', current: 3, min: 10, unit: 'kg', priority: 'medium' },
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
                  {item.priority === 'high' ? (isEnglish ? 'URGENT' : 'URGENT') : (isEnglish ? 'Low' : 'Rendah')}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-700">{isEnglish ? 'Current:' : 'Saat ini:'} {item.current} {item.unit}</span>
                <span className="text-gray-700">{isEnglish ? 'Min:' : 'Min:'} {item.min} {item.unit}</span>
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
          {isEnglish ? 'Create Purchase Order' : 'Buat Order Pembelian'}
        </button>
      </div>
    </div>
  )
}

export function StockHistoryMockup({ color, language }: { color: string; language: string }) {
  const isEnglish = language === 'en'
  
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
          <h3 className="text-2xl font-bold text-gray-900">{isEnglish ? 'Stock History' : 'Riwayat Stok'}</h3>
          <p className="text-sm text-gray-600 mt-1">Beras - {isEnglish ? 'Last 7 days' : '7 hari terakhir'}</p>
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
                <span className="text-xs text-gray-600">{i === 6 ? (isEnglish ? 'Today' : 'Hari ini') : `${i + 1}`}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {[
            { date: 'Dec 3', type: 'in', amount: '+20 kg', note: isEnglish ? 'Purchase' : 'Pembelian' },
            { date: 'Dec 2', type: 'out', amount: '-8 kg', note: isEnglish ? 'Usage' : 'Pemakaian' },
            { date: 'Dec 1', type: 'out', amount: '-12 kg', note: isEnglish ? 'Usage' : 'Pemakaian' },
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
  const isEnglish = language === 'en'
  
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
          <h3 className="text-2xl font-bold text-gray-900">{isEnglish ? 'Purchase Order' : 'Order Pembelian'}</h3>
          <p className="text-sm text-gray-600 mt-1">PO-2025-001</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 mb-4">
          <p className="text-xs text-gray-600 mb-3">{isEnglish ? 'Items to Order' : 'Item yang Dipesan'}</p>
          <div className="space-y-3">
            {[
              { name: 'Cabai', qty: 10, unit: 'kg', price: 50000 },
              { name: 'Ayam', qty: 20, unit: 'kg', price: 200000 },
              { name: 'Tepung', qty: 15, unit: 'kg', price: 75000 },
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
            <span className="font-bold text-gray-900">Total</span>
            <span className="text-xl font-bold text-green-600">Rp 325.000</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 mb-4">
          <p className="text-xs text-gray-600 mb-2">{isEnglish ? 'Supplier' : 'Pemasok'}</p>
          <p className="font-bold text-gray-900">CV Bahan Makanan Segar</p>
          <p className="text-xs text-gray-600 mt-1">{isEnglish ? 'Expected delivery: Dec 5, 2025' : 'Estimasi: 5 Des 2025'}</p>
        </div>

        <button className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-bold shadow-lg">
          {isEnglish ? 'Submit Order' : 'Kirim Pesanan'}
        </button>
      </div>
    </div>
  )
}
