
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check, Info } from 'lucide-react';

const PurchaseTicket = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Get Your Ticket
        </h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          Secure your spot at this exclusive event and claim your unique NFT ticket.
        </p>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-secondary rounded-lg p-8">
            <h3 className="text-xl font-bold mb-6">Ticket Options</h3>
            
            <div className="space-y-6">
              <div className="flex items-center p-4 border border-gray-200 rounded-lg bg-white hover:border-purple transition-colors cursor-pointer">
                <div className="w-5 h-5 rounded-full border border-purple flex items-center justify-center mr-4">
                  <div className="w-3 h-3 rounded-full bg-purple"></div>
                </div>
                <div className="flex-1">
                  <div className="font-medium">Standard Access</div>
                  <div className="text-sm text-gray-500">General admission with NFT ticket</div>
                </div>
                <div className="font-bold">$150</div>
              </div>
              
              <div className="flex items-center p-4 border-2 border-purple rounded-lg bg-white shadow-md relative">
                <div className="absolute -top-3 -right-3 bg-purple text-white text-xs font-bold px-3 py-1 rounded-full">
                  POPULAR
                </div>
                <div className="w-5 h-5 rounded-full border border-purple flex items-center justify-center mr-4">
                  <div className="w-3 h-3 rounded-full bg-purple"></div>
                </div>
                <div className="flex-1">
                  <div className="font-medium">VIP Access</div>
                  <div className="text-sm text-gray-500">Premium seating, meet & greet, exclusive NFT</div>
                </div>
                <div className="font-bold">$350</div>
              </div>
              
              <div className="flex items-center p-4 border border-gray-200 rounded-lg bg-white hover:border-purple transition-colors cursor-pointer">
                <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center mr-4">
                </div>
                <div className="flex-1">
                  <div className="font-medium">Metaverse Access</div>
                  <div className="text-sm text-gray-500">Virtual attendance with interactive features</div>
                </div>
                <div className="font-bold">$75</div>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-purple/10 rounded-lg border border-purple/20 flex items-start">
              <Info className="h-5 w-5 text-purple flex-shrink-0 mt-0.5 mr-3" />
              <div className="text-sm">
                <p className="font-medium mb-1">NFT Ticket Benefits</p>
                <ul className="space-y-1 text-gray-600">
                  <li className="flex items-center">
                    <Check className="h-3.5 w-3.5 text-purple mr-1" /> Verifiable ownership on blockchain
                  </li>
                  <li className="flex items-center">
                    <Check className="h-3.5 w-3.5 text-purple mr-1" /> Transferable to other wallets
                  </li>
                  <li className="flex items-center">
                    <Check className="h-3.5 w-3.5 text-purple mr-1" /> Collectible digital memorabilia
                  </li>
                  <li className="flex items-center">
                    <Check className="h-3.5 w-3.5 text-purple mr-1" /> Access to future airdrops
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div>
            <form className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Personal Information</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="wallet">Wallet Address (for NFT delivery)</Label>
                  <Input id="wallet" placeholder="0x..." />
                  <p className="text-xs text-gray-500">We support Ethereum and Polygon networks</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Payment Details</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input id="cardName" placeholder="John Doe" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" />
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Button className="w-full bg-purple hover:bg-purple-dark text-white py-6">
                  Complete Purchase
                </Button>
                <p className="text-xs text-center text-gray-500 mt-2">
                  You'll receive your NFT ticket in your wallet within minutes
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PurchaseTicket;
