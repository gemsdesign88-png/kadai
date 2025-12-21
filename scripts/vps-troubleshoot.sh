#!/usr/bin/env bash
# Simple VPS troubleshooting wrapper for KadaiPOS
# Usage: ./scripts/vps-troubleshoot.sh root@72.60.76.34

set -euo pipefail

if [ "$#" -lt 1 ]; then
  echo "Usage: $0 user@host [ssh-port]"
  echo "Example: $0 root@72.60.76.34 22"
  exit 1
fi

TARGET="$1"
PORT="${2:-22}"

SSH_OPTS="-p $PORT -o StrictHostKeyChecking=no -o ConnectTimeout=10"

echo "Running checks against: $TARGET (port $PORT)"

run_remote() {
  echo "---- $1 ----"
  ssh $SSH_OPTS "$TARGET" "bash -s" <<'REMOTE'
  set -euo pipefail
  echo "[date] $(date)"
  echo "--- pm2 list ---"
  pm2 list || true
  echo "--- pm2 status (kadaipos) ---"
  pm2 status kadaipos-website || pm2 status || true
  echo "--- processes (node, next) ---"
  ps aux | egrep 'node|next' | egrep -v 'egrep' || true
  echo "--- listening ports (3000) ---"
  if command -v ss >/dev/null 2>&1; then
    ss -ltnp | egrep ':3000\s' || true
  else
    netstat -ltnp | egrep ':3000\s' || true
  fi
  echo "--- try local curl to Next.js (127.0.0.1:3000) ---"
  curl -sfS -I http://127.0.0.1:3000/ || echo "no response from 127.0.0.1:3000"
  echo "--- tail pm2 logs (last 200 lines) ---"
  pm2 logs kadaipos-website --lines 200 || true
  echo "--- tail nginx error log (last 200 lines) ---"
  sudo tail -n 200 /var/log/nginx/error.log || true
  echo "--- nginx config test ---"
  sudo nginx -t || true
REMOTE
}

attempt_fix() {
  echo "Attempting to restart app and nginx..."
  ssh $SSH_OPTS "$TARGET" "bash -s" <<'REMOTE'
  set -euo pipefail
  echo "Stopping existing pm2 process (if any)"
  pm2 delete kadaipos-website 2>/dev/null || true
  if [ -f ~/kadaipos.id/ecosystem.config.js ]; then
    cd ~/kadaipos.id
    echo "Installing production deps (npm ci --omit=dev)"
    npm ci --omit=dev
    pm2 start ecosystem.config.js --name kadaipos-website || pm2 start npm --name kadaipos-website -- start
  else
    echo "ecosystem.config.js not found in ~/kadaipos.id — attempting start with npm start if package.json present"
    if [ -f ~/kadaipos.id/package.json ]; then
      cd ~/kadaipos.id
      npm ci --omit=dev
      pm2 start npm --name kadaipos-website -- start
    fi
  fi
  echo "Reloading nginx"
  sudo systemctl reload nginx || sudo service nginx reload || true
  echo "Done restart attempts"
REMOTE
}

echo "Collecting diagnostics (this may ask for your SSH password)..."
run_remote "diagnostics"

read -p "Attempt automated restart of app + nginx? (y/N) " -r
if [[ "$REPLY" =~ ^[Yy]$ ]]; then
  attempt_fix
  echo "Waiting 2s and re-running diagnostics..."
  sleep 2
  run_remote "post-restart diagnostics"
else
  echo "Skipping automated restart. See diagnostics output above."
fi

echo "Local check: attempt to curl the public site (may return 502 if nginx still misconfigured)"
curl -I --max-time 10 https://kadaipos.id || true

echo "Script finished. Review output above for errors."
