import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const ConnectWalletButton = ({ buttonTitle }: any) => {
  // const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  // const { disconnect } = useDisconnect();

  // if (isConnected)
  //   return (
  //     <div>
  //       Connected to {address}
  //       <button onClick={() => disconnect()}>Disconnect</button>
  //     </div>
  //   );
  return (
    <button
      className="bg-blue-500 p-2 rounded-full w-32 shadow-md hover:bg-blue-600 text-white"
      type="submit"
      onClick={() => connect()}
    >
      {buttonTitle}
    </button>
  );
};

export default ConnectWalletButton;
