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
// MEDIA — swap filenames here once assets are ready.
// Put all files in public/images/thermal/
// =============================================================================
const BASE = '/images/thermal/'
const MEDIA = {
  heroVideo:          '/videos/thermalSkin/hero.mp4',
  heroImage:          BASE + 'thermal_hero.jpg',
  ventilationDiagram: '/videos/thermalSkin/ventilation.jpg',
  logoProcess:        '/videos/thermalSkin/logo.jpg',
  logo2:              '/videos/thermalSkin/logo2.jpg',
  logo3:              '/videos/thermalSkin/logo3.jpg',
  glass:              '/videos/thermalSkin/glass.png',
  material:           '/videos/thermalSkin/material.png',
  holes:              '/videos/thermalSkin/holes.mp4',
  award:              '/videos/thermalSkin/Awards.JPG',
  envisionOfficial:   '/videos/thermalSkin/envision_official.jpg',
  envision:           '/videos/thermalSkin/envision.jpg',
  working:            '/videos/thermalSkin/working.jpg',
  pitch:              '/videos/thermalSkin/pitch.jpg',
  s2Video:            '/videos/thermalSkin/1.mp4',
  websiteVideo:       '/videos/thermalSkin/2.mp4',
  ven:                '/videos/thermalSkin/ven.jpg',
}
// =============================================================================


export default function ThermalSkinCaseStudy() {
  const pageRef = useRef(null)
  const [loaded, setLoaded]       = useState(false)
  const [isCompact, setIsCompact] = useState(false)

  const backLinkRef  = useRef(null)
  const heroRef      = useRef(null)
  const heroTitleRef = useRef(null)
  const heroSubRef   = useRef(null)
  const metaRef      = useRef(null)

  const saRef       = useRef(null)
  const saLeftRefs  = useRef([])
  const saRightRefs = useRef([])

  const s2Ref      = useRef(null)
  const s2LeftRefs = useRef([])

  const sbCircleRef  = useRef(null)
  const thermalVideoRefs = useRef([])

  const s3Ref       = useRef(null)
  const s3EyebrowRef = useRef(null)
  const s3HeadRef   = useRef(null)
  const s3BodyRefs  = useRef([])


  const s5Ref       = useRef(null)
  const s5LeftRef   = useRef(null)
  const s5RightRefs = useRef([])

  const s6Ref     = useRef(null)
  const s6ImgRef  = useRef(null)
  const s6HeadRef = useRef(null)
  const s6CapRef  = useRef(null)

  const s7Ref      = useRef(null)
  const s7LineRefs = useRef([])

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

  useEffect(() => {
    const videos = thermalVideoRefs.current.filter(Boolean)
    if (!videos.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target
          if (!(video instanceof HTMLVideoElement)) return

          if (entry.isIntersecting) {
            const playPromise = video.play()
            if (playPromise?.catch) playPromise.catch(() => {})
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.3 }
    )

    videos.forEach((video) => observer.observe(video))

    return () => {
      observer.disconnect()
      videos.forEach((video) => video.pause())
    }
  }, [isCompact])

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

      // SA: contest context
      gsap.fromTo(
        saLeftRefs.current.filter(Boolean),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.12,
          scrollTrigger: { trigger: saRef.current, start: 'top 75%' } }
      )
      gsap.fromTo(
        saRightRefs.current.filter(Boolean),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.12,
          scrollTrigger: { trigger: saRef.current, start: 'top 70%' } }
      )


      // S2: left column stagger (headline, body, stats row)
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
      // S3: body rows stagger
      const s3Els = s3BodyRefs.current.filter(Boolean)
      gsap.fromTo(s3Els, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.1,
        scrollTrigger: { trigger: s3Ref.current, start: 'top 60%' },
      })

      // S5: stagger left + right
      const s5Els = [s5LeftRef.current, ...s5RightRefs.current].filter(Boolean)
      gsap.fromTo(s5Els, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.1,
        scrollTrigger: { trigger: s5Ref.current, start: 'top 75%' },
      })

      // S6: award image clips in from bottom
      gsap.fromTo(
        s6ImgRef.current,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power3.out',
          scrollTrigger: { trigger: s6Ref.current, start: 'top 75%', end: 'top 20%', scrub: 1.6 } }
      )
      gsap.fromTo(s6HeadRef.current, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: s6HeadRef.current, start: 'top 85%' },
      })
      gsap.fromTo(s6CapRef.current, { opacity: 0 }, {
        opacity: 1, duration: 0.8,
        scrollTrigger: { trigger: s6CapRef.current, start: 'top 85%' },
      })

      // S7: statement lines clip reveal with stagger
      s7LineRefs.current.filter(Boolean).forEach((el, i) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power3.out',
            delay: i * 0.18,
            scrollTrigger: { trigger: s7Ref.current, start: 'top 75%' } }
        )
      })

    }, pageRef)

    return () => ctx.revert()
  }, [isCompact])

  // ── circle slideshow — circular clip-path reveal ──────────────────────────
  useEffect(() => {
    if (!loaded || isCompact || !sbCircleRef.current) return
    const slides = Array.from(sbCircleRef.current.querySelectorAll('[data-slide]'))
    if (!slides.length) return
    const N = slides.length

    // All slides fully opaque; use clip-path to control visibility
    // Slide 0 starts revealed; rest start clipped to nothing
    gsap.set(slides, { opacity: 1, clipPath: 'circle(0% at 50% 50%)', zIndex: 0 })
    gsap.set(slides[0], { clipPath: 'circle(80% at 50% 50%)', zIndex: 1 })

    const tl = gsap.timeline({ repeat: -1 })
    slides.forEach((_, i) => {
      const curr = slides[i]
      const next = slides[(i + 1) % N]
      const t = i * 3.4 + 2.6

      // Always force next to absolute top z so DOM order never matters (fixes 4→1 wrap)
      tl.set(next, { zIndex: 20 }, t)
      tl.to(next, { clipPath: 'circle(80% at 50% 50%)', duration: 0.9, ease: 'power2.inOut' }, t)
      // Once covered: hide curr, normalise z-indexes
      tl.set(curr, { clipPath: 'circle(0% at 50% 50%)', zIndex: 0 }, t + 0.9)
      tl.set(next, { zIndex: 1 }, t + 0.9)
    })

    return () => tl.kill()
  }, [loaded, isCompact])

  const setSaLeft  = (i) => (el) => { saLeftRefs.current[i]  = el }
  const setSaRight = (i) => (el) => { saRightRefs.current[i] = el }
  const setS2Left  = (i) => (el) => { s2LeftRefs.current[i] = el }

const setS3Body  = (i) => (el) => { s3BodyRefs.current[i]  = el }
  const setS5Right = (i) => (el) => { s5RightRefs.current[i] = el }
  const setS7Line  = (i) => (el) => { s7LineRefs.current[i]  = el }
  const setThermalVideoRef = (i) => (el) => { thermalVideoRefs.current[i] = el }

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
        title="Thermal Skin"
        subtitle="Hackathon · 2nd Place · Radical Simplicity Theme"
        media={{ type: 'video', src: MEDIA.heroVideo, poster: MEDIA.heroImage }}
        gradient="linear-gradient(180deg, rgba(14,15,20,0.3) 0%, rgba(14,15,20,0.72) 100%)"
      />

      <ProjectMeta
        sectionRef={metaRef}
        role="Research, Design, Website Development"
        team={['Sneha Manu Jacob', 'Anusha Nair', 'Abhinav R']}
        timeline="24 hours"
        tools={['Figma', 'Netlify', 'Web development']}
        context="ENVISION 2026 — SIGCHI Designathon at MAHE"
        status="2nd Place"
      />

      {/* ── SA + SB: Merged — Contest Context → What We Built ────────────── */}
      <div style={{ position: 'relative' }}>

        {/* Decorative semicircle — collapses on scroll as rows enter */}
        {!isCompact && (
          <div
            ref={sbCircleRef}
            aria-hidden="true"
            style={{
              position: 'absolute',
              right: -220, top: 'calc(50vh - 380px)',
              width: 760, height: 760,
              pointerEvents: 'none',
              zIndex: 2,
            }}
          >
            {/* Visible circle — slideshow with image bg + visible text */}
            <div style={{
              position: 'absolute', inset: 0,
              borderRadius: '50%',
              border: '0.5px solid rgba(255,255,255,0.12)',
              overflow: 'hidden',
              background: 'var(--bg-dark)',
            }}>
              {[
                { num: '01', label: 'Research deck',   desc: 'VOC data, HVAC market analysis, Indian climate case studies', tag: 'Research',     img: MEDIA.working,      video: null                },
                { num: '02', label: 'Live website',    desc: 'thermal-skin.netlify.app, built and deployed within 24 hrs',  tag: 'Live',         img: null,               video: MEDIA.websiteVideo  },
                { num: '03', label: 'Visual identity', desc: 'Logo from scratch, brand system applied across all outputs',  tag: 'Branding',     img: MEDIA.logo3,        video: null                },
                { num: '04', label: 'Full pitch',      desc: '10 min presentation + 5 min Q&A with judges',                 tag: 'Presentation', img: MEDIA.pitch,        video: null                },
              ].map(({ num, label, desc, tag, img, video }) => (
                <div
                  key={num}
                  data-slide
                  style={{ position: 'absolute', inset: 0 }}
                >
                  {/* Image or video bg */}
                  {video
                    ? <video ref={setThermalVideoRef(0)} src={video} muted loop playsInline preload="none" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <img src={img} alt={label} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  }
                  {/* Dark overlay so text reads clearly */}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(14,15,20,0.82) 0%, rgba(14,15,20,0.55) 100%)' }} />
                  {/* Text */}
                  <div style={{
                    position: 'relative',
                    width: '100%', height: '100%',
                    display: 'flex', flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '60px 250px 60px 64px',
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 100, color: '#ffffff',
                      lineHeight: 1, display: 'block', letterSpacing: '0.01em',
                    }}>
                      {num}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 16, letterSpacing: '0.03em',
                      color: '#ffffff',
                      display: 'block', marginTop: 14, lineHeight: 1.3,
                    }}>
                      {label}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 12, color: 'rgba(255,255,255,0.6)',
                      display: 'block', marginTop: 8, lineHeight: 1.45,
                    }}>
                      {desc}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.55)',
                      border: '0.5px solid rgba(255,255,255,0.3)',
                      borderRadius: 999, padding: '4px 12px',
                      display: 'inline-block', marginTop: 16,
                    }}>
                      {tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Arc markers — 1 2 3 4 along the visible right edge */}
            {[
              { label: '1', top: 110, left: 533 },
              { label: '2', top: 278, left: 539 },
              { label: '3', top: 446, left: 539 },
              { label: '4', top: 614, left: 533 },
            ].map(({ label, top, left }) => (
              <span
                key={label}
                style={{
                  position: 'absolute', top, left,
                  fontFamily: 'var(--font-body)',
                  fontSize: 9, letterSpacing: '0.14em',
                  color: 'rgba(255,255,255,0.50)',
                  lineHeight: 1,
                }}
              >
                {label}
              </span>
            ))}
          </div>
        )}

      {/* ── SA: Contest Context ───────────────────────────────────────────── */}
      <section
        ref={saRef}
        style={{
          position: 'relative', overflow: 'hidden',
          minHeight: isCompact ? 'auto' : '100vh',
          padding: 'clamp(64px, 10vh, 80px) clamp(32px, 5vw, 80px)',
          borderTop: '0.5px solid rgba(255,255,255,0.07)',
          background: 'var(--bg-dark)',
          display: 'flex', alignItems: 'center',
        }}
      >
        <div style={{
          position: 'relative',
          maxWidth: isCompact ? '100%' : 600,
        }}>
          <h2
            ref={setSaLeft(0)}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(40px, 6vw, 80px)',
              color: 'rgba(255,255,255,0.88)',
              lineHeight: 0.92, letterSpacing: '0.01em',
              margin: 0, opacity: 0,
            }}
          >
            What we accomplished.
          </h2>
          <p
            ref={setSaLeft(1)}
            style={{ ...smallBodyStyle, color: 'rgba(255,255,255,0.55)', marginTop: 24, maxWidth: isCompact ? '100%' : 480, opacity: 0 }}
          >
            ENVISION 2026 — SIGCHI's designathon at MAHE Bengaluru Campus. Teams had 24 hours to define a speculative problem, build a concept, produce a pitch deck, create a working prototype or website, and present to judges. No mentors in the final round.
          </p>

          {/* Stats row — below body text */}
          <div ref={setSaRight(0)} style={{
            display: 'flex', flexWrap: 'wrap', gap: isCompact ? '24px 32px' : 48,
            marginTop: 48, paddingTop: 32,
            borderTop: '0.5px solid rgba(255,255,255,0.10)',
            opacity: 0,
          }}>
            {[
              { value: '24 hrs', label: 'to build everything'      },
              { value: '43',     label: 'competing teams'          },
              { value: '8',      label: 'institutions represented' },
            ].map(({ value, label }) => (
              <div key={label} style={{ flex: '0 0 auto' }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 3.5vw, 52px)',
                  color: '#ffffff', lineHeight: 0.9,
                  display: 'block', letterSpacing: '0.01em',
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

          {/* Mobile-only deliverables list (circle is hidden on mobile) */}
          {isCompact && (
            <div style={{ marginTop: 48 }}>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.50)', display: 'block', marginBottom: 16,
              }}>
                What we built
              </span>
              {[
                { num: '01', label: 'Research deck',   tag: 'Research'     },
                { num: '02', label: 'Live website',    tag: 'Live'         },
                { num: '03', label: 'Visual identity', tag: 'Branding'     },
                { num: '04', label: 'Full pitch',      tag: 'Presentation' },
              ].map(({ num, label, tag }) => (
                <div key={num} style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: '18px 0',
                  borderTop: '0.5px solid rgba(255,255,255,0.07)',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 28, color: '#ffffff', lineHeight: 1, flexShrink: 0,
                  }}>
                    {num}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 14, color: 'rgba(255,255,255,0.75)', flex: 1, lineHeight: 1.4,
                  }}>
                    {label}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.55)',
                    border: '0.5px solid rgba(255,255,255,0.15)',
                    borderRadius: 999, padding: '3px 10px', flexShrink: 0,
                  }}>
                    {tag}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── S2: The Problem ───────────────────────────────────────────────── */}
      <section
        ref={s2Ref}
        style={{
          background: 'var(--bg-dark)',
          borderTop: '0.5px solid rgba(255,255,255,0.07)',
          display: 'grid',
          gridTemplateColumns: isCompact ? '1fr' : '1fr 1fr',
          gridTemplateRows: isCompact ? 'auto' : '80vh',
        }}
      >
        {/* Left: looping video — natural ratio, pinned to bottom */}
        <div
          style={{
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            overflow: 'hidden',
            order: isCompact ? 1 : 0,
            minHeight: isCompact ? '60vw' : 0,
          }}
        >
          <video
            ref={setThermalVideoRef(1)}
            src={MEDIA.s2Video}
            muted
            loop
            playsInline
            preload="none"
            loading="lazy"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        {/* Right: headline + body + stats row */}
        <div style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: 'clamp(48px, 6vw, 88px)',
          borderLeft: isCompact ? 'none' : '0.5px solid rgba(255,255,255,0.07)',
          order: isCompact ? 0 : 1,
        }}>
          <h2
            ref={setS2Left(0)}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(44px, 7vw, 100px)',
              color: 'rgba(255,255,255,0.9)',
              lineHeight: 0.92, letterSpacing: '0.01em',
              margin: 0, opacity: 0,
            }}
          >
            A moment everyone knows.
          </h2>
          <p
            ref={setS2Left(1)}
            style={{ ...smallBodyStyle, color: 'rgba(255,255,255,0.55)', marginTop: 28, opacity: 0 }}
          >
            Cars heat up when parked. Air stays trapped. Returning becomes uncomfortable and unsafe. This discomfort is treated as normal.
          </p>

          {/* Stats row — ₹15K / Zero / 70-95% */}
          <div
            ref={setS2Left(2)}
            style={{
              display: 'flex', marginTop: 40,
              borderTop: '0.5px solid rgba(255,255,255,0.07)',
              opacity: 0,
            }}
          >
            {[
              { value: '~₹15K',  label: 'cost to implement' },
              { value: 'Zero',   label: 'power required'    },
              { value: '70–95%', label: 'VOC reduction'     },
            ].map(({ value, label }, i) => (
              <div
                key={label}
                style={{
                  flex: 1,
                  paddingTop: 24, paddingBottom: 24,
                  paddingLeft: i > 0 ? 20 : 0,
                  paddingRight: i < 2 ? 20 : 0,
                  borderRight: i < 2 ? '0.5px solid rgba(255,255,255,0.07)' : 'none',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(22px, 2.5vw, 36px)',
                  color: '#ffffff', lineHeight: 0.9,
                  display: 'block', letterSpacing: '0.01em',
                }}>
                  {value}
                </span>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.58)',
                  display: 'block', marginTop: 8,
                }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      </div>{/* ── end SA wrapper ── */}

      {/* ── S3: The Concept ───────────────────────────────────────────────── */}
      <section
        ref={s3Ref}
        style={{
          background: 'var(--bg-warm)',
          padding: 'clamp(64px, 10vh, 80px) clamp(32px, 5vw, 80px)',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <span
            ref={s3EyebrowRef}
            style={{ ...eyebrowStyle, color: 'rgba(16,12,28,0.55)', marginBottom: 24, opacity: 0 }}
          >
            The Concept
          </span>

          {/* Headline — clip reveal */}
          <div style={{ overflow: 'hidden', marginBottom: 48 }}>
            <h2
              ref={s3HeadRef}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(40px, 6.5vw, 88px)',
                color: '#100c1c',
                lineHeight: 0.92, letterSpacing: '0.01em',
                margin: 0, maxWidth: '18ch',
              }}
            >
              Not a feature. An envelope.
            </h2>
          </div>

          {/* Collage — glass / material / holes */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isCompact ? '1fr 1fr' : '1fr 1fr 1fr',
            gridTemplateRows: isCompact ? 'auto auto' : undefined,
            gap: 8,
            marginBottom: 48,
          }}>
            {/* glass */}
            <div style={{ borderRadius: 6, overflow: 'hidden', aspectRatio: '4/3', background: '#e0ddd5' }}>
              <img src={MEDIA.glass} alt="IR-reflective glass"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            {/* material */}
            <div style={{ borderRadius: 6, overflow: 'hidden', aspectRatio: '4/3', background: '#e0ddd5' }}>
              <img src={MEDIA.material} alt="Low-VOC interior material"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            {/* holes / ventilation — video, spans remaining column on mobile */}
            <div style={{
              borderRadius: 6, overflow: 'hidden', aspectRatio: '4/3', background: '#1a1a24',
              gridColumn: isCompact ? '1 / -1' : undefined,
            }}>
              <video ref={setThermalVideoRef(2)} src={MEDIA.holes} muted loop playsInline preload="none" loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>

          {/* Two-column body */}
          <div style={{
            display: isCompact ? 'block' : 'grid',
            gridTemplateColumns: isCompact ? undefined : '1fr 1fr',
            gap: isCompact ? undefined : 'clamp(40px, 6vw, 96px)',
            alignItems: 'start',
          }}>
            {/* Left: prose */}
            <p
              ref={setS3Body(0)}
              style={{ ...bodyStyle, color: 'rgba(16,12,28,0.6)', opacity: 0 }}
            >
              A passive system that slows heat entry, avoids heat absorption, and releases what does enter — all while the car is parked. No controls. No sensors. No power.
            </p>

            {/* Right: three component rows */}
            <div style={{ paddingTop: isCompact ? 40 : 0 }}>
              {[
                { label: 'Glass',       desc: 'Slows heat entry — infrared-reflective laminated automotive glass, regulation safe.' },
                { label: 'Material',    desc: 'Avoids absorption — low-VOC replacements for dashboard, trim, and headliner.' },
                { label: 'Ventilation', desc: 'Releases what enters — passive stack roof vents built into roof rails and shark fin housing.' },
              ].map(({ label, desc }, i) => (
                <div
                  key={label}
                  ref={setS3Body(i + 1)}
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

        {/* ven.jpg — full width at bottom of S3 */}
        <div style={{ marginTop: 64, marginLeft: 'calc(-1 * clamp(32px, 5vw, 80px))', marginRight: 'calc(-1 * clamp(32px, 5vw, 80px))', overflow: 'hidden' }}>
          <img
            src={MEDIA.ven}
            alt="Ventilation diagram"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
      </section>

      {/* ── S5: Logo Design ───────────────────────────────────────────────── */}
      <section
        ref={s5Ref}
        style={{
          background: 'var(--bg-warm)',
          padding: 'clamp(64px, 10vh, 80px) clamp(32px, 5vw, 80px)',
        }}
      >
        <div style={{
          display: isCompact ? 'block' : 'grid',
          gridTemplateColumns: isCompact ? undefined : '1fr 1fr',
          maxWidth: 1100, margin: '0 auto',
          gap: isCompact ? undefined : 'clamp(40px, 6vw, 80px)',
          alignItems: 'start',
        }}>
          {/* Left: logo2 on top, logoProcess below */}
          <div ref={s5LeftRef} style={{ display: 'flex', flexDirection: 'column', gap: 12, opacity: 0 }}>
            <img
              src={MEDIA.logo2}
              alt="Logo design system"
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 6 }}
            />
            <img
              src={MEDIA.logoProcess}
              alt="Thermal Skin logo process"
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 6 }}
            />
          </div>

          {/* Right: text — sticky so it stays in view while images scroll */}
          <div style={{
            paddingTop: isCompact ? 32 : 0,
            position: isCompact ? 'static' : 'sticky',
            top: isCompact ? undefined : '30vh',
          }}>
            <span ref={setS5Right(0)} style={{ ...eyebrowStyle, color: 'rgba(16,12,28,0.55)', marginBottom: 16, opacity: 0 }}>
              The thinking
            </span>
            <h2
              ref={setS5Right(1)}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 3.5vw, 48px)',
                color: '#100c1c', lineHeight: 0.92,
                margin: '0 0 24px', letterSpacing: '0.01em', opacity: 0,
              }}
            >
              Sun. Cooling. Escape.
            </h2>
            <p ref={setS5Right(2)} style={{ ...bodyStyle, color: 'rgba(16,12,28,0.6)', opacity: 0 }}>
              The orange sun rises — hot air always finds a higher level of elevation. The blue arrow represents cooling, airflow rising up. Together the outline forms an asterisk — the symbol for a footnote, a caveat, a condition. Thermal Skin is the asterisk on every hot parked car.
            </p>
          </div>
        </div>
      </section>

      {/* ── S6: Recognition ───────────────────────────────────────────────── */}
      <section
        ref={s6Ref}
        style={{
          background: 'var(--bg-dark)',
          padding: 'clamp(64px, 10vh, 96px) clamp(32px, 5vw, 80px)',
          borderTop: '0.5px solid rgba(255,255,255,0.07)',
        }}
      >
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          display: isCompact ? 'block' : 'grid',
          gridTemplateColumns: isCompact ? undefined : '1fr 1fr',
          gap: 'clamp(48px, 6vw, 80px)',
          alignItems: 'center',
        }}>
          {/* Left: envision.jpg styled as an Instagram post card */}
          <div
            ref={s6ImgRef}
            style={{
              borderRadius: 16,
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.10)',
              background: '#1a1a24',
              maxWidth: isCompact ? '100%' : 420,
            }}
          >
            {/* Fake IG header */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 14px',
              borderBottom: '0.5px solid rgba(255,255,255,0.07)',
            }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.02em' }}>
                envision.mahe
              </span>
            </div>
            <img
              src={MEDIA.envision}
              alt="ENVISION official announcement"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
            <div style={{ padding: '10px 14px 14px' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.04em' }}>
                View on Instagram ↗
              </span>
            </div>
          </div>

          {/* Right: 2nd Place text */}
          <div style={{ paddingTop: isCompact ? 40 : 0 }}>
            <span style={{ ...eyebrowStyle, color: 'rgba(255,255,255,0.58)', marginBottom: 20, display: 'block' }}>
              Recognition
            </span>
            <h2
              ref={s6HeadRef}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(48px, 7vw, 96px)',
                color: 'rgba(255,255,255,0.9)',
                lineHeight: 0.88, margin: '0 0 24px',
                letterSpacing: '0.01em', opacity: 0,
              }}
            >
              2nd Place.
            </h2>
            <p
              ref={s6CapRef}
              style={{
                fontFamily: 'var(--font-body)', fontSize: 12,
                letterSpacing: '0.16em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.55)', lineHeight: 1.8,
                margin: 0, opacity: 0,
              }}
            >
              Hackathon · Radical Simplicity Theme<br />
              Team: Tanya Justin, Sneha Manu Jacob,<br />
              Anusha Nair, Abhinav R
            </p>
          </div>
        </div>
      </section>

      <NextProjectLink
        nextTitle="Morpho"
        nextHref="/work/morpho"
        nextAccent="#d8d0ff"
      />

      {/* ── S7: Statements + live link ────────────────────────────────────── */}
      <CaseStudyClosing
        sectionRef={s7Ref}
        lineRefs={s7LineRefs}
        statements={[
          'Comfort without anticipation.',
          'Safety without interaction.',
          'Cooling without energy.',
        ]}
        links={[
          { label: '← All work', href: '/#work' },
          { label: 'Visit live site →', href: 'https://thermal-skin.netlify.app/', external: true },
        ]}
      />

    </main>
  )
}
