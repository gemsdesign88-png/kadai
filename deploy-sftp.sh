#!/bin/bash

# KadaiPOS cPanel Deployment Script - Interactive Version
# This script uploads and deploys your site to cPanel via SFTP

set -e

echo "🚀 KadaiPOS cPanel Deployment"
echo "================================"
echo ""

# Get cPanel credentials
read -p "Enter your cPanel hostname (e.g., 72.60.76.34): " CPANEL_HOST
read -p "Enter your cPanel username: " CPANEL_USER
read -sp "Enter your cPanel password: " CPANEL_PASS
echo ""
read -p "Enter your domain folder path in cPanel (e.g., public_html): " DOMAIN_FOLDER

DEPLOY_FILE="kadaipos-cpanel.zip"
DEPLOY_INSTRUCTIONS="kadaipos-cpanel-deploy/DEPLOY_INSTRUCTIONS.txt"

echo ""
echo "📋 Deployment Configuration:"
echo "   Host: $CPANEL_HOST"
echo "   User: $CPANEL_USER"
echo "   Folder: $DOMAIN_FOLDER"
echo "   File: $DEPLOY_FILE"
echo ""

# Check if deployment file exists
if [ ! -f "$DEPLOY_FILE" ]; then
    echo "❌ Error: $DEPLOY_FILE not found!"
    echo "Please run: bash deploy-cpanel.sh first"
    exit 1
fi

# Create SFTP command file
cat > /tmp/sftp_commands.txt <<EOF
put $DEPLOY_FILE $DOMAIN_FOLDER/
put $DEPLOY_INSTRUCTIONS $DOMAIN_FOLDER/DEPLOY_INSTRUCTIONS.txt
bye
EOF

echo "⏳ Connecting to cPanel via SFTP..."
echo ""

# Use expect for non-interactive password input
expect << EXPECT
set timeout 300
spawn sftp $CPANEL_USER@$CPANEL_HOST
expect "password:"
send "$CPANEL_PASS\r"
expect "sftp>"
send "cd $DOMAIN_FOLDER\r"
expect "sftp>"
send "put $DEPLOY_FILE\r"
expect "sftp>"
send "bye\r"
expect eof
EXPECT

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ File uploaded successfully!"
    echo ""
    echo "📝 Next steps:"
    echo "1. Login to your cPanel"
    echo "2. Go to File Manager"
    echo "3. Navigate to $DOMAIN_FOLDER"
    echo "4. Right-click kadaipos-cpanel.zip and select 'Extract'"
    echo "5. Go to 'Setup Node.js App' in cPanel"
    echo "6. Create/Configure your application"
    echo "7. Click 'Run NPM Install'"
    echo "8. Click 'Restart'"
    echo ""
    echo "Your site will be live at: https://kadai.id"
else
    echo ""
    echo "❌ Upload failed. Please check:"
    echo "   - cPanel credentials are correct"
    echo "   - SSH/SFTP is enabled in cPanel"
    echo "   - Network connection is stable"
fi

rm -f /tmp/sftp_commands.txt
