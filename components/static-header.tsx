import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Home, Settings, Menu } from "lucide-react"

// Static user data
const staticUser = {
  name: "Priya Sharma",
  spiritualName: "Bhakti Priya",
  email: "priya.sharma@email.com",
  avatar: "/placeholder.svg?height=40&width=40&text=PS",
}

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
            <Link href="/dashboard" className="text-gray-700 hover:text-orange-600">
              Dashboard
            </Link>
            <Link href="/temples" className="text-gray-700 hover:text-orange-600">
              Mandirs
            </Link>
            <Link href="/events" className="text-gray-700 hover:text-orange-600">
              Satsangs
            </Link>
            <Link href="/panchang" className="text-gray-700 hover:text-orange-600">
              Panchang
            </Link>
            <Link href="/community" className="text-gray-700 hover:text-orange-600">
              Community
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" className="hidden md:flex" asChild>
            <Link href="/donate">Daan (Donate)</Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={staticUser.avatar || "/placeholder.svg"} alt={staticUser.name} />
                  <AvatarFallback>
                    {staticUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{staticUser.name}</p>
                  {staticUser.spiritualName && <p className="text-xs text-amber-700">({staticUser.spiritualName})</p>}
                  <p className="text-xs leading-none text-muted-foreground">{staticUser.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Home className="mr-2 h-4 w-4" />
                <Link href="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/">Return to Home</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/temples">Mandirs</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/events">Satsangs</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/panchang">Panchang</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/community">Community</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/donate">Daan (Donate)</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
