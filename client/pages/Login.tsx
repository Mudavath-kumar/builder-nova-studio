import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import {
  Heart,
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Chrome,
  Apple,
  Brain,
  Sparkles,
  Shield,
  Zap,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Basic validation
    const newErrors: { email?: string; password?: string; general?: string } = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem("token", token);
        window.location.href = "/dashboard";
      } else {
        const data = await response.json();
        setErrors({ general: data.message || "An error occurred" });
      }
    } catch (error) {
      setErrors({ general: "An error occurred" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // Implement social login
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-neon-gradient rounded-full opacity-10 blur-3xl animate-float top-20 right-20" />
        <div
          className="absolute w-64 h-64 bg-cyber-gradient rounded-full opacity-10 blur-3xl animate-float bottom-20 left-20"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute w-80 h-80 bg-health-gradient rounded-full opacity-5 blur-3xl animate-float top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="p-3 bg-health-gradient rounded-3xl shadow-health">
                <Heart className="h-8 w-8 text-white heartbeat" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-health-gradient bg-clip-text text-transparent">
                  HealPulse
                </span>
                <div className="text-xs text-foreground/60">
                  AI Health Assistant
                </div>
              </div>
            </Link>

            <Link to="/">
              <Button variant="ghost" className="glass-button">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-16">
        <div className="max-w-md mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-8 fade-in">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-neon-gradient rounded-full flex items-center justify-center mx-auto glow">
                <Brain className="h-10 w-10 text-white animate-pulse" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-cyber-green rounded-full animate-ping" />
            </div>

            <h1 className="text-4xl font-bold text-foreground mb-4">
              Welcome Back!
            </h1>
            <p className="text-foreground/70 leading-relaxed">
              Sign in to continue your health journey with our AI-powered
              assistant
            </p>
          </div>

          {/* Login Form */}
          <GlassCard
            variant="primary"
            size="lg"
            hover="lift"
            className="slide-up"
          >
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Mail className="h-5 w-5 text-primary/60" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className={cn(
                      "w-full pl-10 pr-4 py-3 bg-primary/10 border rounded-2xl outline-none transition-all duration-300 text-foreground placeholder-foreground/50",
                      errors.email
                        ? "border-health-red focus:border-health-red"
                        : "border-primary/30 focus:border-primary",
                    )}
                    disabled={isLoading}
                  />
                  {errors.email && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <AlertCircle className="h-5 w-5 text-health-red" />
                    </div>
                  )}
                </div>
                {errors.email && (
                  <p className="text-sm text-health-red flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Lock className="h-5 w-5 text-primary/60" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className={cn(
                      "w-full pl-10 pr-12 py-3 bg-primary/10 border rounded-2xl outline-none transition-all duration-300 text-foreground placeholder-foreground/50",
                      errors.password
                        ? "border-health-red focus:border-health-red"
                        : "border-primary/30 focus:border-primary",
                    )}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary/60 hover:text-primary transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-health-red flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary rounded border-primary/30"
                  />
                  <span className="text-sm text-foreground/70">
                    Remember me
                  </span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full button-health text-lg py-6"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <Zap className="h-5 w-5 mr-2" />
                    Sign In to HealPulse
                  </>
                )}
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-primary/20" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-background text-foreground/60">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialLogin("google")}
                  disabled={isLoading}
                  className="glass-button py-3"
                >
                  <Chrome className="h-5 w-5 mr-2" />
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialLogin("apple")}
                  disabled={isLoading}
                  className="glass-button py-3"
                >
                  <Apple className="h-5 w-5 mr-2" />
                  Apple
                </Button>
              </div>

              {/* Sign Up Link */}
              <div className="text-center pt-4">
                <p className="text-sm text-foreground/70">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Sign up for free
                  </Link>
                </p>
              </div>
            </form>
          </GlassCard>

          {/* Security Features */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <GlassCard variant="accent" size="sm" hover="lift">
              <div className="text-center space-y-2">
                <Shield className="h-6 w-6 text-accent mx-auto" />
                <p className="text-xs text-foreground/70">HIPAA Secure</p>
              </div>
            </GlassCard>

            <GlassCard variant="neon" size="sm" hover="lift">
              <div className="text-center space-y-2">
                <CheckCircle className="h-6 w-6 text-cyber-green mx-auto" />
                <p className="text-xs text-foreground/70">256-bit SSL</p>
              </div>
            </GlassCard>

            <GlassCard variant="primary" size="sm" hover="lift">
              <div className="text-center space-y-2">
                <Sparkles className="h-6 w-6 text-primary mx-auto animate-pulse" />
                <p className="text-xs text-foreground/70">AI Powered</p>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
