import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const Aura = () => {
  const [showBubble, setShowBubble] = useState(false);
  const [role, setRole] = useState<string>("");
  const [name, setName] = useState<string>("Manoj");

  useEffect(() => {
    const userStr = localStorage.getItem("skillswap_user");
    if (userStr) {
      const user = JSON.parse(userStr);
      setName(user.firstName || "Manoj");
      setRole(user.role === "client" ? "visionary" : "designer");
    }

    const timer = setTimeout(() => setShowBubble(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-12 right-12 z-50 flex items-end gap-4 pointer-events-none">
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20, y: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20, y: 20 }}
            className="mb-16 glass-frosted rounded-[2rem] p-6 shadow-premium max-w-xs pointer-events-auto"
          >
            <p className="text-sm font-medium text-navy leading-relaxed">
              <span className="font-black text-teal">Aura:</span> "You’re making great progress today, {name}! You’re in the top 5% of {role}s—let’s find your next big move."
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        drag
        dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
        className="relative cursor-grab active:cursor-grabbing pointer-events-auto"
      >
        {/* Anti-Gravity Floating Container */}
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
          className="relative"
        >
          {/* Aura Body Layered for 3D depth */}
          <div className="relative h-24 w-20">
            {/* Head */}
            <motion.div 
              animate={{ rotateY: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-0 left-1/2 -translate-x-1/2 h-14 w-14 rounded-full aura-ceramic border border-white/40 z-20 flex items-center justify-center overflow-hidden"
            >
              {/* Face/Eyes */}
              <div className="flex gap-4">
                <motion.div 
                  animate={{ scaleY: [1, 0.1, 1], opacity: [1, 0.8, 1] }}
                  transition={{ duration: 4, repeat: Infinity, times: [0, 0.5, 1] }}
                  className="h-2 w-2 rounded-full bg-[#00D1FF] aura-eye-glow" 
                />
                <motion.div 
                   animate={{ scaleY: [1, 0.1, 1], opacity: [1, 0.8, 1] }}
                   transition={{ duration: 4, repeat: Infinity, times: [0, 0.5, 1], delay: 0.1 }}
                   className="h-2 w-2 rounded-full bg-[#00D1FF] aura-eye-glow" 
                />
              </div>
            </motion.div>

            {/* Body */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 h-14 w-12 rounded-[2rem] aura-ceramic border border-white/20 z-10" />

            {/* Arms - Left Waving */}
            <motion.div
              animate={{
                rotate: [20, 45, 20]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ transformOrigin: "top" }}
              className="absolute top-12 -left-2 h-8 w-3 rounded-full aura-ceramic border border-white/20"
            />
            
            {/* Arms - Right */}
            <motion.div
              animate={{
                rotate: [-20, -30, -20]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ transformOrigin: "top" }}
              className="absolute top-12 -right-2 h-8 w-3 rounded-full aura-ceramic border border-white/20"
            />
          </div>

          {/* Magnetic base shadow */}
          <motion.div 
             animate={{ scale: [1, 0.8, 1], opacity: [0.1, 0.2, 0.1] }}
             transition={{ duration: 5, repeat: Infinity }}
             className="absolute -bottom-4 left-1/2 -translate-x-1/2 h-2 w-10 bg-black rounded-full blur-[8px]" 
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Aura;
