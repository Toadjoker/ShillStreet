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
import Image from "next/image"
const AccountSetup = () => {
    const [state, setState] = useState<string>("intial")
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
                    setState("login")
                    // console.log(response)
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
            <section className="bg-gray-800 flex flex-col items-center justify-center flex-grow  overflow-hidden">
                {/* top title card */}
                <div className="bg-twitterBackGround flex-col justify-center items-center border rounded-2xl">
                    <div className="w-full rounded-xl h-14 text-white mb-3 ">
                        <h3
                            className={`${space_grotesk_medium.className} font-bold text-xl text-center p-3 border-b w-full`}
                        >
                            Account setup
                        </h3>
                    </div>
                    {needLogin && state !== "signup" && state != "login" ? (
                        <div className="flex flex-col items-center justify-center">
                            <h3
                                className={`${space_grotesk_medium.className} font-semibold text-xl text-white text-center p-3 w-full`}
                            >
                                First, you have to connect to our platform !
                            </h3>
                            <div className="flex items-center justify-center rounded-xl pt-2  text-white">
                                <button
                                    className="bg-twitterBlue hover:bg-twitterBlue text-white font-bold py-3 px-4 rounded my-2 mx-4 transform transition duration-500 hover:scale-110"
                                    onClick={() => setState("login")}
                                >
                                    Login
                                </button>
                                <button
                                    className="bg-twitterBlue hover:bg-twitterBlue text-white font-bold py-3 px-4 rounded my-2 mx-4 transform transition duration-500 hover:scale-110"
                                    onClick={() => setState("signup")}
                                >
                                    Signup
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="relative w-full flex">
                            {!isConnected && (
                                <div
                                    onClick={() => setState("initial")}
                                    className="bg-shillStreetGrey mt-3 ml-6 w-6 h-6 mr-20 flex justify-center items-center rounded-md cursor-pointer hover:bg-gray-600"
                                >
                                    <Image
                                        src="/images/chevron-left.svg"
                                        alt="chevron-left"
                                        width={18}
                                        height={18}
                                        unoptimized={true}
                                    />
                                </div>
                            )}
                            <div className="absolute top-1/2 mt-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <Image
                                    src="/images/shillStreetIcon.png"
                                    alt="shillstreet-logo"
                                    width={50}
                                    height={50}
                                    unoptimized={true}
                                    className="rounded-full"
                                />
                            </div>
                        </div>
                    )}
                    <div className="w-full mt-6 flex justify-center items-center ">
                        {state == "login" && (
                            <div className=" w-full h-22 flex justify-center text-white ">
                                <LoginButton />
                                {isConnected && (
                                    <ConnectTwitterForm userName={userName} email={userEmail} />
                                )}
                            </div>
                        )}
                        {state == "signup" && (
                            <div className="w-full rounded-xl py-2 h-auto mt-10 text-white  ">
                                <SignUpForm />
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}

export default AccountSetup
