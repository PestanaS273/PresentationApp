'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Float, MeshDistortMaterial, Sphere } from '@react-three/drei'
import * as THREE from 'three'

function TorusKnotMesh() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.12
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.18
  })

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.1, 0.38, 200, 32, 2, 3]} />
        <MeshDistortMaterial
          color="#7B74FF"
          distort={0.25}
          speed={2.5}
          roughness={0.05}
          metalness={0.9}
          envMapIntensity={1}
        />
      </mesh>
    </Float>
  )
}

function OrbitingSphere({ radius, speed, color }: { radius: number; speed: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * speed
    ref.current.position.x = Math.sin(t) * radius
    ref.current.position.y = Math.cos(t * 0.7) * radius * 0.5
    ref.current.position.z = Math.cos(t) * radius
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
    </mesh>
  )
}

function BackgroundSphere() {
  return (
    <Sphere args={[8, 32, 32]}>
      <meshStandardMaterial
        color="#050508"
        side={THREE.BackSide}
        transparent
        opacity={0}
      />
    </Sphere>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]}   color="#6C63FF" intensity={6} />
      <pointLight position={[-5, -5, 3]} color="#00D4FF" intensity={4} />
      <pointLight position={[0, 3, -3]}  color="#FF6B6B" intensity={1.5} />

      <Stars
        radius={60}
        depth={50}
        count={2500}
        factor={2.5}
        saturation={0.3}
        fade
        speed={0.5}
      />

      <BackgroundSphere />
      <TorusKnotMesh />
      <OrbitingSphere radius={2.8} speed={0.4} color="#00D4FF" />
      <OrbitingSphere radius={2.2} speed={-0.6} color="#6C63FF" />
      <OrbitingSphere radius={3.2} speed={0.25} color="#FF6B6B" />
    </Canvas>
  )
}
