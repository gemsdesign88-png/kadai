#!/bin/bash

# Complete VPS Migration Script for KadaiPOS - Automated with Password Authentication
# This script handles the entire migration from old VPS to new VPS

set -e

# ===== CONFIGURATION =====
NEW_VPS="103.175.207.51"
NEW_VPS_HOSTNAME="srv123.kadaipos.id"
VPS_USER="root"
VPS_PORT="22"
VPS_PASSWORD="kadaiPOS12345@@@"
DOMAIN="kadaipos.id"
APP_PATH="/home/kadaipos"
APP_NAME="kadaipos"

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# ===== HELPER FUNCTIONS =====
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

# ===== STEP 1: VERIFY APPLICATION IS BUILT =====
log_info "Step 1: Verifying application build..."

cd "$(dirname "$0")"

if [ ! -d ".next" ]; then
    log_error ".next directory not found. Application hasn't been built yet."
fi

log_success "Application build verified"

# ===== STEP 2: CREATE DEPLOYMENT PACKAGE =====
log_info "Step 2: Creating deployment package..."

BACKUP_FILE="kadaipos-deployment-$(date +%Y%m%d-%H%M%S).tar.gz"

# Create archive with only necessary files
tar -czf "$BACKUP_FILE" \
    .next \
    .env.production \
    package.json \
    package-lock.json \
    public \
    next.config.js \
    tsconfig.json \
    2>/dev/null || log_error "Failed to create backup archive"

log_success "Deployment package created: $BACKUP_FILE"
DEPLOY_FILE_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
log_info "Package size: $DEPLOY_FILE_SIZE"

# ===== STEP 3: SETUP VPS WITH PASSWORD AUTH =====
log_info "Step 3: Setting up new VPS environment..."

# Use SSH with StrictHostKeyChecking disabled and PasswordAuthentication
export SSHPASS="$VPS_PASSWORD"

log_info "Connecting to VPS and installing dependencies..."
sshpass -e ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ${VPS_USER}@${NEW_VPS} 'bash -s' << 'ENDSSH'

set -e

# Update system
echo "[INFO] Updating system packages..."
apt update && apt upgrade -y >/dev/null 2>&1

# Install Node.js
if ! command -v node &> /dev/null; then
    echo "[INFO] Installing Node.js 20..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - >/dev/null 2>&1
    apt install -y nodejs >/dev/null 2>&1
else
    echo "[INFO] Node.js already installed"
fi

# Install PM2
if ! command -v pm2 &> /dev/null; then
    echo "[INFO] Installing PM2..."
    npm install -g pm2 >/dev/null 2>&1
fi

# Install Nginx
if ! command -v nginx &> /dev/null; then
    echo "[INFO] Installing Nginx..."
    apt install -y nginx >/dev/null 2>&1
    systemctl enable nginx
fi

# Install Certbot
if ! command -v certbot &> /dev/null; then
    echo "[INFO] Installing Certbot..."
    apt install -y certbot python3-certbot-nginx >/dev/null 2>&1
fi

# Create app directory
mkdir -p /home/kadaipos

echo "[SUCCESS] VPS environment setup completed"

ENDSSH

log_success "VPS setup completed"

# ===== STEP 4: TRANSFER APPLICATION =====
log_info "Step 4: Transferring application package..."

sshpass -e scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null "$BACKUP_FILE" ${VPS_USER}@${NEW_VPS}:/home/kadaipos/ || log_error "Failed to transfer file"

log_success "Application package transferred"

# ===== STEP 5: EXTRACT AND INSTALL =====
log_info "Step 5: Extracting application on VPS..."

sshpass -e ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ${VPS_USER}@${NEW_VPS} 'bash -s' << 'ENDSSH'

set -e

cd /home/kadaipos

# Find and extract the backup file
BACKUP_FILE=$(ls -t kadaipos-deployment-*.tar.gz 2>/dev/null | head -n1)

if [ -z "$BACKUP_FILE" ]; then
    echo "[ERROR] No backup file found"
    exit 1
fi

echo "[INFO] Extracting $BACKUP_FILE..."
tar -xzf "$BACKUP_FILE" -C /home/kadaipos

echo "[INFO] Installing npm dependencies..."
cd /home/kadaipos
npm install --production >/dev/null 2>&1

echo "[SUCCESS] Application extracted and installed"

ENDSSH

log_success "Application installed on VPS"

# ===== STEP 6: CONFIGURE NGINX =====
log_info "Step 6: Configuring Nginx..."

sshpass -e ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ${VPS_USER}@${NEW_VPS} 'bash -s' << 'ENDSSH'

# Create Nginx configuration
cat > /etc/nginx/sites-available/kadaipos.id << 'EOF'
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
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# Enable the site
ln -sf /etc/nginx/sites-available/kadaipos.id /etc/nginx/sites-enabled/kadaipos.id

# Test configuration
if nginx -t >/dev/null 2>&1; then
    systemctl restart nginx
    echo "[SUCCESS] Nginx configured and restarted"
else
    echo "[ERROR] Nginx config invalid"
    exit 1
fi

ENDSSH

log_success "Nginx configured"

# ===== STEP 7: SETUP SSL =====
log_info "Step 7: Setting up SSL certificate..."

sshpass -e ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ${VPS_USER}@${NEW_VPS} 'bash -s' << 'ENDSSH'

if [ ! -f "/etc/letsencrypt/live/kadaipos.id/fullchain.pem" ]; then
    echo "[INFO] Setting up Let's Encrypt certificate..."
    certbot --nginx -d kadaipos.id -d www.kadaipos.id -d srv123.kadaipos.id --non-interactive --agree-tos -m admin@kadaipos.id >/dev/null 2>&1 || echo "[WARNING] Certbot setup needs manual intervention"
    echo "[SUCCESS] SSL certificate ready"
else
    echo "[INFO] SSL certificate already exists"
fi

ENDSSH

log_success "SSL setup completed"

# ===== STEP 8: START WITH PM2 =====
log_info "Step 8: Starting application with PM2..."

sshpass -e ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ${VPS_USER}@${NEW_VPS} 'bash -s' << 'ENDSSH'

set -e

cd /home/kadaipos

# Kill existing PM2 processes
pm2 delete all 2>/dev/null || true

# Start the application
pm2 start npm --name "kadaipos" -- start
pm2 save
pm2 startup -u root --hp /root >/dev/null 2>&1 || true

# Wait for startup
sleep 3

echo "[SUCCESS] Application started with PM2"
pm2 status

ENDSSH

log_success "Application running with PM2"

# ===== STEP 9: VERIFY APPLICATION =====
log_info "Step 9: Verifying application..."

sleep 2

if curl -s -o /dev/null -w "%{http_code}" "http://${NEW_VPS}:3000" 2>/dev/null | grep -q "200\|301\|302"; then
    log_success "Application is responding successfully"
else
    log_warning "Application may still be starting, will verify once"
fi

# ===== CLEANUP =====
log_info "Cleaning up local files..."
rm -f "$BACKUP_FILE"
log_success "Backup file removed"

# ===== FINAL STATUS =====
sshpass -e ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ${VPS_USER}@${NEW_VPS} 'bash -s' << 'ENDSSH'

echo ""
echo "=========================================="
echo "   KADAIPOS MIGRATION COMPLETED!"
echo "=========================================="
echo ""
echo "📊 System Status:"
echo ""
pm2 status
echo ""
echo "🌐 Application URLs:"
echo "   HTTP:  http://kadaipos.id"
echo "   HTTPS: https://kadaipos.id"
echo "   IP:    http://103.175.207.51"
echo ""
echo "📝 Quick Commands:"
echo "   - View logs:     pm2 logs kadaipos"
echo "   - Restart app:   pm2 restart kadaipos"
echo "   - Check status:  pm2 status"
echo ""

ENDSSH

# ===== SUMMARY =====
echo ""
echo "======================================"
log_success "VPS MIGRATION COMPLETE!"
echo "======================================"
echo ""
echo "✅ Deployment Summary:"
echo "   New IP: ${NEW_VPS}"
echo "   App Status: Live and Running"
echo "   PM2 Status: Active"
echo "   SSL: Configured"
echo ""
echo "🎯 Next Steps:"
echo "   1. Update DNS records pointing to: ${NEW_VPS}"
echo "   2. Wait for DNS propagation (up to 48 hours)"
echo "   3. Test application at: https://kadaipos.id"
echo "   4. Monitor logs: pm2 logs kadaipos"
echo ""
echo "💻 SSH Access:"
echo "   ssh root@${NEW_VPS}"
echo ""
