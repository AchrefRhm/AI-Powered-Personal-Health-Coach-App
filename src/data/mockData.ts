import { User, Meal, Workout, HealthMetrics, AIRecommendation, MotivationalMessage, WorkoutPlan, WearableDevice, PremiumFeature } from '../types';

// Mock user data
export const mockUser: User = {
  id: '1',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@example.com',
  age: 28,
  height: 165,
  weight: 68,
  activityLevel: 'moderately_active',
  goals: [
    {
      id: '1',
      type: 'weight_loss',
      target: 63,
      current: 68,
      unit: 'kg',
      deadline: new Date('2024-06-01'),
      priority: 'high',
      status: 'active'
    },
    {
      id: '2',
      type: 'muscle_gain',
      target: 25,
      current: 22,
      unit: '% body fat',
      deadline: new Date('2024-08-01'),
      priority: 'medium',
      status: 'active'
    }
  ],
  subscription: 'premium',
  joinDate: new Date('2024-01-15'),
  avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
};

// Mock meals data
export const mockMeals: Meal[] = [
  {
    id: '1',
    userId: '1',
    name: 'Greek Yogurt Bowl',
    type: 'breakfast',
    foods: [
      {
        id: '1',
        name: 'Greek Yogurt',
        quantity: 150,
        unit: 'g',
        calories: 130,
        macros: { protein: 15, carbs: 6, fat: 4 },
        verified: true
      },
      {
        id: '2',
        name: 'Blueberries',
        quantity: 80,
        unit: 'g',
        calories: 45,
        macros: { protein: 0.5, carbs: 11, fat: 0.2 },
        verified: true
      },
      {
        id: '3',
        name: 'Granola',
        quantity: 30,
        unit: 'g',
        calories: 140,
        macros: { protein: 4, carbs: 18, fat: 6 },
        verified: true
      }
    ],
    totalCalories: 315,
    macros: { protein: 19.5, carbs: 35, fat: 10.2 },
    timestamp: new Date('2024-03-15T08:30:00'),
    imageUrl: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
  },
  {
    id: '2',
    userId: '1',
    name: 'Grilled Salmon Salad',
    type: 'lunch',
    foods: [
      {
        id: '4',
        name: 'Grilled Salmon',
        quantity: 120,
        unit: 'g',
        calories: 250,
        macros: { protein: 25, carbs: 0, fat: 15 },
        verified: true
      },
      {
        id: '5',
        name: 'Mixed Greens',
        quantity: 100,
        unit: 'g',
        calories: 20,
        macros: { protein: 2, carbs: 4, fat: 0.2 },
        verified: true
      }
    ],
    totalCalories: 270,
    macros: { protein: 27, carbs: 4, fat: 15.2 },
    timestamp: new Date('2024-03-15T13:00:00'),
    imageUrl: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
  }
];

// Mock workouts data
export const mockWorkouts: Workout[] = [
  {
    id: '1',
    userId: '1',
    name: 'Upper Body Strength',
    type: 'strength',
    exercises: [
      {
        id: '1',
        name: 'Push-ups',
        category: 'chest',
        sets: [
          { reps: 12, restTime: 60 },
          { reps: 10, restTime: 60 },
          { reps: 8, restTime: 60 }
        ],
        instructions: [
          'Start in plank position',
          'Lower chest to ground',
          'Push back up to starting position'
        ]
      },
      {
        id: '2',
        name: 'Dumbbell Rows',
        category: 'back',
        sets: [
          { reps: 12, weight: 15, restTime: 90 },
          { reps: 10, weight: 15, restTime: 90 },
          { reps: 8, weight: 17.5, restTime: 90 }
        ],
        instructions: [
          'Bend forward at hips',
          'Pull dumbbells to chest',
          'Lower with control'
        ]
      }
    ],
    duration: 45,
    caloriesBurned: 280,
    difficulty: 'intermediate',
    timestamp: new Date('2024-03-15T18:00:00')
  }
];

// Mock health metrics
export const mockHealthMetrics: HealthMetrics[] = [
  {
    id: '1',
    userId: '1',
    date: new Date('2024-03-15'),
    weight: 68,
    steps: 8500,
    heartRate: {
      resting: 65,
      average: 78,
      max: 145,
      zones: [
        { name: 'Rest', min: 0, max: 70, timeInZone: 720 },
        { name: 'Fat Burn', min: 70, max: 100, timeInZone: 180 },
        { name: 'Cardio', min: 100, max: 140, timeInZone: 45 },
        { name: 'Peak', min: 140, max: 180, timeInZone: 15 }
      ]
    },
    sleepData: {
      bedtime: new Date('2024-03-14T23:00:00'),
      wakeTime: new Date('2024-03-15T07:00:00'),
      totalSleep: 8,
      deepSleep: 2.5,
      lightSleep: 4.5,
      remSleep: 1,
      sleepQuality: 4,
      disturbances: 2
    },
    waterIntake: 2100,
    mood: 4
  }
];

// Mock AI recommendations
export const mockRecommendations: AIRecommendation[] = [
  {
    id: '1',
    type: 'nutrition',
    title: 'Increase Protein Intake',
    message: 'Based on your workout intensity, consider adding 10g more protein to reach your muscle building goals.',
    priority: 'medium',
    actionable: true,
    timestamp: new Date('2024-03-15T09:00:00'),
    isRead: false
  },
  {
    id: '2',
    type: 'exercise',
    title: 'Add Cardio Session',
    message: 'Your heart rate data suggests adding a 20-minute cardio session twice a week for optimal cardiovascular health.',
    priority: 'high',
    actionable: true,
    timestamp: new Date('2024-03-15T10:30:00'),
    isRead: false
  },
  {
    id: '3',
    type: 'sleep',
    title: 'Improve Sleep Quality',
    message: 'Try reducing screen time 1 hour before bed to improve your deep sleep duration.',
    priority: 'medium',
    actionable: true,
    timestamp: new Date('2024-03-15T07:30:00'),
    isRead: true
  }
];

// Mock motivational messages
export const mockMotivationalMessages: MotivationalMessage[] = [
  {
    id: '1',
    message: "You're 60% closer to your weight goal! Keep up the amazing work, Sarah! 🌟",
    category: 'motivation',
    timestamp: new Date('2024-03-15T08:00:00'),
    isPersonalized: true
  },
  {
    id: '2',
    message: 'Remember: Progress, not perfection. Every healthy choice counts!',
    category: 'tip',
    timestamp: new Date('2024-03-15T14:00:00'),
    isPersonalized: false
  },
  {
    id: '3',
    message: 'Congratulations! You completed 3 workouts this week! 🎉',
    category: 'achievement',
    timestamp: new Date('2024-03-15T19:00:00'),
    isPersonalized: true
  }
];

// Mock workout plans
export const mockWorkoutPlans: WorkoutPlan[] = [
  {
    id: '1',
    name: 'Weight Loss Accelerator',
    description: 'High-intensity workouts designed to maximize calorie burn and boost metabolism.',
    duration: 8,
    workoutsPerWeek: 4,
    difficulty: 'intermediate',
    goals: ['weight_loss', 'endurance'],
    workouts: [],
    isPremium: false
  },
  {
    id: '2',
    name: 'Muscle Building Master',
    description: 'Progressive strength training program for lean muscle development.',
    duration: 12,
    workoutsPerWeek: 5,
    difficulty: 'advanced',
    goals: ['muscle_gain', 'strength'],
    workouts: [],
    isPremium: true
  },
  {
    id: '3',
    name: 'Beginner Friendly Start',
    description: 'Perfect introduction to fitness with low-impact, effective exercises.',
    duration: 6,
    workoutsPerWeek: 3,
    difficulty: 'beginner',
    goals: ['general_health', 'endurance'],
    workouts: [],
    isPremium: false
  }
];

// Mock wearable devices
export const mockWearableDevices: WearableDevice[] = [
  {
    id: '1',
    name: 'Apple Watch Series 9',
    type: 'smartwatch',
    brand: 'apple',
    isConnected: true,
    lastSync: new Date('2024-03-15T06:00:00'),
    supportedMetrics: ['heartRate', 'steps', 'sleep', 'calories', 'workouts']
  },
  {
    id: '2',
    name: 'Fitbit Charge 5',
    type: 'fitness_tracker',
    brand: 'fitbit',
    isConnected: false,
    lastSync: new Date('2024-03-10T08:00:00'),
    supportedMetrics: ['heartRate', 'steps', 'sleep', 'calories']
  }
];

// Mock premium features
export const mockPremiumFeatures: PremiumFeature[] = [
  {
    id: '1',
    name: 'Advanced Analytics',
    description: 'Detailed health reports with trend analysis and predictive insights',
    category: 'analytics',
    requiredPlan: 'premium',
    isEnabled: true
  },
  {
    id: '2',
    name: 'Personal Coaching',
    description: 'One-on-one sessions with certified fitness and nutrition professionals',
    category: 'coaching',
    requiredPlan: 'pro',
    isEnabled: false
  },
  {
    id: '3',
    name: 'Medical Integrations',
    description: 'Connect with healthcare providers and sync medical records',
    category: 'integration',
    requiredPlan: 'pro',
    isEnabled: false
  },
  {
    id: '4',
    name: 'Custom Meal Plans',
    description: 'AI-generated meal plans tailored to your dietary restrictions and goals',
    category: 'customization',
    requiredPlan: 'premium',
    isEnabled: true
  }
];

// Chart data for analytics
export const weightProgressData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Weight (kg)',
      data: [72, 71, 69.5, 68.8, 68.2, 68],
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderWidth: 3,
      fill: true
    }
  ]
};

export const caloriesBurnedData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Calories Burned',
      data: [450, 320, 580, 420, 650, 380, 290],
      backgroundColor: [
        '#10B981',
        '#3B82F6',
        '#8B5CF6',
        '#F59E0B',
        '#EF4444',
        '#10B981',
        '#6B7280'
      ],
      borderWidth: 0
    }
  ]
};

export const macroDistributionData = {
  labels: ['Protein', 'Carbs', 'Fat'],
  datasets: [
    {
      label: 'Macronutrients',
      data: [30, 45, 25],
      backgroundColor: [
        '#10B981',
        '#3B82F6',
        '#F59E0B'
      ],
      borderWidth: 0
    }
  ]
};

export const sleepQualityData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Sleep Quality',
      data: [4, 3, 4, 5, 3, 5, 4],
      borderColor: '#8B5CF6',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      borderWidth: 3,
      fill: true
    }
  ]
};