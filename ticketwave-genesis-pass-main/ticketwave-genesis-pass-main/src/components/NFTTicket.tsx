
import React, { useRef, useEffect } from 'react';
import { Ticket, QrCode, Calendar, MapPin } from 'lucide-react';

const NFTTicket = () => {
  const ticketRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ticket = ticketRef.current;
    if (!ticket) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = ticket.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;
      
      ticket.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };
    
    const handleMouseLeave = () => {
      ticket.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    };
    
    ticket.addEventListener('mousemove', handleMouseMove);
    ticket.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      ticket.removeEventListener('mousemove', handleMouseMove);
      ticket.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section id="tickets" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Your NFT Ticket
        </h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          Each ticket is a unique NFT that serves as your entry pass and a digital collectible 
          that will appreciate in value over time.
        </p>
        
        <div className="max-w-lg mx-auto">
          <div 
            ref={ticketRef}
            className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 ease-out ticket-3d"
            style={{ transformStyle: 'preserve-3d', transition: 'transform 0.3s ease' }}
          >
            <div className="ticket-border-animated p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <Ticket className="h-6 w-6 text-purple mr-2" />
                  <span className="font-bold text-lg">TicketWave</span>
                </div>
                <div className="text-xs text-gray-500">
                  NFT ID: #2025-0428
                </div>
              </div>
              
              <div className="mb-6 ticket-inner" style={{ transform: 'translateZ(20px)' }}>
                <h3 className="text-2xl font-bold mb-2 text-purple">Genesis NFT Concert</h3>
                <div className="flex items-center text-gray-600 mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">April 15, 2025 - 8:00 PM</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-sm">Crypto Arena, Los Angeles, CA</span>
                </div>
              </div>
              
              <div className="flex items-start justify-between">
                <div className="ticket-inner" style={{ transform: 'translateZ(20px)' }}>
                  <div className="text-sm font-semibold">VIP ACCESS</div>
                  <div className="text-xs text-gray-500">Section A, Row 1, Seat 15</div>
                </div>
                <div className="bg-white p-2 rounded-lg shadow-md ticket-inner" style={{ transform: 'translateZ(20px)' }}>
                  <QrCode className="h-24 w-24 text-black" />
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center ticket-inner" style={{ transform: 'translateZ(20px)' }}>
                <div className="text-xs text-gray-500">
                  Blockchain verified on Ethereum
                </div>
                <div className="text-sm font-medium">
                  <span className="text-purple">Transferable</span>
                </div>
              </div>
              
              <div className="ticket-shine"></div>
            </div>
          </div>
          
          <div className="mt-12 flex justify-center">
            <button className="bg-purple hover:bg-purple-dark text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center">
              <span className="mr-2">Purchase Ticket</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NFTTicket;
