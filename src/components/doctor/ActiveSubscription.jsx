import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
  CreditCard, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  Loader2, 
  ChevronDown, 
  ChevronUp,
  Menu,
  X,
  Search,
  Bell,
  User,
  LayoutDashboard,
  LogOut,
  Settings,
  ChevronRight 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const ActiveSubscription = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [subscription, setSubscription] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, logout } = useAuth();

  // Fetch active subscription data on component mount
  useEffect(() => {
    const fetchActiveSubscription = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // API call to fetch the current subscription
        const response = await axios.get('/api/subscriptions/current');
        setSubscription(response.data);  // Set the fetched subscription data
      } catch (err) {
        console.error('Failed to fetch active subscription:', err);
        setError('Failed to load subscription data');
      } finally {
        setLoading(false);
      }
    };

    fetchActiveSubscription();
  }, []);

  const handleCancelSubscription = async () => {
    if (!window.confirm('Are you sure you want to cancel your subscription?')) return;
    
    try {
      setLoading(true);
      const response = await axios.put('/api/subscriptions/cancel');
      setSubscription(null);  // Remove subscription data after successful cancellation
      toast.success(response.data.message);  // Show success message
    } catch (err) {
      console.error('Failed to cancel subscription:', err);
      toast.error('Failed to cancel subscription');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
        <span className="ml-2">Loading subscription...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg border border-red-200 p-4">
        <div className="flex items-center text-red-500">
          <AlertTriangle className="h-5 w-5 mr-2" />
          <span>{error}</span>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">No active subscription</h3>
        <p className="mt-1 text-gray-500">You don't have an active subscription plan.</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={() => window.location.href = '/subscriptions'}
        >
          View Subscription Plans
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed lg:static z-50 w-64 bg-gray-900 text-white border-r border-gray-800 h-screen transition-all duration-300 ease-in-out transform ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Doctor Portal</h1>
              <p className="text-xs text-gray-400">Professional Dashboard</p>
            </div>
          </div>
          <button 
            className="lg:hidden text-gray-400 hover:text-white"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="p-4 h-[calc(100vh-120px)] overflow-y-auto">
          <ul className="space-y-1">
            <li>
              <a
                href="/dashboard"
                className="flex items-center gap-3 p-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="/patients"
                className="flex items-center gap-3 p-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
              >
                <User className="h-5 w-5" />
                <span>Patients</span>
              </a>
            </li>
            <li>
              <a
                href="/subscription"
                className="flex items-center gap-3 p-3 rounded-md bg-gray-800 text-white"
              >
                <CreditCard className="h-5 w-5" />
                <span>Subscription</span>
              </a>
            </li>
            <li>
              <a
                href="/dashboard/settings"
                className="flex items-center gap-3 p-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </a>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <a
            href="/logout"
            className="flex items-center gap-3 p-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Log Out</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 text-gray-500 hover:text-gray-700"
              onClick={() => setMobileSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-semibold hidden sm:block">Subscription Management</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 w-48 lg:w-64"
              />
            </div>

            <button className="p-2 text-gray-500 hover:text-gray-700 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="h-4 w-4 text-blue-600" />
              </div>
              <span className="hidden md:inline font-medium"> {user?.name || 'User'}</span>
              <ChevronDown className="hidden md:block h-4 w-4 text-gray-500" />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-6xl mx-auto">
            {/* Subscription Overview Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{subscription?.plan?.name || 'Unknown Plan'}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      {subscription?.status === 'active' ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span className="text-green-600 text-sm">Active subscription</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          <span className="text-yellow-600 text-sm">Subscription expired</span>
                        </>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      {subscription?.plan?.description || 'No description available'}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Renewal date</p>
                    <p className="font-medium">
                      {subscription?.endDate ? new Date(subscription.endDate).toLocaleDateString() : 'Not available'}
                    </p>
                  </div>
                  <button
                    onClick={() => window.location.href = '/subscriptions'}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 whitespace-nowrap"
                  >
                    <Zap className="h-4 w-4" />
                    <span>Upgrade Plan</span>
                  </button>
                  <button
                    onClick={handleCancelSubscription}
                    className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="animate-spin h-4 w-4" />
                    ) : (
                      'Cancel Subscription'
                    )}
                  </button>
                </div>
              </div>
            </div>

      
          </div>
        </main>
      </div>
    </div>
  );
};

export default ActiveSubscription;
