import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  ArrowLeft,
  Home,
  Users,
  Calendar,
  Building2,
  Briefcase,
  MessageSquare,
  DollarSign,
  Settings,
} from "lucide-react"

export default function UserManualPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <Link href="/help" className="flex items-center space-x-2">
            <ArrowLeft className="h-5 w-5" />
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🕉</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Sanatan New Zealand</h1>
              <p className="text-sm text-gray-600">User Manual</p>
            </div>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sanatan NZ User Manual</h2>
            <p className="text-gray-600">A comprehensive guide to using the Sanatan New Zealand platform.</p>
          </div>

          <Accordion type="multiple" className="w-full">
            {/* Getting Started */}
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
                <div className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-orange-600" />
                  Getting Started
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 text-gray-700 space-y-4">
                <p>
                  Welcome to the Sanatan New Zealand platform! This manual will guide you through all the features and
                  functionalities available to you.
                </p>
                <h4 className="font-semibold mt-4">Registration & Login:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>To access personalized features, you need to register for an account.</li>
                  <li>Click on "Join" or "Login" in the navigation bar.</li>
                  <li>You can register as a Devotee or as a Temple/Business.</li>
                  <li>Follow the prompts to create your profile.</li>
                </ul>
                <h4 className="font-semibold mt-4">Navigating the Platform:</h4>
                <p>The main navigation bar at the top provides quick access to key sections:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <strong>Home:</strong> Your personalized dashboard and quick overview.
                  </li>
                  <li>
                    <strong>Mandirs:</strong> Directory of Sanatan temples across New Zealand.
                  </li>
                  <li>
                    <strong>Events:</strong> Upcoming festivals, pujas, and community gatherings.
                  </li>
                  <li>
                    <strong>Community:</strong> Discussion forums and groups.
                  </li>
                  <li>
                    <strong>Business Directory:</strong> Listings of Sanatan-owned businesses.
                  </li>
                  <li>
                    <strong>Panchang:</strong> Daily Hindu calendar and auspicious timings.
                  </li>
                  <li>
                    <strong>Donate:</strong> Support temples and community initiatives.
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* Devotee Profile */}
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-orange-600" />
                  Managing Your Devotee Profile
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 text-gray-700 space-y-4">
                <p>Your devotee profile allows you to personalize your experience and connect with others.</p>
                <h4 className="font-semibold mt-4">Editing Your Profile:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Go to "My Profile" from the user dropdown menu.</li>
                  <li>You can update your personal details, spiritual name, city, and bio.</li>
                  <li>Add your spiritual practices and interests to connect with like-minded devotees.</li>
                  <li>Upload an avatar to personalize your profile.</li>
                </ul>
                <h4 className="font-semibold mt-4">Activity Log:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    View your recent activities on the platform, such as event registrations, temple visits, and
                    discussion posts.
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* Mandir Directory */}
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-orange-600" />
                  Mandir Directory
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 text-gray-700 space-y-4">
                <p>Explore a comprehensive list of Sanatan temples across New Zealand.</p>
                <h4 className="font-semibold mt-4">Searching for Mandirs:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Use the search bar to find temples by name, deity, or city.</li>
                  <li>Filter by city to find temples in your local area.</li>
                </ul>
                <h4 className="font-semibold mt-4">Mandir Details:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    Click on a temple listing to view its full profile, including address, contact information,
                    services, and facilities.
                  </li>
                  <li>View photos and read reviews from other devotees.</li>
                </ul>
                <h4 className="font-semibold mt-4">Adding a New Mandir:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>If you are an authorized representative, you can submit a new temple for listing.</li>
                  <li>Go to the "Mandirs" section and click "Add New Mandir".</li>
                  <li>Fill in all required details; submissions will be reviewed by administrators.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* Events */}
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-orange-600" />
                  Events & Festivals
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 text-gray-700 space-y-4">
                <p>Stay updated with upcoming Sanatan events, festivals, pujas, and satsangs.</p>
                <h4 className="font-semibold mt-4">Browsing Events:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Events are listed chronologically.</li>
                  <li>Use filters to narrow down events by city, category, or date.</li>
                </ul>
                <h4 className="font-semibold mt-4">Event Details & Registration:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Click on an event to view its full description, schedule, location, and organizer details.</li>
                  <li>For events requiring registration, follow the "Register Now" button.</li>
                </ul>
                <h4 className="font-semibold mt-4">Creating an Event:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>If you are organizing a community event, you can submit it for listing.</li>
                  <li>Go to the "Events" section and click "Create Event".</li>
                  <li>Fill in all details, including date, time, location, and organizer information.</li>
                  <li>Your event will be reviewed by administrators before publication.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* Business Directory */}
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-orange-600" />
                  Business Directory
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 text-gray-700 space-y-4">
                <p>Discover and support Sanatan-owned or related businesses in New Zealand.</p>
                <h4 className="font-semibold mt-4">Searching Businesses:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Search by business name, category, or city.</li>
                  <li>Filter by category (e.g., catering, clothing, spiritual items).</li>
                </ul>
                <h4 className="font-semibold mt-4">Business Listings:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>View business profiles with contact details, services, operating hours, and special offers.</li>
                </ul>
                <h4 className="font-semibold mt-4">Listing Your Business:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>If you own a business relevant to the Sanatan community, you can submit it for listing.</li>
                  <li>Go to the "Business Directory" section and click "Register Your Business".</li>
                  <li>Provide comprehensive details about your business; submissions are subject to admin review.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* Community Hub */}
            <AccordionItem value="item-6">
              <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-orange-600" />
                  Community Hub
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 text-gray-700 space-y-4">
                <p>Engage with the wider Sanatan community through discussions and groups.</p>
                <h4 className="font-semibold mt-4">Discussions:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Browse various discussion topics by category.</li>
                  <li>Start a new discussion to ask questions or share insights.</li>
                  <li>Reply to existing posts and interact with other members.</li>
                </ul>
                <h4 className="font-semibold mt-4">Groups:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    Discover and join groups based on shared interests (e.g., Bhagavad Gita study, local temple
                    volunteers).
                  </li>
                  <li>Participate in group-specific discussions and activities.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* Donations */}
            <AccordionItem value="item-7">
              <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-orange-600" />
                  Donations
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 text-gray-700 space-y-4">
                <p>Support the Sanatan community by making online donations.</p>
                <h4 className="font-semibold mt-4">How to Donate:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Go to the "Donate" section.</li>
                  <li>Choose your donation amount and type (e.g., General Fund, Annadaan, Temple Maintenance).</li>
                  <li>Optionally, specify a particular temple or event you wish to support.</li>
                  <li>Select your preferred payment method and complete the transaction securely.</li>
                </ul>
                <p className="mt-2">All donations are processed securely and are tax-deductible where applicable.</p>
              </AccordionContent>
            </AccordionItem>

            {/* Admin Panel (if applicable) */}
            <AccordionItem value="item-8">
              <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-orange-600" />
                  Admin Panel (For Authorized Users)
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 text-gray-700 space-y-4">
                <p>The Admin Panel provides tools for platform administrators to manage content and users.</p>
                <h4 className="font-semibold mt-4">Accessing Admin Panel:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Only authorized administrators can access this section.</li>
                  <li>Login with your admin credentials.</li>
                </ul>
                <h4 className="font-semibold mt-4">Key Admin Functions:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <strong>Business Submissions:</strong> Review, approve, reject, and edit business listings.
                  </li>
                  <li>
                    <strong>Event Submissions:</strong> Review, approve, reject, and edit community event listings.
                  </li>
                  <li>
                    <strong>User Management:</strong> Manage devotee accounts and permissions (coming soon).
                  </li>
                  <li>
                    <strong>Content Management:</strong> Manage temple information, discussion categories, etc. (coming
                    soon).
                  </li>
                  <li>
                    <strong>Analytics:</strong> View platform statistics (coming soon).
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="text-center mt-8">
            <p className="text-gray-600">
              Still have questions?{" "}
              <Link href="/help" className="text-orange-600 hover:underline">
                Visit our main Help Center
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
