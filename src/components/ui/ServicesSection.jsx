  import React from 'react';

  const ServicesSection = () => {
    const services = [
      {
        title: "Signup",
        description: "Register quickly and start your journey with us.",
        icon: (
          <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
          </svg>
        ),
        link: "#",
      },
      {
        title: "Plan Subscription",
        description: "Choose the best plan that suits your needs.",
        icon: (
          <button className="bg-blue-600 text-white py-2 px-4 rounded text-sm hover:bg-blue-700 transition">
            SUBSCRIBE
          </button>
        ),
        link: "#",
      },
      {
        title: "24/7 Service",
        description: "We are here for you any time, any day.",
        icon: (
          <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
          </svg>
        ),
        link: "#",
      },
      {
        title: "Generate Prescription",
        description: "Quickly generate and manage prescriptions.",
        icon: (
          <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1zm-4.44-6.19l-5.01 5.01c-.31.31-.85.09-.85-.35V7.53c0-.44.54-.66.85-.35l4.12 4.12c.36.36.36.94 0 1.3z" />
          </svg>
        ),
        link: "#",
      },
      {
        title: "Patient Experiences",
        description: "Our patients share their stories and satisfaction with our service.",
        icon: (
          <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
          </svg>
        ),
        link: "#",
      },
    ];

    return (
      <section className="bg-gradient-to-br from-blue-50 to-transparent py-16 px-4 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Services</h2>

        {/* Top Row (First 3 services) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {services.slice(0, 3).map((service, idx) => (
            <div key={idx} className="text-center hover:scale-105 transition-transform duration-300">
              <div className="w-24 h-24 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{service.description}</p>
              <a href={service.link} className="text-blue-600 text-sm hover:underline">Learn More</a>
            </div>
          ))}
        </div>

        {/* Bottom Row (Last 2 services) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {services.slice(3).map((service, idx) => (
            <div key={idx} className="text-center hover:scale-105 transition-transform duration-300">
              <div className="w-24 h-24 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{service.description}</p>
              <a href={service.link} className="text-blue-600 text-sm hover:underline">Learn More</a>
            </div>
          ))}
        </div>
      </section>
    );
  };

  export default ServicesSection;
