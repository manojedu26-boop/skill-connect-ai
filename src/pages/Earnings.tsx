import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight, Briefcase, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const earningsData = [
  { id: 1, project: "E-commerce Platform Architecture", date: "2026-03-10", amount: 1200, status: "paid" },
  { id: 2, project: "AI Chatbot Integration", date: "2026-03-12", amount: 850, status: "pending" },
  { id: 3, project: "Mobile App Performance Audit", date: "2026-03-14", amount: 2150, status: "paid" },
];

const Earnings = () => {
  const navigate = useNavigate();
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-black text-navy">Earnings Analytics</h1>
          <p className="text-muted-foreground font-medium">Detailed breakdown of your professional capital growth.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bento-card bg-teal/5 border-teal/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[10px] font-black uppercase tracking-widest text-teal">Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-black text-navy">$12,450</div>
                  <p className="text-xs font-bold text-teal mt-1 flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3" /> +24% vs last period
                  </p>
                </CardContent>
              </Card>
              <Card className="bento-card border-slate-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Pending Payouts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-black text-navy">$3,200</div>
                  <p className="text-xs font-bold text-orange mt-1">Escrowed: 4 Projects</p>
                </CardContent>
              </Card>
              <Card className="bento-card border-slate-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Monthly Avg</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-black text-navy">$4,150</div>
                  <div className="flex gap-1 mt-2">
                    {[40, 70, 45, 90, 65].map((h, i) => (
                      <div key={i} className="w-full bg-slate-100 rounded-t-sm relative h-4 overflow-hidden">
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          className="absolute bottom-0 w-full bg-teal/40"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bento-card bg-white border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                <h3 className="font-black text-navy uppercase tracking-widest text-sm">Transaction Ledger</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <th className="px-6 py-4">Project Mission</th>
                      <th className="px-6 py-4">Execution Date</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {[
                      { id: 1, project: "E-commerce Platform Architecture", date: "2026-03-10", amount: 4200, status: "paid" },
                      { id: 2, project: "AI Chatbot Integration", date: "2026-03-12", amount: 1850, status: "pending" },
                      { id: 3, project: "Mobile App Performance Audit", date: "2026-03-14", amount: 2150, status: "paid" },
                      { id: 4, project: "Cloud Security Optimization", date: "2026-03-15", amount: 3200, status: "pending" },
                      { id: 5, project: "Global Content Strategy", date: "2026-03-15", amount: 1050, status: "paid" },
                    ].map((tx) => (
                      <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-bold text-navy truncate max-w-[240px]">{tx.project}</td>
                        <td className="px-6 py-4 text-sm font-medium text-slate-500">{tx.date}</td>
                        <td className="px-6 py-4 font-black text-navy">${tx.amount.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${tx.status === 'paid' ? 'bg-success/10 text-success' : 'bg-orange/10 text-orange'}`}>
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="bento-card border-slate-100 bg-white p-6">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-sm font-black text-navy uppercase tracking-widest">Revenue by Category</CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-6">
                {[
                  { label: "Systems Architecture", value: 45, color: "bg-teal" },
                  { label: "AI Integration", value: 30, color: "bg-navy" },
                  { label: "Security Audits", value: 15, color: "bg-orange" },
                  { label: "Consulting", value: 10, color: "bg-slate-400" },
                ].map((item) => (
                  <div key={item.label} className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-navy">
                      <span>{item.label}</span>
                      <span>{item.value}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${item.value}%` }}
                        className={`h-full ${item.color}`}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="bento-card border-dashed border-slate-200 p-6 bg-slate-50/50">
               <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Payout Optimization</h3>
               <p className="text-xs text-slate-500 leading-relaxed font-medium mb-4">
                 You could increase Q2 revenue by <span className="text-teal font-bold">12%</span> by switching to bi-weekly billing for your "AI Chatbot" mission.
               </p>
               <Button 
                 className="w-full h-10 rounded-2xl bg-teal text-white font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-soft gap-2"
                 onClick={() => { 
                   toast.success("Optimization Applied!", { description: "Bi-weekly billing activated for AI Chatbot. Revenue +12% projected." });
                   setTimeout(() => navigate("/ai-assistant"), 1500);
                 }}
               >
                 <Zap className="h-3 w-3" /> Apply Optimization
               </Button>
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Earnings;
