import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Edit, 
  Trash2, 
  Plus,
  Loader2,
  AlertCircle
} from 'lucide-react';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import api from "../../utils/api"

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
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]); // Ensuring that 'plans' is an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState<SubscriptionPlanForm>(defaultPlan);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get<SubscriptionPlan[]>('/subscriptions/plans');
      setPlans(Array.isArray(response.data) ? response.data : []); // Ensure the response is an array
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      console.error('Error fetching plans:', error);
      setError(error.response?.data?.message || 'Failed to load subscription plans');
      setPlans([]); // Reset to an empty array in case of error
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      
      if (editingId) {
        // Update existing plan
        const response = await api.put<SubscriptionPlan>(`/subscriptions/plans/${editingId}`, formData);
        setPlans(plans.map(plan => plan._id === editingId ? response.data : plan));
        toast.success('Plan updated successfully!');
      } else {
        // Create new plan
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
    if (formData.features.length <= 1) return; // Don't remove the last feature
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      features: newFeatures
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
        <span className="ml-2 text-gray-600">Loading plans...</span>
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
          onClick={fetchPlans}
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
        <h1 className="text-2xl font-bold">Subscription Plans</h1>
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
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        {plans.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No subscription plans found. Create your first plan to get started.
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
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Create/Edit Plan Modal */}
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
    </div>
  );
};

export default SubscriptionsTable;


// import React, { useState, useEffect } from 'react';
// import { 
//   Crown,
//   Clock,
//   CheckCircle2,
//   XCircle,
//   Calendar,
//   DollarSign,
//   Edit,
//   MoreHorizontal,
//   ArrowUpDown,
//   Zap,
//   RefreshCw,
//   X
// } from 'lucide-react';
// import { z } from 'zod';

// // Define Zod schema for subscription data
// const subscriptionSchema = z.object({
//   id: z.string(),
//   name: z.string().min(2, "Plan name must be at least 2 characters"),
//   description: z.string().min(5, "Description too short"),
//   status: z.enum(['Active', 'Inactive', 'Pending', 'Expired']),
//   startDate: z.string().regex(/^\d{2}-\d{2}-\d{4}$/, "Date format should be DD-MM-YYYY"),
//   endDate: z.string().regex(/^\d{2}-\d{2}-\d{4}$/, "Date format should be DD-MM-YYYY"),
//   price: z.number().min(0, "Price cannot be negative"),
//   currency: z.string().length(1, "Currency symbol should be 1 character").default('$'),
//   icon: z.enum(['crown', 'zap', 'star', 'diamond']),
//   iconColor: z.enum(['purple', 'blue', 'green', 'yellow', 'red'])
// });

// const SubscriptionsTable = () => {
//   const [subscriptions, setSubscriptions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activePlans, setActivePlans] = useState(0);
//   const [totalRevenue, setTotalRevenue] = useState(0);

//   // Mock data that would normally come from your backend
//   const mockSubscriptions = [
//     {
//       id: '1',
//       name: 'VIP Plan',
//       description: 'Premium features',
//       status: 'Active',
//       startDate: '01-07-2025',
//       endDate: '01-01-2026',
//       price: 99.99,
//       currency: '$',
//       icon: 'crown',
//       iconColor: 'purple'
//     },
//     {
//       id: '2',
//       name: 'Free Trial',
//       description: 'Basic features',
//       status: 'Inactive',
//       startDate: '01-07-2025',
//       endDate: '31-07-2025',
//       price: 0.00,
//       currency: '$',
//       icon: 'zap',
//       iconColor: 'blue'
//     }
//   ];

//   // Fetch and validate subscription data
//   const fetchSubscriptions = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       // In a real app, this would be an API call:
//       // const response = await fetch('/api/subscriptions');
//       // const data = await response.json();
      
//       // Validate the data against our schema
//       const validatedData = z.array(subscriptionSchema).parse(mockSubscriptions);
//       setSubscriptions(validatedData);
      
//       // Calculate metrics
//       const activeCount = validatedData.filter(sub => sub.status === 'Active').length;
//       const revenue = validatedData
//         .filter(sub => sub.status === 'Active')
//         .reduce((sum, sub) => sum + sub.price, 0);
      
//       setActivePlans(activeCount);
//       setTotalRevenue(revenue);
//     } catch (err) {
//       console.error('Data validation failed:', err);
//       setError('Failed to load subscription data. Please try again.');
//       setSubscriptions([]);
//       setActivePlans(0);
//       setTotalRevenue(0);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSubscriptions();
//   }, []);

//   const getIconComponent = (icon) => {
//     switch (icon) {
//       case 'crown': return <Crown className="h-4 w-4" />;
//       case 'zap': return <Zap className="h-4 w-4" />;
//       // Add more icons as needed
//       default: return <Crown className="h-4 w-4" />;
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'Active': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
//       case 'Inactive': return <XCircle className="h-4 w-4 text-gray-500" />;
//       case 'Pending': return <Clock className="h-4 w-4 text-yellow-500" />;
//       case 'Expired': return <X className="h-4 w-4 text-red-500" />;
//       default: return null;
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Active': return 'text-green-600';
//       case 'Inactive': return 'text-gray-600';
//       case 'Pending': return 'text-yellow-600';
//       case 'Expired': return 'text-red-600';
//       default: return 'text-gray-600';
//     }
//   };

//   const getIconColorClass = (color) => {
//     switch (color) {
//       case 'purple': return 'bg-purple-100 text-purple-600';
//       case 'blue': return 'bg-blue-100 text-blue-600';
//       case 'green': return 'bg-green-100 text-green-600';
//       case 'yellow': return 'bg-yellow-100 text-yellow-600';
//       case 'red': return 'bg-red-100 text-red-600';
//       default: return 'bg-gray-100 text-gray-600';
//     }
//   };

//   if (loading) {
//     return (
//       <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
//         <div className="p-6 text-center">
//           <p className="text-red-600 mb-4">{error}</p>
//           <button 
//             onClick={fetchSubscriptions}
//             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2 mx-auto"
//           >
//             <RefreshCw className="h-4 w-4" />
//             <span>Retry</span>
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
//       <table className="w-full text-sm">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="p-3 font-medium text-gray-700 text-left">
//               <div className="flex items-center gap-1">
//                 <Crown className="h-4 w-4 text-gray-500" />
//                 <span>Plan Name</span>
//                 <ArrowUpDown className="h-3 w-3 text-gray-400 cursor-pointer" />
//               </div>
//             </th>
//             <th className="p-3 font-medium text-gray-700 text-left">Status</th>
//             <th className="p-3 font-medium text-gray-700 text-left">
//               <div className="flex items-center gap-1">
//                 <Calendar className="h-4 w-4 text-gray-500" />
//                 <span>Start Date</span>
//               </div>
//             </th>
//             <th className="p-3 font-medium text-gray-700 text-left">
//               <div className="flex items-center gap-1">
//                 <Calendar className="h-4 w-4 text-gray-500" />
//                 <span>End Date</span>
//               </div>
//             </th>
//             <th className="p-3 font-medium text-gray-700 text-left">
//               <div className="flex items-center gap-1">
//                 <DollarSign className="h-4 w-4 text-gray-500" />
//                 <span>Price</span>
//                 <ArrowUpDown className="h-3 w-3 text-gray-400 cursor-pointer" />
//               </div>
//             </th>
//             <th className="p-3 font-medium text-gray-700 text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-200">
//           {subscriptions.map((subscription) => (
//             <tr key={subscription.id} className="hover:bg-gray-50">
//               <td className="p-3">
//                 <div className="flex items-center gap-2">
//                   <div className={`h-8 w-8 rounded-full flex items-center justify-center ${getIconColorClass(subscription.iconColor)}`}>
//                     {getIconComponent(subscription.icon)}
//                   </div>
//                   <div>
//                     <p className="font-medium">{subscription.name}</p>
//                     <p className="text-xs text-gray-500">{subscription.description}</p>
//                   </div>
//                 </div>
//               </td>
//               <td className="p-3">
//                 <div className="flex items-center gap-1">
//                   {getStatusIcon(subscription.status)}
//                   <span className={getStatusColor(subscription.status)}>{subscription.status}</span>
//                 </div>
//               </td>
//               <td className="p-3">
//                 <div className="flex items-center gap-1">
//                   <Calendar className="h-4 w-4 text-gray-400" />
//                   <span>{subscription.startDate}</span>
//                 </div>
//               </td>
//               <td className="p-3">
//                 <div className="flex items-center gap-1">
//                   <Calendar className="h-4 w-4 text-gray-400" />
//                   <span>{subscription.endDate}</span>
//                 </div>
//               </td>
//               <td className="p-3 font-medium">{subscription.currency}{subscription.price.toFixed(2)}</td>
//               <td className="p-3">
//                 <div className="flex gap-2">
//                   <button 
//                     className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
//                     title="Edit Plan"
//                   >
//                     <Edit className="h-4 w-4" />
//                   </button>
//                   <button 
//                     className="p-2 text-gray-600 hover:bg-gray-50 rounded-md"
//                     title="More Options"
//                   >
//                     <MoreHorizontal className="h-4 w-4" />
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Table Footer */}
//       <div className="p-4 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div className="text-sm text-gray-600">
//           Showing <span className="font-medium">1</span> to <span className="font-medium">{subscriptions.length}</span> of <span className="font-medium">{subscriptions.length}</span> subscriptions
//         </div>
//         <div className="flex items-center gap-4">
//           <div className="text-sm">
//             <span className="text-gray-600">Active Plans:</span>
//             <span className="font-medium ml-2">{activePlans}</span>
//           </div>
//           <div className="text-sm">
//             <span className="text-gray-600">Total Revenue:</span>
//             <span className="font-medium ml-2">{subscriptions[0]?.currency || '$'}{totalRevenue.toFixed(2)}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubscriptionsTable;