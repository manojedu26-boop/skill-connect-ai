import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [showLogo, setShowLogo] = useState(false);
  const [showText, setShowText] = useState(false);
  const appName = "SkillSwap";

  useEffect(() => {
    // Stage 1: Blank for 0.7s
    const logoTimer = setTimeout(() => setShowLogo(true), 700);
    
    // Stage 2: typing starts at 1.5s
    const textTimer = setTimeout(() => setShowText(true), 1500);

    // Final Stage: Complete after 4s
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(textTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0B1221] text-white"
    >
      <div className="flex flex-col items-center gap-6">
        <AnimatePresence>
          {showLogo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-20 w-20 rounded-2xl bg-teal-gradient flex items-center justify-center shadow-2xl shadow-teal/30"
            >
              <Sparkles className="h-12 w-12 text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-center py-4">
          {showText && (
            <div className="flex px-4">
              {appName.split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  className="text-5xl font-black tracking-tighter text-white"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Cinematic subtle light sweep */}
      <motion.div
        initial={{ left: "-100%" }}
        animate={{ left: "200%" }}
        transition={{ duration: 3, delay: 1, ease: "linear" }}
        className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none"
      />
    </motion.div>
  );
};

export default SplashScreen;
