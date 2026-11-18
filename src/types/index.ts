export type Species = 'Dog' | 'Cat' | 'Bird' | 'Rabbit' | 'Other';

export interface Vitals {
  heartRate: number; // bpm
  temperature: number; // °F
  respiratoryRate: number; // breaths/min
  activityScore: number; // 0-100
  lastUpdated: string;
}

export interface WeightEntry {
  id: string;
  date: string;
  weight: number; // kg or lbs
  note?: string;
}

export interface Vaccination {
  id: string;
  name: string;
  dateAdministered: string;
  nextDueDate: string;
  status: 'up-to-date' | 'due-soon' | 'overdue';
  veterinarian: string;
  clinic: string;
  batchNumber: string;
}

export interface MedicalRecord {
  id: string;
  date: string;
  category: 'Vaccination' | 'Surgery' | 'Checkup' | 'Lab Work' | 'Prescription';
  title: string;
  description: string;
  veterinarian: string;
  clinic: string;
  status: 'Completed' | 'Follow-up Required' | 'Ongoing';
  attachments?: string[];
  medications?: string[];
}

export interface Pet {
  id: string;
  name: string;
  species: Species;
  breed: string;
  age: string; // e.g., "3 yrs 4 mos"
  birthDate: string;
  gender: 'Male' | 'Female';
  neutered: boolean;
  weight: number; // in lbs
  targetWeight: number;
  weightUnit: 'lbs' | 'kg';
  microchipId: string;
  photoUrl: string;
  status: 'Healthy' | 'Needs Attention' | 'Under Treatment';
  healthScore: number; // 0-100
  allergies: string[];
  diet: string;
  insuranceProvider?: string;
  vitals: Vitals;
  weightHistory: WeightEntry[];
  vaccinations: Vaccination[];
  medicalRecords: MedicalRecord[];
}

export interface Veterinarian {
  id: string;
  name: string;
  title: string;
  clinic: string;
  clinicAddress: string;
  rating: number;
  reviewCount: number;
  experienceYears: number;
  specializations: string[];
  avatarUrl: string;
  availableDays: string[]; // ['Mon', 'Tue', 'Wed', ...]
  availableSlots: string[]; // ['09:00 AM', '10:30 AM', ...]
  consultationFee: number;
  bio: string;
  education: string;
  acceptsVirtual: boolean;
}

export interface Appointment {
  id: string;
  petId: string;
  petName: string;
  petPhotoUrl: string;
  vetId: string;
  vetName: string;
  vetTitle: string;
  vetAvatarUrl: string;
  clinic: string;
  clinicAddress: string;
  date: string; // '2026-11-24'
  time: string; // '10:00 AM'
  type: 'In-Person Clinic Visit' | 'Virtual Tele-Triage' | 'Emergency Priority';
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
  reason: string;
  notes?: string;
  fee: number;
}

export type TriageSeverity = 'Routine' | 'Monitor' | 'Urgent' | 'Emergency';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  petId?: string;
  triageSeverity?: TriageSeverity;
  recommendations?: string[];
  isEmergencyAlert?: boolean;
}

export interface ActivityLog {
  id: string;
  type: 'appointment' | 'vaccine' | 'weight' | 'ai-triage' | 'medication';
  title: string;
  description: string;
  timestamp: string;
  petName: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  role: 'Pet Parent' | 'Veterinary Staff';
  avatarUrl: string;
  memberSince: string;
  preferredClinic: string;
}
