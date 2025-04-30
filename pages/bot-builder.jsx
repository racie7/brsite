import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function BotBuilder() {
  const router = useRouter();

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
      <header className="bg-[#02152C] text-white flex justify-between items-center px-6 py-4 shadow">
        <div className="flex items-center gap-8">
          <img src="/logo.png" alt="Logo" className="h-8" />
          <nav className="flex gap-5 text-sm font-medium">
            {navItems.map(({ name, href }) => (
              <Link
                key={name}
                href={href}
                className={`${
                  router.pathname === href
                    ? 'underline text-green-300 font-bold'
                    : 'hover:underline'
                }`}
              >
                {name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button className="bg-green-600 px-4 py-1 rounded text-sm">deposit/withdraw</button>
          <span className="text-[#00ffcc] font-bold">💰 9,994.50 USD</span>
          <button className="bg-blue-600 px-4 py-1 rounded text-sm">Deposit</button>
        </div>
      </header>

      {/* Bot Builder UI */}
      <main className="flex">
        {/* Left panel */}
        <aside className="w-[250px] border-r border-gray-300 bg-white p-4">
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
        <section className="flex-1 p-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">1. Trade parameters</h2>
            <div className="space-x-3">
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
