import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import SubscriptionsTable from '../../components/Table/SubscriptionsTable';

import {
  CreditCard,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  ChevronUp,
  Search,
  Bell,
  User,
  LogOut,
  Settings
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const ActiveSubscription = () => {
  const [subscription, setSubscription] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchActiveSubscription = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('/api/subscriptions/current');
        setSubscription(response.data);
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
      setSubscription(null);
      toast.success(response.data.message);
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
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
  <SubscriptionsTable/>
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="max-w-6xl mx-auto">
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
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
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
  );
};

export default ActiveSubscription;
