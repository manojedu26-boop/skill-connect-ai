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
      whileHover={{ scale: 1.01, x: 5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="group bg-white rounded-[2rem] p-6 shadow-soft hover:shadow-premium transition-all border border-transparent hover:border-teal/10 flex flex-col md:flex-row items-center gap-6">
        {/* Client Avatar/Logo */}
        <div className="h-16 w-16 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-teal/5 transition-colors">
           <Briefcase className="h-8 w-8 text-teal/40" />
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-2 text-center md:text-left">
           <div className="flex flex-col md:flex-row md:items-center gap-2">
              <h3 className="text-xl font-black text-navy leading-tight">{project.title}</h3>
              <div className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full w-fit mx-auto md:mx-0 ${statusColors[project.status]}`}>
                 {project.status}
              </div>
           </div>
           
           <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-6 gap-y-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              <div className="flex items-center gap-2">
                 <span className="text-navy">Client:</span> {project.client}
              </div>
              <div className="flex items-center gap-2">
                 <DollarSign className="h-3 w-3 text-teal" /> {project.budget}
              </div>
              <div className="flex items-center gap-2">
                 <Calendar className="h-3 w-3 text-teal" /> {project.deadline}
              </div>
           </div>

           <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
              {project.skills.slice(0, 4).map(skill => (
                <span key={skill} className="px-3 py-1 rounded-lg bg-slate-50 text-[10px] font-bold text-slate-500 border border-slate-100 transition-colors group-hover:bg-white group-hover:border-teal/20">
                  {skill}
                </span>
              ))}
              {project.skills.length > 4 && (
                <span className="px-3 py-1 rounded-lg bg-teal/5 text-[10px] font-bold text-teal">+ {project.skills.length - 4} More</span>
              )}
           </div>
        </div>

        {/* Action Area */}
        <div className="flex items-center gap-4 shrink-0">
           <button onClick={onBookmark} className="h-12 w-12 rounded-2xl flex items-center justify-center text-slate-300 hover:text-orange hover:bg-orange/5 transition-all">
              <Bookmark className="h-6 w-6" />
           </button>
           <Button onClick={onApply} className="rounded-2xl px-8 h-12 bg-navy text-white hover:bg-teal hover:scale-105 transition-all font-bold shadow-soft">
              Quick Apply
           </Button>
        </div>
      </div>
    </motion.div>
  );
}
