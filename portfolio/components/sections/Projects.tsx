'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Code2, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const projects = [
  {
    id: 'keysolutions',
    title: 'KeySolutions SAC',
    category: 'Web / Corporate',
    tags: ['React', 'Vite', 'Tailwind CSS'],
    accent: '#F59E0B',
    accentRgb: '245, 158, 11',
    size: 'large',
    year: '2026',
    live: 'https://keysolutionssac.com/',
  },
  {
    id: 'hck-rental',
    title: 'HCK Rental',
    category: 'Web / Frontend',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Python'],
    accent: '#FF6B6B',
    accentRgb: '255, 107, 107',
    size: 'large',
    year: '2026',
    github: 'https://github.com',
    live: 'https://hck-rental.vercel.app',
  },
  {
    id: 'propertystake',
    title: 'PropertyStake',
    category: 'Backend / Systems',
    tags: ['Node.js', 'Apache Kafka', 'MySQL', 'Stripe', 'Docker', 'Node-Cron'],
    accent: '#6C63FF',
    accentRgb: '108, 99, 255',
    size: 'medium',
    year: '2024',
    github: 'https://github.com',
  },
  {
    id: 'advancedefrei',
    title: 'AdvancedEFREI',
    category: 'Fullstack / DevOps',
    tags: ['Vue.js', 'Spring Boot', 'FastAPI', 'MySQL', 'Kubernetes', 'Docker'],
    accent: '#00D4FF',
    accentRgb: '0, 212, 255',
    size: 'medium',
    year: '2024',
    github: 'https://github.com',
  },
  {
    id: 'functional-graphs',
    title: 'Functional Graphs',
    category: 'Library / FP',
    tags: ['Scala', 'ZIO', 'SBT'],
    accent: '#A78BFA',
    accentRgb: '167, 139, 250',
    size: 'medium',
    year: '2024',
    github: 'https://github.com',
  },
  {
    id: 'mlproject',
    title: 'MLProject',
    category: 'AI / Web',
    tags: ['Vue.js', 'Vite', 'OpenAI API', 'Perplexity'],
    accent: '#34D399',
    accentRgb: '52, 211, 153',
    size: 'medium',
    year: '2024',
    github: 'https://github.com',
  },
  {
    id: 'tetris',
    title: 'Tetris',
    category: 'Game Dev',
    tags: ['Python', 'Pygame'],
    accent: '#F59E0B',
    accentRgb: '245, 158, 11',
    size: 'small',
    year: '2024',
    github: 'https://github.com',
  },
]

function ProjectCard({
  project, index, inView,
}: {
  project: (typeof projects)[0]; index: number; inView: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const { t } = useLanguage()

  const isLarge = project.size === 'large'

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.05 * index, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={(e) => {
        const rect = cardRef.current?.getBoundingClientRect()
        if (!rect) return
        setTilt({ x: ((e.clientX - rect.left) / rect.width - 0.5) * 12, y: ((e.clientY - rect.top) / rect.height - 0.5) * -12 })
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }) }}
      className={`relative rounded-2xl p-6 overflow-hidden ${isLarge ? 'md:col-span-2' : 'md:col-span-1'}`}
      style={{
        background: '#0a0a0f',
        border: '1px solid',
        borderColor: hovered ? `rgba(${project.accentRgb}, 0.3)` : 'rgba(255,255,255,0.07)',
        boxShadow: hovered ? `0 20px 60px rgba(${project.accentRgb}, 0.12), 0 0 0 1px rgba(${project.accentRgb}, 0.2)` : 'none',
        transform: hovered ? `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(1.01)` : 'perspective(1000px) rotateX(0) rotateY(0) scale(1)',
        transformStyle: 'preserve-3d',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(${project.accentRgb}, 1), transparent)`, opacity: hovered ? 1 : 0.2, transition: 'opacity 0.4s' }} />

      {/* Category + year */}
      <div className="flex items-center justify-between mb-5">
        <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: `rgba(${project.accentRgb}, 0.1)`, color: project.accent, fontFamily: 'var(--font-mono)', border: `1px solid rgba(${project.accentRgb}, 0.2)` }}>
          {project.category}
        </span>
        <span className="text-xs text-[#8A8F98]" style={{ fontFamily: 'var(--font-mono)' }}>{project.year}</span>
      </div>

      <h3 className={`font-black text-white mb-3 tracking-tight leading-tight ${isLarge ? 'text-3xl md:text-4xl' : 'text-2xl'}`} style={{ fontFamily: 'var(--font-outfit)' }}>
        {project.title}
      </h3>

      <p className={`text-[#8A8F98] leading-relaxed mb-6 ${isLarge ? 'text-base' : 'text-sm'}`} style={{ fontFamily: 'var(--font-inter)' }}>
        {t(`projects.descriptions.${project.id}`)}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag) => (
          <span key={tag} className="text-xs px-2.5 py-1 rounded-md text-[#8A8F98]" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', fontFamily: 'var(--font-mono)' }}>
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-3 mt-auto">
        {'github' in project && project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-[#8A8F98] hover:text-white transition-colors" style={{ fontFamily: 'var(--font-inter)' }}>
            <Code2 size={15} />
            {t('projects.code')}
          </a>
        )}
        {'live' in project && project.live && (
          <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm transition-colors" style={{ color: project.accent, fontFamily: 'var(--font-inter)' }}>
            <ExternalLink size={15} />
            {t('projects.live')}
          </a>
        )}
        <motion.div className="ml-auto" animate={{ x: hovered ? 0 : -4, opacity: hovered ? 1 : 0 }} transition={{ duration: 0.2 }}>
          <ArrowUpRight size={18} style={{ color: project.accent }} />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { t } = useLanguage()

  return (
    <section id="projects" ref={ref} className="section-padding relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <p className="text-xs font-medium tracking-[4px] uppercase text-[#8A8F98] mb-4" style={{ fontFamily: 'var(--font-inter)' }}>
            {t('projects.label')}
          </p>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight" style={{ fontFamily: 'var(--font-outfit)' }}>
              {t('projects.title')}
            </h2>
            <p className="text-[#8A8F98] text-sm max-w-xs" style={{ fontFamily: 'var(--font-inter)' }}>
              {t('projects.subtitle')}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
