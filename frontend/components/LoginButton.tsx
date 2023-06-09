import { LoginRequest } from "../utils/apiRequests"
import { LoginType } from "../utils/types"
import Alert, { AlertType } from "./alert"
import Cookies from "js-cookie"
import { SubmitHandler } from "react-hook-form"
import { space_grotesk_medium } from "../utils/customFont"
import { useAccount, useSignMessage } from "wagmi"
import { useMemo } from "react"
import { ConnectWalletButton } from "."
import { useRouter } from "next/router"

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
    const router = useRouter()
    const onSubmit: SubmitHandler<LoginType> = async (data) => {
        try {
            const response = await LoginRequest.post("/users/login/", data)
            if (response) {
                Alert(AlertType.success, "Login Success!")
                Cookies.set("jwt", response.jwt, { expires: 1, secure: true, sameSite: "none" })
                router.reload()
            }
        } catch (error) {
            Cookies.remove("jwt")
        }
    }

    useMemo(() => {
        // console.log(address)
        // console.log(isConnected)
        // console.log(privateString)
        const token = Cookies.get("jwt")
        if (isConnected && !token) {
            signMessage() // sign the message
        }
    }, [isConnected])

    useMemo(() => {
        // console.log(address)
        if (isSuccess) {
            const data = {
                walletAddress: address ?? "defaultWalletAddress",
                privateString: privateString ?? "defaultPrivateString",
            }
            onSubmit(data)
            // console.log(data)
        }
    }, [isSuccess, address, privateString, onSubmit])
    return (
        <section className="flex items-center justify-between my-5">
            {/* only show the connect button if the address is undefined */}
            {address === undefined && (
                <ConnectWalletButton buttonTitle="Connect" requesting={isLoading} />
            )}
        </section>
    )
}
export default LoginButton
