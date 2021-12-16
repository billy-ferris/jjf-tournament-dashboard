import "../styles/globals.css";

import type { AppProps } from "next/app";
import Head from "next/head";

import { AuthProvider } from "../lib/auth/AuthContext";

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>My App</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
    </Head>
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  </>
);

export default App;
