
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ = () => {
  const faqs = [
    {
      question: "What is an NFT ticket?",
      answer: "An NFT (Non-Fungible Token) ticket is a digital ticket stored on a blockchain. Unlike traditional tickets, NFT tickets are unique digital assets that provide proof of ownership, cannot be counterfeited, and can be traded or sold with full transparency."
    },
    {
      question: "How do I store my NFT ticket?",
      answer: "Your NFT ticket will be stored in your digital wallet (such as MetaMask or Coinbase Wallet). You'll need to provide your wallet address during purchase, and the NFT will be transferred directly to your wallet."
    },
    {
      question: "Can I transfer or sell my ticket?",
      answer: "Yes, you can transfer or sell your NFT ticket to someone else. Because it's blockchain-based, the transfer is secure and verifiable. However, please note that some tickets may have transfer restrictions or royalties that go back to the event organizers."
    },
    {
      question: "How do I use my NFT ticket at the venue?",
      answer: "At the venue, you'll show the QR code that's generated from your NFT ticket. Our staff will scan this code to verify ownership and grant entry. Make sure your digital wallet app is installed on your phone and accessible."
    },
    {
      question: "What happens to my NFT after the event?",
      answer: "After the event, your NFT becomes a digital collectible and proof that you attended. Some NFTs may unlock additional benefits or content over time, and they can appreciate in value as collectibles."
    },
    {
      question: "What if I lose access to my wallet?",
      answer: "It's crucial to keep your wallet seed phrase (recovery words) in a safe place. If you lose access to your wallet, you can recover it using these words. Without them, there's no way to recover your NFTs or other digital assets."
    },
    {
      question: "Do I need cryptocurrency to purchase a ticket?",
      answer: "No, you can purchase tickets using a regular credit card. We'll handle the blockchain interaction for you. However, you will need a digital wallet to receive the NFT ticket."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          Everything you need to know about our NFT-powered event tickets.
        </p>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 hover:no-underline">
                  <span className="font-medium text-left">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <button className="text-purple hover:text-purple-dark font-medium underline underline-offset-4">
            Contact our support team
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
