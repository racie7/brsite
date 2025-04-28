import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Tutorials() {
  const router = useRouter();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Bot Builder', href: '/bot-builder' },
    { name: 'D trader', href: '/d-trader' },
    { name: 'Tutorials', href: '/tutorials' },
    { name: 'Analysis Tool', href: '#' },
    { name: 'DP Tool', href: '#' },
    { name: 'Free Bots', href: '#' },
    { name: 'Copy Trading', href: '#' },
    { name: 'Trading View', href: '#' },
    { name: 'Risk Manager', href: '#' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-blue-900">
      {/* Top Nav */}
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

      {/* Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-[220px] bg-[#001C3A] text-white p-4">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-2 text-sm text-black rounded mb-4"
          />
          <ul className="space-y-2 text-sm">
            <li className="bg-white text-black px-3 py-2 rounded">Guide</li>
            <li className="hover:bg-gray-700 px-3 py-2 rounded cursor-pointer">FAQ</li>
            <li className="hover:bg-gray-700 px-3 py-2 rounded cursor-pointer">Quick strategy guides</li>
          </ul>
        </aside>

        {/* Main Tutorial Section */}
        <main className="flex-1 p-8">
          {/* Step-by-step guides */}
          <h2 className="text-lg font-semibold mb-4">Step-by-step guides</h2>
          <div className="grid grid-cols-2 gap-8 mb-10">
            {[
              { title: 'Get started on Deriv Bot', img: '/tutorial-1.png' },
              { title: 'Let’s build a bot!', img: '/tutorial-2.png' },
            ].map(({ title, img }, i) => (
              <div key={i} className="cursor-pointer">
                <div className="w-full h-36 bg-gray-200 rounded shadow overflow-hidden mb-2">
                  <img src={img} alt={title} className="w-full h-full object-cover" />
                </div>
                <p className="text-sm font-medium text-center">{title}</p>
              </div>
            ))}
          </div>

          {/* Videos on Deriv Bot */}
          <h2 className="text-lg font-semibold mb-4">Videos on Deriv Bot</h2>
          <div className="grid grid-cols-4 gap-6">
            {[
              'An introduction to Deriv Bot',
              'How to build a basic trading bot with Deriv Bot',
              'How to use Martingale strategy on Deriv Bot',
              'Introducing Accumulator Options on Deriv Bot: Available for automated trading',
            ].map((title, i) => (
              <div key={i} className="cursor-pointer">
                <div className="w-full h-36 bg-gray-300 rounded shadow mb-2 flex items-center justify-center text-4xl">
                  ▶️
                </div>
                <p className="text-sm text-center">{title}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
