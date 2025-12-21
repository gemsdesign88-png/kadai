-- Fixed test data for Toko with proper payment_status and paid_at
-- User: gemmyadyendra@gmail.com

DO $$
DECLARE
  v_user_id UUID;
  v_restaurant_id UUID;
  v_menu_item_ids UUID[];
BEGIN
  -- Get user ID
  SELECT id INTO v_user_id 
  FROM auth.users 
  WHERE email = 'gemmyadyendra@gmail.com';

  IF v_user_id IS NULL THEN
    RAISE NOTICE 'User not found. Please create account first.';
    RETURN;
  END IF;

  -- Get Toko restaurant
  SELECT id INTO v_restaurant_id
  FROM restaurants 
  WHERE owner_id = v_user_id
  AND business_type = 'toko'
  LIMIT 1;

  IF v_restaurant_id IS NULL THEN
    RAISE NOTICE 'Toko restaurant not found.';
    RETURN;
  END IF;

  RAISE NOTICE 'Restaurant ID: %', v_restaurant_id;

  -- Delete existing data
  DELETE FROM order_items WHERE order_id IN (SELECT id FROM orders WHERE restaurant_id = v_restaurant_id);
  DELETE FROM orders WHERE restaurant_id = v_restaurant_id;
  DELETE FROM menu_items WHERE restaurant_id = v_restaurant_id;

  -- ============================================
  -- CREATE MENU ITEMS
  -- ============================================

  INSERT INTO menu_items (restaurant_id, name, price, category, is_available) VALUES
  (v_restaurant_id, 'Indomie Goreng', 3000, 'Makanan', true),
  (v_restaurant_id, 'Aqua 600ml', 4000, 'Minuman', true),
  (v_restaurant_id, 'Beras 5kg', 75000, 'Sembako', true),
  (v_restaurant_id, 'Minyak Goreng 2L', 35000, 'Sembako', true),
  (v_restaurant_id, 'Telur Ayam 1kg', 32000, 'Sembako', true),
  (v_restaurant_id, 'Gula Pasir 1kg', 15000, 'Sembako', true),
  (v_restaurant_id, 'Sabun Mandi', 4000, 'Kebutuhan Rumah', true),
  (v_restaurant_id, 'Shampo', 2000, 'Kebutuhan Rumah', true),
  (v_restaurant_id, 'Gudang Garam', 23000, 'Rokok', true),
  (v_restaurant_id, 'Pulsa 10rb', 11000, 'Pulsa', true);

  -- Get all menu item IDs
  SELECT ARRAY_AGG(id) INTO v_menu_item_ids
  FROM menu_items
  WHERE restaurant_id = v_restaurant_id;

  -- ============================================
  -- CREATE ORDERS WITH PROPER PAYMENT DATA
  -- ============================================

  INSERT INTO orders (
    restaurant_id,
    status,
    payment_status,
    payment_method,
    total,
    created_at,
    paid_at
  )
  SELECT
    v_restaurant_id,
    'completed',
    'paid',
    CASE 
      WHEN random() < 0.6 THEN 'cash'
      WHEN random() < 0.85 THEN 'qris'
      ELSE 'transfer'
    END,
    FLOOR(15000 + random() * 85000)::INT,
    NOW() - (random() * INTERVAL '7 days'),
    NOW() - (random() * INTERVAL '7 days')
  FROM generate_series(1, 50);

  -- ============================================
  -- CREATE ORDER ITEMS (Link orders to products)
  -- ============================================

  INSERT INTO order_items (
    order_id,
    menu_item_id,
    name,
    quantity,
    price
  )
  SELECT
    o.id,
    v_menu_item_ids[floor(random() * array_length(v_menu_item_ids, 1)) + 1],
    m.name,
    floor(1 + random() * 5)::INT,
    m.price
  FROM orders o
  CROSS JOIN LATERAL (
    SELECT m.* FROM menu_items m
    WHERE m.id = v_menu_item_ids[floor(random() * array_length(v_menu_item_ids, 1)) + 1]
  ) m
  WHERE o.restaurant_id = v_restaurant_id;

  RAISE NOTICE '✓ Test data created!';
  RAISE NOTICE '✓ 50 orders with payment_status=paid';
  RAISE NOTICE '✓ Order items linked to products';

END $$;
