import { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera, Text, MeshWobbleMaterial, GradientTexture, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

const nodes = [
  { id: 1, title: "PHASE 1. THE BLUEPRINT", subtitle: "Mapping the landscape and defining the route.", position: [-3, 1, 0], color: "#00E0FF" },
  { id: 2, title: "THE ARCHITECTURE", subtitle: "Building the neural backbone of the system.", position: [0, 2, -2], color: "#FF3D71" },
  { id: 3, title: "THE BUILD", subtitle: "Forging specialized intelligence modules.", position: [3, 1, 0], color: "#FFD700" },
  { id: 4, title: "THE LAUNCH", subtitle: "Propelling your mission into the global field.", position: [0, -1, 2], color: "#00FF66" },
];

const EnergyPath = ({ start, end, active }: { start: [number, number, number], end: [number, number, number], active: boolean }) => {
  const lineRef = useRef<THREE.LineLoop>(null);
  
  const points = useMemo(() => {
    return [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  }, [start, end]);

  useFrame((state) => {
    if (lineRef.current && active) {
      const t = state.clock.getElapsedTime();
      (lineRef.current.material as THREE.LineBasicMaterial).opacity = 0.3 + Math.sin(t * 5) * 0.2;
    }
  });

  return (
    <line ref={lineRef}>
      <bufferGeometry attach="geometry" setFromPoints={points} />
      <lineBasicMaterial attach="material" color="#ffffff" transparent opacity={0.15} linewidth={1} />
    </line>
  );
};

const SmartNode = ({ data, active, index }: { data: typeof nodes[0], active: boolean, index: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current && active) {
      const t = state.clock.getElapsedTime();
      meshRef.current.scale.setScalar(1 + Math.sin(t * 3) * 0.05);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5} position={data.position as [number, number, number]}>
      <RoundedBox args={[1.5, 0.4, 1.5]} radius={0.1} smoothness={4} ref={meshRef}>
        <meshStandardMaterial 
          color={active ? data.color : "#2a2a2a"} 
          emissive={active ? data.color : "#000000"} 
          emissiveIntensity={active ? 2 : 0}
          roughness={0.1}
          metalness={0.8}
        >
          <GradientTexture
            stops={[0, 1]}
            colors={[active ? data.color : "#1a1a1a", "#000000"]}
            size={1024}
          />
        </meshStandardMaterial>
      </RoundedBox>
      
      {/* Node Label (Text in 3D) */}
      <Text
        position={[0, 0.6, 0]}
        fontSize={0.2}
        color="white"
        font="https://fonts.gstatic.com/s/plusjakartasans/v8/L0x5DF4xlVMF-BfR8bXMIjhLq3MQ.woff"
        maxWidth={2}
        textAlign="left"
        anchorX="center"
        anchorY="middle"
      >
        {active ? data.title : ""}
      </Text>
    </Float>
  );
};

export const WebDiagram = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % nodes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[800px] bg-background overflow-hidden flex flex-col items-center justify-center py-20">
      <div className="absolute top-10 text-center z-10 px-6">
        <motion.h2 
          className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-4"
          key={nodes[activeIndex].title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {nodes[activeIndex].title}
        </motion.h2>
        <motion.p 
          className="text-xl text-primary font-medium"
          key={nodes[activeIndex].subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {nodes[activeIndex].subtitle}
        </motion.p>
      </div>

      <div className="w-full h-full cursor-grab active:cursor-grabbing">
        <Canvas shadows gl={{ antialias: true }}>
          <PerspectiveCamera makeDefault position={[0, 5, 8]} fov={40} />
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1} color={nodes[activeIndex].color} />
          <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
          
          {/* Isometric Grid Floor */}
          <gridHelper args={[20, 20, "#333333", "#111111"]} rotation={[0, 0, 0]} position={[0, -2, 0]} />

          {/* Sequential Energy Paths */}
          {nodes.map((node, i) => {
            const nextNode = nodes[(i + 1) % nodes.length];
            return (
              <EnergyPath 
                key={`path-${i}`} 
                start={node.position as [number, number, number]} 
                end={nextNode.position as [number, number, number]} 
                active={activeIndex === i}
              />
            );
          })}

          {/* 3D Smart Nodes */}
          {nodes.map((node, i) => (
            <SmartNode 
              key={node.id} 
              data={node} 
              active={activeIndex === i} 
              index={i}
            />
          ))}
          
          {/* Global Environmental Effects */}
          <fog attach="fog" args={["#000000", 10, 20]} />
        </Canvas>
      </div>

      <div className="absolute bottom-10 flex gap-4 z-10">
        {nodes.map((_, i) => (
          <div 
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${activeIndex === i ? 'w-12 bg-primary' : 'w-3 bg-white/20'}`}
          />
        ))}
      </div>
      
      {/* Background Pipeline Aesthetic */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1)_0%,transparent_70%)]" />
      </div>
    </section>
  );
};
