-- Create comprehensive test data for Toko (Warung/Kios) business
-- User: gemmyadyendra@gmail.com
-- Run this in your Supabase SQL Editor

-- ============================================
-- 1. SETUP USER PROFILE
-- ============================================

-- First, check if user already exists and get their ID
DO $$
DECLARE
  v_user_id UUID;
  v_restaurant_id UUID;
BEGIN
  -- Get or create user profile
  SELECT id INTO v_user_id 
  FROM auth.users 
  WHERE email = 'gemmyadyendra@gmail.com';

  IF v_user_id IS NULL THEN
    RAISE NOTICE 'User not found. Please create account first via the app.';
    RETURN;
  END IF;

  RAISE NOTICE 'Found user ID: %', v_user_id;

  -- Create or update user profile
  INSERT INTO user_profiles (id, full_name, email, phone)
  VALUES (
    v_user_id,
    'Gemmy Adyendra',
    'gemmyadyendra@gmail.com',
    '+62812345678'
  )
  ON CONFLICT (id) 
  DO UPDATE SET
    full_name = EXCLUDED.full_name,
    phone = EXCLUDED.phone,
    updated_at = NOW();

  -- ============================================
  -- 2. GET EXISTING TOKO/WARUNG RESTAURANT
  -- ============================================

  -- Get existing restaurant (Alesha store)
  SELECT id INTO v_restaurant_id
  FROM restaurants 
  WHERE owner_id = v_user_id
  AND business_type = 'toko'
  LIMIT 1;

  IF v_restaurant_id IS NULL THEN
    RAISE NOTICE 'No Toko restaurant found for this user. Creating one...';
    -- Create new Toko restaurant if doesn't exist
    INSERT INTO restaurants (
      owner_id,
      name,
      business_type,
      plan_tier,
      address,
      phone,
      primary_color,
      description
    )
    VALUES (
      v_user_id,
      'Alesha Store',
      'toko',
      'premium',
      'Jakarta',
      '+62812345678',
      '#10B981',
      'Toko retail dan warung kelontong'
    )
    RETURNING id INTO v_restaurant_id;
  ELSE
    RAISE NOTICE 'Using existing Toko restaurant ID: %', v_restaurant_id;
  END IF;

  RAISE NOTICE 'Created restaurant ID: %', v_restaurant_id;

  -- ============================================
  -- 3. CREATE MENU CATEGORIES (Product Categories)
  -- ============================================

  -- Delete existing categories for this restaurant
  DELETE FROM menu_categories WHERE restaurant_id = v_restaurant_id;

  -- Create parent categories
  INSERT INTO menu_categories (id, restaurant_id, name, parent_id) VALUES
  (gen_random_uuid(), v_restaurant_id, 'Makanan & Minuman', NULL),
  (gen_random_uuid(), v_restaurant_id, 'Sembako', NULL),
  (gen_random_uuid(), v_restaurant_id, 'Kebutuhan Rumah', NULL),
  (gen_random_uuid(), v_restaurant_id, 'Rokok & Pulsa', NULL),
  (gen_random_uuid(), v_restaurant_id, 'Alat Tulis', NULL);

  -- ============================================
  -- 4. CREATE MENU ITEMS (Products)
  -- ============================================

  -- Delete existing menu items
  DELETE FROM menu_items WHERE restaurant_id = v_restaurant_id;

  -- Insert products - Makanan & Minuman
  INSERT INTO menu_items (restaurant_id, name, price, category, is_available, description, image_url) VALUES
  (v_restaurant_id, 'Indomie Goreng', 3000, 'Makanan & Minuman', true, 'Mie instan goreng original', NULL),
  (v_restaurant_id, 'Indomie Soto', 3000, 'Makanan & Minuman', true, 'Mie instan kuah soto', NULL),
  (v_restaurant_id, 'Pop Mie Ayam', 5000, 'Makanan & Minuman', true, 'Mie cup rasa ayam', NULL),
  (v_restaurant_id, 'Aqua 600ml', 4000, 'Makanan & Minuman', true, 'Air mineral kemasan', NULL),
  (v_restaurant_id, 'Teh Pucuk', 4000, 'Makanan & Minuman', true, 'Teh kemasan 350ml', NULL),
  (v_restaurant_id, 'Coca Cola 390ml', 6000, 'Makanan & Minuman', true, 'Minuman soda', NULL),
  (v_restaurant_id, 'Kopi Kapal Api', 2000, 'Makanan & Minuman', true, 'Kopi sachet', NULL),
  (v_restaurant_id, 'Teh Sariwangi', 1500, 'Makanan & Minuman', true, 'Teh celup sachet', NULL),
  (v_restaurant_id, 'Susu Ultra 250ml', 6000, 'Makanan & Minuman', true, 'Susu UHT kotak', NULL),
  (v_restaurant_id, 'Yakult 5 Botol', 9000, 'Makanan & Minuman', true, 'Minuman probiotik', NULL),
  (v_restaurant_id, 'Chitato 68g', 10000, 'Makanan & Minuman', true, 'Keripik kentang', NULL),
  (v_restaurant_id, 'Tango Wafer 47g', 3500, 'Makanan & Minuman', true, 'Wafer coklat', NULL),
  (v_restaurant_id, 'Nabati 20g', 2500, 'Makanan & Minuman', true, 'Wafer keju', NULL),
  (v_restaurant_id, 'Oreo 137g', 9000, 'Makanan & Minuman', true, 'Biskuit sandwich', NULL),
  (v_restaurant_id, 'Roma Kelapa 300g', 12000, 'Makanan & Minuman', true, 'Biskuit kelapa', NULL);

  -- Insert products - Sembako
  INSERT INTO menu_items (restaurant_id, name, price, category, is_available, description) VALUES
  (v_restaurant_id, 'Beras 5kg', 75000, 'Sembako', true, 'Beras premium'),
  (v_restaurant_id, 'Minyak Goreng 2L', 35000, 'Sembako', true, 'Minyak goreng kemasan'),
  (v_restaurant_id, 'Gula Pasir 1kg', 15000, 'Sembako', true, 'Gula pasir putih'),
  (v_restaurant_id, 'Tepung Terigu 1kg', 12000, 'Sembako', true, 'Tepung terigu serbaguna'),
  (v_restaurant_id, 'Telur Ayam 1kg', 32000, 'Sembako', true, 'Telur ayam negeri (±10 butir)'),
  (v_restaurant_id, 'Garam Dapur 500g', 4000, 'Sembako', true, 'Garam beryodium'),
  (v_restaurant_id, 'Kecap Manis 600ml', 18000, 'Sembako', true, 'Kecap manis ABC/Bango'),
  (v_restaurant_id, 'Saos Sambal 340ml', 15000, 'Sembako', true, 'Saos sambal ABC'),
  (v_restaurant_id, 'Mie Telor 500g', 14000, 'Sembako', true, 'Mie telor basah'),
  (v_restaurant_id, 'Bawang Merah 250g', 12000, 'Sembako', true, 'Bawang merah kupas');

  -- Insert products - Kebutuhan Rumah
  INSERT INTO menu_items (restaurant_id, name, price, category, is_available, description) VALUES
  (v_restaurant_id, 'Sabun Mandi Lifebuoy', 4000, 'Kebutuhan Rumah', true, 'Sabun batang 90g'),
  (v_restaurant_id, 'Shampo Pantene 7ml', 2000, 'Kebutuhan Rumah', true, 'Shampo sachet'),
  (v_restaurant_id, 'Pasta Gigi Pepsodent', 8000, 'Kebutuhan Rumah', true, 'Pasta gigi 75g'),
  (v_restaurant_id, 'Deterjen Rinso 800g', 15000, 'Kebutuhan Rumah', true, 'Deterjen bubuk'),
  (v_restaurant_id, 'Sunlight 800ml', 18000, 'Kebutuhan Rumah', true, 'Sabun cuci piring'),
  (v_restaurant_id, 'Molto 900ml', 14000, 'Kebutuhan Rumah', true, 'Pewangi pakaian'),
  (v_restaurant_id, 'Tissue Paseo 250s', 12000, 'Kebutuhan Rumah', true, 'Tissue wajah'),
  (v_restaurant_id, 'Sikat Gigi', 5000, 'Kebutuhan Rumah', true, 'Sikat gigi dewasa'),
  (v_restaurant_id, 'Pembalut Charm 16s', 16000, 'Kebutuhan Rumah', true, 'Pembalut wanita'),
  (v_restaurant_id, 'Baygon Spray 600ml', 35000, 'Kebutuhan Rumah', true, 'Obat nyamuk spray');

  -- Insert products - Rokok & Pulsa
  INSERT INTO menu_items (restaurant_id, name, price, category, is_available, description) VALUES
  (v_restaurant_id, 'Gudang Garam Merah', 23000, 'Rokok & Pulsa', true, 'Rokok kretek 12 batang'),
  (v_restaurant_id, 'Sampoerna Mild', 27000, 'Rokok & Pulsa', true, 'Rokok filter 16 batang'),
  (v_restaurant_id, 'Djarum Super', 21000, 'Rokok & Pulsa', true, 'Rokok kretek 12 batang'),
  (v_restaurant_id, 'Marlboro Merah', 30000, 'Rokok & Pulsa', true, 'Rokok filter 20 batang'),
  (v_restaurant_id, 'Pulsa 10rb', 11000, 'Rokok & Pulsa', true, 'Pulsa all operator'),
  (v_restaurant_id, 'Pulsa 20rb', 21000, 'Rokok & Pulsa', true, 'Pulsa all operator'),
  (v_restaurant_id, 'Pulsa 50rb', 51000, 'Rokok & Pulsa', true, 'Pulsa all operator'),
  (v_restaurant_id, 'Token Listrik 20rb', 21000, 'Rokok & Pulsa', true, 'Token PLN'),
  (v_restaurant_id, 'Token Listrik 50rb', 51000, 'Rokok & Pulsa', true, 'Token PLN'),
  (v_restaurant_id, 'Korek Api Gas', 3000, 'Rokok & Pulsa', true, 'Korek api gas sekali pakai');

  -- Insert products - Alat Tulis
  INSERT INTO menu_items (restaurant_id, name, price, category, is_available, description) VALUES
  (v_restaurant_id, 'Buku Tulis 38 Lembar', 3500, 'Alat Tulis', true, 'Buku tulis folio bergaris'),
  (v_restaurant_id, 'Pulpen Standard', 2000, 'Alat Tulis', true, 'Pulpen tinta biru/hitam'),
  (v_restaurant_id, 'Pensil 2B', 2500, 'Alat Tulis', true, 'Pensil kayu 2B'),
  (v_restaurant_id, 'Penghapus', 1500, 'Alat Tulis', true, 'Penghapus pensil'),
  (v_restaurant_id, 'Penggaris 30cm', 3000, 'Alat Tulis', true, 'Penggaris plastik'),
  (v_restaurant_id, 'Lem Kertas', 5000, 'Alat Tulis', true, 'Lem stick 21g'),
  (v_restaurant_id, 'Spidol Whiteboard', 8000, 'Alat Tulis', true, 'Spidol papan tulis'),
  (v_restaurant_id, 'Kertas HVS A4', 45000, 'Alat Tulis', true, 'Kertas HVS 1 rim (500 lembar)'),
  (v_restaurant_id, 'Map Plastik', 2000, 'Alat Tulis', true, 'Map jepit plastik'),
  (v_restaurant_id, 'Staples + Isi', 8000, 'Alat Tulis', true, 'Stapler kecil + isi');

  -- ============================================
  -- 5. CREATE CUSTOMER DATA (Skipped - using simplified orders)
  -- ============================================
  -- Customer creation skipped - orders will be created without customer references

  -- ============================================
  -- 6. CREATE ORDERS (Mix of statuses)
  -- ============================================

  -- Delete existing orders
  DELETE FROM orders WHERE restaurant_id = v_restaurant_id;

  -- Create orders for today
  INSERT INTO orders (
    restaurant_id,
    status,
    payment_status,
    payment_method,
    total,
    created_at
  )
  SELECT
    v_restaurant_id,
    CASE 
      WHEN random() < 0.7 THEN 'completed'
      WHEN random() < 0.85 THEN 'pending'
      ELSE 'cancelled'
    END,
    CASE 
      WHEN random() < 0.8 THEN 'paid'
      ELSE 'unpaid'
    END,
    CASE 
      WHEN random() < 0.6 THEN 'cash'
      WHEN random() < 0.85 THEN 'qris'
      ELSE 'transfer'
    END,
    0,
    NOW() - (random() * INTERVAL '12 hours')
  FROM generate_series(1, 15) AS i;

  -- Create orders for yesterday
  INSERT INTO orders (
    restaurant_id,
    status,
    payment_status,
    payment_method,
    total,
    created_at
  )
  SELECT
    v_restaurant_id,
    'completed',
    'paid',
    CASE 
      WHEN random() < 0.7 THEN 'cash'
      ELSE 'qris'
    END,
    0,
    NOW() - INTERVAL '1 day' - (random() * INTERVAL '12 hours')
  FROM generate_series(1, 12) AS i;

  -- Create orders for last week
  INSERT INTO orders (
    restaurant_id,
    status,
    payment_status,
    payment_method,
    total,
    created_at
  )
  SELECT
    v_restaurant_id,
    'completed',
    'paid',
    'cash',
    0,
    NOW() - (random() * INTERVAL '7 days')
  FROM generate_series(1, 30) AS i;

  -- ============================================
  -- 7. CREATE ORDER ITEMS
  -- ============================================

  -- Add order items for each order
  INSERT INTO order_items (order_id, menu_item_id, name, quantity, price, status)
  SELECT
    o.id,
    mi.id,
    mi.name,
    FLOOR(1 + random() * 5)::INTEGER, -- Random quantity 1-5
    mi.price,
    'pending' -- Use valid order_item status
  FROM orders o
  CROSS JOIN LATERAL (
    SELECT * FROM menu_items 
    WHERE restaurant_id = v_restaurant_id 
    ORDER BY random() 
    LIMIT FLOOR(1 + random() * 4)::INTEGER -- 1-4 items per order
  ) mi
  WHERE o.restaurant_id = v_restaurant_id;

  -- Update order totals
  UPDATE orders o
  SET total = (
    SELECT COALESCE(SUM(oi.quantity * oi.price), 0)
    FROM order_items oi
    WHERE oi.order_id = o.id
  )
  WHERE o.restaurant_id = v_restaurant_id;

  -- ============================================
  -- 8. CREATE EXPENSES
  -- ============================================

  -- Delete existing expenses
  DELETE FROM expenses WHERE restaurant_id = v_restaurant_id;

  -- Create expense records
  INSERT INTO expenses (restaurant_id, category, amount, description, date, created_by) VALUES
  -- Stock purchases
  (v_restaurant_id, 'stock_purchase', 2500000, 'Restok sembako bulanan', CURRENT_DATE - INTERVAL '2 days', v_user_id),
  (v_restaurant_id, 'stock_purchase', 1200000, 'Restok rokok dan pulsa', CURRENT_DATE - INTERVAL '5 days', v_user_id),
  (v_restaurant_id, 'stock_purchase', 800000, 'Restok makanan ringan', CURRENT_DATE - INTERVAL '7 days', v_user_id),
  (v_restaurant_id, 'stock_purchase', 500000, 'Restok kebutuhan rumah tangga', CURRENT_DATE - INTERVAL '10 days', v_user_id),
  
  -- Utilities
  (v_restaurant_id, 'utilities', 350000, 'Listrik bulan ini', CURRENT_DATE - INTERVAL '3 days', v_user_id),
  (v_restaurant_id, 'utilities', 100000, 'Air PDAM', CURRENT_DATE - INTERVAL '5 days', v_user_id),
  (v_restaurant_id, 'utilities', 50000, 'Internet wifi', CURRENT_DATE - INTERVAL '1 day', v_user_id),
  
  -- Rent
  (v_restaurant_id, 'rent', 2000000, 'Sewa tempat usaha', CURRENT_DATE - INTERVAL '1 day', v_user_id),
  
  -- Salary
  (v_restaurant_id, 'salary', 2500000, 'Gaji pegawai', CURRENT_DATE - INTERVAL '4 days', v_user_id),
  
  -- Other
  (v_restaurant_id, 'other', 150000, 'Biaya kebersihan', CURRENT_DATE - INTERVAL '6 days', v_user_id),
  (v_restaurant_id, 'other', 75000, 'Kantong plastik dan kemasan', CURRENT_DATE - INTERVAL '8 days', v_user_id);

  -- ============================================
  -- 9. CREATE INGREDIENTS/STOCK DATA
  -- ============================================

  -- Delete existing ingredients
  DELETE FROM ingredients WHERE restaurant_id = v_restaurant_id;

  -- Create stock/inventory tracking for key items
  -- Including unit_cost which is NOT NULL
  INSERT INTO ingredients (
    restaurant_id, 
    name, 
    unit, 
    current_stock,
    unit_cost
  ) VALUES
  (v_restaurant_id, 'Indomie Goreng', 'pcs', 150, 2500),
  (v_restaurant_id, 'Aqua 600ml', 'pcs', 200, 3000),
  (v_restaurant_id, 'Beras 5kg', 'karung', 20, 70000),
  (v_restaurant_id, 'Minyak Goreng 2L', 'botol', 30, 32000),
  (v_restaurant_id, 'Telur Ayam', 'kg', 25, 30000),
  (v_restaurant_id, 'Gula Pasir 1kg', 'kg', 40, 14000),
  (v_restaurant_id, 'Gudang Garam Merah', 'bungkus', 80, 21000),
  (v_restaurant_id, 'Sampoerna Mild', 'bungkus', 60, 25000),
  (v_restaurant_id, 'Deterjen Rinso 800g', 'pcs', 35, 13000),
  (v_restaurant_id, 'Sabun Lifebuoy', 'pcs', 100, 3500);

  -- ============================================
  -- SUMMARY
  -- ============================================

  RAISE NOTICE '==================================================';
  RAISE NOTICE 'Toko test data created successfully!';
  RAISE NOTICE '==================================================';
  RAISE NOTICE 'User: gemmyadyendra@gmail.com';
  RAISE NOTICE 'Restaurant: Alesha Store';
  RAISE NOTICE 'Business Type: Toko/Warung';
  RAISE NOTICE 'Products: ~75 items across 5 categories';
  RAISE NOTICE 'Customers: 10 regular customers';
  RAISE NOTICE 'Orders: ~57 orders (today, yesterday, last week)';
  RAISE NOTICE 'Expenses: 11 expense records';
  RAISE NOTICE 'Stock Items: 10 tracked inventory items';
  RAISE NOTICE '==================================================';

END $$;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check created data
SELECT 
  'Restaurant' as type,
  name,
  business_type,
  plan_tier
FROM restaurants 
WHERE owner_id = (SELECT id FROM auth.users WHERE email = 'gemmyadyendra@gmail.com')
LIMIT 1;

SELECT 
  'Products' as type,
  category,
  COUNT(*) as count
FROM menu_items 
WHERE restaurant_id = (
  SELECT id FROM restaurants 
  WHERE owner_id = (SELECT id FROM auth.users WHERE email = 'gemmyadyendra@gmail.com')
  LIMIT 1
)
GROUP BY category
ORDER BY category;

SELECT 
  'Orders Summary' as type,
  status,
  COUNT(*) as count,
  SUM(total) as total_revenue
FROM orders 
WHERE restaurant_id = (
  SELECT id FROM restaurants 
  WHERE owner_id = (SELECT id FROM auth.users WHERE email = 'gemmyadyendra@gmail.com')
  LIMIT 1
)
GROUP BY status;

-- Customers query skipped - table schema differs

SELECT 
  'Stock Items' as type,
  COUNT(*) as count,
  SUM(current_stock * unit_cost) as total_value
FROM ingredients 
WHERE restaurant_id = (
  SELECT id FROM restaurants 
  WHERE owner_id = (SELECT id FROM auth.users WHERE email = 'gemmyadyendra@gmail.com')
  LIMIT 1
);
