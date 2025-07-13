import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import {
  Search,
  BookOpen,
  MessageCircle,
  Mail,
  Phone,
  Lightbulb,
  ShieldCheck,
  DollarSign,
  Briefcase,
} from "lucide-react"
import { Input } from "@/components/ui/input"

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🕉</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Sanatan New Zealand</h1>
              <p className="text-sm text-gray-600">Help Center</p>
            </div>
          </Link>
        </div>
      </header>

      <section className="py-12 px-4 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">How Can We Help You?</h2>
          <p className="text-xl mb-8 opacity-90">
            Find answers to common questions or get in touch with our support team.
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input placeholder="Search for articles or topics..." className="pl-10 bg-white text-gray-900" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Popular Topics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-md transition-shadow">
              <Link href="/help/user-manual" className="block p-6">
                <BookOpen className="h-10 w-10 text-orange-600 mx-auto mb-3" />
                <CardTitle className="text-lg">User Manual</CardTitle>
                <CardDescription>Get started with the platform and its features.</CardDescription>
              </Link>
            </Card>
            <Card className="text-center hover:shadow-md transition-shadow">
              <Link href="/help/faq" className="block p-6">
                <Lightbulb className="h-10 w-10 text-orange-600 mx-auto mb-3" />
                <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
                <CardDescription>Quick answers to common queries.</CardDescription>
              </Link>
            </Card>
            <Card className="text-center hover:shadow-md transition-shadow">
              <Link href="/help/privacy-policy" className="block p-6">
                <ShieldCheck className="h-10 w-10 text-orange-600 mx-auto mb-3" />
                <CardTitle className="text-lg">Privacy & Security</CardTitle>
                <CardDescription>Understand how your data is protected.</CardDescription>
              </Link>
            </Card>
            <Card className="text-center hover:shadow-md transition-shadow">
              <Link href="/help/donations" className="block p-6">
                <DollarSign className="h-10 w-10 text-orange-600 mx-auto mb-3" />
                <CardTitle className="text-lg">Donations</CardTitle>
                <CardDescription>Information about contributing to the community.</CardDescription>
              </Link>
            </Card>
            <Card className="text-center hover:shadow-md transition-shadow">
              <Link href="/help/event-guidelines" className="block p-6">
                <Briefcase className="h-10 w-10 text-orange-600 mx-auto mb-3" />
                <CardTitle className="text-lg">Event Guidelines</CardTitle>
                <CardDescription>Rules for creating and managing events.</CardDescription>
              </Link>
            </Card>
            <Card className="text-center hover:shadow-md transition-shadow">
              <Link href="/help/business-guidelines" className="block p-6">
                <Briefcase className="h-10 w-10 text-orange-600 mx-auto mb-3" />
                <CardTitle className="text-lg">Business Guidelines</CardTitle>
                <CardDescription>Rules for listing businesses in the directory.</CardDescription>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-100">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Still Need Help?</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            If you can't find what you're looking for, our support team is here to assist you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-orange-600 hover:bg-orange-700" asChild>
              <Link href="/contact">
                <MessageCircle className="mr-2 h-5 w-5" />
                Contact Support
              </Link>
            </Button>
            <Button variant="outline" className="bg-transparent" asChild>
              <Link href="mailto:support@sanatannz.org.nz">
                <Mail className="mr-2 h-5 w-5" />
                Email Us
              </Link>
            </Button>
            <Button variant="outline" className="bg-transparent">
              <Phone className="mr-2 h-5 w-5" />
              Call Us: +64 9 123 4567
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
