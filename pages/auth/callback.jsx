// pages/auth/callback.jsx
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token') || query.get('token1'); // support both

    if (token) {
      localStorage.setItem('deriv_token', token);
      router.replace('/dashboard'); // prevent stacking in history
    } else {
      // Handle missing token gracefully
      router.replace('/auth/login');
    }
  }, []);

  return <p className="p-10 text-center">Logging in... Please wait.</p>;
}
