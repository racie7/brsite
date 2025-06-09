import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuthRedirect from '../utils/useAuthRedirect';
import Header from '../components/Header';
import { XMLParser } from 'fast-xml-parser';

export default function BotBuilder() {
  const router = useRouter();
  useAuthRedirect();

  const { load } = router.query;
  const [parsedBot, setParsedBot] = useState(null);
  const [formData, setFormData] = useState({
    tradeType: '',
    market: '',
    candleInterval: '',
    amount: '',
  });
  const [error, setError] = useState(null);

  // Helper to extract value by name from <field> array
  const getFieldValue = (fields, fieldName) => {
    if (!Array.isArray(fields)) return null;
    const field = fields.find(f => f.name === fieldName);
    return field?.['#text'] ?? null;
  };

  useEffect(() => {
    if (!load) return;

    const fetchAndParseXML = async () => {
      try {
        const res = await fetch(`/bots/${load}.xml`);
        if (!res.ok) throw new Error('Bot file not found');

        const xml = await res.text();
        const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '' });
        const parsed = parser.parse(xml);
        console.log("RAW PARSED XML:", parsed);

        const fields = parsed?.blockly?.xml?.block?.field || [];

        const extracted = {
          tradeType: getFieldValue(fields, 'TRADETYPE'),
          market: getFieldValue(fields, 'MARKET'),
          candleInterval: getFieldValue(fields, 'CANDLE_INTERVAL'),
          amount: getFieldValue(fields, 'AMOUNT'),
        };

        setParsedBot(parsed);
        setFormData(extracted);
      } catch (err) {
        console.error(err);
        setError('Failed to load and parse the bot file.');
      }
    };

    fetchAndParseXML();
  }, [load]);

  return (
    <div className="min-h-screen bg-white text-blue-900">
      <Header />

      <main className="flex flex-col md:flex-row pb-24">
        {/* Left Sidebar */}
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

        {/* Workspace */}
        <section className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
            <h2 className="text-lg font-bold">1. Trade parameters</h2>
            <div className="space-x-2">
              <button>🔄</button>
              <button>📤</button>
              <button>📥</button>
              <button>➕</button>
              <button>🔍</button>
            </div>
          </div>

          {/* XML Preview */}
          {parsedBot && (
            <div className="bg-blue-50 border border-blue-200 text-sm text-blue-900 p-4 rounded mb-6 max-h-[300px] overflow-y-auto">
              <h3 className="font-bold mb-2">🔍 Parsed XML Preview</h3>
              <pre className="whitespace-pre-wrap break-words text-xs text-gray-800">
                {JSON.stringify(parsedBot, null, 2)}
              </pre>
            </div>
          )}

          {error && <p className="text-red-500 mb-4">{error}</p>}
          {!parsedBot && load && !error && <p className="text-blue-500 mb-4">Loading bot...</p>}

          {/* Auto-filled Trade Settings */}
          <div className="bg-blue-100 p-4 rounded mb-4">
            <label className="block mb-2">Market: {formData.market || '—'}</label>
            <label className="block mb-2">Trade Type: {formData.tradeType || '—'}</label>
            <label className="block mb-2">Contract Type: Both</label>
            <label className="block mb-2">Default Candle Interval: {formData.candleInterval || '—'} minute</label>
            <div className="mt-2 text-sm">
              <input type="checkbox" defaultChecked /> Restart last trade on error
            </div>
            <label className="block mt-4">Trade options: Ticks, Stake: ${formData.amount || '—'}</label>
          </div>

          <div className="bg-blue-100 p-4 rounded mb-4">
            <h3 className="font-semibold mb-2">2. Purchase conditions</h3>
            <p>Purchase: Rise</p>
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
