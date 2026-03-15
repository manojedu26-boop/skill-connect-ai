import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useState, useRef, useEffect } from "react";
import { X, UploadCloud, Medal, Github, Linkedin, Globe, Briefcase, GraduationCap, Plus, User, Building2, Rocket, Heart, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SettingsPage = () => {
  const [user, setUser] = useState<any>({
    firstName: "Jake",
    lastName: "Richards",
    email: "jake@example.com",
    title: "Full Stack Developer",
    bio: "Building high-performance decentralized systems.",
    location: "Manchester, UK",
    timezone: "UTC+1 (BST)",
    hourlyRate: "$85/hr",
    photo: null,
    githubUrl: "",
    linkedinUrl: ""
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const portfolioRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("skillswap_user");
    if (storedUser) {
      setUser({ ...user, ...JSON.parse(storedUser) });
    }
  }, []);

  const [workHistory, setWorkHistory] = useState([
    { company: "TechFlow", role: "Senior Developer", year: "2023" }
  ]);
  const [education, setEducation] = useState([
    { school: "Advanced Algorithms", degree: "Certificate", year: "2022" }
  ]);

  const [showExpForm, setShowExpForm] = useState(false);
  const [showEduForm, setShowEduForm] = useState(false);

  const [newExp, setNewExp] = useState({ company: "", role: "", year: "" });
  const [newEdu, setNewEdu] = useState({ school: "", degree: "", year: "" });

  const addExperience = () => {
    if (newExp.company && newExp.role) {
      setWorkHistory([...workHistory, newExp]);
      setNewExp({ company: "", role: "", year: "" });
      setShowExpForm(false);
      toast.success("Experience added to profile.");
    }
  };

  const addEducation = () => {
    if (newEdu.school && newEdu.degree) {
      setEducation([...education, newEdu]);
      setNewEdu({ school: "", degree: "", year: "" });
      setShowEduForm(false);
      toast.success("Education added to profile.");
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser = { ...user, workHistory, education };
    localStorage.setItem("skillswap_user", JSON.stringify(updatedUser));
    window.dispatchEvent(new Event("user_updated"));
    toast.success("Profile optimization complete.");
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const initials = `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase() || "JR";

  return (
    <DashboardLayout>
      <div className="space-y-10 pb-20">
        {/* Header Section */}
        <div className="bento-card bg-navy text-white overflow-hidden relative group">
           <div className="absolute top-0 right-0 w-64 h-64 bg-teal/10 rounded-full blur-[100px] -mr-32 -mt-32" />
           <div className="relative z-10 space-y-2">
              <h1 className="text-4xl font-black tracking-tighter">Profile Architecture</h1>
              <p className="text-slate-400 text-lg max-w-xl font-medium">Configure your professional identity and <span className="text-teal font-black">optimize for matching algorithms</span>.</p>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
           {/* Sidebar Info */}
           <div className="lg:col-span-4 space-y-8">
              <div className="bento-card bg-white flex flex-col items-center text-center p-10">
                 <div className="relative group">
                    <div className="absolute -inset-1.5 bg-gradient-to-tr from-teal to-navy rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                    <Avatar className="h-32 w-32 relative border-4 border-white shadow-xl rounded-[2.2rem] overflow-hidden">
                       {user.photo ? (
                         <img src={user.photo} alt="Profile" className="h-full w-full object-cover" />
                       ) : (
                         <AvatarFallback className="bg-navy text-white text-3xl font-black">{initials}</AvatarFallback>
                       )}
                    </Avatar>
                    <button 
                       onClick={() => fileInputRef.current?.click()}
                       className="absolute -bottom-2 -right-2 h-10 w-10 bg-white shadow-xl rounded-xl flex items-center justify-center text-teal hover:bg-teal hover:text-white transition-all border border-slate-100"
                    >
                       <UploadCloud className="h-5 w-5" />
                    </button>
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                 </div>
                 <div className="mt-8 space-y-1">
                    <h2 className="text-2xl font-black text-navy">{user.firstName} {user.lastName}</h2>
                    <p className="text-[10px] font-black uppercase tracking-widest text-teal py-1 px-3 bg-teal/5 rounded-lg inline-block">{user.title}</p>
                 </div>
                 <div className="mt-8 w-full space-y-4">
                    <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-slate-400">
                       <span>Profile Strength</span>
                       <span className="text-teal">85%</span>
                    </div>
                    <div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                       <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "85%" }}
                          className="h-full bg-gradient-to-r from-teal to-navy transition-all"
                       />
                    </div>
                 </div>
              </div>

              <div className="bento-card bg-white p-8">
                 <h3 className="text-xs font-black text-navy uppercase tracking-widest mb-6">Verification Status</h3>
                 <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-teal/5 border border-teal/10">
                       <div className="h-10 w-10 rounded-xl bg-teal flex items-center justify-center text-white">
                          <Medal className="h-5 w-5" />
                       </div>
                       <div>
                          <p className="text-sm font-black text-navy leading-none">Verified Identity</p>
                          <p className="text-[10px] font-bold text-teal mt-1">Confirmed via Portfolio</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Form Section */}
           <div className="lg:col-span-8">
              <div className="bento-card bg-white p-10">
                 <h3 className="text-xl font-black text-navy mb-8 flex items-center gap-3">
                    <User className="h-6 w-6 text-teal" /> Personal Information
                 </h3>
                 <form onSubmit={handleSave} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-2">
                          <Label className="text-xs font-black text-slate-400 uppercase ml-2">First Designation</Label>
                          <Input className="h-14 rounded-2xl bg-slate-50 border-none px-6 font-bold text-navy" value={user.firstName} onChange={(e) => setUser({ ...user, firstName: e.target.value })} />
                       </div>
                       <div className="space-y-2">
                          <Label className="text-xs font-black text-slate-400 uppercase ml-2">Last Name</Label>
                          <Input className="h-14 rounded-2xl bg-slate-50 border-none px-6 font-bold text-navy" value={user.lastName} onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
                       </div>
                    </div>

                    <div className="space-y-2">
                       <Label className="text-xs font-black text-slate-400 uppercase ml-2">Primary Email</Label>
                       <Input className="h-14 rounded-2xl bg-slate-50 border-none px-6 font-bold text-navy" type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                    </div>

                    <div className="space-y-2">
                       <Label className="text-xs font-black text-slate-400 uppercase ml-2">{user.role === 'client' ? 'Brand Bio' : 'Professional Bio'}</Label>
                       <Textarea placeholder={user.role === 'client' ? "Describe your company vision..." : "Tell us about your expert journey..."} className="min-h-32 rounded-[2rem] bg-slate-50 border-none p-6 text-slate-600 font-medium leading-relaxed shadow-inner" value={user.bio} onChange={(e) => setUser({ ...user, bio: e.target.value })} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-50">
                       <div className="space-y-2">
                          <Label className="text-xs font-black text-slate-400 uppercase ml-2 flex items-center gap-2">
                             <Github className="h-3.5 w-3.5" /> Github Handle
                          </Label>
                          <Input placeholder="username" className="h-14 rounded-2xl bg-slate-50 border-none px-6 font-bold text-navy" value={user.githubUrl || ""} onChange={(e) => setUser({ ...user, githubUrl: e.target.value })} />
                       </div>
                       <div className="space-y-2">
                          <Label className="text-xs font-black text-slate-400 uppercase ml-2 flex items-center gap-2">
                             <Linkedin className="h-3.5 w-3.5" /> LinkedIn Profiler
                          </Label>
                          <Input placeholder="username" className="h-14 rounded-2xl bg-slate-50 border-none px-6 font-bold text-navy" value={user.linkedinUrl || ""} onChange={(e) => setUser({ ...user, linkedinUrl: e.target.value })} />
                       </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-10 border-t border-slate-50">
                       <Button type="button" variant="ghost" className="rounded-2xl font-black text-slate-400 hover:text-navy">Discard</Button>
                       <Button type="submit" variant="hero" className="rounded-2xl px-12 h-14 bg-navy text-white font-black shadow-premium hover:bg-teal transition-all">
                          Save Architecture
                       </Button>
                    </div>
                 </form>
              </div>

              {/* Advanced Sections - Conditional per Role */}
              {user.role === 'freelancer' ? (
                <div className="mt-10 space-y-8">
                  <div className="bento-card bg-[#0B1221] text-white p-8 relative overflow-hidden group">
                     <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-transparent opacity-50" />
                     <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="space-y-2">
                           <h4 className="text-xs font-black text-teal uppercase tracking-[0.2em] flex items-center gap-2">
                              <Sparkles className="h-4 w-4" /> AI Resume Intelligence
                           </h4>
                           <p className="text-sm text-slate-300 font-medium max-w-md">Drop your CV/Resume here. Our Gemini-powered engine will architect your profile automatically.</p>
                        </div>
                        <div className="relative group/upload">
                           <input 
                              type="file" 
                              className="absolute inset-0 opacity-0 cursor-pointer z-20" 
                              onChange={(e) => {
                                 const file = e.target.files?.[0];
                                 if (file) {
                                    toast.loading("Analyzing Architecture...", { duration: 2000 });
                                    setTimeout(() => {
                                       setWorkHistory([
                                          ...workHistory,
                                          { company: "Global AI Corp", role: "Principal Engineer", year: "2024" }
                                       ]);
                                       setEducation([
                                          ...education,
                                          { school: "MIT (OpenCourseWare)", degree: "Advanced Neural Ops", year: "2023" }
                                       ]);
                                       toast.success("Intelligence Synchronized. Profile Optimized.");
                                    }, 2000);
                                 }
                              }}
                           />
                           <div className="h-20 w-48 rounded-2xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center bg-white/5 group-hover/upload:border-teal/50 group-hover/upload:bg-teal/5 transition-all">
                              <UploadCloud className="h-6 w-6 text-teal mb-1" />
                              <span className="text-[10px] font-black uppercase tracking-widest">Architect CV</span>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bento-card bg-white p-8">
                      <h4 className="text-xs font-black text-navy uppercase tracking-widest mb-6 flex items-center justify-between">
                         <span className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-teal" /> Work History</span>
                         <Button variant="ghost" size="icon" onClick={() => setShowExpForm(!showExpForm)} className="h-8 w-8 rounded-lg text-teal">
                           <Plus className="h-4 w-4" />
                         </Button>
                      </h4>
                      
                      <div className="space-y-4 mb-6">
                         {workHistory.map((exp, i) => (
                           <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between group">
                             <div>
                               <p className="text-sm font-black text-navy">{exp.role}</p>
                               <p className="text-[10px] font-bold text-slate-400">{exp.company} • {exp.year}</p>
                             </div>
                             <button onClick={() => setWorkHistory(workHistory.filter((_, idx) => idx !== i))} className="opacity-0 group-hover:opacity-100 p-1 text-slate-300 hover:text-orange transition-all">
                               <X className="h-3 w-3" />
                             </button>
                           </motion.div>
                         ))}
                      </div>

                      <AnimatePresence>
                        {showExpForm && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="space-y-3 p-4 bg-teal/5 rounded-2xl border border-teal/10 mb-4 overflow-hidden">
                             <Input placeholder="Company" className="h-10 text-xs" value={newExp.company} onChange={(e) => setNewExp({...newExp, company: e.target.value})} />
                             <Input placeholder="Role" className="h-10 text-xs" value={newExp.role} onChange={(e) => setNewExp({...newExp, role: e.target.value})} />
                             <Input placeholder="Year" className="h-10 text-xs" value={newExp.year} onChange={(e) => setNewExp({...newExp, year: e.target.value})} />
                             <Button onClick={addExperience} className="w-full text-[10px] h-9 bg-teal hover:bg-teal/80">Add Entry</Button>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <Button variant="outline" onClick={() => setShowExpForm(true)} className="w-full h-12 rounded-xl border-dashed border-slate-200 text-teal font-black text-[10px] uppercase tracking-widest">
                         Add Experience Manually
                      </Button>
                    </div>

                    <div className="bento-card bg-white p-8">
                      <h4 className="text-xs font-black text-navy uppercase tracking-widest mb-6 flex items-center justify-between">
                         <span className="flex items-center gap-2"><GraduationCap className="h-4 w-4 text-teal" /> Scholastic</span>
                         <Button variant="ghost" size="icon" onClick={() => setShowEduForm(!showEduForm)} className="h-8 w-8 rounded-lg text-teal">
                           <Plus className="h-4 w-4" />
                         </Button>
                      </h4>

                      <div className="space-y-4 mb-6">
                         {education.map((edu, i) => (
                           <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between group">
                             <div>
                               <p className="text-sm font-black text-navy">{edu.degree}</p>
                               <p className="text-[10px] font-bold text-slate-400">{edu.school} • {edu.year}</p>
                             </div>
                             <button onClick={() => setEducation(education.filter((_, idx) => idx !== i))} className="opacity-0 group-hover:opacity-100 p-1 text-slate-300 hover:text-orange transition-all">
                               <X className="h-3 w-3" />
                             </button>
                           </motion.div>
                         ))}
                      </div>

                      <AnimatePresence>
                        {showEduForm && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="space-y-3 p-4 bg-teal/5 rounded-2xl border border-teal/10 mb-4 overflow-hidden">
                             <Input placeholder="School/Uni" className="h-10 text-xs" value={newEdu.school} onChange={(e) => setNewEdu({...newEdu, school: e.target.value})} />
                             <Input placeholder="Degree" className="h-10 text-xs" value={newEdu.degree} onChange={(e) => setNewEdu({...newEdu, degree: e.target.value})} />
                             <Input placeholder="Year" className="h-10 text-xs" value={newEdu.year} onChange={(e) => setNewEdu({...newEdu, year: e.target.value})} />
                             <Button onClick={addEducation} className="w-full text-[10px] h-9 bg-teal hover:bg-teal/80">Add Entry</Button>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <Button variant="outline" onClick={() => setShowEduForm(true)} className="w-full h-12 rounded-xl border-dashed border-slate-200 text-teal font-black text-[10px] uppercase tracking-widest">
                         Add Education Manually
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="bento-card bg-[#0B1221] text-white p-8 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-teal/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-teal/20 transition-all" />
                      <h4 className="text-xs font-black text-teal uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                        <Rocket className="h-4 w-4" /> Venture Narrative
                      </h4>
                      <div className="space-y-4">
                         <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-teal/30 transition-all cursor-pointer group/item">
                            <p className="text-xs font-black text-teal mb-1 tracking-widest uppercase">Company Genesis</p>
                            <p className="text-sm text-slate-300 font-medium">Define the core spark that initiated your architectural journey.</p>
                            <div className="mt-2 h-1 w-0 bg-teal group-hover/item:w-full transition-all duration-500" />
                         </div>
                         <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-teal/30 transition-all cursor-pointer group/item">
                            <p className="text-xs font-black text-teal mb-1 tracking-widest uppercase">Capital Intensity</p>
                            <p className="text-sm text-slate-300 font-medium">Quantify your venture's resource allocation and project scales.</p>
                            <div className="mt-2 h-1 w-0 bg-teal group-hover/item:w-full transition-all duration-500" />
                         </div>
                         <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-teal/30 transition-all cursor-pointer group/item">
                            <p className="text-xs font-black text-teal mb-1 tracking-widest uppercase">Brand Archetype</p>
                            <p className="text-sm text-slate-300 font-medium">Identify the psychological core of your organization's identity.</p>
                            <div className="mt-2 h-1 w-0 bg-teal group-hover/item:w-full transition-all duration-500" />
                         </div>
                      </div>
                   </div>

                   <div className="bento-card bg-white p-8 flex flex-col justify-between group overflow-hidden relative">
                      <div className="absolute -left-16 -top-16 w-32 h-32 bg-orange/5 rounded-full blur-3xl group-hover:bg-orange/10 transition-all" />
                      <div>
                        <h4 className="text-xs font-black text-navy uppercase tracking-widest mb-6 flex items-center gap-2">
                          <Heart className="h-4 w-4 text-orange" /> Ecosystem Health
                        </h4>
                        <div className="space-y-6">
                           <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                 <span className="text-[11px] font-black text-slate-400 uppercase">Hiring Intensity</span>
                                 <span className="text-xs font-black text-orange">AGGRESSIVE</span>
                              </div>
                              <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                                 <motion.div initial={{ width: 0 }} animate={{ width: "85%" }} className="h-full bg-orange" />
                              </div>
                           </div>
                           <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                 <span className="text-[11px] font-black text-slate-400 uppercase">Retention Core</span>
                                 <span className="text-xs font-black text-teal">ELITE</span>
                              </div>
                              <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                                 <motion.div initial={{ width: 0 }} animate={{ width: "94%" }} className="h-full bg-teal" />
                              </div>
                           </div>
                           <div className="pt-4 grid grid-cols-2 gap-4">
                              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                                 <p className="text-lg font-black text-navy">24</p>
                                 <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Active Nodes</p>
                              </div>
                              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                                 <p className="text-lg font-black text-teal">$2.4M</p>
                                 <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Cap. Deployed</p>
                              </div>
                           </div>
                        </div>
                      </div>
                      <Button variant="hero" className="mt-8 w-full h-12 rounded-2xl bg-navy text-white font-black text-[10px] uppercase tracking-[0.2em] shadow-premium hover:bg-orange transition-all">
                         OPTIMIZE CULTURE 
                      </Button>
                   </div>
                </div>
              )}
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
};


export default SettingsPage;
