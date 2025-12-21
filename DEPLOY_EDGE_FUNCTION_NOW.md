# 🚀 Deploy Edge Function - Final Step

## Frontend Changes ✅ DEPLOYED

Your order page now has:
- ✅ Restaurant name at the top
- ✅ Table information (e.g., "Meja 1")
- ✅ Customer avatar (clickable to edit name/phone)
- ✅ No header from main website
- ✅ Phone number sent to backend

**Status:** Live on order.kadaipos.id

---

## Backend - Edge Function ⏳ NEEDS 5-MINUTE DEPLOYMENT

The edge function code is ready to save customer phone numbers automatically.

### Quick Deploy Steps:

1. **Go to Supabase Dashboard**
   ```
   https://app.supabase.com/
   ```

2. **Navigate to your project**
   - Select project: `bigjlzrnlzcfxwlkstpp`

3. **Open Edge Functions**
   - Click "Edge Functions" in left sidebar
   - Click on "restaurant-api"

4. **Replace the function code**
   - Click "Edit" or open the editor
   - Copy ALL content from:
     ```
     /Users/gemmyadyendra/Documents/Kadai/supabase/functions/restaurant-api/index.ts
     ```
   - Paste into the Supabase editor
   - Make sure you replace EVERYTHING

5. **Deploy**
   - Click "Deploy" button
   - Wait 30 seconds for deployment

---

## Test After Deployment

1. **Open order page:**
   ```
   http://order.kadaipos.id/order/test123
   ```

2. **Fill in customer info:**
   - Name: "Test Customer"
   - Phone: "081234567890"

3. **Add items and submit order**

4. **Verify in Supabase:**
   - Go to Supabase Dashboard
   - Open "customers" table
   - Look for the new customer record
   - Should see name and phone saved ✓

---

## What You'll See on order.kadaipos.id

```
┌─────────────────────────────────────────┐
│  Restaurant Name          [👤 Avatar]   │  ← NEW: Shows restaurant name
│  Meja 5                                 │  ← NEW: Shows table number
├─────────────────────────────────────────┤
│  [Kategori Menu...]                     │
│                                         │
│  Menu Items...                          │
└─────────────────────────────────────────┘
```

When you click the avatar (👤):
- Modal opens showing customer name and phone
- You can edit the information
- Click "Simpan" to save changes

---

## Why Edge Function Deployment is Needed

Currently:
- ✅ Frontend sends phone number
- ❌ Backend doesn't save it to customers table

After deployment:
- ✅ Frontend sends phone number
- ✅ Backend saves to customers table
- ✅ Existing customers are updated (no duplicates)
- ✅ Orders are linked to customer records

---

## Alternative: Auto-Deploy Script

If you have the Supabase service role key:

```bash
cd /Users/gemmyadyendra/Documents/kadaipos.id

deno run --allow-read --allow-net deploy-edge-function.ts \
  --project bigjlzrnlzcfxwlkstpp \
  --key YOUR_SERVICE_ROLE_KEY
```

Get service role key from:
- Supabase Dashboard → Settings → API → Service Role Key

---

## Clear Browser Cache

After edge function deployment, clear cache:

**On mobile:**
1. Open order.kadaipos.id
2. Long press refresh button
3. Select "Hard Refresh" or "Clear Cache and Hard Reload"

**Or:**
1. Go to browser settings
2. Clear cache for order.kadaipos.id
3. Reload the page

---

## Checklist

- [x] Frontend deployed (restaurant name, table info, avatar)
- [x] No header from main website
- [x] Phone sent in API request
- [ ] **Deploy edge function** ← DO THIS NOW (5 minutes)
- [ ] Test customer creation
- [ ] Verify in database

---

**Estimated time:** 5 minutes to deploy + 2 minutes to test = 7 minutes total
