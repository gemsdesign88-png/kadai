"use client"

import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Container } from "@/components/ui/container"
import { useLanguage } from "@/lib/i18n/context"

// =============================================================================
// INDIVIDUAL MOCKUP COMPONENTS
// =============================================================================

function OrdersMockup({ color }: { color: string }) {
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
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Pesanan</h3>
            <p className="text-sm text-gray-600 mt-1">12 pesanan aktif</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center text-white font-bold shadow-lg">
            12
          </div>
        </div>

        {/* Order Cards */}
        <div className="space-y-3">
          {[
            { table: "Meja 5", items: "3 item", status: "cooking", time: "5m", color: "bg-amber-500" },
            { table: "Meja 12", items: "2 item", status: "ready", time: "2m", color: "bg-green-500" },
            { table: "Meja 8", items: "4 item", status: "pending", time: "8m", color: "bg-blue-500" },
          ].map((order, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${order.color}`}></div>
                  <span className="font-bold text-gray-900">{order.table}</span>
                </div>
                <span className="text-xs font-semibold text-gray-500">{order.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{order.items}</span>
                <div className="px-3 py-1 bg-gray-100 rounded-full">
                  <span className="text-xs font-semibold text-gray-700 capitalize">{order.status}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="absolute bottom-8 left-8 right-8 h-14 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl font-bold shadow-xl flex items-center justify-center gap-2"
        >
          <span className="text-2xl">+</span>
          <span>Pesanan Baru</span>
        </motion.button>
      </div>
    </div>
  )
}

function MenuMockup({ color }: { color: string }) {
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
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Kelola Menu</h3>
            <p className="text-sm text-gray-600 mt-1">24 menu tersedia</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 border border-gray-200">
            <span className="text-gray-400">🔍</span>
            <span className="text-sm text-gray-500">Cari menu...</span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {["Semua", "Makanan", "Minuman", "Snack"].map((cat, i) => (
            <div
              key={i}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${
                i === 0 ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600"
              }`}
            >
              {cat}
            </div>
          ))}
        </div>

        {/* Menu Items */}
        <div className="space-y-3">
          {[
            { name: "Nasi Goreng Spesial", category: "Makanan", price: "25.000", color: "#EF4444", available: true },
            { name: "Es Teh Manis", category: "Minuman", price: "5.000", color: "#3B82F6", available: true },
            { name: "Ayam Geprek", category: "Makanan", price: "20.000", color: "#F59E0B", available: false },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-4 shadow-md border border-gray-100"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-gray-900">{item.name}</h4>
                <span className="font-bold text-green-600">Rp {item.price}</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="px-3 py-1 rounded-lg text-xs font-semibold text-white"
                  style={{ backgroundColor: item.color }}
                >
                  {item.category}
                </span>
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${item.available ? "bg-green-500" : "bg-red-500"}`}></div>
                  <span className={`text-xs font-semibold ${item.available ? "text-green-600" : "text-red-600"}`}>
                    {item.available ? "Tersedia" : "Habis"}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AnalyticsMockup({ color }: { color: string }) {
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
          <h3 className="text-2xl font-bold text-gray-900">Analytics</h3>
          <p className="text-sm text-gray-600 mt-1">Performa hari ini</p>
        </div>

        {/* Date Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {["Hari Ini", "Minggu", "Bulan", "Tahun"].map((filter, i) => (
            <div
              key={i}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap ${
                i === 0 ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"
              }`}
            >
              {filter}
            </div>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="space-y-3 mb-6">
          {[
            { label: "Total Pesanan", value: "48", icon: "📋", color: "#2196F3" },
            { label: "Pesanan Selesai", value: "42", icon: "✅", color: "#4CAF50" },
            { label: "Total Revenue", value: "Rp 1.2jt", icon: "💰", color: "#FF9800" },
            { label: "Rata-rata Order", value: "Rp 25k", icon: "📊", color: "#9C27B0" },
            { label: "Meja Terpakai", value: "8/12", icon: "🪑", color: "#F44336" },
            { label: "Occupancy Rate", value: "67%", icon: "📈", color: "#00BCD4" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl p-4 shadow-md border border-gray-100 flex items-center gap-4"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                {stat.icon}
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 font-semibold">{stat.label}</p>
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StaffMockup({ color }: { color: string }) {
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
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Tim Karyawan</h3>
            <p className="text-sm text-gray-600 mt-1">8 karyawan aktif</p>
          </div>
          <button className="w-12 h-12 rounded-full bg-gray-900 text-white text-2xl flex items-center justify-center shadow-lg">
            +
          </button>
        </div>

        {/* Staff Cards */}
        <div className="space-y-3">
          {[
            { name: "Ahmad Rizki", role: "Owner", avatar: "AR", status: "online", color: "#FF5A5F" },
            { name: "Siti Nurhaliza", role: "Kasir", avatar: "SN", status: "online", color: "#4CAF50" },
            { name: "Budi Santoso", role: "Koki", avatar: "BS", status: "offline", color: "#2196F3" },
            { name: "Dewi Lestari", role: "Pelayan", avatar: "DL", status: "online", color: "#FF9800" },
            { name: "Eko Prasetyo", role: "Bartender", avatar: "EP", status: "offline", color: "#9C27B0" },
          ].map((staff, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 flex items-center gap-4"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-md relative"
                style={{ backgroundColor: staff.color }}
              >
                {staff.avatar}
                <div
                  className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                    staff.status === "online" ? "bg-green-500" : "bg-gray-400"
                  }`}
                ></div>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900">{staff.name}</h4>
                <p className="text-sm text-gray-600">{staff.role}</p>
              </div>
              <div className="text-right">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    staff.status === "online" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {staff.status === "online" ? "Aktif" : "Offline"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TablesMockup({ color }: { color: string }) {
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
          <h3 className="text-2xl font-bold text-gray-900">Kelola Meja</h3>
          <p className="text-sm text-gray-600 mt-1">8 meja terpakai dari 12</p>
        </div>

        {/* Legend */}
        <div className="flex gap-4 mb-6 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-gray-600 font-semibold">Kosong</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-gray-600 font-semibold">Terisi</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-gray-600 font-semibold">Reserved</span>
          </div>
        </div>

        {/* Table Grid */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { number: 1, status: "occupied", guests: 4 },
            { number: 2, status: "available", guests: 0 },
            { number: 3, status: "occupied", guests: 2 },
            { number: 4, status: "reserved", guests: 6 },
            { number: 5, status: "occupied", guests: 3 },
            { number: 6, status: "available", guests: 0 },
            { number: 7, status: "occupied", guests: 5 },
            { number: 8, status: "occupied", guests: 2 },
            { number: 9, status: "available", guests: 0 },
            { number: 10, status: "occupied", guests: 4 },
            { number: 11, status: "occupied", guests: 2 },
            { number: 12, status: "available", guests: 0 },
          ].map((table, i) => {
            const bgColor =
              table.status === "available"
                ? "bg-green-100 border-green-500"
                : table.status === "occupied"
                ? "bg-blue-100 border-blue-500"
                : "bg-red-100 border-red-500"
            const textColor =
              table.status === "available"
                ? "text-green-700"
                : table.status === "occupied"
                ? "text-blue-700"
                : "text-red-700"

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className={`${bgColor} ${textColor} rounded-2xl p-4 border-2 shadow-md cursor-pointer flex flex-col items-center justify-center`}
              >
                <div className="text-2xl font-bold mb-1">{table.number}</div>
                {table.guests > 0 && <div className="text-xs font-semibold">👥 {table.guests}</div>}
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function PaymentMockup({ color }: { color: string }) {
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
          <h3 className="text-2xl font-bold text-gray-900">Pembayaran</h3>
          <p className="text-sm text-gray-600 mt-1">Meja 5 - 3 item</p>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 mb-4">
          <div className="space-y-3">
            {[
              { name: "Nasi Goreng Spesial", qty: 2, price: 50000 },
              { name: "Es Teh Manis", qty: 2, price: 10000 },
              { name: "Ayam Geprek", qty: 1, price: 20000 },
            ].map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-gray-700">
                  {item.qty}x {item.name}
                </span>
                <span className="font-bold text-gray-900">Rp {item.price.toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 mt-4 pt-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold text-gray-900">Rp 80.000</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Pajak (10%)</span>
              <span className="font-semibold text-gray-900">Rp 8.000</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span className="text-gray-900">Total</span>
              <span className="text-green-600">Rp 88.000</span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-4">
          <p className="text-sm font-bold text-gray-700 mb-3">Metode Pembayaran</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "Cash", icon: "💵", selected: true },
              { name: "QRIS", icon: "📱", selected: false },
              { name: "Debit", icon: "💳", selected: false },
              { name: "Transfer", icon: "🏦", selected: false },
            ].map((method, i) => (
              <div
                key={i}
                className={`rounded-xl p-3 border-2 flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  method.selected
                    ? "bg-purple-100 border-purple-500 shadow-md"
                    : "bg-white border-gray-200 hover:border-gray-300"
                }`}
              >
                <span className="text-2xl">{method.icon}</span>
                <span className={`text-sm font-bold ${method.selected ? "text-purple-700" : "text-gray-700"}`}>
                  {method.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full h-14 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-2xl font-bold shadow-xl flex items-center justify-center gap-2"
        >
          <span>Proses Pembayaran</span>
        </motion.button>
      </div>
    </div>
  )
}

function StockMockup({ color }: { color: string }) {
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
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Manajemen Stok</h3>
            <p className="text-sm text-gray-600 mt-1">24 bahan tersedia</p>
          </div>
        </div>

        {/* Alert Card */}
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 mb-4 flex items-start gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <p className="text-sm font-bold text-red-700">3 bahan stok menipis</p>
            <p className="text-xs text-red-600 mt-1">Segera lakukan restock</p>
          </div>
        </div>

        {/* Stock Items */}
        <div className="space-y-3">
          {[
            { name: "Beras Premium", qty: 45, unit: "kg", status: "normal", color: "bg-green-500" },
            { name: "Minyak Goreng", qty: 8, unit: "L", status: "low", color: "bg-yellow-500" },
            { name: "Ayam Fillet", qty: 2, unit: "kg", status: "critical", color: "bg-red-500" },
            { name: "Cabai Rawit", qty: 15, unit: "kg", status: "normal", color: "bg-green-500" },
            { name: "Gula Pasir", qty: 5, unit: "kg", status: "low", color: "bg-yellow-500" },
            { name: "Teh Celup", qty: 80, unit: "box", status: "normal", color: "bg-green-500" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-4 shadow-md border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-sm">{item.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">
                      Stok: {item.qty} {item.unit}
                    </p>
                  </div>
                </div>
                <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <span className="text-gray-600 font-bold">+</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function KitchenMockup({ color }: { color: string }) {
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
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Kitchen Dashboard</h3>
            <p className="text-sm text-gray-600 mt-1">Makanan Utama - 6 item</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold shadow-lg">
            6
          </div>
        </div>

        {/* Kitchen Items */}
        <div className="space-y-3">
          {[
            { name: "Nasi Goreng Spesial", qty: 2, table: 5, note: "Pedas level 3", urgent: true },
            { name: "Ayam Geprek", qty: 1, table: 12, note: null, urgent: false },
            { name: "Mie Goreng", qty: 3, table: 8, note: "Tanpa sayur", urgent: false },
            { name: "Sate Ayam", qty: 2, table: 3, note: "Matang banget", urgent: true },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-white rounded-2xl p-4 shadow-md border-2 ${
                item.urgent ? "border-red-500" : "border-gray-100"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-gray-900">{item.name}</h4>
                    {item.urgent && <span className="text-xs font-bold text-red-500 px-2 py-1 bg-red-100 rounded-full">URGENT</span>}
                  </div>
                  <p className="text-sm text-gray-600">Jumlah: {item.qty}x</p>
                  {item.note && <p className="text-xs text-orange-600 mt-1">📝 {item.note}</p>}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">Meja {item.table}</div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-10 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold shadow-md flex items-center justify-center gap-2"
              >
                <span>✓</span>
                <span>Tandai Siap</span>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function QRMockup({ color }: { color: string }) {
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
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">QR Menu Digital</h3>
          <p className="text-sm text-gray-600 mt-1">Scan untuk pesan langsung</p>
        </div>

        {/* QR Code */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-gray-100 mb-6">
          <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl flex items-center justify-center border-4 border-dashed border-gray-300">
            <div className="text-center">
              <div className="text-6xl mb-3">📱</div>
              <p className="text-sm font-bold text-gray-700">QR Code</p>
              <p className="text-xs text-gray-500 mt-1">Meja 5</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-3">
          {[
            { icon: "📋", text: "Lihat menu lengkap", color: "bg-blue-100 text-blue-700" },
            { icon: "🛒", text: "Order tanpa antre", color: "bg-green-100 text-green-700" },
            { icon: "💳", text: "Bayar digital", color: "bg-purple-100 text-purple-700" },
            { icon: "⭐", text: "Berikan review", color: "bg-yellow-100 text-yellow-700" },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`${feature.color} rounded-xl p-3 flex items-center gap-3 font-semibold text-sm`}
            >
              <span className="text-2xl">{feature.icon}</span>
              <span>{feature.text}</span>
            </motion.div>
          ))}
        </div>

        {/* Download Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full h-14 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl font-bold shadow-xl flex items-center justify-center gap-2 mt-6"
        >
          <span>⬇️</span>
          <span>Download QR</span>
        </motion.button>
      </div>
    </div>
  )
}

function PromoMockup({ color }: { color: string }) {
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
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Kelola Promo</h3>
            <p className="text-sm text-gray-600 mt-1">5 promo aktif</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {["Vouchers", "Kupon", "Bundling"].map((tab, i) => (
            <div
              key={i}
              className={`flex-1 px-4 py-2 rounded-full text-sm font-semibold text-center ${
                i === 0 ? "bg-pink-100 text-pink-700" : "bg-gray-100 text-gray-600"
              }`}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* Promo Cards */}
        <div className="space-y-3">
          {[
            {
              icon: "🎫",
              name: "Diskon 20% All Menu",
              desc: "Berlaku setiap hari Senin",
              active: true,
              color: "#FF5A5F",
            },
            {
              icon: "🏷️",
              name: "Beli 2 Gratis 1",
              desc: "Untuk minuman tertentu",
              active: true,
              color: "#00D4AA",
            },
            {
              icon: "🍱",
              name: "Paket Hemat Berdua",
              desc: "Nasi Goreng + 2 Es Teh",
              active: false,
              color: "#FFB020",
            },
          ].map((promo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-4 shadow-md border border-gray-100"
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ backgroundColor: `${promo.color}20` }}
                >
                  {promo.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">{promo.name}</h4>
                  <p className="text-xs text-gray-600 mt-1">{promo.desc}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        promo.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {promo.active ? "Aktif" : "Nonaktif"}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Idea Section */}
        <div className="mt-6 bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-4 border border-orange-200">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <p className="text-sm font-bold text-gray-900">Ide Promo</p>
              <p className="text-xs text-gray-600 mt-1">Happy Hour: Diskon 30% jam 14:00-16:00 untuk menarik pelanggan di jam sepi.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CRMMockup({ color }: { color: string }) {
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
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Daftar Pelanggan</h3>
            <p className="text-sm text-gray-600 mt-1">142 pelanggan</p>
          </div>
          <button className="w-12 h-12 rounded-full bg-gray-900 text-white text-2xl flex items-center justify-center shadow-lg">
            +
          </button>
        </div>

        {/* Search */}
        <div className="mb-4">
          <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 border border-gray-200">
            <span className="text-gray-400">🔍</span>
            <span className="text-sm text-gray-500">Cari nama atau nomor</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white rounded-xl p-3 shadow-md border border-gray-100 text-center">
            <p className="text-2xl font-bold text-gray-900">142</p>
            <p className="text-xs text-gray-600 font-semibold">Total Pelanggan</p>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-md border border-gray-100 text-center">
            <p className="text-2xl font-bold text-green-600">Rp 2.4jt</p>
            <p className="text-xs text-gray-600 font-semibold">Total Revenue</p>
          </div>
        </div>

        {/* Customer List */}
        <div className="space-y-3">
          {[
            { name: "Ahmad Rizki", phone: "0812-3456-7890", spent: "Rp 450k", orders: 12, initials: "AR" },
            { name: "Siti Nurhaliza", phone: "0856-7890-1234", spent: "Rp 320k", orders: 8, initials: "SN" },
            { name: "Budi Santoso", phone: "0821-1111-2222", spent: "Rp 280k", orders: 7, initials: "BS" },
            { name: "Dewi Lestari", phone: "0899-3333-4444", spent: "Rp 195k", orders: 5, initials: "DL" },
          ].map((customer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-bold">
                {customer.initials}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 text-sm">{customer.name}</h4>
                <p className="text-xs text-gray-600">{customer.phone}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">{customer.spent}</p>
                <p className="text-xs text-gray-600">{customer.orders} pesanan</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SettingsMockup({ color }: { color: string }) {
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
          <h3 className="text-2xl font-bold text-gray-900">Pengaturan</h3>
          <p className="text-sm text-gray-600 mt-1">Kelola restoran Anda</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 mb-4 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            KP
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-900">Kadai Restaurant</h4>
            <p className="text-sm text-gray-600">Owner Account</p>
          </div>
        </div>

        {/* Settings List */}
        <div className="space-y-2">
          {[
            { icon: "🏪", label: "Info Restoran", desc: "Nama, alamat, kontak", color: "#FF5A5F" },
            { icon: "👤", label: "Profil Akun", desc: "Ubah data pribadi", color: "#2196F3" },
            { icon: "🔔", label: "Notifikasi", desc: "Atur preferensi notif", color: "#FFB020" },
            { icon: "🌐", label: "Bahasa & Zona Waktu", desc: "Indonesia, WIB", color: "#00D4AA" },
            { icon: "🎨", label: "Tema Interface", desc: "Terang, gelap, auto", color: "#9C27B0" },
            { icon: "💾", label: "Backup & Restore", desc: "Cadangkan data", color: "#4CAF50" },
            { icon: "❓", label: "Bantuan & Support", desc: "FAQ, hubungi kami", color: "#FF9800" },
            { icon: "ℹ️", label: "Versi Aplikasi", desc: "v1.0.0 (Build 42)", color: "#607D8B" },
          ].map((setting, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex items-center gap-3 hover:shadow-md transition-all cursor-pointer"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ backgroundColor: `${setting.color}20` }}
              >
                {setting.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 text-sm">{setting.label}</h4>
                <p className="text-xs text-gray-600">{setting.desc}</p>
              </div>
              <div className="text-gray-400">›</div>
            </motion.div>
          ))}
        </div>

        {/* Logout Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full h-12 bg-red-50 text-red-600 rounded-xl font-bold mt-4 border-2 border-red-200 flex items-center justify-center gap-2"
        >
          <span>🚪</span>
          <span>Logout</span>
        </motion.button>
      </div>
    </div>
  )
}

function ThemeMockup({ color }: { color: string }) {
  const [selectedColor, setSelectedColor] = React.useState("#FF5A5F")
  const [selectedName, setSelectedName] = React.useState("Merah Kadai")

  const themeColors = [
    { name: "Merah Kadai", hex: "#FF5A5F" },
    { name: "Biru", hex: "#3B82F6" },
    { name: "Hijau", hex: "#10B981" },
    { name: "Ungu", hex: "#8B5CF6" },
    { name: "Orange", hex: "#F59E0B" },
    { name: "Pink", hex: "#EC4899" },
    { name: "Cyan", hex: "#06B6D4" },
    { name: "Teal", hex: "#14B8A6" },
    { name: "Indigo", hex: "#6366F1" },
    { name: "Lime", hex: "#84CC16" },
    { name: "Amber", hex: "#F59E0B" },
    { name: "Rose", hex: "#F43F5E" },
  ]

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
          <h3 className="text-2xl font-bold text-gray-900">Tema Interface</h3>
          <p className="text-sm text-gray-600 mt-1">Pilih warna tema Anda</p>
        </div>

        {/* Preview Card */}
        <motion.div 
          className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 mb-6"
          key={selectedColor}
          initial={{ scale: 0.95, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.div 
              className="w-14 h-14 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: selectedColor }}
              animate={{ backgroundColor: selectedColor }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-2xl">🎨</span>
            </motion.div>
            <div className="flex-1">
              <p className="text-xs text-gray-600">Preview Tema</p>
              <p className="text-lg font-bold text-gray-900">{selectedName}</p>
            </div>
          </div>
          
          {/* Sample UI Preview */}
          <div className="space-y-2">
            <motion.div 
              className="h-10 rounded-lg flex items-center justify-center text-white font-semibold text-sm shadow-md"
              style={{ backgroundColor: selectedColor }}
              animate={{ backgroundColor: selectedColor }}
              transition={{ duration: 0.3 }}
            >
              Tombol Utama
            </motion.div>
            <div className="grid grid-cols-2 gap-2">
              <motion.div 
                className="h-8 rounded-lg border-2 flex items-center justify-center text-xs font-semibold" 
                style={{ borderColor: selectedColor, color: selectedColor }}
                animate={{ borderColor: selectedColor, color: selectedColor }}
                transition={{ duration: 0.3 }}
              >
                Outline
              </motion.div>
              <motion.div 
                className="h-8 rounded-lg flex items-center justify-center text-xs font-semibold" 
                style={{ backgroundColor: `${selectedColor}20`, color: selectedColor }}
                animate={{ backgroundColor: `${selectedColor}20`, color: selectedColor }}
                transition={{ duration: 0.3 }}
              >
                Soft
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Color Grid */}
        <div className="mb-6">
          <p className="text-sm font-bold text-gray-900 mb-3">Pilih Warna (12 tema)</p>
          <div className="grid grid-cols-4 gap-3">
            {themeColors.map((theme, i) => (
              <motion.button
                key={i}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedColor(theme.hex)
                  setSelectedName(theme.name)
                }}
                className={`aspect-square rounded-xl shadow-md relative transition-all ${
                  selectedColor === theme.hex ? 'ring-4 ring-offset-2' : ''
                }`}
                style={{ 
                  backgroundColor: theme.hex,
                  ...(selectedColor === theme.hex ? { '--tw-ring-color': theme.hex } as any : {})
                }}
              >
                {selectedColor === theme.hex && (
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <span className="text-white text-xl drop-shadow-lg">✓</span>
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Custom Color Picker */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-4 border-2 border-purple-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md">
              <span className="text-xl">✨</span>
            </div>
            <div>
              <p className="text-xs font-bold text-purple-900">Premium Feature</p>
              <p className="text-xs text-purple-700">Custom Color Picker</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-10 rounded-lg bg-white border-2 border-purple-300 flex items-center px-3">
              <span className="text-xs text-gray-500 font-mono">#FF5A5F</span>
            </div>
            <button className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 text-white font-bold shadow-md">
              🎨
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="mt-4 flex items-start gap-2 bg-blue-50 rounded-lg p-3 border border-blue-200">
          <span className="text-sm">💡</span>
          <p className="text-xs text-blue-900 leading-relaxed">
            Warna tema akan diterapkan ke semua tombol, badge, dan elemen UI di aplikasi Anda.
          </p>
        </div>
      </div>
    </div>
  )
}

// =============================================================================
// FEATURE SECTION WITH SCROLL TRACKING
// =============================================================================

interface Feature {
  title: string
  subtitle: string
  description: string
  mockup: React.ComponentType<{ color: string }>
  color: string
  slug: string
}

function FeatureSection({ feature, index }: { feature: Feature; index: number }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { language } = useLanguage()
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
            {language === "en" ? "Learn More" : "Pelajari Lebih Lanjut"}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.a>
        </div>
      </div>

      <div className={isEven ? "lg:order-2" : "lg:order-1"}>
        <feature.mockup color={feature.color} />
      </div>
    </motion.div>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function RealUIFeatures() {
  const { language } = useLanguage()
  
  const features: Feature[] = [
    {
      title: language === "en" ? "Real-Time Order Management" : "Kelola Pesanan Real-Time",
      subtitle: "Order Management",
      description: language === "en"
        ? "Monitor all orders in one dashboard. Track status from pending to completed with instant notifications to kitchen and cashier."
        : "Pantau semua pesanan dalam satu dashboard. Track status dari pending hingga completed dengan notifikasi instant ke dapur dan kasir.",
      mockup: OrdersMockup,
      color: "#FF5A5F",
      slug: "orders",
    },
    {
      title: language === "en" ? "Flexible Menu Management" : "Manajemen Menu Fleksibel",
      subtitle: "Menu Management",
      description: language === "en"
        ? "Manage menu with ease. Add, edit, or delete items instantly. Automatic categorization and real-time availability control."
        : "Atur menu dengan mudah. Tambah, edit, atau hapus item dalam sekejap. Kategorisasi otomatis dan control availability real-time.",
      mockup: MenuMockup,
      color: "#0066FF",
      slug: "menu",
    },
    {
      title: "Analytics & Insights",
      subtitle: "Business Intelligence",
      description: language === "en"
        ? "Get deep insights about your business performance. View sales trends, popular menu items, and revenue growth in one dashboard."
        : "Dapatkan insights mendalam tentang performa bisnis Anda. Lihat tren penjualan, menu terpopuler, dan revenue growth dalam satu dashboard.",
      mockup: AnalyticsMockup,
      color: "#00D4AA",
      slug: "analytics",
    },
    {
      title: language === "en" ? "Efficient Team Management" : "Manajemen Tim Efisien",
      subtitle: "Staff Management",
      description: language === "en"
        ? "Manage team with role-based access control. Track attendance, performance, and easily assign tasks for each employee."
        : "Kelola tim dengan role-based access control. Track kehadiran, performa, dan assign tugas dengan mudah untuk setiap karyawan.",
      mockup: StaffMockup,
      color: "#FFB020",
      slug: "staff",
    },
    {
      title: language === "en" ? "Smart Table System" : "Sistem Meja Pintar",
      subtitle: "Table Management",
      description: language === "en"
        ? "Monitor table status in real-time. See which tables are empty, occupied, or reserved. Optimize layout to maximize restaurant capacity."
        : "Monitor status meja real-time. Lihat meja mana yang kosong, terisi, atau reserved. Optimasi layout untuk maksimalkan kapasitas restoran.",
      mockup: TablesMockup,
      color: "#8B5CF6",
      slug: "tables",
    },
    {
      title: language === "en" ? "Multi-Method Payment" : "Pembayaran Multi-Metode",
      subtitle: "Payment System",
      description: language === "en"
        ? "Accept payments with various methods: cash, QRIS, debit, transfer. Automatic split bill and print digital or physical receipts."
        : "Terima pembayaran dengan berbagai metode: cash, QRIS, debit, transfer. Split bill otomatis dan cetak struk digital atau fisik.",
      mockup: PaymentMockup,
      color: "#EC4899",
      slug: "payment",
    },
    {
      title: language === "en" ? "Smart Inventory Control" : "Kontrol Stok Cerdas",
      subtitle: "Inventory Control",
      description: language === "en"
        ? "Monitor ingredient stock in real-time. Get automatic notifications when stock is low. Track inventory value and forecast needs."
        : "Monitor stok bahan baku real-time. Dapat notifikasi otomatis saat stok menipis. Lacak nilai inventaris dan forecast kebutuhan.",
      mockup: StockMockup,
      color: "#10B981",
      slug: "inventory",
    },
    {
      title: "Kitchen Display System",
      subtitle: "Kitchen Operations",
      description: language === "en"
        ? "Dedicated kitchen dashboard to track items to be made. Automatic priority for urgent orders and notifications to waiters when ready."
        : "Dashboard khusus dapur untuk track item yang harus dibuat. Prioritas otomatis untuk urgent orders dan notifikasi ke pelayan saat siap.",
      mockup: KitchenMockup,
      color: "#F59E0B",
      slug: "kitchen",
    },
    {
      title: language === "en" ? "Digital QR Menu" : "QR Menu Digital",
      subtitle: "Contactless Ordering",
      description: language === "en"
        ? "Customers scan QR at table to view menu and order directly. Reduce physical contact, increase efficiency, and speed up service."
        : "Pelanggan scan QR di meja untuk lihat menu dan order langsung. Kurangi kontak fisik, tingkatkan efisiensi, dan percepat layanan.",
      mockup: QRMockup,
      color: "#06B6D4",
      slug: "qr-menu",
    },
    {
      title: language === "en" ? "Promo & Campaign Manager" : "Promo & Campaign Manager",
      subtitle: "Marketing Tools",
      description: language === "en"
        ? "Create and manage vouchers, coupons, and bundles. Set promo periods, track redemption rate, and increase repeat orders."
        : "Buat dan kelola voucher, kupon, dan bundling. Atur periode promo, track redemption rate, dan tingkatkan repeat orders.",
      mockup: PromoMockup,
      color: "#EF4444",
      slug: "promo",
    },
    {
      title: language === "en" ? "Customer Relationship" : "Customer Relationship",
      subtitle: "CRM System",
      description: language === "en"
        ? "Manage customer database. Track spending history, favorite items, and give loyalty rewards to improve customer retention."
        : "Kelola database pelanggan. Track spending history, favorite items, dan berikan loyalty rewards untuk meningkatkan customer retention.",
      mockup: CRMMockup,
      color: "#3B82F6",
      slug: "crm",
    },
    {
      title: language === "en" ? "Complete Settings" : "Pengaturan Lengkap",
      subtitle: "System Settings",
      description: language === "en"
        ? "Customize system to restaurant needs. Set theme, notifications, timezone, backup data, and access 24/7 support help."
        : "Customize sistem sesuai kebutuhan restoran. Atur tema, notifikasi, zona waktu, backup data, dan akses bantuan support 24/7.",
      mockup: SettingsMockup,
      color: "#6366F1",
      slug: "settings",
    },
    {
      title: language === "en" ? "Custom Interface Theme" : "Tema Interface Custom",
      subtitle: "Brand Customization",
      description: language === "en"
        ? "Choose from 12 preset theme colors or create your own custom color with color picker. Match interface with your restaurant brand identity."
        : "Pilih dari 12 warna tema preset atau buat warna custom sendiri dengan color picker. Sesuaikan interface dengan identitas brand restoran Anda.",
      mockup: ThemeMockup,
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
                {language === "en" ? "Real UI Preview" : "Tampilan UI Asli"}
              </span>
            </div>

            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              {language === "en" ? "See The Real Interface" : "Lihat Langsung Tampilan Asli"}
            </h2>

            <p className="text-xl sm:text-2xl leading-relaxed text-gray-600 max-w-2xl mx-auto">
              {language === "en" 
                ? "These aren't empty mockups. Every component displays real UI from our mobile app with actual data and interactions."
                : "Ini bukan mockup kosong. Setiap komponen menampilkan UI asli dari aplikasi mobile kami dengan data dan interaksi real."}
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
                        {language === "en" ? "Works Everywhere, Anytime" : "Bekerja Dimana Saja, Kapan Saja"}
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
                    {language === "en" ? (
                      <>
                        One Platform.<br />
                        <span className="bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] bg-clip-text text-transparent">
                          Every Device.
                        </span>
                      </>
                    ) : (
                      <>
                        Satu Platform.<br />
                        <span className="bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] bg-clip-text text-transparent">
                          Semua Perangkat.
                        </span>
                      </>
                    )}
                  </motion.h3>
                  
                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-xl md:text-2xl text-white/90 text-center mb-12 max-w-3xl mx-auto leading-relaxed"
                  >
                    {language === "en" 
                      ? "Mobile app for staff on the go. Tablet for kitchen display. Web dashboard for owners. All synced in real-time with zero lag."
                      : "Aplikasi mobile untuk staff yang bergerak. Tablet untuk display dapur. Web dashboard untuk owner. Semua sinkron real-time tanpa lag."}
                  </motion.p>
                  
                  {/* Device Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[
                      {
                        icon: "📱",
                        title: language === "en" ? "Mobile App" : "Aplikasi Mobile",
                        desc: language === "en" ? "iOS & Android" : "iOS & Android",
                        gradient: "from-pink-500 to-rose-500"
                      },
                      {
                        icon: "💻",
                        title: language === "en" ? "Web Browser" : "Web Browser",
                        desc: language === "en" ? "Any device, anywhere" : "Perangkat apapun, dimana saja",
                        gradient: "from-blue-500 to-cyan-500"
                      },
                      {
                        icon: "🖥️",
                        title: "Tablet",
                        desc: language === "en" ? "Perfect for kitchen" : "Sempurna untuk dapur",
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
                              {language === "en" ? "Real-time Sync" : "Sinkron Real-time"}
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
                      { number: "< 50ms", label: language === "en" ? "Sync Speed" : "Kecepatan Sinkron" },
                      { number: "99.9%", label: "Uptime" },
                      { number: "24/7", label: "Support" }
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
                      {language === "en" ? "Still got 7 more features to show you 👇" : "Masih ada 7 fitur lagi yang mau kami tunjukkan 👇"}
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
                        {language === "en" ? "Keep Scrolling" : "Lanjutkan Scroll"}
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
