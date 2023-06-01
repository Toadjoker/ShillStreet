import { useMemo } from "react"
import { useConnect, useAccount, useSignMessage } from "wagmi"
import { space_grotesk_medium } from "../utils/customFont"
import { Spinner } from "./"
import { ConnectButton } from "@rainbow-me/rainbowkit"

const ConnectWalletButton = ({ buttonTitle, requesting }: any) => {
    const { connectors, connect } = useConnect()

    return (
        <>
            <ConnectButton />
        </>
    )
}

export default ConnectWalletButton
