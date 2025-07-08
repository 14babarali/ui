import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import DoctorVerificationForm from '../../components/DoctorVerificationForm';
import SubscriptionPaymentForm from '../../components/SubscriptionPaymentForm';
// import PatientTable from '../../components/Table/PatientTable';
// import PrescriptionTable from '../../components/Table/PrescriptionTable';

const DoctorDashboard = () => {
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const [verificationRes, subscriptionRes] = await Promise.all([
          axios.get('/api/doctors/verification-status'),
          axios.get('/api/subscriptions/current'),
        ]);

        setVerificationStatus(verificationRes.data.data);
        setSubscriptionStatus(subscriptionRes.data);
        setIsLoading(false);
      } catch (err) {
        toast.error('Failed to load dashboard data');
        setIsLoading(false);
      }
    };

    fetchStatus();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!verificationStatus?.verified) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Complete Your Profile</h1>
        <DoctorVerificationForm onSuccess={() => window.location.reload()} />
      </div>
    );
  }

  if (!subscriptionStatus?.isActive) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Subscribe to Continue</h1>
        <SubscriptionPaymentForm onSuccess={() => window.location.reload()} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Doctor Dashboard</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Patients</h2>
        {/* <PatientTable /> */}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Prescriptions</h2>
        {/* <PrescriptionTable /> */}
      </div>
    </div>
  );
};

export default DoctorDashboard;