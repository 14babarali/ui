import React, { useState } from 'react';
import { 
  CreditCard, 
  Zap, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  ChevronDown,
  Menu,
  X,
  Search,
  Bell,
  User,
  ChevronLeft,
  ChevronRight,Settings ,LogOut ,ChevronUp 
} from 'lucide-react';
import { Stethoscope } from 'lucide-react';
import { LayoutDashboard } from 'lucide-react';

const ActiveSubscription = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Mock subscription data
  const subscriptionData = {
    plan: "Professional Plus",
    status: "active",
    renewalDate: "2025-12-01",
    features: [
      "Unlimited patient records",
      "Priority support",
      "Advanced analytics",
      "Custom branding"
    ],
    billingHistory: [
      { id: 1, plan: "Professional Plus", date: "Nov 1, 2025", amount: "$99.00" },
      { id: 2, plan: "Professional Plus", date: "Oct 1, 2025", amount: "$99.00" },
      { id: 3, plan: "Basic", date: "Sep 1, 2025", amount: "$49.00" }
    ]
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0  bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed lg:static z-50 w-64 bg-gray-900 text-white border-r border-gray-800 h-screen transition-all duration-300 ease-in-out transform ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
              <Stethoscope className="h-5 w-5" />
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
              <span className="hidden md:inline font-medium">Dr. Smith</span>
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
                    <h2 className="text-xl font-semibold">{subscriptionData.plan}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      {subscriptionData.status === 'active' ? (
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
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Renewal date</p>
                    <p className="font-medium">{subscriptionData.renewalDate}</p>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 whitespace-nowrap">
                    <Zap className="h-4 w-4" />
                    <span>Upgrade Plan</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Plan Features and Billing History */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Plan Features */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-medium mb-4">Plan Features</h3>
                <ul className="space-y-3">
                  {subscriptionData.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Billing History */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Billing History</h3>
                  <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    View all <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  {subscriptionData.billingHistory.slice(0, 2).map((bill) => (
                    <div key={bill.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-md">
                          <CreditCard className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{bill.plan}</p>
                          <p className="text-sm text-gray-500">{bill.date}</p>
                        </div>
                      </div>
                      <p className="font-medium">{bill.amount}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Usage Statistics */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <h3 className="text-lg font-medium">Usage Statistics</h3>
                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm">
                    This Month
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                    Last Month
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <p className="text-sm text-gray-500">Patients Seen</p>
                  <p className="text-2xl font-bold mt-1">142</p>
                  <p className="text-xs text-green-600 mt-1 flex items-center">
                    <ChevronUp className="h-3 w-3" /> 12% from last month
                  </p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <p className="text-sm text-gray-500">Prescriptions</p>
                  <p className="text-2xl font-bold mt-1">87</p>
                  <p className="text-xs text-green-600 mt-1 flex items-center">
                    <ChevronUp className="h-3 w-3" /> 8% from last month
                  </p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <p className="text-sm text-gray-500">Storage Used</p>
                  <p className="text-2xl font-bold mt-1">35%</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '35%'}}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subscription Plans */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium mb-6">Available Plans</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {name: "Basic", price: "$49/mo", features: ["100 patient records", "Email support", "Basic analytics"]},
                  {name: "Professional", price: "$99/mo", current: true, features: ["Unlimited records", "Priority support", "Advanced analytics"]},
                  {name: "Enterprise", price: "$199/mo", features: ["Unlimited records", "24/7 support", "Custom branding", "API access"]}
                ].map((plan, index) => (
                  <div 
                    key={index} 
                    className={`border rounded-lg p-6 ${plan.current ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-bold text-lg">{plan.name}</h4>
                      <span className="font-medium">{plan.price}</span>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button 
                      className={`w-full py-2 rounded-md font-medium ${
                        plan.current 
                          ? 'bg-blue-600 text-white hover:bg-blue-700' 
                          : 'border border-blue-600 text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      {plan.current ? 'Current Plan' : 'Upgrade'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ActiveSubscription;