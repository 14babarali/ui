import React, { useState, useEffect } from 'react';
import { 
  User,
  Stethoscope,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  MoreHorizontal,
  AlertCircle,
  ArrowUpDown,
  RefreshCw,
  X
} from 'lucide-react';
import { z } from 'zod';

// Define Zod schema for prescription data
const prescriptionSchema = z.object({
  id: z.string(),
  doctor: z.object({
    name: z.string().min(2, "Doctor name must be at least 2 characters"),
    email: z.string().email("Invalid doctor email format"),
    avatarColor: z.enum(['blue', 'purple', 'green', 'yellow', 'red'])
  }),
  patient: z.object({
    name: z.string().min(2, "Patient name must be at least 2 characters"),
    email: z.string().email("Invalid patient email format"),
    avatarColor: z.enum(['blue', 'purple', 'green', 'yellow', 'red'])
  }),
  date: z.string().regex(/^\d{2}-\d{2}-\d{4}$/, "Date format should be DD-MM-YYYY"),
  status: z.enum(['Active', 'Expired', 'Pending', 'Cancelled']),
  medications: z.array(z.string()).min(1, "At least one medication required")
});

const PrescriptionsTable = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCount, setActiveCount] = useState(0);
  const [expiredCount, setExpiredCount] = useState(0);

  // Mock data that would normally come from your backend
  const mockPrescriptions = [
    {
      id: '1',
      doctor: {
        name: 'Dr. Ali Khan',
        email: 'doctor@gmail.com',
        avatarColor: 'blue'
      },
      patient: {
        name: 'John Smith',
        email: 'patient1@gmail.com',
        avatarColor: 'green'
      },
      date: '01-07-2025',
      status: 'Active',
      medications: ['Amoxicillin 500mg', 'Ibuprofen 400mg']
    },
    {
      id: '2',
      doctor: {
        name: 'Dr. Sara Ahmed',
        email: 'doctor2@gmail.com',
        avatarColor: 'purple'
      },
      patient: {
        name: 'Emma Johnson',
        email: 'patient2@gmail.com',
        avatarColor: 'yellow'
      },
      date: '02-07-2025',
      status: 'Expired',
      medications: ['Loratadine 10mg']
    }
  ];

  // Fetch and validate prescription data
  const fetchPrescriptions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would be an API call:
      // const response = await fetch('/api/prescriptions');
      // const data = await response.json();
      
      // Validate the data against our schema
      const validatedData = z.array(prescriptionSchema).parse(mockPrescriptions);
      setPrescriptions(validatedData);
      
      // Calculate counts
      setActiveCount(validatedData.filter(p => p.status === 'Active').length);
      setExpiredCount(validatedData.filter(p => p.status === 'Expired').length);
    } catch (err) {
      console.error('Data validation failed:', err);
      setError('Failed to load prescription data. Please try again.');
      setPrescriptions([]);
      setActiveCount(0);
      setExpiredCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'Expired': return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'Pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'Cancelled': return <X className="h-4 w-4 text-gray-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-green-600';
      case 'Expired': return 'text-red-600';
      case 'Pending': return 'text-yellow-600';
      case 'Cancelled': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getAvatarClass = (color) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-600';
      case 'purple': return 'bg-purple-100 text-purple-600';
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
            onClick={fetchPrescriptions}
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
                <Stethoscope className="h-4 w-4 text-gray-500" />
                <span>Doctor</span>
                <ArrowUpDown className="h-3 w-3 text-gray-400 cursor-pointer" />
              </div>
            </th>
            <th className="p-3 font-medium text-gray-700 text-left">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4 text-gray-500" />
                <span>Patient</span>
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
          {prescriptions.map((prescription) => (
            <tr key={prescription.id} className="hover:bg-gray-50">
              <td className="p-3">
                <div className="flex items-center gap-2">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${getAvatarClass(prescription.doctor.avatarColor)}`}>
                    <Stethoscope className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{prescription.doctor.name}</p>
                    <p className="text-gray-500 text-xs">{prescription.doctor.email}</p>
                  </div>
                </div>
              </td>
              <td className="p-3">
                <div className="flex items-center gap-2">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${getAvatarClass(prescription.patient.avatarColor)}`}>
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{prescription.patient.name}</p>
                    <p className="text-gray-500 text-xs">{prescription.patient.email}</p>
                  </div>
                </div>
              </td>
              <td className="p-3">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>{prescription.date}</span>
                </div>
              </td>
              <td className="p-3">
                <div className="flex items-center gap-1">
                  {getStatusIcon(prescription.status)}
                  <span className={getStatusColor(prescription.status)}>{prescription.status}</span>
                </div>
              </td>
              <td className="p-3">
                <div className="flex gap-2">
                  <button 
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                    title="View Prescription"
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

      {/* Table Footer */}
      <div className="p-4 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="text-sm text-gray-600">
          Showing <span className="font-medium">1</span> to <span className="font-medium">{prescriptions.length}</span> of <span className="font-medium">{prescriptions.length}</span> prescriptions
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm">
            <span className="text-gray-600">Active:</span>
            <span className="font-medium ml-2">{activeCount}</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">Expired:</span>
            <span className="font-medium ml-2">{expiredCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionsTable;