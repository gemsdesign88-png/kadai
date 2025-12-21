#!/bin/bash

# KadaiPOS VPS Health Check & Auto-Fix Script
# Run this via cron to ensure service is always up
# Cron: */5 * * * * /var/www/kadaipos.id/health-check.sh

VPS_IP="72.60.76.34"
APP_PORT="3000"
LOG_FILE="/var/log/kadaipos-health-check.log"

timestamp() {
    date '+%Y-%m-%d %H:%M:%S'
}

log_message() {
    echo "[$(timestamp)] $1" >> $LOG_FILE
}

# Health check
if ! curl -f http://localhost:$APP_PORT > /dev/null 2>&1; then
    log_message "⚠️  App not responding on port $APP_PORT"
    
    # Check if PM2 process is running
    if ! pm2 list | grep -q "kadaipos"; then
        log_message "❌ PM2 process not found, starting..."
        cd /var/www/kadaipos.id
        pm2 start "npm start" --name "kadaipos" --env production
        sleep 3
        
        if curl -f http://localhost:$APP_PORT > /dev/null 2>&1; then
            log_message "✅ App restarted successfully"
        else
            log_message "❌ Failed to restart app"
            pm2 logs kadaipos --lines 20 >> $LOG_FILE
        fi
    else
        log_message "❌ PM2 process found but app not responding, restarting..."
        pm2 restart kadaipos
        sleep 3
        
        if curl -f http://localhost:$APP_PORT > /dev/null 2>&1; then
            log_message "✅ App restarted successfully"
        else
            log_message "❌ Failed to restart app after multiple attempts"
            pm2 logs kadaipos --lines 20 >> $LOG_FILE
            
            # Try nuclear option: pull latest, rebuild, restart
            log_message "🔄 Attempting full rebuild..."
            cd /var/www/kadaipos.id
            git pull origin main
            npm install --production
            npm run build
            pm2 restart kadaipos
            sleep 5
            
            if curl -f http://localhost:$APP_PORT > /dev/null 2>&1; then
                log_message "✅ Full rebuild successful"
            else
                log_message "🚨 CRITICAL: All recovery attempts failed"
                pm2 logs kadaipos --lines 50 >> $LOG_FILE
            fi
        fi
    fi
else
    log_message "✅ App is healthy"
fi
