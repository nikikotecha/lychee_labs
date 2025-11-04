# 🚀 Deploy to Vercel

## Quick Deploy (3 Steps)

### 1. Push to GitHub
```bash
git add .
git commit -m "Convert to web app for Vercel deployment"
git push origin main
```

### 2. Deploy to Vercel

**Option A: Using Vercel Website (Easiest)**

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New Project"
4. Import your `siemens-demo` repository
5. Vercel auto-detects settings (no config needed!)
6. Click "Deploy"
7. ✅ Done! Your app is live in ~2 minutes

**Option B: Using Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name? siemens-demo
# - Directory? ./
# - Override settings? No

# Production deploy
vercel --prod
```

### 3. Share the URL!

You'll get a URL like:
```
https://siemens-demo.vercel.app
```

Or custom domain:
```
https://your-domain.com
```

---

## Auto-Deploy Setup

Once connected to GitHub:
- Every `git push` automatically deploys
- Preview URLs for branches
- Rollback anytime
- Zero downtime

---

## Environment Variables (if needed later)

In Vercel dashboard → Settings → Environment Variables:
```
API_KEY=your_key_here
BACKEND_URL=https://api.example.com
```

---

## Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your domain (e.g., `demo.yourcompany.com`)
3. Update DNS records (Vercel shows you how)
4. SSL automatically configured

---

## Local Testing Before Deploy

```bash
# Build locally to test
npm run build

# Preview the build
npm run preview

# Visit http://localhost:4173
```

---

## Troubleshooting

### Build fails on Vercel?
- Check Node.js version (should be 18+)
- Vercel Settings → Node.js Version → 18.x

### 404 errors?
- Check `vercel.json` is committed
- Restart deployment

### Assets not loading?
- Ensure `/media` folder is committed
- Check paths use `/media/` not `./media/`

---

## What Changed?

✅ Removed Electron (desktop app features)  
✅ Now runs as pure React web app  
✅ Exact same UI and functionality  
✅ Faster, more accessible  
✅ Perfect for demos  

## What Stayed the Same?

✅ All components  
✅ All styling  
✅ All animations  
✅ Tutorial system  
✅ Dark mode  
✅ Everything visual  

---

## Next Steps

1. **Test locally**: `npm run dev`
2. **Commit changes**: `git add . && git commit -m "Deploy ready"`
3. **Push to GitHub**: `git push`
4. **Deploy on Vercel**: Import from GitHub
5. **Share URL**: Send to clients! 🎉

---

**Deployment time: ~2 minutes**  
**Cost: FREE** (Vercel hobby plan)  
**Updates: Automatic** on every git push

Ready to deploy? Just run:
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push
```

Then visit [vercel.com](https://vercel.com) and click "Import Project"! 🚀
