import React, { useState, useEffect } from 'react';
import { 
  Crown,
  Clock,
  CheckCircle2,
  XCircle,
  Calendar,
  DollarSign,
  Edit,
  MoreHorizontal,
  ArrowUpDown,
  Zap,
  RefreshCw,
  X
} from 'lucide-react';
import { z } from 'zod';

// Define Zod schema for subscription data
const subscriptionSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Plan name must be at least 2 characters"),
  description: z.string().min(5, "Description too short"),
  status: z.enum(['Active', 'Inactive', 'Pending', 'Expired']),
  startDate: z.string().regex(/^\d{2}-\d{2}-\d{4}$/, "Date format should be DD-MM-YYYY"),
  endDate: z.string().regex(/^\d{2}-\d{2}-\d{4}$/, "Date format should be DD-MM-YYYY"),
  price: z.number().min(0, "Price cannot be negative"),
  currency: z.string().length(1, "Currency symbol should be 1 character").default('$'),
  icon: z.enum(['crown', 'zap', 'star', 'diamond']),
  iconColor: z.enum(['purple', 'blue', 'green', 'yellow', 'red'])
});

const SubscriptionsTable = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activePlans, setActivePlans] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  // Mock data that would normally come from your backend
  const mockSubscriptions = [
    {
      id: '1',
      name: 'VIP Plan',
      description: 'Premium features',
      status: 'Active',
      startDate: '01-07-2025',
      endDate: '01-01-2026',
      price: 99.99,
      currency: '$',
      icon: 'crown',
      iconColor: 'purple'
    },
    {
      id: '2',
      name: 'Free Trial',
      description: 'Basic features',
      status: 'Inactive',
      startDate: '01-07-2025',
      endDate: '31-07-2025',
      price: 0.00,
      currency: '$',
      icon: 'zap',
      iconColor: 'blue'
    }
  ];

  // Fetch and validate subscription data
  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would be an API call:
      // const response = await fetch('/api/subscriptions');
      // const data = await response.json();
      
      // Validate the data against our schema
      const validatedData = z.array(subscriptionSchema).parse(mockSubscriptions);
      setSubscriptions(validatedData);
      
      // Calculate metrics
      const activeCount = validatedData.filter(sub => sub.status === 'Active').length;
      const revenue = validatedData
        .filter(sub => sub.status === 'Active')
        .reduce((sum, sub) => sum + sub.price, 0);
      
      setActivePlans(activeCount);
      setTotalRevenue(revenue);
    } catch (err) {
      console.error('Data validation failed:', err);
      setError('Failed to load subscription data. Please try again.');
      setSubscriptions([]);
      setActivePlans(0);
      setTotalRevenue(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const getIconComponent = (icon) => {
    switch (icon) {
      case 'crown': return <Crown className="h-4 w-4" />;
      case 'zap': return <Zap className="h-4 w-4" />;
      // Add more icons as needed
      default: return <Crown className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'Inactive': return <XCircle className="h-4 w-4 text-gray-500" />;
      case 'Pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'Expired': return <X className="h-4 w-4 text-red-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-green-600';
      case 'Inactive': return 'text-gray-600';
      case 'Pending': return 'text-yellow-600';
      case 'Expired': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getIconColorClass = (color) => {
    switch (color) {
      case 'purple': return 'bg-purple-100 text-purple-600';
      case 'blue': return 'bg-blue-100 text-blue-600';
      case 'green': return 'bg-green-100 text-green-600';
      case 'yellow': return 'bg-yellow-100 text-yellow-600';
      case 'red': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchSubscriptions}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Retry</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3 font-medium text-gray-700 text-left">
              <div className="flex items-center gap-1">
                <Crown className="h-4 w-4 text-gray-500" />
                <span>Plan Name</span>
                <ArrowUpDown className="h-3 w-3 text-gray-400 cursor-pointer" />
              </div>
            </th>
            <th className="p-3 font-medium text-gray-700 text-left">Status</th>
            <th className="p-3 font-medium text-gray-700 text-left">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>Start Date</span>
              </div>
            </th>
            <th className="p-3 font-medium text-gray-700 text-left">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>End Date</span>
              </div>
            </th>
            <th className="p-3 font-medium text-gray-700 text-left">
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <span>Price</span>
                <ArrowUpDown className="h-3 w-3 text-gray-400 cursor-pointer" />
              </div>
            </th>
            <th className="p-3 font-medium text-gray-700 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {subscriptions.map((subscription) => (
            <tr key={subscription.id} className="hover:bg-gray-50">
              <td className="p-3">
                <div className="flex items-center gap-2">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${getIconColorClass(subscription.iconColor)}`}>
                    {getIconComponent(subscription.icon)}
                  </div>
                  <div>
                    <p className="font-medium">{subscription.name}</p>
                    <p className="text-xs text-gray-500">{subscription.description}</p>
                  </div>
                </div>
              </td>
              <td className="p-3">
                <div className="flex items-center gap-1">
                  {getStatusIcon(subscription.status)}
                  <span className={getStatusColor(subscription.status)}>{subscription.status}</span>
                </div>
              </td>
              <td className="p-3">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>{subscription.startDate}</span>
                </div>
              </td>
              <td className="p-3">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>{subscription.endDate}</span>
                </div>
              </td>
              <td className="p-3 font-medium">{subscription.currency}{subscription.price.toFixed(2)}</td>
              <td className="p-3">
                <div className="flex gap-2">
                  <button 
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                    title="Edit Plan"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button 
                    className="p-2 text-gray-600 hover:bg-gray-50 rounded-md"
                    title="More Options"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Table Footer */}
      <div className="p-4 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="text-sm text-gray-600">
          Showing <span className="font-medium">1</span> to <span className="font-medium">{subscriptions.length}</span> of <span className="font-medium">{subscriptions.length}</span> subscriptions
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm">
            <span className="text-gray-600">Active Plans:</span>
            <span className="font-medium ml-2">{activePlans}</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">Total Revenue:</span>
            <span className="font-medium ml-2">{subscriptions[0]?.currency || '$'}{totalRevenue.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsTable;