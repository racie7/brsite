import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import RippleButton from '../components/RippleButton';
import useAuthRedirect from '../utils/useAuthRedirect';
import Header from '../components/Header';
import { FaDownload } from 'react-icons/fa';

export default function FreeBots() {
  useAuthRedirect();
  const router = useRouter();
  const [loadingBot, setLoadingBot] = useState(null);

  const bots = [
    {
      id: 'dollarprinter',
      name: '1 $Original DollarPrinterBot 2025 Version',
      description: 'Trading strategy using the 1 $Original DollarPrinterBot 2025 Version $ (1) system',
    },
    {
      id: 'expertspeed',
      name: '2 Updated Expert Speed Bot Version',
      description: 'Trading strategy using the 2 Updated Expert Speed Bot Version (1) (1) system',
    },
    {
      id: 'candlemine',
      name: '3 Updated Version Of Candle Mine',
      description: 'Trading strategy using the 3 Updated Version Of Candle Mine system',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f7f9] text-blue-900">
      <Header />

      <main className="flex-1 p-4 sm:p-6 lg:p-10">
        <h1 className="text-2xl font-bold mb-2 text-blue-900">Trading Bots Library</h1>
        <p className="text-sm text-gray-600 mb-8">Click on a bot to load it in the Bot Builder</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {bots.map((bot) => (
            <div
              key={bot.id}
              className="bg-[#06162E] rounded-lg p-4 flex flex-col justify-between min-h-[190px] shadow-md transition-transform duration-300 hover:scale-105"
            >
              <div>
                <h3 className="text-white text-base font-bold mb-2">{bot.name}</h3>
                <p className="text-sm text-gray-400">{bot.description}</p>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => {
                    setLoadingBot(bot.id);
                    router.push(`/bot-builder?load=${bot.id}`);
                  }}
                  disabled={loadingBot === bot.id}
                  className={`flex-1 text-white text-sm py-2 rounded text-center transition duration-300 ${
                    loadingBot === bot.id
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
                  }`}
                >
                  {loadingBot === bot.id ? 'Loading...' : 'Load Bot'}
                </button>

                <a
                  href={`/bots/${bot.id}.xml`}
                  download
                  className="flex-1 bg-green-600 hover:bg-green-700 hover:shadow-lg text-white text-sm py-2 rounded text-center flex items-center justify-center gap-1"
                >
                  <FaDownload className="text-xs" /> Download
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
