'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'

interface Location {
    name: string
    x: number // Percentage from left
    y: number // Percentage from top
}

export default function OmanMap() {
    const [hoveredZone, setHoveredZone] = useState<string | null>(null)

    // Approximate coordinates of operational zones on Oman map (as percentages)
    const locations: Location[] = [
        { name: 'BURAIMI', x: 18, y: 32 },
        { name: 'SOHAR', x: 32, y: 28 },
        { name: 'KOM', x: 45, y: 42 },
        { name: 'WADI KABIR', x: 48, y: 45 },
        { name: 'RUSAYL', x: 50, y: 43 },
        { name: 'NIZWA', x: 42, y: 52 },
        { name: 'IBRI', x: 28, y: 48 },
        { name: 'SAMAIL', x: 52, y: 46 },
        { name: 'SUR', x: 68, y: 50 },
        { name: 'RAYSUT', x: 8, y: 88 },
        { name: 'MAZYONAH', x: 15, y: 68 },
        { name: 'DUQM', x: 42, y: 72 },
        { name: 'MAHAS', x: 35, y: 78 }
    ]

    return (
        <div className="relative w-full max-w-5xl mx-auto aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-mcs-gold/20">
            {/* Background Oman Map Image */}
            <Image
                src="/Oman Map.png"
                alt="Map of Oman"
                fill
                className="object-cover"
                priority
            />

            {/* Overlay with markers */}
            <div className="absolute inset-0">
                {locations.map((location, index) => {
                    const isHovered = hoveredZone === location.name
                    return (
                        <motion.div
                            key={location.name}
                            className="absolute"
                            style={{
                                left: `${location.x}%`,
                                top: `${location.y}%`,
                                transform: 'translate(-50%, -50%)'
                            }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: index * 0.1, type: "spring" }}
                        >
                            {/* Pulsing ring */}
                            <motion.div
                                className="absolute inset-0 rounded-full border-2 border-mcs-gold"
                                animate={{
                                    scale: [1, 2.5],
                                    opacity: [0.8, 0]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: index * 0.15
                                }}
                            />

                            {/* Marker dot */}
                            <motion.div
                                className="relative z-10 w-4 h-4 rounded-full bg-mcs-gold border-2 border-white shadow-lg cursor-pointer"
                                whileHover={{ scale: 1.5 }}
                                onMouseEnter={() => setHoveredZone(location.name)}
                                onMouseLeave={() => setHoveredZone(null)}
                            />

                            {/* Label tooltip */}
                            {isHovered && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 z-20"
                                >
                                    <div className="bg-mcs-dark-brown text-white px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap text-sm font-bold">
                                        {location.name}
                                        <div className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-mcs-dark-brown rotate-45"></div>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    )
                })}
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-mcs-gold/30 z-30">
                <div className="flex items-center gap-2 text-sm text-mcs-dark-brown">
                    <div className="w-3 h-3 rounded-full bg-mcs-gold border-2 border-white shadow-sm"></div>
                    <span className="font-semibold">Operational Zones</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">Hover over markers for details</p>
            </div>
        </div>
    )
}
