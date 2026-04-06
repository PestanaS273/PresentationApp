'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Link2, Copy, Check, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const EMAIL   = 'spestanam273@gmail.com'
const LINKEDIN = 'https://www.linkedin.com/in/sebastian-pestana'

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [copied, setCopied] = useState(false)
  const { t } = useLanguage()

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <section id="contact" ref={ref} className="section-padding relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] blur-[160px] opacity-[0.07] pointer-events-none" style={{ background: 'radial-gradient(ellipse, #6C63FF, #00D4FF)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none opacity-10">
        <div className="w-full h-full rounded-full animate-spin-slow" style={{ border: '1px solid rgba(108,99,255,0.3)', borderRadius: '50%' }} />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-xs font-medium tracking-[4px] uppercase text-[#8A8F98] mb-6"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          {t('contact.label')}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-6"
          style={{ fontFamily: 'var(--font-outfit)' }}
        >
          {t('contact.headline').split(/(<accent>.*?<\/accent>)/).map((part, i) => {
            if (part.startsWith('<accent>'))
              return <span key={i} className="gradient-text">{part.replace(/<\/?accent>/g, '')}</span>
            return <span key={i}>{part}</span>
          })}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-[#8A8F98] text-base md:text-lg max-w-xl mx-auto mb-12 leading-relaxed"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          {t('contact.description')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Email */}
          <button
            onClick={copyEmail}
            className="group flex items-center gap-3 px-7 py-4 rounded-2xl transition-all duration-300 cursor-pointer w-full sm:w-auto"
            style={{ background: 'rgba(108, 99, 255, 0.08)', border: '1px solid rgba(108, 99, 255, 0.25)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(108,99,255,0.14)'; e.currentTarget.style.borderColor = 'rgba(108,99,255,0.45)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(108,99,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(108,99,255,0.25)' }}
          >
            <Mail size={18} className="text-[#6C63FF]" />
            <span className="text-[#EDEDEF] text-sm font-medium" style={{ fontFamily: 'var(--font-mono)' }}>{EMAIL}</span>
            <div className="ml-auto">
              {copied ? <Check size={16} className="text-[#00D4FF]" /> : <Copy size={16} className="text-[#8A8F98] group-hover:text-[#6C63FF] transition-colors" />}
            </div>
          </button>

          {/* LinkedIn */}
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-7 py-4 rounded-2xl transition-all duration-300 w-full sm:w-auto justify-center"
            style={{ background: 'rgba(0, 212, 255, 0.06)', border: '1px solid rgba(0, 212, 255, 0.2)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,212,255,0.12)'; e.currentTarget.style.borderColor = 'rgba(0,212,255,0.4)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,212,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(0,212,255,0.2)' }}
          >
            <Link2 size={18} className="text-[#00D4FF]" />
            <span className="text-[#EDEDEF] text-sm font-medium" style={{ fontFamily: 'var(--font-inter)' }}>{t('contact.linkedin')}</span>
            <ArrowRight size={16} className="text-[#8A8F98] group-hover:text-[#00D4FF] group-hover:translate-x-1 transition-all duration-200" />
          </a>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <span className="text-sm gradient-text font-bold tracking-tight" style={{ fontFamily: 'var(--font-outfit)' }}>pestana.dev</span>
          <span className="text-xs text-[#8A8F98]" style={{ fontFamily: 'var(--font-inter)' }}>
            © {new Date().getFullYear()} · {t('contact.footer')}
          </span>
          <div className="flex items-center gap-4">
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="text-xs text-[#8A8F98] hover:text-white transition-colors" style={{ fontFamily: 'var(--font-inter)' }}>LinkedIn</a>
            <a href={`mailto:${EMAIL}`} className="text-xs text-[#8A8F98] hover:text-white transition-colors" style={{ fontFamily: 'var(--font-inter)' }}>Email</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
