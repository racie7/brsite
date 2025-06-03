import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function CopyTrading() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('auth_token'); // Or sessionStorage
    if (!token) {
      router.push('/auth/login'); // or trigger loginWithDeriv()
    }
  }, []);
  const [activeTab, setActiveTab] = useState('Trader Data');
  const [tokenInput, setTokenInput] = useState('');
  const [tokens, setTokens] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleAddToken = () => {
    if (tokenInput.trim() !== '') {
      setTokens([...tokens, tokenInput.trim()]);
      setTokenInput('');
    }
  };

  const handleReload = () => {
    setTokens([]);
  };

  const navItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Bot Builder", href: "/bot-builder" },
    { name: "D trader", href: "/d-trader" },
    { name: "Tutorials", href: "/tutorials" },
    { name: "Analysis Tool", href: "/analysis-tool" },
    { name: "DP Tool", href: "/dp-tool" },
    { name: "Free Bots", href: "/bots" },
    { name: "Copy Trading", href: "/copy-trading" },
    { name: "Trading View", href: "/trading-view" },
    { name: "Risk Manager", href: "/risk-manager" },
  ];

  return (
    <div className="min-h-screen bg-[#030b1a] text-white flex flex-col">
      {/* Header */}
      <header className="bg-[#02152C] text-white flex flex-wrap justify-between items-center px-4 py-3 shadow">
        <div className="flex items-center justify-between w-full md:w-auto">
          <img src="/logo.png" alt="Logo" className="h-8" />
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white text-2xl">
            ☰
          </button>
        </div>

        <nav className={`w-full md:flex md:gap-4 text-sm font-medium mt-4 md:mt-0 ${menuOpen ? 'block' : 'hidden'}`}>
          {navItems.map(({ name, href }) => (
            <Link
              key={name}
              href={href}
              className={`block px-2 py-1 ${
                router.pathname === href ? 'text-green-300 underline font-semibold' : 'hover:underline'
              }`}
            >
              {name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3 text-sm ml-auto mt-4 md:mt-0">
          <button className="bg-green-600 px-4 py-1 rounded text-white">deposit/withdraw</button>
          <span className="text-yellow-300 font-bold">💰 9,994.50 USD</span>
          <button className="bg-blue-500 px-4 py-1 rounded">Deposit</button>
        </div>
      </header>

      {/* Main */}
      <div className="flex-1 flex flex-col md:flex-row gap-6 p-4 sm:p-6">
        {/* Trading Setup */}
        <div className="flex-1 bg-[#030b1a] border border-cyan-400 rounded-xl p-4 sm:p-6 shadow-lg relative">
          <div className="absolute top-4 right-4 flex gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            <div className="w-2 h-2 bg-yellow-400 rounded-full" />
            <div className="w-2 h-2 bg-green-500 rounded-full" />
          </div>
          <h2 className="text-cyan-300 font-semibold mb-4 tracking-wide">Trading Setup</h2>

          <label className="text-xs uppercase tracking-widest text-gray-400 block mb-2">
            Manage Trader Tokens
          </label>

          {/* Token Input */}
          <div className="flex flex-wrap gap-3 mb-4">
            <input
              type="text"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="Enter trader auth token"
              className="flex-1 min-w-[200px] bg-transparent border border-cyan-400 rounded px-4 py-2 text-sm focus:outline-none"
            />
            <button
              onClick={handleAddToken}
              className="bg-cyan-500 hover:bg-cyan-400 text-black px-4 py-2 rounded"
            >
              Add
            </button>
            <button
              onClick={handleReload}
              className="bg-cyan-500 hover:bg-cyan-400 text-black px-4 py-2 rounded"
            >
              Reload
            </button>
          </div>

          {/* Token List */}
          <div className="border border-cyan-400 rounded p-4 min-h-[200px] text-sm overflow-y-auto space-y-2">
            {tokens.length === 0 ? (
              <div className="flex items-center justify-center text-gray-500 h-full">
                No tokens added yet
              </div>
            ) : (
              tokens.map((token, index) => (
                <div key={index} className="bg-[#042c4d] rounded p-2 break-all">
                  {token}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Trade Analytics */}
        <div className="flex-1 bg-[#030b1a] border border-cyan-400 rounded-xl p-4 sm:p-6 shadow-lg relative">
          <div className="absolute top-4 right-4">
            <span className="bg-pink-600 text-white text-xs px-2 py-1 rounded-full">LIVE</span>
          </div>
          <h2 className="text-cyan-300 font-semibold mb-4 tracking-wide">Trade Analytics</h2>

          {/* Tabs */}
          <div className="flex gap-6 mb-6 border-b border-cyan-500 overflow-x-auto">
            {['Trader Data', 'Statistics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 text-sm font-semibold whitespace-nowrap ${
                  activeTab === tab
                    ? 'text-cyan-300 border-b-2 border-cyan-400'
                    : 'text-gray-400 hover:text-cyan-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="border border-cyan-400 rounded p-4 min-h-[200px] flex items-center justify-center text-gray-500 text-sm">
            {activeTab === 'Trader Data' ? 'Awaiting trader data...' : 'Statistics will show here.'}
          </div>
        </div>
      </div>
    </div>
  );
}
