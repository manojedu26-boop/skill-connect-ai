import { useState, useRef, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Sparkles, User, Settings, Save } from "lucide-react";
import { motion } from "framer-motion";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { toast } from "sonner";

interface AIMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const initialMessages: AIMessage[] = [
  {
    id: "1",
    role: "assistant",
    content: "👋 Hi! I'm SkillSwap AI. I can help you:\n\n• **Improve your skill descriptions** to attract more clients\n• **Write better project descriptions** for optimal matches\n• **Find the best freelancers** for your project\n\nWhat would you like help with?",
  },
];

const aiResponses: Record<string, string> = {
  skills: "Before I help improve your skills description, let me ask a few questions:\n\n1. **What's your primary domain?** (e.g., web dev, design, data science)\n2. **How many years of experience** do you have?\n3. **What's your biggest strength** that sets you apart?\n\nShare these details and I'll craft a compelling description!",
  project: "I'd love to help you write a better project description! Let me understand your needs:\n\n1. **What type of project** is this? (website, app, API, etc.)\n2. **What's your timeline** and budget range?\n3. **Do you have any technical preferences** for tools/frameworks?\n\nThe more details you share, the better I can help!",
  match: "Great choice! I'll help you find the perfect match. First, tell me:\n\n1. **What skills are essential** for this project?\n2. **What's your preferred timezone** or location?\n3. **Budget range** and engagement type? (hourly, fixed, contract)\n\nBased on our talent pool, I'll suggest the best matches!",
  default: "That's a great question! Based on what you've shared, here are my suggestions:\n\n🎯 **For freelancers**: Focus on showcasing measurable results. Instead of \"I know React\", try \"Built 15+ React applications serving 100K+ users\".\n\n📋 **For clients**: Be specific about deliverables and timeline. Clear expectations attract better talent.\n\nWould you like me to help with something specific?",
};

const AIAssistant = () => {
  const [messages, setMessages] = useState<AIMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const envKey = import.meta.env.VITE_GEMINI_API_KEY || "";
  const [apiKeyInput, setApiKeyInput] = useState(localStorage.getItem("skillswap_gemini_key") || envKey);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const saveApiKey = () => {
    localStorage.setItem("skillswap_gemini_key", apiKeyInput);
    toast.success("Gemini API Key saved!");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    if (!apiKeyInput) {
      toast.error("Please enter your Gemini API Key first.");
      return;
    }

    const startInput = input;
    setInput("");

    const userMsg: AIMessage = { id: Date.now().toString(), role: "user", content: startInput };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const genAI = new GoogleGenerativeAI(apiKeyInput);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `You are a helpful, enthusiastic AI assistant for a platform called SkillSwap, which connects freelancers with clients. Keep your answers concise, friendly, and structured. Use markdown formatting. Answer this: ${startInput}`;

      const result = await model.generateContent(prompt);
      const text = await result.response.text();

      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: "assistant", content: text }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: "assistant", content: "Oops! Request failed. Please check if your API key is correct." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto flex h-[calc(100vh-8rem)] max-w-3xl flex-col">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">AI Assistant</h1>
            <p className="text-sm text-muted-foreground">Powered by Gemini AI</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Input
              type="password"
              placeholder="Gemini API Key..."
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              className="w-64"
            />
            <Button variant="outline" size="icon" onClick={saveApiKey}>
              <Save className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Card className="flex flex-1 flex-col shadow-card">
          <CardContent className="flex h-full flex-col p-0">
            <div className="flex-1 overflow-auto p-5 space-y-4">
              {messages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg gradient-primary">
                      <Sparkles className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.role === "user"
                      ? "gradient-primary text-primary-foreground"
                      : "bg-muted text-card-foreground"
                    }`}>
                    <div className="text-sm whitespace-pre-line" dangerouslySetInnerHTML={{
                      __html: msg.content
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\n/g, '<br/>')
                    }} />
                  </div>
                  {msg.role === "user" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent">
                      <User className="h-4 w-4 text-accent-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg gradient-primary">
                    <Sparkles className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="rounded-2xl bg-muted px-4 py-3">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50" style={{ animationDelay: "0ms" }} />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50" style={{ animationDelay: "150ms" }} />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="border-t border-border p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask me anything about improving your profile, projects..."
                  className="rounded-xl"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <Button variant="hero" size="icon" onClick={handleSend} disabled={isTyping}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Improve my skills", "Write project description", "Find matching freelancers"].map(q => (
                  <button
                    key={q}
                    onClick={() => { setInput(q); }}
                    className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AIAssistant;
