import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { 
  Heart, 
  ArrowLeft, 
  Phone,
  MapPin,
  Shield,
  AlertTriangle,
  Clock,
  Users,
  Navigation,
  Zap,
  Activity,
  Stethoscope,
  Thermometer,
  Droplets,
  Wind,
  Flame,
  Scissors,
  Bandage,
  Eye,
  Brain,
  Sparkles,
  Target,
  CheckCircle,
  AlertCircle,
  Loader2,
  Volume2,
  Mic,
  Camera,
  Share2,
  Download,
  Star,
  Award
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  priority: number;
}

interface EmergencyProcedure {
  id: string;
  title: string;
  category: 'cpr' | 'burns' | 'fractures' | 'choking' | 'bleeding' | 'poisoning';
  icon: React.ComponentType<any>;
  color: string;
  steps: string[];
  warnings: string[];
  duration: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export default function Emergency() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [selectedProcedure, setSelectedProcedure] = useState<EmergencyProcedure | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [sosPressed, setSosPressed] = useState(false);

  const emergencyContacts: EmergencyContact[] = [
    { id: '1', name: 'Emergency Services', phone: '911', relationship: 'Emergency', priority: 1 },
    { id: '2', name: 'John Doe', phone: '+1 (555) 123-4567', relationship: 'Spouse', priority: 2 },
    { id: '3', name: 'Jane Smith', phone: '+1 (555) 987-6543', relationship: 'Parent', priority: 3 },
    { id: '4', name: 'Medical Center', phone: '+1 (555) 234-5678', relationship: 'Doctor', priority: 4 }
  ];

  const emergencyProcedures: EmergencyProcedure[] = [
    {
      id: '1',
      title: 'CPR (Adult)',
      category: 'cpr',
      icon: Heart,
      color: 'text-health-red',
      duration: '2-3 minutes',
      difficulty: 'hard',
      steps: [
        'Check if person is responsive - tap shoulders and shout "Are you okay?"',
        'Call 911 immediately or have someone else do it',
        'Position person on back on firm surface, tilt head back slightly',
        'Place heel of one hand on center of chest between nipples',
        'Place other hand on top, interlacing fingers',
        'Push hard and fast at least 2 inches deep at 100-120 compressions per minute',
        'Allow complete chest recoil between compressions',
        'Give 30 compressions, then 2 rescue breaths',
        'Continue cycles of 30:2 until help arrives or person responds'
      ],
      warnings: [
        'Do not stop CPR unless person starts breathing normally',
        'Switch with another person every 2 minutes to avoid fatigue',
        'Do not be afraid to push hard - broken ribs heal, but brain damage is permanent'
      ]
    },
    {
      id: '2',
      title: 'Severe Burns',
      category: 'burns',
      icon: Flame,
      color: 'text-warning-orange',
      duration: '5-10 minutes',
      difficulty: 'medium',
      steps: [
        'Remove person from heat source if safe to do so',
        'Call 911 for severe burns (larger than palm of hand)',
        'Remove any jewelry or tight clothing near burned area',
        'Cool the burn with lukewarm water for 10-20 minutes',
        'Do not use ice, butter, or other home remedies',
        'Cover burn with sterile gauze or clean cloth loosely',
        'Do not break any blisters that form',
        'Keep person warm and elevate burned area if possible',
        'Monitor for signs of shock while waiting for help'
      ],
      warnings: [
        'Never use ice on burns - it can cause more damage',
        'Do not remove clothing stuck to burned skin',
        'Seek immediate medical attention for burns on face, hands, feet, or genitals'
      ]
    },
    {
      id: '3',
      title: 'Fractures',
      category: 'fractures',
      icon: Bandage,
      color: 'text-accent',
      duration: '10-15 minutes',
      difficulty: 'medium',
      steps: [
        'Do not move the person unless in immediate danger',
        'Call 911 if fracture is severe or spine may be injured',
        'Control any bleeding with direct pressure around the wound',
        'Immobilize the injured area - do not try to realign the bone',
        'Apply ice wrapped in cloth to reduce swelling',
        'Check circulation below the injury (pulse, warmth, color)',
        'Make a splint using rigid materials if help is delayed',
        'Support the injury above and below the fracture site',
        'Monitor for signs of shock and keep person warm'
      ],
      warnings: [
        'Never try to push bone back under the skin',
        'Do not give food or water in case surgery is needed',
        'Assume spinal injury if fall was from height or high-speed accident'
      ]
    },
    {
      id: '4',
      title: 'Choking (Adult)',
      category: 'choking',
      icon: Wind,
      color: 'text-neon-blue',
      duration: '2-5 minutes',
      difficulty: 'easy',
      steps: [
        'Ask "Are you choking?" - if they can speak, encourage coughing',
        'If they cannot speak or breathe, stand behind them',
        'Wrap arms around their waist',
        'Make a fist with one hand, place thumb side against stomach above navel',
        'Grasp fist with other hand and thrust inward and upward',
        'Give 5 quick abdominal thrusts (Heimlich maneuver)',
        'Check mouth and remove visible objects with finger sweep',
        'Repeat thrusts until object is expelled or person becomes unconscious',
        'If unconscious, begin CPR and call 911'
      ],
      warnings: [
        'For pregnant women or obese people, give chest thrusts instead',
        'Do not do finger sweeps unless you can see the object',
        'Continue until object is removed or emergency services arrive'
      ]
    },
    {
      id: '5',
      title: 'Severe Bleeding',
      category: 'bleeding',
      icon: Droplets,
      color: 'text-health-red',
      duration: '5-10 minutes',
      difficulty: 'easy',
      steps: [
        'Call 911 immediately for severe bleeding',
        'Put on gloves or use barrier if available',
        'Have person lie down and elevate injured area above heart if possible',
        'Apply direct pressure to wound with clean cloth or gauze',
        'Do not remove objects embedded in wound',
        'If blood soaks through, add more layers without removing original',
        'Apply pressure to pressure points if bleeding continues',
        'Use tourniquet only as last resort for limb bleeding',
        'Monitor for shock and keep person warm'
      ],
      warnings: [
        'Never remove embedded objects - stabilize them instead',
        'Do not use tourniquet unless bleeding cannot be controlled otherwise',
        'Watch for signs of shock: pale skin, rapid pulse, confusion'
      ]
    },
    {
      id: '6',
      title: 'Poisoning',
      category: 'poisoning',
      icon: AlertTriangle,
      color: 'text-deep-purple',
      duration: '5-15 minutes',
      difficulty: 'medium',
      steps: [
        'Call Poison Control: 1-800-222-1222 or 911',
        'Try to identify the poison and keep container if safe',
        'If person is conscious, give small sips of water',
        'Do NOT induce vomiting unless specifically told to by poison control',
        'If poison is on skin, remove contaminated clothing and rinse with water',
        'If inhaled, get person to fresh air immediately',
        'If in eyes, flush with clean water for 15-20 minutes',
        'Follow specific instructions from poison control or emergency services',
        'Monitor breathing and be prepared to give CPR if needed'
      ],
      warnings: [
        'Never induce vomiting for corrosive substances or petroleum products',
        'Do not give activated charcoal unless directed by medical professionals',
        'Keep original container and bring to hospital if possible'
      ]
    }
  ];

  // Get user's location
  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser');
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setIsGettingLocation(false);
      },
      (error) => {
        let errorMessage = 'Unable to get location';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out';
            break;
        }
        setLocationError(errorMessage);
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  // Emergency SOS function
  const activateEmergencySOS = () => {
    setSosPressed(true);
    setCountdown(10);
    
    // 10-second countdown before calling
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          makeEmergencyCall();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const cancelEmergencyCall = () => {
    setSosPressed(false);
    setCountdown(0);
  };

  const makeEmergencyCall = () => {
    setIsEmergencyActive(true);
    getCurrentLocation();
    
    // Simulate emergency call
    console.log('Calling emergency services...');
    console.log('Location:', location);
    
    // In a real app, this would:
    // 1. Call emergency services
    // 2. Send SMS with location to emergency contacts
    // 3. Start recording audio/video
    // 4. Send medical information to responders
  };

  const callContact = (contact: EmergencyContact) => {
    if (typeof window !== 'undefined') {
      window.location.href = `tel:${contact.phone}`;
    }
  };

  const shareLocation = async () => {
    if (location && navigator.share) {
      try {
        await navigator.share({
          title: 'Emergency Location',
          text: 'I need help! My location is:',
          url: `https://maps.google.com/?q=${location.lat},${location.lng}`
        });
      } catch (error) {
        console.error('Error sharing location:', error);
      }
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-health-red/5 to-warning-orange/10">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-gradient-to-r from-health-red/20 to-warning-orange/20 rounded-full opacity-10 blur-3xl animate-float top-20 right-20" />
        <div className="absolute w-64 h-64 bg-gradient-to-r from-warning-orange/20 to-health-red/20 rounded-full opacity-10 blur-3xl animate-float bottom-20 left-20" style={{ animationDelay: '2s' }} />
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
                <div className="p-3 bg-gradient-to-r from-health-red to-warning-orange rounded-3xl shadow-intense">
                  <Shield className="h-8 w-8 text-white animate-pulse" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Emergency Response</h1>
                  <p className="text-sm text-foreground/60">Life-saving assistance & protocols</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <GlassCard variant="health" size="sm" className="px-4 py-2 bg-health-red/20">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-health-red rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-health-red">Emergency Mode</span>
                </div>
              </GlassCard>
              
              {location && (
                <Button
                  onClick={shareLocation}
                  variant="outline"
                  className="glass-button"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Location
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Emergency SOS Section */}
        <div className="text-center mb-12">
          <GlassCard variant="health" size="xl" className="bg-gradient-to-br from-health-red/10 to-warning-orange/10 border-health-red/30">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-foreground">Emergency SOS</h2>
                <p className="text-foreground/70 max-w-2xl mx-auto">
                  Press and hold the SOS button to automatically call emergency services and notify your emergency contacts with your location.
                </p>
              </div>

              {/* SOS Button */}
              <div className="relative">
                {!sosPressed ? (
                  <button
                    onMouseDown={activateEmergencySOS}
                    onTouchStart={activateEmergencySOS}
                    className={cn(
                      "w-48 h-48 rounded-full bg-gradient-to-br from-health-red to-warning-orange text-white font-bold text-2xl transition-all duration-300 shadow-2xl",
                      "hover:scale-110 active:scale-95 hover:shadow-health animate-pulse"
                    )}
                  >
                    <div className="absolute inset-0 rounded-full bg-health-red/50 animate-ping" />
                    <div className="relative z-10 flex flex-col items-center justify-center h-full">
                      <Shield className="h-16 w-16 mb-2" />
                      <span>EMERGENCY</span>
                      <span className="text-lg">SOS</span>
                    </div>
                  </button>
                ) : (
                  <div className="relative">
                    <div className="w-48 h-48 rounded-full bg-gradient-to-br from-health-red to-warning-orange text-white font-bold text-2xl flex flex-col items-center justify-center animate-pulse">
                      <AlertTriangle className="h-16 w-16 mb-2 animate-bounce" />
                      <span className="text-3xl">{countdown}</span>
                      <span className="text-sm">Calling in...</span>
                    </div>
                    <Button
                      onClick={cancelEmergencyCall}
                      className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-background text-foreground border-2 border-foreground"
                    >
                      Cancel Call
                    </Button>
                  </div>
                )}
              </div>

              {/* Location Status */}
              {isGettingLocation ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  <span className="text-foreground/70">Getting your location...</span>
                </div>
              ) : location ? (
                <div className="flex items-center justify-center space-x-2 text-cyber-green">
                  <MapPin className="h-5 w-5" />
                  <span>Location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}</span>
                </div>
              ) : locationError ? (
                <div className="flex items-center justify-center space-x-2 text-health-red">
                  <AlertCircle className="h-5 w-5" />
                  <span>{locationError}</span>
                  <Button
                    onClick={getCurrentLocation}
                    size="sm"
                    variant="outline"
                    className="ml-2"
                  >
                    Retry
                  </Button>
                </div>
              ) : null}
            </div>
          </GlassCard>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Emergency Contacts */}
          <div className="space-y-6">
            <GlassCard variant="health" size="lg">
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-foreground flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-health-red" />
                  Emergency Contacts
                </h2>
                
                <div className="space-y-3">
                  {emergencyContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="flex items-center justify-between p-4 bg-primary/5 rounded-2xl border border-primary/20 hover:bg-primary/10 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="font-semibold text-foreground">{contact.name}</div>
                        <div className="text-sm text-foreground/60">{contact.relationship}</div>
                        <div className="text-sm font-mono text-primary">{contact.phone}</div>
                      </div>
                      
                      <Button
                        onClick={() => callContact(contact)}
                        className={cn(
                          "rounded-2xl",
                          contact.priority === 1 
                            ? "bg-health-red hover:bg-health-red/90 text-white" 
                            : "bg-primary hover:bg-primary/90"
                        )}
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full glass-button">
                  <Users className="h-4 w-4 mr-2" />
                  Edit Contacts
                </Button>
              </div>
            </GlassCard>

            {/* Quick Actions */}
            <GlassCard variant="neon" size="default">
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-neon-blue" />
                  Quick Actions
                </h3>
                
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start glass-button">
                    <Camera className="h-4 w-4 mr-2" />
                    Start Emergency Recording
                  </Button>
                  <Button variant="outline" className="w-full justify-start glass-button">
                    <Mic className="h-4 w-4 mr-2" />
                    Voice Emergency Alert
                  </Button>
                  <Button variant="outline" className="w-full justify-start glass-button">
                    <Navigation className="h-4 w-4 mr-2" />
                    Nearest Hospital
                  </Button>
                  <Button variant="outline" className="w-full justify-start glass-button">
                    <Download className="h-4 w-4 mr-2" />
                    Medical ID Card
                  </Button>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Center Panel - Emergency Procedures */}
          <div className="lg:col-span-2 space-y-6">
            {!selectedProcedure ? (
              <div className="space-y-6">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-bold text-foreground">Emergency Procedures</h2>
                  <p className="text-foreground/70 max-w-2xl mx-auto">
                    Learn life-saving first aid techniques with step-by-step guided instructions
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {emergencyProcedures.map((procedure) => (
                    <GlassCard 
                      key={procedure.id} 
                      variant="default" 
                      size="lg" 
                      hover="intense"
                      className="card-interactive cursor-pointer"
                      onClick={() => setSelectedProcedure(procedure)}
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className={cn(
                            "p-4 rounded-2xl w-fit",
                            procedure.category === 'cpr' ? 'bg-health-red/20' :
                            procedure.category === 'burns' ? 'bg-warning-orange/20' :
                            procedure.category === 'fractures' ? 'bg-accent/20' :
                            procedure.category === 'choking' ? 'bg-neon-blue/20' :
                            procedure.category === 'bleeding' ? 'bg-health-red/20' :
                            'bg-deep-purple/20'
                          )}>
                            <procedure.icon className={cn("h-8 w-8", procedure.color)} />
                          </div>
                          
                          <div className={cn(
                            "px-3 py-1 rounded-full text-xs font-medium",
                            procedure.difficulty === 'easy' ? 'bg-cyber-green/20 text-cyber-green' :
                            procedure.difficulty === 'medium' ? 'bg-warning-orange/20 text-warning-orange' :
                            'bg-health-red/20 text-health-red'
                          )}>
                            {procedure.difficulty}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-bold text-foreground mb-2">{procedure.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-foreground/60">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{procedure.duration}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Target className="h-4 w-4" />
                              <span>{procedure.steps.length} steps</span>
                            </div>
                          </div>
                        </div>
                        
                        <Button className="w-full button-health">
                          <Eye className="h-4 w-4 mr-2" />
                          View Instructions
                        </Button>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            ) : (
              // Selected Procedure View
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Button
                    onClick={() => {
                      setSelectedProcedure(null);
                      setCurrentStep(0);
                    }}
                    variant="outline"
                    className="glass-button"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Procedures
                  </Button>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-foreground/60">
                      Step {currentStep + 1} of {selectedProcedure.steps.length}
                    </div>
                    <Button variant="outline" size="sm" className="glass-button">
                      <Volume2 className="h-4 w-4 mr-2" />
                      Read Aloud
                    </Button>
                  </div>
                </div>

                <GlassCard variant="health" size="lg">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className={cn(
                        "p-4 rounded-2xl",
                        selectedProcedure.category === 'cpr' ? 'bg-health-red/20' :
                        selectedProcedure.category === 'burns' ? 'bg-warning-orange/20' :
                        selectedProcedure.category === 'fractures' ? 'bg-accent/20' :
                        selectedProcedure.category === 'choking' ? 'bg-neon-blue/20' :
                        selectedProcedure.category === 'bleeding' ? 'bg-health-red/20' :
                        'bg-deep-purple/20'
                      )}>
                        <selectedProcedure.icon className={cn("h-8 w-8", selectedProcedure.color)} />
                      </div>
                      
                      <div>
                        <h2 className="text-2xl font-bold text-foreground">{selectedProcedure.title}</h2>
                        <p className="text-foreground/60">Emergency First Aid Procedure</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-foreground/60">
                        <span>Progress</span>
                        <span>{Math.round(((currentStep + 1) / selectedProcedure.steps.length) * 100)}%</span>
                      </div>
                      <div className="w-full bg-primary/20 rounded-full h-3">
                        <div 
                          className={cn(
                            "rounded-full h-3 transition-all duration-500",
                            selectedProcedure.category === 'cpr' ? 'bg-health-red' :
                            selectedProcedure.category === 'burns' ? 'bg-warning-orange' :
                            selectedProcedure.category === 'fractures' ? 'bg-accent' :
                            selectedProcedure.category === 'choking' ? 'bg-neon-blue' :
                            selectedProcedure.category === 'bleeding' ? 'bg-health-red' :
                            'bg-deep-purple'
                          )}
                          style={{ width: `${((currentStep + 1) / selectedProcedure.steps.length) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Current Step */}
                    <GlassCard variant="primary" size="lg" className="bg-primary/5">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center">
                            {currentStep + 1}
                          </div>
                          <h3 className="text-lg font-semibold text-foreground">Step {currentStep + 1}</h3>
                        </div>
                        
                        <p className="text-foreground leading-relaxed text-lg">
                          {selectedProcedure.steps[currentStep]}
                        </p>
                      </div>
                    </GlassCard>

                    {/* Warnings */}
                    {selectedProcedure.warnings.length > 0 && (
                      <GlassCard variant="health" size="default" className="bg-warning-orange/10 border-warning-orange/30">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="h-5 w-5 text-warning-orange" />
                            <h4 className="font-semibold text-warning-orange">Important Warnings</h4>
                          </div>
                          <ul className="space-y-1">
                            {selectedProcedure.warnings.map((warning, index) => (
                              <li key={index} className="text-sm text-foreground/70 flex items-start">
                                <span className="text-warning-orange mr-2">•</span>
                                {warning}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </GlassCard>
                    )}

                    {/* Navigation */}
                    <div className="flex justify-between pt-6 border-t border-border/50">
                      <Button
                        onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                        disabled={currentStep === 0}
                        variant="outline"
                        className="glass-button"
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Previous
                      </Button>

                      {currentStep < selectedProcedure.steps.length - 1 ? (
                        <Button
                          onClick={() => setCurrentStep(prev => prev + 1)}
                          className="button-health"
                        >
                          Next Step
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            setSelectedProcedure(null);
                            setCurrentStep(0);
                          }}
                          className="button-cyber text-black"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Complete
                        </Button>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </div>
            )}
          </div>
        </div>

        {/* Emergency Information */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <GlassCard variant="accent" size="sm" hover="lift" className="text-center">
            <div className="space-y-3">
              <Award className="h-8 w-8 text-accent mx-auto" />
              <div>
                <div className="font-bold text-foreground">Certified Protocols</div>
                <div className="text-xs text-foreground/60">AHA & Red Cross approved</div>
              </div>
            </div>
          </GlassCard>
          
          <GlassCard variant="health" size="sm" hover="lift" className="text-center">
            <div className="space-y-3">
              <Phone className="h-8 w-8 text-health-red mx-auto" />
              <div>
                <div className="font-bold text-foreground">Emergency: 911</div>
                <div className="text-xs text-foreground/60">Available 24/7</div>
              </div>
            </div>
          </GlassCard>
          
          <GlassCard variant="neon" size="sm" hover="lift" className="text-center">
            <div className="space-y-3">
              <MapPin className="h-8 w-8 text-neon-blue mx-auto" />
              <div>
                <div className="font-bold text-foreground">Location Sharing</div>
                <div className="text-xs text-foreground/60">GPS precision</div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
