import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight, Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const earningsData = [
  { id: 1, project: "E-commerce Platform Architecture", date: "2026-03-10", amount: 1200, status: "paid" },
  { id: 2, project: "AI Chatbot Integration", date: "2026-03-12", amount: 850, status: "pending" },
  { id: 3, project: "Mobile App Performance Audit", date: "2026-03-14", amount: 2150, status: "paid" },
];

const Earnings = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-black text-navy">Earnings Analytics</h1>
          <p className="text-muted-foreground font-medium">Detailed breakdown of your professional capital growth.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bento-card bg-teal/5 border-teal/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest text-teal">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-navy">$4,200</div>
              <p className="text-xs font-bold text-teal mt-1 flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" /> +15% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="bento-card border-slate-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Pending Payouts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-navy">$850</div>
              <p className="text-xs font-bold text-orange mt-1">Expected: 2 days</p>
            </CardContent>
          </Card>
          <Card className="bento-card border-slate-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Active Contracts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-navy">02</div>
              <p className="text-xs font-bold text-slate-400 mt-1">Working on: AI Integration</p>
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
                {earningsData.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-navy truncate max-w-[240px]">{tx.project}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-500">{tx.date}</td>
                    <td className="px-6 py-4 font-black text-navy">${tx.amount}</td>
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
    </DashboardLayout>
  );
};

export default Earnings;
