# Fixing Vercel 404 Error

## Common Causes and Solutions

### 1. Check Build Logs
Go to your Vercel dashboard → Project → Deployments → Click on the failed deployment → Check "Build Logs"

### 2. Verify Environment Variables
Make sure these are set in Vercel (Settings → Environment Variables):

**Required:**
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` - Your reCAPTCHA site key
- `RECAPTCHA_SECRET_KEY` - Your reCAPTCHA secret key

**Optional (for email):**
- `SMTP_ENABLED` - Set to `true` or `false`
- `SMTP_HOST` - e.g., `smtp.gmail.com`
- `SMTP_PORT` - e.g., `587`
- `SMTP_SECURE` - `true` or `false`
- `SMTP_USERNAME` - Your SMTP username
- `SMTP_PASSWORD` - Your SMTP password
- `SMTP_FROM_EMAIL` - From email address
- `SMTP_FROM_NAME` - From name
- `RECIPIENT_EMAIL` - Where to send emails

**Rate Limiting (Optional):**
- `RATE_LIMIT_ENABLED` - `true` or `false`
- `RATE_LIMIT_MAX_ATTEMPTS` - e.g., `3`
- `RATE_LIMIT_TIME_WINDOW` - e.g., `3600000` (1 hour in ms)
- `RATE_LIMIT_BLOCK_DURATION` - e.g., `3600000`

### 3. Rebuild the Project

1. Go to Vercel Dashboard
2. Click on your project
3. Go to "Deployments"
4. Click "..." on the latest deployment
5. Click "Redeploy"

### 4. Check Project Settings

In Vercel Dashboard → Settings → General:
- **Framework Preset:** Next.js
- **Build Command:** `npm run build` (or leave default)
- **Output Directory:** (leave empty for Next.js)
- **Install Command:** `npm install` (or leave default)
- **Root Directory:** (leave empty if project is at root)

### 5. Verify File Structure

Make sure these files exist:
- ✅ `package.json`
- ✅ `next.config.js`
- ✅ `app/` directory
- ✅ `app/page.tsx` (home page)
- ✅ `app/layout.tsx` (root layout)
- ✅ `app/api/contact/route.ts` (API route)

### 6. Test Locally First

```bash
npm run build
npm start
```

Visit `http://localhost:3000` - if it works locally, the issue is with Vercel configuration.

### 7. Common Issues

**Issue: "Module not found"**
- Make sure all dependencies are in `package.json`
- Run `npm install` locally to verify

**Issue: "Build failed"**
- Check TypeScript errors: `npm run lint`
- Fix any syntax errors
- Check build logs in Vercel

**Issue: "404 on all routes"**
- Verify `app/` directory structure
- Check `next.config.js` is correct
- Ensure `app/page.tsx` exists

**Issue: "API route returns 404"**
- Verify `app/api/contact/route.ts` exists
- Check the route exports `POST` function
- Verify file is named `route.ts` (not `route.js`)

### 8. Quick Fix Checklist

- [ ] All environment variables set in Vercel
- [ ] `vercel.json` file exists (optional but helpful)
- [ ] Project builds successfully locally (`npm run build`)
- [ ] No TypeScript errors (`npm run lint`)
- [ ] `package.json` has all dependencies
- [ ] `next.config.js` is valid
- [ ] All required files are committed to Git
- [ ] Repository is connected to Vercel

### 9. Force Redeploy

If nothing works, try:
1. Disconnect repository in Vercel
2. Reconnect repository
3. Redeploy

### 10. Contact Support

If still having issues:
1. Check Vercel status: https://www.vercel-status.com
2. Check Vercel community: https://github.com/vercel/vercel/discussions
3. Contact Vercel support with build logs

## Debug Steps

1. **Check deployment logs** in Vercel dashboard
2. **Test API route directly:** `https://your-domain.vercel.app/api/contact`
3. **Check browser console** for errors
4. **Verify domain** is correctly configured

## Expected Behavior

- ✅ Home page (`/`) should load
- ✅ All routes (`/about`, `/services`, etc.) should work
- ✅ API route (`/api/contact`) should accept POST requests
- ✅ No 404 errors

If you're still getting 404, share the build logs from Vercel and I can help debug further!

