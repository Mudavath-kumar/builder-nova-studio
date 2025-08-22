import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import {
  Heart,
  ArrowLeft,
  ArrowRight,
  Brain,
  Camera,
  Shield,
  Stethoscope,
  Upload,
  Phone,
  Activity,
  Sparkles,
  CheckCircle,
  Zap,
  Users,
  Award,
  Target,
  TrendingUp,
  MessageCircle,
  Mic,
  Bell,
  Clock,
  Map,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface OnboardingSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: React.ComponentType<any>;
  gradient: string;
  animation: string;
}

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [completedFeatures, setCompletedFeatures] = useState<string[]>([]);

  const slides: OnboardingSlide[] = [
    {
      id: 1,
      title: "Welcome to HealPulse",
      subtitle: "Your AI Health Companion",
      description:
        "Experience the future of healthcare with our advanced AI assistant that provides instant health insights, personalized recommendations, and 24/7 medical support.",
      features: [
        "AI-powered health analysis",
        "Instant symptom checker",
        "Personalized wellness plans",
        "24/7 availability",
      ],
      icon: Brain,
      gradient: "bg-neon-gradient",
      animation: "animate-pulse",
    },
    {
      id: 2,
      title: "Smart Symptom Analysis",
      subtitle: "AI Doctor in Your Pocket",
      description:
        "Our advanced neural networks analyze your symptoms in real-time, providing accurate health assessments with 98.7% precision. Get instant medical insights anytime, anywhere.",
      features: [
        "Real-time symptom analysis",
        "Visual body mapping",
        "Differential diagnosis",
        "Treatment recommendations",
      ],
      icon: Stethoscope,
      gradient: "bg-health-gradient",
      animation: "heartbeat",
    },
    {
      id: 3,
      title: "Prescription Scanner",
      subtitle: "OCR Technology",
      description:
        "Simply scan your prescriptions with our intelligent OCR technology. We'll digitize your medications, set up reminders, and check for dangerous interactions automatically.",
      features: [
        "Instant prescription scanning",
        "Automatic pill recognition",
        "Smart medication reminders",
        "Drug interaction alerts",
      ],
      icon: Camera,
      gradient: "bg-cyber-gradient",
      animation: "animate-bounce",
    },
    {
      id: 4,
      title: "Emergency Response",
      subtitle: "Life-Saving Features",
      description:
        "One-tap emergency protocols with GPS location sharing and automated medical facility contact. Access step-by-step first aid instructions for critical situations.",
      features: [
        "One-tap emergency calling",
        "GPS location sharing",
        "Step-by-step first aid",
        "Emergency contact alerts",
      ],
      icon: Shield,
      gradient: "bg-gradient-to-r from-health-red to-warning-orange",
      animation: "animate-pulse",
    },
    {
      id: 5,
      title: "Voice Assistant",
      subtitle: "Hands-Free Healthcare",
      description:
        "Talk naturally to your AI health assistant. Our advanced voice recognition understands medical terminology and provides spoken responses for accessible healthcare.",
      features: [
        "Natural voice commands",
        "Medical terminology understanding",
        "Spoken health advice",
        "Hands-free interaction",
      ],
      icon: Mic,
      gradient: "bg-neon-gradient",
      animation: "animate-ping",
    },
  ];

  // Auto-play slides
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const markFeatureCompleted = (feature: string) => {
    if (!completedFeatures.includes(feature)) {
      setCompletedFeatures((prev) => [...prev, feature]);
    }
  };

  const currentSlideData = slides[currentSlide];

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
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-health-gradient rounded-3xl shadow-health">
                <Heart className="h-8 w-8 text-white heartbeat" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-health-gradient bg-clip-text text-transparent">
                  HealPulse
                </span>
                <div className="text-xs text-foreground/60">
                  Getting Started
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <GlassCard variant="primary" size="sm" className="px-4 py-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-cyber-green rounded-full animate-pulse" />
                  <span className="text-sm font-medium">
                    Setup:{" "}
                    {Math.round(((currentSlide + 1) / slides.length) * 100)}%
                  </span>
                </div>
              </GlassCard>

              <Link to="/dashboard">
                <Button variant="outline" className="glass-button">
                  Skip Tutorial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Progress Dots */}
          <div className="flex justify-center mb-12">
            <GlassCard variant="primary" size="sm" className="px-6 py-4">
              <div className="flex items-center space-x-3">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={cn(
                      "w-3 h-3 rounded-full transition-all duration-300",
                      index === currentSlide
                        ? "bg-primary scale-125"
                        : index < currentSlide
                          ? "bg-cyber-green"
                          : "bg-foreground/30 hover:bg-foreground/50",
                    )}
                  />
                ))}
                <div className="ml-4 text-sm text-foreground/70">
                  {currentSlide + 1} of {slides.length}
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Slide Content */}
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[500px]">
            {/* Left Side - Content */}
            <div className="space-y-8 fade-in">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 glass-card p-3">
                  <Sparkles className="h-5 w-5 text-neon-blue animate-pulse" />
                  <span className="text-sm font-medium">
                    Step {currentSlide + 1}
                  </span>
                </div>

                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-foreground">
                    {currentSlideData.title}
                  </span>
                  <br />
                  <span className="bg-health-gradient bg-clip-text text-transparent">
                    {currentSlideData.subtitle}
                  </span>
                </h1>

                <p className="text-xl text-foreground/70 leading-relaxed">
                  {currentSlideData.description}
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-cyber-green" />
                  Key Features
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {currentSlideData.features.map((feature, index) => (
                    <div
                      key={feature}
                      className={cn(
                        "flex items-center space-x-3 p-3 rounded-2xl transition-all duration-300 cursor-pointer",
                        completedFeatures.includes(feature)
                          ? "bg-cyber-green/20 border border-cyber-green/30"
                          : "bg-primary/10 border border-primary/20 hover:bg-primary/20",
                      )}
                      onClick={() => markFeatureCompleted(feature)}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div
                        className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300",
                          completedFeatures.includes(feature)
                            ? "bg-cyber-green text-white"
                            : "bg-primary/20 text-primary",
                        )}
                      >
                        {completedFeatures.includes(feature) ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <span className="text-sm font-bold">{index + 1}</span>
                        )}
                      </div>
                      <span
                        className={cn(
                          "font-medium transition-colors duration-300",
                          completedFeatures.includes(feature)
                            ? "text-cyber-green"
                            : "text-foreground",
                        )}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center space-x-4 pt-8">
                <Button
                  onClick={prevSlide}
                  disabled={currentSlide === 0}
                  variant="outline"
                  className="glass-button"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                {currentSlide < slides.length - 1 ? (
                  <Button onClick={nextSlide} className="button-health flex-1">
                    Continue
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Link to="/dashboard" className="flex-1">
                    <Button className="w-full button-cyber text-black">
                      <Zap className="h-4 w-4 mr-2" />
                      Start Using HealPulse
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            {/* Right Side - Visual */}
            <div className="relative">
              <GlassCard
                variant="neon"
                size="xl"
                hover="glow"
                className="relative overflow-hidden"
              >
                <div className="aspect-square bg-gradient-to-br from-neon-blue/20 via-deep-purple/20 to-cyber-green/20 rounded-3xl relative flex items-center justify-center">
                  {/* Main Icon */}
                  <div className="relative">
                    <div
                      className={cn(
                        "w-32 h-32 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500",
                        currentSlideData.gradient,
                        currentSlideData.animation,
                      )}
                    >
                      <currentSlideData.icon className="h-16 w-16 text-white" />
                    </div>
                    <div className="absolute inset-0 bg-neon-gradient rounded-full opacity-30 animate-ping" />
                  </div>

                  {/* Floating Elements based on slide */}
                  {currentSlide === 0 && (
                    <>
                      <div className="absolute top-8 left-8 interactive-hover">
                        <GlassCard variant="primary" size="sm">
                          <Activity className="h-6 w-6 text-primary" />
                        </GlassCard>
                      </div>
                      <div
                        className="absolute top-8 right-8 interactive-hover"
                        style={{ animationDelay: "0.5s" }}
                      >
                        <GlassCard variant="accent" size="sm">
                          <Heart className="h-6 w-6 text-accent heartbeat" />
                        </GlassCard>
                      </div>
                      <div
                        className="absolute bottom-8 left-8 interactive-hover"
                        style={{ animationDelay: "1s" }}
                      >
                        <GlassCard variant="neon" size="sm">
                          <Users className="h-6 w-6 text-neon-blue" />
                        </GlassCard>
                      </div>
                      <div
                        className="absolute bottom-8 right-8 interactive-hover"
                        style={{ animationDelay: "1.5s" }}
                      >
                        <GlassCard variant="cyber" size="sm">
                          <Award className="h-6 w-6 text-cyber-green" />
                        </GlassCard>
                      </div>
                    </>
                  )}

                  {currentSlide === 1 && (
                    <>
                      <div
                        className="absolute top-12 left-12 animate-bounce"
                        style={{ animationDelay: "0s" }}
                      >
                        <div className="w-4 h-4 bg-health-red rounded-full animate-pulse" />
                      </div>
                      <div
                        className="absolute top-20 right-16 animate-bounce"
                        style={{ animationDelay: "0.3s" }}
                      >
                        <div className="w-3 h-3 bg-warning-orange rounded-full animate-pulse" />
                      </div>
                      <div
                        className="absolute bottom-16 left-16 animate-bounce"
                        style={{ animationDelay: "0.6s" }}
                      >
                        <div className="w-5 h-5 bg-cyber-green rounded-full animate-pulse" />
                      </div>
                      <div
                        className="absolute bottom-12 right-12 animate-bounce"
                        style={{ animationDelay: "0.9s" }}
                      >
                        <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse" />
                      </div>
                    </>
                  )}

                  {currentSlide === 2 && (
                    <>
                      <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
                        <GlassCard variant="accent" size="sm">
                          <Upload className="h-5 w-5 text-accent animate-bounce" />
                        </GlassCard>
                      </div>
                      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                        <GlassCard variant="primary" size="sm">
                          <Bell className="h-5 w-5 text-primary animate-pulse" />
                        </GlassCard>
                      </div>
                    </>
                  )}

                  {currentSlide === 3 && (
                    <>
                      <div className="absolute top-10 left-10">
                        <GlassCard
                          variant="health"
                          size="sm"
                          className="bg-health-red/20"
                        >
                          <Phone className="h-5 w-5 text-health-red animate-bounce" />
                        </GlassCard>
                      </div>
                      <div className="absolute top-10 right-10">
                        <GlassCard variant="neon" size="sm">
                          <Map className="h-5 w-5 text-neon-blue animate-pulse" />
                        </GlassCard>
                      </div>
                      <div className="absolute bottom-10 left-10">
                        <GlassCard variant="accent" size="sm">
                          <Clock className="h-5 w-5 text-accent animate-spin-slow" />
                        </GlassCard>
                      </div>
                      <div className="absolute bottom-10 right-10">
                        <GlassCard variant="cyber" size="sm">
                          <Target className="h-5 w-5 text-cyber-green animate-ping" />
                        </GlassCard>
                      </div>
                    </>
                  )}

                  {currentSlide === 4 && (
                    <>
                      <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-neon-blue rounded-full animate-ping" />
                      <div
                        className="absolute top-3/4 right-1/4 w-4 h-4 bg-cyber-green rounded-full animate-ping"
                        style={{ animationDelay: "0.5s" }}
                      />
                      <div
                        className="absolute bottom-1/4 left-3/4 w-3 h-3 bg-warning-orange rounded-full animate-ping"
                        style={{ animationDelay: "1s" }}
                      />
                      <div className="absolute top-1/2 left-8">
                        <MessageCircle className="h-6 w-6 text-primary animate-bounce" />
                      </div>
                      <div className="absolute top-1/2 right-8">
                        <TrendingUp className="h-6 w-6 text-accent animate-pulse" />
                      </div>
                    </>
                  )}
                </div>
              </GlassCard>

              {/* Slide Indicator */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                <GlassCard variant="primary" size="sm" className="px-6 py-2">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-primary animate-pulse" />
                    <span className="text-sm font-medium">
                      Interactive Demo
                    </span>
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>

          {/* Auto-play Toggle */}
          <div className="flex justify-center mt-16">
            <GlassCard variant="default" size="sm" className="px-6 py-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAutoPlaying}
                  onChange={(e) => setIsAutoPlaying(e.target.checked)}
                  className="w-4 h-4 text-primary rounded"
                />
                <span className="text-sm text-foreground/70">
                  Auto-play slides
                </span>
                <div className="flex items-center space-x-1 text-xs text-foreground/50">
                  <Clock className="h-3 w-3" />
                  <span>5s</span>
                </div>
              </label>
            </GlassCard>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-6 mt-16">
            <GlassCard
              variant="primary"
              size="sm"
              hover="lift"
              className="text-center"
            >
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">98.7%</div>
                <div className="text-xs text-foreground/60">AI Accuracy</div>
              </div>
            </GlassCard>

            <GlassCard
              variant="accent"
              size="sm"
              hover="lift"
              className="text-center"
            >
              <div className="space-y-2">
                <div className="text-2xl font-bold text-accent">24/7</div>
                <div className="text-xs text-foreground/60">Available</div>
              </div>
            </GlassCard>

            <GlassCard
              variant="neon"
              size="sm"
              hover="lift"
              className="text-center"
            >
              <div className="space-y-2">
                <div className="text-2xl font-bold text-neon-blue">100K+</div>
                <div className="text-xs text-foreground/60">Users</div>
              </div>
            </GlassCard>

            <GlassCard
              variant="cyber"
              size="sm"
              hover="lift"
              className="text-center"
            >
              <div className="space-y-2">
                <div className="text-2xl font-bold text-cyber-green">2.3s</div>
                <div className="text-xs text-foreground/60">Response</div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
