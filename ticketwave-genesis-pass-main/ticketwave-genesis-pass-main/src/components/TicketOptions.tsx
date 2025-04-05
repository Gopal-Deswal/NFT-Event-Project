import React, { useState } from 'react';

const TicketOptions: React.FC = () => {
  // This state stores the currently selected ticket option:
  const [selectedOption, setSelectedOption] = useState<'standard' | 'vip' | 'metaverse'>('standard');

  return (
    <div className="space-y-6">
      {/* Standard Access Option */}
      <div
        onClick={() => setSelectedOption('standard')}
        className={`flex items-center p-4 border ${selectedOption === 'standard' ? 'border-purple' : 'border-gray-200'} rounded-lg bg-white hover:border-purple transition-colors cursor-pointer`}
      >
        <div className="w-5 h-5 rounded-full border border-purple flex items-center justify-center mr-4">
          {selectedOption === 'standard' && (
            <div className="w-3 h-3 rounded-full bg-purple"></div>
          )}
        </div>
        <div className="flex-1">
          <div className="font-medium">Standard Access</div>
          <div className="text-sm text-gray-500">General admission with NFT ticket</div>
        </div>
        <div className="font-bold">$150</div>
      </div>

      {/* VIP Access Option */}
      <div
        onClick={() => setSelectedOption('vip')}
        className={`relative flex items-center p-4 border-2 ${selectedOption === 'vip' ? 'border-purple' : 'border-gray-200'} rounded-lg bg-white shadow-md transition-colors cursor-pointer`}
      >
        <div className="absolute -top-3 -right-3 bg-purple text-white text-xs font-bold px-3 py-1 rounded-full">
          POPULAR
        </div>
        <div className="w-5 h-5 rounded-full border border-purple flex items-center justify-center mr-4">
          {selectedOption === 'vip' && (
            <div className="w-3 h-3 rounded-full bg-purple"></div>
          )}
        </div>
        <div className="flex-1">
          <div className="font-medium">VIP Access</div>
          <div className="text-sm text-gray-500">Premium seating, meet &amp; greet, exclusive NFT</div>
        </div>
        <div className="font-bold">$350</div>
      </div>

      {/* Metaverse Access Option */}
      <div
        onClick={() => setSelectedOption('metaverse')}
        className={`flex items-center p-4 border ${selectedOption === 'metaverse' ? 'border-purple' : 'border-gray-200'} rounded-lg bg-white hover:border-purple transition-colors cursor-pointer`}
      >
        <div className="w-5 h-5 rounded-full border border-purple flex items-center justify-center mr-4">
          {selectedOption === 'metaverse' && (
            <div className="w-3 h-3 rounded-full bg-purple"></div>
          )}
        </div>
        <div className="flex-1">
          <div className="font-medium">Metaverse Access</div>
          <div className="text-sm text-gray-500">Virtual attendance with interactive features</div>
        </div>
        <div className="font-bold">$75</div>
      </div>
    </div>
  );
};

export default TicketOptions;
