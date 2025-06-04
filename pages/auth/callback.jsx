// pages/auth/callback.jsx
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return; // wait for the router to hydrate

    const token = router.query.token;

    if (token) {
      localStorage.setItem('deriv_token', token);
      router.replace('/dashboard');
    } else {
      // Optional: fallback if token is missing
      console.warn('No token found in query params');
      router.replace('/'); // or show error message / redirect home
    }
  }, [router.isReady]);

  return <p className="p-10 text-center">Logging in... Please wait.</p>;
}

