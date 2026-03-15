import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Float, PerspectiveCamera, RoundedBox, OrbitControls, 
  Html, Environment, ContactShadows, MeshTransmissionMaterial
} from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

const steps = [
  { id: 1, title: "AI PRECISION MATCHING", detail: "Gemini-powered talent discovery & alignment.", pos: [-5, 0, 1.5], color: "#00E0FF" },
  { id: 2, title: "GLOBAL ELITE NETWORK", detail: "Vetted top 1% tech talent at your fingertips.", pos: [-2.5, 1, -1], color: "#FF3366" },
  { id: 3, title: "REAL-TIME SYNCER", detail: "Seamless cross-device collaboration & tracking.", pos: [0, 0, -2], color: "#9F7AEA" },
  { id: 4, title: "VERIFIED SECURITY", detail: "Blockchain-hardened profile protection.", pos: [2.5, 1, -1], color: "#FBBF24" },
  { id: 5, title: "SMART ESCROW", detail: "Guaranteed payments for every milestone.", pos: [5, 0, 1.5], color: "#10B981" },
];

const LaserPipe = ({ start, end, activeProgress, color }: { start: [number, number, number], end: [number, number, number], activeProgress: number, color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const path = useMemo(() => {
    const vStart = new THREE.Vector3(...start);
    const vEnd = new THREE.Vector3(...end);
    return new THREE.CatmullRomCurve3([vStart, vEnd]);
  }, [start, end]);

  const tubeArgs = useMemo(() => [path, 32, 0.05, 8, false], [path]);

  useFrame((state) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.ShaderMaterial;
      mat.uniforms.uTime.value = state.clock.getElapsedTime();
      mat.uniforms.uProgress.value = activeProgress;
    }
  });

  const shader = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uColor: { value: new THREE.Color(color) }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform float uTime;
      uniform float uProgress;
      uniform vec3 uColor;

      void main() {
        float pulse = smoothstep(0.15, 0.0, abs(vUv.x - uProgress));
        vec3 baseColor = vec3(0.1, 0.1, 0.2);
        vec3 finalColor = mix(baseColor, uColor, pulse);
        float alpha = mix(0.2, 1.0, pulse);
        gl_FragColor = vec4(finalColor, alpha);
      }
    `
  }), [color]);

  return (
    <mesh ref={meshRef}>
      <tubeGeometry args={tubeArgs as any} />
      <shaderMaterial attach="material" {...shader} transparent />
    </mesh>
  );
};

const LaserNode = ({ step, isActive }: { step: typeof steps[0], isActive: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <group position={step.pos as [number, number, number]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <RoundedBox args={[1, 1, 1]} radius={0.15} smoothness={4} ref={meshRef}>
          {/* High-Fidelity Glass/Laser Material */}
          <MeshTransmissionMaterial
            backside
            samples={8}
            thickness={3}
            chromaticAberration={0.1}
            anisotropy={0.2}
            distortion={0.2}
            distortionScale={0.2}
            temporalDistortion={0.1}
            transmission={1}
            color={isActive ? step.color : "#444"}
            emissive={step.color}
            emissiveIntensity={isActive ? 15 : 0.5}
            metalness={0.2}
            roughness={0}
            ior={1.5}
          />
        </RoundedBox>

        <Html position={[0, 1.2, 0]} center style={{ pointerEvents: 'none' }}>
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-black/90 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-[0_0_50px_rgba(255,255,255,0.1)] text-center min-w-[200px]"
              >
                <div className="text-[10px] font-bold text-primary tracking-widest uppercase mb-1">Elite Benefit</div>
                <div className="text-sm font-black text-white">{step.title}</div>
                <div className="text-[10px] text-white/60 font-medium leading-tight mt-1">{step.detail}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </Html>
      </Float>

      {/* Halo Effect */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]}>
         <planeGeometry args={[2, 2]} />
         <meshBasicMaterial 
           color={step.color} 
           transparent 
           opacity={isActive ? 0.2 : 0.05} 
           map={new THREE.TextureLoader().load("https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/lensflare/lensflare0.png")} 
           blending={THREE.AdditiveBlending}
         />
      </mesh>
    </group>
  );
};

export const WebDiagram = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [pipeProgress, setPipeProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });
    steps.forEach((_, i) => {
       // Stay on node
       tl.to({}, { duration: 1.5, onStart: () => {
         setActiveStep(i);
         setPipeProgress(0);
       }});
       // Flow to next
       if(i < steps.length - 1) {
         tl.to({}, { 
           duration: 1, 
           onUpdate: function() { setPipeProgress(this.progress()); }
         });
       }
    });
    return () => { tl.kill(); };
  }, []);

  return (
    <section className="relative w-full h-[900px] bg-[#020205] overflow-hidden flex items-center justify-center py-24">
      <div className="absolute top-16 text-center z-10 w-full px-6">
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2 drop-shadow-[4px_4px_10px_rgba(0,0,0,0.8)]">SYNAPTIC MISSION FLOW</h2>
        <p className="text-primary text-sm font-black tracking-[0.4em] uppercase drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">Real-time Pipeline Intelligence</p>
      </div>

      <div className="w-full h-full">
        <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
          <PerspectiveCamera makeDefault position={[0, 8, 16]} fov={32} />
          <OrbitControls enableZoom={false} enablePan={false} />
          
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={2} />
          <Environment preset="city" />

          {/* Centered Laser Flow */}
          <group position={[0, -1, 0]}>
             <gridHelper args={[30, 30, "#1a1a2e", "#0a0a15"]} position={[0, -1.5, 0]} />
             
             {/* Pipes */}
             {steps.slice(0, -1).map((step, i) => (
                <LaserPipe 
                  key={`p-${i}`}
                  start={step.pos as [number, number, number]}
                  end={steps[i + 1].pos as [number, number, number]}
                  activeProgress={activeStep === i ? pipeProgress : 0}
                  color={step.color}
                />
             ))}

             {/* Nodes */}
             {steps.map((step, i) => (
                <LaserNode key={step.id} step={step} isActive={activeStep === i} />
             ))}
          </group>

          <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={20} blur={24} far={4.5} />
          <fog attach="fog" args={["#020205", 10, 30]} />
        </Canvas>
      </div>

      {/* HUD Navigation */}
      <div className="absolute bottom-12 flex gap-3 z-10">
        {steps.map((step, i) => (
          <motion.div 
            key={i}
            className="flex flex-col items-center gap-2"
            animate={{ opacity: activeStep === i ? 1 : 0.3 }}
          >
            <div 
              className={`h-1 rounded-full transition-all duration-500 ${activeStep === i ? 'w-16' : 'w-4 bg-white/10'}`}
              style={{ backgroundColor: activeStep === i ? step.color : "" }}
            />
            <span className="text-[10px] font-black text-white tracking-widest">{step.title.split(" ")[0]}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
