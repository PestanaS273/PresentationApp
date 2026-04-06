'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Globe, ShoppingCart, Zap } from 'lucide-react'

const services = [
  {
    icon: Globe,
    title: 'Web Applications',
    subtitle: 'From concept to production',
    description:
      'Full-stack web applications built with modern frameworks. Complex data flows, real-time features, authentication systems, and scalable architectures that grow with your business.',
    features: ['Next.js / React / Vue', 'Node.js / Spring Boot / FastAPI', 'SQL & NoSQL databases', 'REST & event-driven APIs'],
    accent: '#6C63FF',
    accentRgb: '108, 99, 255',
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce Systems',
    subtitle: 'Sell at scale',
    description:
      'Custom e-commerce platforms with payment processing, inventory management, order flows, and the performance required to handle traffic spikes without breaking.',
    features: ['Stripe / payment integrations', 'Inventory & order management', 'Custom storefronts', 'Analytics & reporting'],
    accent: '#00D4FF',
    accentRgb: '0, 212, 255',
  },
  {
    icon: Zap,
    title: 'Automations & Integrations',
    subtitle: 'Systems that talk to each other',
    description:
      'Connect your existing tools and automate repetitive workflows. From Kafka-driven microservices to simple API bridges — built to fit your stack, not replace it.',
    features: ['Event-driven pipelines', 'Third-party API integrations', 'Scheduled jobs & workers', 'Microservices & SOA'],
    accent: '#FF6B6B',
    accentRgb: '255, 107, 107',
  },
]

function ServiceCard({
  service,
  index,
  inView,
}: {
  service: (typeof services)[0]
  index: number
  inView: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl p-7 overflow-hidden cursor-default"
      style={{
        background: '#0a0a0f',
        border: `1px solid rgba(255,255,255,0.07)`,
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
        borderColor: hovered ? `rgba(${service.accentRgb}, 0.3)` : 'rgba(255,255,255,0.07)',
        boxShadow: hovered ? `0 0 40px rgba(${service.accentRgb}, 0.1)` : 'none',
      }}
    >
      {/* Spotlight glow */}
      {hovered && (
        <div
          className="pointer-events-none absolute w-72 h-72 rounded-full"
          style={{
            left: cursor.x,
            top: cursor.y,
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, rgba(${service.accentRgb}, 0.1) 0%, transparent 70%)`,
          }}
        />
      )}

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-opacity duration-400"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(${service.accentRgb}, 0.8), transparent)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Icon */}
      <div
        className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6"
        style={{
          background: `rgba(${service.accentRgb}, 0.1)`,
          border: `1px solid rgba(${service.accentRgb}, 0.2)`,
        }}
      >
        <service.icon size={22} style={{ color: service.accent }} strokeWidth={1.5} />
      </div>

      {/* Title */}
      <p
        className="text-xs font-medium tracking-widest uppercase mb-2"
        style={{ fontFamily: 'var(--font-inter)', color: service.accent }}
      >
        {service.subtitle}
      </p>
      <h3
        className="text-2xl font-bold text-white mb-4"
        style={{ fontFamily: 'var(--font-outfit)' }}
      >
        {service.title}
      </h3>

      <p
        className="text-sm text-[#8A8F98] leading-relaxed mb-6"
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        {service.description}
      </p>

      {/* Feature list */}
      <ul className="space-y-2">
        {service.features.map((feat) => (
          <li
            key={feat}
            className="flex items-center gap-2.5 text-sm text-[#8A8F98]"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: service.accent }}
            />
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

  return (
    <section id="services" ref={ref} className="section-padding relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p
            className="text-xs font-medium tracking-[4px] uppercase text-[#8A8F98] mb-4"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            What I do
          </p>
          <h2
            className="text-4xl md:text-5xl font-black text-white tracking-tight"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            Services
          </h2>
          <p
            className="text-[#8A8F98] mt-4 max-w-lg mx-auto text-base"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Specialized in the intersection of clean architecture and pragmatic delivery.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
