import Link from "next/link"
import { press_start_2P } from "../utils/customFont"
import { useDisconnect, useAccount } from "wagmi"

/**
 *
 * @param headerCallback: is a number. 0 means Register & 1 means Login
 * @returns jsx
 */
const Header = ({ headerCallback }: any) => {
    const { disconnect } = useDisconnect()
    const { isConnected, address } = useAccount()

    return (
        <section className="bg-gray-800 h-20 flex items-center justify-between px-20">
            {/* site logo */}
            <h1 className={`${press_start_2P.className} text-white text-xl font-semibold`}>
                SHILL STREET
            </h1>
            {/* navigation */}
            <nav className="text-white space-x-5">
                {isConnected && (
                    <div className="flex items-center">
                        <p className="bg-blue-500 p-2 rounded-full w-auto mx-3">
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

                {/* show the register button if no connected */}
                {!isConnected && (
                    <Link
                        href="#"
                        className={`${press_start_2P.className} hover:text-blue-400 text-xs`}
                        onClick={() => headerCallback(0)}
                    >
                        Register
                    </Link>
                )}
            </nav>
        </section>
    )
}

export default Header
