import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/dashboard/Dashboard';
import MealTracker from './components/meals/MealTracker';
import WorkoutPlanner from './components/workouts/WorkoutPlanner';
import AICoach from './components/chat/AICoach';
import PremiumFeatures from './components/premium/PremiumFeatures';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'meals':
        return <MealTracker />;
      case 'workouts':
        return <WorkoutPlanner />;
      case 'chat':
        return <AICoach />;
      case 'premium':
        return <PremiumFeatures />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      <main className="relative">
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default App;