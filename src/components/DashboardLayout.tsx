import { ReactNode, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  FolderOpen,
  MessageSquare,
  Bookmark,
  Sparkles,
  Settings,
  LogOut,
  Search,
  Bell,
  Mic,
  CreditCard,
  Briefcase,
  TrendingUp,
  Zap,
  CheckCircle2,
  Clock,
  AlertCircle
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import PremiumPaymentModal from "./PremiumPaymentModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockFreelancers, mockProjects } from "@/data/mockData";

const freelancerNavItems = [
  { title: "Dashboard", url: "/freelancer-dashboard", icon: LayoutDashboard },
  { title: "Find Projects", url: "/projects", icon: FolderOpen },
  { title: "My Proposals", url: "/my-proposals", icon: Bookmark },
  { title: "My Portfolio", url: "/my-portfolio", icon: Users },
  { title: "Messages", url: "/messages", icon: MessageSquare },
  { title: "Earnings", url: "/earnings", icon: TrendingUp },
  { title: "AI Assistant", url: "/ai-assistant", icon: Sparkles },
  { title: "Pricing & Premium", url: "/pricing", icon: CreditCard },
  { title: "Settings", url: "/settings", icon: Settings },
];

const clientNavItems = [
  { title: "Dashboard", url: "/client-dashboard", icon: LayoutDashboard },
  { title: "Find Freelancers", url: "/freelancers", icon: Users },
  { title: "Post Project", url: "/projects", icon: FolderOpen },
  { title: "Messages", url: "/messages", icon: MessageSquare },
  { title: "AI Assistant", url: "/ai-assistant", icon: Sparkles },
  { title: "Pricing & Premium", url: "/pricing", icon: CreditCard },
  { title: "Settings", url: "/settings", icon: Settings },
];

function AppSidebar({ onUpgrade }: { onUpgrade: () => void }) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const navigate = useNavigate();
  const [role, setRole] = useState<"client" | "freelancer" | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem("skillswap_user");
    if (userStr) setRole(JSON.parse(userStr).role);

    const handleUpdate = () => {
      const updatedStr = localStorage.getItem("skillswap_user");
      if (updatedStr) setRole(JSON.parse(updatedStr).role);
    };
    window.addEventListener("user_updated", handleUpdate);
    return () => window.removeEventListener("user_updated", handleUpdate);
  }, []);

  const currentNavItems = role === "client" ? clientNavItems : freelancerNavItems;

  return (
    <Sidebar collapsible="icon" className="border-none bg-[#0B1221] text-white h-screen sticky top-0 shrink-0">
      <SidebarContent className="flex flex-col justify-between py-8 px-2">
        <div>
          <div className="mb-10 px-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B1221] border border-white/10 shadow-lg">
              <Sparkles className="h-6 w-6 text-white" strokeWidth={2.5} />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white leading-none">SKILL<span className="text-teal-400">SWAP</span></span>
                <span className="text-[9px] font-bold tracking-[0.2em] text-slate-400 uppercase">Global Network</span>
              </div>
            )}
          </div>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="gap-2">
                {currentNavItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        onClick={(e) => {
                          if (item.title === "Pricing & Premium") {
                            e.preventDefault();
                            onUpgrade();
                          }
                        }}
                        className={({ isActive }) =>
                          `flex items-center gap-4 rounded-2xl px-4 py-3 text-sm font-bold transition-all duration-300 ${isActive && item.title !== "Pricing & Premium"
                            ? "bg-teal-gradient text-white shadow-lg shadow-teal/20 scale-105"
                            : "text-slate-400 hover:text-white hover:bg-white/5"
                          }`
                        }
                      >
                        <item.icon className={`h-5 w-5 shrink-0 ${collapsed ? 'mx-auto' : ''}`} />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        <div className="px-4 space-y-4">
          {!collapsed && (
            <div className="p-4 rounded-3xl bg-white/5 border border-white/10 space-y-3">
               <p className="text-[10px] uppercase tracking-widest font-black text-teal">Premium Status</p>
               <p className="text-xs font-medium text-slate-300">Upgrade to Pro for 3x more visibility.</p>
               <Button 
                 onClick={onUpgrade}
                 variant="hero" 
                 className="w-full h-8 text-[10px] font-black rounded-xl bg-orange"
               >
                 UPGRADE NOW
               </Button>
            </div>
          )}
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <button
                  onClick={() => {
                    localStorage.removeItem("skillswap_user");
                    navigate("/");
                  }}
                  className="flex items-center gap-4 rounded-2xl px-4 py-3 text-sm font-bold text-slate-400 hover:text-white hover:bg-white/5 transition-all w-full"
                >
                  <LogOut className={`h-5 w-5 shrink-0 ${collapsed ? 'mx-auto' : ''}`} />
                  {!collapsed && <span>Logout</span>}
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);

  useEffect(() => {
    const loadUser = () => {
      const userStr = localStorage.getItem("skillswap_user");
      setUser(userStr ? JSON.parse(userStr) : null);
    };
    loadUser();
    
    const handleOpenModal = (e: any) => {
      setIsPremiumModalOpen(true);
    };
    window.addEventListener("user_updated", loadUser);
    window.addEventListener("open_premium_modal", handleOpenModal);
    
    return () => {
      window.removeEventListener("user_updated", loadUser);
      window.removeEventListener("open_premium_modal", handleOpenModal);
    };
  }, []);

  const initials = user ? `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase() : "JR";
  const role = user?.role || null;

  const handleVoiceSearch = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice search is not supported in your browser.");
      return;
    }
    const SpeechRecognition = (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (e: any) => {
      setSearchQuery(e.results[0][0].transcript);
      setShowResults(true);
    };
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  const filteredResults = [...mockFreelancers, ...mockProjects].filter((item) => {
    const title = (item as any).name || (item as any).title;
    return title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background network-pattern">
        <PremiumPaymentModal open={isPremiumModalOpen} onOpenChange={setIsPremiumModalOpen} />
        <div className="interlocking-nav z-40 bg-[#0B1221] text-white">
          <AppSidebar onUpgrade={() => window.dispatchEvent(new CustomEvent("open_premium_modal", { detail: { plan: 'pro' } }))} />
        </div>
        
        <div className="flex flex-1 flex-col h-screen overflow-hidden relative">
          <header className="sticky top-0 z-30 flex h-20 items-center justify-between px-8 border-b border-slate-200 bg-white">
            <div className="flex items-center gap-6">
              <div className="md:hidden">
                 <SidebarTrigger />
              </div>
              <div className="relative hidden md:block group">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-navy" />
                <Input
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setShowResults(true); }}
                  onFocus={() => setShowResults(true)}
                  onBlur={() => setTimeout(() => setShowResults(false), 200)}
                  placeholder={role === "client" ? "Search elite talent..." : "Search premium projects..."}
                  className="w-[28rem] xl:w-[36rem] rounded-2xl bg-muted/30 border-none py-6 pl-12 pr-12 shadow-soft focus-visible:ring-teal/20 transition-all"
                />
                <button
                  onClick={handleVoiceSearch}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 ${isListening ? "text-orange animate-pulse" : "text-muted-foreground"}`}
                >
                  <Mic className="h-5 w-5 hover:text-navy transition-colors" />
                </button>

                {showResults && searchQuery.trim() && (
                  <div className="absolute top-16 left-0 w-full max-h-[24rem] overflow-y-auto rounded-3xl border border-white bg-white/90 backdrop-blur-2xl shadow-premium z-50 p-4 space-y-2">
                    {filteredResults.length > 0 ? (
                      filteredResults.map((result: any) => (
                        <div key={result.id} className="p-3 hover:bg-[#F5F7FA] rounded-2xl cursor-pointer transition-colors" onClick={() => navigate((result as any).name ? `/freelancers/${result.id}` : `/projects`)}>
                          <div className="font-bold text-navy">{(result as any).name || (result as any).title}</div>
                          <div className="text-sm text-muted-foreground">{(result as any).role || (result as any).client}</div>
                        </div>
                      ))
                    ) : (
                      <div className="p-6 text-sm text-muted-foreground text-center">No results found for "{searchQuery}"</div>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              {role && (
                <div className={`hidden sm:flex items-center px-4 py-2 rounded-2xl text-xs font-bold border transition-all ${role === 'client' ? 'bg-[#00D1FF]/10 text-[#00D1FF] border-[#00D1FF]/20' : 'bg-[#FF9900]/10 text-[#FF9900] border-[#FF9900]/20'}`}>
                   {role === 'client' ? 'Client' : 'Freelancer'}
                </div>
              )}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative group bg-slate-50 rounded-2xl h-11 w-11 shadow-soft hover:bg-slate-100 transition-all">
                    <Bell className="h-5 w-5 text-slate-900 group-hover:text-teal transition-colors" />
                    <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-orange border-2 border-white ring-4 orange-glow" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0 overflow-hidden rounded-[2rem] border-none shadow-premium bg-white/95 backdrop-blur-xl" align="end">
                  <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-black text-navy uppercase tracking-widest">Architectural Alerts</h3>
                      <span className="text-[10px] font-bold text-teal bg-teal/5 px-2 py-0.5 rounded-full">3 New</span>
                    </div>
                  </div>
                  <div className="max-h-[24rem] overflow-y-auto">
                    {/* Notifications list items with clicks */}
                    {[
                      { icon: CheckCircle2, title: "Proposal Accepted", time: "2m ago", text: "TechCorp approved your E-commerce pitch.", color: "text-success", bg: "bg-success/5" },
                      { icon: Clock, title: "Interview Scheduled", time: "1h ago", text: "Zoom call with Sarah Chen at 3 PM PST.", color: "text-blue-500", bg: "bg-blue-500/5" },
                      { icon: AlertCircle, title: "Token Exiring", time: "5h ago", text: "Your premium access ends in 48 hours.", color: "text-orange", bg: "bg-orange/5" }
                    ].map((n, i) => (
                      <div 
                        key={i} 
                        onClick={() => navigate("/messages")}
                        className="p-4 flex gap-4 hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-50 last:border-0"
                      >
                        <div className={`h-10 w-10 rounded-xl shrink-0 flex items-center justify-center ${n.bg}`}>
                          <n.icon className={`h-5 w-5 ${n.color}`} />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <p className="text-xs font-black text-navy">{n.title}</p>
                            <span className="text-[9px] font-bold text-slate-400">{n.time}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{n.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="ghost" className="w-full h-12 rounded-none text-xs font-black text-teal hover:bg-teal/5 border-t border-slate-100">
                    VIEW ALL SYSTEM LOGS
                  </Button>
                </PopoverContent>
              </Popover>
              <div 
                onClick={() => navigate("/settings")}
                className="flex items-center gap-3 bg-slate-50 p-1 pr-4 rounded-[2rem] shadow-soft border border-slate-200 cursor-pointer hover:border-teal/30 hover:shadow-soft-lg transition-all active:scale-95"
              >
                 <Avatar className="h-10 w-10 border-2 border-teal/10">
                   {user?.photo ? (
                     <img src={user.photo} alt="Profile" className="h-full w-full object-cover rounded-full" />
                   ) : (
                     <AvatarFallback className="bg-navy text-white text-sm font-bold">
                       {initials}
                     </AvatarFallback>
                   )}
                 </Avatar>
                 <div className="hidden lg:block text-left">
                    <p className="text-sm font-black text-navy leading-none">{user?.firstName || 'User'}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mt-1">Status: Active</p>
                 </div>
              </div>
            </div>
          </header>
          
          <main className="flex-1 overflow-y-auto p-8 lg:p-10">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
