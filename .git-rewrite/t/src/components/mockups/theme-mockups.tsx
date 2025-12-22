"use client"
import * as React from "react"
import { motion } from "framer-motion"

export function InteractiveThemeMockup({ color, language }: { color: string; language: string }) {
  const isEnglish = language === 'en'
  const [selectedColor, setSelectedColor] = React.useState("#FF5A5F")
  const [selectedName, setSelectedName] = React.useState(isEnglish ? "Kadai Red" : "Merah Kadai")

  const themeColors = [
    { name: isEnglish ? "Kadai Red" : "Merah Kadai", hex: "#FF5A5F" },
    { name: isEnglish ? "Blue" : "Biru", hex: "#3B82F6" },
    { name: isEnglish ? "Green" : "Hijau", hex: "#10B981" },
    { name: isEnglish ? "Purple" : "Ungu", hex: "#8B5CF6" },
    { name: isEnglish ? "Orange" : "Orange", hex: "#F59E0B" },
    { name: isEnglish ? "Pink" : "Pink", hex: "#EC4899" },
    { name: isEnglish ? "Cyan" : "Cyan", hex: "#06B6D4" },
    { name: isEnglish ? "Teal" : "Teal", hex: "#14B8A6" },
    { name: isEnglish ? "Indigo" : "Indigo", hex: "#6366F1" },
    { name: isEnglish ? "Lime" : "Lime", hex: "#84CC16" },
    { name: isEnglish ? "Amber" : "Amber", hex: "#F59E0B" },
    { name: isEnglish ? "Rose" : "Rose", hex: "#F43F5E" },
  ]

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative aspect-[4/5] rounded-3xl p-8 shadow-2xl border" style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`, borderColor: `${color}30` }}>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{isEnglish ? 'Interface Theme' : 'Tema Interface'}</h3>
          <p className="text-sm text-gray-600 mt-1">{isEnglish ? 'Choose your theme color' : 'Pilih warna tema Anda'}</p>
        </div>

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
              <p className="text-xs text-gray-600">{isEnglish ? 'Theme Preview' : 'Preview Tema'}</p>
              <p className="text-lg font-bold text-gray-900">{selectedName}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <motion.div 
              className="h-10 rounded-lg flex items-center justify-center text-white font-semibold text-sm shadow-md"
              style={{ backgroundColor: selectedColor }}
              animate={{ backgroundColor: selectedColor }}
              transition={{ duration: 0.3 }}
            >
              {isEnglish ? 'Primary Button' : 'Tombol Utama'}
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

        <div className="mb-6">
          <p className="text-sm font-bold text-gray-900 mb-3">{isEnglish ? 'Choose Color (12 themes)' : 'Pilih Warna (12 tema)'}</p>
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
                  ...(selectedColor === theme.hex ? { '--tw-ring-color': theme.hex } as React.CSSProperties : {})
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

        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-4 border-2 border-purple-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md">
              <span className="text-xl">✨</span>
            </div>
            <div>
              <p className="text-xs font-bold text-purple-900">{isEnglish ? 'Premium Feature' : 'Fitur Premium'}</p>
              <p className="text-xs text-purple-700">{isEnglish ? 'Custom Color Picker' : 'Pemilih Warna Custom'}</p>
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
      </div>
    </div>
  )
}

export function ThemeSelectionMockup({ color, language }: { color: string; language: string }) {
  const isEnglish = language === 'en'
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative aspect-[4/5] rounded-3xl p-8 shadow-2xl border" style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`, borderColor: `${color}30` }}>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{isEnglish ? 'Choose Theme' : 'Pilih Tema'}</h3>
          <p className="text-sm text-gray-600 mt-1">{isEnglish ? 'Pre-made themes' : 'Tema siap pakai'}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: isEnglish ? 'Classic Red' : 'Merah Klasik', color: 'from-red-500 to-pink-500', active: true },
            { name: isEnglish ? 'Ocean Blue' : 'Biru Laut', color: 'from-blue-500 to-cyan-500', active: false },
            { name: isEnglish ? 'Forest Green' : 'Hijau Hutan', color: 'from-green-500 to-emerald-500', active: false },
            { name: isEnglish ? 'Sunset Orange' : 'Oranye Senja', color: 'from-orange-500 to-amber-500', active: false },
            { name: isEnglish ? 'Royal Purple' : 'Ungu Kerajaan', color: 'from-purple-500 to-pink-500', active: false },
            { name: isEnglish ? 'Custom' : 'Kustom', color: 'from-gray-400 to-gray-600', active: false },
          ].map((theme, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
              className={`relative rounded-2xl p-4 shadow-lg bg-gradient-to-br ${theme.color} cursor-pointer ${
                theme.active ? 'ring-4 ring-yellow-400' : ''
              }`}>
              {theme.active && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs">
                  ✓
                </div>
              )}
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full mx-auto mb-2"></div>
                <p className="text-white font-bold text-sm">{theme.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <button className="w-full mt-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold shadow-lg">
          {isEnglish ? 'Apply Theme' : 'Terapkan Tema'}
        </button>
      </div>
    </div>
  )
}

export function ColorPickerMockup({ color, language }: { color: string; language: string }) {
  const isEnglish = language === 'en'
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative aspect-[4/5] rounded-3xl p-8 shadow-2xl border" style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`, borderColor: `${color}30` }}>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{isEnglish ? 'Custom Colors' : 'Warna Kustom'}</h3>
          <p className="text-sm text-gray-600 mt-1">{isEnglish ? 'Create your palette' : 'Buat palet Anda'}</p>
        </div>
        <div className="space-y-5">
          <div>
            <label className="text-xs font-bold text-gray-600 mb-2 block">{isEnglish ? 'Primary Color' : 'Warna Utama'}</label>
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl border-4 border-white shadow-lg"></div>
              <div className="flex-1 bg-white rounded-xl p-3 border-2 border-gray-200">
                <p className="font-mono text-gray-900">#8B5CF6</p>
              </div>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 mb-2 block">{isEnglish ? 'Secondary Color' : 'Warna Sekunder'}</label>
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-700 rounded-2xl border-4 border-white shadow-lg"></div>
              <div className="flex-1 bg-white rounded-xl p-3 border-2 border-gray-200">
                <p className="font-mono text-gray-900">#EC4899</p>
              </div>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 mb-2 block">{isEnglish ? 'Accent Color' : 'Warna Aksen'}</label>
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-700 rounded-2xl border-4 border-white shadow-lg"></div>
              <div className="flex-1 bg-white rounded-xl p-3 border-2 border-gray-200">
                <p className="font-mono text-gray-900">#F59E0B</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 bg-white rounded-2xl p-4 shadow-md border border-gray-100">
          <p className="text-xs font-bold text-gray-600 mb-3">{isEnglish ? 'Quick Palette' : 'Palet Cepat'}</p>
          <div className="grid grid-cols-6 gap-2">
            {['#FF5A5F', '#0066FF', '#00D4AA', '#FFB020', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#6366F1', '#EF4444', '#14B8A6', '#F97316'].map((c, i) => (
              <div key={i} className="w-full aspect-square rounded-lg cursor-pointer hover:scale-110 transition-transform" style={{ backgroundColor: c }}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function ThemePreviewMockup({ color, language }: { color: string; language: string }) {
  const isEnglish = language === 'en'
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative aspect-[4/5] rounded-3xl p-8 shadow-2xl border" style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`, borderColor: `${color}30` }}>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{isEnglish ? 'Theme Preview' : 'Preview Tema'}</h3>
          <p className="text-sm text-gray-600 mt-1">{isEnglish ? 'See it in action' : 'Lihat hasilnya'}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between text-white mb-3">
              <span className="font-bold">{isEnglish ? 'Dashboard' : 'Dasbor'}</span>
              <div className="w-8 h-8 bg-white/20 rounded-full"></div>
            </div>
            <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
              <p className="text-xs text-white/80 mb-1">{isEnglish ? 'Total Sales' : 'Total Penjualan'}</p>
              <p className="text-xl font-bold text-white">Rp 12.5M</p>
            </div>
          </div>
          <div className="space-y-2">
            {[
              { label: isEnglish ? 'New Order' : 'Pesanan Baru', icon: '🛒' },
              { label: isEnglish ? 'Menu' : 'Menu', icon: '📋' },
              { label: isEnglish ? 'Tables' : 'Meja', icon: '🍽️' },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-3 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-xl">
                  {item.icon}
                </div>
                <span className="font-bold text-gray-900">{item.label}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-bold">
            {isEnglish ? 'Action Button' : 'Tombol Aksi'}
          </button>
        </div>
        <div className="mt-4 flex gap-2">
          <button className="flex-1 py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-xl font-bold">
            {isEnglish ? 'Cancel' : 'Batal'}
          </button>
          <button className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold shadow-lg">
            {isEnglish ? 'Apply' : 'Terapkan'}
          </button>
        </div>
      </div>
    </div>
  )
}

export function CustomBrandingMockup({ color, language }: { color: string; language: string }) {
  const isEnglish = language === 'en'
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative aspect-[4/5] rounded-3xl p-8 shadow-2xl border" style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`, borderColor: `${color}30` }}>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{isEnglish ? 'Custom Branding' : 'Branding Kustom'}</h3>
          <p className="text-sm text-gray-600 mt-1">{isEnglish ? 'Your brand identity' : 'Identitas brand Anda'}</p>
        </div>
        <div className="space-y-5">
          <div>
            <label className="text-xs font-bold text-gray-600 mb-2 block">{isEnglish ? 'Restaurant Logo' : 'Logo Restoran'}</label>
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mx-auto mb-3 flex items-center justify-center text-4xl">
                🍽️
              </div>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-bold">
                {isEnglish ? 'Upload Logo' : 'Upload Logo'}
              </button>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 mb-2 block">{isEnglish ? 'Business Name' : 'Nama Bisnis'}</label>
            <div className="bg-white rounded-xl p-3 border-2 border-gray-200">
              <p className="font-bold text-gray-900">Warung Makan Berkah</p>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 mb-2 block">{isEnglish ? 'Tagline' : 'Slogan'}</label>
            <div className="bg-white rounded-xl p-3 border-2 border-gray-200">
              <p className="text-sm text-gray-900">{isEnglish ? 'Delicious food, happy customers' : 'Makanan lezat, pelanggan senang'}</p>
            </div>
          </div>
        </div>
        <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border-2 border-purple-200">
          <div className="flex items-start gap-3">
            <div className="text-2xl">✨</div>
            <div>
              <p className="font-bold text-purple-900 text-sm mb-1">{isEnglish ? 'Pro Tip' : 'Tips Pro'}</p>
              <p className="text-xs text-purple-700">
                {isEnglish 
                  ? 'Your logo will appear on receipts, QR menus, and customer-facing screens.' 
                  : 'Logo Anda akan muncul di struk, menu QR, dan layar pelanggan.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}