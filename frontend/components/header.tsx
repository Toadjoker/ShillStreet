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
    }, [isConnected])

    return (
        <section className="bg-gray-800 h-24 flex items-center justify-between px-3 md:px-20">
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
                {isConnecting && (
                    <div className="flex items-center">
                        <p className="bg-blue-500 p-2 rounded-full w-auto mx-3 mt-4">
                            {userAddressOnline.slice(0, 10)}...
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
                            className="hover:text-blue-600 hover:shadow-2xl cursor-pointer"
                        >
                            Logout
                        </button>
                    </div>
                )}

                <Link
                    href="https://shillstreet.gitbook.io/shillstreet/"
                    className={`${space_grotesk_regular.className} hover:text-blue-400`}
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    View Docs
                </Link>
                <>
                    {router.pathname != "/account-setup" ? (
                        <>
                            {userAddressOnline && (
                                <Link href={`/account/${address}`} className={`${space_grotesk_regular.className} flex space-x-2`}>
                                    Account Overview
                                </Link>
                            )}
                            <Link
                                href="/account-setup"
                                className={`${space_grotesk_regular.className} bg-blue-800 hover:bg-blue-900 p-2 rounded-md border-2 border-white`}
                            >
                                Launch App
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/"
                                className={`${space_grotesk_regular.className} hover:text-blue-400`}
                                onClick={() => headerCallback(0)}
                            >
                                Home
                            </Link>
                            <Link
                                href="/jobs"
                                className={`${space_grotesk_regular.className} hover:text-blue-400`}
                                onClick={() => headerCallback(0)}
                            >
                                Jobs
                            </Link>
                        </>
                    )}
                </>
            </nav>
        </section>
    )
}

export default Header
