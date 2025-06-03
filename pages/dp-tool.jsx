import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function DPTool() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('auth_token'); // Or sessionStorage
    if (!token) {
      router.push('/auth/login'); // or trigger loginWithDeriv()
    }
  }, []);

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

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isPredicting, setIsPredicting] = useState(false);
  const [currentTime, setCurrentTime] = useState({ eat: '', gmt: '' });

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const eat = new Date(now.getTime() + 3 * 60 * 60 * 1000);
      setCurrentTime({
        eat: eat.toLocaleTimeString('en-GB'),
        gmt: now.toLocaleTimeString('en-GB'),
      });
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#05051a] text-white flex flex-col">
      {/* Top Nav */}
      <header className="bg-[#02152C] text-white flex flex-wrap justify-between items-center px-4 py-3 shadow">
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Logo" className="h-8" />
          </div>
        </div>

        <nav className="hidden md:flex gap-4 text-sm font-medium mt-4 md:mt-0">
          {navItems.map(({ name, href }) => (
            <Link
              key={name}
              href={href}
              className={`${
                router.pathname === href
                  ? 'text-green-300 underline font-semibold'
                  : 'hover:underline'
              }`}
            >
              {name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3 text-sm ml-auto mt-4 md:mt-0">
          <button className="bg-green-600 px-4 py-1 rounded">deposit/withdraw</button>
          <span className="text-yellow-300 font-bold">💰 9,994.50 USD</span>
          <button className="bg-blue-500 px-4 py-1 rounded">Deposit</button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-1">
        {/* Sidebar */}
        <aside className="w-full md:w-[250px] bg-gradient-to-b from-[#0e1f3c] to-[#2d6e9b] p-6">
          <div className="text-xl font-bold mb-2">Analysis</div>
          <p className="text-xs text-gray-300 mb-6">Trading Pattern Recognition</p>

          <ul className="space-y-4 text-sm font-semibold mb-8">
            <li>Even/odd</li>
            <li>Over/under</li>
            <li>Match/differ</li>
            <li>Rise/fall</li>
          </ul>

          <div className="mb-4">
            <label className="text-xs">Select Market</label>
            <select className="w-full mt-1 p-2 rounded text-black">
              <option>Volatility 10 Index</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="text-xs">Signals</label>
            <select className="w-full mt-1 p-2 rounded text-black">
              <option>Select an option</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="text-xs">Select Number of Ticks</label>
            <select className="w-full mt-1 p-2 rounded text-black">
              <option>25 Ticks</option>
            </select>
          </div>

          <div className="flex flex-wrap justify-between text-xs font-bold gap-2">
            <span className="bg-blue-500 px-4 py-1 rounded-full text-white">Even: 47.20%</span>
            <span className="bg-pink-500 px-4 py-1 rounded-full text-white">Odd: 52.80%</span>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8">
          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setIsAnalyzing((prev) => !prev)}
              className={`px-6 py-3 text-lg font-bold rounded ${isAnalyzing ? 'bg-red-600' : 'bg-green-600'}`}
            >
              {isAnalyzing ? 'Stop Analysis' : 'Start Analysis'}
            </button>
            <button
              onClick={() => setIsPredicting((prev) => !prev)}
              className={`px-6 py-3 text-lg font-bold rounded ${isPredicting ? 'bg-red-600' : 'bg-green-600'}`}
            >
              {isPredicting ? 'Stop Predictions' : 'Start Predictions'}
            </button>
          </div>

          {/* Digits Display */}
          <div className="text-center">
            <div className="text-2xl mb-2 font-bold">Latest Tick:</div>
            <div className="flex flex-wrap justify-center gap-3 text-xl">
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i} className="bg-orange-400 w-10 h-10 flex items-center justify-center rounded-full">
                  {i}
                </div>
              ))}
            </div>
          </div>

          {/* Matches & Differs */}
          <div className="text-center">
            <div className="text-orange-400 text-2xl mb-2 font-bold">Matches and Differs</div>
            <div className="overflow-x-auto">
              <table className="mx-auto border border-orange-400 text-sm">
                <thead>
                  <tr>
                    <th className="border border-orange-400 px-4 py-2">Matches</th>
                    <th className="border border-orange-400 px-4 py-2">My Prediction</th>
                    <th className="border border-orange-400 px-4 py-2">--</th>
                  </tr>
                  <tr>
                    <th className="border border-orange-400 px-4 py-2">Differs</th>
                    <th className="border border-orange-400 px-4 py-2">My Prediction</th>
                    <th className="border border-orange-400 px-4 py-2">--</th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>

          {/* Even & Odd */}
          <div className="text-center">
            <div className="text-orange-400 text-2xl mb-2 font-bold">Even and Odd</div>
            <div className="overflow-x-auto">
              <table className="mx-auto border border-orange-400 text-sm">
                <thead>
                  <tr>
                    <th className="border border-orange-400 px-6 py-2">Even</th>
                    <th className="border border-orange-400 px-6 py-2">Percentage</th>
                    <th className="border border-orange-400 px-6 py-2">--</th>
                  </tr>
                  <tr>
                    <th className="border border-orange-400 px-6 py-2">Odd</th>
                    <th className="border border-orange-400 px-6 py-2">Percentage</th>
                    <th className="border border-orange-400 px-6 py-2">--</th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>

          {/* Over & Under */}
          <div className="text-center">
            <div className="text-orange-400 text-2xl mb-2 font-bold">Over and Under</div>
            <div className="overflow-x-auto">
              <table className="mx-auto border border-orange-400 text-sm">
                <thead>
                  <tr>
                    <th className="border border-orange-400 px-6 py-2">Over</th>
                    <th className="border border-orange-400 px-6 py-2">Percentage</th>
                    <th className="border border-orange-400 px-6 py-2">--</th>
                  </tr>
                  <tr>
                    <th className="border border-orange-400 px-6 py-2">Under</th>
                    <th className="border border-orange-400 px-6 py-2">Percentage</th>
                    <th className="border border-orange-400 px-6 py-2">--</th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>

          {/* Footer Clock */}
          <div className="text-center mt-10">
            <span className="bg-black text-white py-2 px-4 rounded-full text-xs">
              EAT: {currentTime.eat} | GMT: {currentTime.gmt}
            </span>
          </div>
        </main>
      </div>
    </div>
  );
}
