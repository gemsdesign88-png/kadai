# KadaiPOS VPS Setup & Deployment

**VPS Details:**
- IP: `72.60.76.34`
- OS: Ubuntu (nginx running)
- Status: Ready for deployment

---

## 🚀 One-Time Setup (First Deployment)

### Step 1: SSH into VPS
```bash
ssh root@72.60.76.34
```

### Step 2: Create app directory
```bash
mkdir -p /var/www/kadaipos.id
cd /var/www/kadaipos.id
```

### Step 3: Clone repository
```bash
git clone https://github.com/yourusername/kadaipos.id .
# or copy files via SCP
```

### Step 4: Install Node.js & PM2
```bash
# Check if Node.js is installed
node --version

# If not installed, install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
sudo npm install -g pm2
pm2 startup
pm2 save
```

### Step 5: Install dependencies
```bash
cd /var/www/kadaipos.id
npm install --production
```

### Step 6: Build the app
```bash
npm run build
```

### Step 7: Start with PM2
```bash
pm2 start "npm start" --name "kadaipos" --env production
pm2 save
```

### Step 8: Configure Nginx
```bash
sudo tee /etc/nginx/sites-available/default > /dev/null <<EOF
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF
```

### Step 9: Reload Nginx
```bash
sudo nginx -t
sudo systemctl reload nginx
```

### Step 10: Test deployment
```bash
curl http://localhost:3000
# Should return HTML, not 404
```

✅ **Your app is now live at:** http://72.60.76.34

---

## 📦 Deployment Commands

### Deploy from local machine
```bash
# Make sure deploy-vps.sh is executable
chmod +x deploy-vps.sh

# Run deployment
./deploy-vps.sh
```

### Or manual deployment
```bash
ssh root@72.60.76.34 << 'EOF'
cd /var/www/kadaipos.id
git pull origin main
npm install --production
npm run build
pm2 restart kadaipos
EOF
```

---

## 🔄 Continuous Monitoring

### Set up health checks (on VPS)
```bash
chmod +x /var/www/kadaipos.id/health-check.sh

# Add to crontab (runs every 5 minutes)
(crontab -l 2>/dev/null; echo "*/5 * * * * /var/www/kadaipos.id/health-check.sh") | crontab -
```

### View health logs
```bash
ssh root@72.60.76.34 "tail -f /var/log/kadaipos-health-check.log"
```

---

## 🛠️ Troubleshooting

### App not accessible (still 404)
```bash
# Check if app is running
ssh root@72.60.76.34 "pm2 list"

# Check app logs
ssh root@72.60.76.34 "pm2 logs kadaipos --lines 50"

# Check nginx config
ssh root@72.60.76.34 "sudo nginx -t"

# Restart nginx
ssh root@72.60.76.34 "sudo systemctl restart nginx"
```

### App crashed / High CPU usage
```bash
# SSH to VPS
ssh root@72.60.76.34

# Check process
pm2 status

# Check logs
pm2 logs kadaipos

# Restart
pm2 restart kadaipos

# Full rebuild if needed
cd /var/www/kadaipos.id
git pull origin main
npm install --production
npm run build
pm2 restart kadaipos
```

### Port 3000 already in use
```bash
ssh root@72.60.76.34 "lsof -i :3000"
# Kill the process
ssh root@72.60.76.34 "kill -9 <PID>"
```

### Out of disk space
```bash
ssh root@72.60.76.34 "du -sh /var/www/*"
ssh root@72.60.76.34 "pm2 logs clear"
```

---

## 🔒 Security & Backups

### Enable SSL (if domain configured)
```bash
sudo apt-get install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com
```

### Setup automatic backups
```bash
# Create backup script
ssh root@72.60.76.34 "cat > /var/www/backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/backups"
mkdir -p $BACKUP_DIR
tar -czf $BACKUP_DIR/kadaipos-$(date +%Y%m%d).tar.gz /var/www/kadaipos.id
find $BACKUP_DIR -mtime +7 -delete  # Keep 7 days
EOF"

# Add to crontab (daily at 2 AM)
ssh root@72.60.76.34 "(crontab -l 2>/dev/null; echo '0 2 * * * bash /var/www/backup.sh') | crontab -"
```

---

## 📊 Monitoring Commands

### Check server resources
```bash
ssh root@72.60.76.34 "free -h && df -h && ps aux | head -10"
```

### View PM2 processes
```bash
ssh root@72.60.76.34 "pm2 list"
```

### Monitor in real-time
```bash
ssh root@72.60.76.34 "pm2 monit"
```

### View application logs
```bash
ssh root@72.60.76.34 "pm2 logs kadaipos"
```

### View Nginx logs
```bash
ssh root@72.60.76.34 "sudo tail -f /var/log/nginx/access.log"
ssh root@72.60.76.34 "sudo tail -f /var/log/nginx/error.log"
```

---

## 🚨 Emergency Procedures

### Rollback to previous version
```bash
ssh root@72.60.76.34 << 'EOF'
cd /var/www/kadaipos.id
git log --oneline -5  # See recent commits
git revert HEAD --no-edit  # Revert last commit
npm run build
pm2 restart kadaipos
EOF
```

### Complete reset
```bash
ssh root@72.60.76.34 << 'EOF'
pm2 stop kadaipos
cd /var/www/kadaipos.id
rm -rf node_modules .next package-lock.json
npm install --production
npm run build
pm2 start "npm start" --name "kadaipos"
EOF
```

### View recent errors
```bash
ssh root@72.60.76.34 "journalctl -u nginx -n 50 && pm2 logs kadaipos --lines 50"
```

---

## 📝 Deployment Checklist

Before each deployment:
- [ ] Test locally: `npm run build && npm start`
- [ ] Check git status: `git log -1`
- [ ] Run tests if available
- [ ] Backup database if needed
- [ ] Schedule deployment during off-peak hours
- [ ] Have rollback plan ready

After deployment:
- [ ] Test: `curl http://72.60.76.34`
- [ ] Check logs: `pm2 logs kadaipos`
- [ ] Monitor for 5 minutes
- [ ] Verify health: `ssh root@72.60.76.34 "ps aux | grep node"`

---

## 🔧 Quick Reference

| Task | Command |
|------|---------|
| Deploy | `./deploy-vps.sh` |
| SSH | `ssh root@72.60.76.34` |
| View logs | `ssh root@72.60.76.34 "pm2 logs kadaipos"` |
| Restart | `ssh root@72.60.76.34 "pm2 restart kadaipos"` |
| Stop | `ssh root@72.60.76.34 "pm2 stop kadaipos"` |
| Status | `ssh root@72.60.76.34 "pm2 list"` |
| Health check | `curl http://72.60.76.34` |

---

**Last Updated:** 2025-12-20  
**VPS IP:** 72.60.76.34  
**App Port:** 3000  
**Status:** Ready for deployment
