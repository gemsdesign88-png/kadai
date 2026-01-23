# 🚀 Kadai VPS Migration - Manual Deployment Guide

**New VPS Details:**
- IP Address: `103.175.207.51`
- Hostname: `srv123.kadaipos.id`
- Root Password: Check secure note
- OS: Ubuntu 22.04

---

## 📋 Quick Start (Copy & Paste Commands)

### Step 1: SSH into New VPS
```bash
ssh root@103.175.207.51
# Password: kadaiPOS12345@@@
```

### Step 2: Install Dependencies
```bash
apt update && apt install -y nodejs npm nginx certbot python3-certbot-nginx
npm install -g pm2
mkdir -p /home/kadaipos
```

### Step 3: Download & Extract Application (From Local Machine)
```bash
# On your local machine:
cd /Users/gemmyadyendra/Documents/kadaipos.id
tar -czf kadaipos-prod.tar.gz .next .env.production package.json package-lock.json public next.config.js tsconfig.json
scp kadaipos-prod.tar.gz root@103.175.207.51:/home/kadaipos/
```

### Step 4: Extract & Install on VPS
```bash
# Back on VPS:
cd /home/kadaipos
tar -xzf kadaipos-prod.tar.gz
npm install --production
```

### Step 5: Configure Nginx
```bash
cat > /etc/nginx/sites-available/kadai.id << 'EOF'
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
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

ln -sf /etc/nginx/sites-available/kadai.id /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### Step 6: Setup SSL Certificate
```bash
certbot certonly --nginx \
    -d kadai.id -d www.kadai.id -d order.kadai.id -d sibos.kadai.id \
    -d kadaipos.id -d www.kadaipos.id -d order.kadaipos.id -d sibos.kadaipos.id \
    --non-interactive --agree-tos -m admin@kadaipos.id
```

### Step 7: Start Application with PM2
```bash
cd /home/kadaipos
pm2 start npm --name "kadaipos" -- start
pm2 save
pm2 startup
pm2 status
```

### Step 8: View Logs
```bash
pm2 logs kadaipos
```

### Step 9: Verify Application
```bash
# On your local machine:
curl -s http://103.175.207.51:3000 | head -n 20
```

---

## ✅ Verification Checklist

- [ ] SSH connection works: `ssh root@103.175.207.51`
- [ ] Node.js installed: `node --version`
- [ ] PM2 installed: `pm2 --version`
- [ ] Application running: `pm2 status` shows "online"
- [ ] Nginx running: `systemctl status nginx`
- [ ] Application responds: `curl http://103.175.207.51:3000`
- [ ] SSL certificate installed: `certbot certificates`

---

## 🌐 Update DNS Records

Update your domain registrar with these A records:
```
kadai.id          → 103.175.207.51
www.kadai.id      → 103.175.207.51
order.kadai.id    → 103.175.207.51
sibos.kadai.id    → 103.175.207.51

# Optional: keep old domains pointed too so redirects work
kadaipos.id       → 103.175.207.51
www.kadaipos.id   → 103.175.207.51
order.kadaipos.id → 103.175.207.51
sibos.kadaipos.id → 103.175.207.51
```

DNS propagation: 24-48 hours (usually faster)

---

## 🔧 Useful Commands

```bash
# View application logs
pm2 logs kadaipos

# Restart application
pm2 restart kadaipos

# Stop application
pm2 stop kadaipos

# Check Nginx status
systemctl status nginx

# View SSL certificate info
certbot certificates

# Renew SSL certificates
certbot renew --dry-run

# SSH into VPS
ssh root@103.175.207.51
```

---

## 📦 Pre-built Deployment Package

A tar.gz file is ready at:
`/Users/gemmyadyendra/Documents/kadaipos.id/kadaipos-prod.tar.gz`

Contains:
- `.next/` - Built Next.js application
- `.env.production` - Production environment variables
- `package.json` & `package-lock.json`
- `public/` - Static files
- Configuration files

---

## 🆘 Troubleshooting

**Application not starting:**
```bash
pm2 logs kadaipos  # Check error logs
pm2 restart kadaipos
```

**Nginx error:**
```bash
nginx -t  # Test configuration
systemctl restart nginx
```

**SSL certificate issues:**
```bash
certbot renew --force-renewal
```

**Port 3000 not responding:**
```bash
lsof -i :3000  # Check what's on port 3000
```

---

## ⏱️ Estimated Timeline

- Installation: ~5 minutes
- Upload package: ~1-2 minutes (29MB)
- Extract & install: ~2 minutes
- SSL certificate: ~1 minute
- Total: ~10 minutes

---

**Status: Ready for manual deployment** ✅

The application is built and packaged. Follow the steps above to get your site live on the new VPS.
