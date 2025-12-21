#!/bin/bash

# VPS Security Audit Script
# Run this on your server to check for security issues

echo "🔍 VPS Security Audit - $(date)"
echo "================================="

echo ""
echo "📊 SYSTEM INFORMATION:"
echo "---------------------"
uname -a
echo "Uptime: $(uptime)"
echo "OS: $(lsb_release -d 2>/dev/null || cat /etc/os-release | grep PRETTY_NAME | cut -d'"' -f2)"

echo ""
echo "👤 USER ACCOUNTS:"
echo "----------------"
echo "Users with shell access:"
awk -F: '$7 !~ /(nologin|false)/ {print $1, $3, $6, $7}' /etc/passwd
echo ""
echo "Sudo users:"
grep -v '^#' /etc/sudoers | grep -v '^$' | head -10

echo ""
echo "🔐 SSH CONFIGURATION:"
echo "-------------------"
echo "SSH Port: $(grep -E '^Port' /etc/ssh/sshd_config || echo '22 (default)')"
echo "PermitRootLogin: $(grep -E '^PermitRootLogin' /etc/ssh/sshd_config || echo 'yes (default)')"
echo "PasswordAuthentication: $(grep -E '^PasswordAuthentication' /etc/ssh/sshd_config || echo 'yes (default)')"
echo "PubkeyAuthentication: $(grep -E '^PubkeyAuthentication' /etc/ssh/sshd_config || echo 'yes (default)')"

echo ""
echo "🔥 FIREWALL STATUS:"
echo "------------------"
if command -v ufw >/dev/null 2>&1; then
    echo "UFW Status:"
    ufw status | head -10
elif command -v firewall-cmd >/dev/null 2>&1; then
    echo "Firewalld Status:"
    firewall-cmd --state
    firewall-cmd --list-all
else
    echo "No firewall detected (iptables):"
    iptables -L -n | head -10
fi

echo ""
echo "📦 RUNNING SERVICES:"
echo "-------------------"
echo "Listening ports:"
netstat -tlnp 2>/dev/null | grep LISTEN | head -10 || ss -tlnp | grep LISTEN | head -10

echo ""
echo "🐧 PROCESSES:"
echo "------------"
echo "Top memory processes:"
ps aux --sort=-%mem | head -10

echo ""
echo "📁 CRON JOBS:"
echo "------------"
echo "Root cron jobs:"
crontab -l 2>/dev/null || echo "No root cron jobs"
echo "System cron jobs:"
ls -la /etc/cron.* 2>/dev/null || echo "No system cron directories"

echo ""
echo "�� LOG ANALYSIS:"
echo "---------------"
echo "Recent authentication failures:"
grep "Failed password\|Invalid user" /var/log/auth.log 2>/dev/null | tail -5 || echo "No auth log available"

echo "Recent SSH connections:"
grep "sshd" /var/log/auth.log 2>/dev/null | grep "Accepted\|Failed" | tail -5 || echo "No SSH log available"

echo ""
echo "🛡️ SECURITY CHECKS:"
echo "------------------"
echo "SUID/SGID files:"
find / -type f \( -perm -4000 -o -perm -2000 \) 2>/dev/null | wc -l | xargs echo "SUID/SGID files found:"

echo "World writable files in /home:"
find /home -type f -perm -002 2>/dev/null | wc -l | xargs echo "World writable files:"

echo "Files with no owner:"
find / -nouser -o -nogroup 2>/dev/null | wc -l | xargs echo "Orphaned files:"

echo ""
echo "📦 PACKAGE UPDATES:"
echo "------------------"
if command -v apt >/dev/null 2>&1; then
    echo "APT updates available:"
    apt list --upgradable 2>/dev/null | wc -l | xargs echo "Packages to update:"
elif command -v yum >/dev/null 2>&1; then
    echo "YUM updates available:"
    yum check-update 2>/dev/null | wc -l | xargs echo "Packages to update:"
fi

echo ""
echo "⚠️  SECURITY RECOMMENDATIONS:"
echo "----------------------------"
echo "1. Change SSH port from 22"
echo "2. Disable root login via SSH"
echo "3. Use key-based authentication only"
echo "4. Install and configure fail2ban"
echo "5. Update all packages"
echo "6. Remove unnecessary services"
echo "7. Check for malware/backdoors"
echo "8. Review user accounts and permissions"
echo "9. Configure proper firewall rules"
echo "10. Set up log monitoring"

echo ""
echo "🔍 Audit completed: $(date)"
echo "================================"
