import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "./components/SplashScreen";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardRedirect from "./components/DashboardRedirect";
import ClientDashboard from "./pages/ClientDashboard";
import FreelancerDashboard from "./pages/FreelancerDashboard";
import Freelancers from "./pages/Freelancers";
import FreelancerProfile from "./pages/FreelancerProfile";
import Projects from "./pages/Projects";
import Messages from "./pages/Messages";
import Bookmarks from "./pages/Bookmarks";
import AIAssistant from "./pages/AIAssistant";
import SettingsPage from "./pages/Settings";
import Pricing from "./pages/Pricing";
import Portfolio from "./pages/Portfolio";
import MyProposals from "./pages/MyProposals";
import Earnings from "./pages/Earnings";
import MarketStatus from "./pages/MarketStatus";
import NotFound from "./pages/NotFound";
import InteractiveBackground from "./components/InteractiveBackground";
import FloatingBot from "./components/FloatingBot";
import RoleProtectedRoute from "./components/RoleProtectedRoute";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AnimatePresence mode="wait">
          {showSplash ? (
            <SplashScreen key="splash" onComplete={() => setShowSplash(false)} />
          ) : (
            <>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <InteractiveBackground />
                <FloatingBot />
                <Routes>
                  <Route path="/" element={<Onboarding />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  
                  {/* Default Routing Strategy */}
                  <Route path="/dashboard" element={<DashboardRedirect />} />

                  {/* Freelancer Restricted Routes */}
                  <Route element={<RoleProtectedRoute allowedRoles={["freelancer"]} />}>
                    <Route path="/freelancer-dashboard" element={<FreelancerDashboard />} />
                    <Route path="/my-proposals" element={<MyProposals />} />
                    <Route path="/my-portfolio" element={<Portfolio />} />
                  </Route>

                  {/* Client Restricted Routes */}
                  <Route element={<RoleProtectedRoute allowedRoles={["client"]} />}>
                    <Route path="/client-dashboard" element={<ClientDashboard />} />
                    <Route path="/freelancers" element={<Freelancers />} />
                    <Route path="/freelancers/:id" element={<FreelancerProfile />} />
                  </Route>

                  {/* Shared Authenticated Routes */}
                  <Route element={<RoleProtectedRoute />}>
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/bookmarks" element={<Bookmarks />} />
                    <Route path="/ai-assistant" element={<AIAssistant />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/pricing" element={<Pricing />} />
                  </Route>
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </>
          )}
        </AnimatePresence>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
