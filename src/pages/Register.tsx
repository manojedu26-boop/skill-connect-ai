import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"freelancer" | "client">("freelancer");
  const [form, setForm] = useState({ email: "", firstName: "", lastName: "", password: "" });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const apiUrl = `https://skillswap-api-cj2f.onrender.com/api/auth/register`;
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");

      if (data.requireEmailConfirmation) {
        toast.success(data.message || "Please check your email to confirm your account!");
        navigate("/login");
        return;
      }

      localStorage.setItem("skillswap_token", data.token);
      localStorage.setItem("skillswap_user", JSON.stringify(data.user));
      toast.success("Registration successful!");
      window.dispatchEvent(new Event("user_updated")); 
      navigate("/select-domain");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-screen flex-col bg-background px-6 py-10"
    >
      <button onClick={() => navigate("/")} className="mb-8 self-start text-foreground">
        <ArrowLeft className="h-6 w-6" />
      </button>

      <div className="mx-auto w-full max-w-md">
        <h1 className="mb-2 text-3xl font-bold text-foreground">Register</h1>
        <p className="mb-6 text-muted-foreground">Create your SkillSwap account.</p>

        <div className="mb-6 flex gap-2 rounded-xl bg-muted p-1">
          {(["freelancer", "client"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`flex-1 rounded-lg py-2.5 text-sm font-medium capitalize transition-all ${
                role === r ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>First name</Label>
              <Input
                placeholder="First name"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Last name</Label>
              <Input
                placeholder="Last name"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button variant="hero" size="lg" type="submit" className="w-full rounded-xl">
            Confirm
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary">
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Register;
