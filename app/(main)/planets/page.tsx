'use client'

import { useState, useEffect } from 'react'
import PlanetSystem from '@/components/cosmic/PlanetSystem'
import CosmicMusicPlayer from '@/components/cosmic/CosmicMusicPlayer'
import AnimatedSection from '@/components/ui/AnimatedSection'

export default function PlanetsPage() {
  const [mounted, setMounted] = useState(false)
  const [showMusicPlayer, setShowMusicPlayer] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="fixed inset-0 bg-space-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-6">
            <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-neon-blue mx-auto"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="animate-ping rounded-full h-16 w-16 border-t-4 border-b-4 border-cosmic-pink"></div>
            </div>
          </div>
          <h2 className="text-2xl font-orbitron text-neon-blue mb-2">Loading Cosmic Data...</h2>
          <p className="text-gray-400">Preparing your interstellar journey</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection direction="up" delay={0.1}>
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-neon-blue via-cosmic-pink to-neon-blue mb-4">
              SOLAR SYSTEM
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our cosmic neighborhood with this interactive 3D visualization. 
              Watch planets orbit in real-time with scientifically accurate relative speeds.
            </p>
          </div>
        </AnimatedSection>

        <div className="relative">
          <div className="absolute top-4 right-4 z-20">
            <button
              onClick={() => setShowMusicPlayer(!showMusicPlayer)}
              className="p-3 bg-asteroid-gray border border-neon-blue/30 rounded-lg hover:bg-gray-800 transition-colors glow"
              title={showMusicPlayer ? 'Hide Music Player' : 'Show Music Player'}
            >
              {showMusicPlayer ? '⏸️' : '▶️'}
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
            <AnimatedSection key={index} direction={index % 2 === 0 ? "left" : "right"} delay={0.3 + index * 0.05}>
              <div className="p-6 bg-asteroid-gray rounded-xl border border-neon-blue/10 text-center hover:border-neon-blue/30 transition-colors">
                <h3 className="text-2xl font-orbitron text-neon-blue mb-2">
                  {planet.name}
                </h3>
                <p className="text-gray-300 text-sm">{planet.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  )
}
