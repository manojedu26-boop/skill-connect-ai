import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function AIGigGenerator({ onClose, onApply }: { onClose: () => void, onApply: (gig: any) => void }) {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedGig, setGeneratedGig] = useState<{ title: string, description: string, price: string, tags: string[] } | null>(null);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!prompt) return;
    
    const envKey = import.meta.env.VITE_GEMINI_API_KEY;
    const apiKey = localStorage.getItem("skillswap_gemini_key") || envKey;
    if (!apiKey) {
      toast.error("Please set your Gemini API Key in the AI Assistant tab.");
      return;
    }

    setIsGenerating(true);
    
    const userStr = localStorage.getItem("skillswap_user");
    const user = userStr ? JSON.parse(userStr) : { tier: "free" };
    
    if (user.tier !== "premium") {
      const usageCount = parseInt(localStorage.getItem("skillswap_ai_usage") || "0");
      if (usageCount >= 10) {
        setIsGenerating(false);
        toast.error("Daily Limit Reached", {
          description: "You've used all 10 free AI requests. Upgrade for unlimited access.",
          action: {
            label: "Upgrade",
            onClick: () => {
              onClose();
              navigate("/pricing");
            }
          }
        });
        return;
      }
      localStorage.setItem("skillswap_ai_usage", (usageCount + 1).toString());
    }

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const command = `You are a professional gig copywriter for SkillSwap. Generate a comprehensive and attractive gig/project. 
      Topic: ${prompt}
      Return ONLY a raw JSON object with these exact keys: "title", "description" (markdown), "price" (string like "$500"), "tags" (array of exactly 4 string keywords). Do not include markdown codeblocks or any additional text.`;
      
      const result = await model.generateContent(command);
      let text = result.response.text().trim();
      
      if (text.startsWith("\`\`\`json")) {
         text = text.substring(7, text.length - 3).trim();
      }

      const gig = JSON.parse(text);
      setGeneratedGig(gig);
      toast.success("Gig generated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate gig. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl rounded-2xl border border-border bg-card shadow-elevated overflow-hidden"
      >
        <div className="flex items-center justify-between border-b border-border p-4 bg-muted/50">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
              <Wand2 className="h-4 w-4 text-primary-foreground" />
            </div>
            <h2 className="text-lg font-semibold">AI Gig Generator</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 space-y-4">
          {!generatedGig ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Describe your service in a few words, and AI will craft a professional gig title, description, and pricing for you.</p>
              <Textarea 
                placeholder="e.g. I want to build modern landing pages using React and Tailwind..."
                className="min-h-32 text-lg rounded-xl"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <Button 
                variant="hero" 
                size="lg" 
                className="w-full gap-2 rounded-xl h-12"
                onClick={handleGenerate}
                disabled={isGenerating || !prompt}
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="h-5 w-5 animate-pulse" />
                    Generating Magic...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-5 w-5" />
                    Generate My Gig
                  </>
                )}
              </Button>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
               <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Generated Title</h3>
                  <div className="p-3 bg-muted rounded-xl text-foreground font-semibold">{generatedGig.title}</div>
               </div>
               <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Generated Description</h3>
                  <div className="p-4 bg-muted rounded-xl text-foreground text-sm max-h-60 overflow-y-auto" dangerouslySetInnerHTML={{ __html: generatedGig.description.replace(/\n/g, '<br/>') }} />
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Price</h3>
                    <div className="p-3 bg-muted rounded-xl text-success font-semibold">{generatedGig.price}</div>
                 </div>
                 <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Tags</h3>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {generatedGig.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-full">{tag}</span>
                      ))}
                    </div>
                 </div>
               </div>
               
               <div className="flex gap-3 pt-4 border-t border-border">
                  <Button variant="outline" className="flex-1" onClick={() => setGeneratedGig(null)}>Try Again</Button>
                  <Button variant="hero" className="flex-1 gap-2" onClick={() => onApply(generatedGig)}>
                    <Sparkles className="h-4 w-4" /> Apply to Profile
                  </Button>
               </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
