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
// MEDIA — edit this object to swap any image or video on the page.
// All files should be inside  public/videos/installation/
// Just change the filename string. Use null to leave a slot empty/hidden.
// =============================================================================
const BASE = '/videos/installation/'
const MEDIA = {
  // S1 · Full-bleed hero video (autoplays on load)
  heroVideo:        BASE + 'hero_scrapgarden_loop.mp4',
  // S1 · Poster shown while hero video loads — export one frame as a JPG
  heroVideoPoster:  BASE + 'hero_scrapgarden_poster.jpg',

  // S4 · Origin image on the left column ("Where it started")
  originImage: BASE + 'origin.jpg',

  // S5 · Process videos in the horizontal reel (add/remove entries as needed)
  processVideos: [
    BASE + 'process/IMG_1369.mp4',
    BASE + 'process/IMG_1380.mp4',
    BASE + 'process/IMG_1389.mp4',
    BASE + 'process/IMG_1422.mp4',
    BASE + 'process/IMG_1437.mp4',
    BASE + 'process/b507cfd9-0299-4c84-b9a1-12774b8a8e63.mp4',
  ],

  // S6 · Images for the 3D carousel ("The Interaction")
  interactionImages: [
    BASE + 'interaction/33f8e178-6aa7-4fd7-8bf2-9c5eaaa04100.JPG',
    BASE + 'interaction/494f2bf4-6ab7-4c08-8b85-12d3e09eda2f.JPG',
    BASE + 'interaction/5af94c87-8c86-4ff0-89d2-68019a1e169e.JPG',
  ],

  // S7 · Full-bleed documentation video
  finalVideo: BASE + 'final.mp4',
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
// Carousel3D — full-bleed crossfade carousel
// ---------------------------------------------------------------------------
function Carousel3D({ items }) {
  const [active, setActive] = useState(0)
  const n = items.length

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % n), 3000)
    return () => clearInterval(id)
  }, [n])

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#0d0e14' }}>
      {items.map((src, i) => (
        <div
          key={src}
          style={{
            position: 'absolute', inset: 0,
            opacity: i === active ? 1 : 0,
            transition: 'opacity 0.9s ease',
            cursor: 'pointer',
          }}
          onClick={() => setActive((i + 1) % n)}
        >
          <img
            src={src}
            alt={`Interaction ${i + 1}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      ))}

      {/* Dot navigation */}
      <div style={{
        position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: 8, zIndex: 2,
      }}>
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              width: i === active ? 22 : 6, height: 6,
              borderRadius: 3,
              background: i === active ? '#fff' : 'rgba(255,255,255,0.28)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'all 0.35s ease',
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// InstallationCaseStudy — Scrap Garden case study page
// ---------------------------------------------------------------------------
export default function InstallationCaseStudy() {
  const pageRef      = useRef(null)
  const [loaded, setLoaded]       = useState(false)
  const [isCompact, setIsCompact] = useState(false)

  const heroRef      = useRef(null)
  const backLinkRef  = useRef(null)
  const heroTitleRef = useRef(null)
  const heroSubRef   = useRef(null)
  const metaRef      = useRef(null)

  const s2Ref        = useRef(null)
  const s2HeadRef    = useRef(null)
  const s2CounterRef = useRef(null)

  const s3Ref        = useRef(null)
  const s3EyebrowRef = useRef(null)
  const s3TextRefs   = useRef([])

  const s4Ref       = useRef(null)
  const s4Img1Ref   = useRef(null)
  const s4RightRefs = useRef([])

  const s5Ref        = useRef(null)
  const s5EyebrowRef = useRef(null)
  const s5RowRef     = useRef(null)
  const s5CapRef     = useRef(null)
  const s5VideoRefs  = useRef([])

  const s6Ref      = useRef(null)
  const s6VidRef   = useRef(null)
  const s6LeftRefs = useRef([])

  const s7Ref       = useRef(null)
  const s7HeadRef   = useRef(null)
  const s7ImgRef    = useRef(null)
  const s7CapRef    = useRef(null)

  const s8Ref        = useRef(null)
  const s8EyebrowRef = useRef(null)
  const s8Para1Ref   = useRef(null)
  const s8Para2Ref   = useRef(null)
  const s8Para3Ref   = useRef(null)
  const s8ClosingRef = useRef(null)

  const s9Ref        = useRef(null)
  const s9LineRefs   = useRef([])

  // ── mobile breakpoint ────────────────────────────────────────────────────
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

  // ── loaded flag ──────────────────────────────────────────────────────────
  useEffect(() => { setLoaded(true) }, [])

  useEffect(() => {
    const videos = s5VideoRefs.current.filter(Boolean)
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

  // ── hero entrance ────────────────────────────────────────────────────────
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

  // ── scroll animations ────────────────────────────────────────────────────
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

      // Section 2: chapter counter
      gsap.fromTo(
        s2CounterRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: 'power2.out',
          scrollTrigger: { trigger: s2Ref.current, start: 'top 85%' } }
      )

      // Section 2: headline clip reveal — parent has overflow:hidden
      gsap.fromTo(
        s2HeadRef.current,
        { clipPath: 'inset(0% 0% 100% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'power3.out',
          scrollTrigger: { trigger: s2Ref.current, start: 'top 60%', end: 'bottom 40%', scrub: 1.6 },
        }
      )

      // Section 3: eyebrow + paragraphs stagger
      const s3Els = [s3EyebrowRef.current, ...s3TextRefs.current].filter(Boolean)
      gsap.fromTo(
        s3Els,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.1,
          scrollTrigger: { trigger: s3Ref.current, start: 'top 80%' },
        }
      )

      // Section 4: origin image reveal
      gsap.fromTo(
        s4Img1Ref.current,
        { clipPath: 'inset(0% 100% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'power2.out',
          scrollTrigger: { trigger: s4Ref.current, start: 'top 75%', end: 'top 15%', scrub: 1.8 },
        }
      )

      // Section 4: right column stagger
      const s4RightEls = s4RightRefs.current.filter(Boolean)
      gsap.fromTo(
        s4RightEls,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.1,
          scrollTrigger: { trigger: s4Ref.current, start: 'top 80%' },
        }
      )

      // Section 5: eyebrow
      gsap.fromTo(
        s5EyebrowRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: s5Ref.current, start: 'top 80%' },
        }
      )

      // Section 5: horizontal scroll (desktop only)
      if (!isCompact && s5RowRef.current) {
        gsap.to(s5RowRef.current, {
          x: () => -(s5RowRef.current.scrollWidth - window.innerWidth + 160),
          ease: 'none',
          scrollTrigger: {
            trigger: s5Ref.current,
            start: 'top top',
            end: '+=150%',
            pin: true,
            anticipatePin: 1,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })
      }

      // Section 5: materials caption
      gsap.fromTo(
        s5CapRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, scrollTrigger: { trigger: s5CapRef.current, start: 'top 85%' } }
      )

      // Section 6: text elements stagger
      const s6LeftEls = s6LeftRefs.current.filter(Boolean)
      gsap.fromTo(
        s6LeftEls,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.1,
          scrollTrigger: { trigger: s6Ref.current, start: 'top 60%' },
        }
      )

      // Section 7: "Installed." headline clip reveal
      if (s7HeadRef.current) {
        gsap.fromTo(
          s7HeadRef.current,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: 'power3.out',
            scrollTrigger: { trigger: s7Ref.current, start: 'top 75%', end: 'top 20%', scrub: 1.6 },
          }
        )
      }

      // Section 7: caption
      gsap.fromTo(
        s7CapRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, scrollTrigger: { trigger: s7CapRef.current, start: 'top 85%' } }
      )

      // Section 8: eyebrow
      gsap.fromTo(
        s8EyebrowRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: s8Ref.current, start: 'top 80%' },
        }
      )

      // Section 8: word-by-word reveals
      ;[s8Para1Ref, s8Para2Ref, s8Para3Ref].forEach((ref) => {
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

      // Section 8: closing credit
      gsap.fromTo(
        s8ClosingRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, scrollTrigger: { trigger: s8ClosingRef.current, start: 'top 85%' } }
      )

      s9LineRefs.current.filter(Boolean).forEach((el, i) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: 'power3.out',
            delay: i * 0.18,
            scrollTrigger: { trigger: s9Ref.current, start: 'top 75%' },
          }
        )
      })

    }, pageRef)

    return () => ctx.revert()
  }, [isCompact])

  const setS3Ref = (i) => (el) => { s3TextRefs.current[i]  = el }
  const setS4Ref = (i) => (el) => { s4RightRefs.current[i] = el }
  const setS6Ref = (i) => (el) => { s6LeftRefs.current[i]  = el }
  const setS5VideoRef = (i) => (el) => { s5VideoRefs.current[i] = el }

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
        title="Scrap Garden"
        subtitle="Interactive Installation · Scrap Materials · Arduino · Srishti Manipal · 2025"
        media={{ type: 'video', src: MEDIA.heroVideo, poster: MEDIA.heroVideoPoster }}
        sectionBg="#0d0e14"
      />

      <ProjectMeta
        sectionRef={metaRef}
        role="Concept, Interaction Design, Arduino Programming"
        team={['Nibedita Behera', 'Vrisha', 'Sahana']}
        timeline="2 weeks"
        tools={['Arduino Uno', 'LED clusters', 'Joystick module', 'Scrap materials']}
        context="Art for the 99% — Srishti Manipal"
        status="Installed"
      />

      {/* ── S2: Pull-quote — padding-based, dark background ──────────────── */}
      <section
        ref={s2Ref}
        style={{
          background: 'var(--bg-dark)',
          padding: 'clamp(80px, 12vh, 120px) clamp(24px, 5vw, 80px) clamp(64px, 8vh, 80px)',
          position: 'relative',
          borderTop: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {/* Chapter marker — top right */}
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
          I — Scrap Garden
        </span>

        {/* Thin rule above headline */}
        <hr style={{ border: 'none', borderTop: '0.5px solid rgba(255,255,255,0.1)', margin: '0 0 clamp(32px, 5vh, 48px)' }} />

        {/* Headline with clip-reveal */}
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
            Art made from<br />what was already there.
          </h2>
        </div>
      </section>

      {/* ── S3: The Brief — left-aligned, warm background ─────────────────── */}
      <section
        ref={s3Ref}
        style={{
          background: 'var(--bg-warm)',
          padding: '64px 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '0 clamp(24px, 5vw, 80px)', maxWidth: 680 }}>
          <span
            ref={s3EyebrowRef}
            style={{ ...eyebrowStyle, marginBottom: 20, opacity: 0 }}
          >
            The Brief
          </span>
          <p
            ref={setS3Ref(0)}
            style={{ ...bodyStyle, opacity: 0 }}
          >
            Art for the 99% — a course at Srishti Manipal asking us to create public art from entirely discarded and found materials. The only condition: make something anyone could walk up to and experience without being told how.
          </p>
          <p
            ref={setS3Ref(1)}
            style={{ ...smallBodyStyle, marginTop: 32, opacity: 0 }}
          >
            Concept and interaction design: Tanya Justin. Arduino programming and lighting system: Tanya Justin. Fabrication: collaborative with Nibedita Behera, Vrisha, and Sahana.
          </p>
        </div>
      </section>

      {/* ── S4: Where it started — image left / text right ────────────────── */}
      <section
        ref={s4Ref}
        style={{
          display: 'grid',
          gridTemplateColumns: isCompact ? '1fr' : '1fr 1fr',
          width: '100%',
          minHeight: isCompact ? 'auto' : '55vh',
        }}
      >
        {/* Left: full-bleed image */}
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: isCompact ? '50vh' : 'auto' }}>
          <div
            ref={s4Img1Ref}
            style={{ position: 'relative', flex: 1, overflow: 'hidden', minHeight: isCompact ? '70vh' : '100%' }}
          >
            <img
              src={MEDIA.originImage}
              alt="The first flower"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 25%', display: 'block' }}
            />
            <p style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              fontFamily: 'var(--font-body)', fontSize: 11,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.5)',
              padding: '48px 24px 20px',
              background: 'linear-gradient(transparent, rgba(0,0,0,0.62))',
              margin: 0,
            }}>
              The first flower — made during a free material exercise.
            </p>
          </div>
        </div>

        {/* Right: text — anchored to bottom, section number at top */}
        <div style={{
          background: 'var(--bg-warm)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(48px, 6vw, 80px)',
          borderLeft: isCompact ? 'none' : '1px solid rgba(255,255,255,0.1)',
          position: 'relative',
        }}>
          {/* Section marker */}
          {!isCompact && (
            <span aria-hidden style={{
              position: 'absolute',
              top: 'clamp(24px, 4vh, 48px)',
              left: 'clamp(32px, 5vw, 72px)',
              fontFamily: 'var(--font-body)', fontSize: 10,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.18)',
            }}>
              02
            </span>
          )}

          <div style={{ maxWidth: 480 }}>
            <span ref={setS4Ref(0)} style={{ ...eyebrowStyle, marginBottom: 20, opacity: 0 }}>
              Where it started
            </span>
            <p ref={setS4Ref(1)} style={{ ...bodyStyle, opacity: 0 }}>
              Before there was a brief, there was this. A faculty session — play with metal, there is fabric around, see what happens. I made a flower. Not because I was trying to. Just because that is what the materials wanted to be.
            </p>
            <p ref={setS4Ref(2)} style={{ ...bodyStyle, marginTop: 24, opacity: 0 }}>
              A few days later, walking through the college junkyard looking for scrap, I found a broken street lamp. The housing was the shape of a bud. The stem was already there. The idea was not designed — it was recognised.
            </p>
          </div>
        </div>
      </section>

      {/* ── S5: Process — horizontal video reel ───────────────────────────── */}
      <section
        ref={s5Ref}
        style={{ background: 'var(--bg-darker)', overflow: 'hidden', position: 'relative' }}
      >
        {/* Ghost watermark — behind the reel */}
        <span aria-hidden style={{
          position: 'absolute',
          bottom: 0, right: -10,
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(80px, 18vw, 240px)',
          lineHeight: 0.85,
          color: 'rgba(255,255,255,0.025)',
          userSelect: 'none', pointerEvents: 'none',
          whiteSpace: 'nowrap',
          letterSpacing: '-0.02em',
        }}>
          Making
        </span>

        <div style={{ padding: '40px 0 32px', position: 'relative' }}>
          <p
            ref={s5EyebrowRef}
            style={{
              ...eyebrowStyle, textAlign: 'center',
              color: 'rgba(255,255,255,0.58)', marginBottom: 48, opacity: 0,
            }}
          >
            The Making
          </p>

          <div
            ref={s5RowRef}
            style={{
              display: 'flex',
              flexDirection: isCompact ? 'column' : 'row',
              gap: 20,
              flexWrap: 'nowrap',
              paddingLeft: isCompact ? 'clamp(16px, 4vw, 40px)' : 80,
              paddingRight: isCompact ? 'clamp(16px, 4vw, 40px)' : 80,
            }}
          >
            {MEDIA.processVideos.map((src, idx) => (
              <div
                key={src}
                style={{
                  flexShrink: 0,
                  width: isCompact ? '100%' : 420,
                  height: isCompact ? 380 : 560,
                  borderRadius: 6, overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <video
                  ref={setS5VideoRef(idx)}
                  src={src}
                  muted
                  loop
                  playsInline
                  preload="none"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {/* Frame number */}
                <span style={{
                  position: 'absolute', top: 14, left: 16,
                  fontFamily: 'var(--font-body)', fontSize: 10,
                  letterSpacing: '0.16em',
                  color: 'rgba(255,255,255,0.42)',
                  zIndex: 1,
                }}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Materials caption */}
        <div style={{ padding: '16px 0 40px', textAlign: 'center', position: 'relative' }}>
          <p
            ref={s5CapRef}
            style={{
              fontFamily: 'var(--font-body)', fontSize: 12,
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.58)', opacity: 0, margin: 0,
            }}
          >
            Scrap garment fabric · salvaged street lamp · metal wire · Arduino Uno · LED clusters · joystick module
          </p>
        </div>
      </section>

      {/* ── S6: Interaction — two columns: carousel left, text right ─────── */}
      <section
        ref={s6Ref}
        style={{
          background: '#0d0e14',
          display: isCompact ? 'block' : 'grid',
          gridTemplateColumns: isCompact ? undefined : '1fr 1fr',
          minHeight: isCompact ? 'auto' : '70vh',
        }}
      >
        {/* Left: full-height crossfade carousel */}
        <div
          ref={s6VidRef}
          style={{ height: isCompact ? '60vh' : undefined, minHeight: '70vh', position: 'relative' }}
        >
          <Carousel3D items={MEDIA.interactionImages} />
        </div>

        {/* Right: text column */}
        <div style={{
          background: 'var(--bg-dark)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(40px, 6vh, 80px) clamp(32px, 5vw, 72px)',
          borderLeft: isCompact ? 'none' : '1px solid rgba(255,255,255,0.06)',
        }}>
          <span ref={setS6Ref(0)} style={{ ...eyebrowStyle, marginBottom: 20, opacity: 0, color: 'rgba(255,255,255,0.58)' }}>
            The Interaction
          </span>
          <p ref={setS6Ref(1)} style={{ ...bodyStyle, opacity: 0, color: 'rgba(255,255,255,0.8)' }}>
            A joystick sits at the centre of the installation. Each direction corresponds to a different flower. The Arduino reads the input and triggers the LED cluster inside that flower core.
          </p>
          <p ref={setS6Ref(2)} style={{ ...bodyStyle, marginTop: 24, opacity: 0, color: 'rgba(255,255,255,0.8)' }}>
            No instructions. No screen. No explanation needed. Pick it up, move it, something lights up. That is the entire interface.
          </p>
          <p ref={setS6Ref(3)} style={{ ...smallBodyStyle, marginTop: 24, opacity: 0, color: 'rgba(255,255,255,0.58)' }}>
            I wanted the interaction to feel like discovery, not operation. The joystick is not labelled. The flowers are not numbered. The only way to understand it is to touch it.
          </p>
        </div>
      </section>

      {/* ── S7: Installed — editorial heading, then interactive video ─────── */}
      <section ref={s7Ref} style={{ background: '#000', padding: 'clamp(60px, 10vh, 120px) 0 0' }}>

        {/* Editorial heading */}
        <div style={{
          maxWidth: 960, margin: '0 auto',
          padding: '0 clamp(16px, 4vw, 48px)',
          marginBottom: 40,
        }}>
          <div style={{ overflow: 'hidden' }}>
            <h2
              ref={s7HeadRef}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(48px, 8vw, 112px)',
                color: '#fff',
                lineHeight: 0.9,
                margin: 0,
                letterSpacing: '0.01em',
              }}
            >
              Installed.
            </h2>
          </div>
          <p style={{
            ...eyebrowStyle,
            color: 'rgba(255,255,255,0.50)',
            marginTop: 16,
          }}>
            Srishti Manipal Institute of Art, Design and Technology · 2025
          </p>
        </div>

        {/* Video player */}
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)' }}>
          <video
            ref={s7ImgRef}
            src={MEDIA.finalVideo}
            controls
            playsInline
            style={{ width: '100%', display: 'block', borderRadius: 4 }}
          />
        </div>

        {/* Caption */}
        <div style={{
          maxWidth: 960, margin: '0 auto',
          padding: 'clamp(16px, 2vw, 24px) clamp(16px, 4vw, 48px) clamp(48px, 8vh, 96px)',
        }}>
          <p
            ref={s7CapRef}
            style={{
              fontFamily: 'var(--font-body)', fontSize: 12,
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.60)', opacity: 0, margin: 0,
            }}
          >
            Built in collaboration with Nibedita Behera, Vrisha, and Sahana.
          </p>
        </div>
      </section>

      {/* ── S8: Reflection — word-by-word reveal, ghost quote mark ────────── */}
      <section
        ref={s8Ref}
        style={{ background: 'var(--bg-dark)', borderTop: '0.5px solid rgba(255,255,255,0.08)', padding: 'clamp(80px, 14vh, 160px) 0' }}
      >
        <div style={{
          maxWidth: 620,
          margin: '0 auto',
          padding: '0 clamp(24px, 4vw, 48px)',
          position: 'relative',
        }}>
          {/* Ghost opening quote */}
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
            ref={s8EyebrowRef}
            style={{ ...eyebrowStyle, marginBottom: 48, opacity: 0, color: 'rgba(255,255,255,0.3)' }}
          >
            Reflection
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
            <SplitWords
              paraRef={s8Para1Ref}
              text="The junkyard stopped looking like waste. It started looking like a parts catalogue. Things that already had a shape, already had a purpose they had not found yet."
              style={{ ...bodyStyle, fontSize: 'clamp(18px, 1.8vw, 24px)', color: 'rgba(255,255,255,0.75)' }}
            />
            <SplitWords
              paraRef={s8Para2Ref}
              text="The hardest part was not the Arduino. It was trusting that simple was enough. A joystick. three flowers. One lights up. I kept wanting to add more until I realised the restraint was the design."
              style={{ ...bodyStyle, fontSize: 'clamp(18px, 1.8vw, 24px)', color: 'rgba(255,255,255,0.75)' }}
            />
            <SplitWords
              paraRef={s8Para3Ref}
              text="And watching someone pick up the joystick for the first time, not knowing what it does, moving it slowly, then seeing a flower glow - that is the part you cannot prototype."
              style={{ ...bodyStyle, fontSize: 'clamp(18px, 1.8vw, 24px)', color: 'rgba(255,255,255,0.75)' }}
            />
          </div>

          {/* Closing credit */}
          <p
            ref={s8ClosingRef}
            style={{
              fontFamily: 'var(--font-body)', fontSize: 11,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.2)',
              marginTop: 72, opacity: 0,
            }}
          >
            Scrap Garden · Srishti Manipal · 2025
          </p>

        </div>
      </section>

      <NextProjectLink
        nextTitle="Thermal Skin"
        nextHref="/work/thermal-skin"
        nextAccent="#d7d0ff"
      />

      <CaseStudyClosing
        sectionRef={s9Ref}
        lineRefs={s9LineRefs}
        statements={[
          'Recognised in the discarded.',
          'Designed by restraint.',
          'Understood by touch.',
        ]}
        links={[
          { label: '← All work', href: '/#work' },
        ]}
      />

    </main>
  )
}
