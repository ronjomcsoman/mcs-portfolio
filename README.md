# MCS Portfolio Website

A modern, responsive corporate website for Mubadrah Comprehensive Services L.L.C (MCS), built with Next.js 14 and TypeScript.

## Features

- 🎨 Modern, premium Omani design with brand colors
- 📱 Fully responsive layout (Desktop 1440px optimized)
- ✨ Rich animations using Framer Motion
- 🚀 Fast performance with Next.js App Router
- ♿ Accessible and SEO-friendly
- 🎯 Focus on facility management services
- 📧 PHP contact form integration

## Technology Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Fonts**: Poppins (headings), Inter (body)
- **Backend**: Next.js API Routes (Vercel Serverless Functions)
- **Email**: nodemailer (SMTP)

## Pages

1. **Home** - Hero section, about summary, service cards, ISO certifications, and why choose us
2. **About** - Company overview, mission, vision, values, and General Manager message
3. **Services** - Four main facility management services:
   - Quality Management
   - Environmental Management
   - Health & Safety
   - Asset Management
4. **Certifications** - ISO 9001, 14001, 45001, and 55001 certifications
5. **Contact** - Contact information and PHP-powered contact form

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- PHP 7.4+ (for contact form functionality)
- Web server with PHP support (Apache/Nginx)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure PHP contact form:
   - Open `api/contact.php`
   - Update the `$to` variable with your email address (line 30)
   - Ensure your server has PHP mail() function enabled or configure SMTP

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Production Deployment

#### Vercel Deployment (Recommended)

1. **Push to GitHub/GitLab/Bitbucket**

2. **Import project in Vercel:**
   - Go to [Vercel Dashboard](https://vercel.com)
   - Click "Add New Project"
   - Import your repository

3. **Configure Environment Variables:**
   - Add all variables from `.env.local.example`
   - Set them for Production, Preview, and Development

4. **Deploy:**
   - Vercel will automatically deploy
   - The API route will be available at `/api/contact`

See `VERCEL_SETUP.md` for detailed setup instructions.

#### Other Hosting Options

For other hosting providers:
1. Build the application: `npm run build`
2. Configure environment variables
3. Deploy according to provider's Next.js documentation
4. Ensure serverless functions are supported

## Project Structure

```
mcs-portfolio/
├── app/
│   ├── about/
│   │   └── page.tsx
│   ├── certifications/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── services/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── app/
│   └── api/
│       └── contact/
│           └── route.ts (Serverless Function)
├── components/
│   ├── AnimatedCard.tsx
│   ├── AnimatedText.tsx
│   ├── Footer.tsx
│   └── Header.tsx
├── public/
│   └── mcs.jpg (company logo)
├── .htaccess
└── package.json
```

## Brand Colors

- **MCS Brown**: #8B6F47
- **MCS Gold**: #D4AF37
- **MCS Beige**: #F5E6D3
- **MCS Warm Grey**: #A8A8A8
- **MCS Dark Brown**: #5C4A2E
- **MCS Light Gold**: #E8D5A3

## Animations

The website includes various animations:
- Fade-in sections on scroll
- Hover effects on cards and buttons
- Stagger animations for lists
- Scale and rotate effects
- Floating animations for icons
- Pulse/glow effects
- Smooth transitions throughout

## Contact Form

The contact form uses a Vercel Serverless Function (Next.js API route) with:
- ✅ SMTP email delivery via nodemailer
- ✅ Google reCAPTCHA v2 verification
- ✅ Rate limiting protection
- ✅ Honeypot spam protection

**Setup:**
1. Create `.env.local` file (see `.env.local.example`)
2. Configure SMTP settings
3. Add reCAPTCHA keys
4. Deploy to Vercel and add environment variables
5. See `VERCEL_SETUP.md` for detailed instructions

## Security Notes

- The PHP script includes basic input sanitization
- Consider adding CSRF tokens for production
- Implement rate limiting to prevent spam
- Validate and sanitize all user inputs
- Use HTTPS in production

## License

© 2024 Mubadrah Comprehensive Services L.L.C. All rights reserved.
