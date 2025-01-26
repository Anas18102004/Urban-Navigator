import { useState, useEffect } from 'react';
import type { TrafficSignal, SignalMode, SignalTiming, SignalStatus } from '../types';

const DEFAULT_TIMING: SignalTiming = {
  greenTime: 45,
  yellowTime: 5,
  redTime: 50,
  minimumPedestrianTime: 20,
};

export function useTrafficControl(signal: TrafficSignal) {
  const [currentTiming, setCurrentTiming] = useState<SignalTiming>(DEFAULT_TIMING);
  const [mode, setMode] = useState<SignalMode>(signal.mode);
  const [status, setStatus] = useState<SignalStatus>(signal.status);

  useEffect(() => {
    const updateSignalTiming = () => {
      const hour = new Date().getHours();
      const isNightTime = hour >= 19 || hour < 6;

      // Check for emergency override first
      if (signal.emergencyOverride) {
        setMode('emergency');
        return;
      }

      // Night mode takes precedence over vehicle count mode during night hours
      if (isNightTime) {
        setMode('night');
        setStatus(signal.isMainRoad ? 'flashing-yellow' : 'flashing-red');
        setCurrentTiming(DEFAULT_TIMING);
        return;
      }

      // Vehicle count based mode
      setMode('vehicle-count');
      let newGreenTime = DEFAULT_TIMING.greenTime;

      if (signal.vehicleCount < 10) {
        newGreenTime = 30;
      } else if (signal.vehicleCount <= 30) {
        newGreenTime = 45;
      } else {
        newGreenTime = 60;
      }

      setCurrentTiming({
        ...DEFAULT_TIMING,
        greenTime: Math.max(newGreenTime, DEFAULT_TIMING.minimumPedestrianTime),
      });
    };

    // Update timing every 60 seconds
    updateSignalTiming();
    const interval = setInterval(updateSignalTiming, 60000);

    return () => clearInterval(interval);
  }, [signal.vehicleCount, signal.emergencyOverride, signal.isMainRoad]);

  return {
    currentTiming,
    mode,
    status,
    isNightMode: mode === 'night',
    isEmergencyMode: mode === 'emergency',
  };
}