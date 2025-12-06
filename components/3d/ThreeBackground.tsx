"use client"

import { useRef, useMemo, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"

function ParticleField(props: any) {
  const ref = useRef<any>(null)
  
  // Generate random points in a sphere
  const sphere = useMemo(() => {
    const count = 5000
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
        const r = 2.5 * Math.cbrt(Math.random())
        const theta = Math.random() * 2 * Math.PI
        const phi = Math.acos(2 * Math.random() - 1)
        const x = r * Math.sin(phi) * Math.cos(theta)
        const y = r * Math.sin(phi) * Math.sin(theta)
        const z = r * Math.cos(phi)
        
        positions[i * 3] = x
        positions[i * 3 + 1] = y
        positions[i * 3 + 2] = z
    }
    return positions
  }, [])

  useFrame((state, delta) => {
    if (ref.current) {
        ref.current.rotation.x -= delta / 30
        ref.current.rotation.y -= delta / 40
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#007DB8" // McKinsey Light Blue
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  )
}

function FloatingGrid() {
    return (
       <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
         <planeGeometry args={[50, 50, 50, 50]} />
         <meshBasicMaterial color="#004973" wireframe transparent opacity={0.1} />
       </mesh>
    )
}

export function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0 bg-black pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
            <fog attach="fog" args={['#000', 0.5, 3.5]} />
            <ParticleField />
            {/* Additional layer for depth */}
             <Points positions={new Float32Array(1000).map(() => (Math.random() - 0.5) * 10)} stride={3}>
                <PointMaterial color="#40a9ff" size={0.002} sizeAttenuation={true} transparent opacity={0.5} />
            </Points>
        </Suspense>
      </Canvas>
    </div>
  )
}
