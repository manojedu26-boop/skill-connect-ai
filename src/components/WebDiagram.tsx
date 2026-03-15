import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Float, PerspectiveCamera, RoundedBox, GradientTexture, 
  OrbitControls, Html, Environment, MeshDistortMaterial 
} from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

const steps = [
  { id: 1, title: "AI PRECISION MATCHING", detail: "Gemini-powered talent discovery & alignment.", pos: [-4, 0, 2], color: "#00E0FF" },
  { id: 2, title: "GLOBAL ELITE NETWORK", detail: "Vetted top 1% tech talent at your fingertips.", pos: [-1, 1, -1], color: "#FF3366" },
  { id: 3, title: "REAL-TIME SYNCER", detail: "Seamless cross-device collaboration & tracking.", pos: [2, 0, -2], color: "#9F7AEA" },
  { id: 4, title: "VERIFIED SECURITY", detail: "Blockchain-hardened profile & payment protection.", pos: [5, 1, -1], color: "#FBBF24" },
  { id: 5, title: "SMART ESCROW", detail: "Guaranteed payments for every project milestone.", pos: [8, 0, 2], color: "#10B981" },
];

const Pipe = ({ start, end, activeProgress }: { start: [number, number, number], end: [number, number, number], activeProgress: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const path = useMemo(() => {
    const vStart = new THREE.Vector3(...start);
    const vEnd = new THREE.Vector3(...end);
    const mid1 = new THREE.Vector3(vEnd.x, vStart.y, vStart.z); // L-shaped turn
    return new THREE.CatmullRomCurve3([vStart, mid1, vEnd]);
  }, [start, end]);

  const tubeArgs = useMemo(() => [path, 64, 0.08, 8, false], [path]);

  // Shader for flowing light
  const shader = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uColor: { value: new THREE.Color("#ffffff") }
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
        // Create a moving light pulse
        float glowWidth = 0.2;
        float dist = abs(vUv.x - uProgress);
        float pulse = smoothstep(glowWidth, 0.0, dist);
        
        vec3 finalColor = mix(vec3(0.05, 0.05, 0.08), uColor, pulse);
        float alpha = mix(0.3, 0.9, pulse);
        
        gl_FragColor = vec4(finalColor, alpha);
      }
    `
  }), []);

  useFrame((state) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.ShaderMaterial;
      mat.uniforms.uTime.value = state.clock.getElapsedTime();
      mat.uniforms.uProgress.value = activeProgress;
    }
  });

  return (
    <mesh ref={meshRef}>
      <tubeGeometry args={tubeArgs as any} />
      <shaderMaterial 
        attach="material" 
        {...shader} 
        transparent 
      />
    </mesh>
  );
};

const NodePoint = ({ step, isActive }: { step: typeof steps[0], isActive: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <group position={step.pos as [number, number, number]}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <RoundedBox args={[1.2, 0.8, 1.2]} radius={0.1} smoothness={4} ref={meshRef}>
          <MeshDistortMaterial
            color={isActive ? step.color : "#1a1a1a"}
            speed={2}
            distort={isActive ? 0.3 : 0}
            radius={1}
            emissive={step.color}
            emissiveIntensity={isActive ? 10 : 0.8}
            metalness={0.9}
            roughness={0.02}
            reflectivity={1}
            iridescence={1}
            clearcoat={1}
          />
        </RoundedBox>

        {/* Labels pop up when active */}
        <Html position={[0, 1.5, 0]} center style={{ pointerEvents: 'none' }}>
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="whitespace-nowrap px-4 py-2 bg-black/80 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl"
              >
                <div className="text-xs font-bold text-white/50 uppercase tracking-widest mb-1">Active Step</div>
                <div className="text-lg font-black text-white">{step.title}</div>
                <div className="text-xs text-primary/80 font-medium">{step.detail}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </Html>
      </Float>

      {/* Point Light when active */}
      {isActive && (
        <pointLight color={step.color} intensity={2} distance={5} />
      )}
    </group>
  );
};

export const WebDiagram = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [pipeProgress, setPipeProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });

    steps.forEach((_, i) => {
      if (i < steps.length - 1) {
        // Stay on node
        tl.to({}, { duration: 1, onStart: () => {
          setActiveStep(i);
          setPipeProgress(0);
        }});
        
        // Flow to next
        tl.to({}, { 
          duration: 1.5, 
          ease: "power2.inOut",
          onUpdate: function() {
            setPipeProgress(this.progress());
          },
          onComplete: () => {
            setPipeProgress(0);
          }
        });
      } else {
        // Last node stay
        tl.to({}, { duration: 2, onStart: () => setActiveStep(i) });
      }
    });

    return () => { tl.kill(); };
  }, []);

  return (
    <section className="relative w-full h-[850px] bg-[#020205] overflow-hidden flex flex-col items-center justify-center">
      {/* Dynamic Background Title */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.div 
          className="text-[20vw] font-black text-white/5 whitespace-nowrap select-none"
          animate={{ x: ["-10%", "10%"] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "mirror" }}
        >
          {steps[activeStep].title}
        </motion.div>
      </div>

      <div className="relative z-10 w-full h-full">
        <Canvas dpr={[1, 2]} shadows gl={{ alpha: true, antialias: true }}>
          <PerspectiveCamera makeDefault position={[0, 6, 15]} fov={30} />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            minPolarAngle={Math.PI / 4} 
            maxPolarAngle={Math.PI / 2.5}
          />
          
          <ambientLight intensity={0.1} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <Environment preset="night" />

          {/* Grid Helper with Glow */}
          <gridHelper args={[40, 40, "#111122", "#050510"]} position={[2, -2, 2]} />

          {/* Pipes with Energy Flow */}
          {steps.slice(0, -1).map((step, i) => (
            <Pipe 
              key={`pipe-${i}`}
              start={step.pos as [number, number, number]}
              end={steps[i + 1].pos as [number, number, number]}
              activeProgress={activeStep === i ? pipeProgress : 0}
            />
          ))}

          {/* Glowing Smart Nodes */}
          {steps.map((step, i) => (
            <NodePoint 
              key={step.id}
              step={step}
              isActive={activeStep === i}
            />
          ))}

          {/* Interactive fog for depth */}
          <fog attach="fog" args={["#020205", 5, 25]} />
        </Canvas>
      </div>

      {/* Progress UI Overlay */}
      <div className="absolute top-12 left-12 flex flex-col gap-8 z-20">
        <div className="space-y-1">
          <h2 className="text-4xl font-black text-white tracking-tighter">SYNAPTIC PIPELINE</h2>
          <p className="text-white/40 text-sm font-semibold tracking-widest uppercase">Real-time Mission Execution</p>
        </div>

        <div className="flex flex-col gap-4">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center gap-4">
              <div 
                className={`h-2 rounded-full transition-all duration-700 ${activeStep === i ? 'w-12' : 'w-2 bg-white/10'}`}
                style={{ backgroundColor: activeStep === i ? step.color : "" }}
              />
              <span className={`text-sm font-bold tracking-tight transition-colors duration-500 ${activeStep === i ? 'text-white' : 'text-white/20'}`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative Blur */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 blur-[150px] rounded-full" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/5 blur-[150px] rounded-full" />
    </section>
  );
};
