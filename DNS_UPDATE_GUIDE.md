# Quick DNS Update Guide

## 🎯 What You Need To Do

Update your domain's DNS records to point to the new VPS IP.

**Old IP:** 72.60.76.34  
**New IP:** 103.175.207.51

---

## Step-by-Step by Registrar

### 🟦 Niagahoster
1. Go to [niagahoster.com](https://www.niagahoster.com)
2. Log in to your account
3. Go: **My Products** → **Domains** → Select **kadai.id**
4. Click **Manage DNS**
5. Find the record with old IP (72.60.76.34)
6. Click **Edit** and change to: **103.175.207.51**
7. Click **Save**
8. Do the same for **www.kadai.id** if separate record

### 🟥 Domainesia
1. Go to [domainesia.com](https://www.domainesia.com)
2. Log in
3. Go: **Domains** → Select **kadai.id**
4. Click **DNS Settings**
5. Find A record with old IP
6. Edit and change to: **103.175.207.51**
7. Save

### 🟨 Verifali / IDWebHost
1. Log in to control panel
2. Find **DNS Settings** or **Name Servers**
3. Look for A record (or @)
4. Edit the IP address
5. Change: 72.60.76.34 → 103.175.207.51
6. Save changes

### 🌐 GoDaddy
1. Go to [godaddy.com](https://www.godaddy.com)
2. Log in
3. Go: **My Products** → **Domain**
4. Click **Manage** → **DNS**
5. Find the A record
6. Click **Edit**
7. Change IP to: **103.175.207.51**
8. Save

### 🌐 Cloudflare
1. Log in to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Select your domain
3. Go to **DNS** tab
4. Find the A record with old IP
5. Edit and change to: **103.175.207.51**
6. Save

### 🌐 Namecheap
1. Go to [namecheap.com](https://www.namecheap.com)
2. Log in
3. Go: **Dashboard** → **Manage**
4. Click **Manage DNS**
5. Find the A record
6. Edit value to: **103.175.207.51**
7. Save

---

## What To Change

### Main Domain (kadai.id)
```
Type: A
Name: @ (or blank, or kadai.id)
Value: 103.175.207.51
TTL: 3600 (or shortest available)
```

### WWW Subdomain (www.kadai.id)
```
Type: A  
Name: www
Value: 103.175.207.51
TTL: 3600
```

---

## After Update

### Immediate Check (1-5 minutes)
```bash
# Your DNS should update within minutes
nslookup kadai.id
# Watch for: 103.175.207.51

# If still shows old IP, flush your local cache:
# Mac: sudo dscacheutil -flushcache
# Windows: ipconfig /flushdns
# Linux: sudo systemctl restart systemd-resolved
```

### Verify Global Propagation (24-48 hours)
```bash
# Check from different locations
nslookup kadai.id

# Should eventually show:
# 103.175.207.51
```

### Test in Browser
```
Open: http://kadai.id
(or https://kadai.id after DNS works)
```

---

## Common Issues

### "Still showing old IP"
**Solution:**
1. Refresh multiple times
2. Clear browser cache (Ctrl+F5 or Cmd+Shift+R)
3. Wait 5-15 minutes
4. Verify you saved changes at registrar
5. Check that you edited the correct record

### "Can't reach new server"
**Solution:**
1. Make sure VPS has booted up
2. Test: `ssh root@103.175.207.51`
3. Check: `pm2 status` on VPS
4. Verify app is running: `curl http://103.175.207.51:3000`

### "DNS not updating after 1 hour"
**Solution:**
1. Verify changes saved at registrar
2. Check name servers are correct
3. Wait up to 48 hours (global propagation)
4. Use https://www.whatsmydns.net for global status

---

## TTL Explanation

**TTL** (Time To Live) = How long DNS takes to propagate

- **TTL 300** = 5 minutes (faster, but higher load)
- **TTL 3600** = 1 hour (good balance)
- **TTL 86400** = 24 hours (slow, but less server queries)

**Recommendation:** Set TTL to **3600** for this update.

---

## Quick Reference Card

```
📝 NEW SERVER INFO:
   IP: 103.175.207.51
   Hostname: srv123.kadaipos.id
   
🔧 DNS UPDATE:
   A record: @ (or kadaipos.id) → 103.175.207.51
   A record: www → 103.175.207.51
   
⏱️ TIMELINE:
   1-5 min: DNS registrar updates
   5-30 min: ISP DNS caches update
   24-48 hr: Global DNS propagation
   
✅ SUCCESS:
   When you can access kadaipos.id in browser
   And app loads
```

---

## Need Help?

If you're stuck:

1. **Check current DNS:**
   ```bash
   dig kadaipos.id
   nslookup kadaipos.id
   ```

2. **Contact your registrar support** with:
   - Domain: kadaipos.id
   - Old IP: 72.60.76.34
   - New IP: 103.175.207.51
   - Request: Point domain A records to new IP

3. **Check global status:**
   - https://www.whatsmydns.net/
   - Enter: kadaipos.id
   - Select: A record
   - Shows status worldwide

---

**Remember:** DNS changes take time. Be patient! ⏱️

Your application is ready - just pointing the domain to it now! 🚀
