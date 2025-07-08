import React from 'react';
import { Clock, Mail, Phone } from 'lucide-react';

const ContactSection = () => {
  return (
    <section className="px-8 md:px-16 mx-4 md:mx-16 py-12 flex flex-col md:flex-row items-start gap-12 bg-gray-50">
      {/* Contact Info */}
      <div className="mb-8 md:mb-0 md:w-1/2">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Get In Touch</h2>
        <p className="text-gray-700 mb-4">Book an appointment to treat your teeth with the care they deserve.</p>
        <p className="text-gray-700 mb-6">Or call us directly at <span className="font-semibold text-blue-600">00049923023-3</span></p>

        <div className="space-y-6">
          {/* Office Timings */}
          <div className="flex items-start bg-blue-100 p-4 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-1">Office Timings</h4>
              <p className="text-gray-700">Monday - Saturday (9:00 AM to 5:00 PM)</p>
              <p className="text-gray-700">Sunday (Closed)</p>
            </div>
          </div>

          {/* Email Address */}
          <div className="flex items-start bg-blue-100 p-4 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-1">Email Address</h4>
              <p className="text-gray-700">Smile01@gmail.com</p>
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex items-start bg-blue-100 p-4 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-1">Phone Number</h4>
              <p className="text-gray-700">0900-78601</p>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Form */}
      <div className="w-full md:w-1/2 max-w-lg p-8 bg-white rounded-lg border border-blue-200 shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Book Your Appointment</h3>
        <form className="space-y-6">
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                placeholder="Enter first name"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                placeholder="Enter last name"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              placeholder="example@domain.com"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Preferred Date</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Select a date</option>
              <option>July 10, 2025</option>
              <option>July 11, 2025</option>
              <option>July 12, 2025</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Message</label>
            <textarea
              placeholder="Tell us more about your appointment..."
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Book Appointment
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
