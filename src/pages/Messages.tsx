import DashboardLayout from "@/components/DashboardLayout";
import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Send, FileUp, Sparkles, Wand2, Search, MoreVertical, 
  Pin, Paperclip, Link2, Info, MessageSquare, 
  ChevronRight, BrainCircuit, History, Share2, Plus, FolderOpen
} from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function Messages() {
  const location = useLocation();
  const directFreelancer = location.state?.freelancerName;
  const directId = location.state?.freelancerId;

  const initialContacts = [
    { id: "techcorp", name: "TechCorp Inc.", role: "Client", initials: "TK", lastMsg: "Great! Let's schedule a kickoff...", time: "2m ago", online: true },
    { id: "marcus", name: "Marcus Aurelius", role: "Freelancer", initials: "MA", lastMsg: "I've updated the Figma file...", time: "1h ago", online: false },
    { id: "nexus", name: "Nexus Design", role: "Client", initials: "ND", lastMsg: "Payment successful.", time: "4h ago", online: true }
  ];

  const [activeContact, setActiveContact] = useState<any>(
    directId ? { id: directId, name: directFreelancer, role: "Freelancer", initials: directFreelancer?.[0] || "F", lastMsg: "", online: true, time: "Now" } : initialContacts[0]
  );

  const [contacts, setContacts] = useState<any[]>(
    directId && !initialContacts.find(c => c.id === directId) 
      ? [{ id: directId, name: directFreelancer, role: "Freelancer", initials: directFreelancer?.[0], lastMsg: "Starting conversation...", online: true, time: "Now" }, ...initialContacts]
      : initialContacts
  );

  const [messages, setMessages] = useState([
    { id: 1, text: "Hey! Are you available to start the E-commerce project next week?", sender: "other", role: "Client", time: "10:30 AM", pinned: false },
    { id: 2, text: "Absolutely, I have a slot opening up on Tuesday.", sender: "me", role: "Freelancer", time: "10:32 AM", pinned: true },
    { id: 3, text: "Perfect. I'll send over the architectural brief shortly.", sender: "other", role: "Client", time: "10:35 AM", pinned: false },
  ]);

  const [input, setInput] = useState("");
  const [isAiSuggesting, setIsAiSuggesting] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (text: string = input) => {
    if (!text.trim()) return;
    const now = new Date();
    const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
    setMessages([...messages, { id: Date.now(), text, sender: "me", role: "Freelancer", time, pinned: false }]);
    setInput("");

    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: "Received. Our systems are processing your input.", 
        sender: "other", 
        role: activeContact.role,
        time,
        pinned: false
      }]);
    }, 1500);
  };

  const summarizeConversation = async () => {
    const envKey = import.meta.env.VITE_GEMINI_API_KEY;
    const apiKey = localStorage.getItem("skillswap_gemini_key") || envKey;
    if (!apiKey) {
      toast.error("Please add a Gemini API Key to use AI Summarization.");
      return;
    }

    setIsSummarizing(true);
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const chatHistory = messages.map(m => `${m.sender}: ${m.text}`).join('\n');
      const prompt = `Summarize this professional conversation in 3 concise bullet points focusing on action items and status:\n\n${chatHistory}`;
      
      const result = await model.generateContent(prompt);
      const summary = result.response.text();
      toast.info("AI Summary Generated", { description: summary });
    } catch (error) {
      toast.error("AI node failed to respond.");
    } finally {
      setIsSummarizing(false);
    }
  };

  const assistWithWriting = async () => {
    if (!input.trim()) return;
    const envKey = import.meta.env.VITE_GEMINI_API_KEY;
    const apiKey = localStorage.getItem("skillswap_gemini_key") || envKey;
    if (!apiKey) return toast.error("Gemini API Key missing.");

    setIsAiSuggesting(true);
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Rewrite this draft message to be highly elite, professional, and clear. 1 sentence maximum: "${input}"`;
      const result = await model.generateContent(prompt);
      setInput(result.response.text().trim());
      toast.success("Intelligence Refined");
    } catch (error) {
      toast.error("AI refinement failed.");
    } finally {
      setIsAiSuggesting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex h-full gap-6 antialiased" style={{ height: 'calc(100vh - 9rem)' }}>
        
        {/* PANEL 1: CONTACTS */}
        <div className="w-80 shrink-0 flex flex-col bg-white rounded-[2.5rem] border border-slate-100 shadow-soft overflow-hidden">
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
               <h2 className="text-xl font-black text-navy tracking-tight">Messages</h2>
               <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-slate-50">
                  <Plus className="h-4 w-4 text-navy" />
               </Button>
            </div>
            <div className="relative group">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-teal transition-colors" />
               <Input placeholder="Search threads..." className="bg-slate-50 border-none rounded-xl pl-10 text-xs font-bold" />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto px-4 space-y-2 pb-6">
            <p className="px-2 pb-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Channels</p>
            {contacts.map((contact) => (
              <div 
                key={contact.id}
                onClick={() => setActiveContact(contact)}
                className={`flex gap-3 p-4 rounded-3xl cursor-pointer transition-all duration-300 relative group ${activeContact.id === contact.id ? "bg-navy text-white shadow-lg scale-[1.02]" : "hover:bg-slate-50"}`}
              >
                <div className="relative">
                  <Avatar className="h-10 w-10 border-2 border-transparent group-hover:border-teal/30 transition-all">
                    <AvatarFallback className={activeContact.id === contact.id ? "bg-white/10 text-white" : "bg-navy text-white"}>{contact.initials}</AvatarFallback>
                  </Avatar>
                  {contact.online && <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-teal border-2 border-white" />}
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between mb-0.5">
                    <h3 className="font-black text-sm truncate">{contact.name}</h3>
                    <span className={`text-[8px] font-bold ${activeContact.id === contact.id ? 'text-slate-400' : 'text-slate-400'}`}>{contact.time}</span>
                  </div>
                  <p className={`text-[10px] truncate leading-tight ${activeContact.id === contact.id ? 'text-slate-300' : 'text-slate-500'} font-medium`}>{contact.lastMsg}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PANEL 2: CHAT INTERFACE */}
        <div className="flex-1 flex flex-col bg-white rounded-[2.5rem] border border-slate-100 shadow-premium overflow-hidden relative">
          {/* Header */}
          <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-white/80 backdrop-blur-xl sticky top-0 z-10">
              <div className="flex items-center gap-4">
                  <Avatar className="h-11 w-11">
                    <AvatarFallback className="bg-navy text-white font-black">{activeContact.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-black text-navy">{activeContact.name}</h2>
                    <div className="flex items-center gap-2">
                       <span className="h-1.5 w-1.5 rounded-full bg-teal animate-pulse" />
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{activeContact.online ? 'Synced' : 'Offline'}</span>
                    </div>
                  </div>
              </div>
              <div className="flex items-center gap-2">
                 <Button 
                   onClick={summarizeConversation} 
                   disabled={isSummarizing}
                   variant="ghost" 
                   className="h-10 px-4 rounded-xl flex items-center gap-2 text-[10px] font-black text-teal bg-teal/5 hover:bg-teal/10 border border-teal/10"
                 >
                    {isSummarizing ? <BrainCircuit className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
                    NEURAL SUMMARY
                 </Button>
                 <Button onClick={() => setRightPanelOpen(!rightPanelOpen)} variant="ghost" size="icon" className={`h-10 w-10 rounded-xl ${rightPanelOpen ? 'bg-navy text-white' : 'bg-slate-50 text-navy'}`}>
                    <Info className="h-5 w-5" />
                 </Button>
              </div>
          </div>

          {/* Messages Grid */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50/30">
            <div className="flex flex-col items-center justify-center py-10 opacity-30">
               <div className="h-px w-24 bg-slate-300 mb-4" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Architectural Bond Initiated</span>
               <div className="h-px w-24 bg-slate-300 mt-4" />
            </div>
            
            <AnimatePresence initial={false}>
              {messages.map((m) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }}
                  key={m.id} 
                  className={`flex ${m.sender === "me" ? "justify-end" : "justify-start"} group relative`}
                >
                   <div className="max-w-[75%] space-y-1.5">
                      <div className={`flex items-center gap-2 mb-1 ${m.sender === "me" ? "justify-end" : "justify-start"}`}>
                         <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{m.time}</span>
                         {m.pinned && <Pin className="h-3 w-3 text-orange fill-orange" />}
                      </div>
                      <div className={`p-5 rounded-[2rem] text-sm leading-relaxed shadow-soft transition-all duration-300 ${
                        m.sender === "me" 
                          ? "bg-navy text-white rounded-tr-sm hover:translate-x-[-4px]" 
                          : "bg-white text-navy border border-slate-100 rounded-tl-sm hover:translate-x-[4px]"
                      }`}>
                        {m.text}
                      </div>
                   </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Input Interface */}
          <div className="p-6 bg-white border-t border-slate-50">
            <div className="bg-slate-50 rounded-[2rem] p-2 flex items-end gap-2 border border-slate-100 focus-within:border-teal/30 focus-within:bg-white transition-all">
               <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full hover:bg-white text-slate-400 hover:text-navy">
                  <FileUp className="h-5 w-5" />
               </Button>
               <div className="relative flex-1">
                  <textarea 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                    placeholder="Type an executive command..."
                    className="w-full bg-transparent border-none focus:ring-0 py-4 px-2 text-sm font-bold text-navy resize-none max-h-32 scrollbar-none"
                    rows={1}
                  />
                  {input.trim() && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-0 top-3">
                       <Button 
                         variant="ghost" 
                         size="icon" 
                         onClick={assistWithWriting}
                         disabled={isAiSuggesting}
                         className="h-8 w-8 rounded-xl bg-teal/10 text-teal hover:bg-teal hover:text-white"
                       >
                         {isAiSuggesting ? <BrainCircuit className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
                       </Button>
                    </motion.div>
                  )}
               </div>
               <Button onClick={() => handleSend()} disabled={!input.trim()} className="h-12 w-12 rounded-full bg-navy text-white hover:bg-teal shadow-lg transition-all">
                  <Send className="h-5 w-5" />
               </Button>
            </div>
            <div className="mt-4 flex items-center justify-between px-4">
               <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-[8px] font-black text-slate-400 uppercase tracking-widest">
                     <span className="h-1 w-1 rounded-full bg-teal" /> Read: 10:45 AM
                  </div>
                  <div className="flex items-center gap-1 text-[8px] font-black text-slate-400 uppercase tracking-widest">
                     <Share2 className="h-3 w-3" /> Shared Asset mode
                  </div>
               </div>
               <p className="text-[10px] font-bold text-slate-400">Shift + Enter for new line</p>
            </div>
          </div>
        </div>

        {/* PANEL 3: CONTEXT & ASSETS */}
        <AnimatePresence>
          {rightPanelOpen && (
            <motion.div 
              initial={{ width: 0, opacity: 0 }} 
              animate={{ width: 320, opacity: 1 }} 
              exit={{ width: 0, opacity: 0 }}
              className="shrink-0 flex flex-col gap-6 overflow-hidden"
            >
              <div className="bg-white rounded-[2rem] border border-slate-100 shadow-soft p-8 space-y-6">
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-orange uppercase tracking-[.25em]">Critical Files</p>
                    <h3 className="font-black text-navy uppercase text-sm">Asset Repository</h3>
                 </div>
                 
                 <div className="space-y-3">
                    {[
                      { icon: FolderOpen, name: "Architecture_Brief.pdf", size: "2.4 MB", date: "Mar 12" },
                      { icon: Link2, name: "Prototype_V1.figma", size: "Link", date: "Mar 14" },
                      { icon: FileUp, name: "Brand_Assets.zip", size: "48 MB", date: "Mar 15" }
                    ].map((asset, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-teal/30 cursor-pointer transition-all group">
                         <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-navy shadow-soft group-hover:scale-110 transition-transform">
                            <asset.icon className="h-5 w-5" />
                         </div>
                         <div className="flex-1 overflow-hidden">
                            <p className="text-xs font-black truncate text-navy">{asset.name}</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{asset.size} • {asset.date}</p>
                         </div>
                      </div>
                    ))}
                 </div>
                 
                 <Button variant="outline" className="w-full h-12 rounded-2xl border-dashed border-slate-200 text-navy font-black text-[10px] uppercase tracking-widest hover:bg-slate-50">
                    VIEW ALL CLOUD ASSETS
                 </Button>
              </div>

              <div className="bg-[#0B1221] rounded-[2rem] shadow-premium p-8 space-y-6 flex-1 overflow-hidden relative">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-teal/10 rounded-full blur-3xl -mr-16 -mt-16" />
                 <div className="space-y-1 relative z-10">
                    <p className="text-[10px] font-black text-teal uppercase tracking-[.25em]">Neural Bond</p>
                    <h3 className="font-black text-white uppercase text-sm">Pinned Context</h3>
                 </div>
                 
                 <div className="space-y-4 relative z-10">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                       <div className="flex items-center justify-between">
                          <Pin className="h-3 w-3 text-orange" />
                          <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Mar 14</span>
                       </div>
                       <p className="text-[11px] font-medium text-slate-300 leading-relaxed italic">"The project must prioritize server-side rendering for optimal SEO and client-side hydration for deep interactivity."</p>
                    </div>
                 </div>
                 
                 <div className="mt-8 p-6 rounded-2xl bg-teal-gradient text-white space-y-3 shadow-lg shadow-teal/20">
                    <p className="text-[9px] font-black uppercase tracking-widest opacity-80">AI Insight</p>
                    <p className="text-xs font-bold leading-tight">Next suggested action: Finalize Milestone 1 Deliverables for approval.</p>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </DashboardLayout>
  );
}
