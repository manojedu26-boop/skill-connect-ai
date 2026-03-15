import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { mockFreelancers } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, MapPin, Clock, Star, MessageSquare, Bookmark, CheckCircle, Briefcase, Plus, Send } from "lucide-react";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Play, Github, Linkedin, ThumbsUp, Calendar as CalendarIcon, GraduationCap, Quote } from "lucide-react";
import { toast } from "sonner";

const FreelancerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const freelancer = mockFreelancers.find(f => f.id === id);
  const [showHireModal, setShowHireModal] = useState(false);
  const userStr = localStorage.getItem("skillswap_user");
  const role = userStr ? JSON.parse(userStr).role : null;

  if (!freelancer) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-lg text-muted-foreground">Freelancer not found</p>
          <Button variant="ghost" onClick={() => navigate("/freelancers")} className="mt-4">
            Back to Freelancers
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const initials = freelancer.name.split(" ").map(n => n[0]).join("");
  const scoreColor = freelancer.score >= 80 ? "text-primary" : freelancer.score >= 60 ? "text-warning" : "text-destructive";

  const scoreMetrics = [
    { label: "Ability Test", value: `${Math.min(freelancer.score + 5, 99)}%`, tooltip: "Calculated using completed projects, client feedback, and skill assessments." },
    { label: "Availability", value: "90%", tooltip: "Percentage of invitations responded to within 24 hours." },
    { label: "Leadership", value: `${Math.max(freelancer.score - 5, 50)}%`, tooltip: "Based on successful delivery of multi-stakeholder projects." },
    { label: "Communication", value: `${Math.min(freelancer.score + 2, 95)}%`, tooltip: "Derived from message response rates and positive sentiment analysis." },
    { label: "Responsibility", value: `${Math.min(freelancer.score + 10, 99)}%`, tooltip: "Adherence to self-imposed deadlines and milestones." },
  ];

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <button onClick={() => navigate("/freelancers")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Freelancers
        </button>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left - Profile Info */}
          <div className="space-y-4">
            <Card className="shadow-card overflow-hidden">
              <div className="h-24 gradient-primary" />
              <CardContent className="relative p-5 pt-28">
                <Avatar className="absolute -top-12 left-5 h-24 w-24 border-4 border-card z-20 shadow-xl">
                  <AvatarFallback className="bg-accent text-accent-foreground text-xl font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                {freelancer.verified && (
                  <div className="absolute right-5 top-2">
                    <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                      <CheckCircle className="h-3 w-3" /> Verified
                    </span>
                  </div>
                )}
                <div>
                  <h1 className="text-xl font-bold text-card-foreground leading-tight">{freelancer.name}</h1>
                  <div className="mt-1 flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary">{freelancer.title}</Badge>
                    {freelancer.githubUrl && (
                      <a href={freelancer.githubUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {freelancer.linkedinUrl && (
                      <a href={freelancer.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        <Linkedin className="h-4 w-4" />
                      </a>
                    )}
                  </div>

                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-card-foreground">Skills & Endorsements</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {freelancer.skills.map(s => (
                        <div key={s} className="group flex items-center gap-1.5 rounded-full border border-border bg-muted/30 px-3 py-1 text-xs transition-all hover:border-primary/50 cursor-pointer">
                           <span>{s}</span>
                           <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                           <span className="flex items-center gap-1 text-muted-foreground group-hover:text-primary transition-colors">
                             <ThumbsUp className="h-3 w-3" />
                             {Math.floor(Math.random() * 20) + 5}
                           </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-card-foreground">Position type</h3>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {freelancer.positionType.map(p => (
                        <Badge key={p} variant="outline" className="text-xs">{p}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-lg border border-border p-3">
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="flex items-center gap-1 text-sm font-medium text-card-foreground">
                        <MapPin className="h-3 w-3" /> {freelancer.location}
                      </p>
                    </div>
                    <div className="rounded-lg border border-border p-3">
                      <p className="text-xs text-muted-foreground">Timezone</p>
                      <p className="flex items-center gap-1 text-sm font-medium text-card-foreground">
                        <Clock className="h-3 w-3" /> {freelancer.timezone}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {role === "client" ? (
              <div className="flex gap-2 flex-wrap">
                <Button variant="hero" onClick={() => setShowHireModal(!showHireModal)} className="flex-1 gap-2">
                  <Briefcase className="h-4 w-4" /> Hire Freelancer
                </Button>
                <Button variant="outline" className="flex-1 gap-2 border-primary text-primary hover:bg-primary/10" onClick={() => toast.success(`Invited ${freelancer.name} to project!`)}>
                  <Plus className="h-4 w-4" /> Invite to Project
                </Button>
                <Button 
                  variant="ghost" 
                  className="flex-1 gap-2"
                  onClick={() => navigate("/messages", { state: { freelancerId: freelancer.id, freelancerName: freelancer.name } })}
                >
                  <MessageSquare className="h-4 w-4" /> Message
                </Button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Button variant="hero" className="flex-1 gap-2">
                  <MessageSquare className="h-4 w-4" /> Contact
                </Button>
                <Button variant="outline" className="gap-2">
                  <Bookmark className="h-4 w-4" /> Save
                </Button>
              </div>
            )}
            
            {showHireModal && role === "client" && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-4 p-4 rounded-xl border border-primary/20 bg-primary/5">
                <h3 className="font-semibold text-lg mb-3">Hire {freelancer.name}</h3>
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs mb-1 block">Select Project</Label>
                    <select className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option>E-Commerce Platform Redesign</option>
                      <option>Mobile App MVP</option>
                    </select>
                  </div>
                  <div>
                    <Label className="text-xs mb-1 block">Proposed Budget ($)</Label>
                    <Input type="number" placeholder="e.g. 5000" />
                  </div>
                  <Button 
                    className="w-full gap-2 mt-2" 
                    onClick={() => {
                      toast.success(`Hiring invite sent to ${freelancer.name}!`);
                      setShowHireModal(false);
                    }}
                  >
                    <Send className="h-4 w-4" /> Send Contract Invite
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right - Scores */}
          <div className="space-y-4 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-5">
              {scoreMetrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Card className="shadow-card cursor-help hover:border-primary/50 transition-colors">
                        <CardContent className="p-4 text-center">
                          <p className="text-2xl font-bold text-card-foreground">{m.value}</p>
                          <p className="text-xs text-muted-foreground">{m.label}</p>
                        </CardContent>
                      </Card>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[200px] text-center bg-card text-card-foreground border border-border">
                      <p>{m.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </motion.div>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="shadow-card">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-semibold text-card-foreground">Aspect Score</h3>
                  <div className="flex items-center justify-center">
                    <div className="relative h-40 w-40">
                      <svg className="h-40 w-40 -rotate-90" viewBox="0 0 160 160">
                        <circle cx="80" cy="80" r="70" fill="none" stroke="hsl(var(--muted))" strokeWidth="12" />
                        <circle
                          cx="80" cy="80" r="70" fill="none"
                          stroke="hsl(var(--primary))" strokeWidth="12"
                          strokeLinecap="round"
                          strokeDasharray={`${(freelancer.score / 100) * 440} 440`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-4xl font-bold ${scoreColor}`}>{freelancer.score}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardContent className="p-6">
                  <div className="mb-1 flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-card-foreground">Overall Score</h3>
                    <Badge className="bg-success/10 text-success">High Potential</Badge>
                  </div>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="text-lg">🏆</span>
                      <div>
                        <p className="font-medium text-card-foreground">Top of class</p>
                        <p className="text-sm text-muted-foreground">This candidate is in the top 10</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Star className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium text-card-foreground">Leadership</p>
                        <p className="text-sm text-muted-foreground">Strong leadership qualities</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium text-card-foreground">Availability</p>
                        <p className="text-sm text-muted-foreground">{freelancer.availability} availability</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-card">
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-semibold text-card-foreground">Rate & Experience</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-lg bg-accent p-4 text-center">
                    <p className="text-xl font-bold text-accent-foreground">{freelancer.rate}</p>
                    <p className="text-sm text-muted-foreground">Hourly Rate</p>
                  </div>
                  <div className="rounded-lg bg-accent p-4 text-center">
                    <p className="text-xl font-bold text-accent-foreground">47</p>
                    <p className="text-sm text-muted-foreground">Projects</p>
                  </div>
                  <div className="rounded-lg bg-accent p-4 text-center">
                    <p className="text-xl font-bold text-accent-foreground">4.9</p>
                    <p className="text-sm text-muted-foreground">Avg Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card bg-muted/20 border-border/40">
              <CardContent className="p-6">
                 <h3 className="text-lg font-bold mb-4">People Also Viewed</h3>
                 <div className="space-y-4">
                    {mockFreelancers.filter(f => f.id !== id).slice(0,3).map(f => (
                      <div key={f.id} className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate(`/freelancers/${f.id}`)}>
                         <Avatar className="h-10 w-10 border border-border">
                            <AvatarFallback className="text-[10px]">{f.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                         </Avatar>
                         <div>
                            <p className="text-sm font-bold group-hover:text-primary transition-colors">{f.name}</p>
                            <p className="text-[11px] text-muted-foreground">{f.title}</p>
                         </div>
                      </div>
                    ))}
                 </div>
                 <Button variant="ghost" size="sm" className="w-full mt-4 text-xs h-8 text-primary hover:bg-primary/5" onClick={() => navigate("/freelancers")}>
                   Show more
                 </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Portfolio Tabs Section */}
        <div className="mt-8">
          <Tabs defaultValue="portfolio" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview & Reviews</TabsTrigger>
              <TabsTrigger value="experience">Experience & Education</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio Gallery</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6 space-y-6">
              <Card className="shadow-card border-border/60">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-card-foreground">About Me</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    I am a highly driven {freelancer.title} with a proven track record of delivering successful projects on time. 
                    With a focus on clean scalable code and beautiful design patterns, I ensure your business goals are met perfectly.
                  </p>
                  
                  <h3 className="text-xl font-semibold mt-8 mb-4 text-card-foreground">Recommendations</h3>
                  <div className="space-y-4">
                    {[
                      { name: "Sarah Jenkins", role: "CEO at FintechFlow", text: "One of the most efficient developers I've ever worked with. The attention to detail is unmatched." },
                      { name: "David Chen", role: "Product Manager at EcoScale", text: "Delivered a complex mobile app ahead of schedule. Highly recommended for any serious web project." }
                    ].map((rec, i) => (
                      <div key={i} className="p-5 rounded-2xl border border-border bg-card relative overflow-hidden group">
                        <Quote className="absolute -top-2 -right-2 h-16 w-16 text-primary/5 -rotate-12 transition-transform group-hover:scale-110" />
                        <div className="flex gap-1 mb-2">
                           {[1,2,3,4,5].map(s => <Star key={s} className="h-3 w-3 fill-primary text-primary" />)}
                        </div>
                        <p className="font-medium text-foreground italic">"{rec.text}"</p>
                        <div className="mt-4 flex items-center gap-2">
                           <div className="h-8 w-8 rounded-full bg-accent" />
                           <div>
                             <p className="text-xs font-bold">{rec.name}</p>
                             <p className="text-[10px] text-muted-foreground">{rec.role}</p>
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience" className="mt-6 space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Experience Timeline */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-foreground">
                    <CalendarIcon className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-bold">Work Experience</h3>
                  </div>
                  <div className="relative space-y-8 before:absolute before:inset-0 before:ml-4 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-border before:to-transparent">
                    {[
                      { company: "Global Tech Solutions", role: "Senior Web Developer", period: "2021 - Present", desc: "Leading a team of 10 developers in building enterprise-scale applications.", icon: <Briefcase className="h-4 w-4" /> },
                      { company: "Innovate AI", role: "Full Stack Engineer", period: "2019 - 2021", desc: "Developed core modules for an AI-driven marketing automation tool.", icon: <Briefcase className="h-4 w-4" /> }
                    ].map((exp, i) => (
                      <div key={i} className="relative pl-12 group">
                        <div className="absolute left-0 mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-card border-2 border-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors z-10">
                          {exp.icon}
                        </div>
                        <div className="rounded-2xl border border-border p-5 hover:border-primary/50 transition-colors shadow-sm bg-card/50">
                           <span className="text-xs font-bold text-primary">{exp.period}</span>
                           <h4 className="text-lg font-bold mt-1">{exp.role}</h4>
                           <p className="text-sm font-semibold text-muted-foreground">{exp.company}</p>
                           <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{exp.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education Timeline */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-foreground">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-bold">Education</h3>
                  </div>
                  <div className="relative space-y-8 before:absolute before:inset-0 before:ml-4 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-border before:to-transparent">
                    {[
                      { school: "Stanford University", degree: "M.S. in Computer Science", period: "2017 - 2019", desc: "Specialized in Artificial Intelligence and Distributed Systems.", icon: <GraduationCap className="h-4 w-4" /> },
                      { school: "MIT", degree: "B.S. in Software Engineering", period: "2013 - 2017", desc: "Graduated with honors. Lead of the Robotics Club.", icon: <GraduationCap className="h-4 w-4" /> }
                    ].map((edu, i) => (
                      <div key={i} className="relative pl-12 group">
                        <div className="absolute left-0 mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-card border-2 border-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors z-10">
                          {edu.icon}
                        </div>
                        <div className="rounded-2xl border border-border p-5 hover:border-primary/50 transition-colors shadow-sm bg-card/50">
                           <span className="text-xs font-bold text-primary">{edu.period}</span>
                           <h4 className="text-lg font-bold mt-1">{edu.degree}</h4>
                           <p className="text-sm font-semibold text-muted-foreground">{edu.school}</p>
                           <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{edu.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="portfolio" className="mt-6 space-y-6">
              <h3 className="text-xl font-semibold text-foreground">Recent Case Studies</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {[1,2,3].map((item) => (
                   <motion.div key={item} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: item * 0.1 }}>
                     <Card className="overflow-hidden shadow-card group cursor-pointer hover:border-primary/50 transition-colors">
                        <div className="relative h-48 bg-muted overflow-hidden">
                          <img src={`https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800&h=600`} alt="Portfolio" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                             <Button variant="hero" size="sm" className="gap-2 rounded-full">
                               <ExternalLink className="h-4 w-4" /> View Live
                             </Button>
                          </div>
                        </div>
                        <CardContent className="p-4">
                           <h4 className="font-semibold text-lg">Fintech Dashboard App {item}</h4>
                           <p className="text-sm text-muted-foreground my-2 line-clamp-2">A comprehensive analytics dashboard scaling to 1M+ active daily users.</p>
                           <div className="flex gap-2 flex-wrap mt-3">
                             {freelancer.skills.slice(0,2).map(s => (
                               <Badge key={s} variant="outline" className="text-[10px]">{s}</Badge>
                             ))}
                           </div>
                        </CardContent>
                     </Card>
                   </motion.div>
                 ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default FreelancerProfile;
