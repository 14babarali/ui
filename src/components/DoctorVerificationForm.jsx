import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { toast } from 'react-toastify';

const verificationSchema = z.object({
  specialization: z.string().min(2, "Specialization is required"),
  licenseNumber: z.string().min(5, "License number is required"),
  medicalSchool: z.string().min(2, "Medical school is required"),
  graduationYear: z.number().min(1900).max(new Date().getFullYear()),
});

const DoctorVerificationForm = ({ onSuccess }) => {
  const [documents, setDocuments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(verificationSchema),
  });

  const handleFileUpload = async (e, documentType) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'your_upload_preset');

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/your_cloud_name/upload',
        formData
      );

      setDocuments([...documents, {
        documentType,
        url: res.data.secure_url,
        verified: false,
      }]);
    } catch (err) {
      toast.error('Failed to upload document');
    }
  };

  const onSubmit = async (data) => {
    if (documents.length < 2) {
      toast.error('Please upload required documents');
      return;
    }

    try {
      setIsSubmitting(true);
      await axios.post('/api/doctors/verify', {
        ...data,
        documents,
      });
      toast.success('Verification submitted successfully');
      onSuccess();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Verification failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Doctor Verification</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Specialization</label>
          <input
            {...register("specialization")}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.specialization ? 'border-red-500' : 'border'}`}
          />
          {errors.specialization && <p className="mt-1 text-sm text-red-600">{errors.specialization.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">License Number</label>
          <input
            {...register("licenseNumber")}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.licenseNumber ? 'border-red-500' : 'border'}`}
          />
          {errors.licenseNumber && <p className="mt-1 text-sm text-red-600">{errors.licenseNumber.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Medical School</label>
          <input
            {...register("medicalSchool")}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.medicalSchool ? 'border-red-500' : 'border'}`}
          />
          {errors.medicalSchool && <p className="mt-1 text-sm text-red-600">{errors.medicalSchool.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Graduation Year</label>
          <input
            type="number"
            {...register("graduationYear", { valueAsNumber: true })}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.graduationYear ? 'border-red-500' : 'border'}`}
          />
          {errors.graduationYear && <p className="mt-1 text-sm text-red-600">{errors.graduationYear.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Medical License</label>
          <input
            type="file"
            onChange={(e) => handleFileUpload(e, 'license')}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Medical Diploma</label>
          <input
            type="file"
            onChange={(e) => handleFileUpload(e, 'diploma')}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {documents.length > 0 && (
          <div className="border-t pt-4">
            <h3 className="text-sm font-medium text-gray-700">Uploaded Documents</h3>
            <ul className="mt-2 space-y-1">
              {documents.map((doc, index) => (
                <li key={index} className="text-sm text-gray-600">
                  {doc.documentType} - <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Verification'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DoctorVerificationForm;