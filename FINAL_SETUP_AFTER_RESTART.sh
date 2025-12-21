#!/bin/bash

# KadaiPOS VPS Setup - Final Configuration After Restart
# Run this after the VPS comes back online

VPS_IP="103.175.207.51"
VPS_USER="root"
PASSWORD="kadaiPOS12345@@@"

echo "======================================"
echo "KadaiPOS Final Setup After Restart"
echo "======================================"
echo ""
echo "Waiting for VPS to be fully online..."
echo ""

export SSHPASS="$PASSWORD"

# Function to check connection
check_connection() {
    sshpass -e ssh -o ConnectTimeout=3 -o StrictHostKeyChecking=no $VPS_USER@$VPS_IP "echo 'OK'" 2>/dev/null
}

# Wait for connection
count=0
while ! check_connection; do
    count=$((count+1))
    if [ $count -gt 40 ]; then
        echo "❌ VPS failed to come online after 2 minutes"
        exit 1
    fi
    echo "Attempt $count/40..."
    sleep 3
done

echo "✅ VPS is online!"
echo ""
echo "Running final setup..."

sshpass -e ssh -o ConnectTimeout=10 -o StrictHostKeyChecking=no $VPS_USER@$VPS_IP << 'REMOTE_SETUP'
cd /home/kadaipos

echo "Installing Node.js and npm..."
apt update -y && apt install -y nodejs npm >/dev/null 2>&1

echo "Installing PM2..."
npm install -g pm2 >/dev/null 2>&1

echo "Installing application dependencies..."
npm install --production >/dev/null 2>&1

echo "Starting application..."
pm2 start "npm start" --name "kadaipos" --wait-ready
pm2 save
pm2 startup

echo ""
echo "✅ Setup complete!"
pm2 status

REMOTE_SETUP

echo ""
echo "======================================"
echo "Testing application..."
echo "======================================"
sleep 3

sshpass -e ssh -o ConnectTimeout=10 -o StrictHostKeyChecking=no $VPS_USER@$VPS_IP << 'VERIFY'
echo "Checking PM2 status..."
pm2 status
echo ""
echo "Checking if app is listening on port 3000..."
lsof -i :3000 || ss -tuln | grep 3000 || echo "Waiting for app to start..."
VERIFY

echo ""
echo "Testing HTTP connection..."
sleep 5
for i in {1..10}; do
    echo "Attempt $i..."
    if curl -s -m 3 http://$VPS_IP:3000/ > /dev/null 2>&1; then
        echo "✅ Application is responding on port 3000!"
        break
    fi
    sleep 2
done

echo ""
echo "======================================"
echo "✅ DEPLOYMENT COMPLETE!"
echo "======================================"
echo ""
echo "Next steps:"
echo "1. Visit http://$VPS_IP:3000 to verify the app"
echo "2. Update DNS records at your registrar:"
echo "   - kadaipos.id → $VPS_IP"
echo "   - www.kadaipos.id → $VPS_IP"
echo "3. Wait 24-48 hours for DNS propagation"
echo "4. Configure HTTPS with Let's Encrypt (optional)"
echo ""
echo "SSH Access: ssh root@$VPS_IP"
echo "Password: $PASSWORD"
echo ""
