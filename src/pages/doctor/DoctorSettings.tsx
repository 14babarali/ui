import React, { useEffect, useState } from 'react';
import SettingsForm from '../../components/SettingsForm';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../utils/api'; // Ensure this is the correct path to your API utility

const DoctorSettings = () => {
  const { user, logout } = useAuth();
  const [isProfileLoaded, setIsProfileLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching doctor profile data...');
        const profileResponse = await api.get('/doctor/profile'); // Make sure the URL is correct

        console.log('Profile fetched successfully:', profileResponse.data);
        
        // Set the state to true once the profile data is fetched
        if (profileResponse.data) {
          setIsProfileLoaded(true);
        } else {
          setIsProfileLoaded(false);
          setError('No profile data found');
        }
      } catch (error) {
        console.error('Error fetching doctor profile:', error);
        setError('Failed to fetch profile data');
        setIsProfileLoaded(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      
      {/* Settings Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto">
          {/* Account Settings */}
          <div className="bg-red rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Account Settings</h3>
              <p className="text-sm text-gray-500 mt-1">
                Manage your account settings and preferences
              </p>
            </div>
            {/* Show the SettingsForm if profile is loaded */}
            {isProfileLoaded ? (
              <SettingsForm />
            ) : error ? (
              <div className="text-center text-red-500">{error}</div>
            ) : (
              <div className="text-center text-gray-500">Loading your profile...</div>
            )}
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

export default DoctorSettings;
