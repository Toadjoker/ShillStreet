import { useMemo, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ConnectWalletButton } from "../";
import { useAccount, useSignMessage } from "wagmi";

type Inputs = {
  name: string;
  email: string;
  // walletAddress: string;
  // privateString: string;
};

const SignUpForm = () => {
  const [connectedAddress, setConnectedAddress] = useState<string>("");
  const [privateStringMessage, setPrivateStringMessage] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: "default shill street sign message",
  });
  const { address, isConnected } = useAccount();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("yeahhhh");
    if (isValid) {
      let postData = {
        name: data.name,
        email: data.email,
        walletAddress: connectedAddress,
        privateString: privateStringMessage,
      };
      console.log(postData);
    }
  };

  useMemo(() => {
    if (isConnected) {
      signMessage(); // sign the message
      setConnectedAddress(address);
      console.log("addressF: ", address);
    }
  }, [isConnected]);

  useMemo(() => {
    if (isSuccess) {
      setIsValid(true);
      setPrivateStringMessage(data);
      console.log("message: ", data);
    }
  }, [isSuccess, isValid]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="-mt-5 w-auto">
      <p className="text-center text-xl font-semibold mb-5 text-gray-500">
        Sign Up
      </p>
      <input
        type="name"
        placeholder="your name"
        className="w-full h-8 rounded-sm p-4 text-gray-500 border-2 border-gray-400 my-3"
        {...register("name", { required: "This field is required" })}
      />
      <input
        type="email"
        placeholder="youremail@example.com"
        className="w-full h-8 rounded-sm p-4 text-gray-500 border-2 border-gray-400 my-3"
        {...register("email", { required: "This field is required" })}
      />
      <div className="flex justify-center items-center my-3">
        <ConnectWalletButton buttonTitle="Sign up" />
      </div>
    </form>
  );
};

export default SignUpForm;
