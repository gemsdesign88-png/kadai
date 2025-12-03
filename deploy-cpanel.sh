#!/bin/bash
# KadaiPOS Deployment Script for cPanel
# This script prepares the deployment package for upload to cPanel

set -e

echo "🚀 Preparing KadaiPOS for cPanel deployment..."

# Create deployment directory
DEPLOY_DIR="kadaipos-cpanel-deploy"
rm -rf $DEPLOY_DIR
mkdir -p $DEPLOY_DIR

echo "📦 Copying files..."
# Copy necessary files (excluding dev dependencies)
cp -r src $DEPLOY_DIR/
cp -r public $DEPLOY_DIR/
cp package.json $DEPLOY_DIR/
cp package-lock.json $DEPLOY_DIR/
cp next.config.ts $DEPLOY_DIR/
cp tsconfig.json $DEPLOY_DIR/
cp postcss.config.mjs $DEPLOY_DIR/
cp .env.production $DEPLOY_DIR/.env.local

# Copy already built .next if exists
if [ -d ".next" ]; then
    echo "📋 Copying pre-built files..."
    cp -r .next $DEPLOY_DIR/
fi

echo "📝 Creating deployment instructions..."
cat > $DEPLOY_DIR/DEPLOY_INSTRUCTIONS.txt <<'EOF'
KadaiPOS cPanel Deployment Instructions
========================================

1. COMPRESS THIS FOLDER
   - Right-click this folder and compress to ZIP
   - Or run: zip -r kadaipos.zip *

2. UPLOAD TO CPANEL
   - Login to cPanel
   - Go to File Manager
   - Navigate to your domain's public_html or subdomain folder
   - Upload the ZIP file
   - Extract it

3. SETUP NODE.JS APP IN CPANEL
   - Go to "Setup Node.js App" in cPanel
   - Click "Create Application"
   - Fill in:
     * Node.js version: 18.x or 20.x
     * Application mode: Production
     * Application root: (your domain folder, e.g., public_html)
     * Application URL: kadaipos.id
     * Application startup file: node_modules/next/dist/bin/next
     * Passenger log file: (leave default)
   
4. SET ENVIRONMENT VARIABLES
   In the Node.js App, add these variables:
   - NEXT_PUBLIC_SUPABASE_URL = https://bigjlzrnlzcfxwlkstpp.supabase.co
   - NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpZ2psenJubHpjZnh3bGtzdHBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3MTMxNTQsImV4cCI6MjA3ODI4OTE1NH0.TL7-xrvu1FHwawVaW3XhTztPO37v45Uq9v-kQKFRev0

5. RUN NPM COMMANDS
   Click "Run NPM Install" button in cPanel Node.js App interface
   
   Then open the application terminal and run:
   npm run build

6. START THE APPLICATION
   Click "Restart" button in cPanel

7. SETUP SSL
   - Go to SSL/TLS in cPanel
   - Click "Manage AutoSSL"
   - Enable for your domain
   - Or use "Let's Encrypt SSL" if available

8. CONFIGURE SUPABASE
   - Login to Supabase dashboard
   - Go to Authentication > URL Configuration
   - Site URL: https://kadaipos.id
   - Redirect URLs:
     * https://kadaipos.id/auth/callback
     * https://www.kadaipos.id/auth/callback

9. TEST
   - Open https://kadaipos.id
   - Test signup/login functionality

TROUBLESHOOTING:
- If app doesn't start: Check Node.js App logs in cPanel
- If build fails: Ensure Node version is 18.x or higher
- If login fails: Verify Supabase URLs are set correctly
- Port issues: cPanel manages ports automatically via Passenger

Need help? Check the full guide in DEPLOYMENT.md
EOF

echo "✅ Creating ZIP archive..."
cd $DEPLOY_DIR
zip -r ../kadaipos-cpanel.zip . > /dev/null
cd ..

echo ""
echo "✅ Deployment package ready!"
echo ""
echo "📦 File created: kadaipos-cpanel.zip"
echo "📁 Size: $(du -h kadaipos-cpanel.zip | cut -f1)"
echo ""
echo "📋 Next steps:"
echo "1. Upload kadaipos-cpanel.zip to your cPanel File Manager"
echo "2. Extract it in your domain folder (public_html or subdomain)"
echo "3. Follow DEPLOY_INSTRUCTIONS.txt inside the ZIP"
echo ""
echo "🔗 Your site will be live at: https://kadaipos.id"
echo ""
