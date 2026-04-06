"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Link2, Copy, Check, ArrowRight, Send } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const EMAIL = "spestanam273@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/pestanasm";

type FormState = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  const [formState, setFormState] = useState<FormState>('idle')
  const [fields, setFields] = useState({ name: '', email: '', message: '' })

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formState === 'sending') return
    setFormState('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })
      if (!res.ok) throw new Error('Failed')
      setFormState('success')
      setFields({ name: '', email: '', message: '' })
    } catch {
      setFormState('error')
      setTimeout(() => setFormState('idle'), 4000)
    }
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="section-padding relative overflow-hidden"
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] blur-[160px] opacity-[0.07] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #6C63FF, #00D4FF)" }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none opacity-10">
        <div
          className="w-full h-full rounded-full animate-spin-slow"
          style={{ border: "1px solid rgba(108,99,255,0.3)", borderRadius: "50%" }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs font-medium tracking-[4px] uppercase text-[#8A8F98] mb-6"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t("contact.label")}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-6"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            {t("contact.headline")
              .split(/(<accent>.*?<\/accent>)/)
              .map((part, i) => {
                if (part.startsWith("<accent>"))
                  return (
                    <span key={i} className="gradient-text">
                      {part.replace(/<\/?accent>/g, "")}
                    </span>
                  );
                return <span key={i}>{part}</span>;
              })}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[#8A8F98] text-base md:text-lg max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t("contact.description")}
          </motion.p>
        </div>

        {/* Quick actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <button
            onClick={copyEmail}
            className="group flex items-center gap-3 px-7 py-4 rounded-2xl transition-all duration-300 cursor-pointer w-full sm:w-auto"
            style={{
              background: "rgba(108, 99, 255, 0.08)",
              border: "1px solid rgba(108, 99, 255, 0.25)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(108,99,255,0.14)";
              e.currentTarget.style.borderColor = "rgba(108,99,255,0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(108,99,255,0.08)";
              e.currentTarget.style.borderColor = "rgba(108,99,255,0.25)";
            }}
          >
            <Mail size={18} className="text-[#6C63FF]" />
            <span className="text-[#EDEDEF] text-sm font-medium" style={{ fontFamily: "var(--font-mono)" }}>
              {EMAIL}
            </span>
            <div className="ml-auto">
              {copied ? (
                <Check size={16} className="text-[#00D4FF]" />
              ) : (
                <Copy size={16} className="text-[#8A8F98] group-hover:text-[#6C63FF] transition-colors" />
              )}
            </div>
          </button>

          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-7 py-4 rounded-2xl transition-all duration-300 w-full sm:w-auto justify-center"
            style={{ background: "rgba(0, 212, 255, 0.06)", border: "1px solid rgba(0, 212, 255, 0.2)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(0,212,255,0.12)";
              e.currentTarget.style.borderColor = "rgba(0,212,255,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(0,212,255,0.06)";
              e.currentTarget.style.borderColor = "rgba(0,212,255,0.2)";
            }}
          >
            <Link2 size={18} className="text-[#00D4FF]" />
            <span className="text-[#EDEDEF] text-sm font-medium" style={{ fontFamily: "var(--font-inter)" }}>
              {t("contact.linkedin")}
            </span>
            <ArrowRight size={16} className="text-[#8A8F98] group-hover:text-[#00D4FF] group-hover:translate-x-1 transition-all duration-200" />
          </a>
        </motion.div>

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto"
        >
          {formState === 'success' ? (
            <div
              className="flex flex-col items-center justify-center gap-4 py-16 rounded-2xl text-center"
              style={{ background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.2)' }}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(52,211,153,0.15)' }}>
                <Check size={22} className="text-[#34D399]" />
              </div>
              <p className="text-[#EDEDEF] font-medium" style={{ fontFamily: 'var(--font-inter)' }}>
                {t('contact.form.success')}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-medium text-[#8A8F98] mb-2 tracking-wide uppercase"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {t('contact.form.name')}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    autoComplete="name"
                    maxLength={100}
                    value={fields.name}
                    onChange={e => setFields(f => ({ ...f, name: e.target.value }))}
                    placeholder={t('contact.form.name_placeholder')}
                    className="w-full px-4 py-3 rounded-xl text-sm text-[#EDEDEF] placeholder-[#555] outline-none transition-all duration-200"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      fontFamily: 'var(--font-inter)',
                    }}
                    onFocus={e => { e.currentTarget.style.borderColor = 'rgba(108,99,255,0.5)'; e.currentTarget.style.background = 'rgba(108,99,255,0.06)' }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-medium text-[#8A8F98] mb-2 tracking-wide uppercase"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {t('contact.form.email')}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    autoComplete="email"
                    maxLength={254}
                    value={fields.email}
                    onChange={e => setFields(f => ({ ...f, email: e.target.value }))}
                    placeholder={t('contact.form.email_placeholder')}
                    className="w-full px-4 py-3 rounded-xl text-sm text-[#EDEDEF] placeholder-[#555] outline-none transition-all duration-200"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      fontFamily: 'var(--font-inter)',
                    }}
                    onFocus={e => { e.currentTarget.style.borderColor = 'rgba(108,99,255,0.5)'; e.currentTarget.style.background = 'rgba(108,99,255,0.06)' }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-medium text-[#8A8F98] mb-2 tracking-wide uppercase"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {t('contact.form.message')}
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  maxLength={2000}
                  value={fields.message}
                  onChange={e => setFields(f => ({ ...f, message: e.target.value }))}
                  placeholder={t('contact.form.message_placeholder')}
                  className="w-full px-4 py-3 rounded-xl text-sm text-[#EDEDEF] placeholder-[#555] outline-none transition-all duration-200 resize-none"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    fontFamily: 'var(--font-inter)',
                  }}
                  onFocus={e => { e.currentTarget.style.borderColor = 'rgba(108,99,255,0.5)'; e.currentTarget.style.background = 'rgba(108,99,255,0.06)' }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
                />
              </div>

              {formState === 'error' && (
                <p className="text-sm text-[#FF6B6B] mb-4" style={{ fontFamily: 'var(--font-inter)' }}>
                  {t('contact.form.error')}
                </p>
              )}

              <button
                type="submit"
                disabled={formState === 'sending'}
                className="group flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold text-sm transition-all duration-300"
                style={{
                  background: formState === 'sending' ? 'rgba(108,99,255,0.4)' : 'linear-gradient(135deg, #6C63FF, #00D4FF)',
                  color: '#fff',
                  fontFamily: 'var(--font-inter)',
                  opacity: formState === 'sending' ? 0.7 : 1,
                }}
              >
                {formState === 'sending' ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t('contact.form.sending')}
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    {t('contact.form.send')}
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <span className="text-sm gradient-text font-bold tracking-tight" style={{ fontFamily: "var(--font-outfit)" }}>
            pestana.dev
          </span>
          <span className="text-xs text-[#8A8F98]" style={{ fontFamily: "var(--font-inter)" }}>
            © {new Date().getFullYear()} · {t("contact.footer")}
          </span>
          <div className="flex items-center gap-4">
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="text-xs text-[#8A8F98] hover:text-white transition-colors" style={{ fontFamily: "var(--font-inter)" }}>
              LinkedIn
            </a>
            <a href={`mailto:${EMAIL}`} className="text-xs text-[#8A8F98] hover:text-white transition-colors" style={{ fontFamily: "var(--font-inter)" }}>
              Email
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
