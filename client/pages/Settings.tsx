import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { 
  Heart, 
  ArrowLeft, 
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Smartphone,
  Monitor,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Lock,
  Key,
  Mail,
  Phone,
  Camera,
  Mic,
  MapPin,
  Cloud,
  Download,
  Upload,
  Trash2,
  RefreshCw,
  Save,
  Edit,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
  Info,
  Zap,
  Brain,
  Sparkles,
  Target,
  Award,
  Activity,
  Clock,
  Calendar,
  Users,
  MessageCircle,
  Share2,
  Bookmark,
  Star,
  Filter,
  Search,
  Plus,
  Minus,
  MoreHorizontal
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  profilePicture?: string;
  bio: string;
}

interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'healthcare-only';
  shareHealthData: boolean;
  allowDataAnalytics: boolean;
  shareWithResearchers: boolean;
  locationTracking: boolean;
  activityTracking: boolean;
  twoFactorAuth: boolean;
  biometricLogin: boolean;
}

interface NotificationSettings {
  medication: boolean;
  appointments: boolean;
  healthTips: boolean;
  emergencyAlerts: boolean;
  achievements: boolean;
  systemUpdates: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
}

interface AppearanceSettings {
  theme: 'light' | 'dark' | 'auto';
  accentColor: string;
  fontSize: 'small' | 'medium' | 'large';
  animations: boolean;
  glassEffects: boolean;
  highContrast: boolean;
  colorBlindFriendly: boolean;
}

interface HealthSettings {
  units: 'metric' | 'imperial';
  language: string;
  timezone: string;
  defaultReminderTime: string;
  healthScoreVisible: boolean;
  aiInsightsEnabled: boolean;
  voiceAssistant: boolean;
  emergencyContacts: string[];
}

export default function Settings() {
  const [activeSection, setActiveSection] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const [profile, setProfile] = useState<UserProfile>({
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-05-15',
    bio: 'Health enthusiast focused on preventive care and wellness.'
  });

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profileVisibility: 'private',
    shareHealthData: false,
    allowDataAnalytics: true,
    shareWithResearchers: false,
    locationTracking: true,
    activityTracking: true,
    twoFactorAuth: true,
    biometricLogin: false
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    medication: true,
    appointments: true,
    healthTips: true,
    emergencyAlerts: true,
    achievements: true,
    systemUpdates: false,
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    soundEnabled: true,
    vibrationEnabled: true,
    quietHours: {
      enabled: true,
      start: '22:00',
      end: '07:00'
    }
  });

  const [appearance, setAppearance] = useState<AppearanceSettings>({
    theme: 'auto',
    accentColor: '#87CEEB',
    fontSize: 'medium',
    animations: true,
    glassEffects: true,
    highContrast: false,
    colorBlindFriendly: false
  });

  const [health, setHealth] = useState<HealthSettings>({
    units: 'imperial',
    language: 'en-US',
    timezone: 'America/New_York',
    defaultReminderTime: '09:00',
    healthScoreVisible: true,
    aiInsightsEnabled: true,
    voiceAssistant: true,
    emergencyContacts: ['John Doe', 'Jane Smith']
  });

  const sections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'health', label: 'Health Settings', icon: Heart },
    { id: 'data', label: 'Data & Storage', icon: Cloud },
    { id: 'about', label: 'About', icon: Info }
  ];

  const saveSettings = () => {
    // Simulate saving to server
    setIsEditing(false);
    setHasChanges(false);
    console.log('Settings saved:', { profile, privacy, notifications, appearance, health });
  };

  const resetSettings = () => {
    // Reset to defaults
    setHasChanges(false);
    console.log('Settings reset to defaults');
  };

  const exportData = () => {
    const data = { profile, privacy, notifications, appearance, health };
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'healpulse_settings.json';
    link.click();
  };

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
                <div className="p-3 bg-neon-gradient rounded-3xl glow">
                  <Settings className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Settings</h1>
                  <p className="text-sm text-foreground/60">Customize your HealPulse experience</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {hasChanges && (
                <GlassCard variant="health" size="sm" className="px-4 py-2 bg-warning-orange/20">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-warning-orange rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-warning-orange">Unsaved Changes</span>
                  </div>
                </GlassCard>
              )}
              
              <Button
                onClick={saveSettings}
                disabled={!hasChanges}
                className="button-health"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Panel - Navigation */}
          <div className="space-y-6">
            <GlassCard variant="primary" size="lg">
              <div className="space-y-4">
                <h2 className="font-bold text-foreground">Settings Menu</h2>
                
                <div className="space-y-1">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <Button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        variant={activeSection === section.id ? 'default' : 'ghost'}
                        className={cn(
                          "w-full justify-start h-auto p-3 transition-all duration-300",
                          activeSection === section.id 
                            ? "bg-primary text-white shadow-lg" 
                            : "glass-button hover:bg-primary/10"
                        )}
                      >
                        <Icon className="h-5 w-5 mr-3" />
                        <span>{section.label}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>
            </GlassCard>

            {/* Quick Actions */}
            <GlassCard variant="accent" size="default">
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Quick Actions</h3>
                
                <div className="space-y-2">
                  <Button
                    onClick={exportData}
                    variant="outline"
                    className="w-full justify-start glass-button text-sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Settings
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start glass-button text-sm"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Import Settings
                  </Button>
                  <Button
                    onClick={resetSettings}
                    variant="outline"
                    className="w-full justify-start glass-button text-sm"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset to Defaults
                  </Button>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Center Panel - Settings Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile Settings */}
            {activeSection === 'profile' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">Profile Settings</h2>
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    variant="outline"
                    className="glass-button"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </Button>
                </div>

                <GlassCard variant="primary" size="lg">
                  <div className="space-y-6">
                    {/* Profile Picture */}
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center">
                          {profile.profilePicture ? (
                            <img 
                              src={profile.profilePicture} 
                              alt="Profile" 
                              className="w-24 h-24 rounded-full object-cover"
                            />
                          ) : (
                            <User className="h-12 w-12 text-primary/60" />
                          )}
                        </div>
                        {isEditing && (
                          <Button 
                            size="sm" 
                            className="absolute -bottom-2 -right-2 w-8 h-8 p-0 rounded-full"
                          >
                            <Camera className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground">
                          {profile.firstName} {profile.lastName}
                        </h3>
                        <p className="text-foreground/60">{profile.email}</p>
                        <p className="text-sm text-foreground/50">{profile.bio}</p>
                      </div>
                    </div>

                    {/* Profile Form */}
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">First Name</label>
                        <input
                          type="text"
                          value={profile.firstName}
                          onChange={(e) => {
                            setProfile(prev => ({ ...prev, firstName: e.target.value }));
                            setHasChanges(true);
                          }}
                          disabled={!isEditing}
                          className={cn(
                            "w-full px-4 py-3 rounded-2xl border transition-all duration-300",
                            isEditing 
                              ? "bg-primary/10 border-primary/30 focus:border-primary outline-none" 
                              : "bg-foreground/5 border-transparent text-foreground/70"
                          )}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Last Name</label>
                        <input
                          type="text"
                          value={profile.lastName}
                          onChange={(e) => {
                            setProfile(prev => ({ ...prev, lastName: e.target.value }));
                            setHasChanges(true);
                          }}
                          disabled={!isEditing}
                          className={cn(
                            "w-full px-4 py-3 rounded-2xl border transition-all duration-300",
                            isEditing 
                              ? "bg-primary/10 border-primary/30 focus:border-primary outline-none" 
                              : "bg-foreground/5 border-transparent text-foreground/70"
                          )}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Email</label>
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) => {
                            setProfile(prev => ({ ...prev, email: e.target.value }));
                            setHasChanges(true);
                          }}
                          disabled={!isEditing}
                          className={cn(
                            "w-full px-4 py-3 rounded-2xl border transition-all duration-300",
                            isEditing 
                              ? "bg-primary/10 border-primary/30 focus:border-primary outline-none" 
                              : "bg-foreground/5 border-transparent text-foreground/70"
                          )}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Phone</label>
                        <input
                          type="tel"
                          value={profile.phone}
                          onChange={(e) => {
                            setProfile(prev => ({ ...prev, phone: e.target.value }));
                            setHasChanges(true);
                          }}
                          disabled={!isEditing}
                          className={cn(
                            "w-full px-4 py-3 rounded-2xl border transition-all duration-300",
                            isEditing 
                              ? "bg-primary/10 border-primary/30 focus:border-primary outline-none" 
                              : "bg-foreground/5 border-transparent text-foreground/70"
                          )}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Date of Birth</label>
                        <input
                          type="date"
                          value={profile.dateOfBirth}
                          onChange={(e) => {
                            setProfile(prev => ({ ...prev, dateOfBirth: e.target.value }));
                            setHasChanges(true);
                          }}
                          disabled={!isEditing}
                          className={cn(
                            "w-full px-4 py-3 rounded-2xl border transition-all duration-300",
                            isEditing 
                              ? "bg-primary/10 border-primary/30 focus:border-primary outline-none" 
                              : "bg-foreground/5 border-transparent text-foreground/70"
                          )}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Bio</label>
                      <textarea
                        value={profile.bio}
                        onChange={(e) => {
                          setProfile(prev => ({ ...prev, bio: e.target.value }));
                          setHasChanges(true);
                        }}
                        disabled={!isEditing}
                        rows={3}
                        className={cn(
                          "w-full px-4 py-3 rounded-2xl border transition-all duration-300 resize-none",
                          isEditing 
                            ? "bg-primary/10 border-primary/30 focus:border-primary outline-none" 
                            : "bg-foreground/5 border-transparent text-foreground/70"
                        )}
                      />
                    </div>
                  </div>
                </GlassCard>
              </div>
            )}

            {/* Notification Settings */}
            {activeSection === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Notification Settings</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <GlassCard variant="primary" size="lg">
                    <div className="space-y-6">
                      <h3 className="text-lg font-bold text-foreground">Notification Types</h3>
                      
                      <div className="space-y-4">
                        {Object.entries(notifications).slice(0, 6).map(([key, value]) => (
                          <label key={key} className="flex items-center justify-between cursor-pointer">
                            <div className="flex items-center space-x-3">
                              <div className={cn(
                                "p-2 rounded-xl",
                                key === 'medication' ? 'bg-accent/20' :
                                key === 'appointments' ? 'bg-primary/20' :
                                key === 'healthTips' ? 'bg-cyber-green/20' :
                                key === 'emergencyAlerts' ? 'bg-health-red/20' :
                                key === 'achievements' ? 'bg-warning-orange/20' :
                                'bg-neon-blue/20'
                              )}>
                                {key === 'medication' && <Pill className="h-4 w-4 text-accent" />}
                                {key === 'appointments' && <Calendar className="h-4 w-4 text-primary" />}
                                {key === 'healthTips' && <Heart className="h-4 w-4 text-cyber-green" />}
                                {key === 'emergencyAlerts' && <AlertTriangle className="h-4 w-4 text-health-red" />}
                                {key === 'achievements' && <Star className="h-4 w-4 text-warning-orange" />}
                                {key === 'systemUpdates' && <Settings className="h-4 w-4 text-neon-blue" />}
                              </div>
                              <div>
                                <span className="text-sm font-medium text-foreground capitalize">
                                  {key.replace(/([A-Z])/g, ' $1').trim()}
                                </span>
                              </div>
                            </div>
                            <input
                              type="checkbox"
                              checked={value as boolean}
                              onChange={(e) => {
                                setNotifications(prev => ({ ...prev, [key]: e.target.checked }));
                                setHasChanges(true);
                              }}
                              className="w-4 h-4 text-primary rounded border-primary/30"
                            />
                          </label>
                        ))}
                      </div>
                    </div>
                  </GlassCard>

                  <GlassCard variant="neon" size="lg">
                    <div className="space-y-6">
                      <h3 className="text-lg font-bold text-foreground">Delivery Methods</h3>
                      
                      <div className="space-y-4">
                        <label className="flex items-center justify-between cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-neon-blue/20 rounded-xl">
                              <Smartphone className="h-4 w-4 text-neon-blue" />
                            </div>
                            <span className="text-sm font-medium text-foreground">Push Notifications</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={notifications.pushNotifications}
                            onChange={(e) => {
                              setNotifications(prev => ({ ...prev, pushNotifications: e.target.checked }));
                              setHasChanges(true);
                            }}
                            className="w-4 h-4 text-primary rounded border-primary/30"
                          />
                        </label>

                        <label className="flex items-center justify-between cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-accent/20 rounded-xl">
                              <Mail className="h-4 w-4 text-accent" />
                            </div>
                            <span className="text-sm font-medium text-foreground">Email Notifications</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={notifications.emailNotifications}
                            onChange={(e) => {
                              setNotifications(prev => ({ ...prev, emailNotifications: e.target.checked }));
                              setHasChanges(true);
                            }}
                            className="w-4 h-4 text-primary rounded border-primary/30"
                          />
                        </label>

                        <label className="flex items-center justify-between cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-cyber-green/20 rounded-xl">
                              <MessageCircle className="h-4 w-4 text-cyber-green" />
                            </div>
                            <span className="text-sm font-medium text-foreground">SMS Notifications</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={notifications.smsNotifications}
                            onChange={(e) => {
                              setNotifications(prev => ({ ...prev, smsNotifications: e.target.checked }));
                              setHasChanges(true);
                            }}
                            className="w-4 h-4 text-primary rounded border-primary/30"
                          />
                        </label>

                        <label className="flex items-center justify-between cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-warning-orange/20 rounded-xl">
                              <Volume2 className="h-4 w-4 text-warning-orange" />
                            </div>
                            <span className="text-sm font-medium text-foreground">Sound Enabled</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={notifications.soundEnabled}
                            onChange={(e) => {
                              setNotifications(prev => ({ ...prev, soundEnabled: e.target.checked }));
                              setHasChanges(true);
                            }}
                            className="w-4 h-4 text-primary rounded border-primary/30"
                          />
                        </label>

                        <label className="flex items-center justify-between cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-deep-purple/20 rounded-xl">
                              <Phone className="h-4 w-4 text-deep-purple" />
                            </div>
                            <span className="text-sm font-medium text-foreground">Vibration</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={notifications.vibrationEnabled}
                            onChange={(e) => {
                              setNotifications(prev => ({ ...prev, vibrationEnabled: e.target.checked }));
                              setHasChanges(true);
                            }}
                            className="w-4 h-4 text-primary rounded border-primary/30"
                          />
                        </label>
                      </div>

                      {/* Quiet Hours */}
                      <div className="pt-4 border-t border-border/50">
                        <div className="space-y-4">
                          <label className="flex items-center justify-between cursor-pointer">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-primary/20 rounded-xl">
                                <Moon className="h-4 w-4 text-primary" />
                              </div>
                              <span className="text-sm font-medium text-foreground">Quiet Hours</span>
                            </div>
                            <input
                              type="checkbox"
                              checked={notifications.quietHours.enabled}
                              onChange={(e) => {
                                setNotifications(prev => ({ 
                                  ...prev, 
                                  quietHours: { ...prev.quietHours, enabled: e.target.checked }
                                }));
                                setHasChanges(true);
                              }}
                              className="w-4 h-4 text-primary rounded border-primary/30"
                            />
                          </label>

                          {notifications.quietHours.enabled && (
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="text-xs font-medium text-foreground/70">Start Time</label>
                                <input
                                  type="time"
                                  value={notifications.quietHours.start}
                                  onChange={(e) => {
                                    setNotifications(prev => ({ 
                                      ...prev, 
                                      quietHours: { ...prev.quietHours, start: e.target.value }
                                    }));
                                    setHasChanges(true);
                                  }}
                                  className="w-full px-3 py-2 bg-primary/10 border border-primary/30 rounded-xl text-sm outline-none focus:border-primary"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-xs font-medium text-foreground/70">End Time</label>
                                <input
                                  type="time"
                                  value={notifications.quietHours.end}
                                  onChange={(e) => {
                                    setNotifications(prev => ({ 
                                      ...prev, 
                                      quietHours: { ...prev.quietHours, end: e.target.value }
                                    }));
                                    setHasChanges(true);
                                  }}
                                  className="w-full px-3 py-2 bg-primary/10 border border-primary/30 rounded-xl text-sm outline-none focus:border-primary"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </div>
            )}

            {/* Privacy & Security Settings */}
            {activeSection === 'privacy' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Privacy & Security</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <GlassCard variant="health" size="lg">
                    <div className="space-y-6">
                      <h3 className="text-lg font-bold text-foreground flex items-center">
                        <Shield className="h-5 w-5 mr-2 text-health-red" />
                        Security Settings
                      </h3>
                      
                      <div className="space-y-4">
                        <label className="flex items-center justify-between cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-health-red/20 rounded-xl">
                              <Lock className="h-4 w-4 text-health-red" />
                            </div>
                            <div>
                              <span className="text-sm font-medium text-foreground">Two-Factor Authentication</span>
                              <div className="text-xs text-foreground/60">Extra security for your account</div>
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={privacy.twoFactorAuth}
                            onChange={(e) => {
                              setPrivacy(prev => ({ ...prev, twoFactorAuth: e.target.checked }));
                              setHasChanges(true);
                            }}
                            className="w-4 h-4 text-primary rounded border-primary/30"
                          />
                        </label>

                        <label className="flex items-center justify-between cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-neon-blue/20 rounded-xl">
                              <Eye className="h-4 w-4 text-neon-blue" />
                            </div>
                            <div>
                              <span className="text-sm font-medium text-foreground">Biometric Login</span>
                              <div className="text-xs text-foreground/60">Use fingerprint or face ID</div>
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={privacy.biometricLogin}
                            onChange={(e) => {
                              setPrivacy(prev => ({ ...prev, biometricLogin: e.target.checked }));
                              setHasChanges(true);
                            }}
                            className="w-4 h-4 text-primary rounded border-primary/30"
                          />
                        </label>

                        <div className="pt-4 space-y-2">
                          <Button variant="outline" className="w-full glass-button justify-start">
                            <Key className="h-4 w-4 mr-2" />
                            Change Password
                          </Button>
                          <Button variant="outline" className="w-full glass-button justify-start">
                            <Download className="h-4 w-4 mr-2" />
                            Download Security Report
                          </Button>
                        </div>
                      </div>
                    </div>
                  </GlassCard>

                  <GlassCard variant="accent" size="lg">
                    <div className="space-y-6">
                      <h3 className="text-lg font-bold text-foreground flex items-center">
                        <Eye className="h-5 w-5 mr-2 text-accent" />
                        Privacy Controls
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">Profile Visibility</label>
                          <select
                            value={privacy.profileVisibility}
                            onChange={(e) => {
                              setPrivacy(prev => ({ ...prev, profileVisibility: e.target.value as any }));
                              setHasChanges(true);
                            }}
                            className="w-full px-4 py-3 bg-accent/10 border border-accent/30 rounded-2xl outline-none focus:border-accent transition-all duration-300"
                          >
                            <option value="public">Public</option>
                            <option value="healthcare-only">Healthcare Providers Only</option>
                            <option value="private">Private</option>
                          </select>
                        </div>

                        <label className="flex items-center justify-between cursor-pointer">
                          <div>
                            <span className="text-sm font-medium text-foreground">Share Health Data</span>
                            <div className="text-xs text-foreground/60">Allow sharing for better care</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={privacy.shareHealthData}
                            onChange={(e) => {
                              setPrivacy(prev => ({ ...prev, shareHealthData: e.target.checked }));
                              setHasChanges(true);
                            }}
                            className="w-4 h-4 text-primary rounded border-primary/30"
                          />
                        </label>

                        <label className="flex items-center justify-between cursor-pointer">
                          <div>
                            <span className="text-sm font-medium text-foreground">Analytics & Insights</span>
                            <div className="text-xs text-foreground/60">Help improve AI recommendations</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={privacy.allowDataAnalytics}
                            onChange={(e) => {
                              setPrivacy(prev => ({ ...prev, allowDataAnalytics: e.target.checked }));
                              setHasChanges(true);
                            }}
                            className="w-4 h-4 text-primary rounded border-primary/30"
                          />
                        </label>

                        <label className="flex items-center justify-between cursor-pointer">
                          <div>
                            <span className="text-sm font-medium text-foreground">Research Participation</span>
                            <div className="text-xs text-foreground/60">Anonymous data for medical research</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={privacy.shareWithResearchers}
                            onChange={(e) => {
                              setPrivacy(prev => ({ ...prev, shareWithResearchers: e.target.checked }));
                              setHasChanges(true);
                            }}
                            className="w-4 h-4 text-primary rounded border-primary/30"
                          />
                        </label>

                        <label className="flex items-center justify-between cursor-pointer">
                          <div>
                            <span className="text-sm font-medium text-foreground">Location Tracking</span>
                            <div className="text-xs text-foreground/60">For emergency services</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={privacy.locationTracking}
                            onChange={(e) => {
                              setPrivacy(prev => ({ ...prev, locationTracking: e.target.checked }));
                              setHasChanges(true);
                            }}
                            className="w-4 h-4 text-primary rounded border-primary/30"
                          />
                        </label>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeSection === 'appearance' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Appearance</h2>

                <GlassCard variant="neon" size="lg">
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-foreground flex items-center">
                      <Palette className="h-5 w-5 mr-2 text-neon-blue" />
                      Theme & Display
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">Theme</label>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { value: 'light', label: 'Light', icon: Sun },
                              { value: 'dark', label: 'Dark', icon: Moon },
                              { value: 'auto', label: 'Auto', icon: Monitor }
                            ].map(option => {
                              const Icon = option.icon;
                              return (
                                <Button
                                  key={option.value}
                                  variant={appearance.theme === option.value ? 'default' : 'outline'}
                                  onClick={() => {
                                    setAppearance(prev => ({ ...prev, theme: option.value as any }));
                                    setHasChanges(true);
                                  }}
                                  className={cn(
                                    "flex-col h-auto p-4",
                                    appearance.theme === option.value ? "bg-primary text-white" : "glass-button"
                                  )}
                                >
                                  <Icon className="h-5 w-5 mb-2" />
                                  <span className="text-xs">{option.label}</span>
                                </Button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">Font Size</label>
                          <select
                            value={appearance.fontSize}
                            onChange={(e) => {
                              setAppearance(prev => ({ ...prev, fontSize: e.target.value as any }));
                              setHasChanges(true);
                            }}
                            className="w-full px-4 py-3 bg-neon-blue/10 border border-neon-blue/30 rounded-2xl outline-none focus:border-neon-blue transition-all duration-300"
                          >
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="flex items-center justify-between cursor-pointer">
                          <span className="text-sm font-medium text-foreground">Animations</span>
                          <input
                            type="checkbox"
                            checked={appearance.animations}
                            onChange={(e) => {
                              setAppearance(prev => ({ ...prev, animations: e.target.checked }));
                              setHasChanges(true);
                            }}
                            className="w-4 h-4 text-primary rounded border-primary/30"
                          />
                        </label>

                        <label className="flex items-center justify-between cursor-pointer">
                          <span className="text-sm font-medium text-foreground">Glass Effects</span>
                          <input
                            type="checkbox"
                            checked={appearance.glassEffects}
                            onChange={(e) => {
                              setAppearance(prev => ({ ...prev, glassEffects: e.target.checked }));
                              setHasChanges(true);
                            }}
                            className="w-4 h-4 text-primary rounded border-primary/30"
                          />
                        </label>

                        <label className="flex items-center justify-between cursor-pointer">
                          <span className="text-sm font-medium text-foreground">High Contrast</span>
                          <input
                            type="checkbox"
                            checked={appearance.highContrast}
                            onChange={(e) => {
                              setAppearance(prev => ({ ...prev, highContrast: e.target.checked }));
                              setHasChanges(true);
                            }}
                            className="w-4 h-4 text-primary rounded border-primary/30"
                          />
                        </label>

                        <label className="flex items-center justify-between cursor-pointer">
                          <span className="text-sm font-medium text-foreground">Color Blind Friendly</span>
                          <input
                            type="checkbox"
                            checked={appearance.colorBlindFriendly}
                            onChange={(e) => {
                              setAppearance(prev => ({ ...prev, colorBlindFriendly: e.target.checked }));
                              setHasChanges(true);
                            }}
                            className="w-4 h-4 text-primary rounded border-primary/30"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </div>
            )}

            {/* About Section */}
            {activeSection === 'about' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">About HealPulse</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <GlassCard variant="primary" size="lg">
                    <div className="space-y-6 text-center">
                      <div className="w-20 h-20 bg-health-gradient rounded-full flex items-center justify-center mx-auto">
                        <Heart className="h-10 w-10 text-white heartbeat" />
                      </div>
                      
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">HealPulse</h3>
                        <p className="text-foreground/70 mb-4">Version 2.1.0</p>
                        <p className="text-sm text-foreground/60 leading-relaxed">
                          Your AI-powered health companion, providing personalized healthcare insights 
                          and connecting you with medical professionals worldwide.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Button variant="outline" className="w-full glass-button">
                          <Download className="h-4 w-4 mr-2" />
                          Check for Updates
                        </Button>
                        <Button variant="outline" className="w-full glass-button">
                          <FileText className="h-4 w-4 mr-2" />
                          Release Notes
                        </Button>
                      </div>
                    </div>
                  </GlassCard>

                  <GlassCard variant="accent" size="lg">
                    <div className="space-y-6">
                      <h3 className="text-lg font-bold text-foreground">Support & Legal</h3>
                      
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start glass-button">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Contact Support
                        </Button>
                        <Button variant="outline" className="w-full justify-start glass-button">
                          <FileText className="h-4 w-4 mr-2" />
                          Privacy Policy
                        </Button>
                        <Button variant="outline" className="w-full justify-start glass-button">
                          <Shield className="h-4 w-4 mr-2" />
                          Terms of Service
                        </Button>
                        <Button variant="outline" className="w-full justify-start glass-button">
                          <Award className="h-4 w-4 mr-2" />
                          HIPAA Compliance
                        </Button>
                        <Button variant="outline" className="w-full justify-start glass-button">
                          <Star className="h-4 w-4 mr-2" />
                          Rate HealPulse
                        </Button>
                      </div>

                      <div className="pt-4 border-t border-border/50">
                        <p className="text-xs text-foreground/50 text-center">
                          © 2024 HealPulse. All rights reserved.
                          <br />
                          Made with ❤️ for better healthcare
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
