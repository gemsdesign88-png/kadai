# Expenses Tracking Feature Setup

## Overview
The expenses tracking feature has been added to KadaiPOS dashboard to help restaurant owners monitor and manage their operational expenses including stock purchases, employee salaries, utilities, and other costs.

## Features
- **Expense Categories**: Stock Purchase, Employee Salary, Utilities, Rent, Marketing, Equipment, Inventory, Other ✅
- **Comprehensive Dashboard**: Total expenses, monthly breakdown, category analysis ✅
- **Add/Edit/Delete Expenses**: Full CRUD operations with date tracking ✅
- **Search & Filter**: Filter by category and search by description ✅
- **Multi-language Support**: English, Indonesian, and Chinese translations ✅
- **Currency Formatting**: Proper IDR formatting with locale support ✅

## Database Setup

### Option 1: Using Supabase Dashboard
1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `expenses-table-setup.sql`
4. Run the SQL script

### Option 2: Using Supabase CLI (if installed)
```bash
supabase db push
```

### Option 3: Manual SQL Execution
Execute the SQL in `expenses-table-setup.sql` using your preferred PostgreSQL client.

## Files Created/Modified

### New Files:
- `src/app/dashboard/expenses/page.tsx` - Main expenses page component
- `expenses-table-setup.sql` - Database schema and policies

### Modified Files:
- `src/components/dashboard-layout.tsx` - Added expenses menu item
- `src/lib/i18n/translations.ts` - Added translations for all languages

## Usage

1. **Access**: Navigate to Dashboard → Expenses
2. **Add Expense**: Click "Add Expense" button
3. **Categories**: Choose from predefined categories or select "Other"
4. **Track Costs**: Monitor total expenses, monthly spending, and category breakdowns
5. **Search/Filter**: Use search bar and category filter to find specific expenses

## Database Schema Updates

### Handling Existing Data
The schema has been updated to accommodate existing expense data:

- **Category Support**: Added 'inventory' category to support existing data
- **Nullable Description**: Changed description from NOT NULL to nullable to handle existing records
- **Migration Queries**: Added data migration section to fix NULL values

### Migration Steps (if needed):
```sql
-- Fix NULL descriptions
UPDATE expenses SET description = 'No description' WHERE description IS NULL;

-- Fix NULL created_by (set to restaurant owner)
UPDATE expenses
SET created_by = restaurants.owner_id
FROM restaurants
WHERE expenses.restaurant_id = restaurants.id
AND expenses.created_by IS NULL;
```

## Multi-Language Support ✅

The expense tracking feature supports three languages:

### English
- Page Title: "Expense Tracking"
- Stats: "Total Expenses", "This Month", "Categories"
- Categories: "Stock Purchase", "Employee Salary", etc.
- Form Labels: "Category", "Amount", "Description", "Date"

### Indonesian  
- Page Title: "Pelacakan Pengeluaran"
- Stats: "Total Pengeluaran", "Bulan Ini", "Kategori"
- Categories: "Pembelian Stok", "Gaji Karyawan", etc.
- Form Labels: "Kategori", "Jumlah", "Deskripsi", "Tanggal"

### Chinese
- Page Title: "支出跟踪"
- Stats: "总支出", "本月", "类别"
- Categories: "库存采购", "员工工资", etc.
- Form Labels: "类别", "金额", "描述", "日期"

## Security

The expenses table includes Row Level Security (RLS) policies ensuring:
- Users can only view/edit expenses for restaurants they own
- Proper authentication checks
- Data isolation between different restaurant owners

## Future Enhancements

Potential improvements for the expenses feature:
- Expense approval workflow for staff expenses
- Recurring expense templates
- Expense receipt/image upload
- Budget vs actual spending comparisons
- Export to CSV/PDF
- Advanced reporting with charts