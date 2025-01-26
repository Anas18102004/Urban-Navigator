import React, { useEffect, useRef } from 'react';
import { MapPin, AlertTriangle, Car, Activity } from 'lucide-react';

const stats = [
  { name: 'Active Accidents', value: '12', icon: AlertTriangle, color: 'text-red-500' },
  { name: 'Vehicle Count', value: '2,847', icon: Car, color: 'text-blue-500' },
  { name: 'Emergency Vehicles', value: '8', icon: Activity, color: 'text-green-500' },
  { name: 'Traffic Signals', value: '124', icon: MapPin, color: 'text-purple-500' },
];

export default function Dashboard() {
  const mapRef = useRef(null);

  useEffect(() => {
    // Load Google Maps script dynamically
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBd3lUa3v3d99_0LUghce1ppgcM7pFQzos`;
    script.async = true;
    script.onload = () => {
      // Initialize the map
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 37.7749, lng: -122.4194 }, // Default to San Francisco
        zoom: 12,
      });

      // Example: Add a marker for a traffic incident
      new window.google.maps.Marker({
        position: { lat: 37.7749, lng: -122.4194 },
        map,
        title: 'Traffic Incident',
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
        },
      });
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script); // Cleanup
    };
  }, []);

  return (
    <div className="flex-1 p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center">
                <div className={`${stat.color} mr-4`}>
                  <Icon className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Traffic Map</h2>
          <div
            className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg"
            ref={mapRef}
            style={{ height: '300px' }}
          ></div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Recent Accidents</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <AlertTriangle className="h-5 w-5 text-red-500 mr-4" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Accident #{i}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Main Street & 5th Avenue
                  </p>
                </div>
                <span className="ml-auto text-xs font-medium text-gray-500 dark:text-gray-400">
                  {i}m ago
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
