import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, Mic, BrainCircuit, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function FloatingBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Welcome to the future of work. I am Aura. How can I assist your mission today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const userStr = localStorage.getItem("skillswap_user");
  const user = userStr ? JSON.parse(userStr) : { role: "client", tier: "free" };
  const role = user?.role || "client";

  const suggestions = role === "freelancer" ? [
    "Refine my technical profile",
    "Find high-budget projects",
    "Optimize task throughput"
  ] : [
    "Generate tech requirements",
    "Find elite developers",
    "Analyze project milestones"
  ];

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      setShowBubble(false);
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const envKey = import.meta.env.VITE_GEMINI_API_KEY;
    const apiKey = localStorage.getItem("skillswap_gemini_key") || envKey;
    if (!apiKey) {
      toast.error("Please add your Gemini API Key in the AI Assistant tab first.");
      return;
    }

    const startInput = input;
    setInput("");
    
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: startInput };
    setMessages((prev) => [...prev, userMsg]);
    
    setIsTyping(true);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `You are Aura, an elite 3D-styled AI assistant for SkillSwap. You are professional, visionary, and concise. Use clean markdown. Context: ${startInput}`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();
      
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: text },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: "Apologies. My neural links are experiencing interference." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-24 right-8 z-50 bg-white border border-slate-200 shadow-premium p-4 rounded-3xl max-w-[200px]"
          >
            <p className="text-[11px] font-black text-navy leading-tight">
              Ready for your next mission? Aura is here to help.
            </p>
            <div className="absolute bottom-[-8px] right-6 w-4 h-4 bg-white border-r border-b border-slate-200 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-6 z-50 flex h-[500px] w-[380px] flex-col overflow-hidden rounded-[2.5rem] border border-white/20 bg-white/90 backdrop-blur-3xl shadow-premium"
          >
            <div className="flex items-center justify-between bg-navy p-6 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                  <BrainCircuit className="h-6 w-6 text-teal" />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest">Aura Intelligence</h3>
                  <p className="text-[10px] font-bold text-teal">NEURAL LINK ACTIVE</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-10 w-10 text-white/50 hover:text-white" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-auto p-6 space-y-6 bg-slate-50/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-[1.5rem] px-5 py-4 text-xs font-medium leading-relaxed ${
                      msg.role === "user"
                        ? "bg-navy text-white rounded-tr-none"
                        : "bg-white text-navy shadow-sm border border-slate-100 rounded-tl-none"
                    }`}
                  >
                    <div dangerouslySetInnerHTML={{
                      __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>')
                    }} />
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="rounded-[1.5rem] rounded-tl-none bg-white p-4 shadow-sm border border-slate-100">
                    <div className="flex gap-1.5">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-teal" style={{ animationDelay: "0ms" }} />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-teal" style={{ animationDelay: "150ms" }} />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-teal" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="bg-white p-4 border-t border-slate-100">
              <div className="flex items-center gap-3 bg-slate-50 rounded-2xl p-2 border border-slate-200 focus-within:border-teal/50 transition-all">
                <Input
                  className="border-none bg-transparent h-10 text-xs font-bold placeholder:text-slate-400 focus-visible:ring-0 shadow-none px-4"
                  placeholder="Initiate command..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <Button 
                  size="icon" 
                  className="h-10 w-10 shrink-0 rounded-xl bg-navy hover:bg-teal text-white shadow-soft transition-all"
                  onClick={handleSend}
                  disabled={isTyping}
                >
                  <Wand2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-premium transition-all hover:border-teal/30 group"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-50 to-white" />
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              className="relative z-10"
            >
              <X className="h-7 w-7 text-navy" />
            </motion.div>
          ) : (
            <motion.div
              key="bot"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative z-10 flex flex-col items-center"
            >
              <BrainCircuit className="h-8 w-8 text-teal animate-pulse" />
              <div className="mt-1 flex gap-0.5">
                  <div className="w-1 h-1 rounded-full bg-teal/50" />
                  <div className="w-1 h-1 rounded-full bg-teal/50" />
                  <div className="w-1 h-1 rounded-full bg-teal/50" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Matte-white 3D sheen */}
        <div className="absolute -inset-1 bg-gradient-to-tr from-transparent via-white/40 to-transparent skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      </motion.button>
    </>
  );
}
