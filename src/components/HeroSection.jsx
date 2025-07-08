import React from 'react';
import { Images } from '../assets';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <main className="flex flex-col md:flex-row items-center justify-between px-6 py-12 md:p-12 max-w-7xl mx-auto gap-8">
      {/* Text Section */}
      <div className="text-center md:text-left md:w-1/2 space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
          Get Ready For Your <span className="text-blue-600">Best</span> Healthcare Experience
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed max-w-lg mx-auto md:mx-0">
          We use only the best quality materials and cutting-edge technology to provide excellent care to our patients.
          Don't worry about anything — book your appointment today.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <Link 
            to="/signup" 
            className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg hover:shadow-blue-500/30"
          >
            Sign Up Now
          </Link>
          <Link 
            to="/about" 
            className="border-2 border-blue-600 text-blue-600 py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors font-medium"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Image & Animated Circle Section */}
      <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] flex items-center justify-center">
        {/* Background Circle */}
        <div className="absolute w-full h-full bg-blue-100 rounded-full"></div>
        
        {/* Outer Dashed Circle */}
        <div className="absolute w-[90%] h-[90%] border-4 border-blue-300 border-dashed rounded-full animate-spin-slow"></div>
        
        {/* Main Image Container */}
        <div className="relative w-[80%] h-[80%] bg-blue-600 rounded-full flex items-center justify-center overflow-hidden z-20">
          <img
            src={Images.headerimg}
            alt="Modern Healthcare Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Large Orbiting Dots - Full Orbit */}
        {[...Array(5)].map((_, index) => (
          <div
            key={`dot-${index}`}
            className="absolute w-6 h-6 bg-blue-500 rounded-full shadow-lg"
            style={{
              animation: `orbit 8s linear infinite`,
              animationDelay: `${index * 1.5}s`,
              transformOrigin: 'center center',
            }}
          ></div>
        ))}

        {/* Medium Orbiting Dots - Half Orbit */}
        {[...Array(3)].map((_, index) => (
          <div
            key={`half-dot-${index}`}
            className="absolute w-4 h-4 bg-blue-400 rounded-full shadow-md"
            style={{
              animation: `halfOrbit 10s linear infinite`,
              animationDelay: `${index * 2}s`,
              transformOrigin: 'center center',
            }}
          ></div>
        ))}
      </div>

      {/* Animation CSS */}
      <style>
        {`
          @keyframes orbit {
            0% { transform: rotate(0deg) translateX(180px) rotate(0deg); }
            100% { transform: rotate(360deg) translateX(180px) rotate(-360deg); }
          }

          @keyframes halfOrbit {
            0% { transform: rotate(0deg) translateX(140px) rotate(0deg); }
            50% { transform: rotate(180deg) translateX(140px) rotate(-180deg); }
            100% { transform: rotate(360deg) translateX(140px) rotate(-360deg); }
          }

          .animate-spin-slow {
            animation: spin 15s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @media (max-width: 640px) {
            @keyframes orbit {
              0% { transform: rotate(0deg) translateX(120px) rotate(0deg); }
              100% { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
            }
            @keyframes halfOrbit {
              0% { transform: rotate(0deg) translateX(90px) rotate(0deg); }
              50% { transform: rotate(180deg) translateX(90px) rotate(-180deg); }
              100% { transform: rotate(360deg) translateX(90px) rotate(-360deg); }
            }
          }
        `}
      </style>
    </main>
  );
};

export default HeroSection;