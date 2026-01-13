"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Wand2, Copy, CheckCircle2, UtensilsCrossed, Store, Scissors } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

type BusinessType = "resto" | "toko" | "pro";

export function AISmartPasteDemo() {
  const { language } = useLanguage();
  const [activeType, setActiveType] = useState<BusinessType>("resto");
  const [textInput, setTextInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  const pasteData = {
    resto: {
      icon: UtensilsCrossed,
      label: { en: "Restaurant", id: "Restoran" },
      example: `# MENU
• Nasi Goreng Spesial - Rp 35.000
• Es Teh Manis - Rp 5.000
• Ayam Geprek - Rp 30.000

# BAHAN BAKU
• Beras (5kg) - Rp 65.000
• Ayam Fillet (2kg) - Rp 80.000
• Cabai Rawit (500g) - Rp 15.000

# RESEP
• Nasi Goreng: 200g beras, 50g telur, 30g bumbu
• Ayam Geprek: 150g ayam, 20g sambal

# SUPPLIER
• CV Berkah Jaya - 0812-3456-7890
• Toko Bumbu Segar - 0813-4567-8901`,
      results: {
        menu: [
          { name: "Nasi Goreng Spesial", price: "Rp 35.000" },
          { name: "Es Teh Manis", price: "Rp 5.000" },
          { name: "Ayam Geprek", price: "Rp 30.000" }
        ],
        ingredients: [
          { name: "Beras", qty: "5kg", cost: "Rp 65.000" },
          { name: "Ayam Fillet", qty: "2kg", cost: "Rp 80.000" },
          { name: "Cabai Rawit", qty: "500g", cost: "Rp 15.000" }
        ],
        recipes: [
          { name: "Nasi Goreng", items: "Beras, Telur, Bumbu" },
          { name: "Ayam Geprek", items: "Ayam, Sambal" }
        ],
        suppliers: [
          { name: "CV Berkah Jaya", contact: "0812-3456-7890" },
          { name: "Toko Bumbu Segar", contact: "0813-4567-8901" }
        ]
      }
    },
    toko: {
      icon: Store,
      label: { en: "Store", id: "Toko" },
      example: `# PRODUK
• Indomie Goreng (1 karton) - Rp 85.000 - Barcode: 089686050004
• Aqua 600ml (1 dus) - Rp 42.000 - Barcode: 899999002225
• Beng-beng (1 box) - Rp 60.000 - Barcode: 089686041002

# PAKET
• Paket Hemat: Indomie + Aqua - Rp 120.000

# SUPPLIER
• PT Distributor Indo - 0821-1234-5678
• CV Maju Bersama - 0822-2345-6789`,
      results: {
        items: [
          { name: "Indomie Goreng", price: "Rp 85.000", unit: "1 karton" },
          { name: "Aqua 600ml", price: "Rp 42.000", unit: "1 dus" },
          { name: "Beng-beng", price: "Rp 60.000", unit: "1 box" }
        ],
        bundles: [
          { name: "Paket Hemat", items: "Indomie + Aqua", price: "Rp 120.000" }
        ],
        barcodes: [
          { product: "Indomie Goreng", code: "089686050004" },
          { product: "Aqua 600ml", code: "899999002225" },
          { product: "Beng-beng", code: "089686041002" }
        ],
        suppliers: [
          { name: "PT Distributor Indo", contact: "0821-1234-5678" },
          { name: "CV Maju Bersama", contact: "0822-2345-6789" }
        ]
      }
    },
    pro: {
      icon: Scissors,
      label: { en: "Professional Services", id: "Layanan Profesional" },
      example: `# LAYANAN
• Potong Rambut Pria - Rp 35.000 - 30 menit
• Keramas + Blow - Rp 25.000 - 20 menit
• Cat Rambut - Rp 150.000 - 90 menit

# PAKET TREATMENT
• Paket Grooming: Potong + Keramas + Styling - Rp 75.000

# STAFF
• Budi (Senior Stylist) - Spesialisasi: Cat & Highlight
• Andi (Barber) - Spesialisasi: Potong Pria`,
      results: {
        services: [
          { name: "Potong Rambut Pria", price: "Rp 35.000", duration: "30 menit" },
          { name: "Keramas + Blow", price: "Rp 25.000", duration: "20 menit" },
          { name: "Cat Rambut", price: "Rp 150.000", duration: "90 menit" }
        ],
        packages: [
          { name: "Paket Grooming", items: "Potong + Keramas + Styling", price: "Rp 75.000" }
        ],
        staff: [
          { name: "Budi", role: "Senior Stylist", specialty: "Cat & Highlight" },
          { name: "Andi", role: "Barber", specialty: "Potong Pria" }
        ]
      }
    }
  };

  const businessTypes = [
    { key: "resto" as BusinessType, icon: UtensilsCrossed, label: "Resto" },
    { key: "toko" as BusinessType, icon: Store, label: "Toko" },
    { key: "pro" as BusinessType, icon: Scissors, label: "Pro" }
  ];

  const currentData = pasteData[activeType];
  const textExample = currentData.example;

  useEffect(() => {
    setTextInput(textExample);
    setShowResults(false);
  }, [activeType, textExample]);

  const handleCopyExample = () => {
    navigator.clipboard.writeText(currentData.example);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handlePaste = () => {
    setIsProcessing(true);
    setShowResults(false);

    setTimeout(() => {
      setIsProcessing(false);
      setShowResults(true);
    }, 2500);
  };

  const Icon = currentData.icon;

  // Count total items and categories
  const totalItems = Object.values(currentData.results).reduce((sum, arr) => sum + arr.length, 0);
  const totalCategories = Object.keys(currentData.results).length;

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-100">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            {language === "en" ? "AI Magic Paste" : language === "id" ? "Tempel Ajaib AI" : "AI 智能粘贴"}
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-3">
            {language === "en" ? "One Paste, Extract Everything" : language === "id" ? "Satu Tempel, Ekstrak Semua" : "一次粘贴，提取所有内容"}
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {language === "en"
              ? "AI automatically extracts and organizes menu, ingredients, recipes, suppliers, and more from a single paste"
              : language === "id"
              ? "AI otomatis mengekstrak dan mengorganisir menu, bahan baku, resep, supplier, dan lainnya dari satu tempelan"
              : "AI 自动从一次粘贴中提取和组织菜单、食材、配方、供应商等内容"}
          </p>
        </div>

        {/* Business Type Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {businessTypes.map((type) => {
            const TypeIcon = type.icon;
            return (
              <button
                key={type.key}
                onClick={() => setActiveType(type.key)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  activeType === type.key
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                <TypeIcon className="w-5 h-5" />
                {type.label}
              </button>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <Icon className="w-5 h-5 text-purple-500" />
                {language === "en" ? "Paste Your Data" : language === "id" ? "Tempel Data Anda" : "粘贴你的数据"}
              </h4>
              <button
                onClick={handleCopyExample}
                className="flex items-center gap-1 text-xs text-purple-600 hover:text-purple-700 transition-colors"
              >
                {copiedText ? <CheckCircle2 className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copiedText ? (language === "en" ? "Copied!" : language === "id" ? "Tersalin!" : "已复制!") : (language === "en" ? "Copy Example" : language === "id" ? "Salin Contoh" : "复制示例")}
              </button>
            </div>

            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="w-full h-80 p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm"
              placeholder={language === "en" ? "Paste your mixed data here..." : language === "id" ? "Tempel data campuran Anda di sini..." : "在此粘贴你的混合数据..."}
            />

            <button
              onClick={handlePaste}
              disabled={isProcessing}
              className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Wand2 className="w-5 h-5 animate-spin" />
                  {language === "en" ? "Processing..." : language === "id" ? "Memproses..." : "处理中..."}
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  {language === "en" ? "Extract with AI" : language === "id" ? "Ekstrak dengan AI" : "用AI提取"}
                </>
              )}
            </button>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h4 className="font-semibold text-gray-900 mb-4">
              {language === "en" ? "AI Results" : language === "id" ? "Hasil AI" : "AI结果"}
            </h4>

            <AnimatePresence mode="wait">
              {isProcessing && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-80"
                >
                  <Wand2 className="w-12 h-12 text-purple-500 animate-spin mb-4" />
                  <p className="text-gray-600 text-center">
                    {language === "en" ? "AI is analyzing and organizing your data..." : language === "id" ? "AI sedang menganalisis dan mengorganisir data Anda..." : "AI正在分析和组织你的数据..."}
                  </p>
                </motion.div>
              )}

              {showResults && !isProcessing && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4 h-80 overflow-y-auto"
                >
                  {/* Success Message */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-green-800 font-medium">
                          {language === "en" ? "Successfully extracted!" : language === "id" ? "Berhasil diekstrak!" : "提取成功！"}
                        </p>
                        <p className="text-green-700 text-sm mt-1">
                          {language === "en"
                            ? `${totalItems} items from ${totalCategories} categories automatically organized`
                            : language === "id"
                            ? `${totalItems} item dari ${totalCategories} kategori terorganisir otomatis`
                            : `自动组织了${totalCategories}个类别中的${totalItems}个项目`}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Results Display */}
                  {Object.entries(currentData.results).map(([category, items]) => (
                    <div key={category} className="border-b border-gray-100 pb-3 last:border-0">
                      <h5 className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-2">
                        {category === "menu" && (language === "en" ? "Menu Items" : language === "id" ? "Item Menu" : "菜单项目")}
                        {category === "ingredients" && (language === "en" ? "Ingredients" : language === "id" ? "Bahan Baku" : "食材")}
                        {category === "recipes" && (language === "en" ? "Recipes" : language === "id" ? "Resep" : "配方")}
                        {category === "suppliers" && (language === "en" ? "Suppliers" : language === "id" ? "Supplier" : "供应商")}
                        {category === "items" && (language === "en" ? "Products" : language === "id" ? "Produk" : "产品")}
                        {category === "bundles" && (language === "en" ? "Bundles" : language === "id" ? "Paket" : "套餐")}
                        {category === "barcodes" && (language === "en" ? "Barcodes" : language === "id" ? "Barcode" : "条形码")}
                        {category === "services" && (language === "en" ? "Services" : language === "id" ? "Layanan" : "服务")}
                        {category === "packages" && (language === "en" ? "Packages" : language === "id" ? "Paket" : "套餐")}
                        {category === "staff" && (language === "en" ? "Staff" : language === "id" ? "Staff" : "员工")}
                      </h5>
                      <div className="space-y-2">
                        {items.map((item: any, idx: number) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg text-sm"
                          >
                            <span className="font-medium text-gray-900">{item.name}</span>
                            <span className="text-gray-600 text-xs">
                              {item.price || item.cost || item.contact || item.code || item.duration || item.role || item.items}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {!showResults && !isProcessing && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center h-80 text-gray-400"
                >
                  <div className="text-center">
                    <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>{language === "en" ? "Click 'Extract with AI' to see results" : language === "id" ? "Klik 'Ekstrak dengan AI' untuk melihat hasil" : "点击'用AI提取'查看结果"}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            {language === "en"
              ? "✨ AI automatically detects and extracts ALL data types from your single paste - no manual categorization needed"
              : language === "id"
              ? "✨ AI otomatis mendeteksi dan mengekstrak SEMUA jenis data dari satu tempelan - tanpa perlu kategorisasi manual"
              : "✨ AI自动从一次粘贴中检测和提取所有数据类型 - 无需手动分类"}
          </p>
        </div>
      </div>
    </div>
  );
}
