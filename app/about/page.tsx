'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

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

export default function About() {
  const values = [
    { title: 'Integrity', icon: '💎', description: 'Honest and ethical in all our dealings' },
    { title: 'Excellence', icon: '⭐', description: 'Striving for the highest standards' },
    { title: 'Sustainability', icon: '🌍', description: 'Environmental responsibility' },
    { title: 'Collaboration', icon: '🤝', description: 'Working together for success' },
    { title: 'Innovation', icon: '💡', description: 'Embracing new solutions' }
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
            About Us
          </h1>
          <p className="text-xl text-mcs-beige max-w-3xl mx-auto">
            Leading facility management solutions across Oman
          </p>
        </motion.div>
      </section>

      {/* Company Overview */}
      <AnimatedSection className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-heading font-bold text-mcs-dark-brown mb-6 text-center">
              Company Overview
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed text-center">
              Mubadrah Comprehensive Services LLC (MCS), established in 2018, is a quasi-government organization providing comprehensive facilities management solutions across Oman. Committed to safety, sustainability, and quality, MCS ensures that its services meet both local and international standards. The company is dedicated to contributing to the country's economic growth through long-term partnerships and a client-focused approach.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-gradient-to-b from-white to-mcs-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-heading font-bold text-mcs-dark-brown mb-4">Vision</h3>
              <p className="text-gray-700">
                To be Oman's leading provider of sustainable, reliable, and innovative facility management solutions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-2xl font-heading font-bold text-mcs-dark-brown mb-4">Mission</h3>
              <p className="text-gray-700">
                To deliver world-class integrated services prioritizing safety, quality, and environmental responsibility.
              </p>
            </motion.div>
          </div>

          <div>
            <h3 className="text-3xl font-heading font-bold text-mcs-dark-brown mb-8 text-center">Our Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white p-6 rounded-xl shadow-md text-center card-hover"
                >
                  <div className="text-4xl mb-3">{value.icon}</div>
                  <h4 className="text-lg font-heading font-semibold text-mcs-dark-brown mb-2">
                    {value.title}
                  </h4>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* General Manager Message */}
      <AnimatedSection className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-heading font-bold text-mcs-dark-brown mb-8 text-center">
              Message from General Manager
            </h2>
            <div className="bg-gradient-to-br from-mcs-beige to-mcs-light-gold p-8 md:p-12 rounded-xl shadow-lg">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  className="w-32 h-32 bg-mcs-gold rounded-full flex items-center justify-center text-5xl flex-shrink-0"
                >
                  👤
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-2xl font-heading font-semibold text-mcs-dark-brown mb-4">
                    Eng. Mazin Ibrahim Al Balushi
                  </h3>
                  <p className="text-gray-700 leading-relaxed italic">
                    "At MCS, we are committed to delivering excellence in facility management while upholding the highest standards of safety, sustainability, and quality. Our team works tirelessly to ensure that every project we undertake contributes to Oman's growth and development. We take pride in our strong Omani management and our dedication to supporting local SMEs and ICV initiatives."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ICV & SME Support Section */}
      <AnimatedSection className="py-20 bg-gradient-to-b from-white to-mcs-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-heading font-bold text-mcs-dark-brown mb-12 text-center">
            ICV & SME Support
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🏢', title: 'In-Country Value', description: 'Supporting local economic development through strategic partnerships' },
              { icon: '💼', title: 'SME Development', description: 'Empowering small and medium enterprises in the facility management sector' },
              { icon: '🤝', title: 'Local Partnerships', description: 'Building strong relationships with Omani businesses and communities' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white p-8 rounded-xl shadow-lg text-center card-hover"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-heading font-semibold text-mcs-dark-brown mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div> 
      </AnimatedSection>
    </div>
  )
}

