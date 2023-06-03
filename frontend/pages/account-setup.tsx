import { MainLayout, ConnectTwitterButton } from "../components"
import LoginButton from "../components/LoginButton"
import ConnectTwitterForm from "../components/forms/connectTwitterForm"
import { space_grotesk_medium } from "../utils/customFont"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { AuthRequest, TwitterIdRequest } from "../utils/apiRequests"
import { LoginType } from "../utils/types"
import { useAccount } from "wagmi"
import SignUpForm from "../components/forms/signupForm"
const AccountSetup = () => {
    const [state, setState] = useState<string>("login")
    const [userName, setUserName] = useState<string>("")
    const [userEmail, setUserEmail] = useState<string>("")
    const [userAddressOnline, setUserAddressOnline] = useState<string>("")
    const [userTwitterHandle, setUserTwitterHandle] = useState<string>("")
    const [userTwitterId, setUserTwitterId] = useState<string>("")
    const [needLogin, setNeedLogin] = useState<boolean>(true)
    const { isConnected } = useAccount()
    const onSubmit = async () => {
        try {
            const token = Cookies.get("jwt")
            if (token) {
                const response = await AuthRequest.get("/users/user/", token)
                if (response) {
                    console.log(response)
                    setNeedLogin(false)
                    setUserAddressOnline(response.walletAddress)
                    setUserName(response.name)
                    setUserEmail(response.email)
                    setUserTwitterHandle(response.twitter_handle)
                    setUserTwitterId(response.twitter_user_id)
                }
            } else {
            }
        } catch (error) {
            // if (error.response) {
            // }
        }
    }

    useEffect(() => {
        onSubmit()
    }, [])
    return (
        <MainLayout>
            <section className="bg-gray-800 flex mt-14 pt-14 flex-col flex-grow px-96 overflow-hidden">
                {/* top title card */}
                <div className="bg-shillStreetGrey w-full rounded-xl p-2 px-14 h-14 text-white border-4 border-white mb-10">
                    <h3
                        className={`${space_grotesk_medium.className} font-bold text-xl text-center`}
                    >
                        Account Setup
                    </h3>
                </div>
                {needLogin && (
                    <div className="flex flex-col items-center justify-center ">
                        <div className="bg-shillStreetGrey flex items-center rounded-xl p-2 px-14 text-white border-4 border-white">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2 ml-12 mr-12"
                                onClick={() => setState("login")}
                            >
                                Login
                            </button>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2 ml-12 mr-12"
                                onClick={() => setState("signup")}
                            >
                                Signup
                            </button>
                        </div>
                    </div>
                )}
                <div className="flex justify-center items-center">
                    {state == "login" ? (
                        <div className="bg-shillStreetGrey w-1/2 rounded-xl p-2 px-14 h-22 flex justify-center mt-10 text-white border-4 border-white">
                            <LoginButton />
                            {isConnected && (
                                <ConnectTwitterForm userName={userName} email={userEmail} />
                            )}
                        </div>
                    ) : (
                        <div className="bg-shillStreetGrey w-1/2 rounded-xl py-2 px-14 h-auto mt-10 mb-14 text-white border-4 border-white">
                            <SignUpForm />
                        </div>
                    )}
                </div>
            </section>
        </MainLayout>
    )
}

export default AccountSetup
