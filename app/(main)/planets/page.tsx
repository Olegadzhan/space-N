'use client'

import { Suspense, useState, useEffect } from 'react'
import PlanetSystem from '@/components/cosmic/PlanetSystem'
import CosmicMusicPlayer from '@/components/cosmic/CosmicMusicPlayer'
import LoadingSpinner from '@/components/cosmic/LoadingSpinner'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'

export default function PlanetsPage() {
  const [mounted, setMounted] = useState(false)
  const [showMusicPlayer, setShowMusicPlayer] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-neon-blue via-cosmic-pink to-neon-blue mb-4">
            SOLAR SYSTEM
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our cosmic neighborhood with this interactive 3D visualization. 
            Watch planets orbit in real-time with scientifically accurate relative speeds.
          </p>
        </div>

        <div className="relative">
          <div className="absolute top-4 right-4 z-20">
            <button
              onClick={() => setShowMusicPlayer(!showMusicPlayer)}
              className="p-3 bg-gray-900/80 border border-neon-blue/30 rounded-lg hover:bg-gray-800 transition-colors"
              title={showMusicPlayer ? 'Hide Music Player' : 'Show Music Player'}
            >
              {showMusicPlayer ? (
                <Pause className="w-6 h-6 text-neon-blue" />
              ) : (
                <Play className="w-6 h-6 text-neon-blue" />
              )}
            </button>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-neon-blue/20">
            <div className="h-[70vh] md:h-[80vh] w-full">
              <PlanetSystem />
            </div>
          </div>

          {showMusicPlayer && (
            <div className="mt-8">
              <CosmicMusicPlayer />
            </div>
          )}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { name: 'Mercury', desc: 'Fastest orbit, extreme temperatures' },
            { name: 'Venus', desc: 'Hottest planet, thick atmosphere' },
            { name: 'Earth', desc: 'Our home, only known life' },
            { name: 'Mars', desc: 'Red planet, potential for life' },
            { name: 'Jupiter', desc: 'Largest planet, Great Red Spot' },
            { name: 'Saturn', desc: 'Beautiful rings, low density' },
            { name: 'Uranus', desc: 'Ice giant, rotates on side' },
            { name: 'Neptune', desc: 'Windiest planet, deep blue' },
          ].map((planet, index) => (
            <div 
              key={index} 
              className="p-6 bg-gradient-to-br from-gray-900/50 to-purple-900/20 rounded-xl border border-neon-blue/10 text-center"
            >
              <h3 className="text-2xl font-orbitron text-neon-blue mb-2">
                {planet.name}
              </h3>
              <p className="text-gray-300 text-sm">{planet.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
