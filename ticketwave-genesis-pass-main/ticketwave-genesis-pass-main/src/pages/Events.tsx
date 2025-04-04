
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Plus } from 'lucide-react';

// Mock data for multiple events
const initialEvents = [
  {
    id: 1,
    title: 'Genesis NFT Concert Experience',
    date: 'April 15, 2025',
    location: 'Jawaharlal Nehru Stadium, New Delhi',
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    description: 'Join us for an unforgettable night featuring top electronic artists and an immersive visual experience.',
    capacity: 500,
    featured: true
  },
  {
    id: 2,
    title: 'Blockchain Music Festival',
    date: 'June 20, 2025',
    location: 'Bandra Kurla Complex, Mumbai',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    description: 'A three-day festival celebrating the intersection of music and blockchain technology.',
    capacity: 1500,
    featured: false
  },
  {
    id: 3,
    title: 'Digital Art Exhibition',
    date: 'August 5, 2025',
    location: 'Palace Grounds, Bengaluru',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    description: 'Explore NFT artwork from leading digital artists in an immersive gallery experience.',
    capacity: 300,
    featured: false
  }
];

const Events = () => {
  const [events, setEvents] = useState(initialEvents);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">
              <span className="border-b-2 border-purple pb-1">Upcoming Events</span>
            </h1>
            <Button 
              onClick={() => navigate('/add-event')}
              className="bg-purple hover:bg-purple-dark text-white"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Event
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card key={event.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className="relative h-48 overflow-hidden">
                  {event.featured && (
                    <div className="absolute top-2 right-2 z-10 bg-gold text-white text-xs font-bold px-2 py-1 rounded">
                      Featured
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      <span>{event.date}</span>
                      <span className="mx-2">•</span>
                      <MapPin className="h-3.5 w-3.5 mr-1" />
                      <span>{event.location}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{event.description}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-3.5 w-3.5 mr-1" />
                    <span>Limited to {event.capacity} attendees</span>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    className="w-full bg-purple hover:bg-purple-dark text-white"
                    onClick={() => navigate(`/event/${event.id}`)}
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Events;
