
import React, { useEffect, useRef } from 'react';
import { Music, Clock, Users, Star } from 'lucide-react';

const EventDetails = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          entry.target.classList.remove('opacity-0');
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observerRef.current?.observe(el));
    
    return () => {
      if (observerRef.current) {
        elements.forEach(el => observerRef.current?.unobserve(el));
      }
    };
  }, []);

  return (
    <section id="event" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 reveal opacity-0">
          <span className="inline-block border-b-2 border-purple pb-2">Event Details</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="reveal opacity-0" style={{ transitionDelay: '100ms' }}>
              <h3 className="text-2xl font-bold mb-4">Genesis NFT Concert Experience</h3>
              <p className="text-gray-600 leading-relaxed">
                Join us for an unforgettable night featuring top Indian electronic artists and an immersive visual experience 
                at the iconic Jawaharlal Nehru Stadium in New Delhi. This is the first concert in India where your 
                ticket is a collectible NFT, giving you access to exclusive digital content and future events.
              </p>
            </div>
            
            <div className="space-y-4 reveal opacity-0" style={{ transitionDelay: '200ms' }}>
              <div className="flex items-start">
                <Music className="h-5 w-5 text-purple mt-1 mr-3" />
                <div>
                  <h4 className="font-semibold">Featured Artists</h4>
                  <p className="text-gray-600">Nucleya, Divine, Ritviz</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-purple mt-1 mr-3" />
                <div>
                  <h4 className="font-semibold">Schedule</h4>
                  <p className="text-gray-600">Doors Open: 6:30 PM | Show Starts: 8:00 PM</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Users className="h-5 w-5 text-purple mt-1 mr-3" />
                <div>
                  <h4 className="font-semibold">Attendance</h4>
                  <p className="text-gray-600">Limited to 500 attendees</p>
                </div>
              </div>
            </div>
            
            <div className="reveal opacity-0" style={{ transitionDelay: '300ms' }}>
              <h4 className="font-semibold mb-2 flex items-center">
                <Star className="h-4 w-4 text-gold mr-2" /> VIP Benefits
              </h4>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>Early access to the venue</li>
                <li>Meet and greet with artists</li>
                <li>Exclusive limited edition NFT artwork</li>
                <li>Priority access to future events</li>
              </ul>
            </div>
          </div>
          
          <div className="reveal opacity-0 h-[500px] rounded-lg overflow-hidden shadow-xl relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-light/30 to-purple/60 z-10 mix-blend-multiply"></div>
            <img 
              src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
              alt="Concert" 
              className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
