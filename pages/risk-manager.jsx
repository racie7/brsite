// 👇 Just continue with your current imports
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Pie } from "react-chartjs-2";
import Header from '../components/Header';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function RiskManagerPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountSize, setAccountSize] = useState(1000);
  const [riskPercentage, setRiskPercentage] = useState(1);
  const [takeProfitPercentage, setTakeProfitPercentage] = useState(10);
  const [stopLossPercentage, setStopLossPercentage] = useState(15);
  const [savedPlans, setSavedPlans] = useState([]);
  const riskRef = useRef();

  const stakeAmount = (accountSize * riskPercentage) / 100;
  const remainingCapital = accountSize - stakeAmount;
  const takeProfit = (accountSize * takeProfitPercentage) / 100;
  const stopLoss = (accountSize * stopLossPercentage) / 100;
  const riskRewardRatio = (takeProfit / stopLoss).toFixed(2);

  useEffect(() => {
    const plans = JSON.parse(localStorage.getItem("riskPlans")) || [];
    setSavedPlans(plans);
  }, []);

  const savePlan = () => {
    const newPlan = {
      accountSize,
      riskPercentage,
      takeProfitPercentage,
      stopLossPercentage,
      date: new Date().toLocaleString(),
    };
    const updatedPlans = [newPlan, ...savedPlans];
    setSavedPlans(updatedPlans);
    localStorage.setItem("riskPlans", JSON.stringify(updatedPlans));
  };

  const clearPlans = () => {
    setSavedPlans([]);
    localStorage.removeItem("riskPlans");
  };

  const downloadPDF = async () => {
    const element = riskRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("Risk-Management-Plan.pdf");
  };

  const pieData = {
    labels: ["Risked Amount", "Remaining Capital"],
    datasets: [
      {
        label: "Account Distribution",
        data: [stakeAmount, remainingCapital],
        backgroundColor: ["#EF4444", "#3B82F6"],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
    },
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
    <div className="min-h-screen bg-[#f6f7f9] flex flex-col text-blue-900">
      {/* Navbar */}
      <Header />

      {/* Main */}
      <main className="flex-1 flex flex-col items-center p-4 sm:p-6 gap-6">
        <div ref={riskRef} className="bg-white rounded-lg shadow-md p-4 sm:p-8 w-full max-w-xl">
          <h1 className="text-2xl font-bold text-center mb-2">Risk Manager Calculator</h1>
          <p className="text-center text-sm text-gray-500 mb-6">Manage your trading risk with precision</p>

          <hr className="border-blue-300 mb-6" />

          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Account Size ($)</label>
              <input
                type="number"
                value={accountSize}
                onChange={(e) => setAccountSize(Number(e.target.value))}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Risk Percentage (%)</label>
              <input
                type="number"
                value={riskPercentage}
                onChange={(e) => setRiskPercentage(Number(e.target.value))}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full">
                <label className="block text-sm font-medium mb-1">Take Profit (%)</label>
                <input
                  type="number"
                  value={takeProfitPercentage}
                  onChange={(e) => setTakeProfitPercentage(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium mb-1">Stop Loss (%)</label>
                <input
                  type="number"
                  value={stopLossPercentage}
                  onChange={(e) => setStopLossPercentage(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-bold mb-2">Results</h3>
            <div className="border border-gray-200 rounded p-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Amount to Stake ($):</span>
                <span className="font-semibold">${stakeAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Take Profit Target ($):</span>
                <span className="font-semibold">${takeProfit.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Stop Loss Amount ($):</span>
                <span className="font-semibold">${stopLoss.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Risk/Reward Ratio:</span>
                <span className="font-semibold">{riskRewardRatio}</span>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-2 text-center">Risk Visualization</h3>
            <div className="max-w-xs mx-auto">
              <Pie data={pieData} options={pieOptions} />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <button
              onClick={savePlan}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save Plan
            </button>
            <button
              onClick={downloadPDF}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Download PDF
            </button>
          </div>
        </div>

        {/* Saved Plans */}
        {savedPlans.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6 mt-6 w-full max-w-3xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Saved Risk Plans</h2>
              <button
                onClick={clearPlans}
                className="text-red-600 hover:underline text-sm"
              >
                Clear All
              </button>
            </div>
            <ul className="space-y-3 text-sm text-gray-700">
              {savedPlans.map((plan, idx) => (
                <li key={idx} className="border-b pb-2 break-words">
                  {plan.date} — Account: ${plan.accountSize}, Risk: {plan.riskPercentage}%, TP: {plan.takeProfitPercentage}%, SL: {plan.stopLossPercentage}%
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
