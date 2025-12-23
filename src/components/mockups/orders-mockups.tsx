"use client"

import { motion } from "framer-motion"
import { getMockupTranslator } from "./mockup-i18n"

// Mockup 1: Active Orders List
export function OrdersListMockup({ color, language }: { color: string; language: string }) {
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
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{t('Orders', 'Pesanan', '订单')}</h3>
            <p className="text-sm text-gray-600 mt-1">{t('12 active orders', '12 pesanan aktif', '12 个活跃订单')}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center text-white font-bold shadow-lg">
            12
          </div>
        </div>

        <div className="space-y-3">
          {[
            { table: t("Table 5", "Meja 5", "5号桌"), items: "3 " + t("items", "item", "项"), status: t("cooking", "memasak", "烹饪中"), time: "5m", color: "bg-amber-500" },
            { table: t("Table 12", "Meja 12", "12号桌"), items: "2 " + t("items", "item", "项"), status: t("ready", "siap", "就绪"), time: "2m", color: "bg-green-500" },
            { table: t("Table 8", "Meja 8", "8号桌"), items: "4 " + t("items", "item", "项"), status: t("pending", "tertunda", "待处理"), time: "8m", color: "bg-blue-500" },
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
                <span className="text-xs text-gray-500 font-semibold">{order.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{order.items}</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-bold">
                  {order.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Mockup 2: Order Detail
export function OrderDetailMockup({ color, language }: { color: string; language: string }) {
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
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">{t('Order #1842', 'Pesanan #1842', '订单 #1842')}</h3>
            <div className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">
              {t('Cooking', 'Memasak', '烹饪中')}
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-1">{t('Table 5 • 5 min ago', 'Meja 5 • 5 menit lalu', '5号桌 • 5分钟前')}</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 mb-4">
          <h4 className="font-bold text-gray-900 mb-4">{t('Order Items', 'Item Pesanan', '订单项目')}</h4>
          
          <div className="space-y-3">
            {[
              { name: t('Special Fried Rice', 'Nasi Goreng Spesial', '特别炒饭'), qty: 2, price: 50, status: 'cooking' },
              { name: t('Sweet Iced Tea', 'Es Teh Manis', '甜冰茶'), qty: 3, price: 8, status: 'ready' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start justify-between"
              >
                <div className="flex items-start gap-3 flex-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    item.status === 'cooking' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {item.qty}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{item.name}</p>
                    <p className={`text-xs mt-1 px-2 py-0.5 rounded-full inline-block ${
                      item.status === 'cooking' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {item.status === 'cooking' ? t('Cooking', 'Memasak', '烹饪中') : t('Ready', 'Siap', '就绪')}
                    </p>
                  </div>
                </div>
                <span className="font-bold text-gray-900">Rp {item.price}k</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-900">{t('Total', 'Total', '总计')}</span>
              <span className="text-xl font-bold text-red-600">Rp 124k</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="py-3 px-4 bg-white border-2 border-red-200 text-red-700 rounded-xl font-bold"
          >
            {t('Edit Order', 'Edit Pesanan', '编辑订单')}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="py-3 px-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold shadow-md"
          >
            {t('Complete', 'Selesai', '完成')}
          </motion.button>
        </div>
      </div>
    </div>
  )
}

// Mockup 3: New Order Creation
export function NewOrderMockup({ color, language }: { color: string; language: string }) {
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
          <h3 className="text-2xl font-bold text-gray-900">{t('New Order', 'Pesanan Baru', '新订单')}</h3>
          <p className="text-sm text-gray-600 mt-1">{t('Table 8', 'Meja 8', '8号桌')}</p>
        </div>

        {/* Menu Categories */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {[
            { name: t('All', 'Semua', '全部'), active: true },
            { name: t('Food', 'Makanan', '食物'), active: false },
            { name: t('Drinks', 'Minuman', '饮料'), active: false },
          ].map((cat, i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap ${
                cat.active
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="space-y-3 mb-4">
          {[
            { name: t('Fried Rice', 'Nasi Goreng', '炒饭'), price: 25, image: '🍚', selected: 2 },
            { name: t('Fried Noodles', 'Mie Goreng', '炒面'), price: 22, image: '🍜', selected: 0 },
            { name: t('Iced Tea', 'Es Teh', '冰茶'), price: 5, image: '🥤', selected: 3 },
            { name: t('Grilled Chicken', 'Ayam Bakar', '烤鸡'), price: 35, image: '🍗', selected: 1 },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                  {item.image}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{item.name}</p>
                  <p className="text-sm text-red-600 font-semibold">Rp {item.price}k</p>
                </div>
              </div>
              {item.selected > 0 && (
                <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
                  {item.selected}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold">6 {t('items', 'item', '项')}</span>
            <span className="text-xl font-bold">Rp 120k</span>
          </div>
          <button className="w-full py-2 bg-white text-red-600 rounded-lg font-bold mt-2">
            {t('Send to Kitchen', 'Kirim ke Dapur', '发送到厨房')}
          </button>
        </div>
      </div>
    </div>
  )
}

// Mockup 4: Kitchen Display
export function KitchenDisplayMockup({ color, language }: { color: string; language: string }) {
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
          <h3 className="text-2xl font-bold text-gray-900">{t('Kitchen Queue', 'Antrian Dapur', '厨房队列')}</h3>
          <p className="text-sm text-gray-600 mt-1">8 {t('items to prepare', 'item harus dibuat', '待准备项目')}</p>
        </div>

        <div className="space-y-3">
          {[
            { order: '#1842', table: 5, item: t('Special Fried Rice', 'Nasi Goreng Spesial', '特别炒饭'), qty: 2, time: '2m', priority: 'high' },
            { order: '#1843', table: 12, item: t('Fried Noodles', 'Mie Goreng', '炒面'), qty: 1, time: '5m', priority: 'normal' },
            { order: '#1844', table: 8, item: t('Grilled Chicken', 'Ayam Bakar', '烤鸡'), qty: 3, time: '1m', priority: 'high' },
          ].map((item, i) => {
            const priorityColor = item.priority === 'high' ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'
            
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-4 shadow-md border-2 ${priorityColor}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-gray-500">{item.order}</span>
                      <span className="text-xs font-bold text-gray-500">•</span>
                      <span className="text-xs font-bold text-gray-500">
                        {t('Table', 'Meja', '桌号')} {item.table}
                      </span>
                    </div>
                    <p className="font-bold text-gray-900">{item.item}</p>
                    <p className="text-sm text-gray-600 mt-1">{t('Qty', 'Jml', '数量')}: {item.qty}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-xl font-bold ${item.priority === 'high' ? 'text-red-600' : 'text-gray-600'}`}>
                      {item.time}
                    </div>
                    {item.priority === 'high' && (
                      <span className="text-xs font-bold text-red-600 mt-1 inline-block">
                        {t('URGENT', 'PENTING', '紧急')}
                      </span>
                    )}
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-2 rounded-lg font-bold mt-2 ${
                    item.priority === 'high'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-900 text-white'
                  }`}
                >
                  {t('Mark Ready', 'Tandai Siap', '标记为完成')}
                </motion.button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
