import React from 'react';
import { Images } from '../../assets';
import { Phone,Mail ,User ,LogIn  } from 'lucide-react';

const HeaderComponent = () => {
  return (
    <>
    
    <div className="bg-blue-800 text-white text-sm">
       
       <div className="container mx-auto px-4 py-2 flex flex-col md:flex-row justify-between items-center">
         
         <div className="flex items-center space-x-4 mb-2 md:mb-0">
           <a href="tel:+1234567890" className="flex items-center hover:text-blue-200">
             <Phone className="h-4 w-4 mr-1" />
             <span>+1 (234) 567-890</span>
           </a>
           <a href="mailto:info@med-ai.com" className="flex items-center hover:text-blue-200">
             <Mail className="h-4 w-4 mr-1" />
             <span>info@med-ai.com</span>
           </a>
         </div>
       
       </div>
     </div>

     <header className="bg-blue-100 px-8 py-4 flex items-center justify-between w-full sticky top-0 z-50 shadow-md">
      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        <img src={Images.logoright} alt="MED-AI Logo" className="h-12 w-auto" />
      </div>

      {/* Navigation Menu */}
      <nav className="flex space-x-8 text-lg">
        <a href="#" className="text-blue-700 hover:text-blue-900 hover:underline transition-all">Home</a>
        <a href="#" className="text-blue-700 hover:text-blue-900 hover:underline transition-all">About</a>
        <a href="#" className="text-blue-700 hover:text-blue-900 hover:underline transition-all">Contact</a>
      </nav>
    </header>
     
     </>

  );
};

export default HeaderComponent;
