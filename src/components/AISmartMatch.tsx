import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Briefcase, User as UserIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { mockProjects, mockFreelancers } from "@/data/mockData";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function AISmartMatch() {
  const [matches, setMatches] = useState<any[]>([]);
  const [isMatching, setIsMatching] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [userRole, setUserRole] = useState("freelancer");
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem("vistaar_user");
    if (userStr) {
      const u = JSON.parse(userStr);
      if (u.role) setUserRole(u.role);
    }
  }, []);

  const handleSmartMatch = async () => {
    const envKey = import.meta.env.VITE_GEMINI_API_KEY;
    const apiKey = localStorage.getItem("vistaar_gemini_key") || envKey;
    if (!apiKey) {
      toast.error("Please set your Gemini API Key in the AI Assistant tab.");
      return;
    }

    setIsScanning(true);
    setIsMatching(true);

    // Artificial delay for "Scanning" effect
    await new Promise(resolve => setTimeout(resolve, 3000));

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const userStr = localStorage.getItem("vistaar_user") || '{"skills": "React, Node.js"}';
      
      let contextPool = "";
      if (userRole === "freelancer") {
        contextPool = JSON.stringify(mockProjects.map(p => ({ id: p.id, title: p.title, skills: p.skills })));
      } else {
        contextPool = JSON.stringify(mockFreelancers.map(f => ({ id: f.id, name: f.name, skills: f.skills })));
      }

      const prompt = `You are an AI Matchmaker for a freelancing platform.
      The current user's profile is: ${userStr}.
      The available pool to match against is: ${contextPool}.
      
      Evaluate the available pool and return EXACTLY the 3 BEST matches for the exact user given their profile. 
      Return ONLY a JSON array of objects with the keys: 
      "id" (the matching id from the pool),
      "title" (the name or title of the match),
      "percentage" (a plausible number between 80-99 representing match strength based on skills),
      "matchingSkills" (an array of 2-3 short strings showing which exact skills overlapped, e.g. ["React", "UI Design"]),
      "reason" (a short 1-sentence explanation). 
      No markdown blocks, just raw JSON.`;
      
      const result = await model.generateContent(prompt);
      let text = result.response.text().trim();
      if (text.startsWith("\`\`\`json")) text = text.substring(7, text.length - 3).trim();
      
      const parsedMatches = JSON.parse(text);
      setMatches(parsedMatches);
      toast.success("AI found the perfect matches!");
    } catch (error) {
      console.error(error);
      toast.error("Matchmaking failed. Try again.");
    } finally {
      setIsMatching(false);
      setIsScanning(false);
    }
  };

  if (isScanning) {
    return (
      <div className="bento-card bg-navy text-white overflow-hidden relative flex flex-col items-center justify-center py-20">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,209,255,0.1)_0%,transparent_70%)]" />
         <div className="relative z-10 space-y-8 flex flex-col items-center">
            <div className="relative h-48 w-48">
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                 className="absolute inset-0 border-2 border-dashed border-teal/30 rounded-full"
               />
               <motion.div 
                 animate={{ rotate: -360 }}
                 transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                 className="absolute inset-4 border border-orange/20 rounded-full"
               />
               <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="h-10 w-10 text-teal animate-pulse" />
               </div>
               <motion.div 
                 className="absolute top-1/2 left-1/2 w-1/2 h-1 bg-gradient-to-r from-teal/80 to-transparent origin-left"
                 animate={{ rotate: 360 }}
                 transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
               />
            </div>
            <div className="text-center space-y-2">
               <h2 className="text-2xl font-black tracking-widest uppercase">Initializing Neural Scan</h2>
               <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.3em]">Parsing ${userRole === "client" ? "Freelancer" : "Project"} Node Topology</p>
            </div>
         </div>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="bento-card bg-white overflow-hidden relative group">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-orange/5 rounded-full blur-[100px] transition-transform group-hover:scale-110 duration-700" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 py-10">
           <div className="h-24 w-24 rounded-[2rem] bg-navy flex items-center justify-center shadow-xl shadow-navy/20 relative">
              <Sparkles className="h-10 w-10 text-teal" />
              <div className="absolute -top-2 -right-2 h-8 w-8 bg-orange rounded-full border-4 border-white flex items-center justify-center animate-bounce">
                 <span className="text-[10px] text-white font-black">AI</span>
              </div>
           </div>
           <div className="flex-1 text-center md:text-left space-y-4">
              <h2 className="text-3xl font-black text-navy leading-tight">Smart AI Match</h2>
              <p className="text-slate-500 text-lg max-w-xl">Deep AI analysis of <span className="text-teal font-bold font-mono">1,000+ data points</span> to find your perfect {userRole === "client" ? "freelancer" : "project"} matches instantly.</p>
              <Button 
                onClick={handleSmartMatch} 
                disabled={isMatching}
                className="rounded-2xl px-12 h-14 bg-navy text-white hover:bg-teal hover:scale-105 transition-all font-black text-sm shadow-soft"
              >
                {isMatching ? "Crunching Data..." : "Find My Perfect Matches"}
              </Button>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bento-card bg-white border border-slate-100">
      <div className="flex items-center justify-between mb-8">
         <div className="space-y-1">
            <h2 className="text-2xl font-black text-navy flex items-center gap-3">
               <Sparkles className="h-6 w-6 text-teal" /> AI Recommended
            </h2>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Optimized for your career trajectory</p>
         </div>
         <Button variant="ghost" className="text-orange font-black text-xs uppercase tracking-widest hover:bg-orange/5" onClick={() => setMatches([])}>
            Refresh Analysis
         </Button>
      </div>

      <div className="space-y-4">
        {matches.map((match, idx) => (
          <motion.div 
            key={match.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group flex flex-col md:flex-row md:items-center justify-between p-6 rounded-[2rem] bg-slate-50/50 hover:bg-white border border-transparent hover:border-teal/10 hover:shadow-premium transition-all"
          >
            <div className="flex items-center gap-6 flex-1 mb-4 md:mb-0">
               <div className="h-14 w-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-soft group-hover:bg-teal/5 transition-colors">
                  {userRole === "freelancer" ? <Briefcase className="h-6 w-6 text-teal" /> : <UserIcon className="h-6 w-6 text-teal" />}
               </div>
               <div className="space-y-1 max-w-md">
                  <div className="flex items-center gap-3">
                     <span className="text-lg font-black text-navy leading-none truncate">{match.title}</span>
                     {match.percentage && (
                       <div className="px-2 py-0.5 rounded-lg bg-teal text-[10px] font-black text-white shadow-soft">
                         {match.percentage}% MATCH
                       </div>
                     )}
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-1">{match.reason}</p>
                  {match.matchingSkills && (
                    <div className="flex gap-2 pt-1">
                       {match.matchingSkills.map((skill: string) => (
                         <span key={skill} className="text-[9px] font-black uppercase tracking-widest text-teal">{skill} •</span>
                       ))}
                    </div>
                  )}
               </div>
            </div>
            <Button className="rounded-2xl px-8 h-12 bg-white text-navy border border-slate-200 hover:bg-navy hover:text-white transition-all font-bold shadow-soft" onClick={() => navigate(userRole === "freelancer" ? `/projects` : `/freelancers/${match.id}`)}>
              Review Match
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
