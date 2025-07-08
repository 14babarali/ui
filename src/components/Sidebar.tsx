import React from 'react';
import { 
  LayoutDashboard,
  Stethoscope,
  CreditCard, 
  Pill, 
  Users, 
  Settings,
  User2
} from 'lucide-react';

const Sidebar = ({ selectedTab, setSelectedTab }) => {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4 border-r border-gray-700 h-screen fixed">
      <div className="mb-8 p-2">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <LayoutDashboard className="h-6 w-6 text-blue-400" />
          <span>Admin Panel</span>
        </h1>
      </div>
      <nav>
        <ul className="space-y-1">
          <li>
            <button
              className={`w-full flex items-center gap-3 p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 transition-colors ${
                selectedTab === 'dashboard' ? 'bg-gray-700 text-white' : ''
              }`}
              onClick={() => setSelectedTab('dashboard')}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </button>
          </li>
          <li>
            <button
              className={`w-full flex items-center gap-3 p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 transition-colors ${
                selectedTab === 'doctors' ? 'bg-gray-700 text-white' : ''
              }`}
              onClick={() => setSelectedTab('doctors')}
            >
              <Stethoscope className="h-4 w-4" />
              Doctors
            </button>
          </li>
          <li>
            <button
              className={`w-full flex items-center gap-3 p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 transition-colors ${
                selectedTab === 'subscriptions' ? 'bg-gray-700 text-white' : ''
              }`}
              onClick={() => setSelectedTab('subscriptions')}
            >
              <CreditCard className="h-4 w-4" />
              Subscriptions
            </button>
          </li>
          <li>
            <button
              className={`w-full flex items-center gap-3 p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 transition-colors ${
                selectedTab === 'prescriptions' ? 'bg-gray-700 text-white' : ''
              }`}
              onClick={() => setSelectedTab('prescriptions')}
            >
              <Pill className="h-4 w-4" />
              Prescriptions
            </button>
          </li>
          <li>
            <button
              className={`w-full flex items-center gap-3 p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 transition-colors ${
                selectedTab === 'patients' ? 'bg-gray-700 text-white' : ''
              }`}
              onClick={() => setSelectedTab('patients')}
            >
              <Users className="h-4 w-4" />
              Patients
            </button>
          </li>
          <li>
            <button
              className={`w-full flex items-center gap-3 p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 transition-colors ${
                selectedTab === 'settings' ? 'bg-gray-700 text-white' : ''
              }`}
              onClick={() => setSelectedTab('settings')}
            >
              <Settings className="h-4 w-4" />
              Settings
            </button>
          </li>
        </ul>
      </nav>
      
      {/* User profile at bottom */}
      <div className="absolute bottom-4 left-0 right-0 px-4">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors">
          <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center">
            <User2 className="h-4 w-4 text-gray-300" />
          </div>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-gray-400">admin@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;