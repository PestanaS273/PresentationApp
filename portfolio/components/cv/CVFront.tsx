'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function CVFront() {
  const { t, tArray } = useLanguage()

  return (
    <div
      style={{
        background: '#F9F7F3',
        color: '#1A1A1A',
        fontFamily: 'var(--font-inter), system-ui, sans-serif',
        padding: '48px 44px 44px',
        lineHeight: 1.55,
        fontSize: '13px',
        minHeight: '600px',
      }}
    >
      {/* ── Header ─────────────────────────────────────── */}
      <div style={{ borderBottom: '2px solid #1A1A1A', paddingBottom: '18px', marginBottom: '22px' }}>
        <h1 style={{ fontFamily: 'var(--font-outfit)', fontSize: '30px', fontWeight: 900, letterSpacing: '-1px', margin: 0, lineHeight: 1.1 }}>
          Sebastian Pestana
        </h1>
        <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '4px 16px', color: '#444', fontSize: '12px' }}>
          <span>Paris, France</span>
          <span style={{ color: '#BBB' }}>·</span>
          <span>+33 624 433 925</span>
          <span style={{ color: '#BBB' }}>·</span>
          <span>spestanam273@gmail.com</span>
        </div>
        <div style={{ marginTop: '12px', height: '3px', width: '80px', background: 'linear-gradient(90deg, #6C63FF, #00D4FF)', borderRadius: '2px' }} />
      </div>

      {/* ── Profil ─────────────────────────────────────── */}
      <Section title={t('cv.sections.profile')}>
        <p style={{ color: '#333', margin: 0 }}>{t('cv.profile_text')}</p>
      </Section>

      {/* ── Expériences ────────────────────────────────── */}
      <Section title={t('cv.sections.experience')}>
        <Job
          title={t('cv.experience.disney.title')}
          company={t('cv.experience.disney.company')}
          period={t('cv.experience.disney.period')}
          items={tArray('cv.experience.disney.items')}
        />
        <Job
          title={t('cv.experience.fresenius.title')}
          company={t('cv.experience.fresenius.company')}
          period={t('cv.experience.fresenius.period')}
          items={tArray('cv.experience.fresenius.items')}
        />
      </Section>

      {/* ── Éducation ──────────────────────────────────── */}
      <Section title={t('cv.sections.education')}>
        <Job
          title={t('cv.education.engineer.title')}
          company={t('cv.education.engineer.school')}
          period={t('cv.education.engineer.period')}
          items={tArray('cv.education.engineer.items')}
        />
        <Job
          title={t('cv.education.bachelor.title')}
          company={t('cv.education.bachelor.school')}
          period={t('cv.education.bachelor.period')}
          items={tArray('cv.education.bachelor.items')}
        />
        <Job
          title={t('cv.education.dut.title')}
          company={t('cv.education.dut.school')}
          period={t('cv.education.dut.period')}
          items={tArray('cv.education.dut.items')}
        />
      </Section>

      {/* ── Compétences ────────────────────────────────── */}
      <Section title={t('cv.sections.skills')}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <SkillBlock title={t('cv.skills.frontend')} items={tArray('cv.skills.frontend_items')} color="#6C63FF" />
          <SkillBlock title={t('cv.skills.backend')}  items={tArray('cv.skills.backend_items')}  color="#00D4FF" />
          <SkillBlock title={t('cv.skills.database')} items={tArray('cv.skills.database_items')} color="#FF6B6B" />
          <SkillBlock title={t('cv.skills.devops')}   items={tArray('cv.skills.devops_items')}   color="#34D399" />
        </div>
      </Section>

      {/* ── Langues & Intérêts ─────────────────────────── */}
      <div style={{ marginTop: '20px', paddingTop: '14px', borderTop: '1px solid #E0DDD8', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', fontSize: '12px', color: '#555' }}>
        <div>
          <span style={{ fontWeight: 700, color: '#1A1A1A' }}>{t('cv.sections.languages')} : </span>
          {t('cv.languages_text')}
        </div>
        <div>
          <span style={{ fontWeight: 700, color: '#1A1A1A' }}>{t('cv.sections.interests')} : </span>
          {t('cv.interests_text')}
        </div>
      </div>
    </div>
  )
}

// ── Sub-components ──────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '18px' }}>
      <h2 style={{ fontFamily: 'var(--font-outfit)', fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#888', marginBottom: '10px', marginTop: 0 }}>
        {title}
      </h2>
      {children}
    </div>
  )
}

function Job({ title, company, period, items }: { title: string; company: string; period: string; items: string[] }) {
  return (
    <div style={{ marginBottom: '12px', paddingLeft: '12px', borderLeft: '2px solid #E0DDD8' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2px', marginBottom: '3px' }}>
        <span style={{ fontWeight: 700, fontSize: '13px', color: '#111' }}>{title}</span>
        <span style={{ fontSize: '11px', color: '#888', whiteSpace: 'nowrap' }}>{period}</span>
      </div>
      <div style={{ fontSize: '12px', color: '#6C63FF', fontWeight: 600, marginBottom: '4px' }}>{company}</div>
      <ul style={{ margin: 0, paddingLeft: '14px', color: '#444' }}>
        {items.map((item, i) => <li key={i} style={{ marginBottom: '2px' }}>{item}</li>)}
      </ul>
    </div>
  )
}

function SkillBlock({ title, items, color }: { title: string; items: string[]; color: string }) {
  return (
    <div style={{ background: '#F0EDE8', borderRadius: '6px', padding: '10px 12px', borderLeft: `3px solid ${color}` }}>
      <div style={{ fontWeight: 700, fontSize: '11px', color, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>
        {title}
      </div>
      {items.map((item, i) => <div key={i} style={{ fontSize: '12px', color: '#444', lineHeight: 1.5 }}>{item}</div>)}
    </div>
  )
}
