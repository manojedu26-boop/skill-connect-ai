import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem("vistaar_user");
    if (!userStr) {
      navigate("/", { replace: true });
      return;
    }
    
    try {
      const user = JSON.parse(userStr);
      if (user.role === "client") {
        navigate("/client-dashboard", { replace: true });
      } else {
        navigate("/freelancer-dashboard", { replace: true });
      }
    } catch {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return <div className="flex h-screen items-center justify-center bg-background"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" /></div>;
}
