# Bulk Add Menu Items Feature Guide

## Overview
The Bulk Add feature allows you to add multiple menu items at once using either:
1. **Table Editor** - Add unlimited rows directly in the app
2. **CSV Import** - Upload a spreadsheet with menu data

## Features
- ✅ Unlimited rows - Add as many items as you need
- ✅ Real-time validation - Catch errors before saving
- ✅ CSV import support - Bulk upload from Excel or Google Sheets
- ✅ Category assignment - Assign items to existing categories
- ✅ Availability toggle - Set items as available or unavailable
- ✅ Batch save - Save all items with one click

## How to Use

### Method 1: Table Editor (Quick Add)
1. Click the **"Bulk Add"** button (orange) in the menu management page
2. Select **"Table Editor"** tab
3. Fill in the columns:
   - **Item Name** (required)
   - **Price** (required, must be a valid number)
   - **Description** (optional)
   - **Category** (optional, select from existing categories)
   - **Available** (Yes/No toggle)
4. Click **"+ Add Another Row"** to add more items (unlimited)
5. Click **"Save X Items"** to save all items at once

### Method 2: CSV Import (Bulk Upload)
1. Click the **"Bulk Add"** button in the menu management page
2. Select **"CSV Import"** tab
3. Prepare a CSV file with the following columns:
   ```
   name, price, description, categoryId, available
   ```
4. Upload your CSV file
5. Review the imported items in the table
6. Click **"Save X Items"** to add all items

### CSV Format Example
```csv
name,price,description,categoryId,available
Nasi Goreng,45000,Fried rice with egg and vegetables,,true
Mie Goreng,40000,Fried noodles,cat-123,true
Gado Gado,30000,Mixed vegetables with peanut sauce,,false
```

**Notes:**
- `name`: Item name (required, cannot be empty)
- `price`: Numeric value (required, must be valid number)
- `description`: Optional text description
- `categoryId`: Optional - leave blank or use category UUID
- `available`: `true` or `false` (default: true)

### Download CSV Template
Use this template to get started:
[Download menu-items-template.csv](/menu-items-template.csv)

## Validation Rules
- ✓ Item name is required
- ✓ Price must be a valid number
- ✓ Rows with errors are highlighted
- ✓ Empty rows are skipped
- ✓ System prevents saving with errors

## Tips & Tricks
- **Prepare in Excel**: Create items in Excel, then export as CSV
- **Use Google Sheets**: Export Google Sheets as CSV file
- **Category codes**: You can get category IDs from the Supabase database
- **Test small first**: Add a few items first before bulk importing hundreds

## Troubleshooting

### "Invalid price" error
- Make sure the price column contains only numbers
- Remove currency symbols (use `45000` not `$45000`)
- Decimals are allowed: `45.50`

### "Item name cannot be empty"
- Every row must have a name
- Delete empty rows before saving

### CSV won't upload
- Check file format is `.csv`
- Ensure first row contains column headers
- Try opening in Excel first to validate format

## Performance
- Adding 1-50 items: < 1 second
- Adding 50-100 items: 1-2 seconds
- Adding 100+ items: 2-5 seconds

## Database
Items are saved directly to the `menu_items` table with:
- Automatic UUID generation
- Current restaurant ID assignment
- Timestamp tracking
- Proper RLS policies enforcement