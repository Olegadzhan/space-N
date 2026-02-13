'use client'

import { useState, useEffect } from 'react'
import { Image as ImageIcon } from 'lucide-react'

interface SpacePhoto {
  id: string
  title: string
  url: string
  hdurl?: string
  explanation: string
  date: string
  media_type: string
}

export default function RealSpaceGallery({ filter }: { filter: string }) {
  const [photos, setPhotos] = useState<SpacePhoto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedPhoto, setSelectedPhoto] = useState<SpacePhoto | null>(null)

  useEffect(() => {
    fetchSpacePhotos()
  }, [])

  const fetchSpacePhotos = async () => {
    try {
      const response = await fetch('/api/nasa-photos')
      
      if (!response.ok) {
        throw new Error('Failed to fetch photos')
      }
      
      const data = await response.json()
      setPhotos(data.photos || [])
    } catch (err) {
      setError('Failed to load space photos. Using demo content.')
      // Load demo content
      setPhotos(demoPhotos)
    } finally {
      setLoading(false)
    }
  }

  const filteredPhotos = photos.filter(photo => {
    if (filter === 'all') return true
    if (filter === 'planets') return /planet|earth|mars|jupiter|saturn|venus|mercury|neptune|uranus/i.test(photo.title)
    if (filter === 'nebulae') return /nebula|cloud|gas|dust/i.test(photo.title)
    if (filter === 'galaxies') return /galaxy|andromeda|milky|spiral/i.test(photo.title)
    return true
  })

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="space-photo-card bg-gray-900/50 rounded-xl overflow-hidden border border-neon-blue/20 animate-pulse">
            <div className="aspect-video bg-gray-800" />
            <div className="p-4">
              <div className="h-6 bg-gray-700 rounded mb-2" />
              <div className="h-4 bg-gray-700 rounded w-3/4" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-gallery">
      {error && (
        <div className="mb-6 p-4 bg-yellow-900/50 border border-yellow-500 rounded-lg text-yellow-300">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo) => (
          <div 
            key={photo.id} 
            onClick={() => setSelectedPhoto(photo)}
            className="space-photo-card bg-gray-900/50 rounded-xl overflow-hidden border border-neon-blue/20 hover:border-neon-blue/50 transition-all cursor-pointer group"
          >
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={photo.url} 
                alt={photo.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-orbitron text-white mb-1">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-gray-300">
                    {new Date(photo.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <p className="text-sm text-gray-300 line-clamp-2">
                {photo.explanation}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for full image */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-2xl font-orbitron text-neon-blue">
                {selectedPhoto.title}
              </h2>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <img
              src={selectedPhoto.hdurl || selectedPhoto.url}
              alt={selectedPhoto.title}
              className="w-full rounded-lg mb-4"
            />
            
            <p className="text-gray-300 text-sm">
              {selectedPhoto.explanation}
            </p>
            
            <p className="text-xs text-gray-500 mt-2">
              Date: {new Date(selectedPhoto.date).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

// Demo photos for fallback
const demoPhotos: SpacePhoto[] = [
  {
    id: '1',
    title: 'Orion Nebula',
    url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800',
    explanation: 'The Orion Nebula is one of the brightest nebulae and is visible to the naked eye.',
    date: '2024-01-01',
    media_type: 'image'
  },
  {
    id: '2',
    title: 'Jupiter and its Moons',
    url: 'https://images.unsplash.com/photo-1534103253830-9f5937d11a57?w=800',
    explanation: 'Jupiter, the largest planet in our solar system, with its four largest moons.',
    date: '2024-01-02',
    media_type: 'image'
  },
  {
    id: '3',
    title: 'Andromeda Galaxy',
    url: 'https://images.unsplash.com/photo-1462332420287-31e8f1f3a84e?w=800',
    explanation: 'The Andromeda Galaxy, our nearest spiral galaxy neighbor.',
    date: '2024-01-03',
    media_type: 'image'
  },
]
