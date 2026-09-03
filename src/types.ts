export type UserRole = 'seeker' | 'employer' | 'admin';

export type JobCategory = 
  | 'all'
  | 'restaurant' 
  | 'retail' 
  | 'delivery' 
  | 'supermarket' 
  | 'mall' 
  | 'warehouse' 
  | 'event' 
  | 'security' 
  | 'customer_support';

export type ShiftTiming = 
  | 'all'
  | 'morning' 
  | 'afternoon' 
  | 'evening' 
  | 'night' 
  | 'weekend';

export type SalaryType = 'hourly' | 'daily' | 'monthly';

export type IndianCity = 'Bengaluru' | 'Mysuru' | 'Hyderabad' | 'Chennai' | 'Mumbai' | 'Mangaluru';

export interface Job {
  id: string;
  title: string;
  company: string;
  brand: string; // e.g., "Trends", "KFC", "Domino's", "Zudio", "D-Mart", "Blinkit"
  category: JobCategory;
  city: IndianCity;
  locality: string; // e.g. "Koramangala 5th Block", "Indiranagar 100ft Rd", "HSR Layout Sector 1"
  address: string;
  distanceKm: number; // Calculated relative to current seeker locality
  salaryType: SalaryType;
  salaryAmount: number; // e.g. 150 for 150/hr, 850 for 850/day, 12000 for 12000/month
  shiftTiming: ShiftTiming;
  shiftHoursText: string; // e.g. "5:30 PM - 10:30 PM (5 hrs)"
  instantHiring: boolean; // Walk-in today / Join tomorrow
  dailyCashPayout: boolean; // Daily pay available
  vacancies: number;
  languagesRequired: string[]; // ["Kannada", "Hindi", "English"]
  requirements: string[];
  perks: string[];
  employerName: string;
  employerPhone: string;
  employerWhatsApp: string;
  isVerifiedEmployer: boolean;
  isFeatured: boolean;
  postedTime: string; // e.g. "10 mins ago", "1 hour ago"
  description: string;
  status: 'active' | 'paused' | 'filled';
  walkInInstructions?: string;
}

export interface JobSeekerProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: IndianCity;
  locality: string;
  spokenLanguages: string[];
  preferredShifts: ShiftTiming[];
  preferredCategories: JobCategory[];
  hasTwoWheeler: boolean;
  hasDrivingLicense: boolean;
  instantAvailability: boolean; // "Ready to start today"
  bio: string;
  education: string;
  resumeFileName?: string;
  savedJobIds: string[];
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  locality: string;
  salaryText: string;
  shiftHoursText: string;
  seekerId: string;
  seekerName: string;
  seekerPhone: string;
  seekerLanguages: string[];
  appliedAt: string;
  status: 'applied' | 'reviewed' | 'trial_scheduled' | 'hired' | 'rejected';
  trialDate?: string;
  matchScore: number; // 0-100%
  notes?: string;
  hasVehicle?: boolean;
  preferredShift?: string;
}

export interface EmployerProfile {
  id: string;
  businessName: string;
  brand: string;
  category: JobCategory;
  city: IndianCity;
  locality: string;
  managerName: string;
  phone: string;
  whatsapp: string;
  isVerified: boolean;
  gstNumber?: string;
}

export interface AdminStats {
  totalJobs: number;
  activeSeekers: number;
  verifiedEmployers: number;
  shiftsFilled: number;
  averageHourlyPay: number;
  fraudAlertsCount: number;
}

export interface AuthUser {
  id: string;
  name: string;
  loginMethod: 'mobile' | 'email';
  phone?: string;
  email?: string;
  role: UserRole;
  isVerified: boolean;
  city: IndianCity;
  locality: string;
  createdAt?: string;
}

// Backward-compatible types for portfolio components
export interface Project {
  [key: string]: any;
}

export interface ExperienceItem {
  [key: string]: any;
}

export interface SkillCategory {
  [key: string]: any;
}

export interface ServiceItem {
  [key: string]: any;
}

export interface ContactFormData {
  [key: string]: any;
}
