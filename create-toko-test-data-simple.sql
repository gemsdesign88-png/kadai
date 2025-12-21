-- Simplified test data for Toko (only essential columns)
-- User: gemmyadyendra@gmail.com

DO $$
DECLARE
  v_user_id UUID;
  v_restaurant_id UUID;
BEGIN
  -- Get user ID
  SELECT id INTO v_user_id 
  FROM auth.users 
  WHERE email = 'gemmyadyendra@gmail.com';

  IF v_user_id IS NULL THEN
    RAISE NOTICE 'User not found. Please create account first.';
    RETURN;
  END IF;

  -- Get or create Toko restaurant
  SELECT id INTO v_restaurant_id
  FROM restaurants 
  WHERE owner_id = v_user_id
  AND business_type = 'toko'
  LIMIT 1;

  IF v_restaurant_id IS NULL THEN
    INSERT INTO restaurants (
      owner_id,
      name,
      business_type,
      description
    )
    VALUES (
      v_user_id,
      'Alesha Store',
      'toko',
      'Toko retail dan warung'
    )
    RETURNING id INTO v_restaurant_id;
  END IF;

  RAISE NOTICE 'Restaurant ID: %', v_restaurant_id;

  -- Delete existing data
  DELETE FROM orders WHERE restaurant_id = v_restaurant_id;
  DELETE FROM menu_items WHERE restaurant_id = v_restaurant_id;
  DELETE FROM ingredients WHERE restaurant_id = v_restaurant_id;
  DELETE FROM expenses WHERE restaurant_id = v_restaurant_id;

  -- ============================================
  -- CREATE MENU ITEMS (Products)
  -- ============================================

  INSERT INTO menu_items (restaurant_id, name, price, category, is_available) VALUES
  -- Makanan & Minuman
  (v_restaurant_id, 'Indomie Goreng', 3000, 'Makanan & Minuman', true),
  (v_restaurant_id, 'Indomie Soto', 3000, 'Makanan & Minuman', true),
  (v_restaurant_id, 'Pop Mie Ayam', 5000, 'Makanan & Minuman', true),
  (v_restaurant_id, 'Aqua 600ml', 4000, 'Makanan & Minuman', true),
  (v_restaurant_id, 'Teh Pucuk', 4000, 'Makanan & Minuman', true),
  (v_restaurant_id, 'Coca Cola 390ml', 6000, 'Makanan & Minuman', true),
  (v_restaurant_id, 'Kopi Kapal Api', 2000, 'Makanan & Minuman', true),
  (v_restaurant_id, 'Teh Sariwangi', 1500, 'Makanan & Minuman', true),
  (v_restaurant_id, 'Susu Ultra 250ml', 6000, 'Makanan & Minuman', true),
  (v_restaurant_id, 'Yakult 5 Botol', 9000, 'Makanan & Minuman', true),
  (v_restaurant_id, 'Chitato 68g', 10000, 'Makanan & Minuman', true),
  (v_restaurant_id, 'Tango Wafer 47g', 3500, 'Makanan & Minuman', true),
  (v_restaurant_id, 'Nabati 20g', 2500, 'Makanan & Minuman', true),
  (v_restaurant_id, 'Oreo 137g', 9000, 'Makanan & Minuman', true),
  (v_restaurant_id, 'Roma Kelapa 300g', 12000, 'Makanan & Minuman', true),
  -- Sembako
  (v_restaurant_id, 'Beras 5kg', 75000, 'Sembako', true),
  (v_restaurant_id, 'Minyak Goreng 2L', 35000, 'Sembako', true),
  (v_restaurant_id, 'Gula Pasir 1kg', 15000, 'Sembako', true),
  (v_restaurant_id, 'Tepung Terigu 1kg', 12000, 'Sembako', true),
  (v_restaurant_id, 'Telur Ayam 1kg', 32000, 'Sembako', true),
  (v_restaurant_id, 'Garam Dapur 500g', 4000, 'Sembako', true),
  (v_restaurant_id, 'Kecap Manis 600ml', 18000, 'Sembako', true),
  (v_restaurant_id, 'Saos Sambal 340ml', 15000, 'Sembako', true),
  (v_restaurant_id, 'Mie Telor 500g', 14000, 'Sembako', true),
  (v_restaurant_id, 'Bawang Merah 250g', 12000, 'Sembako', true),
  -- Kebutuhan Rumah
  (v_restaurant_id, 'Sabun Mandi Lifebuoy', 4000, 'Kebutuhan Rumah', true),
  (v_restaurant_id, 'Shampo Pantene 7ml', 2000, 'Kebutuhan Rumah', true),
  (v_restaurant_id, 'Pasta Gigi Pepsodent', 8000, 'Kebutuhan Rumah', true),
  (v_restaurant_id, 'Deterjen Rinso 800g', 15000, 'Kebutuhan Rumah', true),
  (v_restaurant_id, 'Sunlight 800ml', 18000, 'Kebutuhan Rumah', true),
  (v_restaurant_id, 'Molto 900ml', 14000, 'Kebutuhan Rumah', true),
  (v_restaurant_id, 'Tissue Paseo 250s', 12000, 'Kebutuhan Rumah', true),
  (v_restaurant_id, 'Sikat Gigi', 5000, 'Kebutuhan Rumah', true),
  (v_restaurant_id, 'Pembalut Charm 16s', 16000, 'Kebutuhan Rumah', true),
  (v_restaurant_id, 'Baygon Spray 600ml', 35000, 'Kebutuhan Rumah', true),
  -- Rokok & Pulsa
  (v_restaurant_id, 'Gudang Garam Merah', 23000, 'Rokok & Pulsa', true),
  (v_restaurant_id, 'Sampoerna Mild', 27000, 'Rokok & Pulsa', true),
  (v_restaurant_id, 'Djarum Super', 21000, 'Rokok & Pulsa', true),
  (v_restaurant_id, 'Marlboro Merah', 30000, 'Rokok & Pulsa', true),
  (v_restaurant_id, 'Pulsa 10rb', 11000, 'Rokok & Pulsa', true),
  (v_restaurant_id, 'Pulsa 20rb', 21000, 'Rokok & Pulsa', true),
  (v_restaurant_id, 'Pulsa 50rb', 51000, 'Rokok & Pulsa', true),
  (v_restaurant_id, 'Token Listrik 20rb', 21000, 'Rokok & Pulsa', true),
  (v_restaurant_id, 'Token Listrik 50rb', 51000, 'Rokok & Pulsa', true),
  (v_restaurant_id, 'Korek Api Gas', 3000, 'Rokok & Pulsa', true),
  -- Alat Tulis
  (v_restaurant_id, 'Buku Tulis 38 Lembar', 3500, 'Alat Tulis', true),
  (v_restaurant_id, 'Pulpen Standard', 2000, 'Alat Tulis', true),
  (v_restaurant_id, 'Pensil 2B', 2500, 'Alat Tulis', true),
  (v_restaurant_id, 'Penghapus', 1500, 'Alat Tulis', true),
  (v_restaurant_id, 'Penggaris 30cm', 3000, 'Alat Tulis', true),
  (v_restaurant_id, 'Lem Kertas', 5000, 'Alat Tulis', true),
  (v_restaurant_id, 'Spidol Whiteboard', 8000, 'Alat Tulis', true),
  (v_restaurant_id, 'Kertas HVS A4', 45000, 'Alat Tulis', true),
  (v_restaurant_id, 'Map Plastik', 2000, 'Alat Tulis', true),
  (v_restaurant_id, 'Staples + Isi', 8000, 'Alat Tulis', true);

  -- ============================================
  -- CREATE ORDERS (50 orders)
  -- ============================================

  INSERT INTO orders (
    restaurant_id,
    status,
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
    FLOOR(15000 + random() * 85000)::INT,
    NOW() - (random() * INTERVAL '30 days')
  FROM generate_series(1, 50);

  -- ============================================
  -- CREATE EXPENSES
  -- ============================================

  INSERT INTO expenses (
    restaurant_id,
    category,
    amount,
    description,
    created_by
  ) VALUES
  (v_restaurant_id, 'stock_purchase', 2500000, 'Restok sembako bulanan', v_user_id),
  (v_restaurant_id, 'stock_purchase', 1200000, 'Restok rokok dan pulsa', v_user_id),
  (v_restaurant_id, 'stock_purchase', 800000, 'Restok makanan ringan', v_user_id),
  (v_restaurant_id, 'utilities', 350000, 'Listrik bulan ini', v_user_id),
  (v_restaurant_id, 'utilities', 100000, 'Air PDAM', v_user_id),
  (v_restaurant_id, 'utilities', 50000, 'Internet wifi', v_user_id),
  (v_restaurant_id, 'rent', 2000000, 'Sewa tempat usaha', v_user_id),
  (v_restaurant_id, 'salary', 2500000, 'Gaji pegawai', v_user_id),
  (v_restaurant_id, 'other', 150000, 'Biaya kebersihan', v_user_id),
  (v_restaurant_id, 'other', 75000, 'Kantong plastik dan kemasan', v_user_id);

  -- ============================================
  -- CREATE INGREDIENTS (Stock)
  -- ============================================

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

  RAISE NOTICE '✓ Test data created for Toko: Alesha Store';
  RAISE NOTICE '✓ Products: 55 items';
  RAISE NOTICE '✓ Orders: 50 orders';
  RAISE NOTICE '✓ Expenses: 10 records';
  RAISE NOTICE '✓ Stock Items: 10 tracked';

END $$;
