import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";

import store from "../store/index";

import Layout from "../components/layout/Layout";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </CookiesProvider>
  );
}

export default MyApp;
