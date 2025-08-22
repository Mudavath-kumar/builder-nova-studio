import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import {
  Heart,
  ArrowLeft,
  Mail,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  Shield,
  Clock,
  KeyRound,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState("");
  const [resendCount, setResendCount] = useState(0);
  const [cooldownTime, setCooldownTime] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsEmailSent(true);
      setResendCount((prev) => prev + 1);

      // Start cooldown for resend
      setCooldownTime(60);
      const interval = setInterval(() => {
        setCooldownTime((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 2000);
  };

  const handleResend = () => {
    if (cooldownTime > 0) return;
    handleSubmit({ preventDefault: () => {} } as React.FormEvent);
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
                  Password Recovery
                </div>
              </div>
            </Link>

            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" className="glass-button">
                  Back to Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline" className="glass-button">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-16">
        <div className="max-w-md mx-auto">
          {!isEmailSent ? (
            // Reset Password Form
            <div className="fade-in">
              <div className="text-center mb-8">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-neon-gradient rounded-full flex items-center justify-center mx-auto glow">
                    <KeyRound className="h-10 w-10 text-white animate-pulse" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-warning-orange rounded-full animate-ping" />
                </div>

                <h1 className="text-4xl font-bold text-foreground mb-4">
                  Forgot Password?
                </h1>
                <p className="text-foreground/70 leading-relaxed">
                  No worries! Enter your email address and we'll send you a
                  reset link
                </p>
              </div>

              <GlassCard
                variant="primary"
                size="lg"
                hover="lift"
                className="slide-up"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
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
                        placeholder="Enter your email address"
                        className={cn(
                          "w-full pl-10 pr-4 py-3 bg-primary/10 border rounded-2xl outline-none transition-all duration-300 text-foreground placeholder-foreground/50",
                          error
                            ? "border-health-red focus:border-health-red"
                            : "border-primary/30 focus:border-primary",
                        )}
                        disabled={isLoading}
                      />
                      {error && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <AlertCircle className="h-5 w-5 text-health-red" />
                        </div>
                      )}
                    </div>
                    {error && (
                      <p className="text-sm text-health-red flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {error}
                      </p>
                    )}
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
                        Sending Reset Link...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Send Reset Link
                      </>
                    )}
                  </Button>

                  {/* Back to Login */}
                  <div className="text-center pt-4">
                    <Link
                      to="/login"
                      className="text-sm text-primary hover:text-primary/80 font-medium transition-colors flex items-center justify-center"
                    >
                      <ArrowLeft className="h-4 w-4 mr-1" />
                      Back to Login
                    </Link>
                  </div>
                </form>
              </GlassCard>
            </div>
          ) : (
            // Email Sent Confirmation
            <div className="fade-in">
              <div className="text-center mb-8">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-cyber-gradient rounded-full flex items-center justify-center mx-auto glow">
                    <CheckCircle className="h-10 w-10 text-white animate-bounce" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-cyber-green rounded-full animate-ping" />
                </div>

                <h1 className="text-4xl font-bold text-foreground mb-4">
                  Check Your Email!
                </h1>
                <p className="text-foreground/70 leading-relaxed">
                  We've sent a password reset link to
                </p>
                <p className="text-primary font-semibold text-lg mt-2">
                  {email}
                </p>
              </div>

              <GlassCard
                variant="accent"
                size="lg"
                hover="lift"
                className="slide-up"
              >
                <div className="space-y-6">
                  {/* Instructions */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-4 bg-accent/10 rounded-2xl border border-accent/30">
                      <Mail className="h-5 w-5 text-accent mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          Check your inbox
                        </h3>
                        <p className="text-sm text-foreground/70">
                          Click the link in the email to reset your password.
                          The link will expire in 15 minutes.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-4 bg-primary/10 rounded-2xl border border-primary/30">
                      <Clock className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          Didn't receive it?
                        </h3>
                        <p className="text-sm text-foreground/70">
                          Check your spam folder or try resending the email
                          below.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Resend Button */}
                  <Button
                    onClick={handleResend}
                    disabled={cooldownTime > 0 || isLoading}
                    variant="outline"
                    className="w-full glass-button"
                  >
                    {cooldownTime > 0 ? (
                      <>
                        <Clock className="h-4 w-4 mr-2" />
                        Resend in {cooldownTime}s
                      </>
                    ) : (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Resend Reset Link
                      </>
                    )}
                  </Button>

                  {resendCount > 0 && (
                    <p className="text-xs text-center text-foreground/60">
                      Email sent {resendCount} time{resendCount > 1 ? "s" : ""}
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex space-x-4 pt-4 border-t border-border/50">
                    <Link to="/login" className="flex-1">
                      <Button variant="outline" className="w-full glass-button">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Login
                      </Button>
                    </Link>
                    <Link to="/signup" className="flex-1">
                      <Button className="w-full button-health">
                        <Sparkles className="h-4 w-4 mr-2" />
                        Create Account
                      </Button>
                    </Link>
                  </div>
                </div>
              </GlassCard>
            </div>
          )}

          {/* Security Notice */}
          <div className="mt-8">
            <GlassCard variant="neon" size="sm" className="text-center">
              <div className="flex items-center justify-center space-x-2">
                <Shield className="h-5 w-5 text-neon-blue" />
                <p className="text-sm text-foreground/70">
                  Your account security is our top priority
                </p>
              </div>
            </GlassCard>
          </div>

          {/* Help Links */}
          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-foreground/60">Need more help?</p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/help"
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Contact Support
              </Link>
              <span className="text-foreground/30">•</span>
              <Link
                to="/about"
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
