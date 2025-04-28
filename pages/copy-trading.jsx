import React, { useState } from 'react';

export default function CopyTrading() {
  const [activeTab, setActiveTab] = useState('Trader Data');
  const [tokenInput, setTokenInput] = useState('');
  const [tokens, setTokens] = useState([]);

  const handleAddToken = () => {
    if (tokenInput.trim() !== '') {
      setTokens([...tokens, tokenInput.trim()]);
      setTokenInput('');
    }
  };

  const handleReload = () => {
    setTokens([]);
  };

  return (
    <div className="min-h-screen bg-[#030b1a] text-white flex flex-col">
      {/* Header */}
      <header className="bg-[#02152C] text-white px-6 py-4 flex justify-between items-center shadow">
        <div className="flex items-center gap-6">
          <img src="/logo.png" alt="Logo" className="h-8" />
          <nav className="flex gap-5 text-sm font-medium">
            {['Dashboard', 'Bot Builder', 'D trader', 'Tutorials', 'Analysis Tool', 'DP Tool', 'Free Bots', 'Copy Trading', 'Trading View', 'Risk Manager'].map((name) => (
              <a
                key={name}
                href="#"
                className={`${
                  name === 'Copy Trading'
                    ? 'text-green-300 underline font-semibold'
                    : 'hover:underline'
                }`}
              >
                {name}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <button className="bg-green-600 px-4 py-1 rounded text-white">deposit/withdraw</button>
          <span className="text-yellow-300 font-bold">💰 9,994.50 USD</span>
          <button className="bg-blue-500 px-4 py-1 rounded">Deposit</button>
        </div>
      </header>

      {/* Main */}
      <div className="flex-1 flex gap-6 p-6">
        {/* Trading Setup */}
        <div className="flex-1 bg-[#030b1a] border border-cyan-400 rounded-xl p-6 shadow-lg relative">
          <div className="absolute top-4 right-4 flex gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
          <h2 className="text-cyan-300 font-semibold mb-4 tracking-wide">Trading Setup</h2>

          <label className="text-xs uppercase tracking-widest text-gray-400 block mb-2">
            Manage Trader Tokens
          </label>
          <div className="flex items-center gap-3 mb-4">
            <input
              type="text"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="Enter trader auth token"
              className="flex-1 bg-transparent border border-cyan-400 rounded px-4 py-2 text-sm focus:outline-none"
            />
            <button
              onClick={handleAddToken}
              className="bg-cyan-500 hover:bg-cyan-400 text-black px-4 py-2 rounded transition-all"
            >
              Add
            </button>
            <button
              onClick={handleReload}
              className="bg-cyan-500 hover:bg-cyan-400 text-black px-4 py-2 rounded transition-all"
            >
              Reload
            </button>
          </div>

          {/* Token list */}
          <div className="border border-cyan-400 rounded p-4 min-h-[200px] text-sm overflow-y-auto space-y-2">
            {tokens.length === 0 ? (
              <div className="flex items-center justify-center text-gray-500 h-full">
                No tokens added yet
              </div>
            ) : (
              tokens.map((token, index) => (
                <div key={index} className="bg-[#042c4d] rounded p-2">
                  {token}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Trade Analytics */}
        <div className="flex-1 bg-[#030b1a] border border-cyan-400 rounded-xl p-6 shadow-lg relative">
          <div className="absolute top-4 right-4">
            <span className="bg-pink-600 text-white text-xs px-2 py-1 rounded-full">LIVE</span>
          </div>
          <h2 className="text-cyan-300 font-semibold mb-4 tracking-wide">Trade Analytics</h2>

          {/* Tabs */}
          <div className="flex gap-6 mb-6 border-b border-cyan-500">
            {['Trader Data', 'Statistics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 text-sm font-semibold ${
                  activeTab === tab
                    ? 'text-cyan-300 border-b-2 border-cyan-400'
                    : 'text-gray-400 hover:text-cyan-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="border border-cyan-400 rounded p-4 min-h-[200px] flex items-center justify-center text-gray-500 text-sm">
            {activeTab === 'Trader Data' ? 'Awaiting trader data...' : 'Statistics will show here.'}
          </div>
        </div>
      </div>
    </div>
  );
}
