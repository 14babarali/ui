import React, { useState, useEffect } from 'react';
import { 
  Check, 
  X, 
  Edit, 
  Trash2, 
  User, 
  MapPin, 
  Phone, 
  Calendar,
  AlertTriangle,
  BadgeCheck,
  Clock,
  ChevronDown,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Plus
} from 'lucide-react';
import { z } from 'zod';

// Define Zod schema for doctor data
const doctorSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  location: z.string().min(2, "Location must be specified"),
  lastCheck: z.string().regex(/^\d{2}-\d{2}-\d{4}$/, "Date format should be DD-MM-YYYY"),
  phone: z.string().regex(/^\d{4}-\d{5}$/, "Phone format should be XXXX-XXXXX"),
  subscription: z.enum(['Free Trial', 'VIP Plan', 'Basic Plan', 'Premium Plan']),
  isVerified: z.boolean(),
  isActive: z.boolean(),
  isSuspended: z.boolean().optional(),
  avatarColor: z.enum(['blue', 'purple', 'green', 'yellow'])
});

// Mock data that would normally come from your backend
const mockDoctors = [
  {
    id: '1',
    name: 'Dr. Ali Khan',
    email: 'doctor@gmail.com',
    location: 'Islamabad, PK',
    lastCheck: '03-07-2025',
    phone: '9320-40344',
    subscription: 'Free Trial',
    isVerified: true,
    isActive: true,
    avatarColor: 'blue'
  },
  {
    id: '2',
    name: 'Dr. Sara Ahmed',
    email: 'doctor2@gmail.com',
    location: 'Lahore, PK',
    lastCheck: '02-07-2025',
    phone: '9320-40345',
    subscription: 'VIP Plan',
    isVerified: false,
    isActive: false,
    isSuspended: true,
    avatarColor: 'purple'
  },
  // Add more mock data as needed
];

const DoctorsTable = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDoctors, setSelectedDoctors] = useState([]);

  // Fetch and validate doctors data
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would be an API call:
      // const response = await fetch('/api/doctors');
      // const data = await response.json();
      
      // Validate the data against our schema
      const validatedData = z.array(doctorSchema).parse(mockDoctors);
      setDoctors(validatedData);
    } catch (err) {
      console.error('Data validation failed:', err);
      setError('Failed to load doctors data. Please try again.');
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleSelectDoctor = (id) => {
    setSelectedDoctors(prev => 
      prev.includes(id) 
        ? prev.filter(doctorId => doctorId !== id) 
        : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedDoctors(doctors.map(doctor => doctor.id));
    } else {
      setSelectedDoctors([]);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchDoctors}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const getAvatarClass = (color) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-600';
      case 'purple': return 'bg-purple-100 text-purple-600';
      case 'green': return 'bg-green-100 text-green-600';
      case 'yellow': return 'bg-yellow-100 text-yellow-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      {/* Table Header with Controls */}
      <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search doctors..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600 px-3 py-1 bg-gray-100 rounded-md">
            {selectedDoctors.length} selected
          </span>
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </button>
          <button className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 flex items-center gap-2">
            <span>Add Doctor</span>
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 font-medium text-gray-700 text-left">
                <input 
                  type="checkbox" 
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={selectedDoctors.length === doctors.length && doctors.length > 0}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="p-3 font-medium text-gray-700 text-left flex items-center gap-1">
                <span>Doctor</span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </th>
              <th className="p-3 font-medium text-gray-700 text-left">Location</th>
              <th className="p-3 font-medium text-gray-700 text-left">Last Check</th>
              <th className="p-3 font-medium text-gray-700 text-left">Contact</th>
              <th className="p-3 font-medium text-gray-700 text-left">Subscription</th>
              <th className="p-3 font-medium text-gray-700 text-left">Status</th>
              <th className="p-3 font-medium text-gray-700 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {doctors.map((doctor) => (
              <tr key={doctor.id} className={`hover:bg-gray-50 ${selectedDoctors.includes(doctor.id) ? 'bg-gray-50' : ''}`}>
                <td className="p-3">
                  <input 
                    type="checkbox" 
                    checked={selectedDoctors.includes(doctor.id)}
                    onChange={() => handleSelectDoctor(doctor.id)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${getAvatarClass(doctor.avatarColor)}`}>
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{doctor.name}</p>
                      <p className="text-gray-500 text-xs">{doctor.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{doctor.location}</span>
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>{doctor.lastCheck}</span>
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{doctor.phone}</span>
                  </div>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    doctor.subscription === 'Free Trial' ? 'bg-green-100 text-green-800' :
                    doctor.subscription === 'VIP Plan' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {doctor.subscription}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                      {doctor.isVerified ? (
                        <>
                          <BadgeCheck className="h-4 w-4 text-green-500" />
                          <span className="text-green-600">Verified</span>
                        </>
                      ) : (
                        <>
                          <X className="h-4 w-4 text-red-500" />
                          <span className="text-red-600">Unverified</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {doctor.isActive ? (
                        <>
                          <Check className="h-4 w-4 text-green-500" />
                          <span className="text-green-600">Active</span>
                        </>
                      ) : (
                        <>
                          <X className="h-4 w-4 text-red-500" />
                          <span className="text-red-600">Inactive</span>
                        </>
                      )}
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button 
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    {doctor.isSuspended ? (
                      <button 
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm flex items-center gap-1 cursor-not-allowed" 
                        disabled
                        title="Suspended"
                      >
                        <Clock className="h-4 w-4" />
                        <span>Suspended</span>
                      </button>
                    ) : (
                      <button 
                        className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm hover:bg-red-200 flex items-center gap-1"
                        title="Suspend"
                      >
                        <AlertTriangle className="h-4 w-4" />
                        <span>Suspend</span>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer with Pagination */}
      <div className="p-4 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="text-sm text-gray-600">
          Showing <span className="font-medium">1</span> to <span className="font-medium">{doctors.length}</span> of <span className="font-medium">24</span> doctors
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50" disabled>
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
            1
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
            3
          </button>
          <span className="px-2">...</span>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
            8
          </button>
          <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorsTable;