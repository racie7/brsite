import React, { useEffect } from 'react';
import Link from 'next/link';

export default function DTrader() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      new window.TradingView.widget({
        container_id: 'tradingview_chart',
        autosize: true,
        symbol: 'FX:EURUSD',
        interval: '1',
        timezone: 'Etc/UTC',
        theme: 'light',
        style: '1',
        locale: 'en',
        enable_publishing: false,
        hide_legend: true,
        allow_symbol_change: false,
      });
    };
    document.body.appendChild(script);
  }, []);

  const loginWithDeriv = () => {
    const APP_ID = process.env.NEXT_PUBLIC_DERIV_APP_ID;
    const REDIRECT_URI = process.env.NEXT_PUBLIC_DERIV_REDIRECT_URI;

    if (!APP_ID || !REDIRECT_URI) {
      alert("OAuth config missing. Check .env.local");
      return;
    }

    const oauthUrl = `https://oauth.deriv.com/oauth2/authorize?app_id=${APP_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    window.location.href = oauthUrl;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Bar */}
      <header className="bg-[#000E5D] text-white px-4 sm:px-6 py-3 flex flex-wrap justify-between items-center shadow">
        <div className="text-lg font-bold flex items-center gap-2 w-full sm:w-auto">
          <span className="bg-green-600 text-white px-2 py-1 rounded-sm text-sm">DP</span>
          <span>Dollar Printer</span>
          <span className="text-xs text-gray-300 hidden sm:inline">Powered by Deriv</span>
        </div>

        <div className="flex flex-wrap gap-3 mt-4 sm:mt-0 sm:gap-4 text-sm w-full sm:w-auto justify-start sm:justify-end">
          <button className="bg-red-500 px-3 py-1 rounded text-white">Risk Disclaimer</button>
          <button onClick={loginWithDeriv} className="text-green-400 hover:underline">Log in with Deriv</button>
          <a
            href="https://track.deriv.com/_l6qL8q_06CRMjdsyM5hasGNd7ZgqdRLk/1/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 hover:underline"
          >
            Sign up
          </a>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Chart Section */}
        <div className="flex-1 bg-gray-100 relative min-h-[400px]">
          <div className="absolute top-4 left-4 z-10">
            <div className="bg-white shadow-md px-4 py-2 rounded-md flex items-center gap-4">
              <div className="text-sm font-bold">📊 EUR/USD Chart</div>
              <div className="text-xs text-gray-600 hidden sm:inline">Live from TradingView</div>
            </div>
          </div>

          {/* TradingView Chart Embed */}
          <div id="tradingview_chart" className="w-full h-full" />
        </div>

        {/* Trade Panel */}
        <aside className="w-full md:w-[300px] bg-[#001F82] text-white p-4 sm:p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <label className="text-xs mb-1 block text-gray-400">Trade type</label>
              <div className="bg-white text-black px-3 py-2 rounded">📈 Accumulators</div>
            </div>

            <div>
              <label className="text-xs block text-gray-300 mb-1">Growth rate</label>
              <div className="flex gap-2 flex-wrap">
                {[1, 2, 3, 4, 5].map((rate) => (
                  <button
                    key={rate}
                    className={`px-2 py-1 rounded text-sm ${rate === 3 ? 'bg-white text-black font-bold' : 'bg-gray-700'}`}
                  >
                    {rate}%
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs block text-gray-300 mb-1">Stake</label>
              <div className="flex items-center gap-2 flex-wrap">
                <button className="bg-gray-700 px-2 rounded">-</button>
                <input
                  type="number"
                  defaultValue={10}
                  className="w-20 text-center text-black px-2 py-1 rounded"
                />
                <button className="bg-gray-700 px-2 rounded">+</button>
                <span className="text-xs">AUD</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-300">
              <input type="checkbox" id="tp" />
              <label htmlFor="tp">Take profit</label>
            </div>

            <div className="text-xs space-y-1 text-gray-400">
              <div className="flex justify-between">
                <span>Max. payout</span>
                <span className="text-white">6,000.00 AUD</span>
              </div>
              <div className="flex justify-between">
                <span>Max. ticks</span>
                <span className="text-white">85 ticks</span>
              </div>
            </div>
          </div>

          <button className="bg-green-400 text-black font-bold py-3 rounded mt-6 hover:bg-green-300 w-full">
            Buy →
          </button>
        </aside>
      </div>
    </div>
  );
}
