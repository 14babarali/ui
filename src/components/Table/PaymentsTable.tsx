import React, { useState, useEffect } from 'react';
import { 
  User,
  CreditCard,
  DollarSign,
  Calendar,
  CheckCircle2,
  Clock,
  MoreHorizontal,
  FileText,
  ArrowUpDown
} from 'lucide-react';
import { z } from 'zod';

// Define Zod schema for payment data
const paymentSchema = z.object({
  id: z.string(),
  doctor: z.object({
    name: z.string().min(2, "Doctor name must be at least 2 characters"),
    email: z.string().email("Invalid doctor email format"),
    avatarColor: z.enum(['blue', 'green', 'purple', 'yellow'])
  }),
  plan: z.enum(['VIP Plan', 'Free Trial', 'Basic Plan', 'Premium Plan']),
  amount: z.number().min(0, "Amount cannot be negative"),
  date: z.string().regex(/^\d{2}-\d{2}-\d{4}$/, "Date format should be DD-MM-YYYY"),
  status: z.enum(['Paid', 'Pending', 'Failed', 'Refunded']),
  currency: z.string().length(1, "Currency symbol should be 1 character").default('$')
});

const PaymentsTable = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalReceived, setTotalReceived] = useState(0);
  const [totalPending, setTotalPending] = useState(0);

  // Mock data that would normally come from your backend
  const mockPayments = [
    {
      id: '1',
      doctor: {
        name: 'Dr. Ali Khan',
        email: 'doctor@gmail.com',
        avatarColor: 'blue'
      },
      plan: 'VIP Plan',
      amount: 99.99,
      date: '01-07-2025',
      status: 'Paid',
      currency: '$'
    },
    {
      id: '2',
      doctor: {
        name: 'Dr. Sara Ahmed',
        email: 'doctor2@gmail.com',
        avatarColor: 'green'
      },
      plan: 'Free Trial',
      amount: 0.00,
      date: '01-07-2025',
      status: 'Pending',
      currency: '$'
    }
  ];

  // Fetch and validate payments data
  const fetchPayments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would be an API call:
      // const response = await fetch('/api/payments');
      // const data = await response.json();
      
      // Validate the data against our schema
      const validatedData = z.array(paymentSchema).parse(mockPayments);
      setPayments(validatedData);
      
      // Calculate totals
      const received = validatedData
        .filter(p => p.status === 'Paid')
        .reduce((sum, p) => sum + p.amount, 0);
      
      const pending = validatedData
        .filter(p => p.status === 'Pending')
        .reduce((sum, p) => sum + p.amount, 0);
      
      setTotalReceived(received);
      setTotalPending(pending);
    } catch (err) {
      console.error('Data validation failed:', err);
      setError('Failed to load payment data. Please try again.');
      setPayments([]);
      setTotalReceived(0);
      setTotalPending(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const getAvatarClass = (color) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-600';
      case 'green': return 'bg-green-100 text-green-600';
      case 'purple': return 'bg-purple-100 text-purple-600';
      case 'yellow': return 'bg-yellow-100 text-yellow-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Paid': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'Pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'Failed': return <X className="h-4 w-4 text-red-500" />;
      case 'Refunded': return <RefreshCw className="h-4 w-4 text-blue-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'text-green-600';
      case 'Pending': return 'text-yellow-600';
      case 'Failed': return 'text-red-600';
      case 'Refunded': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getPlanColor = (plan) => {
    switch (plan) {
      case 'VIP Plan': return 'bg-purple-100 text-purple-800';
      case 'Free Trial': return 'bg-green-100 text-green-800';
      case 'Basic Plan': return 'bg-blue-100 text-blue-800';
      case 'Premium Plan': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
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
            onClick={fetchPayments}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Retry
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
                <User className="h-4 w-4 text-gray-500" />
                <span>Doctor</span>
                <ArrowUpDown className="h-3 w-3 text-gray-400 cursor-pointer" />
              </div>
            </th>
            <th className="p-3 font-medium text-gray-700 text-left">
              <div className="flex items-center gap-1">
                <CreditCard className="h-4 w-4 text-gray-500" />
                <span>Plan</span>
              </div>
            </th>
            <th className="p-3 font-medium text-gray-700 text-left">
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <span>Amount</span>
                <ArrowUpDown className="h-3 w-3 text-gray-400 cursor-pointer" />
              </div>
            </th>
            <th className="p-3 font-medium text-gray-700 text-left">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>Date</span>
                <ArrowUpDown className="h-3 w-3 text-gray-400 cursor-pointer" />
              </div>
            </th>
            <th className="p-3 font-medium text-gray-700 text-left">Status</th>
            <th className="p-3 font-medium text-gray-700 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {payments.map((payment) => (
            <tr key={payment.id} className="hover:bg-gray-50">
              <td className="p-3">
                <div className="flex items-center gap-2">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${getAvatarClass(payment.doctor.avatarColor)}`}>
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{payment.doctor.name}</p>
                    <p className="text-gray-500 text-xs">{payment.doctor.email}</p>
                  </div>
                </div>
              </td>
              <td className="p-3">
                <span className={`px-2 py-1 text-xs rounded-full ${getPlanColor(payment.plan)}`}>
                  {payment.plan}
                </span>
              </td>
              <td className="p-3 font-medium">{payment.currency}{payment.amount.toFixed(2)}</td>
              <td className="p-3">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>{payment.date}</span>
                </div>
              </td>
              <td className="p-3">
                <div className="flex items-center gap-1">
                  {getStatusIcon(payment.status)}
                  <span className={getStatusColor(payment.status)}>{payment.status}</span>
                </div>
              </td>
              <td className="p-3">
                <div className="flex gap-2">
                  <button 
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                    title="View Details"
                  >
                    <FileText className="h-4 w-4" />
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

      {/* Table Footer with Summary */}
      <div className="p-4 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="text-sm text-gray-600">
          Showing <span className="font-medium">1</span> to <span className="font-medium">{payments.length}</span> of <span className="font-medium">{payments.length}</span> payments
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm">
            <span className="text-gray-600">Total Received:</span>
            <span className="font-medium ml-2">${totalReceived.toFixed(2)}</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">Pending:</span>
            <span className="font-medium ml-2">${totalPending.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsTable;