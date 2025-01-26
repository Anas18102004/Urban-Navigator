import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AccidentList from './components/accidents/AccidentList';
import VehicleTracker from './components/vehicles/VehicleTracker';
import EmergencyVehicles from './components/emergency/EmergencyVehicles';
import AnalyticsDashboard from './components/analytics/AnalyticsDashboard';
import RegionSignals from './components/signals/RegionSignals';
import HomePage from './components/home/HomePage';
import LoginPage from './components/auth/LoginPage';
import ThemeToggle from './components/ThemeToggle';

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="px-4 py-3 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Traffic Management System
            </h1>
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Admin routes */}
        <Route path="/dashboard" element={
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        } />
        <Route path="/accidents" element={
          <AdminLayout>
            <AccidentList />
          </AdminLayout>
        } />
        <Route path="/traffic" element={
          <AdminLayout>
            <VehicleTracker />
          </AdminLayout>
        } />
        <Route path="/emergency" element={
          <AdminLayout>
            <EmergencyVehicles />
          </AdminLayout>
        } />
        <Route path="/analytics" element={
          <AdminLayout>
            <AnalyticsDashboard />
          </AdminLayout>
        } />
        <Route path="/signals" element={
          <AdminLayout>
            <RegionSignals />
          </AdminLayout>
        } />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;