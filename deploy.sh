#!/bin/bash

# KadaiPOS Deployment Script for Own Hosting
# This script deploys the Next.js app to your server at 72.60.76.34

set -e

echo "🚀 KadaiPOS Deployment Starting..."
echo ""

# Configuration
SERVER_IP="72.60.76.34"
SERVER_USER="${SERVER_USER:-root}"
DOMAIN="kadaipos.id"
APP_DIR="/var/www/kadaipos.id"
NODE_VERSION="18"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Step 1: Testing server connection...${NC}"
if ! ssh -o ConnectTimeout=10 -o BatchMode=yes ${SERVER_USER}@${SERVER_IP} "echo 'Connected'" 2>/dev/null; then
    echo -e "${RED}❌ Cannot connect via SSH. Please check:${NC}"
    echo "   1. SSH access is enabled on your server"
    echo "   2. You have SSH keys set up (run: ssh-copy-id ${SERVER_USER}@${SERVER_IP})"
    echo "   3. Firewall allows SSH (port 22)"
    echo "   4. If using cPanel, SSH might be on a different port"
    echo ""
    echo "Try: ssh ${SERVER_USER}@${SERVER_IP}"
    echo "Or specify custom port: ssh -p 2222 ${SERVER_USER}@${SERVER_IP}"
    exit 1
fi

echo -e "${GREEN}✓ Server connection successful${NC}"
echo ""

echo -e "${YELLOW}Step 2: Preparing build locally...${NC}"
npm run build
echo -e "${GREEN}✓ Build complete${NC}"
echo ""

echo -e "${YELLOW}Step 3: Creating deployment package...${NC}"
# Create a lighter package without node_modules (will install on server)
tar -czf kadaipos-deploy-slim.tar.gz \
  .next \
  public \
  src \
  package.json \
  package-lock.json \
  ecosystem.config.js \
  .env.production \
  next.config.ts \
  postcss.config.mjs \
  tsconfig.json \
  --exclude=node_modules
echo -e "${GREEN}✓ Package created: $(ls -lh kadaipos-deploy-slim.tar.gz | awk '{print $5}')${NC}"
echo ""

echo -e "${YELLOW}Step 4: Uploading to server...${NC}"
ssh ${SERVER_USER}@${SERVER_IP} "mkdir -p ${APP_DIR}"
scp kadaipos-deploy-slim.tar.gz ${SERVER_USER}@${SERVER_IP}:${APP_DIR}/
echo -e "${GREEN}✓ Upload complete${NC}"
echo ""

echo -e "${YELLOW}Step 5: Setting up on server...${NC}"
ssh ${SERVER_USER}@${SERVER_IP} << 'ENDSSH'
set -e

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    SUDO="sudo"
else
    SUDO=""
fi

cd /var/www/kadaipos.id

echo "📦 Extracting files..."
tar -xzf kadaipos-deploy-slim.tar.gz
rm kadaipos-deploy-slim.tar.gz
mv .env.production .env.local

# Install Node.js if not present
if ! command -v node &> /dev/null; then
    echo "📥 Installing Node.js 18..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | $SUDO bash -
    $SUDO apt-get install -y nodejs
fi

echo "Current Node version: $(node --version)"

# Install PM2 if not present
if ! command -v pm2 &> /dev/null; then
    echo "📥 Installing PM2..."
    $SUDO npm install -g pm2
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --omit=dev

# Start with PM2
echo "🚀 Starting application..."
pm2 delete kadaipos-website 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save
$SUDO pm2 startup || true

echo "✅ Application started on port 3000"

# Check if Nginx is installed
if command -v nginx &> /dev/null; then
    echo "🔧 Configuring Nginx..."
    
    # Create Nginx config
    $SUDO bash -c 'cat > /etc/nginx/sites-available/kadaipos.id' << 'NGINX'
server {
    listen 80;
    server_name kadaipos.id www.kadaipos.id;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
NGINX

    $SUDO ln -sf /etc/nginx/sites-available/kadaipos.id /etc/nginx/sites-enabled/kadaipos.id
    $SUDO nginx -t && $SUDO systemctl reload nginx || echo "Nginx config test failed"
    
    # Install Certbot if not present
    if ! command -v certbot &> /dev/null; then
        echo "📥 Installing Certbot..."
        $SUDO apt-get update
        $SUDO apt-get install -y certbot python3-certbot-nginx
    fi
    
    echo "🔒 Setting up SSL (this requires DNS to be pointed to this server)..."
    $SUDO certbot --nginx -d kadaipos.id -d www.kadaipos.id --non-interactive --agree-tos --email hello@kadaipos.id --redirect || echo "SSL setup failed - DNS might not be pointed yet"
else
    echo "⚠️  Nginx not found. Please install Nginx and configure reverse proxy manually."
    echo "   Or ensure your firewall/hosting panel forwards port 80/443 to 3000"
fi

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📝 Next steps:"
echo "1. Point DNS: A record kadaipos.id → 153.92.8.133"
echo "2. Point DNS: A record www → 153.92.8.133"
echo "3. Wait for DNS propagation (5-30 minutes)"
echo "4. Update Supabase:"
echo "   - Site URL: https://kadaipos.id"
echo "   - Redirect URLs: https://kadaipos.id/auth/callback"
echo "5. Test: https://kadaipos.id"
echo ""
echo "PM2 commands:"
echo "  pm2 status              # Check status"
echo "  pm2 logs kadaipos-website  # View logs"
echo "  pm2 restart kadaipos-website  # Restart app"
echo ""

ENDSSH

echo -e "${GREEN}✅ Deployment script completed!${NC}"
echo ""
echo -e "${YELLOW}Important: Update DNS records${NC}"
echo "Add these records in your DNS manager (ns1/ns2.dns-parking.com):"
echo "  A    kadaipos.id    →  153.92.8.133"
echo "  A    www           →  153.92.8.133"
echo ""
echo "Then update Supabase (https://supabase.com/dashboard):"
echo "  Authentication → URL Configuration"
echo "  - Site URL: https://kadaipos.id"
echo "  - Redirect URLs: https://kadaipos.id/auth/callback, https://www.kadaipos.id/auth/callback"
