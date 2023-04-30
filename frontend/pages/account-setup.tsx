import { useMemo } from "react"
import { useAccount, useSignMessage } from "wagmi"
import { MainLayout, ConnectWalletButton, ConnectTwitterButton } from "../components"
import {
    space_grotesk_medium,
} from "../utils/customFont"

const AccountSetup = () => {
    const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
        message: "Sign shillstreet message",
    })
    const { address, isConnected } = useAccount()

    useMemo(() => {
        if (isConnected && data === undefined) {
            signMessage() // sign the message
        }
    }, [isConnected, data])

    useMemo(() => {
        if (isSuccess) {
            // this is the private string from the message signing
            console.log(data)
        }
    }, [isSuccess])

    return (
        <MainLayout>
            <section className="bg-shillStreetBlue flex flex-col flex-grow px-96 pt-10 overflow-hidden">
                {/* top title card */}
                <div className="bg-shillStreetGrey w-full rounded-xl p-2 px-14 h-14 text-white border-4 border-white">
                    <h3
                        className={`${space_grotesk_medium.className} font-bold text-xl text-center`}
                    >
                        Account Setup
                    </h3>
                </div>

                <div className="bg-shillStreetGrey w-full rounded-xl p-2 px-14 h-1/2 mt-14 text-white border-4 border-white">
                    <div className="flex items-center justify-between my-10">
                        <p
                            className={`${space_grotesk_medium.className} font-bold text-xl text-center mt-5`}
                        >
                            Connect Wallet
                        </p>
                        {/* only show the connect button if the address is undefined */}
                        {address === undefined && (
                            <ConnectWalletButton buttonTitle="Connect" requesting={isLoading} />
                        )}
                    </div>
                    <div className="flex items-center justify-between my-10">
                        <p
                            className={`${space_grotesk_medium.className} font-bold text-xl text-center mt-5`}
                        >
                            Connect Twitter
                        </p>
                        <ConnectTwitterButton buttonTitle="Connect" />
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}

export default AccountSetup
