import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function TradingViewPage() {
  const router = useRouter();

  const [symbol, setSymbol] = useState("BTCUSD");
  const [interval, setInterval] = useState("1");
  const [theme, setTheme] = useState("dark");

  const symbols = ["BTCUSD", "ETHUSD", "EURUSD", "GBPUSD", "USDJPY"];
  const intervals = ["1", "5", "15", "60"];

  useEffect(() => {
    if (!window.TradingView) {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/tv.js';
      script.async = true;
      script.onload = () => createWidget();
      document.body.appendChild(script);
    } else {
      createWidget();
    }
  }, [symbol, interval, theme]);

  const createWidget = () => {
    if (!document.getElementById('tradingview_widget') || !window.TradingView) {
      console.warn("TradingView not ready yet...");
      return;
    }
    document.getElementById('tradingview_widget').innerHTML = '';

    new window.TradingView.widget({
      container_id: "tradingview_widget",
      width: "100%",
      height: "100%",
      symbol,
      interval,
      timezone: "Etc/UTC",
      theme,
      style: "1",
      toolbar_bg: "#0a0f1b",
      hide_side_toolbar: false,
      allow_symbol_change: true,
      backgroundColor: theme === "dark" ? "#0a0f1b" : "#ffffff",
      studies: ["MACD@tv-basicstudies", "RSI@tv-basicstudies"],
      locale: "en",
      autosize: true,
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0f1b] text-white flex flex-col">
      {/* Navbar */}
      <header className="bg-[#02152C] px-6 py-3 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-6">
          <img src="/logo.png" alt="Logo" className="h-8" />
          <nav className="flex gap-5 text-sm font-medium">
            {[
              "Dashboard",
              "Bot Builder",
              "D trader",
              "Tutorials",
              "Analysis Tool",
              "DP Tool",
              "Free Bots",
              "Copy Trading",
              "Trading View",
              "Risk Manager",
            ].map((item, idx) => (
              <Link key={idx} href="#" className="hover:underline">
                {item}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex gap-3 items-center text-sm">
          <button className="bg-green-600 px-4 py-1 rounded">deposit/withdraw</button>
          <span className="text-yellow-300 font-bold">💰 9,994.50 USD</span>
          <button className="bg-blue-500 px-4 py-1 rounded">Deposit</button>
        </div>
      </header>

      {/* TradingView Toolbar */}
      <div className="flex gap-2 p-4 bg-[#0a0f1b] flex-wrap">
        {intervals.map((i) => (
          <button
            key={i}
            onClick={() => setInterval(i)}
            className={`px-4 py-1 rounded ${
              interval === i ? "bg-green-600" : "bg-gray-700"
            }`}
          >
            {i === "60" ? "1h" : `${i}m`}
          </button>
        ))}

        {symbols.map((s) => (
          <button
            key={s}
            onClick={() => setSymbol(s)}
            className={`px-4 py-1 rounded ${
              symbol === s ? "bg-blue-600" : "bg-gray-700"
            }`}
          >
            {s}
          </button>
        ))}

        <button
          onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
          className="px-4 py-1 rounded bg-green-700 ml-auto"
        >
          Switch to {theme === "dark" ? "Light" : "Dark"} Mode
        </button>
      </div>

      {/* TradingView Chart */}
      <div className="flex-1 relative">
        <div
          id="tradingview_widget"
          className="absolute inset-0"
          style={{ height: "100%" }}
        />
      </div>
    </div>
  );
}
