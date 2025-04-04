
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Ticket, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 shadow-md backdrop-blur-md py-3' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <Ticket className="h-6 w-6 text-purple" />
          <span className="font-bold text-xl">TicketWave</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`text-sm font-medium hover:text-purple transition-colors ${location.pathname === '/' ? 'text-purple' : ''}`}
          >
            HOME
          </Link>
          <Link 
            to="/events" 
            className={`text-sm font-medium hover:text-purple transition-colors ${location.pathname === '/events' ? 'text-purple' : ''}`}
          >
            EVENTS
          </Link>
          <a href="#faq" className="text-sm font-medium hover:text-purple transition-colors">FAQ</a>
          <Link to="/add-event">
            <Button className="bg-purple hover:bg-purple-dark text-white">
              ADD EVENT
            </Button>
          </Link>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white pt-20 pb-6 px-6 animate-fade-in">
          <div className="flex flex-col space-y-6">
            <Link 
              to="/" 
              className={`text-lg font-medium hover:text-purple transition-colors ${location.pathname === '/' ? 'text-purple' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              HOME
            </Link>
            <Link 
              to="/events" 
              className={`text-lg font-medium hover:text-purple transition-colors ${location.pathname === '/events' ? 'text-purple' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              EVENTS
            </Link>
            <a 
              href="#faq" 
              className="text-lg font-medium hover:text-purple transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </a>
            <Link to="/add-event" onClick={() => setMobileMenuOpen(false)}>
              <Button className="bg-purple hover:bg-purple-dark text-white w-full">
                ADD EVENT
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
