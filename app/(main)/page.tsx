import { Suspense } from 'react'
import Link from 'next/link'
import { ArrowRight, Music, Image, Globe } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-7xl md:text-9xl font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-neon-blue via-cosmic-pink to-neon-blue animate-pulse mb-6">
          COSMIC PORTAL
        </h1>
        
        <p className="text-2xl md:text-3xl text-gray-300 mb-12 font-space-mono">
          Embark on an interstellar journey through the wonders of our universe
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <FeatureCard 
            icon={<Globe className="w-12 h-12" />}
            title="Interactive Solar System"
            description="Explore 3D animated planets with realistic orbital mechanics"
            href="/planets"
          />
          
          <FeatureCard 
            icon={<Music className="w-12 h-12" />}
            title="AI Cosmic Music"
            description="Generate ethereal space music with artificial intelligence"
            href="/music"
          />
          
          <FeatureCard 
            icon={<Image className="w-12 h-12" />}
            title="Real Space Gallery"
            description="Browse stunning NASA photographs of planets and nebulae"
            href="/real-photos"
          />
          
          <FeatureCard 
            icon={<Image className="w-12 h-12" />}
            title="AI Space Art"
            description="Create breathtaking cosmic imagery with AI generation"
            href="/generated-photos"
          />
        </div>

        <div className="space-y-4">
          <Link
            href="/planets"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-deep-purple to-neon-blue text-white rounded-full font-orbitron text-lg hover:scale-105 transition-transform shadow-lg shadow-neon-blue/30"
          >
            Start Your Journey
            <ArrowRight className="w-5 h-5" />
          </Link>
          
          <p className="text-sm text-gray-500 mt-4">
            No account required • Free to explore • Updated daily
          </p>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description, href }: {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}) {
  return (
    <Link
      href={href}
      className="group p-6 bg-gradient-to-br from-gray-900/50 to-purple-900/20 rounded-2xl border border-neon-blue/10 hover:border-neon-blue/50 hover:shadow-lg hover:shadow-neon-blue/20 transition-all cursor-pointer"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-deep-purple to-neon-blue flex items-center justify-center text-white group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="text-2xl font-orbitron text-neon-blue">{title}</h3>
      </div>
      <p className="text-gray-300">{description}</p>
    </Link>
  )
}
