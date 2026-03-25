import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BookOpen, Coins, Users, BarChart2, Gamepad2, Gift } from 'lucide-react'
import { eyebrowStyle, bodyStyle, backLinkStyle } from '../styles/caseStudyStyles'
import CaseStudyHero from './CaseStudyHero'
import CaseStudyClosing from './CaseStudyClosing'
import NextProjectLink from './NextProjectLink'
import ProjectMeta from './ProjectMeta'

gsap.registerPlugin(ScrollTrigger)

const BASE = '/videos/Urushya/'
const MEDIA = {
  hero:        BASE + 'hero.png',
  research:    BASE + 'research.jpg',
  persona:     BASE + 'persona.png',
  sitemap:     BASE + 'sitemap.jpg',
  onboarding:  BASE + 'onboarding.mp4',
  login:       BASE + 'login.png',
  pretest:     BASE + 'pretest.png',
  homepage:    BASE + 'homepage.png',
  learn:       BASE + 'learn.png',
  apply:       BASE + 'apply.png',
  experts:     BASE + 'experts.png',
  cashCompass: BASE + 'cash compass.png',
  tool:        BASE + 'tool.png',
  summary:     BASE + 'summary.png',
  profile:     BASE + 'profile.png',
  smart:       BASE + 'smart.mp4',
  simulations: BASE + 'simulations.png',
}


export default function UrushyaCaseStudy() {
  const pageRef = useRef(null)
  const [loaded, setLoaded]       = useState(false)
  const [isCompact, setIsCompact] = useState(false)

  const backLinkRef  = useRef(null)
  const heroRef      = useRef(null)
  const heroTitleRef = useRef(null)
  const heroSubRef   = useRef(null)
  const metaRef      = useRef(null)

  // S2
  const s2Ref      = useRef(null)
  const s2LeftRefs = useRef([])

  // S3
  const s3Ref       = useRef(null)
  const s3EyebrowRef = useRef(null)
  const s3HeadRef   = useRef(null)
  const s3BodyRefs  = useRef([])

  // S4
  const s4Ref     = useRef(null)
  const s4ImgRef  = useRef(null)
  const s4RightRefs = useRef([])

  // S5
  const s5Ref      = useRef(null)
  const s5LeftRefs = useRef([])
  const s5RightRef = useRef(null)

  // S6
  const s6Ref      = useRef(null)
  const s6HeadRef  = useRef(null)
  const s6CardRefs = useRef([])

  // S7
  const s7Ref      = useRef(null)
  const s7HeadRef  = useRef(null)
  const s7ImgRefs  = useRef([])

  // S8
  const s8Ref      = useRef(null)
  const s8LeftRefs = useRef([])
  const s8ImgRef   = useRef(null)

  // S9
  const s9Ref       = useRef(null)
  const s9HeadRef   = useRef(null)
  const s9QuoteRefs = useRef([])
  const s9StatsRef  = useRef(null)

  // S9b — What We Learned (testing insights)
  const sLearnRef     = useRef(null)
  const sLearnEleRefs = useRef([])

  // S10
  const s10Ref      = useRef(null)
  const s10LeftRefs = useRef([])
  const s10RightRefs = useRef([])
  const s10FooterRef = useRef(null)

  // S11
  const s11Ref      = useRef(null)
  const s11LineRefs = useRef([])

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

      // S2: left column stagger
      gsap.fromTo(
        s2LeftRefs.current.filter(Boolean),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.12,
          scrollTrigger: { trigger: s2Ref.current, start: 'top 75%' } }
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
      // S3: body rows
      const s3Els = s3BodyRefs.current.filter(Boolean)
      gsap.fromTo(s3Els, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.1,
        scrollTrigger: { trigger: s3Ref.current, start: 'top 60%' },
      })

      // S4: image clips in from right
      gsap.fromTo(
        s4ImgRef.current,
        { clipPath: 'inset(0% 100% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power3.out',
          scrollTrigger: { trigger: s4Ref.current, start: 'top 75%', end: 'top 20%', scrub: 1.6 } }
      )
      gsap.fromTo(
        s4RightRefs.current.filter(Boolean),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.12,
          scrollTrigger: { trigger: s4Ref.current, start: 'top 70%' } }
      )

      // S5: left stagger + right image
      gsap.fromTo(
        s5LeftRefs.current.filter(Boolean),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.12,
          scrollTrigger: { trigger: s5Ref.current, start: 'top 75%' } }
      )
      gsap.fromTo(
        s5RightRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: s5Ref.current, start: 'top 70%' } }
      )

      // S6: headline + cards stagger
      gsap.fromTo(
        s6HeadRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: s6Ref.current, start: 'top 80%' } }
      )
      gsap.fromTo(
        s6CardRefs.current.filter(Boolean),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.08,
          scrollTrigger: { trigger: s6Ref.current, start: 'top 65%' } }
      )

      // S7: images stagger
      gsap.fromTo(
        [s7HeadRef.current, ...s7ImgRefs.current].filter(Boolean),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.08,
          scrollTrigger: { trigger: s7Ref.current, start: 'top 75%' } }
      )

      // S8: left + right
      gsap.fromTo(
        s8LeftRefs.current.filter(Boolean),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.12,
          scrollTrigger: { trigger: s8Ref.current, start: 'top 75%' } }
      )
      gsap.fromTo(
        s8ImgRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: s8Ref.current, start: 'top 70%' } }
      )

      // S9: head + quotes + stats
      gsap.fromTo(
        s9HeadRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: s9Ref.current, start: 'top 80%' } }
      )
      gsap.fromTo(
        s9QuoteRefs.current.filter(Boolean),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.12,
          scrollTrigger: { trigger: s9Ref.current, start: 'top 65%' } }
      )
      gsap.fromTo(
        s9StatsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: s9StatsRef.current, start: 'top 85%' } }
      )

      // S9b: testing insights stagger
      gsap.fromTo(
        sLearnEleRefs.current.filter(Boolean),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.12,
          scrollTrigger: { trigger: sLearnRef.current, start: 'top 75%' } }
      )

      // S10: left + right + footer
      gsap.fromTo(
        s10LeftRefs.current.filter(Boolean),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.12,
          scrollTrigger: { trigger: s10Ref.current, start: 'top 75%' } }
      )
      gsap.fromTo(
        s10RightRefs.current.filter(Boolean),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.1,
          scrollTrigger: { trigger: s10Ref.current, start: 'top 70%' } }
      )
      gsap.fromTo(
        s10FooterRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8,
          scrollTrigger: { trigger: s10FooterRef.current, start: 'top 85%' } }
      )

      // S11: statement lines clip reveal
      s11LineRefs.current.filter(Boolean).forEach((el, i) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power3.out',
            delay: i * 0.18,
            scrollTrigger: { trigger: s11Ref.current, start: 'top 75%' } }
        )
      })

    }, pageRef)

    return () => ctx.revert()
  }, [isCompact])

  // ── ref setters ────────────────────────────────────────────────────────────
  const setS2Left   = (i) => (el) => { s2LeftRefs.current[i]   = el }
  const setS3Body   = (i) => (el) => { s3BodyRefs.current[i]   = el }
  const setS4Right  = (i) => (el) => { s4RightRefs.current[i]  = el }
  const setS5Left   = (i) => (el) => { s5LeftRefs.current[i]   = el }
  const setS6Card   = (i) => (el) => { s6CardRefs.current[i]   = el }
  const setS7Img    = (i) => (el) => { s7ImgRefs.current[i]    = el }
  const setS8Left   = (i) => (el) => { s8LeftRefs.current[i]   = el }
  const setS9Quote  = (i) => (el) => { s9QuoteRefs.current[i]  = el }
  const setLearnEle = (i) => (el) => { sLearnEleRefs.current[i] = el }
  const setS10Left  = (i) => (el) => { s10LeftRefs.current[i]  = el }
  const setS10Right = (i) => (el) => { s10RightRefs.current[i] = el }
  const setS11Line  = (i) => (el) => { s11LineRefs.current[i]  = el }

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
        title="Urushya"
        subtitle="Product Design · Financial Literacy · Mobile App"
        media={{ type: 'image', src: MEDIA.hero, alt: 'Urushya' }}
      />

      <ProjectMeta
        sectionRef={metaRef}
        role="UX Research, UI Design, Prototyping"
        team={null}
        timeline="2 weeks"
        tools={['Figma', 'Maze', 'User interviews']}
        context="Interaction Design course — Srishti Manipal"
        status="Prototype"
      />

      {/* ── S2: The Problem ───────────────────────────────────────────────── */}
      <section
        ref={s2Ref}
        style={{
          background: 'var(--bg-warm)',
          padding: 'clamp(64px, 10vh, 80px) clamp(32px, 5vw, 80px)',
        }}
      >
        <div style={{
          display: isCompact ? 'block' : 'grid',
          gridTemplateColumns: isCompact ? undefined : '1fr 1fr',
          gap: isCompact ? undefined : 'clamp(40px, 6vw, 96px)',
          maxWidth: 1100, margin: '0 auto',
          alignItems: 'start',
        }}>
          {/* Left column */}
          <div>
            <span
              ref={setS2Left(0)}
              style={{ ...eyebrowStyle, color: 'rgba(16,12,28,0.55)', marginBottom: 24, opacity: 0 }}
            >
              The Gap
            </span>
            <div style={{ overflow: 'hidden', marginBottom: 0 }}>
              <h2
                ref={setS2Left(1)}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(40px, 6.5vw, 88px)',
                  color: '#100c1c',
                  lineHeight: 0.92, letterSpacing: '0.01em',
                  margin: 0, opacity: 0,
                }}
              >
                Young adults don't know money.
              </h2>
            </div>
          </div>

          {/* Right column */}
          <div style={{ paddingTop: isCompact ? 40 : 0 }}>
            <p
              ref={setS2Left(2)}
              style={{ ...bodyStyle, color: 'rgba(16,12,28,0.6)', opacity: 0 }}
            >
              Only 27% of Indian adolescents possess basic financial knowledge. 53% take personal loans before turning 30. The resources that exist are either too complex, too boring, or too generic — built for people who already understand finance, not for the ones who need it most. Young adults aren't financially illiterate because they're careless. They're underserved. They want to learn but don't know where to start, feel overwhelmed by jargon, and associate finance with confusion rather than control.
            </p>

            <div
              ref={setS2Left(3)}
              style={{
                borderTop: '0.5px solid rgba(16,12,28,0.1)',
                marginTop: 32, paddingTop: 0,
                display: 'flex', flexWrap: 'wrap',
                opacity: 0,
              }}
            >
              {[
                { value: '27%',   label: 'possess basic financial knowledge' },
                { value: '53%',   label: 'take loans before age 30'          },
                { value: '62.9%', label: 'learn finance from family only'     },
              ].map(({ value, label }, i) => (
                <div
                  key={label}
                  style={{
                    flex: 1, minWidth: 100,
                    paddingTop: 24, paddingBottom: 24,
                    paddingLeft: i > 0 ? 20 : 0,
                    paddingRight: i < 2 ? 20 : 0,
                    borderRight: i < 2 ? '0.5px solid rgba(16,12,28,0.1)' : 'none',
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(22px, 2.5vw, 36px)',
                    color: '#100c1c', lineHeight: 0.9,
                    display: 'block',
                  }}>
                    {value}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase',
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

      {/* ── S3: The Research ──────────────────────────────────────────────── */}
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
            What We Found
          </span>

          <div style={{ overflow: 'hidden', marginBottom: 48 }}>
            <h2
              ref={s3HeadRef}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px, 5vw, 72px)',
                color: 'rgba(255,255,255,0.88)',
                lineHeight: 0.92, margin: 0,
              }}
            >
              8 interviews. 61 surveys. One pattern.
            </h2>
          </div>

          <div style={{
            display: isCompact ? 'block' : 'grid',
            gridTemplateColumns: isCompact ? undefined : '1fr 1fr',
            gap: isCompact ? undefined : 'clamp(40px, 6vw, 96px)',
            alignItems: 'start',
          }}>
            {/* Left: body */}
            <p
              ref={setS3Body(0)}
              style={{ ...bodyStyle, color: 'rgba(255,255,255,0.6)', opacity: 0 }}
            >
              We conducted qualitative thematic analysis through 8 in-depth interviews with young adults aged 18–27, and a quantitative ranking analysis through a 61-respondent survey. The findings converged on a clear gap: young adults seek confidence in their financial knowledge, associate finance with confusion, don't know where to start, and prefer short personalized lessons over long theoretical content. Existing tools like NCFE, Money Masters, and ET Money each solve a fragment — gamified lessons, government backing, investment tools — but none address the full journey from zero knowledge to applied confidence.
            </p>

            {/* Right: finding rows */}
            <div style={{ paddingTop: isCompact ? 40 : 0 }}>
              {[
                { label: 'Pain Point',      value: "Don\u2019t know where to start"        },
                { label: 'Emotion',         value: 'Confusion and intimidation'       },
                { label: 'Preference',      value: 'Short lessons, personalized advice' },
                { label: 'Biggest Barrier', value: 'Insufficient knowledge to invest' },
              ].map(({ label, value }, i) => (
                <div
                  key={label}
                  ref={setS3Body(i + 1)}
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                    gap: 24,
                    paddingTop: 20, paddingBottom: 20,
                    borderBottom: '0.5px solid rgba(255,255,255,0.07)',
                    borderTop: i === 0 ? '0.5px solid rgba(255,255,255,0.07)' : 'none',
                    opacity: 0,
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-body)', fontSize: 11,
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.55)', flexShrink: 0,
                  }}>
                    {label}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(18px, 2vw, 28px)',
                    color: 'rgba(255,255,255,0.88)',
                    textAlign: 'right',
                  }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── S4: The Persona ───────────────────────────────────────────────── */}
      <section
        ref={s4Ref}
        style={{
          background: 'var(--bg-darker)',
          display: isCompact ? 'block' : 'grid',
          gridTemplateColumns: isCompact ? undefined : '1fr 1fr',
          minHeight: isCompact ? 'auto' : '80vh',
        }}
      >
        {/* Left: persona image */}
        <div
          ref={s4ImgRef}
          style={{ position: 'relative', overflow: 'hidden', minHeight: isCompact ? '60vw' : 0 }}
        >
          <img
            src={MEDIA.persona}
            alt="Ana Kumar persona"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
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
            Who We Design For
          </span>
          <h2
            ref={setS4Right(1)}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 4vw, 56px)',
              color: '#ffffff', lineHeight: 0.92,
              margin: '0 0 20px', opacity: 0,
            }}
          >
            Ana Kumar, 20.
          </h2>
          <p
            ref={setS4Right(2)}
            style={{ ...bodyStyle, color: 'rgba(255,255,255,0.6)', opacity: 0 }}
          >
            Structural engineering student. Wants to invest but doesn't know where to start. Finds finance content too complex or boring. Struggles with impulse tech purchases. Her goal: build a savings account, reduce dependence on her father for strategic financial management, and feel confident making her own money decisions. Ana represents the core user — motivated but unsupported, curious but overwhelmed.
          </p>
          <div ref={setS4Right(3)} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 28, opacity: 0 }}>
            {['Age 18–27', 'Young Professional', 'First-time Investor'].map((tag) => (
              <span key={tag} style={{
                fontFamily: 'var(--font-body)', fontSize: 10,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.6)',
                border: '0.5px solid rgba(255,255,255,0.2)',
                borderRadius: 999, padding: '6px 14px',
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── S5: The Solution ──────────────────────────────────────────────── */}
      <section
        ref={s5Ref}
        style={{
          background: 'var(--bg-dark)',
          padding: 'clamp(64px, 10vh, 80px) clamp(32px, 5vw, 80px)',
        }}
      >
        <div style={{
          display: isCompact ? 'block' : 'grid',
          gridTemplateColumns: isCompact ? undefined : '1fr 1fr',
          gap: isCompact ? undefined : 'clamp(32px, 4vw, 64px)',
          maxWidth: 1100, margin: '0 auto',
          alignItems: 'center',
        }}>
          {/* Left column */}
          <div>
            <span
              ref={setS5Left(0)}
              style={{ ...eyebrowStyle, color: 'rgba(255,255,255,0.58)', marginBottom: 24, opacity: 0 }}
            >
              What We Built
            </span>
            <div style={{ overflow: 'hidden' }}>
              <h2
                ref={setS5Left(1)}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(40px, 6.5vw, 88px)',
                  color: 'rgba(255,255,255,0.88)', lineHeight: 0.92,
                  margin: 0, opacity: 0,
                }}
              >
                Learn. Apply. Secure.
              </h2>
            </div>
            <p
              ref={setS5Left(2)}
              style={{ ...bodyStyle, color: 'rgba(255,255,255,0.55)', marginTop: 24, maxWidth: 480, opacity: 0 }}
            >
              Urushya is a financial literacy app for young adults in India. The name comes from Sanskrit — meaning prosperity, growth. It doesn't assume you know anything. A pre-test tailors your journey. Courses teach through real scenarios. Simulations let you practice. Mentors guide you. An expense tracker makes it daily.
            </p>

            {/* Pillar rows */}
            <div ref={setS5Left(3)} style={{ marginTop: 36, opacity: 0 }}>
              {[
                { title: 'Learn',  desc: 'Build your financial foundation through bite-sized, interactive lessons that make complex concepts simple and engaging.' },
                { title: 'Apply',  desc: 'Turn knowledge into action with real-world simulations, budgeting tools, and guided challenges that strengthen confidence.' },
                { title: 'Secure', desc: 'Achieve lasting financial stability by tracking progress, setting goals, and making informed money decisions with clarity and control.' },
              ].map(({ title, desc }, i) => (
                <div
                  key={title}
                  style={{
                    display: 'flex', gap: 16, alignItems: 'baseline',
                    paddingBottom: 20,
                    borderBottom: '0.5px solid rgba(255,255,255,0.07)',
                    marginBottom: i < 2 ? 20 : 0,
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(22px, 3vw, 36px)',
                    color: 'rgba(255,255,255,0.88)', flexShrink: 0, width: 120,
                  }}>
                    {title}
                  </span>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(13px, 1.1vw, 15px)',
                    lineHeight: 1.7, color: 'rgba(255,255,255,0.4)',
                    margin: 0,
                  }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right column: onboarding video */}
          <div
            ref={s5RightRef}
            style={{
              paddingTop: isCompact ? 48 : 0,
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              opacity: 0,
            }}
          >
            <div style={{
              width: isCompact ? 220 : 260,
              aspectRatio: '9/19',
              overflow: 'hidden',
              borderRadius: 20,
              boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
              flexShrink: 0,
            }}>
              <video
                src={MEDIA.onboarding}
                muted loop autoPlay playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── S6: Features ──────────────────────────────────────────────────── */}
      <section
        ref={s6Ref}
        style={{
          background: 'var(--bg-dark)',
          borderTop: '0.5px solid rgba(255,255,255,0.07)',
          padding: 'clamp(64px, 10vh, 80px) clamp(32px, 5vw, 80px)',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <span style={{ ...eyebrowStyle, color: 'rgba(255,255,255,0.58)', marginBottom: 20, display: 'block' }}>
            Key Features
          </span>
          <h2
            ref={s6HeadRef}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 5vw, 72px)',
              color: 'rgba(255,255,255,0.88)', lineHeight: 0.92,
              margin: '0 0 48px', opacity: 0,
            }}
          >
            Everything in one place.
          </h2>

          {isCompact ? (
            /* ── Mobile: single column stacked cards ── */
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { Icon: BookOpen, title: 'Personalised Learning',  desc: 'Users begin with a quick pre-test and interest setup to create a personalized learning path. They then explore bite-sized, interactive lessons across key financial topics, earning coins as they progress.' },
                { Icon: Coins,    title: 'U Coins',               desc: 'Users earn coins by completing lessons, quizzes, and challenges. These coins can be redeemed for mentorship sessions.' },
                { Icon: Users,    title: 'Mentors & Community',    desc: 'Use your earned coins to connect with expert mentors and book one-on-one guidance sessions. Get personalized advice to build confidence and make smarter financial decisions.' },
                { Icon: BarChart2,title: 'Smart Financial Tools',  desc: 'Track expenses, set savings goals, and monitor your progress with simple budgeting tools and visual dashboards.' },
                { Icon: Gift,     title: 'Rewards',                desc: 'Get coupons and perks with your coins.' },
                { Icon: Gamepad2, title: 'Gamified Simulations',   desc: 'Engage with quizzes, challenges, and real-world finance scenarios that turn learning into active, hands-on experience.' },
              ].map(({ Icon, title, desc }, i) => (
                <div key={title} ref={setS6Card(i)} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden', opacity: 0 }}>
                  {title === 'U Coins' && (
                    <div style={{ height: 160, overflow: 'hidden', position: 'relative', background: 'radial-gradient(ellipse 90% 55% at 50% 100%, rgba(220,185,0,0.18) 0%, transparent 65%)' }}>
                      <img src="/videos/Urushya/Ucoin.png" alt="U Coin" style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '80%', height: 'auto' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, rgba(22,22,28,0.7) 70%, rgba(22,22,28,1) 100%)', pointerEvents: 'none' }} />
                    </div>
                  )}
                  {title === 'Personalised Learning' && (
                    <div style={{ height: 220, overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 20 }}>
                      <img src="/videos/Urushya/personalised learning.png" alt="Personalised Learning screen" style={{ width: '40%', height: 'auto', transform: 'perspective(1200px) rotateX(10deg) rotateY(-20deg) rotateZ(5deg)', transformOrigin: 'center center', borderRadius: 12, display: 'block', filter: 'drop-shadow(20px 30px 50px rgba(0,0,0,0.5))' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(22,22,28,0.8) 75%, rgba(22,22,28,1) 100%)', pointerEvents: 'none' }} />
                    </div>
                  )}
                  {title === 'Mentors & Community' && (
                    <div style={{ height: 220, overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 20 }}>
                      <img src="/videos/Urushya/mentors.png" alt="Mentors screen" style={{ width: '50%', height: 'auto', transform: 'perspective(1200px) rotateX(10deg) rotateY(-20deg) rotateZ(5deg)', transformOrigin: 'center center', borderRadius: 12, display: 'block', filter: 'drop-shadow(20px 30px 50px rgba(0,0,0,0.5))' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(22,22,28,0.8) 75%, rgba(22,22,28,1) 100%)', pointerEvents: 'none' }} />
                    </div>
                  )}
                  {title === 'Smart Financial Tools' && (
                    <div style={{ overflow: 'hidden', position: 'relative' }}>
                      <video src={MEDIA.smart} muted loop autoPlay playsInline style={{ width: '32%', display: 'block', margin: '20px auto 0' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(22,22,28,0.8) 75%, rgba(22,22,28,1) 100%)', pointerEvents: 'none' }} />
                    </div>
                  )}
                  {title === 'Rewards' && (
                    <div style={{ height: 160, overflow: 'hidden', position: 'relative', background: 'radial-gradient(ellipse 90% 55% at 50% 100%, rgba(255,100,80,0.15) 0%, transparent 65%)' }}>
                      <img src="/videos/Urushya/rewards.png" alt="Rewards" style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '80%', height: 'auto' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, rgba(22,22,28,0.7) 70%, rgba(22,22,28,1) 100%)', pointerEvents: 'none' }} />
                    </div>
                  )}
                  {title === 'Gamified Simulations' && (
                    <div style={{ height: 220, overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 20 }}>
                      <img src={MEDIA.simulations} alt="Gamified Simulations" style={{ width: '30%', height: 'auto', transform: 'perspective(1200px) rotateX(10deg) rotateY(-20deg) rotateZ(5deg)', transformOrigin: 'center center', borderRadius: 12, display: 'block', filter: 'drop-shadow(20px 30px 50px rgba(0,0,0,0.5))' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(22,22,28,0.8) 75%, rgba(22,22,28,1) 100%)', pointerEvents: 'none' }} />
                    </div>
                  )}
                  <div style={{ padding: 24 }}>
                    <div style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.06)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}><Icon size={18} strokeWidth={1.5} color="rgba(255,255,255,0.7)" /></div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'rgba(255,255,255,0.88)', margin: '0 0 8px' }}>{title}</h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.7, color: 'rgba(255,255,255,0.60)', margin: 0 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* ── Desktop: 3 independent flex columns ── */
            <div style={{ display: 'flex', gap: 12 }}>

              {/* Col 1 */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {/* Personalised Learning */}
                <div ref={setS6Card(0)} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden', opacity: 0 }}>
                  <div style={{ overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 28 }}>
                    <img src="/videos/Urushya/personalised learning.png" alt="Personalised Learning screen" style={{ width: '53%', height: 'auto', transform: 'perspective(1200px) rotateX(10deg) rotateY(-20deg) rotateZ(5deg)', transformOrigin: 'center center', borderRadius: 16, display: 'block', filter: 'drop-shadow(20px 30px 50px rgba(0,0,0,0.5))' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, rgba(22,22,28,0.8) 85%, rgba(22,22,28,1) 100%)', pointerEvents: 'none' }} />
                  </div>
                  <div style={{ padding: 'clamp(20px, 2.5vw, 32px)' }}>
                    <div style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.06)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}><BookOpen size={18} strokeWidth={1.5} color="rgba(255,255,255,0.7)" /></div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 2vw, 26px)', color: 'rgba(255,255,255,0.88)', margin: '0 0 10px' }}>Personalised Learning</h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(13px, 1.1vw, 15px)', lineHeight: 1.7, color: 'rgba(255,255,255,0.60)', margin: 0 }}>Users begin with a quick pre-test and interest setup to create a personalized learning path. They then explore bite-sized, interactive lessons across key financial topics, earning coins as they progress.</p>
                  </div>
                </div>
                {/* Rewards */}
                <div ref={setS6Card(7)} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden', opacity: 0 }}>
                  <div style={{ height: 160, overflow: 'hidden', position: 'relative', background: 'radial-gradient(ellipse 90% 55% at 50% 100%, rgba(255,100,80,0.15) 0%, transparent 65%)' }}>
                    <img src="/videos/Urushya/rewards.png" alt="Rewards" style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '80%', height: 'auto' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, rgba(22,22,28,0.7) 70%, rgba(22,22,28,1) 100%)', pointerEvents: 'none' }} />
                  </div>
                  <div style={{ padding: 'clamp(20px, 2.5vw, 32px)' }}>
                    <div style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.06)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}><Gift size={18} strokeWidth={1.5} color="rgba(255,255,255,0.7)" /></div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 2vw, 26px)', color: 'rgba(255,255,255,0.88)', margin: '0 0 10px' }}>Rewards</h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(13px, 1.1vw, 15px)', lineHeight: 1.7, color: 'rgba(255,255,255,0.60)', margin: 0 }}>Get coupons and perks with your coins.</p>
                  </div>
                </div>
              </div>

              {/* Col 2 */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {/* U Coins */}
                <div ref={setS6Card(1)} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden', opacity: 0 }}>
                  <div style={{ height: 160, overflow: 'hidden', position: 'relative', background: 'radial-gradient(ellipse 90% 55% at 50% 100%, rgba(220,185,0,0.18) 0%, transparent 65%)' }}>
                    <img src="/videos/Urushya/Ucoin.png" alt="U Coin" style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '80%', height: 'auto' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, rgba(22,22,28,0.7) 70%, rgba(22,22,28,1) 100%)', pointerEvents: 'none' }} />
                  </div>
                  <div style={{ padding: 'clamp(20px, 2.5vw, 28px)' }}>
                    <div style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.06)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}><Coins size={18} strokeWidth={1.5} color="rgba(255,255,255,0.7)" /></div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 2vw, 26px)', color: 'rgba(255,255,255,0.88)', margin: '0 0 10px' }}>U Coins</h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(13px, 1.1vw, 15px)', lineHeight: 1.7, color: 'rgba(255,255,255,0.60)', margin: 0 }}>Users earn coins by completing lessons, quizzes, and challenges. These coins can be redeemed for mentorship sessions.</p>
                  </div>
                </div>
                {/* Smart Financial Tools */}
                <div ref={setS6Card(5)} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden', opacity: 0 }}>
                  <div style={{ overflow: 'hidden', position: 'relative' }}>
                    <video src={MEDIA.smart} muted loop autoPlay playsInline style={{ width: '50%', display: 'block', margin: '24px auto 0' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(22,22,28,0.8) 75%, rgba(22,22,28,1) 100%)', pointerEvents: 'none' }} />
                  </div>
                  <div style={{ padding: 'clamp(20px, 2.5vw, 32px)' }}>
                    <div style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.06)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}><BarChart2 size={18} strokeWidth={1.5} color="rgba(255,255,255,0.7)" /></div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 2vw, 26px)', color: 'rgba(255,255,255,0.88)', margin: '0 0 10px' }}>Smart Financial Tools</h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(13px, 1.1vw, 15px)', lineHeight: 1.7, color: 'rgba(255,255,255,0.60)', margin: 0 }}>Track expenses, set savings goals, and monitor your progress with simple budgeting tools and visual dashboards.</p>
                  </div>
                </div>
              </div>

              {/* Col 3 */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {/* Mentors & Community */}
                <div ref={setS6Card(6)} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden', opacity: 0 }}>
                  <div style={{ overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 16 }}>
                    <img src="/videos/Urushya/mentors.png" alt="Mentors screen" style={{ width: '40%', height: 'auto', transform: 'perspective(1200px) rotateX(10deg) rotateY(-20deg) rotateZ(5deg)', transformOrigin: 'center center', borderRadius: 16, display: 'block', filter: 'drop-shadow(20px 30px 50px rgba(0,0,0,0.5))' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, rgba(22,22,28,0.8) 85%, rgba(22,22,28,1) 100%)', pointerEvents: 'none' }} />
                  </div>
                  <div style={{ padding: 'clamp(12px, 1.5vw, 20px)' }}>
                    <div style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.06)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}><Users size={18} strokeWidth={1.5} color="rgba(255,255,255,0.7)" /></div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 2vw, 26px)', color: 'rgba(255,255,255,0.88)', margin: '0 0 10px' }}>Mentors & Community</h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(13px, 1.1vw, 15px)', lineHeight: 1.7, color: 'rgba(255,255,255,0.60)', margin: 0 }}>Use your earned coins to connect with expert mentors and book one-on-one guidance sessions. Get personalized advice to build confidence and make smarter financial decisions.</p>
                  </div>
                </div>
                {/* Gamified Simulations */}
                <div ref={setS6Card(8)} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden', opacity: 0 }}>
                  <div style={{ overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 28 }}>
                    <img src={MEDIA.simulations} alt="Gamified Simulations" style={{ width: '48.3%', height: 'auto', transform: 'perspective(1200px) rotateX(10deg) rotateY(-20deg) rotateZ(5deg)', transformOrigin: 'center center', borderRadius: 16, display: 'block', filter: 'drop-shadow(20px 30px 50px rgba(0,0,0,0.5))' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, rgba(22,22,28,0.8) 85%, rgba(22,22,28,1) 100%)', pointerEvents: 'none' }} />
                  </div>
                  <div style={{ padding: 'clamp(20px, 2.5vw, 32px)' }}>
                    <div style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.06)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}><Gamepad2 size={18} strokeWidth={1.5} color="rgba(255,255,255,0.7)" /></div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 2vw, 26px)', color: 'rgba(255,255,255,0.88)', margin: '0 0 10px' }}>Gamified Simulations</h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(13px, 1.1vw, 15px)', lineHeight: 1.7, color: 'rgba(255,255,255,0.60)', margin: 0 }}>Engage with quizzes, challenges, and real-world finance scenarios that turn learning into active, hands-on experience.</p>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </section>

      {/* ── S7: The Screens ───────────────────────────────────────────────── */}
      <section
        ref={s7Ref}
        style={{
          background: 'var(--bg-darker)',
          padding: 'clamp(64px, 10vh, 80px) clamp(32px, 5vw, 80px)',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <span style={{ ...eyebrowStyle, color: 'rgba(255,255,255,0.58)', marginBottom: 20, display: 'block' }}>
            The Product
          </span>
          <h2
            ref={s7HeadRef}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 5vw, 72px)',
              color: 'rgba(255,255,255,0.88)', lineHeight: 0.92,
              margin: '0 0 48px', opacity: 0,
            }}
          >
            Every screen earns your trust.
          </h2>

          {/* Row 1 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isCompact ? '1fr 1fr' : 'repeat(3, 1fr)',
            gap: 14, marginBottom: 14,
          }}>
            {[
              { src: MEDIA.login,    cap: 'Login'    },
              { src: MEDIA.pretest,  cap: 'Pre-test' },
              { src: MEDIA.homepage, cap: 'Home'     },
            ].map(({ src, cap }, i) => (
              <div key={cap} ref={setS7Img(i)} style={{ opacity: 0 }}>
                <div style={{
                  overflow: 'hidden', borderRadius: 12,
                  border: '1px solid rgba(255,255,255,0.06)',
                  background: 'rgba(255,255,255,0.03)',
                }}>
                  <img src={src} alt={cap} style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: 10,
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.3)', textAlign: 'center', marginTop: 12,
                }}>
                  {cap}
                </p>
              </div>
            ))}
          </div>

          {/* Row 2 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isCompact ? '1fr 1fr' : 'repeat(3, 1fr)',
            gap: 14, marginBottom: 14,
          }}>
            {[
              { src: MEDIA.learn,   cap: 'Learn'   },
              { src: MEDIA.apply,   cap: 'Apply'   },
              { src: MEDIA.experts, cap: 'Experts' },
            ].map(({ src, cap }, i) => (
              <div key={cap} ref={setS7Img(i + 3)} style={{ opacity: 0 }}>
                <div style={{
                  overflow: 'hidden', borderRadius: 12,
                  border: '1px solid rgba(255,255,255,0.06)',
                  background: 'rgba(255,255,255,0.03)',
                }}>
                  <img
                    src={src} alt={cap}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: 10,
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.3)', textAlign: 'center', marginTop: 12,
                }}>
                  {cap}
                </p>
              </div>
            ))}
          </div>

          {/* Row 3 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isCompact ? '1fr 1fr' : 'repeat(3, 1fr)',
            gap: 14,
          }}>
            {[
              { src: MEDIA.cashCompass, cap: 'Cash Compass' },
              { src: MEDIA.summary,     cap: 'Summary'      },
              { src: MEDIA.profile,     cap: 'Profile'      },
            ].map(({ src, cap }, i) => (
              <div key={cap} ref={setS7Img(i + 6)} style={{ opacity: 0 }}>
                <div style={{
                  overflow: 'hidden', borderRadius: 12,
                  border: '1px solid rgba(255,255,255,0.06)',
                  background: 'rgba(255,255,255,0.03)',
                }}>
                  <img
                    src={src} alt={cap}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: 10,
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.3)', textAlign: 'center', marginTop: 12,
                }}>
                  {cap}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S8: Cash Compass ──────────────────────────────────────────────── */}
      <section
        ref={s8Ref}
        style={{
          background: 'var(--bg-warm)',
          padding: 'clamp(64px, 10vh, 80px) clamp(32px, 5vw, 80px)',
        }}
      >
        <div style={{
          display: isCompact ? 'block' : 'grid',
          gridTemplateColumns: isCompact ? undefined : '1fr 1fr',
          gap: isCompact ? undefined : 'clamp(40px, 6vw, 96px)',
          maxWidth: 1100, margin: '0 auto',
          alignItems: 'center',
        }}>
          {/* Left */}
          <div>
            <span
              ref={setS8Left(0)}
              style={{ ...eyebrowStyle, color: 'rgba(16,12,28,0.55)', marginBottom: 24, opacity: 0 }}
            >
              The Financial Tool
            </span>
            <h2
              ref={setS8Left(1)}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(40px, 6vw, 80px)',
                color: '#100c1c', lineHeight: 0.92,
                margin: 0, opacity: 0,
              }}
            >
              Theory into practice.
            </h2>
            <p
              ref={setS8Left(2)}
              style={{ ...bodyStyle, color: 'rgba(16,12,28,0.6)', marginTop: 24, opacity: 0 }}
            >
              Cash Compass is the built-in budgeting and savings tracker. It integrates with fold.money for real transaction data, or lets users input estimates manually. Weekly and monthly summaries, average spending breakdowns, and progress visualization turn abstract financial concepts into tangible daily habits. Users set savings goals with images and deadlines — a gift for mom, a new car, an SIP investment — and watch their money jar fill up stitch by stitch. Market insights curated to their risk appetite and skill level sit alongside the tracker, connecting what they learn in courses to what they see in the real world.
            </p>
          </div>

          {/* Right: cashCompass image */}
          <div
            ref={s8ImgRef}
            style={{
              paddingTop: isCompact ? 48 : 0,
              display: 'flex', justifyContent: 'center',
              opacity: 0,
            }}
          >
            <div style={{
              aspectRatio: '9/16', overflow: 'hidden', borderRadius: 6,
              maxWidth: 320, width: '100%',
            }}>
              <img
                src={MEDIA.tool}
                alt="Smart Financial Tools"
                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── S9: Validation ────────────────────────────────────────────────── */}
      <section
        ref={s9Ref}
        style={{
          background: 'var(--bg-dark)',
          borderTop: '0.5px solid rgba(255,255,255,0.07)',
          padding: 'clamp(64px, 10vh, 80px) clamp(32px, 5vw, 80px)',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <span style={{ ...eyebrowStyle, color: 'rgba(255,255,255,0.58)', marginBottom: 20, display: 'block' }}>
            Did It Work
          </span>
          <h2
            ref={s9HeadRef}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 5vw, 72px)',
              color: 'rgba(255,255,255,0.88)', lineHeight: 0.92,
              margin: '0 0 48px', opacity: 0,
            }}
          >
            4 users. Honest answers.
          </h2>

          <div style={{
            display: isCompact ? 'block' : 'grid',
            gridTemplateColumns: isCompact ? undefined : '1fr 1fr',
            gap: isCompact ? undefined : 'clamp(24px, 3vw, 48px)',
          }}>
            {[
              { text: "The screens don\u2019t look intimidating, which is a surprise because finance itself is.",                                                                                                                                   attribution: 'Participant 4 · Female, 24' },
              { text: 'Personally, a tool like this would be very helpful to me \u2014 I would use it.',                                                                                                                                           attribution: 'Participant 2 · Male, 22'   },
              { text: "I don\u2019t think I would feel dumb using it \u2014 the language used looks very deliberate. Asking me if I\u2019m a beginner and redirecting me to the homepage would make me feel comfortable.",                                    attribution: 'Participant 1 · Male, 19'   },
              { text: 'I think the navigations put in the app are very intuitive.',                                                                                                                                                            attribution: 'Participant 1 · Male, 19'   },
            ].map(({ text, attribution }, i) => (
              <div
                key={i}
                ref={setS9Quote(i)}
                style={{
                  borderLeft: '2px solid rgba(255,255,255,0.12)',
                  paddingLeft: 24,
                  marginBottom: 36,
                  opacity: 0,
                }}
              >
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(16px, 1.4vw, 20px)',
                  lineHeight: 1.75,
                  color: 'rgba(255,255,255,0.7)',
                  fontStyle: 'italic',
                  margin: 0,
                }}>
                  "{text}"
                </p>
                <span style={{
                  fontFamily: 'var(--font-body)', fontSize: 11,
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.3)',
                  display: 'block', marginTop: 12,
                }}>
                  {attribution}
                </span>
              </div>
            ))}
          </div>

          <div
            ref={s9StatsRef}
            style={{ borderTop: '0.5px solid rgba(255,255,255,0.07)', marginTop: 24, opacity: 0 }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: isCompact ? '24px 32px' : 48 }}>
              {[
                { value: '4',     label: 'usability test participants' },
                { value: '18–24', label: 'age range tested'           },
              ].map(({ value, label }) => (
                <div key={label} style={{ paddingTop: 24 }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(28px, 3.5vw, 52px)',
                    color: '#ffffff', lineHeight: 0.9,
                    display: 'block',
                  }}>
                    {value}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.55)',
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

      {/* ── S9b: What We Learned ─────────────────────────────────────────── */}
      <section
        ref={sLearnRef}
        style={{
          background: 'var(--bg-warm)',
          borderTop: '0.5px solid rgba(16,12,28,0.08)',
          padding: 'clamp(64px, 10vh, 80px) clamp(32px, 5vw, 80px)',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <span
            ref={setLearnEle(0)}
            style={{ ...eyebrowStyle, color: 'rgba(16,12,28,0.55)', marginBottom: 24, opacity: 0 }}
          >
            What We Learned
          </span>
          <h2
            ref={setLearnEle(1)}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 5vw, 68px)',
              color: '#100c1c', lineHeight: 0.92, letterSpacing: '0.01em',
              margin: '0 0 48px', opacity: 0,
            }}
          >
            Four tests. Clear patterns.
          </h2>

          <div style={{
            display: isCompact ? 'block' : 'grid',
            gridTemplateColumns: isCompact ? undefined : '1fr 1fr',
            gap: isCompact ? undefined : 'clamp(40px, 6vw, 96px)',
            alignItems: 'start',
          }}>
            {/* Left: body */}
            <p
              ref={setLearnEle(2)}
              style={{ ...bodyStyle, color: 'rgba(16,12,28,0.6)', opacity: 0 }}
            >
              Participants completed core tasks without guidance — onboarding, finding a lesson, checking goals, navigating the dashboard. The navigation was intuitive. The language registered as friendly rather than intimidating. The main friction point was the pre-test flow — users wanted to skip it and explore freely before committing to an assessment.
            </p>

            {/* Right: finding rows */}
            <div style={{ paddingTop: isCompact ? 40 : 0 }}>
              {[
                { label: 'Navigation',   value: 'Completed without guidance' },
                { label: 'Language',     value: 'Friendly, not intimidating' },
                { label: 'Friction point', value: 'Pre-test felt like a barrier' },
              ].map(({ label, value }, i) => (
                <div
                  key={label}
                  ref={setLearnEle(i + 3)}
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                    gap: 24,
                    paddingTop: 20, paddingBottom: 20,
                    borderBottom: '0.5px solid rgba(16,12,28,0.07)',
                    borderTop: i === 0 ? '0.5px solid rgba(16,12,28,0.07)' : 'none',
                    opacity: 0,
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-body)', fontSize: 11,
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: 'rgba(16,12,28,0.50)', flexShrink: 0,
                  }}>
                    {label}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(18px, 2vw, 28px)',
                    color: '#100c1c',
                    textAlign: 'right',
                  }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── S10: Future Scope ─────────────────────────────────────────────── */}
      <section
        ref={s10Ref}
        style={{
          background: 'var(--bg-warm)',
          borderTop: '0.5px solid rgba(16,12,28,0.08)',
          padding: 'clamp(64px, 10vh, 80px) clamp(32px, 5vw, 80px)',
        }}
      >
        <div style={{
          display: isCompact ? 'block' : 'grid',
          gridTemplateColumns: isCompact ? undefined : '1fr 1fr',
          gap: isCompact ? undefined : 'clamp(40px, 6vw, 96px)',
          maxWidth: 1100, margin: '0 auto',
          alignItems: 'start',
        }}>
          {/* Left */}
          <div>
            <span
              ref={setS10Left(0)}
              style={{ ...eyebrowStyle, color: 'rgba(16,12,28,0.55)', marginBottom: 24, opacity: 0 }}
            >
              What Comes Next
            </span>
            <h2
              ref={setS10Left(1)}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(40px, 6vw, 80px)',
                color: '#100c1c', lineHeight: 0.92,
                margin: 0, opacity: 0,
              }}
            >
              From prototype to product.
            </h2>
            <p
              ref={setS10Left(2)}
              style={{ ...bodyStyle, color: 'rgba(16,12,28,0.6)', marginTop: 24, opacity: 0 }}
            >
              The current prototype validates the concept — users feel comfortable, the navigation is intuitive, and the language doesn't intimidate. The next phase is building a production-ready version with a mature design system like Able or Material, running structured usability tests at scale, and bringing in expert perspectives from financial advisors. The goal: a one-stop platform where any young adult in India can go from financially anxious to financially confident.
            </p>
          </div>

          {/* Right: numbered items */}
          <div style={{ paddingTop: isCompact ? 40 : 0 }}>
            {[
              { num: '01', value: 'Production design system and refined UI'    },
              { num: '02', value: 'Structured usability testing at scale'       },
              { num: '03', value: 'Expert financial advisor consultations'      },
            ].map(({ num, value }, i) => (
              <div
                key={num}
                ref={setS10Right(i)}
                style={{
                  borderBottom: '0.5px solid rgba(16,12,28,0.08)',
                  padding: '20px 0',
                  opacity: 0,
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-body)', fontSize: 10,
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: 'rgba(16,12,28,0.45)', display: 'block', marginBottom: 6,
                }}>
                  {num}
                </span>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(22px, 3vw, 36px)',
                  color: '#100c1c',
                }}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer quote */}
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div
            ref={s10FooterRef}
            style={{ borderTop: '0.5px solid rgba(16,12,28,0.1)', marginTop: 48, opacity: 0 }}
          >
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14, lineHeight: 1.8,
              fontStyle: 'italic',
              color: 'rgba(16,12,28,0.55)',
              marginTop: 32, maxWidth: 680,
            }}>
              Financial literacy isn't a feature. It's a fundamental right. The gap exists not because young adults don't care — but because no one built the bridge between curiosity and confidence. Urushya is that bridge.
            </p>
          </div>
        </div>
      </section>

      <NextProjectLink
        nextTitle="Biometric Particles"
        nextHref="/work/biometric-particles"
        nextAccent="#bfe3ff"
      />

      {/* ── S11: Closing Statements ───────────────────────────────────────── */}
      <CaseStudyClosing
        sectionRef={s11Ref}
        lineRefs={s11LineRefs}
        statements={[
          'Curiosity is not the problem.',
          'The bridge was missing.',
          'Urushya is that bridge.',
        ]}
        links={[
          { label: '← All work', href: '/#work' },
          { label: 'Get in touch →', href: '#contact' },
        ]}
      />

    </main>
  )
}
