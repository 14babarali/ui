import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Edit, 
  Trash2, 
  Plus,
  Loader2,
  AlertCircle,
  CreditCard,
  Clock,
  Calendar,
  ArrowUpCircle,
  CloudCog
} from 'lucide-react';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import api from "../../utils/api";

interface SubscriptionPlan {
  _id: string;
  name: string;
  description: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  features: string[];
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface UserSubscription {
  _id: string;
  user: string;
  plan: SubscriptionPlan;
  startDate: string;
  endDate: string;
  paymentMethod: string;
  autoRenew: boolean;
  status: 'active' | 'canceled' | 'expired';
}

type SubscriptionPlanForm = Omit<SubscriptionPlan, '_id' | 'createdAt' | 'updatedAt'>;

const defaultPlan: SubscriptionPlanForm = {
  name: '',
  description: '',
  price: 0,
  billingCycle: 'monthly',
  features: [''],
  isActive: true
};

const SubscriptionsTable = () => {
  const { user } = useAuth();
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [userSubscriptions, setUserSubscriptions] = useState<UserSubscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [formData, setFormData] = useState<SubscriptionPlanForm>(defaultPlan);
  const [subscribeData, setSubscribeData] = useState({
    planId: '',
    paymentMethod: 'credit_card',
    autoRenew: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'plans' | 'my-subscription'>('plans');

  useEffect(() => {
    fetchData();
  }, []);
const fetchData = async () => {
  console.log("Fetching data...");
  try {
    setLoading(true);
    setError(null);
    console.log("User Role:", user?.role);

    if (user?.role === 'Admin' || user?.role === 'admin') {
      console.log("Role is Admin. Fetching all subscription plans...");
      const plansResponse = await api.get<SubscriptionPlan[]>('/subscriptions/plans');
      console.log("Plans Response:", plansResponse);
      const plans = Array.isArray(plansResponse.data) ? plansResponse.data : [];
      console.log("Parsed Plans:", plans);
      setPlans(plans);
    }

    if (user?.role === 'Doctor') {
      console.log("Role is Doctor. Fetching user subscriptions...");
      const subscriptionsResponse = await api.get<UserSubscription[]>('/subscriptions');
      console.log("User Subscriptions Response:", subscriptionsResponse);
      const userSubscriptions = Array.isArray(subscriptionsResponse.data) ? subscriptionsResponse.data : [];
      console.log("Parsed User Subscriptions:", userSubscriptions);
      setUserSubscriptions(userSubscriptions);

      console.log("Fetching available subscription plans for Doctor...");
      const availablePlansResponse = await api.get<SubscriptionPlan[]>('/subscriptions/plans/available');
      console.log("Available Plans Response:", availablePlansResponse);
      const availablePlans = Array.isArray(availablePlansResponse.data) ? availablePlansResponse.data : [];
      console.log("Parsed Available Plans:", availablePlans);
      setPlans(availablePlans);
    }

  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    console.error("Error during fetchData:", error);
    setError(error.response?.data?.message || 'Failed to load data');
  } finally {
    console.log("Finished fetching. Setting loading to false.");
    setLoading(false);
  }
};


  const handleSubmitPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      
      if (editingId) {
        const response = await api.put<SubscriptionPlan>(`/subscriptions/plans/${editingId}`, formData);
        setPlans(plans.map(plan => plan._id === editingId ? response.data : plan));
        toast.success('Plan updated successfully!');
      } else {
        const response = await api.post<SubscriptionPlan>('/subscriptions/plans', formData);
        setPlans([...plans, response.data]);
        toast.success('Plan created successfully!');
      }
      
      setShowCreateModal(false);
      resetForm();
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      console.error('Error saving plan:', error);
      toast.error(error.response?.data?.message || 'Failed to save plan');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      
      const response = await api.post<UserSubscription>('/subscriptions', subscribeData);
      setUserSubscriptions([...userSubscriptions, response.data]);
      toast.success('Subscribed successfully!');
      setShowSubscribeModal(false);
      fetchData(); // Refresh data
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      console.error('Error subscribing:', error);
      toast.error(error.response?.data?.message || 'Failed to subscribe');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelSubscription = async (subscriptionId: string) => {
    if (!window.confirm('Are you sure you want to cancel this subscription?')) return;
    
    try {
      setLoading(true);
      await api.put(`/subscriptions/cancel`, { subscriptionId });
      toast.success('Subscription canceled successfully');
      fetchData(); // Refresh data
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      console.error('Error canceling subscription:', error);
      toast.error(error.response?.data?.message || 'Failed to cancel subscription');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(defaultPlan);
    setEditingId(null);
  };

  const handleEditPlan = (plan: SubscriptionPlan) => {
    setFormData({
      name: plan.name,
      description: plan.description,
      price: plan.price,
      billingCycle: plan.billingCycle,
      features: [...plan.features],
      isActive: plan.isActive
    });
    setEditingId(plan._id);
    setShowCreateModal(true);
  };

  const handleDeletePlan = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this plan?')) return;
    
    try {
      setLoading(true);
      await api.delete(`/subscriptions/plans/${id}`);
      setPlans(plans.filter(plan => plan._id !== id));
      toast.success('Plan deleted successfully');
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      console.error('Error deleting plan:', error);
      toast.error(error.response?.data?.message || 'Failed to delete plan');
    } finally {
      setLoading(false);
    }
  };

  const handleAddFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, '']
    });
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({
      ...formData,
      features: newFeatures
    });
  };

  const handleRemoveFeature = (index: number) => {
    if (formData.features.length <= 1) return;
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      features: newFeatures
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
        <span className="ml-2 text-gray-600">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg border border-red-200 p-4 max-w-2xl mx-auto">
        <div className="flex items-center text-red-500">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>{error}</span>
        </div>
        <button 
          onClick={fetchData}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {user?.role === 'Admin' ? 'Subscription Plans' : 'My Subscription'}
        </h1>
        
        {user?.role === 'Admin' && (
          <button
            onClick={() => {
              resetForm();
              setShowCreateModal(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            <span>New Plan</span>
          </button>
        )}
      </div>

      {user?.role === 'Doctor' && (
        <div className="flex border-b border-gray-200">
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'plans' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('plans')}
          >
            Available Plans
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'my-subscription' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('my-subscription')}
          >
            My Subscription
          </button>
        </div>
      )}

      {user?.role === 'Doctor' && activeTab === 'my-subscription' ? (
        <div className="space-y-4">
          {userSubscriptions.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
              <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No active subscription</h3>
              <p className="mt-1 text-sm text-gray-500">Subscribe to a plan to access all features</p>
              <button
                onClick={() => setActiveTab('plans')}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                View Plans
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userSubscriptions.map((subscription) => (
                <div key={subscription._id} className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium">{subscription.plan.name}</h3>
                      <p className="text-gray-500">{subscription.plan.description}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {subscription.status === 'active' ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span className="text-green-600">Active</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4 text-red-500" />
                          <span className="text-red-600">Canceled</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>Start: {formatDate(subscription.startDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>End: {formatDate(subscription.endDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-gray-400" />
                      <span className="capitalize">{subscription.paymentMethod.replace('_', ' ')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowUpCircle className="h-4 w-4 text-gray-400" />
                      <span>Auto-renew: {subscription.autoRenew ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
                    {subscription.status === 'active' && (
                      <button
                        onClick={() => handleCancelSubscription(subscription._id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Cancel Subscription
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          {plans.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No subscription plans found.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 font-medium text-gray-700 text-left">Plan Name</th>
                  <th className="p-3 font-medium text-gray-700 text-left">Description</th>
                  <th className="p-3 font-medium text-gray-700 text-left">Price</th>
                  <th className="p-3 font-medium text-gray-700 text-left">Billing</th>
                  <th className="p-3 font-medium text-gray-700 text-left">Status</th>
                  <th className="p-3 font-medium text-gray-700 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {plans.map((plan) => (
                  <tr key={plan._id} className="hover:bg-gray-50">
                    <td className="p-3 font-medium">{plan.name}</td>
                    <td className="p-3 text-gray-500">{plan.description || '-'}</td>
                    <td className="p-3">${plan.price.toFixed(2)}</td>
                    <td className="p-3 text-gray-500 capitalize">{plan.billingCycle}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        {plan.isActive ? (
                          <>
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            <span className="text-green-600">Active</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-4 w-4 text-red-500" />
                            <span className="text-red-600">Inactive</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        {user?.role === 'Admin' ? (
                          <>
                            <button
                              onClick={() => handleEditPlan(plan)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                              title="Edit Plan"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeletePlan(plan._id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                              title="Delete Plan"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => {
                              setSubscribeData({
                                ...subscribeData,
                                planId: plan._id
                              });
                              setShowSubscribeModal(true);
                            }}
                            className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                            disabled={!plan.isActive}
                          >
                            Subscribe
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Create/Edit Plan Modal (Admin Only) */}
      {showCreateModal && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
              <h3 className="text-xl font-semibold">
                {editingId ? 'Edit Plan' : 'Create New Plan'}
              </h3>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  resetForm();
                }}
                className="p-1 rounded-full hover:bg-gray-100"
                disabled={isSubmitting}
              >
                <XCircle className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <form onSubmit={handleSubmitPlan} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Plan Name*</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    minLength={3}
                    maxLength={50}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price*</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2">$</span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      className="w-full pl-8 px-3 py-2 border border-gray-300 rounded-md"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Billing Cycle*</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={formData.billingCycle}
                    onChange={(e) => setFormData({
                      ...formData, 
                      billingCycle: e.target.value as 'monthly' | 'yearly'
                    })}
                    required
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status*</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={formData.isActive.toString()}
                    onChange={(e) => setFormData({...formData, isActive: e.target.value === 'true'})}
                    required
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                    minLength={10}
                    maxLength={500}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Features*</label>
                <div className="space-y-2">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        required
                        minLength={3}
                        maxLength={100}
                      />
                      {formData.features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                          disabled={isSubmitting}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="mt-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200"
                    disabled={isSubmitting || formData.features.length >= 10}
                  >
                    + Add Feature (Max 10)
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 sticky bottom-0 bg-white py-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 flex items-center gap-2 disabled:opacity-70"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin h-4 w-4" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4" />
                  )}
                  <span>{editingId ? 'Update Plan' : 'Create Plan'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Subscribe Modal (Doctor Only) */}
      {showSubscribeModal && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-semibold">Subscribe to Plan</h3>
              <button
                onClick={() => setShowSubscribeModal(false)}
                className="p-1 rounded-full hover:bg-gray-100"
                disabled={isSubmitting}
              >
                <XCircle className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <form onSubmit={handleSubscribe} className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method*</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={subscribeData.paymentMethod}
                  onChange={(e) => setSubscribeData({
                    ...subscribeData,
                    paymentMethod: e.target.value
                  })}
                  required
                >
                  <option value="credit_card">Credit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="bank_transfer">Bank Transfer</option>
                </select>
              </div>
              
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  id="autoRenew"
                  className="h-4 w-4 text-blue-600 rounded"
                  checked={subscribeData.autoRenew}
                  onChange={(e) => setSubscribeData({
                    ...subscribeData,
                    autoRenew: e.target.checked
                  })}
                />
                <label htmlFor="autoRenew" className="ml-2 text-sm text-gray-700">
                  Auto-renew subscription
                </label>
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowSubscribeModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 flex items-center gap-2 disabled:opacity-70"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin h-4 w-4" />
                  ) : (
                    <CreditCard className="h-4 w-4" />
                  )}
                  <span>Subscribe</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionsTable;