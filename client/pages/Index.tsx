import { Button } from "@/components/ui/button";
import { Heart, Stethoscope, Zap, Shield, Users, ArrowRight, Brain, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="container mx-auto px-6 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-primary/10 rounded-2xl">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <span className="text-2xl font-bold text-foreground">HealPulse</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-foreground/70 hover:text-primary transition-colors">Features</a>
            <a href="#about" className="text-foreground/70 hover:text-primary transition-colors">About</a>
            <a href="#contact" className="text-foreground/70 hover:text-primary transition-colors">Contact</a>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="rounded-2xl">Login</Button>
            </Link>
            <Link to="/signup">
              <Button className="rounded-2xl bg-primary hover:bg-primary/90 card-hover">
                Sign Up
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Your AI-Powered
                <span className="text-primary block">Health Assistant</span>
              </h1>
              <p className="text-xl text-foreground/70 leading-relaxed">
                Experience the future of healthcare with HealPulse. Get instant symptom analysis, 
                prescription management, and emergency aid - all powered by advanced AI technology.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/dashboard">
                <Button size="lg" className="rounded-2xl bg-primary hover:bg-primary/90 card-hover text-lg px-8 py-6">
                  <Zap className="mr-2 h-5 w-5" />
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="rounded-2xl card-hover text-lg px-8 py-6">
                <Brain className="mr-2 h-5 w-5" />
                Try AI Demo
              </Button>
            </div>
            
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-accent" />
                <span className="text-sm text-foreground/70">No Credit Card Required</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-accent" />
                <span className="text-sm text-foreground/70">HIPAA Compliant</span>
              </div>
            </div>
          </div>
          
          {/* AI Doctor Illustration Placeholder */}
          <div className="relative">
            <div className="neumorphic rounded-3xl p-8 bg-gradient-to-br from-primary/5 to-accent/5">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Stethoscope className="h-24 w-24 text-primary mx-auto animate-pulse" />
                  <p className="text-primary font-semibold">AI Doctor Illustration</p>
                  <p className="text-sm text-foreground/60">Interactive health assistant visualization</p>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 neumorphic rounded-2xl p-4 bg-background">
                <Heart className="h-6 w-6 text-red-500 animate-pulse" />
              </div>
              <div className="absolute -bottom-4 -left-4 neumorphic rounded-2xl p-4 bg-background">
                <Brain className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-20">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-foreground">Core Features</h2>
          <p className="text-xl text-foreground/70">Everything you need for modern healthcare management</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="neumorphic rounded-3xl p-8 card-hover bg-background">
            <div className="p-3 bg-primary/10 rounded-2xl w-fit mb-6">
              <Brain className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">AI Symptom Checker</h3>
            <p className="text-foreground/70 mb-6">Advanced AI analyzes your symptoms and provides personalized health insights with recommended next steps.</p>
            <Button variant="ghost" className="rounded-2xl text-primary">
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="neumorphic rounded-3xl p-8 card-hover bg-background">
            <div className="p-3 bg-accent/20 rounded-2xl w-fit mb-6">
              <Stethoscope className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Prescription OCR</h3>
            <p className="text-foreground/70 mb-6">Scan and digitize prescriptions instantly. Get medication reminders and drug interaction warnings.</p>
            <Button variant="ghost" className="rounded-2xl text-accent">
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="neumorphic rounded-3xl p-8 card-hover bg-background">
            <div className="p-3 bg-red-100 rounded-2xl w-fit mb-6">
              <Shield className="h-8 w-8 text-red-500" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Emergency Aid</h3>
            <p className="text-foreground/70 mb-6">Step-by-step emergency protocols for CPR, burns, fractures, and more. One-tap emergency calling.</p>
            <Button variant="ghost" className="rounded-2xl text-red-500">
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-20 bg-gradient-to-r from-primary/5 to-accent/5 rounded-3xl mx-6">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">10K+</div>
            <div className="text-foreground/70">Active Users</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">95%</div>
            <div className="text-foreground/70">Accuracy Rate</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">24/7</div>
            <div className="text-foreground/70">AI Support</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">1M+</div>
            <div className="text-foreground/70">Consultations</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl font-bold text-foreground">Ready to Transform Your Health Journey?</h2>
          <p className="text-xl text-foreground/70">Join thousands of users who trust HealPulse for their healthcare needs.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="rounded-2xl bg-primary hover:bg-primary/90 card-hover text-lg px-8 py-6">
                <Heart className="mr-2 h-5 w-5" />
                Start Your Health Journey
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="lg" className="rounded-2xl card-hover text-lg px-8 py-6">
                <Clock className="mr-2 h-5 w-5" />
                Try Demo Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 border-t border-border">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-primary/10 rounded-2xl">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <span className="text-xl font-bold">HealPulse</span>
              </div>
              <p className="text-foreground/70">Your trusted AI-powered health assistant for modern healthcare management.</p>
              <div className="flex space-x-4">
                <div className="neumorphic rounded-xl p-2 hover:shadow-neumorphic-hover transition-all cursor-pointer">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div className="neumorphic rounded-xl p-2 hover:shadow-neumorphic-hover transition-all cursor-pointer">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <div className="neumorphic rounded-xl p-2 hover:shadow-neumorphic-hover transition-all cursor-pointer">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <div className="space-y-2">
                <a href="#" className="block text-foreground/70 hover:text-primary transition-colors">AI Symptom Checker</a>
                <a href="#" className="block text-foreground/70 hover:text-primary transition-colors">Prescription OCR</a>
                <a href="#" className="block text-foreground/70 hover:text-primary transition-colors">Emergency Aid</a>
                <a href="#" className="block text-foreground/70 hover:text-primary transition-colors">Health Records</a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2">
                <a href="#" className="block text-foreground/70 hover:text-primary transition-colors">About Us</a>
                <a href="#" className="block text-foreground/70 hover:text-primary transition-colors">Careers</a>
                <a href="#" className="block text-foreground/70 hover:text-primary transition-colors">Press</a>
                <a href="#" className="block text-foreground/70 hover:text-primary transition-colors">Contact</a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <div className="space-y-2">
                <a href="#" className="block text-foreground/70 hover:text-primary transition-colors">Privacy Policy</a>
                <a href="#" className="block text-foreground/70 hover:text-primary transition-colors">Terms of Service</a>
                <a href="#" className="block text-foreground/70 hover:text-primary transition-colors">HIPAA Compliance</a>
                <a href="#" className="block text-foreground/70 hover:text-primary transition-colors">Security</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-12 pt-8 text-center text-foreground/70">
            <p>&copy; 2024 HealPulse. All rights reserved. Made with ❤️ for better healthcare.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
