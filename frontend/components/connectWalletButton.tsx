import { useConnect } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"
import { press_start_2P } from "../utils/customFont"
import { Spinner } from "./"
// import { MetaMaskConnector } from "wagmi/connectors/metaMask";

const ConnectWalletButton = ({ buttonTitle, requesting }: any) => {
    const { connect } = useConnect({
        connector: new InjectedConnector(),
        // MetaMaskConnector({
        //   options: {
        //     shimDisconnect: true,
        //   },
        // })
    })

    return (
        <button
            className={`${press_start_2P.className} flex justify-center text-xs bg-blue-500 p-2 rounded-full w-32 shadow-md hover:bg-blue-600 text-white`}
            type="submit"
            onClick={() => connect()}
        >
            {requesting ? <Spinner width={20} height={20} /> : buttonTitle}
        </button>
    )
}

export default ConnectWalletButton
