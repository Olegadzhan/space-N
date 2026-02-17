'use client'

import { useState, useEffect } from 'react'

interface StoredImage {
  id: string
  url: string
  prompt: string
  date: string
  type: 'ai-generated' | 'real'
}

export function useImageStorage() {
  const [images, setImages] = useState<StoredImage[]>([])

  useEffect(() => {
    // Загрузка из localStorage при монтировании
    const saved = localStorage.getItem('space-n-images')
    if (saved) {
      setImages(JSON.parse(saved))
    }
  }, [])

  const saveImage = (url: string, prompt: string, type: 'ai-generated' | 'real' = 'ai-generated') => {
    const newImage: StoredImage = {
      id: Date.now().toString(),
      url,
      prompt,
      date: new Date().toISOString(),
      type
    }
    
    const updated = [newImage, ...images]
    setImages(updated)
    localStorage.setItem('space-n-images', JSON.stringify(updated))
    
    return newImage.id
  }

  const deleteImage = (id: string) => {
    const updated = images.filter(img => img.id !== id)
    setImages(updated)
    localStorage.setItem('space-n-images', JSON.stringify(updated))
  }

  const getImagesByType = (type: 'ai-generated' | 'real' | 'all') => {
    if (type === 'all') return images
    return images.filter(img => img.type === type)
  }

  return {
    images,
    saveImage,
    deleteImage,
    getImagesByType
  }
}

// Компонент для отображения сохраненных изображений
export function SavedImagesGallery({ type = 'all' }: { type?: 'ai-generated' | 'real' | 'all' }) {
  const { images, deleteImage } = useImageStorage()
  const filteredImages = images.filter(img => type === 'all' || img.type === type)

  if (filteredImages.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🌌</div>
        <p className="text-gray-400">No saved images yet</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredImages.map((image) => (
        <div 
          key={image.id} 
          className="bg-asteroid-gray rounded-xl overflow-hidden border border-neon-blue/20 relative group"
        >
          <div className="relative aspect-square">
            <img 
              src={image.url} 
              alt={image.prompt}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-sm text-white mb-1 line-clamp-1">{image.prompt}</p>
                <p className="text-xs text-gray-300">
                  {new Date(image.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => deleteImage(image.id)}
            className="absolute top-2 right-2 p-2 bg-red-500/20 hover:bg-red-500/40 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
            title="Delete"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}
