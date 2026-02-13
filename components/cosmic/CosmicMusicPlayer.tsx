'use client'

import { useState, useEffect, useRef } from 'react'
import { Howl } from 'howler'
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react'

export default function CosmicMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [progress, setProgress] = useState(0)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animationFrameRef = useRef<number>()

  const tracks = [
    { name: 'Nebula Dreams', url: '/sounds/nebula.mp3' },
    { name: 'Galactic Journey', url: '/sounds/galactic.mp3' },
    { name: 'Stellar Odyssey', url: '/sounds/stellar.mp3' },
    { name: 'Cosmic Harmony', url: '/sounds/cosmic.mp3' },
  ]

  const [sound, setSound] = useState<Howl | null>(null)

  useEffect(() => {
    const newSound = new Howl({
      src: [tracks[currentTrack].url],
      volume: volume,
      loop: true,
      onend: () => setIsPlaying(false),
      onplay: () => {
        // Инициализация аудио контекста для визуализатора
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
          analyserRef.current = audioContextRef.current.createAnalyser()
          analyserRef.current.fftSize = 256
        }
      }
    })
    setSound(newSound)

    return () => {
      newSound.unload()
    }
  }, [currentTrack, volume])

  useEffect(() => {
    if (isPlaying) {
      sound?.play()
    } else {
      sound?.pause()
    }
  }, [isPlaying, sound])

  useEffect(() => {
    const updateProgress = () => {
      if (isPlaying && sound) {
        const duration = sound.duration()
        const seek = sound.seek()
        setProgress((seek / duration) * 100 || 0)
      }
      requestAnimationFrame(updateProgress)
    }
    
    updateProgress()
  }, [isPlaying, sound])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const changeTrack = (index: number) => {
    setCurrentTrack(index)
    if (isPlaying) {
      sound?.stop()
      setTimeout(() => {
        sound?.play()
      }, 100)
    }
  }

  const skipTrack = (direction: 'next' | 'prev') => {
    const newIndex = direction === 'next' 
      ? (currentTrack + 1) % tracks.length
      : (currentTrack - 1 + tracks.length) % tracks.length
    
    setCurrentTrack(newIndex)
    if (isPlaying) {
      sound?.stop()
      setTimeout(() => sound?.play(), 100)
    }
  }

  return (
    <div className="cosmic-music-player p-6 bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-2xl border border-neon-blue/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => skipTrack('prev')}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <SkipBack className="w-6 h-6 text-neon-blue" />
          </button>
          
          <button 
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-deep-purple to-neon-blue border-2 border-neon-blue flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-neon-blue/30"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 text-white" />
            ) : (
              <Play className="w-8 h-8 text-white ml-1" />
            )}
          </button>
          
          <button 
            onClick={() => skipTrack('next')}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <SkipForward className="w-6 h-6 text-neon-blue" />
          </button>
        </div>
        
        <div className="text-center">
          <h2 className="text-2xl font-orbitron text-neon-blue">
            {tracks[currentTrack].name}
          </h2>
          <p className="text-sm text-gray-300">
            Track {currentTrack + 1} of {tracks.length}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {volume > 0 ? (
            <Volume2 className="w-6 h-6 text-neon-blue" />
          ) : (
            <VolumeX className="w-6 h-6 text-neon-blue" />
          )}
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-32 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-neon-blue"
          />
        </div>
      </div>

      {/* Прогресс трека */}
      <div className="progress-bar mb-6">
        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-deep-purple to-neon-blue transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Визуализатор */}
      <div className="visualizer h-24 mb-6 flex items-end justify-center gap-1 overflow-hidden">
        {[...Array(64)].map((_, index) => (
          <div
            key={index}
            className="visualizer-bar bg-gradient-to-t from-neon-blue via-cosmic-pink to-neon-blue rounded-t w-1 transition-all duration-100"
            style={{ 
              height: `${Math.random() * 100}%`,
              animation: `pulse 0.5s ${index * 0.01}s infinite alternate`
            }}
          />
        ))}
      </div>

      {/* Выбор трека */}
      <div className="track-selector">
        <label className="block text-sm text-gray-300 mb-2">Select Track</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {tracks.map((track, index) => (
            <button
              key={index}
              onClick={() => changeTrack(index)}
              className={`p-3 rounded-lg text-left transition-all ${
                currentTrack === index 
                  ? 'bg-gradient-to-r from-deep-purple to-neon-blue border-2 border-neon-blue' 
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              <span className="block text-sm font-orbitron">{track.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
