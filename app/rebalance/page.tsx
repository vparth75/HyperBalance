"use client";

import { useState } from "react";
import Logo from "@/components/Logo";
import Link from "next/link";

export default function RebalancePage() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      alert("Please install MetaMask to use this feature!");
      return;
    }

    try {
      setIsConnecting(true);

      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      // Switch to Arbitrum network (Chain ID: 42161)
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0xa4b1" }], // 42161 in hex
        });
      } catch (switchError: any) {
        // If network doesn't exist, add it
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0xa4b1",
                chainName: "Arbitrum One",
                nativeCurrency: {
                  name: "Ethereum",
                  symbol: "ETH",
                  decimals: 18,
                },
                rpcUrls: ["https://arb1.arbitrum.io/rpc"],
                blockExplorerUrls: ["https://arbiscan.io/"],
              },
            ],
          });
        } else {
          throw switchError;
        }
      }

      setWalletAddress(accounts[0]);
    } catch (error) {
      console.error("Error connecting wallet:", error);
      alert("Failed to connect wallet. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="min-h-screen flex flex-col text-white">
      {/* Header */}
      <header className="px-8 md:px-16 py-6 border-b border-white/10 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Logo width={40} height={40} />
          <span className="text-2xl font-bold">HyperBalance</span>
        </Link>

        <div>
          {!walletAddress ? (
            <button
              onClick={connectWallet}
              disabled={isConnecting}
              className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-white/10 rounded-lg border border-white/20">
                <span className="text-sm text-zinc-300">Arbitrum One</span>
              </div>
              <button
                onClick={disconnectWallet}
                className="px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors cursor-pointer border border-white/20"
              >
                {formatAddress(walletAddress)}
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="max-w-4xl w-full">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            Rebalance Your Portfolio
          </h1>

          {!walletAddress ? (
            <div className="text-center text-zinc-400 text-lg">
              <p>Please connect your wallet to continue</p>
            </div>
          ) : (
            <div className="border border-white/20 rounded-xl p-8 bg-white/5">
              <p className="text-zinc-300 text-center">
                Wallet connected! Rebalancing interface coming soon...
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// TypeScript declaration for ethereum provider
declare global {
  interface Window {
    ethereum?: any;
  }
}
