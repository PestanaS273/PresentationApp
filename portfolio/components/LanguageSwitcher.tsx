'use client'

import { useLanguage, type Locale } from '@/contexts/LanguageContext'
import { motion } from 'framer-motion'

const locales: { code: Locale; label: string; flag: string }[] = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
  { code: 'es', label: 'ES', flag: '🇪🇸' },
]

export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useLanguage()

  return (
    <div
      className="flex items-center gap-0.5 rounded-full p-0.5"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {locales.map(({ code, label, flag }) => {
        const active = locale === code
        return (
          <motion.button
            key={code}
            onClick={() => setLocale(code)}
            whileTap={{ scale: 0.92 }}
            className="relative px-2.5 py-1 rounded-full text-xs font-semibold transition-colors duration-200 cursor-pointer"
            style={{
              fontFamily: 'var(--font-mono)',
              color: active ? '#EDEDEF' : '#8A8F98',
              background: active
                ? 'linear-gradient(135deg, rgba(108,99,255,0.5), rgba(0,212,255,0.3))'
                : 'transparent',
            }}
          >
            {compact ? flag : label}
          </motion.button>
        )
      })}
    </div>
  )
}
