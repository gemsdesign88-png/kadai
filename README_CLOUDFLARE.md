# ☁️ Cloudflare Pages Migration Guide

We are moving **kadaipos.id** from a VPS to **Cloudflare Pages** for better stability, speed, and to avoid the recurring 502/504 issues.

## ✅ What has been prepared:
1. **Installed Cloudflare Tools**: Added `@cloudflare/next-on-pages` and `wrangler`.
2. **Configuration**: Created `wrangler.toml` with your Supabase environment variables.
3. **Edge Runtime**: Updated 25+ routes to use `export const runtime = 'edge';` as required by Cloudflare.
4. **Scripts**: Added `pages:build` and `pages:deploy` to `package.json`.
5. **Deployment Script**: Created `cloudflare-deploy.sh` for one-click deployment (includes a fix for large build logs).

## 🚀 How to Deploy Now:

### 1. Login to Cloudflare
Run this in your terminal to authenticate:
```bash
npx wrangler login
```

### 2. Run the Deployment Script
```bash
./cloudflare-deploy.sh
```

### 3. Update DNS in Cloudflare Dashboard
1. Go to **Cloudflare Dashboard** > **Workers & Pages**.
2. Select your project `kadaipos-id`.
3. Go to **Custom Domains**.
4. Add `kadaipos.id` and `www.kadaipos.id`.
5. Cloudflare will automatically handle the SSL and DNS records.

## 🛠️ Why this is better:
- **No more 502/504**: Cloudflare handles the scaling and server management.
- **Global Speed**: Your site is served from the edge (closest to the user).
- **Automatic SSL**: No more Let's Encrypt issues.
- **Zero Maintenance**: You don't need to manage a VPS, PM2, or Nginx anymore.

## ⚠️ Important Note:
If you have subdomains like `sibos.kadaipos.id` or `order.kadaipos.id`, you should add them as **Custom Domains** in the same Cloudflare Pages project. The middleware I've checked will handle the routing correctly.
