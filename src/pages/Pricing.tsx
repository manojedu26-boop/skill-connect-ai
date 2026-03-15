import DashboardLayout from "@/components/DashboardLayout";
import { Check, Star, Zap, Shield, Globe, Cpu, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function Pricing() {
  const triggerUpgrade = () => {
    window.dispatchEvent(new Event("open_premium_modal"));
  };

  return (
    <DashboardLayout>
      <div className="max-w-[1200px] mx-auto pb-20">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-20 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-teal/5 blur-[120px] -z-10 rounded-full" />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
             <Badge className="bg-navy text-white px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] mb-4">
                ELITE ECOSYSTEM
             </Badge>
          </motion.div>
          <h1 className="text-6xl font-black text-navy tracking-tighter leading-[0.9]">
            Architectural <span className="text-teal underline decoration-teal/20 underline-offset-8">Growth</span> Plans
          </h1>
          <p className="text-lg text-slate-500 font-bold max-w-2xl mx-auto leading-relaxed">
            Choose the level of intelligence and network priority required for your professional trajectory.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Tier 1: Foundation */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
            className="group p-10 rounded-[3rem] bg-white border border-slate-100 shadow-soft hover:shadow-premium transition-all duration-500 flex flex-col"
          >
            <div className="space-y-2 mb-8">
               <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                  <Globe className="h-6 w-6" />
               </div>
               <h3 className="text-2xl font-black text-navy">Foundation</h3>
               <p className="text-xs font-bold text-slate-400">Entry level market access.</p>
            </div>
            
            <div className="mb-10">
               <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-navy">$0</span>
                  <span className="text-sm font-black text-slate-300 uppercase tracking-widest">/mo</span>
               </div>
            </div>

            <ul className="flex-1 space-y-4 mb-10">
               {[
                 "Standard Search Visibility",
                 "Basic AI Matching (Limited)",
                 "5 Proposals / Month",
                 "Community Support"
               ].map((feat, i) => (
                 <li key={i} className="flex gap-3 text-sm font-bold text-slate-600">
                    <Check className="h-5 w-5 text-teal shrink-0" /> {feat}
                 </li>
               ))}
            </ul>

            <Button variant="outline" className="w-full h-14 rounded-2xl border-slate-200 text-navy font-black text-xs uppercase tracking-widest hover:bg-slate-50">
               CURRENT STATUS
            </Button>
          </motion.div>

          {/* Tier 2: Elite Pro */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
            className="group p-1 rounded-[3rem] bg-teal-gradient shadow-premium relative lg:-mt-6 lg:mb-6"
          >
            <div className="absolute inset-0 bg-grid-white/[0.1] rounded-[3rem]" />
            <div className="bg-[#0B1221] rounded-[2.8rem] p-10 h-full flex flex-col relative z-10 overflow-hidden">
                <div className="absolute top-0 right-0 p-8">
                   <Badge className="bg-teal text-white border-none px-3 py-1 font-black text-[9px] tracking-widest uppercase">MOST DEPLOYED</Badge>
                </div>
                
                <div className="space-y-2 mb-8">
                   <div className="h-12 w-12 rounded-2xl bg-teal/10 flex items-center justify-center text-teal">
                      <Cpu className="h-6 w-6" />
                   </div>
                   <h3 className="text-2xl font-black text-white">Elite Pro</h3>
                   <p className="text-xs font-bold text-teal/60">For high-intensity professional growth.</p>
                </div>
                
                <div className="mb-10">
                   <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-black text-white">$15</span>
                      <span className="text-sm font-black text-slate-500 uppercase tracking-widest">/mo</span>
                   </div>
                </div>

                <ul className="flex-1 space-y-4 mb-10">
                   {[
                     "Priority AI Matching (Unlimited)",
                     "Verified Professional Badge",
                     "Unlimited Proposals",
                     "Premium Messaging Suite",
                     "Advanced Market Analytics"
                   ].map((feat, i) => (
                     <li key={i} className="flex gap-3 text-sm font-bold text-slate-300">
                        <Check className="h-5 w-5 text-teal shrink-0" /> {feat}
                     </li>
                   ))}
                </ul>

                <Button onClick={triggerUpgrade} variant="hero" className="w-full h-14 rounded-2xl bg-teal text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-teal/20 scale-100 hover:scale-105 active:scale-95 transition-all">
                   STRIKE TO UPGRADE
                </Button>
            </div>
          </motion.div>

          {/* Tier 3: Elite Legend */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            className="group p-10 rounded-[3rem] bg-white border border-slate-100 shadow-soft hover:shadow-premium transition-all duration-500 flex flex-col"
          >
            <div className="space-y-2 mb-8">
               <div className="h-12 w-12 rounded-2xl bg-orange/10 flex items-center justify-center text-orange">
                  <Shield className="h-6 w-6" />
               </div>
               <h3 className="text-2xl font-black text-navy">Elite Legend</h3>
               <p className="text-xs font-bold text-slate-400">Total autonomy and network dominance.</p>
            </div>
            
            <div className="mb-10">
               <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-navy">$35</span>
                  <span className="text-sm font-black text-slate-300 uppercase tracking-widest">/mo</span>
               </div>
            </div>

            <ul className="flex-1 space-y-4 mb-10">
               {[
                 "Everything in Elite Pro",
                 "Neural Match (Deep AI Integration)",
                 "Zero Platform Fees",
                 "Dedicated Account Manager",
                 "Elite Networking Events"
               ].map((feat, i) => (
                 <li key={i} className="flex gap-3 text-sm font-bold text-slate-600">
                    <Check className="h-5 w-5 text-orange shrink-0" /> {feat}
                 </li>
               ))}
            </ul>

            <Button onClick={triggerUpgrade} variant="ghost" className="w-full h-14 rounded-2xl bg-[#0B1221] text-white font-black text-xs uppercase tracking-widest hover:bg-[#0B1221]/90 transition-all">
               UPGRADE TO LEGEND
            </Button>
          </motion.div>
        </div>

        {/* Feature Comparison Grid (Brief) */}
        <div className="mt-32 p-12 rounded-[4rem] bg-slate-50 border border-slate-200">
           <div className="grid md:grid-cols-4 gap-12 text-center">
              {[
                { icon: Shield, title: "Secure Bonds", desc: "Enterprise-grade smart contract protection." },
                { icon: Zap, title: "Velocity Match", desc: "Instant matching via high-latency neural nodes." },
                { icon: Globe, title: "Global Reach", desc: "Deployment across 150+ economic zones." },
                { icon: Cpu, title: "AI Core", desc: "Gemini 1.5 Pro powered insight engine." }
              ].map((item, i) => (
                <div key={i} className="space-y-4">
                   <div className="h-14 w-14 rounded-3xl bg-white shadow-soft flex items-center justify-center text-navy mx-auto">
                      <item.icon className="h-7 w-7" />
                   </div>
                   <h4 className="font-black text-sm text-navy uppercase tracking-widest">{item.title}</h4>
                   <p className="text-[11px] font-bold text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
