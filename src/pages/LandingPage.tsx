
import React from 'react';
import HeaderComponent from '.././components/ui/HeaderComponent';
import HeroSection from '.././components/ui/HeroSection';
import WelcomeSection from '.././components/ui/WelcomeSection';
import ServicesSection from '.././components/ui/ServicesSection';
import ContactSection from '.././components/ui/ContactSection';
import ClientsSection from '.././components/ui/ClientsSection';
import FAQSection from '.././components/ui/FAQSection';
import FooterComponent from '.././components/ui/FooterComponent';

const LandingPage = () => {
  return (
    <div className=" bg-white">
      <HeaderComponent />
      <HeroSection />
      <WelcomeSection />
      <ServicesSection />
      <ContactSection />
      <ClientsSection />
      <FAQSection />
      <FooterComponent />
    </div>
  );
};

export default LandingPage;


