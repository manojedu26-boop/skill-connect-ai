import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete?: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [show, setShow] = useState(true);
  const text = "SkillSwap";
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 1000); // Wait for fade out
    }, 3500); // Total display time
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#030712] flex items-center justify-center overflow-hidden"
        >
          {/* Cinematic Background Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sapphire-glow/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-glow/5 rounded-full blur-[80px]" />
          </div>

          <div className="relative flex items-center gap-1 overflow-hidden">
            {text.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: 0.5 + i * 0.15,
                  duration: 0.8,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
                className="text-6xl md:text-8xl font-display font-black text-white tracking-tighter"
              >
                {char}
              </motion.span>
            ))}
            
            {/* Glossy Overlay for Text */}
            <motion.div 
               initial={{ x: "-100%" }}
               animate={{ x: "200%" }}
               transition={{ delay: 1.5, duration: 2, ease: "easeInOut" }}
               className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
            />
          </div>

          {/* Slogan Reveal */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 1 }}
            className="absolute bottom-32 text-[10px] md:text-xs font-black text-white/20 uppercase tracking-[0.5em]"
          >
            Synchronizing Neural Talent Ecosystem
          </motion.p>
          
          <div className="absolute bottom-0 left-0 w-full h-1">
             <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 3.5, ease: "linear" }}
                className="h-full bg-gradient-to-r from-sapphire-glow via-emerald-glow to-sapphire-glow shadow-[0_0_20px_rgba(59,130,246,0.5)]"
             />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
