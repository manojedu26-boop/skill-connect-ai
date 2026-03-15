import { ReactNode, useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
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
  Bell,
  TrendingUp,
  User,
  Menu
} from "lucide-react";
import LoadingScreen from "./LoadingScreen";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Aura from "./Aura";

const freelancerNavItems = [
  { title: "Dashboard", url: "/freelancer-dashboard", icon: LayoutDashboard },
  { title: "Find Projects", url: "/projects", icon: FolderOpen },
  { title: "My Proposals", url: "/my-proposals", icon: Bookmark },
  { title: "My Portfolio", url: "/my-portfolio", icon: Users },
  { title: "Messages", url: "/messages", icon: MessageSquare },
  { title: "Earnings", url: "/freelancer-dashboard", icon: TrendingUp },
];

const clientNavItems = [
  { title: "Dashboard", url: "/client-dashboard", icon: LayoutDashboard },
  { title: "Find Freelancers", url: "/freelancers", icon: Users },
  { title: "Post Project", url: "/projects", icon: FolderOpen },
  { title: "Messages", url: "/messages", icon: MessageSquare },
];

function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState<"client" | "freelancer">("freelancer");

  useEffect(() => {
    const userStr = localStorage.getItem("skillswap_user");
    if (userStr) setRole(JSON.parse(userStr).role);
  }, []);

  const currentNavItems = role === "client" ? clientNavItems : freelancerNavItems;

  return (
    <Sidebar collapsible="icon" className="border-none bg-[#070b14] text-white h-screen sticky top-0">
      <SidebarContent className="flex flex-col justify-between py-8 px-2">
        <div>
          <div className="mb-10 px-6 flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-emerald-glow flex items-center justify-center shadow-lg shadow-emerald-glow/20">
               <Sparkles className="h-6 w-6 text-deep-space" />
            </div>
            {!collapsed && (
              <h1 className="text-2xl font-black tracking-tighter text-white">SkillSwap</h1>
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
                        className={({ isActive }) =>
                          `flex items-center gap-4 rounded-xl px-4 py-3 text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${isActive
                            ? "bg-white/5 text-emerald-glow depth-shadow"
                            : "text-white/20 hover:text-white hover:bg-white/[0.02]"
                          }`
                        }
                      >
                        <item.icon className="h-5 w-5 shrink-0" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        <div className="px-4 space-y-3">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <button
                  onClick={() => navigate("/profile")}
                  className="flex items-center gap-4 rounded-xl px-4 py-3 text-[11px] font-black uppercase tracking-widest text-white/20 hover:text-white hover:bg-white/[0.02] transition-all w-full"
                >
                  <User className="h-5 w-5 shrink-0" />
                  {!collapsed && <span>Neural Profile</span>}
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <button
                  onClick={() => {
                    localStorage.removeItem("skillswap_user");
                    navigate("/");
                  }}
                  className="flex items-center gap-4 rounded-xl px-4 py-3 text-[11px] font-black uppercase tracking-widest text-white/20 hover:text-red-500 hover:bg-red-500/5 transition-all w-full"
                >
                  <LogOut className="h-5 w-5 shrink-0" />
                  {!collapsed && <span>Terminate</span>}
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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hasSeenLoader = sessionStorage.getItem("hasSeenAppLoader");
    if (!hasSeenLoader) {
      setIsLoading(true);
      sessionStorage.setItem("hasSeenAppLoader", "true");
    }
  }, []);

  return (
    <SidebarProvider>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div className="flex min-h-screen w-full bg-[#030712] text-white font-sans">
        <AppSidebar />
        
        <div className="flex flex-1 flex-col relative overflow-hidden">
          <div className="fixed top-0 left-0 w-full h-[2px] z-[100] overflow-hidden pointer-events-none">
             <div className="progress-rail h-full w-full" />
          </div>

          <header className="sticky top-0 z-40 bg-[#030712]/60 backdrop-blur-xl border-b border-white/5 px-8 h-24 flex items-center justify-between">
             <div className="flex items-center gap-6">
               <div className="lg:hidden">
                  <SidebarTrigger />
               </div>
               <div className="hidden lg:flex flex-col">
                  <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Node Connection</p>
                  <p className="text-sm font-black text-emerald-glow uppercase">Established</p>
               </div>
             </div>

             <div className="flex items-center gap-8">
               <div className="hidden md:flex items-center gap-10">
                  <div className="text-right">
                     <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Latency</p>
                     <p className="text-xs font-black text-white">12ms</p>
                  </div>
                  <div className="text-right">
                     <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Neural Load</p>
                     <p className="text-xs font-black text-white">4.2%</p>
                  </div>
               </div>
               <Button
                 variant="ghost"
                 size="icon"
                 className="relative text-white hover:bg-white/5 h-12 w-12 rounded-2xl transition-all"
                 onClick={() => navigate("/notifications")}
               >
                 <Bell className="h-6 w-6" />
                 <span className="absolute top-3 right-3 h-2 w-2 bg-emerald-glow rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
               </Button>
               <div 
                 onClick={() => navigate("/settings")}
                 className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-glow/20 to-sapphire-glow/20 border border-white/10 flex items-center justify-center font-black text-xs text-white depth-shadow cursor-pointer hover:border-emerald-glow/40 transition-all active:scale-95"
               >
                  MJ
               </div>
             </div>
          </header>
          
          <main className="flex-1 p-8 lg:p-12 max-w-7xl mx-auto w-full pb-40">
             {children}
          </main>
          
          <Aura />
        </div>
      </div>
    </SidebarProvider>
  );
}
