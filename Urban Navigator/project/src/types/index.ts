export interface Vehicle {
  id: string;
  type: 'car' | 'truck' | 'bike';
  timestamp: string;
  lane: number;
}

export interface Accident {
  id: string;
  location: {
    lat: number;
    lng: number;
  };
  severity: 'minor' | 'moderate' | 'severe';
  status: 'resolved' | 'pending' | 'dispatched';
  timestamp: string;
}

export interface EmergencyVehicle {
  id: string;
  type: 'ambulance' | 'police' | 'fire';
  location: {
    lat: number;
    lng: number;
  };
  status: 'available' | 'responding' | 'returning';
}

export type SignalMode = 'vehicle-count' | 'night' | 'emergency' | 'manual';
export type SignalStatus = 'red' | 'yellow' | 'green' | 'flashing-yellow' | 'flashing-red';

export interface SignalModeInfo {
  mode: SignalMode;
  activatedAt: string;
  reason: string;
}

export interface SignalTiming {
  greenTime: number;
  yellowTime: number;
  redTime: number;
  minimumPedestrianTime: number;
}

export interface TrafficSignal {
  id: string;
  status: SignalStatus;
  location: {
    lat: number;
    lng: number;
  };
  timing: SignalTiming;
  region: string;
  lane: number;
  vehicleCount: number;
  mode: SignalMode;
  isMainRoad: boolean;
  lastUpdate: string;
  emergencyOverride: boolean;
  aiRecommendation?: {
    suggestedStatus: SignalStatus;
    suggestedTiming: number;
    reason: string;
  };
}

export interface Region {
  id: string;
  name: string;
  signals: TrafficSignal[];
  totalVehicles: number;
  status: 'normal' | 'congested' | 'emergency';
  currentMode: SignalMode;
}