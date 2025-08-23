// Core user and health data types
export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  height: number; // in cm
  weight: number; // in kg
  activityLevel: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extremely_active';
  goals: HealthGoal[];
  subscription: 'free' | 'premium' | 'pro';
  joinDate: Date;
  avatar?: string;
}

export interface HealthGoal {
  id: string;
  type: 'weight_loss' | 'weight_gain' | 'muscle_gain' | 'endurance' | 'general_health';
  target: number;
  current: number;
  unit: string;
  deadline: Date;
  priority: 'low' | 'medium' | 'high';
  status: 'active' | 'paused' | 'completed';
}

// Nutrition and meal tracking types
export interface Meal {
  id: string;
  userId: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foods: FoodItem[];
  totalCalories: number;
  macros: MacroNutrients;
  timestamp: Date;
  imageUrl?: string;
  notes?: string;
}

export interface FoodItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  calories: number;
  macros: MacroNutrients;
  verified: boolean;
}

export interface MacroNutrients {
  protein: number; // in grams
  carbs: number; // in grams
  fat: number; // in grams
  fiber?: number; // in grams
  sugar?: number; // in grams
  sodium?: number; // in mg
}

export interface NutritionGoals {
  dailyCalories: number;
  protein: number; // percentage
  carbs: number; // percentage
  fat: number; // percentage
}

// Workout and fitness types
export interface Workout {
  id: string;
  userId: string;
  name: string;
  type: 'strength' | 'cardio' | 'flexibility' | 'sports' | 'other';
  exercises: Exercise[];
  duration: number; // in minutes
  caloriesBurned: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timestamp: Date;
  notes?: string;
}

export interface Exercise {
  id: string;
  name: string;
  category: 'chest' | 'back' | 'shoulders' | 'arms' | 'legs' | 'core' | 'cardio';
  sets?: ExerciseSet[];
  duration?: number; // for cardio exercises
  instructions: string[];
  imageUrl?: string;
  videoUrl?: string;
}

export interface ExerciseSet {
  reps: number;
  weight?: number; // in kg
  duration?: number; // in seconds
  restTime?: number; // in seconds
}

export interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  duration: number; // in weeks
  workoutsPerWeek: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  goals: string[];
  workouts: Workout[];
  isPremium: boolean;
}

// Health metrics and tracking types
export interface HealthMetrics {
  id: string;
  userId: string;
  date: Date;
  weight?: number;
  bodyFatPercentage?: number;
  muscleMass?: number;
  steps?: number;
  heartRate?: HeartRateData;
  bloodPressure?: BloodPressure;
  sleepData?: SleepData;
  waterIntake?: number; // in ml
  mood?: 1 | 2 | 3 | 4 | 5;
}

export interface HeartRateData {
  resting: number;
  average: number;
  max: number;
  zones: HeartRateZone[];
}

export interface HeartRateZone {
  name: string;
  min: number;
  max: number;
  timeInZone: number; // in minutes
}

export interface BloodPressure {
  systolic: number;
  diastolic: number;
  timestamp: Date;
}

export interface SleepData {
  bedtime: Date;
  wakeTime: Date;
  totalSleep: number; // in hours
  deepSleep: number; // in hours
  lightSleep: number; // in hours
  remSleep: number; // in hours
  sleepQuality: 1 | 2 | 3 | 4 | 5;
  disturbances: number;
}

// AI and recommendations types
export interface AIRecommendation {
  id: string;
  type: 'nutrition' | 'exercise' | 'lifestyle' | 'sleep' | 'hydration';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  actionable: boolean;
  timestamp: Date;
  isRead: boolean;
}

export interface MotivationalMessage {
  id: string;
  message: string;
  category: 'motivation' | 'tip' | 'achievement' | 'reminder';
  timestamp: Date;
  isPersonalized: boolean;
}

// Wearable device integration types
export interface WearableDevice {
  id: string;
  name: string;
  type: 'smartwatch' | 'fitness_tracker' | 'smart_scale' | 'heart_monitor';
  brand: 'apple' | 'fitbit' | 'garmin' | 'samsung' | 'other';
  isConnected: boolean;
  lastSync: Date;
  supportedMetrics: string[];
}

// Premium subscription types
export interface Subscription {
  id: string;
  type: 'free' | 'premium' | 'pro';
  status: 'active' | 'cancelled' | 'expired' | 'trial';
  startDate: Date;
  endDate?: Date;
  features: string[];
  price: number;
  billingCycle: 'monthly' | 'yearly';
}

export interface PremiumFeature {
  id: string;
  name: string;
  description: string;
  category: 'analytics' | 'coaching' | 'integration' | 'customization';
  requiredPlan: 'premium' | 'pro';
  isEnabled: boolean;
}

// Chart and analytics types
export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string;
  borderWidth?: number;
  fill?: boolean;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}