#!/usr/bin/env bash
# VPS cleanup and scan helper
# Usage: copy this script to the VPS and run with sudo: sudo bash vps_cleanup_and_scan.sh

set -euo pipefail

LOG_DIR="/var/log/kadai_cleanup"
mkdir -p "$LOG_DIR"

echo "[+] Stopping web processes and nginx (if present)" | tee "$LOG_DIR/cleanup.log"
pm2 stop all 2>/dev/null || true
pkill -f 'node' 2>/dev/null || true
systemctl stop nginx 2>/dev/null || true

echo "[+] Updating package lists" | tee -a "$LOG_DIR/cleanup.log"
apt-get update -y >> "$LOG_DIR/apt_update.log" 2>&1 || true

echo "[+] Installing scanners and tools" | tee -a "$LOG_DIR/cleanup.log"
apt-get install -y clamav rkhunter chkrootkit lsof git unzip curl sudo net-tools rsync fail2ban ufw >> "$LOG_DIR/apt_install.log" 2>&1 || true

echo "[+] Updating ClamAV DB" | tee -a "$LOG_DIR/cleanup.log"
freshclam >> "$LOG_DIR/freshclam.log" 2>&1 || true

echo "[+] Running ClamAV recursive scan (may take long). Output will be saved to $LOG_DIR/clamscan.log" | tee -a "$LOG_DIR/cleanup.log"
# Exclude proc/sys to avoid noise; adjust paths for your app
clamscan -r --bell -i / --exclude-dir="^/proc" --exclude-dir="^/sys" --exclude-dir="/dev" > "$LOG_DIR/clamscan.log" 2>&1 || true

echo "[+] Running rkhunter and chkrootkit" | tee -a "$LOG_DIR/cleanup.log"
rkhunter --update >> "$LOG_DIR/rkhunter_update.log" 2>&1 || true
rkhunter --check --sk >> "$LOG_DIR/rkhunter_check.log" 2>&1 || true
chkrootkit > "$LOG_DIR/chkrootkit.log" 2>&1 || true

echo "[+] Capturing top processes and network connections" | tee -a "$LOG_DIR/cleanup.log"
ps aux --sort=-%cpu | head -n 50 > "$LOG_DIR/top_processes.log"
ss -tunap > "$LOG_DIR/network_sockets.log" 2>&1 || netstat -tunap > "$LOG_DIR/network_sockets.log" 2>&1 || true

echo "[+] Collecting recent cron jobs and system timers" | tee -a "$LOG_DIR/cleanup.log"
crontab -l > "$LOG_DIR/crontab_root.log" 2>&1 || true
ls -la /etc/cron.* > "$LOG_DIR/cron_dirs.log" 2>&1 || true
systemctl list-timers --all > "$LOG_DIR/system_timers.log" 2>&1 || true

echo "[+] Checking for unexpected startup entries and services" | tee -a "$LOG_DIR/cleanup.log"
systemctl list-unit-files --state=enabled > "$LOG_DIR/enabled_services.log" 2>&1 || true

echo "[+] Finding recently modified files under /var/www and web root (last 7 days)" | tee -a "$LOG_DIR/cleanup.log"
find /var/www -type f -mtime -7 -ls > "$LOG_DIR/modified_www.log" 2>&1 || true

echo "[+] Gathering git status for app directory if exists" | tee -a "$LOG_DIR/cleanup.log"
if [ -d "/var/www/app" ]; then
  cd /var/www/app || true
  git status --porcelain > "$LOG_DIR/git_status_app.log" 2>&1 || true
  git rev-parse --abbrev-ref HEAD > "$LOG_DIR/git_branch.log" 2>&1 || true
fi

echo "[+] Recommendation: If any scanner reports malware or unexpected persistent processes, restore from a known-clean snapshot or reinstall OS." | tee -a "$LOG_DIR/cleanup.log"
echo "[+] After cleanup: rotate all secrets, revoke old SSH keys, and redeploy from a clean source repository." | tee -a "$LOG_DIR/cleanup.log"

echo "[+] Enabling basic firewall and fail2ban (if installed)" | tee -a "$LOG_DIR/cleanup.log"
ufw allow OpenSSH || true
ufw allow http || true
ufw allow https || true
ufw --force enable || true
systemctl enable fail2ban || true
systemctl restart fail2ban || true

echo "[+] Packaging logs for download" | tee -a "$LOG_DIR/cleanup.log"
tar -czf /tmp/kadai_cleanup_logs.tar.gz -C "$LOG_DIR" . || true

echo "[+] Completed scan. Logs archived to /tmp/kadai_cleanup_logs.tar.gz. Review before taking further actions." | tee -a "$LOG_DIR/cleanup.log"

echo "Notes:
- This script is a helper and does not guarantee full remediation.
- Best practice: provision a fresh server image, deploy from git origin, rotate secrets, and close the compromised machine.
" | tee -a "$LOG_DIR/cleanup.log"

exit 0
