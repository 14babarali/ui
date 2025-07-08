import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { toast } from 'react-toastify';

const SubscriptionPaymentForm = ({ onSuccess }) => {
  const [planType, setPlanType] = useState('Basic');
  const [isProcessing, setIsProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      // Create payment intent
      const { data: { clientSecret } } = await axios.post('/api/payments/create-payment-intent', {
        planType,
      });

      // Confirm payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      if (paymentIntent.status === 'succeeded') {
        // Confirm payment on our server
        await axios.post('/api/payments/confirm', {
          paymentIntentId: paymentIntent.id,
          planType,
        });

        toast.success('Payment successful! Subscription activated.');
        onSuccess();
      }
    } catch (err) {
      toast.error(err.message || 'Payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Subscribe to a Plan</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Select Plan</label>
          <select
            value={planType}
            onChange={(e) => setPlanType(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          >
            <option value="Basic">Basic ($29.99/month)</option>
            <option value="Pro">Pro ($59.99/month)</option>
            <option value="Enterprise">Enterprise ($99.99/month)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Card Details</label>
          <div className="mt-1 p-3 border rounded-md">
            <CardElement options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }} />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={!stripe || isProcessing}
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Processing...' : `Pay $${planType === 'Basic' ? '29.99' : planType === 'Pro' ? '59.99' : '99.99'}`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubscriptionPaymentForm;