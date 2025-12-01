"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

export default function MenuFeaturePage() {
  const { language } = useLanguage()

  return (
    <main className="bg-white">
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
        <Container>
          <Link 
            href="/features"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-[#FF5A5F] mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {language === "en" ? "Back to Features" : "Kembali ke Fitur"}
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-sm font-bold text-blue-700">Menu Management</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                {language === "en" ? "Flexible Menu Management" : "Manajemen Menu Fleksibel"}
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {language === "en"
                  ? "Manage menu with ease. Add, edit, or delete items instantly with automatic categorization and pricing updates."
                  : "Atur menu dengan mudah. Tambah, edit, atau hapus item dalam sekejap dengan kategorisasi dan update harga otomatis."}
              </p>

              <Link href="/demo">
                <Button size="lg" className="bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] hover:from-[#E8484D] hover:to-[#7C3AED] text-white rounded-full px-8 py-6 text-lg font-bold shadow-xl">
                  {language === "en" ? "Try Demo" : "Coba Demo"}
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative aspect-square"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl"></div>
              <div className="relative p-8">
                <div className="bg-white rounded-2xl p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900">Menu Items</h3>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">84 items</span>
                  </div>
                  <div className="space-y-3">
                    {["Nasi Goreng", "Mie Ayam", "Es Teh Manis"].map((item, i) => (
                      <div key={i} className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-blue-200 rounded-lg"></div>
                            <div>
                              <div className="font-bold text-gray-900">{item}</div>
                              <div className="text-xs text-gray-500">Main Course</div>
                            </div>
                          </div>
                          <div className="font-bold text-blue-600">Rp {(25 + i * 5)}k</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">
            {language === "en" ? "Key Features" : "Fitur Utama"}
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: language === "en" ? "Drag & Drop Organization" : "Organisasi Drag & Drop",
                desc: language === "en" 
                  ? "Arrange menu items easily with intuitive drag and drop interface"
                  : "Atur item menu dengan mudah menggunakan drag and drop"
              },
              {
                title: language === "en" ? "Category Management" : "Manajemen Kategori",
                desc: language === "en"
                  ? "Create unlimited categories and subcategories for better organization"
                  : "Buat kategori dan subkategori unlimited untuk organisasi lebih baik"
              },
              {
                title: language === "en" ? "Variant Options" : "Opsi Varian",
                desc: language === "en"
                  ? "Add variants like size, toppings, or customizations with different pricing"
                  : "Tambahkan varian seperti ukuran, topping, atau kustomisasi dengan harga berbeda"
              },
              {
                title: language === "en" ? "Image Upload" : "Upload Gambar",
                desc: language === "en"
                  ? "Upload high-quality images for each menu item to increase appeal"
                  : "Upload gambar berkualitas tinggi untuk setiap item menu"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4"
              >
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  )
}
