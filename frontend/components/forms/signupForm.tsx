import { useMemo, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ConnectWalletButton } from "../";
import { useAccount, useSignMessage } from "wagmi";
import { RegisterType } from "../../utils/types";

type Inputs = {
  name: string;
  email: string;
};

const SignUpForm = () => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: "default shill street sign message",
  });
  const { address, isConnected } = useAccount();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (isValid) {
      console.log("yeahhhh: ", data);
    }
  };

  const setPostData = async (
    address?: string,
    privateString?: string
  ) => {
    // prepare post data
    const postData: RegisterType = {
      name: watch("name"),
      email: watch("email"),
      walletAddress: address,
      privateString: privateString,
    };

    // invoke the submission with the data to post
    onSubmit(postData);
  };

  useMemo(() => {
    if (isConnected && data === undefined) {
      signMessage(); // sign the message
    }
  }, [isConnected]);

  useMemo(() => {
    if (isSuccess) {
      setIsValid(true);
      setPostData(address, data);
    }
    if (isError) {
      setIsValid(false);
    }
  }, [isSuccess, isError, isValid]);

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
