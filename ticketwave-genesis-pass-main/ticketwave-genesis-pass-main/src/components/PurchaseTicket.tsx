import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import TicketContractABI from "../contracts/TicketContractABI.json"; // Ensure the path is correct

const PurchaseTicket: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [ticketPrice, setTicketPrice] = useState<string>("");

  // Sepolia network chain ID (11155111) in hex
  const SEPOLIA_CHAIN_ID_HEX = "0xaa36a7";
  const CONTRACT_ADDRESS = "0xc4fB5755f381cdD61A28fAdA360fA26F104A542d";

  // Fetch ticket price on component mount
  useEffect(() => {
    const fetchTicketPrice = async () => {
      if (typeof window.ethereum === "undefined") {
        setError("MetaMask is not installed.");
        console.error("MetaMask is not installed.");
        return;
      }
      try {
        console.log("Fetching ticket price...");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, TicketContractABI, provider);
        const priceBN = await contract.ticketPrice();
        console.log("Ticket price (in wei):", priceBN.toString());
        setTicketPrice(priceBN.toString());
      } catch (err: any) {
        setError("Failed to fetch ticket price.");
        console.error("Failed to fetch ticket price:", err);
      }
    };
    fetchTicketPrice();
  }, []);

  const handlePurchase = async () => {
    setError(null);
    setTxHash(null);
    console.log("handlePurchase called");

    if (typeof window.ethereum === "undefined") {
      setError("MetaMask is not installed. Please install MetaMask to continue.");
      console.error("MetaMask is not installed.");
      return;
    }

    setLoading(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log("Requesting account access...");
      await provider.send("eth_requestAccounts", []); // Request account access

      // Check current network
      const network = await provider.getNetwork();
      console.log("Connected network:", network);
      if (network.chainId !== 11155111) {
        console.warn("Network is not Sepolia. Attempting to switch...");
        try {
          await provider.send("wallet_switchEthereumChain", [{ chainId: SEPOLIA_CHAIN_ID_HEX }]);
          console.log("Switched to Sepolia");
        } catch (switchError: any) {
          console.error("Switch error:", switchError);
          if (switchError.code === 4902) {
            try {
              console.log("Adding Sepolia network...");
              await provider.send("wallet_addEthereumChain", [{
                chainId: SEPOLIA_CHAIN_ID_HEX,
                chainName: "Sepolia Test Network",
                nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
                rpcUrls: ["https://ethereum-sepolia.publicnode.com"],
                blockExplorerUrls: ["https://sepolia.etherscan.io/"]
              }]);
              await provider.send("wallet_switchEthereumChain", [{ chainId: SEPOLIA_CHAIN_ID_HEX }]);
              console.log("Network added and switched to Sepolia");
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
      console.log("User address:", userAddress);
      
      const contract = new ethers.Contract(CONTRACT_ADDRESS, TicketContractABI, signer);
      console.log("Calling mintTicket with value 100 wei...");
      
      // Call mintTicket with exactly 100 wei
      const tx = await contract.mintTicket(userAddress, { value: 100 });
      console.log("Transaction sent, hash:", tx.hash);
      setTxHash(tx.hash);
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
    <div style={{ maxWidth: "480px", margin: "2rem auto", fontFamily: "sans-serif", textAlign: "center" }}>
      <h2>Purchase Ticket</h2>
      {ticketPrice && <p><strong>Ticket Price:</strong> {ticketPrice} wei</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {txHash && (
        <p>
          ✅ Transaction sent! View on{" "}
          <a href={`https://sepolia.etherscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer">
            Etherscan
          </a>.
        </p>
      )}
      <button
        onClick={handlePurchase}
        disabled={loading}
        style={{ padding: "12px 20px", fontSize: "16px", cursor: loading ? "not-allowed" : "pointer", marginTop: "1rem" }}
      >
        {loading ? "Purchasing..." : "Purchase Ticket"}
      </button>
    </div>
  );
};

export default PurchaseTicket;
