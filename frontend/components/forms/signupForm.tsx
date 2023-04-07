import { useMemo, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { ConnectWalletButton } from "../"
import { useAccount, useSignMessage } from "wagmi"
import { RegisterType } from "../../utils/types"
import { registerRequest } from "../../utils/apiRequests"
import { press_start_2P } from "../../utils/customFont"
import { Spinner, Alert, AlertType } from "../"

type Inputs = {
    name: string
    email: string
}

const SignUpForm = () => {
    const [isValid, setIsValid] = useState<boolean>(false)
    const [requesting, setReqesting] = useState<boolean>(false)
    const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
        message: "default shill street sign message",
    })
    const { address, isConnected } = useAccount()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<RegisterType> = async (data) => {
        if (isValid) {
            setReqesting(true)
            await registerRequest
                .post("/users/register", data)
                .then((response: any) => {
                    if (response) Alert(AlertType.success, "Registration Successful!")
                })
                .catch((error: any) => {
                    if (error.response) {
                        Alert(
                            AlertType.error,
                            error.response?.data?.email[0],
                            error.response?.data?.walletAddress[0]
                        )
                    }
                })
                .finally(() => setReqesting(false))
        }
    }

    const setPostData = (address?: string, privateString?: string) => {
        if (address != "" && privateString != "") {
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
        if (isConnected && data === undefined) {
            signMessage() // sign the message
        }
    }, [isConnected, data])

    useMemo(() => {
        if (isSuccess) {
            setIsValid(true)
            setPostData(address, data)
        }
    }, [isSuccess, isValid])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="-mt-5 w-auto">
            <p
                className={`${press_start_2P.className} text-center text-xl font-semibold mb-5 text-gray-500`}
            >
                Sign Up
            </p>
            <input
                type="text"
                placeholder="Your name"
                className={`${press_start_2P.className} text-xs w-full h-8 rounded-sm p-4 text-gray-500 border-2 border-gray-400 my-3`}
                {...register("name", { required: "This field is required" })}
            />
            <input
                type="email"
                placeholder="youremail@example.com"
                className={`${press_start_2P.className} text-xs w-full h-8 rounded-sm p-4 text-gray-500 border-2 border-gray-400 my-3`}
                {...register("email", { required: "This field is required" })}
            />

            <div className="flex justify-center items-center my-3">
                {watch("name") != "" && watch("email") != "" && (
                    <ConnectWalletButton buttonTitle="Sign up" requesting={requesting} />
                )}
            </div>
        </form>
    )
}

export default SignUpForm
