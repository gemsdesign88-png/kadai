# 🚀 DEPLOY NOW - 3 SIMPLE OPTIONS

## Status Check
- VPS IP: **72.60.76.34** ✅ (Online)
- Ports: 80 (HTTP) ✅, 443 (HTTPS) ✅  
- Nginx: Running ✅
- App: Not deployed yet ❌ (Need to fix)

---

## 🎯 OPTION 1: Fully Automated (Recommended)

### Step 1: SSH to VPS
```bash
ssh root@72.60.76.34
```

### Step 2: Run complete deployment
```bash
bash -s < <(curl -s https://raw.githubusercontent.com/YOUR_USERNAME/kadaipos.id/main/DEPLOY_COMPLETE.sh)
```

Or if you have the file locally:
```bash
# From your local machine:
scp DEPLOY_COMPLETE.sh root@72.60.76.34:/tmp/
ssh root@72.60.76.34 'bash /tmp/DEPLOY_COMPLETE.sh'
```

### Result:
✅ App deployed  
✅ Running on port 3000  
✅ Nginx reverse proxy configured  
✅ Health checks enabled (every 5 min)  
✅ Auto-restart on crash  

**Check it:** `curl http://72.60.76.34` should return HTML

---

## 🎯 OPTION 2: Step-by-Step (More Control)

### Step 1: SSH to VPS
```bash
ssh root@72.60.76.34
```

### Step 2: Copy-paste commands section by section

**Setup System:**
```bash
apt-get update -y && apt-get upgrade -y
apt-get install -y curl git nginx nodejs npm
npm install -g pm2
```

**Deploy Code:**
```bash
cd /var/www
git clone https://github.com/YOUR_USERNAME/kadaipos.id.git
cd kadaipos.id
npm install --production
npm run build
```

**Start App:**
```bash
pm2 start npm --name kadaipos -- start -- --hostname 127.0.0.1 --port 3000
pm2 save
pm2 startup -u root --hp /root
```

**Configure Nginx:**
```bash
# Copy the nginx config from NGINX_CONFIG.txt and save to:
# /etc/nginx/sites-available/kadaipos.id

nginx -t && systemctl reload nginx
```

**Enable Health Checks:**
```bash
# Copy health-check.sh to /usr/local/bin/kadaipos-health-check
chmod +x /usr/local/bin/kadaipos-health-check
(crontab -l 2>/dev/null | grep -v kadaipos-health-check; echo "*/5 * * * * /usr/local/bin/kadaipos-health-check") | crontab -
```

---

## 🎯 OPTION 3: From Your Local Machine (SCP + SSH)

```bash
# From /Users/gemmyadyendra/Documents/kadaipos.id:

# 1. Copy deployment script to VPS
scp DEPLOY_COMPLETE.sh root@72.60.76.34:/tmp/

# 2. Execute on VPS
ssh root@72.60.76.34 'bash /tmp/DEPLOY_COMPLETE.sh'

# 3. Verify
curl http://72.60.76.34

# 4. Monitor
ssh root@72.60.76.34 'pm2 list'
```

---

## ✅ Verification Checklist

After deployment, verify:
- [ ] SSH works: `ssh root@72.60.76.34 'echo OK'`
- [ ] Node/NPM: `ssh root@72.60.76.34 'node --version && npm --version'`
- [ ] PM2: `ssh root@72.60.76.34 'pm2 list'`
- [ ] App running: `ssh root@72.60.76.34 'curl http://127.0.0.1:3000' | head -5`
- [ ] Public access: `curl http://72.60.76.34` (returns HTML, not 404)
- [ ] Health check: `ssh root@72.60.76.34 'crontab -l' | grep health`

---

## 📊 Monitor Your App

```bash
# Real-time status
ssh root@72.60.76.34 'pm2 list'

# View app logs
ssh root@72.60.76.34 'pm2 logs kadaipos'

# Health check logs
ssh root@72.60.76.34 'tail -f /var/log/kadaipos-health-check.log'

# Monitor resources
ssh root@72.60.76.34 'pm2 monit'
```

---

## 🔄 Update Your App

After pushing new code:

```bash
# Option 1: Automatic (GitHub Actions - if configured)
git push origin main
# App deploys automatically

# Option 2: Manual
ssh root@72.60.76.34 'cd /var/www/kadaipos.id && git pull && npm install --production && npm run build && pm2 restart kadaipos'

# Option 3: Use script
./deploy-vps.sh
```

---

## 🆘 Troubleshooting

### Can't access http://72.60.76.34
```bash
# Check if app is running
ssh root@72.60.76.34 'pm2 list'

# If not running, start it
ssh root@72.60.76.34 'pm2 start kadaipos'

# Check logs
ssh root@72.60.76.34 'pm2 logs kadaipos'

# Check port
ssh root@72.60.76.34 'netstat -tlnp | grep 3000'
```

### Getting 502 Bad Gateway
```bash
# Nginx can't reach app
ssh root@72.60.76.34 'curl http://127.0.0.1:3000'

# If fails, restart app
ssh root@72.60.76.34 'pm2 restart kadaipos'

# Check nginx config
ssh root@72.60.76.34 'nginx -t'
```

### App crashes
```bash
# Check health logs (why it crashed)
ssh root@72.60.76.34 'tail -50 /var/log/kadaipos-health-check.log'

# View app error logs
ssh root@72.60.76.34 'pm2 logs kadaipos --lines 100'

# Try manual start to see error
ssh root@72.60.76.34 'cd /var/www/kadaipos.id && npm start'
```

---

## 🛡️ What's Protected

Your deployment now has:
✅ **Auto-restart** - PM2 restarts crashed app  
✅ **Health checks** - Every 5 minutes  
✅ **Auto-recovery** - 3-level recovery system  
✅ **Logging** - All issues logged  
✅ **Monitoring** - Full PM2 monitoring  

### Recovery Flow:
```
App down?
  ↓
Health check detects (within 5 min)
  ↓
Level 1: Restart process (usually works)
  ↓
Level 2: Full rebuild if restart fails
  ↓
Level 3: Log critical error if recovery fails
```

---

## 📝 Next: GitHub Actions CI/CD

Want automatic deployment when you push code?

```bash
# 1. Create SSH key for GitHub Actions
ssh-keygen -t ed25519 -f ~/.ssh/vps_deploy -N ""

# 2. Add to VPS
ssh-copy-id -i ~/.ssh/vps_deploy.pub root@72.60.76.34

# 3. Add to GitHub Secrets:
#    - Go to Settings → Secrets → New secret
#    - Name: VPS_SSH_KEY
#    - Value: (contents of ~/.ssh/vps_deploy)

# 4. GitHub Actions now deploys automatically on push!
git push origin main
```

---

## 🎉 You're Ready!

Pick an option above and deploy. Your app will be live in minutes!

**Questions?** Check these files:
- `DEPLOYMENT_GUIDE.md` - Detailed reference
- `VPS_SETUP.md` - Complete setup guide
- `health-check.sh` - Auto-recovery logic
- `.github/workflows/deploy.yml` - CI/CD config

---

**Made:** December 20, 2025  
**Server:** 72.60.76.34  
**Status:** Ready to deploy ✅
