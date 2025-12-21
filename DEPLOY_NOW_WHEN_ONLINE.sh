#!/bin/bash

# KadaiPOS Quick Deploy Script - READY TO GO
# Once VPS network is fixed, this deploys everything in ~5 minutes

VPS_IP="103.175.207.51"
VPS_USER="root"
PASSWORD="kadaiPOS12345@@@"
PACKAGE="kadaipos-prod.tar.gz"

echo "╔════════════════════════════════════════════╗"
echo "║   KadaiPOS Automated Deployment Script     ║"
echo "║   Ready to deploy once VPS is online       ║"
echo "╚════════════════════════════════════════════╝"
echo ""

# Verify package exists
if [ ! -f "$PACKAGE" ]; then
    echo "❌ ERROR: $PACKAGE not found!"
    exit 1
fi

echo "✅ Package verified: $(ls -lh $PACKAGE | awk '{print $5}')"
echo ""

# Check VPS connectivity
echo "Checking VPS connectivity..."
export SSHPASS="$PASSWORD"

# Try to connect
if ! sshpass -e ssh -o ConnectTimeout=5 -o StrictHostKeyChecking=no $VPS_USER@$VPS_IP "echo 'OK'" > /dev/null 2>&1; then
    echo "❌ Cannot reach VPS at $VPS_IP"
    echo "   Make sure Hostingan has restored network connectivity"
    exit 1
fi

echo "✅ VPS is online!"
echo ""

# Upload package
echo "📤 Uploading package to VPS..."
sshpass -e scp -o StrictHostKeyChecking=no -o ConnectTimeout=5 "$PACKAGE" $VPS_USER@$VPS_IP:/home/kadaipos/ || { echo "❌ Upload failed"; exit 1; }
echo "✅ Package uploaded"
echo ""

# Extract and install
echo "🔧 Installing application..."
sshpass -e ssh -o StrictHostKeyChecking=no $VPS_USER@$VPS_IP << 'REMOTE'
cd /home/kadaipos
echo "Extracting files..."
tar -xzf kadaipos-prod.tar.gz

echo "Installing dependencies..."
apt-get update -y > /dev/null 2>&1
apt-get install -y nodejs npm > /dev/null 2>&1
npm install -g pm2 > /dev/null 2>&1

echo "Installing app dependencies..."
npm install --production > /dev/null 2>&1

echo "Starting application..."
pm2 start "npm start" --name "kadaipos" --max-memory-restart 500M
pm2 save
pm2 startup

echo "✅ Installation complete!"
pm2 status
REMOTE

echo ""
echo "╔════════════════════════════════════════════╗"
echo "║  🎉 DEPLOYMENT SUCCESSFUL!                ║"
echo "╚════════════════════════════════════════════╝"
echo ""
echo "Application is now running at:"
echo "  http://$VPS_IP:3000"
echo ""
echo "Next:"
echo "  1. Update DNS records to point to $VPS_IP"
echo "  2. Wait 24-48 hours for DNS propagation"
echo "  3. Access via kadaipos.id"
echo ""
echo "SSH Access:"
echo "  ssh root@$VPS_IP"
echo ""
