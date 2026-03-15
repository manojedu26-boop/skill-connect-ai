import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  allowedRoles?: ("client" | "freelancer")[];
}

const RoleProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userStr = localStorage.getItem("skillswap_user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setRole(user.role);
      } catch (e) {
        console.error("Failed to parse user", e);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-background"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" /></div>;
  }

  // If completely logged out, bounce to onboarding
  if (!role) {
    return <Navigate to="/" replace />;
  }

  // If trying to access a restricted route
  if (allowedRoles && !allowedRoles.includes(role as any)) {
    toast.error("You do not have permission to view that page.");
    return <Navigate to={`/${role}-dashboard`} replace />;
  }

  return <Outlet />;
};

export default RoleProtectedRoute;
