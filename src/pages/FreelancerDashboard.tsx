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
      <div className="space-y-10">
        {/* Bento Grid Header Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 bento-card bg-card overflow-hidden relative group">
             <div className="absolute top-0 right-0 w-64 h-64 bg-teal/5 rounded-full blur-[100px] -mr-32 -mt-32 transition-transform group-hover:scale-110 duration-700" />
             <div className="relative z-10 space-y-4">
               <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal/5 text-teal text-[10px] font-black uppercase tracking-widest w-fit">
                  <Sparkles className="h-3 w-3" /> AI-Enhanced Dashboard
               </div>
               <h1 className="text-4xl md:text-5xl font-black text-foreground leading-tight">Welcome in, {firstName}</h1>
               <p className="text-muted-foreground text-lg max-w-xl">Your professional marketplace is bustling today. You have <span className="text-foreground font-bold">12 new matches</span> based on your React expertise.</p>
               <div className="flex gap-4 pt-4">
                  <Button onClick={() => navigate("/projects")} variant="hero" className="rounded-2xl px-10 h-14 text-sm font-bold shadow-soft">Find Projects</Button>
                  <Button onClick={() => navigate("/my-portfolio")} variant="outline" className="rounded-2xl px-8 h-14 border-slate-200 hover:bg-slate-50 transition-all font-bold">My Portfolio</Button>
               </div>
             </div>
          </div>
          
          <div className="md:col-span-4 bento-card bg-navy text-white flex flex-col justify-between group">
             <div className="space-y-2">
                <p className="text-[10px] font-black text-teal uppercase tracking-widest">Market Status</p>
                <p className="text-2xl font-bold leading-snug">Elite Developer <br/>Demand is <span className="text-orange">High</span></p>
             </div>
             <div className="relative h-24 mt-4">
                <div className="absolute bottom-0 left-0 w-full flex items-end gap-1 px-2 h-full">
                   {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                     <motion.div 
                        key={i} 
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: i * 0.1, duration: 1 }}
                        className="flex-1 bg-teal/20 rounded-t-lg hover:bg-teal transition-colors"
                     />
                   ))}
                </div>
             </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate(stat.url)}
              className="bento-card bg-card flex flex-col gap-6 cursor-pointer hover:border-teal/30 hover:shadow-soft-lg transition-all group active:scale-95"
            >
              <div className="flex items-center justify-between">
                <div className={`h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center transition-colors group-hover:bg-teal/10`}>
                   <stat.icon className={`h-6 w-6 ${stat.color} group-hover:scale-110 transition-transform`} />
                </div>
                <span className="text-[10px] font-black text-teal uppercase tracking-tighter bg-teal/5 px-2 py-1 rounded-lg">{stat.change}</span>
              </div>
              <div>
                <p className="text-3xl font-black text-foreground">{stat.value}</p>
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mt-1">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mid-level Modules */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           <div className="lg:col-span-8">
              <AISmartMatch />
           </div>
           <div className="lg:col-span-4 bento-card bg-white p-8 flex flex-col justify-between group overflow-hidden relative">
              <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-teal/5 rounded-full blur-3xl group-hover:bg-teal/10 transition-all" />
              <div className="space-y-4 relative z-10">
                 <p className="text-[10px] font-black text-teal uppercase tracking-[0.2em] flex items-center gap-2">
                    <Target className="h-4 w-4" /> Skill Gap Analysis
                 </p>
                 <div className="flex items-end justify-center h-24 gap-2">
                    {[65, 80, 45, 90, 70].map((v, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                         <div className="w-full bg-slate-50 rounded-lg h-2 relative overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${v}%` }} transition={{ delay: i * 0.1, duration: 1 }} className={`absolute left-0 h-full ${i === 3 ? 'bg-orange' : 'bg-teal'}`} />
                         </div>
                         <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">{['React', 'TS', 'Node', 'Next.js', 'UI'][i]}</span>
                      </div>
                    ))}
                 </div>
                 <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Your <span className="text-orange font-bold">Next.js</span> proficiency is 15% below top-funded projects. Recommended: <span className="text-navy font-bold">"Server Components Masterclass"</span>.</p>
              </div>
              <Button variant="outline" className="mt-6 w-full h-11 rounded-2xl border-dashed border-slate-200 text-navy font-black text-[10px] uppercase tracking-widest hover:border-teal/50">
                 OPTIMIZE STACK
              </Button>
           </div>
        </div>

        {/* Global Opportunities Heatmap */}
        <div className="bento-card bg-[#0B1221] text-white p-10 relative overflow-hidden group">
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-md">
                 <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-teal/20 flex items-center justify-center">
                       <Globe className="h-5 w-5 text-teal" />
                    </div>
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-teal">Network Pulse</p>
                 </div>
                 <h2 className="text-3xl font-black leading-tight">Elite Demand Heatmap</h2>
                 <p className="text-slate-400 text-sm font-medium leading-relaxed">High-density project clusters detected in <span className="text-white">Silicon Valley</span>, <span className="text-white">London</span>, and <span className="text-white">Dubai</span>. Your stack is trending 3.4x in these territories.</p>
                 <div className="flex gap-4 pt-4">
                    <div className="flex flex-col">
                       <span className="text-2xl font-black text-teal">85%</span>
                       <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Market Fit</span>
                    </div>
                    <div className="w-px h-10 bg-white/10" />
                    <div className="flex flex-col">
                       <span className="text-2xl font-black text-orange">124</span>
                       <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Live Nodes</span>
                    </div>
                 </div>
              </div>
              
              <div className="relative h-64 w-full md:w-[400px] bg-white/5 rounded-[2.5rem] border border-white/10 overflow-hidden flex items-center justify-center">
                 <div className="absolute inset-0 flex items-center justify-center">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 3, delay: i * 0.5 }}
                        className="absolute border border-teal/20 rounded-full"
                        style={{ width: `${(i + 1) * 60}px`, height: `${(i + 1) * 60}px` }}
                      />
                    ))}
                    <div className="relative h-3 w-3 bg-teal rounded-full teal-glow">
                       <motion.div animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="absolute -inset-2 bg-teal/50 rounded-full" />
                    </div>
                 </div>
                 <div className="absolute bottom-6 left-6 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Synchronizing Real-time Data</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Projects & Activity Grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-2xl font-black text-navy">Recommended Opportunities</h2>
              <Button variant="ghost" className="text-teal font-black text-xs uppercase tracking-widest gap-2 hover:bg-teal/5" onClick={() => navigate("/projects")}>
                View Market <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              {mockProjects.slice(0, 3).map(p => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-2xl font-black text-navy">Recent Activity</h2>
            </div>
            <div className="bento-card bg-white border border-slate-100 flex flex-col items-center justify-center text-center py-16">
                <div className="h-20 w-20 rounded-full bg-slate-50 flex items-center justify-center mb-6">
                   <Briefcase className="h-10 w-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-navy">No new proposals</h3>
                <p className="text-slate-500 text-sm max-w-[280px] mt-2 mb-8">You haven't applied to any projects in the last 48 hours.</p>
                <Button onClick={() => navigate("/projects")} className="rounded-2xl px-8 h-12 bg-navy text-white hover:bg-navy/90 font-bold transition-all">Submit a Bid</Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FreelancerDashboard;
