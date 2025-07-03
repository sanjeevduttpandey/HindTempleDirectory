import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-white text-lg font-bold">
          My Website
        </Link>

        <div className="flex items-center space-x-4">
          <Link href="/about" className="text-gray-300 hover:text-white">
            About
          </Link>

          <div className="relative group">
            <button className="text-gray-300 hover:text-white">Community</button>
            <div className="absolute hidden group-hover:block bg-gray-700 text-white py-2 rounded shadow-lg mt-2 w-48">
              <Link href="/community/forums" className="block px-4 py-2 hover:bg-gray-600">
                Forums
              </Link>
              <Link href="/community/events" className="block px-4 py-2 hover:bg-gray-600">
                Events
              </Link>
            </div>
          </div>

          <div className="relative group">
            <button className="text-gray-300 hover:text-white">Business</button>
            <div className="absolute hidden group-hover:block bg-gray-700 text-white py-2 rounded shadow-lg mt-2 w-48">
              <Link href="/business/directory" className="block px-4 py-2 hover:bg-gray-600">
                Business Directory
              </Link>
              <Link href="/business/register" className="block px-4 py-2 hover:bg-gray-600">
                Register Business
              </Link>
              <Link href="/business/services" className="block px-4 py-2 hover:bg-gray-600">
                Services
              </Link>
              <Link href="/business/marketplace" className="block px-4 py-2 hover:bg-gray-600">
                Marketplace
              </Link>
            </div>
          </div>

          <div className="relative group">
            <button className="text-gray-300 hover:text-white">Spiritual Tools</button>
            <div className="absolute hidden group-hover:block bg-gray-700 text-white py-2 rounded shadow-lg mt-2 w-48">
              <Link href="/panchang" className="block px-4 py-2 hover:bg-gray-600">
                Panchang
              </Link>
              <Link href="/festivals" className="block px-4 py-2 hover:bg-gray-600">
                Sanatan Festivals
              </Link>
              <Link href="/datetime" className="block px-4 py-2 hover:bg-gray-600">
                Date &amp; Time
              </Link>
            </div>
          </div>

          <Link href="/contact" className="text-gray-300 hover:text-white">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
