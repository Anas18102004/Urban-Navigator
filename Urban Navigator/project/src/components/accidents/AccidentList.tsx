import React from 'react';
import { AlertTriangle, MapPin, Clock } from 'lucide-react';
import type { Accident } from '../../types';

const mockAccidents: Accident[] = [
  {
    id: '1',
    location: { lat: 51.505, lng: -0.09 },
    severity: 'severe',
    status: 'pending',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: '2',
    location: { lat: 51.506, lng: -0.1 },
    severity: 'moderate',
    status: 'dispatched',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: '3',
    location: { lat: 51.507, lng: -0.11 },
    severity: 'minor',
    status: 'resolved',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
];

const severityColors = {
  minor: 'bg-yellow-100 text-yellow-800',
  moderate: 'bg-orange-100 text-orange-800',
  severe: 'bg-red-100 text-red-800',
};

const statusColors = {
  resolved: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  dispatched: 'bg-blue-100 text-blue-800',
};

export default function AccidentList() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Accidents</h2>
        <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
          Report Accident
        </button>
      </div>
      
      <div className="space-y-4">
        {mockAccidents.map((accident) => (
          <div
            key={accident.id}
            className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
          >
            <AlertTriangle className={`h-8 w-8 ${accident.severity === 'severe' ? 'text-red-500' : 'text-yellow-500'} mr-4`} />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${severityColors[accident.severity]}`}>
                  {accident.severity}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[accident.status]}`}>
                  {accident.status}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {`${accident.location.lat.toFixed(3)}, ${accident.location.lng.toFixed(3)}`}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {new Date(accident.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
            <button className="px-3 py-1 text-sm bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}