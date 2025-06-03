// pages/auth/callback.jsx
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token');

    if (token) {
      localStorage.setItem('deriv_token', token); // or use cookies
      router.push('/dashboard'); // or push to where they intended to go
    }
  }, []);

  return <p className="p-10 text-center">Logging in... Please wait.</p>;
}

