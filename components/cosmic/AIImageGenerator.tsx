'use client'

import { useState } from 'react'
import { Sparkles, Loader, Download, Trash2, Copy } from 'lucide-react'

export default function AIImageGenerator() {
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [history, setHistory] = useState<Array<{ prompt: string; images: string[]; date: string }>>([])

  const generateImages = async () => {
    if (!prompt.trim()) return
    
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      })
      
      if (!response.ok) {
        throw new Error('Failed to generate images')
      }
      
      const data = await response.json()
      
      const newGeneration = {
        prompt,
        images: data.images || demoImages,
        date: new Date().toISOString()
      }
      
      setGeneratedImages(newGeneration.images)
      setHistory([newGeneration, ...history.slice(0, 4)]) // Keep last 5
      setPrompt('')
    } catch (err) {
      setError('Failed to generate images. Using demo content.')
      setGeneratedImages(demoImages)
    } finally {
      setIsLoading(false)
    }
  }

  const copyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt)
  }

  return (
    <div className="ai-image-generator p-6 bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-2xl border border-neon-blue/20">
      <div className="flex items-center gap-3 mb-6">
        <Palette className="w-8 h-8 text-neon-blue" />
        <h2 className="text-2xl font-orbitron text-neon-blue">
          AI Cosmic Image Generator
        </h2>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm text-gray-300 mb-2">
          Describe the cosmic scene you want to create:
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="A breathtaking nebula with vibrant purple and blue colors, distant galaxies, mysterious cosmic phenomena, ultra detailed, photorealistic, 4K"
          className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-neon-blue focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 resize-none h-32 font-space-mono"
        />
        <p className="text-xs text-gray-500 mt-2">
          Be specific: colors, composition, style, lighting, details
        </p>
      </div>

      <button
        onClick={generateImages}
        disabled={isLoading || !prompt.trim()}
        className="w-full py-4 bg-gradient-to-r from-deep-purple to-neon-blue text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed font-orbitron text-lg shadow-lg shadow-neon-blue/30"
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <Loader className="w-5 h-5 animate-spin" />
            Creating Cosmic Art...
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5" />
            Generate Images
          </div>
        )}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-300">
          {error}
        </div>
      )}

      {generatedImages.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-orbitron text-neon-blue mb-4">
            Generated Cosmic Art
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {generatedImages.map((imageUrl, index) => (
              <div 
                key={index} 
                className="relative aspect-square rounded-lg overflow-hidden border border-neon-blue/20 group"
              >
                <img 
                  src={imageUrl} 
                  alt={`Generated cosmic art ${index + 1}`}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <button className="p-2 bg-neon-blue/20 hover:bg-neon-blue/40 rounded-full transition-colors">
                      <Download className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* History */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-orbitron text-neon-blue">
                Generation History
              </h4>
            </div>
            
            <div className="space-y-4">
              {history.map((item, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-800/50 rounded-lg border border-neon-blue/20"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <p className="text-sm text-gray-300 mb-1">
                        "{item.prompt}"
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(item.date).toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => copyPrompt(item.prompt)}
                      className="p-2 text-neon-blue hover:text-cosmic-pink transition-colors"
                      title="Copy prompt"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {item.images.slice(0, 4).map((img, imgIndex) => (
                      <div key={imgIndex} className="aspect-square rounded overflow-hidden">
                        <img
                          src={img}
                          alt={`History ${index}-${imgIndex}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Demo images for fallback
const demoImages = [
  'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1534103253830-9f5937d11a57?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1462332420287-31e8f1f3a84e?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1506318164476-05bbbe36e88f?w=800&h=800&fit=crop',
]
