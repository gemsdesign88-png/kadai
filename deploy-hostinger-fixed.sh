#!/bin/bash
# Deploy KadaiPOS to Hostinger with Memory Safeguards

set -e

echo "🚀 KadaiPOS Deployment to Hostinger"
echo "===================================="
echo ""

APP_DIR="/var/www/kadaipos.id"
BACKUP_DIR="/var/www/backups"

# Create directories
mkdir -p $APP_DIR $BACKUP_DIR

# Clean old .next builds to save space
echo "🧹 Cleaning old builds..."
rm -rf $APP_DIR/.next 2>/dev/null || true
rm -rf $APP_DIR/.turbo 2>/dev/null || true

# Install dependencies (production only)
echo "📦 Installing dependencies..."
cd $APP_DIR
npm install --omit=dev 2>&1 | tail -5

# Build app
echo "🔨 Building Next.js..."
npm run build

# Setup PM2
echo "⚙️  Configuring PM2..."
npm install -g pm2

# Copy ecosystem config
cp /root/kadaipos/ecosystem.config.js $APP_DIR/

# Stop old app
pm2 stop kadaipos 2>/dev/null || true
pm2 delete kadaipos 2>/dev/null || true

# Start with PM2
echo "🚀 Starting app..."
pm2 start ecosystem.config.js
pm2 save

# Setup memory monitor
echo "📊 Setting up memory monitor..."
mkdir -p /usr/local/bin
cp /root/kadaipos/scripts/memory-monitor.sh /usr/local/bin/
chmod +x /usr/local/bin/memory-monitor.sh

# Add to crontab to run monitor in background
(crontab -l 2>/dev/null | grep -v memory-monitor; echo "@reboot /usr/local/bin/memory-monitor.sh >> /var/log/kadaipos-memory.log 2>&1") | crontab -

# Start monitor now
nohup /usr/local/bin/memory-monitor.sh >> /var/log/kadaipos-memory.log 2>&1 &

sleep 3

echo ""
echo "✅ Deployment Complete!"
echo ""
echo "📊 App Status:"
pm2 list

echo ""
echo "🌐 Access your app:"
echo "   • http://YOUR_IP:3000"
echo "   • http://kadaipos.id"
echo ""
echo "📋 Monitor:"
echo "   • pm2 list"
echo "   • pm2 logs kadaipos"
echo "   • tail -f /var/log/kadaipos-memory.log"
