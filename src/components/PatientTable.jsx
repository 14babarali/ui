import React from 'react';
import { User, MapPin, Calendar, Phone, ArrowUpDown } from 'lucide-react';
import { z } from 'zod';

const PatientTable = () => {
  // Define the patient schema
  const patientSchema = z.object({
    email: z.string().email('Invalid email format'),
    location: z.string().min(3, 'Location must be at least 3 characters'),
    lastCheck: z.string().regex(/^\d{2}-\d{2}-\d{4}$/, 'Date must be in DD-MM-YYYY format'),
    phone: z.string().min(8, 'Phone number must be at least 8 characters'),
    checked: z.boolean()
  });

  // Sample data that will be validated
  const rawPatients = [
    {
      email: 'patient_user@gmail.com',
      location: 'Pakistan Islamabad',
      lastCheck: '23-03-2028',
      phone: '9320-40344',
      checked: true,
    },
    {
      email: 'patient_user@gmail.com',
      location: 'Pakistan Islamabad',
      lastCheck: '23-03-2028',
      phone: '9320-40344',
      checked: false,
    },
    {
      email: 'invalid-email',
      location: 'PK',
      lastCheck: '2028-03-23',
      phone: '1234',
      checked: false,
    },
  ];

  // Validate each patient
  const patients = rawPatients.map(patient => {
    const result = patientSchema.safeParse(patient);
    if (!result.success) {
      console.error('Validation error:', result.error.errors);
      return {
        ...patient,
        error: result.error.errors,
        isValid: false
      };
    }
    return {
      ...result.data,
      isValid: true
    };
  });

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3 text-left">
              <input type="checkbox" className="accent-blue-600 w-4 h-4" />
            </th>
            <th className="p-3 font-medium text-gray-700 text-left">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4 text-gray-500" />
                <span>Name</span>
                <ArrowUpDown className="h-3 w-3 text-gray-400 cursor-pointer" />
              </div>
            </th>
            <th className="p-3 font-medium text-gray-700 text-left">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>Location</span>
              </div>
            </th>
            <th className="p-3 font-medium text-gray-700 text-left">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>Last Check</span>
              </div>
            </th>
            <th className="p-3 font-medium text-gray-700 text-left">
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4 text-gray-500" />
                <span>Phone</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {patients.map((patient, index) => (
            <tr 
              key={index} 
              className={`hover:bg-gray-50 ${!patient.isValid ? 'bg-red-50' : ''}`}
              title={!patient.isValid ? patient.error.map(e => e.message).join(', ') : ''}
            >
              <td className="p-3">
                <input
                  type="checkbox"
                  className="accent-blue-600 w-4 h-4"
                  checked={patient.checked || false}
                  readOnly
                />
              </td>
              <td className="p-3">
                {patient.email}
                {!patient.isValid && <span className="text-red-500 text-xs ml-1">*</span>}
              </td>
              <td className="p-3">{patient.location}</td>
              <td className="p-3">{patient.lastCheck}</td>
              <td className="p-3">{patient.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="p-4 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="text-sm text-gray-600">
          Showing <span className="font-medium">1</span> to <span className="font-medium">{patients.length}</span> of <span className="font-medium">{patients.length}</span> patients
        </div>
        <div className="text-sm text-gray-600">
          Total Selected: <span className="font-medium">{patients.filter(p => p.checked).length}</span>
          {patients.some(p => !p.isValid) && (
            <span className="text-red-500 ml-2">* Some entries have validation errors</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientTable;