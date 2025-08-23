import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { 
  Heart, 
  ArrowLeft, 
  Stethoscope,
  Search,
  Filter,
  Star,
  MapPin,
  Clock,
  Calendar,
  Video,
  Phone,
  MessageCircle,
  Award,
  CheckCircle,
  Users,
  TrendingUp,
  Shield,
  Sparkles,
  Target,
  Activity,
  Brain,
  Eye,
  Zap,
  Book,
  GraduationCap,
  Globe,
  Languages,
  DollarSign,
  RefreshCw,
  Bookmark,
  Share2,
  Info,
  AlertCircle,
  ThumbsUp,
  Send,
  Camera,
  Mic,
  MoreHorizontal,
  Edit,
  UserCheck,
  Clock3,
  Building
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  subSpecialty?: string;
  experience: number;
  rating: number;
  reviewCount: number;
  image?: string;
  location: string;
  hospital: string;
  qualifications: string[];
  languages: string[];
  about: string;
  consultationFee: number;
  availability: {
    today: boolean;
    nextAvailable: Date;
    timeSlots: string[];
  };
  consultationTypes: ('video' | 'audio' | 'chat' | 'in-person')[];
  responseTime: string;
  isVerified: boolean;
  isPopular: boolean;
  specializations: string[];
  patientsSeen: number;
}

interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: Date;
  time: string;
  type: 'video' | 'audio' | 'chat' | 'in-person';
  status: 'scheduled' | 'completed' | 'cancelled' | 'ongoing';
  reason: string;
}

export default function DoctorConsultation() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [filterRating, setFilterRating] = useState(0);
  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'price' | 'availability'>('rating');
  const [consultationType, setConsultationType] = useState<'video' | 'audio' | 'chat' | 'in-person'>('video');

  // Mock doctors data
  const mockDoctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      subSpecialty: 'Interventional Cardiology',
      experience: 15,
      rating: 4.9,
      reviewCount: 234,
      image: '/api/placeholder/doctor1.jpg',
      location: 'New York, NY',
      hospital: 'Mount Sinai Hospital',
      qualifications: ['MD - Harvard Medical School', 'Cardiology Fellowship - Johns Hopkins'],
      languages: ['English', 'Spanish'],
      about: 'Dr. Johnson is a board-certified cardiologist with over 15 years of experience in treating cardiovascular diseases. She specializes in minimally invasive procedures and preventive cardiology.',
      consultationFee: 200,
      availability: {
        today: true,
        nextAvailable: new Date(Date.now() + 2 * 60 * 60 * 1000),
        timeSlots: ['2:00 PM', '3:30 PM', '5:00 PM']
      },
      consultationTypes: ['video', 'audio', 'in-person'],
      responseTime: '< 15 minutes',
      isVerified: true,
      isPopular: true,
      specializations: ['Heart Disease', 'Hypertension', 'Cholesterol Management'],
      patientsSeen: 2500
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Dermatology',
      subSpecialty: 'Cosmetic Dermatology',
      experience: 12,
      rating: 4.8,
      reviewCount: 189,
      location: 'Los Angeles, CA',
      hospital: 'UCLA Medical Center',
      qualifications: ['MD - Stanford University', 'Dermatology Residency - UCSF'],
      languages: ['English', 'Mandarin'],
      about: 'Dr. Chen is a renowned dermatologist specializing in both medical and cosmetic dermatology. He has extensive experience in treating skin conditions and aesthetic procedures.',
      consultationFee: 175,
      availability: {
        today: false,
        nextAvailable: new Date(Date.now() + 24 * 60 * 60 * 1000),
        timeSlots: ['9:00 AM', '11:00 AM', '2:00 PM']
      },
      consultationTypes: ['video', 'chat', 'in-person'],
      responseTime: '< 30 minutes',
      isVerified: true,
      isPopular: false,
      specializations: ['Acne Treatment', 'Skin Cancer', 'Anti-aging'],
      patientsSeen: 1800
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      specialty: 'Pediatrics',
      subSpecialty: 'Adolescent Medicine',
      experience: 8,
      rating: 4.9,
      reviewCount: 156,
      location: 'Chicago, IL',
      hospital: 'Chicago Children\'s Hospital',
      qualifications: ['MD - Northwestern University', 'Pediatrics Residency - Boston Children\'s'],
      languages: ['English', 'Spanish', 'Portuguese'],
      about: 'Dr. Rodriguez is a compassionate pediatrician who specializes in adolescent health and development. She has a special interest in mental health and wellness for teenagers.',
      consultationFee: 150,
      availability: {
        today: true,
        nextAvailable: new Date(Date.now() + 4 * 60 * 60 * 1000),
        timeSlots: ['10:00 AM', '1:00 PM', '4:00 PM']
      },
      consultationTypes: ['video', 'audio', 'chat'],
      responseTime: '< 20 minutes',
      isVerified: true,
      isPopular: true,
      specializations: ['Teen Health', 'Vaccinations', 'Growth & Development'],
      patientsSeen: 1200
    },
    {
      id: '4',
      name: 'Dr. James Wilson',
      specialty: 'Orthopedics',
      subSpecialty: 'Sports Medicine',
      experience: 20,
      rating: 4.7,
      reviewCount: 298,
      location: 'Miami, FL',
      hospital: 'Miami Sports Medicine Institute',
      qualifications: ['MD - University of Miami', 'Orthopedic Surgery Residency - Mayo Clinic'],
      languages: ['English'],
      about: 'Dr. Wilson is an experienced orthopedic surgeon specializing in sports medicine and joint replacement. He has worked with professional athletes and active individuals.',
      consultationFee: 225,
      availability: {
        today: false,
        nextAvailable: new Date(Date.now() + 48 * 60 * 60 * 1000),
        timeSlots: ['8:00 AM', '10:00 AM', '3:00 PM']
      },
      consultationTypes: ['video', 'in-person'],
      responseTime: '< 45 minutes',
      isVerified: true,
      isPopular: false,
      specializations: ['Sports Injuries', 'Joint Replacement', 'Arthroscopy'],
      patientsSeen: 3200
    },
    {
      id: '5',
      name: 'Dr. Lisa Park',
      specialty: 'Psychiatry',
      subSpecialty: 'Anxiety & Depression',
      experience: 10,
      rating: 4.8,
      reviewCount: 167,
      location: 'Seattle, WA',
      hospital: 'University of Washington Medical Center',
      qualifications: ['MD - University of Washington', 'Psychiatry Residency - Johns Hopkins'],
      languages: ['English', 'Korean'],
      about: 'Dr. Park is a board-certified psychiatrist with expertise in treating anxiety, depression, and mood disorders. She takes a holistic approach to mental health care.',
      consultationFee: 180,
      availability: {
        today: true,
        nextAvailable: new Date(Date.now() + 1 * 60 * 60 * 1000),
        timeSlots: ['11:00 AM', '2:00 PM', '5:30 PM']
      },
      consultationTypes: ['video', 'audio', 'chat'],
      responseTime: '< 10 minutes',
      isVerified: true,
      isPopular: true,
      specializations: ['Anxiety Disorders', 'Depression', 'Therapy'],
      patientsSeen: 980
    }
  ];

  const specialties = [
    'All Specialties',
    'Cardiology',
    'Dermatology',
    'Pediatrics',
    'Orthopedics',
    'Psychiatry',
    'Neurology',
    'Gastroenterology',
    'Endocrinology',
    'Oncology'
  ];

  useEffect(() => {
    setDoctors(mockDoctors);
  }, []);

  // Filter and search doctors
  useEffect(() => {
    let filtered = doctors;

    // Filter by specialty
    if (selectedSpecialty && selectedSpecialty !== 'All Specialties') {
      filtered = filtered.filter(doctor => doctor.specialty === selectedSpecialty);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(doctor => 
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specializations.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by rating
    if (filterRating > 0) {
      filtered = filtered.filter(doctor => doctor.rating >= filterRating);
    }

    // Sort doctors
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'experience':
          return b.experience - a.experience;
        case 'price':
          return a.consultationFee - b.consultationFee;
        case 'availability':
          return (a.availability.today ? 0 : 1) - (b.availability.today ? 0 : 1);
        default:
          return 0;
      }
    });

    setFilteredDoctors(filtered);
  }, [doctors, selectedSpecialty, searchTerm, filterRating, sortBy]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          "h-4 w-4",
          i < Math.floor(rating) ? "text-warning-orange fill-current" : "text-gray-300"
        )}
      />
    ));
  };

  const bookAppointment = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setShowBooking(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-health-gradient rounded-full opacity-10 blur-3xl animate-float top-20 right-20" />
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
                <div className="p-3 bg-health-gradient rounded-3xl shadow-health">
                  <Stethoscope className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Doctor Consultation</h1>
                  <p className="text-sm text-foreground/60">Find and book with verified healthcare providers</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <GlassCard variant="primary" size="sm" className="px-4 py-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-cyber-green rounded-full animate-pulse" />
                  <span className="text-sm font-medium">{filteredDoctors.length} Available</span>
                </div>
              </GlassCard>
              
              <Link to="/video-consultation">
                <Button className="button-health">
                  <Video className="h-4 w-4 mr-2" />
                  Join Call
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Panel - Search & Filters */}
          <div className="space-y-6">
            <GlassCard variant="primary" size="lg">
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-foreground flex items-center">
                  <Filter className="h-5 w-5 mr-2 text-primary" />
                  Search & Filter
                </h2>
                
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary/60" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search doctors, specialties..."
                    className="w-full pl-10 pr-4 py-3 bg-primary/10 border border-primary/30 rounded-2xl outline-none focus:border-primary transition-all duration-300"
                  />
                </div>

                {/* Specialty Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Specialty</label>
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="w-full px-4 py-3 bg-primary/10 border border-primary/30 rounded-2xl outline-none focus:border-primary transition-all duration-300"
                  >
                    {specialties.map(specialty => (
                      <option key={specialty} value={specialty === 'All Specialties' ? '' : specialty}>
                        {specialty}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Rating Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Minimum Rating</label>
                  <div className="flex space-x-2">
                    {[4, 4.5, 4.8].map(rating => (
                      <Button
                        key={rating}
                        variant={filterRating === rating ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilterRating(filterRating === rating ? 0 : rating)}
                        className={cn(
                          "text-xs",
                          filterRating === rating ? "bg-primary text-white" : "glass-button"
                        )}
                      >
                        {rating}+ ⭐
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
                    <option value="rating">Highest Rated</option>
                    <option value="experience">Most Experienced</option>
                    <option value="price">Price (Low to High)</option>
                    <option value="availability">Available Today</option>
                  </select>
                </div>

                {/* Consultation Type */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Consultation Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 'video', label: 'Video', icon: Video },
                      { value: 'audio', label: 'Audio', icon: Phone },
                      { value: 'chat', label: 'Chat', icon: MessageCircle },
                      { value: 'in-person', label: 'In-Person', icon: Users }
                    ].map(option => {
                      const Icon = option.icon;
                      return (
                        <Button
                          key={option.value}
                          variant={consultationType === option.value ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setConsultationType(option.value as any)}
                          className={cn(
                            "text-xs justify-start",
                            consultationType === option.value ? "bg-primary text-white" : "glass-button"
                          )}
                        >
                          <Icon className="h-3 w-3 mr-1" />
                          {option.label}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Quick Stats */}
            <GlassCard variant="accent" size="default">
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-accent" />
                  Platform Stats
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">500+</div>
                    <div className="text-xs text-foreground/60">Verified Doctors</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyber-green">98.5%</div>
                    <div className="text-xs text-foreground/60">Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-neon-blue">24/7</div>
                    <div className="text-xs text-foreground/60">Availability</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-warning-orange">50K+</div>
                    <div className="text-xs text-foreground/60">Consultations</div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Center Panel - Doctor List */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                Available Doctors ({filteredDoctors.length})
              </h2>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="glass-button">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                <Button variant="outline" size="sm" className="glass-button">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Saved
                </Button>
              </div>
            </div>

            {/* Doctor Cards */}
            <div className="space-y-6">
              {filteredDoctors.length === 0 ? (
                <GlassCard variant="default" size="lg" className="text-center py-12">
                  <div className="space-y-4">
                    <Stethoscope className="h-16 w-16 text-foreground/30 mx-auto" />
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">No Doctors Found</h3>
                      <p className="text-foreground/60">Try adjusting your search criteria or filters.</p>
                    </div>
                    <Button
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedSpecialty('');
                        setFilterRating(0);
                      }}
                      variant="outline"
                      className="glass-button"
                    >
                      Clear Filters
                    </Button>
                  </div>
                </GlassCard>
              ) : (
                filteredDoctors.map((doctor) => (
                  <GlassCard 
                    key={doctor.id} 
                    variant="default" 
                    size="lg" 
                    hover="lift"
                    className="cursor-pointer"
                  >
                    <div className="space-y-6">
                      {/* Doctor Header */}
                      <div className="flex space-x-6">
                        <div className="flex-shrink-0">
                          <div className="w-24 h-24 bg-primary/20 rounded-2xl flex items-center justify-center relative overflow-hidden">
                            {doctor.image ? (
                              <img 
                                src={doctor.image} 
                                alt={doctor.name}
                                className="w-24 h-24 object-cover rounded-2xl"
                              />
                            ) : (
                              <UserCheck className="h-12 w-12 text-primary/60" />
                            )}
                            {doctor.isVerified && (
                              <div className="absolute -top-1 -right-1 w-6 h-6 bg-cyber-green rounded-full flex items-center justify-center">
                                <CheckCircle className="h-4 w-4 text-white" />
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center space-x-3">
                                <h3 className="text-xl font-bold text-foreground">{doctor.name}</h3>
                                {doctor.isPopular && (
                                  <div className="px-2 py-1 bg-warning-orange/20 text-warning-orange text-xs rounded-full font-medium">
                                    Popular
                                  </div>
                                )}
                              </div>
                              <p className="text-foreground/70 font-medium">{doctor.specialty}</p>
                              {doctor.subSpecialty && (
                                <p className="text-sm text-foreground/60">{doctor.subSpecialty}</p>
                              )}
                            </div>
                            
                            <div className="text-right">
                              <div className="flex items-center space-x-1 mb-1">
                                {renderStars(doctor.rating)}
                                <span className="text-sm font-bold text-foreground ml-2">{doctor.rating}</span>
                              </div>
                              <p className="text-xs text-foreground/60">({doctor.reviewCount} reviews)</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <Clock3 className="h-4 w-4 text-primary" />
                              <span className="text-foreground/70">{doctor.experience} years exp</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4 text-accent" />
                              <span className="text-foreground/70">{doctor.location}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Building className="h-4 w-4 text-neon-blue" />
                              <span className="text-foreground/70">{doctor.hospital}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <DollarSign className="h-4 w-4 text-cyber-green" />
                              <span className="text-foreground/70">${doctor.consultationFee}</span>
                            </div>
                          </div>
                          
                          <p className="text-sm text-foreground/70 leading-relaxed">
                            {doctor.about.slice(0, 150)}...
                          </p>
                        </div>
                      </div>

                      {/* Specializations */}
                      <div className="flex flex-wrap gap-2">
                        {doctor.specializations.map((spec, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-lg font-medium"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>

                      {/* Availability & Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-border/50">
                        <div className="flex items-center space-x-6">
                          <div className="flex items-center space-x-2">
                            <div className={cn(
                              "w-3 h-3 rounded-full",
                              doctor.availability.today ? "bg-cyber-green animate-pulse" : "bg-warning-orange"
                            )} />
                            <span className="text-sm text-foreground/70">
                              {doctor.availability.today 
                                ? `Available today` 
                                : `Next: ${doctor.availability.nextAvailable.toLocaleDateString()}`
                              }
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4 text-foreground/60" />
                            <span className="text-sm text-foreground/60">Response: {doctor.responseTime}</span>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4 text-foreground/60" />
                            <span className="text-sm text-foreground/60">{doctor.patientsSeen.toLocaleString()} patients</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          {doctor.consultationTypes.includes('video') && (
                            <Link to="/video-consultation">
                              <Button size="sm" className="button-health">
                                <Video className="h-4 w-4 mr-2" />
                                Video Call
                              </Button>
                            </Link>
                          )}
                          
                          <Button
                            onClick={() => bookAppointment(doctor)}
                            size="sm"
                            variant="outline"
                            className="glass-button"
                          >
                            <Calendar className="h-4 w-4 mr-2" />
                            Book Appointment
                          </Button>
                          
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                ))
              )}
            </div>

            {/* Load More */}
            {filteredDoctors.length > 0 && (
              <div className="text-center">
                <Button variant="outline" className="glass-button">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Load More Doctors
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Booking Modal - Simple placeholder */}
        {showBooking && selectedDoctor && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <GlassCard variant="primary" size="xl" className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">Book Appointment</h2>
                  <Button
                    onClick={() => setShowBooking(false)}
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                  >
                    ✕
                  </Button>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center">
                    <UserCheck className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{selectedDoctor.name}</h3>
                    <p className="text-foreground/70">{selectedDoctor.specialty}</p>
                    <p className="text-sm text-foreground/60">${selectedDoctor.consultationFee} consultation</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Reason for Visit</label>
                    <textarea
                      placeholder="Briefly describe your symptoms or reason for consultation..."
                      rows={3}
                      className="w-full mt-2 px-4 py-3 bg-primary/10 border border-primary/30 rounded-2xl outline-none focus:border-primary transition-all duration-300 resize-none"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground">Preferred Time Slots</label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {selectedDoctor.availability.timeSlots.map((slot) => (
                        <Button
                          key={slot}
                          variant="outline"
                          size="sm"
                          className="glass-button"
                        >
                          {slot}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <Button
                    onClick={() => setShowBooking(false)}
                    variant="outline"
                    className="flex-1 glass-button"
                  >
                    Cancel
                  </Button>
                  <Button className="flex-1 button-health">
                    <Calendar className="h-4 w-4 mr-2" />
                    Confirm Booking
                  </Button>
                </div>
              </div>
            </GlassCard>
          </div>
        )}
      </div>
    </div>
  );
}
