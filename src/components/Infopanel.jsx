import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'

export default function InfoPanel({ project: nextProject, activeIndex }) {
  const [displayedProject, setDisplayedProject] = useState(nextProject)
  const [btnHovered, setBtnHovered] = useState(false)
  const isFirstRender = useRef(true)
  const panelRef = useRef(null)
  const itemsRef = useRef([])
  const tlRef = useRef(null)
  const setItem = (el, i) => { itemsRef.current[i] = el }

  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return }
    const items = itemsRef.current.filter(Boolean)
    if (tlRef.current) tlRef.current.kill()
    const tl = gsap.timeline()
    tlRef.current = tl
    tl.to(items, { opacity: 0, y: 20, duration: 0.35, ease: 'power2.inOut', stagger: 0.03 })
    tl.add(() => setDisplayedProject(nextProject))
    tl.set({}, {}, '+=0.05')
    tl.fromTo(items,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.06 }
    )
  }, [activeIndex])

  const p = displayedProject

  return (
    <div ref={panelRef} style={{
      width: 'min(100%, 440px)', height: '100%', flexShrink: 0,
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: '24px clamp(0px, 2vw, 26px)',
      transformOrigin: 'right bottom',
      willChange: 'transform, opacity',
    }}>
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid transparent',
        backgroundClip: 'padding-box',
        boxShadow: `
          0 0 0 1px var(--border),
          0 28px 80px var(--shadow-card),
          0 0 60px var(--cyan-dim),
          inset 0 0 40px rgba(0, 245, 255, 0.02)
        `,
        borderRadius: 24,
        padding: '34px 34px 30px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background var(--theme-transition) ease, box-shadow var(--theme-transition) ease',
      }}>

        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: 180, height: 180,
          background: 'radial-gradient(circle at 100% 0%, var(--cyan-dim) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0,
          width: 140, height: 140,
          background: 'radial-gradient(circle at 0% 100%, var(--violet-dim) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: 'var(--grad-holo)',
          backgroundSize: '200% auto',
          animation: 'holoShift 4s ease infinite',
          borderRadius: '24px 24px 0 0',
        }} />

        <div ref={el => setItem(el, 0)} style={{
          fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.16em',
          textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 18,
          transition: 'color var(--theme-transition) ease',
        }}>
          Project Info
        </div>

        <h2 ref={el => setItem(el, 1)} style={{
          fontFamily: 'var(--font-display)', fontSize: 52,
          letterSpacing: '0.03em', lineHeight: 0.92, margin: 0, marginBottom: 26,
          background: 'var(--grad-holo)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'holoShift 5s ease infinite',
        }}>
          {p.title}
        </h2>

        <div ref={el => setItem(el, 2)} style={{
          height: 1, width: '100%',
          background: 'var(--grad-holo)',
          backgroundSize: '200% auto',
          animation: 'holoShift 6s ease infinite',
          marginBottom: 24, opacity: 0.4,
        }} />

        <p ref={el => setItem(el, 3)} style={{
          fontFamily: 'var(--font-body)', fontSize: 17, lineHeight: 1.65,
          color: 'var(--text-muted)', fontWeight: 400, margin: 0, marginBottom: 30,
          transition: 'color var(--theme-transition) ease',
        }}>
          {p.description}
        </p>

        <div ref={el => setItem(el, 4)} style={{
          display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 30,
        }}>
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--text-dim)',
            transition: 'color var(--theme-transition) ease',
          }}>Year</span>
          <span style={{
            fontFamily: 'var(--font-display)', fontSize: 34,
            letterSpacing: '0.03em',
            color: 'var(--cyan)',
            transition: 'color var(--theme-transition) ease',
          }}>{p.year}</span>
        </div>

        <div ref={el => setItem(el, 5)} style={{
          display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 44,
        }}>
          {p.tags.map((tag, i) => (
            <span key={tag} style={{
              fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: i % 2 === 0 ? 'var(--cyan)' : 'var(--violet)',
              border: '1px solid transparent',
              background: `linear-gradient(var(--bg-card), var(--bg-card)) padding-box, var(--grad-holo) border-box`,
              backgroundSize: 'auto, 200% auto',
              animation: `holoShift 5s ease ${i * 0.4}s infinite`,
              borderRadius: 4, padding: '5px 12px',
              transition: 'color var(--theme-transition) ease',
            }}>{tag}</span>
          ))}
        </div>

        <div ref={el => setItem(el, 6)} style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <a
            href={p.href ?? '#contact'}
            style={{
              fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.15em',
              textTransform: 'uppercase', color: 'var(--text)',
              background: btnHovered ? 'rgba(0,0,0,0.08)' : 'transparent',
              border: '1px solid transparent',
              backgroundImage: btnHovered
                ? 'none'
                : `linear-gradient(var(--bg-card), var(--bg-card)), var(--grad-holo)`,
              backgroundOrigin: 'border-box',
              backgroundClip: btnHovered ? 'border-box' : 'padding-box, border-box',
              backgroundSize: 'auto, 200% auto',
              animation: btnHovered ? 'none' : 'holoShift 5s ease infinite',
              outline: btnHovered ? '1px solid rgba(0,0,0,0.3)' : '1px solid transparent',
              borderRadius: 999,
              padding: '12px 30px', cursor: 'pointer',
              transition: 'background 0.22s ease, outline-color 0.22s ease, transform 0.18s ease',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              transform: btnHovered ? 'translateY(-2px)' : 'translateY(0)',
            }}
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
          >
            {p.cta ?? 'View Details'}
          </a>
          {p.liveHref ? (
            <a
              href={p.liveHref}
              style={{
              fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.15em',
              textTransform: 'uppercase',
              background: 'var(--grad-holo)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'holoShift 4s ease infinite',
              cursor: 'pointer', padding: 0,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
            }}
            >
              View Live ↗
            </a>
          ) : null}
        </div>
      </div>
    </div>
  )
}
