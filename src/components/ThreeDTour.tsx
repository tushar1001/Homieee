'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface ThreeDTourProps {
  className?: string
  propertyImage?: string
}

export default function ThreeDTour({ className = '', propertyImage }: ThreeDTourProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const cameraRef = useRef<THREE.PerspectiveCamera>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const animationRef = useRef<number>()

  useEffect(() => {
    if (!mountRef.current) return

    // Initialize Three.js scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf0f8ff)
    sceneRef.current = scene

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.set(0, 2, 5)
    cameraRef.current = camera

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    rendererRef.current = renderer

    mountRef.current.appendChild(renderer.domElement)

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(10, 10, 5)
    directionalLight.castShadow = true
    scene.add(directionalLight)

    // Create a simple room structure
    const roomGroup = new THREE.Group()

    // Floor
    const floorGeometry = new THREE.PlaneGeometry(10, 10)
    const floorMaterial = new THREE.MeshLambertMaterial({ 
      color: 0xdeb887,
      transparent: true,
      opacity: 0.8
    })
    const floor = new THREE.Mesh(floorGeometry, floorMaterial)
    floor.rotation.x = -Math.PI / 2
    floor.receiveShadow = true
    roomGroup.add(floor)

    // Walls
    const wallMaterial = new THREE.MeshLambertMaterial({ 
      color: 0xf5deb3,
      transparent: true,
      opacity: 0.7
    })

    // Back wall
    const backWallGeometry = new THREE.PlaneGeometry(10, 6)
    const backWall = new THREE.Mesh(backWallGeometry, wallMaterial)
    backWall.position.set(0, 3, -5)
    roomGroup.add(backWall)

    // Side walls
    const sideWallGeometry = new THREE.PlaneGeometry(10, 6)
    const leftWall = new THREE.Mesh(sideWallGeometry, wallMaterial)
    leftWall.position.set(-5, 3, 0)
    leftWall.rotation.y = Math.PI / 2
    roomGroup.add(leftWall)

    const rightWall = new THREE.Mesh(sideWallGeometry, wallMaterial)
    rightWall.position.set(5, 3, 0)
    rightWall.rotation.y = -Math.PI / 2
    roomGroup.add(rightWall)

    // Add some furniture
    const furnitureGroup = new THREE.Group()

    // Bed
    const bedGeometry = new THREE.BoxGeometry(3, 0.5, 2)
    const bedMaterial = new THREE.MeshLambertMaterial({ color: 0x8b4513 })
    const bed = new THREE.Mesh(bedGeometry, bedMaterial)
    bed.position.set(-2, 0.25, -2)
    bed.castShadow = true
    furnitureGroup.add(bed)

    // Table
    const tableGeometry = new THREE.BoxGeometry(1.5, 1, 1.5)
    const tableMaterial = new THREE.MeshLambertMaterial({ color: 0x654321 })
    const table = new THREE.Mesh(tableGeometry, tableMaterial)
    table.position.set(2, 0.5, 2)
    table.castShadow = true
    furnitureGroup.add(table)

    // Add some decorative elements (Indian cultural motifs)
    // Kolam pattern simulation on floor
    const kolamGeometry = new THREE.RingGeometry(1, 1.2, 8)
    const kolamMaterial = new THREE.MeshLambertMaterial({ 
      color: 0xff6b35,
      transparent: true,
      opacity: 0.6
    })
    const kolam = new THREE.Mesh(kolamGeometry, kolamMaterial)
    kolam.rotation.x = -Math.PI / 2
    kolam.position.set(0, 0.01, 0)
    furnitureGroup.add(kolam)

    scene.add(roomGroup)
    scene.add(furnitureGroup)

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate)
      
      // Rotate camera around the room
      const time = Date.now() * 0.0005
      camera.position.x = Math.cos(time) * 8
      camera.position.z = Math.sin(time) * 8
      camera.lookAt(0, 0, 0)
      
      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !camera || !renderer) return
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', handleResize)
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div className={`relative ${className}`}>
      <div 
        ref={mountRef} 
        className="w-full h-full rounded-lg overflow-hidden"
        style={{ minHeight: '400px' }}
      />
      <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">
        360° Virtual Tour
      </div>
      <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">
        AR Ready 📱
      </div>
    </div>
  )
}