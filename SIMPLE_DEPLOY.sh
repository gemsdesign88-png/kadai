#!/bin/bash
# DEPLOY KADAIPOS - SIMPLE VERSION
# This is easier to copy-paste

set -e

echo "🚀 Installing system packages..."
apt-get update -y > /dev/null 2>&1
apt-get upgrade -y > /dev/null 2>&1
apt-get install -y curl git nginx build-essential > /dev/null 2>&1

echo "📦 Installing Node.js..."
if ! command -v node > /dev/null 2>&1; then
  curl -sL https://deb.nodesource.com/setup_18.x | bash - > /dev/null 2>&1
  apt-get install -y nodejs > /dev/null 2>&1
fi

echo "📦 Installing PM2..."
npm install -g pm2 > /dev/null 2>&1 || true

echo "📁 Setting up directory..."
mkdir -p /var/www/kadaipos.id
cd /var/www

if [ ! -d "kadaipos.id/.git" ]; then
  echo "📥 Cloning code..."
  git clone https://github.com/gemmyadyendra/kadaipos.id.git 2>/dev/null || echo "Already exists"
fi

cd /var/www/kadaipos.id
echo "📥 Pulling latest code..."
git pull origin main --force > /dev/null 2>&1

echo "⚙️  Building..."
npm install --production > /dev/null 2>&1
npm run build > /dev/null 2>&1

echo "🎬 Starting app..."
pm2 delete kadaipos 2>/dev/null || true
pm2 start npm --name kadaipos -- start -- --hostname 127.0.0.1 --port 3000 > /dev/null 2>&1
pm2 save > /dev/null 2>&1
pm2 startup -u root --hp /root > /dev/null 2>&1 || true

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
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
NGINX_CONF

ln -sf /etc/nginx/sites-available/kadaipos.id /etc/nginx/sites-enabled/kadaipos.id
rm -f /etc/nginx/sites-enabled/default
nginx -t > /dev/null 2>&1
systemctl reload nginx > /dev/null 2>&1

echo "🏥 Setting up health checks..."
mkdir -p /var/log
chmod 666 /var/log

cat > /usr/local/bin/kadaipos-health-check << 'HEALTH_SCRIPT'
#!/bin/bash
if curl -s http://127.0.0.1:3000 > /dev/null 2>&1; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ✅ OK" >> /var/log/kadaipos-health-check.log
    exit 0
fi

if pm2 list 2>/dev/null | grep -q kadaipos; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ⚠️  Restart" >> /var/log/kadaipos-health-check.log
    pm2 restart kadaipos > /dev/null 2>&1
else
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ⚠️  Start" >> /var/log/kadaipos-health-check.log
    pm2 start npm --name kadaipos -- start -- --hostname 127.0.0.1 --port 3000 > /dev/null 2>&1
fi

sleep 3

if ! curl -s http://127.0.0.1:3000 > /dev/null 2>&1; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] 🚨 Recovery" >> /var/log/kadaipos-health-check.log
    cd /var/www/kadaipos.id
    git pull origin main --force > /dev/null 2>&1
    npm install --production > /dev/null 2>&1
    npm run build > /dev/null 2>&1
    pm2 restart kadaipos > /dev/null 2>&1
fi
HEALTH_SCRIPT

chmod +x /usr/local/bin/kadaipos-health-check

(crontab -l 2>/dev/null | grep -v kadaipos-health-check; echo "*/5 * * * * /usr/local/bin/kadaipos-health-check >> /var/log/kadaipos-health-check.log 2>&1") | crontab - 2>/dev/null || true

echo ""
echo "✅ DEPLOYMENT COMPLETE!"
echo ""
echo "📊 Status:"
pm2 list
echo ""
echo "🌐 Your app is live at: http://72.60.76.34"
echo ""
echo "⏳ Testing local app..."
sleep 2
curl -s http://127.0.0.1:3000 | head -3 || echo "App still starting..."
echo ""
echo "✅ Health checks enabled (every 5 min)"
echo "📋 View logs: tail -f /var/log/kadaipos-health-check.log"
