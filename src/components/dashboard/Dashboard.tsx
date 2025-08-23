import React, { useEffect, useState } from 'react';
import { Activity, Heart, Target, TrendingUp, Droplets, Moon } from 'lucide-react';
import StatsCard from './StatsCard';
import HealthChart from './HealthChart';
import RecentActivity from './RecentActivity';
import { healthApi, userApi, aiApi } from '../../services/api';
import { HealthMetrics, User, AIRecommendation } from '../../types';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [healthMetrics, setHealthMetrics] = useState<HealthMetrics[]>([]);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [userData, metricsData, recommendationsData] = await Promise.all([
          userApi.getCurrentUser(),
          healthApi.getHealthMetrics(7),
          aiApi.getRecommendations()
        ]);

        setUser(userData);
        setHealthMetrics(metricsData);
        setRecommendations(recommendationsData);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const latestMetrics = healthMetrics[0];
  const weeklySteps = healthMetrics.map(m => m.steps || 0);
  const weeklyWeight = healthMetrics.map(m => m.weight || 0);

  // Chart data
  const stepsData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    values: weeklySteps,
    color: '#10B981'
  };

  const weightData = {
    labels: ['7d ago', '6d ago', '5d ago', '4d ago', '3d ago', '2d ago', 'Today'],
    values: weeklyWeight,
    color: '#3B82F6'
  };

  const heartRateData = {
    labels: ['12AM', '4AM', '8AM', '12PM', '4PM', '8PM'],
    values: [62, 58, 72, 85, 78, 65],
    color: '#EF4444'
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-600">
            Here's your health overview for today. You're doing great!
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Daily Steps"
            value={latestMetrics?.steps?.toLocaleString() || '0'}
            icon={Activity}
            color="green"
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Heart Rate"
            value={latestMetrics?.heartRate?.average || 0}
            unit="bpm"
            icon={Heart}
            color="red"
            trend={{ value: 3, isPositive: false }}
          />
          <StatsCard
            title="Weight"
            value={latestMetrics?.weight || user?.weight || 0}
            unit="kg"
            icon={Target}
            color="blue"
            trend={{ value: 2.1, isPositive: true }}
          />
          <StatsCard
            title="Calories Burned"
            value="2,247"
            icon={TrendingUp}
            color="purple"
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Water Intake"
            value={((latestMetrics?.waterIntake || 0) / 1000).toFixed(1)}
            unit="L"
            icon={Droplets}
            color="blue"
            trend={{ value: 15, isPositive: true }}
          />
          <StatsCard
            title="Sleep Score"
            value={latestMetrics?.sleepData?.sleepQuality || 0}
            unit="/5"
            icon={Moon}
            color="purple"
            trend={{ value: 5, isPositive: true }}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <HealthChart
            title="Weekly Steps"
            subtitle="Daily step count over the past week"
            data={stepsData}
            type="bar"
            height={250}
          />
          <HealthChart
            title="Weight Progress"
            subtitle="Weight tracking over the past week"
            data={weightData}
            type="line"
            height={250}
          />
          <HealthChart
            title="Heart Rate Today"
            subtitle="Heart rate throughout the day"
            data={heartRateData}
            type="line"
            height={250}
          />
          <div className="lg:col-span-1">
            <RecentActivity />
          </div>
        </div>

        {/* AI Recommendations */}
        {recommendations.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              🤖 AI Recommendations
            </h3>
            <div className="space-y-4">
              {recommendations.slice(0, 3).map((rec) => (
                <div key={rec.id} className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      rec.priority === 'high' ? 'bg-red-500' :
                      rec.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{rec.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{rec.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;