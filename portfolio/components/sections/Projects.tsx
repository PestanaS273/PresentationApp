'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Code2, ArrowUpRight } from 'lucide-react'

const projects = [
  {
    id: 'propertystake',
    title: 'PropertyStake',
    category: 'Backend / Systems',
    description:
      'Fractional property investment platform. Investors buy property shares and receive monthly passive income via event-driven microservices and scheduled jobs.',
    tags: ['Node.js', 'Apache Kafka', 'MySQL', 'Stripe', 'Docker', 'Node-Cron'],
    accent: '#6C63FF',
    accentRgb: '108, 99, 255',
    size: 'large',
    year: '2024',
    github: 'https://github.com',
  },
  {
    id: 'advancedefrei',
    title: 'AdvancedEFREI',
    category: 'Fullstack / DevOps',
    description:
      'University feedback system with multilingual support (ES, EN, FR, JP), RBAC permissions, Excel processing via Python, and full Kubernetes orchestration.',
    tags: ['Vue.js', 'Spring Boot', 'FastAPI', 'MySQL', 'Kubernetes', 'Docker'],
    accent: '#00D4FF',
    accentRgb: '0, 212, 255',
    size: 'large',
    year: '2024',
    github: 'https://github.com',
  },
  {
    id: 'hck-rental',
    title: 'HCK Rental',
    category: 'Web / Frontend',
    description:
      'Modern corporate site for an events company. Clean, fast, deployed on Vercel.',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Python'],
    accent: '#FF6B6B',
    accentRgb: '255, 107, 107',
    size: 'medium',
    year: '2024',
    github: 'https://github.com',
    live: 'https://hck-rental.vercel.app',
  },
  {
    id: 'functional-graphs',
    title: 'Functional Graphs',
    category: 'Library / FP',
    description:
      'Pure functional graph library in Scala/ZIO. DFS, BFS, Dijkstra, Floyd-Warshall, topological sort and cycle detection using tail recursion and pattern matching.',
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
    description:
      'Multi-LLM news analyzer. Users bring their own OpenAI and Perplexity API keys for real-time news summarization and contextual insights.',
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
    description:
      'Complete Tetris clone with modular architecture. Tetromino logic, game loop, settings — all cleanly separated.',
    tags: ['Python', 'Pygame'],
    accent: '#F59E0B',
    accentRgb: '245, 158, 11',
    size: 'small',
    year: '2024',
    github: 'https://github.com',
  },
]

function ProjectCard({
  project,
  index,
  inView,
}: {
  project: (typeof projects)[0]
  index: number
  inView: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12
    setTilt({ x, y })
  }

  const handleMouseLeave = () => {
    setHovered(false)
    setTilt({ x: 0, y: 0 })
  }

  const isLarge  = project.size === 'large'
  const isMedium = project.size === 'medium'

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.05 * index, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl p-6 overflow-hidden transition-all duration-300 ${
        isLarge ? 'md:col-span-2' : isMedium ? 'md:col-span-1' : 'md:col-span-1'
      }`}
      style={{
        background: '#0a0a0f',
        border: `1px solid rgba(255,255,255,0.07)`,
        borderColor: hovered ? `rgba(${project.accentRgb}, 0.3)` : 'rgba(255,255,255,0.07)',
        boxShadow: hovered ? `0 20px 60px rgba(${project.accentRgb}, 0.12), 0 0 0 1px rgba(${project.accentRgb}, 0.2)` : 'none',
        transform: hovered
          ? `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(1.01)`
          : 'perspective(1000px) rotateX(0) rotateY(0) scale(1)',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Animated top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-opacity duration-400"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(${project.accentRgb}, 1), transparent)`,
          opacity: hovered ? 1 : 0.2,
        }}
      />

      {/* Category + year */}
      <div className="flex items-center justify-between mb-5">
        <span
          className="text-xs font-medium px-3 py-1 rounded-full"
          style={{
            background: `rgba(${project.accentRgb}, 0.1)`,
            color: project.accent,
            fontFamily: 'var(--font-mono)',
            border: `1px solid rgba(${project.accentRgb}, 0.2)`,
          }}
        >
          {project.category}
        </span>
        <span
          className="text-xs text-[#8A8F98]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {project.year}
        </span>
      </div>

      {/* Title */}
      <h3
        className={`font-black text-white mb-3 tracking-tight leading-tight ${
          isLarge ? 'text-3xl md:text-4xl' : 'text-2xl'
        }`}
        style={{ fontFamily: 'var(--font-outfit)' }}
      >
        {project.title}
      </h3>

      {/* Description */}
      <p
        className={`text-[#8A8F98] leading-relaxed mb-6 ${isLarge ? 'text-base' : 'text-sm'}`}
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-1 rounded-md text-[#8A8F98]"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-3 mt-auto">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-[#8A8F98] hover:text-white transition-colors"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            <Code2 size={15} />
            Code
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm transition-colors"
            style={{ color: project.accent, fontFamily: 'var(--font-inter)' }}
          >
            <ExternalLink size={15} />
            Live demo
          </a>
        )}

        {/* Hover arrow */}
        <motion.div
          className="ml-auto"
          animate={{ x: hovered ? 0 : -4, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowUpRight size={18} style={{ color: project.accent }} />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" ref={ref} className="section-padding relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <p
            className="text-xs font-medium tracking-[4px] uppercase text-[#8A8F98] mb-4"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Work
          </p>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h2
              className="text-4xl md:text-5xl font-black text-white tracking-tight"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              Selected Projects
            </h2>
            <p
              className="text-[#8A8F98] text-sm max-w-xs"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              A selection of systems, products, and experiments.
            </p>
          </div>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Row 1: two large cards */}
          {projects.slice(0, 2).map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} inView={inView} />
          ))}
          {/* Row 2: three medium/small cards */}
          {projects.slice(2).map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i + 2} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
