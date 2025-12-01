"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { MeshTransmissionMaterial, Environment } from "@react-three/drei"
import * as THREE from "three"

// Premium 3D Table with mouse interaction
function InteractiveTable3D() {
  const groupRef = useRef<THREE.Group>(null)
  const tableTopRef = useRef<THREE.Mesh>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const { viewport } = useThree()
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  useFrame((state) => {
    if (groupRef.current) {
      // Smooth rotation based on mouse position
      const targetRotationY = mousePos.x * 0.5
      const targetRotationX = mousePos.y * 0.3
      
      groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.08
      groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.08
      
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.15
    }
    
    if (tableTopRef.current) {
      // Subtle pulsing glow effect
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.03
      tableTopRef.current.scale.set(pulse, pulse, pulse)
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={0.85}>
      {/* Table top (horizontal bar from logo) - premium glass-like material */}
      <mesh ref={tableTopRef} position={[0, 1.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.5, 0.3, 1]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          resolution={512}
          transmission={0.85}
          roughness={0.1}
          thickness={0.4}
          ior={1.5}
          chromaticAberration={0.1}
          anisotropy={0.5}
          distortion={0.2}
          distortionScale={0.3}
          temporalDistortion={0.15}
          clearcoat={1}
          attenuationDistance={0.5}
          attenuationColor="#ffffff"
          color="#121516"
        />
      </mesh>
      
      {/* Two angled legs (like in Radai logo) */}
      {/* Left leg - angled */}
      <group position={[-0.8, 0, 0]} rotation={[0, 0, 0.15]}>
        <mesh castShadow receiveShadow>
          <capsuleGeometry args={[0.16, 1.8, 16, 32]} />
          <meshStandardMaterial
            color="#121516"
            metalness={0.95}
            roughness={0.05}
            envMapIntensity={2}
          />
        </mesh>
        {/* Energy flow particles effect */}
        <mesh position={[0, 0.5, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color="#FF5A5F"
            emissive="#FF5A5F"
            emissiveIntensity={1.5}
            transparent
            opacity={0.8}
          />
        </mesh>
        <mesh position={[0, -0.3, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial
            color="#3B82F6"
            emissive="#3B82F6"
            emissiveIntensity={1.5}
            transparent
            opacity={0.8}
          />
        </mesh>
      </group>
      
      {/* Right leg - angled opposite */}
      <group position={[0.8, 0, 0]} rotation={[0, 0, -0.15]}>
        <mesh castShadow receiveShadow>
          <capsuleGeometry args={[0.16, 1.8, 16, 32]} />
          <meshStandardMaterial
            color="#121516"
            metalness={0.95}
            roughness={0.05}
            envMapIntensity={2}
          />
        </mesh>
        {/* Energy flow particles effect */}
        <mesh position={[0, 0.3, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color="#3B82F6"
            emissive="#3B82F6"
            emissiveIntensity={1.5}
            transparent
            opacity={0.8}
          />
        </mesh>
        <mesh position={[0, -0.5, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial
            color="#FF5A5F"
            emissive="#FF5A5F"
            emissiveIntensity={1.5}
            transparent
            opacity={0.8}
          />
        </mesh>
      </group>
      
      {/* Decorative energy rings */}
      <mesh position={[0, 1.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.8, 0.03, 16, 100]} />
        <meshStandardMaterial
          color="#3B82F6"
          metalness={1}
          roughness={0}
          emissive="#3B82F6"
          emissiveIntensity={0.8}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  )
}

// Main scene with premium lighting
export function AnimatedTables3D() {
  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Gradient background to contrast the 3D table */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-red-50/30" />
      <Canvas
        camera={{ position: [0, 1, 3.5], fov: 45 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
          powerPreference: "high-performance"
        }}
      >
        {/* Premium lighting setup */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
        <directionalLight position={[-5, 3, -5]} intensity={0.8} color="#3B82F6" />
        <pointLight position={[0, 2, 0]} intensity={1} color="#FF5A5F" distance={5} />
        <spotLight
          position={[0, 5, 0]}
          angle={0.3}
          penumbra={1}
          intensity={1.5}
          castShadow
          color="#ffffff"
        />
        
        {/* Environment map for reflections */}
        <Environment preset="city" />
        
        {/* The premium interactive table */}
        <InteractiveTable3D />
      </Canvas>
    </div>
  )
}
