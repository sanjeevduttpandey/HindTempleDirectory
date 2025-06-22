export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header Skeleton */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
              <div>
                <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="w-24 h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section Skeleton */}
        <div className="mb-8">
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-5 w-96 bg-gray-200 rounded animate-pulse mb-4"></div>

          {/* Quote Card Skeleton */}
          <div className="bg-gray-100 rounded-lg p-6">
            <div className="h-6 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mb-1"></div>
            <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Skeleton */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Grid Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg border p-4">
                  <div className="w-8 h-8 bg-gray-200 rounded animate-pulse mx-auto mb-2"></div>
                  <div className="h-6 w-12 bg-gray-200 rounded animate-pulse mx-auto mb-1"></div>
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mx-auto"></div>
                </div>
              ))}
            </div>

            {/* Quick Actions Skeleton */}
            <div className="bg-white rounded-lg border p-6">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-48 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-20 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            </div>

            {/* Events Skeleton */}
            <div className="bg-white rounded-lg border p-6">
              <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-16 h-16 bg-gray-200 rounded animate-pulse"></div>
                    <div className="flex-1">
                      <div className="h-5 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-1"></div>
                      <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="w-16 h-8 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="space-y-6">
            {/* Hindu Time Widget Skeleton */}
            <div className="bg-white rounded-lg border p-4">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="h-16 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Panchang Skeleton */}
            <div className="bg-white rounded-lg border p-4">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Skeleton */}
            <div className="bg-white rounded-lg border p-4">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="flex-1">
                      <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-1"></div>
                      <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
