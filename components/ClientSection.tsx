'use client'

import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import Image from 'next/image'

const clients = [
    { name: 'Madayn', logo: '/clients/madayn.png' },
    { name: 'Port of Duqm', logo: '/clients/duqm.png' },
    { name: 'Asyad', logo: '/clients/asyad.png' },
    { name: 'Diwan of Royal Court', logo: '/clients/diwan.png' },
    { name: 'Oman Cables', logo: '/clients/oman-cables.png' },
    { name: 'Oman REIT', logo: '/clients/oman-reit.png' },
    { name: 'Mubadrah', logo: '/clients/mubadrah.png' },
    { name: 'HCL', logo: '/clients/hcl.png' },
    { name: 'AkzoNobel', logo: '/clients/akzonobel.png' },
    { name: 'Cameron', logo: '/clients/cameron.png' },
    { name: 'Taghleef Industries', logo: '/clients/taghleef.png' },
    { name: 'Nafith', logo: '/clients/nafith.png' },
    { name: 'National Detergent Co', logo: '/clients/nat-detergent.png' },
    { name: 'Pragati Glass Gulf', logo: '/clients/pragati.png' },
    { name: 'Industrial Innovation Academy', logo: '/clients/iia.png' },
    { name: 'ASAAS', logo: '/clients/asaas.png' },
    { name: 'Vodafone', logo: '/clients/vodafone.png' },
    { name: 'Ministry of Transport, Communications & IT', logo: '/clients/mtcit.png' },
    { name: 'Ministry of Education', logo: '/clients/moe.png' },
    { name: 'Hydro', logo: '/clients/hydro.png' },
    { name: 'Omani Packaging Co', logo: '/clients/oman-packaging.png' },
    { name: 'Ministry of Agriculture & Fisheries', logo: '/clients/mafwr.png' },
    { name: 'Schlumberger', logo: '/clients/schlumberger.png' },
    { name: 'Savills', logo: '/clients/savills.png' },
    { name: 'Shumookh Investment', logo: '/clients/shumookh.png' },
    { name: 'NCSI', logo: '/clients/ncsi.png' }
]

// Triple the clients for seamless scrolling on both sides
const scrollingClients = [...clients, ...clients, ...clients]

export default function ClientSection() {
    const controls = useAnimation()
    const itemWidth = 264 // 200px width + 64px total margin (mx-8 = 32px each side)

    useEffect(() => {
        const totalSetWidth = clients.length * itemWidth
        // Start so that the middle set's first item (Madayn) is centered
        // Initial x = -(one full set) + (center of screen - half item width)
        const startX = -(totalSetWidth) + (typeof window !== 'undefined' ? window.innerWidth / 2 - (itemWidth / 2) : 0)

        const startAnimation = async () => {
            // Set initial position immediately (not visible yet)
            await controls.set({ opacity: 0, x: startX })

            // First Phase: Gentle Fade-in (2 seconds)
            await controls.start({
                opacity: 1,
                transition: { duration: 2 }
            })

            // Second Phase: Continuous moderate loop (40s)
            // We scroll by exactly one full set width to loop seamlessly
            controls.start({
                x: startX - totalSetWidth,
                transition: {
                    duration: 40,
                    ease: "linear",
                    repeat: Infinity,
                }
            })
        }
        startAnimation()
    }, [controls])

    return (
        <section className="py-20 bg-white overflow-hidden" id="clients">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-heading font-bold text-mcs-dark-brown mb-4 uppercase tracking-wider"
                    >
                        OUR CLIENTELE
                    </motion.h2>
                    <div className="w-24 h-1 bg-mcs-gold mx-auto"></div>
                </div>
            </div>

            {/* Scrolling Row */}
            <div className="relative flex overflow-hidden group">
                {/* Left/Right Fades for Style */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-20" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-20" />

                <motion.div
                    className="flex whitespace-nowrap"
                    initial={{ opacity: 0 }}
                    animate={controls}
                >
                    {scrollingClients.map((client, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-[200px] h-[100px] mx-8 flex items-center justify-center transition-all duration-300 hover:scale-110"
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src={client.logo}
                                    alt={`${client.name} Logo`}
                                    fill
                                    className="object-contain"
                                    sizes="200px"
                                />
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

