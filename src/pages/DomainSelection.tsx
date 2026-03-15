import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Building2, 
  Cpu, 
  Dna, 
  Video, 
  BarChart3, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";

const domains = [
  {
    id: "architecture",
    title: "Systems Architecture",
    icon: <Building2 className="h-8 w-8" />,
    desc: "Infrastructure scaling, cloud Native, and distributed systems logic.",
    color: "from-blue-600/30 to-cyan-500/30",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "it_dev",
    title: "Full-Stack Ops",
    icon: <Cpu className="h-8 w-8" />,
    desc: "Next-gen web applications, neural interfaces, and API ecosystems.",
    color: "from-purple-600/30 to-fuchsia-500/30",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "biotech",
    title: "Neural & Bio-Tech",
    icon: <Dna className="h-8 w-8" />,
    desc: "Bio-informatics, regenerative logic, and molecular simulation.",
    color: "from-emerald-600/30 to-teal-500/30",
    image: "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "marketing",
    title: "Global Intelligence",
    icon: <BarChart3 className="h-8 w-8" />,
    desc: "Predictive analytics, market sentiment, and neural branding.",
    color: "from-orange-600/30 to-rose-500/30",
    image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "creative",
    title: "Cinematic Editing",
    icon: <Video className="h-8 w-8" />,
    desc: "AI-assisted production, immersive visual effects, and story logic.",
    color: "from-indigo-600/30 to-violet-500/30",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "security",
    title: "Cyber Security",
    icon: <ShieldCheck className="h-8 w-8" />,
    desc: "Zero-trust protocols, neural encryption, and packet-level defense.",
    color: "from-red-600/30 to-orange-500/30",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200"
  }
];

const DomainSelection = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleSelection = async (id: string) => {
    setSelected(id);
    
    try {
      const token = localStorage.getItem("skillswap_token");
      if (!token) throw new Error("No session found");

      const apiUrl = `http://${window.location.hostname}:5000/api/auth/profile`;
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ domain: id })
      });

      if (!response.ok) throw new Error("Failed to update profile");

      // Update local storage user for UI consistency
      const userStr = localStorage.getItem("skillswap_user");
      if (userStr) {
        const user = JSON.parse(userStr);
        user.domain = id;
        localStorage.setItem("skillswap_user", JSON.stringify(user));
        window.dispatchEvent(new Event("user_updated"));
      }
      
      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    } catch (error) {
      console.error("Error saving domain:", error);
      // Fallback: update local storage and navigate anyway to not block user
      const userStr = localStorage.getItem("skillswap_user");
      if (userStr) {
        const user = JSON.parse(userStr);
        user.domain = id;
        localStorage.setItem("skillswap_user", JSON.stringify(user));
        window.dispatchEvent(new Event("user_updated"));
      }
      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 sm:p-12 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-500/5 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl w-full relative z-10 text-center space-y-4 mb-20"
      >
        <span className="px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-primary text-[10px] font-black uppercase tracking-[0.3em]">
          Initialization Phase II
        </span>
        <h1 className="text-4xl md:text-6xl font-black text-[#0B1221] tracking-tight">
          Select Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-400">Mission Domain</span>
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
          The neural network requires a sector anchor to optimize your professional trajectory. 
          Which field defines your expertise?
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full relative z-10">
        {domains.map((domain, i) => {
          const isHovered = hoveredIndex === i;
          return (
            <motion.div
              key={domain.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ 
                rotateX: 5,
                rotateY: -5,
                y: -10,
                transition: { duration: 0.3 }
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleSelection(domain.id)}
              className={`group relative h-[320px] cursor-pointer rounded-[3rem] border overflow-hidden transition-all duration-500 transform-gpu perspective-1000
                ${selected === domain.id 
                  ? 'border-primary ring-4 ring-primary/20 shadow-2xl scale-[0.98]' 
                  : 'border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-primary/10'}`}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* High-Fidelity Pop Image */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <motion.img 
                  src={domain.image} 
                  animate={{ 
                    scale: isHovered || selected === domain.id ? 1.4 : 1.1,
                    opacity: isHovered || selected === domain.id ? 1 : 0.6,
                    filter: isHovered || selected === domain.id ? "brightness(1) contrast(1.1)" : "brightness(0.7) contrast(1)"
                  }}
                  className="w-full h-full object-cover transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-[#0B1221]/60 group-hover:bg-[#0B1221]/30 transition-colors duration-500" />
                <div className={`absolute inset-0 bg-gradient-to-br ${domain.color} mix-blend-overlay opacity-30 group-hover:opacity-50`} />
              </div>

              <div className="p-8 h-full flex flex-col justify-between relative z-10" style={{ transform: "translateZ(80px)" }}>
                <div className="space-y-4">
                  <div className={`h-14 w-14 rounded-2xl flex items-center justify-center text-white border border-white/20 transition-all duration-500 shadow-xl
                    ${isHovered ? 'bg-primary border-primary' : 'bg-white/10 backdrop-blur-md'}`}>
                    {domain.icon}
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tight drop-shadow-xl">{domain.title}</h3>
                  <p className="text-slate-100 text-sm leading-relaxed font-bold group-hover:text-white transition-colors opacity-80 group-hover:opacity-100 drop-shadow-md">
                    {domain.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-black uppercase tracking-[0.2em] transform transition-all duration-500
                    ${selected === domain.id ? 'text-primary scale-110' : 'text-slate-300'}`}>
                    {selected === domain.id ? 'Mission Synchronized' : 'Initialization Ready'}
                  </span>
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center border transition-all duration-500 
                    ${selected === domain.id ? 'bg-primary border-primary text-white' : 'border-white/30 text-white group-hover:border-primary group-hover:bg-primary'}`}>
                    <ArrowRight className={`h-5 w-5 ${selected === domain.id ? 'animate-pulse' : ''}`} />
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 transform translate-x-[-100%] group-hover:translate-x-[100%]" />
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-12 z-50 px-10 py-5 bg-[#0B1221] text-white rounded-full shadow-[0_20px_60px_rgba(0,0,0,0.5)] flex items-center gap-4 border border-white/10"
          >
            <div className="flex gap-1">
              {[0, 1, 2].map((dot) => (
                <motion.div
                  key={dot}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1, delay: dot * 0.2 }}
                  className="h-2 w-2 rounded-full bg-primary"
                />
              ))}
            </div>
            <span className="font-black uppercase tracking-[0.2em] text-xs">Calibrating Professional Trajectory...</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DomainSelection;
