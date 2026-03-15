import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Users, FolderOpen, MessageSquare, TrendingUp, ArrowRight, Zap, Pulse, LineChart } from "lucide-react";
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
  const firstName = user?.firstName || "";

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-primary/5 p-6 md:p-10 rounded-3xl border border-primary/10 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/10 rounded-full blur-[80px] point-events-none" />
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground relative z-10">Welcome back{firstName ? `, ${firstName}` : ", Client"}! 👋</h1>
          <p className="text-muted-foreground mt-2 relative z-10 text-lg">You are in Client Mode. Let's find some top-tier talent for your projects.</p>
          <div className="mt-6 flex gap-3 relative z-10">
             <Button onClick={() => navigate("/projects")} variant="hero" className="rounded-xl">Post a New Project</Button>
             <Button onClick={() => navigate("/freelancers")} variant="outline" className="rounded-xl bg-background/50 backdrop-blur">Browse Freelancers</Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate(stat.url)}
              className="cursor-pointer active:scale-95 transition-all group"
            >
              <Card className="shadow-card group-hover:border-primary/30 group-hover:shadow-soft-lg transition-all">
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent group-hover:bg-primary/5 transition-colors">
                    <stat.icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-card-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                  <span className="ml-auto text-xs font-medium text-success">{stat.change}</span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           <div className="lg:col-span-8">
              <AISmartMatch />
           </div>
           <div className="lg:col-span-4 bento-card bg-[#0B1221] text-white p-8 space-y-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-teal/20 transition-all" />
              <div className="space-y-1 relative z-10">
                 <p className="text-[10px] font-black text-teal uppercase tracking-[0.2em] flex items-center gap-2">
                    <Zap className="h-3 w-3" /> Talent Pipeline
                 </p>
                 <h4 className="text-xl font-black">Market Velocity</h4>
              </div>
              
              <div className="space-y-4 relative z-10">
                 {[
                   { name: "Sarah K.", role: "Senior UX", match: "98%", status: "Entering" },
                   { name: "Alex M.", role: "Fullstack", match: "94%", status: "Available" },
                   { name: "Dmitri V.", role: "DevOps", match: "91%", status: "Vetted" }
                 ].map((talent, i) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, x: -10 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: i * 0.1 }}
                     className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-teal/30 transition-all"
                   >
                     <div>
                        <p className="text-xs font-black">{talent.name}</p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{talent.role}</p>
                     </div>
                     <span className="text-[9px] font-black bg-teal text-white px-2 py-0.5 rounded-full">{talent.match} MATCH</span>
                   </motion.div>
                 ))}
              </div>
              
              <Button variant="hero" className="w-full h-11 rounded-2xl bg-teal text-white font-black text-[10px] uppercase tracking-widest shadow-lg shadow-teal/20 hover:scale-105 transition-all">
                 VIEW PIPELINE
              </Button>
           </div>
        </div>

        {/* Market Rate Pulse Section */}
        <div className="bento-card bg-white p-10 border border-slate-100 relative overflow-hidden group">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-slate-100 to-transparent rotate-45" />
           <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="space-y-4">
                 <div className="h-12 w-12 rounded-2xl bg-orange/5 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-orange" />
                 </div>
                 <h3 className="text-2xl font-black text-navy leading-tight">Architectural Capital Intensity</h3>
                 <p className="text-slate-500 text-sm font-medium leading-relaxed">Market rates for <span className="text-navy font-bold">React Architecture</span> have inflated <span className="text-orange font-bold">12%</span> this quarter. Talent retention is critical.</p>
              </div>

              <div className="md:col-span-2 grid grid-cols-2 gap-6">
                 <div className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 space-y-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-between">
                       Average Rate <span className="text-teal font-black">↑ 4%</span>
                    </p>
                    <div className="flex items-end gap-1 h-12">
                       {[30, 45, 35, 60, 50, 80].map((h, i) => (
                         <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} className="flex-1 bg-teal/20 rounded-t-sm" />
                       ))}
                    </div>
                    <p className="text-2xl font-black text-navy">$145<span className="text-sm font-bold text-slate-400">/hr</span></p>
                 </div>
                 
                 <div className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 space-y-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-between">
                       Sourcing Efficiency <span className="text-orange font-black">OPTIMAL</span>
                    </p>
                    <div className="flex items-center justify-center h-12">
                       <Zap className="h-8 w-8 text-orange animate-pulse" />
                    </div>
                    <p className="text-2xl font-black text-navy">2.4 Days</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Time-to-Hire Avg</p>
                 </div>
              </div>
           </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 mt-8">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Top Freelancers</h2>
              <Button variant="ghost" size="sm" className="gap-1 text-primary" onClick={() => navigate("/freelancers")}>
                View all {"->"}
              </Button>
            </div>
            <div className="space-y-4">
              {mockFreelancers.slice(0, 2).map(f => (
                <FreelancerCard key={f.id} freelancer={f} onView={() => navigate(`/freelancers/${f.id}`)} />
              ))}
            </div>
          </div>
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Your Active Projects</h2>
              <Button variant="ghost" size="sm" className="gap-1 text-primary" onClick={() => navigate("/projects")}>
                View all {"->"}
              </Button>
            </div>
            <div className="space-y-4 shadow-sm border border-border bg-card p-6 rounded-2xl flex flex-col items-center justify-center text-center min-h-[300px]">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <FolderOpen className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold">No active projects</h3>
                <p className="text-sm text-muted-foreground max-w-[250px] mt-1 mb-4">Post your first project to start receiving proposals from talented freelancers.</p>
                <Button variant="outline" onClick={() => navigate("/projects")}>Post Project</Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClientDashboard;
