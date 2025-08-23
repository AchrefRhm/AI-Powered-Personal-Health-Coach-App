import React, { useState, useRef } from 'react';
import { Camera, Upload, Plus, Search, Trash2 } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Modal from '../ui/Modal';
import Badge from '../ui/Badge';
import { mealsApi } from '../../services/api';
import { Meal } from '../../types';
import { mockMeals } from '../../data/mockData';

const MealTracker: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>(mockMeals);
  const [showAddModal, setShowAddModal] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setAnalyzing(true);

    try {
      const result = await mealsApi.analyzeMealPhoto(file);
      setAnalysisResult(result);
    } catch (error) {
      console.error('Failed to analyze meal photo:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  const saveMealFromAnalysis = async () => {
    if (!analysisResult) return;

    const newMeal: Omit<Meal, 'id' | 'timestamp'> = {
      userId: '1',
      name: 'AI Identified Meal',
      type: 'lunch',
      foods: analysisResult.foods.map((food: any) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: food.name,
        quantity: food.quantity,
        unit: food.unit,
        calories: food.calories,
        macros: { protein: 0, carbs: 0, fat: 0 },
        verified: false
      })),
      totalCalories: analysisResult.calories,
      macros: { protein: 0, carbs: 0, fat: 0 }
    };

    try {
      const savedMeal = await mealsApi.addMeal(newMeal);
      setMeals(prev => [savedMeal, ...prev]);
      setShowAddModal(false);
      setSelectedFile(null);
      setAnalysisResult(null);
    } catch (error) {
      console.error('Failed to save meal:', error);
    }
  };

  const getTotalCaloriesToday = () => {
    const today = new Date().toDateString();
    return meals
      .filter(meal => new Date(meal.timestamp).toDateString() === today)
      .reduce((total, meal) => total + meal.totalCalories, 0);
  };

  const getMealsByType = (type: string) => {
    const today = new Date().toDateString();
    return meals.filter(meal => 
      meal.type === type && 
      new Date(meal.timestamp).toDateString() === today
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Meal Tracker</h1>
            <p className="text-gray-600">Track your nutrition with AI-powered meal recognition</p>
          </div>
          <Button
            onClick={() => setShowAddModal(true)}
            icon={Plus}
            className="mt-4 sm:mt-0"
          >
            Log Meal
          </Button>
        </div>

        {/* Daily Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{getTotalCaloriesToday()}</p>
              <p className="text-sm text-gray-600">Calories Today</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((getTotalCaloriesToday() / 2000) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">{meals.length}</p>
              <p className="text-sm text-gray-600">Meals Logged</p>
              <Badge variant="success" className="mt-2">
                On Track
              </Badge>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">85%</p>
              <p className="text-sm text-gray-600">Goal Progress</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div className="bg-purple-600 h-2 rounded-full w-4/5 transition-all duration-300"></div>
              </div>
            </div>
          </Card>
        </div>

        {/* Meal Types */}
        <div className="space-y-6">
          {['breakfast', 'lunch', 'dinner', 'snack'].map((mealType) => (
            <Card key={mealType} className="overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 capitalize">
                  {mealType}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={Plus}
                  onClick={() => setShowAddModal(true)}
                >
                  Add
                </Button>
              </div>

              <div className="space-y-3">
                {getMealsByType(mealType).map((meal) => (
                  <div key={meal.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    {meal.imageUrl && (
                      <img 
                        src={meal.imageUrl} 
                        alt={meal.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{meal.name}</h4>
                      <p className="text-sm text-gray-600">
                        {meal.totalCalories} cal • {meal.foods.length} items
                      </p>
                      <div className="flex space-x-2 mt-1">
                        <span className="text-xs text-gray-500">
                          P: {meal.macros.protein}g
                        </span>
                        <span className="text-xs text-gray-500">
                          C: {meal.macros.carbs}g
                        </span>
                        <span className="text-xs text-gray-500">
                          F: {meal.macros.fat}g
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" icon={Trash2} />
                  </div>
                ))}

                {getMealsByType(mealType).length === 0 && (
                  <p className="text-gray-500 text-sm py-4 text-center">
                    No {mealType} logged yet. Add your first meal!
                  </p>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Add Meal Modal */}
        <Modal
          isOpen={showAddModal}
          onClose={() => {
            setShowAddModal(false);
            setSelectedFile(null);
            setAnalysisResult(null);
          }}
          title="Log New Meal"
          size="lg"
        >
          <div className="space-y-6">
            {!selectedFile && !analysisResult && (
              <div>
                <p className="text-gray-600 mb-4">
                  Take a photo of your meal for instant AI analysis, or manually add ingredients.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    icon={Camera}
                    size="lg"
                    className="h-24"
                  >
                    Take Photo
                  </Button>
                  
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    icon={Upload}
                    size="lg"
                    className="h-24"
                  >
                    Upload Image
                  </Button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <Button
                    variant="outline"
                    icon={Search}
                    className="w-full"
                    onClick={() => {
                      // Manual food search functionality would go here
                      console.log('Manual search clicked');
                    }}
                  >
                    Search Foods Manually
                  </Button>
                </div>
              </div>
            )}

            {analyzing && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Analyzing your meal with AI...</p>
                <p className="text-sm text-gray-500 mt-2">This may take a few seconds</p>
              </div>
            )}

            {analysisResult && (
              <div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-green-800 mb-2">
                    AI Analysis Complete! ({Math.round(analysisResult.confidence * 100)}% confidence)
                  </h4>
                  <p className="text-sm text-green-700">
                    Found {analysisResult.foods.length} food items with approximately {analysisResult.calories} calories.
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  {analysisResult.foods.map((food: any, index: number) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{food.name}</p>
                        <p className="text-sm text-gray-600">
                          {food.quantity}{food.unit} • {food.calories} cal
                        </p>
                      </div>
                      <Badge variant="info">
                        {Math.round(food.confidence * 100)}%
                      </Badge>
                    </div>
                  ))}
                </div>

                <div className="flex space-x-3">
                  <Button onClick={saveMealFromAnalysis} className="flex-1">
                    Save Meal
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setAnalysisResult(null);
                      setSelectedFile(null);
                    }}
                  >
                    Retake
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default MealTracker;