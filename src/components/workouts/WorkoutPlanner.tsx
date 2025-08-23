import React, { useState, useEffect } from 'react';
import { Dumbbell, Clock, Target, Play, Star, Crown } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Modal from '../ui/Modal';
import { workoutsApi } from '../../services/api';
import { WorkoutPlan, Workout } from '../../types';
import { mockWorkoutPlans } from '../../data/mockData';

const WorkoutPlanner: React.FC = () => {
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>(mockWorkoutPlans);
  const [recentWorkouts, setRecentWorkouts] = useState<Workout[]>([]);
  const [showCustomPlanModal, setShowCustomPlanModal] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [customPlanForm, setCustomPlanForm] = useState({
    goals: [] as string[],
    difficulty: 'beginner',
    daysPerWeek: 3
  });

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const workouts = await workoutsApi.getWorkouts(5);
        setRecentWorkouts(workouts);
      } catch (error) {
        console.error('Failed to fetch workouts:', error);
      }
    };

    fetchWorkouts();
  }, []);

  const handleGenerateCustomPlan = async () => {
    setGenerating(true);
    try {
      const newPlan = await workoutsApi.generateWorkoutPlan(
        customPlanForm.goals,
        customPlanForm.difficulty,
        customPlanForm.daysPerWeek
      );
      setWorkoutPlans(prev => [newPlan, ...prev]);
      setShowCustomPlanModal(false);
      setCustomPlanForm({ goals: [], difficulty: 'beginner', daysPerWeek: 3 });
    } catch (error) {
      console.error('Failed to generate workout plan:', error);
    } finally {
      setGenerating(false);
    }
  };

  const toggleGoal = (goal: string) => {
    setCustomPlanForm(prev => ({
      ...prev,
      goals: prev.goals.includes(goal) 
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'error';
      default: return 'info';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Workout Planner</h1>
            <p className="text-gray-600">AI-powered workout plans tailored to your goals</p>
          </div>
          <Button
            onClick={() => setShowCustomPlanModal(true)}
            icon={Target}
            className="mt-4 sm:mt-0"
          >
            Create Custom Plan
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="text-center">
              <Dumbbell className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-600">Workouts This Month</p>
            </div>
          </Card>
          
          <Card>
            <div className="text-center">
              <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">480</p>
              <p className="text-sm text-gray-600">Minutes Exercised</p>
            </div>
          </Card>
          
          <Card>
            <div className="text-center">
              <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">85%</p>
              <p className="text-sm text-gray-600">Goal Achievement</p>
            </div>
          </Card>
        </div>

        {/* Workout Plans Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Available Workout Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workoutPlans.map((plan) => (
              <Card key={plan.id} hover className="relative">
                {plan.isPremium && (
                  <div className="absolute top-4 right-4">
                    <Crown className="h-5 w-5 text-yellow-500" />
                  </div>
                )}
                
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{plan.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant={getDifficultyColor(plan.difficulty)}>
                      {plan.difficulty}
                    </Badge>
                    <Badge variant="info">
                      {plan.duration} weeks
                    </Badge>
                    <Badge variant="secondary">
                      {plan.workoutsPerWeek}x/week
                    </Badge>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">4.8 (234 reviews)</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full" 
                  icon={Play}
                  variant={plan.isPremium ? 'secondary' : 'primary'}
                >
                  {plan.isPremium ? 'Upgrade to Access' : 'Start Plan'}
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Workouts */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Workouts</h3>
          <div className="space-y-4">
            {recentWorkouts.map((workout) => (
              <div key={workout.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                    <Dumbbell className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{workout.name}</h4>
                    <p className="text-sm text-gray-600">
                      {workout.duration} min • {workout.caloriesBurned} cal burned
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {new Date(workout.timestamp).toLocaleDateString()}
                  </p>
                  <Badge variant={getDifficultyColor(workout.difficulty)}>
                    {workout.difficulty}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Custom Plan Modal */}
        <Modal
          isOpen={showCustomPlanModal}
          onClose={() => setShowCustomPlanModal(false)}
          title="Create Custom Workout Plan"
          size="lg"
        >
          <div className="space-y-6">
            {/* Goals Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                What are your fitness goals?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'weight_loss',
                  'muscle_gain',
                  'endurance',
                  'strength',
                  'flexibility',
                  'general_health'
                ].map((goal) => (
                  <button
                    key={goal}
                    onClick={() => toggleGoal(goal)}
                    className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                      customPlanForm.goals.includes(goal)
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {goal.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Your fitness level
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['beginner', 'intermediate', 'advanced'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setCustomPlanForm(prev => ({ ...prev, difficulty: level }))}
                    className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                      customPlanForm.difficulty === level
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Days per Week */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Workouts per week: {customPlanForm.daysPerWeek}
              </label>
              <input
                type="range"
                min="1"
                max="7"
                value={customPlanForm.daysPerWeek}
                onChange={(e) => setCustomPlanForm(prev => ({ 
                  ...prev, 
                  daysPerWeek: parseInt(e.target.value) 
                }))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1 day</span>
                <span>7 days</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <Button
                onClick={handleGenerateCustomPlan}
                disabled={customPlanForm.goals.length === 0 || generating}
                loading={generating}
                className="flex-1"
              >
                {generating ? 'Generating Plan...' : 'Generate AI Plan'}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowCustomPlanModal(false)}
                disabled={generating}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default WorkoutPlanner;