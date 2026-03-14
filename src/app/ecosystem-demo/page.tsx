"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { CircularOptionA } from "@/components/ecosystem/circular-option-a"
import { CircularOptionB } from "@/components/ecosystem/circular-option-b"
import { CircularOptionC } from "@/components/ecosystem/circular-option-c"
import { Container } from "@/components/ui/container"

type OptionType = "A" | "B" | "C"

export default function EcosystemDemo() {
  const [selectedOption, setSelectedOption] = React.useState<OptionType>("A")

  const options = [
    {
      id: "A" as OptionType,
      name: "Option A",
      title: "Equal Orbital Nodes",
      description: "Semua node positioned equally - egalitarian approach",
      features: ["6 nodes in equal circle", "Clean & balanced", "All equal importance"],
    },
    {
      id: "B" as OptionType,
      name: "Option B",
      title: "Layered Solar System",
      description: "Inner orbit (Core) + Outer orbit (Growth) - shows scaling journey",
      features: ["2 layers: Core & Growth", "Shows progression", "Enterprise feel"],
    },
    {
      id: "C" as OptionType,
      name: "Option C",
      title: "Smart Connected Network",
      description: "Shows intelligent relationships with connecting lines",
      features: ["Relationship mapping", "Interactive connections", "Story-driven"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black">
      <Container className="py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Kadai Ecosystem{" "}
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Review
            </span>
          </h1>
          <p className="text-lg text-gray-400 mb-8">
            3 design options untuk circular ecosystem visualization
          </p>

          {/* Option Selector */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-8">
            {options.map((option) => (
              <motion.button
                key={option.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedOption(option.id)}
                className={`relative p-6 rounded-2xl border-2 transition-all text-left ${
                  selectedOption === option.id
                    ? "border-green-500 bg-green-500/10"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                {/* Selected indicator */}
                {selectedOption === option.id && (
                  <motion.div
                    layoutId="selected-indicator"
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/20 to-blue-500/20"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-1">{option.name}</h3>
                  <h4 className="text-sm font-semibold text-green-400 mb-2">
                    {option.title}
                  </h4>
                  <p className="text-xs text-gray-400 mb-3">{option.description}</p>

                  <ul className="space-y-1">
                    {option.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-500">
                        <div className="w-1 h-1 rounded-full bg-green-400 mt-1.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Visualization Container */}
        <motion.div
          key={selectedOption}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl bg-gradient-to-b from-gray-900/50 to-black/50 border border-white/10 backdrop-blur-xl p-8 mb-8"
        >
          {selectedOption === "A" && <CircularOptionA />}
          {selectedOption === "B" && <CircularOptionB />}
          {selectedOption === "C" && <CircularOptionC />}
        </motion.div>

        {/* Details & Notes */}
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
            <h3 className="text-xl font-bold text-white mb-4">Design Notes</h3>

            <div className="space-y-4 text-sm text-gray-400">
              <div>
                <span className="font-semibold text-white">Option A - Equal Orbital:</span>
                <p className="mt-1">
                  Semua business types + modules diberi visual weight yang sama. Approach demokratis
                  yang menunjukkan Kadai mendukung semua tipe bisnis secara equal. Cocok untuk
                  messaging "All-in-one platform".
                </p>
              </div>

              <div>
                <span className="font-semibold text-white">Option B - Layered Solar:</span>
                <p className="mt-1">
                  Menunjukkan progression/journey: Start dengan core business (Toko/Resto/Pro),
                  kemudian scale dengan modules (Preppo/Depo). Customer di outer orbit menunjukkan
                  end goal. Cocok untuk messaging "Start small, scale big".
                </p>
              </div>

              <div>
                <span className="font-semibold text-white">Option C - Connected Network:</span>
                <p className="mt-1">
                  Smart approach yang menunjukkan relationships: Resto ↔ Preppo, Toko ↔ Depo,
                  Customer → All. Interactive hover shows connections. Cocok untuk messaging
                  "Intelligent ecosystem". Lebih storytelling & educational.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <span className="font-semibold text-white">Mobile Adaptation:</span>
                <p className="mt-1">
                  All options akan di-adjust untuk mobile: Circular collaps menjadi vertical stack
                  dengan simplified connections. Interactivity tetap with tap instead of hover.
                </p>
              </div>

              <div>
                <span className="font-semibold text-white">Preppo Context:</span>
                <p className="mt-1">
                  Preppo (Central Kitchen Prep) saat ini hanya untuk F&B/Resto chains. Depo untuk
                  retail/Toko chains. Pro standalone (salon/spa/clinic tidak butuh backend module).
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
