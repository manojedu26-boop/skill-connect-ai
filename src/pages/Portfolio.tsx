import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Trophy, Star, Code2, Rocket, Plus } from "lucide-react";
import { motion } from "framer-motion";

const portfolioProjects = [
  {
    id: 1,
    title: "AI-Powered Task Manager",
    description: "Built a SaaS platform that uses NLP to prioritize tasks and suggest schedules. Integrated with Google Calendar API.",
    tech: ["React", "Node.js", "OpenAI", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60",
    link: "https://github.com",
    impact: "Used by 500+ daily active users"
  },
  {
    id: 2,
    title: "EcoConnect Mobile App",
    description: "A social network for environmental activists to coordinate local clean-up events and track carbon footprint reduction.",
    tech: ["React Native", "Firebase", "Google Maps"],
    image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=800&auto=format&fit=crop&q=60",
    link: "https://github.com",
    impact: "Facilitated 200+ local events in 6 months"
  },
  {
    id: 3,
    title: "Crypto Dashboard v2",
    description: "Real-time analytics dashboard for multi-chain crypto portfolios with advanced charting and alert systems.",
    tech: ["Next.js", "TailwindCSS", "Web3.js", "Chart.js"],
    image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?w=800&auto=format&fit=crop&q=60",
    link: "https://github.com",
    impact: "Featured on Product Hunt #4 Project of the Day"
  }
];

const contributions = [
  { repo: "facebook/react", description: "Fixed memory leak in useEffect cleanup", stars: "210k" },
  { repo: "tailwindlabs/tailwindcss", description: "Added support for container queries in v3.2", stars: "75k" },
  { repo: "shadcn/ui", description: "Improved accessibility for the Multi-select component", stars: "50k" }
];

const recommendations = [
  {
    name: "Sarah Chen",
    role: "Director of Engineering @ TechFlow",
    text: "Jake is a rare talent who combines deep architectural understanding with rapid execution. His work on our scaling initiative saved us months of rework.",
    avatar: "S"
  },
  {
    name: "Marcus Thorne",
    role: "Founder @ GreenSphere",
    text: "The EcoConnect app Jake built transformed our community engagement. His attention to UX and performance is truly world-class.",
    avatar: "M"
  }
];

export default function Portfolio() {
  return (
    <DashboardLayout>
      <div className="space-y-12 pb-20">
        {/* Header Section */}
        <div className="bento-card bg-navy text-white overflow-hidden relative group">
           <div className="absolute top-0 right-0 w-64 h-64 bg-teal/10 rounded-full blur-[100px] -mr-32 -mt-32" />
           <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="space-y-2">
                 <h1 className="text-4xl font-black tracking-tighter">Technical Archive</h1>
                 <p className="text-slate-400 text-lg max-w-xl font-medium">A high-fidelity record of <span className="text-teal font-black">2.4k+ hours</span> of engineering excellence and open-source contributions.</p>
              </div>
              <div className="flex gap-4">
                 <Button variant="hero" className="rounded-2xl px-8 h-12 bg-white text-navy font-black text-xs uppercase tracking-widest hover:bg-teal hover:text-white transition-all shadow-soft gap-2">
                    <Github className="h-4 w-4" /> Sync GitHub
                 </Button>
                 <Button variant="hero" className="rounded-2xl px-8 h-12 bg-navy text-white font-black text-xs uppercase tracking-widest hover:bg-orange transition-all shadow-premium gap-2">
                    <Rocket className="h-4 w-4" /> Extract CV
                 </Button>
              </div>
           </div>
        </div>

        {/* LinkedIn Inspired Endorsements */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
           <div className="lg:col-span-8 space-y-10">
              <section className="space-y-6">
                 <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-3">
                       <Trophy className="h-5 w-5 text-orange" />
                       <h2 className="text-sm font-black text-navy uppercase tracking-widest">Featured Projects</h2>
                    </div>
                 </div>
                 <div className="flex flex-col gap-6">
                    {portfolioProjects.map((project, idx) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bento-card bg-white p-0 overflow-hidden group hover:shadow-premium transition-all border border-slate-100"
                      >
                         <div className="flex flex-col md:flex-row">
                            <div className="md:w-64 h-48 md:h-auto overflow-hidden relative">
                               <img src={project.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" alt="" />
                               <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors" />
                            </div>
                            <div className="flex-1 p-8 space-y-4">
                               <div className="flex items-start justify-between">
                                  <div>
                                     <h3 className="text-2xl font-black text-navy flex items-center gap-3">
                                        {project.title}
                                        <ExternalLink className="h-4 w-4 text-slate-300 group-hover:text-teal transition-colors" />
                                     </h3>
                                     <p className="text-slate-500 font-medium text-sm mt-1 max-w-lg">{project.description}</p>
                                  </div>
                               </div>
                               <div className="flex flex-wrap gap-2">
                                  {project.tech.map(t => (
                                    <span key={t} className="text-[9px] font-black uppercase tracking-widest text-teal py-1.5 px-3 bg-teal/5 rounded-lg">{t}</span>
                                  ))}
                               </div>
                               <div className="pt-4 flex items-center gap-6 border-t border-slate-50">
                                  <div className="flex items-center gap-2">
                                     <div className="h-2 w-2 rounded-full bg-orange animate-pulse" />
                                     <span className="text-[10px] font-black text-navy uppercase tracking-widest">{project.impact}</span>
                                  </div>
                               </div>
                            </div>
                         </div>
                      </motion.div>
                    ))}
                 </div>
              </section>

              {/* LinkedIn Style Recommendations */}
              <section className="space-y-6">
                 <div className="flex items-center gap-3 px-2">
                    <Star className="h-5 w-5 text-teal fill-teal" />
                    <h2 className="text-sm font-black text-navy uppercase tracking-widest">Expert Recommendations</h2>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {recommendations.map((rec, idx) => (
                      <div key={idx} className="bento-card bg-white border border-slate-100 p-8 space-y-4 hover:border-teal/20 transition-all">
                         <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-navy flex items-center justify-center text-white font-black text-xl">{rec.avatar}</div>
                            <div>
                               <p className="text-sm font-black text-navy">{rec.name}</p>
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{rec.role}</p>
                            </div>
                         </div>
                         <p className="text-slate-500 text-sm font-medium leading-relaxed italic">"{rec.text}"</p>
                      </div>
                    ))}
                 </div>
              </section>
           </div>

           <div className="lg:col-span-4 space-y-10">
              <section className="bento-card bg-navy text-white p-8">
                 <div className="flex items-center gap-3 mb-8">
                    <Code2 className="h-5 w-5 text-teal" />
                    <h2 className="text-xs font-black uppercase tracking-widest">Skill Endorsements</h2>
                 </div>
                 <div className="space-y-6">
                    {[
                      { skill: "Frontend Arch", count: 42 },
                      { skill: "System Design", count: 28 },
                      { skill: "React Optimization", count: 56 },
                      { skill: "UI Engineering", count: 39 }
                    ].map((s, idx) => (
                      <div key={idx} className="flex items-center justify-between group cursor-pointer">
                         <div className="flex-1">
                            <div className="flex justify-between mb-2">
                               <span className="text-[11px] font-black uppercase tracking-widest group-hover:text-teal transition-colors">{s.skill}</span>
                               <span className="text-[10px] font-bold text-slate-400">{s.count}+ Mentions</span>
                            </div>
                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                               <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${(s.count / 60) * 100}%` }}
                                  className="h-full bg-teal" 
                               />
                            </div>
                         </div>
                         <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Plus className="h-4 w-4 text-teal" />
                         </div>
                      </div>
                    ))}
                 </div>
              </section>

              <section className="space-y-6">
                 <div className="flex items-center gap-3 px-2">
                    <Github className="h-5 w-5 text-navy" />
                    <h2 className="text-xs font-black text-navy uppercase tracking-widest">Active Repositories</h2>
                 </div>
                 <div className="space-y-4">
                    {contributions.map((c, idx) => (
                      <div key={idx} className="bento-card bg-white border border-slate-50 p-6 hover:shadow-soft transition-all group">
                         <div className="flex items-start justify-between">
                            <div>
                               <p className="text-xs font-black text-navy group-hover:text-teal transition-colors uppercase tracking-widest">{c.repo}</p>
                               <p className="text-[11px] font-medium text-slate-400 mt-1">{c.description}</p>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] font-black text-orange">
                               <Star className="h-3 w-3 fill-orange" />
                               {c.stars}
                            </div>
                         </div>
                      </div>
                    ))}
                 </div>
              </section>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
