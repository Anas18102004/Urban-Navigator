import React from 'react';
import {
  LayoutDashboard,
  AlertTriangle,
  Car,
  FileText,
  Ambulance,
  BarChart2,
  Settings,
  StopCircle
} from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Accidents', href: '/accidents', icon: AlertTriangle },
  { name: 'Traffic Data', href: '/traffic', icon: Car },
  { name: 'Signal Control', href: '/signals', icon: StopCircle },
  { name: 'E-Challan', href: '/challan', icon: FileText },
  { name: 'Emergency', href: '/emergency', icon: Ambulance },
  { name: 'Analytics', href: '/analytics', icon: BarChart2 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="h-screen w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Traffic Admin</h1>
      </div>
      <nav className="flex-1 space-y-1 px-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`${
                isActive
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              } group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors`}
            >
              <Icon
                className={`${
                  isActive ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-300'
                } mr-3 h-5 w-5`}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}