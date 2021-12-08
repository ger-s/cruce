import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children, size, parse }) => (
  <>
    <Head>
      <title>App Cruce</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.png" />
      <link
        async
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
      />
    </Head>
    
    <Navbar size={size} />


    {children}

    <Footer size={size}/>
  </>
);

export default Layout;
