'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  // Dot follows mouse instantly
  const dotX = useSpring(mouseX, { stiffness: 600, damping: 40, mass: 0.4 })
  const dotY = useSpring(mouseY, { stiffness: 600, damping: 40, mass: 0.4 })

  // Glow follows slightly behind
  const glowX = useSpring(mouseX, { stiffness: 120, damping: 22, mass: 0.6 })
  const glowY = useSpring(mouseY, { stiffness: 120, damping: 22, mass: 0.6 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    // Detect hover on interactive elements using event delegation
    const onPointerOver = (e: PointerEvent) => {
      const target = e.target as Element
      const interactive = target.closest('a, button, [role="button"], input, textarea, select, label')
      setHovered(!!interactive)
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('pointerover', onPointerOver)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('pointerover', onPointerOver)
    }
  }, [visible, mouseX, mouseY])

  return (
    <>
      {/* Ambient glow — slow, large */}
      <motion.div
        aria-hidden
        style={{
          x: glowX,
          y: glowY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? (hovered ? 0.55 : 0.28) : 0,
          scale: hovered ? 1.6 : 1,
          width: hovered ? 120 : 80,
          height: hovered ? 120 : 80,
          background: hovered
            ? 'radial-gradient(circle, rgba(0,212,255,0.5) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(108,99,255,0.6) 0%, transparent 70%)',
          borderRadius: '50%',
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9998,
          filter: 'blur(12px)',
          transition: 'opacity 0.3s, width 0.3s, height 0.3s, background 0.3s',
        }}
      />

      {/* Dot — fast, small */}
      <motion.div
        aria-hidden
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
          scale: hovered ? 1.8 : 1,
          width: 7,
          height: 7,
          background: hovered ? '#00D4FF' : '#6C63FF',
          borderRadius: '50%',
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'opacity 0.2s, background 0.25s, scale 0.2s',
          boxShadow: hovered
            ? '0 0 12px rgba(0,212,255,0.9)'
            : '0 0 8px rgba(108,99,255,0.8)',
        }}
      />
    </>
  )
}
