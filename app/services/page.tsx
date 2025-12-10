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

export default function Services() {
  const services = [
    {
      icon: '🔧',
      title: 'Quality Management',
      shortDesc: 'Comprehensive quality assurance and management systems',
      description: 'Our Quality Management services ensure excellence in all facility operations through systematic processes, continuous improvement, and adherence to international standards. We implement preventive, corrective, and predictive maintenance strategies to maintain optimal facility performance and reliability.',
      features: [
        'Quality assurance systems',
        'Process optimization',
        'Performance monitoring',
        'Continuous improvement',
        'Compliance management'
      ]
    },
    {
      icon: '🌱',
      title: 'Environmental Management',
      shortDesc: 'Sustainable practices and environmental compliance',
      description: 'We deliver comprehensive environmental management solutions that prioritize sustainability, resource efficiency, and regulatory compliance. Our services include waste management, energy efficiency programs, and eco-friendly operational practices that reduce environmental impact while maintaining high service standards.',
      features: [
        'Environmental compliance',
        'Waste management',
        'Energy efficiency',
        'Sustainability programs',
        'Green certifications'
      ]
    },
    {
      icon: '🛡️',
      title: 'Health & Safety',
      shortDesc: 'Robust health and safety protocols',
      description: 'Our Health & Safety services protect people, assets, and operations through comprehensive risk management, safety training, and regulatory compliance. We implement industry-leading safety protocols, conduct regular audits, and ensure all operations meet the highest safety standards.',
      features: [
        'Safety protocols',
        'Risk assessment',
        'Training programs',
        'Incident management',
        'Regulatory compliance'
      ]
    },
    {
      icon: '📊',
      title: 'Asset Management',
      shortDesc: 'Strategic asset lifecycle management',
      description: 'We provide strategic asset management services that maximize value and operational efficiency throughout the asset lifecycle. Our approach includes asset planning, maintenance optimization, performance tracking, and lifecycle cost management to ensure optimal return on investment.',
      features: [
        'Asset planning',
        'Lifecycle management',
        'Performance optimization',
        'Cost management',
        'Maintenance strategies'
      ]
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
            Our Services
          </h1>
          <p className="text-xl text-mcs-beige max-w-3xl mx-auto">
            Comprehensive facility management solutions
          </p>
        </motion.div>
      </section>

      {/* Service Blocks Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -15, scale: 1.03, rotate: 1 }}
                className="bg-gradient-to-br from-mcs-beige to-white p-8 rounded-xl shadow-lg card-hover cursor-pointer"
              >
                <div className="text-6xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-heading font-bold text-mcs-dark-brown mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.shortDesc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Service Descriptions */}
      <section className="py-20 bg-gradient-to-b from-white to-mcs-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-heading font-bold text-mcs-dark-brown mb-12 text-center">
            Service Details
          </h2>
          <div className="space-y-12">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white p-8 md:p-12 rounded-xl shadow-lg"
              >
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    className="text-7xl flex-shrink-0"
                  >
                    {service.icon}
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-heading font-bold text-mcs-dark-brown mb-4">
                      {service.title}
                    </h3>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {service.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: featureIndex * 0.1 }}
                          className="flex items-center gap-2"
                        >
                          <span className="text-mcs-gold text-xl">✓</span>
                          <span className="text-gray-700">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

