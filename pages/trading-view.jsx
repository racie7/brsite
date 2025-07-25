import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useAuthRedirect from '../utils/useAuthRedirect';
import Header from '../components/Header';

export default function TradingViewPage() {
  const router = useRouter();

 useAuthRedirect();

  const [symbol, setSymbol] = useState("BTCUSD");
  const [interval, setInterval] = useState("1");
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);

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
    <div className="min-h-screen bg-[#0a0f1b] text-white flex flex-col">
      {/* Navbar */}
      <Header />

      {/* Toolbar */}
      <div className="p-4 bg-[#0a0f1b] overflow-x-auto">
        <div className="flex flex-wrap gap-2 min-w-[400px]">
          {intervals.map((i) => (
            <button
              key={i}
              onClick={() => setInterval(i)}
              className={`px-4 py-1 rounded text-sm ${
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
              className={`px-4 py-1 rounded text-sm ${
                symbol === s ? "bg-blue-600" : "bg-gray-700"
              }`}
            >
              {s}
            </button>
          ))}

          <button
            onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
            className="px-4 py-1 rounded text-sm bg-green-700 ml-auto"
          >
            Switch to {theme === "dark" ? "Light" : "Dark"} Mode
          </button>
        </div>
      </div>

      {/* TradingView Chart */}
      <div className="flex-1 relative min-h-[400px]">
        <div
          id="tradingview_widget"
          className="absolute inset-0"
          style={{ height: "100%" }}
        />
      </div>
    </div>
  );
}
