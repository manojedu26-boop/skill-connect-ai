import DashboardLayout from "@/components/DashboardLayout";
import FreelancerCard from "@/components/FreelancerCard";
import ProjectCard from "@/components/ProjectCard";
import { mockFreelancers, mockProjects } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

const Bookmarks = () => {
  const navigate = useNavigate();
  // Mock: show first 2 of each as "bookmarked"
  const bookmarkedFreelancers = mockFreelancers.slice(0, 3);
  const bookmarkedProjects = mockProjects.slice(0, 2);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Bookmarks</h1>
          <p className="text-muted-foreground">Your saved freelancers and projects.</p>
        </div>

        <Tabs defaultValue="freelancers">
          <TabsList className="bg-muted">
            <TabsTrigger value="freelancers">Freelancers ({bookmarkedFreelancers.length})</TabsTrigger>
            <TabsTrigger value="projects">Projects ({bookmarkedProjects.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="freelancers" className="mt-4">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {bookmarkedFreelancers.map(f => (
                <FreelancerCard key={f.id} freelancer={f} onView={() => navigate(`/freelancers/${f.id}`)} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="projects" className="mt-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {bookmarkedProjects.map(p => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Bookmarks;
