import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, 
  BarChart2, 
  Map, 
  Clock,
  ArrowRight,
  Activity,
  Settings,
  ChevronRight
} from 'lucide-react';
import ThemeToggle from '../ThemeToggle';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Traffic Signals',
    description: 'Dynamic and real-time signal adjustments for smoother traffic flow using advanced AI algorithms.'
  },
  {
    icon: Map,
    title: 'Region-Based Admin Control',
    description: 'Easily monitor and control signals in your designated regions with intuitive management tools.'
  },
  {
    icon: BarChart2,
    title: 'Comprehensive Traffic Data Insights',
    description: 'Detailed analytics and traffic flow reports for better decision-making and planning.'
  },
  {
    icon: Clock,
    title: 'Advanced Signal Modes',
    description: 'Dynamic, AI, and Night Modes for optimal traffic management in all conditions.'
  }
];

const workflow = [
  {
    icon: Activity,
    title: 'Real-Time Analysis',
    description: 'AI analyzes vehicle counts in real-time across all lanes'
  },
  {
    icon: Settings,
    title: 'Dynamic Adjustment',
    description: 'Signals adjust automatically to minimize congestion'
  },
  {
    icon: Brain,
    title: 'Smart Management',
    description: 'Advanced admin tools for monitoring and customization'
  }
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-primary-500" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                TrafficAI
              </span>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              <span className="block">Welcome to Intelligent</span>
              <span className="block text-primary-500">Traffic Management System</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              A smarter way to manage traffic with AI-powered solutions. Experience the future of traffic control with real-time analytics and intelligent signal management.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <button
                  onClick={() => navigate('/login')}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 md:py-4 md:text-lg md:px-10 transition-colors"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Powerful Features for Smart Traffic Management
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
              Our platform offers cutting-edge tools and features to revolutionize traffic management
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="relative group bg-white dark:bg-gray-700 p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div>
                    <span className="rounded-lg inline-flex p-3 bg-primary-50 dark:bg-primary-900 text-primary-500 ring-4 ring-white dark:ring-gray-700">
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="mt-8">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                  <span
                    className="absolute top-6 right-6 text-gray-300 dark:text-gray-500 group-hover:text-gray-400 dark:group-hover:text-gray-400 transition-colors"
                    aria-hidden="true"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
              Simple yet powerful workflow for efficient traffic management
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {workflow.map((step, index) => (
                <div
                  key={index}
                  className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-md mb-4">
                    <step.icon className="h-6 w-6 text-primary-500" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    {step.description}
                  </p>
                  {index < workflow.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                      <ArrowRight className="h-6 w-6 text-gray-300 dark:text-gray-600" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-300 uppercase tracking-wider">
                Company
              </h3>
              <div className="mt-4 space-y-4">
                <a href="#" className="text-base text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white block">
                  About Us
                </a>
                <a href="#" className="text-base text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white block">
                  Contact
                </a>
                <a href="#" className="text-base text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white block">
                  Careers
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-300 uppercase tracking-wider">
                Legal
              </h3>
              <div className="mt-4 space-y-4">
                <a href="#" className="text-base text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white block">
                  Privacy Policy
                </a>
                <a href="#" className="text-base text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white block">
                  Terms of Service
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-300 uppercase tracking-wider">
                Support
              </h3>
              <div className="mt-4 space-y-4">
                <a href="#" className="text-base text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white block">
                  Help Center
                </a>
                <a href="#" className="text-base text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white block">
                  Documentation
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
              &copy; 2024 TrafficAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}