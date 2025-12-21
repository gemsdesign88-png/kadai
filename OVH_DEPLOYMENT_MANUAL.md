# KadaiPOS Deployment to OVH VPS - Manual Setup Guide

## VPS Details
- **IP:** 51.79.160.148
- **Hostname:** vps-05bec1b7.vps.ovh.ca
- **OS:** Ubuntu 24.04
- **Username:** ubuntu
- **Initial Password:** 4GTvjPrCwRZZ

---

## Step 1: Change Password (First Login)

The password is expired and requires a change on first login.

**Using SSH Client:**
```bash
ssh ubuntu@51.79.160.148
# It will force you to change password
# Old password: 4GTvjPrCwRZZ
# New password: (type new password)
# Confirm: (repeat new password)
```

**Or use OVH Web Console to change password first**

---

## Step 2: Upload Application Package

Once password is changed, upload from your local machine:

```bash
scp kadaipos-prod.tar.gz ubuntu@51.79.160.148:/home/ubuntu/
```

---

## Step 3: Connect to VPS

```bash
ssh ubuntu@51.79.160.148
```

---

## Step 4: Deploy Application

Once connected to VPS, run:

```bash
cd /home/ubuntu

# Extract the package
tar -xzf kadaipos-prod.tar.gz

# Update system
sudo apt-get update -y
sudo apt-get install -y nodejs npm

# Install PM2
sudo npm install -g pm2

# Install dependencies
npm install --production

# Start application
pm2 start "npm start" --name "kadaipos"
pm2 save
sudo pm2 startup
```

---

## Step 5: Verify Application

```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs kadaipos

# Test HTTP
curl http://localhost:3000
```

---

## Step 6: Update DNS

Point your domain registrar to: **51.79.160.148**

```
kadaipos.id → 51.79.160.148
www.kadaipos.id → 51.79.160.148
```

---

## Next Steps After Deployment

### 1. Setup Nginx Reverse Proxy (Optional but Recommended)

```bash
sudo apt-get install -y nginx

# Create config
sudo tee /etc/nginx/sites-available/kadaipos > /dev/null << 'NGINX'
server {
    listen 80;
    server_name _;
    
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

# Enable the site
sudo ln -s /etc/nginx/sites-available/kadaipos /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 2. Setup SSL/HTTPS (Recommended)

```bash
sudo apt-get install -y certbot python3-certbot-nginx

sudo certbot --nginx -d kadaipos.id -d www.kadaipos.id
```

### 3. Monitor Application

```bash
# Check status
pm2 status

# View real-time logs
pm2 logs kadaipos --follow

# Restart if needed
pm2 restart kadaipos
```

---

## Troubleshooting

### App not responding
```bash
pm2 logs kadaipos
pm2 restart kadaipos
```

### Port already in use
```bash
sudo lsof -i :3000
pm2 kill
pm2 restart kadaipos
```

### Database connection issues
Check `.env.production` has correct Supabase credentials

---

## SSH Access Summary

```
Host: 51.79.160.148
User: ubuntu
Port: 22
```

---

**Application Status:**
✅ Package ready: kadaipos-prod.tar.gz (29MB)
✅ Deployment instructions prepared
⏳ Ready to deploy once password is changed

