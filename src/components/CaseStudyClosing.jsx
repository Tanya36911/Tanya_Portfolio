import { pillStyle } from '../styles/caseStudyStyles'

export default function CaseStudyClosing({ statements, links, lineRefs, sectionRef }) {
  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--bg-darker)',
        borderTop: '0.5px solid rgba(255,255,255,0.07)',
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(64px, 10vh, 80px) clamp(32px, 5vw, 80px)' }}>
        {statements.map((line, i) => (
          <div
            key={line}
            style={{
              paddingTop: i === 0 ? 0 : 32,
              paddingBottom: 32,
              borderBottom: i < statements.length - 1 ? '0.5px solid rgba(255,255,255,0.07)' : 'none',
              overflow: 'hidden',
            }}
          >
            <h2
              ref={(el) => { lineRefs.current[i] = el }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px, 5vw, 68px)',
                color: 'rgba(255,255,255,0.85)',
                lineHeight: 0.92,
                letterSpacing: '0.01em',
                margin: 0,
              }}
            >
              {line}
            </h2>
          </div>
        ))}

        <div style={{ marginTop: 56, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {links.map(({ label, href, external }) => (
            <a
              key={href + label}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              style={pillStyle}
              className="pill-btn"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
