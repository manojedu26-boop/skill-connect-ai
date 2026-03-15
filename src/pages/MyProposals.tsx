import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { FileText, Clock, CheckCircle2, XCircle } from "lucide-react";

export default function MyProposals() {
  const [proposals, setProposals] = useState<any[]>([]);

  useEffect(() => {
    const defaultProposals = [
      { id: '1', projectTitle: 'E-commerce Platform Architecture', client: 'TechCorp', status: 'accepted', bidAmount: 1200, duration: '2 weeks', date: '2026-03-10', coverLetter: 'I can build a scalable Next.js architecture with proper state management...' },
      { id: '2', projectTitle: 'AI Chatbot Integration', client: 'InnovateAI', status: 'submitted', bidAmount: 850, duration: '1 week', date: '2026-03-12', coverLetter: 'Highly experienced in OpenAI and Gemini API integrations...' }
    ];
    const saved = localStorage.getItem("skillswap_proposals");
    if (!saved) {
      localStorage.setItem("skillswap_proposals", JSON.stringify(defaultProposals));
      setProposals(defaultProposals);
    } else {
      setProposals(JSON.parse(saved));
    }
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted": return <Clock className="h-4 w-4 text-warning" />;
      case "accepted": return <CheckCircle2 className="h-4 w-4 text-success" />;
      case "rejected": return <XCircle className="h-4 w-4 text-destructive" />;
      default: return <FileText className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Proposals</h1>
            <p className="text-muted-foreground">Track the status of your project applications.</p>
          </div>
          <button 
             onClick={() => (window as any).location.href = "/projects"}
             className="rounded-2xl px-6 h-11 bg-teal text-white font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-teal/20"
          >
            Submit New Bid
          </button>
        </div>

        <div className="grid gap-4">
          {proposals.length > 0 ? (
            proposals.map((p) => (
              <Card key={p.id} className="overflow-hidden border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                           <h3 className="font-semibold text-lg">{p.projectTitle}</h3>
                           <Badge variant="secondary" className="capitalize flex items-center gap-1.5">
                             {getStatusIcon(p.status)}
                             {p.status}
                           </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Client: {p.client} • Submitted on {p.date}</p>
                      </div>
                      <div className="flex items-center gap-6">
                         <div className="text-right">
                           <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Your Bid</p>
                           <p className="text-lg font-bold text-primary">${p.bidAmount}</p>
                         </div>
                         <div className="text-right">
                           <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Duration</p>
                           <p className="text-lg font-bold">{p.duration}</p>
                         </div>
                      </div>
                   </div>
                   <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-sm font-medium mb-2">Cover Letter Snippet:</p>
                      <p className="text-sm text-muted-foreground italic line-clamp-2">"{p.coverLetter}"</p>
                   </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="py-20 text-center border-2 border-dashed border-border rounded-3xl">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
              <p className="text-lg font-medium text-muted-foreground">No proposals submitted yet</p>
              <p className="text-sm text-muted-foreground mt-1">Start applying to projects to see them here!</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
