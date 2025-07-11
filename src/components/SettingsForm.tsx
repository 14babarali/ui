import React, { useState, useEffect } from 'react';
import { 
  User, MapPin, IdCard, GraduationCap, 
  Hospital, Phone, ClipboardList, FileText, 
  X, Eye, Edit, Check, Plus, Trash2 
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '.././utils/api';
import { toast } from 'react-toastify';

// Validation schemas
const doctorProfileSchema = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters'),
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters'),
  location: z.string()
    .min(2, 'Location must be at least 2 characters'),
  idNumber: z.string()
    .min(5, 'ID number must be at least 5 characters')
    .regex(/^[0-9-]+$/, 'ID number can only contain numbers and hyphens'),
  certificationId: z.string()
    .min(5, 'Certification ID must be at least 5 characters'),
  education: z.string()
    .min(2, 'Education must be at least 2 characters'),
  hospital: z.string()
    .min(2, 'Hospital name must be at least 2 characters'),
  phone: z.string()
    .min(10, 'Phone number must be at least 10 characters')
    .regex(/^\+?[0-9\s-]+$/, 'Invalid phone number format'),
  licenseNumber: z.string()
    .min(5, 'License number must be at least 5 characters'),
  qualifications: z.string()
    .min(2, 'Qualifications must be at least 2 characters'),
  prescriptionTemplate: z.string().optional(),
});

const templateSchema = z.object({
  name: z.string().min(2, 'Template name must be at least 2 characters'),
  content: z.string().min(1, 'Template content is required'),
});

interface SettingsFormProps {
  doctorProfile: any;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ doctorProfile }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [activeTab, setActiveTab] = useState('edit');
  const [isSaving, setIsSaving] = useState(false);
  const [templates, setTemplates] = useState<any[]>([]);
  const [loadingTemplates, setLoadingTemplates] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  // Main profile form
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(doctorProfileSchema),
    defaultValues: {
      firstName: doctorProfile?.firstName || '',
      lastName: doctorProfile?.lastName || '',
      location: doctorProfile?.location || '',
      idNumber: doctorProfile?.idNumber || '',
      certificationId: doctorProfile?.certificationId || '',
      education: doctorProfile?.education || '',
      hospital: doctorProfile?.hospital || '',
      phone: doctorProfile?.phone || '',
      licenseNumber: doctorProfile?.licenseNumber || '',
      qualifications: doctorProfile?.qualifications || '',
    }
  });

  // Template form
  const { 
    register: registerTemplate, 
    handleSubmit: handleTemplateSubmit, 
    formState: { errors: templateErrors },
    reset: resetTemplate,
  } = useForm({
    resolver: zodResolver(templateSchema),
  });

  // Fetch templates when component mounts
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await api.get('/doctor/templates');
        setTemplates(response.data || []);
        
        // Set default template if available
        const defaultTemplate = response.data.find((t: any) => t.isDefault)?._id || '';
        setValue('prescriptionTemplate', defaultTemplate);
      } catch (error) {
        console.error('Error fetching templates:', error);
        toast.error('Failed to load prescription templates');
      } finally {
        setLoadingTemplates(false);
      }
    };

    fetchTemplates();
  }, []);

  const onSubmit = async (data: any) => {
    try {
      setIsSaving(true);
      const { prescriptionTemplate, ...profileData } = data;

      const response = await api.put('/doctor/profile', profileData);
      toast.success('Profile updated successfully!');
      
      // Update the default template if changed
      if (prescriptionTemplate) {
        await api.put(`/doctor/templates/${prescriptionTemplate}/set-default`);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  // Template management functions
  const handlePrescriptionTemplateClick = () => {
    setShowPopup(true);
    setSelectedTemplate(null);
    setActiveTab('edit');
    resetTemplate();
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedTemplate(null);
    resetTemplate();
  };

  const handleEditTemplate = (template: any) => {
    setSelectedTemplate(template);
    setActiveTab('edit');
    setShowPopup(true);
    resetTemplate({ name: template.name, content: template.content });
  };

  const createTemplate = async (templateData: any) => {
    try {
      const response = await api.post('/doctor/templates', templateData);
      setTemplates([...templates, response.data]);
      toast.success('Template created successfully!');
      closePopup();
    } catch (error) {
      console.error('Error creating template:', error);
      toast.error(error.response?.data?.message || 'Failed to create template');
    }
  };

  const updateTemplate = async (id: string, templateData: any) => {
    try {
      const response = await api.put(`/doctor/templates/${id}`, templateData);
      setTemplates(templates.map(t => t._id === id ? response.data : t));
      toast.success('Template updated successfully!');
      closePopup();
    } catch (error) {
      console.error('Error updating template:', error);
      toast.error(error.response?.data?.message || 'Failed to update template');
    }
  };

  const deleteTemplate = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this template?')) return;
    
    try {
      await api.delete(`/doctor/templates/${id}`);
      setTemplates(templates.filter(t => t._id !== id));
      toast.success('Template deleted successfully!');
    } catch (error) {
      console.error('Error deleting template:', error);
      toast.error(error.response?.data?.message || 'Failed to delete template');
    }
  };

  const setDefaultTemplate = async (id: string) => {
    try {
      await api.put(`/doctor/templates/${id}/set-default`, {});
      setTemplates(templates.map(t => ({ ...t, isDefault: t._id === id })));
      setValue('prescriptionTemplate', id);
      toast.success('Default template set successfully!');
    } catch (error) {
      console.error('Error setting default template:', error);
      toast.error(error.response?.data?.message || 'Failed to set default template');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <form onSubmit={handleSubmit(onSubmit)} className="p-6">
        {/* Personal Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <h4 className="text-lg font-medium flex items-center gap-2 text-gray-700">
              <User className="h-4 w-4" />
              <span>Personal Information</span>
            </h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First name</label>
              <div className="relative">
                <input
                  {...register('firstName')}
                  className={`w-full pl-10 pr-4 py-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-blue-500 focus:border-blue-500`}
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
              <input
                {...register('lastName')}
                className={`w-full px-4 py-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <div className="relative">
                <input
                  {...register('location')}
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
                  {...register('idNumber')}
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
                {...register('certificationId')}
                className={`w-full px-4 py-2 border ${errors.certificationId ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.certificationId && <p className="mt-1 text-sm text-red-600">{errors.certificationId.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
              <div className="relative">
                <input
                  {...register('education')}
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
                  {...register('hospital')}
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
                  {...register('phone')}
                  className={`w-full pl-10 pr-4 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-blue-500 focus:border-blue-500`}
                />
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
            </div>
          </div>
        </div>

        {/* Medical License Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Medical license number</label>
            <input
              {...register('licenseNumber')}
              className={`w-full px-4 py-2 border ${errors.licenseNumber ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.licenseNumber && <p className="mt-1 text-sm text-red-600">{errors.licenseNumber.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Qualifications</label>
            <input
              {...register('qualifications')}
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

          {loadingTemplates ? (
            <div className="flex justify-center py-8">
              <Loader2 className="animate-spin h-6 w-6 text-blue-500" />
            </div>
          ) : templates.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No templates</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by creating a new template.</p>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handlePrescriptionTemplateClick}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FileText className="-ml-1 mr-2 h-5 w-5" />
                  New Template
                </button>
              </div>
            </div>
          ) : (
            <>
              <fieldset className="flex flex-wrap items-center gap-4 mb-6">
                <legend className="sr-only">Select a prescription template</legend>
                {templates.map((template) => (
                  <label key={template._id} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      {...register('prescriptionTemplate')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      value={template._id}
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      {template.name}
                      {template.isDefault && (
                        <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          Default
                        </span>
                      )}
                    </span>
                  </label>
                ))}
                
                <button
                  type="button"
                  onClick={handlePrescriptionTemplateClick}
                  className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>New Template</span>
                </button>
              </fieldset>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <div 
                    key={template._id} 
                    className={`border rounded-lg p-4 hover:border-blue-300 transition-colors cursor-pointer relative ${
                      doctorProfile?.prescriptionTemplate === template._id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                    onClick={() => setValue('prescriptionTemplate', template._id)}
                  >
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditTemplate(template);
                        }}
                        className="p-1 text-gray-500 hover:text-blue-600"
                        aria-label={`Edit ${template.name} template`}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm('Are you sure you want to delete this template?')) {
                            deleteTemplate(template._id);
                          }
                        }}
                        className="p-1 text-gray-500 hover:text-red-600"
                        aria-label={`Delete ${template.name} template`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="h-32 bg-gray-100 rounded flex items-center justify-center mb-2">
                      <FileText className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-sm font-medium text-center">
                      {template.name}
                      {template.isDefault && (
                        <span className="ml-1 text-xs text-blue-600">(Default)</span>
                      )}
                    </p>
                    <p className="text-xs text-gray-500 text-center mt-1">
                      Created: {new Date(template.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2 ${
              isSaving ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSaving ? (
              <Loader2 className="animate-spin h-4 w-4" />
            ) : (
              <Check className="h-4 w-4" />
            )}
            <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
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
                <span>{selectedTemplate ? 'Edit' : 'New'} Template</span>
              </h3>
              <button
                onClick={closePopup}
                className="p-1 rounded-full hover:bg-gray-100"
                aria-label="Close popup"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex border-b border-gray-200 mb-4">
                <button
                  className={`px-4 py-2 font-medium text-sm flex items-center gap-2 ${
                    activeTab === 'view' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('view')}
                  disabled={!selectedTemplate}
                >
                  <Eye className="h-4 w-4" />
                  <span>View</span>
                </button>
                <button
                  className={`px-4 py-2 font-medium text-sm flex items-center gap-2 ${
                    activeTab === 'edit' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('edit')}
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </button>
              </div>

              {activeTab === 'view' && selectedTemplate && (
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium mb-2">Template Content</h4>
                    <pre className="text-gray-600 whitespace-pre-wrap">
                      {selectedTemplate.content || 'No content available'}
                    </pre>
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setDefaultTemplate(selectedTemplate._id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                      disabled={selectedTemplate.isDefault}
                    >
                      {selectedTemplate.isDefault ? 'Current Default' : 'Set as Default'}
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'edit' && (
                <form 
                  onSubmit={handleTemplateSubmit((data) => {
                    if (selectedTemplate) {
                      updateTemplate(selectedTemplate._id, data);
                    } else {
                      createTemplate(data);
                    }
                  })}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Template Name</label>
                    <input
                      {...registerTemplate('name')}
                      className={`w-full px-3 py-2 border ${
                        templateErrors.name ? 'border-red-500' : 'border-gray-300'
                      } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {templateErrors.name && (
                      <p className="mt-1 text-sm text-red-600">{templateErrors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Template Content</label>
                    <textarea
                      {...registerTemplate('content')}
                      rows={8}
                      className={`w-full px-3 py-2 border ${
                        templateErrors.content ? 'border-red-500' : 'border-gray-300'
                      } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {templateErrors.content && (
                      <p className="mt-1 text-sm text-red-600">{templateErrors.content.message}</p>
                    )}
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
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 flex items-center gap-2"
                    >
                      <Check className="h-4 w-4" />
                      <span>{selectedTemplate ? 'Update' : 'Create'} Template</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsForm;