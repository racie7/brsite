import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useAuthRedirect from '../utils/useAuthRedirect';
import Header from '../components/Header';
import { XMLParser } from 'fast-xml-parser';

export default function BotBuilder() {
  const router = useRouter();
  useAuthRedirect();

  const [parsedData, setParsedData] = useState(null);
  const [selectedBot, setSelectedBot] = useState('');

  const fetchAndParseBot = async (botName) => {
    try {
      const res = await fetch(`/bots/${botName}.xml`);
      const xml = await res.text();
      const parser = new XMLParser({ ignoreAttributes: false });
      const parsed = parser.parse(xml);
      setParsedData(parsed);
      setSelectedBot(botName);
    } catch (err) {
      console.error('Error loading bot:', err);
    }
  };

  const getVariableValue = (label) => {
    return (
      parsedData?.xml?.variables?.variable?.find(v => v['#text'] === label)?.value || ''
    );
  };

  useEffect(() => {
    // Auto load default bot
    fetchAndParseBot('dollarprinter');
  }, []);

  return (
    <div className="min-h-screen bg-white text-blue-900">
      <Header />

      <main className="flex flex-col md:flex-row">
        <aside className="w-full md:w-[250px] border-b md:border-b-0 md:border-r border-gray-300 bg-white p-4">
          <div className="font-bold text-lg bg-blue-800 text-white py-2 px-4 rounded">Quick strategy</div>
          <div className="mt-4">
            <input type="text" placeholder="Search" className="w-full p-2 text-sm border rounded mb-3" />
            <ul className="text-sm space-y-2">
              <li className="font-medium">Trade parameters</li>
              <li>Purchase conditions</li>
              <li>Sell conditions (optional)</li>
              <li>Restart trading conditions</li>
              <li>Analysis</li>
              <li>Utility</li>
            </ul>
          </div>
        </aside>

        <section className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
            <h2 className="text-lg font-bold">1. Trade parameters</h2>
            <div className="space-x-2">
              <button onClick={() => fetchAndParseBot('dollarprinter')}>📥 Dollar Printer</button>
              <button onClick={() => fetchAndParseBot('expertspeedbot')}>📥 Expert Speed</button>
              <button onClick={() => fetchAndParseBot('candlemine')}>📥 Candle Mine</button>
            </div>
          </div>

          <div className="bg-blue-100 p-4 rounded mb-4">
            <label className="block mb-2">Market: Derived ➡️ Continuous Indices ➡️ Volatility 1s Index</label>
            <label className="block mb-2">Trade Type: Up/Down (Rise/Fall)</label>
            <label className="block mb-2">Contract Type: Both</label>
            <label className="block mb-2">Default Candle Interval: 1 minute</label>
            <div className="mt-2 text-sm">
              <input type="checkbox" defaultChecked /> Restart last trade on error
            </div>
            <label className="block mt-4">Trade options: Ticks, Stake:</label>
            <input
              type="number"
              placeholder="Stake"
              value={getVariableValue('Stake')}
              className="border p-2 mt-2 rounded w-full"
              readOnly
            />
          </div>

          <div className="bg-blue-100 p-4 rounded mb-4">
            <h3 className="font-semibold mb-2">2. Purchase conditions</h3>
            <input
              type="text"
              placeholder="S💵 L"
              value={getVariableValue('S💵 L')}
              className="border p-2 rounded w-full mb-2"
              readOnly
            />
            <input
              type="text"
              placeholder="T💵"
              value={getVariableValue('T💵')}
              className="border p-2 rounded w-full"
              readOnly
            />
          </div>

          <div className="bg-blue-100 p-4 rounded mb-4">
            <h3 className="font-semibold mb-2">3. Sell conditions</h3>
            <p>If Sell is available → Sell</p>
          </div>

          <div className="bg-blue-100 p-4 rounded">
            <h3 className="font-semibold mb-2">4. Restart trading conditions</h3>
            <p>Trade again</p>
          </div>
        </section>
      </main>
    </div>
  );
}
