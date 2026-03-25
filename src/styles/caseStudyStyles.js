// Shared style constants used across all case study pages.

export const eyebrowStyle = {
  fontFamily: 'var(--font-body)',
  fontSize: 11,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'var(--text-dim)',
  display: 'block',
}

export const bodyStyle = {
  fontFamily: 'var(--font-body)',
  fontSize: 'clamp(15px, 1.3vw, 18px)',
  lineHeight: 1.8,
  color: 'var(--text-muted)',
  margin: 0,
}

export const smallBodyStyle = {
  fontFamily: 'var(--font-body)',
  fontSize: 13,
  lineHeight: 1.7,
  color: 'var(--text-dim)',
  margin: 0,
}

export const pillStyle = {
  fontFamily: 'var(--font-body)',
  fontSize: 11,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.86)',
  textDecoration: 'none',
  border: '1px solid rgba(255,255,255,0.3)',
  borderRadius: 999,
  padding: '12px 24px',
  backdropFilter: 'blur(10px)',
  background: 'rgba(10,10,20,0.65)',
  display: 'inline-block',
  transition: 'background 0.2s ease',
}

export const backLinkStyle = {
  position: 'fixed', top: 32, left: 32, zIndex: 100,
  fontFamily: 'var(--font-body)', fontSize: 11,
  letterSpacing: '0.16em', textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.86)', textDecoration: 'none',
  border: '1px solid rgba(255,255,255,0.3)', borderRadius: 999,
  padding: '10px 18px',
  backdropFilter: 'blur(10px)',
  background: 'rgba(10,10,20,0.65)',
}
