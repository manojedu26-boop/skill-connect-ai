import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, Mic } from "lucide-react";
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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm your global SkillSwap AI assistant. How can I help you navigate or find something today?",
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
    "Help me write a proposal for a React job.",
    "What are the top skills clients are looking for?",
    "How can I improve my profile visibility?"
  ] : [
    "Help me write a job description for a UI Designer.",
    "What's a fair budget for a full-stack MVP?",
    "Suggest top freelancers for my new startup."
  ];

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
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
    
    // Simulate Free Tier Limits
    if (user.tier !== "premium") {
      const usageCount = parseInt(localStorage.getItem("skillswap_ai_usage") || "0");
      if (usageCount >= 10) {
        setMessages((prev) => [
          ...prev,
          { id: (Date.now() + 1).toString(), role: "assistant", content: "⚠️ **Daily Limit Reached!**\n\nYou have used all 10 of your free AI requests for today. Upgrade to **SkillSwap Pro** for unlimited access to AI Smart Matching, Proposal generation, and more!" },
        ]);
        toast("Upgrade to Pro", {
          description: "You've reached your daily AI limit.",
          action: {
            label: "View Plans",
            onClick: () => navigate("/pricing")
          }
        });
        return;
      }
      localStorage.setItem("skillswap_ai_usage", (usageCount + 1).toString());
    }

    setIsTyping(true);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `You are a helpful, enthusiastic AI assistant for a platform called SkillSwap, which connects freelancers with clients. Keep your answers concise, friendly, and structured. Use markdown formatting. Answer this: ${startInput}`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();
      
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: text },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: "Oops! I couldn't reach the servers. Make sure your API key is correct in the AI Assistant page." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-6 z-50 flex h-[450px] w-[350px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-elevated"
          >
            <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full gradient-primary">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">SkillSwap Bot</h3>
                  <p className="text-xs text-success">Online</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-auto p-4 space-y-4 bg-background/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                      msg.role === "user"
                        ? "gradient-primary text-primary-foreground rounded-tr-sm"
                        : "bg-muted text-foreground rounded-tl-sm"
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
                  <div className="rounded-2xl rounded-tl-sm bg-muted px-4 py-3">
                    <div className="flex gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/50" style={{ animationDelay: "0ms" }} />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/50" style={{ animationDelay: "150ms" }} />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/50" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              {messages.length === 1 && !isTyping && (
                <div className="flex flex-wrap gap-2 mt-4 max-w-[90%]">
                  {suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setInput(suggestion);
                      }}
                      className="text-[11px] text-left bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1.5 rounded-full border border-primary/20 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="border-t border-border bg-card p-3">
              <div className="flex items-center gap-2">
                <Input
                  className="rounded-full h-9 bg-muted border-none placeholder:text-muted-foreground/60"
                  placeholder="Ask me anything..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <Button 
                  size="icon" 
                  className="h-9 w-9 shrink-0 rounded-full gradient-primary"
                  onClick={handleSend}
                  disabled={isTyping}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full gradient-hero shadow-elevated transition-transform hover:-translate-y-1"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6 text-primary-foreground" />
            </motion.div>
          ) : (
            <motion.div
              key="bot"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
            >
              <Bot className="h-7 w-7 text-primary-foreground" />
            </motion.div>
          )}
        </AnimatePresence>
        {!isOpen && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
            1
          </span>
        )}
      </motion.button>
    </>
  );
}
