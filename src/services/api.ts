import { User, Meal, Workout, HealthMetrics, AIRecommendation, MotivationalMessage, WorkoutPlan } from '../types';
import { 
  mockUser, 
  mockMeals, 
  mockWorkouts, 
  mockHealthMetrics, 
  mockRecommendations, 
  mockMotivationalMessages,
  mockWorkoutPlans
} from '../data/mockData';

// Simulate API delay for realistic experience
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// User API
export const userApi = {
  getCurrentUser: async (): Promise<User> => {
    await delay(300);
    return mockUser;
  },

  updateUser: async (updates: Partial<User>): Promise<User> => {
    await delay(500);
    return { ...mockUser, ...updates };
  },

  uploadAvatar: async (file: File): Promise<string> => {
    await delay(1000);
    // Simulate image upload - return a mock URL
    return `https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&t=${Date.now()}`;
  }
};

// Meals API
export const mealsApi = {
  getMeals: async (date?: Date): Promise<Meal[]> => {
    await delay(400);
    return mockMeals;
  },

  addMeal: async (meal: Omit<Meal, 'id' | 'timestamp'>): Promise<Meal> => {
    await delay(600);
    const newMeal: Meal = {
      ...meal,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date()
    };
    return newMeal;
  },

  analyzeMealPhoto: async (photo: File): Promise<{ foods: any[], calories: number, confidence: number }> => {
    await delay(2000); // Simulate AI processing time
    
    // Mock AI analysis results
    const mockAnalysis = {
      foods: [
        { name: 'Grilled Chicken Breast', quantity: 150, unit: 'g', calories: 231, confidence: 0.92 },
        { name: 'Brown Rice', quantity: 100, unit: 'g', calories: 111, confidence: 0.88 },
        { name: 'Broccoli', quantity: 80, unit: 'g', calories: 28, confidence: 0.95 }
      ],
      calories: 370,
      confidence: 0.91
    };
    
    return mockAnalysis;
  },

  deleteMeal: async (mealId: string): Promise<void> => {
    await delay(300);
    // Mock deletion
  }
};

// Workouts API
export const workoutsApi = {
  getWorkouts: async (limit: number = 10): Promise<Workout[]> => {
    await delay(350);
    return mockWorkouts;
  },

  getWorkoutPlans: async (): Promise<WorkoutPlan[]> => {
    await delay(400);
    return mockWorkoutPlans;
  },

  addWorkout: async (workout: Omit<Workout, 'id' | 'timestamp'>): Promise<Workout> => {
    await delay(500);
    const newWorkout: Workout = {
      ...workout,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date()
    };
    return newWorkout;
  },

  generateWorkoutPlan: async (goals: string[], difficulty: string, daysPerWeek: number): Promise<WorkoutPlan> => {
    await delay(1500); // Simulate AI generation time
    
    const mockPlan: WorkoutPlan = {
      id: Math.random().toString(36).substr(2, 9),
      name: `Custom ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Plan`,
      description: `AI-generated ${difficulty} workout plan focusing on ${goals.join(', ')}`,
      duration: 8,
      workoutsPerWeek: daysPerWeek,
      difficulty: difficulty as any,
      goals,
      workouts: mockWorkouts,
      isPremium: false
    };
    
    return mockPlan;
  }
};

// Health Metrics API
export const healthApi = {
  getHealthMetrics: async (days: number = 7): Promise<HealthMetrics[]> => {
    await delay(300);
    return mockHealthMetrics;
  },

  addHealthMetric: async (metric: Omit<HealthMetrics, 'id'>): Promise<HealthMetrics> => {
    await delay(400);
    const newMetric: HealthMetrics = {
      ...metric,
      id: Math.random().toString(36).substr(2, 9)
    };
    return newMetric;
  },

  syncWearableData: async (deviceId: string): Promise<HealthMetrics[]> => {
    await delay(1200); // Simulate sync time
    return mockHealthMetrics;
  }
};

// AI Recommendations API
export const aiApi = {
  getRecommendations: async (): Promise<AIRecommendation[]> => {
    await delay(400);
    return mockRecommendations;
  },

  getMotivationalMessage: async (): Promise<MotivationalMessage> => {
    await delay(300);
    const messages = mockMotivationalMessages;
    return messages[Math.floor(Math.random() * messages.length)];
  },

  generatePersonalizedTip: async (userContext: any): Promise<string> => {
    await delay(800);
    const tips = [
      "Based on your recent workouts, try adding 5 minutes of stretching after each session.",
      "Your sleep quality has improved 15% this week! Keep up your bedtime routine.",
      "Consider having a protein-rich snack within 30 minutes after your strength training.",
      "Your step count is trending upward! Aim for 10,000 steps tomorrow.",
      "Try meal prepping on Sundays to maintain your healthy eating streak."
    ];
    return tips[Math.floor(Math.random() * tips.length)];
  },

  markRecommendationAsRead: async (recommendationId: string): Promise<void> => {
    await delay(200);
    // Mock marking as read
  }
};

// Chat API (for AI coach conversations)
export const chatApi = {
  sendMessage: async (message: string): Promise<string> => {
    await delay(1000); // Simulate AI processing
    
    // Mock AI responses based on message content
    const responses = {
      weight: "Great question about weight management! Based on your current progress, you're on track to reach your goal. Focus on maintaining a consistent calorie deficit of 300-500 calories per day.",
      workout: "For your fitness level, I recommend increasing your workout intensity gradually. Try adding 5 minutes to your cardio sessions and increasing weights by 5-10% when you can complete all sets easily.",
      nutrition: "Your nutrition tracking shows good protein intake! Consider adding more colorful vegetables to increase your micronutrient density. Aim for at least 5 different colored foods per day.",
      sleep: "Sleep is crucial for recovery and weight management. Your sleep quality data suggests you might benefit from a consistent bedtime routine. Try avoiding screens 1 hour before bed.",
      motivation: "You're doing amazing! Remember, sustainable changes take time. Focus on progress, not perfection. Every healthy choice you make is an investment in your future self.",
      default: "I'm here to help you on your health journey! Feel free to ask me about nutrition, workouts, sleep, or any wellness topics. How can I support you today?"
    };
    
    const key = Object.keys(responses).find(k => 
      message.toLowerCase().includes(k)
    ) || 'default';
    
    return responses[key as keyof typeof responses];
  }
};

// Subscription API
export const subscriptionApi = {
  upgradeSubscription: async (plan: 'premium' | 'pro'): Promise<{ success: boolean, redirectUrl?: string }> => {
    await delay(800);
    
    // Mock successful upgrade
    return {
      success: true,
      redirectUrl: '/dashboard?upgraded=true'
    };
  },

  cancelSubscription: async (): Promise<{ success: boolean }> => {
    await delay(600);
    return { success: true };
  }
};