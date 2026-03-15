import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { TrendingUp, Target, Zap, Globe, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const techTrends = [
  { tech: "React Server Components", demand: 98, trend: "up" },
  { tech: "Next.js 15 (AI SDK)", demand: 95, trend: "up" },
  { tech: "Tailwind CSS v4", demand: 88, trend: "up" },
  { tech: "Zustand State Mgmt", demand: 82, trend: "stable" },
  { tech: "PostgreSQL / Prisma", demand: 90, trend: "up" },
];

const MarketStatus = () => {
  return (
    <DashboardLayout>
      <div className="space-y-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-black text-navy">Market Intelligence</h1>
          <p className="text-muted-foreground font-medium">Real-time demand analysis across global technology cycles.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="bento-card bg-navy text-white p-10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-teal/10 to-transparent opacity-50" />
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal/10 text-teal text-[10px] font-black uppercase tracking-widest w-fit">
                   <Globe className="h-3 w-3" /> Global Demand Pulse
                </div>
                <h2 className="text-3xl font-black leading-tight">High Frequency <br/>Talent Nodes</h2>
                <div className="flex items-center gap-8">
                  <div>
                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Market Velocity</p>
                     <p className="text-4xl font-black text-teal">9.4/10</p>
                  </div>
                  <div className="h-12 w-px bg-white/10" />
                  <div>
                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Active Projects</p>
                     <p className="text-4xl font-black text-orange">1,240+</p>
                  </div>
                </div>
                <p className="text-slate-400 text-sm font-medium leading-relaxed max-max-w-xs">Elite engineering roles are seeing a 14% Q1 increase in capital allocation toward AI-driven architectures.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="bento-card bg-white border border-slate-100 p-6 flex flex-col justify-between h-32">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Experts</p>
                  <p className="text-2xl font-black text-navy">12.4K</p>
                  <p className="text-[9px] font-bold text-success capitalize text-teal">+5% this week</p>
               </div>
               <div className="bento-card bg-white border border-slate-100 p-6 flex flex-col justify-between h-32">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Success Rate</p>
                  <p className="text-2xl font-black text-navy">94.2%</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Proposal Acceptance</p>
               </div>
               <div className="bento-card bg-white border border-slate-100 p-6 flex flex-col justify-between h-32">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Avg Value</p>
                  <p className="text-2xl font-black text-navy">$4.8K</p>
                  <p className="text-[9px] font-bold text-orange uppercase tracking-widest">Premium Trend</p>
               </div>
            </div>
          </div>

          <div className="bento-card bg-white border border-slate-100 p-8 space-y-6">
            <h3 className="text-sm font-black text-navy uppercase tracking-widest">Skill Demand Index</h3>
            <div className="space-y-6">
              {techTrends.map((trend, i) => (
                <div key={trend.tech} className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-navy">
                    <span>{trend.tech}</span>
                    <span className="text-teal">{trend.demand}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${trend.demand}%` }}
                      transition={{ delay: i * 0.1, duration: 1 }}
                      className="h-full bg-navy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="bento-card border border-slate-100 p-8 bg-white space-y-6">
              <h3 className="text-[10px] font-black text-navy uppercase tracking-widest">Trending Topics</h3>
              <div className="flex flex-wrap gap-2">
                 {["AI Agents", "Vector DBs", "Next.js 15", "Web3 Security", "Edge Compute"].map(tag => (
                   <span key={tag} className="px-3 py-1.5 rounded-xl bg-slate-50 text-navy text-[10px] font-bold border border-slate-100">{tag}</span>
                 ))}
              </div>
           </div>
           <div className="bento-card border border-slate-100 p-8 bg-white space-y-6">
              <h3 className="text-[10px] font-black text-navy uppercase tracking-widest">Client Focus Areas</h3>
              <div className="space-y-4">
                 {[
                   { area: "Infrastructure Scalability", count: 420 },
                   { area: "Data Science / ML", count: 310 },
                   { area: "Frontend Modernization", count: 280 }
                 ].map(area => (
                   <div key={area.area} className="flex justify-between items-center">
                      <p className="text-[11px] font-bold text-slate-600">{area.area}</p>
                      <p className="text-[10px] font-black text-teal">{area.count} active</p>
                   </div>
                 ))}
              </div>
           </div>
           <div className="bento-card bg-teal text-white p-8 flex flex-col justify-between">
              <Zap className="h-8 w-8 text-white" />
              <div className="space-y-2">
                 <h4 className="text-sm font-black uppercase tracking-widest">Elite Strategy</h4>
                 <p className="text-xs font-medium text-white/80 leading-relaxed">Systemic demand for React Server Components is peaking. Propose RSC-first architectures to win faster.</p>
              </div>
              <button className="w-full h-10 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Enable Strategy</button>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MarketStatus;
