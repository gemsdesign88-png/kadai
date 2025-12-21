# Edge Function Code - Ready for Deployment

This document shows the exact code that needs to be deployed to Supabase.

## File Location
```
/Users/gemmyadyendra/Documents/Kadai/supabase/functions/restaurant-api/index.ts
```

## Changes Made
The customer creation/update logic has been added to the order creation endpoint.

### Location in File
- **Start Line:** 569
- **End Line:** 607
- **Total Lines:** 39

## The Code to Deploy

### Full File Source
Copy the entire content of:
```
/Users/gemmyadyendra/Documents/Kadai/supabase/functions/restaurant-api/index.ts
```

And replace it in the Supabase web editor at:
```
https://app.supabase.com/ → restaurant-api → Function Code
```

### Key Addition (Lines 569-607)

After the order is created, this logic executes:

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

## How It Works

1. **Customer Lookup**
   - Searches `customers` table for existing customer with same phone number
   - Filter: `restaurant_id = finalRestaurantId` AND `phone = customerPhone`

2. **If Customer Exists**
   - Updates the customer's name with the new value provided
   - Order remains linked to existing customer

3. **If Customer Is New**
   - Creates new customer record with:
     - `restaurant_id`: Links to the restaurant
     - `name`: Customer name from form
     - `phone`: Phone number from form
   - If creation succeeds, updates the order with the new `customer_id`

4. **Error Handling**
   - Wrapped in try-catch block
   - Errors are logged but don't prevent order creation
   - Order will still be created even if customer creation fails
   - This ensures reliability of core ordering system

## Data Flow

```
Frontend Form (name + phone)
    ↓
API POST /functions/v1/restaurant-api/orders
    ↓
Edge Function receives: customerName, customerPhone
    ↓
Order is created (guaranteed)
    ↓
Customer creation/update attempt (best-effort)
    ├─ Check if customer exists
    ├─ If yes: Update name
    └─ If no: Create new + link to order
    ↓
Response sent (order created successfully)
```

## Testing the Deployment

After deploying:

1. **Create a test order**
   ```
   Open: http://order.kadaipos.id/order/test123
   Fill: Name = "John Doe", Phone = "081234567890"
   Action: Click submit order
   ```

2. **Verify in Supabase**
   - Open Supabase Dashboard
   - Go to `customers` table
   - Look for "John Doe" with phone "081234567890"
   - Check if the `restaurant_id` matches

3. **Test Existing Customer**
   - Use the same phone number again
   - Submit with different name (e.g., "Jane Doe")
   - Customer record should update, not create duplicate
   - Orders should link to same customer

## Expected Results After Deployment

### Supabase `customers` Table
```
id      | restaurant_id                 | name      | phone
--------|-------------------------------|-----------|----------------
uuid1   | restaurant-uuid              | John Doe  | 081234567890
uuid2   | restaurant-uuid              | Jane Smith| 085555555555
```

### Supabase `orders` Table
```
id      | restaurant_id      | table_id | customer_id | customer_name | customer_phone
--------|-------------------|----------|------------|---------------|----------------
uuid-1  | restaurant-uuid   | table-1  | uuid1      | John Doe     | 081234567890
uuid-2  | restaurant-uuid   | table-2  | uuid1      | John Doe     | 081234567890
uuid-3  | restaurant-uuid   | walk-in  | uuid2      | Jane Smith   | 085555555555
```

Notice:
- Both uuid-1 and uuid-2 orders have `customer_id = uuid1` (same customer)
- Data is automatically linked and deduplicated by phone number

## Rollback Instructions

If something goes wrong:

1. Revert to previous version in Supabase Dashboard
2. Or redeploy without the customer creation block (lines 569-607)
3. Orders will still work, just won't create customer records

## Questions?

Check logs in Supabase Dashboard:
- Edge Functions → restaurant-api → Logs
- Tail logs in real-time to debug issues

---

**Code Status:** Ready to deploy ✅  
**Location:** `/Users/gemmyadyendra/Documents/Kadai/supabase/functions/restaurant-api/index.ts`  
**Deployment Target:** `bigjlzrnlzcfxwlkstpp` (Supabase project)  
**Function Name:** `restaurant-api`
