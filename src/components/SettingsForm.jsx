import React, { useState } from 'react';
import { 
  User,
  MapPin,
  IdCard,
  GraduationCap,
  Hospital,
  Phone,
  ClipboardList,
  FileText,
  X,
  Eye,
  Edit,
  Check,
  ChevronDown
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Define validation schema
const doctorProfileSchema = z.object({
  firstName: z.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),
  lastName: z.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),
  location: z.string()
    .min(2, "Location must be at least 2 characters"),
  idNumber: z.string()
    .min(5, "ID number must be at least 5 characters")
    .regex(/^[0-9-]+$/, "ID number can only contain numbers and hyphens"),
  certificationId: z.string()
    .min(5, "Certification ID must be at least 5 characters"),
  education: z.string()
    .min(2, "Education must be at least 2 characters"),
  hospital: z.string()
    .min(2, "Hospital name must be at least 2 characters"),
  phone: z.string()
    .min(10, "Phone number must be at least 10 characters")
    .regex(/^\+?[0-9\s-]+$/, "Invalid phone number format"),
  licenseNumber: z.string()
    .min(5, "License number must be at least 5 characters"),
  qualifications: z.string()
    .min(2, "Qualifications must be at least 2 characters"),
  prescriptionTemplate: z.string()
});

const SettingsForm = () => {
  const [selectedPrescription, setSelectedPrescription] = useState('Prescription 1');
  const [showPopup, setShowPopup] = useState(false);
  const [activeTab, setActiveTab] = useState('view');
  const [isSaving, setIsSaving] = useState(false);

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    setValue
  } = useForm({
    resolver: zodResolver(doctorProfileSchema),
    defaultValues: {
      firstName: 'First name',
      lastName: 'Last name',
      location: 'Input field',
      idNumber: '711305-500304-1',
      certificationId: 'Board certification',
      education: 'Edu',
      hospital: 'Hospital field',
      phone: 'pak +92 300-0000',
      licenseNumber: 'Med license no',
      qualifications: 'qualifications',
      prescriptionTemplate: 'Prescription 1'
    }
  });

  const onSubmit = (data) => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      alert('Settings saved successfully!');
      console.log(data);
    }, 1500);
  };

  const handlePrescriptionTemplateClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handlePrescriptionChange = (prescription) => {
    setSelectedPrescription(prescription);
    setValue('prescriptionTemplate', prescription);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <User className="h-5 w-5 text-blue-600" />
          <span>Doctor Profile Settings</span>
        </h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium flex items-center gap-2 text-gray-700">
              <User className="h-4 w-4" />
              <span>Personal Information</span>
            </h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First name</label>
              <div className="relative">
                <input
                  {...register("firstName")}
                  className={`w-full pl-10 pr-4 py-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-blue-500 focus:border-blue-500`}
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
              <input
                {...register("lastName")}
                className={`w-full px-4 py-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <div className="relative">
                <input
                  {...register("location")}
                  className={`w-full pl-10 pr-4 py-2 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-blue-500 focus:border-blue-500`}
                />
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ID number</label>
              <div className="relative">
                <input
                  {...register("idNumber")}
                  className={`w-full pl-10 pr-4 py-2 border ${errors.idNumber ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-blue-500 focus:border-blue-500`}
                />
                <IdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              {errors.idNumber && <p className="mt-1 text-sm text-red-600">{errors.idNumber.message}</p>}
            </div>
          </div>

          {/* Professional Information Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium flex items-center gap-2 text-gray-700">
              <ClipboardList className="h-4 w-4" />
              <span>Professional Information</span>
            </h4>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Board certification ID</label>
              <input
                {...register("certificationId")}
                className={`w-full px-4 py-2 border ${errors.certificationId ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.certificationId && <p className="mt-1 text-sm text-red-600">{errors.certificationId.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
              <div className="relative">
                <input
                  {...register("education")}
                  className={`w-full pl-10 pr-4 py-2 border ${errors.education ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-blue-500 focus:border-blue-500`}
                />
                <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              {errors.education && <p className="mt-1 text-sm text-red-600">{errors.education.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hospital name</label>
              <div className="relative">
                <input
                  {...register("hospital")}
                  className={`w-full pl-10 pr-4 py-2 border ${errors.hospital ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-blue-500 focus:border-blue-500`}
                />
                <Hospital className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              {errors.hospital && <p className="mt-1 text-sm text-red-600">{errors.hospital.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone number</label>
              <div className="relative">
                <input
                  {...register("phone")}
                  className={`w-full pl-10 pr-4 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-blue-500 focus:border-blue-500`}
                />
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
            </div>
          </div>
        </div>

        {/* Medical License Section */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Medical license number</label>
            <input
              {...register("licenseNumber")}
              className={`w-full px-4 py-2 border ${errors.licenseNumber ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.licenseNumber && <p className="mt-1 text-sm text-red-600">{errors.licenseNumber.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Qualifications</label>
            <input
              {...register("qualifications")}
              className={`w-full px-4 py-2 border ${errors.qualifications ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.qualifications && <p className="mt-1 text-sm text-red-600">{errors.qualifications.message}</p>}
          </div>
        </div>

        {/* Prescription Templates Section */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <h4 className="text-lg font-medium flex items-center gap-2 text-gray-700 mb-4">
            <FileText className="h-4 w-4" />
            <span>Prescription Templates</span>
          </h4>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            {['Prescription 1', 'Prescription 2', 'Prescription 3'].map((prescription) => (
              <label key={prescription} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  {...register("prescriptionTemplate")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  value={prescription}
                  checked={selectedPrescription === prescription}
                  onChange={() => handlePrescriptionChange(prescription)}
                />
                <span className="ml-2 text-sm font-medium text-gray-700">{prescription}</span>
              </label>
            ))}
            
            <button
              type="button"
              onClick={handlePrescriptionTemplateClick}
              className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              <span>Manage Templates</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors cursor-pointer">
                <div className="h-32 bg-gray-100 rounded flex items-center justify-center mb-2">
                  <FileText className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-sm font-medium text-center">Template {item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Form Actions */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 flex items-center gap-2"
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <Check className="h-4 w-4" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Prescription Template Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <span>{selectedPrescription} Template</span>
              </h3>
              <button
                onClick={closePopup}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex border-b border-gray-200 mb-4">
                <button
                  className={`px-4 py-2 font-medium text-sm flex items-center gap-2 ${activeTab === 'view' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('view')}
                >
                  <Eye className="h-4 w-4" />
                  <span>View</span>
                </button>
                <button
                  className={`px-4 py-2 font-medium text-sm flex items-center gap-2 ${activeTab === 'edit' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('edit')}
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </button>
              </div>

              {activeTab === 'view' && (
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium mb-2">Header</h4>
                    <p className="text-gray-600">Dr. {selectedPrescription}</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium mb-2">Standard Medications</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      <li>Amoxicillin 500mg - 1 tablet every 8 hours for 7 days</li>
                      <li>Ibuprofen 400mg - As needed for pain</li>
                      <li>Loratadine 10mg - Daily for allergies</li>
                    </ul>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium mb-2">Footer Notes</h4>
                    <p className="text-gray-600">Follow up in 2 weeks if symptoms persist.</p>
                  </div>
                </div>
              )}

              {activeTab === 'edit' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Template Name</label>
                    <input
                      type="text"
                      defaultValue={selectedPrescription}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Template Content</label>
                    <textarea
                      rows={8}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={`Prescription Template for ${selectedPrescription}\n\nPatient: [Patient Name]\nDate: [Prescription Date]\n\nMedications:\n- [Medication 1]\n- [Medication 2]\n\nInstructions:\n[Detailed Instructions]`}
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={closePopup}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 flex items-center gap-2"
                    >
                      <Check className="h-4 w-4" />
                      <span>Save Template</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsForm;