import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus, Search, Sparkles } from "lucide-react";

const Onboarding = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#050810]">
      {/* Cinematic Hero Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1522071823992-740eaa48cb3b?auto=format&fit=crop&q=80&w=2000" 
          alt="Diverse Tech Team" 
          className="w-full h-full object-cover opacity-30 grayscale hover:grayscale-0 transition-all duration-1000 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050810]/80 via-transparent to-[#050810]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl px-6 text-center">
        {/* Subtle Branding */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-center gap-3"
        >
          <div className="h-12 w-12 rounded-2xl bg-teal-gradient flex items-center justify-center shadow-lg shadow-teal/20">
            <Sparkles className="h-7 w-7 text-white" />
          </div>
          <span className="text-3xl font-black tracking-tighter text-white">SkillSwap</span>
        </motion.div>

        {/* Massive Headline */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-10 text-6xl md:text-8xl font-black text-white tracking-tight leading-[0.9] font-['Montserrat'] uppercase"
        >
          The Future of Hiring, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D1FF] to-[#0094FF]">Centered on You.</span>
        </motion.h1>

        {/* The Power Pod */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mx-auto max-w-2xl obsidian-pod rounded-[3.5rem] p-10 md:p-14 space-y-8 neon-blue-glow relative group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#00D1FF]/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
          
          <div className="relative z-10 space-y-4">
            <h2 className="text-xl font-bold text-slate-300 tracking-widest uppercase">Select Your Gateway</h2>
            <div className="grid md:grid-cols-3 gap-6 pt-4">
              <Button 
                onClick={() => navigate("/login")}
                className="h-20 rounded-3xl bg-white/10 hover:bg-white/20 border border-white/10 flex flex-col items-center justify-center gap-2 group/btn transition-all hover:scale-105"
              >
                <LogIn className="h-6 w-6 text-[#00D1FF] group-hover/btn:scale-110 transition-transform" />
                <span className="text-xs font-black tracking-widest uppercase">Log In</span>
              </Button>
              
              <Button 
                onClick={() => navigate("/register")}
                className="h-20 rounded-3xl bg-teal-gradient shadow-lg shadow-teal/20 flex flex-col items-center justify-center gap-2 group/btn transition-all hover:scale-105"
              >
                <UserPlus className="h-6 w-6 text-white group-hover/btn:scale-110 transition-transform" />
                <span className="text-xs font-black tracking-widest uppercase">Sign Up</span>
              </Button>

              <Button 
                onClick={() => navigate("/projects")}
                className="h-20 rounded-3xl bg-white/5 hover:bg-white/10 border border-white/5 flex flex-col items-center justify-center gap-2 group/btn transition-all hover:scale-105"
              >
                <Search className="h-6 w-6 text-slate-400 group-hover/btn:scale-110 transition-transform" />
                <span className="text-xs font-black tracking-widest uppercase">Job Postings</span>
              </Button>
            </div>
          </div>

          <p className="relative z-10 text-sm text-slate-400 font-medium">
             Trusted by over 50,000+ elite engineers and forward-thinking companies worldwide.
          </p>
        </motion.div>

        {/* Subtle Bottom Accent */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1 }}
          className="mt-16 text-[10px] tracking-[0.4em] font-black text-slate-500 uppercase"
        >
          Secured by Gemini AI Protocol v2.5
        </motion.div>
      </div>

      {/* Decorative anti-gravity particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -40, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 1.5,
          }}
          className="absolute h-1 w-1 bg-[#00D1FF] rounded-full blur-[2px]"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
        />
      ))}
    </div>
  );
};

export default Onboarding;
