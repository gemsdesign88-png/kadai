#!/bin/bash
# 🚀 COPY & PASTE THIS ENTIRE SCRIPT INTO YOUR SSH TERMINAL
# ssh root@72.60.76.34
# Then paste everything below and hit Enter

set -e

echo "🚀 Deploying KadaiPOS to VPS..."

# Update system
apt-get update -y && apt-get upgrade -y && apt-get install -y curl git nginx build-essential

# Install Node.js
if ! command -v node &> /dev/null; then
    curl -sL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs
fi

# Install PM2
npm install -g pm2 2>/dev/null || true

# Setup app directory
APP_DIR="/var/www/kadaipos.id"
mkdir -p "$APP_DIR"
cd "$APP_DIR"

# Deploy code
if [ -d "$APP_DIR/.git" ]; then
    cd "$APP_DIR" && git pull origin main --force
else
    cd /var/www
    git clone https://github.com/YOUR_GITHUB_USERNAME/kadaipos.id.git 2>/dev/null || {
        echo "❌ Need: Public GitHub repo or SSH keys configured"
        exit 1
    }
fi

cd "$APP_DIR"

# Build
npm install --production
npm run build

# Start with PM2
pm2 delete kadaipos 2>/dev/null || true
pm2 start npm --name kadaipos -- start -- --hostname 127.0.0.1 --port 3000
pm2 save
pm2 startup -u root --hp /root

# Configure Nginx
cat > /etc/nginx/sites-available/kadaipos.id << 'NGINX'
server {
    listen 80 default_server;
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
    }
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
NGINX

ln -sf /etc/nginx/sites-available/kadaipos.id /etc/nginx/sites-enabled/kadaipos.id
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

# Setup health checks
mkdir -p /var/log
cat > /usr/local/bin/kadaipos-health-check << 'HEALTH'
#!/bin/bash
if curl -s http://127.0.0.1:3000 > /dev/null 2>&1; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ✅ Healthy" >> /var/log/kadaipos-health-check.log
    exit 0
fi
pm2 list | grep -q kadaipos && pm2 restart kadaipos || pm2 start npm --name kadaipos -- start -- --hostname 127.0.0.1 --port 3000
sleep 3
if ! curl -s http://127.0.0.1:3000 > /dev/null 2>&1; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] 🚨 RECOVERY: Full rebuild" >> /var/log/kadaipos-health-check.log
    cd /var/www/kadaipos.id && git pull origin main --force && npm install --production && npm run build && pm2 restart kadaipos
fi
HEALTH

chmod +x /usr/local/bin/kadaipos-health-check
(crontab -l 2>/dev/null | grep -v kadaipos-health-check; echo "*/5 * * * * /usr/local/bin/kadaipos-health-check >> /var/log/kadaipos-health-check.log 2>&1") | crontab -

# Verify
sleep 3
echo ""
echo "✅ Deployment Complete!"
echo ""
pm2 list
echo ""
curl -s http://127.0.0.1:3000 | head -5
echo ""
echo "🌐 Your app is now live at: http://72.60.76.34"
