import { useRef, Suspense, useEffect, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Environment, PerspectiveCamera, Lightformer, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

// ─── Material factory ─────────────────────────────────────────────────────────
// Each call returns a FRESH instance — never shared between meshes or letters.
function makeMaterial() {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#cfd3da'),
    metalness: 0.92,
    roughness: 0.06,
    iridescence: 0.92,
    iridescenceIOR: 1.8,
    iridescenceThicknessRange: [100, 800],
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    reflectivity: 0.95,
    envMapIntensity: 2.4,
  })
}

// ─── BUG FIX: T/A looked different from N/Y/A2 ───────────────────────────────
// Root cause: the previous code called applyMaterial(gltf.scene) — mutating the
// ORIGINAL cached scene — and then cloned it. useGLTF caches by URL, so T and A
// (first to resolve) had their original scene mutated BEFORE cloning. Any later
// reference to that cached scene (e.g. hot-reload, re-mount) got a pre-mutated
// object. N/Y/A2 loaded later so their originals were untouched at clone time,
// giving consistent results. Different load order = different appearance for T/A.
//
// Fix: clone FIRST, apply material ONLY to the clone. The original gltf.scene
// is never touched. Every letter gets an independent scene graph with fresh
// materials regardless of which model loads first.
function cloneAndApply(scene) {
  const clone = scene.clone(true)   // geometry refs are shared (read-only — safe)
  clone.traverse(child => {
    if (!child.isMesh) return
    child.material      = makeMaterial()
    child.castShadow    = true
    child.receiveShadow = false
  })
  return clone
}

// ─── Letter ───────────────────────────────────────────────────────────────────
function Letter({
  path,
  position,
  mouseRef,
  scrollProgressRef,
  index = 0,
  depthFactor = 1,
  floatDelay = 0,
  modelScale = 0.3,
}) {
  const meshRef       = useRef()
  const floatProgress = useRef(0)
  const hasFloatedIn  = useRef(false)

  const gltf = useGLTF(path)

  const clonedScene = useMemo(() => {
    if (!gltf?.scene) return null
    return cloneAndApply(gltf.scene)
  }, [gltf?.scene])

  useFrame((_, delta) => {
    if (!meshRef.current) return

    if (!hasFloatedIn.current) {
      floatProgress.current += delta * 0.7
      const t = Math.max(0, floatProgress.current - floatDelay)
      if (t > 0) {
        const ease = 1 - Math.pow(1 - Math.min(t, 1), 4)
        meshRef.current.position.x = position[0]
        meshRef.current.position.y = THREE.MathUtils.lerp(position[1] - 5, position[1], ease)
        meshRef.current.position.z = position[2]
        if (t >= 1) hasFloatedIn.current = true
      }
      return
    }

    const scrollT    = scrollProgressRef?.current ?? 0
    const reveal     = THREE.MathUtils.smoothstep(scrollT, 0.04, 0.82)
    const ci         = index - 2
    const targetX    = position[0] + ci * 0.26 * reveal + mouseRef.current.x * 0.28 * depthFactor
    const liftY      = 3.15 * reveal
    const scaleBoost = 1 + reveal * 0.08

    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.03)
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      mouseRef.current.x * 0.12 * depthFactor + ci * 0.09 * reveal,
      0.03
    )
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      -mouseRef.current.y * 0.07 * depthFactor + reveal * 0.08,
      0.03
    )
    meshRef.current.rotation.z = THREE.MathUtils.lerp(
      meshRef.current.rotation.z,
      ci * -0.06 * reveal,
      0.03
    )
    meshRef.current.position.y = position[1] - liftY
    meshRef.current.position.z = THREE.MathUtils.lerp(
      meshRef.current.position.z,
      position[2] - 0.35 * reveal,
      0.03
    )
    meshRef.current.scale.lerp(new THREE.Vector3(scaleBoost, scaleBoost, scaleBoost), 0.05)
  })

  return (
    <group ref={meshRef} position={[position[0], position[1] - 5, position[2]]}>
      {clonedScene ? (
        <primitive object={clonedScene} scale={modelScale} />
      ) : (
        <mesh castShadow>
          <boxGeometry args={[0.5, 0.8, 0.25]} />
          <meshPhysicalMaterial color="#cfd3da" metalness={0.92} roughness={0.06}
            iridescence={0.92} iridescenceIOR={1.8}
            iridescenceThicknessRange={[100, 800]} />
        </mesh>
      )}
    </group>
  )
}

// ─── Shadow catcher plane ─────────────────────────────────────────────────────
// Large transparent plane sitting just behind the letters. Receives shadows
// from the castShadow directional light above, projecting each letter's exact
// silhouette shape onto the background text layer beneath.
function ShadowCatcherPlane() {
  return (
    <mesh receiveShadow position={[0, 0, -0.6]} rotation={[0, 0, 0]}>
      <planeGeometry args={[32, 22]} />
      <shadowMaterial transparent opacity={0.45} color="#000000" />
    </mesh>
  )
}

// ─── Environment ─────────────────────────────────────────────────────────────
function ChromeReflectionEnv({ envGroupRef }) {
  return (
    <Environment background={false} frames={1} resolution={512}>
      <group ref={envGroupRef} rotation={[0, -0.35, 0]}>
        <Lightformer form="ring"  intensity={1.15} color="#ffffff" scale={12}           position={[0, 0, -12]}    target={[0, 0, 0]} />
        <Lightformer form="rect"  intensity={1.35} color="#ffffff" scale={[1.2, 8, 1]}  position={[-5.4, 0.8, -5]} />
        <Lightformer form="rect"  intensity={1.25} color="#ffffff" scale={[1.1, 8.5, 1]} position={[5.6, -0.6, -5]} />
        <Lightformer form="rect"  intensity={0.95} color="#ffffff" scale={[8.8, 1.6, 1]} position={[0, 2.9, -3.8]} />
        <Lightformer form="rect"  intensity={1.0}  color="#ffffff" scale={[8.8, 1.9, 1]} position={[0, -3.0, -3.8]} />
        <Lightformer form="rect"  intensity={1.2}  color="#ffffff" scale={[14, 1.1, 1]}  position={[0.2, -2.4, -4.5]} />
        <Lightformer form="rect"  intensity={0.95} color="#ffffff" scale={[13, 0.75, 1]} position={[-0.6, 2.1, -4.5]} />
        <Lightformer form="rect"  intensity={1.0}  color="#ffffff" scale={[10, 0.55, 1]} position={[1.2, 0.2, -5.5]} />
        <Lightformer form="rect"  intensity={1.05} color="#ffffff" scale={[4.2, 2.2, 1]} position={[-3.2, -2.1, 1.8]} />
        <Lightformer form="rect"  intensity={0.95} color="#ffffff" scale={[3.4, 1.8, 1]} position={[3.6, 2.2, 2.2]} />
        <Lightformer form="rect"  intensity={0.45} color="#ffffff" scale={[28, 16, 1]}   position={[0, 0, -18]} />
        <Lightformer form="rect"  intensity={0.35} color="#ffffff" scale={[26, 14, 1]}   position={[0, 0, 12]} />
      </group>
    </Environment>
  )
}

function RenderExposure() {
  const { gl } = useThree()
  useEffect(() => {
    gl.toneMapping         = THREE.ACESFilmicToneMapping
    gl.toneMappingExposure = 1.35   // higher — stops ACES from crushing warm/bright colours
    // Shadow map is enabled via the `shadows` prop on <Canvas> in Hero.jsx —
    // doing it here in useEffect fires after the first render, causing
    // shadowMaterial to compile its shader before shadows are ready (trim error).
  }, [gl])
  return null
}

function CursorReactiveLights({ mouseRef, warmLightRef, coolLightRef, topFillRef, envGroupRef }) {
  const warmBase   = useMemo(() => new THREE.Color('#ffffff'), [])
  const warmAccent = useMemo(() => new THREE.Color('#d9d9d9'), [])
  const coolBase   = useMemo(() => new THREE.Color('#ffffff'), [])
  const coolAccent = useMemo(() => new THREE.Color('#d9d9d9'), [])
  const fillBase   = useMemo(() => new THREE.Color('#ffffff'), [])
  const fillAccent = useMemo(() => new THREE.Color('#d9d9d9'), [])

  useFrame(() => {
    const x       = mouseRef?.current?.x ?? 0
    const y       = mouseRef?.current?.y ?? 0
    const warmMix = THREE.MathUtils.clamp((x + 1) * 0.5, 0, 1)
    const coolMix = THREE.MathUtils.clamp(1 - warmMix, 0, 1)
    const topMix  = THREE.MathUtils.clamp((y + 1) * 0.5, 0, 1)

    if (warmLightRef.current) {
      warmLightRef.current.color.copy(warmBase).lerp(warmAccent, warmMix)
      warmLightRef.current.intensity   = THREE.MathUtils.lerp(0.45, 0.95, warmMix)
      warmLightRef.current.position.x  = THREE.MathUtils.lerp(warmLightRef.current.position.x, x * 1.2, 0.08)
    }
    if (coolLightRef.current) {
      coolLightRef.current.color.copy(coolBase).lerp(coolAccent, coolMix)
      coolLightRef.current.intensity   = THREE.MathUtils.lerp(0.4, 0.85, coolMix)
      coolLightRef.current.position.x  = THREE.MathUtils.lerp(coolLightRef.current.position.x, -x * 1.1, 0.08)
    }
    if (topFillRef.current) {
      topFillRef.current.color.copy(fillBase).lerp(fillAccent, topMix * 0.75)
      topFillRef.current.intensity = THREE.MathUtils.lerp(0.6, 0.95, topMix)
    }
    if (envGroupRef.current) {
      envGroupRef.current.rotation.y = THREE.MathUtils.lerp(envGroupRef.current.rotation.y, -0.35 + x * 0.22, 0.05)
    }
  })

  return null
}

// ─── Letter config ────────────────────────────────────────────────────────────
const LETTERS = [
  { path: '/models/letter_T.glb',  pos: [-2.05, 0.04, 0],    depth: 1.0, delay: 0.0  },
  { path: '/models/letter_A.glb',  pos: [-0.95, -0.16, 0.1], depth: 0.7, delay: 0.18 },
  { path: '/models/letter_N.glb',  pos: [ 0.15, 0.24, 0],    depth: 1.2, delay: 0.36 },
  { path: '/models/letter_Y.glb',  pos: [ 1.2,  0.14, 0.05], depth: 0.9, delay: 0.54 },
  { path: '/models/letter_A2.glb', pos: [ 2.05, -0.16, 0],   depth: 1.1, delay: 0.72 },
]

const MOBILE_LETTER_POSITIONS = [
  [-0.78, -0.02, 0],
  [-0.32, -0.18, 0.08],
  [0.25, 0.12, 0],
  [0.67, 0.02, 0.04],
  [1.05, -0.07, 0],
]

const TABLET_LETTER_POSITIONS = [
  [-1.72, 0.02, 0],
  [-0.84, -0.16, 0.1],
  [0.08, 0.2, 0],
  [0.98, 0.12, 0.05],
  [1.8, -0.14, 0],
]

LETTERS.forEach(({ path }) => useGLTF.preload(path))

// ─── Scene root ───────────────────────────────────────────────────────────────
function Scene({ mouseRef }) {
  const { size } = useThree()
  const scrollProgressRef = useRef(0)
  const warmPointRef      = useRef(null)
  const coolPointRef      = useRef(null)
  const frontFillRef      = useRef(null)
  const envGroupRef       = useRef(null)
  const isTablet = size.width <= 980
  const isMobile = size.width <= 640
  const cameraZ = isMobile ? 9.2 : isTablet ? 8 : 7
  const letterScale = isMobile ? 0.15 : isTablet ? 0.245 : 0.3
  const sceneYOffset = isMobile ? 0.92 : isTablet ? -0.16 : 0.06
  const shadowWidth = isMobile ? 4.9 : isTablet ? 6.6 : 8
  const shadowHeight = isMobile ? 1.35 : isTablet ? 1.9 : 2.2
  const letterPositions = useMemo(() => {
    if (isMobile) return MOBILE_LETTER_POSITIONS
    if (isTablet) return TABLET_LETTER_POSITIONS
    return LETTERS.map((letter) => letter.pos)
  }, [isMobile, isTablet])

  useEffect(() => {
    const update = () => {
      const dist = Math.max(window.innerHeight * 0.95, 1)
      scrollProgressRef.current = THREE.MathUtils.clamp(window.scrollY / dist, 0, 1)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, isMobile ? 0.1 : 0, cameraZ]} fov={isMobile ? 38 : 42} />
      <RenderExposure />

      <ambientLight intensity={0.16} />
      <hemisphereLight args={['#f0f0f0', '#080b10', 0.22]} />
      <directionalLight position={[5, 5, 5]}   intensity={0.42} color="#ffffff" />
      <directionalLight position={[-5, -2, -3]} intensity={0.34} color="#ffffff" />
      <directionalLight ref={frontFillRef} position={[0, 2, 6]} intensity={0.6} color="#ffffff" />

      {/* Shadow-casting light — zero colour intensity so it only casts shadows,
          not additional illumination. Placed above + in front of letters to
          project their silhouettes backward onto ShadowCatcherPlane. */}
      <directionalLight
        position={[0, 5, 9]}
        intensity={0.0}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={30}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-bias={-0.001}
      />

      <pointLight ref={warmPointRef} position={[0, 4, 3]}  intensity={0.75} color="#ffffff" />
      <pointLight ref={coolPointRef} position={[0, -4, 2]} intensity={0.62} color="#ffffff" />
      <pointLight position={[0, 0, 5]} intensity={0.42} color="#ffffff" />

      <CursorReactiveLights
        mouseRef={mouseRef}
        warmLightRef={warmPointRef}
        coolLightRef={coolPointRef}
        topFillRef={frontFillRef}
        envGroupRef={envGroupRef}
      />
      <ChromeReflectionEnv envGroupRef={envGroupRef} />

      {/* Transparent plane behind letters — catches their real-time shadow silhouettes */}
      <group position={[0, sceneYOffset, 0]}>
        <ShadowCatcherPlane />

        {/* Soft baked blob shadow beneath letter baselines */}
        <ContactShadows
          position={[0, isMobile ? -1.02 : -1.28, 0]}
          width={shadowWidth} height={shadowHeight} far={2.5}
          blur={2.8} opacity={0.38}
          color="#000000" resolution={512}
        />

        {LETTERS.map((l, i) => (
          <Suspense key={l.path} fallback={null}>
            <Letter
              path={l.path}
              position={letterPositions[i]}
              mouseRef={mouseRef}
              scrollProgressRef={scrollProgressRef}
              index={i}
              depthFactor={l.depth}
              floatDelay={l.delay}
              modelScale={letterScale}
            />
          </Suspense>
        ))}
      </group>

    </>
  )
}

export default Scene
