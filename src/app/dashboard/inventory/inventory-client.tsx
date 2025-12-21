"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Package } from "lucide-react"

interface StockItem {
  id: string
  name: string
}

export default function InventoryClient() {
  const [items, setItems] = useState<StockItem[]>([])
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) router.push("/auth/login")
    }
    checkAuth()
  }, [router, supabase.auth])

  return (
    <div className="p-6">
      <div className="text-2xl font-bold flex items-center gap-2">
        <Package className="w-6 h-6" />
        Inventory Management
      </div>
      <p className="text-gray-500 mt-2">Manage your restaurant inventory and stock levels.</p>
      <div className="mt-6 grid gap-4">
        {items.length === 0 ? (
          <p className="text-gray-400">No items found. Add your first inventory item to get started.</p>
        ) : (
          items.map(item => (
            <div key={item.id} className="p-4 border rounded-lg">
              <h3 className="font-semibold">{item.name}</h3>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

