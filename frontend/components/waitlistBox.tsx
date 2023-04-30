import React, { useState } from "react"
import Image from "next/image"
import { press_start_2P } from "../utils/customFont"
import { useForm, SubmitHandler } from "react-hook-form"
import { waitListRequest } from "../utils/apiRequests"
import { WaitListType } from "../utils/types"
import { Spinner, Alert, AlertType } from "."

type Inputs = {
    email: string
}

const WaitlistBox = () => {
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
            .post("/users/join_waitlist/", data)
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
        <section className="flex flex-col items-center justify-center h-full pb-48 md:pb-0 lg:pb-10 mx-8 lg:mx-48">
            <h2
                className={`${press_start_2P.className} md:w-3/4 text-center text-sm md:text-sm lg:text-sm text-gray-600 leading-8 md:leading-loose lg:leading-10`}
            >
                The Web3 Marketing Platform - Empowering Threadors and Automating Marketing
                Campaigns for Web3 Protocols
            </h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-center justify-start w-2/5 md:w-3/5 h-1/2 md:h-auto"
            >
                {/* image and button section */}
                <div className="flex flex-col items-center justify-center md:mb-3">
                    <div className="rounded-full w-48 h-48 flex items-center justify-center mb-5 overflow-hidden">
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
                <div className="-mt-10 md:-mt-12 lg:-mt-3 mb-8 md:my-10 lg:my-10 space-y-3">
                    <p
                        className={`${press_start_2P.className} text-center text-gray-600 text-xs md:text-sm lg:text-sm leading-7`}
                    >
                        Provide Email For Private Beta
                    </p>
                    <div className="h_line"></div>
                    <input
                        type="email"
                        placeholder="youremail@example.com"
                        className={`${press_start_2P.className} text-xs md:text-sm lg:text-xs w-full h-12 md:h-10 lg:h-10 rounded-sm p-4 text-gray-500 border-2 border-gray-400`}
                        {...register("email", { required: "This field is required" })}
                    />

                    {errors.email && (
                        <span className="text-red-400 text-center">{errors.email?.message}</span>
                    )}
                </div>
                <button
                    className={`${press_start_2P.className} flex items-center justify-center text-xs bg-blue-500 p-2 rounded-full w-32 md:w-32 lg:w-32 h-14 md:h-10 lg:h-10 shadow-md hover:bg-blue-600 text-white`}
                    type="submit"
                >
                    {requesting ? <Spinner width={20} height={20} /> : "Submit"}
                </button>
            </form>
        </section>
    )
}

export default WaitlistBox
