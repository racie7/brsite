import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const router = useRouter();
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
    <div className="min-h-screen bg-[#F9FBFF] text-blue-900">
      {/* Top Navbar */}
      <header className="bg-[#02152C] text-white flex flex-wrap justify-between items-center px-4 py-3 shadow relative">
        {/* Left side */}
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

        {/* Right side buttons */}
        <div className="flex flex-wrap justify-center md:justify-end items-center gap-2 mt-4 md:mt-0 w-full md:w-auto">
          <a
          href="https://t.me/Detrabots"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="bg-red-500 px-3 py-1 rounded text-sm">
            Telegram
          </button>
        </a>

          <button className="bg-green-600 px-4 py-1 rounded text-sm">deposit/withdraw</button>
          {/* <span className="text-[#00ffcc] font-bold">💰 9,994.50 USD</span> */}
          {/* <button className="bg-blue-600 px-4 py-1 rounded text-sm">Deposit</button> */}
        </div>
      </header>

      {/* Body Content */}
      <div className="flex flex-col md:flex-row p-4 gap-4">
        {/* Main Left Content */}
        <div className="flex-1">
          <h2 className="text-center font-medium text-lg mb-6">
            Import a bot from your computer or Google Drive, build it from scratch, or start with a quick strategy.
          </h2>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {['Local', 'Google Drive', 'Bot builder', 'Quick strategy'].map((label, i) => (
              <div key={i} className="flex flex-col items-center space-y-2 w-24">
                <div className="w-20 h-20 bg-[#0b1f3a] text-white flex items-center justify-center rounded-md text-xl shadow">📱</div>
                <span className="text-sm font-medium text-center">{label}</span>
              </div>
            ))}
          </div>

          <h3 className="font-semibold mb-2 text-md">Your bots:</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="text-blue-800">
                <tr>
                  <th className="p-2 font-bold">Bot name</th>
                  <th className="p-2 font-bold">Last modified</th>
                  <th className="p-2 font-bold">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-2 text-blue-600 underline cursor-pointer">Untitled Bot</td>
                  <td className="p-2">11 Apr 2025</td>
                  <td className="p-2 flex items-center gap-2">
                    Unsaved
                    <span className="ml-4 flex gap-2 text-blue-500">
                      📄 📥 👤 🗑️
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="w-full md:w-[320px] border-t md:border-t-0 md:border-l border-gray-200 px-4 py-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-lg font-bold">
              Welcome to <span className="text-green-600">Detrabots.com 💵</span>
            </h4>
            <button className="text-gray-400">❌</button>
          </div>
          <p className="text-yellow-400 text-xl">✨</p>
        </aside>
      </div>
    </div>
  );
}
