// components/Header.jsx
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getDerivBalance } from '../utils/derivSocket'; 

export default function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [balance, setBalance] = useState(null);
  const [currency, setCurrency] = useState('');
  const [loginid, setLoginid] = useState('');

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

  return (
    <header className="bg-[#02152C] text-white flex flex-wrap justify-between items-center px-4 py-3 shadow relative">
      <div className="flex items-center justify-between w-full md:w-auto">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="Logo" className="h-8" />
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            ☰
          </button>
        </div>
      </div>

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

      <div className="hidden md:flex items-center gap-4 ml-auto mt-4 md:mt-0">
        <button className="bg-green-600 px-4 py-1 rounded text-sm">deposit/withdraw</button>

        {balance !== null ? (
          <span className="text-[#00ffcc] font-bold">
            💰 {balance.toFixed(2)} {currency} ({loginid})
          </span>
        ) : (
          <span className="text-[#00ffcc]">Fetching...</span>
        )}

        <button className="bg-blue-600 px-4 py-1 rounded text-sm">Deposit</button>
        <button
          onClick={() => {
            localStorage.removeItem('deriv_token');
            router.push('/auth/login');
          }}
          className="bg-red-600 px-4 py-1 rounded text-sm"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
