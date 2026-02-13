const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://bigjlzrnlzcfxwlkstpp.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpZ2psenJubHpjZnh3bGtzdHBwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjcxMzE1NCwiZXhwIjoyMDc4Mjg5MTU0fQ.GcZT8vuuD_8eOU4pr6X5vYjAnmH81arHOBnQTJbqpZM';

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

const restaurantId = '51352e6d-5326-407b-8903-875fec241e05';
const startDate = '2026-02-01T00:00:00Z';
const endDate = '2026-03-01T00:00:00Z';

async function investigate() {
    console.log('🔍 Summarizing ALL Commissions and Expenses for Feb 2026 across all restaurants\n');

    // Group Commissions by Restaurant
    const { data: allComms } = await supabase
        .from('staff_commissions')
        .select('commission_amount, restaurant_id, restaurants(name)')
        .gte('created_at', '2026-02-01')
        .lt('created_at', '2026-03-01');
    
    const commSummary = {};
    allComms?.forEach(c => {
        const rid = c.restaurant_id;
        const name = c.restaurants?.name || 'Unknown';
        if (!commSummary[rid]) commSummary[rid] = { name, total: 0, items: [] };
        commSummary[rid].total += c.commission_amount || 0;
        commSummary[rid].items.push(c.commission_amount);
    });

    console.log('--- Commission Summary ---');
    Object.entries(commSummary).forEach(([rid, data]) => {
        console.log(`Restaurant: ${data.name} (${rid}), Total: ${data.total}`);
        if (data.total === 524500) {
            console.log('  🎯 MATCH FOUND!');
            console.log('  Items:', data.items);
        }
    });

    // Group Expenses by Restaurant
    const { data: allExps } = await supabase
        .from('expenses')
        .select('amount, restaurant_id, restaurants(name), category, description')
        .gte('date', '2026-02-01')
        .lt('date', '2026-03-01');
    
    const expSummary = {};
    allExps?.forEach(e => {
        const rid = e.restaurant_id;
        const name = e.restaurants?.name || 'Unknown';
        if (!expSummary[rid]) expSummary[rid] = { name, total: 0, hppTotal: 0, items: [] };
        expSummary[rid].total += e.amount || 0;
        if (e.category?.toLowerCase().includes('bahan') || e.category?.toLowerCase().includes('hpp') || e.description?.toLowerCase().includes('bahan')) {
            expSummary[rid].hppTotal += e.amount || 0;
            expSummary[rid].items.push({amt: e.amount, desc: e.description, cat: e.category});
        }
    });

    console.log('\n--- Expense Summary ---');
    Object.entries(expSummary).forEach(([rid, data]) => {
        console.log(`Restaurant: ${data.name} (${rid}), HPP Total: ${data.hppTotal}, Total: ${data.total}`);
        if (data.hppTotal === 295000 || data.total === 295000) {
            console.log('  🎯 MATCH FOUND!');
            console.log('  HPP Items:', data.items);
        }
    });
}

investigate();
