# KadaiPOS Deployment Guide

## VPS: 72.60.76.34

### Current Status
- Server: Ubuntu with nginx
- Ports: 80 (HTTP), 443 (HTTPS) - Open
- Status: Nginx running but no app deployed (404 error)

---

## Quick Deploy (First Time)

### 1. SSH into VPS
```bash
ssh root@72.60.76.34
```

### 2. Navigate to deployment directory
```bash
cd /var/www
mkdir -p kadaipos.id
cd kadaipos.id
```

### 3. Clone the repository
```bash
git clone <your-repo-url> .
# or if already cloned, pull latest
git pull origin main
```

### 4. Install dependencies
```bash
npm install
```

### 5. Build the Next.js app
```bash
npm run build
```

### 6. Install PM2 (process manager)
```bash
npm install -g pm2
pm2 startup
pm2 save
```

### 7. Start the app with PM2
```bash
pm2 start "npm start" --name "kadaipos" --env production
pm2 save
```

### 8. Configure Nginx (reverse proxy)
```bash
sudo nano /etc/nginx/sites-available/default
```

Replace the entire content with:
```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 9. Test and reload nginx
```bash
sudo nginx -t
sudo systemctl reload nginx
```

### 10. Verify deployment
```bash
curl http://localhost:3000
# Should return HTML, not 404
```

---

## Monitoring & Auto-Restart

### Setup Health Check
```bash
pm2 install pm2-auto-pull
pm2 install pm2-logrotate
```

### Enable PM2 monitoring
```bash
pm2 monit
```

### Check logs
```bash
pm2 logs kadaipos
```

---

## Maintenance Commands

### View running apps
```bash
pm2 list
```

### Restart app
```bash
pm2 restart kadaipos
```

### Stop app
```bash
pm2 stop kadaipos
```

### Update code and restart
```bash
cd /var/www/kadaipos.id
git pull origin main
npm run build
pm2 restart kadaipos
```

### View nginx status
```bash
sudo systemctl status nginx
```

### View nginx logs
```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

---

## Automated Deployment Script

Create `/var/www/kadaipos.id/deploy.sh`:

```bash
#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting deployment...${NC}"

# Pull latest code
echo "📥 Pulling latest code..."
git pull origin main || { echo -e "${RED}❌ Git pull failed${NC}"; exit 1; }

# Install dependencies
echo "📦 Installing dependencies..."
npm install --production || { echo -e "${RED}❌ npm install failed${NC}"; exit 1; }

# Build
echo "🔨 Building..."
npm run build || { echo -e "${RED}❌ Build failed${NC}"; exit 1; }

# Restart app
echo "🔄 Restarting app..."
pm2 restart kadaipos || { echo -e "${RED}❌ PM2 restart failed${NC}"; exit 1; }

# Wait for app to start
sleep 3

# Health check
echo "✅ Health checking..."
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Deployment successful!${NC}"
    echo "📍 App available at: http://72.60.76.34"
else
    echo -e "${RED}❌ Health check failed${NC}"
    pm2 logs kadaipos
    exit 1
fi
```

### Make it executable and set up cron job
```bash
chmod +x /var/www/kadaipos.id/deploy.sh

# Run deploy script daily at 2 AM (auto-pull + rebuild)
crontab -e
# Add: 0 2 * * * /var/www/kadaipos.id/deploy.sh >> /var/log/kadaipos-deploy.log 2>&1
```

---

## Prevention Checklist

✅ **PM2 Auto-Restart**: App automatically restarts on crash
✅ **Systemd Auto-Start**: PM2 starts on server reboot
✅ **Health Monitoring**: Daily cron job verifies app is running
✅ **Log Rotation**: Prevents disk space issues
✅ **Git Auto-Pull**: Daily deployment updates code
✅ **Nginx Reverse Proxy**: Stable web server in front

---

## Troubleshooting

### App not accessible (404)
```bash
# Check if app is running
pm2 list

# Check app logs
pm2 logs kadaipos

# Check nginx is running
sudo systemctl status nginx

# Check nginx config
sudo nginx -t
```

### App crashed
```bash
# Restart
pm2 restart kadaipos

# Check error logs
pm2 logs kadaipos --err

# Check system logs
sudo journalctl -u pm2-root -n 50
```

### Port 3000 already in use
```bash
lsof -i :3000
kill -9 <PID>
```

### Need to rebuild from scratch
```bash
cd /var/www/kadaipos.id
rm -rf node_modules .next
npm install
npm run build
pm2 restart kadaipos
```

---

## Emergency Rollback

If latest deployment breaks:
```bash
cd /var/www/kadaipos.id
git revert HEAD --no-edit
npm run build
pm2 restart kadaipos
```

---

## Next Steps

1. SSH into 72.60.76.34 and run the Quick Deploy steps above
2. Copy `deploy.sh` and set up the cron job
3. Test: Visit http://72.60.76.34 in browser
4. Bookmark these instructions

---

Last Updated: 2025-12-20
