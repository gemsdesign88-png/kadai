const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://bigjlzrnlzcfxwlkstpp.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpZ2psenJubHpjZnh3bGtzdHBwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjcxMzE1NCwiZXhwIjoyMDc4Mjg5MTU0fQ.GcZT8vuuD_8eOU4pr6X5vYjAnmH81arHOBnQTJbqpZM';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function updateManagerPermissions() {
  console.log('Updating manager permissions...');
  
  // Target user: 0495387d-4820-4b81-9754-a3fc4587db06 (Gems)
  // Target restaurant: 3af205f4-aa37-4ec8-878f-eb6399dcfcea (Naga Depok)
  
  const userId = '0495387d-4820-4b81-9754-a3fc4587db06';
  const restaurantId = '3af205f4-aa37-4ec8-878f-eb6399dcfcea';
  
  const newPermissions = {
    manage_menu: true,      // For Promo (assuming promo is part of menu or general management)
    manage_staff: true,     // For Staff Management
    manage_orders: true,
    manage_tables: true,
    view_analytics: true,   // Usually managers need this
    manage_settings: false  // Keep false to hide general settings, but we might need to allow specific ones
  };

  const { data, error } = await supabase
    .from('restaurant_staff')
    .update({ permissions: newPermissions })
    .eq('user_id', userId)
    .eq('restaurant_id', restaurantId)
    .select();

  if (error) {
    console.error('Error updating permissions:', error);
  } else {
    console.log('Permissions updated successfully:', data);
  }
}

updateManagerPermissions();
