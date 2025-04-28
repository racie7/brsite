import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (!token || token.length < 10) {
      setError('Please enter a valid Deriv token.');
      return;
    }

    // Save token in localStorage
    localStorage.setItem('derivToken', token);
    setError('');

    // Redirect to dashboard
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">Welcome to Your Trading Hub</h1>
        <p className="text-sm text-gray-600 mb-6">Enter your Deriv API token to get started.</p>

        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Enter Deriv API Token"
          className="w-full px-4 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="text-xs text-gray-400 mt-4">
          Don't have a token? Generate one from your Deriv account dashboard.
        </p>
      </div>
    </div>
  );
}
