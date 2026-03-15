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

        {/* Financial Trajectory & Skill Neural Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           {/* Financial Trajectory Optimizer */}
           <div className="lg:col-span-8 bento-card bg-[#0B1221] text-white p-10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-transparent opacity-50" />
              <div className="relative z-10 flex flex-col md:flex-row gap-10">
                 <div className="space-y-6 max-w-sm">
                    <div className="space-y-2">
                       <p className="text-[10px] font-black text-teal uppercase tracking-[0.3em] flex items-center gap-2">
                          <TrendingUp className="h-4 w-4" /> Capital Optimization
                       </p>
                       <h2 className="text-3xl font-black leading-tight">Financial Trajectory <br/>Optimizer</h2>
                       <p className="text-slate-400 text-sm font-medium leading-relaxed">AI analysis of current contract density suggests a <span className="text-white">42% revenue increase</span> is achievable by pivoting to <span className="text-teal">Rust/Wasm</span> architecture nodes.</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                          <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Projected Q4</p>
                          <p className="text-xl font-black text-teal">$24,800</p>
                       </div>
                       <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                          <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Max Ceiling</p>
                          <p className="text-xl font-black text-orange">$42k</p>
                       </div>
                    </div>

                    <Button variant="hero" className="w-full h-12 rounded-2xl bg-teal text-white font-black text-[10px] uppercase tracking-widest shadow-lg shadow-teal/20 hover:scale-105 transition-all">
                       EXECUTE PIVOT STRATEGY
                    </Button>
                 </div>

                 <div className="flex-1 space-y-8">
                    <div className="space-y-4">
                       {[
                         { label: "Current Logic", val: 100, color: "bg-white/20" },
                         { label: "AI Projected", val: 142, color: "bg-teal", highlight: true },
                         { label: "Market Optimal", val: 180, color: "bg-orange" }
                       ].map((b, i) => (
                         <div key={i} className="space-y-2">
                            <div className="flex items-center justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest">
                               <span>{b.label}</span>
                               <span className={b.highlight ? 'text-teal' : ''}>{i === 0 ? '$4.2k' : i === 1 ? '$6.0k' : '$7.5k'} Avg/Mo</span>
                            </div>
                            <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden p-1 border border-white/5">
                               <motion.div 
                                  initial={{ width: 0 }} 
                                  animate={{ width: `${(b.val / 180) * 100}%` }} 
                                  transition={{ delay: 1 + (i * 0.2), duration: 1.5, ease: "circOut" }}
                                  className={`h-full rounded-full ${b.color} ${b.highlight ? 'teal-glow' : ''}`} 
                               />
                            </div>
                         </div>
                       ))}
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
                       <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                       <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Global demand for your current stack is rising by 12% MoM</p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Skill Neural Grid */}
           <div className="lg:col-span-4 bento-card bg-white p-10 flex flex-col justify-between group overflow-hidden relative border border-slate-100">
              <div className="absolute -right-20 -top-20 w-48 h-48 bg-teal/5 rounded-full blur-3xl group-hover:bg-teal/10 transition-all" />
              <div className="space-y-6 relative z-10">
                 <p className="text-[10px] font-black text-teal uppercase tracking-[0.2em] flex items-center gap-2">
                    <Target className="h-4 w-4" /> Market Fit Neural Grid
                 </p>
                 
                 <div className="grid grid-cols-3 gap-2">
                    {[...Array(9)].map((_, i) => (
                      <motion.div 
                         key={i} 
                         initial={{ opacity: 0.1 }}
                         animate={{ opacity: [0.1, 0.4, 0.1] }}
                         transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
                         className={`aspect-square rounded-lg flex items-center justify-center text-[10px] font-black border border-slate-100 ${i === 4 ? 'bg-teal/10 border-teal/30 scale-110' : 'bg-slate-50'}`}
                      >
                         {['RT', 'SC', 'ND', 'NX', 'UI', 'DB', 'OP', 'AI', 'SEC'][i]}
                      </motion.div>
                    ))}
                 </div>
                 
                 <div className="space-y-4">
                    <p className="text-[11px] text-slate-600 font-bold leading-tight">Top-funded projects in <span className="text-navy">SF/NYC</span> are currently scanning for <span className="text-teal">Next.js 15 + AI-SDK</span> nodes.</p>
                    <div className="space-y-2">
                       <div className="flex items-center justify-between text-[8px] font-black text-slate-400 uppercase">
                          <span>Real-time Visibility</span>
                          <span className="text-navy">High</span>
                       </div>
                       <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: "88%" }} className="h-full bg-navy" />
                       </div>
                    </div>
                 </div>
              </div>
              <Button variant="outline" className="mt-8 w-full h-11 rounded-2xl border-dashed border-slate-200 text-navy font-black text-[10px] uppercase tracking-widest hover:border-teal/50 hover:bg-slate-50 transition-all">
                 VERIFY MARKET NODES
              </Button>
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
