import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, FolderOpen, MessageSquare, TrendingUp, ArrowRight } from "lucide-react";
import FreelancerCard from "@/components/FreelancerCard";
import ProjectCard from "@/components/ProjectCard";
import { mockFreelancers, mockProjects } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import AISmartMatch from "@/components/AISmartMatch";

const stats = [
  { label: "Active Freelancers", value: "2,847", icon: Users, change: "+12%" },
  { label: "Open Projects", value: "463", icon: FolderOpen, change: "+8%" },
  { label: "Messages", value: "28", icon: MessageSquare, change: "+3" },
  { label: "Match Rate", value: "94%", icon: TrendingUp, change: "+2%" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const userStr = localStorage.getItem("vistaar_user");
  const user = userStr ? JSON.parse(userStr) : null;
  const firstName = user?.firstName || "";

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back{firstName ? `, ${firstName}` : ""}! 👋</h1>
          <p className="text-muted-foreground">Here's what's happening on Vistaar today.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="shadow-card">
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-card-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                  <span className="ml-auto text-xs font-medium text-success">{stat.change}</span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="my-8">
          <AISmartMatch />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Top Freelancers</h2>
              <Button variant="ghost" size="sm" className="gap-1 text-primary" onClick={() => navigate("/freelancers")}>
                View all <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              {mockFreelancers.slice(0, 2).map(f => (
                <FreelancerCard key={f.id} freelancer={f} onView={() => navigate(`/freelancers/${f.id}`)} />
              ))}
            </div>
          </div>
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Latest Projects</h2>
              <Button variant="ghost" size="sm" className="gap-1 text-primary" onClick={() => navigate("/projects")}>
                View all <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              {mockProjects.slice(0, 2).map(p => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
