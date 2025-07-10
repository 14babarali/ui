import React from 'react';
import { 
  Bell,
  Search,
  User,
  ChevronDown,
  Menu,
  HelpCircle
} from 'lucide-react';

const DocHeader = ({ title = "Dashboard" }) => {
  // Mock notification count
  const notificationCount = 3;
  
  return (
    <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-10">
      {/* Left Section - Title and Mobile Menu */}
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 text-gray-500 hover:text-gray-700">
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-semibold text-gray-800 hidden md:block">
          {title}
        </h1>
        <div className="md:hidden flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="h-4 w-4 text-blue-600" />
          </div>
          <span className="font-medium">Dr. Smith</span>
        </div>
      </div>

      {/* Right Section - Search and User Controls */}
      <div className="flex items-center gap-4">
        {/* Search Bar - Hidden on mobile */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search patients, reports..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 w-64"
          />
        </div>

        {/* Help Button */}
        <button className="p-2 text-gray-500 hover:text-gray-700 hidden md:block">
          <HelpCircle className="h-5 w-5" />
        </button>

        {/* Notifications */}
        <button className="p-2 text-gray-500 hover:text-gray-700 relative">
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
          )}
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="h-4 w-4 text-blue-600" />
          </div>
          <div className="hidden md:flex flex-col">
            <span className="text-sm font-medium">Dr. Smith</span>
            <span className="text-xs text-gray-500">Cardiologist</span>
          </div>
          <button className="text-gray-500 hover:text-gray-700 hidden md:block">
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default DocHeader;