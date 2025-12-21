# Menu Image Upload Setup

This guide explains how to set up image uploads for menu items that will be displayed to customers when they scan QR codes from tables.

## 🚀 Features

- **Automatic Image Compression**: Images are compressed to WebP format and resized to max 800px
- **Small File Sizes**: Maximum 0.5MB per image to save database space and bandwidth
- **Supabase Storage**: Images stored in cloud storage, not in your database
- **Mobile Optimized**: Perfect for customer mobile viewing
- **Progress Indicators**: Upload progress shown to users

## 📋 Setup Instructions

### 1. Create Supabase Storage Bucket

Run the setup script to create the storage bucket:

```bash
node scripts/setup-menu-images-storage.js
```

Or manually create a bucket in your Supabase Dashboard:

1. Go to **Storage** in your Supabase Dashboard
2. Click **Create bucket**
3. Name it `menu-images`
4. Make it **Public** (so images can be viewed by customers)
5. Set allowed MIME types: `image/jpeg`, `image/png`, `image/webp`, `image/gif`
6. Set file size limit: `5MB`

### 2. Configure Bucket Policies

In Supabase Dashboard > Storage > menu-images:

1. Go to **Policies** tab
2. Create a new policy for **SELECT** operations
3. Allow **authenticated** users (or **anon** if you want public access)

Example policy:
```sql
-- Allow anyone to view images
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'menu-images');
```

### 3. Environment Variables

Make sure you have these in your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 🎯 How It Works

### Image Processing Pipeline

1. **File Selection**: User selects image file
2. **Client-side Compression**:
   - Resize to max 800px width/height
   - Convert to WebP format
   - Compress to max 0.5MB
3. **Upload to Supabase Storage**:
   - Stored in `menu-images/restaurant-{id}/` folder
   - Unique filename with timestamp
4. **Database Update**: Image URL saved to menu item

### File Structure in Storage

```
menu-images/
├── restaurant-123/
│   ├── 1703123456789-abc123.webp
│   ├── 1703123456790-def456.webp
│   └── ...
└── restaurant-456/
    └── ...
```

## 📱 Usage in Menu Management

1. **Add/Edit Menu Item**: Click the image upload area or drag & drop
2. **Preview**: See image preview before saving
3. **Progress**: Watch upload progress bar
4. **Alternative**: Still supports direct URL input

## 🔧 Technical Details

### Image Specifications
- **Format**: WebP (automatic conversion)
- **Max Size**: 0.5MB
- **Max Dimensions**: 800px (width or height)
- **Compression**: Lossy compression for smaller files

### Performance Benefits
- **Database**: Only stores URLs, not binary data
- **Bandwidth**: Small files load fast on mobile
- **Storage**: Efficient WebP format
- **CDN**: Supabase provides global CDN

### Error Handling
- Fallback to original file if compression fails
- Clear error messages for upload failures
- Graceful degradation to URL input

## 🧪 Testing

1. Upload an image in menu management
2. Check Supabase Storage dashboard
3. Verify image displays in menu cards
4. Test on mobile device (QR code scanning)

## 🛠️ Troubleshooting

### Upload Fails
- Check Supabase Storage policies
- Verify bucket exists and is public
- Check file size (max 5MB)
- Check network connection

### Images Don't Display
- Verify bucket is public
- Check image URL in database
- Test direct URL access

### Large File Sizes
- Images should be automatically compressed
- Check if compression library is working
- Verify WebP support in browser

## 📊 Database Impact

- **Before**: Images stored as BLOBs in database (large, slow)
- **After**: Only URLs stored (small, fast)
- **Storage**: Moved to Supabase Storage with CDN
- **Performance**: Much faster loading, especially on mobile