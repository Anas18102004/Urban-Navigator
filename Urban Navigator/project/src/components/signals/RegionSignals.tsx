import React, { useState, useEffect } from 'react';
import { Gauge, AlertTriangle, Timer, Car, Brain, Moon, Zap, Settings, Clock } from 'lucide-react';
import type { Region, TrafficSignal, SignalMode, SignalStatus } from '../../types';
import { useTrafficControl } from '../../hooks/useTrafficControl';

const mockRegions: Region[] = [
  {
    id: '1',
    name: 'Main Street',
    signals: [
      {
        id: '1',
        status: 'green',
        location: { lat: 51.505, lng: -0.09 },
        timing: {
          greenTime: 45,
          yellowTime: 5,
          redTime: 50,
          minimumPedestrianTime: 20,
        },
        region: 'Main Street',
        lane: 1,
        vehicleCount: 35,
        mode: 'vehicle-count',
        isMainRoad: true,
        lastUpdate: new Date().toISOString(),
        emergencyOverride: false,
        aiRecommendation: {
          suggestedStatus: 'green',
          suggestedTiming: 60,
          reason: 'High traffic volume detected',
        },
      },
      {
        id: '2',
        status: 'red',
        location: { lat: 51.506, lng: -0.1 },
        timing: {
          greenTime: 30,
          yellowTime: 5,
          redTime: 50,
          minimumPedestrianTime: 20,
        },
        region: 'Main Street',
        lane: 2,
        vehicleCount: 12,
        mode: 'vehicle-count',
        isMainRoad: false,
        lastUpdate: new Date().toISOString(),
        emergencyOverride: false,
      },
    ],
    totalVehicles: 47,
    status: 'normal',
    currentMode: 'vehicle-count',
  },
  {
    id: '2',
    name: 'Downtown',
    signals: [
      {
        id: '3',
        status: 'red',
        location: { lat: 51.507, lng: -0.11 },
        timing: {
          greenTime: 30,
          yellowTime: 5,
          redTime: 50,
          minimumPedestrianTime: 20,
        },
        region: 'Downtown',
        lane: 1,
        vehicleCount: 28,
        mode: 'night',
        isMainRoad: true,
        lastUpdate: new Date().toISOString(),
        emergencyOverride: false,
      },
      {
        id: '4',
        status: 'green',
        location: { lat: 51.508, lng: -0.12 },
        timing: {
          greenTime: 45,
          yellowTime: 5,
          redTime: 50,
          minimumPedestrianTime: 20,
        },
        region: 'Downtown',
        lane: 2,
        vehicleCount: 42,
        mode: 'vehicle-count',
        isMainRoad: false,
        lastUpdate: new Date().toISOString(),
        emergencyOverride: false,
        aiRecommendation: {
          suggestedStatus: 'green',
          suggestedTiming: 55,
          reason: 'Increasing traffic trend',
        },
      },
    ],
    totalVehicles: 70,
    status: 'congested',
    currentMode: 'night',
  },
];

const statusColors = {
  'red': 'bg-red-100 text-red-800',
  'yellow': 'bg-yellow-100 text-yellow-800',
  'green': 'bg-green-100 text-green-800',
  'flashing-yellow': 'bg-yellow-100 text-yellow-800',
  'flashing-red': 'bg-red-100 text-red-800',
};

const regionStatusColors = {
  normal: 'bg-green-100 text-green-800',
  congested: 'bg-yellow-100 text-yellow-800',
  emergency: 'bg-red-100 text-red-800',
};

const modeColors = {
  'vehicle-count': 'bg-purple-100 text-purple-800',
  'night': 'bg-indigo-100 text-indigo-800',
  'emergency': 'bg-red-100 text-red-800',
  'manual': 'bg-gray-100 text-gray-800',
};

const modeIcons = {
  'vehicle-count': Car,
  'night': Moon,
  'emergency': AlertTriangle,
  'manual': Settings,
};

function SignalCard({ signal }: { signal: TrafficSignal }) {
  const { currentTiming, mode, status, isNightMode } = useTrafficControl(signal);
  const [timeLeft, setTimeLeft] = useState(currentTiming.greenTime);

  useEffect(() => {
    if (isNightMode) return; // Don't countdown during night mode

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : currentTiming.greenTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [currentTiming.greenTime, isNightMode]);

  const ModeIcon = modeIcons[mode];

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          Lane {signal.lane}
        </span>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
            {status}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${modeColors[mode]} flex items-center gap-1`}>
            <ModeIcon className="h-3 w-3" />
            {mode.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Car className="h-4 w-4 text-gray-600 dark:text-gray-300" />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {signal.vehicleCount} vehicles
          </span>
        </div>
        {!isNightMode && (
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {timeLeft}s remaining
            </span>
          </div>
        )}
      </div>

      {mode === 'vehicle-count' && (
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Current timing: {currentTiming.greenTime}s green
        </div>
      )}
    </div>
  );
}

export default function RegionSignals() {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [showAIRecommendations, setShowAIRecommendations] = useState(true);
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      const hour = new Date().getHours();
      const isNightTime = hour >= 20 || hour < 6;

      if (isNightTime) {
        addNotification('Night Mode activated automatically - Optimizing for low traffic conditions');
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const addNotification = (message: string) => {
    setNotifications(prev => [message, ...prev].slice(0, 5));
  };

  const handleSignalOverride = (signalId: string, newStatus: SignalStatus) => {
    addNotification(`Manual override: Signal ${signalId} changed to ${newStatus}`);
  };

  const handleModeChange = (regionId: string, mode: SignalMode) => {
    addNotification(`${mode.charAt(0).toUpperCase() + mode.slice(1)} Mode activated for ${
      mockRegions.find(r => r.id === regionId)?.name
    }`);
  };

  const handleApplyAIRecommendation = (signal: TrafficSignal) => {
    if (signal.aiRecommendation) {
      handleSignalOverride(signal.id, signal.aiRecommendation.suggestedStatus);
      addNotification(`AI recommendation applied to Signal ${signal.id}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Traffic Signal Control</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowAIRecommendations(!showAIRecommendations)}
            className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <Brain className="h-4 w-4" />
            {showAIRecommendations ? 'Hide AI Recommendations' : 'Show AI Recommendations'}
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
            Emergency Override
          </button>
        </div>
      </div>

      {notifications.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">System Notifications</h3>
          <div className="space-y-2">
            {notifications.map((notification, index) => (
              <div key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                {notification}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockRegions.map((region) => (
          <div
            key={region.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelectedRegion(region)}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{region.name}</h3>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${regionStatusColors[region.status]}`}>
                  {region.status}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${modeColors[region.currentMode]} flex items-center gap-1`}>
                  {React.createElement(modeIcons[region.currentMode], { className: 'h-3 w-3' })}
                  {region.currentMode.charAt(0).toUpperCase() + region.currentMode.slice(1)}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Car className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {region.totalVehicles} vehicles
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Timer className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {region.signals.length} signals
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedRegion && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mt-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {selectedRegion.name} - Signal Details
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Signals automatically adjust based on vehicle count and time of day
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {selectedRegion.signals.map((signal) => (
              <SignalCard key={signal.id} signal={signal} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}