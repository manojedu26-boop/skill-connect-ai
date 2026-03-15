import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { FolderOpen, MessageSquare, TrendingUp, Briefcase, Sparkles, ArrowRight, Target, Globe } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { mockProjects } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import AISmartMatch from "@/components/AISmartMatch";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Proposals", value: "34", icon: FolderOpen, change: "+3 this week", color: "text-teal", url: "/my-proposals" },
  { label: "Contracts", value: "02", icon: Briefcase, change: "Steady", color: "text-navy", url: "/freelancer-dashboard" },
  { label: "Messages", value: "05", icon: MessageSquare, change: "Unread", color: "text-orange", url: "/messages" },
  { label: "Earnings", value: "$4.2k", icon: TrendingUp, change: "+15%", color: "text-teal", url: "/freelancer-dashboard" },
];

const FreelancerDashboard = () => {
  const navigate = useNavigate();
  const userStr = localStorage.getItem("skillswap_user");
  const user = userStr ? JSON.parse(userStr) : null;
  const firstName = user?.firstName || "Jake";

  return (
    <DashboardLayout>
      <div className="space-y-12">
        {/* Bento Grid Header Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8 bento-card bg-deep-space-lighter overflow-hidden relative group depth-shadow border-white/5">
             <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-glow/5 rounded-full blur-[120px] -mr-40 -mt-40 transition-transform group-hover:scale-125 duration-1000" />
             <div className="relative z-10 space-y-6">
               <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-glow/10 text-emerald-glow text-[10px] font-black uppercase tracking-[0.2em] w-fit border border-emerald-glow/20">
                  <Sparkles className="h-4 w-4" /> NEURAL ENGINE ACTIVE
               </div>
               <h1 className="text-5xl md:text-6xl font-display font-black text-white leading-tight tracking-tighter">Welcome home, {firstName}</h1>
               <p className="text-white/40 text-xl max-w-xl leading-relaxed">Your professional ecosystem is pulsating. We've detected <span className="text-emerald-glow font-black">12 elite matches</span> optimized for your core stack.</p>
               <div className="flex gap-6 pt-6">
                  <Button onClick={() => navigate("/projects")} variant="hero" className="rounded-2xl px-12 h-16 text-base font-black bg-emerald-glow text-deep-space shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:scale-105 transition-all">Find Projects</Button>
                  <Button onClick={() => navigate("/my-portfolio")} variant="outline" className="rounded-2xl px-10 h-16 border-white/10 text-white hover:bg-white/5 transition-all font-black text-base">Elite Portfolio</Button>
               </div>
             </div>
          </div>
          
          <div className="md:col-span-4 bento-card bg-emerald-glow text-deep-space flex flex-col justify-between group depth-shadow border-none overflow-hidden">
             <div className="relative z-10 space-y-3 p-2">
                <p className="text-[10px] font-black text-deep-space/60 uppercase tracking-[0.3em]">Market Pulse</p>
                <p className="text-3xl font-display font-black leading-none">Global Tech <br/>Demand: <span className="underline decoration-4">PEAK</span></p>
             </div>
             <div className="relative h-32 mt-6">
                <div className="absolute bottom-0 left-0 w-full flex items-end gap-1.5 px-2 h-full">
                   {[40, 70, 45, 95, 65, 85, 60, 90, 40].map((h, i) => (
                     <motion.div 
                        key={i} 
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: i * 0.05, duration: 1.5, ease: "easeOut" }}
                        className="flex-1 bg-deep-space/20 rounded-t-xl hover:bg-deep-space/40 transition-colors"
                     />
                   ))}
                </div>
             </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate(stat.url)}
              className="bento-card bg-card/40 backdrop-blur-xl flex flex-col gap-8 cursor-pointer hover:border-emerald-glow/30 depth-shadow transition-all group active:scale-95 border-white/5"
            >
              <div className="flex items-center justify-between">
                <div className={`h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center transition-all group-hover:bg-emerald-glow group-hover:text-deep-space`}>
                   <stat.icon className={`h-7 w-7 ${i === 2 ? 'text-sapphire-glow' : 'text-emerald-glow'} group-hover:text-inherit transition-transform group-hover:scale-110`} />
                </div>
                <span className="text-[10px] font-black text-emerald-glow uppercase tracking-widest bg-emerald-glow/5 px-3 py-1.5 rounded-xl border border-emerald-glow/10">{stat.change}</span>
              </div>
              <div>
                <p className="text-4xl font-display font-black text-white tracking-tighter">{stat.value}</p>
                <p className="text-[11px] font-black text-white/20 uppercase tracking-[0.25em] mt-2">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mid-level Modules */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           <div className="lg:col-span-8">
              <AISmartMatch />
           </div>
           <div className="lg:col-span-4 bento-card bg-deep-space-lighter p-8 flex flex-col justify-between group overflow-hidden relative depth-shadow border-white/5">
              <div className="absolute -right-20 -bottom-20 w-56 h-56 bg-emerald-glow/5 rounded-full blur-[100px] group-hover:bg-emerald-glow/10 transition-all" />
              <div className="space-y-6 relative z-10">
                 <p className="text-[10px] font-black text-emerald-glow uppercase tracking-[0.3em] flex items-center gap-3">
                    <Target className="h-5 w-5" /> Neural Gap Analysis
                 </p>
                 <div className="flex items-end justify-center h-28 gap-3">
                    {[65, 80, 45, 95, 75].map((v, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-3">
                         <div className="w-full bg-white/5 rounded-full h-2 relative overflow-hidden ring-1 ring-white/5">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${v}%` }} transition={{ delay: i * 0.1, duration: 1.5 }} className={`absolute left-0 h-full ${i === 3 ? 'bg-sapphire-glow shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-emerald-glow shadow-[0_0_15px_rgba(16,185,129,0.5)]'}`} />
                         </div>
                         <span className="text-[9px] font-black text-white/20 uppercase tracking-tighter">{['React', 'TS', 'Node', 'Next.js', 'UI'][i]}</span>
                      </div>
                    ))}
                 </div>
                 <p className="text-xs text-white/40 font-medium leading-relaxed">Your <span className="text-sapphire-glow font-black">Next.js</span> proficiency is optimized for <span className="text-white font-bold">L3 Projects</span>. System recommends: <span className="text-emerald-glow font-black italic">"Advanced Server Patterns"</span>.</p>
              </div>
              <Button variant="outline" className="mt-8 w-full h-14 rounded-2xl border-white/10 bg-white/5 text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-all">
                 SYNERGIZE STACK
              </Button>
           </div>
        </div>

        {/* Global Opportunities Heatmap (Stays dark, but update tokens) */}
        <div className="bento-card bg-deep-space-lighter p-12 relative overflow-hidden group depth-shadow border-white/5">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.05),transparent_70%)]" />
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="space-y-6 max-w-lg">
                 <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-emerald-glow/20 flex items-center justify-center">
                       <Globe className="h-6 w-6 text-emerald-glow underline" />
                    </div>
                    <p className="text-xs font-black uppercase tracking-[0.4em] text-emerald-glow">Global Signal</p>
                 </div>
                 <h2 className="text-4xl md:text-5xl font-display font-black leading-none text-white tracking-tighter">Market Connectivity</h2>
                 <p className="text-white/40 text-lg font-medium leading-relaxed">High-fidelity job clusters detected in <span className="text-white">Silicon Valley</span>, <span className="text-white">Berlin</span>, and <span className="text-white">Singapore</span>. Current connectivity index: <span className="text-emerald-glow font-black">9.8/10</span>.</p>
                 <div className="flex gap-10 pt-6">
                    <div className="flex flex-col">
                       <span className="text-4xl font-display font-black text-emerald-glow">94%</span>
                       <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mt-1">Ecosystem Fit</span>
                    </div>
                    <div className="w-px h-14 bg-white/5" />
                    <div className="flex flex-col">
                       <span className="text-4xl font-display font-black text-sapphire-glow">2.4k</span>
                       <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mt-1">Stellar Nodes</span>
                    </div>
                 </div>
              </div>
              
              <div className="relative h-80 w-full md:w-[480px] bg-white/5 rounded-[3rem] border border-white/10 overflow-hidden flex items-center justify-center backdrop-blur-3xl depth-shadow">
                 <div className="absolute inset-0 flex items-center justify-center">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.05, 0.2] }}
                        transition={{ repeat: Infinity, duration: 4, delay: i * 0.4 }}
                        className="absolute border border-emerald-glow/10 rounded-full"
                        style={{ width: `${(i + 1) * 70}px`, height: `${(i + 1) * 70}px` }}
                      />
                    ))}
                    <div className="relative h-4 w-4 bg-emerald-glow rounded-full shadow-[0_0_30px_rgba(16,185,129,0.8)]">
                       <motion.div animate={{ scale: [1, 2.5, 1], opacity: [0.8, 0, 0.8] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute -inset-4 bg-emerald-glow/30 rounded-full" />
                    </div>
                 </div>
                 <div className="absolute bottom-8 left-8 flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-emerald-glow animate-pulse" />
                    <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Synchronizing Neural Network</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Projects & Activity Grid */}
        <div className="grid lg:grid-cols-12 gap-10 pb-12">
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-3xl font-display font-black text-white tracking-tight">Prime Opportunities</h2>
              <Button onClick={() => navigate("/projects")} variant="ghost" className="text-emerald-glow font-black text-xs uppercase tracking-[0.2em] gap-3 hover:bg-emerald-glow/10 px-6 h-12 rounded-2xl transition-all">
                VIEW MARKET <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-6">
              {mockProjects.slice(0, 3).map(p => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-3xl font-display font-black text-white tracking-tight">Event Horizon</h2>
            </div>
            <div className="bento-card bg-deep-space-lighter border border-white/5 flex flex-col items-center justify-center text-center py-24 depth-shadow relative overflow-hidden group">
                <div className="absolute inset-0 bg-sapphire-glow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="h-24 w-24 rounded-[2rem] bg-white/5 flex items-center justify-center mb-8 relative z-10 scale-110 group-hover:bg-sapphire-glow/10 transition-all">
                   <Briefcase className="h-12 w-12 text-white/10 group-hover:text-sapphire-glow transition-colors" />
                </div>
                <h3 className="text-2xl font-black text-white relative z-10 uppercase tracking-tighter">Signal Loss</h3>
                <p className="text-white/30 text-base max-w-[280px] mt-3 mb-10 font-medium leading-relaxed relative z-10">No active proposals in the current sector. Initialize your first bid to break the silence.</p>
                <Button onClick={() => navigate("/projects")} className="relative z-10 rounded-2xl px-12 h-16 bg-white text-deep-space hover:bg-emerald-glow hover:text-deep-space font-black text-base shadow-2xl transition-all hover:scale-105">SUBMIT BID</Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FreelancerDashboard;
