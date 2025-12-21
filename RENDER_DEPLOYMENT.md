# Deploy to Render.com

## Quick Setup (2 Steps)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for Render deployment"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/kadaipos.git
git push -u origin main
```

### Step 2: Connect Render
1. Go to https://render.com
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Select your `kadaipos` repository
5. Use these settings:
   - **Name**: kadaipos
   - **Environment**: Node
   - **Region**: Singapore (or your preferred region)
   - **Branch**: main
   - **Build Command**: `npm ci && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free (or Paid if you want more resources)

6. Add Environment Variables (in Render Dashboard):
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
   - `NODE_ENV` = production

7. Click "Create Web Service"

That's it! Render will automatically deploy your app.

## About Render

✅ **Free Tier**: Perfect for your app
✅ **No Size Limits**: Keep Recharts, all charts work
✅ **Auto Deploys**: Push to GitHub = auto deploy
✅ **PostgreSQL Ready**: If you need database later
✅ **Global CDN**: Fast worldwide access

## Next Steps After Deployment

1. Your app URL will be: `https://kadaipos-xxxxx.onrender.com`
2. Point your domain to Render (if you have one)
3. Monitor logs in Render Dashboard

---

Ready to deploy? Push to GitHub and connect Render!
