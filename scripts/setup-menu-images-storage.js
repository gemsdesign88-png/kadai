#!/usr/bin/env node

/**
 * Setup script for Supabase Storage bucket for menu images
 * Run this script to create the 'menu-images' bucket with proper configuration
 */

const { createClient } = require('@supabase/supabase-js')

// You'll need to set these environment variables or replace with your actual values
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables')
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupStorageBucket() {
  try {
    console.log('🔧 Setting up Supabase Storage bucket for menu images...')

    // Create the bucket
    const { data: bucket, error: bucketError } = await supabase.storage.createBucket('menu-images', {
      public: true, // Make images publicly accessible
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
      fileSizeLimit: 5242880, // 5MB limit
    })

    if (bucketError) {
      if (bucketError.message.includes('already exists')) {
        console.log('✅ Bucket "menu-images" already exists')
      } else {
        throw bucketError
      }
    } else {
      console.log('✅ Created bucket "menu-images"')
    }

    // Note about policies - they need to be set up manually in Supabase Dashboard
    console.log('ℹ️  Bucket policies need to be configured manually:')
    console.log('   1. Go to Supabase Dashboard > Storage > menu-images')
    console.log('   2. Go to "Policies" tab')
    console.log('   3. Create a new policy:')
    console.log('      - Name: "Public Access"')
    console.log('      - Operation: SELECT')
    console.log('      - Policy: Allow all users (for public image access)')
    console.log('')
    console.log('   SQL Policy (if using SQL editor):')
    console.log('   CREATE POLICY "Public Access" ON storage.objects')
    console.log('   FOR SELECT USING (bucket_id = \'menu-images\');')

    console.log('🎉 Storage setup complete!')
    console.log('')
    console.log('📋 Next steps:')
    console.log('1. In Supabase Dashboard, go to Storage > menu-images')
    console.log('2. Create a policy: SELECT for authenticated users (or public if you want public access)')
    console.log('3. Test image upload in your menu management interface')

  } catch (error) {
    console.error('❌ Error setting up storage:', error.message)
    process.exit(1)
  }
}

setupStorageBucket()