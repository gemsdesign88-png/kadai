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