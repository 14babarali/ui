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
  Plus,
  Save,
  Loader2
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from "../../utils/api"
const DoctorsTable = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDoctors, setSelectedDoctors] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    location: '',
    phone: '',
    licenseNumber: '',
    verified: false,
    active: false
  });
  const [isSaving, setIsSaving] = useState(false);

  // Fetch doctors data from backend
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get('/admin/doctors', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      // Transform the data to match our table format
      const transformedData = response.data.map(doctor => ({
        id: doctor._id,
        name: `${doctor.firstName} ${doctor.lastName}`,
        firstName: doctor.firstName,
        lastName: doctor.lastName,
        email: doctor.user.email,
        location: doctor.location,
        lastCheck: new Date(doctor.updatedAt).toLocaleDateString('en-GB'),
        phone: doctor.phone,
        licenseNumber: doctor.licenseNumber,
        subscription: doctor.user.subscription?.plan?.name || 'Free Trial',
        isVerified: doctor.verified,
        isActive: doctor.user.isActive,
        isSuspended: doctor.user.isSuspended,
        avatarColor: ['blue', 'purple', 'green', 'yellow'][Math.floor(Math.random() * 4)]
      }));

      setDoctors(transformedData);
    } catch (err) {
      console.error('Error fetching doctors:', err);
      setError('Failed to load doctors data. Please try again.');
      toast.error('Failed to load doctors data');
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

  const handleEditClick = (doctor) => {
    setEditingId(doctor.id);
    setEditFormData({
      firstName: doctor.firstName,
      lastName: doctor.lastName,
      email: doctor.email,
      location: doctor.location,
      phone: doctor.phone,
      licenseNumber: doctor.licenseNumber,
      verified: doctor.isVerified,
      active: doctor.isActive
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSaveClick = async (id) => {
    try {
      setIsSaving(true);
      
      // Update doctor profile
      await api.put(`/admin/doctors/${id}`, {
        firstName: editFormData.firstName,
        lastName: editFormData.lastName,
        location: editFormData.location,
        phone: editFormData.phone,
        licenseNumber: editFormData.licenseNumber,
        verified: editFormData.verified
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      // Update user status if changed
      const doctor = doctors.find(d => d.id === id);
      if (doctor.isActive !== editFormData.active) {
        await api.put(`/admin/users/${doctor.userId}`, {
          isActive: editFormData.active
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
      }

      toast.success('Doctor updated successfully');
      setEditingId(null);
      fetchDoctors(); // Refresh data
    } catch (err) {
      console.error('Error updating doctor:', err);
      toast.error('Failed to update doctor');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteDoctor = async (id) => {
    if (!window.confirm('Are you sure you want to delete this doctor?')) return;
    
    try {
      await api.delete(`/admin/doctors/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      toast.success('Doctor deleted successfully');
      fetchDoctors(); // Refresh data
    } catch (err) {
      console.error('Error deleting doctor:', err);
      toast.error('Failed to delete doctor');
    }
  };

  const handleSuspendDoctor = async (id, isCurrentlySuspended) => {
    const action = isCurrentlySuspended ? 'unsuspend' : 'suspend';
    if (!window.confirm(`Are you sure you want to ${action} this doctor?`)) return;
    
    try {
      await api.put(`/admin/users/${id}/suspend`, {
        suspend: !isCurrentlySuspended
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      toast.success(`Doctor ${action}ed successfully`);
      fetchDoctors(); // Refresh data
    } catch (err) {
      console.error(`Error ${action}ing doctor:`, err);
      toast.error(`Failed to ${action} doctor`);
    }
  };

  const getAvatarClass = (color) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-600';
      case 'purple': return 'bg-purple-100 text-purple-600';
      case 'green': return 'bg-green-100 text-green-600';
      case 'yellow': return 'bg-yellow-100 text-yellow-600';
      default: return 'bg-gray-100 text-gray-600';
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
                    {editingId === doctor.id ? (
                      <div className="flex flex-col gap-1">
                        <input
                          type="text"
                          name="firstName"
                          value={editFormData.firstName}
                          onChange={handleEditFormChange}
                          className="border rounded px-2 py-1 w-24"
                        />
                        <input
                          type="text"
                          name="lastName"
                          value={editFormData.lastName}
                          onChange={handleEditFormChange}
                          className="border rounded px-2 py-1 w-24"
                        />
                      </div>
                    ) : (
                      <div>
                        <p className="font-medium">{doctor.name}</p>
                        <p className="text-gray-500 text-xs">{doctor.email}</p>
                      </div>
                    )}
                  </div>
                </td>
                <td className="p-3">
                  {editingId === doctor.id ? (
                    <input
                      type="text"
                      name="location"
                      value={editFormData.location}
                      onChange={handleEditFormChange}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>{doctor.location}</span>
                    </div>
                  )}
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>{doctor.lastCheck}</span>
                  </div>
                </td>
                <td className="p-3">
                  {editingId === doctor.id ? (
                    <input
                      type="text"
                      name="phone"
                      value={editFormData.phone}
                      onChange={handleEditFormChange}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span>{doctor.phone}</span>
                    </div>
                  )}
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
                      {editingId === doctor.id ? (
                        <label className="flex items-center gap-1">
                          <input
                            type="checkbox"
                            name="verified"
                            checked={editFormData.verified}
                            onChange={handleEditFormChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className={editFormData.verified ? 'text-green-600' : 'text-red-600'}>
                            {editFormData.verified ? 'Verified' : 'Unverified'}
                          </span>
                        </label>
                      ) : doctor.isVerified ? (
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
                      {editingId === doctor.id ? (
                        <label className="flex items-center gap-1">
                          <input
                            type="checkbox"
                            name="active"
                            checked={editFormData.active}
                            onChange={handleEditFormChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className={editFormData.active ? 'text-green-600' : 'text-red-600'}>
                            {editFormData.active ? 'Active' : 'Inactive'}
                          </span>
                        </label>
                      ) : doctor.isActive ? (
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
                    {editingId === doctor.id ? (
                      <>
                        <button 
                          onClick={() => handleSaveClick(doctor.id)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-md"
                          disabled={isSaving}
                        >
                          {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                        </button>
                        <button 
                          onClick={() => setEditingId(null)}
                          className="p-2 text-gray-600 hover:bg-gray-50 rounded-md"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          onClick={() => handleEditClick(doctor)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteDoctor(doctor.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        {doctor.isSuspended ? (
                          <button 
                            onClick={() => handleSuspendDoctor(doctor.id, true)}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm flex items-center gap-1 hover:bg-gray-200"
                            title="Unsuspend"
                          >
                            <Clock className="h-4 w-4" />
                            <span>Unsuspend</span>
                          </button>
                        ) : (
                          <button 
                            onClick={() => handleSuspendDoctor(doctor.id, false)}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm hover:bg-red-200 flex items-center gap-1"
                            title="Suspend"
                          >
                            <AlertTriangle className="h-4 w-4" />
                            <span>Suspend</span>
                          </button>
                        )}
                      </>
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