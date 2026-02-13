'use client'

import { Suspense, useState } from 'react'
import AIMusicGenerator from '@/components/cosmic/AIMusicGenerator'
import CosmicMusicPlayer from '@/components/cosmic/CosmicMusicPlayer'
import { Music, Sparkles, Headphones } from 'lucide-react'

export default function MusicPage() {
  const [activeTab, setActiveTab] = useState<'player' | 'generator'>('player')

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-neon-blue via-cosmic-pink to-neon-blue mb-4">
            COSMIC SOUNDS
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Immerse yourself in ethereal space music, or create your own cosmic symphony with AI
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex justify-center gap-4">
          <button
            onClick={() => setActiveTab('player')}
            className={`px-6 py-3 rounded-full font-orbitron text-lg transition-all ${
              activeTab === 'player'
                ? 'bg-gradient-to-r from-deep-purple to-neon-blue text-white shadow-lg shadow-neon-blue/30'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <Headphones className="w-5 h-5" />
              Music Player
            </div>
          </button>
          
          <button
            onClick={() => setActiveTab('generator')}
            className={`px-6 py-3 rounded-full font-orbitron text-lg transition-all ${
              activeTab === 'generator'
                ? 'bg-gradient-to-r from-deep-purple to-neon-blue text-white shadow-lg shadow-neon-blue/30'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              AI Generator
            </div>
          </button>
        </div>

        {/* Content */}
        {activeTab === 'player' ? (
          <CosmicMusicPlayer />
        ) : (
          <AIMusicGenerator />
        )}

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Music className="w-12 h-12" />}
            title="Curated Collection"
            description="Handpicked cosmic ambient tracks for deep space exploration"
          />
          
          <FeatureCard
            icon={<Sparkles className="w-12 h-12" />}
            title="AI Generation"
            description="Create unique space music based on your descriptions"
          />
          
          <FeatureCard
            icon={<Headphones className="w-12 h-12" />}
            title="Visualizer"
            description="Real-time audio visualization with cosmic effects"
          />
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="p-6 bg-gradient-to-br from-gray-900/50 to-purple-900/20 rounded-xl border border-neon-blue/10 text-center">
      <div className="flex justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-orbitron text-neon-blue mb-2">
        {title}
      </h3>
      <p className="text-gray-300">{description}</p>
    </div>
  )
}
