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

export default function Certifications() {
  const certifications = [
    {
      number: 'ISO 55001:2014',
      title: 'Asset Management',
      icon: '📊',
      description: 'Systematic approach to asset management, maximizing value and optimizing lifecycle performance.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      number: 'ISO 14001:2015',
      title: 'Environmental Management',
      icon: '🌍',
      description: 'Commitment to environmental responsibility, sustainable practices, and regulatory compliance.',
      color: 'from-green-500 to-green-600'
    },
    {
      number: 'ISO 45001:2015',
      title: 'Health & Safety',
      icon: '🛡️',
      description: 'Frameworks for occupational health and safety, protecting workers and ensuring safe operations.',
      color: 'from-red-500 to-red-600'
    },
    {
      number: 'ISO 9001:2015',
      title: 'Quality Management',
      icon: '🏆',
      description: 'Consistent quality in products and services, focusing on customer satisfaction and improvement.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      number: 'ISO 41001:2018',
      title: 'Facility Management',
      icon: '🏢',
      description: 'International standard for facility management systems to improve productivity and safety.',
      color: 'from-mcs-gold to-mcs-brown'
    },
    {
      number: 'USAC',
      title: 'Certification',
      icon: '🇺🇸',
      description: 'Accreditation from the United States Accreditation Center.',
      color: 'from-mcs-dark-brown to-mcs-brown'
    },
    {
      number: 'MEFMA',
      title: 'Member',
      icon: '🏗️',
      description: 'Middle East Facility Management Association - Professional Membership.',
      color: 'from-mcs-gold to-mcs-light-gold'
    }
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
            Certifications
          </h1>
          <p className="text-xl text-mcs-beige max-w-3xl mx-auto">
            Internationally recognized standards for excellence
          </p>
        </motion.div>
      </section>

      {/* ISO Certifications Grid */}
      <section className="py-20 bg-gradient-to-b from-white to-mcs-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="text-center text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
              MCS is proud to hold multiple ISO certifications, demonstrating our commitment to excellence, sustainability, safety, and quality in all aspects of facility management.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certifications.map((cert, index) => (
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
                  y: -10
                }}
                className="bg-white rounded-2xl shadow-xl p-8 text-center card-hover relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-mcs-gold to-mcs-light-gold opacity-20 rounded-full -mr-16 -mt-16"></div>
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="text-6xl mb-4 relative z-10"
                >
                  {cert.icon}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.2 }}
                  className="relative z-10"
                >
                  <div className="text-3xl font-heading font-bold text-mcs-dark-brown mb-2">
                    {cert.number}
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-mcs-dark-brown mb-4">
                    {cert.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {cert.description}
                  </p>
                </motion.div>
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-mcs-gold to-mcs-brown"></div>
              </motion.div>
            ))}
          </div>

          {/* Additional Info Section */}
          <AnimatedSection className="mt-16">
            <div className="bg-gradient-to-br from-mcs-beige to-mcs-light-gold p-8 md:p-12 rounded-xl shadow-lg">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <h3 className="text-3xl font-heading font-bold text-mcs-dark-brown mb-4">
                  Certified Excellence
                </h3>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                  Our ISO certifications reflect our unwavering commitment to maintaining the highest standards in quality management, environmental stewardship, occupational health and safety, and asset management. These certifications ensure that our clients receive services that meet international best practices and regulatory requirements.
                </p>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}

