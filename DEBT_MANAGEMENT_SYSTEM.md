# Debt Management System - Complete Implementation

## Overview
Sistem manajemen hutang yang lengkap dengan tracking pembayaran (cicilan/lunas), otomatis create transaksi expense, dan update status hutang.

## Database Schema

### Table: `debts`
```sql
- id: UUID (PK)
- restaurant_id: UUID (FK)
- creditor_name: VARCHAR - Nama kreditor/supplier
- amount: DECIMAL - Total hutang
- amount_paid: DECIMAL - Total yang sudah dibayar
- remaining_amount: DECIMAL - Sisa hutang
- description: TEXT - Deskripsi hutang
- due_date: DATE - Tanggal jatuh tempo
- status: ENUM - 'active', 'partial', 'paid', 'overdue'
- created_at, updated_at, created_by
```

### Table: `debt_payments`
```sql
- id: UUID (PK)
- debt_id: UUID (FK -> debts)
- restaurant_id: UUID (FK)
- amount: DECIMAL - Jumlah pembayaran
- payment_date: DATE - Tanggal pembayaran
- notes: TEXT - Catatan pembayaran
- transaction_id: UUID (FK -> expenses) - Link ke transaksi expense
- created_at, updated_at
```

## Features

### 1. **Catat Hutang Baru**
- User input: Kreditor, jumlah, deskripsi, due date
- Auto set: amount_paid = 0, remaining_amount = amount, status = 'active'
- Benefit: Track semua hutang dengan jelas

### 2. **Bayar Hutang (Cicilan/Lunas)**
**Flow:**
1. User klik tombol "Bayar" pada debt card
2. Modal terbuka menampilkan:
   - Total hutang
   - Sudah dibayar (jika ada)
   - Sisa hutang
3. User input jumlah bayar (bisa pilih 50% atau Lunas)
4. System akan:
   - Create record di `debt_payments`
   - Auto create transaksi expense dengan deskripsi "Pembayaran hutang ke [kreditor]"
   - Update `debts` table: amount_paid, remaining_amount, status
   - Link payment ke transaction via transaction_id

**Status Logic:**
- `active` -> belum ada pembayaran
- `partial` -> sudah bayar sebagian (0 < amount_paid < amount)
- `paid` -> lunas (amount_paid = amount, remaining_amount = 0)
- `overdue` -> melewati due_date dan belum lunas

### 3. **Auto Transaction Creation**
Setiap payment akan otomatis create expense transaction:
- Type: expense
- Category: operational
- Amount: payment amount
- Description: "Pembayaran hutang ke [kreditor] - [notes]"
- Date: payment_date
- Link back ke debt_payment via transaction_id

### 4. **Payment History**
Setiap debt memiliki array payments yang berisi:
- Jumlah payment
- Tanggal payment
- Catatan
- Link ke transaction

### 5. **Visual Indicators**
**Debt Card menampilkan:**
- Status badge dengan color coding:
  - Yellow: Active
  - Blue: Partial (sedang dicicil)
  - Green: Paid
  - Red: Overdue
- Progress payment: "Paid: IDR 5,000 / IDR 10,000"
- Sisa hutang dengan font besar dan merah
- Button "Bayar" (hanya untuk debt yang belum lunas)

## UI/UX Improvements

### Payment Modal
**Modern Airbnb-style Design:**
- Rounded corners (rounded-3xl)
- Clear visual hierarchy
- Summary box menampilkan debt info
- Quick action buttons (50%, Lunas)
- Input validation (tidak bisa bayar lebih dari sisa)
- Clear CTA "Bayar Sekarang" dengan green color

**Form Fields:**
1. **Jumlah Bayar**
   - Number input dengan IDR prefix
   - Max validation = remaining_amount
   - Quick buttons untuk 50% dan Full payment

2. **Tanggal Bayar**
   - Date picker
   - Default: hari ini

3. **Catatan**
   - Optional textarea
   - Untuk notes tambahan (e.g., "Cicilan 1 dari 3")

### Debt Card Enhancements
- Show payment progress bar (visual)
- Status icon dengan color matching
- Hover effects
- Button "Bayar" dengan DollarSign icon
- Read-only untuk paid debts

## End-to-End Flow Examples

### Example 1: Bayar Cicilan
```
1. User catat hutang IDR 10,000,000 ke Supplier A
   - status: active
   - remaining: 10,000,000

2. User bayar cicilan IDR 3,000,000
   - debt_payment record created
   - expense transaction created: "Pembayaran hutang ke Supplier A"
   - debt updated: amount_paid = 3,000,000, remaining = 7,000,000, status = partial

3. User bayar cicilan IDR 7,000,000
   - debt_payment record created
   - expense transaction created
   - debt updated: amount_paid = 10,000,000, remaining = 0, status = paid
```

### Example 2: Bayar Lunas
```
1. User catat hutang IDR 5,000,000
2. User klik "Bayar" -> klik button "Lunas"
3. Form pre-filled dengan full amount
4. Submit -> langsung status = paid
```

## Benefits

### For Business Owner
✅ Track hutang dengan jelas per kreditor
✅ Monitor progress pembayaran
✅ Auto record cash flow saat bayar hutang
✅ Visual indicators untuk prioritas pembayaran
✅ History lengkap semua pembayaran

### For Cash Flow
✅ Setiap pembayaran hutang tercatat sebagai expense
✅ Tidak ada manual input lagi
✅ Link antara payment dan transaction
✅ Konsisten dan accurate

### For Accounting
✅ Audit trail lengkap
✅ Traceability dari debt -> payment -> transaction
✅ Reconciliation mudah
✅ Support untuk partial payments

## SQL Migration
Run file: `ADD_DEBT_PAYMENTS_TABLE.sql`

This will:
- Create debt_payments table
- Add amount_paid and remaining_amount columns to debts
- Set up RLS policies
- Create triggers for updated_at
- Add helper function calculate_debt_totals()

## Testing Checklist
- [ ] Create new debt -> verify initial values correct
- [ ] Pay partial -> verify status changes to 'partial'
- [ ] Pay partial again -> verify amounts accumulate
- [ ] Pay full (lunas) -> verify status = 'paid'
- [ ] Check expense transaction created after payment
- [ ] Verify transaction description correct
- [ ] Check payment can't exceed remaining amount
- [ ] Test 50% quick button
- [ ] Test "Lunas" quick button
- [ ] Verify modal closes after successful payment
- [ ] Check debt card visual updates after payment
- [ ] Test paid debt has no "Bayar" button

## Future Enhancements
- Payment reminders before due date
- Payment schedule/recurring payments
- Multiple payment methods tracking
- Export payment history
- Payment receipt generation
- Email notification on payment
