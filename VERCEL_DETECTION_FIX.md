# Fix "No Framework Detected" Error in Vercel

## Problem
Vercel shows "No framework detected" and only detects static assets like `mcs.jpg`.

## Solution

### Step 1: Verify Files Are Uploaded to GitHub

Make sure these files are in your GitHub repository:
- ✅ `package.json` (with `next` dependency)
- ✅ `next.config.js`
- ✅ `app/` directory
- ✅ `app/layout.tsx`
- ✅ `app/page.tsx`
- ✅ `tsconfig.json`
- ✅ `tailwind.config.js`
- ✅ `postcss.config.js`
- ✅ `vercel.json` (created above)

### Step 2: Check Vercel Project Settings

1. Go to Vercel Dashboard → Your Project → Settings → General
2. Verify:
   - **Framework Preset:** Next.js (should auto-detect)
   - **Root Directory:** (leave empty if project is at root)
   - **Build Command:** `npm run build` (or leave default)
   - **Output Directory:** (leave empty for Next.js)
   - **Install Command:** `npm install` (or leave default)

### Step 3: Reconnect Repository

1. Go to Settings → Git
2. Disconnect the repository
3. Reconnect it
4. Vercel will re-scan and detect Next.js

### Step 4: Manual Framework Selection

If auto-detection fails:
1. Go to Settings → General
2. Under "Framework Preset", manually select **Next.js**
3. Save and redeploy

### Step 5: Verify package.json

Ensure `package.json` has:
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "scripts": {
    "build": "next build",
    "dev": "next dev",
    "start": "next start"
  }
}
```

### Step 6: Check Repository Structure

Your repository should look like:
```
mcs-portfolio/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── ...
├── components/
├── public/
├── package.json
├── next.config.js
├── tsconfig.json
└── vercel.json
```

### Step 7: Force Redeploy

1. Go to Deployments
2. Click "..." on latest deployment
3. Click "Redeploy"
4. Or push a new commit to trigger deployment

## Common Issues

### Issue: Only static files detected
**Cause:** Vercel is scanning the wrong directory or files aren't uploaded
**Fix:** 
- Verify all files are in GitHub
- Check Root Directory setting in Vercel
- Ensure `package.json` is at repository root

### Issue: Framework preset shows "Other"
**Fix:**
- Manually select "Next.js" in project settings
- Or add `vercel.json` with framework specification

### Issue: Build fails after detection
**Fix:**
- Check build logs for errors
- Verify all dependencies are in `package.json`
- Ensure environment variables are set

## Quick Checklist

- [ ] `package.json` exists with `next` dependency
- [ ] `next.config.js` exists
- [ ] `app/` directory exists with `layout.tsx` and `page.tsx`
- [ ] `vercel.json` exists (optional but helpful)
- [ ] All files are committed to Git
- [ ] Repository is connected to Vercel
- [ ] Framework preset is set to "Next.js"
- [ ] Build command is `npm run build`

## Still Not Working?

1. **Check Vercel Build Logs:**
   - Go to Deployments → Click on deployment → View Build Logs
   - Look for framework detection messages

2. **Try Manual Detection:**
   - Settings → General → Framework Preset → Select "Next.js"
   - Save and redeploy

3. **Verify Repository:**
   - Check GitHub repository has all files
   - Ensure `package.json` is at root level
   - Verify `next` is in dependencies

4. **Contact Support:**
   - Share build logs with Vercel support
   - Include repository URL

## Expected Result

After fixing, Vercel should show:
- ✅ Framework: Next.js
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `.next`
- ✅ Successful deployment

