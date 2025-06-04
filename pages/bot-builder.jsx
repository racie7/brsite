import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useAuthRedirect from '../utils/useAuthRedirect';
import Header from '../components/Header';


export default function BotBuilder() {
  const router = useRouter();
  useAuthRedirect();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Bot Builder', href: '/bot-builder' },
    { name: 'D trader', href: '/d-trader' },
    { name: 'Tutorials', href: '/tutorials' },
    { name: 'Analysis Tool', href: '/analysis-tool' },
    { name: 'DP Tool', href: '/dp-tool' },
    { name: 'Free Bots', href: '/bots' },
    { name: 'Copy Trading', href: '/copy-trading' },
    { name: 'Trading View', href: '/trading-view' },
    { name: 'Risk Manager', href: '/risk-manager' },
  ];

  return (
    <div className="min-h-screen bg-white text-blue-900">
      {/* Top Navbar */}
      <Header /> 

      {/* Bot Builder UI */}
      <main className="flex flex-col md:flex-row">
        {/* Left panel */}
        <aside className="w-full md:w-[250px] border-b md:border-b-0 md:border-r border-gray-300 bg-white p-4">
          <div className="font-bold text-lg bg-blue-800 text-white py-2 px-4 rounded">Quick strategy</div>
          <div className="mt-4">
            <input type="text" placeholder="Search" className="w-full p-2 text-sm border rounded mb-3" />
            <ul className="text-sm space-y-2">
              <li className="font-medium">Trade parameters</li>
              <li>Purchase conditions</li>
              <li>Sell conditions (optional)</li>
              <li>Restart trading conditions</li>
              <li>Analysis</li>
              <li>Utility</li>
            </ul>
          </div>
        </aside>

        {/* Workspace */}
        <section className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
            <h2 className="text-lg font-bold">1. Trade parameters</h2>
            <div className="space-x-2">
              <button>🔄</button>
              <button>📤</button>
              <button>📥</button>
              <button>➕</button>
              <button>🔍</button>
            </div>
          </div>

          <div className="bg-blue-100 p-4 rounded mb-4">
            <label className="block mb-2">Market: Derived ➡️ Continuous Indices ➡️ Volatility 1s Index</label>
            <label className="block mb-2">Trade Type: Up/Down (Rise/Fall)</label>
            <label className="block mb-2">Contract Type: Both</label>
            <label className="block mb-2">Default Candle Interval: 1 minute</label>
            <div className="mt-2 text-sm">
              <input type="checkbox" defaultChecked /> Restart last trade on error
            </div>
            <label className="block mt-4">Trade options: Ticks, Stake: $0.35</label>
          </div>

          <div className="bg-blue-100 p-4 rounded mb-4">
            <h3 className="font-semibold mb-2">2. Purchase conditions</h3>
            <p>Purchase: Rise</p>
          </div>

          <div className="bg-blue-100 p-4 rounded mb-4">
            <h3 className="font-semibold mb-2">3. Sell conditions</h3>
            <p>If Sell is available → Sell</p>
          </div>

          <div className="bg-blue-100 p-4 rounded">
            <h3 className="font-semibold mb-2">4. Restart trading conditions</h3>
            <p>Trade again</p>
          </div>
        </section>
      </main>
    </div>
  );
}
