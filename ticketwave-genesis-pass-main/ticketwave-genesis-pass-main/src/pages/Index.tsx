
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import EventDetails from '@/components/EventDetails';
import NFTTicket from '@/components/NFTTicket';
import PurchaseTicket from '@/components/PurchaseTicket';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      document.documentElement.style.setProperty(
        '--scroll-y', `${scrollPosition}px`
      );
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <EventDetails />
      <NFTTicket />
      <PurchaseTicket />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
