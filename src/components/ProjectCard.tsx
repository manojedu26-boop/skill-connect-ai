import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bookmark, Calendar, DollarSign, Clock, Briefcase } from "lucide-react";

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  budget: string;
  deadline: string;
  skills: string[];
  client: string;
  postedAgo: string;
  applicants: number;
  status: "open" | "in-progress" | "closed";
}

interface ProjectCardProps {
  project: ProjectData;
  onBookmark?: () => void;
  onApply?: () => void;
}

export default function ProjectCard({ project, onBookmark, onApply }: ProjectCardProps) {
  const statusColors = {
    open: "bg-teal/10 text-teal",
    "in-progress": "bg-orange/10 text-orange",
    closed: "bg-slate-100 text-slate-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -10,
        scale: 1.02,
        rotateX: 2,
        rotateY: -1,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
    >
      <div className="group bg-white rounded-[2.5rem] p-8 shadow-soft hover:shadow-anti-gravity transition-all border border-slate-100/50 hover:border-teal/20 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        {/* Subtle Background Sheen */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        {/* Client Avatar/Logo */}
        <div className="h-20 w-20 rounded-3xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-white group-hover:shadow-soft transition-all md:translate-z-10">
           <Briefcase className="h-10 w-10 text-teal/40" />
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-3 text-center md:text-left relative z-10">
           <div className="flex flex-col md:flex-row md:items-center gap-3">
              <h3 className="text-2xl font-black text-navy leading-tight tracking-tight">{project.title}</h3>
              <div className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full w-fit mx-auto md:mx-0 shadow-sm ${statusColors[project.status]}`}>
                 {project.status === "open" && <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal mr-2 animate-pulse" />}
                 {project.status}
              </div>
           </div>
           
           <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-8 gap-y-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              <div className="flex items-center gap-2 transition-colors group-hover:text-navy">
                 <span className="text-navy/30">Client:</span> {project.client}
              </div>
              <div className="flex items-center gap-2 border-l border-slate-100 md:pl-8">
                 <DollarSign className="h-3.5 w-3.5 text-teal" /> <span className="text-navy">{project.budget}</span>
              </div>
              <div className="flex items-center gap-2 border-l border-slate-100 md:pl-8">
                 <Calendar className="h-3.5 w-3.5 text-teal" /> {project.deadline}
              </div>
           </div>

           <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-3">
              {project.skills.slice(0, 5).map(skill => (
                <span key={skill} className="px-4 py-2 rounded-xl bg-slate-50 text-[10px] font-black text-slate-500 border border-slate-100 transition-all group-hover:bg-white group-hover:border-teal/30 group-hover:text-teal group-hover:shadow-sm">
                  {skill}
                </span>
              ))}
              {project.skills.length > 5 && (
                <span className="px-4 py-2 rounded-xl bg-teal text-[10px] font-black text-white shadow-soft">+ {project.skills.length - 5}</span>
              )}
           </div>
        </div>

        {/* Action Area */}
        <div className="flex items-center gap-4 shrink-0 relative z-10">
           <button onClick={onBookmark} className="h-14 w-14 rounded-2xl flex items-center justify-center text-slate-300 hover:text-orange hover:bg-orange/5 transition-all border border-transparent hover:border-orange/20">
              <Bookmark className="h-7 w-7" />
           </button>
           <Button onClick={onApply} className="rounded-2xl px-10 h-14 bg-navy text-white hover:bg-teal hover:shadow-teal-glow transition-all font-black uppercase tracking-widest text-[10px] shadow-premium">
              Initiate Mission
           </Button>
        </div>
      </div>
    </motion.div>
  );
}
