"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/context";
import { Container } from "@/components/ui/container";
import { 
  Warehouse, 
  Check, 
  ArrowRight,
  Package,
  Truck,
  BarChart3,
  MapPin,
  Clock,
  TrendingDown,
  Settings,
  RefreshCcw,
  Boxes,
  PackageSearch,
  ShoppingCart,
  Store,
} from "lucide-react";
import Link from "next/link";

export default function DepoPage() {
  const { t } = useLanguage();

  const features = [
    {
      icon: MapPin,
      title: "Multi-Location Management",
      description: "Kelola stok di berbagai lokasi gudang dengan sinkronisasi real-time"
    },
    {
      icon: Truck,
      title: "Transfer & Distribution",
      description: "Track perpindahan barang antar gudang dan outlet dengan akurat"
    },
    {
      icon: PackageSearch,
      title: "Stock Tracking",
      description: "Monitor level stok, expiry date, dan batch tracking untuk setiap item"
    },
    {
      icon: RefreshCcw,
      title: "Auto Reorder",
      description: "Sistem auto-reorder berdasarkan minimum stock level dan sales velocity"
    },
    {
      icon: TrendingDown,
      title: "Waste Reduction",
      description: "Minimalisir dead stock dan expired items dengan FIFO/FEFO system"
    },
    {
      icon: BarChart3,
      title: "Inventory Reports",
      description: "Dashboard lengkap untuk analisis stok movement dan optimization"
    },
  ];

  const useCases = [
    {
      icon: Store,
      title: "Retail Chains",
      description: "Kelola distribusi stok untuk multiple retail outlets dengan efisien",
      benefits: ["Central warehouse", "Stock allocation", "Transfer tracking"]
    },
    {
      icon: ShoppingCart,
      title: "Minimarket Network",
      description: "Operasikan network minimarket dengan inventory yang terkoordinasi",
      benefits: ["Multi-branch support", "Demand forecasting", "Cost optimization"]
    },
    {
      icon: Boxes,
      title: "Distributor",
      description: "Manage large-scale distribution dengan warehouse yang tersebar",
      benefits: ["Multi-warehouse", "Fleet management", "Route optimization"]
    },
  ];

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-green-50 via-white to-emerald-50 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        </div>

        <Container>
          <div className="text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium text-white mb-6" style={{backgroundColor: '#10B981'}}>
                <Warehouse className="w-4 h-4 mr-2" />
                Multi-Location Warehouse
              </span>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Kadai Depo: Solusi{" "}
                <span className="bg-clip-text text-transparent" style={{backgroundImage: 'linear-gradient(to right, #10B981, #059669)'}}>
                  Warehouse Management
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Sistem warehouse management untuk bisnis dengan multiple locations. 
                Central inventory control, smart distribution, dan stock optimization dalam satu platform.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
                <span className="text-lg text-gray-600">
                  Mulai dari{" "}
                  <span className="text-3xl font-bold" style={{color: '#10B981'}}>
                    Rp 99.000
                  </span>
                  /bulan
                </span>
              </div>
              <Link href="/pricing">
                <button className="px-8 py-4 text-white rounded-xl font-semibold transition-all shadow-lg flex items-center gap-2 mx-auto group hover:opacity-90" style={{backgroundColor: '#10B981'}}>
                  Mulai Sekarang
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Fitur Lengkap Warehouse Management</h2>
            <p className="text-xl text-gray-600">Kelola inventory multi-lokasi dengan mudah</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl border border-gray-200 hover:border-green-300 transition-all hover:shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{backgroundColor: 'rgba(16, 185, 129, 0.1)'}}>
                  <feature.icon className="w-6 h-6" style={{color: '#10B981'}} />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Cocok Untuk Bisnis Anda</h2>
            <p className="text-xl text-gray-300">Dari retail chain hingga distributor</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all opacity-50" />
                <div className="relative bg-gray-800 border border-gray-700 rounded-3xl p-8 hover:border-green-500/50 transition-all">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{backgroundColor: 'rgba(16, 185, 129, 0.1)'}}>
                    <useCase.icon className="w-7 h-7" style={{color: '#10B981'}} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">{useCase.title}</h3>
                  <p className="text-gray-400 mb-6">{useCase.description}</p>
                  <div className="space-y-3">
                    {useCase.benefits.map((benefit, bidx) => (
                      <div key={bidx} className="flex items-center gap-2 text-gray-300">
                        <Check className="w-5 h-5 flex-shrink-0" style={{color: '#10B981'}} />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Cara Kerja Kadai Depo</h2>
            <p className="text-xl text-gray-600">Workflow yang efisien dari receiving hingga distribution</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  step: "1",
                  title: "Receiving & Check-in",
                  description: "Terima barang dari supplier dengan barcode scanning dan quality check"
                },
                {
                  step: "2",
                  title: "Storage & Organization",
                  description: "Organisasi stok dengan bin location, batch tracking, dan expiry monitoring"
                },
                {
                  step: "3",
                  title: "Stock Allocation",
                  description: "Alokasi otomatis stok ke outlet berdasarkan demand dan sales velocity"
                },
                {
                  step: "4",
                  title: "Transfer & Delivery",
                  description: "Track transfer order dan delivery dengan proof of delivery digital"
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-6 items-start"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{backgroundColor: '#10B981'}}>
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <Container>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold mb-2" style={{color: '#10B981'}}>30%</div>
              <p className="text-gray-600 text-lg">Reduction in Dead Stock</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold mb-2" style={{color: '#10B981'}}>50%</div>
              <p className="text-gray-600 text-lg">Faster Stock Transfer</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold mb-2" style={{color: '#10B981'}}>95%</div>
              <p className="text-gray-600 text-lg">Inventory Accuracy</p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6 text-white">
                Ready to Optimize Your{" "}
                <span style={{color: '#10B981'}}>Warehouse Operations?</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Mulai kelola inventory multi-lokasi dengan lebih efisien. Coba gratis 14 hari!
              </p>
              <Link href="/pricing">
                <button className="px-8 py-4 text-white rounded-xl font-semibold transition-all shadow-lg inline-flex items-center gap-2 group hover:opacity-90" style={{backgroundColor: '#10B981'}}>
                  Coba Gratis Sekarang
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>
    </main>
  );
}
