#!/bin/bash

# Update app.kadai.id deployment with latest changes

set -e

echo "🔄 Updating app.kadai.id deployment..."
echo ""

# Check for uncommitted changes
if [[ -n $(git status -s) ]]; then
    echo "📝 Committing latest changes..."
    git add .
    git commit -m "Update: $(date '+%Y-%m-%d %H:%M')" || echo "Nothing to commit"
    git push origin main || echo "Already up to date"
fi

# Trigger Vercel deployment
echo ""
echo "🚀 Deploying to Vercel..."
npx vercel --prod

echo ""
echo "✅ Deployment complete!"
echo "🔗 Visit: https://app.kadai.id"
