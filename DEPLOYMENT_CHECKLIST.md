# ✅ Deployment Checklist

## Issue #1: Header Removal ✅ COMPLETE

- [x] Analyze root cause (header in root layout)
- [x] Create custom layout for /order route
- [x] Remove header code from page component
- [x] Build project locally
- [x] Deploy to VPS via rsync
- [x] Restart PM2 application
- [x] Verify on live site (curl test)
- [x] **Status: LIVE AND WORKING**

**How to verify:**
```bash
curl http://103.175.207.51:3000/order/test123 | grep -i "meja\|table\|logo"
# Should return nothing = header is gone
```

---

## Issue #2: Phone Number Auto-Save ⏳ 95% COMPLETE

### Part A: Frontend ✅ COMPLETE

- [x] Add phone to API payload
- [x] Implement phone input handling
- [x] Test phone transmission
- [x] Deploy to production
- [x] **Status: LIVE**

### Part B: Backend - Edge Function ⏳ NEEDS DEPLOYMENT

Code is written and ready, just needs to be deployed to Supabase.

#### Step 1: Prepare ✅
- [x] Write customer creation logic (edge function lines 569-607)
- [x] Test logic locally
- [x] Verify database schema supports it
- [x] Create deployment documents

#### Step 2: Deploy ⏳ YOUR ACTION NEEDED

Choose ONE method:

**Method A: Web Dashboard (Easiest)**
- [ ] Go to https://app.supabase.com/
- [ ] Sign in to Supabase account
- [ ] Select project: `bigjlzrnlzcfxwlkstpp`
- [ ] Click: Edge Functions → restaurant-api
- [ ] Copy code from: `/Users/gemmyadyendra/Documents/Kadai/supabase/functions/restaurant-api/index.ts`
- [ ] Paste into editor
- [ ] Click "Deploy"
- [ ] Wait ~30 seconds for deployment

**Method B: Deno Script (If you have service role key)**
- [ ] Get service role key from Supabase Dashboard → Settings → API
- [ ] Run command:
  ```bash
  cd /Users/gemmyadyendra/Documents/kadaipos.id
  deno run --allow-read --allow-net deploy-edge-function.ts \
    --project bigjlzrnlzcfxwlkstpp \
    --key YOUR_SERVICE_ROLE_KEY_HERE
  ```

#### Step 3: Verify ✅ AFTER DEPLOYMENT

- [ ] Create test order at: http://order.kadaipos.id/order/test123
- [ ] Fill form:
  - Name: "Test User"
  - Phone: "081234567890"
- [ ] Click "Submit Order"
- [ ] Go to Supabase Dashboard
- [ ] Navigate to `customers` table
- [ ] Look for new customer record
  - [ ] Name: "Test User"
  - [ ] Phone: "081234567890"
  - [ ] Verify record exists ✓

#### Step 4: Test Existing Customer Update ✅ AFTER VERIFICATION

- [ ] Create second order with same phone number
- [ ] Use different name: "Updated User"
- [ ] Submit order
- [ ] Check Supabase `customers` table
  - [ ] Should still have ONE record (not duplicate)
  - [ ] Name should be updated to "Updated User"
  - [ ] Phone should be same: "081234567890"

---

## Summary

| Item | Status | Action |
|------|--------|--------|
| Header removed | ✅ Done | No action needed |
| Phone sent in request | ✅ Done | No action needed |
| Edge function code | ✅ Ready | **NEEDS DEPLOYMENT** |
| Deployment script | ✅ Ready | Use if you want automation |
| Documentation | ✅ Complete | For reference |

---

## Files for Reference

- **Current Status:** `README_ISSUES_RESOLVED.md`
- **Quick Status:** `ISSUES_FINAL_STATUS.md`
- **Deployment Guide:** `DEPLOYMENT_GUIDE_EDGE_FUNCTION.md`
- **Code Details:** `EDGE_FUNCTION_CODE_READY.md`
- **Automation:** `deploy-edge-function.ts`

---

## Deployment Timeline

**Estimated time to complete:** 10-15 minutes

1. **Deploy edge function:** 5 minutes
   - Either use web dashboard or run script
2. **Create test order:** 2 minutes
3. **Verify in Supabase:** 2 minutes
4. **Test existing customer:** 2 minutes

**Total:** ~15 minutes from now

---

## Success Criteria

When complete, both issues should be resolved:

1. **Header Removal:** ✅ Already done
   - Order page shows clean interface without header

2. **Phone Auto-Save:** ⏳ After edge function deployment
   - When customer submits order with phone
   - Customer record auto-created in database
   - Existing customers are updated, not duplicated

---

## Questions?

Refer to:
1. **"How do I deploy?"** → See `DEPLOYMENT_GUIDE_EDGE_FUNCTION.md`
2. **"What code is being deployed?"** → See `EDGE_FUNCTION_CODE_READY.md`
3. **"What's the overall status?"** → See `README_ISSUES_RESOLVED.md`
4. **"Quick status?"** → See `ISSUES_FINAL_STATUS.md`

---

**Current Status:** Issue #1 ✅ Complete, Issue #2 ⏳ Ready for deployment  
**Blocker:** None - just need to deploy edge function  
**Estimated Completion:** ~15 minutes from now
