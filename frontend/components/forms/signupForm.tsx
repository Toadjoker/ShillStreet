import { useMemo, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ConnectWalletButton } from "../";
import { useAccount, useSignMessage } from "wagmi";
import { RegisterType } from "../../utils/types";
import { registerRequest } from "../../utils/apiRequests";
import { press_start_2P } from "../../utils/customFont";

type Inputs = {
  twitterHandle: string;
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
  const onSubmit: SubmitHandler<RegisterType> = async (data) => {
    if (isValid) {
      const response = await registerRequest.post("/users/register", data);
      console.log("yeahhhh: ", data);
      console.log("response: ", response);
    }
  };

  const setPostData = async (address?: string, privateString?: string) => {
    // prepare post data
    const postData: RegisterType = {
      twitterHandle: watch("twitterHandle"),
      email: watch("email"),
      walletAddress: address,
      privateString: privateString,
    };

    // invoke the submission with the data to post
    onSubmit(postData);
  };

  useMemo(() => {
    console.log(data, isValid, isConnected, address);
    if (isConnected && data === undefined) {
      signMessage(); // sign the message
    }
  }, [isConnected]);

  useMemo(() => {
    if (isSuccess) {
      setIsValid(true);
      setPostData(address, data);
    }
  }, [isSuccess, isValid]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="-mt-5 w-auto">
      <p
        className={`${press_start_2P.className} text-center text-xl font-semibold mb-5 text-gray-500`}
      >
        Sign Up
      </p>
      <input
        type="text"
        placeholder="Twitter Handle"
        className="w-full h-8 rounded-sm p-4 text-gray-500 border-2 border-gray-400 my-3"
        {...register("twitterHandle", { required: "This field is required" })}
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
