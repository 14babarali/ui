import axios from 'axios';

// Get all subscription plans
export const getSubscriptionPlans = async () => {
  try {
    const response = await axios.get('/api/payments/plans');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get user's active subscription
export const getUserSubscription = async () => {
  try {
    const response = await axios.get('/api/payments/my-subscription');
    return response.data;
  } catch (error) {
    if (error.response.status === 404) {
      return null; // No subscription found
    }
    throw error.response.data;
  }
};

// Create a new subscription
export const createSubscription = async (subscriptionData) => {
  try {
    const response = await axios.post('/api/payments/subscribe', subscriptionData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get payment history
export const getPaymentHistory = async () => {
  try {
    const response = await axios.get('/api/payments/payment-history');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Cancel subscription
export const cancelSubscription = async (subscriptionId) => {
  try {
    const response = await axios.put(`/api/payments/cancel/${subscriptionId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};