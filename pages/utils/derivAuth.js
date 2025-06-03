export const loginWithDeriv = () => {
  const appId = process.env.NEXT_PUBLIC_DERIV_APP_ID;
  const redirectUri = process.env.NEXT_PUBLIC_DERIV_REDIRECT_URI;
  const url = `https://oauth.deriv.com/oauth2/authorize?app_id=${appId}&redirect_uri=${encodeURIComponent(redirectUri)}`;
  window.location.href = url;
};