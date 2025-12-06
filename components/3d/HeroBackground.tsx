"use client"

import { useRef, useMemo, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"

function HeroParticleField(props: any) {
  const ref = useRef<any>(null)
  
  // Dense core, sparse outer layer
  const sphere = useMemo(() => {
    const count = 4000
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
        const r = 3 * Math.cbrt(Math.random())
        const theta = Math.random() * 2 * Math.PI
        const phi = Math.acos(2 * Math.random() - 1)
        
        let x = r * Math.sin(phi) * Math.cos(theta)
        let y = r * Math.sin(phi) * Math.sin(theta)
        let z = r * Math.cos(phi)
        
        // Add some "data stream" lines effect by flattening slightly
        positions[i * 3] = x
        positions[i * 3 + 1] = y * 0.8 // Slightly varied shape
        positions[i * 3 + 2] = z
    }
    return positions
  }, [])

  useFrame((state, delta) => {
    if (ref.current) {
        ref.current.rotation.x -= delta / 25
        ref.current.rotation.y -= delta / 35
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#007DB8" // McKinsey Light Blue
          size={0.006}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  )
}

export function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 bg-black pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
            <fog attach="fog" args={['#000', 0.8, 3.2]} />
            <HeroParticleField />
             {/* Secondary accent layer */}
             <Points positions={new Float32Array(500).map(() => (Math.random() - 0.5) * 8)} stride={3}>
                <PointMaterial color="#ffffff" size={0.003} sizeAttenuation={true} transparent opacity={0.3} />
            </Points>
        </Suspense>
      </Canvas>
      {/* Gradient fade to blend with next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </div>
  )
}
