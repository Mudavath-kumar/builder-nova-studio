import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { 
  Heart, 
  Brain, 
  Upload, 
  Shield, 
  FileText, 
  Bell, 
  Pill, 
  Activity, 
  Calendar, 
  TrendingUp, 
  Plus, 
  MessageCircle,
  Zap,
  Users,
  Clock,
  Star,
  Sparkles,
  Bot,
  Mic,
  Camera,
  Phone,
  AlertCircle,
  CheckCircle,
  Map,
  Stethoscope,
  Thermometer,
  Droplets,
  Moon,
  Sun,
  Target,
  Award,
  Flame
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [healthScore, setHealthScore] = useState(85);
  const [heartRate, setHeartRate] = useState(72);
  const [waterIntake, setWaterIntake] = useState(6);
  const [sleepHours, setSleepHours] = useState(7.5);
  const [stepsCount, setStepsCount] = useState(8432);
  const [todayCalories, setTodayCalories] = useState(1847);
  const [isOnline, setIsOnline] = useState(true);

  // Simulate real-time data updates
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const healthInterval = setInterval(() => {
      // Simulate real-time health metrics
      setHeartRate(prev => {
        const variation = Math.random() * 6 - 3; // ±3 bpm variation
        return Math.max(60, Math.min(100, Math.round(prev + variation)));
      });
      
      setHealthScore(prev => {
        const variation = Math.random() * 2 - 1; // ±1 point variation
        return Math.max(70, Math.min(100, Math.round(prev + variation)));
      });
      
      setStepsCount(prev => prev + Math.floor(Math.random() * 5)); // Random step increases
    }, 5000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(healthInterval);
    };
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 90) return "text-cyber-green";
    if (score >= 75) return "text-primary";
    if (score >= 60) return "text-warning-orange";
    return "text-health-red";
  };

  const quickActions = [
    {
      title: "AI Symptom Check",
      description: "Instant health analysis",
      icon: Brain,
      gradient: "bg-neon-gradient",
      path: "/symptom-checker",
      glow: "shadow-neon"
    },
    {
      title: "Voice Assistant",
      description: "Hands-free consultation",
      icon: Mic,
      gradient: "bg-cyber-gradient",
      path: "/ai-chat",
      glow: "shadow-cyber"
    },
    {
      title: "Scan Prescription",
      description: "OCR medication scan",
      icon: Camera,
      gradient: "bg-health-gradient",
      path: "/prescription-upload",
      glow: "shadow-health"
    },
    {
      title: "Emergency SOS",
      description: "One-tap emergency call",
      icon: Shield,
      gradient: "bg-gradient-to-r from-health-red to-warning-orange",
      path: "/emergency",
      glow: "shadow-intense"
    }
  ];

  const healthMetrics = [
    {
      label: "Heart Rate",
      value: heartRate,
      unit: "BPM",
      icon: Heart,
      color: "text-health-red",
      trend: "+2%",
      isGood: heartRate >= 60 && heartRate <= 100
    },
    {
      label: "Water Intake",
      value: waterIntake,
      unit: "glasses",
      icon: Droplets,
      color: "text-neon-blue",
      trend: "+1",
      isGood: waterIntake >= 6
    },
    {
      label: "Sleep Quality",
      value: sleepHours,
      unit: "hours",
      icon: Moon,
      color: "text-deep-purple",
      trend: "+0.5h",
      isGood: sleepHours >= 7
    },
    {
      label: "Calories Burned",
      value: todayCalories,
      unit: "kcal",
      icon: Flame,
      color: "text-warning-orange",
      trend: "+120",
      isGood: todayCalories >= 1800
    }
  ];

  const aiInsights = [
    {
      id: 1,
      type: "recommendation",
      title: "Hydration Reminder",
      message: "You're doing great with water intake today! Try to reach 8 glasses for optimal hydration.",
      icon: Droplets,
      color: "text-neon-blue",
      priority: "low"
    },
    {
      id: 2,
      type: "alert",
      title: "Medication Reminder",
      message: "Don't forget to take your evening vitamin D supplement in 2 hours.",
      icon: Pill,
      color: "text-warning-orange",
      priority: "medium"
    },
    {
      id: 3,
      type: "insight",
      title: "Health Pattern Detected",
      message: "Your heart rate has been consistently healthy this week. Keep up the good work!",
      icon: TrendingUp,
      color: "text-cyber-green",
      priority: "high"
    }
  ];

  const recentActivity = [
    {
      action: "Completed AI symptom check",
      time: "2 hours ago",
      icon: Brain,
      color: "text-primary"
    },
    {
      action: "Updated medication schedule",
      time: "1 day ago",
      icon: Pill,
      color: "text-accent"
    },
    {
      action: "Emergency contact updated",
      time: "3 days ago",
      icon: Phone,
      color: "text-health-red"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-neon-gradient rounded-full opacity-5 blur-3xl animate-float top-20 right-20" />
        <div className="absolute w-64 h-64 bg-cyber-gradient rounded-full opacity-5 blur-3xl animate-float bottom-20 left-20" style={{ animationDelay: '3s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="relative">
                <div className="p-3 bg-health-gradient rounded-3xl shadow-health">
                  <Heart className="h-8 w-8 text-white heartbeat" />
                </div>
                <div className={cn(
                  "absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-background",
                  isOnline ? "bg-cyber-green animate-pulse" : "bg-gray-400"
                )} />
              </div>
              <div>
                <span className="text-2xl font-bold bg-health-gradient bg-clip-text text-transparent">
                  HealPulse
                </span>
                <div className="text-xs text-foreground/60">
                  {isOnline ? "AI Online" : "Offline"}
                </div>
              </div>
            </Link>
            
            <div className="flex items-center space-x-4">
              {/* Real-time Clock */}
              <GlassCard variant="primary" size="sm" className="px-4 py-2">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm font-mono">
                    {currentTime.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      second: '2-digit'
                    })}
                  </span>
                </div>
              </GlassCard>
              
              <Button variant="ghost" size="icon" className="glass-button rounded-2xl">
                <Bell className="h-5 w-5" />
              </Button>
              
              <GlassCard variant="default" size="sm" className="p-2">
                <div className="w-10 h-10 bg-primary/20 rounded-2xl flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">A</span>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Greeting & Status */}
        <div className="mb-8 fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-2">
                {getGreeting()}, Alex! 
                <span className="text-3xl ml-2">👋</span>
              </h1>
              <p className="text-foreground/70 text-lg">
                Your health is looking {healthScore >= 85 ? "excellent" : healthScore >= 70 ? "good" : "needs attention"} today
              </p>
            </div>
            
            <GlassCard variant="primary" size="sm" className="px-6 py-4">
              <div className="text-center">
                <div className={cn("text-3xl font-bold", getHealthScoreColor(healthScore))}>
                  {healthScore}
                </div>
                <div className="text-xs text-foreground/60">Health Score</div>
              </div>
            </GlassCard>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-3 space-y-8">
            {/* Quick Actions */}
            <section className="slide-up">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <Zap className="h-6 w-6 mr-3 text-primary" />
                Quick Actions
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {quickActions.map((action, index) => (
                  <Link key={index} to={action.path}>
                    <GlassCard variant="default" size="lg" hover="intense" className="card-interactive group">
                      <div className="flex items-center space-x-6">
                        <div className={cn(
                          "p-6 rounded-3xl transition-all duration-300 group-hover:scale-110",
                          action.gradient,
                          action.glow
                        )}>
                          <action.icon className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-foreground mb-2">{action.title}</h3>
                          <p className="text-foreground/70">{action.description}</p>
                        </div>
                      </div>
                    </GlassCard>
                  </Link>
                ))}
              </div>
            </section>

            {/* Health Metrics */}
            <section className="slide-up">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <Activity className="h-6 w-6 mr-3 text-primary" />
                Real-time Health Metrics
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {healthMetrics.map((metric, index) => (
                  <GlassCard key={index} variant="primary" size="default" hover="lift" className="text-center">
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        <div className={cn(
                          "p-4 rounded-2xl transition-all duration-300",
                          metric.isGood ? "bg-cyber-green/20" : "bg-warning-orange/20"
                        )}>
                          <metric.icon className={cn("h-8 w-8", metric.color)} />
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-3xl font-bold text-foreground">{metric.value}</div>
                        <div className="text-sm text-foreground/60">{metric.unit}</div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-foreground/50">{metric.label}</span>
                        <span className={cn(
                          "text-xs font-medium",
                          metric.isGood ? "text-cyber-green" : "text-warning-orange"
                        )}>
                          {metric.trend}
                        </span>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </section>

            {/* AI Insights */}
            <section className="slide-up">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <Brain className="h-6 w-6 mr-3 text-primary" />
                AI Health Insights
                <Sparkles className="h-5 w-5 ml-2 text-neon-blue animate-pulse" />
              </h2>
              <div className="space-y-4">
                {aiInsights.map((insight) => (
                  <GlassCard key={insight.id} variant="neon" size="default" hover="lift">
                    <div className="flex items-start space-x-4">
                      <div className={cn(
                        "p-3 rounded-2xl",
                        insight.priority === 'high' ? 'bg-cyber-green/20' :
                        insight.priority === 'medium' ? 'bg-warning-orange/20' :
                        'bg-neon-blue/20'
                      )}>
                        <insight.icon className={cn("h-6 w-6", insight.color)} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-foreground">{insight.title}</h3>
                          <div className={cn(
                            "w-3 h-3 rounded-full",
                            insight.priority === 'high' ? 'bg-cyber-green animate-pulse' :
                            insight.priority === 'medium' ? 'bg-warning-orange animate-pulse' :
                            'bg-neon-blue'
                          )} />
                        </div>
                        <p className="text-foreground/70 text-sm leading-relaxed">{insight.message}</p>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar - Right Side */}
          <div className="space-y-8">
            {/* Health Score Visualization */}
            <section className="slide-up">
              <h2 className="text-xl font-bold text-foreground mb-6">Health Overview</h2>
              <GlassCard variant="primary" size="lg" className="text-center">
                <div className="space-y-6">
                  {/* Circular Progress */}
                  <div className="relative w-32 h-32 mx-auto">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-gray-200"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 50}`}
                        strokeDashoffset={`${2 * Math.PI * 50 * (1 - healthScore / 100)}`}
                        className={cn(
                          "transition-all duration-1000",
                          getHealthScoreColor(healthScore)
                        )}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className={cn("text-4xl font-bold", getHealthScoreColor(healthScore))}>
                          {healthScore}
                        </div>
                        <div className="text-xs text-foreground/60">
                          {healthScore >= 85 ? "Excellent" : healthScore >= 70 ? "Good" : "Needs Care"}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-foreground/70">
                    Your health score is updated in real-time based on your activities and metrics.
                  </p>
                  
                  <Button variant="outline" size="sm" className="glass-button">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </GlassCard>
            </section>

            {/* AI Assistant */}
            <section className="slide-up">
              <h2 className="text-xl font-bold text-foreground mb-6">AI Assistant</h2>
              <GlassCard variant="neon" size="lg" className="text-center">
                <div className="space-y-6">
                  <div className="relative">
                    <div className="w-16 h-16 bg-neon-gradient rounded-3xl flex items-center justify-center mx-auto glow">
                      <Bot className="h-8 w-8 text-white animate-pulse" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-cyber-green rounded-full animate-ping" />
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-foreground mb-2">Ready to Help!</h3>
                    <p className="text-sm text-foreground/70 mb-4">
                      I'm monitoring your health 24/7. Ask me anything about your symptoms or wellness.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Link to="/ai-chat">
                      <Button className="w-full button-cyber text-black">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Start Chat
                      </Button>
                    </Link>
                    <Link to="/ai-chat">
                      <Button variant="outline" className="w-full glass-button">
                        <Mic className="h-4 w-4 mr-2" />
                        Voice Chat
                      </Button>
                    </Link>
                  </div>
                </div>
              </GlassCard>
            </section>

            {/* Recent Activity */}
            <section className="slide-up">
              <h2 className="text-xl font-bold text-foreground mb-6">Recent Activity</h2>
              <GlassCard variant="default" size="default">
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 bg-primary/5 rounded-2xl">
                      <div className="p-2 bg-primary/10 rounded-xl">
                        <activity.icon className={cn("h-4 w-4", activity.color)} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{activity.action}</p>
                        <p className="text-xs text-foreground/60">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="ghost" size="sm" className="w-full glass-button mt-4">
                    View All Activity
                  </Button>
                </div>
              </GlassCard>
            </section>

            {/* Quick Stats */}
            <section className="slide-up">
              <h2 className="text-xl font-bold text-foreground mb-6">Today's Goals</h2>
              <div className="space-y-4">
                <GlassCard variant="accent" size="sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Target className="h-5 w-5 text-accent" />
                      <span className="text-sm font-medium">Steps Goal</span>
                    </div>
                    <span className="text-sm font-bold text-accent">{stepsCount}/10,000</span>
                  </div>
                  <div className="mt-2 bg-accent/20 rounded-full h-2">
                    <div 
                      className="bg-accent rounded-full h-2 transition-all duration-500"
                      style={{ width: `${Math.min(100, (stepsCount / 10000) * 100)}%` }}
                    />
                  </div>
                </GlassCard>
                
                <GlassCard variant="primary" size="sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Droplets className="h-5 w-5 text-neon-blue" />
                      <span className="text-sm font-medium">Water Intake</span>
                    </div>
                    <span className="text-sm font-bold text-neon-blue">{waterIntake}/8 glasses</span>
                  </div>
                  <div className="mt-2 bg-neon-blue/20 rounded-full h-2">
                    <div 
                      className="bg-neon-blue rounded-full h-2 transition-all duration-500"
                      style={{ width: `${Math.min(100, (waterIntake / 8) * 100)}%` }}
                    />
                  </div>
                </GlassCard>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
