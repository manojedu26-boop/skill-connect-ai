import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CreditCard, Smartphone, CheckCircle2, ChevronRight, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface PremiumPaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PremiumPaymentModal({ open, onOpenChange }: PremiumPaymentModalProps) {
  const [step, setStep] = useState<"plans" | "checkout">("plans");
  const [selectedPlan, setSelectedPlan] = useState<"pro" | "elite">("pro");
  const [method, setMethod] = useState<"upi" | "card">("upi");
  const [loading, setLoading] = useState(false);

  // Listen for the custom event to set the initial plan
  useEffect(() => {
    const handleOpen = (e: any) => {
      if (e.detail?.plan) {
        setSelectedPlan(e.detail.plan);
      }
    };
    window.addEventListener("open_premium_modal", handleOpen as EventListener);
    return () => window.removeEventListener("open_premium_modal", handleOpen as EventListener);
  }, []);

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(`${selectedPlan === 'elite' ? 'Elite' : 'Pro'} status activated! Welcome to the top 1%.`);
      onOpenChange(false);
      setStep("plans");
    }, 2000);
  };

  const plans = [
    {
      id: "pro",
      name: "Vistaar Pro",
      price: "$19",
      features: ["Advanced AI Matching", "Priority Proposals", "2.5x Visibility", "Pro Badge"],
      color: "bg-teal",
      glow: "teal-glow"
    },
    {
      id: "elite",
      name: "Vistaar Elite",
      price: "$49",
      features: ["Neural Match Priority", "Dedicated Success Manager", "Unlimited AI Sourcing", "Global Rank Highlight"],
      color: "bg-orange",
      glow: "orange-glow"
    }
  ];

  return (
    <Dialog open={open} onOpenChange={(val) => { onOpenChange(val); if(!val) setStep("plans"); }}>
      <DialogContent className="sm:max-w-xl rounded-[3rem] border-none bg-white/95 backdrop-blur-3xl p-0 overflow-hidden shadow-premium">
        <AnimatePresence mode="wait">
          {step === "plans" ? (
            <motion.div 
              key="plans"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="p-10 space-y-10"
            >
              <div className="text-center space-y-2">
                 <h2 className="text-4xl font-black text-navy tracking-tighter">Ascend to <span className={selectedPlan === 'pro' ? 'text-teal' : 'text-orange'}>{selectedPlan === 'pro' ? 'Pro' : 'Elite'}</span></h2>
                 <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em]">Choose your architectural advantage</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                 {plans.map((plan) => (
                   <div 
                     key={plan.id}
                     onClick={() => setSelectedPlan(plan.id as any)}
                     className={`relative p-8 rounded-[2.5rem] border-2 transition-all cursor-pointer group ${selectedPlan === plan.id ? `border-${plan.id === 'pro' ? 'teal' : 'orange'} bg-slate-50` : 'border-slate-100 hover:border-slate-200 bg-white'}`}
                   >
                      {selectedPlan === plan.id && (
                        <motion.div layoutId="selection" className={`absolute -top-3 -right-3 h-8 w-8 ${plan.color} rounded-full flex items-center justify-center border-4 border-white shadow-lg`}>
                           <CheckCircle2 className="h-4 w-4 text-white" />
                        </motion.div>
                      )}
                      <div className="space-y-4">
                         <div className={`h-12 w-12 rounded-2xl ${plan.color} flex items-center justify-center shadow-lg transition-transform group-hover:scale-110`}>
                            <Zap className="h-6 w-6 text-white fill-white" />
                         </div>
                         <div>
                            <p className="text-xl font-black text-navy leading-none">{plan.name}</p>
                            <p className="mt-2 text-2xl font-black text-navy">{plan.price}<span className="text-sm text-slate-400 font-bold">/mo</span></p>
                         </div>
                         <ul className="space-y-3 pt-4">
                            {plan.features.map(f => (
                              <li key={f} className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                <div className={`h-1.5 w-1.5 rounded-full ${plan.color}`} /> {f}
                              </li>
                            ))}
                         </ul>
                      </div>
                   </div>
                 ))}
              </div>

              <Button 
                onClick={() => setStep("checkout")}
                className="w-full h-16 rounded-[2rem] bg-navy text-white font-black text-lg shadow-premium hover:bg-teal hover:scale-[1.02] transition-all"
              >
                 GO TO CHECKOUT
              </Button>
            </motion.div>
          ) : (
            <motion.div 
              key="checkout"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="bg-navy p-10 text-white relative">
                 <button onClick={() => setStep("plans")} className="absolute top-10 left-10 p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all">
                    <ChevronRight className="h-5 w-5 rotate-180" />
                 </button>
                 <div className="text-center space-y-2">
                    <p className="text-teal font-black text-[10px] uppercase tracking-[0.3em]">Checkout</p>
                    <h2 className="text-3xl font-black tracking-tighter">Finalizing Neural Bond</h2>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Plan: {selectedPlan.toUpperCase()}</p>
                 </div>
              </div>

              <div className="p-10 space-y-8">
                 <div className="flex gap-4 p-1 bg-slate-50 rounded-2xl border border-slate-100">
                    <button 
                      onClick={() => setMethod("upi")}
                      className={`flex-1 py-4 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${method === 'upi' ? 'bg-white shadow-soft text-navy' : 'text-slate-400'}`}
                    >
                       <Smartphone className="h-4 w-4" /> UPI Apps
                    </button>
                    <button 
                      onClick={() => setMethod("card")}
                      className={`flex-1 py-4 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${method === 'card' ? 'bg-white shadow-soft text-navy' : 'text-slate-400'}`}
                    >
                       <CreditCard className="h-4 w-4" /> Credit Card
                    </button>
                 </div>

                 <div className="min-h-[220px]">
                    <AnimatePresence mode="wait">
                       {method === 'upi' ? (
                         <motion.div key="upi" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                            <div className="grid grid-cols-3 gap-4">
                               {['GPay', 'PhonePe', 'Paytm'].map((app) => (
                                 <div key={app} className="flex flex-col items-center gap-2 group cursor-pointer active:scale-95">
                                    <div className="h-16 w-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-soft group-hover:border-teal transition-all">
                                       <span className="text-[10px] font-black text-navy">{app}</span>
                                    </div>
                                 </div>
                               ))}
                            </div>
                            <div className="space-y-3">
                               <Label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest">Enter UPI ID</Label>
                               <Input placeholder="username@okaxis" className="h-16 rounded-[1.5rem] bg-slate-50 border-none px-8 font-black text-navy" />
                            </div>
                         </motion.div>
                       ) : (
                         <motion.div key="card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                            <div className="space-y-3">
                               <Label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest">Card Nomenclature</Label>
                               <Input placeholder="0000 0000 0000 0000" className="h-16 rounded-[1.5rem] bg-slate-50 border-none px-8 font-black text-navy" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <Input placeholder="MM/YY" className="h-16 rounded-[1.5rem] bg-slate-50 border-none px-8 font-black text-navy" />
                              <Input placeholder="CVV" type="password" className="h-16 rounded-[1.5rem] bg-slate-50 border-none px-8 font-black text-navy" />
                            </div>
                         </motion.div>
                       )}
                    </AnimatePresence>
                 </div>

                 <Button 
                   onClick={handlePayment}
                   disabled={loading}
                   className="w-full h-16 rounded-[2rem] bg-navy text-white font-black shadow-premium hover:bg-teal transition-all flex items-center justify-center gap-3 group"
                 >
                    {loading ? (
                      <div className="h-6 w-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Authorize ${selectedPlan === 'pro' ? '19' : '49'} Payment <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                 </Button>

                 <div className="flex items-center justify-center gap-3 text-slate-400">
                    <CheckCircle2 className="h-4 w-4 text-teal" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Neural Encryption Active</span>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
