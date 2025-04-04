
import React from 'react';
import { Ticket, Instagram, Twitter, Facebook, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Ticket className="h-6 w-6 text-purple" />
              <span className="font-bold text-xl">TicketWave India</span>
            </div>
            <p className="text-gray-400 text-sm">
              India's pioneer in blockchain-based event ticketing.
              Secure, verifiable, and collectible tickets for unforgettable experiences across the nation.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-purple transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-purple transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-purple transition-colors">NFT Collection</a></li>
              <li><a href="#" className="hover:text-purple transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-purple transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Upcoming Events</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-purple transition-colors">Tech Summit Delhi</a></li>
              <li><a href="#" className="hover:text-purple transition-colors">NFT Festival Mumbai</a></li>
              <li><a href="#" className="hover:text-purple transition-colors">Digital Art Exhibition Bengaluru</a></li>
              <li><a href="#" className="hover:text-purple transition-colors">Web3 Conference Hyderabad</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-purple transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-purple transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-purple transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-purple transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Subscribe to our newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-gray-800 rounded-l-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-purple"
                />
                <button className="bg-purple hover:bg-purple-dark px-4 rounded-r-lg text-sm">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; 2025 TicketWave India. All rights reserved.</p>
          <p className="mt-2">Registered Office: 123 Tech Park, Cyber City, Gurugram, Haryana 122002</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
