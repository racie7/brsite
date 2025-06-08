import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getDerivBalance } from '../utils/derivSocket';

export default function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [balance, setBalance] = useState(null);
  const [currency, setCurrency] = useState('');
  const [loginid, setLoginid] = useState('');
  const [showMobileControls, setShowMobileControls] = useState(true);
  const lastScrollY = useRef(0);

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

  useEffect(() => {
    const token = localStorage.getItem('deriv_token');
    if (!token) {
      router.push('/auth/login');
    } else {
      getDerivBalance(token)
        .then((data) => {
          setBalance(data.balance);
          setCurrency(data.currency);
          setLoginid(data.loginid);
        })
        .catch(console.error);
    }
  }, []);

  // Scroll listener to show/hide mobile controls
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY.current) {
        setShowMobileControls(false); // scrolling down
      } else {
        setShowMobileControls(true); // scrolling up
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="bg-[#02152C] text-white px-4 py-3 shadow relative z-40">
      {/* Top Row */}
      <div className="flex justify-between items-center w-full">
        {/* Logo + Burger */}
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="Logo" className="h-8" />
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            ☰
          </button>
        </div>

        {/* Desktop controls */}
        <div className="hidden md:flex items-center gap-4">
          <button className="bg-green-600 text-white px-4 py-1 rounded text-sm shadow">Withdraw</button>
          {balance !== null ? (
            <span className="text-[#00ffcc] font-bold text-sm">
              💰 {balance.toFixed(2)} {currency} ({loginid})
            </span>
          ) : (
            <span className="text-[#00ffcc] text-sm">Fetching...</span>
          )}
          <button className="bg-blue-600 text-white px-4 py-1 rounded text-sm shadow">Deposit</button>
          <button
            onClick={() => {
              localStorage.removeItem('deriv_token');
              router.push('/auth/login');
            }}
            className="bg-red-600 text-white px-4 py-1 rounded text-sm shadow"
          >
            Logout
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => alert('Hook this to your theme logic 🌗')}
            className="text-yellow-300 text-lg ml-2"
            title="Toggle Theme"
          >
            🌙
          </button>
        </div>
      </div>

      {/* Navigation links */}
      <nav className={`w-full md:flex md:gap-4 text-sm font-medium mt-4 md:mt-2 ${menuOpen ? 'block' : 'hidden'}`}>
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

      {/* Sticky mobile top-right controls with animation */}
      <div
        className={`fixed top-2 right-2 md:hidden flex flex-col items-end gap-2 z-50 w-32 transition-all duration-300 ${
          showMobileControls ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        {balance !== null ? (
          <span className="text-[#00ffcc] font-bold text-xs bg-[#02152C] px-2 py-1 rounded shadow text-center w-full">
            💰 {balance.toFixed(2)} {currency} ({loginid})
          </span>
        ) : (
          <span className="text-[#00ffcc] text-xs bg-[#02152C] px-2 py-1 rounded shadow text-center w-full">
            Fetching...
          </span>
        )}
        <button className="bg-blue-600 text-white px-4 py-1 rounded text-xs shadow w-full">Deposit</button>
        <button className="bg-green-600 text-white px-4 py-1 rounded text-xs shadow w-full">Withdraw</button>
        <button
          onClick={() => {
            localStorage.removeItem('deriv_token');
            router.push('/auth/login');
          }}
          className="bg-red-600 text-white px-4 py-1 rounded text-xs shadow w-full"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
