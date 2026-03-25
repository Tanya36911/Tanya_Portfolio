import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import {
  ABOUT_MARQUEE_TITLES,
  ABOUT_RIGHT_STORY_LINES,
} from '../content/siteContent'

gsap.registerPlugin(ScrollTrigger)

function StarSeparatorModel() {
  const { scene } = useGLTF('/models/stars.glb')

  const clone = useMemo(() => {
    const next = scene.clone(true)
    next.traverse((child) => {
      if (!child.isMesh) return
      child.castShadow = true
      child.receiveShadow = true

      if (child.material) {
        child.material = child.material.clone()
        child.material.roughness = 0.28
        child.material.metalness = 0.7
        child.material.envMapIntensity = 1.1
      }
    })

    const box = new THREE.Box3().setFromObject(next)
    const size = new THREE.Vector3()
    const center = new THREE.Vector3()
    box.getSize(size)
    box.getCenter(center)
    next.position.sub(center)

    const maxAxis = Math.max(size.x, size.y, size.z, 0.001)
    next.scale.setScalar(2.45 / maxAxis)

    return next
  }, [scene])

  return <primitive object={clone} scale={1.45} position={[0, 0, 0]} rotation={[0.18, -0.28, 0.08]} />
}

function StarSeparator() {
  return (
    <span
      aria-hidden="true"
      style={{
        width: 'clamp(82px, 6.6vw, 132px)',
        height: 'clamp(88px, 7vw, 140px)',
        display: 'inline-flex',
        flex: '0 0 auto',
        verticalAlign: 'middle',
        overflow: 'visible',
      }}
    >
      <Canvas camera={{ position: [0, 0, 6.4], fov: 24 }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.62} />
          <hemisphereLight args={['#f8fbff', '#d5dceb', 0.9]} />
          <directionalLight position={[2.8, 2.2, 5.2]} intensity={1.35} color="#ffffff" />
          <directionalLight position={[-2.6, 1.2, 4.4]} intensity={0.7} color="#e8eefc" />
          <directionalLight position={[0, -2.4, 3.6]} intensity={0.4} color="#cfd8ea" />
          <StarSeparatorModel />
        </Suspense>
      </Canvas>
    </span>
  )
}

useGLTF.preload('/models/stars.glb')

export default function AboutSection() {
  const sectionRef = useRef(null)
  const panelRef = useRef(null)
  const marqueeRef = useRef(null)
  const imageRef = useRef(null)
  const storyRef = useRef(null)

  const rightLineRefs = useRef([])
  const [isCompact, setIsCompact] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 640px)')
    const onChange = (event) => setIsCompact(event.matches)

    setIsCompact(mediaQuery.matches)

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', onChange)
      return () => mediaQuery.removeEventListener('change', onChange)
    }

    mediaQuery.addListener(onChange)
    return () => mediaQuery.removeListener(onChange)
  }, [])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        panelRef.current,
        {
          clipPath: 'inset(12% 14% 12% 14% round 34px 34px 0 0)',
          borderTopLeftRadius: 34,
          borderTopRightRadius: 34,
        },
        {
          clipPath: 'inset(0% 0% 0% 0% round 0px 0px 0 0)',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: panelRef.current,
            start: 'top 95%',
            end: 'top 22%',
            scrub: 1.8,
          },
        }
      )

      let marqueeLoop = null
      ScrollTrigger.create({
        trigger: panelRef.current,
        start: 'top 95%',
        once: true,
        onEnter: () => {
          if (marqueeLoop || !marqueeRef.current) return
          marqueeLoop = gsap.to(marqueeRef.current, {
            xPercent: -50,
            duration: 18,
            ease: 'none',
            repeat: -1,
          })
        },
      })

      gsap.fromTo(
        imageRef.current,
        { clipPath: 'inset(0% 30% 0% 30%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 98%',
            end: 'top 18%',
            scrub: 1.8,
          },
        }
      )

      gsap.fromTo(
        rightLineRefs.current,
        { opacity: 0, y: 18 },
        {
          opacity: 1, y: 0, duration: 0.65, ease: 'power2.out', stagger: 0.1, delay: 0.18,
          scrollTrigger: { trigger: storyRef.current, start: 'top 95%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [isCompact])

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        position: 'relative',
        background: '#15161b',
        overflowX: 'hidden',
        overflowY: 'visible',
      }}
    >
      <div
        ref={panelRef}
        style={{
          background: 'color-mix(in srgb, var(--bg) 90%, white 10%)',
          borderTopLeftRadius: 34,
          borderTopRightRadius: 34,
          minHeight: '130vh',
          padding: '24px 0 88px',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          <div
            ref={marqueeRef}
            style={{
              display: 'inline-flex',
              gap: 32,
              paddingLeft: 24,
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(42px, 7.2vw, 108px)',
              fontWeight: 400,
              lineHeight: 0.9,
              letterSpacing: '0.01em',
              color: '#13141a',
              textTransform: 'uppercase',
            }}
          >
              {[0, 1].map((row) => (
                <span
                  key={row}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.38em' }}
                >
                  {ABOUT_MARQUEE_TITLES.map((title, index) => (
                    <span
                      key={`${row}-${title}`}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.38em' }}
                    >
                      <span>{ABOUT_MARQUEE_TITLES[(index + row) % ABOUT_MARQUEE_TITLES.length]}</span>
                      <StarSeparator />
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>

        {isCompact ? (
          <div
            style={{
              width: '100%',
              margin: '24px auto 0',
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: 24,
            }}
          >
            <div
              style={{
                position: 'relative',
                minHeight: '100svh',
                display: 'grid',
                alignItems: 'end',
              }}
            >
              <div
                ref={imageRef}
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100svh',
                  margin: 0,
                  borderRadius: 0,
                  overflow: 'hidden',
                  background: '#101116',
                  boxShadow: '0 22px 70px rgba(0,0,0,0.16)',
                }}
              >
                <img
                  src="/images/about.jpeg"
                  alt="About visual"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center center',
                  }}
                />

                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(8, 9, 12, 0.08) 0%, rgba(8, 9, 12, 0.26) 38%, rgba(8, 9, 12, 0.82) 100%)',
                  }}
                />

                <div
                  ref={storyRef}
                  style={{
                    position: 'absolute',
                    left: 20,
                    right: 20,
                    bottom: 22,
                    zIndex: 2,
                    maxWidth: '100%',
                  }}
                >
                </div>
              </div>
            </div>

            <div
              style={{
                width: 'min(100%, 780px)',
                margin: '0 auto',
                display: 'grid',
                gap: 24,
                padding: '0 24px',
              }}
            >
              <div
                style={{
                  width: '100%',
                  borderTop: '1px solid rgba(17, 18, 22, 0.22)',
                }}
              />

              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(16px, 1.5vw, 22px)',
                  lineHeight: 1.72,
                  color: 'rgba(17, 18, 22, 0.8)',
                  maxWidth: '48ch',
                }}
              >
                {ABOUT_RIGHT_STORY_LINES.map((line, index) => (
                  <span
                    key={line}
                    ref={(node) => {
                      rightLineRefs.current[index] = node
                    }}
                    style={{ display: 'block', opacity: 0 }}
                  >
                    {line}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              width: 'min(86vw, 1200px)',
              margin: '72px auto 0',
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: 56,
            }}
          >
            <div
              ref={imageRef}
              style={{
                width: '100%',
                aspectRatio: '16 / 9',
                borderRadius: 0,
                overflow: 'hidden',
                background: '#101116',
                boxShadow: '0 22px 70px rgba(0,0,0,0.16)',
              }}
            >
              <img
                src="/images/about.jpeg"
                alt="About visual"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }}
              />
            </div>

            <div
              ref={storyRef}
              style={{ display: 'flex', flexDirection: 'column', gap: 32 }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(15px, 1.5vw, 22px)',
                  lineHeight: 1.72,
                  color: 'rgba(17, 18, 22, 0.8)',
                }}
              >
                {ABOUT_RIGHT_STORY_LINES.map((line, index) => (
                  <span
                    key={line}
                    ref={(node) => { rightLineRefs.current[index] = node }}
                    style={{ display: 'block', opacity: 0 }}
                  >
                    {line}
                  </span>
                ))}
              </div>

              <div style={{ width: '100%', borderTop: '1px solid rgba(17, 18, 22, 0.22)' }} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
