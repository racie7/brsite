// pages/auth/login.jsx
import { useEffect } from 'react';

export default function Login() {
  useEffect(() => {
    const appId = process.env.NEXT_PUBLIC_DERIV_APP_ID;
    const redirectUri = process.env.NEXT_PUBLIC_DERIV_REDIRECT_URI;

    const loginUrl = `https://oauth.deriv.com/oauth2/authorize?app_id=${appId}&l=EN&brand=deriv&redirect_uri=${encodeURIComponent(redirectUri)}`;

    window.location.href = loginUrl;
  }, []);

  return <p>Redirecting to Deriv login...</p>;
}
