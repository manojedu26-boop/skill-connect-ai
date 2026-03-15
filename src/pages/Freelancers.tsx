import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import FreelancerCard from "@/components/FreelancerCard";
import { mockFreelancers } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const allSkills = [...new Set(mockFreelancers.flatMap(f => f.skills))];

const Freelancers = () => {
  const [search, setSearch] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const filtered = mockFreelancers.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.title.toLowerCase().includes(search.toLowerCase());
    const matchesSkills = selectedSkills.length === 0 ||
      selectedSkills.some(s => f.skills.includes(s));
    return matchesSearch && matchesSkills;
  });

  return (
    <DashboardLayout>
      <div className="space-y-10 pb-20">
        {/* Sub Header */}
        <div className="bento-card bg-navy text-white overflow-hidden relative group">
           <div className="absolute top-0 right-0 w-64 h-64 bg-teal/10 rounded-full blur-[100px] -mr-32 -mt-32" />
           <div className="relative z-10 space-y-2">
              <h1 className="text-4xl font-black tracking-tighter">Elite Marketplace</h1>
              <p className="text-slate-400 text-lg max-w-xl font-medium">Browse verified talent across <span className="text-teal font-black">24+ technical domains</span>. Optimized for premium enterprise matching.</p>
           </div>
        </div>

        {/* Filter Section */}
        <div className="space-y-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="relative flex-1 group">
              <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-teal" />
              <Input
                placeholder="Search by expertise, name, or role..."
                className="h-14 rounded-2xl bg-white border-none pl-14 pr-6 shadow-soft focus-visible:ring-teal/20 transition-all font-medium"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4 bg-white px-6 h-14 rounded-2xl shadow-soft border border-slate-50">
              <Filter className="h-5 w-5 text-teal" />
              <span className="text-xs font-black text-navy uppercase tracking-widest">Advanced Filters</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 px-2">
            {allSkills.map(skill => (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  selectedSkills.includes(skill)
                    ? "bg-teal text-white shadow-lg shadow-teal/10 scale-105"
                    : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-100"
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* The Stacked List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
             <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Sorted by: <span className="text-navy">Match Score</span></p>
             <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{filtered.length} Results Found</p>
          </div>
          <div className="flex flex-col gap-4">
            {filtered.map(f => (
              <FreelancerCard
                key={f.id}
                freelancer={f}
                onView={() => navigate(`/freelancers/${f.id}`)}
              />
            ))}
          </div>
        </div>

        {filtered.length === 0 && (
          <div className="bento-card bg-white border border-slate-100 flex flex-col items-center justify-center text-center py-24">
             <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <Search className="h-10 w-10 text-slate-200" />
             </div>
             <h3 className="text-xl font-bold text-navy">No talent matched those filters</h3>
             <p className="text-slate-500 text-sm max-w-[280px] mt-2 mb-8">Try broadening your search or resetting the skill categories.</p>
             <Button onClick={() => { setSearch(""); setSelectedSkills([]); }} variant="outline" className="rounded-2xl border-slate-200 px-8 font-bold">Clear All Filters</Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Freelancers;
