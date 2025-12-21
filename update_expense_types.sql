
-- Update existing expenses to set transaction_type
-- Run this AFTER adding the transaction_type column with add-ingredient-to-expenses.sql
UPDATE expenses
SET transaction_type = 'expense'
WHERE transaction_type IS NULL OR transaction_type = '';