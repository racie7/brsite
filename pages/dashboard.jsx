import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Dashboard() {
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
    <div className="min-h-screen bg-[#F9FBFF] text-blue-900">
      {/* Top Navbar */}
      <header className="bg-[#02152C] text-white flex justify-between items-center px-6 py-4 shadow">
        {/* Left side: Logo + nav links */}
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

        {/* Right side: buttons + balance */}
        <div className="flex items-center gap-4">
          <button className="bg-red-500 px-3 py-1 rounded text-sm">Telegram</button>
          <button className="bg-green-600 px-4 py-1 rounded text-sm">deposit/withdraw</button>
          <span className="text-[#00ffcc] font-bold">💰 9,994.50 USD</span>
          <button className="bg-blue-600 px-4 py-1 rounded text-sm">Deposit</button>
        </div>
      </header>

      {/* Body Content */}
      <div className="flex p-6">
        {/* Main Left Content */}
        <div className="flex-1">
          <h2 className="text-center font-medium text-lg mb-8">
            Import a bot from your computer or Google Drive, build it from scratch, or start with a quick strategy.
          </h2>
          <div className="flex justify-center gap-10 mb-10">
            {['Local', 'Google Drive', 'Bot builder', 'Quick strategy'].map((label, i) => (
              <div key={i} className="flex flex-col items-center space-y-2">
                <div className="w-20 h-20 bg-[#0b1f3a] text-white flex items-center justify-center rounded-md text-xl shadow">📱</div>
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>

          <h3 className="font-semibold mb-2 text-md">Your bots:</h3>
          <table className="w-full text-sm text-left">
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

        {/* Announcements Right Panel */}
        <aside className="w-[320px] border-l border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-lg font-bold">Welcome to <span className="text-green-600">Detrabots.com 💵</span></h4>
            <button className="text-gray-400">❌</button>
          </div>
          <p className="text-yellow-400 text-xl">✨</p>
          <p className="text-blue-800">Trade like a pro, profit like a boss! 🔥</p>
        </aside>
      </div>
    </div>
  );
}
