'use client'

import dynamic from 'next/dynamic'

const CVPaper = dynamic(() => import('./CVPaper'), { ssr: false })
const CVBackground = dynamic(() => import('./CVBackground'), { ssr: false })

export default function CVPageClient() {
  return (
    <div className="relative min-h-dvh overflow-hidden flex flex-col items-center">
      {/* Three.js background */}
      <div className="fixed inset-0 z-0">
        <CVBackground />
      </div>

      {/* Ambient top gradient */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(108,99,255,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full min-h-dvh flex flex-col items-center justify-start pt-28 pb-20 px-4">
        {/* Page title */}
        <div className="text-center mb-12">
          <p
            className="text-xs font-medium tracking-[4px] uppercase text-[#8A8F98] mb-3"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Curriculum Vitae
          </p>
          <h1
            className="text-4xl md:text-5xl font-black tracking-tight"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            <span className="gradient-text">Sebastian</span>{' '}
            <span className="text-white">Pestana</span>
          </h1>
          <p
            className="text-[#8A8F98] mt-2 text-sm"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Utilisez la souris pour incliner · Cliquez &quot;Retourner&quot; pour voir le verso
          </p>
        </div>

        <CVPaper />
      </div>
    </div>
  )
}
