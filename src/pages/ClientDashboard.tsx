import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Users, FolderOpen, MessageSquare, TrendingUp, ArrowRight, Zap, Activity, LineChart } from "lucide-react";
import FreelancerCard from "@/components/FreelancerCard";
import ProjectCard from "@/components/ProjectCard";
import { mockFreelancers, mockProjects } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import AISmartMatch from "@/components/AISmartMatch";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Active Freelancers", value: "2,847", icon: Users, change: "+12%", url: "/freelancers" },
  { label: "Open Projects", value: "463", icon: FolderOpen, change: "+8%", url: "/projects" },
  { label: "Messages", value: "28", icon: MessageSquare, change: "+3", url: "/messages" },
  { label: "Match Rate", value: "94%", icon: TrendingUp, change: "+2%", url: "/client-dashboard" },
];

const ClientDashboard = () => {
  const navigate = useNavigate();
  const userStr = localStorage.getItem("skillswap_user");
  const user = userStr ? JSON.parse(userStr) : null;
  const firstName = user?.firstName || "Manoj";

  return (
    <DashboardLayout>
      <div className="space-y-12">
        {/* Elite Header Pod */}
        <div className="bento-card bg-deep-space-lighter overflow-hidden relative group depth-shadow border-white/5 p-12">
           <div className="absolute -right-32 -top-32 w-96 h-96 bg-sapphire-glow/10 rounded-full blur-[140px] transition-transform group-hover:scale-125 duration-1000" />
           <div className="relative z-10 space-y-6">
             <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-sapphire-glow/10 text-sapphire-glow text-[10px] font-black uppercase tracking-[0.3em] w-fit border border-sapphire-glow/20">
                <Activity className="h-4 w-4 animate-pulse" /> COMMAND CENTER ACTIVE
             </div>
             <h1 className="text-5xl md:text-6xl font-display font-black text-white leading-tight tracking-tighter">Welcome back, {firstName}</h1>
             <p className="text-white/40 text-xl max-w-xl leading-relaxed font-medium">Your project ecosystem is expanding. High-fidelity talent clusters are forming around your active requirements.</p>
             <div className="flex gap-6 pt-6">
                <Button onClick={() => navigate("/projects")} variant="hero" className="rounded-2xl px-12 h-16 text-base font-black bg-white text-deep-space shadow-2xl hover:scale-105 transition-all">POST MISSION</Button>
                <Button onClick={() => navigate("/freelancers")} variant="outline" className="rounded-2xl px-10 h-16 border-white/10 text-white hover:bg-white/5 transition-all font-black text-base">SCAN TALENT</Button>
             </div>
           </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate(stat.url)}
              className="bento-card bg-card/40 backdrop-blur-xl flex flex-col gap-8 cursor-pointer hover:border-sapphire-glow/30 depth-shadow transition-all group active:scale-95 border-white/5 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center justify-between relative z-10">
                <div className="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center transition-all group-hover:bg-sapphire-glow group-hover:text-white">
                   <stat.icon className="h-7 w-7 text-sapphire-glow group-hover:text-inherit transition-transform group-hover:scale-110" />
                </div>
                <span className="text-[10px] font-black text-emerald-glow uppercase tracking-widest bg-emerald-glow/5 px-3 py-1.5 rounded-xl border border-emerald-glow/10">{stat.change}</span>
              </div>
              <div className="relative z-10">
                <p className="text-4xl font-display font-black text-white tracking-tighter">{stat.value}</p>
                <p className="text-[11px] font-black text-white/20 uppercase tracking-[0.25em] mt-2">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Intelligence Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           <div className="lg:col-span-8">
              <AISmartMatch />
           </div>
           <div className="lg:col-span-4 bento-card bg-deep-space-lighter p-8 space-y-8 relative overflow-hidden group border-white/5 depth-shadow">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-glow/5 rounded-full blur-[100px] -mr-24 -mt-24 group-hover:bg-emerald-glow/10 transition-all duration-1000" />
              <div className="space-y-2 relative z-10">
                 <p className="text-[10px] font-black text-emerald-glow uppercase tracking-[0.3em] flex items-center gap-3">
                    <Zap className="h-5 w-5" /> Neural Pipeline
                 </p>
                 <h4 className="text-2xl font-display font-black text-white">Elite Sourcing</h4>
              </div>
              
              <div className="space-y-4 relative z-10">
                 {[
                   { name: "Sarah K.", role: "Lead Systems Architect", match: "98%", status: "Elite" },
                   { name: "Alex M.", role: "Fullstack Engineering", match: "94%", status: "Verified" },
                   { name: "Dmitri V.", role: "Cloud Security", match: "91%", status: "Senior" }
                 ].map((talent, i) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: i * 0.15 }}
                     className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-glow/20 transition-all group/item cursor-pointer"
                   >
                     <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-deep-space-lighter border border-white/10 flex items-center justify-center text-[10px] font-black text-white/40 group-hover/item:border-emerald-glow/40 group-hover/item:text-emerald-glow transition-all">
                           {talent.name.split(' ').map(n=>n[0]).join('')}
                        </div>
                        <div>
                           <p className="text-sm font-black text-white">{talent.name}</p>
                           <p className="text-[9px] text-white/20 font-black uppercase tracking-widest">{talent.role}</p>
                        </div>
                     </div>
                     <span className="text-[10px] font-black bg-emerald-glow/10 text-emerald-glow px-3 py-1 rounded-xl border border-emerald-glow/20">{talent.match}</span>
                   </motion.div>
                 ))}
              </div>
              
              <Button variant="hero" className="w-full h-14 rounded-2xl bg-emerald-glow text-deep-space font-black text-xs uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:scale-105 transition-all">
                 SYNERGIZE PIPELINE
              </Button>
           </div>
        </div>

        {/* Global Market Intelligence Heatmap */}
        <div className="bento-card bg-deep-space-lighter p-12 border border-white/5 relative overflow-hidden group depth-shadow">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.05),transparent_70%)]" />
           <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-6">
                 <div className="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center">
                    <LineChart className="h-7 w-7 text-emerald-glow" />
                 </div>
                 <h3 className="text-4xl font-display font-black text-white leading-none tracking-tighter">Market Equilibrium</h3>
                 <p className="text-white/40 text-lg font-medium leading-relaxed">Systematic rates for <span className="text-white font-black">AI & Cloud Engineering</span> have surged <span className="text-emerald-glow font-black">12.4%</span>. Early acquisition is recommended.</p>
              </div>

              <div className="md:col-span-2 grid grid-cols-2 gap-8">
                 <div className="p-8 rounded-[3rem] bg-white/[0.02] border border-white/5 space-y-6 depth-shadow-sm hover:border-emerald-glow/20 transition-all">
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] flex items-center justify-between">
                       Average Tech Rate <span className="text-emerald-glow font-black">↑ 4.2%</span>
                    </p>
                    <div className="flex items-end gap-1.5 h-20">
                       {[30, 45, 35, 75, 55, 95, 65, 85].map((h, i) => (
                         <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{duration: 1.5, delay: i*0.05}} className="flex-1 bg-emerald-glow/10 rounded-t-lg hover:bg-emerald-glow/30 transition-all" />
                       ))}
                    </div>
                    <p className="text-4xl font-display font-black text-white">$145<span className="text-xl font-black text-white/20">/hr</span></p>
                 </div>
                 
                 <div className="p-8 rounded-[3rem] bg-white/[0.02] border border-white/5 space-y-6 depth-shadow-sm hover:border-sapphire-glow/20 transition-all">
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] flex items-center justify-between">
                       Sourcing Efficiency <span className="text-sapphire-glow font-black">OPTIMIZED</span>
                    </p>
                    <div className="flex items-center justify-center h-20">
                       <Zap className="h-12 w-12 text-sapphire-glow animate-pulse drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                    </div>
                    <div>
                       <p className="text-4xl font-display font-black text-white">2.4 Days</p>
                       <p className="text-[11px] font-black text-white/20 uppercase tracking-[0.2em] mt-1">Ecosystem Velocity</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Talent & Activity Split */}
        <div className="grid gap-12 lg:grid-cols-12 pb-12">
          <div className="lg:col-span-12 xl:col-span-7 space-y-8">
            <div className="px-2 flex items-center justify-between">
              <h2 className="text-3xl font-display font-black text-white tracking-tight">Prime Personnel</h2>
              <Button variant="ghost" className="text-sapphire-glow font-black text-xs uppercase tracking-[0.2em] gap-3 px-6 h-12 rounded-2xl hover:bg-sapphire-glow/10" onClick={() => navigate("/freelancers")}>
                SCAN NETWORK <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-6">
              {mockFreelancers.slice(0, 2).map(f => (
                <FreelancerCard key={f.id} freelancer={f} onView={() => navigate(`/freelancers/${f.id}`)} />
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-12 xl:col-span-5 space-y-8">
            <div className="px-2">
              <h2 className="text-3xl font-display font-black text-white tracking-tight">Mission History</h2>
            </div>
            <div className="bento-card bg-deep-space-lighter border border-white/5 flex flex-col items-center justify-center text-center py-20 depth-shadow relative overflow-hidden group">
                <div className="absolute inset-0 bg-sapphire-glow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="h-28 w-28 rounded-[2.5rem] bg-white/5 flex items-center justify-center mb-8 relative z-10 group-hover:bg-sapphire-glow/20 transition-all scale-110">
                  <FolderOpen className="h-12 w-12 text-white/10 group-hover:text-sapphire-glow transition-colors" />
                </div>
                <h3 className="text-2xl font-black text-white relative z-10 uppercase tracking-tighter">Null Sector</h3>
                <p className="text-white/30 text-base max-w-[280px] mt-3 mb-12 font-medium leading-relaxed relative z-10">No active mission protocols detected. Initialize your first project to synchronize with the net.</p>
                <Button variant="hero" className="relative z-10 rounded-2xl px-12 h-16 bg-white text-deep-space font-black text-base shadow-2xl hover:bg-sapphire-glow hover:text-white transition-all scale-105" onClick={() => navigate("/projects")}>POST PROJECT</Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClientDashboard;
