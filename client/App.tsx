import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import AIChatPage from "./pages/AIChat";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";
import { Brain, Upload, Shield, FileText, Bell, Settings, User, Stethoscope, Video, BarChart, Users, HelpCircle, Info, Phone, LogIn, UserPlus, KeyRound, BookOpen } from "lucide-react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ai-chat" element={<AIChatPage />} />

          {/* Authentication Routes */}
          <Route path="/login" element={
            <PlaceholderPage
              title="Login"
              description="Sign in to your HealPulse account to access your personalized health dashboard."
              icon={<LogIn className="h-12 w-12 text-primary" />}
            />
          } />
          <Route path="/signup" element={
            <PlaceholderPage
              title="Sign Up"
              description="Create your HealPulse account and start your health journey today."
              icon={<UserPlus className="h-12 w-12 text-primary" />}
            />
          } />
          <Route path="/forgot-password" element={
            <PlaceholderPage
              title="Forgot Password"
              description="Reset your password to regain access to your account."
              icon={<KeyRound className="h-12 w-12 text-primary" />}
            />
          } />

          {/* Onboarding Routes */}
          <Route path="/onboarding" element={
            <PlaceholderPage
              title="Welcome to HealPulse"
              description="Let's get you set up with your personalized AI health assistant."
              icon={<BookOpen className="h-12 w-12 text-primary" />}
            />
          } />

          {/* Core Feature Routes */}
          <Route path="/ai-chat" element={
            <PlaceholderPage
              title="AI Chat Assistant"
              description="Chat with your intelligent health assistant for personalized medical guidance."
              icon={<Brain className="h-12 w-12 text-primary" />}
            />
          } />
          <Route path="/symptom-checker" element={
            <PlaceholderPage
              title="Symptom Analysis"
              description="Get AI-powered symptom analysis and personalized health recommendations."
              icon={<Brain className="h-12 w-12 text-primary" />}
            />
          } />
          <Route path="/prescription-upload" element={
            <PlaceholderPage
              title="Prescription Upload"
              description="Scan and digitize your prescriptions with intelligent OCR technology."
              icon={<Upload className="h-12 w-12 text-accent" />}
            />
          } />
          <Route path="/emergency" element={
            <PlaceholderPage
              title="Emergency Aid"
              description="Access life-saving emergency protocols and quick ambulance calling."
              icon={<Shield className="h-12 w-12 text-red-500" />}
            />
          } />
          <Route path="/health-records" element={
            <PlaceholderPage
              title="Health Records Timeline"
              description="View and manage your complete medical history in one place."
              icon={<FileText className="h-12 w-12 text-blue-500" />}
            />
          } />

          {/* User Management Routes */}
          <Route path="/notifications" element={
            <PlaceholderPage
              title="Notifications"
              description="Manage your medication reminders and health alerts."
              icon={<Bell className="h-12 w-12 text-primary" />}
            />
          } />
          <Route path="/settings" element={
            <PlaceholderPage
              title="Settings"
              description="Customize your HealPulse experience and privacy preferences."
              icon={<Settings className="h-12 w-12 text-primary" />}
            />
          } />
          <Route path="/profile" element={
            <PlaceholderPage
              title="User Profile"
              description="Manage your personal information and health details."
              icon={<User className="h-12 w-12 text-primary" />}
            />
          } />

          {/* Doctor & Consultation Routes */}
          <Route path="/doctor-consultation" element={
            <PlaceholderPage
              title="Doctor Consultation"
              description="Browse and book consultations with verified healthcare professionals."
              icon={<Stethoscope className="h-12 w-12 text-primary" />}
            />
          } />
          <Route path="/video-consultation" element={
            <PlaceholderPage
              title="Video Consultation"
              description="Connect with doctors through secure video calls."
              icon={<Video className="h-12 w-12 text-primary" />}
            />
          } />

          {/* Reports & Analytics Routes */}
          <Route path="/reports-upload" element={
            <PlaceholderPage
              title="Reports Upload"
              description="Upload and manage your medical reports and test results."
              icon={<Upload className="h-12 w-12 text-primary" />}
            />
          } />
          <Route path="/progress-tracker" element={
            <PlaceholderPage
              title="Progress Tracker"
              description="Track your health metrics and view detailed analytics."
              icon={<BarChart className="h-12 w-12 text-primary" />}
            />
          } />

          {/* Community & Support Routes */}
          <Route path="/community" element={
            <PlaceholderPage
              title="Community Forum"
              description="Connect with other users and share health experiences."
              icon={<Users className="h-12 w-12 text-primary" />}
            />
          } />
          <Route path="/help" element={
            <PlaceholderPage
              title="Help & FAQ"
              description="Find answers to common questions and get support."
              icon={<HelpCircle className="h-12 w-12 text-primary" />}
            />
          } />
          <Route path="/about" element={
            <PlaceholderPage
              title="About HealPulse"
              description="Learn about our mission to revolutionize healthcare with AI."
              icon={<Info className="h-12 w-12 text-primary" />}
            />
          } />
          <Route path="/contact" element={
            <PlaceholderPage
              title="Contact & Support"
              description="Get in touch with our support team for assistance."
              icon={<Phone className="h-12 w-12 text-primary" />}
            />
          } />

          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
