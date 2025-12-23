"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

interface MockupCarouselProps {
  mockups: React.ComponentType<any>[]
  color: string
  language?: string
}

export function MockupCarousel({ mockups, color, language }: MockupCarouselProps) {
  const { language: ctxLanguage } = useLanguage()
  const resolvedLanguage = language ?? ctxLanguage
  const [currentIndex, setCurrentIndex] = React.useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % mockups.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + mockups.length) % mockups.length)
  }

  const CurrentMockup = mockups[currentIndex]

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <CurrentMockup color={color} language={resolvedLanguage} />
        </motion.div>
      </AnimatePresence>

      {mockups.length > 1 && (
        <>
          {/* Navigation Buttons */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors z-10"
            aria-label="Previous mockup"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors z-10"
            aria-label="Next mockup"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {mockups.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-8 bg-gray-900"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to mockup ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
