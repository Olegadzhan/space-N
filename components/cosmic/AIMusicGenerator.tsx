'use client'

import { useState } from 'react'
import { Sparkles, Loader, Download, Trash2 } from 'lucide-react'

export default function AIMusicGenerator() {
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [generatedMusic, setGeneratedMusic] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [history, setHistory] = useState<Array<{ prompt: string; url: string; date: string }>>([])

  const generateMusic = async () => {
    if (!prompt.trim()) return
    
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/generate-music', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      })
      
      if (!response.ok) {
        throw new Error('Failed to generate music')
      }
      
      const data = await response.json()
      
      const newTrack = {
        prompt,
        url: data.audioUrl || '/sounds/nebula.mp3', // Fallback to demo track
        date: new Date().toISOString()
      }
      
      setGeneratedMusic(newTrack.url)
      setHistory([newTrack, ...history.slice(0, 4)]) // Keep last 5
      setPrompt('')
    } catch (err) {
      setError('Failed to generate music. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const clearHistory = () => {
    setHistory([])
    setGeneratedMusic(null)
  }

  return (
    <div className="ai-music-generator p-6 bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-2xl border border-neon-blue/20">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="w-8 h-8 text-neon-blue" />
        <h2 className="text-2xl font-orbitron text-neon-blue">
          AI Music Generator
        </h2>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm text-gray-300 mb-2">
          Describe the cosmic music you want:
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ethereal space ambient with pulsating stars, distant nebula sounds, and mysterious cosmic phenomena..."
          className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-neon-blue focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 resize-none h-32 font-space-mono"
        />
        <p className="text-xs text-gray-500 mt-2">
          Example: "Deep space ambient with slow evolving pads, subtle cosmic textures, and a sense of infinite vastness"
        </p>
      </div>

      <button
        onClick={generateMusic}
        disabled={isLoading || !prompt.trim()}
        className="w-full py-4 bg-gradient-to-r from-deep-purple to-neon-blue text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed font-orbitron text-lg shadow-lg shadow-neon-blue/30"
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <Loader className="w-5 h-5 animate-spin" />
            Generating Cosmic Symphony...
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5" />
            Generate Music
          </div>
        )}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-300">
          {error}
        </div>
      )}

      {generatedMusic && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-orbitron text-neon-blue">
              Generated Music
            </h3>
            <button
              onClick={clearHistory}
              className="p-2 text-gray-400 hover:text-red-400 transition-colors"
              title="Clear history"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4">
            <audio
              controls
              src={generatedMusic}
              className="w-full rounded-lg"
              onEnded={() => setGeneratedMusic(null)}
            />
          </div>

          <div className="mt-6">
            <h4 className="text-lg font-orbitron text-neon-blue mb-3">
              Generation History
            </h4>
            <div className="space-y-3">
              {history.map((item, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-800/50 rounded-lg border border-neon-blue/20"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-gray-300 mb-1 line-clamp-1">
                        "{item.prompt}"
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(item.date).toLocaleString()}
                      </p>
                    </div>
                    <a
                      href={item.url}
                      download
                      className="p-2 text-neon-blue hover:text-cosmic-pink transition-colors"
                      title="Download"
                    >
                      <Download className="w-5 h-5" />
                    </a>
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
