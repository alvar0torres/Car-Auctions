import { route } from 'next/dist/server/router';
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import * as ga from '../lib/analytics';


import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";

import store from "../store/index";

import Layout from "../components/layout/Layout";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {

  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <CookiesProvider>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} key={route}/>
        </Layout>
      </Provider>
    </CookiesProvider>
  );
}

export default MyApp;
