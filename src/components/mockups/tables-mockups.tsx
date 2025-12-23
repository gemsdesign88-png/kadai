"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { getMockupTranslator } from "./mockup-i18n"

// Mockup 1: Table Overview (Card-based like mobile app)
export function TablesOverviewMockup({ color, language }: { color: string; language: string }) {
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
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{t('Store Tables', 'Meja Toko', '店铺桌子')}</h3>
          <p className="text-sm text-gray-600 mt-1 uppercase tracking-wide">{t('MONITOR TABLES & ORDERS', 'PANTAU MEJA & PESANAN', '监控桌位和订单')}</p>
        </div>

        {/* Summary Info */}
        <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 mb-4">
          <div className="flex items-center justify-around">
            <div className="text-center">
              <p className="text-xs text-gray-600 font-semibold mb-1">{t('Occupied', 'Terisi', '已占用')}</p>
              <p className="text-2xl font-bold text-red-600">5</p>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center">
              <p className="text-xs text-gray-600 font-semibold mb-1">{t('Available', 'Tersedia', '空闲')}</p>
              <p className="text-2xl font-bold text-green-600">7</p>
            </div>
          </div>
        </div>

        {/* Table Grid */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { number: 1, status: 'occupied', customers: 2, amount: 85 },
            { number: 2, status: 'available' },
            { number: 3, status: 'occupied', customers: 4, amount: 145 },
            { number: 4, status: 'available' },
            { number: 5, status: 'occupied', customers: 3, amount: 120 },
            { number: 6, status: 'available' },
            { number: 7, status: 'occupied', customers: 2, amount: 95 },
            { number: 8, status: 'available' },
            { number: 9, status: 'occupied', customers: 5, amount: 180 },
          ].map((table, i) => {
            const occupied = table.status === 'occupied'
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className={`rounded-2xl p-3 border-2 shadow-md cursor-pointer flex flex-col items-center justify-center relative ${
                  occupied 
                    ? 'bg-red-50 border-red-200' 
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl mb-2 ${
                  occupied ? 'bg-red-100' : 'bg-gray-100'
                }`}>
                  {occupied ? '🍲' : '🍽️'}
                </div>
                <p className={`text-sm font-bold ${occupied ? 'text-red-900' : 'text-gray-900'}`}>
                  {t('Table', 'Meja', '桌号')} {table.number}
                </p>
                <p className={`text-[10px] font-semibold mt-1 px-2 py-0.5 rounded-full ${
                  occupied 
                    ? 'text-red-700 bg-red-100 border border-red-300' 
                    : 'text-green-700 bg-green-100 border border-green-300'
                }`}>
                  {occupied ? (t('Occupied', 'Terisi', '已占用')) : (t('Available', 'Tersedia', '空闲'))}
                </p>
                {occupied && (
                  <div className="mt-2 text-center">
                    <p className="text-[10px] font-semibold text-red-600">
                      {table.customers} 🧑🏻 • Rp {table.amount}k
                    </p>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Mockup 2: Table Detail with Orders
export function TableDetailMockup({ color, language }: { color: string; language: string }) {
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
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{t('Table 3', 'Meja 3', '3号桌')}</h3>
              <p className="text-sm text-gray-600 mt-1">4 {t('customers', 'tamu', '位客人')} • 15 {t('min', 'menit', '分钟')}</p>
            </div>
            <div className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-bold">
              {t('Occupied', 'Terisi', '已占用')}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-gray-900">{t('Current Order', 'Pesanan Aktif', '当前订单')}</h4>
            <span className="text-sm font-semibold text-purple-600">Rp 145k</span>
          </div>
          
          <div className="space-y-3">
            {[
              { name: t('Special Fried Rice', 'Nasi Goreng Spesial', '特别炒饭'), qty: 2, price: 50 },
              { name: t('Sweet Iced Tea', 'Es Teh Manis', '甜冰茶'), qty: 4, price: 8 },
              { name: t('Grilled Chicken', 'Ayam Bakar', '烤鸡'), qty: 1, price: 37 },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-bold">
                    {item.qty}
                  </span>
                  <span className="text-gray-700">{item.name}</span>
                </div>
                <span className="font-semibold text-gray-900">{item.price}k</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="py-3 px-4 bg-white border-2 border-purple-200 text-purple-700 rounded-xl font-bold shadow-sm hover:bg-purple-50 transition-colors"
          >
            {t('Add Order', 'Tambah Pesanan', '添加订单')}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="py-3 px-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-bold shadow-md"
          >
            {t('Process Payment', 'Proses Bayar', '处理付款')}
          </motion.button>
        </div>

        {/* Table Info */}
        <div className="mt-4 bg-purple-50 rounded-xl p-4 border border-purple-100">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-gray-600 text-xs mb-1">{t('Waiter', 'Pelayan', '服务员')}</p>
              <p className="font-bold text-gray-900">Budi</p>
            </div>
            <div>
              <p className="text-gray-600 text-xs mb-1">{t('Started', 'Dimulai', '开始时间')}</p>
              <p className="font-bold text-gray-900">14:30</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Mockup 3: Reservation System
export function TableReservationMockup({ color, language }: { color: string; language: string }) {
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
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{t('Reservations', 'Reservasi', '预订')}</h3>
          <p className="text-sm text-gray-600 mt-1">5 {t('reservations today', 'reservasi hari ini', '今日预订')}</p>
        </div>

        {/* Reservation List */}
        <div className="space-y-3">
          {[
            { name: 'Ahmad Rizki', table: 5, time: '18:00', guests: 4, status: 'confirmed' },
            { name: 'Sarah Putri', table: 8, time: '19:30', guests: 2, status: 'confirmed' },
            { name: 'Budi Santoso', table: 12, time: '20:00', guests: 6, status: 'pending' },
            { name: 'Dewi Lestari', table: 3, time: '18:30', guests: 3, status: 'confirmed' },
          ].map((reservation, i) => {
            const statusColor = reservation.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
            const statusText = reservation.status === 'confirmed' 
              ? (t('Confirmed', 'Dikonfirmasi', '已确认'))
              : (t('Pending', 'Menunggu', '待处理'))
            
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-4 shadow-md border border-gray-100"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-bold text-gray-900">{reservation.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {t('Table', 'Meja', '桌号')} {reservation.table} • {reservation.guests} {t('guests', 'tamu', '位客人')}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColor}`}>
                    {statusText}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <div className="text-2xl">🕐</div>
                  <span className="text-lg font-bold text-purple-600">{reservation.time}</span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Add Reservation Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-6 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-bold shadow-lg"
        >
          + {t('New Reservation', 'Reservasi Baru', '新预订')}
        </motion.button>
      </div>
    </div>
  )
}

// Mockup 4: Table Merging
export function TableMergingMockup({ color, language }: { color: string; language: string }) {
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
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{t('Merge Tables', 'Gabung Meja', '合并桌子')}</h3>
          <p className="text-sm text-gray-600 mt-1">{t('For large groups', 'Untuk grup besar', '适用于大型团体')}</p>
        </div>

        {/* Info Banner */}
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-purple-700 font-semibold">
            {t('Select tables to merge for a party of 12 guests', 'Pilih meja untuk digabung untuk 12 tamu', '选择要合并的桌子，供 12 位客人使用')}
          </p>
        </div>

        {/* Table Selection Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { number: 1, selected: false, available: true },
            { number: 2, selected: true, available: true },
            { number: 3, selected: true, available: true },
            { number: 4, selected: false, available: false },
            { number: 5, selected: true, available: true },
            { number: 6, selected: false, available: true },
            { number: 7, selected: false, available: true },
            { number: 8, selected: false, available: false },
            { number: 9, selected: false, available: true },
          ].map((table, i) => {
            const bgColor = !table.available 
              ? 'bg-gray-100 border-gray-300 opacity-50 cursor-not-allowed'
              : table.selected 
                ? 'bg-purple-100 border-purple-500 border-2' 
                : 'bg-white border-gray-200'
            
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={table.available ? { scale: 1.05 } : {}}
                className={`rounded-2xl p-4 border shadow-md cursor-pointer flex flex-col items-center justify-center relative ${bgColor}`}
              >
                {table.selected && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    ✓
                  </div>
                )}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl mb-2 ${
                  table.selected ? 'bg-purple-200' : table.available ? 'bg-gray-100' : 'bg-gray-200'
                }`}>
                  {table.available ? '🍽️' : '🔒'}
                </div>
                <p className={`text-sm font-bold ${table.selected ? 'text-purple-900' : 'text-gray-900'}`}>
                  {table.number}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">{t('Selected Tables:', 'Meja Terpilih:', '已选桌子：')}</span>
            <span className="font-bold text-gray-900">2, 3, 5</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-gray-600">{t('Total Capacity:', 'Kapasitas Total:', '总容量：')}</span>
            <span className="font-bold text-purple-600">12 {t('guests', 'tamu', '位客人')}</span>
          </div>
        </div>

        {/* Confirm Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-bold shadow-lg"
        >
          {t('Confirm Merge', 'Konfirmasi Gabung', '确认合并')}
        </motion.button>
      </div>
    </div>
  )
}
