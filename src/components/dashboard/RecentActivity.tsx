import React from 'react';
import { Clock, Camera, Dumbbell, Apple } from 'lucide-react';
import Card from '../ui/Card';

const RecentActivity: React.FC = () => {
  const activities = [
    {
      id: 1,
      type: 'meal',
      title: 'Logged breakfast',
      subtitle: 'Greek yogurt bowl - 315 cal',
      time: '2 hours ago',
      icon: Apple,
      color: 'text-green-600 bg-green-100'
    },
    {
      id: 2,
      type: 'workout',
      title: 'Completed workout',
      subtitle: 'Upper Body Strength - 45 min',
      time: '6 hours ago',
      icon: Dumbbell,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      id: 3,
      type: 'photo',
      title: 'Meal photo analyzed',
      subtitle: 'Grilled salmon salad identified',
      time: '1 day ago',
      icon: Camera,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      id: 4,
      type: 'goal',
      title: 'Goal milestone reached',
      subtitle: 'Weekly step target achieved!',
      time: '2 days ago',
      icon: Clock,
      color: 'text-yellow-600 bg-yellow-100'
    }
  ];

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${activity.color}`}>
              <activity.icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {activity.title}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {activity.subtitle}
              </p>
            </div>
            <p className="text-xs text-gray-400">{activity.time}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentActivity;