// CaseStudyHero — shared full-viewport hero section used by all case studies.
//
// Props:
//   heroRef   — ref attached to the <header> (for GSAP scroll triggers in parent)
//   titleRef  — ref attached to the <h1>      (for GSAP entrance in parent)
//   subRef    — ref attached to the <p>        (for GSAP entrance in parent)
//   title     — string displayed as the h1
//   subtitle  — string displayed as the eyebrow p
//   media     — { type: 'video' | 'image' | 'canvas',
//                 src?: string, poster?: string, alt?: string,
//                 component?: ReactNode }
//   gradient  — optional CSS gradient string for the overlay
//               (default: the standard dark-bottom fade used by most case studies)
//   sectionBg — optional background colour for the section while media loads

const DEFAULT_GRADIENT =
  'linear-gradient(180deg, rgba(14,15,20,0.2) 0%, rgba(14,15,20,0.85) 100%)'

export default function CaseStudyHero({
  heroRef,
  titleRef,
  subRef,
  title,
  subtitle,
  media,
  gradient = DEFAULT_GRADIENT,
  sectionBg = 'var(--bg-dark)',
}) {
  return (
    <header
      ref={heroRef}
      style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: sectionBg }}
    >
      {/* ── Background media ── */}
      {media.type === 'video' && (
        <video
          src={media.src}
          poster={media.poster}
          autoPlay muted loop playsInline
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
          }}
        />
      )}
      {media.type === 'image' && (
        <img
          src={media.src}
          alt={media.alt ?? ''}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
          }}
        />
      )}
      {media.type === 'canvas' && media.component}

      {/* ── Gradient overlay ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: gradient,
        pointerEvents: 'none',
      }} />

      {/* ── Title block ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0,
        padding: 'clamp(24px, 5vw, 80px)',
        paddingBottom: 'clamp(40px, 6vh, 80px)',
      }}>
        <h1
          ref={titleRef}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(64px, 12vw, 180px)',
            lineHeight: 0.9, letterSpacing: '0.02em',
            color: '#ffffff', opacity: 0, margin: 0,
          }}
        >
          {title}
        </h1>
        <p
          ref={subRef}
          style={{
            fontFamily: 'var(--font-body)', fontSize: 11,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.62)', margin: '16px 0 0', opacity: 0,
          }}
        >
          {subtitle}
        </p>
      </div>
    </header>
  )
}
