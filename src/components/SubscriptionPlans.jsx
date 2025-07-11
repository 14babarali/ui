import React, { useState, useEffect } from 'react';
import { CheckCircle2, Zap, BadgeCheck, Shield } from 'lucide-react';
import { getSubscriptionPlans, createSubscription } from '../services/paymentService';
import { useAuth } from '../context/AuthContext';

const SubscriptionPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState('monthly');
  const { user } = useAuth();

  const fetchPlans = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSubscriptionPlans();
      setPlans(data);
    } catch (err) {
      setError('Failed to load subscription plans. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleSubscribe = async () => {
    if (!selectedPlan) return;
    
    try {
      const subscriptionData = {
        planId: selectedPlan,
        billingCycle,
        paymentMethod: 'credit_card' // In a real app, this would come from a payment form
      };
      
      const result = await createSubscription(subscriptionData);
      alert(`Subscription created successfully! Amount paid: $${result.amountPaid}`);
      // You might want to redirect or refresh user data here
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const getPlanIcon = (planName) => {
    switch (planName) {
      case 'Basic': return <Zap className="h-6 w-6" />;
      case 'Professional': return <BadgeCheck className="h-6 w-6" />;
      case 'Enterprise': return <Shield className="h-6 w-6" />;
      default: return <CheckCircle2 className="h-6 w-6" />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={fetchPlans}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Plan</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select the subscription plan that fits your needs. Upgrade, downgrade, or cancel anytime.
        </p>
        
        <div className="flex justify-center mt-6">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                billingCycle === 'monthly'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                billingCycle === 'yearly'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Yearly Billing (10% off)
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div 
            key={plan._id} 
            className={`rounded-xl border shadow-sm overflow-hidden transition-all ${
              selectedPlan === plan._id ? 'ring-2 ring-blue-500 border-blue-500' : 'border-gray-200'
            }`}
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                  {getPlanIcon(plan.name)}
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{plan.name}</h2>
              </div>
              
              <p className="text-gray-600 mb-6">{plan.description}</p>
              
              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  ${billingCycle === 'monthly' ? plan.price : (plan.price * 12 * 0.9).toFixed(2)}
                </span>
                <span className="text-gray-600">
                  /{billingCycle === 'monthly' ? 'month' : 'year'}
                </span>
                {billingCycle === 'yearly' && (
                  <span className="ml-2 text-sm text-green-600">Save 10%</span>
                )}
              </div>
              
              <button
                onClick={() => setSelectedPlan(plan._id)}
                className={`w-full py-2 px-4 rounded-md ${
                  selectedPlan === plan._id
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {selectedPlan === plan._id ? 'Selected' : 'Select Plan'}
              </button>
            </div>
            
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Features</h3>
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      
      {selectedPlan && (
        <div className="mt-12 text-center">
          <button
            onClick={handleSubscribe}
            className="px-6 py-3 bg-lue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
            disabled={!user}
          >
            {user ? 'Subscribe Now' : 'Please sign in to subscribe'}
          </button>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPlans;