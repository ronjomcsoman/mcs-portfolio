'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

const clients = [
    { name: 'HCL', category: 'Technology', logo: '/clients/hcl.png' },
    { name: 'AkzoNobel', category: 'Chemicals', logo: '/clients/akzonobel.png' },
    { name: 'Cameron', sub: 'A Schlumberger Company', category: 'Energy', logo: '/clients/cameron.png' },
    { name: 'Taghleef Industries', category: 'Manufacturing', logo: '/clients/taghleef.png' },
    { name: 'Al Rusayl Industrial City', category: 'Industrial', logo: '/clients/madayn-rusayl.png' },
    { name: 'Nafith', category: 'Logistics', logo: '/clients/nafith.png' },
    { name: 'National Detergent Co', category: 'Manufacturing', logo: '/clients/nat-detergent.png' },
    { name: 'Pragati Glass Gulf', category: 'Manufacturing', logo: '/clients/pragati.png' },
    { name: 'Industrial Innovation Academy', category: 'Education', logo: '/clients/iia.png' },
    { name: 'ASAAS', category: 'Investment', logo: '/clients/asaas.png' },
    { name: 'Vodafone', category: 'Telecommunications', logo: '/clients/vodafone.png' },
    { name: 'Ministry of Transport, Communications & IT', category: 'Government', logo: '/clients/mtcit.png' },
    { name: 'Ministry of Education', category: 'Government', logo: '/clients/moe.png' },
    { name: 'Hydro', category: 'Energy', logo: '/clients/hydro.png' },
    { name: 'Omani Packaging Co', category: 'Manufacturing', logo: '/clients/oman-packaging.png' },
    { name: 'Oman REIT', category: 'Real Estate', logo: '/clients/oman-reit.png' },
    { name: 'Madayn', category: 'Industrial', logo: '/clients/madayn.png' },
    { name: 'Port of Duqm', category: 'Logistics', logo: '/clients/duqm.png' },
    { name: 'Ministry of Agriculture & Fisheries', category: 'Government', logo: '/clients/mafwr.png' },
    { name: 'Schlumberger', category: 'Energy', logo: '/clients/schlumberger.png' },
    { name: 'Asyad', category: 'Logistics', logo: '/clients/asyad.png' },
    { name: 'Savills', category: 'Real Estate', logo: '/clients/savills.png' },
    { name: 'Oman Cables', category: 'Manufacturing', logo: '/clients/oman-cables.png' },
    { name: 'Shumookh Investment', category: 'Investment', logo: '/clients/shumookh.png' },
    { name: 'NCSI', category: 'Government', logo: '/clients/ncsi.png' },
    { name: 'Diwan of Royal Court', category: 'Government', logo: '/clients/diwan.png' },
    { name: 'Mubadrah', category: 'Partner', logo: '/clients/mubadrah.png' }
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 100
        }
    }
}

export default function ClientSection() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    })

    return (
        <section className="py-24 bg-white" id="clients">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-heading font-bold text-mcs-dark-brown mb-4 uppercase tracking-wider"
                    >
                        OUR CLIENTELE
                    </motion.h2>
                    <div className="w-24 h-1 bg-mcs-gold mx-auto mb-8"></div>
                </div>

                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center"
                >
                    {clients.map((client, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center justify-center p-2 transition-all duration-300 group"
                        >
                            <div className="relative w-full aspect-[4/3] flex items-center justify-center border border-gray-100 rounded-xl hover:shadow-md hover:border-mcs-gold/30 bg-white transition-all overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center p-6">
                                    <Image
                                        src={client.logo}
                                        alt={`${client.name} Logo`}
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
