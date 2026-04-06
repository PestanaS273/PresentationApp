export default function CVBack() {
  const skills = [
    'React', 'Vue.js', 'Next.js', 'Node.js', 'Java', 'Spring Boot',
    'Python', 'FastAPI', 'Docker', 'Kubernetes', 'PostgreSQL', 'MySQL',
    'MongoDB', 'Git', 'Jenkins', 'Kafka', 'Terraform', 'TypeScript',
  ]

  return (
    <div
      style={{
        background: 'linear-gradient(160deg, #0a0a12 0%, #050508 50%, #08080f 100%)',
        color: '#EDEDEF',
        minHeight: '600px',
        padding: '52px 44px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'var(--font-inter), system-ui, sans-serif',
      }}
    >
      {/* Background decoration: large faded letters */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-outfit)',
            fontSize: '220px',
            fontWeight: 900,
            color: 'transparent',
            WebkitTextStroke: '1px rgba(108,99,255,0.08)',
            letterSpacing: '-10px',
            userSelect: 'none',
          }}
        >
          SP
        </span>
      </div>

      {/* Top: initials + tagline */}
      <div>
        <div
          style={{
            fontFamily: 'var(--font-outfit)',
            fontSize: '52px',
            fontWeight: 900,
            letterSpacing: '-2px',
            lineHeight: 1,
            marginBottom: '16px',
          }}
        >
          <span
            style={{
              background: 'linear-gradient(135deg, #6C63FF, #00D4FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Sebastian
          </span>
          <br />
          <span style={{ color: 'rgba(255,255,255,0.9)' }}>Pestana</span>
        </div>

        <p
          style={{
            color: '#8A8F98',
            fontSize: '14px',
            maxWidth: '340px',
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          Ingénieur Full Stack & DevOps — je construis des systèmes qui fonctionnent,
          évoluent, et s&apos;intègrent avec l&apos;existant.
        </p>

        {/* Accent line */}
        <div
          style={{
            marginTop: '20px',
            height: '2px',
            width: '60px',
            background: 'linear-gradient(90deg, #6C63FF, #00D4FF)',
            borderRadius: '2px',
          }}
        />
      </div>

      {/* Middle: tech skills grid */}
      <div style={{ marginTop: '40px' }}>
        <p
          style={{
            fontSize: '10px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#555',
            marginBottom: '14px',
            fontWeight: 600,
          }}
        >
          Technologies
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          {skills.map((s, i) => (
            <span
              key={s}
              style={{
                fontSize: '11px',
                padding: '4px 10px',
                borderRadius: '20px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: i % 3 === 0 ? '#6C63FF' : i % 3 === 1 ? '#00D4FF' : '#8A8F98',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom: contact */}
      <div
        style={{
          marginTop: '40px',
          paddingTop: '20px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: '8px',
          fontSize: '12px',
          color: '#555',
        }}
      >
        <span style={{ color: '#8A8F98' }}>spestanam273@gmail.com</span>
        <span style={{ color: '#8A8F98' }}>Paris, France</span>
        <span
          style={{
            background: 'linear-gradient(90deg, #6C63FF, #00D4FF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 700,
            fontFamily: 'var(--font-outfit)',
          }}
        >
          pestana.dev
        </span>
      </div>
    </div>
  )
}
