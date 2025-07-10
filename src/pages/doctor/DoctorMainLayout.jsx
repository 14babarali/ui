import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard,
  Stethoscope,
  Calendar,
  FileText,
  Users,
  CreditCard,
  Bell,
  Search,
  Settings as SettingsIcon,
  User,
  Plus,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import PatientsList from './patients.jsx';
import ActiveSubscription from './ActiveSubscription.jsx';
import DoctorSettings from './DoctorSettings.js';
import DoctorDashboard from './Dashboard.jsx';

const DoctorMainLayout = () => {
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();

  // Effect to ensure we're on settings tab if not verified
  useEffect(() => {
    if (user?.role === 'Doctor' && !user?.isVerified) {
      setSelectedTab('settings');
    }
  }, [user]);

  const renderContent = () => {
    // If doctor is not verified, only show settings
    if (user?.role === 'Doctor' && !user?.isVerified) {
      return <DoctorSettings />;
    }
    
    // Otherwise show the selected tab
    switch (selectedTab) {
      case 'dashboard': return <DoctorDashboard />;
      case 'patients': return <PatientsList />;
      case 'subscription': return <ActiveSubscription />;
      case 'settings': return <DoctorSettings />;
      default: return <DoctorDashboard />;
    }
  };

  // Navigation items configuration
  const navItems = [
    { id: 'dashboard', icon: <LayoutDashboard className="h-4 w-4" />, label: 'Dashboard', show: user?.isVerified },
    { id: 'patients', icon: <Users className="h-4 w-4" />, label: 'Patients', show: user?.isVerified },
    { id: 'subscription', icon: <CreditCard className="h-4 w-4" />, label: 'Subscription', show: user?.isVerified },
    { id: 'settings', icon: <SettingsIcon className="h-4 w-4" />, label: 'Settings', show: true } // Always show settings
  ].filter(item => item.show);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed lg:static z-50 w-64 bg-gray-900 text-white border-r border-gray-800 h-screen transition-all duration-300 ease-in-out transform ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="h-6 w-6 text-blue-400" />
            <h1 className="text-xl font-bold">Doctor Portal</h1>
          </div>
          <button 
            className="lg:hidden text-gray-400 hover:text-white"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setSelectedTab(item.id);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-md transition-colors ${
                    selectedTab === item.id 
                      ? 'bg-gray-800 text-white' 
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={() => {
              logout();
              window.location.href = '/login';
            }}
            className="w-full flex items-center gap-3 p-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <SettingsIcon className="h-4 w-4" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 text-gray-500 hover:text-gray-700"
              onClick={() => setMobileSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-semibold hidden sm:inline-block capitalize">
              {selectedTab === 'dashboard' ? 'Doctor Dashboard' : selectedTab}
            </h1>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {user?.isVerified && (
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={`Search ${selectedTab === 'patients' ? 'patients' : ''}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 w-40 md:w-64"
                />
              </div>
            )}

            <button className="p-2 text-gray-500 hover:text-gray-700 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            <div className="hidden md:flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="h-4 w-4 text-blue-600" />
              </div>
              <span className="font-medium">Dr. {user?.name || 'User'}</span>
              {!user?.isVerified && (
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                  Verification Pending
                </span>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Action Bar */}
            {user?.isVerified && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="sm:hidden">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder={`Search ${selectedTab === 'patients' ? 'patients' : ''}...`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 w-full"
                    />
                  </div>
                </div>
                {selectedTab === 'patients' && (
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2 text-sm sm:text-base w-full sm:w-auto justify-center">
                    <Plus className="h-4 w-4" />
                    <span>New Patient</span>
                  </button>
                )}
              </div>
            )}

            {/* Content Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorMainLayout;