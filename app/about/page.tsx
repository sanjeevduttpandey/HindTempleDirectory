import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Globe, BookOpen, HandIcon as Hands, Star } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-orange-800 mb-6">About Sanatan New Zealand</h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
            Preserving ancient wisdom, building modern communities, and fostering spiritual growth across Aotearoa New
            Zealand
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Badge variant="secondary" className="text-lg py-2 px-4">
              <Heart className="w-4 h-4 mr-2" />
              Unity
            </Badge>
            <Badge variant="secondary" className="text-lg py-2 px-4">
              <Users className="w-4 h-4 mr-2" />
              Community
            </Badge>
            <Badge variant="secondary" className="text-lg py-2 px-4">
              <Globe className="w-4 h-4 mr-2" />
              Heritage
            </Badge>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-orange-200 shadow-lg">
              <CardHeader className="bg-orange-100">
                <CardTitle className="text-2xl text-orange-800 flex items-center">
                  <Star className="w-6 h-6 mr-3" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  To create a vibrant, inclusive community that preserves and promotes the rich traditions of Sanatan
                  Dharma while fostering spiritual growth, cultural understanding, and social harmony across New
                  Zealand.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    Preserve ancient wisdom and traditions
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    Build strong community connections
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    Promote interfaith dialogue and understanding
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    Support spiritual and personal development
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-orange-200 shadow-lg">
              <CardHeader className="bg-orange-100">
                <CardTitle className="text-2xl text-orange-800 flex items-center">
                  <Globe className="w-6 h-6 mr-3" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  To be the leading platform that unites the Sanatan community across New Zealand, creating a harmonious
                  society where ancient wisdom guides modern living and cultural diversity is celebrated.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>A connected network of temples and communities
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    Accessible spiritual education for all ages
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    Cultural integration with New Zealand society
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    Sustainable growth and community development
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 bg-orange-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-orange-800 text-center mb-12">Our Story</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-xl leading-relaxed mb-6">
              Sanatan New Zealand was born from a vision to create a unified platform that connects the diverse Sanatan
              Dharma communities across Aotearoa. Founded by passionate community members who recognized the need for
              better coordination and communication among temples, cultural organizations, and individuals.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Our journey began with the simple observation that while New Zealand is home to numerous temples, cultural
              centers, and spiritual communities, there was no central hub to bring them together. We saw families
              traveling long distances to find temples, missing important festivals, and struggling to connect with
              like-minded individuals.
            </p>
            <p className="text-lg leading-relaxed">
              Today, we serve as the bridge that connects communities from Auckland to Christchurch, from Wellington to
              Hamilton, ensuring that no one feels isolated in their spiritual journey. We celebrate the diversity
              within our traditions while maintaining the core values that unite us all.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-orange-800 text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-orange-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-orange-800 mb-3">Seva (Service)</h3>
                <p className="text-gray-600">
                  Selfless service to the community and society, embodying the spirit of giving without expectation of
                  return.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-orange-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-orange-800 mb-3">Sangha (Unity)</h3>
                <p className="text-gray-600">
                  Building strong bonds within our community while respecting diversity and fostering inclusive
                  participation.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-orange-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-orange-800 mb-3">Gyan (Knowledge)</h3>
                <p className="text-gray-600">
                  Preserving and sharing ancient wisdom while embracing learning and growth in the modern world.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-orange-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Hands className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-orange-800 mb-3">Dharma (Righteousness)</h3>
                <p className="text-gray-600">
                  Living with integrity, honesty, and moral principles that guide our actions and decisions.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-orange-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-orange-800 mb-3">Vasudhaiva Kutumbakam</h3>
                <p className="text-gray-600">
                  "The world is one family" - embracing universal brotherhood and harmony across all communities.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-orange-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-orange-800 mb-3">Ahimsa (Non-violence)</h3>
                <p className="text-gray-600">
                  Promoting peace, compassion, and non-violence in thought, word, and action towards all beings.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 px-4 bg-orange-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-orange-800 text-center mb-12">What We Do</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-orange-800 mb-3">Temple Directory</h3>
              <p className="text-gray-600">
                Comprehensive listing of temples and spiritual centers across New Zealand with detailed information,
                timings, and contact details.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-orange-800 mb-3">Event Coordination</h3>
              <p className="text-gray-600">
                Organizing and promoting festivals, cultural events, spiritual gatherings, and community celebrations
                throughout the year.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-orange-800 mb-3">Community Building</h3>
              <p className="text-gray-600">
                Creating platforms for community members to connect, share experiences, and support each other in their
                spiritual journey.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-orange-800 mb-3">Educational Programs</h3>
              <p className="text-gray-600">
                Offering classes, workshops, and seminars on Sanskrit, yoga, meditation, philosophy, and cultural
                traditions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-orange-800 mb-3">Youth Engagement</h3>
              <p className="text-gray-600">
                Special programs and activities designed to engage young people and help them connect with their
                cultural roots.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-orange-800 mb-3">Charitable Activities</h3>
              <p className="text-gray-600">
                Coordinating community service projects, fundraising for causes, and supporting those in need within and
                beyond our community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-orange-800 mb-6">Join Our Community</h2>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Whether you're new to New Zealand or have been here for generations, whether you're seeking spiritual
            guidance or wanting to contribute to the community, there's a place for you in our Sanatan New Zealand
            family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/join"
              className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
            >
              Become a Member
            </a>
            <a
              href="/events"
              className="border-2 border-orange-600 text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 hover:text-white transition-colors"
            >
              Attend Events
            </a>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4 bg-orange-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="text-xl mb-8 opacity-90">Have questions or want to get involved? We'd love to hear from you.</p>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="opacity-90">info@sanatannz.org</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <p className="opacity-90">+64 21 XXX XXXX</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Address</h3>
              <p className="opacity-90">Auckland, New Zealand</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
