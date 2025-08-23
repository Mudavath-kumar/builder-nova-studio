import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { 
  Heart, 
  ArrowLeft, 
  Bell,
  BellOff,
  Clock,
  Pill,
  Calendar,
  Activity,
  AlertTriangle,
  CheckCircle,
  Info,
  Zap,
  Brain,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Shield,
  Stethoscope,
  Phone,
  Mail,
  MessageCircle,
  Volume2,
  VolumeX,
  Settings,
  Filter,
  Archive,
  Trash2,
  MoreHorizontal,
  Plus,
  Edit,
  Search,
  Bookmark,
  Share2,
  RefreshCw
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: 'medication' | 'appointment' | 'health-tip' | 'emergency' | 'reminder' | 'update' | 'achievement';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  actionUrl?: string;
  actionLabel?: string;
  metadata?: {
    medicationName?: string;
    doctorName?: string;
    appointmentDate?: Date;
    achievementBadge?: string;
  };
}

interface NotificationSettings {
  medication: boolean;
  appointments: boolean;
  healthTips: boolean;
  emergencyAlerts: boolean;
  achievements: boolean;
  systemUpdates: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>([]);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState("");
  const [showRead, setShowRead] = useState(true);
  const [settings, setSettings] = useState<NotificationSettings>({
    medication: true,
    appointments: true,
    healthTips: true,
    emergencyAlerts: true,
    achievements: true,
    systemUpdates: false,
    soundEnabled: true,
    vibrationEnabled: true,
    quietHours: {
      enabled: true,
      start: "22:00",
      end: "07:00"
    }
  });

  // Mock notifications data
  const mockNotifications: Notification[] = [
    {
      id: '1',
      type: 'medication',
      title: 'Medication Reminder',
      message: "It's time to take your Lisinopril (10mg). Don't forget to take it with food.",
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      read: false,
      priority: 'high',
      category: 'Health',
      actionUrl: '/prescription-upload',
      actionLabel: 'Mark as Taken',
      metadata: {
        medicationName: 'Lisinopril 10mg'
      }
    },
    {
      id: '2',
      type: 'appointment',
      title: 'Upcoming Appointment',
      message: 'You have an appointment with Dr. Sarah Johnson tomorrow at 2:00 PM for your annual checkup.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: false,
      priority: 'medium',
      category: 'Healthcare',
      actionUrl: '/doctor-consultation',
      actionLabel: 'View Details',
      metadata: {
        doctorName: 'Dr. Sarah Johnson',
        appointmentDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
      }
    },
    {
      id: '3',
      type: 'health-tip',
      title: 'Daily Health Tip',
      message: 'Staying hydrated is crucial! Aim for 8 glasses of water today. Your current intake: 4/8 glasses.',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      read: true,
      priority: 'low',
      category: 'Wellness',
      actionUrl: '/dashboard',
      actionLabel: 'Track Water'
    },
    {
      id: '4',
      type: 'achievement',
      title: 'Achievement Unlocked!',
      message: 'Congratulations! You\'ve completed 7 days of consistent medication tracking. Keep up the great work!',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      read: false,
      priority: 'medium',
      category: 'Achievement',
      metadata: {
        achievementBadge: 'Consistency Champion'
      }
    },
    {
      id: '5',
      type: 'emergency',
      title: 'Emergency Contact Updated',
      message: 'Your emergency contact information has been successfully updated. John Doe is now your primary emergency contact.',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      read: true,
      priority: 'high',
      category: 'Security',
      actionUrl: '/emergency',
      actionLabel: 'Review Settings'
    },
    {
      id: '6',
      type: 'reminder',
      title: 'Health Check Reminder',
      message: 'Your blood pressure reading is due. Last reading was 3 days ago. Regular monitoring helps track your progress.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      read: false,
      priority: 'medium',
      category: 'Health Monitoring'
    },
    {
      id: '7',
      type: 'update',
      title: 'AI Analysis Complete',
      message: 'Your recent lab results have been analyzed by our AI. Overall health score improved by 5 points!',
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
      read: true,
      priority: 'medium',
      category: 'AI Insights',
      actionUrl: '/health-records',
      actionLabel: 'View Analysis'
    }
  ];

  useEffect(() => {
    setNotifications(mockNotifications);
  }, []);

  // Filter notifications
  useEffect(() => {
    let filtered = notifications;

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(n => n.type === filterType);
    }

    // Filter by read status
    if (!showRead) {
      filtered = filtered.filter(n => !n.read);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(n => 
        n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort by timestamp (newest first)
    filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    setFilteredNotifications(filtered);
  }, [notifications, filterType, showRead, searchTerm]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'medication': return Pill;
      case 'appointment': return Calendar;
      case 'health-tip': return Heart;
      case 'emergency': return AlertTriangle;
      case 'reminder': return Clock;
      case 'update': return Info;
      case 'achievement': return Star;
      default: return Bell;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'medication': return 'text-accent';
      case 'appointment': return 'text-primary';
      case 'health-tip': return 'text-cyber-green';
      case 'emergency': return 'text-health-red';
      case 'reminder': return 'text-warning-orange';
      case 'update': return 'text-neon-blue';
      case 'achievement': return 'text-warning-orange';
      default: return 'text-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-health-red text-white';
      case 'high': return 'bg-health-red/20 text-health-red';
      case 'medium': return 'bg-warning-orange/20 text-warning-orange';
      case 'low': return 'bg-cyber-green/20 text-cyber-green';
      default: return 'bg-foreground/20 text-foreground';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-neon-gradient rounded-full opacity-10 blur-3xl animate-float top-20 right-20" />
        <div className="absolute w-64 h-64 bg-cyber-gradient rounded-full opacity-10 blur-3xl animate-float bottom-20 left-20" style={{ animationDelay: '2s' }} />
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
                <div className="relative">
                  <div className="p-3 bg-neon-gradient rounded-3xl glow">
                    <Bell className="h-8 w-8 text-white" />
                  </div>
                  {unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-health-red text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                      {unreadCount}
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
                  <p className="text-sm text-foreground/60">
                    {unreadCount} unread • {notifications.length} total
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <GlassCard variant="primary" size="sm" className="px-4 py-2">
                <div className="flex items-center space-x-2">
                  <div className={cn(
                    "w-3 h-3 rounded-full",
                    settings.soundEnabled ? "bg-cyber-green animate-pulse" : "bg-gray-400"
                  )} />
                  <span className="text-sm font-medium">
                    {settings.soundEnabled ? "Sound On" : "Sound Off"}
                  </span>
                </div>
              </GlassCard>
              
              <Button
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
                variant="outline"
                className="glass-button"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark All Read
              </Button>
              
              <Link to="/settings">
                <Button className="button-health">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Panel - Filters & Settings */}
          <div className="space-y-6">
            {/* Quick Filters */}
            <GlassCard variant="primary" size="lg">
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-foreground flex items-center">
                  <Filter className="h-5 w-5 mr-2 text-primary" />
                  Filters
                </h2>
                
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary/60" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search notifications..."
                    className="w-full pl-10 pr-4 py-3 bg-primary/10 border border-primary/30 rounded-2xl outline-none focus:border-primary transition-all duration-300"
                  />
                </div>

                {/* Type Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Type</label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full px-4 py-3 bg-primary/10 border border-primary/30 rounded-2xl outline-none focus:border-primary transition-all duration-300"
                  >
                    <option value="all">All Types</option>
                    <option value="medication">Medication</option>
                    <option value="appointment">Appointments</option>
                    <option value="health-tip">Health Tips</option>
                    <option value="reminder">Reminders</option>
                    <option value="achievement">Achievements</option>
                    <option value="emergency">Emergency</option>
                    <option value="update">Updates</option>
                  </select>
                </div>

                {/* Show Read Toggle */}
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm font-medium text-foreground">Show Read</span>
                  <input
                    type="checkbox"
                    checked={showRead}
                    onChange={(e) => setShowRead(e.target.checked)}
                    className="w-4 h-4 text-primary rounded border-primary/30"
                  />
                </label>
              </div>
            </GlassCard>

            {/* Notification Stats */}
            <GlassCard variant="neon" size="default">
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-neon-blue" />
                  Statistics
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-neon-blue">{unreadCount}</div>
                    <div className="text-xs text-foreground/60">Unread</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyber-green">{notifications.length}</div>
                    <div className="text-xs text-foreground/60">Total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-warning-orange">
                      {notifications.filter(n => n.priority === 'high' || n.priority === 'urgent').length}
                    </div>
                    <div className="text-xs text-foreground/60">High Priority</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">
                      {notifications.filter(n => n.type === 'medication').length}
                    </div>
                    <div className="text-xs text-foreground/60">Medication</div>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Quick Settings */}
            <GlassCard variant="accent" size="default">
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-accent" />
                  Quick Settings
                </h3>
                
                <div className="space-y-3">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <Volume2 className="h-4 w-4 text-foreground/70" />
                      <span className="text-sm text-foreground">Sound</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.soundEnabled}
                      onChange={(e) => setSettings(prev => ({ ...prev, soundEnabled: e.target.checked }))}
                      className="w-4 h-4 text-primary rounded"
                    />
                  </label>
                  
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-foreground/70" />
                      <span className="text-sm text-foreground">Vibration</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.vibrationEnabled}
                      onChange={(e) => setSettings(prev => ({ ...prev, vibrationEnabled: e.target.checked }))}
                      className="w-4 h-4 text-primary rounded"
                    />
                  </label>
                  
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-foreground/70" />
                      <span className="text-sm text-foreground">Quiet Hours</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.quietHours.enabled}
                      onChange={(e) => setSettings(prev => ({ 
                        ...prev, 
                        quietHours: { ...prev.quietHours, enabled: e.target.checked }
                      }))}
                      className="w-4 h-4 text-primary rounded"
                    />
                  </label>
                </div>
                
                <Link to="/settings">
                  <Button variant="outline" className="w-full glass-button text-sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Full Settings
                  </Button>
                </Link>
              </div>
            </GlassCard>
          </div>

          {/* Center Panel - Notifications List */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                Recent Notifications
                {unreadCount > 0 && (
                  <span className="ml-3 px-3 py-1 bg-health-red text-white text-sm rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </h2>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="glass-button">
                  <Archive className="h-4 w-4 mr-2" />
                  Archive All
                </Button>
                <Button variant="outline" size="sm" className="glass-button">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="space-y-4">
              {filteredNotifications.length === 0 ? (
                <GlassCard variant="default" size="lg" className="text-center py-12">
                  <div className="space-y-4">
                    <Bell className="h-16 w-16 text-foreground/30 mx-auto" />
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">No Notifications</h3>
                      <p className="text-foreground/60">
                        {notifications.length === 0 
                          ? "You're all caught up! No notifications to show." 
                          : "No notifications match your current filters."
                        }
                      </p>
                    </div>
                    {notifications.length > 0 && (
                      <Button
                        onClick={() => {
                          setFilterType('all');
                          setSearchTerm('');
                          setShowRead(true);
                        }}
                        variant="outline"
                        className="glass-button"
                      >
                        Clear Filters
                      </Button>
                    )}
                  </div>
                </GlassCard>
              ) : (
                filteredNotifications.map((notification) => {
                  const Icon = getNotificationIcon(notification.type);
                  return (
                    <GlassCard 
                      key={notification.id} 
                      variant="default" 
                      size="lg" 
                      hover="lift"
                      className={cn(
                        "cursor-pointer transition-all duration-300",
                        !notification.read && "ring-2 ring-primary/50 bg-primary/5"
                      )}
                      onClick={() => !notification.read && markAsRead(notification.id)}
                    >
                      <div className="flex space-x-4">
                        {/* Icon & Status */}
                        <div className="flex-shrink-0">
                          <div className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center relative",
                            notification.type === 'medication' ? 'bg-accent/20' :
                            notification.type === 'appointment' ? 'bg-primary/20' :
                            notification.type === 'health-tip' ? 'bg-cyber-green/20' :
                            notification.type === 'emergency' ? 'bg-health-red/20' :
                            notification.type === 'reminder' ? 'bg-warning-orange/20' :
                            notification.type === 'achievement' ? 'bg-warning-orange/20' :
                            'bg-neon-blue/20'
                          )}>
                            <Icon className={cn("h-6 w-6", getNotificationColor(notification.type))} />
                            {!notification.read && (
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-pulse" />
                            )}
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-1">
                                <h3 className={cn(
                                  "font-semibold text-foreground",
                                  !notification.read && "font-bold"
                                )}>
                                  {notification.title}
                                </h3>
                                <div className={cn("px-2 py-1 rounded-full text-xs font-medium", getPriorityColor(notification.priority))}>
                                  {notification.priority}
                                </div>
                              </div>
                              
                              <p className={cn(
                                "text-foreground/70 leading-relaxed",
                                !notification.read && "text-foreground"
                              )}>
                                {notification.message}
                              </p>
                              
                              <div className="flex items-center space-x-4 mt-2">
                                <div className="flex items-center space-x-1 text-sm text-foreground/60">
                                  <Clock className="h-4 w-4" />
                                  <span>{getTimeAgo(notification.timestamp)}</span>
                                </div>
                                <div className="flex items-center space-x-1 text-sm text-foreground/60">
                                  <Target className="h-4 w-4" />
                                  <span>{notification.category}</span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Actions */}
                            <div className="flex items-center space-x-2 ml-4">
                              {notification.actionUrl && (
                                <Link to={notification.actionUrl}>
                                  <Button size="sm" className="button-health">
                                    {notification.actionLabel || 'View'}
                                  </Button>
                                </Link>
                              )}
                              
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id);
                                }}
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 hover:bg-health-red/20 hover:text-health-red"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          {/* Metadata */}
                          {notification.metadata && (
                            <div className="pt-2 border-t border-border/50">
                              {notification.metadata.medicationName && (
                                <div className="flex items-center space-x-2 text-sm text-foreground/60">
                                  <Pill className="h-4 w-4" />
                                  <span>Medication: {notification.metadata.medicationName}</span>
                                </div>
                              )}
                              {notification.metadata.doctorName && (
                                <div className="flex items-center space-x-2 text-sm text-foreground/60">
                                  <Stethoscope className="h-4 w-4" />
                                  <span>Doctor: {notification.metadata.doctorName}</span>
                                </div>
                              )}
                              {notification.metadata.achievementBadge && (
                                <div className="flex items-center space-x-2 text-sm text-foreground/60">
                                  <Star className="h-4 w-4" />
                                  <span>Badge: {notification.metadata.achievementBadge}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </GlassCard>
                  );
                })
              )}
            </div>

            {/* Load More */}
            {filteredNotifications.length > 0 && (
              <div className="text-center">
                <Button variant="outline" className="glass-button">
                  <Plus className="h-4 w-4 mr-2" />
                  Load More Notifications
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
