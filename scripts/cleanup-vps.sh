#!/bin/bash

# VPS Cleanup Script for CVE-2025-55182 aftermath
# Run this on your VPS server

echo "🔍 Starting VPS malware scan and cleanup..."
echo "================================================"

# 1. Check for suspicious processes (cryptominers usually have high CPU)
echo ""
echo "📊 Top CPU-consuming processes:"
ps aux --sort=-%cpu | head -20

echo ""
echo "🔍 Looking for suspicious processes (common miner names):"
ps aux | grep -iE "(xmrig|minerd|kdevtmpfsi|kinsing|cryptonight|stratum|pool\.|nanopool|minexmr)" | grep -v grep

# 2. Check for suspicious cron jobs
echo ""
echo "📅 Checking cron jobs:"
echo "--- System crontab ---"
cat /etc/crontab 2>/dev/null
echo ""
echo "--- User crontabs ---"
for user in $(cut -f1 -d: /etc/passwd); do
    crontab -l -u $user 2>/dev/null && echo "[$user's crontab]"
done

echo ""
echo "--- /etc/cron.d/ ---"
ls -la /etc/cron.d/ 2>/dev/null

# 3. Check for unauthorized SSH keys
echo ""
echo "🔑 Checking SSH authorized_keys:"
cat ~/.ssh/authorized_keys 2>/dev/null
cat /root/.ssh/authorized_keys 2>/dev/null

# 4. Check for suspicious files in /tmp and /var/tmp
echo ""
echo "📁 Suspicious files in /tmp:"
find /tmp -type f -executable 2>/dev/null
find /tmp -name "*.sh" 2>/dev/null

echo ""
echo "📁 Suspicious files in /var/tmp:"
find /var/tmp -type f -executable 2>/dev/null
find /var/tmp -name "*.sh" 2>/dev/null

# 5. Check systemd services for suspicious entries
echo ""
echo "⚙️ Recent/suspicious systemd services:"
systemctl list-units --type=service --state=running | grep -v "systemd\|ssh\|network\|cron\|docker\|nginx\|node\|pm2"

# 6. Check for processes running from /tmp or unusual locations
echo ""
echo "🔍 Processes running from suspicious locations:"
ls -la /proc/*/exe 2>/dev/null | grep -E "tmp|dev/shm|var/tmp"

# 7. Network connections - check for outbound connections to mining pools
echo ""
echo "🌐 Active network connections (looking for suspicious ports):"
netstat -tulpn 2>/dev/null | grep -v "127.0.0.1\|::1" || ss -tulpn 2>/dev/null | grep -v "127.0.0.1\|::1"

echo ""
echo "================================================"
echo "🛡️ CLEANUP STEPS:"
echo "================================================"
echo ""
echo "1. Kill suspicious processes:"
echo "   sudo kill -9 <PID>"
echo ""
echo "2. Remove suspicious cron jobs:"
echo "   sudo crontab -r"
echo "   sudo rm /etc/cron.d/<suspicious-file>"
echo ""
echo "3. Clean temp directories:"
echo "   sudo rm -rf /tmp/*"
echo "   sudo rm -rf /var/tmp/*"
echo ""
echo "4. Restart your app cleanly:"
echo "   cd /path/to/kadaipos.id"
echo "   rm -rf node_modules .next"
echo "   npm install"
echo "   npm run build"
echo "   pm2 restart all"
echo ""
echo "5. Consider reinstalling VPS if heavily compromised"
echo ""
echo "================================================"
echo "✅ Scan complete!"
