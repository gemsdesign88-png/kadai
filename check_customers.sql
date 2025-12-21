-- Check customers table
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'customers';

-- Check customer_restaurant_history table  
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'customer_restaurant_history';

-- If customers table exists, show some sample data
SELECT id, name, phone FROM customers LIMIT 5;

-- If customer_restaurant_history exists, show some sample data
SELECT * FROM customer_restaurant_history LIMIT 5;
