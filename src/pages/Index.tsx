import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Sparkles, Rocket, ShieldCheck, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Auth logic same as before but integrated into the Action Pod
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const endpoint = isLogin ? "login" : "register";
    try {
      const res = await fetch(`http://localhost:5000/api/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role: "freelancer", firstName: "Talent", lastName: "User" }), // Defaults for simplified pod
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `${isLogin ? 'Login' : 'Signup'} failed`);

      localStorage.setItem("skillswap_token", data.token);
      localStorage.setItem("skillswap_user", JSON.stringify(data.user));
      window.dispatchEvent(new Event("user_updated"));
      
      toast.success(isLogin ? "Welcome back!" : "Account created successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full obsidian-gradient overflow-hidden font-sans text-white selection:bg-emerald-glow/30">
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-glow/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-sapphire-glow/10 blur-[120px] rounded-full" />
      </div>

      {/* Main Content: The Action Pod */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="action-pod w-full max-w-[480px] p-10 md:p-12 depth-shadow"
        >
          {/* Logo / Branding */}
          <div className="flex flex-col items-center mb-10 text-center">
            <motion.div 
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.6 }}
              className="h-16 w-16 rounded-2xl bg-emerald-glow flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.4)]"
            >
              <Sparkles className="h-8 w-8 text-deep-space" />
            </motion.div>
            <h1 className="text-4xl font-display font-black tracking-tighter mb-2">SkillSwap</h1>
            <p className="text-white/40 font-medium tracking-tight">The Next-Gen Talent Ecosystem</p>
          </div>

          {/* Toggle Login/Signup */}
          <div className="flex gap-2 p-1 bg-white/5 rounded-2xl mb-8 border border-white/5">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${isLogin ? 'bg-white/10 text-white shadow-xl' : 'text-white/40 hover:text-white/60'}`}
            >
              Log in
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${!isLogin ? 'bg-white/10 text-white shadow-xl' : 'text-white/40 hover:text-white/60'}`}
            >
              Sign up
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={isLogin ? 'login' : 'signup'}
              initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
              onSubmit={handleAuth}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-white/40 pl-1">Neural ID (Email)</Label>
                <Input
                  type="email"
                  placeholder="name@stellar.io"
                  className="h-14 bg-white/5 border-white/10 rounded-2xl focus:border-emerald-glow/50 focus:ring-4 focus:ring-emerald-glow/10 transition-all text-base placeholder:text-white/10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <Label className="text-xs font-black uppercase tracking-widest text-white/40">Access Core (Password)</Label>
                  {isLogin && <button type="button" className="text-[10px] font-bold text-emerald-glow hover:underline">RECOVER</button>}
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-14 bg-white/5 border-white/10 rounded-2xl focus:border-emerald-glow/50 focus:ring-4 focus:ring-emerald-glow/10 transition-all text-base placeholder:text-white/10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button 
                disabled={isLoading}
                className="w-full h-16 rounded-2xl bg-emerald-glow text-deep-space font-display font-black text-lg hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] transition-all active:scale-[0.98]"
              >
                {isLoading ? "AUTHORIZING..." : (isLogin ? "INITIALIZE SESSION" : "CREATE ECOSYSTEM")}
              </Button>
            </motion.form>
          </AnimatePresence>

          {/* Social Auth Footer */}
          <div className="mt-10 pt-10 border-t border-white/5 space-y-4">
             <div className="flex items-center gap-4 text-white/20 text-xs font-black uppercase tracking-[0.2em] mb-4">
               <div className="h-px flex-1 bg-white/5" />
               External Link
               <div className="h-px flex-1 bg-white/5" />
             </div>
             <div className="grid grid-cols-2 gap-4">
               <Button variant="outline" className="h-12 border-white/10 bg-white/[0.02] hover:bg-white/5 rounded-xl text-xs font-bold gap-3">
                 <svg className="h-4 w-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#fff" opacity="0.8"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#fff" opacity="0.8"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fff" opacity="0.8"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#fff" opacity="0.8"/></svg>
                 Google
               </Button>
               <Button variant="outline" className="h-12 border-white/10 bg-white/[0.02] hover:bg-white/5 rounded-xl text-xs font-bold gap-3">
                 <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                 Facebook
               </Button>
             </div>
          </div>
        </motion.div>
      </div>

      {/* Trust Badges: Floating Depth */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-12 text-white/10 font-bold tracking-widest scale-75 md:scale-100 opacity-50">
        <div className="flex items-center gap-3">
          <Rocket className="h-6 w-6" />
          FAST TRACK
        </div>
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-6 w-6" />
          SECURE HUB
        </div>
      </div>
    </div>
  );
};

export default Index;
