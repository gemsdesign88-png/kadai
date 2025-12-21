#!/usr/bin/env node

/**
 * Debug script to check RLS policies for menu_items table
 */

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Load environment variables from .env.local
const envPath = path.join(__dirname, '..', '.env.local')
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8')
  const envLines = envContent.split('\n')
  envLines.forEach(line => {
    const [key, ...valueParts] = line.split('=')
    if (key && valueParts.length > 0) {
      const value = valueParts.join('=').trim()
      if (value.startsWith('"') && value.endsWith('"')) {
        process.env[key.trim()] = value.slice(1, -1)
      } else {
        process.env[key.trim()] = value
      }
    }
  })
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function checkMenuItemsPolicies() {
  try {
    console.log('🔍 Checking menu_items table RLS policies...')

    // Check if RLS is enabled
    const { data: rlsEnabled, error: rlsError } = await supabase
      .rpc('check_rls_enabled', { table_name: 'menu_items' })

    if (rlsError) {
      console.log('ℹ️  Could not check RLS status via RPC, this is normal')
    } else {
      console.log(`📋 RLS Enabled: ${rlsEnabled ? 'YES' : 'NO'}`)
    }

    // Try to get policies (this might not work depending on permissions)
    console.log('\n🔍 Attempting to query policies...')

    // Try a simple insert to see what happens
    console.log('\n🧪 Testing insert permissions...')

    const testData = {
      name: 'Test Item',
      category: 'Test Category',
      price: 10.00,
      available: true,
      restaurant_id: 'test-restaurant-id' // This should fail
    }

    const { data, error } = await supabase
      .from('menu_items')
      .insert(testData)
      .select()

    if (error) {
      console.log('❌ Insert failed (expected):', error.message)
      if (error.message.includes('violates row-level security policy')) {
        console.log('🔒 This confirms RLS is blocking inserts')
      }
    } else {
      console.log('✅ Insert succeeded (unexpected)')
      // Clean up
      if (data && data[0]) {
        await supabase.from('menu_items').delete().eq('id', data[0].id)
      }
    }

    console.log('\n📋 Recommendations:')
    console.log('1. Check Supabase Dashboard > menu_items table > RLS Policies')
    console.log('2. Ensure there\'s an INSERT policy that allows the current user')
    console.log('3. The policy should check: restaurant.owner_id = auth.uid()')
    console.log('4. Or use service role key for server-side operations')

  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

checkMenuItemsPolicies()