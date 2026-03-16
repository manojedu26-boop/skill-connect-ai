import { useState, useEffect, Suspense, lazy } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SplashScreen from "./components/SplashScreen";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InteractiveBackground from "./components/InteractiveBackground";
import FloatingBot from "./components/FloatingBot";
import RoleProtectedRoute from "./components/RoleProtectedRoute";

// Lazy load ALL pages for massive code-splitting wins
const Onboarding = lazy(() => import("./pages/Onboarding"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const DomainSelection = lazy(() => import("./pages/DomainSelection"));
const DashboardRedirect = lazy(() => import("./components/DashboardRedirect"));
const ClientDashboard = lazy(() => import("./pages/ClientDashboard"));
const FreelancerDashboard = lazy(() => import("./pages/FreelancerDashboard"));
const Freelancers = lazy(() => import("./pages/Freelancers"));
const FreelancerProfile = lazy(() => import("./pages/FreelancerProfile"));
const Projects = lazy(() => import("./pages/Projects"));
const Messages = lazy(() => import("./pages/Messages"));
const Bookmarks = lazy(() => import("./pages/Bookmarks"));
const AIAssistant = lazy(() => import("./pages/AIAssistant"));
const SettingsPage = lazy(() => import("./pages/Settings"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const MyProposals = lazy(() => import("./pages/MyProposals"));
const Earnings = lazy(() => import("./pages/Earnings"));
const MarketStatus = lazy(() => import("./pages/MarketStatus"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Smart page loader - premium inline spinner
const PageLoader = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 flex items-center justify-center bg-background z-50"
  >
    <div className="space-y-4 text-center">
      <div className="relative h-12 w-12 mx-auto">
        <div className="absolute inset-0 rounded-full border-2 border-teal/20" />
        <div className="absolute inset-0 rounded-full border-t-2 border-teal animate-spin" />
      </div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Loading...</p>
    </div>
  </motion.div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 min cache
      retry: 1,
    },
  },
});

const App = () => {
  const [showSplash, setShowSplash] = useState(false);

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
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<Onboarding />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/select-domain" element={<DomainSelection />} />
                    
                    {/* Google OAuth Callback */}
                    <Route path="/auth/callback" element={<GoogleAuthCallback />} />

                    {/* Default Routing Strategy */}
                    <Route path="/dashboard" element={<DashboardRedirect />} />

                    {/* Freelancer Restricted Routes */}
                    <Route element={<RoleProtectedRoute allowedRoles={["freelancer"]} />}>
                      <Route path="/freelancer-dashboard" element={<FreelancerDashboard />} />
                      <Route path="/my-proposals" element={<MyProposals />} />
                      <Route path="/my-portfolio" element={<Portfolio />} />
                      <Route path="/earnings" element={<Earnings />} />
                      <Route path="/market-status" element={<MarketStatus />} />
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
                </Suspense>
              </BrowserRouter>
            </>
          )}
        </AnimatePresence>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

// Google OAuth Callback Handler (Supabase redirects here)
function GoogleAuthCallback() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { createClient } = await import("@supabase/supabase-js");
        const supabase = createClient(
          import.meta.env.VITE_SUPABASE_URL,
          import.meta.env.VITE_SUPABASE_ANON_KEY
        );

        // Handle PKCE code exchange if present in URL
        const url = new URL(window.location.href);
        const code = url.searchParams.get("code");
        if (code) {
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) throw new Error("Code exchange failed: " + exchangeError.message);
        }

        // Supabase auto-handles the OAuth code exchange from URL hash
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw new Error("Session error: " + error.message);
        if (!session) throw new Error("No session returned from Supabase. Ensure Vercel environment variables are set and Supabase redirect URLs are correct.");

        const user = session.user;
        const meta = user.user_metadata;

        // Store session locally
        const skillswapUser = {
          id: user.id,
          email: user.email,
          firstName: meta?.full_name?.split(" ")[0] || meta?.name?.split(" ")[0] || "User",
          lastName: meta?.full_name?.split(" ")[1] || "",
          photo: meta?.avatar_url || meta?.picture || null,
          role: "freelancer", // Default, user will select in domain selection
        };
        localStorage.setItem("skillswap_token", session.access_token);
        localStorage.setItem("skillswap_user", JSON.stringify(skillswapUser));
        window.dispatchEvent(new Event("user_updated"));
        
        setStatus("success");
        setTimeout(() => {
          window.location.href = "/select-domain";
        }, 1000);
      } catch (err: any) {
        console.error("Auth Callback Error:", err);
        setErrorMessage(err.message || String(err));
        setStatus("error");
        setTimeout(() => { window.location.href = "/login"; }, 4000);
      }
    };
    handleCallback();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        {status === "loading" && (
          <>
            <div className="relative h-16 w-16 mx-auto">
              <div className="absolute inset-0 rounded-full border-2 border-teal/20" />
              <div className="absolute inset-0 rounded-full border-t-2 border-teal animate-spin" />
            </div>
            <p className="text-sm font-black text-navy uppercase tracking-widest">Authenticating with Google...</p>
          </>
        )}
        {status === "success" && (
          <>
            <div className="h-16 w-16 bg-teal/10 rounded-full flex items-center justify-center mx-auto">
              <svg className="h-8 w-8 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <p className="text-sm font-black text-navy uppercase tracking-widest">Google Auth Successful!</p>
            <p className="text-xs text-slate-400">Redirecting to your dashboard...</p>
          </>
        )}
        {status === "error" && (
          <>
            <div className="h-16 w-16 bg-orange/10 rounded-full flex items-center justify-center mx-auto">
              <svg className="h-8 w-8 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </div>
            <p className="text-sm font-black text-navy uppercase tracking-widest">Authentication Failed</p>
            <p className="text-[10px] font-bold text-orange max-w-sm mx-auto bg-orange/5 p-3 rounded-lg border border-orange/20">
              Error Details: {errorMessage}
            </p>
            <p className="text-xs text-slate-400">Redirecting to login...</p>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
