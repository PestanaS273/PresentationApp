'use client'

import { useRef, useState, useCallback } from 'react'
import { motion, useSpring } from 'framer-motion'
import { RotateCcw, ChevronDown } from 'lucide-react'
import CVFront from './CVFront'
import CVBack from './CVBack'

const SHADOW = `
  0 1px 2px rgba(0,0,0,0.08),
  0 2px 6px rgba(0,0,0,0.1),
  0 6px 16px rgba(0,0,0,0.14),
  0 14px 32px rgba(0,0,0,0.18),
  0 28px 60px rgba(0,0,0,0.22),
  0 50px 100px rgba(0,0,0,0.25)
`

export default function CVPaper() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [flipped, setFlipped] = useState(false)

  const rotX = useSpring(0, { stiffness: 120, damping: 28, mass: 0.6 })
  const rotY = useSpring(0, { stiffness: 120, damping: 28, mass: 0.6 })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      const nx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
      const ny = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
      rotX.set(-ny * 10)
      rotY.set(flipped ? -180 + nx * 10 : nx * 10)
    },
    [flipped, rotX, rotY]
  )

  const handleMouseLeave = useCallback(() => {
    rotX.set(0)
    rotY.set(flipped ? -180 : 0)
  }, [flipped, rotX, rotY])

  const handleFlip = () => {
    const next = !flipped
    setFlipped(next)
    rotX.set(0)
    rotY.set(next ? -180 : 0)
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      {/* Perspective wrapper */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: '1400px', perspectiveOrigin: '50% 45%' }}
        className="w-full flex justify-center"
      >
        <motion.div
          style={{
            transformStyle: 'preserve-3d',
            rotateX: rotX,
            rotateY: rotY,
            width: 'min(700px, 94vw)',
            position: 'relative',
          }}
        >
          {/* ── Front face ─────────────────────────────────── */}
          <div
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              boxShadow: SHADOW,
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            <CVFront />
          </div>

          {/* ── Paper thickness: right edge ─────────────────── */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: -1,
              width: '5px',
              transform: 'rotateY(90deg)',
              transformOrigin: 'right center',
              background: 'linear-gradient(to bottom, #D0CBC3, #B8B3AB)',
              backfaceVisibility: 'hidden',
            }}
          />

          {/* ── Paper thickness: left edge ──────────────────── */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: -1,
              width: '5px',
              transform: 'rotateY(-90deg)',
              transformOrigin: 'left center',
              background: 'linear-gradient(to bottom, #D0CBC3, #B8B3AB)',
              backfaceVisibility: 'hidden',
            }}
          />

          {/* ── Paper thickness: top edge ───────────────────── */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: -1,
              height: '4px',
              transform: 'rotateX(90deg)',
              transformOrigin: 'top center',
              background: '#C8C3BB',
              backfaceVisibility: 'hidden',
            }}
          />

          {/* ── Back face ──────────────────────────────────── */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              boxShadow: SHADOW,
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            <CVBack />
          </div>
        </motion.div>
      </div>

      {/* ── Controls ──────────────────────────────────────── */}
      <div className="flex items-center gap-4 flex-wrap justify-center">
        <motion.button
          onClick={handleFlip}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, #6C63FF, #00D4FF)',
            boxShadow: '0 0 24px rgba(108,99,255,0.4)',
            fontFamily: 'var(--font-outfit)',
          }}
        >
          <RotateCcw size={16} />
          {flipped ? 'Voir le recto' : 'Retourner la page'}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() =>
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
          }
          className="flex items-center gap-2 px-6 py-3 rounded-full text-sm text-[#8A8F98] cursor-pointer border border-white/10 hover:border-white/20 hover:text-white transition-colors"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          <ChevronDown size={16} />
          Bas de page
        </motion.button>
      </div>

      {/* Hint */}
      <p
        className="text-xs text-[#8A8F98] opacity-60 text-center"
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        Survolez la feuille pour l&apos;effet 3D
      </p>
    </div>
  )
}
