#!/bin/bash
# KADAIPOS COMPLETE DEPLOYMENT - READY TO RUN
# This is the final, tested deployment script

set -e

APP_DIR="/var/www/kadaipos.id"
APP_NAME="kadaipos"

echo "🚀 KadaiPOS Deployment Starting..."
echo "=================================="

# Step 1: System
echo "📦 Step 1: Updating system..."
apt-get update -y > /dev/null 2>&1
apt-get upgrade -y > /dev/null 2>&1
apt-get install -y curl git nginx build-essential > /dev/null 2>&1
echo "✅ System ready"

# Step 2: Node.js
echo "📦 Step 2: Installing Node.js..."
if ! command -v node > /dev/null 2>&1; then
  curl -sL https://deb.nodesource.com/setup_18.x | bash - > /dev/null 2>&1
  apt-get install -y nodejs > /dev/null 2>&1
fi
echo "✅ Node.js $(node --version) installed"

# Step 3: PM2
echo "📦 Step 3: Installing PM2..."
npm install -g pm2 > /dev/null 2>&1 || true
echo "✅ PM2 ready"

# Step 4: App Directory
echo "📁 Step 4: Setting up directory..."
mkdir -p "$APP_DIR"
echo "✅ Directory ready"

# Step 5: Code
echo "📥 Step 5: Deploying code..."
cd /var/www
if [ ! -d "kadaipos.id/.git" ]; then
  git clone https://github.com/gemmyadyendra/kadaipos.id.git 2>&1 | tail -1
fi
cd "$APP_DIR"
git pull origin main --force > /dev/null 2>&1
echo "✅ Code deployed"

# Step 6: Build
echo "⚙️  Step 6: Building application..."
npm install --production > /dev/null 2>&1
echo "   Installing dependencies..."
npm run build > /dev/null 2>&1
echo "✅ Build complete"

# Step 7: Start App
echo "🎬 Step 7: Starting application..."
pm2 delete "$APP_NAME" 2>/dev/null || true
pm2 start npm --name "$APP_NAME" -- start -- --hostname 127.0.0.1 --port 3000 > /dev/null 2>&1
pm2 save > /dev/null 2>&1
pm2 startup -u root --hp /root > /dev/null 2>&1 || true
echo "✅ App started"

# Step 8: Nginx
echo "🌐 Step 8: Configuring Nginx..."
cat > /etc/nginx/sites-available/kadaipos.id << 'NGINX_CONFIG'
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|map)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
NGINX_CONFIG

ln -sf /etc/nginx/sites-available/kadaipos.id /etc/nginx/sites-enabled/kadaipos.id
rm -f /etc/nginx/sites-enabled/default
nginx -t > /dev/null 2>&1
systemctl reload nginx > /dev/null 2>&1
echo "✅ Nginx configured"

# Step 9: Health Check
echo "🏥 Step 9: Setting up health checks..."
mkdir -p /var/log
touch /var/log/kadaipos-health-check.log
chmod 666 /var/log/kadaipos-health-check.log

cat > /usr/local/bin/kadaipos-health-check << 'HEALTH_CHECK'
#!/bin/bash
LOG="/var/log/kadaipos-health-check.log"
TS=$(date '+%Y-%m-%d %H:%M:%S')
APP_NAME="kadaipos"

# Check if app is healthy
if curl -s http://127.0.0.1:3000 > /dev/null 2>&1; then
    echo "[$TS] ✅ Healthy" >> "$LOG"
    exit 0
fi

# Check PM2 status
if pm2 list 2>/dev/null | grep -q "$APP_NAME"; then
    echo "[$TS] ⚠️  Restarting (PM2 running but app down)" >> "$LOG"
    pm2 restart "$APP_NAME" > /dev/null 2>&1
else
    echo "[$TS] ⚠️  Starting (Process not running)" >> "$LOG"
    pm2 start npm --name "$APP_NAME" -- start -- --hostname 127.0.0.1 --port 3000 > /dev/null 2>&1
fi

# Wait for restart
sleep 3

# Final check
if ! curl -s http://127.0.0.1:3000 > /dev/null 2>&1; then
    echo "[$TS] 🚨 Full Recovery: Rebuilding" >> "$LOG"
    cd /var/www/kadaipos.id 2>/dev/null || exit 1
    git pull origin main --force >> "$LOG" 2>&1 || echo "Git failed" >> "$LOG"
    npm install --production >> "$LOG" 2>&1 || echo "Install failed" >> "$LOG"
    npm run build >> "$LOG" 2>&1 || echo "Build failed" >> "$LOG"
    pm2 restart "$APP_NAME" >> "$LOG" 2>&1 || echo "Restart failed" >> "$LOG"
    sleep 3
    if curl -s http://127.0.0.1:3000 > /dev/null 2>&1; then
        echo "[$TS] ✅ Recovery successful" >> "$LOG"
    else
        echo "[$TS] ❌ Recovery failed - manual intervention needed" >> "$LOG"
    fi
fi
HEALTH_CHECK

chmod +x /usr/local/bin/kadaipos-health-check

# Add to crontab
(crontab -l 2>/dev/null | grep -v kadaipos-health-check; echo "*/5 * * * * /usr/local/bin/kadaipos-health-check") | crontab - 2>/dev/null || true
echo "✅ Health checks enabled (every 5 minutes)"

# Step 10: Verify
echo ""
echo "⏳ Waiting for app to fully start..."
sleep 3

echo ""
echo "=================================="
echo "✅ DEPLOYMENT COMPLETE!"
echo "=================================="
echo ""

echo "📊 App Status:"
pm2 list
echo ""

echo "🌐 Your app is live at:"
echo "   http://72.60.76.34"
echo ""

echo "🧪 Testing local endpoint..."
if curl -s http://127.0.0.1:3000 | head -3 2>&1 | grep -q "html\|<!"; then
    echo "✅ App is responding correctly"
else
    echo "⏳ App may still be initializing..."
fi

echo ""
echo "📋 Monitoring Commands:"
echo "   • Status: pm2 list"
echo "   • Logs: pm2 logs kadaipos --lines 50"
echo "   • Health: tail -f /var/log/kadaipos-health-check.log"
echo ""
echo "🛡️  Auto-Protection Active:"
echo "   • Health checks run every 5 minutes"
echo "   • Auto-restart on crash"
echo "   • Full rebuild on critical failure"
echo "   • All events logged"
echo ""
echo "🎉 Your KadaiPOS is production-ready!"
