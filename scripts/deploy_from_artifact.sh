#!/usr/bin/env bash
# Run on the target server after extracting the artifact (as root or sudo)
set -euo pipefail

APP_DIR="/var/www/kadaipos"
ARTIFACT_DIR="$PWD"

echo "[+] Deploy helper started"

echo "[+] Creating app dir: $APP_DIR"
mkdir -p "$APP_DIR"
chown "$USER":"$USER" "$APP_DIR" || true

echo "[+] Moving files to $APP_DIR"
cp -r "$ARTIFACT_DIR"/* "$APP_DIR/"
cd "$APP_DIR"

echo "[+] Installing Node.js 20 (Nodesource) and build tools"
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs build-essential || true

echo "[+] Installing pm2 globally"
npm install -g pm2 || true

echo "[+] Installing production dependencies"
npm ci --production

echo "[+] Starting app with pm2"
pm2 stop kadaipos || true
pm2 start npm --name kadaipos -- run start
pm2 save

echo "[+] Enable firewall (ufw) and basic rules"
apt-get install -y ufw fail2ban || true
ufw allow OpenSSH || true
ufw allow http || true
ufw allow https || true
ufw --force enable || true

echo "[+] Deployment finished. Check logs with: pm2 logs kadaipos"

exit 0
