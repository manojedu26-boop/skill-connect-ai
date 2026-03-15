import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, Sparkles, Globe, Users, ShieldCheck } from "lucide-react";
import heroImage from "@/assets/hero-team.png";

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
      <main className="flex-1 pt-32 lg:pt-48">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
                Hire the top <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent italic">1% Talent</span> for your next mission.
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
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
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
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onMouseEnter={() => setHoveredFeature(i)}
                onMouseLeave={() => setHoveredFeature(null)}
                viewport={{ once: true }}
                className="group relative h-[320px] rounded-3xl border border-white/5 bg-card/50 hover:bg-card hover:border-primary/30 transition-all cursor-default overflow-hidden"
              >
                <div className="p-8 h-full flex flex-col justify-between">
                  <div className="z-10">
                    <div className="mb-4 h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </div>

                {/* Hover Reveal Content */}
                <motion.div 
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ 
                    opacity: hoveredFeature === i ? 1 : 0,
                    scale: hoveredFeature === i ? 1 : 1.1 
                  }}
                  className="absolute inset-0 z-0"
                >
                  <img src={feature.image} alt={feature.title} className="h-full w-full object-cover brightness-[0.3]" />
                  <div className="absolute inset-x-0 bottom-0 p-8 h-full flex flex-col justify-end bg-gradient-to-t from-background via-transparent to-transparent">
                     <p className="text-primary font-black text-[10px] uppercase tracking-widest mb-2">Advanced Intelligence</p>
                     <p className="text-white font-bold leading-tight">{feature.hoverText}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
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
