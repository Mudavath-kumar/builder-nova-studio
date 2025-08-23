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
import SymptomChecker from "./pages/SymptomChecker";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Onboarding from "./pages/Onboarding";
import PrescriptionUpload from "./pages/PrescriptionUpload";
import Emergency from "./pages/Emergency";
import HealthRecords from "./pages/HealthRecords";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";
import FloatingAIAssistant from "./components/ui/floating-ai-assistant";
import {
  Brain,
  Upload,
  Shield,
  FileText,
  Bell,
  Settings,
  User,
  Stethoscope,
  Video,
  BarChart,
  Users,
  HelpCircle,
  Info,
  Phone,
  LogIn,
  UserPlus,
  KeyRound,
  BookOpen,
} from "lucide-react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <FloatingAIAssistant />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ai-chat" element={<AIChatPage />} />
          <Route path="/symptom-checker" element={<SymptomChecker />} />
          <Route path="/prescription-upload" element={<PrescriptionUpload />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/health-records" element={<HealthRecords />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />

          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/onboarding" element={<Onboarding />} />

          {/* Core Feature Routes - Already implemented above */}

          {/* User Management Routes - Already implemented above */}
          <Route
            path="/profile"
            element={
              <PlaceholderPage
                title="User Profile"
                description="Manage your personal information and health details."
                icon={<User className="h-12 w-12 text-primary" />}
              />
            }
          />

          {/* Doctor & Consultation Routes */}
          <Route
            path="/doctor-consultation"
            element={
              <PlaceholderPage
                title="Doctor Consultation"
                description="Browse and book consultations with verified healthcare professionals."
                icon={<Stethoscope className="h-12 w-12 text-primary" />}
              />
            }
          />
          <Route
            path="/video-consultation"
            element={
              <PlaceholderPage
                title="Video Consultation"
                description="Connect with doctors through secure video calls."
                icon={<Video className="h-12 w-12 text-primary" />}
              />
            }
          />

          {/* Reports & Analytics Routes */}
          <Route
            path="/reports-upload"
            element={
              <PlaceholderPage
                title="Reports Upload"
                description="Upload and manage your medical reports and test results."
                icon={<Upload className="h-12 w-12 text-primary" />}
              />
            }
          />
          <Route
            path="/progress-tracker"
            element={
              <PlaceholderPage
                title="Progress Tracker"
                description="Track your health metrics and view detailed analytics."
                icon={<BarChart className="h-12 w-12 text-primary" />}
              />
            }
          />

          {/* Community & Support Routes */}
          <Route
            path="/community"
            element={
              <PlaceholderPage
                title="Community Forum"
                description="Connect with other users and share health experiences."
                icon={<Users className="h-12 w-12 text-primary" />}
              />
            }
          />
          <Route
            path="/help"
            element={
              <PlaceholderPage
                title="Help & FAQ"
                description="Find answers to common questions and get support."
                icon={<HelpCircle className="h-12 w-12 text-primary" />}
              />
            }
          />
          <Route
            path="/about"
            element={
              <PlaceholderPage
                title="About HealPulse"
                description="Learn about our mission to revolutionize healthcare with AI."
                icon={<Info className="h-12 w-12 text-primary" />}
              />
            }
          />
          <Route
            path="/contact"
            element={
              <PlaceholderPage
                title="Contact & Support"
                description="Get in touch with our support team for assistance."
                icon={<Phone className="h-12 w-12 text-primary" />}
              />
            }
          />

          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
