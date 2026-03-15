import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bookmark, Star, MapPin, Clock, ExternalLink, Play } from "lucide-react";

export interface FreelancerData {
  id: string;
  name: string;
  title: string;
  skills: string[];
  location: string;
  timezone: string;
  rate: string;
  score: number;
  availability: string;
  positionType: string[];
  verified: boolean;
  githubUrl?: string;
  linkedinUrl?: string;
}

interface FreelancerCardProps {
  freelancer: FreelancerData;
  onBookmark?: () => void;
  onView?: () => void;
}

export default function FreelancerCard({ freelancer, onBookmark, onView }: FreelancerCardProps) {
  const initials = freelancer.name.split(" ").map(n => n[0]).join("");
  const scoreColor = freelancer.score >= 80 ? "text-teal" : freelancer.score >= 60 ? "text-orange" : "text-slate-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="relative"
    >
      <div className="group bg-card/60 backdrop-blur-xl rounded-[2.5rem] p-7 depth-shadow transition-all border border-white/5 hover:border-emerald-glow/20 flex flex-col md:flex-row items-center gap-8">
        {/* Work Replay Overlay (Simulated) */}
        <div className="absolute top-6 right-8 z-20">
           <button className="h-10 w-10 rounded-full bg-emerald-glow text-deep-space flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:scale-110 transition-all">
              <Play className="h-4 w-4 fill-current" />
           </button>
        </div>
        {/* Profile Avatar */}
        <div className="relative shrink-0">
          <Avatar className="h-24 w-24 border-4 border-white/5 group-hover:border-emerald-glow/20 transition-colors shadow-2xl">
             <AvatarFallback className="bg-deep-space-lighter text-emerald-glow text-2xl font-black">
               {initials}
             </AvatarFallback>
          </Avatar>
          {freelancer.verified && (
            <div className="absolute -bottom-1 -right-1 h-8 w-8 bg-emerald-glow rounded-full border-4 border-card flex items-center justify-center shadow-lg">
               <span className="text-[10px] text-deep-space font-black">✓</span>
            </div>
          )}
        </div>

        {/* Info Area */}
        <div className="flex-1 space-y-3 text-center md:text-left">
           <div className="flex flex-col md:flex-row md:items-center gap-3">
              <h3 className="text-2xl font-display font-black text-white tracking-tight">{freelancer.name}</h3>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-emerald-glow/10 text-emerald-glow w-fit mx-auto md:mx-0 border border-emerald-glow/20">
                 {freelancer.title}
              </div>
           </div>
           
           <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-8 gap-y-2 text-[11px] font-bold text-white/40 uppercase tracking-[0.15em]">
              <div className="flex items-center gap-2">
                 <MapPin className="h-3.5 w-3.5 text-emerald-glow" /> {freelancer.location}
              </div>
              <div className="flex items-center gap-2">
                 <Clock className="h-3.5 w-3.5 text-emerald-glow" /> {freelancer.timezone}
              </div>
              <div className="flex items-center gap-2">
                 <span className="text-white/60">Rate:</span> <span className="text-white">{freelancer.rate}</span>
              </div>
           </div>

           <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-3">
              {freelancer.skills.slice(0, 5).map(skill => (
                <span key={skill} className="px-4 py-1.5 rounded-xl bg-white/5 text-[10px] font-black tracking-widest text-white/60 border border-white/5 transition-all group-hover:bg-white/10 group-hover:text-emerald-glow group-hover:border-emerald-glow/20">
                  {skill}
                </span>
              ))}
           </div>
        </div>

        {/* Score & Actions */}
        <div className="flex items-center gap-10 shrink-0">
           <div className="text-center">
              <p className={`text-4xl font-display font-black ${scoreColor} tracking-tighter`}>{freelancer.score}%</p>
              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-white/20 mt-1">Trust Score</p>
           </div>
           <div className="flex items-center gap-4">
              <button onClick={onBookmark} className="h-14 w-14 rounded-2xl flex items-center justify-center text-white/20 hover:text-emerald-glow hover:bg-white/5 transition-all border border-transparent hover:border-white/5">
                 <Bookmark className="h-7 w-7" />
              </button>
              <Button onClick={onView} className="rounded-2xl px-10 h-14 bg-white text-deep-space hover:bg-emerald-glow hover:text-deep-space hover:scale-105 transition-all font-black text-sm shadow-2xl">
                 ELITE PROFILE
              </Button>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
