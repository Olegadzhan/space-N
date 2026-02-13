'use client'

import { Suspense, useState } from 'react'
import RealSpaceGallery from '@/components/cosmic/RealSpaceGallery'
import { Image, Telescope, Camera } from 'lucide-react'

export default function RealPhotosPage() {
  const [filter, setFilter] = useState<'all' | 'planets' | 'nebulae' | 'galaxies'>('all')

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-neon-blue via-cosmic-pink to-neon-blue mb-4">
            REAL COSMIC WONDERS
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore breathtaking photographs captured by NASA telescopes and space missions
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="mb-8 flex justify-center gap-3 flex-wrap">
          {[
            { id: 'all', label: 'All', icon: <Image className="w-5 h-5" /> },
            { id: 'planets', label: 'Planets', icon: <Telescope className="w-5 h-5" /> },
            { id: 'nebulae', label: 'Nebulae', icon: <Camera className="w-5 h-5" /> },
            { id: 'galaxies', label: 'Galaxies', icon: <Image className="w-5 h-5" /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id as any)}
              className={`px-6 py-3 rounded-full font-orbitron text-sm md:text-base transition-all ${
                filter === item.id
                  ? 'bg-gradient-to-r from-deep-purple to-neon-blue text-white shadow-lg shadow-neon-blue/30'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                {item.icon}
                {item.label}
              </div>
            </button>
          ))}
        </div>

        <Suspense fallback={
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-neon-blue"></div>
          </div>
        }>
          <RealSpaceGallery filter={filter} />
        </Suspense>

        {/* Info Section */}
        <div className="mt-16 bg-gradient-to-br from-gray-900/50 to-purple-900/20 rounded-2xl p-8 border border-neon-blue/10">
          <h2 className="text-3xl font-orbitron text-neon-blue mb-4 text-center">
            About Our Cosmic Collection
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <InfoCard
              title="Hubble Space Telescope"
              description="Capturing the universe since 1990 with unprecedented clarity"
              icon="🔭"
            />
            
            <InfoCard
              title="James Webb Telescope"
              description="The most powerful space telescope revealing infrared wonders"
              icon="🌌"
            />
            
            <InfoCard
              title="NASA Missions"
              description="Real-time data from probes exploring our solar system"
              icon="🚀"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoCard({ title, description, icon }: {
  title: string
  description: string
  icon: string
}) {
  return (
    <div className="p-6 bg-gray-800/50 rounded-lg border border-neon-blue/10 text-center">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-xl font-orbitron text-neon-blue mb-2">
        {title}
      </h3>
      <p className="text-gray-300">{description}</p>
    </div>
  )
}
