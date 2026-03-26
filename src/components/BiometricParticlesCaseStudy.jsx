import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { eyebrowStyle, bodyStyle, smallBodyStyle, backLinkStyle } from '../styles/caseStudyStyles'
import CaseStudyHero from './CaseStudyHero'
import LazyVideo from './LazyVideo'
import CaseStudyClosing from './CaseStudyClosing'
import NextProjectLink from './NextProjectLink'
import ProjectMeta from './ProjectMeta'

gsap.registerPlugin(ScrollTrigger)

// =============================================================================
// MEDIA — edit this object to swap any asset on the page.
// All files should be inside  public/videos/biometric/
// =============================================================================
const BASE = '/videos/biometric/'
const MEDIA = {
  heroVideo:     '/videos/bio/hero.mp4',    // fullbleed hero video
  heroImage:     BASE + 'heroImage.jpg',    // fallback still
  sensorPhoto:   BASE + 'sensorPhoto.jpg',  // photo of the GSR sensor setup
  particleStill: BASE + 'particleStill.jpg',// the money shot
  visualsVideo:  '/videos/bio/visuals.mp4', // S4 showreel
}
// =============================================================================

// ---------------------------------------------------------------------------
// SplitWords — renders a paragraph with each word wrapped for GSAP targeting
// ---------------------------------------------------------------------------
function SplitWords({ text, paraRef, style = {} }) {
  const words = text.split(' ')
  return (
    <p ref={paraRef} style={{ margin: 0, ...style }}>
      {words.map((word, i) => (
        <span
          key={i}
          data-sg-word
          style={{ display: 'inline-block', opacity: 0, willChange: 'opacity' }}
        >
          {word}{i < words.length - 1 ? '\u00a0' : ''}
        </span>
      ))}
    </p>
  )
}



// ---------------------------------------------------------------------------
// Pipeline steps for S3
// ---------------------------------------------------------------------------
const STEPS = [
  { label: 'GSR Sensor',    sub: 'skin conductance'    },
  { label: 'Oversample',    sub: 'averaged per read'   },
  { label: 'Smooth',        sub: 'rolling buffer'      },
  { label: 'Stress Float',  sub: 'normalised 0–1'      },
  { label: 'TouchDesigner', sub: 'live visual output'  },
]

// ---------------------------------------------------------------------------
// BiometricParticlesCaseStudy
// ---------------------------------------------------------------------------
export default function BiometricParticlesCaseStudy() {
  const pageRef   = useRef(null)
  const [loaded, setLoaded]       = useState(false)
  const [isCompact, setIsCompact] = useState(false)

  // S1
  const heroRef      = useRef(null)
  const backLinkRef  = useRef(null)
  const heroTitleRef = useRef(null)
  const heroSubRef   = useRef(null)
  const metaRef      = useRef(null)

  // S2
  const s2Ref        = useRef(null)
  const s2CounterRef = useRef(null)
  const s2HeadRef    = useRef(null)

  // S3
  const s3Ref        = useRef(null)
  const s3EyebrowRef = useRef(null)
  const s3TextRefs   = useRef([])

  // S4
  const s4Ref       = useRef(null)
  const s4ImgRef    = useRef(null)
  const s4RightRefs = useRef([])

  // S5
  const s5Ref       = useRef(null)
  const s5LeftRefs  = useRef([])
  const s5RightRefs = useRef([])

  // S6
  const s6Ref        = useRef(null)
  const s6EyebrowRef = useRef(null)
  const s6HeadRef    = useRef(null)
  const s6BodyRef    = useRef(null)
  const s6StatRefs   = useRef([])

  // S7
  const s7Ref        = useRef(null)
  const s7EyebrowRef = useRef(null)
  const s7Para1Ref   = useRef(null)
  const s7Para2Ref   = useRef(null)
  const s7ClosingRef = useRef(null)

  // S8
  const s8Ref        = useRef(null)
  const s8LineRefs   = useRef([])

  // ── mobile breakpoint ──────────────────────────────────────────────────
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

  // ── loaded flag ────────────────────────────────────────────────────────
  useEffect(() => { setLoaded(true) }, [])

  // ── hero entrance ──────────────────────────────────────────────────────
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

  // ── scroll animations ──────────────────────────────────────────────────
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

      // S2: chapter counter
      gsap.fromTo(
        s2CounterRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: 'power2.out',
          scrollTrigger: { trigger: s2Ref.current, start: 'top 85%' } }
      )

      // S2: headline clip reveal
      gsap.fromTo(
        s2HeadRef.current,
        { clipPath: 'inset(0% 0% 100% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'power3.out',
          scrollTrigger: { trigger: s2Ref.current, start: 'top 60%', end: 'bottom 40%', scrub: 1.6 },
        }
      )

      // S3: eyebrow + pipeline + paragraph stagger
      const s3Els = [s3EyebrowRef.current, ...s3TextRefs.current].filter(Boolean)
      gsap.fromTo(
        s3Els,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.1,
          scrollTrigger: { trigger: s3Ref.current, start: 'top 80%' },
        }
      )

      // S4: image clip reveal
      gsap.fromTo(
        s4ImgRef.current,
        { clipPath: 'inset(0% 100% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'power2.out',
          scrollTrigger: { trigger: s4Ref.current, start: 'top 75%', end: 'top 15%', scrub: 1.8 },
        }
      )

      // S4: right column stagger
      const s4RightEls = s4RightRefs.current.filter(Boolean)
      gsap.fromTo(
        s4RightEls,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.1,
          scrollTrigger: { trigger: s4Ref.current, start: 'top 80%' },
        }
      )

      // S5: mapping left column stagger
      gsap.fromTo(
        s5LeftRefs.current.filter(Boolean),
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.12,
          scrollTrigger: { trigger: s5Ref.current, start: 'top 80%' },
        }
      )

      // S5: mapping rows stagger
      gsap.fromTo(
        s5RightRefs.current.filter(Boolean),
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.1,
          scrollTrigger: { trigger: s5Ref.current, start: 'top 75%' },
        }
      )

      // S6: discovery stagger
      gsap.fromTo(
        [s6EyebrowRef.current, s6HeadRef.current, s6BodyRef.current, ...s6StatRefs.current].filter(Boolean),
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.1,
          scrollTrigger: { trigger: s6Ref.current, start: 'top 75%' },
        }
      )

      // S7: reflection eyebrow
      gsap.fromTo(
        s7EyebrowRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: s7Ref.current, start: 'top 80%' },
        }
      )

      // S7: word-by-word reveals
      ;[s7Para1Ref, s7Para2Ref].forEach((ref) => {
        if (!ref.current) return
        const words = ref.current.querySelectorAll('[data-sg-word]')
        gsap.fromTo(
          words,
          { opacity: 0 },
          {
            opacity: 1, duration: 0.5, stagger: 0.03, ease: 'power2.out',
            scrollTrigger: { trigger: ref.current, start: 'top 85%' },
          }
        )
      })

      // S7: closing credit
      gsap.fromTo(
        s7ClosingRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, scrollTrigger: { trigger: s7ClosingRef.current, start: 'top 85%' } }
      )

      s8LineRefs.current.filter(Boolean).forEach((el, i) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: 'power3.out',
            delay: i * 0.18,
            scrollTrigger: { trigger: s8Ref.current, start: 'top 75%' },
          }
        )
      })

    }, pageRef)

    return () => ctx.revert()
  }, [isCompact])

  const setS3Ref = (i) => (el) => { s3TextRefs.current[i]  = el }
  const setS4Ref = (i) => (el) => { s4RightRefs.current[i] = el }
  const setS5Left = (i) => (el) => { s5LeftRefs.current[i] = el }
  const setS5Right = (i) => (el) => { s5RightRefs.current[i] = el }
  const setS6Stat = (i) => (el) => { s6StatRefs.current[i] = el }

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

      {/* ── S1: Hero ────────────────────────────────────────────────────── */}
      <CaseStudyHero
        heroRef={heroRef}
        titleRef={heroTitleRef}
        subRef={heroSubRef}
        title="Biometric Particle Field"
        subtitle="TouchDesigner · GSR Sensor · Particle System · 2025"
        media={{ type: 'video', src: MEDIA.heroVideo }}
        sectionBg="#0d0e14"
      />

      <ProjectMeta
        sectionRef={metaRef}
        role="Creative Coding, Sensor Integration"
        team={['Anusha and Me']}
        timeline="2 days"
        tools={['TouchDesigner', 'Arduino', 'GSR Sensor']}
        context="Physical Computing project"
        status="Completed"
      />

      {/* ── S2: Pull-quote ───────────────────────────────────────────────── */}
      <section
        ref={s2Ref}
        style={{
          background: 'var(--bg-dark)',
          padding: 'clamp(80px, 12vh, 120px) clamp(24px, 5vw, 80px) clamp(64px, 8vh, 80px)',
          position: 'relative',
          borderTop: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {/* Chapter marker */}
        <span
          ref={s2CounterRef}
          aria-hidden
          style={{
            position: 'absolute',
            top: 'clamp(28px, 5vh, 52px)',
            right: 'clamp(24px, 5vw, 80px)',
            fontFamily: 'var(--font-body)',
            fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.22)',
            opacity: 0,
          }}
        >
          I — Biometric Particle Field
        </span>

        <hr style={{ border: 'none', borderTop: '0.5px solid rgba(255,255,255,0.1)', margin: '0 0 clamp(32px, 5vh, 48px)' }} />

        <div style={{ maxWidth: '78%', overflow: 'hidden' }}>
          <h2
            ref={s2HeadRef}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(44px, 7.5vw, 112px)',
              color: '#ffffff',
              lineHeight: 0.95, letterSpacing: '0.01em',
              margin: 0,
              textAlign: 'left',
            }}
          >
            The body as instrument.<br />The screen as score.
          </h2>
        </div>
      </section>

      {/* ── S3: The System ───────────────────────────────────────────────── */}
      <section
        ref={s3Ref}
        style={{
          background: 'var(--bg-warm)',
          padding: '64px 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '0 clamp(24px, 5vw, 80px)', maxWidth: 780 }}>
          <span
            ref={s3EyebrowRef}
            style={{ ...eyebrowStyle, marginBottom: 32, opacity: 0 }}
          >
            The System
          </span>

          {/* Signal pipeline */}
          <div
            ref={setS3Ref(0)}
            style={{
              display: 'flex',
              flexDirection: isCompact ? 'column' : 'row',
              alignItems: isCompact ? 'flex-start' : 'center',
              gap: isCompact ? 12 : 0,
              marginBottom: 40,
              opacity: 0,
            }}
          >
            {STEPS.map((step, i) => (
              <div
                key={step.label}
                style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}
              >
                {/* Step box */}
                <div style={{
                  border: '1px solid rgba(0,0,0,0.18)',
                  borderRadius: 6,
                  padding: '10px 16px',
                  background: '#fff',
                  minWidth: 110,
                }}>
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: 12,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: 'rgba(0,0,0,0.8)', margin: '0 0 3px',
                    fontWeight: 500,
                  }}>
                    {step.label}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: 11,
                    color: 'rgba(0,0,0,0.45)', margin: 0, letterSpacing: '0.02em',
                  }}>
                    {step.sub}
                  </p>
                </div>
                {/* Arrow — desktop only, not after last step */}
                {!isCompact && i < STEPS.length - 1 && (
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                    color: 'rgba(0,0,0,0.25)',
                    padding: '0 10px',
                    userSelect: 'none',
                  }}>
                    →
                  </span>
                )}
              </div>
            ))}
          </div>

          <p
            ref={setS3Ref(1)}
            style={{ ...bodyStyle, opacity: 0 }}
          >
            A GSR sensor on the skin feeds live conductance values into an Arduino. The Arduino smooths and normalises the signal into a single float — 0.0 to 1.0. TouchDesigner reads that number over serial and drives the particle system directly. No intermediary. Just numbers off skin.
          </p>
        </div>
      </section>

      {/* ── S4: The Visual — image left / text right ─────────────────────── */}
      <section
        ref={s4Ref}
        style={{
          background: '#0d0e14',
          display: 'grid',
          gridTemplateColumns: isCompact ? '1fr' : '1fr 1fr',
          width: '100%',
          minHeight: isCompact ? 'auto' : '55vh',
        }}
      >
        {/* Left: showreel video */}
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: isCompact ? '50vh' : 'auto' }}>
          <div
            ref={s4ImgRef}
            style={{ position: 'relative', flex: 1, overflow: 'hidden', minHeight: isCompact ? '70vh' : '100%' }}
          >
            <LazyVideo
              src={MEDIA.visualsVideo}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </div>

        {/* Right: text */}
        <div style={{
          background: 'var(--bg-dark)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(48px, 6vw, 80px)',
          borderLeft: isCompact ? 'none' : '1px solid rgba(255,255,255,0.06)',
          position: 'relative',
        }}>
          {!isCompact && (
            <span aria-hidden style={{
              position: 'absolute',
              top: 'clamp(24px, 4vh, 48px)',
              left: 'clamp(32px, 5vw, 72px)',
              fontFamily: 'var(--font-body)', fontSize: 10,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.1)',
            }}>
              02
            </span>
          )}

          <div style={{ maxWidth: 480 }}>
            <span ref={setS4Ref(0)} style={{ ...eyebrowStyle, marginBottom: 20, opacity: 0, color: 'rgba(255,255,255,0.58)' }}>
              The Visual
            </span>
            <p ref={setS4Ref(1)} style={{ ...bodyStyle, opacity: 0, color: 'rgba(255,255,255,0.8)' }}>
              We thought the colours were a glitch. When the same person wore the sensor again, the same colours came back. The system was not random — it was reading something specific to that person's body.
            </p>
            <p ref={setS4Ref(2)} style={{ ...bodyStyle, marginTop: 24, opacity: 0, color: 'rgba(255,255,255,0.55)' }}>
              We never designed for that. It just turned out that way.
            </p>
          </div>
        </div>
      </section>

      {/* ── S5: The Mapping ──────────────────────────────────────────────── */}
      <section
        ref={s5Ref}
        style={{
          background: 'var(--bg-warm)',
          padding: 'clamp(72px, 10vh, 104px) clamp(24px, 5vw, 80px)',
          borderTop: '0.5px solid rgba(16,12,28,0.08)',
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: isCompact ? 'block' : 'grid',
            gridTemplateColumns: isCompact ? undefined : '1fr 1fr',
            gap: isCompact ? 40 : 'clamp(40px, 6vw, 96px)',
            alignItems: 'start',
          }}
        >
          <div>
            <span
              ref={setS5Left(0)}
              style={{ ...eyebrowStyle, color: 'rgba(16,12,28,0.55)', marginBottom: 24, opacity: 0 }}
            >
              Parameter Mapping
            </span>
            <p
              ref={setS5Left(1)}
              style={{ ...bodyStyle, color: 'rgba(16,12,28,0.66)', opacity: 0, maxWidth: 520 }}
            >
              Every visual decision is driven by a single number. Calm reads as slow, wide particles in cool blue tones. Stress compresses the field — particles tighten, speed increases, color temperature shifts to warm. The mapping is not metaphorical. It is direct.
            </p>
          </div>

          <div style={{ paddingTop: isCompact ? 0 : 8 }}>
            {[
              { label: 'Calm (0.0)', value: 'Slow velocity, wide spread, cool hue' },
              { label: 'Neutral (0.5)', value: 'Medium velocity, balanced spread, white' },
              { label: 'Stress (1.0)', value: 'Fast velocity, tight spread, warm hue' },
            ].map(({ label, value }, i) => (
              <div
                key={label}
                ref={setS5Right(i)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  gap: 20,
                  padding: '18px 0',
                  borderTop: '0.5px solid rgba(16,12,28,0.1)',
                  borderBottom: i === 2 ? '0.5px solid rgba(16,12,28,0.1)' : 'none',
                  opacity: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 11,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'rgba(16,12,28,0.38)',
                    flexShrink: 0,
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(18px, 2vw, 28px)',
                    color: '#100c1c',
                    letterSpacing: '0.01em',
                    textAlign: 'right',
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S6: What We Found ────────────────────────────────────────────── */}
      <section
        ref={s6Ref}
        style={{
          background: 'var(--bg-dark)',
          padding: 'clamp(72px, 11vh, 112px) clamp(24px, 5vw, 80px)',
          borderTop: '0.5px solid rgba(255,255,255,0.08)',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <span
            ref={s6EyebrowRef}
            style={{ ...eyebrowStyle, marginBottom: 20, color: 'rgba(255,255,255,0.55)', opacity: 0 }}
          >
            Discovery
          </span>
          <h2
            ref={s6HeadRef}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(40px, 6vw, 88px)',
              color: 'rgba(255,255,255,0.9)',
              lineHeight: 0.92,
              letterSpacing: '0.01em',
              margin: '0 0 28px',
              opacity: 0,
              maxWidth: 720,
            }}
          >
            Biometric fingerprints.
          </h2>
          <p
            ref={s6BodyRef}
            style={{ ...bodyStyle, color: 'rgba(255,255,255,0.72)', maxWidth: 760, opacity: 0 }}
          >
            We expected noise. Instead we found consistency. The same person wearing the sensor on different days produced recognisably similar color signatures. Different people produced distinctly different ones. The system was not just visualising arousal levels — it was surfacing something individual.
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: isCompact ? '24px 32px' : 48,
              borderTop: '0.5px solid rgba(255,255,255,0.08)',
              marginTop: 40,
            }}
          >
            {[
              { value: '3', label: 'participants tested' },
              { value: '5', label: 'sessions each' },
              { value: 'Consistent', label: 'signatures across sessions' },
            ].map(({ value, label }, i) => (
              <div
                key={label}
                ref={setS6Stat(i)}
                style={{ paddingTop: 24, opacity: 0 }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(22px, 2.6vw, 40px)',
                    color: 'rgba(255,255,255,0.92)',
                    lineHeight: 0.9,
                    display: 'block',
                  }}
                >
                  {value}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 11,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.58)',
                    display: 'block',
                    marginTop: 10,
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S7: Reflection — word-by-word reveal, ghost quote mark ───────── */}
      <section
        ref={s7Ref}
        style={{ background: 'var(--bg-dark)', borderTop: '0.5px solid rgba(255,255,255,0.08)', padding: 'clamp(80px, 14vh, 160px) 0' }}
      >
        <div style={{
          maxWidth: 620,
          margin: '0 auto',
          padding: '0 clamp(24px, 4vw, 48px)',
          position: 'relative',
        }}>
          <span aria-hidden style={{
            position: 'absolute',
            top: -48, left: -20,
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(160px, 22vw, 280px)',
            lineHeight: 1,
            color: 'rgba(255,255,255,0.03)',
            userSelect: 'none', pointerEvents: 'none',
          }}>
            &ldquo;
          </span>

          <span
            ref={s7EyebrowRef}
            style={{ ...eyebrowStyle, marginBottom: 48, opacity: 0, color: 'rgba(255,255,255,0.3)' }}
          >
            Reflection
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
            <SplitWords
              paraRef={s7Para1Ref}
              text="Mapping a number to a visual is easy. Mapping a feeling to a visual is a design problem. We had to decide what calm looks like and what stress looks like — not metaphorically, but in particle velocity and colour temperature."
              style={{ ...bodyStyle, fontSize: 'clamp(18px, 1.8vw, 24px)', color: 'rgba(255,255,255,0.75)' }}
            />
            <SplitWords
              paraRef={s7Para2Ref}
              text="This was the first time I built something where the input was a human body in real time. Everything else I have made, the user chooses when to interact. Here, the body is always already interacting."
              style={{ ...bodyStyle, fontSize: 'clamp(18px, 1.8vw, 24px)', color: 'rgba(255,255,255,0.75)' }}
            />
          </div>

          <p
            ref={s7ClosingRef}
            style={{
              fontFamily: 'var(--font-body)', fontSize: 11,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.2)',
              marginTop: 72, opacity: 0,
            }}
          >
            Biometric Particle Field · 2025
          </p>

        </div>
      </section>

      <NextProjectLink
        nextTitle="Installation"
        nextHref="/work/installation"
        nextAccent="#cde8c5"
      />

      <CaseStudyClosing
        sectionRef={s8Ref}
        lineRefs={s8LineRefs}
        statements={[
          'The body as input.',
          'The screen as mirror.',
          'The data as art.',
        ]}
        links={[
          { label: '← All work', href: '/#work' },
        ]}
      />

    </main>
  )
}
