import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    // ✨ Your landing page JSX goes here (with 💵 rain and glam card)
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-black text-white overflow-hidden">
      {/* Falling cash emoji animation */}
      <div className="absolute inset-0 z-0 animate-cashRain pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-8 h-8 animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            💵
          </div>
        ))}
      </div>

      <div className="z-10 bg-white bg-opacity-10 backdrop-blur-md rounded-3xl shadow-2xl p-16 text-center max-w-4xl min-h-[500px]">
        <div className="bg-gradient-to-tr from-blue-500 to-purple-500 w-24 h-24 rounded-full mx-auto flex items-center justify-center font-bold text-3xl">
          Db
        </div>
        <h1 className="text-5xl font-semibold mt-6">Detra Bots</h1>
        <p className="text-lg text-gray-300 mt-2">Advanced Forex Trading System</p>

        <div className="mt-10 bg-black bg-opacity-50 p-6 rounded-xl">
          <p className="text-green-400 font-bold text-xl">Fetching Currency Pairs</p>
          <p className="text-base text-gray-300 mt-1">Syncing EUR/USD, GBP/JPY, USD/CHF rates</p>
        </div>

        <div className="mt-10 space-y-3">
          <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-blue-400 animate-progress" />
          </div>
          <p className="text-base text-gray-400">
            Connecting to Forex APIs… Fetching data… Analyzing…
          </p>
        </div>
      </div>
    </div>
  );
}
