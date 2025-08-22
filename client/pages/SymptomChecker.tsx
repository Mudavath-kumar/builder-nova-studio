import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import {
  Heart,
  ArrowLeft,
  Brain,
  Search,
  Plus,
  X,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Activity,
  Thermometer,
  Zap,
  Shield,
  Stethoscope,
  User,
  MapPin,
  Target,
  Sparkles,
  Bot,
  Mic,
  Phone,
  Calendar,
  Star,
  Award,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Symptom {
  id: string;
  name: string;
  severity: "mild" | "moderate" | "severe";
  bodyPart: string;
  duration: string;
  description?: string;
}

interface BodyPart {
  id: string;
  name: string;
  position: { x: number; y: number };
  symptoms: string[];
  isActive: boolean;
}

interface AnalysisResult {
  condition: string;
  probability: number;
  severity: "low" | "medium" | "high";
  recommendations: string[];
  nextSteps: string[];
}

export default function SymptomChecker() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState<
    "selection" | "details" | "analysis" | "results"
  >("selection");

  const bodyParts: BodyPart[] = [
    {
      id: "head",
      name: "Head",
      position: { x: 50, y: 15 },
      symptoms: ["headache", "dizziness", "fatigue"],
      isActive: false,
    },
    {
      id: "neck",
      name: "Neck",
      position: { x: 50, y: 25 },
      symptoms: ["neck pain", "stiffness"],
      isActive: false,
    },
    {
      id: "chest",
      name: "Chest",
      position: { x: 50, y: 40 },
      symptoms: ["chest pain", "shortness of breath"],
      isActive: false,
    },
    {
      id: "left-arm",
      name: "Left Arm",
      position: { x: 25, y: 45 },
      symptoms: ["arm pain", "numbness"],
      isActive: false,
    },
    {
      id: "right-arm",
      name: "Right Arm",
      position: { x: 75, y: 45 },
      symptoms: ["arm pain", "numbness"],
      isActive: false,
    },
    {
      id: "abdomen",
      name: "Abdomen",
      position: { x: 50, y: 55 },
      symptoms: ["stomach pain", "nausea"],
      isActive: false,
    },
    {
      id: "left-leg",
      name: "Left Leg",
      position: { x: 40, y: 80 },
      symptoms: ["leg pain", "swelling"],
      isActive: false,
    },
    {
      id: "right-leg",
      name: "Right Leg",
      position: { x: 60, y: 80 },
      symptoms: ["leg pain", "swelling"],
      isActive: false,
    },
  ];

  const commonSymptoms = [
    "Headache",
    "Fever",
    "Cough",
    "Fatigue",
    "Nausea",
    "Dizziness",
    "Chest Pain",
    "Shortness of Breath",
    "Back Pain",
    "Joint Pain",
    "Sore Throat",
    "Runny Nose",
    "Stomach Pain",
    "Diarrhea",
    "Muscle Aches",
    "Skin Rash",
    "Sleep Issues",
    "Anxiety",
  ];

  const severityColors = {
    mild: "text-cyber-green",
    moderate: "text-warning-orange",
    severe: "text-health-red",
  };

  const priorityColors = {
    low: "bg-cyber-green/20 text-cyber-green",
    medium: "bg-warning-orange/20 text-warning-orange",
    high: "bg-health-red/20 text-health-red",
  };

  // Simulate AI analysis
  const performAnalysis = () => {
    setIsAnalyzing(true);
    setCurrentStep("analysis");

    setTimeout(() => {
      const mockResults: AnalysisResult[] = [
        {
          condition: "Upper Respiratory Infection",
          probability: 78,
          severity: "low",
          recommendations: [
            "Stay hydrated with plenty of fluids",
            "Get adequate rest (7-8 hours)",
            "Use a humidifier to ease breathing",
            "Consider over-the-counter pain relievers",
          ],
          nextSteps: [
            "Monitor symptoms for 3-5 days",
            "Consult doctor if symptoms worsen",
            "Return to normal activities gradually",
          ],
        },
        {
          condition: "Tension Headache",
          probability: 65,
          severity: "low",
          recommendations: [
            "Apply cold or warm compress",
            "Practice relaxation techniques",
            "Ensure proper posture",
            "Limit screen time",
          ],
          nextSteps: [
            "Track headache patterns",
            "Identify potential triggers",
            "See doctor if headaches persist",
          ],
        },
        {
          condition: "Viral Syndrome",
          probability: 45,
          severity: "medium",
          recommendations: [
            "Complete rest for 24-48 hours",
            "Maintain good nutrition",
            "Avoid contact with others",
            "Monitor temperature regularly",
          ],
          nextSteps: [
            "Quarantine if necessary",
            "Contact healthcare provider if fever >101°F",
            "Follow up in 1 week",
          ],
        },
      ];

      setAnalysisResults(mockResults);
      setIsAnalyzing(false);
      setCurrentStep("results");
    }, 3000);
  };

  const addSymptom = (symptomName: string) => {
    const newSymptom: Symptom = {
      id: Date.now().toString(),
      name: symptomName,
      severity: "mild",
      bodyPart: selectedBodyPart || "general",
      duration: "1-2 days",
      description: "",
    };
    setSelectedSymptoms([...selectedSymptoms, newSymptom]);
    setSearchTerm("");
  };

  const removeSymptom = (id: string) => {
    setSelectedSymptoms(selectedSymptoms.filter((s) => s.id !== id));
  };

  const updateSymptomSeverity = (id: string, severity: Symptom["severity"]) => {
    setSelectedSymptoms(
      selectedSymptoms.map((s) => (s.id === id ? { ...s, severity } : s)),
    );
  };

  const filteredSymptoms = commonSymptoms.filter(
    (symptom) =>
      symptom.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedSymptoms.some(
        (s) => s.name.toLowerCase() === symptom.toLowerCase(),
      ),
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-neon-gradient rounded-full opacity-5 blur-3xl animate-float top-20 right-20" />
        <div
          className="absolute w-64 h-64 bg-health-gradient rounded-full opacity-5 blur-3xl animate-float bottom-20 left-20"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="ghost" className="glass-button">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>

              <div className="flex items-center space-x-3">
                <div className="p-3 bg-neon-gradient rounded-3xl glow">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    AI Symptom Checker
                  </h1>
                  <p className="text-sm text-foreground/60">
                    Advanced medical AI analysis
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <GlassCard variant="primary" size="sm" className="px-4 py-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-cyber-green rounded-full animate-pulse" />
                  <span className="text-sm font-medium">AI Online</span>
                </div>
              </GlassCard>

              <Button className="button-health">
                <Phone className="h-4 w-4 mr-2" />
                Emergency
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <GlassCard variant="primary" size="sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {["selection", "details", "analysis", "results"].map(
                  (step, index) => (
                    <div key={step} className="flex items-center space-x-2">
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300",
                          currentStep === step
                            ? "bg-primary text-white animate-pulse"
                            : index <
                                [
                                  "selection",
                                  "details",
                                  "analysis",
                                  "results",
                                ].indexOf(currentStep)
                              ? "bg-cyber-green text-white"
                              : "bg-foreground/20 text-foreground/50",
                        )}
                      >
                        {index + 1}
                      </div>
                      <span
                        className={cn(
                          "text-sm font-medium capitalize",
                          currentStep === step
                            ? "text-primary"
                            : "text-foreground/60",
                        )}
                      >
                        {step}
                      </span>
                      {index < 3 && (
                        <div
                          className={cn(
                            "w-8 h-1 rounded-full ml-4",
                            index <
                              [
                                "selection",
                                "details",
                                "analysis",
                                "results",
                              ].indexOf(currentStep)
                              ? "bg-cyber-green"
                              : "bg-foreground/20",
                          )}
                        />
                      )}
                    </div>
                  ),
                )}
              </div>
            </div>
          </GlassCard>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Body Map */}
          <div className="space-y-6">
            <GlassCard variant="neon" size="lg" hover="lift">
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-foreground flex items-center">
                  <User className="h-5 w-5 mr-2 text-neon-blue" />
                  Interactive Body Map
                </h2>

                {/* Body Diagram */}
                <div className="relative aspect-[3/4] bg-gradient-to-b from-neon-blue/10 to-deep-purple/10 rounded-3xl border border-neon-blue/30">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* Body outline */}
                    <ellipse
                      cx="50"
                      cy="15"
                      rx="8"
                      ry="10"
                      className="fill-primary/20 stroke-primary stroke-2"
                    />
                    <rect
                      x="45"
                      y="25"
                      width="10"
                      height="15"
                      className="fill-primary/20 stroke-primary stroke-2"
                      rx="2"
                    />
                    <rect
                      x="43"
                      y="40"
                      width="14"
                      height="20"
                      className="fill-primary/20 stroke-primary stroke-2"
                      rx="3"
                    />
                    <rect
                      x="20"
                      y="35"
                      width="8"
                      height="20"
                      className="fill-primary/20 stroke-primary stroke-2"
                      rx="4"
                    />
                    <rect
                      x="72"
                      y="35"
                      width="8"
                      height="20"
                      className="fill-primary/20 stroke-primary stroke-2"
                      rx="4"
                    />
                    <rect
                      x="46"
                      y="60"
                      width="8"
                      height="15"
                      className="fill-primary/20 stroke-primary stroke-2"
                      rx="2"
                    />
                    <rect
                      x="38"
                      y="75"
                      width="8"
                      height="20"
                      className="fill-primary/20 stroke-primary stroke-2"
                      rx="4"
                    />
                    <rect
                      x="54"
                      y="75"
                      width="8"
                      height="20"
                      className="fill-primary/20 stroke-primary stroke-2"
                      rx="4"
                    />

                    {/* Interactive body parts */}
                    {bodyParts.map((part) => (
                      <circle
                        key={part.id}
                        cx={part.position.x}
                        cy={part.position.y}
                        r="6"
                        className={cn(
                          "cursor-pointer transition-all duration-300 hover:scale-150",
                          selectedBodyPart === part.id
                            ? "fill-health-red animate-pulse"
                            : selectedSymptoms.some(
                                  (s) => s.bodyPart === part.id,
                                )
                              ? "fill-warning-orange animate-bounce"
                              : "fill-cyber-green hover:fill-neon-blue",
                        )}
                        onClick={() =>
                          setSelectedBodyPart(
                            selectedBodyPart === part.id ? null : part.id,
                          )
                        }
                      />
                    ))}
                  </svg>

                  {/* Body part labels */}
                  {selectedBodyPart && (
                    <div className="absolute top-4 left-4 right-4">
                      <GlassCard variant="primary" size="sm">
                        <div className="text-center">
                          <h3 className="font-semibold text-primary">
                            {
                              bodyParts.find((p) => p.id === selectedBodyPart)
                                ?.name
                            }
                          </h3>
                          <p className="text-xs text-foreground/60">
                            Click to add symptoms
                          </p>
                        </div>
                      </GlassCard>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs text-foreground/60">
                    <div className="w-3 h-3 bg-cyber-green rounded-full" />
                    <span>Normal</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-foreground/60">
                    <div className="w-3 h-3 bg-warning-orange rounded-full" />
                    <span>Has symptoms</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-foreground/60">
                    <div className="w-3 h-3 bg-health-red rounded-full" />
                    <span>Selected area</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Middle Panel - Symptom Selection */}
          <div className="space-y-6">
            {currentStep === "selection" && (
              <GlassCard variant="primary" size="lg">
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-foreground flex items-center">
                    <Search className="h-5 w-5 mr-2 text-primary" />
                    Select Symptoms
                  </h2>

                  {/* Search Input */}
                  <div className="relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search symptoms..."
                      className="w-full p-4 bg-primary/10 border border-primary/30 rounded-2xl outline-none focus:border-primary transition-all duration-300"
                    />
                    <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary/60" />
                  </div>

                  {/* Common Symptoms */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-foreground">
                      Common Symptoms
                    </h3>
                    <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto custom-scrollbar">
                      {filteredSymptoms.map((symptom) => (
                        <Button
                          key={symptom}
                          variant="outline"
                          size="sm"
                          onClick={() => addSymptom(symptom)}
                          className="glass-button justify-start text-left h-auto py-3"
                        >
                          <Plus className="h-4 w-4 mr-2 text-primary" />
                          {symptom}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {selectedSymptoms.length > 0 && (
                    <Button
                      onClick={() => setCurrentStep("details")}
                      className="w-full button-health"
                    >
                      Continue to Details
                      <Target className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </GlassCard>
            )}

            {currentStep === "details" && (
              <GlassCard variant="accent" size="lg">
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-foreground flex items-center">
                    <Activity className="h-5 w-5 mr-2 text-accent" />
                    Symptom Details
                  </h2>

                  <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
                    {selectedSymptoms.map((symptom) => (
                      <GlassCard key={symptom.id} variant="primary" size="sm">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-foreground">
                              {symptom.name}
                            </h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeSymptom(symptom.id)}
                              className="text-health-red hover:bg-health-red/20"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>

                          <div>
                            <label className="text-sm font-medium text-foreground/70">
                              Severity
                            </label>
                            <div className="flex space-x-2 mt-1">
                              {(["mild", "moderate", "severe"] as const).map(
                                (severity) => (
                                  <Button
                                    key={severity}
                                    variant={
                                      symptom.severity === severity
                                        ? "default"
                                        : "outline"
                                    }
                                    size="sm"
                                    onClick={() =>
                                      updateSymptomSeverity(
                                        symptom.id,
                                        severity,
                                      )
                                    }
                                    className={cn(
                                      "capitalize",
                                      symptom.severity === severity &&
                                        {
                                          mild: "bg-cyber-green text-white",
                                          moderate:
                                            "bg-warning-orange text-white",
                                          severe: "bg-health-red text-white",
                                        }[severity],
                                    )}
                                  >
                                    {severity}
                                  </Button>
                                ),
                              )}
                            </div>
                          </div>
                        </div>
                      </GlassCard>
                    ))}
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep("selection")}
                      className="flex-1 glass-button"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back
                    </Button>
                    <Button
                      onClick={performAnalysis}
                      className="flex-1 button-cyber text-black"
                    >
                      <Brain className="h-4 w-4 mr-2" />
                      Analyze Symptoms
                    </Button>
                  </div>
                </div>
              </GlassCard>
            )}

            {currentStep === "analysis" && (
              <GlassCard variant="neon" size="lg" className="text-center">
                <div className="space-y-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-neon-gradient rounded-full flex items-center justify-center mx-auto animate-pulse">
                      <Brain className="h-12 w-12 text-white" />
                    </div>
                    <div className="absolute inset-0 bg-neon-gradient rounded-full opacity-30 animate-ping" />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      Analyzing Your Symptoms
                    </h2>
                    <p className="text-foreground/70">
                      Our advanced AI is processing your symptoms using medical
                      databases and machine learning algorithms...
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm text-foreground/60">
                      Processing medical knowledge base...
                    </div>
                    <div className="w-full bg-primary/20 rounded-full h-2">
                      <div
                        className="bg-neon-gradient rounded-full h-2 animate-pulse"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                </div>
              </GlassCard>
            )}

            {currentStep === "results" && (
              <div className="space-y-6">
                <GlassCard variant="primary" size="lg">
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-foreground flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-cyber-green" />
                      Analysis Complete
                    </h2>

                    <div className="text-center p-6 bg-cyber-green/10 rounded-2xl border border-cyber-green/30">
                      <Award className="h-8 w-8 text-cyber-green mx-auto mb-2" />
                      <p className="text-cyber-green font-semibold">
                        Analysis completed with 98.7% confidence
                      </p>
                    </div>
                  </div>
                </GlassCard>

                <div className="flex space-x-4">
                  <Button
                    onClick={() => {
                      setCurrentStep("selection");
                      setSelectedSymptoms([]);
                      setAnalysisResults([]);
                    }}
                    variant="outline"
                    className="flex-1 glass-button"
                  >
                    New Analysis
                  </Button>
                  <Link to="/ai-chat" className="flex-1">
                    <Button className="w-full button-health">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Discuss with AI
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Selected Symptoms & Results */}
          <div className="space-y-6">
            {/* Selected Symptoms */}
            <GlassCard variant="default" size="lg">
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-foreground flex items-center">
                  <Target className="h-5 w-5 mr-2 text-primary" />
                  Selected Symptoms ({selectedSymptoms.length})
                </h2>

                {selectedSymptoms.length === 0 ? (
                  <div className="text-center py-8 text-foreground/50">
                    <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No symptoms selected yet</p>
                    <p className="text-sm">
                      Click on the body map or search for symptoms
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                    {selectedSymptoms.map((symptom) => (
                      <div
                        key={symptom.id}
                        className="p-3 bg-primary/5 rounded-2xl border border-primary/20"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-foreground">
                              {symptom.name}
                            </h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <span
                                className={cn(
                                  "text-xs font-medium",
                                  severityColors[symptom.severity],
                                )}
                              >
                                {symptom.severity}
                              </span>
                              <span className="text-xs text-foreground/60">
                                •
                              </span>
                              <span className="text-xs text-foreground/60">
                                {symptom.bodyPart}
                              </span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSymptom(symptom.id)}
                            className="text-health-red hover:bg-health-red/20"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </GlassCard>

            {/* Analysis Results */}
            {analysisResults.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-foreground flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-neon-blue" />
                  Possible Conditions
                </h2>

                {analysisResults.map((result, index) => (
                  <GlassCard
                    key={index}
                    variant="neon"
                    size="default"
                    hover="lift"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-foreground">
                          {result.condition}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-neon-blue">
                            {result.probability}%
                          </span>
                          <div
                            className={cn(
                              "px-2 py-1 rounded-full text-xs font-medium",
                              priorityColors[result.severity],
                            )}
                          >
                            {result.severity} priority
                          </div>
                        </div>
                      </div>

                      <div className="w-full bg-neon-blue/20 rounded-full h-2">
                        <div
                          className="bg-neon-gradient rounded-full h-2 transition-all duration-1000"
                          style={{ width: `${result.probability}%` }}
                        />
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-foreground text-sm mb-2">
                            Recommendations:
                          </h4>
                          <ul className="space-y-1">
                            {result.recommendations
                              .slice(0, 2)
                              .map((rec, i) => (
                                <li
                                  key={i}
                                  className="text-xs text-foreground/70 flex items-start"
                                >
                                  <CheckCircle className="h-3 w-3 text-cyber-green mr-2 mt-0.5 flex-shrink-0" />
                                  {rec}
                                </li>
                              ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-foreground text-sm mb-2">
                            Next Steps:
                          </h4>
                          <ul className="space-y-1">
                            {result.nextSteps.slice(0, 2).map((step, i) => (
                              <li
                                key={i}
                                className="text-xs text-foreground/70 flex items-start"
                              >
                                <Clock className="h-3 w-3 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                {step}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                ))}

                <GlassCard
                  variant="health"
                  size="sm"
                  className="bg-health-red/10 border-health-red/30"
                >
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-health-red mt-1" />
                    <div>
                      <p className="text-sm text-health-red font-medium">
                        Medical Disclaimer
                      </p>
                      <p className="text-xs text-health-red/80">
                        This AI analysis is for informational purposes only.
                        Always consult with a healthcare professional for proper
                        diagnosis and treatment.
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
