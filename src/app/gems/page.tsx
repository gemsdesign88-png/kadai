import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'KadaiPOS Gems | Premium Restaurant Management Features',
  description: 'Discover premium features and advanced tools for restaurant management with KadaiPOS Gems.',
}

export default function GemsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            KadaiPOS <span className="text-purple-600">Gems</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlock premium features and advanced tools designed to take your restaurant management to the next level.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">💎</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Advanced Analytics</h3>
            <p className="text-gray-600">
              Deep insights into your restaurant performance with AI-powered analytics and forecasting.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Automation Suite</h3>
            <p className="text-gray-600">
              Automate inventory management, staff scheduling, and customer communications.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🔗</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Integration Hub</h3>
            <p className="text-gray-600">
              Connect with popular delivery services, accounting software, and third-party tools.
            </p>
          </div>
        </div>

        <div className="text-center">
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Coming Soon</h2>
            <p className="text-gray-600 mb-6">
              We're working hard to bring you these premium features. Stay tuned for updates!
            </p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Get Notified
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}