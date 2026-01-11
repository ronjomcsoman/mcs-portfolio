'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

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
        <div className="relative w-full max-w-5xl mx-auto aspect-[4/3] bg-gradient-to-br from-mcs-beige/20 to-mcs-light-gold/20 rounded-2xl p-8 shadow-xl border border-mcs-gold/20">
            {/* SVG Map of Oman (simplified outline) */}
            <svg
                viewBox="0 0 800 600"
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Oman outline - simplified shape */}
                <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    d="M 150 180 L 200 160 L 280 150 L 350 160 L 420 180 L 480 200 L 540 220 L 580 260 L 600 300 L 610 340 L 600 380 L 580 420 L 540 460 L 480 480 L 420 490 L 360 500 L 300 510 L 240 500 L 180 480 L 140 450 L 100 410 L 80 370 L 70 330 L 80 290 L 100 250 L 130 210 Z M 50 500 L 80 480 L 120 470 L 160 480 L 180 510 L 170 540 L 140 560 L 100 570 L 60 560 L 40 540 L 50 500 Z"
                    fill="#F5E6D3"
                    stroke="#8B6F47"
                    strokeWidth="2"
                    className="drop-shadow-md"
                />

                {/* Location markers */}
                {locations.map((location, index) => {
                    const isHovered = hoveredZone === location.name
                    return (
                        <g key={location.name}>
                            {/* Marker dot */}
                            <motion.circle
                                cx={location.x * 8}
                                cy={location.y * 6}
                                r={isHovered ? 12 : 8}
                                fill="#D4AF37"
                                stroke="#8B6F47"
                                strokeWidth="2"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.1 + 2, type: "spring" }}
                                whileHover={{ scale: 1.3 }}
                                className="cursor-pointer drop-shadow-lg"
                                onMouseEnter={() => setHoveredZone(location.name)}
                                onMouseLeave={() => setHoveredZone(null)}
                            />

                            {/* Pulsing effect */}
                            <motion.circle
                                cx={location.x * 8}
                                cy={location.y * 6}
                                r={8}
                                fill="none"
                                stroke="#D4AF37"
                                strokeWidth="2"
                                animate={{
                                    r: [8, 20],
                                    opacity: [0.8, 0]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: index * 0.15
                                }}
                            />

                            {/* Label on hover */}
                            {isHovered && (
                                <motion.g
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <rect
                                        x={location.x * 8 - 40}
                                        y={location.y * 6 - 35}
                                        width="80"
                                        height="24"
                                        rx="4"
                                        fill="#8B6F47"
                                        className="drop-shadow-lg"
                                    />
                                    <text
                                        x={location.x * 8}
                                        y={location.y * 6 - 18}
                                        textAnchor="middle"
                                        fill="white"
                                        fontSize="12"
                                        fontWeight="bold"
                                        className="pointer-events-none"
                                    >
                                        {location.name}
                                    </text>
                                </motion.g>
                            )}
                        </g>
                    )
                })}
            </svg>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-mcs-gold/30">
                <div className="flex items-center gap-2 text-sm text-mcs-dark-brown">
                    <div className="w-3 h-3 rounded-full bg-mcs-gold border-2 border-mcs-brown"></div>
                    <span className="font-semibold">Operational Zones</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">Hover over markers for details</p>
            </div>
        </div>
    )
}
