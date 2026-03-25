import { useRef, useState, useEffect, useMemo, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import InfoPanel from './Infopanel'
import { PROJECTS } from '../content/siteContent'

// --- Shared loader instance (was being recreated on every texture load) ---
const textureLoader = new THREE.TextureLoader()

const CARD_TILTS     = [-8, 6, -4, 9, -6]
const CARD_X_OFFSETS = [-10, 14, -6, 10, -12]

useGLTF.preload('/models/starcard.glb')

// Returns true for image paths, false for video
const isImageSrc = (src) => /\.(png|jpe?g|webp|avif|gif|svg)$/i.test(src)

// ---------------------------------------------------------------------------
// ScatteredCard — now shows category beneath the title when active
// ---------------------------------------------------------------------------
function ScatteredCard({ project, index, activeIndex, onScrollTo }) {
  const offset    = index - activeIndex
  const absOffset = Math.abs(offset)
  const isActive  = offset === 0
  if (absOffset > 2) return null

  return (
    <motion.div
      onClick={() => onScrollTo(index)}
      animate={{
        y:       offset * 220,
        scale:   isActive ? 1 : absOffset === 1 ? 0.82 : 0.62,
        opacity: isActive ? 1 : absOffset === 1 ? 0.5  : 0.18,
        rotate:  isActive ? CARD_TILTS[index % CARD_TILTS.length] * 0.4 : CARD_TILTS[index % CARD_TILTS.length],
        x:       isActive ? 0 : CARD_X_OFFSETS[index % CARD_X_OFFSETS.length],
      }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        position: 'absolute', width: 155, height: 108, borderRadius: 10, overflow: 'hidden',
        cursor: isActive ? 'default' : 'pointer',
        boxShadow: isActive
          ? `0 0 0 1px ${project.accent}55, 0 0 20px ${project.accent}33, 0 24px 64px var(--shadow)`
          : `0 0 0 1px var(--border), 0 4px 20px var(--shadow)`,
        transformOrigin: 'center center',
        transition: 'box-shadow 0.5s ease',
      }}
    >
      {project.video ? (
        <video
          src={project.video}
          muted loop autoPlay playsInline
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: project.videoFit || 'cover',
            background: project.videoBg || 'transparent',
          }}
        />
      ) : (
        <img src={project.image} alt={project.title}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
      <div style={{
        position: 'absolute', inset: 0,
        background: isActive
          ? `linear-gradient(160deg, ${project.accent}0D, rgba(0,0,0,0.45))`
          : 'rgba(0,0,0,0.62)',
      }} />

      {/* Active top bar uses project accent colour */}
      {isActive && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          backgroundImage: `linear-gradient(90deg, ${project.accent}, var(--violet, #BF5FFF), ${project.accent})`,
          backgroundSize: '200% auto',
          animation: 'holoShift 4s ease infinite',
          zIndex: 2,
        }} />
      )}

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '8px 11px', zIndex: 2 }}>
        <div style={{
          fontFamily: 'var(--font-body)', fontSize: 8, letterSpacing: '0.15em',
          textTransform: 'uppercase', marginBottom: 2,
          color: isActive ? project.accent : 'rgba(240,237,232,0.3)',
        }}>{project.num}</div>
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: 14, lineHeight: 1,
          color: isActive ? '#f0ede8' : 'rgba(240,237,232,0.45)',
        }}>{project.title}</div>
        {/* Category — was defined but never rendered anywhere */}
        {isActive && (
          <div style={{
            fontFamily: 'var(--font-body)', fontSize: 7, letterSpacing: '0.12em',
            textTransform: 'uppercase', marginTop: 3,
            color: 'rgba(240,237,232,0.45)',
          }}>{project.category}</div>
        )}
      </div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// CardGLB — accent-aware glow, shared TextureLoader, dir removed from flip
// ---------------------------------------------------------------------------
function CardGLB({ mediaSrcRef, videoBgRef, videoFitRef, mouseRef, flipStateRef, accentRef }) {
  const groupRef      = useRef(null)
  const mixerRef      = useRef(null)
  const starOrbitRef  = useRef([])
  const ringFloatRef  = useRef(null)
  const { scene, animations } = useGLTF('/models/starcard.glb')

  const { model, screenMat } = useMemo(() => {
    const clone = scene.clone(true)
    let screenMat = null
    let photoMesh = null

    clone.traverse((obj) => {
      if (!obj.isMesh || !obj.material) return
      obj.castShadow    = true
      obj.receiveShadow = true

      if (Array.isArray(obj.material)) {
        const mats = [...obj.material]
        const idx  = mats.findIndex((m) => (m?.name ?? '').toLowerCase() === 'photo')
        if (idx >= 0) {
          photoMesh = obj
          const nextMat = mats[idx]?.clone?.() ?? new THREE.MeshStandardMaterial()
          nextMat.needsUpdate = true
          mats[idx]    = nextMat
          obj.material = mats
          if (!screenMat) screenMat = nextMat
        }
        return
      }

      if ((obj.material?.name ?? '').toLowerCase() === 'photo') {
        photoMesh = obj
        const nextMat = obj.material?.clone?.() ?? new THREE.MeshStandardMaterial()
        nextMat.needsUpdate = true
        obj.material = nextMat
        if (!screenMat) screenMat = nextMat
      }
    })

    const fitTarget = photoMesh ?? clone
    const box = new THREE.Box3().setFromObject(fitTarget)
    const size = new THREE.Vector3(); const center = new THREE.Vector3()
    box.getSize(size); box.getCenter(center)
    clone.position.sub(center)
    clone.scale.setScalar(2 / Math.max(size.x, size.y, size.z, 0.004))

    return { model: clone, screenMat }
  }, [scene])

  const activeSrcRef    = useRef(null)
  const activeTexRef    = useRef(null)
  const activeVidRef    = useRef(null)
  const activeCanvasRaf = useRef(null)

  // Cleanup canvas RAF + video on unmount
  useEffect(() => () => {
    if (activeCanvasRaf.current) { cancelAnimationFrame(activeCanvasRaf.current); activeCanvasRaf.current = null }
    if (activeVidRef.current)    { activeVidRef.current.pause(); activeVidRef.current = null }
    if (activeTexRef.current)    { activeTexRef.current.dispose(); activeTexRef.current = null }
  }, [])

  // Star orbit setup — guard added: silently skips if GLB has no 'circle*' meshes
  useEffect(() => {
    if (!model) return
    const stars = []
    model.traverse((obj) => {
      const name = (obj.name ?? '').toLowerCase()
      if (!name.startsWith('circle') || name.includes('bezier')) return
      if (stars.some((s) => s.obj === obj)) return
      const i      = stars.length
      const radius = Math.hypot(obj.position.x, obj.position.z)
      const angle  = Math.atan2(obj.position.z, obj.position.x)
      stars.push({ obj, radius: Math.max(0.12, radius), angle, y: obj.position.y, speed: 0.55 + i * 0.12, phase: i * 1.7 })
    })
    starOrbitRef.current = stars
    return () => { starOrbitRef.current = [] }
  }, [model])

  // Ring float setup — guard added: silently skips if GLB has no bezier mesh
  useEffect(() => {
    if (!model) return
    let ring = model.getObjectByName('BézierCircle') ?? model.getObjectByName('BezierCircle')
    if (!ring) model.traverse((obj) => { if (!ring && (obj.name ?? '').toLowerCase().includes('bezier')) ring = obj })
    if (!ring) return // GLB doesn't have this mesh — nothing to do
    ringFloatRef.current = { obj: ring, basePos: ring.position.clone(), baseRot: ring.rotation.clone() }
    return () => { ringFloatRef.current = null }
  }, [model])

  useEffect(() => {
    if (!model || !animations?.length) return
    const mixer = new THREE.AnimationMixer(model)
    animations.forEach((clip) => mixer.clipAction(clip).play())
    mixerRef.current = mixer
    return () => { mixer.stopAllAction(); mixer.uncacheRoot(model); mixerRef.current = null }
  }, [animations, model])

  function loadTexture(src) {
    if (activeCanvasRaf.current) { cancelAnimationFrame(activeCanvasRaf.current); activeCanvasRaf.current = null }
    if (activeTexRef.current) { activeTexRef.current.dispose(); activeTexRef.current = null }
    if (activeVidRef.current) { activeVidRef.current.pause(); activeVidRef.current = null }
    if (!screenMat) return

    if (isImageSrc(src)) {
      const CANVAS_W = 720
      const CANVAS_H = 960
      const canvas   = document.createElement('canvas')
      canvas.width   = CANVAS_W
      canvas.height  = CANVAS_H
      const ctx      = canvas.getContext('2d')
      const img      = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        ctx.fillStyle = '#000000'
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)
        const scale = Math.min(CANVAS_W / img.naturalWidth, CANVAS_H / img.naturalHeight)
        const dw = img.naturalWidth  * scale
        const dh = img.naturalHeight * scale
        const dx = (CANVAS_W - dw) / 2
        const dy = (CANVAS_H - dh) / 2
        ctx.drawImage(img, dx, dy, dw, dh)
        tex.needsUpdate = true
      }
      img.src = src
      const tex = new THREE.CanvasTexture(canvas)
      tex.colorSpace      = THREE.SRGBColorSpace
      tex.flipY           = false
      tex.minFilter       = tex.magFilter = THREE.LinearFilter
      tex.generateMipmaps = false
      screenMat.map         = tex
      screenMat.needsUpdate = true
      activeTexRef.current  = tex
    } else if (videoFitRef?.current === 'contain') {
      // Canvas-based video: contain-fits the video frame with videoBg fill, no stretching
      const CANVAS_W = 720
      const CANVAS_H = 960
      const canvas   = document.createElement('canvas')
      canvas.width   = CANVAS_W
      canvas.height  = CANVAS_H
      const ctx      = canvas.getContext('2d')

      const vid = document.createElement('video')
      Object.assign(vid, { src, crossOrigin: 'anonymous', muted: true, playsInline: true })
      vid.loop = false // managed manually below to ensure reliable restart

      const tryPlay = () => vid.play().catch(() => {})

      const drawFrame = () => {
        const bg = videoBgRef?.current ?? '#000000'
        ctx.fillStyle = bg
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)

        if (vid.readyState >= 2) {
          const vw = vid.videoWidth  || CANVAS_W
          const vh = vid.videoHeight || CANVAS_H
          const scale = Math.min(CANVAS_W / vw, CANVAS_H / vh)
          const dw = vw * scale
          const dh = vh * scale
          const dx = (CANVAS_W - dw) / 2
          const dy = (CANVAS_H - dh) / 2
          ctx.drawImage(vid, dx, dy, dw, dh)
        }

        if (tex) tex.needsUpdate = true
        activeCanvasRaf.current = requestAnimationFrame(drawFrame)
      }

      vid.addEventListener('ended',   tryPlay)
      vid.addEventListener('pause',   () => { if (!vid.ended) tryPlay() })
      vid.addEventListener('stalled', tryPlay)
      vid.addEventListener('canplay', tryPlay)

      const tex = new THREE.CanvasTexture(canvas)
      tex.colorSpace      = THREE.SRGBColorSpace
      tex.flipY           = false
      tex.minFilter       = tex.magFilter = THREE.LinearFilter
      tex.generateMipmaps = false
      screenMat.map         = tex
      screenMat.needsUpdate = true
      activeTexRef.current  = tex
      activeVidRef.current  = vid

      drawFrame()
    } else {
      // Standard video — loop natively, VideoTexture is fine
      const vid = document.createElement('video')
      Object.assign(vid, { src, crossOrigin: 'anonymous', muted: true, loop: true, playsInline: true })
      vid.play().catch(() => {})
      const tex = new THREE.VideoTexture(vid)
      tex.colorSpace        = THREE.SRGBColorSpace
      tex.flipY             = false
      tex.minFilter         = tex.magFilter = THREE.LinearFilter
      tex.generateMipmaps   = false
      screenMat.map         = tex
      screenMat.needsUpdate = true
      activeTexRef.current  = tex
      activeVidRef.current  = vid
    }
  }

  const rotY   = useRef(-0.23)
  const rotX   = useRef(0.13)
  const rotZ   = useRef(-0.06)
  const posY   = useRef(0)
  const scaleV = useRef(1)
  const restY  = useRef(-0.22)

  // dir removed — it was stored but never read
  const flipRef = useRef({ active: false, startY: -0.23, endY: -0.23 + Math.PI * 2, progress: 0, swapped: false })

  useFrame((_, delta) => {
    if (!groupRef.current) return
    if (mixerRef.current) mixerRef.current.update(delta)
    const t = performance.now() / 1000

    for (const star of starOrbitRef.current) {
      const a = star.angle + t * star.speed + star.phase
      star.obj.position.x = Math.cos(a) * star.radius
      star.obj.position.z = Math.sin(a) * star.radius
      star.obj.position.y = star.y + Math.sin(a * 1.7) * 0.01
    }

    if (ringFloatRef.current) {
      const { obj, basePos, baseRot } = ringFloatRef.current
      obj.position.x  = basePos.x + Math.cos(t * 0.48) * 0.06
      obj.position.y  = basePos.y + Math.sin(t * 0.82) * 0.03
      obj.position.z  = basePos.z + Math.sin(t * 0.48) * 0.06
      obj.rotation.x  = baseRot.x + Math.sin(t * 0.7)  * 0.05
      obj.rotation.y  = baseRot.y + Math.cos(t * 0.52) * 0.08
      obj.rotation.z  = baseRot.z + Math.sin(t * 0.44) * 0.05
    }

    const flip = flipRef.current
    const fs   = flipStateRef.current

    if (fs.pending) {
      fs.pending = false
      const cur  = rotY.current
      const norm = ((cur % (Math.PI * 2)) + Math.PI * 3) % (Math.PI * 2) - Math.PI
      flip.active   = true
      flip.startY   = norm
      flip.endY     = norm + Math.PI * 2
      flip.progress = 0
      flip.swapped  = false
      rotY.current  = norm
    }

    if (flip.active) {
      flip.progress = Math.min(1, flip.progress + delta / 0.7)
      const p     = flip.progress
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2
      rotY.current   = flip.startY + (flip.endY - flip.startY) * eased
      const liftCurve = Math.sin(p * Math.PI)
      posY.current    = THREE.MathUtils.lerp(posY.current,   liftCurve * -0.18,        0.2)
      scaleV.current  = THREE.MathUtils.lerp(scaleV.current, 1 - liftCurve * 0.12,     0.2)
      rotZ.current    = THREE.MathUtils.lerp(rotZ.current,   -0.06 + liftCurve * -0.06, 0.15)
      if (!flip.swapped && p >= 0.5) {
        flip.swapped = true
        const src = mediaSrcRef.current
        if (src !== activeSrcRef.current) { activeSrcRef.current = src; loadTexture(src) }
      }
      if (flip.progress >= 1) { flip.active = false; rotY.current = -0.22; restY.current = -0.22 }
    } else {
      const amp = 0.024, mx = mouseRef.current.x, my = mouseRef.current.y
      rotX.current   = THREE.MathUtils.lerp(rotX.current,   0.13 + my * -0.26 + Math.sin(t * 0.52) * amp,            0.05)
      rotY.current   = THREE.MathUtils.lerp(rotY.current,   restY.current + mx * 0.26 + Math.sin(t * 0.35 + 1.1) * amp * 1.4, 0.05)
      rotZ.current   = THREE.MathUtils.lerp(rotZ.current,   -0.06 - mx * 0.028 + Math.sin(t * 0.27 + 0.6) * amp * 0.6,  0.04)
      posY.current   = THREE.MathUtils.lerp(posY.current,   0, 0.08)
      scaleV.current = THREE.MathUtils.lerp(scaleV.current, 1, 0.08)
    }

    groupRef.current.rotation.x = rotX.current
    groupRef.current.rotation.y = rotY.current
    groupRef.current.rotation.z = rotZ.current
    groupRef.current.position.y = posY.current + 0.6
    groupRef.current.scale.setScalar(scaleV.current)

    const src = mediaSrcRef.current
    if (src && src !== activeSrcRef.current && !flip.active) { activeSrcRef.current = src; loadTexture(src) }
  })

  return (
    <group ref={groupRef}>
      <primitive object={model} />
      <mesh position={[0, -0.55, -0.7]} receiveShadow>
        <planeGeometry args={[4.8, 5.6]} />
        <shadowMaterial transparent opacity={0.32} />
      </mesh>
    </group>
  )
}

// ---------------------------------------------------------------------------
// CardShell — glow blobs now use the active project's accent colour
// ---------------------------------------------------------------------------
function CardShell({ mediaSrcRef, videoBgRef, videoFitRef, mouseRef, flipStateRef, accentRef, accent }) {
  return (
    <div style={{ position: 'relative', width: 430, height: 600 }}>
      {/* Dual glow driven by project accent instead of hardcoded cyan/violet */}
      <div style={{
        position: 'absolute', inset: -60, borderRadius: '50%',
        background: `radial-gradient(ellipse at 40% 60%, ${accent}33 0%, transparent 55%),
                     radial-gradient(ellipse at 70% 30%, ${accent}22 0%, transparent 55%)`,
        filter: 'blur(40px)', pointerEvents: 'none', zIndex: 0,
        animation: 'holoPulse 5s ease-in-out infinite',
      }} />

      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{
          position: 'absolute', borderRadius: '50%',
          width: 240 + i * 50, height: 240 + i * 50,
          left: `${8 + i * 11}%`, top: `${14 + i * 10}%`,
          background: `radial-gradient(circle, ${accent}${i % 2 === 0 ? '22' : '18'} 0%, transparent 70%)`,
          filter: 'blur(48px)', opacity: 0.18,
          animation: `workSmokeFloat ${10 + i * 2.2}s ease-in-out ${i * 0.5}s infinite`,
          pointerEvents: 'none', zIndex: 0,
        }} />
      ))}

      <Canvas
        shadows
        camera={{ position: [0, 0, 6.2], fov: 40 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, toneMappingExposure: 1.35 }}
        style={{ position: 'absolute', top: -120, left: -120, width: 820, height: 980, background: 'transparent', pointerEvents: 'none', zIndex: 1 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[2.6, 2.2, 3.2]} intensity={2.2} color="#ffffff" castShadow
          shadow-mapSize-width={2048} shadow-mapSize-height={2048}
          shadow-camera-near={0.1} shadow-camera-far={20}
          shadow-camera-left={-6} shadow-camera-right={6}
          shadow-camera-top={6} shadow-camera-bottom={-6}
          shadow-bias={-0.0003}
        />
        <directionalLight position={[-2.1, -1.8, -2.6]} intensity={1.0} color="#ffffff" />
        <pointLight position={[-1, -0.5, 2]}   intensity={1.25} color="#ffffff" />
        <pointLight position={[1.1, 0.7, 2.5]} intensity={0.95} color="#ffffff" />
        <Environment preset="city" />
        <Suspense fallback={null}>
          <CardGLB mediaSrcRef={mediaSrcRef} videoBgRef={videoBgRef} videoFitRef={videoFitRef} mouseRef={mouseRef} flipStateRef={flipStateRef} />
        </Suspense>
      </Canvas>
    </div>
  )
}

// ---------------------------------------------------------------------------
// MobileWorksSection
// ---------------------------------------------------------------------------
function MobileWorksSection() {
  return (
    <section
      key="mobile-work"
      id="work"
      style={{
        position: 'relative',
        background: 'var(--bg)',
        padding: '28px 0 84px',
      }}
    >

      <div style={{ width: 'min(100%, 760px)', margin: '0 auto', padding: '0 14px 22px' }}>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: 10,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--text-dim)',
          display: 'block',
        }}>
          Selected Works
        </span>
      </div>

      <div style={{ display: 'grid', gap: 18, padding: '0 14px' }}>
        {PROJECTS.map((project) => (
          <article
            key={project.id}
            style={{
              position: 'relative',
              minHeight: '82svh',
              borderRadius: 28,
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'flex-end',
              boxShadow: `0 22px 54px ${project.accent}18`,
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div style={{ position: 'absolute', inset: 0 }}>
              {project.video ? (
                <video
                  src={project.video}
                  muted loop autoPlay playsInline
                  style={{
                    width: '100%', height: '100%',
                    objectFit: project.videoFit || 'cover',
                    objectPosition: 'center',
                    background: project.videoBg || 'transparent',
                  }}
                />
              ) : (
                <img
                  src={project.image}
                  alt={project.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                />
              )}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(
                  180deg,
                  rgba(0,0,0,0.08) 0%,
                  rgba(0,0,0,0.18) 30%,
                  rgba(0,0,0,0.74) 72%,
                  rgba(0,0,0,0.92) 100%
                )`,
              }} />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(ellipse at 50% 100%, ${project.accent}2e 0%, transparent 60%)`,
                pointerEvents: 'none',
              }} />
            </div>

            <div style={{ position: 'relative', zIndex: 1, width: '100%', padding: '0 18px 22px' }}>
              <div style={{
                width: 32,
                height: 2,
                background: project.accent,
                borderRadius: 999,
                marginBottom: 12,
              }} />

              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: 10,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: project.accent,
                marginBottom: 6,
              }}>
                {project.num} — {project.category}
              </div>

              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(40px, 12vw, 68px)',
                lineHeight: 0.9,
                letterSpacing: '0.02em',
                color: '#f4f0eb',
                margin: '0 0 12px',
                textShadow: `0 0 36px ${project.accent}44`,
              }}>
                {project.title}
              </h3>

              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                lineHeight: 1.6,
                color: 'rgba(244,240,235,0.74)',
                margin: '0 0 18px',
                maxWidth: '34ch',
              }}>
                {project.description}
              </p>

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
                {project.tags.map((tag, index) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 9,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: index % 2 === 0 ? project.accent : 'rgba(244,240,235,0.58)',
                      border: `1px solid ${index % 2 === 0 ? `${project.accent}66` : 'rgba(244,240,235,0.18)'}`,
                      borderRadius: 4,
                      padding: '4px 10px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                <a
                  href={project.href ?? '#contact'}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 11,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#f4f0eb',
                    background: project.accent,
                    borderRadius: 999,
                    padding: '11px 24px',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    boxShadow: `0 8px 24px ${project.accent}55`,
                  }}
                >
                  {project.cta ?? 'View Details'}
                </a>
                {project.liveHref ? (
                  <a
                    href={project.liveHref}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 11,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'rgba(244,240,235,0.72)',
                      textDecoration: 'none',
                    }}
                  >
                    Live ↗
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// WorksSection
// ---------------------------------------------------------------------------
export default function WorksSection() {
  const sectionRef  = useRef(null)
  const cardHitRef  = useRef(null)
  const mediaSrcRef = useRef(PROJECTS[0].video ?? PROJECTS[0].image)
  const videoBgRef  = useRef(PROJECTS[0].videoBg ?? '#000000')
  const videoFitRef = useRef(PROJECTS[0].videoFit ?? 'cover')
  const mouseRef    = useRef({ x: 0, y: 0 })
  const activeIdxRef = useRef(0)
  // dir removed — was stored but never read in flip logic
  const flipStateRef = useRef({ pending: false })

  const [activeIndex, setActiveIndex] = useState(0)
  const [scrollFrac,  setScrollFrac]  = useState(0)
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(max-width: 900px)').matches
      : false
  )

  const project = PROJECTS[activeIndex]

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 900px)')
    const onChange = (event) => setIsMobile(event.matches)

    setIsMobile(mediaQuery.matches)

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', onChange)
      return () => mediaQuery.removeEventListener('change', onChange)
    }

    mediaQuery.addListener(onChange)
    return () => mediaQuery.removeListener(onChange)
  }, [])

  useEffect(() => {
    if (isMobile) {
      setScrollFrac(0)
      return undefined
    }

    function onScroll() {
      const section = sectionRef.current
      if (!section) return
      const travel = Math.max(1, section.offsetHeight - window.innerHeight)
      const frac   = Math.max(0, Math.min(1, (window.scrollY - section.offsetTop) / travel))
      setScrollFrac(frac)
      const next = Math.min(PROJECTS.length - 1, Math.round(frac * (PROJECTS.length - 1)))
      if (next === activeIdxRef.current) return
      activeIdxRef.current   = next
      setActiveIndex(next)
      mediaSrcRef.current    = PROJECTS[next].video ?? PROJECTS[next].image
      videoBgRef.current     = PROJECTS[next].videoBg ?? '#000000'
      videoFitRef.current    = PROJECTS[next].videoFit ?? 'cover'
      flipStateRef.current   = { pending: true }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    onScroll()
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  }, [isMobile])

  const scrollToProject = (i) => {
    const s = sectionRef.current
    if (!s) return
    window.scrollTo({ top: s.offsetTop + (i / (PROJECTS.length - 1)) * (s.offsetHeight - window.innerHeight), behavior: 'smooth' })
  }

  const handleMouseMove  = (e) => {
    const el = cardHitRef.current; if (!el) return
    const r  = el.getBoundingClientRect()
    mouseRef.current.x = ((e.clientX - r.left) / r.width  - 0.5) * 2
    mouseRef.current.y = ((e.clientY - r.top)  / r.height - 0.5) * 2
  }
  const handleMouseLeave = () => { mouseRef.current.x = 0; mouseRef.current.y = 0 }

  if (isMobile) return <MobileWorksSection />

  return (
    <section key="desktop-work" ref={sectionRef} id="work" style={{
      position: 'relative',
      height: `${PROJECTS.length * 100}vh`,
      background: 'var(--bg)',
      transition: 'background var(--theme-transition) ease',
    }}>
      <style>{`
        @keyframes workSmokeFloat {
          0%,100% { transform: translateY(0) scale(1); }
          50%      { transform: translateY(-30px) scale(1.06); }
        }
      `}</style>

      <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', display: 'flex', alignItems: 'center', overflow: 'visible' }}>

        {/* Iridescent progress bar */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 20 }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, height: 2,
            width: `${scrollFrac * 100}%`,
            backgroundImage: `linear-gradient(90deg, ${project.accent}, #BF5FFF, ${project.accent})`,
            backgroundSize: '200% auto',
            animation: 'holoShift 4s ease infinite',
            boxShadow: `0 0 8px ${project.accent}55`,
            transition: 'width 0.1s linear',
          }} />
        </div>

        {/* Counter — now also shows active project category */}
        <div style={{ position: 'absolute', top: 40, left: 48, display: 'flex', alignItems: 'center', gap: 14, zIndex: 10 }}>
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.22em',
            textTransform: 'uppercase', color: 'var(--text-dim)',
            transition: 'color var(--theme-transition) ease',
          }}>Selected Works</span>
          <span style={{
            width: 28, height: 1,
            backgroundImage: `linear-gradient(90deg, ${project.accent}, #BF5FFF)`,
            backgroundSize: '200% auto',
            animation: 'holoShift 5s ease infinite',
            display: 'inline-block', opacity: 0.4,
          }} />
          <AnimatePresence mode="wait">
            <motion.span key={activeIndex}
              initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.15em', color: 'var(--text-dim)' }}>
              {String(activeIndex + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
            </motion.span>
          </AnimatePresence>
          {/* Category — was defined on every project but never surfaced in the UI */}
          <AnimatePresence mode="wait">
            <motion.span key={`cat-${activeIndex}`}
              initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 6 }}
              transition={{ duration: 0.3 }}
              style={{
                fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.18em',
                textTransform: 'uppercase', color: project.accent, opacity: 0.75,
              }}>
              {project.category}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* LEFT — scattered card stack */}
        <div style={{ width: 260, flexShrink: 0, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'translateX(-18px)' }}>
          <div style={{ position: 'relative', width: 155, height: 108 }}>
            {PROJECTS.map((p, i) => (
              <ScatteredCard key={p.id} project={p} index={i} activeIndex={activeIndex} onScrollTo={scrollToProject} />
            ))}
          </div>
        </div>

        {/* MIDDLE — 3D card */}
        <div
          ref={cardHitRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ flex: '0 0 640px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'translateX(-30px)' }}
        >
          <CardShell
            mediaSrcRef={mediaSrcRef}
            videoBgRef={videoBgRef}
            videoFitRef={videoFitRef}
            mouseRef={mouseRef}
            flipStateRef={flipStateRef}
            accent={project.accent}
          />
        </div>

        {/* RIGHT — info panel */}
        <div style={{ width: 460, height: '100%', flexShrink: 0, overflow: 'visible', transform: 'translateX(20px)' }}>
          <AnimatePresence mode="wait">
            <motion.div key={activeIndex}
              initial={{ opacity: 0, x: 120, y: 120, rotate: -2 }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
              exit={{ opacity: 0, x: 40, y: -30, rotate: 1.2 }}
              transition={{ duration: 0.72, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ width: '100%', height: '100%', transformOrigin: 'right bottom' }}>
              <InfoPanel project={project} activeIndex={activeIndex} />
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
