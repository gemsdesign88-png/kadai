-- Add missing columns to ingredients table for Toko/Retail mode
ALTER TABLE ingredients
ADD COLUMN IF NOT EXISTS current_stock DECIMAL(12,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS min_stock_level DECIMAL(12,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS sku VARCHAR(50),
ADD COLUMN IF NOT EXISTS cost_price DECIMAL(12,2) DEFAULT 0;

-- Sync existing data if possible
UPDATE ingredients SET min_stock_level = reorder_level WHERE min_stock_level = 0 AND reorder_level > 0;
UPDATE ingredients SET cost_price = unit_cost WHERE cost_price = 0 AND unit_cost > 0;

-- Add index for SKU
CREATE INDEX IF NOT EXISTS idx_ingredients_sku ON ingredients(sku);
