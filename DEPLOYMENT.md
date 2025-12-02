# Deployment Guide for KadaiPOS Website

## Server Requirements

- **Node.js**: 18.x or higher
- **PM2**: For process management
- **Nginx**: For reverse proxy (recommended)
- **SSL Certificate**: For HTTPS (Let's Encrypt recommended)

## Deployment Steps

### 1. Prepare Your Server

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx
```

### 2. Upload Files to Server

```bash
# On your local machine, create a deployment package
cd /Users/gemmyadyendra/Documents/kadaipos.id
tar -czf kadaipos-deploy.tar.gz \
  .next \
  node_modules \
  public \
  package.json \
  package-lock.json \
  ecosystem.config.js \
  .env.production

# Upload to server (replace with your server details)
scp kadaipos-deploy.tar.gz user@your-server:/var/www/kadaipos.id/
```

### 3. Extract and Setup on Server

```bash
# SSH into your server
ssh user@your-server

# Extract files
cd /var/www/kadaipos.id
tar -xzf kadaipos-deploy.tar.gz
rm kadaipos-deploy.tar.gz

# Rename environment file
mv .env.production .env.local

# Set proper permissions
sudo chown -R $USER:$USER /var/www/kadaipos.id
chmod -R 755 /var/www/kadaipos.id
```

### 4. Start Application with PM2

```bash
cd /var/www/kadaipos.id
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 5. Configure Nginx

Create Nginx configuration:

```bash
sudo nano /etc/nginx/sites-available/kadaipos.id
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name kadaipos.id www.kadaipos.id;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/kadaipos.id /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 6. Setup SSL with Let's Encrypt

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d kadaipos.id -d www.kadaipos.id
```

### 7. Update Supabase Settings

In your Supabase dashboard:
1. Go to Authentication → URL Configuration
2. Set **Site URL**: `https://kadaipos.id`
3. Add **Redirect URLs**:
   - `https://kadaipos.id/auth/callback`
   - `https://www.kadaipos.id/auth/callback`

## Quick Deployment Script

Save this as `deploy.sh` on your local machine:

```bash
#!/bin/bash

# Build the application
echo "Building application..."
npm run build

# Create deployment package
echo "Creating deployment package..."
tar -czf kadaipos-deploy.tar.gz \
  .next \
  node_modules \
  public \
  package.json \
  package-lock.json \
  ecosystem.config.js \
  .env.production \
  next.config.ts

# Upload to server (update with your details)
echo "Uploading to server..."
scp kadaipos-deploy.tar.gz user@your-server:/var/www/kadaipos.id/

# Deploy on server
echo "Deploying on server..."
ssh user@your-server << 'EOF'
  cd /var/www/kadaipos.id
  tar -xzf kadaipos-deploy.tar.gz
  rm kadaipos-deploy.tar.gz
  mv .env.production .env.local
  pm2 restart kadaipos-website
  pm2 save
EOF

echo "Deployment complete!"
```

Make it executable:
```bash
chmod +x deploy.sh
```

## Updating the Application

To deploy updates:

```bash
# Run the deployment script
./deploy.sh
```

Or manually:

```bash
# Build locally
npm run build

# Upload and restart
scp -r .next user@your-server:/var/www/kadaipos.id/
ssh user@your-server "cd /var/www/kadaipos.id && pm2 restart kadaipos-website"
```

## PM2 Useful Commands

```bash
# View logs
pm2 logs kadaipos-website

# Monitor
pm2 monit

# Restart
pm2 restart kadaipos-website

# Stop
pm2 stop kadaipos-website

# Delete
pm2 delete kadaipos-website
```

## Troubleshooting

### App not starting
```bash
pm2 logs kadaipos-website --lines 100
```

### Port already in use
```bash
sudo lsof -i :3000
sudo kill -9 <PID>
```

### Permission issues
```bash
sudo chown -R $USER:$USER /var/www/kadaipos.id
```

### Nginx not forwarding
```bash
sudo nginx -t
sudo tail -f /var/log/nginx/error.log
```
