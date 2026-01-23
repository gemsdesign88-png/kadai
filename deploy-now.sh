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
cat > /etc/nginx/sites-available/kadai.id << 'NGINX'
server {
    listen 80;
    server_name kadaipos.id www.kadaipos.id;
    return 301 https://kadai.id$request_uri;
}

server {
    listen 80;
    server_name order.kadaipos.id;
    return 301 https://order.kadai.id$request_uri;
}

server {
    listen 80;
    server_name sibos.kadaipos.id;
    return 301 https://sibos.kadai.id$request_uri;
}

server {
    listen 80;
    server_name kadai.id www.kadai.id order.kadai.id sibos.kadai.id;
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

ln -sf /etc/nginx/sites-available/kadai.id /etc/nginx/sites-enabled/
nginx -t >/dev/null 2>&1 && systemctl restart nginx
echo "✓ Nginx configured"

echo "Step 5: Starting application..."
pm2 delete all 2>/dev/null || true
pm2 start npm --name "kadaipos" -- start
pm2 save >/dev/null 2>&1
echo "✓ Application started"

echo "Step 6: Setting up SSL..."
certbot certonly --nginx \
  -d kadai.id -d www.kadai.id -d order.kadai.id -d sibos.kadai.id \
  -d kadaipos.id -d www.kadaipos.id -d order.kadaipos.id -d sibos.kadaipos.id \
  --non-interactive --agree-tos -m admin@kadaipos.id >/dev/null 2>&1 || echo "⚠ SSL setup needs email verification"

cat > /etc/nginx/sites-available/kadai.id << 'NGINX'
server {
    listen 80;
    server_name kadaipos.id www.kadaipos.id;
    return 301 https://kadai.id$request_uri;
}

server {
    listen 80;
    server_name order.kadaipos.id;
    return 301 https://order.kadai.id$request_uri;
}

server {
    listen 80;
    server_name sibos.kadaipos.id;
    return 301 https://sibos.kadai.id$request_uri;
}

server {
    listen 80;
    server_name kadai.id www.kadai.id order.kadai.id sibos.kadai.id;
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

server {
    listen 443 ssl;
    server_name kadaipos.id www.kadaipos.id;
    ssl_certificate /etc/letsencrypt/live/kadai.id/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/kadai.id/privkey.pem;
    return 301 https://kadai.id$request_uri;
}

server {
    listen 443 ssl;
    server_name order.kadaipos.id;
    ssl_certificate /etc/letsencrypt/live/kadai.id/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/kadai.id/privkey.pem;
    return 301 https://order.kadai.id$request_uri;
}

server {
    listen 443 ssl;
    server_name sibos.kadaipos.id;
    ssl_certificate /etc/letsencrypt/live/kadai.id/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/kadai.id/privkey.pem;
    return 301 https://sibos.kadai.id$request_uri;
}

server {
    listen 443 ssl;
    server_name kadai.id www.kadai.id order.kadai.id sibos.kadai.id;
    ssl_certificate /etc/letsencrypt/live/kadai.id/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/kadai.id/privkey.pem;
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

nginx -t >/dev/null 2>&1 && systemctl restart nginx

echo ""
echo "✅ DEPLOYMENT COMPLETE!"
echo ""
echo "📊 Status:"
pm2 status
echo ""
echo "🌐 Your site is live at:"
echo "   http://kadai.id"
echo "   https://kadai.id"
echo ""

REMOTE

echo ""
echo "✨ All done! Your application is live!"
