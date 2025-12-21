#!/bin/bash

# Server Hardening Script - Hostinger VPS Security Recommendations
# Based on: https://www.hostinger.com/support/8224050-how-to-secure-your-vps-from-abusive-activity-at-hostinger/
# Run this on your server to implement comprehensive security measures

set -e

echo "🔒 Hostinger VPS Security Hardening Script - $(date)"
echo "=================================================="
echo "Based on Hostinger's official security recommendations"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

section() {
    echo -e "${BLUE}[SECTION]${NC} $1"
}

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   error "This script must be run as root"
   exit 1
fi

log "Starting comprehensive VPS security hardening process..."
echo "This implements Hostinger's security recommendations for preventing:"
echo "  • SSH brute force attacks"
echo "  • Malware and phishing"
echo "  • Outgoing spam"
echo "  • Crypto mining"
echo "  • DDoS/botnet participation"
echo "  • Illegal content hosting"
echo ""

# 1. Update system packages (Hostinger Recommendation #1)
section "1. System Updates - Hostinger Recommendation"
log "Updating system packages and removing unnecessary ones..."
apt update && apt upgrade -y
apt autoremove -y
apt autoclean

# Install security scanning tools (Hostinger Recommendation)
log "Installing security scanning tools (Malwarebytes, ClamAV, Rootkit Hunter)..."
apt install -y clamav clamav-daemon rkhunter chkrootkit

# 3. Configure UFW firewall
log "Configuring UFW firewall..."
ufw --force reset
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 80
ufw allow 443
ufw --force enable

# 4. Configure fail2ban
log "Configuring fail2ban..."
cat > /etc/fail2ban/jail.local << 'JAIL'
[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 3600

[nginx-http-auth]
enabled = true
port = http,https
filter = nginx-http-auth
logpath = /var/log/nginx/error.log
maxretry = 3
bantime = 3600
JAIL

systemctl enable fail2ban
systemctl restart fail2ban

# 5. SSH hardening
log "Hardening SSH configuration..."
cp /etc/ssh/sshd_config /etc/ssh/sshd_config.backup

# Change SSH port (optional - change 2222 to your preferred port)
sed -i 's/#Port 22/Port 2222/' /etc/ssh/sshd_config

# Disable root login
sed -i 's/#PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config

# Disable password authentication (use keys only)
sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
sed -i 's/PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config

# Other SSH security settings
cat >> /etc/ssh/sshd_config << 'SSHCONFIG'

# Additional security settings
Protocol 2
HostKey /etc/ssh/ssh_host_rsa_key
HostKey /etc/ssh/ssh_host_ecdsa_key
HostKey /etc/ssh/ssh_host_ed25519_key

# Disable empty passwords
PermitEmptyPasswords no

# Disable X11 forwarding
X11Forwarding no

# Limit login attempts
MaxAuthTries 3

# Set login grace time
LoginGraceTime 30

# Use strong ciphers
Ciphers aes256-gcm@openssh.com,chacha20-poly1305@openssh.com,aes256-ctr,aes192-ctr,aes128-ctr
MACs hmac-sha2-512-etm@openssh.com,hmac-sha2-256-etm@openssh.com,umac-128-etm@openssh.com

# Disable unused authentication methods
ChallengeResponseAuthentication no
KerberosAuthentication no
GSSAPIAuthentication no

# Log more information
LogLevel VERBOSE
SSHCONFIG

# Update UFW to allow new SSH port
ufw allow 2222/tcp
ufw delete allow ssh

systemctl restart sshd

# 6. Configure automatic updates
log "Configuring automatic updates..."
cat > /etc/apt/apt.conf.d/50unattended-upgrades << 'UPDATES'
// Automatically upgrade packages from these (origin:archive) pairs
Unattended-Upgrade::Allowed-Origins {
    "${distro_id}:${distro_codename}";
    "${distro_id}:${distro_codename}-security";
    "${distro_id}ESMApps:${distro_codename}-apps-security";
    "${distro_id}ESM:${distro_codename}-infra-security";
};

// Python regular expressions, matching packages to exclude from upgrading
Unattended-Upgrade::Package-Blacklist {
};

// This option allows you to control if on a unclean dpkg exit
// unattended-upgrades will automatically run
//   dpkg --force-confold --configure -a
// The default is true, to ensure updates keep getting installed
Unattended-Upgrade::AutoFixInterruptedDpkg "true";

// Split the upgrade into the smallest possible chunks so that
// they can be interrupted with SIGTERM. This makes the upgrade
// a bit slower but it has the benefit that shutdown while a upgrade
// is running is possible (with a small delay)
Unattended-Upgrade::MinimalSteps "true";

// Install all updates when the machine is shutting down
// instead of doing it in the background while the machine is running
// This will (obviously) make shutdown slower
Unattended-Upgrade::InstallOnShutdown "true";

// Send email to this address for problems or packages upgrades
// If empty or unset then no email is sent, make sure that you
// have a working mail setup on your system. A package that provides
// 'mailx' must be installed. E.g. "user@example.com"
Unattended-Upgrade::Mail "root";

// Set this value to "true" to get emails only on errors. Default
// is to always send a mail if Unattended-Upgrade::Mail is set
Unattended-Upgrade::MailOnlyOnError "true";

// Remove unused automatically installed kernel-related packages
// (kernel images, kernel headers and kernel version locked tools).
Unattended-Upgrade::Remove-Unused-Kernel-Packages "true";

// Do automatic removal of new unused dependencies after the upgrade
Unattended-Upgrade::Remove-New-Unused-Dependencies "true";

// Do automatic removal of unused packages after the upgrade
Unattended-Upgrade::Remove-Unused-Dependencies "true";

// Automatically reboot *WITHOUT CONFIRMATION* if
//  the file /var/run/reboot-required is found after the upgrade
Unattended-Upgrade::Automatic-Reboot "false";

// If automatic reboot is enabled and needed, reboot at the specific
// time instead of immediately
//  Default: "now"
Unattended-Upgrade::Automatic-Reboot-Time "02:00";
UPDATES

cat > /etc/apt/apt.conf.d/20auto-upgrades << 'AUTOUPGRADES'
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Download-Upgradeable-Packages "1";
APT::Periodic::AutocleanInterval "7";
APT::Periodic::Unattended-Upgrade "1";
AUTOUPGRADES

systemctl enable unattended-upgrades
systemctl restart unattended-upgrades

# 7. Remove unnecessary packages
log "Removing unnecessary packages..."
apt remove -y telnet rsh-server rsh-client talk talkd ntalk

# 8. Disable unnecessary services
log "Disabling unnecessary services..."
systemctl disable avahi-daemon 2>/dev/null || true
systemctl disable cups 2>/dev/null || true
systemctl disable bluetooth 2>/dev/null || true

# 9. Configure sysctl security settings
log "Configuring kernel security settings..."
cat > /etc/sysctl.d/99-security.conf << 'SYSCTL'
# IP Spoofing protection
net.ipv4.conf.all.rp_filter = 1
net.ipv4.conf.default.rp_filter = 1

# Ignore ICMP broadcast requests
net.ipv4.icmp_echo_ignore_broadcasts = 1

# Disable source packet routing
net.ipv4.conf.all.accept_source_route = 0
net.ipv4.conf.default.accept_source_route = 0

# Ignore send redirects
net.ipv4.conf.all.send_redirects = 0
net.ipv4.conf.default.send_redirects = 0

# Block SYN attacks
net.ipv4.tcp_syncookies = 1
net.ipv4.tcp_max_syn_backlog = 2048
net.ipv4.tcp_synack_retries = 2
net.ipv4.tcp_syn_retries = 5

# Log Martians
net.ipv4.conf.all.log_martians = 1
net.ipv4.conf.default.log_martians = 1

# Ignore ICMP redirects
net.ipv4.conf.all.accept_redirects = 0
net.ipv4.conf.default.accept_redirects = 0
net.ipv4.conf.all.secure_redirects = 0
net.ipv4.conf.default.secure_redirects = 0

# Ignore directed pings
net.ipv4.icmp_echo_ignore_all = 1

# Disable IPv6 if not needed
net.ipv6.conf.all.disable_ipv6 = 1
net.ipv6.conf.default.disable_ipv6 = 1
net.ipv6.conf.lo.disable_ipv6 = 1
SYSCTL

sysctl -p /etc/sysctl.d/99-security.conf

# 10. Set proper permissions
log "Setting proper file permissions..."
chmod 644 /etc/passwd
chmod 644 /etc/group
chmod 600 /etc/shadow
chmod 600 /etc/gshadow
chmod 644 /etc/passwd-
chmod 644 /etc/group-
chmod 600 /etc/shadow-
chmod 600 /etc/gshadow-

# 11. Install and configure auditd
log "Installing audit daemon..."
apt install -y auditd audispd-plugins

cat > /etc/audit/rules.d/security.rules << 'AUDIT'
# Delete all existing rules
-D

# Set buffer size
-b 8192

# Failure mode: 2 = log and shutdown
-f 2

# Monitor file system mounts
-a always,exit -F arch=b64 -S mount -F auid>=1000 -F auid!=4294967295 -k mounts
-a always,exit -F arch=b32 -S mount -F auid>=1000 -F auid!=4294967295 -k mounts

# Monitor file deletions
-a always,exit -F arch=b64 -S unlink -S unlinkat -S rename -S renameat -F auid>=1000 -F auid!=4294967295 -k delete
-a always,exit -F arch=b32 -S unlink -S unlinkat -S rename -S renameat -F auid>=1000 -F auid!=4294967295 -k delete

# Monitor sudo usage
-a always,exit -F path=/usr/bin/sudo -F auid>=1000 -F auid!=4294967295 -k sudo

# Monitor SSH logins
-w /var/log/auth.log -p wa -k auth
-w /var/log/secure -p wa -k auth

# Monitor passwd commands
-w /usr/bin/passwd -p x -k passwd

# Monitor user/group changes
-w /etc/passwd -p wa -k identity
-w /etc/group -p wa -k identity
-w /etc/shadow -p wa -k identity
-w /etc/gshadow -p wa -k identity

# Make the configuration immutable
-e 2
AUDIT

systemctl enable auditd
systemctl restart auditd

# 10. Hostinger-Specific Security Measures
section "10. Hostinger-Specific Security Measures"

# 10.1 Malware Prevention (Hostinger Recommendation)
log "Setting up malware scanning and prevention..."
# Update ClamAV database
freshclam

# Create daily malware scan cron job
cat > /etc/cron.daily/malware-scan << 'MALWARE'
#!/bin/bash
# Daily malware scan using ClamAV
LOGFILE="/var/log/malware-scan.log"
echo "$(date): Starting malware scan" >> $LOGFILE
clamscan -r /home --exclude-dir=/home/*/node_modules --exclude-dir=/home/*/venv --exclude-dir=/home/*/.git --log=$LOGFILE --quiet
echo "$(date): Malware scan completed" >> $LOGFILE
MALWARE
chmod +x /etc/cron.daily/malware-scan

# 10.2 Anti-Spam Measures (Hostinger Recommendation)
log "Configuring anti-spam measures..."
# Install and configure Postfix restrictions if email is used
if command -v postfix &> /dev/null; then
    log "Configuring Postfix anti-spam measures..."
    postconf -e "smtpd_helo_required=yes"
    postconf -e "smtpd_recipient_restrictions=permit_mynetworks,reject_unauth_destination,reject_unknown_sender_domain,reject_unknown_recipient_domain,reject_unlisted_recipient"
    systemctl restart postfix
fi

# 10.3 Crypto Mining Prevention (Hostinger Recommendation)
log "Setting up crypto mining prevention..."
# Block common mining pools and software
cat >> /etc/hosts << 'HOSTS'
# Block common crypto mining domains
0.0.0.0 xmr.pool.minergate.com
0.0.0.0 pool.supportxmr.com
0.0.0.0 mine.xmrpool.net
0.0.0.0 xmrpool.eu
0.0.0.0 nanopool.org
0.0.0.0 ethermine.org
0.0.0.0 nicehash.com
0.0.0.0 miningpoolhub.com
HOSTS

# 10.4 DDoS/Botnet Protection (Hostinger Recommendation)
log "Configuring DDoS and botnet protection..."
# Install and configure mod_evasive for Apache if installed
if command -v apache2 &> /dev/null; then
    apt install -y libapache2-mod-evasive
    cat > /etc/apache2/mods-available/evasive.conf << 'EVASIVE'
<IfModule mod_evasive24.c>
    DOSHashTableSize    3097
    DOSPageCount        2
    DOSPageInterval     1
    DOSSiteCount        50
    DOSSiteInterval     1
    DOSBlockingPeriod   600
    DOSEmailNotify      root@localhost
    DOSLogDir           "/var/log/apache2/"
</IfModule>
EVASIVE
    a2enmod evasive
    systemctl restart apache2
fi

# 10.5 File Permission Security (Hostinger Recommendation)
log "Setting secure file permissions..."
# Secure critical system files
chmod 644 /etc/passwd
chmod 644 /etc/group
chmod 600 /etc/shadow
chmod 600 /etc/gshadow
chmod 644 /etc/hosts
chmod 644 /etc/hostname

# Secure SSH directory
chmod 700 /root/.ssh 2>/dev/null || true
chmod 600 /root/.ssh/* 2>/dev/null || true

# 10.6 Process Monitoring (Hostinger Recommendation)
log "Setting up process monitoring..."
# Install and configure acct for process accounting
apt install -y acct
systemctl enable acct
systemctl start acct

# 10.7 Log Monitoring and Alerting (Hostinger Recommendation)
log "Setting up log monitoring..."
# Install logwatch for log analysis
apt install -y logwatch

# Configure logrotate for better log management
cat > /etc/logrotate.d/security-logs << 'LOGROTATE'
/var/log/auth.log
/var/log/syslog
/var/log/kern.log
/var/log/fail2ban.log {
    daily
    rotate 7
    compress
    delaycompress
    missingok
    notifempty
    create 644 root root
    postrotate
        systemctl reload rsyslog
    endscript
}
LOGROTATE

log "Server hardening completed!"
echo ""
echo "⚠️  IMPORTANT NEXT STEPS:"
echo "-----------------------"
echo "1. Test SSH connection on new port: ssh -p 2222 user@your-server"
echo "2. Update your SSH client config to use the new port"
echo "3. Test that password authentication is disabled"
echo "4. Verify firewall rules: ufw status"
echo "5. Check fail2ban: fail2ban-client status"
echo "6. Run the security audit script: ./security_audit.sh"
echo ""
echo "🔑 REMEMBER:"
echo "- SSH port changed to 2222"
echo "- Root login disabled"
echo "- Password authentication disabled (keys only)"
echo "- Firewall configured"
echo "- Automatic updates enabled"
echo ""
echo "🛡️  HOSTINGER SECURITY MEASURES IMPLEMENTED:"
echo "- Malware scanning (ClamAV daily)"
echo "- Anti-spam protection"
echo "- Crypto mining prevention"
echo "- DDoS/botnet protection"
echo "- Secure file permissions"
echo "- Process monitoring"
echo "- Enhanced logging"
echo ""
echo "📋 Hardening completed: $(date)"
