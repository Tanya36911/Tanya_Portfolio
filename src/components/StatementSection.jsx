import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MAIN_TEXT =
  "I'm Tanya — a Creative Technologist and Interaction Designer building systems at the intersection of design, code, and art."

const SUB_TEXT =
  'I design and build interactive systems across web, data, and product — using both code and prototyping to create expressive, functional experiences.'

const EDGE_Y = 0.78

export default function StatementSection() {
  const sectionRef = useRef(null)
  const pathRef    = useRef(null)
  const mainRef    = useRef(null)
  const subRef     = useRef(null)
  const isMobile   = typeof window !== 'undefined' && window.innerWidth <= 640

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Arc animation ────────────────────────────────────────────────────
      if (pathRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start:   'top bottom',
          end:     'top 5%',
          scrub:   1,
          onUpdate(self) {
            const p     = self.progress
            const edgeY = 1 - p * (1 - 0.76)
            const cy    = 1 - p * (1 - 0.04)
            pathRef.current.setAttribute(
              'd',
              `M0,${edgeY} Q0.5,${cy} 1,${edgeY} L1,1 L0,1 Z`
            )
          },
        })
      }

      // ── Main text: clip reveal from bottom (same as case study headlines) ──
      if (mainRef.current) {
        gsap.fromTo(
          mainRef.current,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: 'power3.out',
            scrollTrigger: {
              trigger:  sectionRef.current,
              start:    'top 75%',
              end:      'top 20%',
              scrub:    1.6,
            },
          }
        )
      }

      // ── Subtext: same clip reveal, slightly delayed start ───────────────
      if (subRef.current) {
        gsap.fromTo(
          subRef.current,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start:   'top 65%',
              end:     'top 10%',
              scrub:   1.6,
            },
          }
        )
      }

    }, sectionRef)

    return () => ctx.revert()
  }, [isMobile])

  return (
    <section
      ref={sectionRef}
      style={{
        position:       'relative',
        background:     '#15161b',
        minHeight:      '55vh',
        display:        'flex',
        alignItems:     'flex-start',
        justifyContent: 'center',
        paddingTop:     '6vh',
        overflow:       'visible',
        zIndex:         2,
      }}
    >
      {/* ── Dark arc ─────────────────────────────────────────────────────── */}
      <svg
          aria-hidden="true"
          viewBox="0 0 1 1"
          preserveAspectRatio="none"
          style={{
            position:      'absolute',
            top:           0,
            left:          0,
            width:         '100%',
            height:        'clamp(220px, 50vh, 500px)',
            transform:     'translateY(-100%)',
            pointerEvents: 'none',
          }}
        >
          <path
            ref={pathRef}
            d="M0,1 Q0.5,1 1,1 L1,1 L0,1 Z"
            fill="#15161b"
          />
      </svg>

      {/* ── Text block ───────────────────────────────────────────────────── */}
      <div
        style={{
          position:      'relative',
          zIndex:        4,
          textAlign:     'center',
          maxWidth:      '1100px',
          padding:       '0 40px',
          display:       'flex',
          flexDirection: 'column',
          gap:           '28px',
        }}
      >
        {/* clip-reveal needs overflow:hidden on the wrapper */}
        <div style={{ overflow: 'hidden' }}>
          <p
            ref={mainRef}
            style={{
              fontFamily:    'var(--font-display)',
              fontSize:      'clamp(28px, 3.2vw, 48px)',
              fontWeight:    400,
              lineHeight:    1.1,
              color:         'rgba(255,255,255,0.95)',
              letterSpacing: '0.01em',
              margin:        0,
            }}
          >
            {MAIN_TEXT}
          </p>
        </div>

        <div style={{ overflow: 'hidden' }}>
          <p
            ref={subRef}
            style={{
              fontFamily:    'var(--font-body)',
              fontSize:      'clamp(15px, 1.4vw, 20px)',
              fontWeight:    400,
              lineHeight:    1.25,
              color:         'rgba(255,255,255,0.95)',
              letterSpacing: '-0.02em',
              margin:        0,
            }}
          >
            {SUB_TEXT}
          </p>
        </div>

        <a
          href="/Tanya%20Resume.pdf"
          download="Tanya Resume.pdf"
          className="pill-btn"
          style={{
            fontFamily:      'var(--font-body)',
            fontSize:        11,
            letterSpacing:   '0.15em',
            textTransform:   'uppercase',
            color:           'rgba(255,255,255,0.9)',
            background:      'transparent',
            border:          '1px solid transparent',
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.06), rgba(255,255,255,0.06)), linear-gradient(90deg, rgba(255,255,255,0.25), rgba(255,255,255,0.08), rgba(255,255,255,0.25))',
            backgroundOrigin:'border-box',
            backgroundClip:  'padding-box, border-box',
            backgroundSize:  'auto, 200% auto',
            animation:       'holoShift 5s ease infinite',
            borderRadius:    999,
            padding:         '12px 30px',
            cursor:          'pointer',
            textDecoration:  'none',
            display:         'inline-flex',
            alignItems:      'center',
            gap:             8,
            alignSelf:       'center',
          }}
        >
          ↓ Download Resume
        </a>
      </div>
    </section>
  )
}
