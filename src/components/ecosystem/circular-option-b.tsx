"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Store, UtensilsCrossed, Briefcase, ChefHat, Warehouse, Users } from "lucide-react"
import Logo from "@/components/Logo"

/**
 * Option B: Layered Solar System
 * Inner orbit: Core business types (Toko, Resto, Pro)
 * Outer orbit: Growth modules (Preppo, Depo, Customer)
 * Shows scaling journey from core to ecosystem
 */

interface Node {
  id: string
  label: string
  icon: React.ReactNode
  color: string
  glowColor: string
  tagline: string
  angle: number
  orbit: "inner" | "outer"
}

export function CircularOptionB() {
  const nodes: Node[] = [
    // Inner orbit - Core business types
    {
      id: "toko",
      label: "Toko",
      icon: <Store className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      glowColor: "shadow-blue-500/50",
      tagline: "Mulai dengan retail",
      angle: 0,
      orbit: "inner",
    },
    {
      id: "resto",
      label: "Resto",
      icon: <UtensilsCrossed className="w-8 h-8" />,
      color: "from-orange-500 to-red-500",
      glowColor: "shadow-orange-500/50",
      tagline: "Kelola restoran",
      angle: 120,
      orbit: "inner",
    },
    {
      id: "pro",
      label: "Pro",
      icon: <Briefcase className="w-8 h-8" />,
      color: "from-indigo-500 to-purple-500",
      glowColor: "shadow-indigo-500/50",
      tagline: "Layanan profesional",
      angle: 240,
      orbit: "inner",
    },
    // Outer orbit - Growth & ecosystem
    {
      id: "customer",
      label: "Customer",
      icon: <Users className="w-7 h-7" />,
      color: "from-purple-500 to-pink-500",
      glowColor: "shadow-purple-500/50",
      tagline: "Fokus pada pelanggan",
      angle: 30,
      orbit: "outer",
    },
    {
      id: "preppo",
      label: "Preppo",
      icon: <ChefHat className="w-7 h-7" />,
      color: "from-yellow-500 to-orange-500",
      glowColor: "shadow-yellow-500/50",
      tagline: "Scale dengan central kitchen",
      angle: 120,
      orbit: "outer",
    },
    {
      id: "depo",
      label: "Depo",
      icon: <Warehouse className="w-7 h-7" />,
      color: "from-green-500 to-emerald-500",
      glowColor: "shadow-green-500/50",
      tagline: "Distribusi & warehouse",
      angle: 210,
      orbit: "outer",
    },
  ]

  const [hoveredNode, setHoveredNode] = React.useState<string | null>(null)
  const innerRadius = 160
  const outerRadius = 280

  return (
    <div className="relative w-full h-[750px] flex items-center justify-center overflow-hidden">
      {/* Background Orbits */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
        <circle
          cx="50%"
          cy="50%"
          r={innerRadius}
          fill="none"
          stroke="white"
          strokeWidth="1"
          strokeDasharray="4 4"
          className="opacity-10"
        />
        <circle
          cx="50%"
          cy="50%"
          r={outerRadius}
          fill="none"
          stroke="white"
          strokeWidth="1"
          strokeDasharray="8 8"
          className="opacity-5"
        />
      </svg>

      {/* SVG Connections for orbits */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
        {nodes.map((node, index) => {
          const radius = node.orbit === "inner" ? innerRadius : outerRadius
          const angleRad = (node.angle * Math.PI) / 180
          const x2 = Math.sin(angleRad) * radius
          const y2 = -Math.cos(angleRad) * radius
          
          return (
            <motion.line
              key={`line-${node.id}`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.1 }}
              transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
              x1="50%"
              y1="50%"
              x2={`calc(50% + ${x2}px)`}
              y2={`calc(50% + ${y2}px)`}
              stroke="white"
              strokeWidth="1"
            />
          )
        })}
      </svg>

      {/* Center Logo Hub */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, x: "-50%", y: "-50%" }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          left: "50%",
          top: "50%",
          x: "-50%",
          y: "-50%" 
        }}
        className="absolute z-20 w-44 h-44 rounded-full bg-gradient-to-br from-gray-900 to-black border-2 border-white/20 flex items-center justify-center shadow-[0_0_60px_rgba(0,0,0,0.4)]"
      >
        <Logo width={70} height={70} color="white" />
      </motion.div>

      {/* Nodes */}
      {nodes.map((node, index) => {
        const radius = node.orbit === "inner" ? innerRadius : outerRadius
        const angleRad = (node.angle * Math.PI) / 180
        const x = Math.sin(angleRad) * radius
        const y = -Math.cos(angleRad) * radius
        const isHovered = hoveredNode === node.id
        const isInner = node.orbit === "inner"

        return (
          <motion.div
            key={node.id}
            initial={{ 
              opacity: 0, 
              scale: 0,
              left: "50%",
              top: "50%",
              x: "-50%",
              y: "-50%"
            }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              x: "-50%",
              y: "-50%"
            }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              delay: 0.8 + index * 0.1 
            }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            className="absolute z-30"
          >
            <motion.div
              whileHover={{ scale: 1.15 }}
              className={`relative cursor-pointer group`}
            >
              <div className={`${isInner ? 'w-28 h-28' : 'w-20 h-20'} rounded-2xl bg-gray-900/90 backdrop-blur-xl border ${isHovered ? 'border-white/40' : 'border-white/10'} flex flex-col items-center justify-center gap-1 shadow-2xl transition-all`}>
                <div className="text-white group-hover:scale-110 transition-transform duration-300">
                  {node.icon}
                </div>
                <span className={`${isInner ? 'text-sm' : 'text-xs'} font-semibold text-white`}>
                  {node.label}
                </span>
                {isInner && (
                  <span className="text-[8px] text-gray-500 uppercase tracking-tighter">Core</span>
                )}
              </div>

              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-48 p-2 rounded-xl bg-black/95 border border-white/20 text-center z-50 text-xs text-gray-300 shadow-3xl"
                >
                  {node.tagline}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )
      })}

      {/* Badge removed for consistency or moved */}

      {/* SVG for gradient line */}
      <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Coming Soon Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="px-6 py-3 rounded-full bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-white/10 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            <span className="text-sm font-semibold text-white">
              Supplier Integration
            </span>
            <span className="text-xs text-gray-400 px-2 py-1 rounded-full bg-white/5">
              Coming Q3 2026
            </span>
          </div>
        </div>
      </motion.div>

      {/* Title & Description */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute top-8 left-1/2 -translate-x-1/2 text-center"
      >
        <h3 className="text-2xl font-bold text-white mb-2">
          Mulai Kecil,{" "}
          <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Scale Besar
          </span>
        </h3>
        <p className="text-sm text-gray-400 max-w-md">
          Dari satu toko hingga ekosistem bisnis lengkap
        </p>
      </motion.div>
    </div>
  )
}
