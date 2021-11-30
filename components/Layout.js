import Head from "next/head";
import Navbar from "./Navbar";

const Layout = ({ children, size }) => (
  <>
    <Head>
      <title>App Cruce</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
      <link
        async
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
      />
    </Head>
    
    <Navbar size={size} />


    {children}


  </>
);

export default Layout;
