import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import AIChat from "@/components/ui/ai-chat";
import useVoiceAssistant from "@/hooks/use-voice-assistant";
import {
  Heart,
  ArrowLeft,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Settings,
  Brain,
  Sparkles,
  Activity,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function AIChatPage() {
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [lastTranscript, setLastTranscript] = useState("");

  const voiceAssistant = useVoiceAssistant({
    language: "en-US",
    continuous: true,
    interimResults: true,
    onResult: (transcript, isFinal) => {
      if (isFinal) {
        setLastTranscript(transcript);
        // Auto-send the voice input
        handleSendMessage(transcript);
      }
    },
    onError: (error) => {
      setVoiceError(error);
      setTimeout(() => setVoiceError(null), 5000);
    },
    onStart: () => {
      setVoiceError(null);
    },
    onEnd: () => {
      // Auto-restart if voice is still enabled
      if (isVoiceEnabled && voiceAssistant.isSupported) {
        setTimeout(() => {
          voiceAssistant.startListening();
        }, 100);
      }
    },
  });

  const handleSendMessage = (message: string) => {
    console.log("Sending message:", message);
    // Message will be handled by the AIChat component
  };

  const handleToggleVoice = () => {
    if (!voiceAssistant.isSupported) {
      setVoiceError("Voice recognition is not supported in this browser");
      return;
    }

    setIsVoiceEnabled(!isVoiceEnabled);
    voiceAssistant.toggleListening();
  };

  // Auto-speak AI responses
  useEffect(() => {
    if (isVoiceEnabled && voiceAssistant.isSupported) {
      // This would be connected to AI responses in a real implementation
    }
  }, [isVoiceEnabled, voiceAssistant.isSupported]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-neon-gradient rounded-full opacity-5 blur-3xl animate-float top-20 right-20" />
        <div
          className="absolute w-64 h-64 bg-cyber-gradient rounded-full opacity-5 blur-3xl animate-float bottom-20 left-20"
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
                <div className="p-2 bg-health-gradient rounded-2xl">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">
                    AI Health Assistant
                  </h1>
                  <p className="text-sm text-foreground/60">
                    Your personal medical AI companion
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Voice Status Indicator */}
              <GlassCard variant="primary" size="sm" className="px-4 py-2">
                <div className="flex items-center space-x-2">
                  <div
                    className={cn(
                      "w-3 h-3 rounded-full transition-all duration-300",
                      voiceAssistant.isListening
                        ? "bg-red-500 animate-pulse"
                        : isVoiceEnabled
                          ? "bg-cyber-green animate-pulse"
                          : "bg-gray-400",
                    )}
                  />
                  <span className="text-sm font-medium">
                    {voiceAssistant.isListening
                      ? "Listening..."
                      : isVoiceEnabled
                        ? "Voice Ready"
                        : "Voice Off"}
                  </span>
                </div>
              </GlassCard>

              {/* Voice Toggle */}
              <Button
                onClick={handleToggleVoice}
                disabled={!voiceAssistant.isSupported}
                className={cn(
                  "rounded-2xl transition-all duration-300",
                  voiceAssistant.isListening
                    ? "bg-red-500 hover:bg-red-600 text-white animate-pulse"
                    : isVoiceEnabled
                      ? "button-cyber text-black"
                      : "glass-button",
                )}
              >
                {voiceAssistant.isListening ? (
                  <MicOff className="h-4 w-4 mr-2" />
                ) : (
                  <Mic className="h-4 w-4 mr-2" />
                )}
                {voiceAssistant.isListening ? "Stop" : "Voice"}
              </Button>

              <Button variant="ghost" className="glass-button rounded-2xl">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-8 h-[calc(100vh-120px)]">
        <div className="grid lg:grid-cols-4 gap-8 h-full">
          {/* Sidebar - Health Context */}
          <div className="lg:col-span-1 space-y-6">
            {/* Current Health Status */}
            <GlassCard variant="primary" size="default" hover="lift">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Activity className="h-6 w-6 text-primary" />
                  <h3 className="font-semibold text-foreground">
                    Health Context
                  </h3>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground/70">
                      Health Score
                    </span>
                    <span className="text-sm font-semibold text-primary">
                      85/100
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground/70">
                      Last Checkup
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      2 weeks ago
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground/70">
                      Medications
                    </span>
                    <span className="text-sm font-semibold text-accent">
                      2 active
                    </span>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Voice Assistant Features */}
            <GlassCard variant="neon" size="default" hover="lift">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mic className="h-6 w-6 text-neon-blue" />
                  <h3 className="font-semibold text-foreground">
                    Voice Features
                  </h3>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-cyber-green" />
                    <span className="text-sm text-foreground/70">
                      Real-time transcription
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-cyber-green" />
                    <span className="text-sm text-foreground/70">
                      Medical terminology
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-cyber-green" />
                    <span className="text-sm text-foreground/70">
                      Voice responses
                    </span>
                  </div>
                  {!voiceAssistant.isSupported && (
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-warning-orange" />
                      <span className="text-sm text-warning-orange">
                        Not supported in this browser
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </GlassCard>

            {/* Quick Actions */}
            <GlassCard variant="accent" size="default" hover="lift">
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-accent" />
                  Quick Actions
                </h3>

                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start glass-button"
                  >
                    Symptom Analysis
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start glass-button"
                  >
                    Medication Check
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start glass-button"
                  >
                    Health Tips
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start glass-button"
                  >
                    Emergency Info
                  </Button>
                </div>
              </div>
            </GlassCard>

            {/* Voice Transcript */}
            {lastTranscript && (
              <GlassCard variant="cyber" size="default">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-foreground">
                    Last Voice Input:
                  </h4>
                  <p className="text-sm text-foreground/70 italic">
                    "{lastTranscript}"
                  </p>
                </div>
              </GlassCard>
            )}
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <GlassCard variant="default" size="lg" className="h-full">
              {/* Error Display */}
              {voiceError && (
                <div className="mb-4">
                  <GlassCard
                    variant="health"
                    size="sm"
                    className="bg-red-500/10 border-red-500/30"
                  >
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-red-500">{voiceError}</span>
                    </div>
                  </GlassCard>
                </div>
              )}

              {/* Chat Interface */}
              <AIChat
                className="h-full"
                placeholder={
                  voiceAssistant.isListening
                    ? "🎤 Listening... Speak your health question"
                    : isVoiceEnabled
                      ? "Type or speak your health question..."
                      : "Ask me about your health symptoms, medications, or general wellness..."
                }
                onSendMessage={handleSendMessage}
                isListening={voiceAssistant.isListening}
                onToggleListening={handleToggleVoice}
              />
            </GlassCard>
          </div>
        </div>
      </div>

      {/* Floating Voice Controls */}
      {isVoiceEnabled && (
        <div className="fixed bottom-8 right-8 z-50">
          <GlassCard
            variant={voiceAssistant.isListening ? "health" : "neon"}
            size="sm"
            className={cn(
              "transition-all duration-300",
              voiceAssistant.isListening && "animate-pulse",
            )}
          >
            <div className="flex items-center space-x-3">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  voiceAssistant.isListening
                    ? "bg-red-500 text-white"
                    : "bg-cyber-green text-black",
                )}
              >
                {voiceAssistant.isListening ? (
                  <MicOff className="h-4 w-4" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </div>
              <div>
                <div className="text-sm font-medium">
                  {voiceAssistant.isListening ? "Listening" : "Voice Ready"}
                </div>
                <div className="text-xs text-foreground/60">
                  {voiceAssistant.isListening
                    ? "Tap to stop"
                    : "Say 'Hey HealPulse'"}
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
