"use client"
import { motion } from "framer-motion"
import { getMockupTranslator } from "./mockup-i18n"

export function KitchenQueueMockup({ color, language }: { color: string; language: string }) {
  const t = getMockupTranslator(language)
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative aspect-[4/5] rounded-3xl p-8 shadow-2xl border" style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`, borderColor: `${color}30` }}>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{t('Kitchen Queue', 'Antrian Dapur', '厨房队列')}</h3>
          <p className="text-sm text-gray-600 mt-1">8 {t('items to prepare', 'item harus dibuat', '待准备项目')}</p>
        </div>
        <div className="space-y-3">
          {[
            { order: '#1842', table: 5, item: t('Fried Rice', 'Nasi Goreng', '炒饭'), qty: 2, time: '2m', priority: 'high' },
            { order: '#1843', table: 12, item: t('Fried Noodles', 'Mie Goreng', '炒面'), qty: 1, time: '5m', priority: 'normal' },
            { order: '#1844', table: 8, item: t('Grilled Chicken', 'Ayam Bakar', '烤鸡'), qty: 3, time: '1m', priority: 'high' },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
              className={`rounded-2xl p-4 shadow-md border-2 ${item.priority === 'high' ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'}`}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-gray-500">{item.order}</span>
                    <span className="text-xs font-bold text-gray-500">•</span>
                    <span className="text-xs font-bold text-gray-500">{t('Table', 'Meja', '桌号')} {item.table}</span>
                  </div>
                  <p className="font-bold text-gray-900">{item.item}</p>
                  <p className="text-sm text-gray-600 mt-1">{t('Qty', 'Jml', '数量')}: {item.qty}</p>
                </div>
                <div className="text-right">
                  <div className={`text-xl font-bold ${item.priority === 'high' ? 'text-red-600' : 'text-gray-600'}`}>{item.time}</div>
                  {item.priority === 'high' && <span className="text-xs font-bold text-red-600 mt-1 inline-block">{t('URGENT', 'PENTING', '紧急')}</span>}
                </div>
              </div>
              <button className={`w-full py-2 rounded-lg font-bold mt-2 ${item.priority === 'high' ? 'bg-red-600 text-white' : 'bg-gray-900 text-white'}`}>
                {t('Mark Ready', 'Tandai Siap', '标记为完成')}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function OrderDetailKitchenMockup({ color, language }: { color: string; language: string }) {
  const t = getMockupTranslator(language)
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative aspect-[4/5] rounded-3xl p-8 shadow-2xl border" style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`, borderColor: `${color}30` }}>
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">{t('Order', 'Pesanan', '订单')} #1842</h3>
            <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">{t('Cooking', 'Memasak', '烹饪中')}</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">{t('Table', 'Meja', '桌号')} 5 • 2 {t('min ago', 'menit lalu', '分钟前')}</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100 mb-4">
          <h4 className="font-bold text-gray-900 mb-4">{t('Main Course', 'Makanan Utama', '主菜')}</h4>
          <div className="space-y-3">
            {[
              { name: t('Special Fried Rice', 'Nasi Goreng Spesial', '特别炒饭'), qty: 2, notes: t('Extra spicy', 'Lebih pedas', '加辣'), time: '5m' },
              { name: t('Fried Noodles', 'Mie Goreng', '炒面'), qty: 1, notes: t('No vegetables', 'Tanpa sayuran', '不要蔬菜'), time: '4m' },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-sm">{item.qty}</div>
                    <div>
                      <p className="font-bold text-gray-900">{item.name}</p>
                      <p className="text-xs text-amber-600 mt-1">⏱ {item.time}</p>
                    </div>
                  </div>
                </div>
                {item.notes && <p className="text-xs text-gray-600 bg-yellow-50 rounded px-2 py-1 mt-2">📝 {item.notes}</p>}
              </div>
            ))}
          </div>
        </div>
        <button className="w-full py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-bold shadow-lg">
          {t('Mark All Ready', 'Tandai Semua Siap', '标记全部完成')}
        </button>
      </div>
    </div>
  )
}

export function ReadyItemsMockup({ color, language }: { color: string; language: string }) {
  const t = getMockupTranslator(language)
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative aspect-[4/5] rounded-3xl p-8 shadow-2xl border" style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`, borderColor: `${color}30` }}>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{t('Ready for Pickup', 'Siap Diambil', '待取餐')}</h3>
          <p className="text-sm text-gray-600 mt-1">5 {t('orders ready', 'pesanan siap', '订单已就绪')}</p>
        </div>
        <div className="space-y-3">
          {[
            { order: '#1840', table: 3, items: 3, time: '2m', waiter: 'Budi' },
            { order: '#1841', table: 7, items: 2, time: '1m', waiter: 'Sarah' },
            { order: '#1839', table: 12, items: 4, time: '5m', waiter: 'Ahmad' },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 shadow-md border-2 border-green-300">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">{item.order}</span>
                    <span className="px-2 py-0.5 bg-green-200 text-green-800 rounded-full text-xs font-bold">✓ {t('READY', 'SIAP', '就绪')}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{t('Table', 'Meja', '桌号')} {item.table} • {item.items} {t('items', 'item', '项')}</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-green-600">{item.time}</div>
                  <p className="text-xs text-gray-600">{item.waiter}</p>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-green-200">
                <p className="text-xs text-gray-600">{t('Waiting for waiter pickup', 'Menunggu pelayan mengambil', '等待服务员取餐')}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function KitchenStatsMockup({ color, language }: { color: string; language: string }) {
  const t = getMockupTranslator(language)
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative aspect-[4/5] rounded-3xl p-8 shadow-2xl border" style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`, borderColor: `${color}30` }}>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{t('Kitchen Performance', 'Performa Dapur', '厨房绩效')}</h3>
          <p className="text-sm text-gray-600 mt-1">{t('Today', 'Hari Ini', '今日')}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { label: t('Orders Done', 'Selesai', '已完成订单'), value: '48', color: 'text-green-600' },
            { label: t('In Queue', 'Dalam Antrian', '队列中'), value: '8', color: 'text-amber-600' },
            { label: t('Avg Time', 'Rata-rata', '平均时间'), value: '12m', color: 'text-blue-600' },
            { label: t('Efficiency', 'Efisiensi', '效率'), value: '94%', color: 'text-green-600' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
          <p className="font-bold text-gray-900 mb-4">{t('Orders by Hour', 'Pesanan per Jam', '每小时订单')}</p>
          <div className="flex items-end justify-between h-32 gap-2">
            {[40, 35, 50, 45, 60, 55, 48].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <motion.div initial={{ height: 0 }} animate={{ height: `${height}%` }} transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="w-full bg-gradient-to-t from-amber-600 to-amber-400 rounded-t-lg"></motion.div>
                <span className="text-xs text-gray-600">{8 + i}:00</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
