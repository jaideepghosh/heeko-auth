import Head from "next/head";
import "../styles/tailwind.css";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/react-toastify@6.1.0/dist/ReactToastify.css"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}

export default MyApp;
