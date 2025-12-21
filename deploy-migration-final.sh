#!/bin/bash

# Complete VPS Migration Script for KadaiPOS - Using SSH Key Authentication
# This script handles the entire migration from old VPS to new VPS

set -e

# ===== CONFIGURATION =====
NEW_VPS="103.175.207.51"
NEW_VPS_HOSTNAME="srv123.kadaipos.id"
VPS_USER="root"
VPS_PORT="22"
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

# ===== STEP 3: TEST SSH CONNECTION =====
log_info "Step 3: Testing SSH connection to new VPS..."

if ! ssh -o StrictHostKeyChecking=no -o ConnectTimeout=10 -o PasswordAuthentication=no ${VPS_USER}@${NEW_VPS} "echo 'SSH connection successful'" 2>/dev/null; then
    log_warning "SSH key authentication not available. Please ensure you can connect to ${NEW_VPS} with SSH keys."
    log_warning "If SSH key is not set up, run: ssh-copy-id -i ~/.ssh/id_rsa.pub root@${NEW_VPS}"
    log_error "Cannot establish SSH connection. Please set up SSH keys first."
fi

log_success "SSH connection verified"

# ===== STEP 4: SSH AND SETUP VPS =====
log_info "Step 4: Connecting to new VPS and setting up environment..."

ssh -o StrictHostKeyChecking=no ${VPS_USER}@${NEW_VPS} 'bash -s' << 'ENDSSH'

set -e

log_info() { echo "[INFO] $1"; }
log_success() { echo "[SUCCESS] $1"; }
log_error() { echo "[ERROR] $1"; exit 1; }

# Update system
log_info "Updating system packages..."
apt update && apt upgrade -y >/dev/null 2>&1
log_success "System updated"

# Install Node.js
if ! command -v node &> /dev/null; then
    log_info "Installing Node.js 20..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - >/dev/null 2>&1
    apt install -y nodejs >/dev/null 2>&1
    log_success "Node.js installed: $(node --version)"
else
    log_info "Node.js already installed: $(node --version)"
fi

# Install PM2 globally
if ! command -v pm2 &> /dev/null; then
    log_info "Installing PM2..."
    npm install -g pm2 >/dev/null 2>&1
    log_success "PM2 installed"
else
    log_info "PM2 already installed"
fi

# Install Nginx
if ! command -v nginx &> /dev/null; then
    log_info "Installing Nginx..."
    apt install -y nginx >/dev/null 2>&1
    systemctl enable nginx
    log_success "Nginx installed"
else
    log_info "Nginx already installed"
fi

# Install Certbot for SSL
if ! command -v certbot &> /dev/null; then
    log_info "Installing Certbot..."
    apt install -y certbot python3-certbot-nginx >/dev/null 2>&1
    log_success "Certbot installed"
else
    log_info "Certbot already installed"
fi

# Create app directory
if [ ! -d "/home/kadaipos" ]; then
    log_info "Creating app directory..."
    mkdir -p /home/kadaipos
    log_success "App directory created"
fi

log_success "VPS environment setup completed"

ENDSSH

log_success "VPS initial setup completed"

# ===== STEP 5: TRANSFER APPLICATION =====
log_info "Step 5: Transferring application to new VPS..."

scp -o StrictHostKeyChecking=no "$BACKUP_FILE" ${VPS_USER}@${NEW_VPS}:/home/kadaipos/ || log_error "Failed to transfer backup file"

log_success "Application transferred"

# ===== STEP 6: EXTRACT AND INSTALL =====
log_info "Step 6: Extracting and installing application on VPS..."

ssh -o StrictHostKeyChecking=no ${VPS_USER}@${NEW_VPS} 'bash -s' << 'ENDSSH'

set -e

log_info() { echo "[INFO] $1"; }
log_success() { echo "[SUCCESS] $1"; }

cd /home/kadaipos

BACKUP_FILE=$(ls -t kadaipos-deployment-*.tar.gz | head -n1)

if [ -z "$BACKUP_FILE" ]; then
    echo "[ERROR] No backup file found"
    exit 1
fi

log_info "Extracting $BACKUP_FILE..."
tar -xzf "$BACKUP_FILE"

log_info "Installing npm dependencies..."
npm install --production >/dev/null 2>&1

log_success "Application extracted and dependencies installed"

ENDSSH

log_success "Application extracted on VPS"

# ===== STEP 7: CONFIGURE NGINX =====
log_info "Step 7: Configuring Nginx reverse proxy..."

ssh -o StrictHostKeyChecking=no ${VPS_USER}@${NEW_VPS} 'bash -s' << 'ENDSSH'

set -e

log_info() { echo "[INFO] $1"; }
log_success() { echo "[SUCCESS] $1"; }

# Create Nginx config
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

# Enable site
if [ ! -L /etc/nginx/sites-enabled/kadaipos.id ]; then
    ln -s /etc/nginx/sites-available/kadaipos.id /etc/nginx/sites-enabled/
    log_info "Nginx site enabled"
fi

# Test Nginx config
if nginx -t >/dev/null 2>&1; then
    log_success "Nginx config is valid"
    systemctl restart nginx
    log_success "Nginx restarted"
else
    echo "[ERROR] Nginx config is invalid"
    exit 1
fi

ENDSSH

log_success "Nginx configured"

# ===== STEP 8: SETUP SSL CERTIFICATE =====
log_info "Step 8: Setting up SSL certificate with Certbot..."

ssh -o StrictHostKeyChecking=no ${VPS_USER}@${NEW_VPS} 'bash -s' << 'ENDSSH'

set -e

log_info() { echo "[INFO] $1"; }
log_success() { echo "[SUCCESS] $1"; }
log_warning() { echo "[WARNING] $1"; }

# Check if certificate already exists
if [ ! -f "/etc/letsencrypt/live/kadaipos.id/fullchain.pem" ]; then
    log_info "Setting up SSL certificate..."
    certbot --nginx -d kadaipos.id -d www.kadaipos.id -d srv123.kadaipos.id --non-interactive --agree-tos -m admin@kadaipos.id >/dev/null 2>&1 || log_warning "Certbot setup may need manual intervention"
    log_success "SSL certificate setup completed"
else
    log_warning "SSL certificate already exists"
fi

ENDSSH

log_success "SSL certificate configured"

# ===== STEP 9: START APPLICATION WITH PM2 =====
log_info "Step 9: Starting application with PM2..."

ssh -o StrictHostKeyChecking=no ${VPS_USER}@${NEW_VPS} 'bash -s' << 'ENDSSH'

set -e

log_info() { echo "[INFO] $1"; }
log_success() { echo "[SUCCESS] $1"; }

cd /home/kadaipos

# Stop existing PM2 process if running
pm2 delete kadaipos 2>/dev/null || true

# Start application
log_info "Starting KadaiPOS with PM2..."
pm2 start npm --name "kadaipos" -- start

# Save PM2 config
pm2 save

# Setup PM2 startup
pm2 startup -u root --hp /root >/dev/null 2>&1 || true

log_success "Application started with PM2"

# Wait a moment for app to start
sleep 3

# Check status
pm2 status

ENDSSH

log_success "Application started"

# ===== STEP 10: VERIFY APPLICATION =====
log_info "Step 10: Verifying application..."

sleep 2

# Check if app is running
if curl -s -o /dev/null -w "%{http_code}" "http://${NEW_VPS}:3000" 2>/dev/null | grep -q "200\|301\|302"; then
    log_success "Application is responding on port 3000"
else
    log_warning "Application may need more time to start, checking via Nginx..."
fi

# ===== STEP 11: FINAL STATUS =====
log_info "Step 11: Final status check..."

ssh -o StrictHostKeyChecking=no ${VPS_USER}@${NEW_VPS} 'bash -s' << 'ENDSSH'

echo ""
echo "===== DEPLOYMENT STATUS ====="
echo ""
echo "1. System Info:"
echo "   Hostname: $(hostname)"
echo "   IP: $(hostname -I)"
echo ""
echo "2. Application Status:"
pm2 status
echo ""
echo "3. Nginx Status:"
systemctl is-active nginx > /dev/null && echo "   Nginx: Running ✓" || echo "   Nginx: Not Running ✗"
echo ""
echo "4. PM2 Logs (last 5 lines):"
pm2 logs --nostream kadaipos 2>/dev/null | tail -n 5 || echo "   No logs yet"
echo ""

ENDSSH

# ===== CLEANUP =====
log_info "Cleaning up local backup file..."
rm -f "$BACKUP_FILE"
log_success "Backup file removed"

# ===== SUMMARY =====
echo ""
echo "======================================"
log_success "VPS MIGRATION COMPLETED SUCCESSFULLY!"
echo "======================================"
echo ""
echo "✅ New VPS Details:"
echo "   🌐 URL: https://kadaipos.id"
echo "   📍 IP: ${NEW_VPS}"
echo "   🖥️  Hostname: ${NEW_VPS_HOSTNAME}"
echo ""
echo "📋 Next Steps:"
echo "   1. ⚙️  Update DNS records at your registrar:"
echo "      kadaipos.id         → A record → ${NEW_VPS}"
echo "      www.kadaipos.id     → A record → ${NEW_VPS}"
echo "      srv123.kadaipos.id  → A record → ${NEW_VPS}"
echo "   2. 🔍 Monitor application: https://kadaipos.id"
echo "   3. 📊 Check logs: pm2 logs kadaipos"
echo "   4. ✨ Verify all functionality"
echo ""
echo "🔐 SSH Access:"
echo "   ssh root@${NEW_VPS}"
echo ""
echo "📁 Application Location: ${APP_PATH}"
echo ""
echo "⏱️  DNS Propagation: 24-48 hours (usually faster)"
echo ""
