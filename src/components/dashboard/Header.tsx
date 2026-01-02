"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

interface HeaderProps {
  title: string
  description: string
  showBackButton?: boolean
  backUrl?: string
}

export default function Header({ 
  title, 
  description, 
  showBackButton = true,
  backUrl = '/dashboard'
}: HeaderProps) {
  const router = useRouter()

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-4">
          {showBackButton && (
            <button
              onClick={() => router.push(backUrl)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
