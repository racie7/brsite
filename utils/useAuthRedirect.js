// utils/useAuthRedirect.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function useAuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('deriv_token');
    if (!token) {
      router.replace('/auth/login');
    }
  }, []);
}
