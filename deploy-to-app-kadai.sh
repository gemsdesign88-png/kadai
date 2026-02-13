#!/bin/bash

# Deploy KadaiPOS Marketing Website to app.kadai.id
# This script deploys the Next.js app to Vercel and configures the custom domain

set -e

echo "🚀 Deploying KadaiPOS Marketing Website to app.kadai.id"
echo "========================================================="
echo ""

# Step 1: Build the project
echo "📦 Step 1/3: Building Next.js app..."
npm run build

echo ""
echo "✅ Build complete!"
echo ""

# Step 2: Deploy to Vercel
echo "🌐 Step 2/3: Deploying to Vercel..."
echo ""
echo "⚠️  You'll need to:"
echo "  1. Login to Vercel (browser will open)"
echo "  2. Confirm deployment settings"
echo ""
read -p "Press ENTER to start deployment..."

npx vercel --prod

echo ""
echo "✅ Deployment complete!"
echo ""

# Step 3: Domain configuration instructions
echo "🔧 Step 3/3: Configure Custom Domain"
echo ""
echo "To connect app.kadai.id:"
echo ""
echo "1. Go to: https://vercel.com/dashboard"
echo "2. Select your project: 'kadaipos-id'"
echo "3. Go to: Settings → Domains"
echo "4. Add domain: app.kadai.id"
echo "5. Vercel will show DNS records to add"
echo ""
echo "6. In your DNS provider (Cloudflare/Niagahoster):"
echo "   Type: CNAME"
echo "   Name: app"
echo "   Target: cname.vercel-dns.com"
echo "   TTL: Auto"
echo ""
echo "7. Wait 5-30 minutes for DNS propagation"
echo ""
echo "✨ Done! Your site will be live at https://app.kadai.id"
