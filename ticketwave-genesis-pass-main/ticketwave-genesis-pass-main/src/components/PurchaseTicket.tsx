import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import TicketContractABI from "../contracts/TicketContractABI.json"; // Ensure this path is correct

const PurchaseTicket: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [ticketPrice, setTicketPrice] = useState<string>("");
  const [selectedTier, setSelectedTier] = useState<string>("standard");

  // Ticket tier options
  const ticketTiers = [
    { id: "standard", name: "Standard Access", description: "General admission with NFT ticket", price: 150 },
    { id: "vip", name: "VIP Access", description: "Premium seating, meet & greet, exclusive NFT", price: 350, popular: true },
    { id: "metaverse", name: "Metaverse Access", description: "Virtual attendance with interactive features", price: 75 }
  ];

  // Sepolia network chain ID (11155111) in hex for MetaMask RPC calls
  const SEPOLIA_CHAIN_ID_HEX = "0xaa36a7";
  const CONTRACT_ADDRESS = "0xc4fB5755f381cdD61A28fAdA360fA26F104A542d";

  // Fetch ticket price on component mount
  useEffect(() => {
    const fetchTicketPrice = async () => {
      if (typeof window.ethereum === "undefined") {
        setError("MetaMask is not installed.");
        return;
      }
      try {
        // Using ethers v5: Web3Provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, TicketContractABI, provider);
        const priceBN = await contract.ticketPrice();
        setTicketPrice(priceBN.toString());
      } catch (err: any) {
        setError("Failed to fetch ticket price.");
        console.error(err);
      }
    };
    fetchTicketPrice();
  }, []);

  const handlePurchase = async () => {
    setError(null);
    setTxHash(null);

    if (typeof window.ethereum === "undefined") {
      setError("MetaMask is not installed. Please install MetaMask to continue.");
      return;
    }

    setLoading(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []); // Request account access

      // Check network
      const network = await provider.getNetwork();
      console.log("Connected network:", network);
      if (network.chainId !== 11155111) {
        try {
          await provider.send("wallet_switchEthereumChain", [{ chainId: SEPOLIA_CHAIN_ID_HEX }]);
        } catch (switchError: any) {
          if (switchError.code === 4902) {
            try {
              await provider.send("wallet_addEthereumChain", [{
                chainId: SEPOLIA_CHAIN_ID_HEX,
                chainName: "Sepolia Test Network",
                nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
                rpcUrls: ["https://ethereum-sepolia.publicnode.com"],
                blockExplorerUrls: ["https://sepolia.etherscan.io/"]
              }]);
              await provider.send("wallet_switchEthereumChain", [{ chainId: SEPOLIA_CHAIN_ID_HEX }]);
            } catch (addError: any) {
              throw new Error("Failed to add the Sepolia network. Please add it manually in MetaMask.");
            }
          } else if (switchError.code === 4001) {
            throw new Error("Please switch to the Sepolia network in MetaMask to continue.");
          } else {
            throw new Error(`Network switch failed: ${switchError.message || switchError}`);
          }
        }
      }

      const signer = provider.getSigner();
      const userAddress = await signer.getAddress();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, TicketContractABI, signer);

      // Find the selected tier price in wei (assume API expects value in wei)
      const selectedTierObj = ticketTiers.find(tier => tier.id === selectedTier);
      const priceInWei = ethers.utils.parseEther(selectedTierObj?.price.toString() || "0.0001");

      // Call mintTicket with the value from selected tier
      const tx = await contract.mintTicket(userAddress, { value: priceInWei });
      setTxHash(tx.hash);
      console.log("Transaction sent:", tx.hash);
    } catch (err: any) {
      console.error("Error during purchase:", err);
      if (err.code === 4001) {
        setError("Request was rejected by the user.");
      } else {
        setError(err.message || "Transaction failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h2 style={{ textAlign: "center" }}>Select Ticket Tier</h2>
      
      <div style={{ marginBottom: "2rem" }}>
        {ticketTiers.map((tier) => (
          <div 
            key={tier.id}
            style={{ 
              border: `1px solid ${selectedTier === tier.id ? '#6b46c1' : '#e2e8f0'}`,
              borderRadius: '0.5rem',
              padding: '1rem',
              marginBottom: '1rem',
              position: 'relative',
              backgroundColor: selectedTier === tier.id ? '#f8f4ff' : '#fff'
            }}
            onClick={() => setSelectedTier(tier.id)}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div 
                  style={{ 
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: '2px solid #6b46c1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '12px'
                  }}
                >
                  {selectedTier === tier.id && (
                    <div style={{ 
                      width: '10px', 
                      height: '10px', 
                      borderRadius: '50%', 
                      backgroundColor: '#6b46c1' 
                    }} />
                  )}
                </div>
                <div>
                  <h3 style={{ margin: '0 0 4px 0' }}>{tier.name}</h3>
                  <p style={{ margin: '0', color: '#718096' }}>{tier.description}</p>
                </div>
              </div>
              <div style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>${tier.price}</div>
            </div>
            {tier.popular && (
              <div style={{ 
                position: 'absolute', 
                top: '-12px', 
                right: '12px', 
                backgroundColor: '#6b46c1', 
                color: 'white', 
                padding: '4px 12px', 
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                POPULAR
              </div>
            )}
          </div>
        ))}
      </div>

      {ticketPrice && (
        <p style={{ textAlign: "center" }}>
          <small>Contract base price: {ticketPrice} wei</small>
        </p>
      )}
      
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      
      {txHash && (
        <p style={{ textAlign: "center" }}>
          ✅ Transaction sent! View on{" "}
          <a href={`https://sepolia.etherscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer">
            Etherscan
          </a>.
        </p>
      )}
      
      <button
        onClick={handlePurchase}
        disabled={loading}
        style={{ 
          padding: "12px 20px", 
          fontSize: "16px", 
          cursor: loading ? "not-allowed" : "pointer", 
          marginTop: "1rem",
          backgroundColor: "#6b46c1",
          color: "white",
          border: "none",
          borderRadius: "8px",
          display: "block",
          width: "100%",
          fontWeight: "bold"
        }}
      >
        {loading ? "Processing..." : `Purchase ${selectedTier.charAt(0).toUpperCase() + selectedTier.slice(1)} Ticket`}
      </button>
    </div>
  );
};

export default PurchaseTicket;
