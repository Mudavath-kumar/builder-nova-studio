import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { 
  Heart, 
  ArrowLeft, 
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  Camera,
  CameraOff,
  Monitor,
  MessageCircle,
  FileText,
  Share2,
  Settings,
  Users,
  Clock,
  Record,
  Maximize,
  Minimize,
  Volume2,
  VolumeX,
  MoreHorizontal,
  Send,
  Paperclip,
  Smile,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Info,
  Zap,
  Brain,
  Sparkles,
  Target,
  Award,
  Activity,
  Stethoscope,
  Eye,
  Download,
  Upload,
  Bookmark,
  Star,
  ThumbsUp,
  Edit,
  Copy,
  Pause,
  Play,
  RotateCcw,
  Grid3X3,
  User,
  UserCheck
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface CallParticipant {
  id: string;
  name: string;
  role: 'doctor' | 'patient' | 'assistant';
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  isScreenSharing: boolean;
  connectionStatus: 'connected' | 'connecting' | 'disconnected';
  avatar?: string;
}

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: Date;
  type: 'text' | 'file' | 'prescription' | 'appointment';
  attachments?: string[];
}

interface MedicalNote {
  id: string;
  content: string;
  timestamp: Date;
  category: 'symptom' | 'diagnosis' | 'prescription' | 'recommendation';
}

export default function VideoConsultation() {
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isCallActive, setIsCallActive] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [chatMessage, setChatMessage] = useState("");
  const [currentNote, setCurrentNote] = useState("");
  const [connectionQuality, setConnectionQuality] = useState<'excellent' | 'good' | 'poor'>('excellent');

  const videoRef = useRef<HTMLVideoElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Mock participants
  const participants: CallParticipant[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      role: 'doctor',
      isVideoEnabled: true,
      isAudioEnabled: true,
      isScreenSharing: false,
      connectionStatus: 'connected'
    },
    {
      id: '2',
      name: 'Alex Johnson (You)',
      role: 'patient',
      isVideoEnabled: isVideoEnabled,
      isAudioEnabled: isAudioEnabled,
      isScreenSharing: isScreenSharing,
      connectionStatus: 'connected'
    }
  ];

  // Mock chat messages
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      senderId: '1',
      senderName: 'Dr. Sarah Johnson',
      message: 'Hello! I can see you clearly. How are you feeling today?',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      type: 'text'
    },
    {
      id: '2',
      senderId: '2',
      senderName: 'Alex Johnson',
      message: 'Hello Doctor! I\'ve been experiencing some chest discomfort for the past few days.',
      timestamp: new Date(Date.now() - 4 * 60 * 1000),
      type: 'text'
    },
    {
      id: '3',
      senderId: '1',
      senderName: 'Dr. Sarah Johnson',
      message: 'I understand. Let me ask you a few questions about your symptoms. Can you describe the type of discomfort?',
      timestamp: new Date(Date.now() - 3 * 60 * 1000),
      type: 'text'
    }
  ]);

  // Mock medical notes
  const [medicalNotes, setMedicalNotes] = useState<MedicalNote[]>([
    {
      id: '1',
      content: 'Patient reports chest discomfort for 3 days',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      category: 'symptom'
    },
    {
      id: '2',
      content: 'Discomfort occurs mainly during physical activity',
      timestamp: new Date(Date.now() - 1 * 60 * 1000),
      category: 'symptom'
    }
  ]);

  // Call timer
  useEffect(() => {
    if (isCallActive) {
      const interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isCallActive]);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const formatCallDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const sendChatMessage = () => {
    if (!chatMessage.trim()) return;
    
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: '2',
      senderName: 'Alex Johnson',
      message: chatMessage,
      timestamp: new Date(),
      type: 'text'
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    setChatMessage("");
  };

  const addMedicalNote = () => {
    if (!currentNote.trim()) return;
    
    const newNote: MedicalNote = {
      id: Date.now().toString(),
      content: currentNote,
      timestamp: new Date(),
      category: 'symptom'
    };
    
    setMedicalNotes(prev => [...prev, newNote]);
    setCurrentNote("");
  };

  const endCall = () => {
    setIsCallActive(false);
    // In a real app, this would redirect to a post-call summary page
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 flex flex-col overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-health-gradient rounded-full opacity-5 blur-3xl animate-float top-20 right-20" />
        <div className="absolute w-64 h-64 bg-neon-gradient rounded-full opacity-5 blur-3xl animate-float bottom-20 left-20" style={{ animationDelay: '2s' }} />
      </div>

      {/* Top Bar */}
      <header className="relative z-10 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/doctor-consultation">
                <Button variant="ghost" className="glass-button">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  End Call
                </Button>
              </Link>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-health-gradient rounded-2xl">
                  <Video className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-foreground">Video Consultation</h1>
                  <p className="text-sm text-foreground/60">Dr. Sarah Johnson • Cardiology</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Call Duration */}
              <GlassCard variant="primary" size="sm" className="px-4 py-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-health-red rounded-full animate-pulse" />
                  <span className="text-sm font-mono">{formatCallDuration(callDuration)}</span>
                </div>
              </GlassCard>
              
              {/* Connection Quality */}
              <GlassCard variant="neon" size="sm" className="px-4 py-2">
                <div className="flex items-center space-x-2">
                  <div className={cn(
                    "w-3 h-3 rounded-full",
                    connectionQuality === 'excellent' ? 'bg-cyber-green' :
                    connectionQuality === 'good' ? 'bg-warning-orange' :
                    'bg-health-red'
                  )} />
                  <span className="text-sm capitalize">{connectionQuality}</span>
                </div>
              </GlassCard>
              
              {isRecording && (
                <GlassCard variant="health" size="sm" className="px-4 py-2 bg-health-red/20">
                  <div className="flex items-center space-x-2">
                    <Record className="w-3 h-3 text-health-red animate-pulse" />
                    <span className="text-sm text-health-red">Recording</span>
                  </div>
                </GlassCard>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex relative z-10">
        {/* Video Area */}
        <div className="flex-1 relative bg-black/20 backdrop-blur-sm">
          {/* Main Video - Doctor */}
          <div className="absolute inset-0">
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              {participants[0].isVideoEnabled ? (
                <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                  <div className="text-center">
                    <UserCheck className="h-32 w-32 text-primary/60 mx-auto mb-4" />
                    <p className="text-xl font-semibold text-foreground">{participants[0].name}</p>
                    <p className="text-foreground/60">Cardiology Specialist</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <VideoOff className="h-16 w-16 text-foreground/50" />
                </div>
              )}
            </div>
            
            {/* Doctor Info Overlay */}
            <div className="absolute top-4 left-4">
              <GlassCard variant="primary" size="sm" className="px-4 py-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <Stethoscope className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{participants[0].name}</p>
                    <div className="flex items-center space-x-2">
                      {participants[0].isAudioEnabled ? (
                        <Mic className="h-3 w-3 text-cyber-green" />
                      ) : (
                        <MicOff className="h-3 w-3 text-health-red" />
                      )}
                      {participants[0].isVideoEnabled ? (
                        <Video className="h-3 w-3 text-cyber-green" />
                      ) : (
                        <VideoOff className="h-3 w-3 text-health-red" />
                      )}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>

          {/* Self Video - Picture in Picture */}
          <div className="absolute bottom-4 right-4 w-64 h-48">
            <GlassCard variant="neon" size="sm" className="w-full h-full overflow-hidden">
              <div className="w-full h-full bg-neon-blue/10 flex items-center justify-center relative">
                {isVideoEnabled ? (
                  <div className="text-center">
                    <User className="h-16 w-16 text-neon-blue/60 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-foreground">You</p>
                  </div>
                ) : (
                  <VideoOff className="h-8 w-8 text-foreground/50" />
                )}
                
                {/* Self Video Controls */}
                <div className="absolute bottom-2 right-2 flex space-x-1">
                  {isAudioEnabled ? (
                    <div className="p-1 bg-cyber-green/20 rounded">
                      <Mic className="h-3 w-3 text-cyber-green" />
                    </div>
                  ) : (
                    <div className="p-1 bg-health-red/20 rounded">
                      <MicOff className="h-3 w-3 text-health-red" />
                    </div>
                  )}
                  {isVideoEnabled ? (
                    <div className="p-1 bg-cyber-green/20 rounded">
                      <Video className="h-3 w-3 text-cyber-green" />
                    </div>
                  ) : (
                    <div className="p-1 bg-health-red/20 rounded">
                      <VideoOff className="h-3 w-3 text-health-red" />
                    </div>
                  )}
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Call Controls */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
            <GlassCard variant="default" size="sm" className="px-6 py-4">
              <div className="flex items-center space-x-4">
                {/* Video Toggle */}
                <Button
                  onClick={toggleVideo}
                  size="sm"
                  className={cn(
                    "w-12 h-12 rounded-full",
                    isVideoEnabled 
                      ? "bg-primary/20 hover:bg-primary/30 text-primary" 
                      : "bg-health-red/20 hover:bg-health-red/30 text-health-red"
                  )}
                >
                  {isVideoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                </Button>

                {/* Audio Toggle */}
                <Button
                  onClick={toggleAudio}
                  size="sm"
                  className={cn(
                    "w-12 h-12 rounded-full",
                    isAudioEnabled 
                      ? "bg-primary/20 hover:bg-primary/30 text-primary" 
                      : "bg-health-red/20 hover:bg-health-red/30 text-health-red"
                  )}
                >
                  {isAudioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                </Button>

                {/* Screen Share */}
                <Button
                  onClick={toggleScreenShare}
                  size="sm"
                  className={cn(
                    "w-12 h-12 rounded-full",
                    isScreenSharing 
                      ? "bg-neon-blue/20 hover:bg-neon-blue/30 text-neon-blue" 
                      : "bg-primary/20 hover:bg-primary/30 text-primary"
                  )}
                >
                  <Monitor className="h-5 w-5" />
                </Button>

                {/* Chat Toggle */}
                <Button
                  onClick={() => setShowChat(!showChat)}
                  size="sm"
                  className={cn(
                    "w-12 h-12 rounded-full",
                    showChat 
                      ? "bg-accent/20 hover:bg-accent/30 text-accent" 
                      : "bg-primary/20 hover:bg-primary/30 text-primary"
                  )}
                >
                  <MessageCircle className="h-5 w-5" />
                </Button>

                {/* Notes Toggle */}
                <Button
                  onClick={() => setShowNotes(!showNotes)}
                  size="sm"
                  className={cn(
                    "w-12 h-12 rounded-full",
                    showNotes 
                      ? "bg-cyber-green/20 hover:bg-cyber-green/30 text-cyber-green" 
                      : "bg-primary/20 hover:bg-primary/30 text-primary"
                  )}
                >
                  <FileText className="h-5 w-5" />
                </Button>

                {/* Record Toggle */}
                <Button
                  onClick={toggleRecording}
                  size="sm"
                  className={cn(
                    "w-12 h-12 rounded-full",
                    isRecording 
                      ? "bg-health-red/20 hover:bg-health-red/30 text-health-red animate-pulse" 
                      : "bg-primary/20 hover:bg-primary/30 text-primary"
                  )}
                >
                  <Record className="h-5 w-5" />
                </Button>

                {/* End Call */}
                <Button
                  onClick={endCall}
                  size="sm"
                  className="w-12 h-12 rounded-full bg-health-red hover:bg-health-red/80 text-white"
                >
                  <PhoneOff className="h-5 w-5" />
                </Button>

                {/* More Options */}
                <Button
                  onClick={() => setShowSettings(!showSettings)}
                  size="sm"
                  className="w-12 h-12 rounded-full bg-primary/20 hover:bg-primary/30 text-primary"
                >
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Chat Panel */}
        {showChat && (
          <div className="w-80 border-l border-border/50 bg-background/80 backdrop-blur-xl flex flex-col">
            <div className="p-4 border-b border-border/50">
              <h3 className="font-semibold text-foreground flex items-center">
                <MessageCircle className="h-5 w-5 mr-2 text-accent" />
                Chat Messages
              </h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.senderId === '2' ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] p-3 rounded-2xl",
                      message.senderId === '2' 
                        ? "bg-primary text-white" 
                        : "bg-foreground/10 text-foreground"
                    )}
                  >
                    <p className="text-sm leading-relaxed">{message.message}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            
            <div className="p-4 border-t border-border/50">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 bg-primary/10 border border-primary/30 rounded-xl text-sm outline-none focus:border-primary"
                />
                <Button
                  onClick={sendChatMessage}
                  size="sm"
                  className="px-3 py-2 rounded-xl"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Notes Panel */}
        {showNotes && (
          <div className="w-80 border-l border-border/50 bg-background/80 backdrop-blur-xl flex flex-col">
            <div className="p-4 border-b border-border/50">
              <h3 className="font-semibold text-foreground flex items-center">
                <FileText className="h-5 w-5 mr-2 text-cyber-green" />
                Medical Notes
              </h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {medicalNotes.map((note) => (
                <GlassCard key={note.id} variant="primary" size="sm">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        note.category === 'symptom' ? 'bg-warning-orange/20 text-warning-orange' :
                        note.category === 'diagnosis' ? 'bg-health-red/20 text-health-red' :
                        note.category === 'prescription' ? 'bg-accent/20 text-accent' :
                        'bg-cyber-green/20 text-cyber-green'
                      )}>
                        {note.category}
                      </span>
                      <span className="text-xs text-foreground/50">
                        {note.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-sm text-foreground">{note.content}</p>
                  </div>
                </GlassCard>
              ))}
            </div>
            
            <div className="p-4 border-t border-border/50">
              <div className="space-y-2">
                <textarea
                  value={currentNote}
                  onChange={(e) => setCurrentNote(e.target.value)}
                  placeholder="Add medical notes..."
                  rows={3}
                  className="w-full px-3 py-2 bg-primary/10 border border-primary/30 rounded-xl text-sm outline-none focus:border-primary resize-none"
                />
                <Button
                  onClick={addMedicalNote}
                  size="sm"
                  className="w-full"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Add Note
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Settings Panel */}
        {showSettings && (
          <div className="absolute top-20 right-4 z-20">
            <GlassCard variant="neon" size="lg" className="w-80">
              <div className="space-y-6">
                <h3 className="font-semibold text-foreground flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-neon-blue" />
                  Call Settings
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">High Quality Video</span>
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Noise Cancellation</span>
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Auto-Save Notes</span>
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-foreground">Camera</label>
                    <select className="w-full px-3 py-2 bg-neon-blue/10 border border-neon-blue/30 rounded-xl text-sm">
                      <option>Default Camera</option>
                      <option>External Camera</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-foreground">Microphone</label>
                    <select className="w-full px-3 py-2 bg-neon-blue/10 border border-neon-blue/30 rounded-xl text-sm">
                      <option>Default Microphone</option>
                      <option>External Microphone</option>
                    </select>
                  </div>
                </div>
                
                <Button
                  onClick={() => setShowSettings(false)}
                  className="w-full"
                >
                  Apply Settings
                </Button>
              </div>
            </GlassCard>
          </div>
        )}
      </div>

      {/* Emergency Quick Actions */}
      <div className="absolute top-20 left-4 space-y-2 z-20">
        <Button
          size="sm"
          className="w-full bg-health-red hover:bg-health-red/80 text-white"
        >
          <Phone className="h-4 w-4 mr-2" />
          Emergency Call
        </Button>
        
        <Button
          size="sm"
          variant="outline"
          className="w-full glass-button"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share Screen
        </Button>
      </div>

      {/* Connection Status */}
      <div className="absolute top-20 right-20 z-20">
        <GlassCard variant="primary" size="sm" className="px-4 py-2">
          <div className="flex items-center space-x-2">
            <Activity className="h-4 w-4 text-cyber-green" />
            <span className="text-sm">Stable Connection</span>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
