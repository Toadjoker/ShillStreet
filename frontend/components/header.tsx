import React from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import { press_start_2P, space_grotesk_regular } from "../utils/customFont"
import { useDisconnect, useAccount } from "wagmi"
import LoginButton from "./LoginButton"
import { useState, useEffect } from "react"
import { AuthRequest } from "../utils/apiRequests"
import Cookies from "js-cookie"
import { AxiosError } from "axios"
import { Spinner, Alert, AlertType } from "./"
/**
 *
 * @param headerCallback: is a number. 0 means Register & 1 means Login
 * @returns jsx
 */
const Header = ({ headerCallback }: any) => {
    const router = useRouter()
    const { disconnect } = useDisconnect()
    const { isConnected, address } = useAccount()
    const [userAddressOnline, setUserAddressOnline] = useState<string>("")
    const [userTwitterHandle, setUserTwitterHandle] = useState<string>("")
    const [userTwitterId, setUserTwitterId] = useState<string>("")
    const [isConnecting, setIsConnecting] = useState<boolean>(false)

    let truncatedUserAddress
    if (address) {
        truncatedUserAddress =
            address.substring(0, 5) + "..." + address.substring(address.length - 5)
    }
    const token = Cookies.get("jwt")
    const onSubmit = async () => {
        try {
            const token = Cookies.get("jwt")
            if (token) {
                const response = await AuthRequest.get("/users/user/", token)
                if (response) {
                    console.log(response)
                    if (response.walletAddress) {
                        setIsConnecting(true)
                        setUserAddressOnline(response.walletAddress)
                        setUserTwitterHandle(response.twitter_handle)
                        setUserTwitterId(response.twitter_user_id)
                    } else {
                        setIsConnecting(false)
                        disconnect()
                        Cookies.remove("jwt", { secure: true, sameSite: "none" })
                        Alert(AlertType.error, "You need to log in!")
                    }
                }
            }
        } catch (error) {
            const axiosError = error as AxiosError
            if (axiosError.response) {
            }
        }
    }
    useEffect(() => {
        if (isConnected) {
            onSubmit()
        }
    }, [isConnected, token])

    return (
        <section className="fixed top-0 left-0 right-0 z-10 bg-gray-800 h-16 flex items-center justify-between px-3 md:px-20 border-b">
            {/* site logo */}
            <Link href="/" className=" text-white text-xs md:text-xl font-semibold cursor-pointer">
                <Image
                    src="/images/shillstreet_logo.png"
                    alt="shillstreet-logo"
                    width={200}
                    height={200}
                    unoptimized={true}
                />
            </Link>
            {/* navigation */}
            <nav className="text-white space-x-5 flex items-center">
                <>
                    {!isConnecting && router.pathname != "/account-setup" ? (
                        <>
                            <Link
                                href="/account-setup"
                                className={`${space_grotesk_regular.className}  hover:bg-twitterBlue p-2 rounded-md `}
                            >
                                Launch App
                            </Link>
                            {userAddressOnline && (
                                <Link
                                    href={`/account/${address}`}
                                    className={`${space_grotesk_regular.className}  hover:bg-twitterBlue p-2 rounded-md`}
                                >
                                    Account
                                </Link>
                            )}
                        </>
                    ) : (
                        <>
                            <Link
                                href="/"
                                className={`${space_grotesk_regular.className}  hover:bg-twitterBlue p-2 rounded-md`}
                                onClick={() => headerCallback(0)}
                            >
                                Home
                            </Link>
                            {isConnecting && (
                                <div>
                                    <Link
                                        href={`/account/${address}`}
                                        className={`${space_grotesk_regular.className}  hover:bg-twitterBlue p-2 rounded-md`}
                                    >
                                        Account
                                    </Link>
                                    <Link
                                        href={`/jobs`}
                                        className={`${space_grotesk_regular.className}  hover:bg-twitterBlue p-2 rounded-md`}
                                    >
                                        Campaigns
                                    </Link>
                                </div>
                            )}
                        </>
                    )}
                </>
                <Link
                    href="https://shillstreet.gitbook.io/shillstreet/"
                    className={`${space_grotesk_regular.className}  hover:bg-twitterBlue p-2 rounded-md border-2 border-white`}
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    View Docs
                </Link>
                {isConnecting && (
                    <div className="flex items-center">
                        <p className=" p-2 w-auto mx-3 text-2xl rounded-md mt-4 ml-8 mr-4">|</p>
                        <p className="bg-shillStreetBlue p-2 w-auto mx-3 rounded-md border-2 mt-4 ml-8 mr-4">
                            {truncatedUserAddress}
                        </p>
                        <button
                            onClick={() => {
                                disconnect()
                                setUserAddressOnline("")
                                setUserTwitterHandle("")
                                setUserTwitterId("")
                                setIsConnecting(false)
                                Cookies.remove("jwt", { secure: true, sameSite: "none" })
                            }}
                            className={`${space_grotesk_regular.className}  hover:bg-blue-900 p-2 rounded-md border-2 border-white ml-2`}
                        >
                            Logout
                        </button>
                    </div>
                )}
            </nav>
        </section>
    )
}

export default Header
