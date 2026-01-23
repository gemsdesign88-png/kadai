# VPS Migration Guide - Kadai

## New VPS Details
- **Hostname:** srv123.kadaipos.id
- **IP Address:** 103.175.207.51
- **Password:** (kept secure)
- **Old IP:** 72.60.76.34

---

## Migration Steps

### Step 1: Initial Setup on New VPS
```bash
# SSH into new VPS
ssh root@103.175.207.51

# Update system
apt update && apt upgrade -y

# Install Node.js (v18+)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs

# Install PM2 globally
npm install -g pm2

# Install Nginx (reverse proxy)
apt install -y nginx

# Install SSL (Certbot)
apt install -y certbot python3-certbot-nginx
```

### Step 2: Configure Nginx
```bash
# Create Nginx config
nano /etc/nginx/sites-available/kadai.id

# Paste this config:
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
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable site
ln -s /etc/nginx/sites-available/kadai.id /etc/nginx/sites-enabled/

# Test and reload
nginx -t
systemctl reload nginx
```

### Step 3: Setup SSL Certificate
```bash
certbot certonly --nginx \
    -d kadai.id -d www.kadai.id -d order.kadai.id -d sibos.kadai.id \
    -d kadaipos.id -d www.kadaipos.id -d order.kadaipos.id -d sibos.kadaipos.id
```

### Step 4: Prepare Application on Old VPS
```bash
# On old VPS (72.60.76.34)
cd /path/to/kadaipos
npm run build
tar -czf kadaipos-backup.tar.gz .next/ .env* package.json package-lock.json
```

### Step 5: Transfer Application to New VPS
```bash
# From your local machine or old VPS
scp -r /path/to/kadaipos root@103.175.207.51:/home/kadaipos/

# Or if transferring between VPS:
ssh root@72.60.76.34 "tar -czf kadaipos-backup.tar.gz /path/to/kadaipos"
scp root@72.60.76.34:/root/kadaipos-backup.tar.gz /tmp/
scp /tmp/kadaipos-backup.tar.gz root@103.175.207.51:/home/
```

### Step 6: Setup Application on New VPS
```bash
ssh root@103.175.207.51

# Extract and setup
cd /home
tar -xzf kadaipos-backup.tar.gz
cd kadaipos

# Install dependencies
npm install

# Setup PM2
pm2 start npm --name "kadaipos" -- start
pm2 save
pm2 startup
```

### Step 7: Update DNS Records
Update your domain registrar to point to new IP:
```
kadai.id          A       103.175.207.51
www.kadai.id      A       103.175.207.51
order.kadai.id    A       103.175.207.51
sibos.kadai.id    A       103.175.207.51

# Optional: keep old domains pointed too so redirects work
kadaipos.id       A       103.175.207.51
www.kadaipos.id   A       103.175.207.51
order.kadaipos.id A       103.175.207.51
sibos.kadaipos.id A       103.175.207.51
```

### Step 8: Verify Migration
```bash
# Check if application is running
curl http://103.175.207.51:3000

# Check PM2 status
pm2 status

# Monitor logs
pm2 logs kadaipos
```

### Step 9: Cleanup Old VPS
Once verified on new VPS:
```bash
# On old VPS - backup first!
pm2 stop kadaipos
pm2 delete kadaipos
```

---

## Rollback Plan
If issues occur, revert DNS to old IP (72.60.76.34) and investigate.

---

## Post-Migration Checklist
- [ ] DNS updated and propagated
- [ ] SSL certificate active
- [ ] Application running on PM2
- [ ] Database connection verified
- [ ] Supabase edge functions working
- [ ] Monitor logs for 24 hours
- [ ] Test all functionality (orders, payments, etc.)
