import { useMemo, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { ConnectWalletButton } from "../"
import { useAccount, useSignMessage, useDisconnect } from "wagmi"
import { RegisterType } from "../../utils/types"
import { registerRequest } from "../../utils/apiRequests"
import { space_grotesk_regular } from "../../utils/customFont"
import { Spinner, Alert, AlertType } from "../"
import Image from "next/image"

type Inputs = {
    name: string
    email: string
    walletAddress: string
    privateString: string
}

const SignUpForm = () => {
    const [isValid, setIsValid] = useState<boolean>(false)
    const [requesting, setReqesting] = useState<boolean>(false)
    const [signUp, setSignUp] = useState<boolean>(false)
    const { disconnect } = useDisconnect()
    const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
        message: "default shill street sign message",
    })
    const { address, isConnected } = useAccount()

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<RegisterType> = async (data) => {
        if (isValid) {
            setReqesting(true)
            await registerRequest
                .post("/users/register/", data)
                .then((response: any) => {
                    if (response) {
                        reset() // clear the inputs
                        Alert(AlertType.success, "Registration Successful!")
                    }
                })
                .catch((error: any) => {
                    if (error.response) {
                        disconnect() // disconnect the user
                        if (error?.response?.data?.email !== undefined) {
                            Alert(
                                AlertType.error,
                                "Account Already Exist!",
                                error?.response?.data?.email[0]
                            )
                        }
                        if (error?.response?.data?.walletAddress !== undefined) {
                            Alert(
                                AlertType.error,
                                "Wallet Address Error!",
                                error?.response?.data?.walletAddress[0]
                            )
                        }
                        if (error?.response?.data?.privateString !== undefined) {
                            Alert(
                                AlertType.error,
                                "Private String Error!",
                                error?.response?.data?.privateString[0]
                            )
                        }
                    }
                })
                .finally(() => {
                    setReqesting(false), setSignUp(false)
                })
        }
    }

    const setPostData = (address?: string, privateString?: string) => {
        if (address && privateString) {
            // prepare post data
            const postData: RegisterType = {
                name: watch("name"),
                email: watch("email"),
                walletAddress: address,
                privateString: privateString,
            }
            // invoke the submission with the data to post
            onSubmit(postData)
        }
    }

    useMemo(() => {
        if (isConnected && data === undefined && signUp) {
            signMessage() // sign the message
        }
    }, [isConnected, data, signUp])

    useMemo(() => {
        if (isSuccess) {
            setIsValid(true)
            setPostData(address, data)
        }
    }, [isSuccess, isValid])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="-mt-5 w-auto flex flex-col">
            <div className="flex items-center justify-center">
                <Image
                    src="/images/shillStreetIcon.png"
                    alt="shillstreet-logo"
                    width={50}
                    height={50}
                    unoptimized={true}
                    className="rounded-full"
                />
            </div>

            <div className="mt-5">
                <h3
                    className={`${space_grotesk_regular.className} text-xl text-center font-semibold mb-5 text-gray-500`}
                >
                    Sign Up
                </h3>
                <p className="text-center text-gray-400 text-xs -mt-4">
                    Please fill in the form and submit.
                </p>
            </div>

            <input
                type="text"
                placeholder="Your name"
                className={`${space_grotesk_regular.className} text-xs md:text-sm w-72 h-12 md:h-10 lg:h-10 rounded-sm p-4 text-gray-500 border-2 border-gray-400 my-4`}
                {...register("name", { required: "This field is required" })}
            />
            <input
                type="email"
                placeholder="youremail@example.com"
                className={`${space_grotesk_regular.className} text-xs md:text-sm w-72 h-12 md:h-10 lg:h-10 rounded-sm p-4 text-gray-500 border-2 border-gray-400 my-4`}
                {...register("email", { required: "This field is required" })}
            />

            <div
                className="flex justify-center items-center my-3 mt-5"
                onClick={() => setSignUp(true)}
            >
                {watch("name") != "" && watch("email") != "" && (
                    <ConnectWalletButton buttonTitle="Sign up" requesting={requesting} />
                )}
            </div>
        </form>
    )
}

export default SignUpForm
