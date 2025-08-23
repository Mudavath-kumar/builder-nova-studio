import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { 
  Heart, 
  ArrowLeft, 
  FileText,
  Calendar,
  Clock,
  Activity,
  Pill,
  Stethoscope,
  TestTube,
  Upload,
  Download,
  Share2,
  Filter,
  Search,
  TrendingUp,
  TrendingDown,
  Minus,
  Plus,
  Eye,
  Edit,
  Trash2,
  Star,
  AlertCircle,
  CheckCircle,
  Info,
  Zap,
  Brain,
  Sparkles,
  Target,
  Award,
  Shield,
  Users,
  MapPin,
  Phone,
  Camera,
  Mic,
  Video
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface HealthRecord {
  id: string;
  type: 'consultation' | 'prescription' | 'test' | 'vaccination' | 'procedure' | 'emergency' | 'note';
  title: string;
  description: string;
  date: Date;
  provider: string;
  category: string;
  status: 'completed' | 'pending' | 'cancelled' | 'scheduled';
  attachments: string[];
  metrics?: {
    value: number;
    unit: string;
    normalRange?: string;
    trend?: 'up' | 'down' | 'stable';
  }[];
  tags: string[];
  priority: 'low' | 'medium' | 'high';
  isAIAnalyzed: boolean;
  aiInsights?: string[];
}

export default function HealthRecords() {
  const [records, setRecords] = useState<HealthRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<HealthRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<HealthRecord | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState("");
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year' | 'all'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'type' | 'priority'>('date');

  // Mock health records data
  const mockRecords: HealthRecord[] = [
    {
      id: '1',
      type: 'consultation',
      title: 'Annual Checkup',
      description: 'Routine physical examination with Dr. Sarah Johnson',
      date: new Date(2024, 0, 15),
      provider: 'Dr. Sarah Johnson, MD',
      category: 'General Medicine',
      status: 'completed',
      attachments: ['physical_exam_report.pdf', 'lab_results.pdf'],
      metrics: [
        { value: 120, unit: 'mmHg', normalRange: '90-140', trend: 'stable' },
        { value: 80, unit: 'mmHg', normalRange: '60-90', trend: 'stable' },
        { value: 72, unit: 'bpm', normalRange: '60-100', trend: 'down' }
      ],
      tags: ['routine', 'physical', 'preventive'],
      priority: 'medium',
      isAIAnalyzed: true,
      aiInsights: [
        'Blood pressure within normal range',
        'Heart rate slightly improved from last visit',
        'Recommend continuing current exercise routine'
      ]
    },
    {
      id: '2',
      type: 'prescription',
      title: 'Blood Pressure Medication',
      description: 'Lisinopril 10mg daily for hypertension management',
      date: new Date(2024, 0, 10),
      provider: 'Dr. Sarah Johnson, MD',
      category: 'Cardiology',
      status: 'completed',
      attachments: ['prescription_lisinopril.pdf'],
      tags: ['medication', 'hypertension', 'daily'],
      priority: 'high',
      isAIAnalyzed: true,
      aiInsights: [
        'Monitor blood pressure regularly',
        'Take at same time daily for best results',
        'Watch for dry cough side effect'
      ]
    },
    {
      id: '3',
      type: 'test',
      title: 'Blood Work - Comprehensive Panel',
      description: 'Complete blood count, lipid panel, and metabolic panel',
      date: new Date(2024, 0, 5),
      provider: 'LabCorp',
      category: 'Laboratory',
      status: 'completed',
      attachments: ['blood_work_results.pdf', 'lipid_panel.pdf'],
      metrics: [
        { value: 185, unit: 'mg/dL', normalRange: '<200', trend: 'down' },
        { value: 95, unit: 'mg/dL', normalRange: '70-99', trend: 'stable' },
        { value: 14.2, unit: 'g/dL', normalRange: '12-16', trend: 'up' }
      ],
      tags: ['lab', 'blood', 'cholesterol', 'glucose'],
      priority: 'medium',
      isAIAnalyzed: true,
      aiInsights: [
        'Cholesterol levels improved significantly',
        'Blood sugar within normal range',
        'Iron levels showing improvement'
      ]
    },
    {
      id: '4',
      type: 'vaccination',
      title: 'COVID-19 Booster',
      description: 'Pfizer-BioNTech COVID-19 vaccine booster shot',
      date: new Date(2023, 11, 20),
      provider: 'CVS Pharmacy',
      category: 'Immunization',
      status: 'completed',
      attachments: ['vaccine_record.pdf'],
      tags: ['vaccine', 'covid-19', 'booster'],
      priority: 'high',
      isAIAnalyzed: false
    },
    {
      id: '5',
      type: 'emergency',
      title: 'Emergency Room Visit',
      description: 'Chest pain evaluation - ruled out cardiac event',
      date: new Date(2023, 10, 8),
      provider: 'General Hospital ER',
      category: 'Emergency',
      status: 'completed',
      attachments: ['er_report.pdf', 'ekg_results.pdf', 'chest_xray.jpg'],
      metrics: [
        { value: 145, unit: 'mmHg', normalRange: '90-140', trend: 'up' },
        { value: 95, unit: 'mmHg', normalRange: '60-90', trend: 'up' },
        { value: 88, unit: 'bpm', normalRange: '60-100', trend: 'up' }
      ],
      tags: ['emergency', 'chest-pain', 'cardiac', 'ruled-out'],
      priority: 'high',
      isAIAnalyzed: true,
      aiInsights: [
        'Cardiac enzymes normal - no heart attack',
        'EKG shows normal rhythm',
        'Likely anxiety-related chest pain'
      ]
    },
    {
      id: '6',
      type: 'procedure',
      title: 'Colonoscopy Screening',
      description: 'Preventive colorectal cancer screening',
      date: new Date(2023, 8, 15),
      provider: 'Dr. Michael Chen, Gastroenterology',
      category: 'Gastroenterology',
      status: 'completed',
      attachments: ['colonoscopy_report.pdf', 'pathology.pdf'],
      tags: ['screening', 'preventive', 'colonoscopy'],
      priority: 'medium',
      isAIAnalyzed: true,
      aiInsights: [
        'No polyps found - excellent result',
        'Next screening recommended in 10 years',
        'Continue healthy diet and exercise'
      ]
    },
    {
      id: '7',
      type: 'consultation',
      title: 'Dermatology Consultation',
      description: 'Skin cancer screening and mole evaluation',
      date: new Date(2023, 7, 22),
      provider: 'Dr. Lisa Park, Dermatology',
      category: 'Dermatology',
      status: 'completed',
      attachments: ['dermatology_report.pdf', 'mole_photos.jpg'],
      tags: ['skin', 'screening', 'moles', 'cancer'],
      priority: 'medium',
      isAIAnalyzed: true,
      aiInsights: [
        'All moles appear benign',
        'Continue annual skin checks',
        'Use sunscreen SPF 30+ daily'
      ]
    },
    {
      id: '8',
      type: 'note',
      title: 'Flu Symptoms',
      description: 'Self-reported flu-like symptoms, resolved after 5 days',
      date: new Date(2023, 11, 1),
      provider: 'Self-reported',
      category: 'Personal Note',
      status: 'completed',
      attachments: [],
      tags: ['flu', 'symptoms', 'resolved'],
      priority: 'low',
      isAIAnalyzed: false
    }
  ];

  useEffect(() => {
    setRecords(mockRecords);
    setFilteredRecords(mockRecords);
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = records;

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(record => record.type === filterType);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(record => 
        record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by time range
    const now = new Date();
    if (timeRange !== 'all') {
      const cutoffDate = new Date();
      switch (timeRange) {
        case 'week':
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          cutoffDate.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          cutoffDate.setFullYear(now.getFullYear() - 1);
          break;
      }
      filtered = filtered.filter(record => record.date >= cutoffDate);
    }

    // Sort records
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return b.date.getTime() - a.date.getTime();
        case 'type':
          return a.type.localeCompare(b.type);
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        default:
          return 0;
      }
    });

    setFilteredRecords(filtered);
  }, [records, filterType, searchTerm, timeRange, sortBy]);

  const getRecordIcon = (type: string) => {
    switch (type) {
      case 'consultation': return Stethoscope;
      case 'prescription': return Pill;
      case 'test': return TestTube;
      case 'vaccination': return Shield;
      case 'procedure': return Activity;
      case 'emergency': return Heart;
      case 'note': return FileText;
      default: return FileText;
    }
  };

  const getRecordColor = (type: string) => {
    switch (type) {
      case 'consultation': return 'text-primary';
      case 'prescription': return 'text-accent';
      case 'test': return 'text-neon-blue';
      case 'vaccination': return 'text-cyber-green';
      case 'procedure': return 'text-warning-orange';
      case 'emergency': return 'text-health-red';
      case 'note': return 'text-deep-purple';
      default: return 'text-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-cyber-green/20 text-cyber-green';
      case 'pending': return 'bg-warning-orange/20 text-warning-orange';
      case 'cancelled': return 'bg-health-red/20 text-health-red';
      case 'scheduled': return 'bg-neon-blue/20 text-neon-blue';
      default: return 'bg-foreground/20 text-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-health-red/20 text-health-red';
      case 'medium': return 'bg-warning-orange/20 text-warning-orange';
      case 'low': return 'bg-cyber-green/20 text-cyber-green';
      default: return 'bg-foreground/20 text-foreground';
    }
  };

  const exportRecords = () => {
    const dataStr = JSON.stringify(filteredRecords, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'health_records.json';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-neon-gradient rounded-full opacity-10 blur-3xl animate-float top-20 right-20" />
        <div className="absolute w-64 h-64 bg-health-gradient rounded-full opacity-10 blur-3xl animate-float bottom-20 left-20" style={{ animationDelay: '2s' }} />
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
                <div className="p-3 bg-health-gradient rounded-3xl shadow-health">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Health Records</h1>
                  <p className="text-sm text-foreground/60">Your complete medical timeline</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <GlassCard variant="primary" size="sm" className="px-4 py-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-cyber-green rounded-full animate-pulse" />
                  <span className="text-sm font-medium">{filteredRecords.length} Records</span>
                </div>
              </GlassCard>
              
              <Button
                onClick={exportRecords}
                variant="outline"
                className="glass-button"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              
              <Button className="button-health">
                <Upload className="h-4 w-4 mr-2" />
                Add Record
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Panel - Filters & Stats */}
          <div className="space-y-6">
            {/* Search & Filters */}
            <GlassCard variant="primary" size="lg">
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-foreground flex items-center">
                  <Filter className="h-5 w-5 mr-2 text-primary" />
                  Filters & Search
                </h2>
                
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary/60" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search records..."
                    className="w-full pl-10 pr-4 py-3 bg-primary/10 border border-primary/30 rounded-2xl outline-none focus:border-primary transition-all duration-300"
                  />
                </div>

                {/* Type Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Record Type</label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full px-4 py-3 bg-primary/10 border border-primary/30 rounded-2xl outline-none focus:border-primary transition-all duration-300"
                  >
                    <option value="all">All Types</option>
                    <option value="consultation">Consultations</option>
                    <option value="prescription">Prescriptions</option>
                    <option value="test">Tests & Labs</option>
                    <option value="vaccination">Vaccinations</option>
                    <option value="procedure">Procedures</option>
                    <option value="emergency">Emergency</option>
                    <option value="note">Personal Notes</option>
                  </select>
                </div>

                {/* Time Range */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Time Range</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 'week', label: 'Last Week' },
                      { value: 'month', label: 'Last Month' },
                      { value: 'year', label: 'Last Year' },
                      { value: 'all', label: 'All Time' }
                    ].map(option => (
                      <Button
                        key={option.value}
                        variant={timeRange === option.value ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setTimeRange(option.value as any)}
                        className={cn(
                          "text-xs",
                          timeRange === option.value ? "bg-primary text-white" : "glass-button"
                        )}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Sort By */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full px-4 py-3 bg-primary/10 border border-primary/30 rounded-2xl outline-none focus:border-primary transition-all duration-300"
                  >
                    <option value="date">Date (Newest First)</option>
                    <option value="type">Record Type</option>
                    <option value="priority">Priority</option>
                  </select>
                </div>
              </div>
            </GlassCard>

            {/* Quick Stats */}
            <GlassCard variant="neon" size="default">
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-neon-blue" />
                  Quick Stats
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-neon-blue">{records.length}</div>
                    <div className="text-xs text-foreground/60">Total Records</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyber-green">
                      {records.filter(r => r.isAIAnalyzed).length}
                    </div>
                    <div className="text-xs text-foreground/60">AI Analyzed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-warning-orange">
                      {records.filter(r => r.type === 'consultation').length}
                    </div>
                    <div className="text-xs text-foreground/60">Consultations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-health-red">
                      {records.filter(r => r.priority === 'high').length}
                    </div>
                    <div className="text-xs text-foreground/60">High Priority</div>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Record Types Legend */}
            <GlassCard variant="accent" size="default">
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Record Types</h3>
                
                <div className="space-y-2">
                  {[
                    { type: 'consultation', label: 'Consultations', icon: Stethoscope, color: 'text-primary' },
                    { type: 'prescription', label: 'Prescriptions', icon: Pill, color: 'text-accent' },
                    { type: 'test', label: 'Tests & Labs', icon: TestTube, color: 'text-neon-blue' },
                    { type: 'vaccination', label: 'Vaccinations', icon: Shield, color: 'text-cyber-green' },
                    { type: 'procedure', label: 'Procedures', icon: Activity, color: 'text-warning-orange' },
                    { type: 'emergency', label: 'Emergency', icon: Heart, color: 'text-health-red' }
                  ].map(item => {
                    const Icon = item.icon;
                    const count = records.filter(r => r.type === item.type).length;
                    return (
                      <div key={item.type} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <Icon className={cn("h-4 w-4", item.color)} />
                          <span className="text-foreground/70">{item.label}</span>
                        </div>
                        <span className="font-medium text-foreground">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Center Panel - Timeline */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Health Timeline</h2>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="glass-button">
                  <Calendar className="h-4 w-4 mr-2" />
                  Calendar View
                </Button>
                <Button variant="outline" size="sm" className="glass-button">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-6">
              {filteredRecords.length === 0 ? (
                <GlassCard variant="default" size="lg" className="text-center py-12">
                  <div className="space-y-4">
                    <FileText className="h-16 w-16 text-foreground/30 mx-auto" />
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">No Records Found</h3>
                      <p className="text-foreground/60">Try adjusting your filters or search terms.</p>
                    </div>
                    <Button
                      onClick={() => {
                        setFilterType('all');
                        setSearchTerm('');
                        setTimeRange('all');
                      }}
                      variant="outline"
                      className="glass-button"
                    >
                      Clear Filters
                    </Button>
                  </div>
                </GlassCard>
              ) : (
                filteredRecords.map((record, index) => {
                  const Icon = getRecordIcon(record.type);
                  return (
                    <div key={record.id} className="relative">
                      {/* Timeline line */}
                      {index < filteredRecords.length - 1 && (
                        <div className="absolute left-6 top-16 w-0.5 h-20 bg-primary/30" />
                      )}
                      
                      <GlassCard 
                        variant="default" 
                        size="lg" 
                        hover="lift"
                        className={cn(
                          "cursor-pointer transition-all duration-300",
                          selectedRecord?.id === record.id && "ring-2 ring-primary"
                        )}
                        onClick={() => setSelectedRecord(record)}
                      >
                        <div className="flex space-x-4">
                          {/* Timeline dot & icon */}
                          <div className="flex-shrink-0">
                            <div className={cn(
                              "w-12 h-12 rounded-full flex items-center justify-center",
                              record.type === 'emergency' ? 'bg-health-red/20' :
                              record.type === 'consultation' ? 'bg-primary/20' :
                              record.type === 'prescription' ? 'bg-accent/20' :
                              record.type === 'test' ? 'bg-neon-blue/20' :
                              record.type === 'vaccination' ? 'bg-cyber-green/20' :
                              record.type === 'procedure' ? 'bg-warning-orange/20' :
                              'bg-deep-purple/20'
                            )}>
                              <Icon className={cn("h-6 w-6", getRecordColor(record.type))} />
                            </div>
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 space-y-3">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h3 className="font-bold text-foreground text-lg">{record.title}</h3>
                                  <div className={cn("px-2 py-1 rounded-full text-xs font-medium", getStatusColor(record.status))}>
                                    {record.status}
                                  </div>
                                  <div className={cn("px-2 py-1 rounded-full text-xs font-medium", getPriorityColor(record.priority))}>
                                    {record.priority}
                                  </div>
                                  {record.isAIAnalyzed && (
                                    <div className="px-2 py-1 rounded-full text-xs font-medium bg-neon-blue/20 text-neon-blue flex items-center space-x-1">
                                      <Brain className="h-3 w-3" />
                                      <span>AI</span>
                                    </div>
                                  )}
                                </div>
                                
                                <p className="text-foreground/70 mb-2">{record.description}</p>
                                
                                <div className="flex items-center space-x-4 text-sm text-foreground/60">
                                  <div className="flex items-center space-x-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>{record.date.toLocaleDateString()}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Users className="h-4 w-4" />
                                    <span>{record.provider}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Target className="h-4 w-4" />
                                    <span>{record.category}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                {record.attachments.length > 0 && (
                                  <div className="flex items-center space-x-1 text-xs text-foreground/60">
                                    <FileText className="h-4 w-4" />
                                    <span>{record.attachments.length}</span>
                                  </div>
                                )}
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            
                            {/* Metrics */}
                            {record.metrics && record.metrics.length > 0 && (
                              <div className="grid grid-cols-3 gap-4">
                                {record.metrics.map((metric, metricIndex) => (
                                  <div key={metricIndex} className="text-center p-3 bg-primary/5 rounded-2xl">
                                    <div className="flex items-center justify-center space-x-1">
                                      <span className="font-bold text-foreground">{metric.value}</span>
                                      <span className="text-sm text-foreground/60">{metric.unit}</span>
                                      {metric.trend === 'up' && <TrendingUp className="h-4 w-4 text-cyber-green" />}
                                      {metric.trend === 'down' && <TrendingDown className="h-4 w-4 text-health-red" />}
                                      {metric.trend === 'stable' && <Minus className="h-4 w-4 text-warning-orange" />}
                                    </div>
                                    {metric.normalRange && (
                                      <div className="text-xs text-foreground/50">Normal: {metric.normalRange}</div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            {/* AI Insights */}
                            {record.isAIAnalyzed && record.aiInsights && record.aiInsights.length > 0 && (
                              <GlassCard variant="neon" size="sm" className="bg-neon-blue/5">
                                <div className="space-y-2">
                                  <div className="flex items-center space-x-2">
                                    <Brain className="h-4 w-4 text-neon-blue" />
                                    <span className="text-sm font-medium text-neon-blue">AI Insights</span>
                                  </div>
                                  <ul className="space-y-1">
                                    {record.aiInsights.slice(0, 2).map((insight, insightIndex) => (
                                      <li key={insightIndex} className="text-xs text-foreground/70 flex items-start">
                                        <span className="text-neon-blue mr-2">•</span>
                                        {insight}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </GlassCard>
                            )}
                            
                            {/* Tags */}
                            {record.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {record.tags.map((tag, tagIndex) => (
                                  <span
                                    key={tagIndex}
                                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-lg"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </GlassCard>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Panel - Record Details */}
          <div className="space-y-6">
            {selectedRecord ? (
              <div className="space-y-6">
                <GlassCard variant="primary" size="lg">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-foreground">Record Details</h2>
                      <Button
                        onClick={() => setSelectedRecord(null)}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        ✕
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-bold text-foreground text-lg">{selectedRecord.title}</h3>
                        <p className="text-foreground/70">{selectedRecord.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-medium text-foreground/70">Date</label>
                          <p className="text-sm text-foreground">{selectedRecord.date.toLocaleDateString()}</p>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-foreground/70">Provider</label>
                          <p className="text-sm text-foreground">{selectedRecord.provider}</p>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-foreground/70">Category</label>
                          <p className="text-sm text-foreground">{selectedRecord.category}</p>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-foreground/70">Status</label>
                          <div className={cn("inline-block px-2 py-1 rounded-full text-xs font-medium", getStatusColor(selectedRecord.status))}>
                            {selectedRecord.status}
                          </div>
                        </div>
                      </div>
                      
                      {/* Attachments */}
                      {selectedRecord.attachments.length > 0 && (
                        <div>
                          <label className="text-xs font-medium text-foreground/70 block mb-2">Attachments</label>
                          <div className="space-y-2">
                            {selectedRecord.attachments.map((attachment, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-primary/5 rounded-lg">
                                <span className="text-sm text-foreground">{attachment}</span>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                  <Download className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Full AI Insights */}
                      {selectedRecord.isAIAnalyzed && selectedRecord.aiInsights && (
                        <div>
                          <label className="text-xs font-medium text-foreground/70 block mb-2">AI Analysis</label>
                          <GlassCard variant="neon" size="sm" className="bg-neon-blue/5">
                            <ul className="space-y-2">
                              {selectedRecord.aiInsights.map((insight, index) => (
                                <li key={index} className="text-sm text-foreground/70 flex items-start">
                                  <span className="text-neon-blue mr-2">•</span>
                                  {insight}
                                </li>
                              ))}
                            </ul>
                          </GlassCard>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1 button-health">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="glass-button">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                      <Button size="sm" variant="outline" className="glass-button">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </div>
            ) : (
              <GlassCard variant="default" size="lg" className="text-center py-12">
                <div className="space-y-4">
                  <FileText className="h-16 w-16 text-foreground/30 mx-auto" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Select a Record</h3>
                    <p className="text-foreground/60">Click on any record in the timeline to view details.</p>
                  </div>
                </div>
              </GlassCard>
            )}

            {/* AI Health Insights */}
            <GlassCard variant="neon" size="default">
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-neon-blue" />
                  AI Health Insights
                </h3>
                
                <div className="space-y-3">
                  <div className="p-3 bg-cyber-green/10 rounded-2xl border border-cyber-green/30">
                    <div className="flex items-center space-x-2 mb-1">
                      <CheckCircle className="h-4 w-4 text-cyber-green" />
                      <span className="text-sm font-medium text-cyber-green">Positive Trend</span>
                    </div>
                    <p className="text-xs text-foreground/70">
                      Your blood pressure has improved significantly over the past 6 months.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-warning-orange/10 rounded-2xl border border-warning-orange/30">
                    <div className="flex items-center space-x-2 mb-1">
                      <AlertCircle className="h-4 w-4 text-warning-orange" />
                      <span className="text-sm font-medium text-warning-orange">Reminder</span>
                    </div>
                    <p className="text-xs text-foreground/70">
                      Annual eye exam is due. Schedule with Dr. Parker.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-neon-blue/10 rounded-2xl border border-neon-blue/30">
                    <div className="flex items-center space-x-2 mb-1">
                      <Info className="h-4 w-4 text-neon-blue" />
                      <span className="text-sm font-medium text-neon-blue">Recommendation</span>
                    </div>
                    <p className="text-xs text-foreground/70">
                      Consider adding omega-3 supplements based on recent lab results.
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Quick Actions */}
            <GlassCard variant="accent" size="default">
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-accent" />
                  Quick Actions
                </h3>
                
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start glass-button text-sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Record
                  </Button>
                  <Button variant="outline" className="w-full justify-start glass-button text-sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Document
                  </Button>
                  <Button variant="outline" className="w-full justify-start glass-button text-sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Appointment
                  </Button>
                  <Button variant="outline" className="w-full justify-start glass-button text-sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share with Doctor
                  </Button>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
