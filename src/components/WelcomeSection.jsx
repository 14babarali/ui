import React from 'react';

const WelcomeSection = () => {
  return (
    <section className="bg-white py-16 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto text-center">
      <div className="max-w-4xl mx-auto">
        {/* Animated heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900 mb-6 leading-tight animate-fadeIn">
          We're Welcoming New Doctors <br className="hidden sm:block" />
          <span className="relative inline-block">
            <span className="relative z-10">And Can't Wait To Meet You</span>
            <span className="absolute bottom-0 left-0 w-full h-2 bg-blue-100 z-0 opacity-70 animate-underline"></span>
          </span>
        </h2>
        
        {/* Enhanced paragraph */}
        <p className="text-gray-600 text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed animate-fadeIn delay-100">
          We use only the <span className="font-semibold text-blue-600">best quality materials</span> and cutting-edge 
          technology to provide <span className="font-semibold text-blue-600">exceptional care</span> to our patients.
        </p>
        
        {/* Video container with hover effect */}
        <div className="relative rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 mb-8 animate-fadeIn delay-200">
          <div className="aspect-w-16 aspect-h-9">
            <video
              className="w-full h-auto object-cover"
              controls
              poster="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              preload="metadata"
            >
              <source src="your-video-url.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="bg-blue-600 bg-opacity-80 rounded-full p-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Enhanced CTA button */}
        <a 
          href="#" 
          className="mt-6 inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold py-3 px-8 rounded-full hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl animate-fadeIn delay-300"
        >
          Watch Our Story
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          </svg>
        </a>
        
        {/* Doctor badges */}
        {/* <div className="mt-12 flex flex-wrap justify-center gap-4 animate-fadeIn delay-400">
          {['Dr. Sarah Johnson', 'Dr. Michael Chen', 'Dr. Emily Wilson'].map((doctor, index) => (
            <div key={index} className="flex items-center bg-blue-50 rounded-full px-5 py-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-2">
                {doctor.charAt(4)}
              </div>
              <span className="text-blue-800 font-medium">{doctor}</span>
            </div>
          ))}
        </div> */}
      </div>
      
      {/* Animation styles */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
        @keyframes fadeIn {
          to { opacity: 1; transform: translateY(0); }
          from { opacity: 0; transform: translateY(10px); }
        }
        .animate-underline {
          animation: underlineGrow 1s ease-out forwards;
          transform-origin: left center;
        }
        @keyframes underlineGrow {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </section>
  );
};

export default WelcomeSection;