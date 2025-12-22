#!/bin/bash

# Memory Monitor & Auto-Restart Script for KadaiPOS
# Ensures app never exceeds 600MB RAM

APP_NAME="kadaipos"
MAX_MEMORY=600000  # 600MB in KB
CHECK_INTERVAL=30   # Check every 30 seconds
RESTART_THRESHOLD=550000  # 550MB - restart before hitting max

while true; do
    # Get PID of the app
    PID=$(pm2 pid $APP_NAME | head -1)
    
    if [ -z "$PID" ] || [ "$PID" = "0" ]; then
        echo "[$(date)] App not running, checking PM2 status..."
        pm2 list | grep $APP_NAME
        sleep $CHECK_INTERVAL
        continue
    fi
    
    # Get RSS memory usage in KB
    MEMORY=$(ps -p $PID -o rss= 2>/dev/null)
    
    if [ -z "$MEMORY" ]; then
        echo "[$(date)] Could not read memory for PID $PID"
        sleep $CHECK_INTERVAL
        continue
    fi
    
    MEMORY_MB=$((MEMORY / 1024))
    
    if [ $MEMORY -gt $RESTART_THRESHOLD ]; then
        echo "[$(date)] WARNING: Memory at ${MEMORY_MB}MB (threshold: 550MB) - Restarting..."
        pm2 restart $APP_NAME
        sleep 10
    else
        echo "[$(date)] Memory OK: ${MEMORY_MB}MB / 600MB"
    fi
    
    sleep $CHECK_INTERVAL
done
