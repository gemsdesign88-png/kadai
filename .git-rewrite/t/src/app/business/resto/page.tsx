"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { ChefHat, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function RestoPage() {
  return (
    <main className="bg-white">
      <section className="py-24">
        <Container>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Restaurant POS System
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Complete point-of-sale solution for your restaurant
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Fast Orders', icon: ChefHat },
              { title: 'Easy Management', icon: Check },
              { title: 'Real-time Analytics', icon: ArrowRight },
            ].map((feature, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                <feature.icon className="w-8 h-8 mb-4 text-blue-600" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">Streamline your restaurant operations</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/demo" className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Get Started <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
