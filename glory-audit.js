
const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = 'https://bigjlzrnlzcfxwlkstpp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpZ2psenJubHpjZnh3bGtzdHBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3MTMxNTQsImV4cCI6MjA3ODI4OTE1NH0.TL7-xrvu1FHwawVaW3XhTztPO37v45Uq9v-kQKFRev0';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const GLORY_PRO_ID = '4cbd583f-aacd-4d60-a2f3-3160d7c02657';

async function run() {
  console.log('--- AUDIT REPORT FOR GLORY PRO ---');
  
  // 1. Check all appointments for Feb & Jan
  const { data: appointments } = await supabase.from('appointments')
    .select('*')
    .eq('restaurant_id', GLORY_PRO_ID)
    .gte('appointment_date', '2025-01-01')
    .order('appointment_date', { ascending: false });
  
  console.log('\n--- APPOINTMENTS (Jan-Feb) ---');
  let febRev = 0, febPool = 0;
  let janRev = 0, janPool = 0;
  
  appointments?.forEach(a => {
    const isFeb = a.appointment_date.startsWith('2025-02');
    const isJan = a.appointment_date.startsWith('2025-01');
    
    if (isFeb) {
      febRev += a.payment_amount || 0;
      febPool += a.commission_amount || 0;
    } else if (isJan) {
      janRev += a.payment_amount || 0;
      janPool += a.commission_amount || 0;
    }
    
    console.log(`[${a.appointment_date}] ${a.service_name}: Paid=${a.is_paid}, Rev=${a.payment_amount || 0}, CommPool=${a.commission_amount || 0}, Status=${a.status}`);
  });
  
  console.log('\n--- SUMMARY ---');
  console.log(`FEBRUARY: Rev=${febRev.toLocaleString()}, CommPool=${febPool.toLocaleString()}`);
  console.log(`JANUARY: Rev=${janRev.toLocaleString()}, CommPool=${janPool.toLocaleString()}`);

  // 2. Check Expenses
  const { data: expenses } = await supabase.from('expenses')
    .select('*')
    .eq('restaurant_id', GLORY_PRO_ID)
    .gte('expense_date', '2025-02-01');

  console.log('\n--- EXPENSES FEB ---');
  let expTotal = 0;
  expenses?.forEach(e => {
    expTotal += e.amount || 0;
    console.log(`[${e.expense_date}] ${e.description} (${e.category}): ${e.amount.toLocaleString()}`);
  });
  console.log(`Total Exp: ${expTotal.toLocaleString()}`);

  // 3. Check Manual Commissions Ledger
  const { data: ledger } = await supabase.from('staff_commissions')
    .select('*')
    .eq('restaurant_id', GLORY_PRO_ID)
    .gte('earned_at', '2025-02-01T00:00:00');
  
  console.log('\n--- LEDGER ENTRIES (FEB) ---');
  let ledgerTotal = 0;
  ledger?.forEach(l => {
    ledgerTotal += l.amount || 0;
    console.log(`[${l.earned_at}] ${l.staff_name}: ${l.amount.toLocaleString()}`);
  });
  console.log(`Total Ledger: ${ledgerTotal.toLocaleString()}`);
}

run();
