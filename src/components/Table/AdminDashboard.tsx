import React, { useState, useEffect } from 'react';
import { 
  Filter, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  RefreshCw, 
  Download, 
  Plus 
} from 'lucide-react';
import { z } from 'zod';

// Define schema for admin data
const adminSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  role: z.enum(['Admin', 'User', 'Guest']),
  status: z.enum(['Active', 'Inactive', 'Pending']),
  lastActive: z.string().datetime().optional(),
  createdAt: z.string().datetime().optional()
});

// Mock data that would normally come from your backend
const mockAdmins = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
    lastActive: '2023-05-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    status: 'Inactive',
    lastActive: '2023-05-10T14:45:00Z'
  }
];

const AdminDashboard = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // This would be your API fetch function
  const fetchAdmins = async () => {
    try {
      setLoading(true);
      
      // In a real app, this would be an API call
      // const response = await fetch('/api/admins');
      // const data = await response.json();
      
      // Validate the data against our schema
      const validatedData = z.array(adminSchema).parse(mockAdmins);
      setAdmins(validatedData);
      setError(null);
    } catch (err) {
      console.error('Data validation failed:', err);
      setError('Failed to load admin data. Please try again.');
      setAdmins([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleRefresh = () => {
    fetchAdmins();
  };

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>
        <div className="bg-white rounded-lg border border-red-200 p-6 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={handleRefresh}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>

      {/* Main Card */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        
        {/* Controls Section */}
        <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Left Controls */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <select 
                className="appearance-none pl-10 pr-8 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option>All Roles</option>
                <option>Admin</option>
                <option>User</option>
                <option>Guest</option>
              </select>
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center">
                <Filter className="h-4 w-4 text-gray-400" />
              </div>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            <span className="text-sm text-gray-600 px-3 py-1 bg-gray-100 rounded-md">
              {admins.length} admins
            </span>

            <button 
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={handleRefresh}
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search admins..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md">
              <Download className="h-4 w-4" />
            </button>

            <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Add Admin</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {admins.map((admin) => (
                <tr key={admin.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{admin.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{admin.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{admin.role}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    admin.status === 'Active' ? 'text-green-600' : 
                    admin.status === 'Inactive' ? 'text-red-600' : 'text-yellow-600'
                  }`}>
                    {admin.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="text-blue-600 hover:underline mr-3">Edit</button>
                    <button className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{admins.length}</span> of <span className="font-medium">50</span> entries
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
              5
            </button>
            <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;