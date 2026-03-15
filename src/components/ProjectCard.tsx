import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bookmark, Calendar, DollarSign, Clock, Briefcase, Play } from "lucide-react";

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
    open: "bg-emerald-glow/10 text-emerald-glow border-emerald-glow/20",
    "in-progress": "bg-sapphire-glow/10 text-sapphire-glow border-sapphire-glow/20",
    closed: "bg-white/5 text-white/20 border-white/5",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="relative"
    >
      <div className="group bg-card/60 backdrop-blur-xl rounded-[2.5rem] p-7 depth-shadow transition-all border border-white/5 hover:border-emerald-glow/20 flex flex-col md:flex-row items-center gap-8">
        {/* Work Replay Overlay */}
        <div className="absolute top-6 right-8 z-20">
           <button className="h-10 w-10 rounded-full bg-sapphire-glow text-white flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:scale-110 transition-all">
              <Play className="h-4 w-4 fill-current" />
           </button>
        </div>
        {/* Client Avatar/Logo */}
        <div className="h-20 w-20 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/5 group-hover:bg-sapphire-glow/10 transition-all shadow-2xl">
           <Briefcase className="h-10 w-10 text-sapphire-glow/40 group-hover:text-sapphire-glow transition-colors" />
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-3 text-center md:text-left">
           <div className="flex flex-col md:flex-row md:items-center gap-3">
              <h3 className="text-2xl font-display font-black text-white tracking-tight leading-tight">{project.title}</h3>
              <div className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full w-fit mx-auto md:mx-0 border ${statusColors[project.status]}`}>
                 {project.status}
              </div>
           </div>
           
           <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-8 gap-y-2 text-[11px] font-bold text-white/40 uppercase tracking-[0.15em]">
              <div className="flex items-center gap-2">
                 <span className="text-white/60">Client:</span> <span className="text-white">{project.client}</span>
              </div>
              <div className="flex items-center gap-2">
                 <DollarSign className="h-3.5 w-3.5 text-emerald-glow" /> <span className="text-white">{project.budget}</span>
              </div>
              <div className="flex items-center gap-2">
                 <Calendar className="h-3.5 w-3.5 text-emerald-glow" /> <span className="text-white">{project.deadline}</span>
              </div>
           </div>

           <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-3">
              {project.skills.slice(0, 4).map(skill => (
                <span key={skill} className="px-4 py-1.5 rounded-xl bg-white/5 text-[10px] font-black tracking-widest text-white/60 border border-white/5 transition-all group-hover:bg-white/10 group-hover:text-sapphire-glow group-hover:border-sapphire-glow/20">
                  {skill}
                </span>
              ))}
              {project.skills.length > 4 && (
                <span className="px-4 py-1.5 rounded-xl bg-sapphire-glow/10 text-[10px] font-black tracking-widest text-sapphire-glow border border-sapphire-glow/20">+ {project.skills.length - 4} More</span>
              )}
           </div>
        </div>

        {/* Action Area */}
        <div className="flex items-center gap-4 shrink-0">
           <button onClick={onBookmark} className="h-14 w-14 rounded-2xl flex items-center justify-center text-white/20 hover:text-sapphire-glow hover:bg-white/5 transition-all border border-transparent hover:border-white/5">
              <Bookmark className="h-7 w-7" />
           </button>
           <Button onClick={onApply} className="rounded-2xl px-10 h-14 bg-white text-deep-space hover:bg-sapphire-glow hover:text-white hover:scale-105 transition-all font-black text-sm shadow-2xl">
              INITIALIZE PROPOSAL
           </Button>
        </div>
      </div>
    </motion.div>
  );
}
