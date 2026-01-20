# Complete reCAPTCHA Setup Guide

## Current Error: "Invalid key type"

This error means the reCAPTCHA key is either:
1. Not set in Vercel environment variables
2. Wrong type (using v3 instead of v2)
3. Invalid format

## Step-by-Step Fix

### Step 1: Create reCAPTCHA Site in Google Console

1. **Go to Google reCAPTCHA Admin:**
   - Visit: https://www.google.com/recaptcha/admin
   - Sign in with your Google account

2. **Create New Site:**
   - Click the **"+"** button or "Create"
   - **Label:** MCS Portfolio Website
   - **reCAPTCHA type:** Select **"reCAPTCHA v2"** → **"I'm not a robot" Checkbox**
   - **⚠️ IMPORTANT:** Do NOT select v3 (Invisible) or Enterprise

3. **Add Domains:**
   Add these domains (one per line, NO https://, NO trailing slash):
   ```
   mcsoman.vercel.app
   *.vercel.app
   localhost
   ```
   If you have a custom domain, also add:
   ```
   yourdomain.com
   www.yourdomain.com
   ```

4. **Accept Terms and Submit**

5. **Copy Your Keys:**
   - **Site Key** (starts with `6L...`) - This is what you need
   - **Secret Key** (starts with `6L...`) - Keep this secure

### Step 2: Add Keys to Vercel

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com/dashboard
   - Select your project: `mcs-portfolio`

2. **Go to Settings → Environment Variables**

3. **Add Environment Variables:**

   **Variable 1:**
   - **Name:** `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
   - **Value:** Your Site Key (starts with `6L...`)
   - **Environment:** Production, Preview, Development (check all)
   - Click "Save"

   **Variable 2:**
   - **Name:** `RECAPTCHA_SECRET_KEY`
   - **Value:** Your Secret Key (starts with `6L...`)
   - **Environment:** Production, Preview, Development (check all)
   - Click "Save"

### Step 3: Verify Key Format

Your Site Key should:
- ✅ Start with `6L` (v2 checkbox)
- ✅ Be about 40 characters long
- ✅ Look like: `6Lfm7SYsAAAAACn_HuBU4JJm5fYNRlikGcAAti7Q`

**Wrong formats:**
- ❌ Starts with `6Le` (v3 invisible)
- ❌ Starts with `6Lg` (Enterprise)
- ❌ Too short or too long

### Step 4: Redeploy

1. Go to **Deployments** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Or push a new commit to trigger automatic deployment

### Step 5: Verify It Works

1. Wait for deployment to complete (2-3 minutes)
2. Visit your contact page
3. You should see reCAPTCHA checkbox (not error message)
4. Check the box and submit form

## Troubleshooting

### Still seeing "Invalid key type"?

1. **Check Environment Variable:**
   - Go to Vercel → Settings → Environment Variables
   - Verify `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` exists
   - Verify it starts with `6L`
   - Verify it's set for correct environments

2. **Check Key Type in Google Console:**
   - Go back to https://www.google.com/recaptcha/admin
   - Click on your site
   - Verify it says "reCAPTCHA v2" and "I'm not a robot" Checkbox
   - If it says v3, delete and create new one with v2

3. **Check Domains:**
   - In Google reCAPTCHA console
   - Verify `mcsoman.vercel.app` is listed
   - Verify `*.vercel.app` is listed
   - No `https://` or trailing `/`

4. **Clear Browser Cache:**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Or open in incognito/private window

5. **Check Browser Console:**
   - Press F12 → Console tab
   - Look for reCAPTCHA errors
   - Share any error messages

### Temporary Workaround

If you need the form to work immediately without reCAPTCHA:

1. **Remove the environment variable** `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` from Vercel
2. **Redeploy**
3. Form will work without reCAPTCHA (less secure but functional)

## Quick Checklist

- [ ] Created reCAPTCHA site in Google Console
- [ ] Selected **v2 "I'm not a robot" Checkbox** (not v3)
- [ ] Added domains: `mcsoman.vercel.app`, `*.vercel.app`, `localhost`
- [ ] Copied Site Key (starts with `6L`)
- [ ] Added `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` to Vercel
- [ ] Added `RECAPTCHA_SECRET_KEY` to Vercel
- [ ] Set for all environments (Production, Preview, Development)
- [ ] Redeployed the project
- [ ] Verified reCAPTCHA appears (not error)

## Need Help?

If still not working:
1. Double-check the key starts with `6L` (not `6Le`)
2. Verify domains are added correctly (no https://)
3. Wait 5-10 minutes after adding domains (propagation time)
4. Try creating a new reCAPTCHA site from scratch

