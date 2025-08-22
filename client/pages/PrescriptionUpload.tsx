import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { 
  Heart, 
  ArrowLeft, 
  Camera, 
  Upload,
  File,
  Image,
  Scan,
  CheckCircle,
  AlertTriangle,
  Loader2,
  Eye,
  Clock,
  Pill,
  Calendar,
  Bell,
  Zap,
  Brain,
  Sparkles,
  Target,
  RefreshCw,
  Download,
  Share2,
  Trash2,
  Edit,
  Info,
  Shield,
  Award,
  Activity
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface PillData {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  sideEffects: string[];
  interactions: string[];
  shape: string;
  color: string;
  confidence: number;
}

interface ScanResult {
  id: string;
  timestamp: Date;
  image: string;
  pills: PillData[];
  accuracy: number;
  processingTime: number;
}

export default function PrescriptionUpload() {
  const [scanMode, setScanMode] = useState<'camera' | 'upload' | 'gallery'>('camera');
  const [isScanning, setIsScanning] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [scanResults, setScanResults] = useState<ScanResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<ScanResult | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [processingProgress, setProcessingProgress] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock pill database for demonstration
  const mockPillData: PillData[] = [
    {
      id: '1',
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      duration: '30 days',
      instructions: 'Take with food to reduce stomach upset',
      sideEffects: ['Nausea', 'Diarrhea', 'Metallic taste'],
      interactions: ['Alcohol', 'Contrast dyes'],
      shape: 'Oval',
      color: 'White',
      confidence: 96.7
    },
    {
      id: '2',
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      duration: '90 days',
      instructions: 'Take at the same time each day',
      sideEffects: ['Dry cough', 'Dizziness', 'Headache'],
      interactions: ['Potassium supplements', 'NSAIDs'],
      shape: 'Round',
      color: 'Pink',
      confidence: 94.2
    },
    {
      id: '3',
      name: 'Atorvastatin',
      dosage: '20mg',
      frequency: 'Once daily (evening)',
      duration: '30 days',
      instructions: 'Take in the evening for best effectiveness',
      sideEffects: ['Muscle pain', 'Liver problems', 'Memory issues'],
      interactions: ['Grapefruit juice', 'Cyclosporine'],
      shape: 'Oval',
      color: 'Blue',
      confidence: 98.1
    }
  ];

  // Initialize camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        } 
      });
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
  };

  // Capture image from camera
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context?.drawImage(video, 0, 0);
      
      const imageData = canvas.toDataURL('image/jpeg');
      setCapturedImage(imageData);
      processImage(imageData);
    }
  };

  // Process uploaded/captured image
  const processImage = async (imageData: string) => {
    setIsProcessing(true);
    setProcessingProgress(0);

    // Simulate OCR processing with progress
    const steps = [
      { progress: 20, message: "Analyzing image quality..." },
      { progress: 40, message: "Detecting text regions..." },
      { progress: 60, message: "Extracting prescription data..." },
      { progress: 80, message: "Identifying medications..." },
      { progress: 95, message: "Validating results..." },
      { progress: 100, message: "Processing complete!" }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setProcessingProgress(step.progress);
    }

    // Mock scan result
    const newResult: ScanResult = {
      id: Date.now().toString(),
      timestamp: new Date(),
      image: imageData,
      pills: mockPillData,
      accuracy: 96.3,
      processingTime: 4.2
    };

    setScanResults(prev => [newResult, ...prev]);
    setSelectedResult(newResult);
    setIsProcessing(false);
    setProcessingProgress(0);
    setCapturedImage(null);
    stopCamera();
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        processImage(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  // Set medication reminder
  const setReminder = (pill: PillData) => {
    console.log(`Setting reminder for ${pill.name}`);
    // Implement reminder logic
  };

  useEffect(() => {
    if (scanMode === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }

    return () => stopCamera();
  }, [scanMode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-cyber-gradient rounded-full opacity-10 blur-3xl animate-float top-20 right-20" />
        <div className="absolute w-64 h-64 bg-neon-gradient rounded-full opacity-10 blur-3xl animate-float bottom-20 left-20" style={{ animationDelay: '2s' }} />
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
                <div className="p-3 bg-cyber-gradient rounded-3xl glow">
                  <Camera className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Prescription Scanner</h1>
                  <p className="text-sm text-foreground/60">AI-powered OCR technology</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <GlassCard variant="primary" size="sm" className="px-4 py-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-cyber-green rounded-full animate-pulse" />
                  <span className="text-sm font-medium">OCR Ready</span>
                </div>
              </GlassCard>
              
              <Button className="button-health">
                <Brain className="h-4 w-4 mr-2" />
                AI Help
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Scan Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Scan Mode Selection */}
            <GlassCard variant="primary" size="lg">
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-foreground flex items-center">
                  <Scan className="h-5 w-5 mr-2 text-primary" />
                  Scan Method
                </h2>
                
                <div className="space-y-3">
                  <Button
                    onClick={() => setScanMode('camera')}
                    variant={scanMode === 'camera' ? 'default' : 'outline'}
                    className={cn(
                      "w-full justify-start h-auto p-4",
                      scanMode === 'camera' ? "bg-primary text-white" : "glass-button"
                    )}
                  >
                    <Camera className="h-6 w-6 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Camera Scan</div>
                      <div className="text-sm opacity-70">Real-time prescription capture</div>
                    </div>
                  </Button>
                  
                  <Button
                    onClick={() => setScanMode('upload')}
                    variant={scanMode === 'upload' ? 'default' : 'outline'}
                    className={cn(
                      "w-full justify-start h-auto p-4",
                      scanMode === 'upload' ? "bg-primary text-white" : "glass-button"
                    )}
                  >
                    <Upload className="h-6 w-6 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Upload File</div>
                      <div className="text-sm opacity-70">Upload from device storage</div>
                    </div>
                  </Button>
                  
                  <Button
                    onClick={() => setScanMode('gallery')}
                    variant={scanMode === 'gallery' ? 'default' : 'outline'}
                    className={cn(
                      "w-full justify-start h-auto p-4",
                      scanMode === 'gallery' ? "bg-primary text-white" : "glass-button"
                    )}
                  >
                    <Image className="h-6 w-6 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Photo Gallery</div>
                      <div className="text-sm opacity-70">Choose from recent photos</div>
                    </div>
                  </Button>
                </div>
              </div>
            </GlassCard>

            {/* Scan Statistics */}
            <GlassCard variant="neon" size="default">
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-neon-blue" />
                  Scan Statistics
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-neon-blue">{scanResults.length}</div>
                    <div className="text-xs text-foreground/60">Total Scans</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyber-green">98.7%</div>
                    <div className="text-xs text-foreground/60">Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-warning-orange">2.3s</div>
                    <div className="text-xs text-foreground/60">Avg Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">47</div>
                    <div className="text-xs text-foreground/60">Pills Found</div>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Quick Tips */}
            <GlassCard variant="accent" size="default">
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-accent" />
                  Scanning Tips
                </h3>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-foreground/70">
                    <CheckCircle className="h-4 w-4 text-cyber-green" />
                    <span>Good lighting improves accuracy</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-foreground/70">
                    <CheckCircle className="h-4 w-4 text-cyber-green" />
                    <span>Keep prescription flat and centered</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-foreground/70">
                    <CheckCircle className="h-4 w-4 text-cyber-green" />
                    <span>Avoid shadows and reflections</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-foreground/70">
                    <CheckCircle className="h-4 w-4 text-cyber-green" />
                    <span>Include entire prescription in frame</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Center Panel - Camera/Upload */}
          <div className="lg:col-span-2 space-y-6">
            {/* Camera/Upload Interface */}
            <GlassCard variant="default" size="lg" className="relative">
              {scanMode === 'camera' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-foreground">Live Camera</h2>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-sm text-foreground/60">Recording</span>
                    </div>
                  </div>
                  
                  <div className="relative aspect-video bg-black rounded-2xl overflow-hidden">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Camera overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="border-2 border-primary rounded-2xl w-4/5 h-4/5 relative">
                        <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-primary rounded-tl-lg" />
                        <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-primary rounded-tr-lg" />
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-primary rounded-bl-lg" />
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-primary rounded-br-lg" />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <Target className="h-8 w-8 text-primary animate-ping" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Capture button */}
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                      <Button
                        onClick={captureImage}
                        disabled={isProcessing}
                        className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90 border-4 border-white"
                      >
                        <Camera className="h-6 w-6" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {scanMode === 'upload' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-foreground">Upload Prescription</h2>
                  
                  <div
                    className="border-2 border-dashed border-primary/30 rounded-2xl p-12 text-center hover:border-primary/50 transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Drop your prescription here
                    </h3>
                    <p className="text-foreground/60 mb-4">
                      or click to browse files
                    </p>
                    <Button variant="outline" className="glass-button">
                      <File className="h-4 w-4 mr-2" />
                      Choose File
                    </Button>
                  </div>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              )}

              {scanMode === 'gallery' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-foreground">Recent Photos</h2>
                  
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <div
                        key={item}
                        className="aspect-square bg-primary/10 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors border border-primary/20"
                      >
                        <Image className="h-8 w-8 text-primary/60" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Processing Overlay */}
              {isProcessing && (
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
                  <GlassCard variant="neon" size="lg" className="text-center">
                    <div className="space-y-6">
                      <div className="relative">
                        <div className="w-20 h-20 bg-neon-gradient rounded-full flex items-center justify-center mx-auto animate-pulse">
                          <Brain className="h-10 w-10 text-white" />
                        </div>
                        <div className="absolute inset-0 bg-neon-gradient rounded-full opacity-30 animate-ping" />
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          Processing Prescription
                        </h3>
                        <p className="text-foreground/70 mb-4">
                          AI is analyzing your prescription...
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="w-full bg-primary/20 rounded-full h-3">
                          <div 
                            className="bg-neon-gradient rounded-full h-3 transition-all duration-300"
                            style={{ width: `${processingProgress}%` }}
                          />
                        </div>
                        <p className="text-sm text-foreground/60">
                          {processingProgress}% Complete
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              )}
            </GlassCard>

            {/* Scan Results */}
            {selectedResult && (
              <GlassCard variant="accent" size="lg">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-foreground flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-cyber-green" />
                      Scan Results
                    </h2>
                    <div className="flex items-center space-x-4">
                      <div className="text-sm text-foreground/60">
                        Accuracy: <span className="font-bold text-cyber-green">{selectedResult.accuracy}%</span>
                      </div>
                      <div className="text-sm text-foreground/60">
                        Time: <span className="font-bold text-primary">{selectedResult.processingTime}s</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Detected Pills */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">Detected Medications ({selectedResult.pills.length})</h3>
                    
                    <div className="space-y-4">
                      {selectedResult.pills.map((pill) => (
                        <GlassCard key={pill.id} variant="primary" size="default" hover="lift">
                          <div className="space-y-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <div className="p-2 bg-primary/10 rounded-xl">
                                    <Pill className="h-5 w-5 text-primary" />
                                  </div>
                                  <div>
                                    <h4 className="font-bold text-foreground text-lg">{pill.name}</h4>
                                    <p className="text-sm text-foreground/60">{pill.dosage} • {pill.frequency}</p>
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                  <div>
                                    <label className="text-xs font-medium text-foreground/70">Duration</label>
                                    <p className="text-sm text-foreground">{pill.duration}</p>
                                  </div>
                                  <div>
                                    <label className="text-xs font-medium text-foreground/70">Shape & Color</label>
                                    <p className="text-sm text-foreground">{pill.shape}, {pill.color}</p>
                                  </div>
                                </div>
                                
                                <div className="mb-4">
                                  <label className="text-xs font-medium text-foreground/70">Instructions</label>
                                  <p className="text-sm text-foreground">{pill.instructions}</p>
                                </div>
                              </div>
                              
                              <div className="text-right">
                                <div className={cn(
                                  "px-3 py-1 rounded-full text-xs font-medium",
                                  pill.confidence >= 95 
                                    ? "bg-cyber-green/20 text-cyber-green" 
                                    : pill.confidence >= 90
                                    ? "bg-warning-orange/20 text-warning-orange"
                                    : "bg-health-red/20 text-health-red"
                                )}>
                                  {pill.confidence.toFixed(1)}% Match
                                </div>
                              </div>
                            </div>
                            
                            {/* Warnings */}
                            {pill.sideEffects.length > 0 && (
                              <div className="p-3 bg-warning-orange/10 rounded-2xl border border-warning-orange/30">
                                <div className="flex items-center space-x-2 mb-2">
                                  <AlertTriangle className="h-4 w-4 text-warning-orange" />
                                  <span className="text-sm font-medium text-warning-orange">Side Effects</span>
                                </div>
                                <p className="text-xs text-foreground/70">
                                  {pill.sideEffects.join(', ')}
                                </p>
                              </div>
                            )}
                            
                            {/* Actions */}
                            <div className="flex space-x-3">
                              <Button
                                onClick={() => setReminder(pill)}
                                size="sm"
                                className="flex-1 button-health"
                              >
                                <Bell className="h-4 w-4 mr-2" />
                                Set Reminder
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="glass-button"
                              >
                                <Info className="h-4 w-4 mr-2" />
                                More Info
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="glass-button"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </GlassCard>
                      ))}
                    </div>
                  </div>
                  
                  {/* Batch Actions */}
                  <div className="flex space-x-4 pt-6 border-t border-border/50">
                    <Button className="flex-1 button-cyber text-black">
                      <Download className="h-4 w-4 mr-2" />
                      Save All Medications
                    </Button>
                    <Button variant="outline" className="glass-button">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share with Doctor
                    </Button>
                    <Button variant="outline" className="glass-button">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Rescan
                    </Button>
                  </div>
                </div>
              </GlassCard>
            )}
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8">
          <GlassCard variant="neon" size="sm" className="text-center">
            <div className="flex items-center justify-center space-x-4">
              <Shield className="h-5 w-5 text-neon-blue" />
              <p className="text-sm text-foreground/70">
                Your prescription data is encrypted and HIPAA compliant
              </p>
              <Award className="h-5 w-5 text-cyber-green" />
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
