import Link from "next/link";
import { press_start_2P } from "../utils/customFont";
import { useDisconnect, useAccount } from "wagmi";

/**
 *
 * @param headerCallback: is a number. 0 means Register & 1 means Login
 * @returns jsx
 */
const Header = ({ headerCallback }: any) => {
  const { disconnect } = useDisconnect();
  const { isConnected, address } = useAccount();

  return (
    <div className="bg-gray-800 h-20 flex items-center justify-between px-20">
      {/* site logo */}
      <p
        className={`${press_start_2P.className} text-white text-xl font-semibold`}
      >
        SHILL STREET
      </p>
      {/* navigation */}
      <nav className="text-white space-x-5">
        {isConnected && (
          <>
            {/* <Link href="/dashboard" className="hover:text-blue-400">
              Dashboard
            </Link>
            <span className="v_line" />
            <Link href="/create" className="hover:text-blue-400">
              Create
            </Link>
            <span className="v_line" />
            <Link href="/jobs" className="hover:text-blue-400">
              Jobs
            </Link> */}
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
          </>
        )}

        {/* show the register button if no connected */}
        {!isConnected && (
          <>
            {/* <span className="v_line" /> */}
            <Link
              href="#"
              className="hover:text-blue-400"
              onClick={() => headerCallback(0)}
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Header;
