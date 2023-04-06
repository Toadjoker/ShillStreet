import Head from "next/head";
import "../styles/globals.css";
import { WagmiConfig, createClient } from "wagmi";
import { getDefaultProvider } from "ethers";

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Shill Street</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WagmiConfig client={client}>
        <Component {...pageProps} />
      </WagmiConfig>
    </>
  );
}
