import { useMemo } from "react"
import { useConnect, useAccount, useSignMessage } from "wagmi"
import { space_grotesk_medium } from "../utils/customFont"
import { Spinner } from "./"

const ConnectWalletButton = ({ buttonTitle, requesting }: any) => {
    const { connectors, connect } = useConnect()

    return (
        <>
            {connectors?.map((connector: any) => (
                <button
                    key={connector.id}
                    className={`${space_grotesk_medium.className} flex items-center justify-center text-xs bg-shillStreetBlue p-2 rounded-md w-full h-10 shadow-md hover:bg-cyan-600 text-white`}
                    type="submit"
                    onClick={() => connect({ connector })}
                >
                    {requesting ? <Spinner width={20} height={20} /> : buttonTitle}
                </button>
            ))}
        </>
    )
}

export default ConnectWalletButton
