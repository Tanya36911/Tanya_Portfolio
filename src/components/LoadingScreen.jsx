import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

const NUM_SPHERES = 20
const CAM_Z = 600
const BG_COLOR = '#eeecf8'

function lerp(a, b, t) {
  return a + (b - a) * t
}

function createSpheres() {
  return Array.from({ length: NUM_SPHERES }, (_, i) => ({
    id: i - 10,
    explodeVelX: (Math.random() - 0.5) * 40,
    explodeVelY: (Math.random() - 0.5) * 40,
    explodeVelZ: (Math.random() - 0.5) * 40,
    currentX: 0,
    currentY: 0,
    currentZ: 0,
  }))
}

export default function LoadingScreen() {
  const mountRef = useRef(null)
  const windowLoadedRef = useRef(
    typeof document !== 'undefined' ? document.readyState === 'complete' : false
  )
  const glbsLoadedRef = useRef(false)
  const [windowLoaded, setWindowLoaded] = useState(
    typeof document !== 'undefined' ? document.readyState === 'complete' : false
  )
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    if (windowLoaded) return undefined

    const onLoad = () => setWindowLoaded(true)
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [windowLoaded])

  useEffect(() => {
    windowLoadedRef.current = windowLoaded
  }, [windowLoaded])

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return undefined

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(BG_COLOR)

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      5000
    )
    camera.position.z = CAM_Z

    scene.add(new THREE.AmbientLight(0xffffff, 0.42))

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.15)
    keyLight.position.set(-1, 1.2, 1.5).normalize()
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight(0xdfe8ff, 0.5)
    fillLight.position.set(1.2, -0.8, -1).normalize()
    scene.add(fillLight)

    const pointLight = new THREE.PointLight(0x7851ff, 2.0, 900, 2)
    scene.add(pointLight)

    const material = new THREE.MeshPhongMaterial({
      color: 0xf4f4f7,
      specular: 0xffffff,
      shininess: 150,
    })

    const geometry = new THREE.SphereGeometry(25, 32, 32)
    const sphereData = createSpheres()
    const meshes = sphereData.map(() => {
      const mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)
      return mesh
    })

    let phase = 'LOADING'
    let loadTimer = 0
    let convergeTimer = 0
    let explodeScale = 1
    let frameCount = 0
    let mouseX = 0
    let mouseY = 0
    let animationId = 0
    let exitRequested = windowLoadedRef.current && glbsLoadedRef.current
    let disposed = false

    // Fetch all GLBs directly so they land in the browser HTTP cache.
    // When Three.js / drei later request the same URLs they get instant cache
    // hits — no dependency on THREE.DefaultLoadingManager or drei internals.
    const GLB_URLS = [
      '/models/starcard.glb',
      '/models/letter_T.glb',
      '/models/letter_A.glb',
      '/models/letter_N.glb',
      '/models/letter_Y.glb',
      '/models/letter_A2.glb',
    ]
    Promise.all(GLB_URLS.map((url) => fetch(url))).then(() => {
      if (disposed) return
      glbsLoadedRef.current = true
      if (windowLoadedRef.current) requestExit()
    }).catch(() => {
      // If any fetch fails, don't block the loading screen forever
      if (disposed) return
      glbsLoadedRef.current = true
      if (windowLoadedRef.current) requestExit()
    })

    function onMouseMove(event) {
      mouseX = event.clientX - window.innerWidth / 2
      mouseY = -(event.clientY - window.innerHeight / 2)
    }

    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    function requestExit() {
      exitRequested = true

      if (phase === 'LOADING') {
        phase = 'CONVERGING'
        convergeTimer = 0.84
      } else if (phase === 'CONVERGING') {
        convergeTimer = Math.max(convergeTimer, 0.84)
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', onResize)

    function frame() {
      if (disposed) return

      frameCount += 1
      pointLight.position.set(mouseX, mouseY, CAM_Z - 100)

      if (exitRequested && phase === 'LOADING') {
        phase = 'CONVERGING'
        convergeTimer = 0.84
      }

      if (phase === 'LOADING') {
        loadTimer += 1
        const loadingFrames = prefersReducedMotion ? 32 : 140
        if (loadTimer > loadingFrames && glbsLoadedRef.current) phase = 'CONVERGING'
      } else if (phase === 'CONVERGING') {
        convergeTimer = Math.min(convergeTimer + (prefersReducedMotion ? 0.08 : 0.03), 1)
        if (convergeTimer >= 1) phase = 'EXPLODING'
      } else if (phase === 'EXPLODING') {
        explodeScale -= prefersReducedMotion ? 0.05 : 0.028
        if (explodeScale <= 0) {
          setIsHidden(true)
          return
        }
      }

      for (let i = 0; i < sphereData.length; i += 1) {
        const sp = sphereData[i]
        const mesh = meshes[i]

        const targetX = sp.id * 30
        const targetY = Math.sin(frameCount * sp.id * 0.01) * 100

        if (phase === 'LOADING') {
          sp.currentX = targetX
          sp.currentY = targetY
          sp.currentZ = 0
        } else if (phase === 'CONVERGING') {
          sp.currentX = lerp(targetX, 0, convergeTimer)
          sp.currentY = lerp(targetY, 0, convergeTimer)
          sp.currentZ = 0
        } else if (phase === 'EXPLODING') {
          sp.currentX += sp.explodeVelX
          sp.currentY += sp.explodeVelY
          sp.currentZ += sp.explodeVelZ
        }

        mesh.position.set(sp.currentX, sp.currentY, sp.currentZ)
        mesh.scale.setScalar(phase === 'EXPLODING' ? Math.max(explodeScale, 0) : 1)
      }

      renderer.render(scene, camera)
      animationId = window.requestAnimationFrame(frame)
    }

    if (windowLoadedRef.current && glbsLoadedRef.current) requestExit()
    animationId = window.requestAnimationFrame(frame)

    const onLoadComplete = () => {
      windowLoadedRef.current = true  // sync update — don't wait for useEffect
      if (glbsLoadedRef.current) requestExit()
    }
    window.addEventListener('load', onLoadComplete)


    return () => {
      disposed = true
      window.cancelAnimationFrame(animationId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('load', onLoadComplete)

      meshes.forEach((mesh) => scene.remove(mesh))
      geometry.dispose()
      material.dispose()
      renderer.dispose()

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div className={`loading-screen${isHidden ? ' is-hidden' : ''}`} aria-hidden={isHidden}>
      <div ref={mountRef} className="loading-screen__canvas" />
    </div>
  )
}
