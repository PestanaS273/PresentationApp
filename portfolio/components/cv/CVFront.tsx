export default function CVFront() {
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
      <div
        style={{
          borderBottom: '2px solid #1A1A1A',
          paddingBottom: '18px',
          marginBottom: '22px',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-outfit)',
            fontSize: '30px',
            fontWeight: 900,
            letterSpacing: '-1px',
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          Sebastian Pestana
        </h1>
        <div
          style={{
            marginTop: '8px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4px 16px',
            color: '#444',
            fontSize: '12px',
          }}
        >
          <span>Paris, France</span>
          <span style={{ color: '#BBB' }}>·</span>
          <span>+33 624 433 925</span>
          <span style={{ color: '#BBB' }}>·</span>
          <span>spestanam273@gmail.com</span>
        </div>
        {/* Accent stripe */}
        <div
          style={{
            marginTop: '12px',
            height: '3px',
            width: '80px',
            background: 'linear-gradient(90deg, #6C63FF, #00D4FF)',
            borderRadius: '2px',
          }}
        />
      </div>

      {/* ── Profil ─────────────────────────────────────── */}
      <Section title="Profil">
        <p style={{ color: '#333', margin: 0 }}>
          Ingénieur software motivé, spécialisé en développement Full Stack et DevOps. Passionné
          par la conception et l&apos;optimisation d&apos;applications. Maîtrise des méthodologies agiles,
          automatisation des processus, et pratiques DevOps modernes. Expérience dans des
          environnements collaboratifs et internationaux.
        </p>
      </Section>

      {/* ── Expériences ────────────────────────────────── */}
      <Section title="Expériences Professionnelles">
        <Job
          title="Alternance Ingénieur Fullstack & DevOps"
          company="Disneyland Paris"
          period="2023 – 2025"
          items={[
            'Développement et gestion agile d\'applications sur mesure — département Spectacle.',
            'React.js, Node.js, Java Spring Boot, Python, Docker, Gitlab, Jenkins.',
            'Automatisation de pipelines : extraction d\'information, traitement image, génération PDF.',
          ]}
        />
        <Job
          title="Développement Analytique"
          company="Fresenius Kabi"
          period="Fév – Avr 2022"
          items={[
            'Recherche appliquée en environnement pharmaceutique industriel.',
            'Projet R&D sur la lixiviation de l\'aluminium dans les contenants médicaux.',
            'Protocoles expérimentaux rigoureux et traitement statistique des résultats.',
          ]}
        />
      </Section>

      {/* ── Éducation ──────────────────────────────────── */}
      <Section title="Éducation">
        <Job
          title="Diplôme d'Ingénieur — Software Engineering"
          company="EFREI Paris"
          period="2025"
          items={[
            'Full Stack Web, Vue, React, Java Spring Boot, SQL/NoSQL, Jenkins, Docker, Kubernetes.',
            'Projets : gestion immobilière, IA reconnaissance audio, automatisation documentaire.',
          ]}
        />
        <Job
          title="Bachelor of Engineering Science"
          company="EFREI Paris"
          period="2023"
          items={[
            'SQL, POO Java, Full Stack Web, Physique, VHDL.',
          ]}
        />
        <Job
          title="DUT — Sciences et Génie des Matériaux"
          company="Sorbonne Paris Nord"
          period="2022"
          items={[
            'Physique, Mathématiques, Probabilités, Chimie. Classement : Top 5 de promotion.',
          ]}
        />
      </Section>

      {/* ── Compétences ────────────────────────────────── */}
      <Section title="Compétences Techniques">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <SkillBlock
            title="Frontend"
            items={['Vue.js, React.js, Next.js', 'TypeScript, Tailwind CSS']}
            color="#6C63FF"
          />
          <SkillBlock
            title="Backend"
            items={['Node.js, Java Spring Boot', 'Python (FastAPI, scripts)']}
            color="#00D4FF"
          />
          <SkillBlock
            title="Base de données"
            items={['PostgreSQL, MySQL (SQL)', 'MongoDB, Neo4J (NoSQL)']}
            color="#FF6B6B"
          />
          <SkillBlock
            title="DevOps"
            items={['Docker, Kubernetes, Terraform', 'Jenkins, Gitlab, Argo CD']}
            color="#34D399"
          />
        </div>
      </Section>

      {/* ── Langues & Intérêts ─────────────────────────── */}
      <div
        style={{
          marginTop: '20px',
          paddingTop: '14px',
          borderTop: '1px solid #E0DDD8',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px',
          fontSize: '12px',
          color: '#555',
        }}
      >
        <div>
          <span style={{ fontWeight: 700, color: '#1A1A1A' }}>Langues : </span>
          Espagnol (natif) · Français (bilingue) · Anglais (bilingue)
        </div>
        <div>
          <span style={{ fontWeight: 700, color: '#1A1A1A' }}>Intérêts : </span>
          Sport · Musique · Jeux Vidéo
        </div>
      </div>
    </div>
  )
}

// ── Sub-components ──────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '18px' }}>
      <h2
        style={{
          fontFamily: 'var(--font-outfit)',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: '#888',
          marginBottom: '10px',
          marginTop: 0,
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  )
}

function Job({
  title,
  company,
  period,
  items,
}: {
  title: string
  company: string
  period: string
  items: string[]
}) {
  return (
    <div style={{ marginBottom: '12px', paddingLeft: '12px', borderLeft: '2px solid #E0DDD8' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '2px',
          marginBottom: '3px',
        }}
      >
        <span style={{ fontWeight: 700, fontSize: '13px', color: '#111' }}>{title}</span>
        <span style={{ fontSize: '11px', color: '#888', whiteSpace: 'nowrap' }}>{period}</span>
      </div>
      <div style={{ fontSize: '12px', color: '#6C63FF', fontWeight: 600, marginBottom: '4px' }}>
        {company}
      </div>
      <ul style={{ margin: 0, paddingLeft: '14px', color: '#444' }}>
        {items.map((item) => (
          <li key={item} style={{ marginBottom: '2px' }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function SkillBlock({
  title,
  items,
  color,
}: {
  title: string
  items: string[]
  color: string
}) {
  return (
    <div
      style={{
        background: '#F0EDE8',
        borderRadius: '6px',
        padding: '10px 12px',
        borderLeft: `3px solid ${color}`,
      }}
    >
      <div
        style={{
          fontWeight: 700,
          fontSize: '11px',
          color,
          marginBottom: '4px',
          textTransform: 'uppercase',
          letterSpacing: '1px',
        }}
      >
        {title}
      </div>
      {items.map((item) => (
        <div key={item} style={{ fontSize: '12px', color: '#444', lineHeight: 1.5 }}>
          {item}
        </div>
      ))}
    </div>
  )
}
