#!/bin/bash

# Vercel Deployment Script for KadaiPOS
# Secure alternative to VPS hosting

echo "🚀 Deploying to Vercel - Secure Alternative"
echo "=========================================="

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI..."
    npm install -g vercel
fi

# Login to Vercel (if not already logged in)
echo "Checking Vercel authentication..."
vercel login --yes 2>/dev/null || vercel login

# Build the project
echo "Building project..."
npm run build

# Deploy to Vercel
echo "Deploying to Vercel..."
vercel --prod

echo ""
echo "✅ Deployment completed!"
echo ""
echo "🔒 SECURITY BENEFITS:"
echo "- Automatic SSL certificates"
echo "- DDoS protection"
echo "- Global CDN"
echo "- Zero maintenance"
echo "- Automatic scaling"
echo "- Built-in monitoring"
echo ""
echo "📊 VERCEL ADVANTAGES:"
echo "- No server management"
echo "- Automatic backups"
echo "- Instant rollbacks"
echo "- Environment variables encryption"
echo "- Real-time logs"
echo ""
echo "🔧 NEXT STEPS:"
echo "- Update DNS to point to Vercel domain"
echo "- Configure custom domain in Vercel dashboard"
echo "- Set up environment variables"
echo "- Configure redirects and rewrites"
