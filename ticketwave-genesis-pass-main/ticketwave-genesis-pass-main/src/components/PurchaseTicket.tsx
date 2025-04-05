import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import TicketContractABI from "../contracts/TicketContractABI.json"; // Adjust the path as needed

const PurchaseTicket: React.FC = () => {
  // State variables for loading, error messages, transaction hash, and ticket price
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [ticketPrice, setTicketPrice] = useState<string>("");

  // Sepolia network chain ID (11155111) in hex for MetaMask RPC calls
  const SEPOLIA_CHAIN_ID_HEX = "0xaa36a7";
  const CONTRACT_ADDRESS = "0xc4fB5755f381cdD61A28fAdA360fA26F104A542d";

  // On component mount, fetch the ticket price from the contract
  useEffect(() => {
    const fetchTicketPrice = async () => {
      if (typeof window.ethereum === "undefined") {
        setError("MetaMask is not installed.");
        return;
      }
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, TicketContractABI, provider);
        const priceBN = await contract.ticketPrice();
        // Set the price as a string (in wei)
        setTicketPrice(priceBN.toString());
      } catch (err: any) {
        setError("Failed to fetch ticket price.");
      }
    };
    fetchTicketPrice();
  }, []);

  // Function to handle ticket purchase
  const handlePurchase = async () => {
    setError(null);
    setTxHash(null);

    if (typeof window.ethereum === "undefined") {
      setError("MetaMask is not installed. Please install MetaMask to continue.");
      return;
    }

    setLoading(true);
    try {
      // Connect to MetaMask
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []); // Request account access

      // Ensure the wallet is connected to the Sepolia network (chainId 11155111)
      const network = await provider.getNetwork();
      if (network.chainId !== 11155111) {
        try {
          // Attempt to switch network to Sepolia
          await provider.send("wallet_switchEthereumChain", [{ chainId: SEPOLIA_CHAIN_ID_HEX }]);
        } catch (switchError: any) {
          if (switchError.code === 4902) {
            // If Sepolia is not added in MetaMask, attempt to add it
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

      // Get the signer (connected account)
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();

      // Create a contract instance with the signer (for write operations)
      const contract = new ethers.Contract(CONTRACT_ADDRESS, TicketContractABI, signer);

      // Call the mintTicket function with the user's address, sending exactly 100 wei as payment
      const tx = await contract.mintTicket(userAddress, { value: 100 });
      setTxHash(tx.hash); // Save the transaction hash for display

    } catch (err: any) {
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
    <div
      style={{
        maxWidth: "480px",
        margin: "2rem auto",
        fontFamily: "sans-serif",
        textAlign: "center",
      }}
    >
      <h2>Purchase Ticket</h2>

      {ticketPrice && (
        <p>
          <strong>Ticket Price:</strong> {ticketPrice} wei
        </p>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {txHash && (
        <p>
          ✅ Transaction sent! View on{" "}
          <a
            href={`https://sepolia.etherscan.io/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Etherscan
          </a>
          .
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
        }}
      >
        {loading ? "Purchasing..." : "Purchase Ticket"}
      </button>
    </div>
  );
};

export default PurchaseTicket;
