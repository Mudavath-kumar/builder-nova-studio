import { Button } from "@/components/ui/button";
import { Heart, Brain, Upload, Shield, FileText, Bell, Pill, Activity, Calendar, TrendingUp, Plus, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const healthScore = 85;

  const reminders = [
    { id: 1, text: "Take Vitamin D supplement", time: "9:00 AM", icon: Pill },
    { id: 2, text: "Drink 8 glasses of water today", time: "Throughout day", icon: Activity },
    { id: 3, text: "Schedule annual checkup", time: "This week", icon: Calendar },
    { id: 4, text: "Review blood pressure readings", time: "Weekly", icon: Heart },
  ];

  const quickActions = [
    {
      title: "Symptom Check",
      description: "AI-powered symptom analysis",
      icon: Brain,
      color: "bg-primary/10 text-primary",
      path: "/symptom-checker"
    },
    {
      title: "Upload Prescription",
      description: "Scan and manage medications",
      icon: Upload,
      color: "bg-accent/20 text-accent",
      path: "/prescription-upload"
    },
    {
      title: "Emergency",
      description: "Quick access to emergency aid",
      icon: Shield,
      color: "bg-red-100 text-red-500",
      path: "/emergency"
    },
    {
      title: "Health Records",
      description: "View your medical history",
      icon: FileText,
      color: "bg-blue-100 text-blue-500",
      path: "/health-records"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-2xl">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-bold text-foreground">HealPulse</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="rounded-2xl">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="neumorphic rounded-2xl p-2">
                <div className="w-8 h-8 bg-primary/20 rounded-xl flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">A</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Greeting Section */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
            {getGreeting()}, Alex! 👋
          </h1>
          <p className="text-foreground/70 text-lg">How are you feeling today? Let's check on your health.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-6">Quick Actions</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {quickActions.map((action, index) => (
                  <Link key={index} to={action.path}>
                    <div className="neumorphic rounded-3xl p-6 card-hover cursor-pointer bg-background">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-2xl ${action.color}`}>
                          <action.icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{action.title}</h3>
                          <p className="text-sm text-foreground/70">{action.description}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Reminders & Tips */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-foreground">Today's Reminders</h2>
                <Button variant="ghost" size="sm" className="rounded-2xl">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Reminder
                </Button>
              </div>
              
              <div className="flex space-x-4 overflow-x-auto pb-4">
                {reminders.map((reminder) => (
                  <div key={reminder.id} className="neumorphic rounded-2xl p-4 min-w-[280px] bg-background">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-xl">
                        <reminder.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground text-sm">{reminder.text}</p>
                        <p className="text-xs text-foreground/60">{reminder.time}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="rounded-xl h-8 w-8 p-0">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recent Activity */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-6">Recent Activity</h2>
              <div className="neumorphic rounded-3xl p-6 bg-background">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-primary/5 rounded-2xl">
                    <div className="p-2 bg-primary/10 rounded-xl">
                      <Brain className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">Symptom check completed</p>
                      <p className="text-sm text-foreground/60">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-accent/10 rounded-2xl">
                    <div className="p-2 bg-accent/20 rounded-xl">
                      <Pill className="h-5 w-5 text-accent" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">Medication reminder set</p>
                      <p className="text-sm text-foreground/60">Yesterday</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-2xl">
                    <div className="p-2 bg-blue-100 rounded-xl">
                      <FileText className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">Health record updated</p>
                      <p className="text-sm text-foreground/60">3 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Health Score */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-6">Health Score</h2>
              <div className="neumorphic rounded-3xl p-6 bg-background text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
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
                      className="text-primary transition-all duration-1000"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">{healthScore}</div>
                      <div className="text-xs text-foreground/60">Good</div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-foreground/70 mb-4">
                  Your health score is looking great! Keep up the good work.
                </p>
                <Button variant="outline" size="sm" className="rounded-2xl">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
            </section>

            {/* AI Assistant */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-6">AI Assistant</h2>
              <div className="neumorphic rounded-3xl p-6 bg-gradient-to-br from-primary/5 to-accent/5">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                    <Brain className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Ask me anything!</h3>
                    <p className="text-sm text-foreground/70 mb-4">
                      I'm here to help with health questions, symptoms, or medication guidance.
                    </p>
                  </div>
                  <Link to="/ai-chat">
                    <Button className="rounded-2xl bg-primary hover:bg-primary/90 card-hover">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Start Chat
                    </Button>
                  </Link>
                </div>
              </div>
            </section>

            {/* Quick Stats */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-6">This Week</h2>
              <div className="space-y-4">
                <div className="neumorphic rounded-2xl p-4 bg-background">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Heart className="h-5 w-5 text-red-500" />
                      <span className="text-sm font-medium">Heart Rate</span>
                    </div>
                    <span className="text-sm font-semibold text-primary">72 BPM</span>
                  </div>
                </div>
                
                <div className="neumorphic rounded-2xl p-4 bg-background">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Activity className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-medium">Steps</span>
                    </div>
                    <span className="text-sm font-semibold text-primary">8,432</span>
                  </div>
                </div>
                
                <div className="neumorphic rounded-2xl p-4 bg-background">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Pill className="h-5 w-5 text-blue-500" />
                      <span className="text-sm font-medium">Medications</span>
                    </div>
                    <span className="text-sm font-semibold text-primary">2/3 taken</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
