#!/bin/bash
# COMPLETE VPS DEPLOYMENT SCRIPT
# Copy and paste these commands one by one into your SSH terminal
# or run: ssh root@72.60.76.34 < VPS_DEPLOY_NOW.sh

VPS_IP="72.60.76.34"
APP_DIR="/var/www/kadaipos.id"
APP_NAME="kadaipos"

echo "🚀 KadaiPOS Complete VPS Deployment"
echo "===================================="
echo "Target: $VPS_IP"
echo "App Dir: $APP_DIR"
echo ""

# ============================================================
# STEP 1: Update system and install dependencies
# ============================================================
echo "📦 Step 1: Updating system packages..."
apt-get update -y
apt-get upgrade -y
apt-get install -y curl wget git build-essential nginx

# ============================================================
# STEP 2: Install Node.js 18+ (if not installed)
# ============================================================
echo "📦 Step 2: Installing Node.js..."
if ! command -v node &> /dev/null; then
    curl -sL https://deb.nodesource.com/setup_18.x | bash -
    apt-get install -y nodejs
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ NPM version: $(npm --version)"

# ============================================================
# STEP 3: Install PM2 globally
# ============================================================
echo "📦 Step 3: Installing PM2..."
npm install -g pm2
pm2 start npm -- start --name "$APP_NAME" --cwd /var/www 2>/dev/null || echo "Skip if already running"

# ============================================================
# STEP 4: Create app directory
# ============================================================
echo "📁 Step 4: Creating app directory..."
mkdir -p "$APP_DIR"
cd "$APP_DIR"

# ============================================================
# STEP 5: Clone or pull code
# ============================================================
echo "📥 Step 5: Deploying code..."
if [ -d "$APP_DIR/.git" ]; then
    echo "Repository exists, pulling latest code..."
    cd "$APP_DIR"
    git pull origin main --force
else
    echo "Cloning repository..."
    cd /var/www
    git clone https://github.com/yourusername/kadaipos.id.git
    cd "$APP_DIR"
fi

# ============================================================
# STEP 6: Install dependencies and build
# ============================================================
echo "⚙️  Step 6: Installing dependencies..."
npm install --production

echo "🔨 Building application..."
npm run build

# ============================================================
# STEP 7: Start/Restart app with PM2
# ============================================================
echo "🎬 Step 7: Starting app with PM2..."
pm2 stop "$APP_NAME" 2>/dev/null || true
pm2 delete "$APP_NAME" 2>/dev/null || true
pm2 start npm --name "$APP_NAME" -- start -- --hostname 127.0.0.1 --port 3000
pm2 save
pm2 startup

# ============================================================
# STEP 8: Configure Nginx as reverse proxy
# ============================================================
echo "🌐 Step 8: Configuring Nginx..."
cat > /etc/nginx/sites-available/kadaipos.id << 'NGINX_CONF'
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    # Redirect HTTP to HTTPS (optional, if using SSL)
    # return 301 https://$server_name$request_uri;

    # Forward to Node.js app
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
    }

    # Static files caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
NGINX_CONF

# Enable site
ln -sf /etc/nginx/sites-available/kadaipos.id /etc/nginx/sites-enabled/kadaipos.id
rm -f /etc/nginx/sites-enabled/default

# Test and reload Nginx
nginx -t && systemctl reload nginx

# ============================================================
# STEP 9: Setup health check monitoring
# ============================================================
echo "🏥 Step 9: Setting up health checks..."
cp "$APP_DIR/health-check.sh" /usr/local/bin/kadaipos-health-check
chmod +x /usr/local/bin/kadaipos-health-check

# Add cron job for health checks every 5 minutes
(crontab -l 2>/dev/null | grep -v kadaipos-health-check; echo "*/5 * * * * /usr/local/bin/kadaipos-health-check >> /var/log/kadaipos-health-check.log 2>&1") | crontab -

# ============================================================
# STEP 10: Verify deployment
# ============================================================
echo "✅ Step 10: Verifying deployment..."
sleep 2

echo ""
echo "📊 App Status:"
pm2 list

echo ""
echo "🌐 Testing local access:"
curl -s http://127.0.0.1:3000 | head -20 || echo "App not responding yet, wait 10 seconds..."
sleep 10
curl -s http://127.0.0.1:3000 | head -20

echo ""
echo "🎉 Deployment Complete!"
echo ""
echo "Your app should now be accessible at:"
echo "  • Local: http://127.0.0.1:3000"
echo "  • Public: http://72.60.76.34"
echo ""
echo "Monitor the app:"
echo "  • Logs: pm2 logs $APP_NAME"
echo "  • Status: pm2 list"
echo "  • Health: tail -f /var/log/kadaipos-health-check.log"
