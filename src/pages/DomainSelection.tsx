import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Building2, 
  Cpu, 
  Dna, 
  Video, 
  BarChart3, 
  Globe2, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";

const domains = [
  {
    id: "architecture",
    title: "Systems Architecture",
    icon: <Building2 className="h-8 w-8" />,
    desc: "Infrastructure scaling, cloud Native, and distributed systems logic.",
    color: "from-blue-500/20 to-teal-500/20",
    image: "https://images.unsplash.com/photo-1511447333015-45b65e60f6d1?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "it_dev",
    title: "Full-Stack Ops",
    icon: <Cpu className="h-8 w-8" />,
    desc: "Next-gen web applications, neural interfaces, and API ecosystems.",
    color: "from-purple-500/20 to-pink-500/20",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "biotech",
    title: "Neural & Bio-Tech",
    icon: <Dna className="h-8 w-8" />,
    desc: "Bio-informatics, regenerative logic, and molecular simulation.",
    color: "from-emerald-500/20 to-teal-500/20",
    image: "https://images.unsplash.com/photo-1532187863486-abf9d39d9992?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "marketing",
    title: "Global Intelligence",
    icon: <BarChart3 className="h-8 w-8" />,
    desc: "Predictive analytics, market sentiment, and neural branding.",
    color: "from-orange-500/20 to-red-500/20",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "creative",
    title: "Cinematic Editing",
    icon: <Video className="h-8 w-8" />,
    desc: "AI-assisted production, immersive visual effects, and story logic.",
    color: "from-indigo-500/20 to-blue-500/20",
    image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "security",
    title: "Cyber Security",
    icon: <ShieldCheck className="h-8 w-8" />,
    desc: "Zero-trust protocols, neural encryption, and packet-level defense.",
    color: "from-red-500/20 to-orange-500/20",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
  }
];

const DomainSelection = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSelection = (id: string) => {
    setSelected(id);
    // Simulate saving selection
    const userStr = localStorage.getItem("skillswap_user");
    if (userStr) {
      const user = JSON.parse(userStr);
      user.domain = id;
      localStorage.setItem("skillswap_user", JSON.stringify(user));
    }
    
    setTimeout(() => {
      navigate("/dashboard");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 sm:p-12 overflow-hidden relative">
      {/* Subtle Background Elements for White Theme */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-500/5 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl w-full relative z-10 text-center space-y-4 mb-16"
      >
        <span className="px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-primary text-[10px] font-black uppercase tracking-[0.3em]">
          Initialization Phase II
        </span>
        <h1 className="text-4xl md:text-6xl font-black text-navy tracking-tight">
          Select Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-600">Mission Domain</span>
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
          The neural network requires a sector anchor to optimize your professional trajectory. 
          Which field defines your expertise?
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full relative z-10">
        {domains.map((domain, i) => (
          <motion.div
            key={domain.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ 
              scale: 1.02,
              rotateX: 2,
              rotateY: -2,
              transition: { duration: 0.2 }
            }}
            onClick={() => handleSelection(domain.id)}
            className={`group relative h-[320px] cursor-pointer rounded-[2.5rem] border overflow-hidden transition-all duration-500 transform-gpu perspective-1000
              ${selected === domain.id 
                ? 'border-primary ring-4 ring-primary/20 bg-navy' 
                : 'border-slate-100 bg-navy shadow-xl shadow-navy/10 hover:shadow-2xl hover:shadow-navy/20'}`}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Background Image with High-Fidelity "Pop" Overlay */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <motion.img 
                src={domain.image} 
                animate={{ 
                  scale: isActive || selected === domain.id ? 1.4 : 1.1,
                  opacity: isActive || selected === domain.id ? 0.9 : 0.6,
                  filter: isActive || selected === domain.id ? "contrast(1.2) brightness(1.2)" : "contrast(1) brightness(0.8)"
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full h-full object-cover transition-all" 
              />
              <div className="absolute inset-0 bg-[#0B1221]/70 group-hover:bg-[#0B1221]/40 transition-colors duration-500" />
              <div className={`absolute inset-0 bg-gradient-to-br ${domain.color} mix-blend-overlay opacity-40 group-hover:opacity-60 transition-opacity`} />
            </div>

            <div className="p-8 h-full flex flex-col justify-between relative z-10" style={{ transform: "translateZ(60px)" }}>
              <div className="space-y-4">
                <motion.div 
                  animate={{ 
                    scale: isActive ? 1.1 : 1,
                    y: isActive ? -5 : 0
                  }}
                  className="h-14 w-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-500 shadow-2xl"
                >
                  {domain.icon}
                </motion.div>
                <h3 className="text-2xl font-black text-white tracking-tight drop-shadow-lg">{domain.title}</h3>
                <p className="text-slate-200 text-sm leading-relaxed font-bold group-hover:text-white transition-colors drop-shadow-md">
                  {domain.desc}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${selected === domain.id ? 'text-primary' : 'text-slate-300'}`}>
                  {selected === domain.id ? 'Mission Locked' : 'Initialization Ready'}
                </span>
                <motion.div 
                  animate={{ 
                    x: isActive ? 5 : 0,
                    scale: isActive ? 1.2 : 1
                  }}
                  className={`h-10 w-10 rounded-full flex items-center justify-center border transition-all duration-500 
                    ${selected === domain.id ? 'bg-primary border-primary text-white' : 'border-white/30 text-white group-hover:border-white/60'}`}
                >
                  <ArrowRight className={`h-5 w-5 ${selected === domain.id ? 'animate-pulse' : ''}`} />
                </motion.div>
              </div>
            </div>

            {/* Premium Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform translate-x-[-100%] group-hover:translate-x-[100%]" />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-12 z-50 px-8 py-4 bg-primary rounded-full shadow-[0_0_50px_rgba(var(--primary),0.5)] flex items-center gap-4"
          >
            <div className="h-2 w-2 rounded-full bg-white animate-ping" />
            <span className="text-white font-black uppercase tracking-widest text-sm">Synchronizing Digital Identity...</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DomainSelection;
