import React from 'react';
import { Ambulance, Navigation, Clock } from 'lucide-react';
import type { EmergencyVehicle } from '../../types';

const mockEmergencyVehicles: EmergencyVehicle[] = [
  {
    id: '1',
    type: 'ambulance',
    location: { lat: 51.505, lng: -0.09 },
    status: 'responding',
  },
  {
    id: '2',
    type: 'police',
    location: { lat: 51.506, lng: -0.1 },
    status: 'available',
  },
  {
    id: '3',
    type: 'fire',
    location: { lat: 51.507, lng: -0.11 },
    status: 'returning',
  },
];

const statusColors = {
  available: 'bg-green-100 text-green-800',
  responding: 'bg-red-100 text-red-800',
  returning: 'bg-blue-100 text-blue-800',
};

export default function EmergencyVehicles() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Emergency Vehicles</h2>
        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
          Dispatch Vehicle
        </button>
      </div>

      <div className="space-y-4">
        {mockEmergencyVehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <Ambulance className="h-8 w-8 text-primary-500 mr-4" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                  {vehicle.type} Unit
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[vehicle.status]}`}>
                  {vehicle.status}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                <span className="flex items-center gap-1">
                  <Navigation className="h-4 w-4" />
                  {`${vehicle.location.lat.toFixed(3)}, ${vehicle.location.lng.toFixed(3)}`}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  ETA: 5 mins
                </span>
              </div>
            </div>
            <button className="px-3 py-1 text-sm bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
              Track
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}