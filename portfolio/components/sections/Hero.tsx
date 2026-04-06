'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { ArrowDown, ExternalLink } from 'lucide-react'

const HeroScene = dynamic(() => import('@/components/three/HeroScene'), {
  ssr: false,
  loading: () => null,
})

const roles = [
  'Backend Architect',
  'Full-Stack Developer',
  'Systems Integrator',
  'E-commerce Builder',
]

function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const [displayed, setDisplayed] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIdx]
    if (!deleting && charIdx < current.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), speed)
      return () => clearTimeout(t)
    }
    if (!deleting && charIdx === current.length) {
      const t = setTimeout(() => setDeleting(true), pause)
      return () => clearTimeout(t)
    }
    if (deleting && charIdx > 0) {
      const t = setTimeout(() => setCharIdx((c) => c - 1), speed / 2)
      return () => clearTimeout(t)
    }
    if (deleting && charIdx === 0) {
      setDeleting(false)
      setWordIdx((w) => (w + 1) % words.length)
    }
  }, [charIdx, deleting, wordIdx, words, speed, pause])

  useEffect(() => {
    setDisplayed(words[wordIdx].slice(0, charIdx))
  }, [charIdx, wordIdx, words])

  return displayed
}

export default function Hero() {
  const role = useTypewriter(roles)

  return (
    <section className="relative min-h-dvh flex items-center justify-center overflow-hidden">
      {/* 3D canvas — full background */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* Ambient gradient blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-20 pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, #6C63FF, transparent)' }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[100px] opacity-15 pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, #00D4FF, transparent)' }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full glass border border-[rgba(108,99,255,0.3)]"
        >
          <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse-dot" />
          <span className="text-sm text-[#8A8F98]" style={{ fontFamily: 'var(--font-inter)' }}>
            Available for new projects
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl lg:text-[110px] font-black leading-none tracking-[-3px] mb-4"
          style={{ fontFamily: 'var(--font-outfit)' }}
        >
          <span className="text-white">Pestana</span>
          <span className="gradient-text text-glow-violet">.</span>
        </motion.h1>

        {/* Animated role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="h-12 flex items-center justify-center mb-6"
        >
          <span
            className="text-xl md:text-3xl font-medium text-[#8A8F98]"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            {role}
            <span className="inline-block w-0.5 h-7 bg-[#6C63FF] ml-1 animate-pulse align-middle" />
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="text-base md:text-lg text-[#8A8F98] max-w-xl mx-auto mb-12 leading-relaxed"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          I build complex web systems, scalable backends, and intelligent automations
          that turn ideas into products clients can rely on.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <button
            onClick={() => {
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="group relative px-8 py-3.5 rounded-full font-semibold text-white overflow-hidden cursor-pointer"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            {/* Animated gradient background */}
            <span
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #6C63FF 0%, #00D4FF 100%)',
                boxShadow: '0 0 30px rgba(108,99,255,0.5)',
              }}
            />
            <span className="relative flex items-center gap-2">
              View Projects
              <ExternalLink size={15} />
            </span>
          </button>

          <button
            onClick={() => {
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="px-8 py-3.5 rounded-full font-semibold text-[#EDEDEF] border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-300 cursor-pointer"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            Get in touch
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#8A8F98] hover:text-white transition-colors cursor-pointer z-10"
      >
        <span className="text-xs tracking-widest uppercase" style={{ fontFamily: 'var(--font-inter)' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={18} />
        </motion.div>
      </motion.button>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to top, #050508, transparent)' }}
      />
    </section>
  )
}
