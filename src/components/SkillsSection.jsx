import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const GROUPS = [
  {
    label: 'Skills',
    items: [
      'Creative Coding',
      'Interaction Design',
      'Physical Computing',
      'Generative Art & Systems',
      'Frontend Development',
      'AI-Generated Visuals & Video',
      'Fine Arts & Fabrication',
      'Data Visualization',
      '3D Design & Space',
    ],
  },
  {
    label: 'Tools',
    items: [
      'Python',
      'JavaScript',
      'React',
      'Three.js',
      'P5.js',
      'Arduino',
      'TouchDesigner',
      'GSAP',
      'C++',
    ],
  },
  {
    label: 'Software',
    items: [
      'Figma',
      'Blender',
      'Godot',
      'TouchDesigner',
      'Adobe Suite',
      'GitHub',
    ],
  },
]

export default function SkillsSection() {
  const sectionRef  = useRef(null)
  const headingRef  = useRef(null)
  const groupRefs   = useRef([])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {

      // Heading clip reveal
      gsap.fromTo(
        headingRef.current,
        { clipPath: 'inset(0% 0% 100% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end:   'top 40%',
            scrub: 1.6,
          },
        }
      )

      // Each group fades up in stagger
      groupRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
            },
            delay: i * 0.1,
          }
        )
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="skills"
      style={{
        background:  '#15161b',
        padding:     'clamp(60px, 8vw, 100px) clamp(24px, 8vw, 120px)',
        position:    'relative',
        zIndex:      2,
      }}
    >
      {/* Hero image */}
      <div style={{
        width:        '100%',
        height:       '60vh',
        marginBottom: 'clamp(48px, 6vw, 80px)',
        borderRadius: 12,
        overflow:     'hidden',
      }}>
        <img
          src="/videos/skills.JPG"
          alt="Skills"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 65%', display: 'block' }}
        />
      </div>

      {/* Heading */}
      <div style={{ overflow: 'hidden', marginBottom: 'clamp(40px, 6vw, 72px)' }}>
        <h2
          ref={headingRef}
          style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(52px, 8vw, 120px)',
            fontWeight:    400,
            lineHeight:    0.9,
            letterSpacing: '0.02em',
            color:         'rgba(255,255,255,0.92)',
            textTransform: 'uppercase',
            margin:        0,
          }}
        >
          Skills
        </h2>
      </div>

      {/* Groups */}
      <div
        style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap:                 'clamp(36px, 4vw, 60px)',
        }}
      >
        {GROUPS.map((group, gi) => (
          <div
            key={group.label}
            ref={el => { groupRefs.current[gi] = el }}
            style={{ opacity: 0 }}
          >
            {/* Group label */}
            <p
              style={{
                fontFamily:    'var(--font-body)',
                fontSize:      10,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color:         'rgba(255,255,255,0.55)',
                margin:        '0 0 20px',
              }}
            >
              {group.label}
            </p>

            {/* Divider */}
            <div style={{
              width:        '100%',
              height:       1,
              background:   'rgba(255,255,255,0.1)',
              marginBottom: 24,
            }} />

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {group.items.map((item, ii) => (
                <span
                  key={item}
                  style={{
                    fontFamily:      'var(--font-body)',
                    fontSize:        11,
                    letterSpacing:   '0.08em',
                    color:           'rgba(255,255,255,0.75)',
                    border:          '1px solid transparent',
                    background:      `linear-gradient(rgba(255,255,255,0.04), rgba(255,255,255,0.04)) padding-box,
                                      linear-gradient(90deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.18) 100%) border-box`,
                    backgroundSize:  'auto, 200% auto',
                    animation:       `holoShift ${5 + ii * 0.3}s ease ${ii * 0.2}s infinite`,
                    borderRadius:    999,
                    padding:         '7px 16px',
                    display:         'inline-flex',
                    alignItems:      'center',
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
