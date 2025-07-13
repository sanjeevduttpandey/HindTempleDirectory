import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-gray-900">Disclaimer & Terms</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none text-gray-700">
            <p className="font-bold mb-4">Disclaimer for Sanatan New Zealand Business Directory and Event Listings</p>

            <p className="mb-4">
              Sanatan New Zealand provides its business directory and event listings as a community service to connect
              individuals with businesses, services, and events that may be relevant to the Sanatan community in New
              Zealand.
            </p>

            <p className="mb-4">
              By listing your business or event, or by using the services/attending events listed herein, you
              acknowledge and agree to the following:
            </p>

            <h3 className="text-xl font-semibold mb-2">1. No Endorsement or Guarantee</h3>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>
                Sanatan New Zealand does not endorse, guarantee, or warrant the quality, accuracy, reliability, or
                legality of any businesses, products, services, or events listed in this directory or on this platform.
              </li>
              <li>
                The inclusion of any business or event does not constitute an endorsement, recommendation, or approval
                by Sanatan New Zealand.
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">2. Independent Verification</h3>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>
                Users are solely responsible for conducting their own due diligence and verification before engaging
                with any business, service provider, or event organizer listed. This includes, but is not limited to,
                checking credentials, licenses, references, reviews, and event details.
              </li>
              <li>
                Event attendees should verify event times, locations, and any associated costs directly with the event
                organizer.
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">3. Third-Party Content</h3>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>
                The information provided in business listings and event details is supplied by the respective businesses
                and event organizers.
              </li>
              <li>
                Sanatan New Zealand is not responsible for any errors, omissions, inaccuracies, or misrepresentations in
                such information.
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">4. No Liability</h3>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>
                Sanatan New Zealand shall not be liable for any direct, indirect, incidental, special, consequential, or
                punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any
                loss of data, use, goodwill, or other intangible losses, resulting from:
                <ul className="list-circle list-inside ml-4">
                  <li>
                    Your access to or use of or inability to access or use the services provided by listed businesses or
                    events.
                  </li>
                  <li>
                    Any conduct or content of any third party (businesses, event organizers, or other users) on the
                    platform.
                  </li>
                  <li>Unauthorized access, use, or alteration of your transmissions or content.</li>
                </ul>
              </li>
              <li>Your use of the business directory and event listings is at your sole risk.</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">5. Compliance</h3>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>
                Businesses and event organizers listed are solely responsible for ensuring their compliance with all
                applicable local, national, and international laws, regulations, and standards, including but not
                limited to consumer protection laws, privacy laws, health and safety regulations, and industry-specific
                regulations.
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">6. Dispute Resolution</h3>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>
                Any disputes or issues arising between a user and a listed business or event organizer must be resolved
                directly between the parties involved. Sanatan New Zealand is not a party to such disputes and will not
                mediate or arbitrate.
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">7. Changes to Listings and Content</h3>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>
                Sanatan New Zealand reserves the right to remove or modify any business listing or event detail at its
                sole discretion, without prior notice, for any reason, including but not limited to non-compliance with
                our guidelines, community standards, or legal requirements.
              </li>
            </ul>

            <p className="mt-6">
              By using this platform, you confirm that you have read, understood, and agree to this disclaimer and
              terms.
            </p>
            <div className="mt-8 text-center">
              <Link href="/" className="text-orange-600 hover:underline text-lg font-medium">
                Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
