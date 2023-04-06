import { useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const ConnectWalletButton = ({ buttonTitle }: any) => {
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

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
