'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/certifications', label: 'Certifications' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-mcs-gold/30 shadow-sm flex items-center justify-center bg-white p-1">
                <Image
                  src="/mcs.jpg"
                  alt="MCS Logo"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className="text-mcs-dark-brown hover:text-mcs-gold transition-colors font-medium relative group"
                >
                  {link.label}
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-mcs-gold group-hover:w-full transition-all duration-300"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                  />
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <a
                href="https://mcsone-ascydsgdf4ate5fm.canadacentral-01.azurewebsites.net"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-mcs-dark-brown text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-mcs-gold transition-all duration-300 shadow-md"
              >
                LOGIN
              </a>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-mcs-dark-brown"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-mcs-dark-brown hover:text-mcs-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://mcsone-ascydsgdf4ate5fm.canadacentral-01.azurewebsites.net"
              target="_blank"
              rel="noopener noreferrer"
              className="block py-3 mt-2 text-center bg-mcs-dark-brown text-white rounded-lg font-bold hover:bg-mcs-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              LOGIN
            </a>
          </div>
        )}
      </nav>
    </header>
  )
}

