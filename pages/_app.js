import 'bootstrap/dist/css/bootstrap.css'
import "../css/customcss.css";
import Head from "next/head";

function RussianApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default RussianApp
