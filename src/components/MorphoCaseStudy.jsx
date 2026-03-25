import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { eyebrowStyle, bodyStyle, smallBodyStyle, backLinkStyle } from '../styles/caseStudyStyles'
import CaseStudyHero from './CaseStudyHero'
import CaseStudyClosing from './CaseStudyClosing'
import NextProjectLink from './NextProjectLink'
import ProjectMeta from './ProjectMeta'

gsap.registerPlugin(ScrollTrigger)

// =============================================================================
// MEDIA — all files in public/images/morpho/
// =============================================================================
const MEDIA = {
  appHero:     '/images/morpho/app_hero.jpg',
  pattern1:    '/videos/MorphoProject/reaction diffusion field.png',
  crochetGrid: '/videos/MorphoProject/crochet grid.png',
  yarnPalette: '/videos/MorphoProject/colour pallete.png',
  appSliders:  '/videos/MorphoProject/app sliders.png',
}
// =============================================================================


export default function MorphoCaseStudy() {
  const pageRef = useRef(null)
  const [loaded, setLoaded]       = useState(false)
  const [isCompact, setIsCompact] = useState(false)

  const backLinkRef  = useRef(null)
  const heroRef      = useRef(null)
  const heroTitleRef = useRef(null)
  const heroSubRef   = useRef(null)
  const metaRef      = useRef(null)

  // S2 — The Question
  const s2Ref      = useRef(null)
  const s2LeftRefs = useRef([])
  const s2RightRefs = useRef([])

  // S3 — The Science
  const s3Ref       = useRef(null)
  const s3EyebrowRef = useRef(null)
  const s3HeadRef   = useRef(null)
  const s3BodyRefs  = useRef([])

  // S4 — The App
  const s4Ref      = useRef(null)
  const s4ImgRef   = useRef(null)
  const s4RightRefs = useRef([])

  // S5 — The Output
  const s5Ref      = useRef(null)
  const s5TopRefs  = useRef([])
  const s5GridRefs = useRef([])
  const s5BodyRefs = useRef([])

  // S6 — Try It
  const s6Ref     = useRef(null)
  const s6EleRefs = useRef([])

  // S7 — Future Scope
  const s7Ref      = useRef(null)
  const s7LeftRefs = useRef([])
  const s7RightRefs = useRef([])

  // Nature patterns (between S2 and S3)
  const natRef     = useRef(null)
  const natEleRefs = useRef([])

  // S3 callout
  const s3CalloutRef = useRef(null)

  // S8 — Closing Statements
  const s8Ref      = useRef(null)
  const s8LineRefs = useRef([])

  // ── mobile breakpoint ──────────────────────────────────────────────────────
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    const onChange = (e) => setIsCompact(e.matches)
    setIsCompact(mq.matches)
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', onChange)
      return () => mq.removeEventListener('change', onChange)
    }
    mq.addListener(onChange)
    return () => mq.removeListener(onChange)
  }, [])

  // ── loaded flag ────────────────────────────────────────────────────────────
  useEffect(() => { setLoaded(true) }, [])

  // ── hero entrance ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!loaded) return
    gsap.fromTo(
      heroTitleRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 0.96, duration: 1.2, ease: 'power3.out', delay: 0.3 }
    )
    gsap.fromTo(
      heroSubRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.6 }
    )

    gsap.fromTo(
      metaRef.current,
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: metaRef.current, start: 'top 85%' },
      }
    )
  }, [loaded])

  // ── scroll animations ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!pageRef.current) return

    const ctx = gsap.context(() => {

      // Back link fades as hero scrolls out
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          if (backLinkRef.current) {
            gsap.set(backLinkRef.current, { opacity: 1 - self.progress * 0.35 })
          }
        },
      })

      // S2: left column (eyebrow + headline clip reveal)
      gsap.fromTo(
        s2LeftRefs.current.filter(Boolean),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.12,
          scrollTrigger: { trigger: s2Ref.current, start: 'top 75%' } }
      )
      // S2: headline clip reveal
      const headEl = s2Ref.current?.querySelector('[data-clip-head]')
      if (headEl) {
        gsap.fromTo(
          headEl,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power3.out',
            scrollTrigger: { trigger: s2Ref.current, start: 'top 70%', end: 'top 20%', scrub: 1.6 } }
        )
      }
      // S2: right column stagger
      gsap.fromTo(
        s2RightRefs.current.filter(Boolean),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.12,
          scrollTrigger: { trigger: s2Ref.current, start: 'top 70%' } }
      )

      // Nature patterns section
      gsap.fromTo(
        natEleRefs.current.filter(Boolean),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.12,
          scrollTrigger: { trigger: natRef.current, start: 'top 80%' } }
      )

      // S3: callout block
      gsap.fromTo(
        s3CalloutRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: s3CalloutRef.current, start: 'top 85%' } }
      )

      // S3: eyebrow
      gsap.fromTo(
        s3EyebrowRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: s3Ref.current, start: 'top 80%' } }
      )
      // S3: headline clip reveal
      gsap.fromTo(
        s3HeadRef.current,
        { clipPath: 'inset(0% 0% 100% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power3.out',
          scrollTrigger: { trigger: s3Ref.current, start: 'top 70%', end: 'top 20%', scrub: 1.6 } }
      )
      // S3: body rows stagger
      const s3Els = s3BodyRefs.current.filter(Boolean)
      gsap.fromTo(s3Els, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.1,
        scrollTrigger: { trigger: s3Ref.current, start: 'top 60%' },
      })

      // S4: left image clips in from right
      gsap.fromTo(
        s4ImgRef.current,
        { clipPath: 'inset(0% 100% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power3.out',
          scrollTrigger: { trigger: s4Ref.current, start: 'top 75%', end: 'top 20%', scrub: 1.6 } }
      )
      // S4: right column stagger
      const s4Els = s4RightRefs.current.filter(Boolean)
      gsap.fromTo(s4Els, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.12,
        scrollTrigger: { trigger: s4Ref.current, start: 'top 70%' },
      })

      // S5: top eyebrow + headline stagger
      gsap.fromTo(
        s5TopRefs.current.filter(Boolean),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.12,
          scrollTrigger: { trigger: s5Ref.current, start: 'top 80%' } }
      )
      // S5: grid columns stagger
      const s5GridEls = s5GridRefs.current.filter(Boolean)
      gsap.fromTo(s5GridEls, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.1,
        scrollTrigger: { trigger: s5Ref.current, start: 'top 65%' },
      })
      // S5: body rows stagger
      const s5BodyEls = s5BodyRefs.current.filter(Boolean)
      gsap.fromTo(s5BodyEls, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.1,
        scrollTrigger: { trigger: s5Ref.current, start: 'top 50%' },
      })

      // S6: all elements stagger
      gsap.fromTo(
        s6EleRefs.current.filter(Boolean),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.12,
          scrollTrigger: { trigger: s6Ref.current, start: 'top 75%' } }
      )

      // S7: left column stagger
      gsap.fromTo(
        s7LeftRefs.current.filter(Boolean),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.12,
          scrollTrigger: { trigger: s7Ref.current, start: 'top 75%' } }
      )
      // S7: right rows stagger
      const s7RightEls = s7RightRefs.current.filter(Boolean)
      gsap.fromTo(s7RightEls, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.1,
        scrollTrigger: { trigger: s7Ref.current, start: 'top 70%' },
      })

      // S8: statement lines clip reveal
      s8LineRefs.current.filter(Boolean).forEach((el, i) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power3.out',
            delay: i * 0.18,
            scrollTrigger: { trigger: s8Ref.current, start: 'top 75%' } }
        )
      })

    }, pageRef)

    return () => ctx.revert()
  }, [isCompact])

  // ── ref setter helpers ─────────────────────────────────────────────────────
  const setNatEle  = (i) => (el) => { natEleRefs.current[i]  = el }
  const setS2Left  = (i) => (el) => { s2LeftRefs.current[i]  = el }
  const setS2Right = (i) => (el) => { s2RightRefs.current[i] = el }
  const setS3Body  = (i) => (el) => { s3BodyRefs.current[i]  = el }
  const setS4Right = (i) => (el) => { s4RightRefs.current[i] = el }
  const setS5Top   = (i) => (el) => { s5TopRefs.current[i]   = el }
  const setS5Grid  = (i) => (el) => { s5GridRefs.current[i]  = el }
  const setS5Body  = (i) => (el) => { s5BodyRefs.current[i]  = el }
  const setS6Ele   = (i) => (el) => { s6EleRefs.current[i]   = el }
  const setS7Left  = (i) => (el) => { s7LeftRefs.current[i]  = el }
  const setS7Right = (i) => (el) => { s7RightRefs.current[i] = el }
  const setS8Line  = (i) => (el) => { s8LineRefs.current[i]  = el }

  return (
    <main
      ref={pageRef}
      style={{ background: 'var(--bg)', color: 'var(--text)', overflowX: 'hidden' }}
    >

      {/* Back link */}
      <a
        ref={backLinkRef}
        href="/#work"
        aria-label="Back to all projects"
        style={backLinkStyle}
      >
        ← Work
      </a>

      {/* ── S1: Hero ──────────────────────────────────────────────────────── */}
      <CaseStudyHero
        heroRef={heroRef}
        titleRef={heroTitleRef}
        subRef={heroSubRef}
        title="Morpho"
        subtitle="Biology · Computation · Craft"
        media={{ type: 'canvas', component: <RDCanvas /> }}
      />

      <ProjectMeta
        sectionRef={metaRef}
        role="Concept, Development, Simulation Design"
        team={null}
        timeline="10 days"
        tools={['Python', 'NumPy', 'Streamlit']}
        context="Independent project"
        status="Live"
      />

      {/* ── S2: The Question ──────────────────────────────────────────────── */}
      <section
        ref={s2Ref}
        style={{
          background: 'var(--bg-warm)',
          padding: 'clamp(64px, 10vh, 80px) clamp(32px, 5vw, 80px)',
        }}
      >
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          display: isCompact ? 'block' : 'grid',
          gridTemplateColumns: isCompact ? undefined : '1fr 1fr',
          gap: isCompact ? undefined : 'clamp(40px, 6vw, 96px)',
          alignItems: 'start',
        }}>

          {/* Left column */}
          <div>
            <span
              ref={setS2Left(0)}
              style={{ ...eyebrowStyle, color: 'rgba(16,12,28,0.55)', marginBottom: 24, opacity: 0 }}
            >
              The Idea
            </span>
            {/* Headline with clipPath reveal wrapper */}
            <div style={{ overflow: 'hidden', marginBottom: 0 }}>
              <h2
                data-clip-head
                ref={setS2Left(1)}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(40px, 6.5vw, 88px)',
                  color: '#100c1c',
                  lineHeight: 0.92, letterSpacing: '0.01em',
                  margin: 0,
                }}
              >
                What if your personality had a texture?
              </h2>
            </div>
          </div>

          {/* Right column */}
          <div style={{ paddingTop: isCompact ? 40 : 0 }}>
            <p
              ref={setS2Right(0)}
              style={{ ...bodyStyle, color: 'rgba(16,12,28,0.6)', opacity: 0 }}
            >
              Alan Turing's 1952 paper on morphogenesis described how simple chemical reactions
              produce complex natural patterns — leopard spots, zebra stripes, coral formations.
              Morpho applies those same equations to human personality. You take a short MBTI-style
              test. The simulation runs. The output is a pattern only your type could produce —
              and you can crochet it with your hands.
            </p>

            {/* Thin rule */}
            <div
              ref={setS2Right(1)}
              style={{
                borderTop: '0.5px solid rgba(16,12,28,0.1)',
                marginTop: 40, paddingTop: 32,
                opacity: 0,
              }}
            />

            {/* Three inline stats */}
            <div
              ref={setS2Right(2)}
              style={{
                display: 'flex', flexWrap: 'wrap', gap: isCompact ? '24px 32px' : 0,
                opacity: 0,
              }}
            >
              {[
                { value: 'MBTI',               label: 'personality framework' },
                { value: 'Reaction-Diffusion', label: 'simulation method'    },
                { value: '60×60',              label: 'crochet grid output'   },
              ].map(({ value, label }, i) => (
                <div
                  key={label}
                  style={{
                    flex: isCompact ? '0 0 auto' : 1,
                    paddingTop: 0, paddingBottom: 0,
                    paddingLeft: isCompact ? 0 : i > 0 ? 20 : 0,
                    paddingRight: isCompact ? 0 : i < 2 ? 20 : 0,
                    borderRight: isCompact ? 'none' : i < 2 ? '0.5px solid rgba(16,12,28,0.1)' : 'none',
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(18px, 2vw, 28px)',
                    color: '#100c1c', lineHeight: 0.9,
                    display: 'block', letterSpacing: '0.01em',
                  }}>
                    {value}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: 'rgba(16,12,28,0.55)',
                    display: 'block', marginTop: 8,
                  }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── Nature patterns (between S2 and S3) ──────────────────────────── */}
      {/* Replace with actual nature photography showing reaction-diffusion patterns. */}
      <section
        ref={natRef}
        style={{
          background: 'var(--bg-dark)',
          borderTop: '0.5px solid rgba(255,255,255,0.07)',
        }}
      >
        {/* Text header with side padding */}
        <div style={{ padding: 'clamp(48px, 6vh, 64px) clamp(32px, 5vw, 80px) 0' }}>
          <span
            ref={setNatEle(0)}
            style={{ ...eyebrowStyle, color: 'rgba(255,255,255,0.58)', marginBottom: 20, opacity: 0 }}
          >
            Patterns in nature
          </span>
          <h2
            ref={setNatEle(1)}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 4vw, 56px)',
              color: 'rgba(255,255,255,0.88)',
              lineHeight: 0.92, letterSpacing: '0.01em',
              margin: 0, maxWidth: '22ch', opacity: 0,
            }}
          >
            Turing predicted these in 1952. Nature had been running them for millions of years.
          </h2>
        </div>

        {/* Full-bleed horizontal scroll strip */}
        <div
          ref={setNatEle(2)}
          style={{
            marginTop: 40,
            display: 'flex', gap: 4, flexWrap: 'nowrap',
            overflowX: 'auto', scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
            opacity: 0,
          }}
        >
          {[
              { src: '/videos/MorphoProject/leapord.jpeg',        caption: 'Leopard spots'    },
              { src: '/videos/MorphoProject/zebra.png.webp',      caption: 'Zebra stripes'    },
              { src: '/videos/MorphoProject/coralformation.webp', caption: 'Coral formation'  },
              { src: '/videos/MorphoProject/seashell.jpeg',       caption: 'Seashell pattern' },
            ].map(({ src, caption }) => (
              <div key={caption} style={{ flexShrink: 0 }}>
                <div style={{
                  width: 'clamp(280px, 28vw, 400px)',
                  height: 'clamp(220px, 22vw, 320px)',
                  overflow: 'hidden',
                  borderRadius: 0,
                }}>
                  <img
                    src={src}
                    alt={caption}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.50)',
                  display: 'block', marginTop: 10, paddingLeft: 4,
                }}>
                  {caption}
                </span>
              </div>
            ))}
        </div>
      </section>

      {/* ── S3: The Science ───────────────────────────────────────────────── */}
      <section
        ref={s3Ref}
        style={{
          background: 'var(--bg-dark)',
          borderTop: '0.5px solid rgba(255,255,255,0.07)',
          padding: 'clamp(64px, 10vh, 80px) clamp(32px, 5vw, 80px)',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <span
            ref={s3EyebrowRef}
            style={{ ...eyebrowStyle, color: 'rgba(255,255,255,0.58)', marginBottom: 24, opacity: 0 }}
          >
            Turing's Morphogenesis
          </span>

          {/* Headline — clip reveal */}
          <div style={{ overflow: 'hidden', marginBottom: 48 }}>
            <h2
              ref={s3HeadRef}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px, 5vw, 72px)',
                color: 'rgba(255,255,255,0.88)',
                lineHeight: 0.92, letterSpacing: '0.01em',
                margin: 0,
              }}
            >
              Two chemicals. Infinite patterns.
            </h2>
          </div>

          {/* Two columns */}
          <div style={{
            display: isCompact ? 'block' : 'grid',
            gridTemplateColumns: isCompact ? undefined : '1fr 1fr',
            gap: isCompact ? undefined : 'clamp(40px, 6vw, 96px)',
            alignItems: 'start',
          }}>
            {/* Left: prose */}
            <p
              ref={setS3Body(0)}
              style={{ ...bodyStyle, color: 'rgba(255,255,255,0.6)', opacity: 0 }}
            >
              An activator chemical self-amplifies and spreads. An inhibitor spreads faster and
              suppresses it. Their competition, repeated across thousands of iterations, produces
              stable non-uniform patterns — the same mathematics behind every spot and stripe in
              nature. Morpho uses these equations as a translation layer between who you are and
              what you make.
            </p>

            {/* Right: trait mapping rows */}
            <div style={{ paddingTop: isCompact ? 40 : 0 }}>
              {[
                { label: 'Openness →',     value: 'Feed rate F'      },
                { label: 'Stability →',    value: 'Kill rate k'      },
                { label: 'Empathy →',      value: 'Diffusion A'      },
                { label: 'Spontaneity →',  value: 'Noise amplitude'  },
              ].map(({ label, value }, i) => (
                <div
                  key={label}
                  ref={setS3Body(i + 1)}
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                    padding: '16px 0',
                    borderTop: '0.5px solid rgba(255,255,255,0.07)',
                    borderBottom: i === 3 ? '0.5px solid rgba(255,255,255,0.07)' : 'none',
                    opacity: 0,
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.55)',
                  }}>
                    {label}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(18px, 2vw, 28px)',
                    color: 'rgba(255,255,255,0.88)',
                    letterSpacing: '0.01em',
                  }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* Uniqueness callout — spans both columns */}
          <div
            ref={s3CalloutRef}
            style={{
              gridColumn: isCompact ? undefined : '1 / -1',
              marginTop: 48,
              padding: 40,
              background: 'rgba(255,255,255,0.04)',
              border: '0.5px solid rgba(255,255,255,0.08)',
              borderRadius: 4,
              opacity: 0,
            }}
          >
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(64px, 9vw, 120px)',
              color: 'rgba(255,255,255,0.08)',
              lineHeight: 1, display: 'block',
            }} aria-hidden="true">
              ∞
            </span>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(24px, 3vw, 40px)',
              color: 'rgba(255,255,255,0.88)',
              lineHeight: 0.92, letterSpacing: '0.01em',
              margin: 0, marginTop: -20,
            }}>
              Same type. Different pattern. Every time.
            </h3>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(14px, 1.2vw, 16px)',
              lineHeight: 1.8, color: 'rgba(255,255,255,0.5)',
              margin: 0, marginTop: 16, maxWidth: 640,
            }}>
              The simulation uses Perlin noise as its initial seed — a randomness layer that means
              even two people with identical MBTI types will never produce the same pattern. Your
              Openness might be the same as someone else's, but your pattern will never be. The
              noise ensures it.
            </p>
          </div>

        </div>
      </section>

      {/* ── S4: The App ───────────────────────────────────────────────────── */}
      <section
        ref={s4Ref}
        style={{
          background: 'var(--bg-darker)',
          display: isCompact ? 'block' : 'grid',
          gridTemplateColumns: isCompact ? undefined : '1fr 1fr',
          minHeight: isCompact ? 'auto' : '80vh',
        }}
      >
        {/* Left: image */}
        <div
          ref={s4ImgRef}
          style={{ position: 'relative', overflow: 'hidden', minHeight: isCompact ? '60vw' : 0, background: '#0a0b10' }}
        >
          <img
            src={MEDIA.appSliders}
            alt="App sliders"
            style={{
              width: '100%', height: '100%',
              objectFit: 'contain', objectPosition: 'center',
              display: 'block',
              position: isCompact ? 'static' : 'absolute', inset: 0,
            }}
          />
        </div>

        {/* Right: text */}
        <div style={{
          background: 'var(--bg-dark)',
          padding: 'clamp(48px, 6vw, 88px)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          borderLeft: isCompact ? 'none' : '0.5px solid rgba(255,255,255,0.06)',
        }}>
          <span
            ref={setS4Right(0)}
            style={{ ...eyebrowStyle, color: 'rgba(255,255,255,0.58)', marginBottom: 20, opacity: 0 }}
          >
            The Interface
          </span>

          {/* MBTI → Turing parameter comparison */}
          <div
            ref={setS4Right(1)}
            style={{ marginBottom: 32, opacity: 0 }}
          >
            {[
              { axis: 'E — I', fill: '34%', param: 'Feed rate F'  },
              { axis: 'S — N', fill: '68%', param: 'Kill rate k'  },
              { axis: 'T — F', fill: '55%', param: 'Diffusion A'  },
              { axis: 'J — P', fill: '42%', param: 'Noise amp'    },
            ].map(({ axis, fill, param }) => (
              <div
                key={axis}
                style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}
              >
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.50)',
                  width: 140, flexShrink: 0,
                }}>
                  {axis}
                </span>
                <div style={{
                  flex: 1, height: 2,
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: 1, position: 'relative',
                }}>
                  <div style={{
                    position: 'absolute', left: 0, top: 0,
                    width: fill, height: '100%',
                    background: 'rgba(255,255,255,0.4)',
                    borderRadius: 1,
                  }} />
                  <div style={{
                    position: 'absolute',
                    top: '50%', transform: 'translateY(-50%)',
                    left: `calc(${fill} - 4px)`,
                    width: 8, height: 8,
                    borderRadius: '50%',
                    background: '#ffffff',
                  }} />
                </div>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.60)',
                  width: 110, flexShrink: 0, textAlign: 'right',
                }}>
                  {param}
                </span>
              </div>
            ))}
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 10, letterSpacing: '0.06em',
              color: 'rgba(255,255,255,0.25)',
              margin: '8px 0 0',
            }}>
              The sliders in the app mirror these axes directly.
            </p>
          </div>

          <h2
            ref={setS4Right(2)}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 4vw, 56px)',
              color: '#ffffff', lineHeight: 0.92,
              margin: '0 0 24px', letterSpacing: '0.01em', opacity: 0,
            }}
          >
            Take the test. Tune the field.
          </h2>
          <p
            ref={setS4Right(3)}
            style={{ ...bodyStyle, color: 'rgba(255,255,255,0.6)', opacity: 0 }}
          >
            Five sliders, each corresponding to an MBTI axis. Move the Extraversion slider and
            the feed rate shifts — the pattern branches more aggressively. Move Stability and the
            kill rate changes — forms become denser or dissolve. The simulation runs 4000 steps
            and yields a final field that belongs to your type and no other.
          </p>

          {/* Tech tags */}
          <div
            ref={setS4Right(4)}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 32, opacity: 0 }}
          >
            {['Python', 'NumPy', 'Streamlit'].map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.55)',
                  border: '0.5px solid rgba(255,255,255,0.2)',
                  borderRadius: 999, padding: '5px 14px',
                  display: 'inline-block',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── S5: The Output ────────────────────────────────────────────────── */}
      <section
        ref={s5Ref}
        style={{
          background: 'var(--bg-warm)',
          padding: 'clamp(64px, 10vh, 80px) clamp(32px, 5vw, 80px)',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          <span
            ref={setS5Top(0)}
            style={{ ...eyebrowStyle, color: 'rgba(16,12,28,0.55)', marginBottom: 24, opacity: 0 }}
          >
            What it produces
          </span>
          <h2
            ref={setS5Top(1)}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 5vw, 68px)',
              color: '#100c1c', lineHeight: 0.92,
              margin: '0 0 48px', letterSpacing: '0.01em', opacity: 0,
            }}
          >
            A pattern. A grid. A palette.
          </h2>

          {/* Three-column image grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isCompact ? '1fr' : '1fr 1fr 1fr',
            gap: 8,
            marginBottom: 64,
          }}>
            {[
              { src: MEDIA.pattern1,    caption: 'Reaction-diffusion field', ref: setS5Grid(0) },
              { src: MEDIA.crochetGrid, caption: '60×60 crochet grid',       ref: setS5Grid(1) },
              { src: MEDIA.yarnPalette, caption: 'Generated yarn palette',   ref: setS5Grid(2) },
            ].map(({ src, caption, ref }) => (
              <div key={caption} ref={ref} style={{ opacity: 0 }}>
                <div style={{ borderRadius: 6, overflow: 'hidden', aspectRatio: '1/1', background: '#e0ddd5' }}>
                  <img
                    src={src}
                    alt={caption}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: 'rgba(16,12,28,0.50)',
                  display: 'block', marginTop: 10,
                }}>
                  {caption}
                </span>
              </div>
            ))}
          </div>

          {/* Two-column text below grid */}
          <div style={{
            display: isCompact ? 'block' : 'grid',
            gridTemplateColumns: isCompact ? undefined : '1fr 1fr',
            gap: isCompact ? undefined : 'clamp(40px, 6vw, 96px)',
            alignItems: 'start',
          }}>
            <p
              ref={setS5Body(0)}
              style={{ ...bodyStyle, color: 'rgba(16,12,28,0.6)', opacity: 0 }}
            >
              The continuous morphogen field is quantized into a finite pixel grid. Each pixel
              becomes a stitch. Each value maps to a yarn colour from a curated palette. The output
              is a CSV you can follow row by row to make something real.
            </p>

            <div style={{ paddingTop: isCompact ? 40 : 0 }}>
              {[
                { label: 'Pattern PNG',  desc: 'Full resolution smooth surface, downloadable.'                     },
                { label: 'Crochet Grid', desc: '60×60 pixel grid, one cell per stitch, colour-coded.'              },
                { label: 'Stitch CSV',   desc: 'Hex colour per stitch exported row by row for easy following.'      },
              ].map(({ label, desc }, i) => (
                <div
                  key={label}
                  ref={setS5Body(i + 1)}
                  style={{
                    paddingTop: i === 0 ? 0 : 20,
                    paddingBottom: 20,
                    borderTop: i === 0 ? '0.5px solid rgba(16,12,28,0.1)' : 'none',
                    borderBottom: '0.5px solid rgba(16,12,28,0.1)',
                    opacity: 0,
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: '#100c1c', fontWeight: 600,
                    display: 'block', marginBottom: 6,
                  }}>
                    {label}
                  </span>
                  <p style={{ ...smallBodyStyle, color: 'rgba(16,12,28,0.6)' }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── S6: Try It ────────────────────────────────────────────────────── */}
      <section
        ref={s6Ref}
        style={{
          background: 'var(--bg-dark)',
          borderTop: '0.5px solid rgba(255,255,255,0.07)',
          padding: 'clamp(64px, 10vh, 80px) clamp(32px, 5vw, 80px)',
        }}
      >
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>

          <span
            ref={setS6Ele(0)}
            style={{ ...eyebrowStyle, color: 'rgba(255,255,255,0.58)', marginBottom: 24, opacity: 0 }}
          >
            Live experiment
          </span>

          <h2
            ref={setS6Ele(1)}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(48px, 7vw, 96px)',
              color: 'rgba(255,255,255,0.9)', lineHeight: 0.88,
              margin: '0 0 32px', letterSpacing: '0.01em', opacity: 0,
            }}
          >
            Your personality. Your pattern.
          </h2>

          <p
            ref={setS6Ele(2)}
            style={{ ...bodyStyle, color: 'rgba(255,255,255,0.5)', marginBottom: 48, opacity: 0 }}
          >
            Answer five questions mapped to MBTI axes. Choose a yarn palette. Generate a pattern
            that belongs only to your type. The simulation takes about 30 seconds to run and
            outputs a pattern you can actually make.
          </p>

          <S6Link elRef={setS6Ele(3)} />

          <p
            ref={setS6Ele(4)}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.2)',
              marginTop: 24, opacity: 0,
            }}
          >
            Python · NumPy · Streamlit · Reaction-Diffusion Simulation · MBTI Framework
          </p>

        </div>
      </section>

      {/* ── S7: Future Scope ──────────────────────────────────────────────── */}
      <section
        ref={s7Ref}
        style={{
          background: 'var(--bg-warm)',
          borderTop: '0.5px solid rgba(16,12,28,0.08)',
          padding: 'clamp(64px, 10vh, 80px) clamp(32px, 5vw, 80px)',
        }}
      >
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          display: isCompact ? 'block' : 'grid',
          gridTemplateColumns: isCompact ? undefined : '1fr 1fr',
          gap: isCompact ? undefined : 'clamp(40px, 6vw, 96px)',
          alignItems: 'start',
        }}>

          {/* Left column */}
          <div>
            <span
              ref={setS7Left(0)}
              style={{ ...eyebrowStyle, color: 'rgba(16,12,28,0.55)', marginBottom: 24, opacity: 0 }}
            >
              What comes next
            </span>
            <h2
              ref={setS7Left(1)}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(40px, 6vw, 80px)',
                color: '#100c1c', lineHeight: 0.92,
                margin: 0, letterSpacing: '0.01em', opacity: 0,
              }}
            >
              Wear your personality.
            </h2>
            <p
              ref={setS7Left(2)}
              style={{ ...bodyStyle, color: 'rgba(16,12,28,0.6)', marginTop: 24, opacity: 0 }}
            >
              The stitch CSV Morpho outputs is a real crochet pattern. The next step is wearable —
              beanies, tote bags, sweater panels where the surface texture is generated from your
              MBTI type rather than designed by a human. Every piece would be unrepeatable. Your
              type has never been crocheted the same way twice.
            </p>
          </div>

          {/* Right column: three stacked potential items */}
          <div style={{ paddingTop: isCompact ? 48 : 0 }}>
            {[
              { num: '01', value: 'Personalised beanies and tote bags'              },
              { num: '02', value: 'Sweater panels from personality data'             },
              { num: '03', value: 'Unrepeatable textiles from psychological profiles' },
            ].map(({ num, value }, i) => (
              <div
                key={num}
                ref={setS7Right(i)}
                style={{
                  borderBottom: '0.5px solid rgba(16,12,28,0.08)',
                  padding: '20px 0',
                  opacity: 0,
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
                  color: 'rgba(16,12,28,0.45)',
                  display: 'block', marginBottom: 8,
                }}>
                  {num}
                </span>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(22px, 3vw, 36px)',
                  color: '#100c1c', lineHeight: 0.92,
                  letterSpacing: '0.01em',
                }}>
                  {value}
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* Beanie + bag image strip */}
        <div style={{ maxWidth: 1100, margin: '48px auto 0' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isCompact ? '1fr' : '1fr 1fr',
            gap: 8,
          }}>
            {[
              { src: '/videos/MorphoProject/beanie.png', caption: 'Personalised beanie' },
              { src: '/videos/MorphoProject/bag.png',    caption: 'Crochet tote bag'     },
            ].map(({ src, caption }, i) => (
              <div key={caption} ref={setS7Right(4 + i)} style={{ opacity: 0 }}>
                <div style={{ borderRadius: 6, overflow: 'hidden', aspectRatio: '4/3', background: '#e0ddd5' }}>
                  <img src={src} alt={caption}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: 'rgba(16,12,28,0.50)',
                  display: 'block', marginTop: 10,
                }}>
                  {caption}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Full-width closing note */}
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ borderTop: '0.5px solid rgba(16,12,28,0.1)', marginTop: 48 }} />
          <p
            ref={setS7Right(3)}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14, lineHeight: 1.8, fontStyle: 'italic',
              color: 'rgba(16,12,28,0.55)',
              marginTop: 32, maxWidth: 680, opacity: 0,
            }}
          >
            Whether or not MBTI is scientifically valid, the pattern it generates through Turing's
            equations is mathematically unique. The pseudoscience becomes the seed. The simulation
            makes it real.
          </p>
        </div>
      </section>

      <NextProjectLink
        nextTitle="Urushya"
        nextHref="/work/urushya"
        nextAccent="#f0d8a6"
      />

      {/* ── S8: Closing Statements ────────────────────────────────────────── */}
      <CaseStudyClosing
        sectionRef={s8Ref}
        lineRefs={s8LineRefs}
        statements={[
          'Identity as emergence.',
          'Data as texture.',
          'Code as craft.',
        ]}
        links={[
          { label: '← All work', href: '/#work' },
          { label: 'Try the experiment →', href: 'https://morpho.streamlit.app', external: true },
        ]}
      />

    </main>
  )
}

// ── S6 link — extracted to avoid inline ref + state on the same element ──────
function S6Link({ elRef }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      ref={elRef}
      href="https://morpho.streamlit.app"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-block',
        fontFamily: 'var(--font-body)', fontSize: 12,
        letterSpacing: '0.2em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.9)', textDecoration: 'none',
        border: '1px solid rgba(255,255,255,0.4)', borderRadius: 2,
        padding: '18px 48px',
        background: hovered ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)',
        borderColor: hovered ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.4)',
        transition: 'all 0.2s ease',
        opacity: 0,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      Try it at morpho.streamlit.app →
    </a>
  )
}

// ── Reaction-diffusion canvas — hero background ───────────────────────────────
function RDCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    const gridWidth  = 150
    const gridHeight = 100
    canvas.width  = gridWidth
    canvas.height = gridHeight

    const dA   = 1.0
    const dB   = 0.5
    const feed = 0.055
    const kill = 0.062

    // Flat typed arrays — much faster than arrays of objects
    const aGrid  = new Float32Array(gridWidth * gridHeight).fill(1)
    const bGrid  = new Float32Array(gridWidth * gridHeight).fill(0)
    const aNext  = new Float32Array(gridWidth * gridHeight)
    const bNext  = new Float32Array(gridWidth * gridHeight)

    const idx = (x, y) => y * gridWidth + x

    // Center seed
    const cx = Math.floor(gridWidth / 2)
    const cy = Math.floor(gridHeight / 2)
    for (let i = -3; i <= 3; i++) {
      for (let j = -3; j <= 3; j++) {
        bGrid[idx(cx + i, cy + j)] = 1
      }
    }
    // Random seeds
    for (let i = 0; i < 5; i++) {
      bGrid[idx(
        Math.floor(Math.random() * gridWidth),
        Math.floor(Math.random() * gridHeight)
      )] = 1
    }

    // Color cache
    const colorCache = new Uint8Array(101 * 3)
    for (let i = 0; i <= 100; i++) {
      const v = i / 100
      let r, g, b
      if (v <= 0.2) {
        const t = v / 0.2
        r = 0; g = Math.floor(102 * t); b = Math.floor(51 * t)
      } else if (v <= 0.35) {
        const t = (v - 0.2) / 0.15
        r = Math.floor(255 * t); g = Math.floor(102 + 153 * t); b = Math.floor(51 * (1 - t))
      } else if (v <= 0.55) {
        const t = (v - 0.35) / 0.2
        r = Math.floor(255 - 204 * t); g = Math.floor(255 - 127 * t); b = Math.floor(255 * t)
      } else if (v <= 0.75) {
        const t = (v - 0.55) / 0.2
        r = Math.floor(51 + 204 * t); g = Math.floor(128 + 127 * t); b = 255
      } else {
        r = 255; g = 255; b = 255
      }
      colorCache[i * 3]     = r
      colorCache[i * 3 + 1] = g
      colorCache[i * 3 + 2] = b
    }

    const imageData = ctx.createImageData(gridWidth, gridHeight)
    const data = imageData.data

    let mouseDown = false
    let mouseX = 0
    let mouseY = 0

    const updateMouse = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = Math.floor((clientX - rect.left) / rect.width  * gridWidth)
      mouseY = Math.floor((clientY - rect.top)  / rect.height * gridHeight)
    }

    const onMouseDown  = (e) => { mouseDown = true;  updateMouse(e.clientX, e.clientY) }
    const onMouseMove  = (e) => { if (mouseDown) updateMouse(e.clientX, e.clientY) }
    const onMouseUp    = ()  => { mouseDown = false }
    const onTouchStart = (e) => { e.preventDefault(); mouseDown = true;  updateMouse(e.touches[0].clientX, e.touches[0].clientY) }
    const onTouchMove  = (e) => { e.preventDefault(); updateMouse(e.touches[0].clientX, e.touches[0].clientY) }
    const onTouchEnd   = ()  => { mouseDown = false }

    canvas.addEventListener('mousedown',  onMouseDown)
    canvas.addEventListener('mousemove',  onMouseMove)
    canvas.addEventListener('mouseup',    onMouseUp)
    canvas.addEventListener('mouseleave', onMouseUp)
    canvas.addEventListener('touchstart', onTouchStart, { passive: false })
    canvas.addEventListener('touchmove',  onTouchMove,  { passive: false })
    canvas.addEventListener('touchend',   onTouchEnd)

    function update() {
      if (mouseDown && mouseX >= 0 && mouseX < gridWidth && mouseY >= 0 && mouseY < gridHeight) {
        bGrid[idx(mouseX, mouseY)] = 1
      }

      for (let x = 0; x < gridWidth; x++) {
        for (let y = 0; y < gridHeight; y++) {
          const i   = idx(x, y)
          const a   = aGrid[i]
          const b   = bGrid[i]
          const xp  = (x + 1) % gridWidth
          const xm  = (x - 1 + gridWidth) % gridWidth
          const yp  = (y + 1) % gridHeight
          const ym  = (y - 1 + gridHeight) % gridHeight

          const lA = -a
            + aGrid[idx(xp, y)] * 0.2 + aGrid[idx(xm, y)] * 0.2
            + aGrid[idx(x, yp)] * 0.2 + aGrid[idx(x, ym)] * 0.2
            + aGrid[idx(xp, yp)] * 0.05 + aGrid[idx(xm, yp)] * 0.05
            + aGrid[idx(xp, ym)] * 0.05 + aGrid[idx(xm, ym)] * 0.05

          const lB = -b
            + bGrid[idx(xp, y)] * 0.2 + bGrid[idx(xm, y)] * 0.2
            + bGrid[idx(x, yp)] * 0.2 + bGrid[idx(x, ym)] * 0.2
            + bGrid[idx(xp, yp)] * 0.05 + bGrid[idx(xm, yp)] * 0.05
            + bGrid[idx(xp, ym)] * 0.05 + bGrid[idx(xm, ym)] * 0.05

          const abb = a * b * b
          aNext[i] = Math.max(0, Math.min(1, a + dA * lA - abb + feed * (1 - a)))
          bNext[i] = Math.max(0, Math.min(1, b + dB * lB + abb - (kill + feed) * b))
        }
      }

      aGrid.set(aNext)
      bGrid.set(bNext)
    }

    function draw() {
      for (let i = 0; i < gridWidth * gridHeight; i++) {
        const ci = Math.floor(bGrid[i] * 100) * 3
        const p  = i * 4
        data[p]     = colorCache[ci]
        data[p + 1] = colorCache[ci + 1]
        data[p + 2] = colorCache[ci + 2]
        data[p + 3] = 255
      }
      ctx.putImageData(imageData, 0, 0)
    }

    if (prefersReducedMotion) {
      for (let i = 0; i < 200; i++) update()
      draw()
      return undefined
    }

    let frameCount = 0
    let rafId
    function animate() {
      if (frameCount % 2 === 0) update()
      draw()
      frameCount++
      rafId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(rafId)
      canvas.removeEventListener('mousedown',  onMouseDown)
      canvas.removeEventListener('mousemove',  onMouseMove)
      canvas.removeEventListener('mouseup',    onMouseUp)
      canvas.removeEventListener('mouseleave', onMouseUp)
      canvas.removeEventListener('touchstart', onTouchStart)
      canvas.removeEventListener('touchmove',  onTouchMove)
      canvas.removeEventListener('touchend',   onTouchEnd)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        imageRendering: 'pixelated',
        cursor: 'crosshair',
        display: 'block',
      }}
    />
  )
}
