import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { restaurant_id, ingredient_id, amount, note } = body

    if (!restaurant_id || !ingredient_id || typeof amount !== 'number') {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = await createClient()

    // Try to find existing stock_item
    const { data: existing, error: existingErr } = await supabase
      .from('stock_items')
      .select('*')
      .eq('restaurant_id', restaurant_id)
      .eq('ingredient_id', ingredient_id)
      .limit(1)
      .maybeSingle()

    if (existingErr) {
      console.error('Error fetching existing stock_item:', existingErr)
      return NextResponse.json({ error: 'Failed to fetch stock item' }, { status: 500 })
    }

    if (existing) {
      const newQty = (existing.quantity_on_hand || 0) + amount
      const isLow = newQty <= (existing.reorder_point || 0) || newQty <= (existing.reorder_level || 0)

      const { data: updated, error: updErr } = await supabase
        .from('stock_items')
        .update({ quantity_on_hand: newQty, is_low_stock: isLow })
        .eq('id', existing.id)
        .select()
        .single()

      if (updErr) {
        console.error('Error updating stock item:', updErr)
        return NextResponse.json({ error: 'Failed to update stock' }, { status: 500 })
      }

      // Optionally record an audit/log table here (stock_adjustments)
      try {
        await supabase.from('stock_adjustments').insert({
          stock_item_id: existing.id,
          restaurant_id,
          ingredient_id,
          delta: amount,
          note: note || 'Scanned add via mobile',
        })
      } catch (e) {
        // non-fatal
      }

      return NextResponse.json({ success: true, stock: updated }, { status: 200 })
    }

    // Create new stock item
    const createPayload: any = {
      restaurant_id,
      ingredient_id,
      quantity_on_hand: amount,
      quantity_reserved: 0,
      is_low_stock: false
    }

    const { data: created, error: createErr } = await supabase
      .from('stock_items')
      .insert(createPayload)
      .select()
      .single()

    if (createErr) {
      console.error('Error creating stock item:', createErr)
      return NextResponse.json({ error: 'Failed to create stock item' }, { status: 500 })
    }

    // Record adjustment
    try {
      await supabase.from('stock_adjustments').insert({
        stock_item_id: created.id,
        restaurant_id,
        ingredient_id,
        delta: amount,
        note: note || 'Created by barcode mobile add',
      })
    } catch (e) {
      // non-fatal
    }

    return NextResponse.json({ success: true, stock: created }, { status: 201 })
  } catch (error) {
    console.error('Add stock API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
