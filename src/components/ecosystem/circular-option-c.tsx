"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Store, UtensilsCrossed, Briefcase, ChefHat, Warehouse, Users } from "lucide-react"
import Logo from "@/components/Logo"

/**
 * Option C: Smart Connected Network
 * Shows intelligent relationships between nodes:
 * - Customer connects to all business types
 * - Resto ↔ Preppo (central kitchen for restaurants)
 * - Toko ↔ Depo (warehouse for retail chains)
 * - Pro standalone (self-sufficient services)
 */

interface Node {
  id: string
  label: string
  icon: React.ReactNode
  color: string
  glowColor: string
  tagline: string
  position: { x: number; y: number }
}

interface Connection {
  from: string
  to: string
  label: string
  color: string
  strength: number // 1-3, visual thickness
}

export function CircularOptionC() {
  const nodes: Node[] = [
    {
      id: "customer",
      label: "Customer",
      icon: <Users className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      glowColor: "shadow-purple-500/50",
      tagline: "Dilayani semua tipe bisnis",
      position: { x: 0, y: -260 }, // Top center
    },
    {
      id: "toko",
      label: "Toko",
      icon: <Store className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      glowColor: "shadow-blue-500/50",
      tagline: "Retail POS system",
      position: { x: -260, y: -60 }, // Middle left
    },
    {
      id: "resto",
      label: "Resto",
      icon: <UtensilsCrossed className="w-8 h-8" />,
      color: "from-orange-500 to-red-500",
      glowColor: "shadow-orange-500/50",
      tagline: "Restaurant management",
      position: { x: 0, y: -130 }, // Just above center logo
    },
    {
      id: "pro",
      label: "Pro",
      icon: <Briefcase className="w-8 h-8" />,
      color: "from-indigo-500 to-purple-500",
      glowColor: "shadow-indigo-500/50",
      tagline: "Professional services",
      position: { x: 260, y: -60 }, // Middle right
    },
    {
      id: "depo",
      label: "Depo",
      icon: <Warehouse className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      glowColor: "shadow-green-500/50",
      tagline: "Multi-location warehouse",
      position: { x: -260, y: 140 }, // Bottom left
    },
    {
      id: "preppo",
      label: "Preppo",
      icon: <ChefHat className="w-8 h-8" />,
      color: "from-yellow-500 to-orange-500",
      glowColor: "shadow-yellow-500/50",
      tagline: "Central kitchen for chain",
      position: { x: 260, y: 140 }, // Bottom right
    },
    {
      id: "kadai_hub",
      label: "Depo Core",
      icon: <Warehouse className="w-8 h-8" />,
      color: "from-gray-500 to-slate-500",
      glowColor: "shadow-gray-500/50",
      tagline: "Pusat distribusi",
      position: { x: 0, y: 130 }, // Just below center logo
    },
  ]

  const connections: Connection[] = [
    // Customer to all business types
    { from: "customer", to: "toko", label: "Buy", color: "from-purple-400 to-blue-400", strength: 2 },
    { from: "customer", to: "resto", label: "Dine", color: "from-purple-400 to-orange-400", strength: 2 },
    { from: "customer", to: "pro", label: "Use", color: "from-purple-400 to-indigo-400", strength: 2 },
    
    // Toko ↔ Depo
    { from: "toko", to: "depo", label: "Stock", color: "from-blue-400 to-green-400", strength: 3 },
    { from: "depo", to: "toko", label: "Supply", color: "from-green-400 to-blue-400", strength: 3 },
    
    // Resto ↔ Preppo
    { from: "resto", to: "preppo", label: "Order", color: "from-orange-400 to-yellow-400", strength: 3 },
    { from: "preppo", to: "resto", label: "Prep", color: "from-yellow-400 to-orange-400", strength: 3 },
  ]

  const [hoveredNode, setHoveredNode] = React.useState<string | null>(null)

  const getConnectionId = (conn: Connection) => `${conn.from}-${conn.to}`

  return (
    <div className="relative w-full h-[700px] flex items-center justify-center overflow-hidden">
      {/* SVG Layer for Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
        {connections.map((conn) => {
          const fromNode = nodes.find((n) => n.id === conn.from)
          const toNode = nodes.find((n) => n.id === conn.to)
          if (!fromNode || !toNode) return null

          const isHovered = hoveredNode === conn.from ||
            hoveredNode === conn.to

          return (
            <motion.g key={getConnectionId(conn)}>
              <motion.line
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: isHovered ? 0.6 : 0.1,
                }}
                x1={`calc(50% + ${fromNode.position.x}px)`}
                y1={`calc(50% + ${fromNode.position.y}px)`}
                x2={`calc(50% + ${toNode.position.x}px)`}
                y2={`calc(50% + ${toNode.position.y}px)`}
                stroke="white"
                strokeWidth={isHovered ? 2 : 1}
                strokeDasharray={conn.strength === 3 ? "none" : "5 5"}
              />
              
              {/* Animated pulse on connection */}
              {isHovered && (
                <motion.circle
                  r="4"
                  fill="currentColor"
                  className="text-green-400"
                  animate={{
                    cx: [`calc(50% + ${fromNode.position.x}px)`, `calc(50% + ${toNode.position.x}px)`],
                    cy: [`calc(50% + ${fromNode.position.y}px)`, `calc(50% + ${toNode.position.y}px)`],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              )}
            </motion.g>
          )
        })}
      </svg>

      {/* Center Logo */}
      <motion.div
        initial={{ scale: 0.8, x: "-50%", y: "-50%" }}
        animate={{ 
          scale: 1,
          left: "50%",
          top: "50%",
          x: "-50%",
          y: "-50%" 
        }}
        className="absolute z-20 w-44 h-44 rounded-full bg-gradient-to-br from-gray-900 to-black border-2 border-white/20 flex flex-col items-center justify-center shadow-2xl"
      >
        <Logo width={70} height={70} color="white" />
      </motion.div>

      {/* Nodes */}
      {nodes.map((node) => {
        const isHovered = hoveredNode === node.id
        
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
              left: `calc(50% + ${node.position.x}px)`,
              top: `calc(50% + ${node.position.y}px)`,
              x: "-50%",
              y: "-50%"
            }}
            transition={{ type: "spring", stiffness: 100 }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            className="absolute z-30"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className={`relative w-28 h-28 rounded-2xl bg-gray-900/90 backdrop-blur-xl border ${isHovered ? 'border-green-500/50' : 'border-white/10'} flex flex-col items-center justify-center gap-2 cursor-pointer shadow-2xl transition-all`}
            >
              <div className="text-white group-hover:scale-110 transition-transform duration-300">
                {node.icon}
              </div>
              <span className="text-sm font-semibold text-white">{node.label}</span>

              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-48 p-3 rounded-xl bg-black/95 border border-white/20 text-center z-50 shadow-2xl"
                >
                  <p className="text-xs text-gray-300 mb-2">{node.tagline}</p>
                  <div className="flex flex-col gap-1 items-start text-[9px] border-t border-white/10 pt-2">
                    {connections
                      .filter(c => c.from === node.id || c.to === node.id)
                      .map(c => (
                        <span key={getConnectionId(c)} className="text-green-400/70">
                          {c.from === node.id ? '→' : '←'} {c.label} {nodes.find(n => n.id === (c.from === node.id ? c.to : c.from))?.label}
                        </span>
                      ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )
      })}

      {/* Coming Soon Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="px-6 py-3 rounded-full bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-white/10 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            <span className="text-sm font-semibold text-white">Supplier Integration</span>
            <span className="text-xs text-gray-400 px-2 py-1 rounded-full bg-white/5">
              Coming Q3 2026
            </span>
          </div>
        </div>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute top-8 left-1/2 -translate-x-1/2 text-center"
      >
        <h3 className="text-2xl font-bold text-white mb-2">
          Ekosistem{" "}
          <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Terhubung
          </span>
        </h3>
        <p className="text-sm text-gray-400">Smart relationships untuk setiap tipe bisnis</p>
      </motion.div>
    </div>
  )
}
