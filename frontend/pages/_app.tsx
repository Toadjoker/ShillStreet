import Head from "next/head"
import "../styles/globals.css"
import "antd/dist/reset.css"
import { WagmiConfig, createClient } from "wagmi"
import { getDefaultProvider } from "ethers"
import { InjectedConnector } from "wagmi/connectors/injected"
import { Provider } from "react-redux"
import store from "../redux/configureStore"

const client = createClient({
    provider: getDefaultProvider(),
    connectors: [
        new InjectedConnector({
            options: {
                shimDisconnect: true,
            },
        }),
    ],
})

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
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
            </WagmiConfig>
        </>
    )
}
