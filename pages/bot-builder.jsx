import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';


export default function BotBuilder() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('auth_token'); // Or sessionStorage
    if (!token) {
      router.push('/auth/login'); // or trigger loginWithDeriv()
    }
  }, []);
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
      <header className="bg-[#02152C] text-white flex flex-wrap justify-between items-center px-4 py-3 shadow relative">
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Logo" className="h-8" />
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
              ☰
            </button>
          </div>
        </div>

        {/* Nav links */}
        <nav className={`w-full md:flex md:gap-4 text-sm font-medium mt-4 md:mt-0 ${menuOpen ? 'block' : 'hidden'}`}>
          {navItems.map(({ name, href }) => (
            <Link
              key={name}
              href={href}
              className={`block px-2 py-1 ${
                router.pathname === href ? 'underline text-green-300 font-bold' : 'hover:underline'
              }`}
            >
              {name}
            </Link>
          ))}
        </nav>

        {/* Top-right buttons */}
        <div className="hidden md:flex items-center gap-4 ml-auto mt-4 md:mt-0">
          <button className="bg-green-600 px-4 py-1 rounded text-sm">deposit/withdraw</button>
          <span className="text-[#00ffcc] font-bold">💰 9,994.50 USD</span>
          <button className="bg-blue-600 px-4 py-1 rounded text-sm">Deposit</button>
        </div>
      </header>

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
