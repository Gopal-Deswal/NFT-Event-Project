import React, { useState } from "react";
import { ethers } from "ethers";
import TicketContractABI from "../contracts/TicketContractABI.json";
import TicketOptions from "@/components/TicketOptions";

const PurchaseTicket: React.FC = () => {
  // State for feedback to the user
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  // Sepolia network chain ID (11155111) in hex, for MetaMask RPC calls
  const SEPOLIA_CHAIN_ID_HEX = "0xaa36a7";
  const CONTRACT_ADDRESS = "0xc4fB5755f381cdD61A28fAdA360fA26F104A542d";

  const handlePurchase = async () => {
    setError(null);
    setTxHash(null);

    // 1. Check for MetaMask
    if (typeof window.ethereum === "undefined") {
      setError("MetaMask is not installed. Please install MetaMask to continue.");
      return;
    }

    setLoading(true);
    try {
      // 2. Connect to MetaMask via ethers provider
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);  // Request account access

      // 3. Ensure the network is Sepolia (chainId 11155111)
      const network = await provider.getNetwork();
      if (network.chainId !== 11155111) {
        try {
          // Prompt MetaMask to switch to Sepolia
          await provider.send("wallet_switchEthereumChain", [{ chainId: SEPOLIA_CHAIN_ID_HEX }]);
        } catch (switchError: any) {
          // If the network is not added in MetaMask, error code 4902 will be thrown
          if (switchError.code === 4902) {
            try {
              // Prompt to add Sepolia network to MetaMask
              await provider.send("wallet_addEthereumChain", [{
                chainId: SEPOLIA_CHAIN_ID_HEX,
                chainName: "Sepolia Test Network",
                nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
                rpcUrls: ["https://ethereum-sepolia.publicnode.com"],
                blockExplorerUrls: ["https://sepolia.etherscan.io/"]
              }]);
              // After adding, try switching to Sepolia again
              await provider.send("wallet_switchEthereumChain", [{ chainId: SEPOLIA_CHAIN_ID_HEX }]);
            } catch (addError: any) {
              throw new Error("Failed to add the Sepolia network. Please add it manually in MetaMask.");
            }
          } else if (switchError.code === 4001) {
            // User rejected the network switch
            throw new Error("Please switch to the Sepolia network in MetaMask to continue.");
          } else {
            throw new Error(`Network switch failed: ${switchError.message || switchError}`);
          }
        }
      }

      // 4. Invoke the smart contract function to purchase the ticket
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, TicketContractABI, signer);

      // Here, we call mintTicket with the user's address, sending exactly 100 wei.
      const tx = await contract.mintTicket(userAddress, { value: 100 });
      setTxHash(tx.hash);  // Save transaction hash for confirmation display

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
    <div style={{ maxWidth: "480px", margin: "2rem auto", fontFamily: "sans-serif", textAlign: "center" }}>
      <h2>Purchase Ticket</h2>

      {/* Render Ticket Options (the custom checkbox component) */}
      <TicketOptions />

      {/* Status messages */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {txHash && (
        <p>
          ✅ Transaction sent! View on{" "}
          <a href={`https://sepolia.etherscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer">
            Etherscan
          </a>
          .
        </p>
      )}

      {/* Purchase button */}
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
