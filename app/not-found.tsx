import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-mcs-beige to-white">
      <div className="text-center px-4">
        <h1 className="text-6xl font-heading font-bold text-mcs-dark-brown mb-4">404</h1>
        <h2 className="text-3xl font-heading font-semibold text-mcs-brown mb-4">Page Not Found</h2>
        <p className="text-gray-700 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          href="/"
          className="inline-block bg-mcs-dark-brown text-white px-8 py-3 rounded-lg font-semibold hover:bg-mcs-brown transition-colors"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  )
}

