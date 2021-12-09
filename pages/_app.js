import { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
// import App from 'next/app'
import Layout from "../components/Layout";
import useWindowSize from "../hooks/useWindowSize";

function MyApp({ Component, pageProps }) {
  const size = useWindowSize();

  

  return (
    <Layout size={size} >
      <Component {...pageProps} size={size} />
    </Layout>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
