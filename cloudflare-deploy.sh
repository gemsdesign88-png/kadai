#!/bin/bash

# Cloudflare Pages Deployment Script for KadaiPOS
# This script builds and deploys the project to Cloudflare Pages

set -e

echo "🚀 Starting Cloudflare Pages Deployment..."

# 1. Install dependencies if needed
echo "📦 Checking dependencies..."
npm install --legacy-peer-deps

# 2. Build the project for Cloudflare
echo "🏗️ Building project for Cloudflare..."
npm run pages:build

# 3. Deploy to Cloudflare
echo "📤 Deploying to Cloudflare Pages..."
# Remove large build log file that exceeds Cloudflare's 25MB limit
rm -f .vercel/output/static/_worker.js/nop-build-log.json
# Note: This requires being logged in to wrangler (npx wrangler login)
npx wrangler pages deploy .vercel/output/static --project-name kadaipos-id --branch main

echo "✅ Deployment Complete!"
echo "🔗 Your site should be live at: https://kadaipos-id.pages.dev"
echo "👉 Don't forget to update your DNS in Cloudflare to point to this Pages project."
