import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Building2, Calendar, MessageCircle, Home, Info, Users, Sparkles } from "lucide-react"

export function StaticHeader() {
  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2 mr-6">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">🕉</span>
            </div>
            <span className="font-bold text-lg hidden md:inline">Sanatan NZ</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-orange-600 flex items-center gap-1">
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-orange-600 flex items-center gap-1">
              <Info className="h-4 w-4" />
              About
            </Link>
            <Link href="/temples" className="text-gray-700 hover:text-orange-600 flex items-center gap-1">
              <Building2 className="h-4 w-4" />
              Mandirs
            </Link>
            <Link href="/events" className="text-gray-700 hover:text-orange-600 flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Satsangs
            </Link>

            <div className="relative group">
              <button className="text-gray-700 hover:text-orange-600 flex items-center gap-1">
                <Users className="h-4 w-4" />
                Community
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  <Link href="/community" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Discussions
                  </Link>
                  <Link href="/community/groups" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Groups
                  </Link>
                  <Link href="/festivals" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Festivals
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative group">
              <button className="text-gray-700 hover:text-orange-600 flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                Business
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  <Link href="/business/directory" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Business Directory
                  </Link>
                  <Link href="/business/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Register Business
                  </Link>
                  <Link href="/business/services" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Services
                  </Link>
                  <Link
                    href="/business/marketplace"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Marketplace
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative group">
              <button className="text-gray-700 hover:text-orange-600 flex items-center gap-1">
                <Sparkles className="h-4 w-4" />
                Spiritual Tools
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  <Link href="/panchang" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Panchang
                  </Link>
                  <Link href="/datetime" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Hindu Time
                  </Link>
                  <Link href="/festivals" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Festival Calendar
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" className="hidden md:flex" asChild>
            <Link href="/help">Help</Link>
          </Button>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <MessageCircle className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
