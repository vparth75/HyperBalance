"use client";

import { useState, useEffect } from "react";
import CountUp from "@/components/CountUp";

export default function Home() {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  
  const fullText = "The fastest DeFi math ever put on a blockchain.";
  
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 75);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentIndex(0);
        setDisplayedText("");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen font-sans text-white">
      <main className="flex w-full flex-col">
        
        {/* SECTION 1 - HERO */}
        <section className="flex items-start justify-between px-8 md:px-16 py-12 md:py-20 gap-12">
          <div className="flex flex-col items-start gap-6 text-left max-w-2xl">
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-white whitespace-nowrap">
                {displayedText}
                <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>
              </h1>
              <p className="text-lg md:text-xl text-zinc-300">
                Thanks to <span style={{ color: '#213147' }}>Arbitrum</span> <span style={{ color: '#e3066e' }}>Stylus</span>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-colors">
                Rebalance on-chain
              </button>
              <button className="px-8 py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
                View the technical docs
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 2 - PROBLEM */}
        <section className="px-8 md:px-16 py-24 border-t border-white/10">
          <div className="max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              On-chain automation is expensive and limited
            </h2>
            <p className="text-xl text-zinc-300 leading-relaxed">
              Solidity struggles with heavy math. Rebalancing complex portfolios on-chain is slow, costly, and impractical — which keeps advanced strategies out of reach for most DeFi users.
            </p>
          </div>
        </section>

        {/* SECTION 3 - SOLUTION */}
        <section className="px-8 md:px-16 py-24 border-t border-white/10">
          <div className="max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Stylus unlocks real computational power
            </h2>
            <p className="text-xl text-zinc-300 leading-relaxed">
              By executing heavy math in Rust compiled to WebAssembly, we reduce on-chain compute cost drastically while keeping everything verifiable and trustless.
            </p>
          </div>
        </section>

        {/* SECTION 4 - HOW IT WORKS */}
        <section className="px-8 md:px-16 py-24 border-t border-white/10">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            How it works
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="flex flex-col items-center text-center p-8 border border-white/20 rounded-xl bg-white/5">
              <div className="text-6xl font-bold text-[#e3066e] mb-4">1</div>
              <h3 className="text-xl font-semibold mb-3">User selects target allocation</h3>
            </div>
            <div className="flex flex-col items-center text-center p-8 border border-white/20 rounded-xl bg-white/5">
              <div className="text-6xl font-bold text-[#e3066e] mb-4">2</div>
              <h3 className="text-xl font-semibold mb-3">Rust engine computes optimal swap amounts on-chain</h3>
            </div>
            <div className="flex flex-col items-center text-center p-8 border border-white/20 rounded-xl bg-white/5">
              <div className="text-6xl font-bold text-[#e3066e] mb-4">3</div>
              <h3 className="text-xl font-semibold mb-3">Smart contract executes swaps atomically</h3>
            </div>
          </div>
        </section>

        {/* SECTION 5 - PERFORMANCE PROOF */}
        <section className="px-8 md:px-16 py-24 border-t border-white/10">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Gas cost comparison
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 max-w-4xl mx-auto justify-center">
            {/* Solidity card */}
            <div className="flex flex-col items-center justify-center px-8 py-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <p className="text-sm text-gray-400">Solidity compute</p>
              <p className="text-4xl font-semibold text-red-400 mt-2">
                $<CountUp from={0} to={5.42} duration={2} separator="," />
              </p>
            </div>

            {/* Stylus card */}
            <div className="flex flex-col items-center justify-center px-8 py-6 rounded-2xl bg-blue-600/20 border border-blue-500/30 backdrop-blur-sm">
              <p className="text-sm text-gray-300">Stylus compute</p>
              <p className="text-4xl font-semibold text-blue-400 mt-2">
                $<CountUp from={0} to={0.21} duration={2} separator="," />
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 6 - ARCHITECTURE DIAGRAM */}
        <section className="px-8 md:px-16 py-24 border-t border-white/10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            On-chain computation, off-chain speed
          </h2>
          <p className="text-xl text-zinc-400 text-center mb-12">
            Frontend → Stylus (Rust/WASM math) → DEX Router (Solidity)
          </p>
          <div className="max-w-4xl mx-auto h-64 border border-white/20 rounded-xl flex items-center justify-center bg-white/5">
            <span className="text-zinc-500">Architecture Diagram Placeholder</span>
          </div>
        </section>

        {/* SECTION 7 - SECURITY / TRUSTLESSNESS */}
        <section className="px-8 md:px-16 py-24 border-t border-white/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              No backend. No trust required.
            </h2>
            <p className="text-xl text-zinc-300 leading-relaxed">
              The calculation happens on-chain, inside the transaction. No servers. No off-chain compute. No hidden logic.
            </p>
          </div>
        </section>

        {/* SECTION 8 - ROADMAP */}
        <section className="px-8 md:px-16 py-24 border-t border-white/10">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Roadmap
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-start gap-4 p-6 border border-white/20 rounded-xl bg-white/5">
              <div className="w-3 h-3 rounded-full bg-[#e3066e] mt-2 flex-shrink-0"></div>
              <p className="text-xl text-zinc-300">Multi-asset portfolios</p>
            </div>
            <div className="flex items-start gap-4 p-6 border border-white/20 rounded-xl bg-white/5">
              <div className="w-3 h-3 rounded-full bg-[#e3066e] mt-2 flex-shrink-0"></div>
              <p className="text-xl text-zinc-300">Strategy modules: risk-parity, momentum triggers</p>
            </div>
            <div className="flex items-start gap-4 p-6 border border-white/20 rounded-xl bg-white/5">
              <div className="w-3 h-3 rounded-full bg-[#e3066e] mt-2 flex-shrink-0"></div>
              <p className="text-xl text-zinc-300">DEX integrations: Uniswap, GMX</p>
            </div>
          </div>
        </section>

        {/* SECTION 9 - FOOTER */}
        <footer className="px-8 md:px-16 py-12 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-6xl mx-auto">
            <div className="text-2xl font-bold">HyperBalance</div>
            <div className="flex gap-8 text-lg">
              <a href="#" className="text-zinc-300 hover:text-white transition-colors">GitHub</a>
              <a href="#" className="text-zinc-300 hover:text-white transition-colors">Docs</a>
              <a href="#" className="text-zinc-300 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}
