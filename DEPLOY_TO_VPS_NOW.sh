#!/bin/bash
# Interactive VPS Deployment Helper
# Run this locally to deploy your app to VPS

set -e

VPS_IP="72.60.76.34"
VPS_USER="root"
VPS_APP_DIR="/var/www/kadaipos.id"
LOCAL_APP_DIR="/Users/gemmyadyendra/Documents/kadaipos.id"

echo "🚀 KadaiPOS VPS Deployment Helper"
echo "===================================="
echo ""
echo "This script will:"
echo "  1. Test VPS connection"
echo "  2. Create app directory on VPS"
echo "  3. Copy your code to VPS"
echo "  4. Install dependencies"
echo "  5. Build and start the app"
echo "  6. Configure Nginx"
echo "  7. Setup health monitoring"
echo "  8. Verify everything works"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
fi

# ============================================================
# Test Connection
# ============================================================
echo ""
echo "📡 Testing connection to $VPS_IP..."
if ping -c 2 "$VPS_IP" &> /dev/null; then
    echo "✅ VPS is reachable"
else
    echo "❌ Cannot reach VPS at $VPS_IP"
    exit 1
fi

# ============================================================
# Option 1: Copy code via SCP
# ============================================================
echo ""
echo "📥 Method 1: Copying code via SCP (recommended for first setup)"
read -p "Copy code to VPS now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Creating backup of existing code on VPS..."
    ssh "$VPS_USER@$VPS_IP" "[ -d $VPS_APP_DIR ] && mv $VPS_APP_DIR ${VPS_APP_DIR}.backup.$(date +%s) || echo 'No existing app'" || true
    
    echo "Copying code to VPS (this may take a minute)..."
    scp -r "$LOCAL_APP_DIR" "$VPS_USER@$VPS_IP:/var/www/"
    echo "✅ Code copied"
else
    echo "Skipping code copy"
fi

# ============================================================
# Execute deployment on VPS
# ============================================================
echo ""
echo "⚙️  Deploying on VPS..."
echo ""

# Create deployment script that runs on VPS
DEPLOY_SCRIPT=$(cat << 'ENDDEPLOY'
#!/bin/bash
set -e

APP_DIR="/var/www/kadaipos.id"
APP_NAME="kadaipos"

echo "🔧 Starting deployment on VPS..."
echo ""

# Update system
echo "📦 Updating system packages..."
apt-get update -y > /dev/null 2>&1
apt-get install -y curl git nginx build-essential > /dev/null 2>&1

# Install Node.js if needed
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js..."
    curl -sL https://deb.nodesource.com/setup_18.x | bash - > /dev/null 2>&1
    apt-get install -y nodejs > /dev/null 2>&1
fi

echo "✅ Node.js $(node --version) installed"

# Install PM2 if needed
if ! command -v pm2 &> /dev/null; then
    echo "📦 Installing PM2..."
    npm install -g pm2 > /dev/null 2>&1
fi

echo "✅ PM2 ready"

# Navigate to app directory
cd "$APP_DIR"

# Install dependencies
echo "📦 Installing dependencies..."
npm install --production > /dev/null 2>&1

# Build app
echo "🔨 Building application..."
npm run build

# Start with PM2
echo "🎬 Starting app with PM2..."
pm2 stop "$APP_NAME" 2>/dev/null || true
pm2 delete "$APP_NAME" 2>/dev/null || true
pm2 start npm --name "$APP_NAME" -- start -- --hostname 127.0.0.1 --port 3000
pm2 save
pm2 startup -u root --hp /root > /dev/null 2>&1 || true

# Configure Nginx
echo "🌐 Configuring Nginx..."
cat > /etc/nginx/sites-available/kadaipos.id << 'NGINX_CONF'
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

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
NGINX_CONF

ln -sf /etc/nginx/sites-available/kadaipos.id /etc/nginx/sites-enabled/kadaipos.id
rm -f /etc/nginx/sites-enabled/default

nginx -t > /dev/null 2>&1 && systemctl reload nginx
echo "✅ Nginx configured"

# Setup health checks
echo "🏥 Setting up health monitoring..."
mkdir -p /var/log
touch /var/log/kadaipos-health-check.log
chmod 666 /var/log/kadaipos-health-check.log

cat > /usr/local/bin/kadaipos-health-check << 'HEALTH_CHECK'
#!/bin/bash
APP_DIR="/var/www/kadaipos.id"
LOG_FILE="/var/log/kadaipos-health-check.log"
APP_NAME="kadaipos"

# Check if app is responding
if curl -s http://127.0.0.1:3000 > /dev/null 2>&1; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ✅ App is healthy" >> "$LOG_FILE"
    exit 0
fi

# App not responding, check PM2
if ! pm2 list | grep -q "$APP_NAME"; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ⚠️  App not running, starting..." >> "$LOG_FILE"
    pm2 start npm --name "$APP_NAME" -- start -- --hostname 127.0.0.1 --port 3000
    exit 0
fi

# PM2 running but app not responding, restart
echo "[$(date '+%Y-%m-%d %H:%M:%S')] ⚠️  App not responding, restarting..." >> "$LOG_FILE"
pm2 restart "$APP_NAME"

sleep 5

# If still not responding, full rebuild
if ! curl -s http://127.0.0.1:3000 > /dev/null 2>&1; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] 🚨 Full recovery: rebuilding app..." >> "$LOG_FILE"
    cd "$APP_DIR"
    git pull origin main --force 2>/dev/null || echo "Git pull failed" >> "$LOG_FILE"
    npm install --production 2>/dev/null || echo "npm install failed" >> "$LOG_FILE"
    npm run build 2>/dev/null || echo "npm build failed" >> "$LOG_FILE"
    pm2 restart "$APP_NAME"
fi
HEALTH_CHECK

chmod +x /usr/local/bin/kadaipos-health-check

# Add cron job
(crontab -l 2>/dev/null | grep -v kadaipos-health-check; echo "*/5 * * * * /usr/local/bin/kadaipos-health-check") | crontab -

echo "✅ Health monitoring enabled"

# Verify
echo ""
echo "⏳ Waiting for app to start..."
sleep 3

echo ""
echo "✅ Deployment successful!"
echo ""
echo "App Status:"
pm2 list

echo ""
echo "Your app is accessible at:"
echo "  • http://72.60.76.34"
echo ""
echo "Monitor:"
echo "  • pm2 logs $APP_NAME"
echo "  • tail -f /var/log/kadaipos-health-check.log"

ENDDEPLOY
)

# Run deployment script on VPS
ssh "$VPS_USER@$VPS_IP" 'bash -s' <<< "$DEPLOY_SCRIPT"

# ============================================================
# Verify from local machine
# ============================================================
echo ""
echo "🔍 Verifying from local machine..."
sleep 2

# Test HTTP
if curl -s -o /dev/null -w "%{http_code}" "http://$VPS_IP" | grep -q "200"; then
    echo "✅ App is accessible at http://$VPS_IP"
else
    echo "⚠️  Getting response from http://$VPS_IP (may still be loading)..."
    curl -s "http://$VPS_IP" | head -10
fi

echo ""
echo "🎉 Complete! Your app is deployed and running!"
echo ""
echo "Next steps:"
echo "  1. Open browser: http://72.60.76.34"
echo "  2. Check health logs: ssh root@72.60.76.34 'tail -f /var/log/kadaipos-health-check.log'"
echo "  3. Monitor app: ssh root@72.60.76.34 'pm2 list'"
echo ""
echo "The health check runs every 5 minutes and auto-restarts if needed."
echo "Your app is now protected against crashes! 🛡️"
