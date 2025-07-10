import React from 'react';
import SettingsForm from '../../components/SettingsForm';
import { useAuth } from '../../contexts/AuthContext';

const DoctorSettings  = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
     

      {/* Settings Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto">
          {/* Account Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Account Settings</h3>
              <p className="text-sm text-gray-500 mt-1">
                Manage your account settings and preferences
              </p>
            </div>
            <SettingsForm />
          </div>

          {/* Danger Zone */}
          <div className="mt-6 bg-white rounded-xl shadow-sm border border-red-200 overflow-hidden">
            <div className="p-4 border-b border-red-200 bg-red-50">
              <h3 className="text-lg font-semibold text-red-700">
                Danger Zone
              </h3>
            </div>
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h4 className="font-medium">Delete Account</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Permanently remove your account and all associated data
                  </p>
                </div>
                <button className="mt-4 md:mt-0 px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50 transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorSettings ;
