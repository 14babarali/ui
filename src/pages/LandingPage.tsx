
import React from 'react';
import HeaderComponent from '../components/HeaderComponent';
import HeroSection from '../components/HeroSection';
import WelcomeSection from '../components/WelcomeSection';
import ServicesSection from '../components/ServicesSection';
import ContactSection from '../components/ContactSection';
import ClientsSection from '../components/ClientsSection';
import FAQSection from '../components/FAQSection';
import FooterComponent from '../components/FooterComponent';

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


