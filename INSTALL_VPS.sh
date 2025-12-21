#!/bin/bash
set -e

# KadaiPOS VPS Installation Script - OPTIMIZED
# This script will be run on the VPS after network is restored

echo "=========================================="
echo "KadaiPOS Application Installation"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    echo -e "${BLUE}[*]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

# Step 1: Update system packages
print_status "Updating system packages..."
apt-get update -y > /dev/null 2>&1
print_success "System updated"

# Step 2: Install Node.js 20 LTS
print_status "Installing Node.js 20 LTS..."
apt-get install -y nodejs npm > /dev/null 2>&1
NODE_VERSION=$(node --version)
print_success "Node.js installed: $NODE_VERSION"

# Step 3: Install PM2 globally
print_status "Installing PM2 process manager..."
npm install -g pm2 > /dev/null 2>&1
print_success "PM2 installed"

# Step 4: Navigate to app directory
cd /home/kadaipos || { print_error "Cannot cd to /home/kadaipos"; exit 1; }
print_success "In application directory: $(pwd)"

# Step 5: Install application dependencies
print_status "Installing application dependencies..."
npm install --production > /dev/null 2>&1
print_success "Dependencies installed"

# Step 6: Start application with PM2
print_status "Starting application with PM2..."
pm2 start "npm start" --name "kadaipos" --max-memory-restart 500M
print_success "Application started"

# Step 7: Save PM2 configuration
print_status "Configuring PM2 for auto-restart..."
pm2 save > /dev/null 2>&1
pm2 startup > /dev/null 2>&1
print_success "PM2 auto-restart configured"

# Step 8: Verify installation
echo ""
echo "=========================================="
echo "Installation Complete!"
echo "=========================================="
echo ""

print_status "Checking application status..."
pm2 status

echo ""
print_status "Application logs (last 10 lines):"
pm2 logs kadaipos --lines 10

echo ""
echo "=========================================="
echo "Next Steps:"
echo "=========================================="
echo "1. Application is running on port 3000"
echo "2. Configure Nginx reverse proxy (optional)"
echo "3. Set up SSL/HTTPS with Let's Encrypt (optional)"
echo ""
echo "Test the app:"
echo "  curl http://localhost:3000"
echo ""
echo "View logs:"
echo "  pm2 logs kadaipos"
echo ""
echo "Restart app:"
echo "  pm2 restart kadaipos"
echo "=========================================="
