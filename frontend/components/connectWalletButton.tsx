import { useConnect } from "wagmi"
import { press_start_2P } from "../utils/customFont"
import { Spinner } from "./"

const ConnectWalletButton = ({ buttonTitle, requesting }: any) => {
    const { connectors, connect } = useConnect()

    return (
        <>
            {connectors?.map((connector: any) => (
                <button
                    key={connector.id}
                    className={`${press_start_2P.className} flex items-center justify-center text-xs bg-blue-500 p-2 rounded-full w-32 h-10 shadow-md hover:bg-blue-600 text-white`}
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
