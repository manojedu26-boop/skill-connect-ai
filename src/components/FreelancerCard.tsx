import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bookmark, Star, MapPin, Clock, ExternalLink } from "lucide-react";

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
      whileHover={{ scale: 1.01, x: 5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="group bg-white rounded-[2rem] p-6 shadow-soft hover:shadow-premium transition-all border border-transparent hover:border-teal/10 flex flex-col md:flex-row items-center gap-6">
        {/* Profile Avatar */}
        <div className="relative shrink-0">
          <Avatar className="h-20 w-20 border-4 border-slate-50 group-hover:border-teal/10 transition-colors shadow-sm">
             <AvatarFallback className="bg-navy text-white text-xl font-black">
               {initials}
             </AvatarFallback>
          </Avatar>
          {freelancer.verified && (
            <div className="absolute -bottom-1 -right-1 h-7 w-7 bg-teal rounded-full border-4 border-white flex items-center justify-center shadow-sm">
               <span className="text-[10px] text-white font-bold">✓</span>
            </div>
          )}
        </div>

        {/* Info Area */}
        <div className="flex-1 space-y-2 text-center md:text-left">
           <div className="flex flex-col md:flex-row md:items-center gap-2">
              <h3 className="text-xl font-black text-navy leading-tight">{freelancer.name}</h3>
              <div className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-teal/5 text-teal w-fit mx-auto md:mx-0">
                 {freelancer.title}
              </div>
           </div>
           
           <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-6 gap-y-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              <div className="flex items-center gap-2">
                 <MapPin className="h-3 w-3 text-teal" /> {freelancer.location}
              </div>
              <div className="flex items-center gap-2">
                 <Clock className="h-3 w-3 text-teal" /> {freelancer.timezone}
              </div>
              <div className="flex items-center gap-2">
                 <span className="text-navy">Rate:</span> {freelancer.rate}
              </div>
           </div>

           <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
              {freelancer.skills.slice(0, 5).map(skill => (
                <span key={skill} className="px-3 py-1 rounded-lg bg-slate-50 text-[10px] font-bold text-slate-500 border border-slate-100 transition-colors group-hover:bg-white group-hover:border-teal/20">
                  {skill}
                </span>
              ))}
           </div>
        </div>

        {/* Score & Actions */}
        <div className="flex items-center gap-8 shrink-0">
           <div className="text-center">
              <p className={`text-2xl font-black ${scoreColor}`}>{freelancer.score}%</p>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Skill Score</p>
           </div>
           <div className="flex items-center gap-3">
              <button onClick={onBookmark} className="h-12 w-12 rounded-2xl flex items-center justify-center text-slate-300 hover:text-orange hover:bg-orange/5 transition-all">
                 <Bookmark className="h-6 w-6" />
              </button>
              <Button onClick={onView} className="rounded-2xl px-8 h-12 bg-navy text-white hover:bg-teal hover:scale-105 transition-all font-bold shadow-soft">
                 Profile
              </Button>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
