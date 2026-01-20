'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

const clients = [
    {
        name: 'Madayn',
        category: 'Industrial',
        logo: '/clients/madayn.png',
        description: 'Long-term partner in managing and maintaining industrial cities across the Sultanate.'
    },
    {
        name: 'Port of Duqm',
        category: 'Logistics',
        logo: '/clients/duqm.png',
        description: "Critical infrastructure management for Oman's strategic gateway to global trade."
    },
    {
        name: 'Asyad',
        category: 'Logistics',
        logo: '/clients/asyad.png',
        description: "Powering Oman's logistics ambition through world-class facility operations at scale."
    },
    {
        name: 'Diwan of Royal Court',
        category: 'Government',
        logo: '/clients/diwan.png',
        description: 'Upholding the highest standards of service for prestigious national landmarks.'
    },
    {
        name: 'Oman Cables',
        category: 'Manufacturing',
        logo: '/clients/oman-cables.png',
        description: "Technical facility management for the region's leading cable and wire manufacturer."
    },
    {
        name: 'Oman REIT',
        category: 'Real Estate',
        logo: '/clients/oman-reit.png',
        description: 'Managing diverse property portfolios to maximize value for real estate investment trusts.'
    },
    {
        name: 'Mubadrah',
        category: 'Partner',
        logo: '/clients/mubadrah.png',
        description: 'Synergistic operational partnership driving excellence in facility management solutions.'
    },
    {
        name: 'HCL',
        category: 'Technology',
        logo: '/clients/hcl.png',
        description: 'Global technology leader partnering with MCS for innovative digital workplace solutions.'
    },
    {
        name: 'AkzoNobel',
        category: 'Chemicals',
        logo: '/clients/akzonobel.png',
        description: 'Providing sustainable facility management for world-class paint and coating production facilities.'
    },
    {
        name: 'Cameron',
        sub: 'A Schlumberger Company',
        category: 'Energy',
        logo: '/clients/cameron.png',
        description: 'Integrated support services for critical infrastructure in the oil and gas sector.'
    },
    {
        name: 'Taghleef Industries',
        category: 'Manufacturing',
        logo: '/clients/taghleef.png',
        description: "Comprehensive maintenance solutions for one of the world's largest BOPP film producers."
    },
    {
        name: 'Nafith',
        category: 'Logistics',
        logo: '/clients/nafith.png',
        description: 'Facilitating smooth logistics operations through robust management of transport hubs.'
    },
    {
        name: 'National Detergent Co',
        category: 'Manufacturing',
        logo: '/clients/nat-detergent.png',
        description: "Quality-driven facility operations for Oman's home-grown manufacturing giant."
    },
    {
        name: 'Pragati Glass Gulf',
        category: 'Manufacturing',
        logo: '/clients/pragati.png',
        description: 'Supporting industrial precision through reliable technical management of specialty glass facilities.'
    },
    {
        name: 'Industrial Innovation Academy',
        category: 'Education',
        logo: '/clients/iia.png',
        description: 'Providing the base for innovation through expert campus management.'
    },
    {
        name: 'ASAAS',
        category: 'Investment',
        logo: '/clients/asaas.png',
        description: 'Strategic partnership in managing high-value assets within the tourism and real estate sectors.'
    },
    {
        name: 'Vodafone',
        category: 'Telecommunications',
        logo: '/clients/vodafone.png',
        description: 'Ensuring seamless connectivity through agile facility management of telecom infrastructure.'
    },
    {
        name: 'Ministry of Transport, Communications & IT',
        category: 'Government',
        logo: '/clients/mtcit.png',
        description: 'Supporting national infrastructure goals through public-sector facility excellence.'
    },
    {
        name: 'Ministry of Education',
        category: 'Government',
        logo: '/clients/moe.png',
        description: 'Developing the future of Oman by maintaining safe and modern learning environments.'
    },
    {
        name: 'Hydro',
        category: 'Energy',
        logo: '/clients/hydro.png',
        description: "Sustainable facility solutions for the aluminum and energy industry's complex needs."
    },
    {
        name: 'Omani Packaging Co',
        category: 'Manufacturing',
        logo: '/clients/oman-packaging.png',
        description: 'Technical maintenance and management for leading food-grade packaging facilities.'
    },
    {
        name: 'Ministry of Agriculture & Fisheries',
        category: 'Government',
        logo: '/clients/mafwr.png',
        description: 'Ensuring food security through the management of vital governmental agricultural assets.'
    },
    {
        name: 'Schlumberger',
        category: 'Energy',
        logo: '/clients/schlumberger.png',
        description: 'Global expertise meets local excellence in managing high-stakes energy sector facilities.'
    },
    {
        name: 'Savills',
        category: 'Real Estate',
        logo: '/clients/savills.png',
        description: 'Elevating property management standards through professional facility expertise.'
    },
    {
        name: 'Shumookh Investment',
        category: 'Investment',
        logo: '/clients/shumookh.png',
        description: 'Partnering in the sustainable growth of industrial and commercial investments.'
    },
    {
        name: 'NCSI',
        category: 'Government',
        logo: '/clients/ncsi.png',
        description: 'Delivering security and reliability for national statistical and information hubs.'
    }
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 80,
            damping: 12
        }
    }
}

export default function Clientele() {
    return (
        <div className="min-h-screen bg-white">
            {/* Banner Section */}
            <section className="relative bg-gradient-to-r from-mcs-dark-brown via-mcs-brown to-mcs-gold py-24 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0 L100 50 L50 100 L0 50 Z' fill='none' stroke='white' stroke-width='1'/%3E%3C/svg%3E")`,
                        backgroundSize: '100px 100px'
                    }}></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 uppercase tracking-wider"
                    >
                        Our Clientele
                    </motion.h1>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-24 h-1.5 bg-white mx-auto mb-8 rounded-full"
                    />
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl md:text-2xl text-mcs-beige max-w-3xl mx-auto leading-relaxed"
                    >
                        Building long-term partnerships with leading organizations across various sectors in the Sultanate of Oman.
                    </motion.p>
                </div>
            </section>

            {/* Client Grid Section */}
            <section className="py-24 bg-gradient-to-b from-white to-mcs-beige">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                    >
                        {clients.map((client, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -10 }}
                                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col"
                            >
                                {/* Logo Box */}
                                <div className="p-10 flex items-center justify-center bg-gray-50/50 group-hover:bg-white transition-colors duration-500 aspect-[16/9] relative">
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={client.logo}
                                            alt={`${client.name} Logo`}
                                            fill
                                            className="object-contain transition-all duration-700 p-4"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    </div>
                                    <div className="absolute top-4 right-4">
                                        <span className="bg-mcs-gold/10 text-mcs-dark-brown text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-mcs-gold/20">
                                            {client.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content Box */}
                                <div className="p-8 flex-grow flex flex-col border-t border-gray-50">
                                    <h3 className="text-2xl font-heading font-bold text-mcs-dark-brown mb-2 group-hover:text-mcs-brown transition-colors">
                                        {client.name}
                                    </h3>
                                    {client.sub && (
                                        <p className="text-mcs-gold font-medium text-sm mb-4 uppercase tracking-wide">
                                            {client.sub}
                                        </p>
                                    )}
                                    <p className="text-gray-600 leading-relaxed italic relative z-10 group-hover:text-gray-900 transition-colors">
                                        "{client.description}"
                                    </p>

                                    {/* Accent Decoration */}
                                    <div className="mt-6 pt-6 border-t border-gray-50 flex justify-end">
                                        <div className="w-8 h-1 bg-mcs-gold rounded-full transform origin-right group-hover:scale-x-200 transition-transform duration-500" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-20 bg-mcs-dark-brown relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-mcs-gold opacity-10 rounded-full -mr-32 -mt-32 blur-3xl animate-pulse" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-mcs-brown opacity-10 rounded-full -ml-32 -mb-32 blur-3xl" />

                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
                        Partner with the Experts
                    </h2>
                    <p className="text-mcs-beige text-lg mb-10 opacity-90">
                        Join our network of prestigious clients and experience the difference of integrated, smarter facility management tailored to your needs.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/contact" className="bg-mcs-gold text-white px-10 py-4 rounded-full font-bold hover:bg-mcs-brown transition-all hover:shadow-xl hover:-translate-y-1 inline-block">
                            Start a Partnership
                        </a>
                        <a href="/services" className="border-2 border-mcs-beige/30 text-white px-10 py-4 rounded-full font-bold hover:bg-white/10 transition-all inline-block">
                            Explore Our Services
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}
