# Time Range Updates - Dashboard & Mobile App

## Changes Made

### 1. **Dashboard - `/src/app/dashboard/cash-flow/page.tsx`**
✅ Updated time range buttons with Indonesian labels:
- `1D` → **Harian** (Daily)
- `1W` → **Mingguan** (Weekly)
- `1M` → **Bulanan** (Monthly)
- `6M` → **6 Bulan** (6 Months)
- `1Y` → **Tahunan** (Yearly)
- `ALL` → **Semua** (All Time)

**Data Handling:**
- ✅ `getRangeStart()` function filters transactions by selected range
- ✅ `calculateStats()` respects selected range (line 761)
- ✅ Stats automatically recalculate when `trendRange` changes (line 465)
- ✅ Chart data updates based on selected time range

### 2. **Mobile App - `/app/expenses.tsx`**
✅ Updated time range with Indonesian labels:
```typescript
const TIME_RANGES = [
  { key: '1D', label: 'Harian', days: 1 },
  { key: '1W', label: 'Mingguan', days: 7 },
  { key: '1M', label: 'Bulanan', days: 30 },
  { key: '6M', label: '6 Bulan', days: 180 },
  { key: '1Y', label: 'Tahunan', days: 365 },
  { key: 'ALL', label: 'Semua', days: null },
]
```

**Data Handling:**
- ✅ `fetchTransactions()` calculates date range dynamically (line 131)
- ✅ Filters transactions by `startDate` (line 143)
- ✅ `useEffect` hook refetches data when `timeRange` changes (line 125)
- ✅ Stats recalculate with filtered data (line 146)

## How It Works

### Dashboard Flow:
1. User clicks time range button (e.g., "Mingguan")
2. `setTrendRange()` updates state
3. `useEffect` dependency triggers `calculateStats()`
4. `getRangeStart()` calculates cutoff date
5. Transactions filtered by date range
6. Stats cards update with filtered data
7. Chart renders data for selected period

### Mobile App Flow:
1. User taps time range button (e.g., "Bulanan")
2. `setTimeRange()` updates state
3. `useEffect` dependency triggers `fetchTransactions()`
4. Calculate `startDate` based on `days` property
5. Query filters: `gte('date', startDate)`
6. Stats calculated from filtered data
7. UI renders transaction list for selected period

## Testing Checklist

- [ ] **Dashboard**: Click each time range button and verify stats update
- [ ] **Dashboard**: Verify chart shows different data for 1D vs 1M vs 1Y
- [ ] **Mobile**: Tap each time range button and verify list updates
- [ ] **Mobile**: Verify stats change (Money In/Out) for different ranges
- [ ] **Both**: Verify "Semua" shows all historical data
- [ ] **Both**: Add new transaction and see it reflected immediately

## Date Filtering Logic

**Dashboard:**
```typescript
const startDate = getRangeStart(trendRange)
const rangeTransactions = transactions.filter(t => new Date(t.date) >= startDate)
```

**Mobile:**
```typescript
const startDate = rangeOption?.days ? new Date(Date.now() - rangeOption.days * 24 * 60 * 60 * 1000) : null
if (startDate) query = query.gte('date', startDate.toISOString().split('T')[0])
```

Both implementations correctly:
1. Calculate the cutoff date based on selected range
2. Filter transactions newer than the cutoff
3. Recalculate stats from filtered data
4. Trigger updates when range selection changes
