import Link from "next/link";

const Header = () => {
  return (
    <div className="bg-gray-800 h-20 flex items-center justify-between px-20">
      {/* site logo */}
      <div>
        <p className="text-white text-2xl font-semibold">SHILL STREET</p>
      </div>
      {/* navigation */}
      <nav className="text-white space-x-5">
        <Link href="/dashboard" className="hover:text-blue-400">
          Dashboard
        </Link>
        <span className="v_line" />
        <Link href="/create" className="hover:text-blue-400">
          Create
        </Link>
        <span className="v_line" />
        <Link href="/jobs" className="hover:text-blue-400">
          Jobs
        </Link>
        <span className="v_line" />
        <Link
          href="/connect"
          className="bg-blue-500 p-2 rounded-full hover:bg-blue-600 hover:shadow-2xl"
        >
          Connect Wallet
        </Link>
      </nav>
    </div>
  );
};

export default Header;
