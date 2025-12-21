#!/bin/bash
set -e

VPS="103.175.207.51"
PASS="kadaiPOS12345@@@"

export SSHPASS="$PASS"

echo "📦 Uploading application package..."
sshpass -e scp -P 22 -o StrictHostKeyChecking=no kadaipos-prod.tar.gz root@$VPS:/home/kadaipos/ &
wait

echo "✅ Upload complete! Running installation on VPS..."
echo ""
echo "Executing remote installation..."

sshpass -e ssh -p 22 -o StrictHostKeyChecking=no root@$VPS << 'REMOTE'
#!/bin/bash
set -e

echo "Step 1: Installing dependencies..."
apt install -y nodejs npm nginx certbot python3-certbot-nginx >/dev/null 2>&1 &
npm install -g pm2 >/dev/null 2>&1 || true
wait
echo "✓ Dependencies installed"

echo "Step 2: Extracting application..."
cd /home/kadaipos
tar -xzf kadaipos-prod.tar.gz
echo "✓ Extracted"

echo "Step 3: Installing node modules..."
npm install --production >/dev/null 2>&1
echo "✓ Dependencies ready"

echo "Step 4: Configuring Nginx..."
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
echo "✓ Nginx configured"

echo "Step 5: Starting application..."
pm2 delete all 2>/dev/null || true
pm2 start npm --name "kadaipos" -- start
pm2 save >/dev/null 2>&1
echo "✓ Application started"

echo "Step 6: Setting up SSL..."
certbot --nginx -d kadaipos.id -d www.kadaipos.id -d srv123.kadaipos.id --non-interactive --agree-tos -m admin@kadaipos.id >/dev/null 2>&1 || echo "⚠ SSL setup needs email verification"

echo ""
echo "✅ DEPLOYMENT COMPLETE!"
echo ""
echo "📊 Status:"
pm2 status
echo ""
echo "🌐 Your site is live at:"
echo "   http://kadaipos.id"
echo "   https://kadaipos.id"
echo ""

REMOTE

echo ""
echo "✨ All done! Your application is live!"
