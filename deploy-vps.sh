#!/bin/bash
# Automated VPS Deployment Script for KadaiPOS
# Run this script to deploy to your VPS at 72.60.76.34

set -e

SERVER="72.60.76.34"
PORT="22"
USER="root"
DOMAIN="kadaipos.id"

echo "🚀 KadaiPOS VPS Deployment"
echo "======================================"
echo ""
echo "Server: $SERVER"
echo "Domain: $DOMAIN"
echo ""

# Step 1: Check server connection
echo "📡 Step 1: Testing connection..."
ssh -p $PORT -o StrictHostKeyChecking=no -o ConnectTimeout=10 $USER@$SERVER "echo 'Connection successful!'" || {
    echo "❌ Cannot connect to server. Please check:"
    echo "   - VPS is running"
    echo "   - SSH service is active"
    echo "   - Port $PORT is accessible"
    exit 1
}

echo "✅ Connection successful!"
echo ""

# Step 2: Check server environment
echo "📋 Step 2: Checking server environment..."
ssh -p $PORT $USER@$SERVER 'bash -s' << 'ENDSSH'
    echo "OS: $(cat /etc/os-release | grep PRETTY_NAME | cut -d'"' -f2)"
    echo "User: $(whoami)"
    echo "Home: $HOME"
    echo "Node: $(command -v node && node --version || echo 'Not installed')"
    echo "NPM: $(command -v npm && npm --version || echo 'Not installed')"
    echo "PM2: $(command -v pm2 && pm2 --version || echo 'Not installed')"
ENDSSH

echo ""
read -p "Continue with deployment? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    exit 1
fi

# Step 3: Install Node.js and PM2
echo ""
echo "📦 Step 3: Installing Node.js and PM2..."
ssh -p $PORT $USER@$SERVER 'bash -s' << 'ENDSSH'
    # Check if Node.js is installed
    if ! command -v node &> /dev/null; then
        echo "Installing Node.js 18.x..."
        
        # Try different package managers
        if command -v apt-get &> /dev/null; then
            curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
            apt-get install -y nodejs
        elif command -v yum &> /dev/null; then
            curl -fsSL https://rpm.nodesource.com/setup_18.x | bash -
            yum install -y nodejs
        else
            echo "❌ Cannot detect package manager. Please install Node.js 18+ manually."
            exit 1
        fi
    else
        echo "✅ Node.js already installed: $(node --version)"
    fi
    
    # Install PM2 globally
    if ! command -v pm2 &> /dev/null; then
        echo "Installing PM2..."
        npm install -g pm2
    else
        echo "✅ PM2 already installed: $(pm2 --version)"
    fi
ENDSSH

# Step 4: Create application directory
echo ""
echo "📁 Step 4: Creating application directory..."
ssh -p $PORT $USER@$SERVER "mkdir -p ~/kadaipos.id"

# Step 5: Upload files
echo ""
echo "📤 Step 5: Uploading application files..."
echo "Building project locally first..."
npm run build

echo "Creating deployment archive..."
tar czf kadaipos-vps.tar.gz \
    .next \
    public \
    package.json \
    package-lock.json \
    ecosystem.config.js \
    .env.production \
    next.config.ts \
    postcss.config.mjs \
    tsconfig.json

echo "Uploading to server..."
scp -P $PORT kadaipos-vps.tar.gz $USER@$SERVER:~/kadaipos.id/

# Step 6: Extract and setup
echo ""
echo "📦 Step 6: Setting up application on server..."
ssh -p $PORT $USER@$SERVER 'bash -s' << 'ENDSSH'
    cd ~/kadaipos.id
    
    # Extract files
    echo "Extracting files..."
    tar xzf kadaipos-vps.tar.gz
    rm kadaipos-vps.tar.gz
    
    # Setup environment
    mv .env.production .env.local
    
    # Install production dependencies
    echo "Installing dependencies..."
    npm ci --omit=dev
    
    # Stop existing PM2 process if running
    pm2 delete kadaipos-website 2>/dev/null || true
    
    # Start with PM2
    echo "Starting application with PM2..."
    pm2 start ecosystem.config.js
    pm2 save
    
    # Setup PM2 startup
    pm2 startup | tail -n 1 | bash || true
    
    echo "✅ Application started!"
    pm2 status
ENDSSH

# Step 7: Install and configure Nginx
echo ""
echo "🌐 Step 7: Configuring Nginx..."
ssh -p $PORT $USER@$SERVER 'bash -s' << ENDSSH
    # Install Nginx
    if ! command -v nginx &> /dev/null; then
        echo "Installing Nginx..."
        if command -v apt-get &> /dev/null; then
            apt-get update && apt-get install -y nginx
        elif command -v yum &> /dev/null; then
            yum install -y nginx
        fi
    fi
    
    # Create Nginx config
    cat > /etc/nginx/sites-available/$DOMAIN << 'NGINX'
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
NGINX
    
    # Enable site
    ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/
    nginx -t && systemctl reload nginx
    
    echo "✅ Nginx configured!"
ENDSSH

# Step 8: Setup SSL
echo ""
echo "🔒 Step 8: Setting up SSL..."
read -p "Enter your email for SSL certificate: " SSL_EMAIL

ssh -p $PORT $USER@$SERVER "bash -s" << ENDSSH
    # Install Certbot
    if ! command -v certbot &> /dev/null; then
        if command -v apt-get &> /dev/null; then
            apt-get install -y certbot python3-certbot-nginx
        elif command -v yum &> /dev/null; then
            yum install -y certbot python3-certbot-nginx
        fi
    fi
    
    # Get SSL certificate
    certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos -m $SSL_EMAIL
ENDSSH

# Cleanup local file
rm kadaipos-vps.tar.gz

echo ""
echo "✅ Deployment Complete!"
echo "======================================"
echo ""
echo "🌐 Your site is now live at:"
echo "   https://$DOMAIN"
echo "   https://www.$DOMAIN"
echo ""
echo "📊 Server Management:"
echo "   View logs:    ssh -p $PORT $USER@$SERVER 'pm2 logs kadaipos-website'"
echo "   Check status: ssh -p $PORT $USER@$SERVER 'pm2 status'"
echo "   Restart app:  ssh -p $PORT $USER@$SERVER 'pm2 restart kadaipos-website'"
echo ""
echo "🔧 Next Steps:"
echo "1. Update Supabase Dashboard:"
echo "   - Site URL: https://$DOMAIN"
echo "   - Redirect URLs:"
echo "     * https://$DOMAIN/auth/callback"
echo "     * https://www.$DOMAIN/auth/callback"
echo ""
echo "2. Test your site:"
echo "   - Homepage: https://$DOMAIN"
echo "   - Login: https://$DOMAIN/login"
echo ""
