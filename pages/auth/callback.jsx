import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // Get token from URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      // Save to localStorage or cookies
      localStorage.setItem('deriv_token', token);

      // Redirect to dashboard or home
      router.push('/dashboard');
    } else {
      // Redirect to login if no token
      router.push('/');
    }
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-blue-800">Processing login, please wait...</p>
    </div>
  );
}
