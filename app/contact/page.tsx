'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

function AnimatedSection({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Contact() {
  // Google reCAPTCHA Site Key - Must be reCAPTCHA v2 "I'm not a robot" checkbox type
  const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''
  const RECAPTCHA_ENABLED = RECAPTCHA_SITE_KEY && RECAPTCHA_SITE_KEY !== '' && RECAPTCHA_SITE_KEY !== 'YOUR_RECAPTCHA_SITE_KEY'
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    website: '' // Honeypot field
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check reCAPTCHA only if enabled
    if (RECAPTCHA_ENABLED && !recaptchaToken) {
      alert('Please complete the CAPTCHA verification')
      return
    }
    
    setIsSubmitting(true)
    
    // Next.js API route endpoint
    const apiEndpoint = '/api/contact'
    
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptcha_token: recaptchaToken
        }),
      })
      
      const data = await response.json()
      
      if (response.ok && data.success) {
        alert(data.message || 'Thank you for your message! We will get back to you soon.')
        setFormData({ name: '', email: '', phone: '', company: '', message: '', website: '' })
        setRecaptchaToken(null)
        recaptchaRef.current?.reset()
      } else {
        alert(data.message || 'There was an error sending your message. Please try again.')
        recaptchaRef.current?.reset()
        setRecaptchaToken(null)
      }
    } catch (error) {
      alert('There was an error sending your message. Please try again.')
      console.error('Error:', error)
      recaptchaRef.current?.reset()
      setRecaptchaToken(null)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contactInfo = [
    { icon: '📍', label: 'Address', value: '3rd Floor, KOM 5, Knowledge Oasis Muscat, PO 135, PC 135' },
    { icon: '📞', label: 'Phone', value: '+968 24155991', link: 'tel:+96824155991' },
    { icon: '📱', label: 'Mobile', value: '+968 97007112', link: 'tel:+96897007112' },
    { icon: '✉️', label: 'Email', value: 'info@mubadrah.om', link: 'mailto:info@mubadrah.om' }
  ]

  return (
    <div className="min-h-screen">
      {/* Banner Section */}
      <section className="relative bg-gradient-to-r from-mcs-dark-brown via-mcs-brown to-mcs-gold py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='white' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-mcs-beige max-w-3xl mx-auto">
            Get in touch with our team
          </p>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Contact Information */}
            <AnimatedSection>
              <div className="space-y-8">
                <h2 className="text-3xl font-heading font-bold text-mcs-dark-brown mb-6">
                  Get in Touch
                </h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 10 }}
                      className="flex items-start gap-4"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        className="text-3xl flex-shrink-0"
                      >
                        {info.icon}
                      </motion.div>
                      <div>
                        <h3 className="font-heading font-semibold text-mcs-dark-brown mb-1">
                          {info.label}
                        </h3>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-gray-700 hover:text-mcs-gold transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-gray-700">{info.value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Google Maps Embed */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-8"
                >
                  <h3 className="font-heading font-semibold text-mcs-dark-brown mb-4">
                    Location
                  </h3>
                  <div className="rounded-xl overflow-hidden border-2 border-mcs-brown shadow-lg">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d228.5651770245156!2d58.17047724114918!3d23.566905100753406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e8de3177a652b69%3A0x676f2b816fc2fd5b!2sMubadrah%20Comprehensive%20Services%20LLC!5e0!3m2!1sen!2som!4v1765355703805!5m2!1sen!2som"
                      width="100%"
                      height="450"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full"
                      title="Mubadrah Comprehensive Services LLC Location"
                    />
                  </div>
                </motion.div>
              </div>
            </AnimatedSection>

            {/* Right Column - Contact Form */}
            <AnimatedSection>
              <div className="bg-gradient-to-br from-mcs-beige to-white p-8 rounded-xl shadow-lg">
                <h2 className="text-3xl font-heading font-bold text-mcs-dark-brown mb-6">
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="space-y-2"
                  >
                    <label htmlFor="name" className="block font-semibold text-mcs-dark-brown">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-mcs-gold focus:ring-2 focus:ring-mcs-gold outline-none transition-all"
                    />
                  </motion.div>

                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="space-y-2"
                  >
                    <label htmlFor="email" className="block font-semibold text-mcs-dark-brown">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-mcs-gold focus:ring-2 focus:ring-mcs-gold outline-none transition-all"
                    />
                  </motion.div>

                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="space-y-2"
                  >
                    <label htmlFor="phone" className="block font-semibold text-mcs-dark-brown">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-mcs-gold focus:ring-2 focus:ring-mcs-gold outline-none transition-all"
                    />
                  </motion.div>

                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="space-y-2"
                  >
                    <label htmlFor="company" className="block font-semibold text-mcs-dark-brown">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-mcs-gold focus:ring-2 focus:ring-mcs-gold outline-none transition-all"
                    />
                  </motion.div>

                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="space-y-2"
                  >
                    <label htmlFor="message" className="block font-semibold text-mcs-dark-brown">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-mcs-gold focus:ring-2 focus:ring-mcs-gold outline-none transition-all resize-none"
                    ></textarea>
                  </motion.div>

                  {/* Honeypot field - hidden from users */}
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Google reCAPTCHA */}
                  {RECAPTCHA_ENABLED ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex justify-center"
                    >
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={RECAPTCHA_SITE_KEY}
                        onChange={handleRecaptchaChange}
                        theme="light"
                      />
                    </motion.div>
                  ) : (
                    <div className="text-center text-sm text-gray-500 py-2">
                      reCAPTCHA not configured. Please set NEXT_PUBLIC_RECAPTCHA_SITE_KEY environment variable.
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting || (RECAPTCHA_ENABLED && !recaptchaToken)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-mcs-dark-brown text-white py-3 rounded-lg font-semibold shadow-lg hover:bg-mcs-brown transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </motion.button>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  )
}

