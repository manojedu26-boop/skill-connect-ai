import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function InteractiveBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse movement natively outside React render cycle
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 200, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 200, mass: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Update motion values directly = ZERO React re-renders!
      mouseX.set(e.clientX - 300);
      mouseY.set(e.clientY - 300);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
      {/* Network Graph Pattern Overlay */}
      <div className="absolute inset-0 network-pattern"></div>

      {/* Dynamic Light Trails */}
      <svg className="absolute inset-0 h-full w-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M-100,200 Q400,100 800,400 T1800,200"
          fill="none"
          stroke="hsl(175, 40%, 45%)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M-200,600 Q600,800 1200,400 T2200,600"
          fill="none"
          stroke="hsl(25, 100%, 60%)"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.3, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </svg>

      {/* Subtle Glowing Blobs following mouse via Motion Values (zero re-render) */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
        }}
        className="absolute h-[600px] w-[600px] rounded-full bg-teal/5 blur-[120px]"
      />
      
      {/* Static Decorative Accents */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-teal/5 blur-[150px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-orange/5 blur-[150px] rounded-full"></div>
    </div>
  );
}
