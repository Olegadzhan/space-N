'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default function PlanetSystem() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Создание сцены
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mountRef.current.appendChild(renderer.domElement)

    // Добавление планет
    const planets = [
      { name: 'Mercury', radius: 0.4, distance: 5, color: 0xaaaaaa, speed: 0.04 },
      { name: 'Venus', radius: 0.9, distance: 7, color: 0xffa500, speed: 0.015 },
      { name: 'Earth', radius: 1, distance: 10, color: 0x1e90ff, speed: 0.01 },
      { name: 'Mars', radius: 0.5, distance: 15, color: 0xff4500, speed: 0.008 },
      { name: 'Jupiter', radius: 2, distance: 20, color: 0xffd700, speed: 0.002 },
      { name: 'Saturn', radius: 1.8, distance: 28, color: 0xffa500, speed: 0.0009 },
      { name: 'Uranus', radius: 1.5, distance: 35, color: 0x00ffff, speed: 0.0004 },
      { name: 'Neptune', radius: 1.5, distance: 42, color: 0x0000ff, speed: 0.0001 },
    ]

    planets.forEach(planet => {
      const geometry = new THREE.SphereGeometry(planet.radius, 64, 64)
      const material = new THREE.MeshPhongMaterial({ 
        color: planet.color,
        emissive: planet.color,
        emissiveIntensity: 0.1,
        shininess: 100
      })
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.x = planet.distance
      mesh.userData = planet
      
      // Добавление кольца для Сатурна
      if (planet.name === 'Saturn') {
        const ringGeometry = new THREE.RingGeometry(2.2, 3.5, 64)
        const ringMaterial = new THREE.MeshBasicMaterial({ 
          color: 0xffa500,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.7
        })
        const ring = new THREE.Mesh(ringGeometry, ringMaterial)
        ring.rotation.x = Math.PI / 2
        mesh.add(ring)
      }
      
      scene.add(mesh)
    })

    // Добавление звезд
    const starGeometry = new THREE.BufferGeometry()
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      sizeAttenuation: true
    })
    
    const starVertices = []
    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 2000
      const y = (Math.random() - 0.5) * 2000
      const z = (Math.random() - 0.5) * 2000
      starVertices.push(x, y, z)
    }
    
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3))
    const stars = new THREE.Points(starGeometry, starMaterial)
    scene.add(stars)

    // Освещение
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5)
    scene.add(ambientLight)
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight)

    camera.position.z = 50

    // Управление камерой
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05

    // Анимация
    const clock = new THREE.Clock()
    
    const animate = () => {
      const delta = clock.getDelta()
      requestAnimationFrame(animate)
      
      scene.children.forEach(child => {
        if (child instanceof THREE.Mesh && child.userData?.name) {
          const planetData = child.userData
          const angle = Date.now() * 0.001 * planetData.speed
          child.position.x = planetData.distance * Math.cos(angle)
          child.position.z = planetData.distance * Math.sin(angle)
          child.rotation.y += delta * 0.5
        }
      })
      
      controls.update()
      renderer.render(scene, camera)
    }
    
    animate()

    // Обработка ресайза
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      mountRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="w-full h-full" />
}
