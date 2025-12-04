export interface Reading {
  date: string;
  value: number;
  type: string;
  yesterdayValue?: number;
  pastDaysValue?: number;
}

export interface SleepPerformanceData {
  day: string;
  normalSleep: number;
  averageSleep: number;
  deepSleep: number;
}

export interface SleepDetails {
  performance: number;
  hoursVsNeeded: {
    actual: number;
    needed: number;
  };
  consistency: number;
  efficiency: number;
  highStress: number;
  weeklyPerformance: SleepPerformanceData[];
}

export interface Vital {
  heartRate: string;
  bloodPressure: string;
  bloodOxygen: string;
  pastReadings: Reading[];
  recommendations: Record<string, string>;
}

export interface DailyActivity {
  steps: string;
  sleepHours: string;
  caloriesBurnt: string;
  distanceWalked: string;
  pastReadings: Reading[];
  recommendations: Record<string, string>;
  sleepDetails: SleepDetails;
}

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

export interface HealthHistory {
  date: string;
  summary: string;
}

export interface Emergency {
  date: string;
  summary: string;
  severity: 'critical' | 'major' | 'minor';
}

export interface HealthCondition {
  name: string;
  since: string;
  status: string;
  medication: string;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  condition: string;
}

export interface DoctorDetails {
  name: string;
  clinic: string;
  address: string;
  phone: string;
  license: string;
}

export interface Prescription extends Medicine {
  date: string;
  doctor: string;
  doctorDetails: DoctorDetails;
  file: string;
}

export interface Allergy {
  name: string;
  reaction: string;
  precaution: string;
}

export interface UserDetails {
  username: string;
  age: number;
  gender: string;
  height: string;
  weight: string;
  healthConditions: HealthCondition[];
  medications: Medication[];
  prescriptions: Prescription[];
  allergies: Allergy[];
  insurance: string[];
  recentHospitals: string[];
  hospitalContacts: string[];
  guardianContacts: string[];
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  instructions: string;
  prioritized: boolean;
}

export interface AllContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface Medicine {
  id: number;
  name: string;
  price: string;
  description: string;
  frequentlyBought: boolean;
}

export interface CartItem extends Medicine {
  quantity: number;
}

export interface ECommerce {
  medicines: Medicine[];
}

export interface Notification {
  title: string;
  description: string;
  severity: 'critical' | 'important' | 'normal';
}

export interface Quote {
  text: string;
  author: string;
}

export interface Appointment {
  id: number;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export interface MockData {
  vitals: Vital;
  dailyActivity: DailyActivity;
  location: Location;
  healthHistory: HealthHistory[];
  emergencies: Emergency[];
  userDetails: UserDetails;
  emergencyContacts: EmergencyContact[];
  allContacts: AllContact[];
  notifications: Notification[];
  quotes: Quote[];
  ecommerce: ECommerce;
  appointments: Appointment[];
}

export type Page = 'Home' | 'Booking' | 'User' | 'Medicine';
