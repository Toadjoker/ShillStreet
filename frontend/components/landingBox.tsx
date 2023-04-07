import React, { useState } from "react"
import Image from "next/image"
import { press_start_2P } from "../utils/customFont"
import { useForm, SubmitHandler } from "react-hook-form"
import { waitListRequest } from "../utils/apiRequests"
import { WaitListType } from "../utils/types"
import { Spinner, Alert, AlertType } from "./"

type Inputs = {
    email: string
}

const LandingBox = () => {
    const [requesting, setReqesting] = useState<boolean>(false)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<WaitListType> = async (data) => {
        setReqesting(true)
        await waitListRequest
            .post("/users/join_waitlist", data)
            .then((response: any) => {
                if (response) {
                    reset() // clear form input when submit is successful
                    Alert(AlertType.success, "You have been added to the wait list!")
                }
            })
            .catch((error: any) => {
                if (error.response) Alert(AlertType.error, error.response?.data?.email[0])
            })
            .finally(() => setReqesting(false))
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <p
                className={`${press_start_2P.className} w-1/2 text-center text-xs text-gray-600 leading-loose`}
            >
                The Web3 Marketing Platform - Empowering Threadors and Automating Marketing
                Campaigns for Web3 Protocols
            </p>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-center justify-start w-1/4 h-1/2"
            >
                {/* image and button section */}
                <div className="flex flex-col items-center justify-center mb-3">
                    <div className="rounded-full w-40 h-40 flex items-center justify-center mb-5 overflow-hidden">
                        <Image
                            src="/images/whiteBird.svg"
                            alt="bird-logo"
                            width={400}
                            height={400}
                            unoptimized={true}
                        />
                    </div>
                </div>

                {/* instruction text and input field section */}
                <div className="my-5 space-y-3">
                    <p className={`${press_start_2P.className} text-center text-xs text-gray-600`}>
                        Provide Email For Private Beta
                    </p>
                    <div className="h_line"></div>
                    <input
                        type="email"
                        placeholder="youremail@example.com"
                        className={`${press_start_2P.className} text-xs w-full h-8 rounded-sm p-4 text-gray-500 border-2 border-gray-400`}
                        {...register("email", { required: "This field is required" })}
                    />

                    {errors.email && (
                        <span className="text-red-400 text-center">{errors.email?.message}</span>
                    )}
                </div>
                <button
                    className={`${press_start_2P.className} flex justify-center text-xs bg-blue-500 p-2 rounded-full w-24 shadow-md hover:bg-blue-600 text-white`}
                    type="submit"
                >
                    {requesting ? <Spinner width={20} height={20} /> : "Submit"}
                </button>
            </form>
        </div>
    )
}

export default LandingBox
