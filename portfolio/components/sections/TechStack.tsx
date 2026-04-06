'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

const row1 = [
  { name: 'React',       color: '#61DAFB' },
  { name: 'Next.js',     color: '#FFFFFF' },
  { name: 'Node.js',     color: '#68A063' },
  { name: 'TypeScript',  color: '#3178C6' },
  { name: 'Java',        color: '#F89820' },
  { name: 'Python',      color: '#F7C843' },
  { name: 'Vue.js',      color: '#41B883' },
  { name: 'Spring Boot', color: '#6DB33F' },
  { name: 'FastAPI',     color: '#009688' },
  { name: 'Scala',       color: '#DC322F' },
]

const row2 = [
  { name: 'MySQL',        color: '#4479A1' },
  { name: 'Apache Kafka', color: '#A0A0A0' },
  { name: 'Docker',       color: '#2496ED' },
  { name: 'Kubernetes',   color: '#326CE5' },
  { name: 'Stripe',       color: '#635BFF' },
  { name: 'Supabase',     color: '#3ECF8E' },
  { name: 'Vercel',       color: '#FFFFFF' },
  { name: 'Tailwind CSS', color: '#38BDF8' },
  { name: 'Git',          color: '#F05032' },
  { name: 'ZIO',          color: '#DC322F' },
]

function TechBadge({ name, color }: { name: string; color: string }) {
  return (
    <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full flex-shrink-0" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
      <span className="text-sm font-medium text-[#EDEDEF] whitespace-nowrap" style={{ fontFamily: 'var(--font-inter)' }}>{name}</span>
    </div>
  )
}

function MarqueeRow({ items, direction = 'left', speed = 30 }: { items: { name: string; color: string }[]; direction?: 'left' | 'right'; speed?: number }) {
  const doubled = [...items, ...items]
  return (
    <div className="flex overflow-hidden">
      <div
        className={direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}
        style={{ display: 'flex', gap: '12px', animationDuration: `${speed}s`, width: 'max-content' }}
      >
        {doubled.map((item, i) => <TechBadge key={`${item.name}-${i}`} name={item.name} color={item.color} />)}
      </div>
    </div>
  )
}

export default function TechStack() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { t } = useLanguage()

  return (
    <section id="stack" ref={ref} className="section-padding relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-40 blur-[100px] opacity-10 pointer-events-none" style={{ background: 'linear-gradient(90deg, #6C63FF, #00D4FF)' }} />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <p className="text-xs font-medium tracking-[4px] uppercase text-[#8A8F98] mb-4" style={{ fontFamily: 'var(--font-inter)' }}>
            {t('stack.label')}
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight" style={{ fontFamily: 'var(--font-outfit)' }}>
            {t('stack.title')}
          </h2>
          <p className="text-[#8A8F98] mt-4 max-w-md mx-auto text-base" style={{ fontFamily: 'var(--font-inter)' }}>
            {t('stack.description')}
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-col gap-4"
      >
        {[row1, row2].map((row, idx) => (
          <div key={idx} className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #050508, transparent)' }} />
            <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #050508, transparent)' }} />
            <MarqueeRow items={row} direction={idx === 0 ? 'left' : 'right'} speed={idx === 0 ? 35 : 40} />
          </div>
        ))}
      </motion.div>
    </section>
  )
}
