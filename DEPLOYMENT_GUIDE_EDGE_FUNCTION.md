# KadaiPOS Edge Function Deployment Guide

## Status Summary

### ✅ Completed Items

1. **Header Removal** - VERIFIED WORKING
   - Removed from `/src/app/order/[tableBarcode]/page.tsx` (lines 269-289)
   - Created `/src/app/order/layout.tsx` to override root layout
   - Deployed to production VPS
   - Verification: `curl http://72.60.76.34:3000/order/test123` - No header found ✓

2. **Phone Number Transmission** - DEPLOYED
   - Added `customerPhone` to API payload in page.tsx line 224
   - Frontend correctly sends phone to edge function
   - Database column `customer_phone` exists in orders table

3. **Customer Save Logic** - CODED & READY
   - Edge function source code updated (lines 569-607 of index.ts)
   - Logic: Check if customer with phone exists → update or create
   - Graceful error handling in try-catch block
   - **Status: SOURCE CODE READY, NOT YET DEPLOYED TO LIVE SUPABASE**

### ⏳ Remaining Work: Deploy Edge Function

The customer phone auto-save feature requires deploying the updated edge function to Supabase.

## Option 1: Deploy via Supabase Web Dashboard (Recommended - No CLI Required)

### Prerequisites
- Supabase account access
- Project: `bigjlzrnlzcfxwlkstpp`

### Steps

1. **Go to Supabase Dashboard**
   - URL: https://app.supabase.com/
   - Sign in with your credentials

2. **Navigate to Edge Functions**
   - Select project: `bigjlzrnlzcfxwlkstpp`
   - Click "Edge Functions" in left sidebar

3. **Find `restaurant-api` function**
   - Click on it to open the editor

4. **Replace the function code**
   - Copy content from: `/Users/gemmyadyendra/Documents/Kadai/supabase/functions/restaurant-api/index.ts`
   - Paste it into the web editor
   - Make sure you replace the ENTIRE file content

5. **Deploy**
   - Click "Deploy" button
   - Wait for deployment to complete (usually 30 seconds)

6. **Verify Deployment**
   - Test with curl or by creating a new order with phone number
   - Check the `customers` table in Supabase - new customers should appear

### Alternative: Use Deno to Deploy (Advanced)

If you have the Supabase service role key:

```bash
# Export credentials
export SUPABASE_URL=https://bigjlzrnlzcfxwlkstpp.supabase.co
export SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Deploy function using Supabase CLI alternative
deno run --allow-all /Users/gemmyadyendra/Documents/kadaipos.id/deploy-edge-function.ts
```

## Current Edge Function Code Changes

The following changes need to be deployed (found in index.ts lines 569-607):

```typescript
// Create or update customer if name and phone are provided
if (customerName && customerPhone) {
  try {
    // Check if customer with this phone already exists for the restaurant
    const { data: existingCustomer } = await supabaseClient
      .from('customers')
      .select('id')
      .eq('restaurant_id', finalRestaurantId)
      .eq('phone', customerPhone)
      .single()
    
    if (existingCustomer) {
      // Update existing customer
      await supabaseClient
        .from('customers')
        .update({ name: customerName })
        .eq('id', existingCustomer.id)
    } else {
      // Create new customer
      const { data: newCustomer, error: customerError } = await supabaseClient
        .from('customers')
        .insert({
          restaurant_id: finalRestaurantId,
          name: customerName,
          phone: customerPhone,
        })
        .select()
        .single()
      
      if (!customerError && newCustomer) {
        // Update order with customer_id
        await supabaseClient
          .from('orders')
          .update({ customer_id: newCustomer.id })
          .eq('id', order.id)
      }
    }
  } catch (err) {
    console.error('Error creating/updating customer:', err)
    // Don't throw - order should still be created even if customer creation fails
  }
}
```

## Database Schema

The necessary table columns already exist:

### Orders Table
- `customer_phone` (TEXT) - Already exists, ready for data
- `customer_id` (UUID) - Already exists, ready for linking
- `customer_name` (TEXT) - Already exists

### Customers Table
- `id` (UUID) - Primary key
- `restaurant_id` (UUID) - Foreign key
- `name` (TEXT) - Customer name
- `phone` (TEXT) - Customer phone number

## Testing After Deployment

1. **Test Order Creation**
   ```bash
   # Scan QR or open order page
   http://order.kadaipos.id/order/test123
   
   # Fill in name and phone
   # Submit order
   ```

2. **Verify in Supabase Dashboard**
   - Go to `customers` table
   - Check if new customer record appears with phone number
   - Verify `orders` table has `customer_id` populated

3. **Test Existing Customer**
   - Use same phone number on second order
   - Customer record should update (name might change)
   - Order should link to same customer

## Troubleshooting

### If phone doesn't save after deployment:

1. **Check edge function logs**
   - Supabase Dashboard → Edge Functions → restaurant-api → Logs
   - Look for error messages

2. **Verify data is being sent**
   ```bash
   # Check network tab in browser DevTools
   # Look at POST request to /functions/v1/restaurant-api/orders
   # Confirm customerPhone is in request body
   ```

3. **Check database**
   ```sql
   -- Verify customer_phone column exists
   SELECT column_name FROM information_schema.columns 
   WHERE table_name = 'orders';
   
   -- Check if data is being inserted
   SELECT * FROM customers WHERE restaurant_id = 'your_restaurant_id';
   ```

## Deployment Timeline

- Local Source Code: Ready ✓
- API Payload: Updated ✓
- Database Schema: Ready ✓
- Edge Function Code: Ready ✓
- **Deployment Pending: Need to sync to Supabase**

## Next Steps

1. Use Option 1 (Dashboard) to deploy the function - takes ~5 minutes
2. Test with a new order
3. Verify customers are created in the database
4. Done! Feature complete

---

**Created**: 2024
**Project**: order.kadaipos.id
**Issue**: Auto-save customer phone to database on order
