'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Counter from '@/components/Counter'
import ClientSection from '@/components/ClientSection'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
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

export default function Home() {
  const services = [
    {
      icon: '🔧',
      title: 'Quality Management',
      description: 'Comprehensive quality assurance and management systems ensuring excellence in all operations.'
    },
    {
      icon: '🌱',
      title: 'Environmental Management',
      description: 'Sustainable practices and environmental compliance for responsible facility operations.'
    },
    {
      icon: '🛡️',
      title: 'Health & Safety',
      description: 'Robust health and safety protocols protecting people and ensuring regulatory compliance.'
    },
    {
      icon: '📊',
      title: 'Asset Management',
      description: 'Strategic asset lifecycle management maximizing value and operational efficiency.'
    }
  ]

  const isoCertifications = [
    { number: 'ISO 9001:2015', name: 'Quality Management' },
    { number: 'ISO 14001:2015', name: 'Environmental Management' },
    { number: 'ISO 45001:2015', name: 'Health & Safety' },
    { number: 'ISO 55001:2014', name: 'Asset Management' },
    { number: 'ISO 41001:2018', name: 'Facility Management' },
    { number: 'ISO 22000:2018', name: 'Food Safety Management' },
    { number: 'MEFMA', name: 'Member' }
  ]

  const whyChooseUs = [
    { title: 'ISO Certified Excellence', icon: '✓' },
    { title: 'Strong Omani Management', icon: '🇴🇲' },
    { title: 'SME & ICV Support', icon: '🤝' },
    { title: 'Safety & Sustainability', icon: '🌿' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-mcs-beige via-mcs-light-gold to-mcs-gold min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0 L100 50 L50 100 L0 50 Z' fill='none' stroke='%238B6F47' stroke-width='2'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl font-heading font-bold text-mcs-dark-brown mb-6"
            >
              Your Integrated FM Partner
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-mcs-dark-brown mb-4 max-w-3xl mx-auto"
            >
              Mubadrah Comprehensive Services LLC (MCS) is your integrated FM partner, delivering smarter care for physical assets through a digital-led, customer-focused approach.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="inline-block bg-mcs-dark-brown text-white px-6 py-2 rounded-full font-bold tracking-widest text-sm mb-8 shadow-md uppercase"
            >
              QUASI-GOVERNMENT COMPANY
            </motion.div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-mcs-dark-brown text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-mcs-brown transition-colors"
                >
                  Our Services
                </motion.button>
              </Link>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-mcs-dark-brown px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-mcs-beige transition-colors"
                >
                  Contact Us
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <ClientSection />

      {/* About Summary Section */}
      <AnimatedSection className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-heading font-bold text-mcs-dark-brown mb-6"
            >
              About MCS
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-gray-700 leading-relaxed"
            >
              Mubadrah Comprehensive Services LLC (MCS), established in 2018, is a quasi-government organization providing comprehensive facilities management solutions across Oman. Committed to safety, sustainability, and quality, MCS ensures that its services meet both local and international standards.
            </motion.p>
          </div>
        </div>
      </AnimatedSection>

      {/* Service Cards Section */}
      <AnimatedSection className="py-20 bg-gradient-to-b from-white to-mcs-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-heading font-bold text-mcs-dark-brown mb-4">Our Services</h2>
            <p className="text-lg text-gray-700">Comprehensive facility management solutions</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotate: -5 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{
                  y: -15,
                  scale: 1.05,
                  rotate: 2,
                  transition: { duration: 0.3 }
                }}
                className="bg-white p-6 rounded-xl shadow-lg card-hover relative overflow-hidden group"
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2
                  }}
                  className="text-5xl mb-4"
                >
                  {service.icon}
                </motion.div>
                <h3 className="text-xl font-heading font-semibold text-mcs-dark-brown mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-mcs-gold to-mcs-brown"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ISO Certifications Section */}
      <AnimatedSection className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-heading font-bold text-mcs-dark-brown text-center mb-12">
            ISO Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {isoCertifications.map((iso, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="bg-gradient-to-br from-mcs-gold to-mcs-light-gold p-8 rounded-xl shadow-lg text-center card-hover relative overflow-hidden"
              >
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 10px 30px rgba(212, 175, 55, 0.3)",
                      "0 10px 40px rgba(212, 175, 55, 0.6)",
                      "0 10px 30px rgba(212, 175, 55, 0.3)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 rounded-xl"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2
                  }}
                  className="text-4xl font-bold text-mcs-dark-brown mb-2 relative z-10"
                >
                  {iso.number}
                </motion.div>
                <div className="text-mcs-dark-brown font-semibold relative z-10">{iso.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Why Choose Us Section */}
      <AnimatedSection className="py-20 bg-gradient-to-b from-mcs-beige to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-heading font-bold text-mcs-dark-brown text-center mb-6">
            Why Choose Us
          </h2>
          <p className="text-lg text-gray-700 text-center mb-12 max-w-4xl mx-auto">
            Mubadrah Comprehensive Services is your integrated FM partner, delivering smarter care for physical assets through a digital-led, customer-focused approach. Powered by a young and dynamic team, we continuously improve the way facilities are managed by combining technology, people, and processes to deliver reliable and seamless operations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{
                  scale: 1.08,
                  y: -8,
                  rotate: index % 2 === 0 ? 2 : -2,
                  transition: { duration: 0.3 }
                }}
                className="bg-white p-6 rounded-xl shadow-md text-center card-hover relative overflow-hidden group"
              >
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.3
                  }}
                  className="text-4xl mb-4"
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-lg font-heading font-semibold text-mcs-dark-brown relative z-10">
                  {item.title}
                </h3>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-mcs-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ICV Section - Styled like Image 3 */}
      <section className="py-24 bg-white overflow-hidden relative">
        {/* Background Arches */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <path d="M 0 400 Q 200 0 400 400" fill="none" stroke="#8B6F47" strokeWidth="40" />
            <path d="M 50 400 Q 200 100 350 400" fill="none" stroke="#D4AF37" strokeWidth="40" />
            <path d="M 100 400 Q 200 200 300 400" fill="none" stroke="#5C4033" strokeWidth="40" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-4xl font-heading font-bold text-mcs-dark-brown mb-16 uppercase tracking-widest"
          >
            In Country Value
          </motion.h2>

          <div className="max-w-3xl mx-auto text-center">
            {/* Content Side */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-mcs-gold font-bold text-xl md:text-2xl mb-4 uppercase tracking-wide">
                TOTAL PAYMENT TO SME COMPANIES <br className="hidden md:block" /> UP TO 2025
              </p>
              <div className="flex flex-col items-center gap-4">
                <span className="text-mcs-dark-brown text-4xl md:text-5xl font-bold">OMR</span>
                <div className="text-6xl md:text-8xl font-black text-mcs-dark-brown tracking-tighter shadow-mcs-gold/10">
                  <Counter value={4249384} duration={2.5} />
                </div>
              </div>
              <div className="mt-8 overflow-hidden h-2 bg-gray-100 rounded-full w-full mx-auto max-w-md">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 2.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-mcs-gold to-mcs-brown"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

