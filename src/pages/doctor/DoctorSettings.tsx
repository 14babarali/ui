import React, { useEffect, useState } from 'react';
import SettingsForm from '../../components/SettingsForm';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../utils/api';
import { Loader2 } from 'lucide-react';

const DoctorSettings = () => {
  const { user } = useAuth();
  const [isProfileLoaded, setIsProfileLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [doctorProfile, setDoctorProfile] = useState<any>(null);
useEffect(() => {
  
  
  const fetchDoctorProfile = async () => {
    try {
      // Log user id before starting the request
      console.log('User ID:', user?._id);

      if (!user?._id) {
        console.log('No user ID found, skipping profile fetch.');
        return;
      }

      console.log('Fetching doctor profile...');
      
      // Sending the API request
      const response = await api.get(`/doctor/profile`);
      console.log('API Response:', response);

      if (response.data) {
        console.log('Profile data received:', response.data);
        setDoctorProfile(response.data);
        setIsProfileLoaded(true);
      } else {
        console.log('No profile data found.');
        setError('No profile data found');
        setIsProfileLoaded(false);
      }
    } catch (err) {
      // Log the error details
      console.error('Error fetching doctor profile:', err);
      setError(err.response?.data?.message || 'Failed to load profile data');
      setIsProfileLoaded(false);
    }
  };

  fetchDoctorProfile();
}, [user]);

  if (!isProfileLoaded && !error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md text-center">
          <h3 className="text-lg font-medium text-red-500 mb-2">Error Loading Profile</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
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
            
            {doctorProfile && <SettingsForm doctorProfile={doctorProfile} />}
          </div>

          {/* Danger Zone */}
          <div className="mt-6 bg-white rounded-xl shadow-sm border border-red-200 overflow-hidden">
            <div className="p-4 border-b border-red-200 bg-red-50">
              <h3 className="text-lg font-semibold text-red-700">Danger Zone</h3>
            </div>
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h4 className="font-medium">Delete Account</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Permanently remove your account and all associated data
                  </p>
                </div>
                <button 
                  className="mt-4 md:mt-0 px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50 transition-colors"
                >
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