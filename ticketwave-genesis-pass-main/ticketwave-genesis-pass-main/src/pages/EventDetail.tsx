
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, ArrowLeft, Star } from 'lucide-react';

// Mock data for the event details
const eventData = {
  id: 1,
  title: 'Genesis NFT Concert Experience',
  date: 'April 15, 2025',
  location: 'Jawaharlal Nehru Stadium, New Delhi',
  image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  description: 'Join us for an unforgettable night featuring top Indian electronic artists and an immersive visual experience at the iconic Jawaharlal Nehru Stadium in New Delhi. This is the first concert in India where your ticket is a collectible NFT, giving you access to exclusive digital content and future events.',
  capacity: 500,
  schedule: 'Doors Open: 6:30 PM | Show Starts: 8:00 PM',
  artists: 'Nucleya, Divine, Ritviz',
  vipBenefits: [
    'Early access to the venue',
    'Meet and greet with artists',
    'Exclusive limited edition NFT artwork',
    'Priority access to future events'
  ],
  featured: true
};

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // In a real app, we would fetch the event data using the ID
  // For now, we'll use our mock data
  const event = eventData;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            className="mb-6 flex items-center"
            onClick={() => navigate('/events')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Button>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative rounded-lg overflow-hidden h-[400px]">
              {event.featured && (
                <div className="absolute top-4 right-4 z-10 bg-gold text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                  Featured
                </div>
              )}
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-6">
              <h1 className="text-3xl md:text-4xl font-bold">{event.title}</h1>
              
              <div className="flex flex-col space-y-3">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-2 text-purple" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2 text-purple" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 mr-2 text-purple" />
                  <span>Limited to {event.capacity} attendees</span>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed">{event.description}</p>
              
              <Button 
                className="w-full bg-purple hover:bg-purple-dark text-white p-6"
                size="lg"
              >
                Get Tickets Now
              </Button>
            </div>
          </div>
          
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4">Event Schedule</h3>
              <p className="text-gray-600">{event.schedule}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4">Featured Artists</h3>
              <p className="text-gray-600">{event.artists}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Star className="h-5 w-5 text-gold mr-2" /> VIP Benefits
              </h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                {event.vipBenefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EventDetail;
