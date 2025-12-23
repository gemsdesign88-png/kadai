"use client"

import { motion } from "framer-motion"
import { getMockupTranslator } from "./mockup-i18n"

// Mockup 1: Menu List
export function MenuListMockup({ color, language }: { color: string; language: string }) {
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
            <h3 className="text-2xl font-bold text-gray-900">{t('Manage Menu', 'Kelola Menu', '管理菜单')}</h3>
            <p className="text-sm text-gray-600 mt-1">{t('24 menus available', '24 menu tersedia', '24 个可用菜单')}</p>
          </div>
        </div>

        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {[
            { name: t('All', 'Semua', '全部'), active: true },
            { name: t('Food', 'Makanan', '食物'), active: false },
            { name: t('Drinks', 'Minuman', '饮料'), active: false },
          ].map((cat, i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap ${
                cat.active ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {[
            { name: t('Fried Rice', 'Nasi Goreng', '炒饭'), price: 25, available: true, image: '🍚' },
            { name: t('Fried Noodles', 'Mie Goreng', '炒面'), price: 22, available: true, image: '🍜' },
            { name: t('Iced Tea', 'Es Teh', '冰茶'), price: 5, available: false, image: '🥤' },
            { name: t('Grilled Chicken', 'Ayam Bakar', '烤鸡'), price: 35, available: true, image: '🍗' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl p-4 shadow-md border border-gray-100 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                  {item.image}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{item.name}</p>
                  <p className="text-sm text-blue-600 font-semibold">Rp {item.price}k</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                item.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {item.available ? t('Available', 'Tersedia', '有货') : t('Out of Stock', 'Habis', '缺货')}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Mockup 2: Add/Edit Menu Item
export function MenuEditorMockup({ color, language }: { color: string; language: string }) {
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
          <h3 className="text-2xl font-bold text-gray-900">{t('Edit Menu Item', 'Edit Item Menu', '编辑菜单项')}</h3>
          <p className="text-sm text-gray-600 mt-1">{t('Special Fried Rice', 'Nasi Goreng Spesial', '特别炒饭')}</p>
        </div>

        <div className="space-y-4">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl mx-auto flex items-center justify-center text-4xl mb-4">
            🍚
          </div>

          <div>
            <label className="text-xs font-bold text-gray-600 mb-2 block">{t('Item Name', 'Nama Item', '项目名称')}</label>
            <div className="bg-white rounded-xl p-3 border-2 border-blue-200">
              <p className="font-semibold text-gray-900">{t('Special Fried Rice', 'Nasi Goreng Spesial', '特别炒饭')}</p>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-600 mb-2 block">{t('Price', 'Harga', '价格')}</label>
            <div className="bg-white rounded-xl p-3 border-2 border-blue-200">
              <p className="font-semibold text-gray-900">Rp 25.000</p>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-600 mb-2 block">{t('Category', 'Kategori', '类别')}</label>
            <div className="bg-white rounded-xl p-3 border-2 border-blue-200">
              <p className="font-semibold text-gray-900">{t('Main Course', 'Makanan Utama', '主菜')}</p>
            </div>
          </div>

          <div className="flex items-center justify-between bg-white rounded-xl p-4 border border-gray-200">
            <span className="font-bold text-gray-900">{t('Available', 'Tersedia', '有货')}</span>
            <div className="w-12 h-6 bg-green-500 rounded-full relative">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold shadow-lg"
        >
          {t('Save Changes', 'Simpan Perubahan', '保存更改')}
        </motion.button>
      </div>
    </div>
  )
}

// Mockup 3: Menu Categories
export function MenuCategoriesMockup({ color, language }: { color: string; language: string }) {
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
          <h3 className="text-2xl font-bold text-gray-900">{t('Menu Categories', 'Kategori Menu', '菜单类别')}</h3>
          <p className="text-sm text-gray-600 mt-1">6 {t('categories', 'kategori', '类别')}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { name: t('Main Course', 'Makanan Utama', '主菜'), count: 12, icon: '🍽️', color: 'from-red-500 to-orange-500' },
            { name: t('Drinks', 'Minuman', '饮料'), count: 8, icon: '🥤', color: 'from-blue-500 to-cyan-500' },
            { name: t('Desserts', 'Pencuci Mulut', '甜点'), count: 6, icon: '🍰', color: 'from-pink-500 to-rose-500' },
            { name: t('Appetizers', 'Pembuka', '前菜'), count: 5, icon: '🥗', color: 'from-green-500 to-emerald-500' },
            { name: t('Snacks', 'Camilan', '小吃'), count: 10, icon: '🍿', color: 'from-yellow-500 to-amber-500' },
            { name: t('Coffee', 'Kopi', '咖啡'), count: 7, icon: '☕', color: 'from-amber-700 to-amber-900' },
          ].map((category, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-2xl mb-3`}>
                {category.icon}
              </div>
              <p className="font-bold text-gray-900 text-sm mb-1">{category.name}</p>
              <p className="text-xs text-gray-600">{category.count} {t('items', 'item', '项')}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Mockup 4: Menu Modifiers
export function MenuModifiersMockup({ color, language }: { color: string; language: string }) {
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
          <h3 className="text-2xl font-bold text-gray-900">{t('Customize Order', 'Sesuaikan Pesanan', '自定义订单')}</h3>
          <p className="text-sm text-gray-600 mt-1">{t('Special Fried Rice', 'Nasi Goreng Spesial', '特别炒饭')}</p>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100">
            <p className="font-bold text-gray-900 mb-3">{t('Spice Level', 'Tingkat Pedas', '辣度')}</p>
            <div className="space-y-2">
              {[
                { name: t('Mild', 'Tidak Pedas', '微辣'), selected: false },
                { name: t('Medium', 'Sedang', '中辣'), selected: true },
                { name: t('Spicy', 'Pedas', '大辣'), selected: false },
              ].map((option, i) => (
                <div key={i} className={`flex items-center gap-3 p-2 rounded-lg ${option.selected ? 'bg-blue-50' : ''}`}>
                  <div className={`w-5 h-5 rounded-full border-2 ${option.selected ? 'border-blue-600 bg-blue-600' : 'border-gray-300'} flex items-center justify-center`}>
                    {option.selected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                  <span className={`font-semibold ${option.selected ? 'text-blue-600' : 'text-gray-700'}`}>{option.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100">
            <p className="font-bold text-gray-900 mb-3">{t('Add-ons', 'Tambahan', '加料')}</p>
            <div className="space-y-2">
              {[
                { name: t('Extra Egg', 'Telur Tambahan', '加蛋'), price: 5, selected: true },
                { name: t('Extra Chicken', 'Ayam Tambahan', '加鸡肉'), price: 10, selected: false },
                { name: t('Crackers', 'Kerupuk', '虾饼'), price: 2, selected: true },
              ].map((addon, i) => (
                <div key={i} className="flex items-center justify-between p-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded ${addon.selected ? 'bg-blue-600' : 'border-2 border-gray-300'} flex items-center justify-center`}>
                      {addon.selected && <span className="text-white text-xs">✓</span>}
                    </div>
                    <span className="font-semibold text-gray-700">{addon.name}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">+Rp {addon.price}k</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
