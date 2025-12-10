# Fix reCAPTCHA "Invalid key type" Error

## Problem
Error message: "ERROR for site owner: Invalid key type"

## Cause
This error occurs when:
1. reCAPTCHA site key is not set or is a placeholder
2. Wrong reCAPTCHA version (using v3 key with v2 widget)
3. Key type mismatch in Google reCAPTCHA console

## Solution

### Step 1: Get Correct reCAPTCHA Key

1. **Go to Google reCAPTCHA Admin:**
   - Visit: https://www.google.com/recaptcha/admin

2. **Create New Site (if needed):**
   - Click "Create" or select existing site
   - **Important:** Choose **reCAPTCHA v2** → **"I'm not a robot" Checkbox**
   - **DO NOT** use reCAPTCHA v3 (invisible) or Enterprise

3. **Add Domains:**
   - Add your domain: `yourdomain.com`
   - Add Vercel domain: `*.vercel.app` (for preview deployments)
   - Add localhost: `localhost` (for development)

4. **Copy Keys:**
   - **Site Key** (starts with `6L...`) - Use this in frontend
   - **Secret Key** (starts with `6L...`) - Use this in backend

### Step 2: Set Environment Variables

#### In Vercel:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   ```
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
   RECAPTCHA_SECRET_KEY=your_secret_key_here
   ```
3. Set for: Production, Preview, and Development
4. Redeploy

#### Locally (`.env.local`):
```bash
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here
```

### Step 3: Verify Key Type

Your reCAPTCHA site key should:
- ✅ Start with `6L` (v2 checkbox)
- ✅ Be from reCAPTCHA v2 "I'm not a robot" Checkbox
- ❌ NOT start with `6Le` (v3 invisible)
- ❌ NOT be Enterprise key

### Step 4: Check Domain Configuration

In Google reCAPTCHA console, ensure:
- Your production domain is added
- `*.vercel.app` is added (for Vercel deployments)
- `localhost` is added (for local development)

### Step 5: Redeploy

After setting environment variables:
1. Go to Vercel Dashboard
2. Click "Redeploy" on latest deployment
3. Or push a new commit

## Temporary Fix (Disable reCAPTCHA)

If you need to disable reCAPTCHA temporarily:

1. **In Vercel Environment Variables:**
   - Set `RECAPTCHA_ENABLED=false`
   - Or remove `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`

2. **The form will work without reCAPTCHA** (less secure but functional)

## Verify It's Working

After fixing:
1. Visit contact page
2. You should see reCAPTCHA checkbox (not error message)
3. Form should submit after checking the box
4. No "Invalid key type" error

## Common Mistakes

❌ **Wrong:** Using reCAPTCHA v3 key with v2 widget
✅ **Correct:** Use v2 "I'm not a robot" checkbox key

❌ **Wrong:** Key not added to allowed domains
✅ **Correct:** Add all domains (production, vercel.app, localhost)

❌ **Wrong:** Using placeholder key `YOUR_RECAPTCHA_SITE_KEY`
✅ **Correct:** Use actual key from Google reCAPTCHA console

❌ **Wrong:** Secret key in frontend (NEXT_PUBLIC_)
✅ **Correct:** Only site key in frontend, secret key in backend

## Still Having Issues?

1. **Check Browser Console:**
   - Open DevTools → Console
   - Look for reCAPTCHA errors

2. **Verify Environment Variable:**
   - Check Vercel dashboard
   - Ensure variable name is exactly: `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
   - Check it's set for correct environment

3. **Test Locally:**
   - Create `.env.local` with your key
   - Run `npm run dev`
   - Test contact form

4. **Regenerate Keys:**
   - If still not working, delete old site in reCAPTCHA console
   - Create new site with correct type (v2 checkbox)
   - Update environment variables

