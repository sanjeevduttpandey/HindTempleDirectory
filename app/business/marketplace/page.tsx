"use client"

const MarketplacePage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4">Sanatan Business Marketplace</h1>
      <p className="mb-4">
        Welcome to the Sanatan Business Marketplace, a curated space for businesses aligned with Sanatan values.
        Discover a wide range of products and services offered by businesses that prioritize ethical practices and
        cultural preservation.
      </p>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Example Marketplace Item */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-2">Example Sanatan Business</h2>
          <p className="text-gray-700">
            A brief description of the Sanatan business and its offerings. This could include details about their
            products, services, or mission.
          </p>
          <a href="#" className="inline-block mt-2 text-blue-500 hover:underline">
            Learn More
          </a>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-2">Another Sanatan Business</h2>
          <p className="text-gray-700">Another brief description of a Sanatan business.</p>
          <a href="#" className="inline-block mt-2 text-blue-500 hover:underline">
            Learn More
          </a>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-2">Third Sanatan Business</h2>
          <p className="text-gray-700">A third example of a Sanatan business listed on the marketplace.</p>
          <a href="#" className="inline-block mt-2 text-blue-500 hover:underline">
            Learn More
          </a>
        </div>
      </section>
    </div>
  )
}

export default MarketplacePage
