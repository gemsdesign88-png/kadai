"use client"

import { useEffect, useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Package } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"
import { createDashboardTranslator } from "@/lib/i18n/dashboard-translator"

interface StockItem {
  id: string
  name: string
}

export default function InventoryClient() {
  const [items, setItems] = useState<StockItem[]>([])
  const router = useRouter()
  const supabase = createClient()
  const { language } = useLanguage()
  const { t: dt } = useMemo(() => createDashboardTranslator(language), [language])

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
        {dt("inventoryManagement")}
      </div>
      <p className="text-gray-500 mt-2">{dt("manageInventoryDesc")}</p>
      <div className="mt-6 grid gap-4">
        {items.length === 0 ? (
          <p className="text-gray-400">{dt("noItemsFound")}</p>
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

