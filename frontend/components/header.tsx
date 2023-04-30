import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import { press_start_2P, space_grotesk_regular } from "../utils/customFont"
import { useDisconnect, useAccount } from "wagmi"

/**
 *
 * @param headerCallback: is a number. 0 means Register & 1 means Login
 * @returns jsx
 */
const Header = ({ headerCallback }: any) => {
    const router = useRouter()
    const { disconnect } = useDisconnect()
    const { isConnected, address } = useAccount()

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
                {isConnected && (
                    <div className="flex items-center">
                        <p className="bg-blue-500 p-2 rounded-full w-auto mx-3 mt-4">
                            {address.slice(0, 10)}...
                        </p>
                        {/* logout button */}
                        <button
                            onClick={() => disconnect()}
                            className="hover:text-blue-600 hover:shadow-2xl cursor-pointer"
                        >
                            Logout
                        </button>
                    </div>
                )}

                {/* only show the following if user is not on the waitlist page  */}
                {router.pathname !== "/" && (
                    <>
                        {router.pathname != "/account-setup" ? (
                            <>
                                <Link href="#">
                                    <Image
                                        src="/images/notification-bell.svg"
                                        alt="notification-bell-icon"
                                        width={25}
                                        height={25}
                                        unoptimized={true}
                                    />
                                </Link>
                                <Link href="#" className="flex space-x-2">
                                    <span
                                        className={`${space_grotesk_regular.className} bg-green-500 p-1 rounded-full h-6 w-6 text-center text-xs`}
                                    >
                                        J
                                    </span>
                                    <Image
                                        src="/images/chevron-down-white.svg"
                                        alt="chevron-down"
                                        width={20}
                                        height={20}
                                        unoptimized={true}
                                    />
                                </Link>
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
                                    href="/landing"
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
                )}

                {/* show the register button if no connected */}
                {/* {!isConnected && (
                    <Link
                        href="#"
                        className={`${press_start_2P.className} hover:text-blue-400 text-xs`}
                        onClick={() => headerCallback(0)}
                    >
                        Register
                    </Link>
                )} */}
            </nav>
        </section>
    )
}

export default Header
