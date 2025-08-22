import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import {
  Heart,
  Stethoscope,
  Zap,
  Shield,
  Users,
  ArrowRight,
  Brain,
  Clock,
  CheckCircle,
  Star,
  Sparkles,
  Activity,
  Mic,
  Camera,
  Bot,
  Phone,
  Map,
  TrendingUp,
  Award,
  Globe,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Index() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const parallaxOffset = scrollY * 0.5;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-neon-gradient rounded-full opacity-10 blur-3xl animate-float"
          style={{
            left: mousePosition.x * 0.02 + "px",
            top: mousePosition.y * 0.02 + "px",
          }}
        />
        <div
          className="absolute w-64 h-64 bg-cyber-gradient rounded-full opacity-10 blur-3xl animate-float"
          style={{
            right: mousePosition.x * 0.01 + "px",
            bottom: mousePosition.y * 0.01 + "px",
            animationDelay: "2s",
          }}
        />
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      {/* Navigation */}
      <header className="relative z-50">
        <div className="container mx-auto px-6 py-6">
          <GlassCard variant="default" size="sm" className="mb-0">
            <nav className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="p-3 bg-health-gradient rounded-3xl shadow-health">
                    <Heart className="h-8 w-8 text-white heartbeat" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyber-green rounded-full animate-ping"></div>
                </div>
                <div>
                  <span className="text-2xl font-bold bg-health-gradient bg-clip-text text-transparent">
                    HealPulse
                  </span>
                  <div className="text-xs text-foreground/60">
                    AI Health Assistant
                  </div>
                </div>
              </div>

              <div className="hidden md:flex items-center space-x-8">
                <a
                  href="#features"
                  className="text-foreground/70 hover:text-primary transition-all duration-300 hover:scale-105"
                >
                  Features
                </a>
                <a
                  href="#ai-tech"
                  className="text-foreground/70 hover:text-primary transition-all duration-300 hover:scale-105"
                >
                  AI Technology
                </a>
                <a
                  href="#testimonials"
                  className="text-foreground/70 hover:text-primary transition-all duration-300 hover:scale-105"
                >
                  Reviews
                </a>
                <a
                  href="#contact"
                  className="text-foreground/70 hover:text-primary transition-all duration-300 hover:scale-105"
                >
                  Contact
                </a>
              </div>

              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="ghost" className="glass-button">
                    <Bot className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="button-health">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Get Started Free
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </nav>
          </GlassCard>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative container mx-auto px-6 py-20">
        <div
          className="parallax"
          style={{ transform: `translateY(${parallaxOffset}px)` }}
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 slide-up">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 glass-card p-3">
                  <Sparkles className="h-5 w-5 text-neon-blue animate-pulse" />
                  <span className="text-sm font-medium text-foreground/80">
                    Powered by Advanced AI Technology
                  </span>
                </div>

                <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-health-gradient bg-clip-text text-transparent">
                    Transform
                  </span>
                  <br />
                  <span className="text-foreground">Your Health</span>
                  <br />
                  <span className="bg-neon-gradient bg-clip-text text-transparent glow">
                    Journey
                  </span>
                </h1>

                <p className="text-xl text-foreground/70 leading-relaxed max-w-lg">
                  Experience the future of healthcare with our AI-powered
                  assistant. Get instant diagnosis, voice consultations, and
                  personalized health insights - all in one revolutionary
                  platform.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <Link to="/dashboard">
                  <Button
                    size="lg"
                    className="button-cyber text-black font-bold px-8 py-6 text-lg"
                  >
                    <Zap className="mr-3 h-6 w-6" />
                    Start AI Consultation
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </Link>
                <Link to="/ai-chat">
                  <Button
                    variant="outline"
                    size="lg"
                    className="glass-button px-8 py-6 text-lg border-2 border-primary/30"
                  >
                    <Mic className="mr-3 h-6 w-6" />
                    Try Voice Assistant
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-8 pt-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-cyber-green animate-pulse" />
                  <span className="text-sm font-medium text-foreground/80">
                    Free Forever Plan
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-6 w-6 text-neon-blue glow" />
                  <span className="text-sm font-medium text-foreground/80">
                    HIPAA Compliant
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="h-6 w-6 text-warning-orange animate-bounce" />
                  <span className="text-sm font-medium text-foreground/80">
                    AI Certified
                  </span>
                </div>
              </div>
            </div>

            {/* 3D Hero Visualization */}
            <div className="relative float">
              <GlassCard
                variant="neon"
                size="xl"
                hover="glow"
                className="relative overflow-hidden"
              >
                <div className="aspect-square bg-gradient-to-br from-neon-blue/20 via-deep-purple/20 to-cyber-green/20 rounded-3xl relative">
                  {/* Central AI Brain */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      <div className="w-32 h-32 bg-health-gradient rounded-full flex items-center justify-center shadow-neon animate-glow">
                        <Brain className="h-16 w-16 text-white animate-pulse" />
                      </div>
                      <div className="absolute inset-0 bg-neon-gradient rounded-full opacity-30 animate-ping"></div>
                    </div>
                  </div>

                  {/* Floating Feature Icons */}
                  <div className="absolute top-8 left-8 interactive-hover">
                    <GlassCard variant="primary" size="sm">
                      <Stethoscope className="h-8 w-8 text-primary heartbeat" />
                    </GlassCard>
                  </div>

                  <div
                    className="absolute top-8 right-8 interactive-hover"
                    style={{ animationDelay: "0.5s" }}
                  >
                    <GlassCard variant="accent" size="sm">
                      <Camera className="h-8 w-8 text-accent animate-pulse" />
                    </GlassCard>
                  </div>

                  <div
                    className="absolute bottom-8 left-8 interactive-hover"
                    style={{ animationDelay: "1s" }}
                  >
                    <GlassCard variant="cyber" size="sm">
                      <Phone className="h-8 w-8 text-cyber-green animate-bounce" />
                    </GlassCard>
                  </div>

                  <div
                    className="absolute bottom-8 right-8 interactive-hover"
                    style={{ animationDelay: "1.5s" }}
                  >
                    <GlassCard variant="health" size="sm">
                      <Activity className="h-8 w-8 text-health-red animate-pulse" />
                    </GlassCard>
                  </div>

                  {/* Orbiting Elements */}
                  <div className="absolute inset-0">
                    <div
                      className="absolute top-1/4 left-1/4 w-4 h-4 bg-neon-blue rounded-full animate-ping"
                      style={{ animationDelay: "0s" }}
                    ></div>
                    <div
                      className="absolute top-3/4 right-1/4 w-3 h-3 bg-cyber-green rounded-full animate-ping"
                      style={{ animationDelay: "0.8s" }}
                    ></div>
                    <div
                      className="absolute bottom-1/4 left-3/4 w-2 h-2 bg-deep-purple rounded-full animate-ping"
                      style={{ animationDelay: "1.6s" }}
                    ></div>
                  </div>
                </div>

                {/* Real-time Metrics Overlay */}
                <div className="absolute -top-4 -right-4">
                  <GlassCard
                    variant="primary"
                    size="sm"
                    className="bg-success-green/20"
                  >
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-success-green" />
                      <span className="text-sm font-bold text-success-green">
                        98.7% Accuracy
                      </span>
                    </div>
                  </GlassCard>
                </div>

                <div className="absolute -bottom-4 -left-4">
                  <GlassCard
                    variant="neon"
                    size="sm"
                    className="bg-neon-blue/20"
                  >
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-neon-blue animate-spin-slow" />
                      <span className="text-sm font-bold text-neon-blue">
                        24/7 Available
                      </span>
                    </div>
                  </GlassCard>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section id="features" className="relative container mx-auto px-6 py-32">
        <div className="text-center space-y-6 mb-20 fade-in">
          <div className="inline-flex items-center space-x-2 glass-card p-3">
            <Sparkles className="h-5 w-5 text-accent animate-pulse" />
            <span className="text-sm font-medium">
              Revolutionary Healthcare Features
            </span>
          </div>
          <h2 className="text-5xl font-bold">
            <span className="bg-health-gradient bg-clip-text text-transparent">
              Next-Generation
            </span>
            <br />
            <span className="text-foreground">Health Technology</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Discover powerful AI-driven features designed to revolutionize your
            healthcare experience
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* AI Symptom Analysis */}
          <GlassCard
            variant="primary"
            size="lg"
            hover="intense"
            className="card-interactive"
          >
            <div className="space-y-6">
              <div className="relative">
                <div className="p-6 bg-primary/10 rounded-3xl w-fit mx-auto">
                  <Brain className="h-12 w-12 text-primary animate-pulse" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-cyber-green rounded-full animate-ping"></div>
              </div>
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-foreground">
                  AI Symptom Analysis
                </h3>
                <p className="text-foreground/70">
                  Advanced neural networks analyze your symptoms in real-time,
                  providing instant diagnosis suggestions with 98.7% accuracy
                  rate.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-foreground/60">
                    <CheckCircle className="h-4 w-4 text-cyber-green" />
                    <span>Real-time symptom mapping</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-foreground/60">
                    <CheckCircle className="h-4 w-4 text-cyber-green" />
                    <span>Differential diagnosis suggestions</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-foreground/60">
                    <CheckCircle className="h-4 w-4 text-cyber-green" />
                    <span>Treatment recommendations</span>
                  </div>
                </div>
                <Link to="/symptom-checker">
                  <Button className="button-health w-full">
                    Try AI Analysis
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </GlassCard>

          {/* Voice Assistant */}
          <GlassCard
            variant="neon"
            size="lg"
            hover="intense"
            className="card-interactive"
          >
            <div className="space-y-6">
              <div className="relative">
                <div className="p-6 bg-neon-gradient rounded-3xl w-fit mx-auto glow">
                  <Mic className="h-12 w-12 text-white animate-pulse" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-health-red rounded-full animate-pulse"></div>
              </div>
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-foreground">
                  Voice Assistant
                </h3>
                <p className="text-foreground/70">
                  Hands-free health consultations with our advanced voice AI.
                  Natural language processing understands medical terminology
                  perfectly.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-foreground/60">
                    <CheckCircle className="h-4 w-4 text-neon-blue" />
                    <span>Natural speech recognition</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-foreground/60">
                    <CheckCircle className="h-4 w-4 text-neon-blue" />
                    <span>Medical vocabulary understanding</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-foreground/60">
                    <CheckCircle className="h-4 w-4 text-neon-blue" />
                    <span>Multi-language support</span>
                  </div>
                </div>
                <Link to="/ai-chat">
                  <Button className="button-cyber text-black w-full">
                    Start Voice Chat
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </GlassCard>

          {/* Emergency Response */}
          <GlassCard
            variant="health"
            size="lg"
            hover="intense"
            className="card-interactive"
          >
            <div className="space-y-6">
              <div className="relative">
                <div className="p-6 bg-health-red/20 rounded-3xl w-fit mx-auto">
                  <Shield className="h-12 w-12 text-health-red animate-bounce" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-warning-orange rounded-full animate-ping"></div>
              </div>
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-foreground">
                  Emergency Response
                </h3>
                <p className="text-foreground/70">
                  One-tap emergency protocols with GPS location sharing and
                  automated contact with nearest medical facilities.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-foreground/60">
                    <CheckCircle className="h-4 w-4 text-health-red" />
                    <span>GPS location sharing</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-foreground/60">
                    <CheckCircle className="h-4 w-4 text-health-red" />
                    <span>Automated emergency calls</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-foreground/60">
                    <CheckCircle className="h-4 w-4 text-health-red" />
                    <span>First aid instructions</span>
                  </div>
                </div>
                <Link to="/emergency">
                  <Button className="bg-health-red hover:bg-health-red/90 text-white w-full button-glow">
                    Emergency Setup
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* AI Technology Section */}
      <section
        id="ai-tech"
        className="relative py-32 bg-gradient-to-r from-primary/5 to-accent/5"
      >
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 glass-card p-3">
                  <Bot className="h-5 w-5 text-deep-purple animate-pulse" />
                  <span className="text-sm font-medium">
                    Advanced AI Technology
                  </span>
                </div>
                <h2 className="text-5xl font-bold">
                  <span className="bg-neon-gradient bg-clip-text text-transparent">
                    Cutting-Edge
                  </span>
                  <br />
                  <span className="text-foreground">Medical AI</span>
                </h2>
                <p className="text-xl text-foreground/70">
                  Our proprietary AI models are trained on millions of medical
                  cases, providing healthcare insights that rival human
                  specialists.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <GlassCard variant="primary" size="sm" hover="lift">
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-primary">98.7%</div>
                    <div className="text-sm text-foreground/60">
                      Diagnosis Accuracy
                    </div>
                  </div>
                </GlassCard>
                <GlassCard variant="accent" size="sm" hover="lift">
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-accent">2.3s</div>
                    <div className="text-sm text-foreground/60">
                      Response Time
                    </div>
                  </div>
                </GlassCard>
                <GlassCard variant="neon" size="sm" hover="lift">
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-neon-blue">
                      24/7
                    </div>
                    <div className="text-sm text-foreground/60">
                      Availability
                    </div>
                  </div>
                </GlassCard>
                <GlassCard variant="cyber" size="sm" hover="lift">
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-cyber-green">
                      50M+
                    </div>
                    <div className="text-sm text-foreground/60">
                      Medical Cases
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>

            <div className="relative">
              <GlassCard variant="neon" size="xl" hover="glow">
                <div className="aspect-square relative overflow-hidden rounded-3xl bg-gradient-to-br from-deep-purple/20 to-neon-blue/20">
                  {/* AI Visualization */}
                  <div className="absolute inset-4 border-2 border-neon-blue/30 rounded-2xl">
                    <div className="grid grid-cols-8 gap-1 h-full p-4">
                      {Array.from({ length: 64 }, (_, i) => (
                        <div
                          key={i}
                          className={`rounded-sm transition-all duration-1000 ${
                            Math.random() > 0.5
                              ? "bg-neon-blue animate-pulse"
                              : "bg-deep-purple/30"
                          }`}
                          style={{
                            animationDelay: `${i * 0.1}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-24 h-24 bg-neon-gradient rounded-full flex items-center justify-center animate-glow">
                      <Bot className="h-12 w-12 text-white animate-pulse" />
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative container mx-auto px-6 py-32 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 glass-card p-3">
              <Heart className="h-5 w-5 text-health-red heartbeat" />
              <span className="text-sm font-medium">
                Join the Health Revolution
              </span>
            </div>
            <h2 className="text-5xl font-bold">
              <span className="text-foreground">Ready to Transform</span>
              <br />
              <span className="bg-health-gradient bg-clip-text text-transparent">
                Your Health Journey?
              </span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Join thousands of users who trust HealPulse for their healthcare
              needs. Experience the future of medicine today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/signup">
              <Button
                size="lg"
                className="button-cyber text-black font-bold px-12 py-6 text-xl"
              >
                <Sparkles className="mr-3 h-6 w-6" />
                Start Free Trial
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
            <Link to="/ai-chat">
              <Button
                variant="outline"
                size="lg"
                className="glass-button px-12 py-6 text-xl border-2 border-primary/30"
              >
                <Brain className="mr-3 h-6 w-6" />
                Try AI Demo
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center space-x-12 pt-8">
            <div className="flex items-center space-x-3">
              <Star className="h-6 w-6 text-warning-orange animate-pulse" />
              <span className="text-foreground/80">4.9/5 Rating</span>
            </div>
            <div className="flex items-center space-x-3">
              <Users className="h-6 w-6 text-primary glow" />
              <span className="text-foreground/80">100K+ Users</span>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="h-6 w-6 text-cyber-green animate-bounce" />
              <span className="text-foreground/80">Fully Secure</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-foreground/5 via-primary/5 to-accent/5 border-t border-border/50">
        <div className="container mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-health-gradient rounded-3xl">
                  <Heart className="h-8 w-8 text-white heartbeat" />
                </div>
                <div>
                  <span className="text-2xl font-bold bg-health-gradient bg-clip-text text-transparent">
                    HealPulse
                  </span>
                  <div className="text-xs text-foreground/60">
                    AI Health Revolution
                  </div>
                </div>
              </div>
              <p className="text-foreground/70 leading-relaxed">
                Revolutionizing healthcare with advanced AI technology, making
                quality medical assistance accessible to everyone, everywhere.
              </p>
              <div className="flex space-x-4">
                <div className="glass-card p-3 hover:bg-primary/20 transition-all cursor-pointer">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
                <div className="glass-card p-3 hover:bg-accent/20 transition-all cursor-pointer">
                  <Brain className="h-5 w-5 text-accent" />
                </div>
                <div className="glass-card p-3 hover:bg-neon-blue/20 transition-all cursor-pointer">
                  <Bot className="h-5 w-5 text-neon-blue" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-lg text-foreground">Features</h3>
              <div className="space-y-3">
                <a
                  href="#"
                  className="block text-foreground/70 hover:text-primary transition-colors hover:translate-x-1"
                >
                  AI Symptom Checker
                </a>
                <a
                  href="#"
                  className="block text-foreground/70 hover:text-primary transition-colors hover:translate-x-1"
                >
                  Voice Assistant
                </a>
                <a
                  href="#"
                  className="block text-foreground/70 hover:text-primary transition-colors hover:translate-x-1"
                >
                  Emergency Response
                </a>
                <a
                  href="#"
                  className="block text-foreground/70 hover:text-primary transition-colors hover:translate-x-1"
                >
                  Health Records
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-lg text-foreground">Company</h3>
              <div className="space-y-3">
                <a
                  href="#"
                  className="block text-foreground/70 hover:text-primary transition-colors hover:translate-x-1"
                >
                  About Us
                </a>
                <a
                  href="#"
                  className="block text-foreground/70 hover:text-primary transition-colors hover:translate-x-1"
                >
                  Careers
                </a>
                <a
                  href="#"
                  className="block text-foreground/70 hover:text-primary transition-colors hover:translate-x-1"
                >
                  Press
                </a>
                <a
                  href="#"
                  className="block text-foreground/70 hover:text-primary transition-colors hover:translate-x-1"
                >
                  Blog
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-lg text-foreground">Support</h3>
              <div className="space-y-3">
                <a
                  href="#"
                  className="block text-foreground/70 hover:text-primary transition-colors hover:translate-x-1"
                >
                  Help Center
                </a>
                <a
                  href="#"
                  className="block text-foreground/70 hover:text-primary transition-colors hover:translate-x-1"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="block text-foreground/70 hover:text-primary transition-colors hover:translate-x-1"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="block text-foreground/70 hover:text-primary transition-colors hover:translate-x-1"
                >
                  HIPAA Compliance
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-border/50 mt-16 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-foreground/60 text-center md:text-left">
                &copy; 2024 HealPulse. All rights reserved. Made with ❤️ for
                better healthcare.
              </p>
              <div className="flex items-center space-x-6">
                <span className="text-sm text-foreground/60">Powered by</span>
                <div className="flex items-center space-x-2">
                  <Bot className="h-4 w-4 text-neon-blue animate-pulse" />
                  <span className="text-sm font-medium text-neon-blue">
                    Advanced AI
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
