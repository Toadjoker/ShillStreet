import { LoginRequest } from "../utils/apiRequests"
import { LoginType } from "../utils/types"
import Alert, { AlertType } from "./alert"
import Cookies from "js-cookie"
import { SubmitHandler } from "react-hook-form"
import { space_grotesk_medium } from "../utils/customFont"
import { useAccount, useSignMessage } from "wagmi"
import { useMemo } from "react"
import { ConnectWalletButton } from "."

const LoginButton = () => {
    const {
        data: privateString,
        isError,
        isLoading,
        isSuccess,
        signMessage,
    } = useSignMessage({
        message: "default shill street sign message",
    })
    const { address, isConnected } = useAccount()

    const onSubmit: SubmitHandler<LoginType> = async (data) => {
        try {
            const response = await LoginRequest.post("/users/login/", data)
            if (response) {
                console.log(response)
                console.log(response.jwt)
                Cookies.set("jwt", response.jwt, { expires: 1, secure: true, sameSite: "none" })
                Alert(AlertType.success, "Login Success!")
            }
        } catch (error) {
            if (error.response) {
                Alert(AlertType.error, error.response.data.detail)
            } else {
                Alert(AlertType.error, "An error occurred while logging in. Please try again.")
            }
        }
    }
    useMemo(() => {
        if (isConnected && privateString === undefined) {
            signMessage() // sign the message
        }
    }, [isConnected, privateString])

    useMemo(() => {
        if (isSuccess) {
            const data = {
                walletAddress: address,
                privateString: privateString,
            }
            onSubmit(data)
            console.log(data)
        }
    }, [isSuccess, address, privateString, onSubmit])
    return (
        <div className="flex items-center justify-between my-10">
            <p className={`${space_grotesk_medium.className} font-bold text-xl text-center mt-5`}>
                Connect Wallet
            </p>
            {/* only show the connect button if the address is undefined */}
            {address === undefined && (
                <ConnectWalletButton buttonTitle="Log in" requesting={isLoading} />
            )}
        </div>
    )
}
export default LoginButton
