import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Shield, Mail, Phone, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { API_URL } from "@/lib/api";

const sports = [
  "Athletics (Track & Field)", "Swimming", "Cycling", "Weightlifting", "Boxing",
  "Wrestling", "Football (Soccer)", "Basketball", "Tennis", "Badminton",
  "Cricket", "Hockey", "Gymnastics", "Rowing", "Shooting",
  "Archery", "Fencing", "Judo", "Taekwondo", "Table Tennis",
  "Volleyball", "Handball", "Rugby", "Golf", "Skiing",
  "Skating", "Equestrian", "Triathlon", "Martial Arts", "Other",
];

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [authMethod, setAuthMethod] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [selectedSport, setSelectedSport] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  

  try {
    const endpoint = isLogin
  ? `${API_URL}/login`
  : `${API_URL}/register`;

    const bodyData = isLogin
      ? {
          email,
          password,
        }
      : {
          name,
          email,
          phone,
          sport: selectedSport,
          password,
        };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });

    const data = await response.json();
    

    if (!response.ok) {
      toast.error(data.detail || "Something went wrong");
      return;
    }

    if (isLogin) {
  

  localStorage.setItem("token", data.access_token);
  window.dispatchEvent(new Event("storage"));
  
  navigate("/dashboard");
} else {
      toast.success("Registration successful 🎉 Please login.");
      setIsLogin(true);
    }

  } catch (error) {
  console.error("FETCH ERROR:", error);
}
};

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20 px-4 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="bg-card border border-border rounded-2xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Shield className="h-8 w-8 text-secondary" />
                <span className="font-display text-xl font-bold text-primary">
                  AntiDope<span className="text-secondary">AI</span>
                </span>
              </div>
              <h1 className="font-display text-2xl font-bold text-foreground mb-1">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {isLogin
                  ? "Sign in to your athlete account"
                  : "Register as an athlete to get started"}
              </p>
            </div>

            {/* Auth method toggle */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setAuthMethod("email")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  authMethod === "email"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <Mail className="h-4 w-4" />
                Email
              </button>
              <button
                onClick={() => setAuthMethod("phone")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  authMethod === "phone"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <Phone className="h-4 w-4" />
                Phone
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">
                    Full Name
                  </label>
                  <Input
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}

              {authMethod === "email" ? (
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="athlete@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              ) : (
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    placeholder="+91 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {!isLogin && (
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">
                    Select Your Sport
                  </label>
                  <select
                    value={selectedSport}
                    onChange={(e) => setSelectedSport(e.target.value)}
                    className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground"
                    required
                  >
                    <option value="">Choose your sport...</option>
                    {sports.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
              >
                {isLogin ? "Sign In" : "Create Account"}
              </Button>
            </form>

            <div className="text-center mt-6">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-secondary hover:underline"
              >
                {isLogin
                  ? "Don't have an account? Sign Up"
                  : "Already have an account? Sign In"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
