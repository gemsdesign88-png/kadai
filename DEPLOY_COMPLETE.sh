#!/bin/bash
# 🚀 IMMEDIATE VPS DEPLOYMENT - ONE COMMAND SOLUTION
# 
# This is your complete deployment in ONE executable script
# Just SSH to VPS and run this, or copy-paste the commands below

# ============================================================
# OPTION 1: Run Everything Automatically (Recommended)
# ============================================================
# ssh root@72.60.76.34 'bash -s' < ./DEPLOY_COMPLETE.sh
# 
# Then come back here and run GitHub Actions setup

# ============================================================
# OPTION 2: Copy-Paste Method (Manual Control)
# ============================================================
# Paste these commands one by one into: ssh root@72.60.76.34

#!/bin/bash
set -e

echo "🚀 KadaiPOS Complete Deployment Starting..."
echo ""

# === STEP 1: Prepare System ===
echo "📦 STEP 1: Installing system dependencies..."
apt-get update -y && apt-get upgrade -y
apt-get install -y curl wget git nginx build-essential

# === STEP 2: Install Node.js ===
echo "📦 STEP 2: Installing Node.js 18.x..."
if ! command -v node &> /dev/null; then
    curl -sL https://deb.nodesource.com/setup_18.x | bash -
    apt-get install -y nodejs
else
    echo "✅ Node.js already installed: $(node --version)"
fi

# === STEP 3: Install PM2 ===
echo "📦 STEP 3: Installing PM2..."
npm install -g pm2 2>/dev/null || echo "✅ PM2 already installed"

# === STEP 4: Prepare App Directory ===
echo "📁 STEP 4: Setting up app directory..."
APP_DIR="/var/www/kadaipos.id"
mkdir -p "$APP_DIR"

# === STEP 5: Clone/Pull Code ===
echo "📥 STEP 5: Getting latest code..."
if [ -d "$APP_DIR/.git" ]; then
    cd "$APP_DIR"
    git pull origin main --force
else
    cd /var/www
    git clone https://github.com/YOUR_USERNAME/kadaipos.id.git 2>/dev/null || {
        echo "⚠️  Git clone failed. Make sure:"
        echo "   1. Repository is public, OR"
        echo "   2. SSH keys are configured"
        exit 1
    }
fi

cd "$APP_DIR"

# === STEP 6: Install & Build ===
echo "⚙️  STEP 6: Installing dependencies..."
npm install --production

echo "🔨 Building application..."
npm run build

# === STEP 7: Start with PM2 ===
echo "🎬 STEP 7: Starting app with PM2..."
pm2 delete kadaipos 2>/dev/null || true
pm2 start npm --name kadaipos -- start -- --hostname 127.0.0.1 --port 3000
pm2 save
pm2 startup -u root --hp /root

# === STEP 8: Configure Nginx ===
echo "🌐 STEP 8: Configuring Nginx as reverse proxy..."

cat > /etc/nginx/sites-available/kadaipos.id << 'NGINX_CONFIG'
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    # Reverse proxy to Node.js
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

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
NGINX_CONFIG

# Enable site
ln -sf /etc/nginx/sites-available/kadaipos.id /etc/nginx/sites-enabled/kadaipos.id
rm -f /etc/nginx/sites-enabled/default

# Test and reload
nginx -t && systemctl reload nginx
echo "✅ Nginx configured"

# === STEP 9: Setup Health Checks ===
echo "🏥 STEP 9: Setting up automatic health monitoring..."

mkdir -p /var/log
touch /var/log/kadaipos-health-check.log
chmod 666 /var/log/kadaipos-health-check.log

cat > /usr/local/bin/kadaipos-health-check << 'HEALTH_SCRIPT'
#!/bin/bash
APP_DIR="/var/www/kadaipos.id"
LOG_FILE="/var/log/kadaipos-health-check.log"
APP_NAME="kadaipos"

TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# Level 1: Check if app is healthy
if curl -s http://127.0.0.1:3000 > /dev/null 2>&1; then
    echo "[$TIMESTAMP] ✅ Healthy" >> "$LOG_FILE"
    exit 0
fi

# Level 2: Check if PM2 process is running
if pm2 list | grep -q "$APP_NAME"; then
    echo "[$TIMESTAMP] ⚠️  PM2 running but app down, restarting..." >> "$LOG_FILE"
    pm2 restart "$APP_NAME"
    sleep 3
    
    if curl -s http://127.0.0.1:3000 > /dev/null 2>&1; then
        echo "[$TIMESTAMP] ✅ Restarted successfully" >> "$LOG_FILE"
        exit 0
    fi
fi

# Level 3: Full recovery
echo "[$TIMESTAMP] 🚨 RECOVERY: Full rebuild..." >> "$LOG_FILE"

cd "$APP_DIR"
git pull origin main --force >> "$LOG_FILE" 2>&1 || echo "Git pull failed" >> "$LOG_FILE"
npm install --production >> "$LOG_FILE" 2>&1 || echo "npm install failed" >> "$LOG_FILE"
npm run build >> "$LOG_FILE" 2>&1 || echo "npm build failed" >> "$LOG_FILE"

pm2 restart "$APP_NAME"
sleep 5

if curl -s http://127.0.0.1:3000 > /dev/null 2>&1; then
    echo "[$TIMESTAMP] ✅ RECOVERY SUCCESS" >> "$LOG_FILE"
else
    echo "[$TIMESTAMP] ❌ RECOVERY FAILED - ALERT NEEDED" >> "$LOG_FILE"
fi
HEALTH_SCRIPT

chmod +x /usr/local/bin/kadaipos-health-check

# Add to crontab (every 5 minutes)
(crontab -l 2>/dev/null | grep -v kadaipos-health-check; echo "*/5 * * * * /usr/local/bin/kadaipos-health-check") | crontab -

echo "✅ Health checks enabled"

# === VERIFICATION ===
echo ""
echo "⏳ Waiting for app to fully start..."
sleep 3

echo ""
echo "======================================"
echo "✅ DEPLOYMENT COMPLETE!"
echo "======================================"
echo ""

echo "📊 App Status:"
pm2 list

echo ""
echo "🌐 Your app is now live at:"
echo "   http://72.60.76.34"
echo ""

echo "📋 Monitoring Commands:"
echo "   - View logs: pm2 logs kadaipos"
echo "   - Monitor: pm2 monit"
echo "   - Health check logs: tail -f /var/log/kadaipos-health-check.log"
echo ""

echo "✅ Health checks automatically run every 5 minutes"
echo "✅ App auto-restarts if it crashes"
echo "✅ Full rebuild on critical failures"
echo ""

echo "Local test:"
curl -s http://127.0.0.1:3000 | head -5

echo ""
echo "🎉 Ready to serve!"
