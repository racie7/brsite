import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import RippleButton from '../components/RippleButton';
import useAuthRedirect from '../utils/useAuthRedirect';
import Header from '../components/Header';

export default function FreeBots() {
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

  const bots = [
    { name: '1 $Original DollarPrinterBot 2025 Version', description: 'Trading strategy using the 1 $Original DollarPrinterBot 2025 Version $ (1) system' },
    { name: '2 Updated Expert Speed Bot Version', description: 'Trading strategy using the 2 Updated Expert Speed Bot Version (1) (1) system' },
    { name: '2025 Killer version Bot', description: 'Trading strategy using the 2025 Killer version Bot system' },
    { name: '3 Updated Version Of Candle Mine', description: 'Trading strategy using the 3 Updated Version Of Candle Mine system' },
    { name: 'AUTO C4 PRO (2) Version', description: 'Trading strategy using the AUTO C4 PRO (2) Version system' },
    { name: 'Alpha Version 2025', description: 'Trading strategy using the Alpha Version 2025 system' },
    { name: 'BOT - 0008 - Over Under (1)', description: 'Trading strategy using the BOT - 0008 - Over Under (1) system' },
    { name: 'Binary Expert Version pro', description: 'Trading strategy using the Binary Expert Version pro system' },
    { name: 'No Martingale bot free', description: 'Trading strategy using the No Martingale bot free system' },
    { name: 'UPDATED DIGIT EVEN Version Bot', description: 'Trading strategy using the UPDATED DIGIT EVEN Version Bot system' },
    { name: 'Updated Binary V5 Expert pro', description: 'Trading strategy using the Updated Binary V5 Expert pro system' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f7f9] text-blue-900">
      {/* Top Navbar */}
      <Header />

      {/* Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-10">
        <h1 className="text-2xl font-bold mb-2 text-blue-900">Trading Bots Library</h1>
        <p className="text-sm text-gray-600 mb-8">Click on a bot to load it in the Bot Builder</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bots.map((bot, index) => (
            <div
              key={index}
              className="bg-[#06162E] rounded-lg p-4 flex flex-col justify-between min-h-[160px] shadow-md transition-transform duration-300 hover:scale-105"
            >
              <div>
                <h3 className="text-white text-base font-bold mb-2">{bot.name}</h3>
                <p className="text-sm text-gray-400">{bot.description}</p>
              </div>
              <RippleButton className="mt-4 w-full bg-[#02152C] hover:bg-[#06386b] text-white text-sm py-2 rounded">
                Load Bot
              </RippleButton>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
