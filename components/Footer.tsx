import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-mcs-dark-brown text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Image
              src="/MCS_Full_logo-removebg-preview.png"
              alt="MCS Logo"
              width={120}
              height={60}
              className="object-contain mb-4"
            />
            <p className="text-mcs-beige text-sm">
              Delivering reliable, sustainable, and high-quality services aligned with local and international standards.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-mcs-beige hover:text-mcs-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-mcs-beige hover:text-mcs-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-mcs-beige hover:text-mcs-gold transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/certifications" className="text-mcs-beige hover:text-mcs-gold transition-colors">
                  Certifications
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-mcs-beige hover:text-mcs-gold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-lg mb-4">Contact Information</h3>
            <div className="space-y-2 text-mcs-beige text-sm">
              <p>3rd Floor, KOM 5, Knowledge Oasis Muscat</p>
              <p>PO 135, PC 135</p>
              <p>Mobile: <a href="tel:+96892453631" className="hover:text-mcs-gold">+968 92453631</a></p>
              <p>Email: <a href="mailto:services.mcs@mubadrah.om" className="hover:text-mcs-gold">services.mcs@mubadrah.om</a></p>
            </div>

          </div>
        </div>

        <div className="border-t border-mcs-brown mt-8 pt-8 text-center text-mcs-beige text-sm">
          <p>&copy; {new Date().getFullYear()} Mubadrah Comprehensive Services L.L.C. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

