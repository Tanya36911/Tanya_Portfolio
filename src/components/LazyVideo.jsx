import { useRef, useEffect } from 'react'

/**
 * Lazy video: preload="none", plays only when ≥30% visible, pauses when off-screen.
 * Props mirror <video> attributes. Pass `videoRef` to share the ref with GSAP.
 */
export default function LazyVideo({ src, poster, style, className, loop, muted, playsInline, videoRef: externalRef }) {
  const internalRef = useRef(null)

  const setRef = (el) => {
    internalRef.current = el
    if (typeof externalRef === 'function') externalRef(el)
    else if (externalRef && 'current' in externalRef) externalRef.current = el
  }

  useEffect(() => {
    const video = internalRef.current
    if (!video) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [src])

  return (
    <video
      ref={setRef}
      src={src}
      poster={poster}
      preload="none"
      muted={muted !== false}
      loop={loop !== false}
      playsInline={playsInline !== false}
      style={style}
      className={className}
    />
  )
}
