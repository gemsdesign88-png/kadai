#!/bin/bash

# OVH VPS Automated Deployment
VPS_IP="51.79.160.148"
VPS_USER="ubuntu"
NEW_PASSWORD="kadaiPOS12345@@@"
PACKAGE="kadaipos-prod.tar.gz"

echo "╔════════════════════════════════════════════╗"
echo "║   KadaiPOS Deployment to OVH VPS          ║"
echo "║   IP: $VPS_IP                 ║"
echo "╚════════════════════════════════════════════╝"
echo ""

# Verify package
if [ ! -f "$PACKAGE" ]; then
    echo "❌ Package not found: $PACKAGE"
    exit 1
fi

echo "✅ Package verified ($(ls -lh $PACKAGE | awk '{print $5}'))"
echo ""

# Set password env
export SSHPASS="$NEW_PASSWORD"

# Test connection
echo "Testing SSH connection..."
if ! sshpass -e ssh -o ConnectTimeout=5 -o StrictHostKeyChecking=no $VPS_USER@$VPS_IP "echo OK" > /dev/null 2>&1; then
    echo "❌ Cannot connect to VPS"
    echo "   Please verify password is correct"
    exit 1
fi
echo "✅ SSH Connection successful!"
echo ""

# Upload package
echo "📤 Uploading package (29MB)..."
sshpass -e scp -o StrictHostKeyChecking=no "$PACKAGE" $VPS_USER@$VPS_IP:/home/ubuntu/ || { echo "❌ Upload failed"; exit 1; }
echo "✅ Package uploaded"
echo ""

# Deploy
echo "🔧 Deploying application..."
sshpass -e ssh -o StrictHostKeyChecking=no $VPS_USER@$VPS_IP << 'DEPLOY'
set -e

cd /home/ubuntu
echo "Extracting package..."
tar -xzf kadaipos-prod.tar.gz

echo "Updating system..."
sudo apt-get update -y > /dev/null 2>&1

echo "Installing Node.js..."
sudo apt-get install -y nodejs npm > /dev/null 2>&1

echo "Installing PM2..."
sudo npm install -g pm2 > /dev/null 2>&1

echo "Installing dependencies..."
npm install --production > /dev/null 2>&1

echo "Starting application..."
pm2 start "npm start" --name "kadaipos" --max-memory-restart 500M
pm2 save > /dev/null 2>&1
sudo pm2 startup > /dev/null 2>&1

echo ""
echo "✅ Deployment Complete!"
pm2 status

DEPLOY

echo ""
echo "╔════════════════════════════════════════════╗"
echo "║   🎉 DEPLOYMENT SUCCESSFUL!               ║"
echo "╚════════════════════════════════════════════╝"
echo ""
echo "Application running at:"
echo "  http://51.79.160.148:3000"
echo ""
echo "Next steps:"
echo "  1. Update DNS to: 51.79.160.148"
echo "  2. Wait 24-48 hours for DNS propagation"
echo "  3. Access via kadaipos.id"
echo ""
echo "SSH Access:"
echo "  ssh ubuntu@51.79.160.148"
echo ""
