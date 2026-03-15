import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, Sparkles, Globe, Users, ShieldCheck } from "lucide-react";
import heroImage from "@/assets/hero-team.png";

const Onboarding = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

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
            <a href="#" className="hover:text-primary transition-colors">Find Talent</a>
            <a href="#" className="hover:text-primary transition-colors">Find Work</a>
            <a href="#" className="hover:text-primary transition-colors">Enterprise</a>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="font-semibold" onClick={() => navigate("/login")}>Log in</Button>
            <Button variant="hero" className="rounded-full px-6 neon-glow-blue" onClick={() => navigate("/register")}>Join Free</Button>
          </div>
        </div>
      </nav>

      {/* Centered Hero Section */}
      <main className="flex-1 relative flex items-center justify-center p-6 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse delay-1000" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 w-full max-w-2xl"
        >
          {/* Main Floating Glass Card */}
          <div className="glass-dark border border-white/10 rounded-[3rem] p-10 md:p-16 shadow-2xl backdrop-blur-3xl text-center space-y-10">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-black text-primary uppercase tracking-widest"
              >
                <Sparkles className="h-4 w-4" />
                <span>Next-Gen Marketplace</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-6xl font-black tracking-tighter leading-tight"
              >
                Elite Talent. <br />
                <span className="text-teal">Perfectly Matched.</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-md mx-auto"
              >
                The world's first AI-powered skill exchange. Hire the top 1% or swap skills to accelerate your mission.
              </motion.p>
            </div>

            {/* Glowing Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="relative group w-full"
            >
              <div className="absolute -inset-1 rounded-[2rem] bg-teal-gradient opacity-10 blur-xl group-hover:opacity-20 transition-opacity" />
              <div className="relative flex items-center bg-white/5 rounded-[2rem] border border-white/10 p-2 shadow-2xl">
                <Search className="ml-5 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Senior React Engineer..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-none bg-transparent text-sm md:text-base focus-visible:ring-0 placeholder:text-muted-foreground/50 h-10 md:h-12"
                />
                <Button variant="hero" className="rounded-full h-10 py-0 px-6 font-bold gap-2 text-xs">
                  Search <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>

            {/* Direct Action Card (Auth Buttons) */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <Button 
                onClick={() => navigate("/register")}
                className="w-full sm:w-auto rounded-2xl px-10 h-14 bg-teal-gradient text-white font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-lg shadow-teal/20"
              >
                Get Started
              </Button>
              <Button 
                variant="ghost"
                onClick={() => navigate("/login")}
                className="w-full sm:w-auto rounded-2xl px-10 h-14 border border-white/10 hover:bg-white/5 font-black uppercase tracking-widest text-xs transition-all"
              >
                Log In
              </Button>
            </motion.div>

            {/* Platform Stats */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="pt-6 border-t border-white/5 flex items-center justify-center gap-8"
            >
               <div className="text-center">
                  <p className="text-xl font-black text-white">$140M+</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Earned</p>
               </div>
               <div className="w-px h-8 bg-white/5" />
               <div className="text-center">
                  <p className="text-xl font-black text-white">12k+</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Vetted</p>
               </div>
               <div className="w-px h-8 bg-white/5" />
               <div className="text-center">
                  <p className="text-xl font-black text-white">4.9/5</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Rating</p>
               </div>
            </motion.div>
          </div>
        </motion.div>
      </main>

      {/* Feature Grid */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Globe />, title: "Borderless Talent", desc: "Hire from anywhere. We handle contracts, payments, and compliance." },
              { icon: <Users />, title: "Skill Exchange", desc: "The only platform where freelancers swap tasks to accelerate delivery." },
              { icon: <Sparkles />, title: "AI Project Manager", desc: "Gemini AI breaks down your requirements into actionable milestones." }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group p-8 rounded-3xl border border-white/5 bg-card/50 hover:bg-card hover:border-primary/30 transition-all cursor-default"
              >
                <div className="mb-4 h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
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
