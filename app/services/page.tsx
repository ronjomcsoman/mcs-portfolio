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
  const hardServices = [
    { title: 'Generator Service', icon: '⚙️' },
    { title: 'Pump Maintenance', icon: '💧' },
    { title: 'AC Maintenance', icon: '❄️' },
    { title: 'Electrical Panel Maintenance', icon: '⚡' },
    { title: 'Plumbing Works', icon: '🚰' },
    { title: 'Fire Hydrant Maintenance', icon: '🚒' },
    { title: 'Fire Cylinder PPM', icon: '🧯' },
    { title: 'Streetlight PPM', icon: '💡' },
    { title: 'CCTV Maintenance', icon: '📷' }
  ]

  const softServices = [
    { title: 'Cleaning Service', icon: '🧹' },
    { title: 'Facade Cleaning', icon: '🏢' },
    { title: 'Road Sweeping', icon: '🚜' },
    { title: 'Sanitizing Service', icon: '🧼' },
    { title: 'Pest Control Service', icon: '🐜' }
  ]

  const cafmFeatures = [
    'Facility Management',
    'Asset Management',
    'Maintenance Management',
    'Smooth operation of the infrastructure facilities',
    'Energy Management',
    'Compliance and Regulatory Management',
    'Equipment efficiency maintenance at high level'
  ]

  return (
    <div className="min-h-screen">
      {/* Banner Section */}
      <section className="relative bg-gradient-to-r from-mcs-dark-brown via-mcs-brown to-mcs-gold py-20 overflow-hidden text-center">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='white' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10"
        >
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-white mb-4">OUR SERVICES</h1>
          <p className="text-xl text-mcs-beige">Comprehensive Facility Management Solutions</p>
        </motion.div>
      </section>

      {/* Hard Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-heading font-bold text-mcs-dark-brown mb-12 text-center border-b-4 border-mcs-gold inline-block mx-auto">HARD SERVICES</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {hardServices.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-mcs-beige/30 p-6 rounded-xl shadow-md border-t-4 border-mcs-brown text-center"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="font-bold text-mcs-dark-brown uppercase text-sm">{service.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Soft Services */}
      <section className="py-20 bg-mcs-beige/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-heading font-bold text-mcs-dark-brown mb-12 text-center border-b-4 border-mcs-brown inline-block mx-auto">SOFT SERVICES</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {softServices.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-white p-6 rounded-xl shadow-md border-t-4 border-mcs-gold text-center"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="font-bold text-mcs-dark-brown uppercase text-sm">{service.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Facility Management */}
      <section className="py-20 bg-mcs-dark-brown text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-4xl font-heading font-bold mb-8">DIGITAL FACILITY MANAGEMENT</h2>
              <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/20">
                <h3 className="text-2xl font-bold mb-6 text-mcs-light-gold">CAFM SOFTWARE</h3>
                <ul className="space-y-4">
                  {cafmFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-mcs-gold mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <motion.div
                className="mt-8 bg-mcs-light-gold text-mcs-dark-brown p-4 rounded-xl font-bold text-center italic"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Digitalization in Facility Management <br /> 100% CUSTOMIZABLE
              </motion.div>
            </div>
            <div className="flex-1 relative">
              <div className="bg-white p-4 rounded-xl shadow-2xl rotate-2">
                <div className="aspect-video bg-gray-200 rounded flex items-center justify-center text-gray-500 italic">
                  [CAFM Dashboard Interface Mockup]
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-mcs-gold/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-mcs-brown/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

