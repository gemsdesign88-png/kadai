-- Insert test debt data to demonstrate the debt payment system
-- Run this in Supabase SQL Editor after running ADD_DEBT_PAYMENTS_TABLE.sql

-- Replace these values with your actual IDs:
-- 1. Get your user_id from auth.users table
-- 2. Get your restaurant_id from restaurants table

-- Example: Insert test debts for restaurant
-- IMPORTANT: Replace '3af205f4-aa37-4ec8-878f-eb6399dcfcea' with your actual restaurant_id

-- Test Debt 1: Active debt (not paid yet)
INSERT INTO debts (
  id,
  restaurant_id,
  creditor_name,
  amount,
  amount_paid,
  remaining_amount,
  due_date,
  description,
  status,
  created_at
) VALUES (
  gen_random_uuid(),
  '3af205f4-aa37-4ec8-878f-eb6399dcfcea', -- REPLACE with your restaurant_id
  'Supplier Sayuran PT Segar',
  5000000,
  0,
  5000000,
  CURRENT_DATE + INTERVAL '30 days',
  'Pembelian sayuran untuk bulan ini - kategori: supplier',
  'active',
  NOW()
);

-- Test Debt 2: Partially paid debt (status=active but with amount_paid)
INSERT INTO debts (
  id,
  restaurant_id,
  creditor_name,
  amount,
  amount_paid,
  remaining_amount,
  due_date,
  description,
  status,
  created_at
) VALUES (
  gen_random_uuid(),
  '3af205f4-aa37-4ec8-878f-eb6399dcfcea', -- REPLACE with your restaurant_id
  'Bank BCA - KUR',
  10000000,
  3000000,
  7000000,
  CURRENT_DATE + INTERVAL '60 days',
  'Pinjaman modal usaha untuk ekspansi - kategori: loan (sudah dibayar sebagian)',
  'active',
  NOW() - INTERVAL '10 days'
);

-- Test Debt 3: Overdue debt
INSERT INTO debts (
  id,
  restaurant_id,
  creditor_name,
  amount,
  amount_paid,
  remaining_amount,
  due_date,
  description,
  status,
  created_at
) VALUES (
  gen_random_uuid(),
  '3af205f4-aa37-4ec8-878f-eb6399dcfcea', -- REPLACE with your restaurant_id
  'Toko Peralatan Dapur',
  2500000,
  500000,
  2000000,
  CURRENT_DATE - INTERVAL '5 days',
  'Pembelian oven dan kompor gas baru - kategori: equipment',
  'overdue',
  NOW() - INTERVAL '35 days'
);

-- Test Debt 4: Small active debt
INSERT INTO debts (
  id,
  restaurant_id,
  creditor_name,
  amount,
  amount_paid,
  remaining_amount,
  due_date,
  description,
  status,
  created_at
) VALUES (
  gen_random_uuid(),
  '3af205f4-aa37-4ec8-878f-eb6399dcfcea', -- REPLACE with your restaurant_id
  'Supplier Daging Pak Joko',
  1500000,
  0,
  1500000,
  CURRENT_DATE + INTERVAL '15 days',
  'Hutang daging sapi premium - kategori: supplier',
  'active',
  NOW() - INTERVAL '2 days'
);

-- Verify the inserted debts
SELECT 
  creditor_name,
  amount,
  amount_paid,
  remaining_amount,
  status,
  due_date,
  CASE 
    WHEN due_date < CURRENT_DATE AND status != 'paid' THEN 'OVERDUE'
    WHEN amount_paid > 0 AND amount_paid < amount THEN 'PARTIAL'
    WHEN status = 'paid' THEN 'PAID'
    ELSE 'ACTIVE'
  END as calculated_status
FROM debts
WHERE restaurant_id = '3af205f4-aa37-4ec8-878f-eb6399dcfcea' -- REPLACE with your restaurant_id
ORDER BY created_at DESC;
