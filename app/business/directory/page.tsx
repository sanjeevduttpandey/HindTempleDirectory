import BusinessDirectory from "@/components/business-directory"

const BusinessDirectoryPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Sanatan Business Directory</h1>
      <p className="mb-4">Support the Sanatan community by discovering and patronizing Sanatan-owned businesses.</p>
      <BusinessDirectory />
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">Own a Sanatan Business?</h2>
        <p>List your Sanatan business in our directory and reach a wider audience within the Sanatan community.</p>
        {/* Add a link or button to a submission form here */}
      </div>
    </div>
  )
}

export default BusinessDirectoryPage
