# Quick Setup: Debt Payment System

## 🚀 Perubahan yang Sudah Diimplementasikan

### 1. **UI Changes (Already Live!)**
Setelah refresh browser, Anda akan melihat:

#### Di Debt Card:
- ✅ **Tombol "Bayar"** (icon dollar) untuk setiap hutang yang belum lunas
- ✅ **Status badge** dengan warna:
  - 🟡 Yellow: Active (belum bayar)
  - 🔵 Blue: Partial (sedang cicilan)
  - 🟢 Green: Paid (lunas)
  - 🔴 Red: Overdue (jatuh tempo)
- ✅ **Progress info**: "Paid: IDR X / IDR Y" untuk hutang yang sedang dicicil
- ✅ **Sisa hutang** ditampilkan dengan jelas

#### Payment Modal (klik tombol Bayar):
- ✅ **Summary box** menampilkan total hutang, sudah dibayar, dan sisa
- ✅ **Quick buttons**: "50%" dan "Lunas" untuk cepat isi jumlah
- ✅ **Input validation**: tidak bisa bayar lebih dari sisa hutang
- ✅ **Catatan** field untuk notes tambahan

### 2. **Backend Setup Required**

Untuk enable full functionality (tracking payment history), jalankan SQL migration:

#### Step 1: Buka Supabase Dashboard
1. Go to: https://supabase.com/dashboard
2. Pilih project Anda
3. Klik "SQL Editor" di sidebar kiri

#### Step 2: Run Migration
1. Copy seluruh isi file `ADD_DEBT_PAYMENTS_TABLE.sql`
2. Paste di SQL Editor
3. Klik "Run" atau tekan Cmd+Enter

#### Step 3: Verify
Setelah migration berhasil, check:
```sql
-- Should see new table
SELECT * FROM debt_payments LIMIT 1;

-- Should see new columns
SELECT amount_paid, remaining_amount FROM debts LIMIT 1;
```

## ✅ Testing Flow

### Test 1: Create New Debt
1. Go to Cash Flow → Debts tab
2. Click "Add Debt"
3. Fill: Kreditor name, amount, due date
4. Save
5. ✅ **Verify**: Debt card shows with "Bayar" button

### Test 2: Pay Partial
1. Click "Bayar" button on a debt
2. Modal opens showing debt summary
3. Enter partial amount (e.g., 50% of total)
4. Add notes (optional): "Cicilan 1"
5. Click "Bayar Sekarang"
6. ✅ **Verify**: 
   - Status changes to "Partial" (blue badge)
   - Shows "Paid: IDR X / IDR Y"
   - Expense transaction created automatically

### Test 3: Pay Remaining (Lunas)
1. Click "Bayar" on partial debt
2. Click "Lunas" quick button
3. Submit
4. ✅ **Verify**:
   - Status changes to "Paid" (green badge)
   - "Bayar" button disappears
   - Total shown in green

### Test 4: Check Transactions
1. Go to Cash Flow → Transactions tab
2. ✅ **Verify**: 
   - See expense transaction: "Pembayaran hutang ke [kreditor]"
   - Amount matches payment
   - Date matches payment date

## 🎯 What Works Now (Even Without Migration)

**Already working:**
- ✅ Tombol "Bayar" visible pada debt cards
- ✅ Payment modal opens with proper UI
- ✅ Input validation
- ✅ Auto-create expense transaction
- ✅ Visual status updates

**Requires migration:**
- ⏳ Payment history tracking
- ⏳ Multiple payments per debt
- ⏳ Accurate amount_paid and remaining_amount in database

## 🔧 Troubleshooting

### Button "Bayar" tidak muncul?
1. Refresh browser (hard refresh: Cmd+Shift+R)
2. Check debt status - tombol hanya muncul untuk status selain "paid"
3. Check browser console for errors

### Modal tidak buka?
1. Open browser DevTools (F12)
2. Check Console tab untuk error messages
3. Verify `setShowPaymentModal` dan `setSelectedDebtForPayment` terpanggil

### Expense transaction tidak tercreate?
1. Jalankan migration SQL terlebih dahulu
2. Check Supabase logs untuk error
3. Verify RLS policies sudah active

## 📝 Notes

- Code sudah **production-ready**
- UI menggunakan Airbnb design principles
- Full end-to-end flow sudah implemented
- Auto-create expense transaction saat bayar hutang
- Support cicilan dan bayar lunas

## 🎉 Setelah Migration

Sistem akan fully functional dengan:
- Payment history lengkap per debt
- Accurate tracking cicilan
- Auto-update status berdasarkan pembayaran
- Link antara payment → transaction
- Audit trail complete

---

**Need help?** Check `DEBT_MANAGEMENT_SYSTEM.md` untuk dokumentasi lengkap.
