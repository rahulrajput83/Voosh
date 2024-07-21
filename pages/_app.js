import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react';
/* App compoent */
function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default App;