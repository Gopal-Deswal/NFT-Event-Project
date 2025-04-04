
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin } from 'lucide-react';

const Hero = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollY = window.scrollY;
        const element = parallaxRef.current;
        element.style.transform = `translateY(${scrollY * 0.4}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Parallax Background */}
      <div className="absolute inset-0 z-0">
        <div 
          ref={parallaxRef} 
          className="w-full h-[120%] bg-cover bg-center"
          style={{ 
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
            url('https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')` 
          }}
        />
      </div>
      
      {/* Content */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-4">
        <div className="text-center text-white max-w-3xl animate-fade-in">
          <div className="mb-4 inline-block">
            <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm py-2 px-4 rounded-full mb-8 border border-white/20">
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">April 15, 2025</span>
              <div className="w-1 h-1 rounded-full bg-white/50"></div>
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-medium">Jawaharlal Nehru Stadium, New Delhi</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="block">Genesis</span> 
            <span className="text-gold">NFT Concert</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/80 max-w-2xl mx-auto">
            Experience the future of live events with blockchain-verified tickets 
            and exclusive digital collectibles.
          </p>
          <div className="space-x-4">
            <Button size="lg" className="bg-purple hover:bg-purple-dark text-white px-8">
              Get Tickets
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white rounded-full mt-2 animate-pulse-light"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
