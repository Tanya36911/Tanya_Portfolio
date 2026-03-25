import { useState } from 'react'

export default function NextProjectLink({ nextTitle, nextHref, nextAccent = 'rgba(255,255,255,0.92)' }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={nextHref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        width: '100%',
        textDecoration: 'none',
        background: 'var(--bg-dark)',
        color: '#ffffff',
        borderTop: '0.5px solid rgba(255,255,255,0.07)',
        borderBottom: '0.5px solid rgba(255,255,255,0.07)',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(56px, 9vh, 96px) clamp(32px, 5vw, 80px)' }}>
        <span
          style={{
            display: 'block',
            fontFamily: 'var(--font-body)',
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.42)',
            marginBottom: 18,
          }}
        >
          Next
        </span>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
          <h2
            style={{
              margin: 0,
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(48px, 8vw, 96px)',
              lineHeight: 0.94,
              letterSpacing: '0.01em',
              color: hovered ? nextAccent : 'rgba(255,255,255,0.92)',
              transform: hovered ? 'translateX(12px)' : 'translateX(0)',
              transition: 'transform 0.24s ease, color 0.24s ease',
            }}
          >
            {nextTitle}
          </h2>
          <span
            aria-hidden
            style={{
              flexShrink: 0,
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 5vw, 60px)',
              lineHeight: 1,
              color: hovered ? nextAccent : 'rgba(255,255,255,0.66)',
              transform: hovered ? 'translateX(8px)' : 'translateX(0)',
              transition: 'transform 0.24s ease, color 0.24s ease',
            }}
          >
            →
          </span>
        </div>
      </div>
    </a>
  )
}
