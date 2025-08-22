import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";
import { 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Bot, 
  User, 
  Heart,
  Brain,
  Sparkles,
  Loader2
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'health-tip';
}

interface AIChatProps {
  className?: string;
  placeholder?: string;
  onSendMessage?: (message: string) => void;
  isListening?: boolean;
  onToggleListening?: () => void;
}

const TypingIndicator = () => (
  <div className="flex items-center space-x-1 p-4">
    <div className="flex space-x-1">
      <div className="typing-indicator" style={{ '--delay': '0s' } as React.CSSProperties}></div>
      <div className="typing-indicator" style={{ '--delay': '0.2s' } as React.CSSProperties}></div>
      <div className="typing-indicator" style={{ '--delay': '0.4s' } as React.CSSProperties}></div>
    </div>
    <span className="text-sm text-foreground/60 ml-2">AI is thinking...</span>
  </div>
);

const AIAvatar = ({ isTyping = false }: { isTyping?: boolean }) => (
  <div className={cn(
    "w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300",
    isTyping 
      ? "bg-neon-gradient animate-pulse shadow-neon" 
      : "bg-health-gradient shadow-health"
  )}>
    <Brain className={cn(
      "h-5 w-5 text-white transition-all duration-300",
      isTyping && "animate-pulse"
    )} />
  </div>
);

const UserAvatar = () => (
  <div className="w-10 h-10 bg-primary/20 rounded-2xl flex items-center justify-center">
    <User className="h-5 w-5 text-primary" />
  </div>
);

export const AIChat: React.FC<AIChatProps> = ({ 
  className, 
  placeholder = "Ask me about your health...",
  onSendMessage,
  isListening = false,
  onToggleListening 
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI health assistant. How can I help you today? 🏥✨",
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = (userMessage: string) => {
    setIsTyping(true);
    
    // Simulate AI thinking time
    setTimeout(() => {
      const responses = [
        "Based on your symptoms, I recommend consulting with a healthcare professional. In the meantime, here are some general wellness tips...",
        "I understand your concern. Let me analyze your health data and provide personalized recommendations.",
        "Your health metrics look good! Here's what I suggest for maintaining your wellness routine...",
        "I've found some relevant information about your condition. Would you like me to schedule a consultation with a specialist?",
        "That's a great question about your health. Let me provide you with evidence-based information and next steps."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: randomResponse,
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      
      // Add health suggestions
      setTimeout(() => {
        const suggestion: Message = {
          id: (Date.now() + 1).toString(),
          content: "💡 **Health Tip**: Remember to stay hydrated and maintain regular exercise for optimal health!",
          sender: 'ai',
          timestamp: new Date(),
          type: 'health-tip'
        };
        setMessages(prev => [...prev, suggestion]);
      }, 1500);
    }, 2000);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    onSendMessage?.(input);
    
    // Simulate AI response
    simulateAIResponse(input);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  };

  const MessageBubble = ({ message }: { message: Message }) => {
    const isAI = message.sender === 'ai';
    const isHealthTip = message.type === 'health-tip';
    
    return (
      <div className={cn(
        "flex items-start space-x-3 fade-in",
        isAI ? "justify-start" : "justify-end flex-row-reverse space-x-reverse"
      )}>
        {isAI && <AIAvatar />}
        {!isAI && <UserAvatar />}
        
        <div className={cn(
          "max-w-[70%] space-y-1",
          isAI && "mr-12",
          !isAI && "ml-12"
        )}>
          <GlassCard
            variant={isHealthTip ? "accent" : isAI ? "primary" : "default"}
            size="sm"
            hover="none"
            className={cn(
              "transition-all duration-300",
              isAI 
                ? "bg-gradient-to-br from-primary/10 to-accent/5" 
                : "bg-gradient-to-br from-white/20 to-white/10",
              isHealthTip && "border-accent/40 shadow-accent/20"
            )}
          >
            <p className={cn(
              "text-sm leading-relaxed",
              isHealthTip && "font-medium"
            )}>
              {message.content}
            </p>
            
            {isAI && (
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10">
                <span className="text-xs text-foreground/50">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => speakMessage(message.content)}
                  disabled={isSpeaking}
                  className="h-6 w-6 p-0 rounded-lg hover:bg-white/20"
                >
                  {isSpeaking ? (
                    <VolumeX className="h-3 w-3" />
                  ) : (
                    <Volume2 className="h-3 w-3" />
                  )}
                </Button>
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    );
  };

  const quickSuggestions = [
    "How can I improve my sleep?",
    "What are healthy heart rate ranges?",
    "Nutrition tips for better energy",
    "Emergency first aid basics"
  ];

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Header */}
      <GlassCard variant="primary" size="sm" className="mb-6">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <AIAvatar isTyping={isTyping} />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-cyber-green rounded-full border-2 border-background animate-pulse"></div>
          </div>
          <div>
            <h3 className="font-semibold text-foreground flex items-center">
              AI Health Assistant
              <Sparkles className="h-4 w-4 ml-2 text-neon-blue animate-pulse" />
            </h3>
            <p className="text-xs text-foreground/60">Always here to help with your health</p>
          </div>
        </div>
      </GlassCard>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar p-2">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-3">
              <AIAvatar isTyping={true} />
              <GlassCard variant="primary" size="sm" hover="none">
                <TypingIndicator />
              </GlassCard>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions */}
      <div className="py-4">
        <div className="flex flex-wrap gap-2">
          {quickSuggestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => setInput(suggestion)}
              className="glass-button text-xs hover:bg-primary/20 border-primary/30"
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>

      {/* Input */}
      <GlassCard variant="default" size="sm" className="mt-4">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              className="w-full bg-transparent border-none outline-none text-foreground placeholder-foreground/50 text-sm"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleListening}
              className={cn(
                "rounded-2xl transition-all duration-300",
                isListening 
                  ? "bg-red-500 text-white animate-pulse" 
                  : "hover:bg-primary/20"
              )}
            >
              {isListening ? (
                <MicOff className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </Button>
            
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="rounded-2xl bg-health-gradient hover:shadow-health transition-all duration-300 disabled:opacity-50"
              size="sm"
            >
              {isTyping ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default AIChat;
