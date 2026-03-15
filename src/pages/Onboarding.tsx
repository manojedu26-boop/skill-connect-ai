import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, Sparkles, Globe, Users, ShieldCheck } from "lucide-react";
import heroImage from "@/assets/hero-team.png";

const BrandAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const text = "SkillSwap";

  return (
    <div 
      ref={containerRef}
      className="relative w-full py-12 flex justify-center items-center overflow-hidden mb-8"
    >
      {/* Background Glow */}
      <motion.div 
        className="absolute w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none"
        style={{
          left: useTransform(smoothX, (val) => val - 128),
          top: useTransform(smoothY, (val) => val - 128),
        }}
      />

      <div className="relative flex">
        {text.split("").map((char, i) => {
          const charRef = useRef<HTMLSpanElement>(null);
          
          return (
            <motion.span
              key={i}
              ref={charRef}
              className="text-7xl md:text-9xl font-black tracking-tighter cursor-default relative"
              style={{
                color: "#1a1a1a",
                WebkitTextStroke: "1px rgba(0,0,0,0.1)",
              }}
            >
              {/* Blurred Base */}
              <span className="opacity-20 blur-sm">{char}</span>
              
              {/* Interactive Clear Overlayer */}
              <motion.span
                className="absolute inset-0 text-foreground"
                style={{
                  clipPath: useTransform(
                    [smoothX, smoothY],
                    ([x, y]) => {
                      if (!charRef.current) return `circle(0px at 0px 0px)`;
                      const rect = charRef.current.getBoundingClientRect();
                      const parentRect = containerRef.current!.getBoundingClientRect();
                      const localX = (x as number) - (rect.left - parentRect.left);
                      const localY = (y as number) - (rect.top - parentRect.top);
                      return `circle(120px at ${localX}px ${localY}px)`;
                    }
                  ),
                  filter: "drop-shadow(0 0 20px rgba(16, 185, 129, 0.3))",
                }}
              >
                {char}
              </motion.span>
            </motion.span>
          );
        })}
      </div>
    </div>
  );
};

const Onboarding = () => {
  const navigate = useNavigate();
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Premium Glassmorphism Navbar */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-background/60 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary neon-glow-emerald">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-foreground">SkillSwap</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <div className="relative group">
              <a 
                href="#" 
                className="hover:text-primary transition-colors"
                onMouseEnter={() => setActiveTooltip("talent")}
                onMouseLeave={() => setActiveTooltip(null)}
              >
                Find Talent
              </a>
              {activeTooltip === "talent" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="absolute top-full left-0 mt-2 w-48 rounded-xl bg-card border border-white/10 p-4 shadow-xl text-xs font-normal z-50">
                  Browse vetted profiles and AI-matched candidates for your missions.
                </motion.div>
              )}
            </div>
            <div className="relative group">
              <a 
                href="#" 
                className="hover:text-primary transition-colors"
                onMouseEnter={() => setActiveTooltip("work")}
                onMouseLeave={() => setActiveTooltip(null)}
              >
                Find Work
              </a>
              {activeTooltip === "work" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="absolute top-full left-0 mt-2 w-48 rounded-xl bg-card border border-white/10 p-4 shadow-xl text-xs font-normal z-50">
                  Connect with high-paying projects and elite teams worldwide.
                </motion.div>
              )}
            </div>
            <div className="relative group">
              <a 
                href="#" 
                className="hover:text-primary transition-colors"
                onMouseEnter={() => setActiveTooltip("enterprise")}
                onMouseLeave={() => setActiveTooltip(null)}
              >
                Enterprise
              </a>
              {activeTooltip === "enterprise" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="absolute top-full left-0 mt-2 w-48 rounded-xl bg-card border border-white/10 p-4 shadow-xl text-xs font-normal z-50">
                  Custom solutions for large-scale engineering and product teams.
                </motion.div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Nav buttons removed from here as per request to move to center */}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 pt-32 lg:pt-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <BrandAnimation />
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary"
              >
                <Sparkles className="h-4 w-4" />
                <span>AI-Powered Marketplace v2.0 is live</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]"
              >
                Hire the top {" "}
                <motion.span 
                  className="inline-block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent italic"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"],
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  1% Talent
                </motion.span> 
                {" "} for your next mission.
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-muted-foreground leading-relaxed max-w-xl"
              >
                Connect with vetted software engineers, designers, and project managers. SkillSwap uses Gemini AI to match you with perfection.
              </motion.p>

              {/* Centered Auth Buttons replacing Search Bar */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center gap-4 pt-4"
              >
                <Button 
                  size="lg" 
                  className="rounded-full px-10 h-14 text-lg font-bold neon-glow-emerald hover:scale-105 transition-transform"
                  onClick={() => navigate("/register")}
                >
                  Join SkillSwap <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                   variant="outline" 
                   size="lg" 
                   className="rounded-full px-10 h-14 text-lg font-bold border-white/20 hover:bg-white/5 hover:scale-105 transition-transform"
                   onClick={() => navigate("/login")}
                >
                  Log in
                </Button>
              </motion.div>

              {/* Social Proof */}
              <div className="flex items-center gap-8 pt-4">
                 <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="h-10 w-10 rounded-full border-4 border-background bg-muted overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?u=${i}`} alt="Avatar" />
                      </div>
                    ))}
                 </div>
                 <div className="text-sm font-medium">
                    <p className="text-foreground">5,000+ Teams trust SkillSwap</p>
                    <div className="flex items-center gap-1 text-primary">
                       {"★★★★★"}<span className="text-muted-foreground ml-1">4.9/5 Rating</span>
                    </div>
                 </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="relative"
            >
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-primary/20 via-accent/20 to-transparent blur-3xl" />
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-card shadow-2xl neon-glow-blue">
                <img 
                  src={heroImage} 
                  alt="Elite Tech Team" 
                  className="w-full h-auto object-cover opacity-90 hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute bottom-6 left-6 right-6 glass-dark p-6 rounded-2xl">
                   <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                         <ShieldCheck className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                         <p className="text-sm font-bold">Vetted & Verified Professionals</p>
                         <p className="text-xs text-muted-foreground">Every talent goes through 3 rounds of technical screening.</p>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Feature Grid */}
      <section className="py-24 lg:py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-black tracking-tight">Systemic Capabilities</h2>
              <p className="text-muted-foreground max-w-md">Our neural architecture enables a paradigm shift in how elite talent interacts with global capital.</p>
            </div>
          </div>
          
          <div className="relative h-[600px] w-full perspective-3000">
            <div className="flex items-center justify-center h-full w-full relative">
            {[
              { 
                icon: <Globe />, 
                title: "Borderless Talent", 
                desc: "Hire from anywhere. We handle contracts, payments, and compliance.",
                image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=800",
                hoverText: "Global Mobility: Synchronizing 15+ timezones."
              },
              { 
                icon: <Users />, 
                title: "Skill Exchange", 
                desc: "The only platform where freelancers swap tasks to accelerate delivery.",
                image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
                hoverText: "Synergy Nodes: Collaborative task resolution."
              },
              { 
                icon: <Sparkles />, 
                title: "AI Project Manager", 
                desc: "Gemini AI breaks down your requirements into actionable milestones.",
                image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
                hoverText: "Automated Logic: Milestone precision tracking."
              },
              { 
                icon: <ShieldCheck />, 
                title: "Secure Contracts", 
                desc: "Smart-contract based escrows ensure safe payments for every mission.",
                image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
                hoverText: "Escrow Logic: Guaranteed financial security."
              }
            ].map((feature, i) => {
              const isActive = hoveredFeature === i;
              // Calculate wide spread: centering around 0
              const idleX = (i - 1.5) * 280; 
              
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: idleX }}
                  whileInView={{ opacity: 1 }}
                  animate={{ 
                    x: hoveredFeature !== null 
                      ? (i === hoveredFeature ? 0 : (i < hoveredFeature ? -450 : 450)) 
                      : idleX,
                    scale: isActive ? 1.05 : 0.95,
                    zIndex: isActive ? 50 : 10 + i,
                    y: isActive ? -15 : 0
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 150, 
                    damping: 25,
                    mass: 0.8
                  }}
                  onMouseEnter={() => setHoveredFeature(i)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  className="absolute h-[480px] w-full max-w-[340px] rounded-[3rem] border border-white/20 bg-[#0B1221] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] cursor-pointer overflow-hidden group transform-gpu"
                >
                  <div className="p-12 h-full flex flex-col justify-between relative z-20" style={{ transform: "translateZ(50px)" }}>
                    <div>
                      <div className="mb-8 h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg">
                        {feature.icon}
                      </div>
                      <h3 className="text-3xl font-black mb-4 text-white tracking-tight">{feature.title}</h3>
                      <p className="text-slate-300 text-base leading-relaxed font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                        {feature.desc}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-3 text-primary font-black text-xs uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 duration-500">
                      <span>Live Capability</span> <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Visual Background - Increased clarity */}
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={feature.image} 
                      alt={feature.title} 
                      className="h-full w-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 scale-110 group-hover:scale-100 brightness-75 group-hover:brightness-100" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1221] via-[#0B1221]/40 to-transparent group-hover:via-[#0B1221]/20 transition-all duration-500" />
                  </div>
                  
                  {/* Hover Reveal Content */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                    className="absolute inset-x-0 bottom-0 p-12 z-30 bg-gradient-to-t from-[#0B1221] to-transparent"
                    style={{ transform: "translateZ(30px)" }}
                  >
                     <p className="text-primary font-black text-[10px] uppercase tracking-[0.3em] mb-2">Neural Hub v2.0</p>
                     <p className="text-white text-xl font-bold leading-tight">{feature.hoverText}</p>
                  </motion.div>
                </motion.div>
              );
            })}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-muted-foreground">© 2026 SkillSwap AI. All rights reserved.</p>
          <div className="flex gap-8 text-sm font-medium text-muted-foreground">
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Status</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Onboarding;
