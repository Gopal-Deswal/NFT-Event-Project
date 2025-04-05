import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import EventTicketABI from '../abis/EventTicketABI.json';  // Import the ABI

const contractAddress = '0xc4fB5755f381cdD61A28fAdA360fA26F104A542d';  // Sepolia contract

function PurchaseTicket() {
  // State variables for loading status, transaction hash, and ticket price
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [ticketPrice, setTicketPrice] = useState<string | null>(null);

  useEffect(() => {
    // On component mount, load the ticket price from the contract (read-only)
    const fetchPrice = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const contract = new ethers.Contract(contractAddress, EventTicketABI, provider);
          const priceBN = await contract.ticketPrice();  // Fetch ticket price (BigNumber)
          // Convert price to ether string for display (if needed)
          const priceEther = ethers.utils.formatEther(priceBN);
          setTicketPrice(priceEther);
        } catch (err) {
          console.error('Error fetching ticket price:', err);
        }
      }
    };
    fetchPrice();
  }, []);

  const purchaseTicket = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('MetaMask is required to purchase a ticket.');
      return;
    }
    try {
      setLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // Request MetaMask accounts access
      await provider.send('eth_requestAccounts', []);  // Prompts user to connect MetaMask&#8203;:contentReference[oaicite:2]{index=2}
      const signer = provider.getSigner();
      
      // Ensure the user is on Sepolia network (optional check)
      const network = await provider.getNetwork();
      if (network.chainId !== 11155111) {
        alert('Please switch MetaMask to the Sepolia network.');
        setLoading(false);
        return;
      }

      // Instantiate contract with signer for write operation
      const contract = new ethers.Contract(contractAddress, EventTicketABI, signer);
      // Fetch the current ticket price (in Wei as BigNumber)
      const priceBN = await contract.ticketPrice();
      const userAddress = await signer.getAddress();
      
      // Call mintTicket, sending the value (ticket price) along with the transaction
      const txResponse = await contract.mintTicket(userAddress, { value: priceBN });
      setTxHash(txResponse.hash);  // Store transaction hash to display to user
      console.log('Transaction sent, hash:', txResponse.hash);

      // Wait for transaction confirmation (optional: you could wait for at least 1 block confirmation)
      await txResponse.wait();
      console.log('Transaction confirmed');
      // (You might add additional logic here for after a successful purchase, e.g., refresh UI)
      
    } catch (error) {
      console.error('Transaction failed:', error);
      alert(`Purchase failed: ${error instanceof Error ? error.message : error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Display the ticket price if available */}
      {ticketPrice && <p>Ticket Price: {ticketPrice} ETH</p>}

      {/* Purchase button triggers the purchaseTicket function */}
      <button onClick={purchaseTicket} disabled={loading}>
        {loading ? 'Purchasing…' : 'Purchase Ticket'}
      </button>

      {/* Show loading state or transaction result messages */}
      {loading && <p>Transaction is being processed...</p>}
      {txHash && !loading && (
        <p>
          ✅ Transaction sent! Hash: <a href={`https://sepolia.etherscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer">{txHash}</a>
        </p>
      )}
    </div>
  );
}

export default PurchaseTicket;
