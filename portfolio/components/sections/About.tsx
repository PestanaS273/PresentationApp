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
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-16 h-1 rounded-full mb-8" style={{ background: 'linear-gradient(90deg, #6C63FF, #00D4FF)' }} />

            <p className="text-xs font-medium tracking-[4px] uppercase text-[#8A8F98] mb-6" style={{ fontFamily: 'var(--font-inter)' }}>
              {t('about.label')}
            </p>

            <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-8" style={{ fontFamily: 'var(--font-outfit)' }}>
              {/* Parse the headline with <accent> and <muted> markers */}
              {t('about.headline').split(/(<accent>.*?<\/accent>|<muted>.*?<\/muted>)/).map((part, i) => {
                if (part.startsWith('<accent>')) return <span key={i} className="gradient-text">{part.replace(/<\/?accent>/g, '')}</span>
                if (part.startsWith('<muted>')) return <span key={i} className="text-white/60">{part.replace(/<\/?muted>/g, '')}</span>
                return <span key={i}>{part}</span>
              })}
            </h2>

            <p className="text-[#8A8F98] text-base md:text-lg leading-relaxed mb-6" style={{ fontFamily: 'var(--font-inter)' }}>
              {t('about.bio1')}
            </p>

            <p className="text-[#8A8F98] text-base leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
              {t('about.bio2')}
            </p>

            <div className="mt-10 flex items-center gap-4">
              <span className="text-sm text-[#6C63FF]" style={{ fontFamily: 'var(--font-mono)' }}>
                {t('about.open')}
              </span>
              <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse-dot flex-shrink-0" />
            </div>
          </motion.div>

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
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
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
