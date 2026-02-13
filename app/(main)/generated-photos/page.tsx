'use client'

import { Suspense } from 'react'
import AIImageGenerator from '@/components/cosmic/AIImageGenerator'
import { Palette, Sparkles, Image } from 'lucide-react'

export default function GeneratedPhotosPage() {
  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-neon-blue via-cosmic-pink to-neon-blue mb-4">
            AI COSMIC ART
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Create stunning cosmic imagery with artificial intelligence. 
            Let your imagination explore the universe.
          </p>
        </div>

        <Suspense fallback={
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-neon-blue"></div>
          </div>
        }>
          <AIImageGenerator />
        </Suspense>

        {/* Tips Section */}
        <div className="mt-16 bg-gradient-to-br from-gray-900/50 to-purple-900/20 rounded-2xl p-8 border border-neon-blue/10">
          <h2 className="text-3xl font-orbitron text-neon-blue mb-6 text-center">
            Creative Prompts to Try
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Nebula Dreams",
                prompt: "A vibrant nebula with purple and blue gas clouds, distant stars, 4K"
              },
              {
                title: "Exoplanet Discovery",
                prompt: "An alien planet with rings, orbiting a binary star system, sci-fi art"
              },
              {
                title: "Galactic Collision",
                prompt: "Two spiral galaxies merging, cosmic dust clouds, Hubble style"
              },
              {
                title: "Space Station",
                prompt: "Futuristic space station orbiting Earth, detailed, cinematic lighting"
              }
            ].map((tip, index) => (
              <div key={index} className="p-4 bg-gray-800/50 rounded-lg border border-neon-blue/10">
                <h3 className="font-orbitron text-neon-blue mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-300 bg-gray-900 p-3 rounded">
                  "{tip.prompt}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
