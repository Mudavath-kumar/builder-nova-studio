import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";
import useVoiceAssistant from "@/hooks/use-voice-assistant";
import { 
  MessageCircle, 
  Mic, 
  MicOff, 
  Send, 
  X, 
  Volume2, 
  VolumeX,
  Settings,
  Minimize2,
  Maximize2,
  Bot,
  Heart,
  Sparkles,
  Zap,
  Shield,
  Activity,
  Brain
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isVoice?: boolean;
}

interface FloatingAIAssistantProps {
  className?: string;
  initialPosition?: { x: number; y: number };
}

export const FloatingAIAssistant: React.FC<FloatingAIAssistantProps> = ({ 
  className,
  initialPosition = { x: window.innerWidth - 100, y: window.innerHeight - 100 }
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm your AI health assistant. How can I help you today? 🩺✨",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const assistantRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const voiceAssistant = useVoiceAssistant({
    onResult: (transcript, isFinal) => {
      if (isFinal && transcript.trim()) {
        handleSendMessage(transcript, true);
      }
    },
    onError: (error) => {
      console.error('Voice error:', error);
    }
  });

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulate AI responses
  const simulateAIResponse = (userMessage: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      const responses = [
        "I understand your concern. Based on your symptoms, I recommend staying hydrated and getting plenty of rest. If symptoms persist or worsen, please consult a healthcare professional.",
        "That's a great question about your health! Let me analyze that for you. Here are some personalized recommendations based on current medical guidelines...",
        "I've reviewed your health data. Your metrics look good overall! Here are some tips to maintain your wellness routine and optimize your health score.",
        "I notice you're asking about medication. Always consult with your doctor before making changes to prescriptions. However, I can provide some general information...",
        "Your health journey is important to me! Based on our conversation, I recommend these evidence-based steps for your wellbeing...",
        "I'm here to help with any health concerns. Let me provide you with reliable medical information and suggest next steps for your care.",
        "That's an excellent health-related question! Here's what current medical research suggests, along with personalized recommendations for your situation..."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: randomResponse,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      
      // Speak the response if voice is enabled
      if (voiceAssistant.isSupported && !voiceAssistant.isListening) {
        setIsSpeaking(true);
        const utterance = new SpeechSynthesisUtterance(randomResponse);
        utterance.onend = () => setIsSpeaking(false);
        speechSynthesis.speak(utterance);
      }
    }, 1500 + Math.random() * 1000);
  };

  const handleSendMessage = (message: string, isVoice = false) => {
    if (!message.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date(),
      isVoice
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    
    // Simulate AI response
    simulateAIResponse(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(input);
    }
  };

  // Dragging functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isOpen) return; // Don't drag when chat is open
    
    setIsDragging(true);
    const rect = assistantRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    const newX = Math.max(0, Math.min(window.innerWidth - 80, e.clientX - dragOffset.x));
    const newY = Math.max(0, Math.min(window.innerHeight - 80, e.clientY - dragOffset.y));
    
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  // Talking animation effect
  const talkingAnimation = (isTyping || isSpeaking || voiceAssistant.isListening);

  return (
    <div className={cn("fixed z-50", className)}>
      {/* Chat Interface */}
      {isOpen && !isMinimized && (
        <div 
          ref={chatRef}
          className="fixed bottom-24 right-6 w-96 h-[500px]"
          style={{
            right: window.innerWidth - position.x < 400 ? '6px' : 'auto',
            left: window.innerWidth - position.x < 400 ? 'auto' : `${position.x - 320}px`,
            bottom: window.innerHeight - position.y < 540 ? '24px' : 'auto',
            top: window.innerHeight - position.y < 540 ? 'auto' : `${position.y - 460}px`
          }}
        >
          <GlassCard variant="neon" size="lg" className="h-full flex flex-col animate-scale-in">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/20">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className={cn(
                    "w-10 h-10 bg-neon-gradient rounded-full flex items-center justify-center transition-all duration-300",
                    talkingAnimation && "animate-pulse scale-110"
                  )}>
                    <Brain className="h-5 w-5 text-white" />
                  </div>
                  {talkingAnimation && (
                    <div className="absolute inset-0 bg-neon-gradient rounded-full opacity-30 animate-ping" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-white">AI Health Assistant</h3>
                  <p className="text-xs text-white/70">
                    {isTyping ? "Thinking..." : voiceAssistant.isListening ? "Listening..." : "Online"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(true)}
                  className="text-white hover:bg-white/20 rounded-xl"
                >
                  <Minimize2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 rounded-xl"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex items-start space-x-3 animate-fade-in",
                    message.sender === 'user' ? "justify-end flex-row-reverse space-x-reverse" : "justify-start"
                  )}
                >
                  {message.sender === 'ai' && (
                    <div className="w-8 h-8 bg-neon-gradient rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  
                  <div className={cn(
                    "max-w-[70%] p-3 rounded-2xl",
                    message.sender === 'ai' 
                      ? "bg-white/10 text-white" 
                      : "bg-primary/20 text-white ml-auto"
                  )}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    {message.isVoice && (
                      <div className="flex items-center space-x-1 mt-1">
                        <Mic className="h-3 w-3 text-white/60" />
                        <span className="text-xs text-white/60">Voice message</span>
                      </div>
                    )}
                    <p className="text-xs text-white/50 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-neon-gradient rounded-full flex items-center justify-center animate-pulse">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-white/10 p-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/20">
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={voiceAssistant.isListening ? "🎤 Listening..." : "Ask about your health..."}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-white/50 outline-none focus:border-white/40 transition-all"
                    disabled={voiceAssistant.isListening}
                  />
                </div>
                
                <Button
                  onClick={() => voiceAssistant.toggleListening()}
                  disabled={!voiceAssistant.isSupported}
                  className={cn(
                    "rounded-xl transition-all duration-300",
                    voiceAssistant.isListening 
                      ? "bg-red-500 hover:bg-red-600 animate-pulse" 
                      : "bg-white/20 hover:bg-white/30"
                  )}
                  size="sm"
                >
                  {voiceAssistant.isListening ? (
                    <MicOff className="h-4 w-4" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </Button>
                
                <Button
                  onClick={() => handleSendMessage(input)}
                  disabled={!input.trim() || isTyping}
                  className="bg-neon-blue hover:bg-neon-blue/80 rounded-xl"
                  size="sm"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Minimized Chat Indicator */}
      {isOpen && isMinimized && (
        <div 
          className="fixed bottom-24 right-6 cursor-pointer"
          onClick={() => setIsMinimized(false)}
          style={{
            right: window.innerWidth - position.x < 300 ? '6px' : 'auto',
            left: window.innerWidth - position.x < 300 ? 'auto' : `${position.x - 220}px`
          }}
        >
          <GlassCard variant="neon" size="sm" hover="lift" className="animate-bounce">
            <div className="flex items-center space-x-3 p-2">
              <div className="w-8 h-8 bg-neon-gradient rounded-full flex items-center justify-center">
                <MessageCircle className="h-4 w-4 text-white" />
              </div>
              <span className="text-white text-sm font-medium">AI Assistant</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMinimized(false);
                }}
                className="text-white hover:bg-white/20"
              >
                <Maximize2 className="h-3 w-3" />
              </Button>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Main AI Ball */}
      <div
        ref={assistantRef}
        className={cn(
          "cursor-pointer transition-all duration-300 select-none",
          isDragging && "scale-110",
          isHovered && !isOpen && "scale-110"
        )}
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)'
        }}
        onMouseDown={handleMouseDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={(e) => {
          if (!isDragging) {
            e.stopPropagation();
            setIsOpen(!isOpen);
            setIsMinimized(false);
          }
        }}
      >
        {/* Outer Glow Ring */}
        <div className={cn(
          "absolute inset-0 rounded-full transition-all duration-300",
          talkingAnimation 
            ? "bg-neon-gradient animate-ping scale-150 opacity-30" 
            : isHovered 
            ? "bg-neon-gradient scale-125 opacity-20" 
            : "bg-primary/20 scale-110 opacity-10"
        )} />
        
        {/* Middle Ring */}
        <div className={cn(
          "absolute inset-2 rounded-full transition-all duration-300",
          talkingAnimation 
            ? "bg-cyber-gradient animate-pulse scale-110 opacity-40" 
            : isHovered 
            ? "bg-primary/30 scale-105 opacity-30" 
            : "bg-primary/20 opacity-20"
        )} />
        
        {/* Main Ball */}
        <div className={cn(
          "relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl",
          talkingAnimation 
            ? "bg-neon-gradient animate-pulse shadow-neon" 
            : "bg-health-gradient shadow-health"
        )}>
          {/* Inner Content */}
          <div className="relative">
            {talkingAnimation ? (
              <div className="flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full animate-bounce" />
                <div className="w-3 h-3 bg-white rounded-full animate-bounce mx-1" style={{ animationDelay: '0.1s' }} />
                <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            ) : (
              <Brain className={cn(
                "h-8 w-8 text-white transition-all duration-300",
                isHovered && "scale-110"
              )} />
            )}
          </div>
          
          {/* Status Indicators */}
          <div className="absolute -top-1 -right-1">
            {voiceAssistant.isListening ? (
              <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse border-2 border-white" />
            ) : isSpeaking ? (
              <div className="w-4 h-4 bg-cyber-green rounded-full animate-bounce border-2 border-white" />
            ) : isTyping ? (
              <div className="w-4 h-4 bg-warning-orange rounded-full animate-spin border-2 border-white" />
            ) : (
              <div className="w-4 h-4 bg-cyber-green rounded-full border-2 border-white" />
            )}
          </div>
        </div>
        
        {/* Quick Action Buttons */}
        {isHovered && !isOpen && !isDragging && (
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 flex space-x-2 animate-fade-in">
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                voiceAssistant.toggleListening();
              }}
              className={cn(
                "w-8 h-8 p-0 rounded-full",
                voiceAssistant.isListening 
                  ? "bg-red-500 hover:bg-red-600" 
                  : "bg-neon-blue hover:bg-neon-blue/80"
              )}
            >
              <Mic className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(true);
              }}
              className="w-8 h-8 p-0 rounded-full bg-primary hover:bg-primary/80"
            >
              <MessageCircle className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>

      {/* Quick Tips Tooltip */}
      {!isOpen && isHovered && !isDragging && (
        <div 
          className="fixed bg-black/80 text-white text-xs px-3 py-2 rounded-lg animate-fade-in pointer-events-none"
          style={{
            left: position.x + 40,
            top: position.y - 30,
            zIndex: 60
          }}
        >
          Click to chat • Drag to move • Voice ready
        </div>
      )}
    </div>
  );
};

export default FloatingAIAssistant;
