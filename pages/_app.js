import Script from "next/script";

import { Provider } from "react-redux";
import { AuthContextProvider } from "../components/authentication/context/AuthContext";

import store from "../store/index";

import Layout from "../components/layout/Layout";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Provider store={store}>
        <Layout>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <Script
            strategy="lazyOnload"
            src={"https://www.googletagmanager.com/gtag/js?id=G-38WZF6734L"}
          />
          <Script id="gtag-init" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-38WZF6734L');`}
          </Script>

          <Component {...pageProps} />
        </Layout>
      </Provider>
    </AuthContextProvider>
  );
}

export default MyApp;
