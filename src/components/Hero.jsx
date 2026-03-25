import { useRef, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from './Scene'
import styles from './Hero.module.css'
import { motion, useAnimation, useMotionValue } from 'motion/react'

// ─── Circular Text (inlined) ──────────────────────────────────────────────────
const getRotationTransition = (duration, from) => ({
  from, to: from + 360, ease: 'linear', duration, type: 'tween', repeat: Infinity
})
const getSpinTransition = (duration, from) => ({
  rotate: getRotationTransition(duration, from),
  scale: { type: 'spring', damping: 20, stiffness: 300 }
})

function CircularText({ text, spinDuration = 20, onHover = 'speedUp' }) {
  const letters = Array.from(text)
  const controls = useAnimation()
  const rotation = useMotionValue(0)

  useEffect(() => {
    const start = rotation.get()
    controls.start({ rotate: start + 360, scale: 1, transition: getSpinTransition(spinDuration, start) })
  }, [spinDuration, text, controls, rotation])

  const handleHoverStart = () => {
    const start = rotation.get()
    const map = {
      slowDown:  getSpinTransition(spinDuration * 2,  start),
      speedUp:   getSpinTransition(spinDuration / 4,  start),
      goBonkers: getSpinTransition(spinDuration / 20, start),
    }
    controls.start({ rotate: start + 360, scale: onHover === 'goBonkers' ? 0.8 : 1, transition: map[onHover] ?? getSpinTransition(spinDuration, start) })
  }

  const handleHoverEnd = () => {
    const start = rotation.get()
    controls.start({ rotate: start + 360, scale: 1, transition: getSpinTransition(spinDuration, start) })
  }

  return (
    <motion.div
      className={styles.circularTextRing}
      style={{ rotate: rotation }}
      initial={{ rotate: 0 }}
      animate={controls}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {letters.map((letter, i) => {
        const deg = (360 / letters.length) * i
        const t   = `translate(-50%, -50%) rotate(${deg}deg) translateY(calc(var(--ring-radius) * -1))`
        return <span key={i} className={styles.circularTextSpan} style={{ transform: t }}>{letter}</span>
      })}
    </motion.div>
  )
}

const NAV = ['about', 'work', 'contact']

export default function Hero() {
  const mouseRef   = useRef({ x: 0, y: 0 })
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth)  * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={`${styles.hero} ${loaded ? styles.loaded : ''}`}>
      {/* ── Nav ── */}
      <nav className={styles.nav} aria-label="Main navigation">
        <div className={styles.navLeft}>
          <span className={styles.navBadge}>Portfolio</span>
          <span className={styles.navYear}>©2025</span>
        </div>
        <ul className={styles.navLinks}>
          {NAV.map(item => (
            <li key={item}><a href={`#${item}`} className={styles.navLink}>{item}</a></li>
          ))}
        </ul>
      </nav>

      {/* ── "HELLO IM" — large text behind the 3D letters, like reference ── */}
      <div className={styles.helloText} aria-hidden="true">
        HELLO I&apos;M
      </div>

      {/* ── Three.js canvas ── */}
      <div className={styles.canvasWrap}>
        <Canvas
          shadows
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
          style={{ background: 'transparent' }}
        >
          <Scene mouseRef={mouseRef} />
        </Canvas>
      </div>

      {/* ── Circular text badge — top left like reference ── */}
      <div className={styles.circularBadge}>
        <CircularText
          text="CREATIVE TECHNOLOGIST * "
          onHover="speedUp"
          spinDuration={20}
        />
      </div>

      {/* ── Bottom-right location block ── */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomRight}>
          <p className={styles.location}>Based in</p>
          <p className={styles.locationCity}>Bangalore, India</p>
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <div className={styles.scrollHint}>
        <span className={styles.scrollLine} />
        <span className={styles.scrollText}>scroll</span>
      </div>

      <div className={styles.grain} />
    </div>
  )
}
