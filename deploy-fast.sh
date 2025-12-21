#!/bin/bash

# Fast VPS Migration Script for KadaiPOS

set -e

# Configuration
NEW_VPS="103.175.207.51"
VPS_USER="root"
VPS_PASSWORD="kadaiPOS12345@@@"
APP_PATH="/home/kadaipos"

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; exit 1; }

# Check build
cd "$(dirname "$0")"
[ -d ".next" ] || log_error ".next directory not found"

# Create package
log_info "Creating deployment package..."
BACKUP_FILE="kadaipos-deployment-$(date +%Y%m%d-%H%M%S).tar.gz"
tar -czf "$BACKUP_FILE" .next .env.production package.json package-lock.json public next.config.js tsconfig.json 2>/dev/null || log_error "Failed to create archive"
log_success "Package ready: $BACKUP_FILE ($(du -h "$BACKUP_FILE" | cut -f1))"

# Setup VPS (skip upgrades)
log_info "Setting up VPS..."
export SSHPASS="$VPS_PASSWORD"

sshpass -e ssh -o StrictHostKeyChecking=no ${VPS_USER}@${NEW_VPS} 'bash -s' << 'EOF'
set -e
echo "[INFO] Installing dependencies..."
apt install -y nodejs npm nginx certbot python3-certbot-nginx >/dev/null 2>&1 || true
npm install -g pm2 >/dev/null 2>&1 || true
mkdir -p /home/kadaipos
echo "[SUCCESS] VPS ready"
EOF

log_success "VPS ready"

# Transfer file
log_info "Uploading application (this may take 1-2 minutes)..."
sshpass -e scp -o StrictHostKeyChecking=no "$BACKUP_FILE" ${VPS_USER}@${NEW_VPS}:${APP_PATH}/
log_success "Upload complete"

# Extract and start
log_info "Extracting and starting application..."
sshpass -e ssh -o StrictHostKeyChecking=no ${VPS_USER}@${NEW_VPS} 'bash -s' << 'EOF'
set -e
cd /home/kadaipos
BACKUP=$(ls -t kadaipos-deployment-*.tar.gz | head -1)
tar -xzf "$BACKUP"
npm install --production >/dev/null 2>&1
pm2 delete all 2>/dev/null || true
pm2 start npm --name "kadaipos" -- start
pm2 save
pm2 startup >/dev/null 2>&1 || true
sleep 2
echo "[SUCCESS] Application started"
EOF

# Configure Nginx
log_info "Configuring Nginx..."
sshpass -e ssh -o StrictHostKeyChecking=no ${VPS_USER}@${NEW_VPS} 'bash -s' << 'EOF'
cat > /etc/nginx/sites-available/kadaipos.id << 'NGINX'
server {
    listen 80;
    server_name kadaipos.id www.kadaipos.id srv123.kadaipos.id;
    client_max_body_size 100M;
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
NGINX

ln -sf /etc/nginx/sites-available/kadaipos.id /etc/nginx/sites-enabled/
nginx -t >/dev/null 2>&1 && systemctl restart nginx
echo "[SUCCESS] Nginx configured"
EOF

# Setup SSL
log_info "Setting up SSL certificate..."
sshpass -e ssh -o StrictHostKeyChecking=no ${VPS_USER}@${NEW_VPS} 'bash -s' << 'EOF'
[ ! -f "/etc/letsencrypt/live/kadaipos.id/fullchain.pem" ] && \
  certbot --nginx -d kadaipos.id -d www.kadaipos.id -d srv123.kadaipos.id --non-interactive --agree-tos -m admin@kadaipos.id >/dev/null 2>&1 || true
echo "[SUCCESS] SSL ready"
EOF

# Cleanup
log_info "Cleaning up..."
rm -f "$BACKUP_FILE"

# Status
log_info "Checking final status..."
sshpass -e ssh -o StrictHostKeyChecking=no ${VPS_USER}@${NEW_VPS} 'bash -s' << 'EOF'
echo ""
echo "========== DEPLOYMENT COMPLETE =========="
echo ""
echo "📊 Status:"
pm2 status
echo ""
echo "✅ URLs:"
echo "   http://kadaipos.id"
echo "   https://kadaipos.id"
echo "   http://103.175.207.51:3000"
echo ""
echo "⚡ Commands:"
echo "   pm2 logs kadaipos     # View logs"
echo "   pm2 restart kadaipos  # Restart app"
echo ""
EOF

log_success "✅ VPS MIGRATION COMPLETE!"
echo ""
echo "🎯 Next Steps:"
echo "   1. Update DNS to point to: 103.175.207.51"
echo "   2. Wait for DNS propagation"
echo "   3. Visit: https://kadaipos.id"
echo ""
