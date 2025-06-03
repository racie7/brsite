import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function AnalysisTool() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('auth_token'); // Or sessionStorage
    if (!token) {
      router.push('/auth/login'); // or trigger loginWithDeriv()
    }
  }, []);
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

  const digitSequence = ['O', 'E', 'O', 'E', 'O', 'E', 'E', 'O', 'E', 'O'];

  const data = {
    labels: ['Even', 'Odd'],
    datasets: [
      {
        label: 'Percentage',
        data: [48.33, 53.33],
        backgroundColor: ['#00FF00', '#FF69B4'],
        borderRadius: 10,
        barThickness: 60,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.parsed.y.toFixed(2)}%`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: '#999',
          font: { size: 12 },
          callback: (val) => `${val}%`,
        },
        grid: { color: '#eee' },
      },
      x: {
        ticks: {
          color: '#555',
          font: { weight: 'bold' },
        },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="min-h-screen bg-[url('/dot-bg.png')] bg-repeat bg-[#f6f7f9] text-blue-900 flex flex-col">
      {/* Navbar */}
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

      {/* Content */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-full md:w-[240px] bg-gradient-to-b from-[#0e1f3c] to-[#2d6e9b] text-white p-6">
          <h2 className="text-xl font-bold mb-1">Analysis</h2>
          <p className="text-xs text-gray-300 mb-3">Trading Pattern Recognition</p>
          <hr className="border-white/20 mb-6" />

          <ul className="space-y-4 text-sm font-medium mb-6">
            <li className="text-blue-200">Even/odd</li>
            <li className="hover:text-blue-300 cursor-pointer">Over/under</li>
            <li className="hover:text-blue-300 cursor-pointer">Match/differ</li>
            <li className="hover:text-blue-300 cursor-pointer">Rise/fall</li>
          </ul>

          <div className="mb-4">
            <label className="text-xs">Volatility Index</label>
            <select className="w-full mt-1 px-3 py-2 rounded text-black text-sm">
              <option>VOLATILITY INDEX 10</option>
            </select>
          </div>

          <div>
            <label className="text-xs">Number of Digits</label>
            <input
              type="number"
              value="60"
              readOnly
              className="w-full mt-1 px-3 py-2 rounded text-black text-sm"
            />
          </div>

          <div className="flex flex-wrap justify-between mt-10 text-xs font-bold gap-2">
            <span className="bg-blue-500 px-4 py-1 rounded-full text-white">Even: 48.33%</span>
            <span className="bg-pink-500 px-4 py-1 rounded-full text-white">Odd: 53.33%</span>
          </div>
        </aside>

        {/* Main Section */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8">
          {/* Current Price */}
          <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 border border-gray-100">
            <h4 className="uppercase text-gray-500 text-xs font-semibold mb-2">Current Price</h4>
            <h2 className="text-3xl font-bold text-gray-900">Latest Price: 6251.775</h2>
          </div>

          {/* Digits */}
          <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-blue-600 rounded-full" />
              <h3 className="text-sm font-semibold text-blue-900">Digits</h3>
            </div>
            <div className="flex flex-wrap gap-3 text-lg font-bold">
              {digitSequence.map((digit, i) => (
                <span key={i} className="flex items-center gap-1">
                  <span className={`w-2 h-2 rounded-full ${digit === 'E' ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className={`${digit === 'E' ? 'text-green-600' : 'text-red-600'}`}>{digit}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-blue-600 rounded-full" />
              <h3 className="text-sm font-semibold text-blue-900">Digit Distribution</h3>
            </div>
            <Bar data={data} options={options} height={200} />
          </div>
        </main>
      </div>
    </div>
  );
}
