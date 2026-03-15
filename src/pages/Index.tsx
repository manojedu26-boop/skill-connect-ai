import { useState, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Sparkles, Rocket, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsAuthLoading(true);
    // Simulate auth
    setTimeout(() => {
      const userData = { email, firstName: email.split("@")[0], role: "freelancer" };
      localStorage.setItem("skillswap_user", JSON.stringify(userData));
      toast.success(`${isLogin ? "Session Initialized" : "Account Synchronized"}`);
      navigate("/freelancer-dashboard");
    }, 1000);
  };

  return (
    <>
      <LoadingScreen onComplete={() => setIsLoading(false)} />
      
      <AnimatePresence>
        {!isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="min-h-screen bg-[#030712] text-white selection:bg-emerald-glow selection:text-deep-space font-sans overflow-x-hidden"
          >
            {/* Background Cinematic Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-glow/5 rounded-full blur-[140px] animate-pulse" />
              <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-sapphire-glow/5 rounded-full blur-[140px]" />
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.pattern')] opacity-[0.03]" />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
               {/* Hero Pod */}
               <motion.div 
                 initial={{ scale: 0.9, y: 40, opacity: 0 }}
                 animate={{ scale: 1, y: 0, opacity: 1 }}
                 transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                 className="w-full max-w-lg"
               >
                 <div className="action-pod p-10 md:p-12 relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-glow to-sapphire-glow rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-pulse" />
                    
                    <div className="relative space-y-8">
                       <div className="flex flex-col items-center text-center space-y-4">
                          <motion.div 
                            whileHover={{ rotate: 180 }}
                            transition={{ duration: 0.6 }}
                            className="h-16 w-16 rounded-2xl bg-emerald-glow flex items-center justify-center mb-2 shadow-[0_0_30px_rgba(16,185,129,0.4)]"
                          >
                            <Sparkles className="h-8 w-8 text-deep-space" />
                          </motion.div>
                          <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
                             Status: Ready for Sync
                          </div>
                          <h1 className="text-4xl font-display font-black tracking-tighter leading-none">
                             {isLogin ? "INITIALIZE SESSION" : "SYNCHRONIZE PROFILE"}
                          </h1>
                          <p className="text-white/30 text-sm font-medium max-w-[320px]">
                             Enter your neural credentials to access the talent net.
                          </p>
                       </div>

                       <form onSubmit={handleAuth} className="space-y-6">
                          <div className="space-y-4">
                             <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-white/20 pl-1">Neural ID</Label>
                                <Input 
                                  type="email" 
                                  placeholder="name@stellar.io" 
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  className="h-14 px-6 rounded-2xl bg-white/5 border-white/10 focus:border-emerald-glow/40 transition-all outline-none text-white font-mono placeholder:text-white/10"
                                  required
                                />
                             </div>
                             <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-white/20 pl-1">Access Key</Label>
                                <div className="relative">
                                   <Input 
                                     type={showPassword ? "text" : "password"} 
                                     placeholder="••••••••" 
                                     value={password}
                                     onChange={(e) => setPassword(e.target.value)}
                                     className="h-14 px-6 rounded-2xl bg-white/5 border-white/10 focus:border-emerald-glow/40 transition-all outline-none text-white font-mono placeholder:text-white/10"
                                     required
                                   />
                                   <button 
                                     type="button"
                                     onClick={() => setShowPassword(!showPassword)}
                                     className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white"
                                   >
                                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                   </button>
                                </div>
                             </div>
                          </div>
                          
                          <Button variant="hero" type="submit" disabled={isAuthLoading} className="w-full h-16 rounded-2xl bg-emerald-glow text-deep-space font-black text-xs uppercase tracking-[0.3em] shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:scale-[1.02] active:scale-95 transition-all">
                             {isAuthLoading ? "SYNCHRONIZING..." : (isLogin ? "LAUNCH COMMAND CENTER" : "REGISTER NODE")}
                          </Button>
                       </form>

                       <button 
                         onClick={() => setIsLogin(!isLogin)}
                         className="w-full text-center text-[10px] font-black uppercase tracking-[0.2em] text-white/20 hover:text-emerald-glow transition-colors"
                       >
                          {isLogin ? "Don't have an access key? Sync now" : "Already synchronized? Login"}
                       </button>
                    </div>
                 </div>
               </motion.div>
            </div>
            
            {/* Scrolling Text Ribbon */}
            <div className="fixed bottom-0 left-0 w-full overflow-hidden py-6 border-t border-white/5 backdrop-blur-3xl">
               <motion.div 
                 animate={{ x: [0, -1000] }}
                 transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                 className="flex whitespace-nowrap gap-20 text-[10px] font-black text-white/10 uppercase tracking-[1em]"
               >
                 <span>Neural Matching Active</span>
                 <span>Global Talent Protocol v4.0.2</span>
                 <span>Deep Space Obsidian Enabled</span>
                 <span>Aura AI Online</span>
                 <span>Hyper-Realistic Assets Loaded</span>
                 <span>SkillSwap Ecosystem Integrated</span>
               </motion.div>
            </div>

            {/* Trust Badges */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-12 text-white/10 font-black tracking-[0.5em] text-[10px]">
              <div className="flex items-center gap-3">
                <Rocket className="h-4 w-4" /> FAST TRACK
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-4 w-4" /> SECURE HUB
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;
