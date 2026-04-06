'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import en from '@/messages/en.json'
import fr from '@/messages/fr.json'
import es from '@/messages/es.json'

export type Locale = 'en' | 'fr' | 'es'

type Messages = typeof en

const catalogs: Record<Locale, Messages> = { en, fr, es }

// Resolve a dot-path like "hero.badge" from the messages object
function resolve(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.')
  let cur: unknown = obj
  for (const k of keys) {
    if (cur == null || typeof cur !== 'object') return path
    cur = (cur as Record<string, unknown>)[k]
  }
  return typeof cur === 'string' ? cur : path
}

type LanguageContextValue = {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (key: string) => string
  tArray: (key: string) => string[]
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: 'en',
  setLocale: () => {},
  t: (k) => k,
  tArray: () => [],
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('locale') as Locale | null
    if (stored && stored in catalogs) setLocaleState(stored)
  }, [])

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    localStorage.setItem('locale', l)
  }, [])

  const messages = catalogs[locale] as unknown as Record<string, unknown>

  const t = useCallback(
    (key: string) => resolve(messages, key),
    [messages]
  )

  const tArray = useCallback(
    (key: string): string[] => {
      const keys = key.split('.')
      let cur: unknown = messages
      for (const k of keys) {
        if (cur == null || typeof cur !== 'object') return []
        cur = (cur as Record<string, unknown>)[k]
      }
      return Array.isArray(cur) ? (cur as string[]) : []
    },
    [messages]
  )

  // Prevent SSR mismatch: render nothing client-side until mounted
  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ locale: 'en', setLocale, t: (k) => resolve(catalogs.en as unknown as Record<string, unknown>, k), tArray: () => [] }}>
        {children}
      </LanguageContext.Provider>
    )
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, tArray }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
