import React from 'react';
import { Car, TrendingUp, ArrowDown, ArrowUp } from 'lucide-react';
import type { Vehicle } from '../../types';

const mockVehicles: Vehicle[] = [
  { id: '1', type: 'car', timestamp: new Date().toISOString(), lane: 1 },
  { id: '2', type: 'truck', timestamp: new Date().toISOString(), lane: 2 },
  { id: '3', type: 'bike', timestamp: new Date().toISOString(), lane: 1 },
];

const laneData = [
  { lane: 1, count: 245, trend: 'up', percentage: 12 },
  { lane: 2, count: 189, trend: 'down', percentage: 8 },
  { lane: 3, count: 320, trend: 'up', percentage: 15 },
  { lane: 4, count: 278, trend: 'up', percentage: 5 },
];

export default function VehicleTracker() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Vehicle Traffic</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-300">Last updated: {new Date().toLocaleTimeString()}</span>
          <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <TrendingUp className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {laneData.map((data) => (
          <div key={data.lane} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Lane {data.lane}</span>
              {data.trend === 'up' ? (
                <ArrowUp className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDown className="h-4 w-4 text-red-500" />
              )}
            </div>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{data.count}</span>
              <span className={`text-sm ${data.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {data.trend === 'up' ? '+' : '-'}{data.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Vehicle Type</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Lane</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Time</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockVehicles.map((vehicle) => (
              <tr key={vehicle.id} className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <Car className="h-5 w-5 text-gray-600 dark:text-gray-300 mr-2" />
                    <span className="text-sm text-gray-900 dark:text-white capitalize">{vehicle.type}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-gray-900 dark:text-white">Lane {vehicle.lane}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {new Date(vehicle.timestamp).toLocaleTimeString()}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    Tracked
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}