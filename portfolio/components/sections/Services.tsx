'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Globe, ShoppingCart, Zap } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const serviceKeys = [
  { key: 'web',        icon: Globe,         accent: '#6C63FF', accentRgb: '108, 99, 255' },
  { key: 'ecommerce',  icon: ShoppingCart,  accent: '#00D4FF', accentRgb: '0, 212, 255'  },
  { key: 'automation', icon: Zap,           accent: '#FF6B6B', accentRgb: '255, 107, 107' },
]

function ServiceCard({
  serviceKey, icon: Icon, accent, accentRgb, index, inView,
}: {
  serviceKey: string; icon: typeof Globe; accent: string; accentRgb: string; index: number; inView: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const { t, tArray } = useLanguage()

  const features = tArray(`services.${serviceKey}.features`)

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={(e) => {
        const rect = cardRef.current?.getBoundingClientRect()
        if (rect) setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top })
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl p-7 overflow-hidden cursor-default"
      style={{
        background: '#0a0a0f',
        border: '1px solid',
        borderColor: hovered ? `rgba(${accentRgb}, 0.3)` : 'rgba(255,255,255,0.07)',
        boxShadow: hovered ? `0 0 40px rgba(${accentRgb}, 0.1)` : 'none',
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
      }}
    >
      {hovered && (
        <div className="pointer-events-none absolute w-72 h-72 rounded-full" style={{ left: cursor.x, top: cursor.y, transform: 'translate(-50%, -50%)', background: `radial-gradient(circle, rgba(${accentRgb}, 0.1) 0%, transparent 70%)` }} />
      )}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(${accentRgb}, 0.8), transparent)`, opacity: hovered ? 1 : 0, transition: 'opacity 0.4s' }} />

      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6" style={{ background: `rgba(${accentRgb}, 0.1)`, border: `1px solid rgba(${accentRgb}, 0.2)` }}>
        <Icon size={22} style={{ color: accent }} strokeWidth={1.5} />
      </div>

      <p className="text-xs font-medium tracking-widest uppercase mb-2" style={{ fontFamily: 'var(--font-inter)', color: accent }}>
        {t(`services.${serviceKey}.subtitle`)}
      </p>
      <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-outfit)' }}>
        {t(`services.${serviceKey}.title`)}
      </h3>
      <p className="text-sm text-[#8A8F98] leading-relaxed mb-6" style={{ fontFamily: 'var(--font-inter)' }}>
        {t(`services.${serviceKey}.description`)}
      </p>

      <ul className="space-y-2">
        {features.map((feat) => (
          <li key={feat} className="flex items-center gap-2.5 text-sm text-[#8A8F98]" style={{ fontFamily: 'var(--font-inter)' }}>
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: accent }} />
            {feat}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function Services() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { t } = useLanguage()

  return (
    <section id="services" ref={ref} className="section-padding relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="text-xs font-medium tracking-[4px] uppercase text-[#8A8F98] mb-4" style={{ fontFamily: 'var(--font-inter)' }}>
            {t('services.label')}
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight" style={{ fontFamily: 'var(--font-outfit)' }}>
            {t('services.title')}
          </h2>
          <p className="text-[#8A8F98] mt-4 max-w-lg mx-auto text-base" style={{ fontFamily: 'var(--font-inter)' }}>
            {t('services.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {serviceKeys.map((s, i) => (
            <ServiceCard key={s.key} serviceKey={s.key} icon={s.icon} accent={s.accent} accentRgb={s.accentRgb} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
