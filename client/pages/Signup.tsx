import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import {
  Heart,
  ArrowLeft,
  ArrowRight,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  Calendar,
  MapPin,
  Chrome,
  Apple,
  Brain,
  Sparkles,
  Shield,
  Zap,
  CheckCircle,
  AlertCircle,
  Loader2,
  Camera,
  Upload,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface FormData {
  // Step 1: Account Info
  email: string;
  password: string;
  confirmPassword: string;

  // Step 2: Personal Info
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
  address: string;

  // Step 3: Health Profile
  bloodType: string;
  height: string;
  weight: string;
  allergies: string[];
  medications: string[];
  medicalConditions: string[];
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };

  // Step 4: Preferences
  notifications: {
    medication: boolean;
    appointments: boolean;
    healthTips: boolean;
    emergencyAlerts: boolean;
  };
  privacyLevel: "public" | "private" | "healthcare-only";
  profilePicture?: File;
}

export default function Signup() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phone: "",
    address: "",
    bloodType: "",
    height: "",
    weight: "",
    allergies: [],
    medications: [],
    medicalConditions: [],
    emergencyContact: {
      name: "",
      phone: "",
      relationship: "",
    },
    notifications: {
      medication: true,
      appointments: true,
      healthTips: true,
      emergencyAlerts: true,
    },
    privacyLevel: "private",
  });

  const totalSteps = 4;

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const commonAllergies = [
    "Peanuts",
    "Shellfish",
    "Dairy",
    "Eggs",
    "Soy",
    "Wheat",
    "Tree Nuts",
    "Fish",
  ];
  const relationships = [
    "Spouse",
    "Parent",
    "Sibling",
    "Child",
    "Friend",
    "Other",
  ];

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.email) newErrors.email = "Email is required";
        if (!/\S+@\S+\.\S+/.test(formData.email))
          newErrors.email = "Email is invalid";
        if (!formData.password) newErrors.password = "Password is required";
        if (formData.password.length < 8)
          newErrors.password = "Password must be at least 8 characters";
        if (formData.password !== formData.confirmPassword)
          newErrors.confirmPassword = "Passwords don't match";
        break;
      case 2:
        if (!formData.firstName) newErrors.firstName = "First name is required";
        if (!formData.lastName) newErrors.lastName = "Last name is required";
        if (!formData.dateOfBirth)
          newErrors.dateOfBirth = "Date of birth is required";
        if (!formData.phone) newErrors.phone = "Phone number is required";
        break;
      case 3:
        if (!formData.emergencyContact.name)
          newErrors.emergencyContactName = "Emergency contact name is required";
        if (!formData.emergencyContact.phone)
          newErrors.emergencyContactPhone =
            "Emergency contact phone is required";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          dateOfBirth: formData.dateOfBirth,
        }),
      });
      if (response.ok) {
        window.location.href = "/login";
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

  const addArrayItem = (field: keyof FormData, item: string) => {
    const currentArray = formData[field] as string[];
    if (!currentArray.includes(item)) {
      updateFormData(field, [...currentArray, item]);
    }
  };

  const removeArrayItem = (field: keyof FormData, item: string) => {
    const currentArray = formData[field] as string[];
    updateFormData(
      field,
      currentArray.filter((i) => i !== item),
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateFormData("profilePicture", file);
    }
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
                  Join the Health Revolution
                </div>
              </div>
            </Link>

            <Link to="/login">
              <Button variant="ghost" className="glass-button">
                Already have an account? Sign in
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Progress Header */}
          <div className="text-center mb-8 fade-in">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Create Your Account
            </h1>
            <p className="text-foreground/70 mb-8">
              Join thousands of users transforming their health journey with AI
            </p>

            {/* Progress Bar */}
            <GlassCard variant="primary" size="sm" className="mb-8">
              <div className="flex items-center justify-between">
                {Array.from({ length: totalSteps }, (_, i) => (
                  <div key={i} className="flex items-center">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300",
                        i + 1 <= currentStep
                          ? "bg-primary text-white"
                          : "bg-foreground/20 text-foreground/50",
                      )}
                    >
                      {i + 1 <= currentStep ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        i + 1
                      )}
                    </div>
                    {i < totalSteps - 1 && (
                      <div
                        className={cn(
                          "w-16 h-1 mx-2 rounded-full transition-all duration-300",
                          i + 1 < currentStep
                            ? "bg-primary"
                            : "bg-foreground/20",
                        )}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="text-center mt-4">
                <p className="text-sm text-foreground/60">
                  Step {currentStep} of {totalSteps}:{" "}
                  {
                    [
                      "Account Setup",
                      "Personal Info",
                      "Health Profile",
                      "Preferences",
                    ][currentStep - 1]
                  }
                </p>
              </div>
            </GlassCard>
          </div>

          {/* Form Steps */}
          <GlassCard
            variant="default"
            size="lg"
            hover="lift"
            className="slide-up"
          >
            {/* Step 1: Account Setup */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-neon-gradient rounded-full flex items-center justify-center mx-auto mb-4 glow">
                    <Mail className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Account Setup
                  </h2>
                  <p className="text-foreground/70">
                    Create your secure HealPulse account
                  </p>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary/60" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      placeholder="Enter your email"
                      className={cn(
                        "w-full pl-10 pr-4 py-3 bg-primary/10 border rounded-2xl outline-none transition-all duration-300",
                        errors.email
                          ? "border-health-red"
                          : "border-primary/30 focus:border-primary",
                      )}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-health-red">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary/60" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        updateFormData("password", e.target.value)
                      }
                      placeholder="Create a strong password"
                      className={cn(
                        "w-full pl-10 pr-12 py-3 bg-primary/10 border rounded-2xl outline-none transition-all duration-300",
                        errors.password
                          ? "border-health-red"
                          : "border-primary/30 focus:border-primary",
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary/60"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-health-red">{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary/60" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        updateFormData("confirmPassword", e.target.value)
                      }
                      placeholder="Confirm your password"
                      className={cn(
                        "w-full pl-10 pr-12 py-3 bg-primary/10 border rounded-2xl outline-none transition-all duration-300",
                        errors.confirmPassword
                          ? "border-health-red"
                          : "border-primary/30 focus:border-primary",
                      )}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary/60"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-health-red">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Social Signup */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-primary/20" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-background text-foreground/60">
                      Or sign up with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="glass-button py-3">
                    <Chrome className="h-5 w-5 mr-2" />
                    Google
                  </Button>
                  <Button variant="outline" className="glass-button py-3">
                    <Apple className="h-5 w-5 mr-2" />
                    Apple
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Personal Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-cyber-gradient rounded-full flex items-center justify-center mx-auto mb-4 glow">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Personal Information
                  </h2>
                  <p className="text-foreground/70">Tell us about yourself</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) =>
                        updateFormData("firstName", e.target.value)
                      }
                      placeholder="John"
                      className={cn(
                        "w-full px-4 py-3 bg-primary/10 border rounded-2xl outline-none transition-all duration-300",
                        errors.firstName
                          ? "border-health-red"
                          : "border-primary/30 focus:border-primary",
                      )}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-health-red">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) =>
                        updateFormData("lastName", e.target.value)
                      }
                      placeholder="Doe"
                      className={cn(
                        "w-full px-4 py-3 bg-primary/10 border rounded-2xl outline-none transition-all duration-300",
                        errors.lastName
                          ? "border-health-red"
                          : "border-primary/30 focus:border-primary",
                      )}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-health-red">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary/60" />
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) =>
                        updateFormData("dateOfBirth", e.target.value)
                      }
                      className={cn(
                        "w-full pl-10 pr-4 py-3 bg-primary/10 border rounded-2xl outline-none transition-all duration-300",
                        errors.dateOfBirth
                          ? "border-health-red"
                          : "border-primary/30 focus:border-primary",
                      )}
                    />
                  </div>
                  {errors.dateOfBirth && (
                    <p className="text-sm text-health-red">
                      {errors.dateOfBirth}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary/60" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateFormData("phone", e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className={cn(
                        "w-full pl-10 pr-4 py-3 bg-primary/10 border rounded-2xl outline-none transition-all duration-300",
                        errors.phone
                          ? "border-health-red"
                          : "border-primary/30 focus:border-primary",
                      )}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-sm text-health-red">{errors.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-primary/60" />
                    <textarea
                      value={formData.address}
                      onChange={(e) =>
                        updateFormData("address", e.target.value)
                      }
                      placeholder="123 Main St, City, State, ZIP"
                      rows={3}
                      className="w-full pl-10 pr-4 py-3 bg-primary/10 border border-primary/30 rounded-2xl outline-none focus:border-primary transition-all duration-300 resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Health Profile */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-health-gradient rounded-full flex items-center justify-center mx-auto mb-4 glow">
                    <Heart className="h-8 w-8 text-white heartbeat" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Health Profile
                  </h2>
                  <p className="text-foreground/70">
                    Help us personalize your care
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Blood Type
                    </label>
                    <select
                      value={formData.bloodType}
                      onChange={(e) =>
                        updateFormData("bloodType", e.target.value)
                      }
                      className="w-full px-4 py-3 bg-primary/10 border border-primary/30 rounded-2xl outline-none focus:border-primary transition-all duration-300"
                    >
                      <option value="">Select</option>
                      {bloodTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Height (ft)
                    </label>
                    <input
                      type="text"
                      value={formData.height}
                      onChange={(e) => updateFormData("height", e.target.value)}
                      placeholder="5'10''"
                      className="w-full px-4 py-3 bg-primary/10 border border-primary/30 rounded-2xl outline-none focus:border-primary transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Weight (lbs)
                    </label>
                    <input
                      type="text"
                      value={formData.weight}
                      onChange={(e) => updateFormData("weight", e.target.value)}
                      placeholder="150"
                      className="w-full px-4 py-3 bg-primary/10 border border-primary/30 rounded-2xl outline-none focus:border-primary transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Allergies */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Allergies
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {commonAllergies.map((allergy) => (
                      <Button
                        key={allergy}
                        type="button"
                        variant={
                          formData.allergies.includes(allergy)
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() =>
                          formData.allergies.includes(allergy)
                            ? removeArrayItem("allergies", allergy)
                            : addArrayItem("allergies", allergy)
                        }
                        className="text-xs"
                      >
                        {allergy}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    Emergency Contact
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Name
                      </label>
                      <input
                        type="text"
                        value={formData.emergencyContact.name}
                        onChange={(e) =>
                          updateFormData("emergencyContact", {
                            ...formData.emergencyContact,
                            name: e.target.value,
                          })
                        }
                        placeholder="Contact name"
                        className={cn(
                          "w-full px-4 py-3 bg-primary/10 border rounded-2xl outline-none transition-all duration-300",
                          errors.emergencyContactName
                            ? "border-health-red"
                            : "border-primary/30 focus:border-primary",
                        )}
                      />
                      {errors.emergencyContactName && (
                        <p className="text-sm text-health-red">
                          {errors.emergencyContactName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.emergencyContact.phone}
                        onChange={(e) =>
                          updateFormData("emergencyContact", {
                            ...formData.emergencyContact,
                            phone: e.target.value,
                          })
                        }
                        placeholder="Contact phone"
                        className={cn(
                          "w-full px-4 py-3 bg-primary/10 border rounded-2xl outline-none transition-all duration-300",
                          errors.emergencyContactPhone
                            ? "border-health-red"
                            : "border-primary/30 focus:border-primary",
                        )}
                      />
                      {errors.emergencyContactPhone && (
                        <p className="text-sm text-health-red">
                          {errors.emergencyContactPhone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Relationship
                    </label>
                    <select
                      value={formData.emergencyContact.relationship}
                      onChange={(e) =>
                        updateFormData("emergencyContact", {
                          ...formData.emergencyContact,
                          relationship: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-primary/10 border border-primary/30 rounded-2xl outline-none focus:border-primary transition-all duration-300"
                    >
                      <option value="">Select relationship</option>
                      {relationships.map((rel) => (
                        <option key={rel} value={rel}>
                          {rel}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Preferences */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-neon-gradient rounded-full flex items-center justify-center mx-auto mb-4 glow">
                    <Sparkles className="h-8 w-8 text-white animate-pulse" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Preferences
                  </h2>
                  <p className="text-foreground/70">
                    Customize your HealPulse experience
                  </p>
                </div>

                {/* Profile Picture */}
                <div className="space-y-4">
                  <label className="text-sm font-medium text-foreground">
                    Profile Picture (Optional)
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                      {formData.profilePicture ? (
                        <img
                          src={URL.createObjectURL(formData.profilePicture)}
                          alt="Profile"
                          className="w-20 h-20 rounded-full object-cover"
                        />
                      ) : (
                        <Camera className="h-8 w-8 text-primary/60" />
                      )}
                    </div>
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="profile-upload"
                      />
                      <label htmlFor="profile-upload">
                        <Button
                          type="button"
                          variant="outline"
                          className="glass-button cursor-pointer"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Photo
                        </Button>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Notifications */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    Notification Preferences
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(formData.notifications).map(
                      ([key, value]) => (
                        <label
                          key={key}
                          className="flex items-center justify-between cursor-pointer"
                        >
                          <span className="text-sm text-foreground capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </span>
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) =>
                              updateFormData("notifications", {
                                ...formData.notifications,
                                [key]: e.target.checked,
                              })
                            }
                            className="w-4 h-4 text-primary rounded border-primary/30"
                          />
                        </label>
                      ),
                    )}
                  </div>
                </div>

                {/* Privacy Level */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    Privacy Level
                  </h3>
                  <div className="space-y-2">
                    {[
                      {
                        value: "private",
                        label: "Private",
                        desc: "Only you can see your data",
                      },
                      {
                        value: "healthcare-only",
                        label: "Healthcare Only",
                        desc: "Share with healthcare providers only",
                      },
                      {
                        value: "public",
                        label: "Public",
                        desc: "Anonymized data for research",
                      },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center space-x-3 cursor-pointer p-3 rounded-2xl hover:bg-primary/5 transition-colors"
                      >
                        <input
                          type="radio"
                          name="privacy"
                          value={option.value}
                          checked={formData.privacyLevel === option.value}
                          onChange={(e) =>
                            updateFormData("privacyLevel", e.target.value)
                          }
                          className="w-4 h-4 text-primary"
                        />
                        <div>
                          <div className="font-medium text-foreground">
                            {option.label}
                          </div>
                          <div className="text-sm text-foreground/70">
                            {option.desc}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8 border-t border-primary/20">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrev}
                disabled={currentStep === 1}
                className="glass-button"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="button-health"
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="button-cyber text-black"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Create Account
                    </>
                  )}
                </Button>
              )}
            </div>
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
                <p className="text-xs text-foreground/70">AI Protected</p>
              </div>
            </GlassCard>

            <GlassCard variant="primary" size="sm" hover="lift">
              <div className="text-center space-y-2">
                <Brain className="h-6 w-6 text-primary mx-auto animate-pulse" />
                <p className="text-xs text-foreground/70">Smart Insights</p>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
