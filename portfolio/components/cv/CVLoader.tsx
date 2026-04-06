'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CVLoader({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<'in' | 'hold' | 'out'>('in')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 400)
    const t2 = setTimeout(() => setPhase('out'), 1800)
    const t3 = setTimeout(() => onDone(), 2300)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onDone])

  return (
    <AnimatePresence>
      {phase !== 'out' && (
        <motion.div
          key="cv-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9990,
            background: '#050508',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '32px',
          }}
        >
          {/* Monogram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative' }}
          >
            {/* Glow ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                inset: -12,
                borderRadius: '50%',
                border: '1px solid transparent',
                background: 'linear-gradient(#050508, #050508) padding-box, linear-gradient(135deg, #6C63FF, #00D4FF, #6C63FF) border-box',
              }}
            />
            {/* Inner circle */}
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'radial-gradient(circle at 40% 40%, rgba(108,99,255,0.18), rgba(0,212,255,0.08))',
                border: '1px solid rgba(108,99,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-outfit)',
                  fontSize: '26px',
                  fontWeight: 900,
                  letterSpacing: '-1px',
                  background: 'linear-gradient(135deg, #6C63FF, #00D4FF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                SP
              </span>
            </div>
          </motion.div>

          {/* Loading dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            style={{ display: 'flex', gap: '6px' }}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: i === 1 ? '#6C63FF' : '#8A8F98',
                  display: 'block',
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
