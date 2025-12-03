#!/bin/bash

# KadaiPOS Production Deployment Script
# Deploys to cPanel via FTP

set -e

echo "🚀 KadaiPOS Production Deployment"
echo "=================================="
echo ""

# Configuration - Update these with your cPanel details
FTP_HOST="${FTP_HOST:-ftp.kadaipos.id}"
FTP_USER="${FTP_USER:-}"
FTP_PASS="${FTP_PASS:-}"
FTP_PATH="${FTP_PATH:-/public_html}"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check if credentials are provided
if [ -z "$FTP_USER" ] || [ -z "$FTP_PASS" ]; then
    echo -e "${YELLOW}FTP credentials not set in environment variables${NC}"
    echo ""
    read -p "Enter FTP host (e.g., ftp.kadaipos.id or 72.60.76.34): " FTP_HOST
    read -p "Enter FTP username: " FTP_USER
    read -sp "Enter FTP password: " FTP_PASS
    echo ""
    read -p "Enter FTP path (e.g., /public_html or /): " FTP_PATH
    echo ""
fi

echo -e "${GREEN}✓ Configuration loaded${NC}"
echo "  Host: $FTP_HOST"
echo "  User: $FTP_USER"
echo "  Path: $FTP_PATH"
echo ""

# Check if deployment package exists
if [ ! -f "kadaipos-cpanel.zip" ]; then
    echo -e "${YELLOW}Deployment package not found. Creating it now...${NC}"
    bash deploy-cpanel.sh
fi

echo -e "${YELLOW}Step 1: Uploading deployment package...${NC}"
curl -T kadaipos-cpanel.zip \
    --ftp-create-dirs \
    --user "$FTP_USER:$FTP_PASS" \
    "ftp://$FTP_HOST$FTP_PATH/kadaipos-cpanel.zip"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Upload complete${NC}"
else
    echo -e "${RED}✗ Upload failed${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}✅ Deployment package uploaded successfully!${NC}"
echo ""
echo -e "${YELLOW}📋 Next steps (via cPanel):${NC}"
echo "1. Login to cPanel at https://kadaipos.id:2083"
echo "2. Open File Manager"
echo "3. Navigate to $FTP_PATH"
echo "4. Right-click 'kadaipos-cpanel.zip' and select 'Extract'"
echo "5. Go to 'Setup Node.js App'"
echo "6. Configure application:"
echo "   - Node version: 18.x or 20.x"
echo "   - Application root: $FTP_PATH"
echo "   - Application startup file: node_modules/next/dist/bin/next"
echo "   - Arguments: start -p 3000"
echo "7. Add environment variables (from .env.local inside ZIP)"
echo "8. Click 'Run NPM Install'"
echo "9. Click 'Restart'"
echo ""
echo "🌐 Your site will be live at: https://kadaipos.id"
