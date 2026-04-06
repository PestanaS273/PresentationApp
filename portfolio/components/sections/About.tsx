'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(ease * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

// Word-by-word clip reveal for headings
function AnimatedHeadline({ children, inView, delay = 0 }: { children: React.ReactNode; inView: boolean; delay?: number }) {
  return (
    <div style={{ overflow: 'hidden' }}>
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={inView ? { y: '0%', opacity: 1 } : {}}
        transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}

// Clip-path label reveal
function AnimatedLabel({ text, inView, delay = 0 }: { text: string; inView: boolean; delay?: number }) {
  return (
    <div style={{ overflow: 'hidden' }}>
      <motion.p
        initial={{ y: '110%' }}
        animate={inView ? { y: '0%' } : {}}
        transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
        className="text-xs font-medium tracking-[4px] uppercase text-[#8A8F98] mb-6"
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        {text}
      </motion.p>
    </div>
  )
}

// Staggered words for big headline
function StaggerWords({ rawText, inView, delay = 0 }: { rawText: string; inView: boolean; delay?: number }) {
  const segments = rawText.split(/(<accent>.*?<\/accent>|<muted>.*?<\/muted>)/)

  let wordIndex = 0
  return (
    <h2
      className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-8"
      style={{ fontFamily: 'var(--font-outfit)' }}
    >
      {segments.map((seg, si) => {
        const isAccent = seg.startsWith('<accent>')
        const isMuted = seg.startsWith('<muted>')
        const cleanText = seg.replace(/<\/?accent>/g, '').replace(/<\/?muted>/g, '')
        const words = cleanText.split(' ').filter(Boolean)

        return words.map((word, wi) => {
          const idx = wordIndex++
          const wordDelay = delay + idx * 0.06
          return (
            <span key={`${si}-${wi}`} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
              <motion.span
                initial={{ y: '110%', opacity: 0 }}
                animate={inView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                transition={{ duration: 0.65, delay: wordDelay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                style={{ display: 'inline-block' }}
                className={isAccent ? 'gradient-text' : isMuted ? 'text-white/60' : ''}
              >
                {word}{wi < words.length - 1 || si < segments.length - 1 ? '\u00A0' : ''}
              </motion.span>
            </span>
          )
        })
      })}
    </h2>
  )
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })
  const { t } = useLanguage()

  const stats = [
    { value: 7,   suffix: '',  key: 'about.stats.projects'     },
    { value: 10,  suffix: '+', key: 'about.stats.technologies'  },
    { value: 2,   suffix: '',  key: 'about.stats.continents'    },
    { value: 100, suffix: '%', key: 'about.stats.focus'         },
  ]

  return (
    <section id="about" ref={sectionRef} className="section-padding relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24" style={{ background: 'linear-gradient(to bottom, transparent, rgba(108,99,255,0.4), transparent)' }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: Statement */}
          <div>
            <motion.div
              className="w-16 h-1 rounded-full mb-8"
              initial={{ scaleX: 0, originX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ background: 'linear-gradient(90deg, #6C63FF, #00D4FF)' }}
            />

            <AnimatedLabel text={t('about.label')} inView={inView} delay={0.1} />

            <StaggerWords rawText={t('about.headline')} inView={inView} delay={0.2} />

            <motion.p
              initial={{ opacity: 0, y: 24, clipPath: 'inset(0 0 20% 0)' }}
              animate={inView ? { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-[#8A8F98] text-base md:text-lg leading-relaxed mb-6"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {t('about.bio1')}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 24, clipPath: 'inset(0 0 20% 0)' }}
              animate={inView ? { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' } : {}}
              transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="text-[#8A8F98] text-base leading-relaxed"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {t('about.bio2')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-10 flex items-center gap-4"
            >
              <span className="text-sm text-[#6C63FF]" style={{ fontFamily: 'var(--font-mono)' }}>
                {t('about.open')}
              </span>
              <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse-dot flex-shrink-0" />
            </motion.div>
          </div>

          {/* Right: Stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 gap-5"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, y: 30, scale: 0.94 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="gradient-border rounded-2xl p-6 bg-[#0a0a0f]"
                style={{ border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="text-5xl font-black mb-2 gradient-text" style={{ fontFamily: 'var(--font-outfit)' }}>
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-[#8A8F98]" style={{ fontFamily: 'var(--font-inter)' }}>
                  {t(stat.key)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
