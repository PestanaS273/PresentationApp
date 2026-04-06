'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'About',    href: '#about'    },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Stack',    href: '#stack'    },
  { label: 'Contact',  href: '#contact'  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href: string) => {
    setOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[rgba(5,5,8,0.85)] backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_40px_rgba(0,0,0,0.5)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-display font-800 text-xl tracking-tight gradient-text cursor-pointer"
          style={{ fontFamily: 'var(--font-outfit)' }}
        >
          pestana<span className="text-white/30">.</span>dev
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-sm text-[#8A8F98] hover:text-white transition-colors duration-200 cursor-pointer tracking-wide"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNav('#contact')}
            className="text-sm px-5 py-2 rounded-full border border-[rgba(108,99,255,0.5)] text-[#6C63FF] hover:bg-[rgba(108,99,255,0.1)] transition-all duration-200 cursor-pointer"
          >
            Hire me
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={{ rotate: open ? 45 : 0, y: open ? 8 : 0 }}
            className="block w-5 h-px bg-white origin-center"
            transition={{ duration: 0.3 }}
          />
          <motion.span
            animate={{ opacity: open ? 0 : 1 }}
            className="block w-5 h-px bg-white"
            transition={{ duration: 0.3 }}
          />
          <motion.span
            animate={{ rotate: open ? -45 : 0, y: open ? -8 : 0 }}
            className="block w-5 h-px bg-white origin-center"
            transition={{ duration: 0.3 }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden bg-[rgba(5,5,8,0.95)] backdrop-blur-xl border-b border-white/[0.06]"
          >
            <nav className="px-6 py-6 flex flex-col gap-5">
              {links.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="text-left text-lg text-[#EDEDEF] hover:text-white transition-colors cursor-pointer"
                  style={{ fontFamily: 'var(--font-outfit)' }}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNav('#contact')}
                className="mt-2 text-center py-3 rounded-full border border-[rgba(108,99,255,0.5)] text-[#6C63FF] cursor-pointer"
              >
                Hire me
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
