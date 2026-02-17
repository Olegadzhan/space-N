'use client'

import { useEffect, useRef } from 'react'

export default function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Создание звезд
    const stars: Array<{
      x: number; y: number; size: number; speed: number; 
      opacity: number; twinkleSpeed: number; twinkleOffset: number
    }> = []
    
    const numStars = Math.min(1000, Math.floor(window.innerWidth * window.innerHeight / 5000))
    
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + (Math.random() > 0.9 ? 1 : 0.2),
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        twinkleOffset: Math.random() * Math.PI * 2
      })
    }

    // Туманности
    const nebulae = [
      { x: 0.2, y: 0.3, color: '#8a2be2', size: 0.25, opacity: 0.15 },
      { x: 0.7, y: 0.6, color: '#1e90ff', size: 0.3, opacity: 0.12 },
      { x: 0.4, y: 0.8, color: '#ff1493', size: 0.2, opacity: 0.18 },
      { x: 0.9, y: 0.2, color: '#00ffff', size: 0.18, opacity: 0.14 }
    ]

    let mouseX = 0.5
    let mouseY = 0.5
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX / window.innerWidth
      mouseY = e.clientY / window.innerHeight
    }
    
    window.addEventListener('mousemove', handleMouseMove)

    // Анимация
    let animationFrame: number
    let lastTime = 0
    
    const animate = (time: number) => {
      if (!ctx) return
      
      ctx.fillStyle = 'rgba(10, 10, 18, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Туманности
      nebulae.forEach(nebula => {
        const x = canvas.width * nebula.x + (mouseX - 0.5) * 100
        const y = canvas.height * nebula.y + (mouseY - 0.5) * 100
        const radius = Math.min(canvas.width, canvas.height) * nebula.size
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
        gradient.addColorStop(0, `${nebula.color}${Math.round(nebula.opacity * 255).toString(16).padStart(2, '0')}`)
        gradient.addColorStop(0.4, `${nebula.color}30`)
        gradient.addColorStop(1, 'transparent')
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()
      })
      
      // Звезды
      const deltaTime = time - lastTime
      lastTime = time
      
      stars.forEach(star => {
        star.y += star.speed * (deltaTime / 16)
        
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }
        
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7
        const parallaxX = (mouseX - 0.5) * (star.speed * 20)
        const parallaxY = (mouseY - 0.5) * (star.speed * 20)
        
        const gradient = ctx.createRadialGradient(
          star.x + parallaxX, star.y + parallaxY, 0,
          star.x + parallaxX, star.y + parallaxY, star.size * 2
        )
        
        gradient.addColorStop(0, `rgba(0, 243, 255, ${star.opacity * twinkle})`)
        gradient.addColorStop(0.5, `rgba(0, 243, 255, ${star.opacity * twinkle * 0.5})`)
        gradient.addColorStop(1, 'transparent')
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(star.x + parallaxX, star.y + parallaxY, star.size, 0, Math.PI * 2)
        ctx.fill()
      })
      
      animationFrame = requestAnimationFrame(animate)
    }
    
    animate(0)
    
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" />
      
      {/* Градиентный оверлей */}
      <div className="absolute inset-0 bg-gradient-to-b from-space-black/90 via-space-black/70 to-space-black/95 pointer-events-none" />
      
      {/* Световые блики */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-br from-neon-blue/20 to-transparent rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-cosmic-pink/20 to-transparent rounded-full blur-3xl animate-pulse-slow animation-delay-2000" />
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-gradient-to-bl from-purple-500/15 to-transparent rounded-full blur-2xl animate-pulse-slow animation-delay-4000" />
      </div>
    </div>
  )
}
