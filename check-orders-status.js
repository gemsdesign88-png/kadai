
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://bigjlzrnlzcfxwlkstpp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpZ2psenJubHpjZnh3bGtzdHBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3MTMxNTQsImV4cCI6MjA3ODI4OTE1NH0.TL7-xrvu1FHwawVaW3XhTztPO37v45Uq9v-kQKFRev0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkOrdersAndAppointments() {
  // Get counts
  const { count: orderCount, error: countError } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true });
  console.log('Total Orders:', orderCount);

  const { count: apptCount, error: apptCountError } = await supabase
    .from('appointments')
    .select('*', { count: 'exact', head: true });
  console.log('Total Appointments:', apptCount);
  
  // Check orders columns
  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .select('*')
    .limit(1);

  if (orderError) {
    console.error('Orders Error:', orderError);
  } else {
    const orderCols = Object.keys(orderData[0] || {});
    console.log('Orders has paid_at:', orderCols.includes('paid_at'));
    if (!orderCols.length) console.log('Orders table is empty, could not check columns via select *');
  }

  // Check appointments columns
  const { data: apptData, error: apptError } = await supabase
    .from('appointments')
    .select('*')
    .limit(1);

  if (apptError) {
    console.error('Appointments Error:', apptError);
  } else {
    const apptCols = Object.keys(apptData[0] || {});
    console.log('Appointments has paid_at:', apptCols.includes('paid_at'));
    if (!apptCols.length) console.log('Appointments table is empty, could not check columns via select *');
  }

  console.log('\n--- Searching for statuses NOT in our list ---');
  const usedStatuses = ['completed', 'done', 'finished', 'closed', 'paid', 'served', 'ready', 'delivered', 'preparing', 'pending'];
  
  const { data: outlierStatuses, error: outlierError } = await supabase
    .from('orders')
    .select('status')
    .not('status', 'in', `(${usedStatuses.join(',')})`)
    .limit(10);

  if (outlierError) {
    console.error('Outlier Status Error:', outlierError);
  } else {
    const uniqueOutliers = [...new Set(outlierStatuses.map(s => s.status))];
    console.log('Unique Order Statuses NOT in our list:', uniqueOutliers);
  }

  const usedPayStatuses = ['paid', 'completed', 'Paid', 'Completed', 'partial', 'Partial'];
  const { data: outlierPayStatuses, error: outlierPayError } = await supabase
    .from('orders')
    .select('payment_status')
    .not('payment_status', 'in', `(${usedPayStatuses.join(',')})`)
    .limit(10);

  if (outlierPayError) {
    console.error('Outlier Pay Status Error:', outlierPayError);
  } else {
    const uniquePayOutliers = [...new Set(outlierPayStatuses.map(s => s.payment_status))];
    console.log('Unique Order Payment Statuses NOT in our list:', uniquePayOutliers);
  }
}

checkOrdersAndAppointments();
