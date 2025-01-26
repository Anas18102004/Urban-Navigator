import React from 'react';
import { BarChart2, TrendingUp, Users, AlertTriangle } from 'lucide-react';

const stats = [
  {
    name: 'Total Traffic',
    value: '124,892',
    change: '+12.3%',
    trend: 'up',
  },
  {
    name: 'Peak Hours',
    value: '9AM - 11AM',
    change: '2 hours',
    trend: 'neutral',
  },
  {
    name: 'Accidents Today',
    value: '12',
    change: '-25%',
    trend: 'down',
  },
  {
    name: 'Average Speed',
    value: '45 km/h',
    change: '+5 km/h',
    trend: 'up',
  },
];

export default function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.name}</span>
              <span className={`text-sm ${
                stat.trend === 'up' ? 'text-green-500' : 
                stat.trend === 'down' ? 'text-red-500' : 
                'text-gray-500'
              }`}>
                {stat.change}
              </span>
            </div>
            <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Traffic Trends</h3>
            <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              <BarChart2 className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
          <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-400">Traffic Chart Placeholder</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Accident Analysis</h3>
            <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              <AlertTriangle className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
          <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-400">Accident Chart Placeholder</span>
          </div>
        </div>
      </div>
    </div>
  );
}