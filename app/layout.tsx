import type { Metadata } from 'next'
import { ReactNode } from 'react'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Analytics from '@/components/Analytics'

export const metadata: Metadata = {
  title: 'Mubadrah Comprehensive Services L.L.C | Integrated Facility Management Solutions',
  description: 'Leading quasi-government company delivering integrated facility management solutions across the Sultanate of Oman.',
  icons: {
    icon: '/mcs.jpg',
  }
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Analytics />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

