import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Aura() {
  const [isVisible, setIsVisible] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userStr = localStorage.getItem("skillswap_user");
    if (userStr) setUser(JSON.parse(userStr));

    const timer = setTimeout(() => setIsVisible(true), 1500);
    const bubbleTimer = setTimeout(() => setShowBubble(true), 3000);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(bubbleTimer);
    };
  }, []);

  const firstName = user?.firstName || "Manoj";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className="fixed bottom-10 right-10 z-[100] flex items-end gap-6"
        >
          {/* Aura Greeting Bubble */}
          <AnimatePresence>
            {showBubble && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="relative bg-white/10 backdrop-blur-2xl border border-white/10 p-6 rounded-[2rem] max-w-[280px] depth-shadow mb-12"
              >
                <div className="text-sm font-medium leading-relaxed text-white/90">
                  You’ve leveled up your profile today, <span className="font-black text-emerald-glow">{firstName}</span>! 
                  You’re in the top <span className="font-black text-emerald-glow">5% of designers</span>—let’s find your next big win.
                </div>
                {/* Tail */}
                <div className="absolute bottom-[-10px] right-12 w-4 h-4 bg-white/10 backdrop-blur-2xl border-r border-b border-white/10 rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Aura Robot Asset */}
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="relative cursor-pointer group"
          >
            <div className="absolute inset-0 bg-emerald-glow/20 blur-[50px] rounded-full group-hover:bg-emerald-glow/40 transition-all duration-500" />
            <img 
              src="/aura_3d_robot_1773568674243.png" 
              alt="Aura AI" 
              className="h-48 w-48 object-contain relative z-10"
            />
            
            {/* Waving Hand Effect Layer (Simulated via motion) */}
            <motion.div
              animate={{ rotate: [0, 15, -5, 15, 0] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatDelay: 3 
              }}
              className="absolute top-1/2 left-0 w-full h-full pointer-events-none"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
