import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Rate limiting storage (in production, use Redis or a database)
const rateLimitMap = new Map<string, { count: number; resetTime: number; blockedUntil?: number }>()

// Clean up old entries every hour
setInterval(() => {
  const now = Date.now()
  const keysToDelete: string[] = []
  
  // Iterate using Array.from for better compatibility
  Array.from(rateLimitMap.entries()).forEach(([key, value]) => {
    if (value.blockedUntil && now > value.blockedUntil) {
      keysToDelete.push(key)
    } else if (now > value.resetTime) {
      keysToDelete.push(key)
    }
  })
  
  // Delete expired entries
  keysToDelete.forEach(key => rateLimitMap.delete(key))
}, 3600000) // 1 hour

// Configuration - Move these to environment variables
const SMTP_CONFIG = {
  enabled: process.env.SMTP_ENABLED === 'true',
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USERNAME || '',
    pass: process.env.SMTP_PASSWORD || '',
  },
  from: {
    email: process.env.SMTP_FROM_EMAIL || 'noreply@mubadrah.om',
    name: process.env.SMTP_FROM_NAME || 'MCS Website',
  },
}

const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'info@mubadrah.om'

const RECAPTCHA_CONFIG = {
  enabled: process.env.RECAPTCHA_ENABLED !== 'false',
  secretKey: process.env.RECAPTCHA_SECRET_KEY || '',
}

const RATE_LIMIT_CONFIG = {
  enabled: process.env.RATE_LIMIT_ENABLED !== 'false',
  maxAttempts: parseInt(process.env.RATE_LIMIT_MAX_ATTEMPTS || '3'),
  timeWindow: parseInt(process.env.RATE_LIMIT_TIME_WINDOW || '3600000'), // 1 hour in ms
  blockDuration: parseInt(process.env.RATE_LIMIT_BLOCK_DURATION || '3600000'), // 1 hour in ms
}

// Verify reCAPTCHA
async function verifyRecaptcha(token: string, remoteip: string): Promise<boolean> {
  if (!RECAPTCHA_CONFIG.enabled) return true

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: RECAPTCHA_CONFIG.secretKey,
        response: token,
        remoteip: remoteip,
      }),
    })

    const data = await response.json()
    return data.success === true
  } catch (error) {
    console.error('reCAPTCHA verification error:', error)
    return false
  }
}

// Check rate limit
function checkRateLimit(ip: string): { allowed: boolean; message?: string } {
  if (!RATE_LIMIT_CONFIG.enabled) {
    return { allowed: true }
  }

  const now = Date.now()
  const record = rateLimitMap.get(ip)

  // Check if IP is blocked
  if (record?.blockedUntil && now < record.blockedUntil) {
    const remaining = Math.ceil((record.blockedUntil - now) / 60000) // minutes
    return {
      allowed: false,
      message: `Too many requests. Please try again in ${remaining} minute(s).`,
    }
  }

  // Reset if time window expired
  if (record && now > record.resetTime) {
    rateLimitMap.delete(ip)
  }

  // Get or create rate limit record
  const currentRecord = rateLimitMap.get(ip) || {
    count: 0,
    resetTime: now + RATE_LIMIT_CONFIG.timeWindow,
  }

  // Check if limit exceeded
  if (currentRecord.count >= RATE_LIMIT_CONFIG.maxAttempts) {
    currentRecord.blockedUntil = now + RATE_LIMIT_CONFIG.blockDuration
    rateLimitMap.set(ip, currentRecord)
    return {
      allowed: false,
      message: 'Rate limit exceeded. Please try again later.',
    }
  }

  // Increment counter
  currentRecord.count++
  rateLimitMap.set(ip, currentRecord)

  return { allowed: true }
}

// Send email using SMTP or fallback
async function sendEmail(data: {
  name: string
  email: string
  phone: string
  company: string
  message: string
  ip: string
}) {
  const { name, email, phone, company, message, ip } = data

  const emailHtml = `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #8B6F47;">New Contact Form Submission from MCS Website</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; background-color: #f5f5f5; font-weight: bold; width: 150px;">Name:</td>
            <td style="padding: 8px;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; background-color: #f5f5f5; font-weight: bold;">Email:</td>
            <td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px; background-color: #f5f5f5; font-weight: bold;">Phone:</td>
            <td style="padding: 8px;">${phone || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; background-color: #f5f5f5; font-weight: bold;">Company:</td>
            <td style="padding: 8px;">${company || 'Not provided'}</td>
          </tr>
        </table>
        <h3 style="color: #8B6F47; margin-top: 20px;">Message:</h3>
        <p style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #D4AF37;">
          ${message.replace(/\n/g, '<br>')}
        </p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="font-size: 12px; color: #666;">This email was sent from the MCS website contact form.</p>
        <p style="font-size: 12px; color: #666;">IP Address: ${ip}</p>
      </body>
    </html>
  `

  const emailText = `
New contact form submission from MCS Website

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Company: ${company || 'Not provided'}

Message:
${message}

IP Address: ${ip}
  `.trim()

  if (SMTP_CONFIG.enabled && SMTP_CONFIG.auth.user && SMTP_CONFIG.auth.pass) {
    // Use SMTP with nodemailer
    try {
      const transporter = nodemailer.createTransport({
        host: SMTP_CONFIG.host,
        port: SMTP_CONFIG.port,
        secure: SMTP_CONFIG.secure,
        auth: SMTP_CONFIG.auth,
      })

      await transporter.sendMail({
        from: `"${SMTP_CONFIG.from.name}" <${SMTP_CONFIG.from.email}>`,
        to: RECIPIENT_EMAIL,
        replyTo: email,
        subject: 'New Contact Form Submission from MCS Website',
        text: emailText,
        html: emailHtml,
      })

      return { success: true }
    } catch (error) {
      console.error('SMTP Error:', error)
      throw error
    }
  } else {
    // Fallback: Log to console (in production, you might want to use a service like SendGrid, Mailgun, etc.)
    console.log('Email would be sent:', {
      to: RECIPIENT_EMAIL,
      subject: 'New Contact Form Submission from MCS Website',
      text: emailText,
    })
    
    // In production without SMTP, consider using a service like:
    // - Resend (resend.com)
    // - SendGrid
    // - Mailgun
    // - AWS SES
    
    return { success: true, note: 'Email logged (SMTP not configured)' }
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'unknown'

    // Check rate limit
    const rateLimitCheck = checkRateLimit(ip)
    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        { success: false, message: rateLimitCheck.message },
        { status: 429 }
      )
    }

    // Parse request body
    const body = await request.json()

    // Honeypot check (bot detection)
    if (body.website && body.website.trim() !== '') {
      // Bot detected - silently succeed
      return NextResponse.json({
        success: true,
        message: 'Thank you for your message!',
      })
    }

    // Validate required fields
    const { name, email, message, recaptcha_token } = body
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Verify reCAPTCHA
    if (RECAPTCHA_CONFIG.enabled) {
      if (!recaptcha_token) {
        return NextResponse.json(
          { success: false, message: 'Please complete the CAPTCHA verification' },
          { status: 400 }
        )
      }

      const recaptchaValid = await verifyRecaptcha(recaptcha_token, ip)
      if (!recaptchaValid) {
        return NextResponse.json(
          { success: false, message: 'CAPTCHA verification failed. Please try again.' },
          { status: 400 }
        )
      }
    }

    // Sanitize input
    const sanitizedData = {
      name: name.trim().substring(0, 100),
      email: email.trim().substring(0, 255),
      phone: (body.phone || '').trim().substring(0, 50),
      company: (body.company || '').trim().substring(0, 100),
      message: message.trim().substring(0, 5000),
      ip: ip,
    }

    // Send email
    await sendEmail(sanitizedData)

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'There was an error sending your message. Please try again.',
      },
      { status: 500 }
    )
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

