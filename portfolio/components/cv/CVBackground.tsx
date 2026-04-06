'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Float } from '@react-three/drei'
import * as THREE from 'three'

function FloatingGeometry() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = state.clock.elapsedTime * 0.08
    ref.current.rotation.y = state.clock.elapsedTime * 0.12
  })
  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={ref} position={[-6, 2, -8]}>
        <octahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial
          color="#6C63FF"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
    </Float>
  )
}

function FloatingGeometry2() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = state.clock.elapsedTime * 0.06
    ref.current.rotation.z = state.clock.elapsedTime * 0.1
  })
  return (
    <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={ref} position={[7, -3, -10]}>
        <icosahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial
          color="#00D4FF"
          wireframe
          transparent
          opacity={0.1}
        />
      </mesh>
    </Float>
  )
}

export default function CVBackground() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
      style={{ background: '#050508' }}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} color="#6C63FF" intensity={2} />
      <pointLight position={[-5, -5, 3]} color="#00D4FF" intensity={1.5} />
      <Stars radius={80} depth={50} count={2000} factor={2} fade speed={0.3} />
      <FloatingGeometry />
      <FloatingGeometry2 />
    </Canvas>
  )
}
