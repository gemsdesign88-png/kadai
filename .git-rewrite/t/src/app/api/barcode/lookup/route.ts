import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const code = url.searchParams.get('code')
    const restaurantId = url.searchParams.get('restaurant_id')

    if (!code) {
      return NextResponse.json({ error: 'Missing code parameter' }, { status: 400 })
    }

    const supabase = await createClient()

    // Try multiple common barcode fields
    const orQuery = `barcode.eq.${code},ean.eq.${code},upc.eq.${code},sku.eq.${code}`

    const { data: ingredient, error: ingErr } = await supabase
      .from('ingredients')
      .select('*')
      .or(orQuery)
      .limit(1)
      .maybeSingle()

    if (ingErr) {
      console.error('Ingredient lookup error:', ingErr)
      return NextResponse.json({ error: 'Lookup failed' }, { status: 500 })
    }

    if (!ingredient) {
      return NextResponse.json({ found: false }, { status: 200 })
    }

    let stockItem = null
    if (restaurantId) {
      const { data: stock, error: stockErr } = await supabase
        .from('stock_items')
        .select('*')
        .eq('restaurant_id', restaurantId)
        .eq('ingredient_id', ingredient.id)
        .limit(1)
        .maybeSingle()

      if (stockErr) {
        console.error('Stock lookup error:', stockErr)
      } else {
        stockItem = stock
      }
    }

    return NextResponse.json({ found: true, ingredient, stockItem }, { status: 200 })
  } catch (error) {
    console.error('Barcode lookup API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
