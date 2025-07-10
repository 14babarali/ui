import React from 'react';

const FooterComponent = () => {
  return (
    <footer className="bg-blue-700 text-white py-12 px-4 md:px-12 w-full">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Contact Us</h3>
          <p className="text-sm">123 MedAiLane, Suite 100</p>
          <p className="text-sm">Phone: (555) 123-4567</p>
          <p className="text-sm">Email: info@medai.com</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
          <ul className="text-sm space-y-2">
            <li><a href="#" className="hover:text-blue-300 transition-colors">Services</a></li>
            <li><a href="#" className="hover:text-blue-300 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-blue-300 transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-blue-300 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
              </svg>
            </a>
            <a href="#" className="hover:text-blue-300 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c-5.39 0-9.837 4.447-9.837 9.837 0 4.35 2.88 8.04 6.865 9.34.503.094.684-.219.684-.484 0-.237-.009-.866-.014-1.7-2.794.607-3.386-1.347-3.386-1.347-.456-1.158-1.114-1.466-1.114-1.466-.911-.622.069-.61.069-.61 1.007.07 1.538 1.035 1.538 1.035.896 1.535 2.352 1.091 2.925.834.091-.648.35-1.091.637-1.342-2.225-.253-4.566-1.113-4.566-4.952 0-1.093.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.545 1.377.203 2.394.1 2.647.64.698 1.028 1.588 1.028 2.682 0 3.848-2.339 4.695-4.566 4.942.359.309.678.92.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.578.688.482A9.837 9.837 0 0022 12c0-5.39-4.447-9.837-9.837-9.837z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 text-center text-sm text-blue-200">
        <p>© 2025 MedAiCare. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default FooterComponent;
