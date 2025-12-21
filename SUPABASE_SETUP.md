# Supabase Configuration Guide

## Step 1: Set up Storage Policies for menu-images bucket

Run this SQL in your Supabase Dashboard > SQL Editor:

```sql
-- Setup Storage Policies for menu-images bucket
-- This allows authenticated users to upload and access menu images

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow authenticated users to upload menu images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access to menu images" ON storage.objects;
DROP POLICY IF EXISTS "Allow users to delete their menu images" ON storage.objects;

-- Allow authenticated users to upload files to their restaurant folders
CREATE POLICY "Allow authenticated users to upload menu images"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'menu-images'
  AND auth.role() = 'authenticated'
);

-- Allow public access to view menu images (SELECT)
CREATE POLICY "Allow public access to menu images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'menu-images');

-- Allow users to delete their own menu images
CREATE POLICY "Allow users to delete their menu images"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'menu-images'
  AND auth.role() = 'authenticated'
);
```

## Step 2: Set up RLS policies for menu_items table

Run this SQL in your Supabase Dashboard > SQL Editor:

```sql
-- Enable RLS on menu_items table (if not already enabled)
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS menu_items_select ON menu_items;
DROP POLICY IF EXISTS menu_items_insert ON menu_items;
DROP POLICY IF EXISTS menu_items_update ON menu_items;
DROP POLICY IF EXISTS menu_items_delete ON menu_items;

-- Create SELECT policy
CREATE POLICY menu_items_select ON menu_items
FOR SELECT USING (
  restaurant_id IN (
    SELECT id FROM restaurants WHERE owner_id = auth.uid()
  )
);

-- Create INSERT policy
CREATE POLICY menu_items_insert ON menu_items
FOR INSERT WITH CHECK (
  restaurant_id IN (
    SELECT id FROM restaurants WHERE owner_id = auth.uid()
  )
);

-- Create UPDATE policy
CREATE POLICY menu_items_update ON menu_items
FOR UPDATE USING (
  restaurant_id IN (
    SELECT id FROM restaurants WHERE owner_id = auth.uid()
  )
) WITH CHECK (
  restaurant_id IN (
    SELECT id FROM restaurants WHERE owner_id = auth.uid()
  )
);

-- Create DELETE policy
CREATE POLICY menu_items_delete ON menu_items
FOR DELETE USING (
  restaurant_id IN (
    SELECT id FROM restaurants WHERE owner_id = auth.uid()
  )
);
```

## Troubleshooting

If image upload still fails, check the browser console (F12 > Console tab) for detailed error messages. They will show:
- Upload path being used
- Exact error from Supabase Storage
- File size before/after compression

If you see "bucket not found" or "permission denied", ensure:
1. The bucket is named exactly "menu-images"
2. Storage policies are properly configured
3. You're logged in with an authenticated user account