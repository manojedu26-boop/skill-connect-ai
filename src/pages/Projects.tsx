import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";
import ProjectCard from "@/components/ProjectCard";
import { mockProjects } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";
import AIGigGenerator from "@/components/AIGigGenerator";
import { 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";

const statusFilters = ["all", "open", "in-progress", "closed"];

const Projects = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [aiGeneratorOpen, setAiGeneratorOpen] = useState(false);
  
  // Proposal Modal State
  const [proposalModalOpen, setProposalModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [proposalData, setProposalData] = useState({
    coverLetter: "",
    bidAmount: "",
    duration: ""
  });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    skills: ""
  });

  const filtered = mockProjects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Project posted validation successful.");
    setDialogOpen(false);
    setFormData({ title: "", description: "", budget: "", skills: "" });
  };

  const handleApplyAIGig = (gig: any) => {
    setFormData({
      title: gig.title || "",
      description: gig.description || "",
      budget: gig.price || "",
      skills: gig.tags ? gig.tags.join(", ") : ""
    });
    setAiGeneratorOpen(false);
    toast.success("AI Content Applied!");
  };

  const handleApplyClick = (project: any) => {
    setSelectedProject(project);
    setProposalModalOpen(true);
  };

  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    const newProposal = {
      id: Date.now(),
      projectId: selectedProject.id,
      projectTitle: selectedProject.title,
      client: selectedProject.client,
      ...proposalData,
      status: "submitted",
      date: new Date().toLocaleDateString()
    };
    
    const existing = JSON.parse(localStorage.getItem("vistaar_proposals") || "[]");
    localStorage.setItem("vistaar_proposals", JSON.stringify([...existing, newProposal]));
    
    toast.success("Proposal submitted successfully!");
    setProposalModalOpen(false);
    setProposalData({ coverLetter: "", bidAmount: "", duration: "" });
  };

  const userStr = localStorage.getItem("vistaar_user");
  const user = userStr ? JSON.parse(userStr) : null;
  const isClient = user?.role === 'client';

  if (isClient) {
    return (
      <DashboardLayout>
         <div className="max-w-5xl mx-auto space-y-12 pb-20">
            <div className="text-center space-y-6 pt-10">
               <motion.div 
                 initial={{ scale: 0.9, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 className="flex justify-center"
               >
                  <div className="h-24 w-24 rounded-[2.5rem] bg-navy flex items-center justify-center shadow-soft-lg relative">
                     <Plus className="h-12 w-12 text-teal" />
                     <motion.div 
                       animate={{ scale: [1, 1.2, 1] }} 
                       transition={{ repeat: Infinity, duration: 2 }}
                       className="absolute -inset-2 border-2 border-teal/20 rounded-[3rem]"
                     />
                  </div>
               </motion.div>
               <h1 className="text-6xl font-black text-navy tracking-tighter">Deploy a New <span className="text-teal">Architectural Brief</span></h1>
               <p className="text-slate-400 text-xl font-medium max-w-2xl mx-auto italic">"The best way to predict the future is to build it with elite talent."</p>
            </div>

            <div className="bento-card bg-white p-12 shadow-premium border-none relative overflow-hidden">
               <div className="absolute top-0 right-0 w-96 h-96 bg-teal/5 rounded-full blur-[100px] -mr-48 -mt-48" />
               <form onSubmit={handlePost} className="relative z-10 space-y-10">
                  <div className="flex items-center justify-between p-6 rounded-3xl bg-navy text-white group cursor-pointer hover:bg-navy/95 transition-all" onClick={() => setAiGeneratorOpen(true)}>
                     <div className="flex items-center gap-6">
                        <div className="h-16 w-16 rounded-2xl bg-teal/20 flex items-center justify-center">
                           <Sparkles className="h-8 w-8 text-teal" />
                        </div>
                        <div>
                           <h3 className="text-xl font-black">Neural Draft Generator</h3>
                           <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-1">AI-Powered Requirement Partitioning</p>
                        </div>
                     </div>
                     <Button type="button" variant="hero" className="bg-teal text-white rounded-xl px-8 h-12 shadow-soft">IGNITE AI</Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     <div className="space-y-3">
                        <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Venture Nomenclature</Label>
                        <Input placeholder="e.g., Quantum Edge Platform" className="h-16 rounded-[1.5rem] bg-slate-50 border-none px-8 text-lg font-black text-navy placeholder:text-slate-300" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
                     </div>
                     <div className="space-y-3">
                        <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Capital Allocation ($)</Label>
                        <Input placeholder="e.g., 25,000" className="h-16 rounded-[1.5rem] bg-slate-50 border-none px-8 text-lg font-black text-navy placeholder:text-slate-300" value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} required />
                     </div>
                  </div>

                  <div className="space-y-3">
                     <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Architectural Blueprint</Label>
                     <Textarea placeholder="Define the technical constraints and north-star vision..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="min-h-[200px] rounded-[2.5rem] bg-slate-50 border-none p-10 text-lg font-medium leading-relaxed shadow-inner" required />
                  </div>

                  <div className="flex justify-center pt-6">
                     <Button variant="hero" type="submit" className="h-20 px-20 rounded-[2.5rem] bg-navy text-white font-black text-xl shadow-premium hover:bg-teal hover:scale-105 transition-all">
                        DEPLOY TO ECOSYSTEM
                     </Button>
                  </div>
               </form>
            </div>
         </div>
         {aiGeneratorOpen && <AIGigGenerator onClose={() => setAiGeneratorOpen(false)} onApply={handleApplyAIGig} />}
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-10 pb-20">
        {/* Sub Header */}
        <div className="bento-card bg-navy text-white overflow-hidden relative group">
           <div className="absolute top-0 right-0 w-64 h-64 bg-orange/10 rounded-full blur-[100px] -mr-32 -mt-32" />
           <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                 <h1 className="text-4xl font-black tracking-tighter">Project Market</h1>
                 <p className="text-slate-400 text-lg max-w-xl font-medium">Discover open requirements across <span className="text-orange font-black">$2.4M+</span> in active funding.</p>
              </div>
           </div>
        </div>

        {aiGeneratorOpen && <AIGigGenerator onClose={() => setAiGeneratorOpen(false)} onApply={handleApplyAIGig} />}

        {/* Filter Section */}
        <div className="space-y-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="relative flex-1 group">
              <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-teal" />
              <Input
                placeholder="Search projects, stacks, or keywords..."
                className="h-14 rounded-2xl bg-white border-none pl-14 pr-6 shadow-soft focus-visible:ring-teal/20 transition-all font-medium"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex bg-white p-1 rounded-2xl shadow-soft border border-slate-50">
              {statusFilters.map(s => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-6 h-12 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    statusFilter === s
                      ? "bg-teal text-white shadow-lg shadow-teal/10"
                      : "text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* The Stacked List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
             <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Available Opportunities</p>
             <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{filtered.length} Jobs Found</p>
          </div>
          <div className="flex flex-col gap-4">
            {filtered.map(p => (
              <ProjectCard key={p.id} project={p} onApply={() => handleApplyClick(p)} />
            ))}
          </div>
        </div>

        {filtered.length === 0 && (
          <div className="bento-card bg-white border border-slate-100 flex flex-col items-center justify-center text-center py-24">
             <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <Search className="h-10 w-10 text-slate-200" />
             </div>
             <h3 className="text-xl font-bold text-navy">No projects found</h3>
             <p className="text-slate-500 text-sm max-w-[280px] mt-2">Try adjusting your filters.</p>
          </div>
        )}

        {/* Proposal Submission Modal */}
        <Dialog open={proposalModalOpen} onOpenChange={setProposalModalOpen}>
          <DialogContent className="sm:max-w-2xl rounded-[2.5rem] border-none bg-white/95 backdrop-blur-2xl shadow-premium">
            <DialogHeader className="px-4">
              <DialogTitle className="text-3xl font-black text-navy leading-tight">Submit Pitch</DialogTitle>
              <DialogDescription className="text-slate-400 font-bold uppercase text-[10px] tracking-widest pt-1">
                Applying for: <span className="text-teal">{selectedProject?.title}</span>
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmitProposal} className="space-y-8 p-4">
              <div className="grid grid-cols-2 gap-4 rounded-3xl bg-slate-50 p-6 border border-slate-100">
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Client Budget</p>
                    <p className="text-xl font-black text-navy">{selectedProject?.budget}</p>
                 </div>
                 <div className="space-y-1 text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Rank</p>
                    <p className="text-xl font-black text-teal">Top 5% Match</p>
                 </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="coverLetter" className="text-xs font-black text-navy uppercase ml-2">Your Proposition</Label>
                <Textarea 
                  id="coverLetter"
                  placeholder="Tell the client why you're the unique choice for this..." 
                  className="min-h-[160px] rounded-[2rem] bg-slate-50 border-none p-6 text-slate-600 focus-visible:ring-teal/10"
                  value={proposalData.coverLetter}
                  onChange={(e) => setProposalData({ ...proposalData, coverLetter: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="bidAmount" className="text-xs font-black text-navy uppercase ml-2">Bid Amount ($)</Label>
                  <Input 
                    id="bidAmount"
                    type="number"
                    placeholder="5000" 
                    className="h-14 rounded-2xl bg-slate-50 border-none px-6 font-bold"
                    value={proposalData.bidAmount}
                    onChange={(e) => setProposalData({ ...proposalData, bidAmount: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="duration" className="text-xs font-black text-navy uppercase ml-2">Estimated Cycle</Label>
                  <Input 
                    id="duration"
                    placeholder="e.g. 14 Days" 
                    className="h-14 rounded-2xl bg-slate-50 border-none px-6 font-bold"
                    value={proposalData.duration}
                    onChange={(e) => setProposalData({ ...proposalData, duration: e.target.value })}
                    required
                  />
                </div>
              </div>

              <DialogFooter className="pt-4">
                <Button type="button" variant="ghost" onClick={() => setProposalModalOpen(false)} className="rounded-2xl font-bold text-slate-400">Cancel</Button>
                <Button type="submit" variant="hero" className="rounded-2xl px-12 h-14 bg-navy text-white font-black shadow-soft hover:bg-teal transition-all">
                   Deploy Proposal
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Projects;
