"use client"
import * as React from "react"
import { motion } from "framer-motion"
import { getMockupTranslator } from "./mockup-i18n"

export function InteractiveThemeMockup({ color, language }: { color: string; language: string }) {
  const t = getMockupTranslator(language)
  const [selectedColor, setSelectedColor] = React.useState("#FF5A5F")
  const [selectedName, setSelectedName] = React.useState(t('Kadai Red', 'Merah Kadai', 'Kadai 红色'))

  const themeColors = [
    { name: t('Kadai Red', 'Merah Kadai', 'Kadai 红色'), hex: "#FF5A5F" },
    { name: t('Blue', 'Biru', '蓝色'), hex: "#3B82F6" },
    { name: t('Green', 'Hijau', '绿色'), hex: "#10B981" },
    { name: t('Purple', 'Ungu', '紫色'), hex: "#8B5CF6" },
    { name: t('Orange', 'Orange', '橙色'), hex: "#F59E0B" },
    { name: t('Pink', 'Pink', '粉色'), hex: "#EC4899" },
    { name: t('Cyan', 'Cyan', '青色'), hex: "#06B6D4" },
    { name: t('Teal', 'Teal', '蓝绿色'), hex: "#14B8A6" },
    { name: t('Indigo', 'Indigo', '靛蓝色'), hex: "#6366F1" },
    { name: t('Lime', 'Lime', '酸橙色'), hex: "#84CC16" },
    { name: t('Amber', 'Amber', '琥珀色'), hex: "#F59E0B" },
    { name: t('Rose', 'Rose', '玫瑰色'), hex: "#F43F5E" },
  ]

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative aspect-[4/5] rounded-3xl p-8 shadow-2xl border" style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`, borderColor: `${color}30` }}>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{t('Interface Theme', 'Tema Interface', '界面主题')}</h3>
          <p className="text-sm text-gray-600 mt-1">{t('Choose your theme color', 'Pilih warna tema Anda', '选择您的主题颜色')}</p>
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
              <p className="text-xs text-gray-600">{t('Theme Preview', 'Preview Tema', '主题预览')}</p>
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
              {t('Primary Button', 'Tombol Utama', '主要按钮')}
            </motion.div>
            <div className="grid grid-cols-2 gap-2">
              <motion.div 
                className="h-8 rounded-lg border-2 flex items-center justify-center text-xs font-semibold" 
                style={{ borderColor: selectedColor, color: selectedColor }}
                animate={{ borderColor: selectedColor, color: selectedColor }}
                transition={{ duration: 0.3 }}
              >
                {t('Outline', 'Garis Luar', '轮廓')}
              </motion.div>
              <motion.div 
                className="h-8 rounded-lg flex items-center justify-center text-xs font-semibold" 
                style={{ backgroundColor: `${selectedColor}20`, color: selectedColor }}
                animate={{ backgroundColor: `${selectedColor}20`, color: selectedColor }}
                transition={{ duration: 0.3 }}
              >
                {t('Soft', 'Lembut', '柔和')}
              </motion.div>
            </div>
          </div>
        </motion.div>

        <div className="mb-6">
          <p className="text-sm font-bold text-gray-900 mb-3">{t('Choose Color (12 themes)', 'Pilih Warna (12 tema)', '选择颜色 (12 个主题)')}</p>
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
              <p className="text-xs font-bold text-purple-900">{t('Premium Feature', 'Fitur Premium', '高级功能')}</p>
              <p className="text-xs text-purple-700">{t('Custom Color Picker', 'Pemilih Warna Custom', '自定义颜色选择器')}</p>
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
  const t = getMockupTranslator(language)
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative aspect-[4/5] rounded-3xl p-8 shadow-2xl border" style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`, borderColor: `${color}30` }}>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{t('Choose Theme', 'Pilih Tema', '选择主题')}</h3>
          <p className="text-sm text-gray-600 mt-1">{t('Pre-made themes', 'Tema siap pakai', '预制主题')}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: t('Classic Red', 'Merah Klasik', '经典红'), color: 'from-red-500 to-pink-500', active: true },
            { name: t('Ocean Blue', 'Biru Laut', '海洋蓝'), color: 'from-blue-500 to-cyan-500', active: false },
            { name: t('Forest Green', 'Hijau Hutan', '森林绿'), color: 'from-green-500 to-emerald-500', active: false },
            { name: t('Sunset Orange', 'Oranye Senja', '日落橙'), color: 'from-orange-500 to-amber-500', active: false },
            { name: t('Royal Purple', 'Ungu Kerajaan', '皇家紫'), color: 'from-purple-500 to-pink-500', active: false },
            { name: t('Custom', 'Kustom', '自定义'), color: 'from-gray-400 to-gray-600', active: false },
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
          {t('Apply Theme', 'Terapkan Tema', '应用主题')}
        </button>
      </div>
    </div>
  )
}

export function ColorPickerMockup({ color, language }: { color: string; language: string }) {
  const t = getMockupTranslator(language)
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative aspect-[4/5] rounded-3xl p-8 shadow-2xl border" style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`, borderColor: `${color}30` }}>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{t('Custom Colors', 'Warna Kustom', '自定义颜色')}</h3>
          <p className="text-sm text-gray-600 mt-1">{t('Create your palette', 'Buat palet Anda', '创建您的调色板')}</p>
        </div>
        <div className="space-y-5">
          <div>
            <label className="text-xs font-bold text-gray-600 mb-2 block">{t('Primary Color', 'Warna Utama', '主要颜色')}</label>
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl border-4 border-white shadow-lg"></div>
              <div className="flex-1 bg-white rounded-xl p-3 border-2 border-gray-200">
                <p className="font-mono text-gray-900">#8B5CF6</p>
              </div>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 mb-2 block">{t('Secondary Color', 'Warna Sekunder', '次要颜色')}</label>
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-700 rounded-2xl border-4 border-white shadow-lg"></div>
              <div className="flex-1 bg-white rounded-xl p-3 border-2 border-gray-200">
                <p className="font-mono text-gray-900">#EC4899</p>
              </div>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 mb-2 block">{t('Accent Color', 'Warna Aksen', '强调色')}</label>
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-700 rounded-2xl border-4 border-white shadow-lg"></div>
              <div className="flex-1 bg-white rounded-xl p-3 border-2 border-gray-200">
                <p className="font-mono text-gray-900">#F59E0B</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 bg-white rounded-2xl p-4 shadow-md border border-gray-100">
          <p className="text-xs font-bold text-gray-600 mb-3">{t('Quick Palette', 'Palet Cepat', '快速调色板')}</p>
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
  const t = getMockupTranslator(language)
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative aspect-[4/5] rounded-3xl p-8 shadow-2xl border" style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`, borderColor: `${color}30` }}>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{t('Theme Preview', 'Preview Tema', '主题预览')}</h3>
          <p className="text-sm text-gray-600 mt-1">{t('See it in action', 'Lihat hasilnya', '查看效果')}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between text-white mb-3">
              <span className="font-bold">{t('Dashboard', 'Dasbor', '仪表板')}</span>
              <div className="w-8 h-8 bg-white/20 rounded-full"></div>
            </div>
            <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
              <p className="text-xs text-white/80 mb-1">{t('Total Sales', 'Total Penjualan', '总销售额')}</p>
              <p className="text-xl font-bold text-white">Rp 12.5M</p>
            </div>
          </div>
          <div className="space-y-2">
            {[
              { label: t('New Order', 'Pesanan Baru', '新订单'), icon: '🛒' },
              { label: t('Menu', 'Menu', '菜单'), icon: '📋' },
              { label: t('Tables', 'Meja', '桌子'), icon: '🍽️' },
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
            {t('Action Button', 'Tombol Aksi', '操作按钮')}
          </button>
        </div>
        <div className="mt-4 flex gap-2">
          <button className="flex-1 py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-xl font-bold">
            {t('Cancel', 'Batal', '取消')}
          </button>
          <button className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold shadow-lg">
            {t('Apply', 'Terapkan', '应用')}
          </button>
        </div>
      </div>
    </div>
  )
}

export function CustomBrandingMockup({ color, language }: { color: string; language: string }) {
  const t = getMockupTranslator(language)
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative aspect-[4/5] rounded-3xl p-8 shadow-2xl border" style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`, borderColor: `${color}30` }}>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{t('Custom Branding', 'Branding Kustom', '自定义品牌')}</h3>
          <p className="text-sm text-gray-600 mt-1">{t('Your brand identity', 'Identitas brand Anda', '您的品牌标识')}</p>
        </div>
        <div className="space-y-5">
          <div>
            <label className="text-xs font-bold text-gray-600 mb-2 block">{t('Store Logo', 'Logo Toko', '店铺图标')}</label>
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mx-auto mb-3 flex items-center justify-center text-4xl">
                🍽️
              </div>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-bold">
                {t('Upload Logo', 'Upload Logo', '上传图标')}
              </button>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 mb-2 block">{t('Business Name', 'Nama Bisnis', '商家名称')}</label>
            <div className="bg-white rounded-xl p-3 border-2 border-gray-200">
              <p className="font-bold text-gray-900">Warung Makan Berkah</p>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 mb-2 block">{t('Tagline', 'Slogan', '标语')}</label>
            <div className="bg-white rounded-xl p-3 border-2 border-gray-200">
              <p className="text-sm text-gray-900">{t('Delicious food, happy customers', 'Makanan lezat, pelanggan senang', '美味佳肴，顾客满意')}</p>
            </div>
          </div>
        </div>
        <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border-2 border-purple-200">
          <div className="flex items-start gap-3">
            <div className="text-2xl">✨</div>
            <div>
              <p className="font-bold text-purple-900 text-sm mb-1">{t('Pro Tip', 'Tips Pro', '专业提示')}</p>
              <p className="text-xs text-purple-700">
                {t(
                  'Your logo will appear on receipts, QR menus, and customer-facing screens.',
                  'Logo Anda akan muncul di struk, menu QR, dan layar pelanggan.',
                  '您的图标将出现在收据、二维码菜单和面向顾客的屏幕上。'
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}